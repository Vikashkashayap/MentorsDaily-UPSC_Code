const paymentRepo = require('../repositories/payment.repository');
const courseService = require('./course.service');

const emiInstallmentRepo = require('../repositories/emi.installment.repository'); 
const logger = require('../utility/logger');
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


exports.initiateCoursePayment = async (data) => {
    const { 
        studentName, mobile, email, courseId, paymentMethod, createdBy,
        isEmi = false, 
        emiDurationMonths 
    } = data;

    logger.info(`paymentService.js <<initiateCoursePayment>> Initiating payment | student=${studentName} courseId=${courseId} | isEmi=${isEmi}`);

    const course = await courseService.findCourseById(courseId);
    if (!course) throw new Error('Course not found');

    const totalCourseAmount = course.sellingPrice;
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
        studentName, mobile, email, courseId, orderId,
        amount: totalCourseAmount, 
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
        logger.info(`paymentService.js <<initiateCoursePayment>> Creating Razorpay order for amount: ${amountForRazorpayOrder}`);

        const razorpayOrderOptions = {
            amount: parseInt(amountForRazorpayOrder * 100), // Amount in smallest unit (Paisa)
            currency: 'INR',
            receipt: receiptNumber,
            notes: {
                studentName,
                courseId,
                paymentId: newPayment._id.toString(), 
                isEmi: isEmi ? 'true' : 'false',
                installmentNumber: isEmi ? '1' : 'full' // Indicate first installment or full payment
            }
        };

        const razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);
        
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

