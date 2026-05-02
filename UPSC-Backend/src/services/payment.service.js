const mongoose = require('mongoose');
const paymentRepo = require('../repositories/payment.repository');
const courseService = require('./course.service');
const couponService = require('./coupon.service');

const emiInstallmentRepo = require('../repositories/emi.installment.repository'); 
const logger = require('../utility/logger');
const { getErrorMessage } = require('../utility/errorMessage');
const razorpay = require('../utility/razorpay.js');
const crypto = require('crypto');
const { sendEmail} = require('../utility/email.service');
const {generatePaymentConfirmationHTML } = require('../utility/paymentConfirmationEmail.js');

const { RAZORPAY, PENDING, SUCCESS, CASH, CHEQUE } = require('../enums/enum.js');
const generateOrderId = () => Math.random().toString(36).substr(2, 9);
const generateReceiptNumber = () => `rcpt_${Math.random().toString(36).substr(2, 9)}`;


const generateEmiInstallments = (totalAmount, months, paymentId) => {
    const installments = [];
    const monthlyAmount = Math.round(totalAmount / months); 
    const firstPaymentDate = new Date(); 

    for (let i = 1; i <= months; i++) {
        const dueDate = new Date(firstPaymentDate);

        dueDate.setMonth(firstPaymentDate.getMonth() + i); 

        installments.push({
            paymentId: paymentId, 
            installmentNumber: i,
            dueDate: dueDate,
            amountDue: monthlyAmount,
            status: 'PENDING' 
        });
    }
    

    const totalEmiSum = installments.reduce((sum, inst) => sum + inst.amountDue, 0);
    const difference = totalAmount - totalEmiSum;
    if (difference !== 0 && installments.length > 0) {
        installments[installments.length - 1].amountDue += difference;
    }

    return installments;
};


/** When checkout slug is integrated-mentorship-20xx but Mongo row is missing or is another year, still charge correct plan amounts (must match frontend defaults). */
const IMP_PLAN_AMOUNTS_BY_YEAR = {
    '2027': { weekly: 35000, daily: 60000 },
    '2028': { weekly: 65000, daily: 90000 },
    '2029': { weekly: 90000, daily: 120000 },
};

/** Default full-pay amount (no weekly/daily in payload) for slug-only checkout aligned to each program’s “daily” list price. */
function resolveImpFullPayAmountBySlug(slug) {
    const s = String(slug || '').toLowerCase().trim();
    const m = s.match(/^integrated-mentorship-(20\d{2})$/);
    if (!m) return null;
    const daily = IMP_PLAN_AMOUNTS_BY_YEAR[m[1]]?.daily;
    return daily != null ? daily : null;
}

/** UPPCS landing checkout amounts (override DB sellingPrice when slug matches). */
const UPPCS_CHECKOUT_AMOUNT_BY_SLUG = {
    'uppcs-2026-complete': 30000,
    'uppcs-2026-prelims-booster': 15000,
    'uppcs-2026-upsc-combo': 45000,
    'uppcs-2026-mains-booster': 20000,
    'uppcs-2027-daily': 60000,
    'uppcs-2027-bns-prelims': 25000,
    'uppcs-2027-upsc-combo': 75000,
    'uppcs-2027-mains-booster': 20000,
};

function resolveUppcsFullPayAmountBySlug(slug) {
    const s = String(slug || '').toLowerCase().trim();
    const n = UPPCS_CHECKOUT_AMOUNT_BY_SLUG[s];
    return n != null ? n : null;
}

function resolveFullPayAmountBySlug(slug) {
    return resolveImpFullPayAmountBySlug(slug) ?? resolveUppcsFullPayAmountBySlug(slug);
}

function resolveCourseAmountFromPlan(course, mentorshipPlan, requestedSlug) {
    const slug = (requestedSlug != null ? String(requestedSlug) : String(course.slug || '')).toLowerCase().trim();
    const title = ((course.title || '') + '').toLowerCase();
    const yearMatch = slug.match(/integrated-mentorship-(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : null;
    const byYear = year && IMP_PLAN_AMOUNTS_BY_YEAR[year];
    if (byYear) {
        if (mentorshipPlan === 'weekly') return byYear.weekly;
        if (mentorshipPlan === 'daily') return byYear.daily;
    }

    const dp = course.detailPage && typeof course.detailPage === 'object' ? course.detailPage : null;
    const ps = dp && dp.pricingSection ? dp.pricingSection : null;
    if (mentorshipPlan === 'weekly' && ps && ps.weekly && ps.weekly.price != null) {
        return Number(ps.weekly.price);
    }
    if (mentorshipPlan === 'daily' && ps && ps.daily && ps.daily.price != null) {
        return Number(ps.daily.price);
    }
    const isImp2027 =
        slug === 'integrated-mentorship-2027' ||
        (title.includes('integrated') && title.includes('2027'));
    if (isImp2027) {
        if (mentorshipPlan === 'weekly') return 35000;
        if (mentorshipPlan === 'daily') return 60000;
    }
    return null;
}

/**
 * Resolve Mongo course for checkout: prefer valid courseId, else findCourseBySlug (same as GET /course/slug — includes COURSE_ID_BY_SLUG fallback).
 */
const IMP_SLUG_RE = /^integrated-mentorship-20\d{2}$/i;
const UPPCS_SLUG_RE = /^uppcs-20(26|27)-/i;

async function resolveCourseForPayment(courseId, courseSlug) {
    const idStr = courseId != null ? String(courseId).trim() : '';
    if (idStr && mongoose.Types.ObjectId.isValid(idStr)) {
        const byId = await courseService.findCourseById(idStr);
        if (byId) return { course: byId, resolvedCourseId: idStr };
    }
    const slug = courseSlug != null ? String(courseSlug).trim() : '';
    if (slug) {
        const bySlug = await courseService.findCourseBySlug(slug);
        if (bySlug && bySlug._id) {
            return { course: bySlug, resolvedCourseId: String(bySlug._id) };
        }
        const fb = process.env.PAYMENT_FALLBACK_COURSE_OBJECT_ID?.trim();
        if (fb && mongoose.Types.ObjectId.isValid(fb) && IMP_SLUG_RE.test(slug)) {
            const byFb = await courseService.findCourseById(fb);
            if (byFb && byFb._id) {
                logger.info(
                    `paymentService.js <<resolveCourseForPayment>> slug=${slug} → PAYMENT_FALLBACK_COURSE_OBJECT_ID=${fb}`
                );
                return { course: byFb, resolvedCourseId: String(byFb._id) };
            }
        }
        const uppcsFb = process.env.UPPCS_PAYMENT_FALLBACK_COURSE_OBJECT_ID?.trim();
        if (uppcsFb && mongoose.Types.ObjectId.isValid(uppcsFb) && UPPCS_SLUG_RE.test(slug)) {
            const byUppcs = await courseService.findCourseById(uppcsFb);
            if (byUppcs && byUppcs._id) {
                logger.info(
                    `paymentService.js <<resolveCourseForPayment>> slug=${slug} → UPPCS_PAYMENT_FALLBACK_COURSE_OBJECT_ID=${uppcsFb}`
                );
                return { course: byUppcs, resolvedCourseId: String(byUppcs._id) };
            }
        }
    }
    return { course: null, resolvedCourseId: null };
}

exports.initiateCoursePayment = async (data) => {
    const { 
        studentName, mobile, email, courseId, courseSlug, paymentMethod, createdBy,
        isEmi = false, 
        emiDurationMonths,
        mentorshipPlan = null,
        couponCode = null,
    } = data;

    const { course, resolvedCourseId } = await resolveCourseForPayment(courseId, courseSlug);
    if (!course || !resolvedCourseId) {
        throw new Error(
            'Course not found. In MongoDB, set `slug` on the course (e.g. integrated-mentorship-2027), or set COURSE_ID_BY_SLUG={"integrated-mentorship-2027":"<Mongo _id>"} in UPSC-Backend/.env, or set PAYMENT_FALLBACK_COURSE_OBJECT_ID=<Mongo _id> for integrated-mentorship-20xx slugs, then restart the API.'
        );
    }

    logger.info(`paymentService.js <<initiateCoursePayment>> Initiating payment | student=${studentName} courseId=${resolvedCourseId} | isEmi=${isEmi} | plan=${mentorshipPlan || 'default'}`);

    const planAmount = mentorshipPlan ? resolveCourseAmountFromPlan(course, mentorshipPlan, courseSlug) : null;
    const fromPlan =
      planAmount != null && !Number.isNaN(planAmount) && Number.isFinite(Number(planAmount))
        ? Number(planAmount)
        : null;
    const fromSlugFull =
      !mentorshipPlan && courseSlug != null && String(courseSlug).trim()
        ? resolveFullPayAmountBySlug(courseSlug)
        : null;
    const fromCourse = course.sellingPrice != null ? Number(course.sellingPrice) : null;
    let totalCourseAmount =
      fromPlan != null
        ? fromPlan
        : fromSlugFull != null
          ? fromSlugFull
          : fromCourse != null
            ? fromCourse
            : NaN;

    let appliedCouponCode = null;
    let couponDiscountAmount = 0;
    if (couponCode && String(couponCode).trim()) {
        const couponResult = await couponService.applyCoupon({
            code: String(couponCode).trim().toUpperCase(),
            courseId: resolvedCourseId,
            orderValue: totalCourseAmount,
        });
        if (!couponResult?.valid || !couponResult?.pricing) {
            throw new Error(couponResult?.message || 'Invalid coupon code.');
        }
        appliedCouponCode = couponResult.coupon?.code || String(couponCode).trim().toUpperCase();
        couponDiscountAmount = Number(couponResult.pricing.discount_amount || 0);
        totalCourseAmount = Number(couponResult.pricing.final_price ?? totalCourseAmount);
    }

    if (!Number.isFinite(totalCourseAmount) || totalCourseAmount < 0) {
        throw new Error(
            `Invalid payment amount (${String(totalCourseAmount)}). Set course sellingPrice or detailPage.pricingSection for plan "${mentorshipPlan || "default"}".`
        );
    }

    let amountForRazorpayOrder = totalCourseAmount; 
    
    
    let monthlyEmiAmount = 0;
    let emiStatus = null;

    if (isEmi && emiDurationMonths && emiDurationMonths > 1) {
        monthlyEmiAmount = Math.round(totalCourseAmount / emiDurationMonths);
        amountForRazorpayOrder = monthlyEmiAmount; 
        emiStatus = 'ACTIVE';
        logger.info(`EMI plan selected: ${emiDurationMonths} months, Monthly Amount: ${monthlyEmiAmount}`);
    } 

    const orderId = generateOrderId();
    const receiptNumber = generateReceiptNumber();

    const paymentDataFinal = {
        studentName, mobile, email, courseId: resolvedCourseId, orderId,
        amount: totalCourseAmount, 
        couponCode: appliedCouponCode,
        couponDiscountAmount: couponDiscountAmount,
        paymentMethod,
        paymentGateway: RAZORPAY,
        status: PENDING,
        receiptNumber,
        
        isEmi: isEmi,
        emiDurationMonths: emiDurationMonths || null,
        monthlyEmiAmount: monthlyEmiAmount,
        emiStatus: emiStatus,
        installmentsCompleted: 0, 
    };

    const newPayment = await paymentRepo.createPayment(paymentDataFinal);

    // --- Installment Creation (Scalable Approach) ---
    if (isEmi && emiDurationMonths > 1) {
        const installmentsData = generateEmiInstallments(totalCourseAmount, emiDurationMonths, newPayment._id);
        // Installments ko separate collection mein save karen
        await emiInstallmentRepo.createMultipleInstallments(installmentsData); 
        logger.info(`Created ${emiDurationMonths} installments in separate collection for payment ${newPayment._id}`);
    }
    // --- End Installment Creation ---
    
    if (paymentMethod !== CASH && paymentMethod !== CHEQUE) {
        if (Number(amountForRazorpayOrder) === 0) {
            const freeUpdatedPayment = await paymentRepo.updatePaymentStatus(newPayment._id, {
                status: SUCCESS,
                paymentDate: new Date(),
                gatewayResponse: {
                    type: 'FREE_COUPON_CHECKOUT',
                    couponCode: appliedCouponCode,
                    couponDiscountAmount,
                },
            });
            return { payment: freeUpdatedPayment, course, razorpayOrder: null, freeCheckout: true };
        }

        if (!process.env.RAZORPAY_KEY_ID?.trim() || !process.env.RAZORPAY_KEY_SECRET?.trim()) {
            throw new Error(
                "Razorpay is not configured: set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in UPSC-Backend/.env and restart the API."
            );
        }

        logger.info(`paymentService.js <<initiateCoursePayment>> Creating Razorpay order for amount: ${amountForRazorpayOrder}`);

        const amountPaise = Math.round(Number(amountForRazorpayOrder) * 100);
        if (!Number.isFinite(amountPaise) || amountPaise < 100) {
            throw new Error(
                `Razorpay order amount must be at least ₹1 (100 paise). Got ${amountPaise} paise.`
            );
        }

        const razorpayOrderOptions = {
            amount: amountPaise,
            currency: 'INR',
            receipt: receiptNumber,
            notes: {
                studentName,
                courseId: resolvedCourseId,
                paymentId: newPayment._id.toString(), 
                isEmi: isEmi ? 'true' : 'false',
                installmentNumber: isEmi ? '1' : 'full' // Indicate first installment or full payment
            }
        };

        let razorpayOrder;
        try {
            razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);
        } catch (rzpErr) {
            const detail = getErrorMessage(rzpErr);
            logger.error(`paymentService.js <<initiateCoursePayment>> Razorpay orders.create failed: ${detail}`);
            throw new Error(
                detail.includes('Razorpay') ? detail : `Razorpay: ${detail}`
            );
        }
        
        const updatedPayment = await paymentRepo.updatePaymentStatus(newPayment._id, {
            razorpayOrderId: razorpayOrder.id,
            gatewayResponse: razorpayOrder
        });

        return { payment: updatedPayment, course, razorpayOrder };
    }
    
    return { payment: newPayment, course, razorpayOrder: null };
};

exports.verifyCoursePayment = async ({ paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature }) => {
    const payment = await paymentRepo.findPaymentById(paymentId);
    if (!payment) throw new Error('Payment record not found');

    // Security: Signature check
    // Note: The signature logic uses the RZP Order ID stored in the DB (from initiation)
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(`${payment.razorpayOrderId}|${razorpayPaymentId}`) 
        .digest('hex');

    if (generatedSignature !== razorpaySignature) {
        logger.warn('paymentService.js <<verifyCoursePayment>> Razorpay signature mismatch');
        await paymentRepo.updatePaymentStatus(paymentId, { status: 'FAILED' }); // Failed status set करें
        return { verified: false };
    }

    const couponCodeRaw = payment.couponCode != null ? String(payment.couponCode).trim() : '';
    const discountStored = Number(payment.couponDiscountAmount || 0);
    if (couponCodeRaw && discountStored > 0) {
        const cid = payment.courseId;
        const courseIdStr =
            cid && typeof cid === 'object' && cid._id != null ? String(cid._id) : String(cid);
        const orderValueBeforeDiscount = Number(payment.amount) + discountStored;
        const couponResult = await couponService.applyCoupon({
            code: couponCodeRaw,
            courseId: courseIdStr,
            orderValue: orderValueBeforeDiscount,
        });
        if (!couponResult?.valid || !couponResult?.pricing) {
            logger.warn(
                `paymentService.js <<verifyCoursePayment>> Coupon invalid at verify: ${couponResult?.message || 'unknown'} paymentId=${paymentId}`
            );
            await paymentRepo.updatePaymentStatus(paymentId, {
                status: 'FAILED',
                failureReason: couponResult?.message || 'Coupon expired or invalid.',
            });
            return { verified: false };
        }
        const expDisc = Math.round(Number(couponResult.pricing.discount_amount));
        const expFinal = Math.round(Number(couponResult.pricing.final_price));
        if (
            expDisc !== Math.round(discountStored) ||
            expFinal !== Math.round(Number(payment.amount))
        ) {
            logger.warn(`paymentService.js <<verifyCoursePayment>> Coupon pricing mismatch paymentId=${paymentId}`);
            await paymentRepo.updatePaymentStatus(paymentId, {
                status: 'FAILED',
                failureReason: 'Coupon amount mismatch at verification.',
            });
            return { verified: false };
        }
    }

    // --- Verification Update Fields ---
    const updateFields = {
        status: SUCCESS, // Overall payment status is SUCCESS
        razorpayPaymentId,
        razorpaySignature,
        paymentDate: new Date()
    };

    // --- Start: EMI Verification Logic ---
    if (payment.isEmi) {
        // 1. Separate collection mein pehle installment ko find karen
        const firstInstallment = await emiInstallmentRepo.findOneInstallment({ 
            paymentId: payment._id, 
            installmentNumber: 1, 
            status: 'PENDING' 
        });
        
        if (firstInstallment) {
            // 2. Installment record ko PAID set karen
            await emiInstallmentRepo.updateInstallmentStatus(firstInstallment._id, {
                status: 'PAID',
                paidDate: new Date(),
                paymentReferenceId: razorpayPaymentId // RZP ID specific to this installment
            });

            // 3. Main Payment document ke summary fields ko update karen
            updateFields.installmentsCompleted = 1; 
            updateFields.emiStatus = 'ACTIVE'; 
            logger.info(`EMI Payment ${paymentId}: First installment marked PAID.`);
        }
    }
    // --- End: EMI Verification Logic ---

    // Update the main payment record
    await paymentRepo.updatePaymentStatus(paymentId, updateFields);

    const updatedPayment = await paymentRepo.findPaymentById(paymentId);
    
    if (updatedPayment && updatedPayment.status === SUCCESS) {
        try {
            logger.info(`paymentService.js <<verifyCoursePayment>> Sending payment confirmation email to ${updatedPayment.email}`);     
            const emailHtml = generatePaymentConfirmationHTML(updatedPayment);
            await sendEmail({
                to: updatedPayment.email,
                subject: `Payment Confirmation for Course: ${updatedPayment.courseId.title}`,
                html: emailHtml,
            });

        } catch (emailError) {
            logger.error(`paymentService.js <<verifyCoursePayment>> Failed to send confirmation email for paymentId ${paymentId}`, emailError);
        }
    }

    return { verified: true, payment: updatedPayment };
};

exports.getPaymentReceipt = async (paymentId) => {
    return await paymentRepo.findPaymentById(paymentId);
};

exports.getAllPayments = async () => {
    try {
        logger.info('paymentService.js <<getAllPayments>> Fetching all payments');    
        const payments = await paymentRepo.findAllPayments();    
        return payments;      
    } catch (err) {
        logger.error('paymentService.js <<getAllPayments>> Error fetching payments', err);
        throw err;
    }
};

