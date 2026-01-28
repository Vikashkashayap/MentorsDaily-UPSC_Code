const coursePurchaseRepo = require('../repositories/coursePurchase.repository');
const courseService = require('./course.service');
const emiInstallmentRepo = require('../repositories/emi.installment.repository');
const logger = require('../utility/logger');
const razorpay = require('../utility/razorpay');
const crypto = require('crypto');
const { sendEmail } = require('../utility/email.service');
const { generateCoursePurchaseEmail } = require('../utility/paymentConfirmationEmail');
const { RAZORPAY, PENDING, SUCCESS } = require('../enums/enum');
const Payment = require('../models/payment.model');
const CoursePurchase = require('../models/coursePurchase.model');
const EmiInstallment = require('../models/emi.model');

const generateOrderId = () => Math.random().toString(36).substring(2, 11);
const generateReceiptNumber = () => `rcpt_${Math.random().toString(36).substring(2, 11)}`;

const generateEmiInstallments = (totalAmount, months, paymentId, userId = null, coursePurchaseId = null) => {
  const installments = [];
  const monthlyAmount = Math.round(totalAmount / months);
  const firstPaymentDate = new Date();

  for (let i = 1; i <= months; i++) {
    const dueDate = new Date(firstPaymentDate);
    dueDate.setMonth(firstPaymentDate.getMonth() + i);

    installments.push({
      paymentId: paymentId,
      coursePurchaseId: coursePurchaseId,
      userId: userId,
      installmentNumber: i,
      dueDate: dueDate,
      amountDue: monthlyAmount,
      status: 'PENDING'
    });
  }

  // Adjust last installment for rounding differences
  const totalEmiSum = installments.reduce((sum, inst) => sum + inst.amountDue, 0);
  const difference = totalAmount - totalEmiSum;
  if (difference !== 0 && installments.length > 0) {
    installments[installments.length - 1].amountDue += difference;
  }

  return installments;
};

// ==================== BUY COURSE ====================
exports.buyCourse = async (data) => {
  const {
    courseId,
    userId = null,
    name,
    email,
    mobile,
    amount,
    paymentMethod,
    isEmi = false,
    emiDurationMonths = null
  } = data;

  logger.info(`buyCourse >> courseId=${courseId} | userId=${userId || 'guest'} | isEmi=${isEmi}`);

  // Validation: EMI requires registered user
  if (isEmi && !userId) {
    throw new Error('EMI option is only available for registered users. Please login first.');
  }

  if (isEmi && (!emiDurationMonths || emiDurationMonths < 2)) {
    throw new Error('EMI duration must be at least 2 months');
  }

  // Fetch course
  const course = await courseService.findCourseById(courseId);
  if (!course) throw new Error('Course not found');

  // Validate amount
  if (amount !== course.sellingPrice) {
    throw new Error(`Amount mismatch. Course price is ₹${course.sellingPrice}`);
  }

  // Check duplicate purchase (for registered users only)
  if (userId) {
    const existing = await CoursePurchase.findOne({
      userId,
      courseId,
      status: { $in: ['PENDING', 'ACTIVE', 'COMPLETED'] }
    });
    if (existing) {
      throw new Error('You have already purchased this course');
    }
  }

  const orderId = generateOrderId();
  const receiptNumber = generateReceiptNumber();

  // Calculate amounts
  const totalAmount = course.sellingPrice;
  let amountToPay = totalAmount; // Full amount for non-EMI
  let monthlyAmount = 0;

  if (isEmi) {
    monthlyAmount = Math.round(totalAmount / emiDurationMonths);
    amountToPay = monthlyAmount;
    logger.info(`EMI: ${emiDurationMonths} months, Monthly: ₹${monthlyAmount}`);
  }

  // Step 1: Create Payment record
  const payment = await Payment.create({
    userId: userId || null,
    studentName: name,
    mobile,
    email,
    courseId,
    orderId,
    amount: totalAmount,
    paymentMethod,
    paymentGateway: RAZORPAY,
    status: PENDING,
    receiptNumber,
    isEmi,
    emiDurationMonths: isEmi ? emiDurationMonths : null,
    monthlyEmiAmount: isEmi ? monthlyAmount : 0,
    emiStatus: isEmi ? 'ACTIVE' : null,
    installmentsCompleted: 0
  });

  logger.info(`Payment created: ${payment._id}`);

  // Step 2: Create CoursePurchase record
  const purchase = await CoursePurchase.create({
    courseId,
    userId: userId || null,
    guestInfo: userId ? null : { name, email, mobile },
    paymentId: payment._id,
    totalAmount,
    isEmi,
    emiDurationMonths: isEmi ? emiDurationMonths : null,
    status: 'PENDING'
  });

  logger.info(`CoursePurchase created: ${purchase._id}`);

  // Step 3: Create EMI Installments (if EMI)
  if (isEmi) {
    const installments = generateEmiInstallments(
      totalAmount,
      emiDurationMonths,
      payment._id,
      userId,
      purchase._id
    );

    await EmiInstallment.insertMany(installments);
    logger.info(`Created ${emiDurationMonths} EMI installments`);
  }

  // Step 4: Create Razorpay Order
  const razorpayOrder = await razorpay.orders.create({
    amount: parseInt(amountToPay * 100),
    currency: 'INR',
    receipt: receiptNumber,
    notes: {
      studentName: name,
      email,
      mobile,
      courseId: courseId.toString(),
      paymentId: payment._id.toString(),
      purchaseId: purchase._id.toString(),
      isEmi: isEmi.toString(),
      installmentNumber: isEmi ? '1' : 'full'
    }
  });

  // Update payment with razorpay order ID
  await Payment.findByIdAndUpdate(payment._id, {
    razorpayOrderId: razorpayOrder.id,
    gatewayResponse: razorpayOrder
  });

  logger.info(`Razorpay order created: ${razorpayOrder.id}`);

  return {
    payment: await Payment.findById(payment._id),
    purchase,
    course,
    razorpayOrder
  };
};

// ==================== VERIFY PURCHASE ====================
exports.verifyPurchase = async ({ paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature }) => {
  logger.info(`verifyPurchase >> paymentId=${paymentId}`);

  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error('Payment record not found');

  // Verify Razorpay signature
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${payment.razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  if (generatedSignature !== razorpaySignature) {
    logger.warn('Razorpay signature mismatch');
    await Payment.findByIdAndUpdate(paymentId, { status: 'FAILED' });
    return { verified: false };
  }

  // Update Payment status
  await Payment.findByIdAndUpdate(paymentId, {
    status: SUCCESS,
    razorpayPaymentId,
    razorpaySignature,
    paymentDate: new Date()
  });

  // Find and update CoursePurchase
  const purchase = await CoursePurchase.findOne({ paymentId: payment._id });
  if (!purchase) {
    throw new Error('Purchase record not found');
  }

  await CoursePurchase.findByIdAndUpdate(purchase._id, {
    status: 'ACTIVE',
    updatedAt: new Date()
  });

  logger.info(`CoursePurchase activated: ${purchase._id}`);

  // If EMI: Mark first installment as PAID
  if (payment.isEmi) {
    const firstInstallment = await EmiInstallment.findOne({
      paymentId: payment._id,
      installmentNumber: 1
    });

    if (firstInstallment) {
      await EmiInstallment.findByIdAndUpdate(firstInstallment._id, {
        status: 'PAID',
        paidDate: new Date(),
        paymentReferenceId: razorpayPaymentId
      });

      await Payment.findByIdAndUpdate(paymentId, {
        installmentsCompleted: 1
      });

      logger.info(`First EMI installment marked PAID`);
    }
  }

  // Send confirmation email
  const updatedPayment = await Payment.findById(paymentId).populate('courseId');
  if (updatedPayment && updatedPayment.status === SUCCESS) {
    try {
      const emailHtml = generateCoursePurchaseEmail(updatedPayment);
      await sendEmail({
        to: updatedPayment.email,
        subject: `🎓 Course Purchase Confirmed - ${updatedPayment.courseId.title}`,
        html: emailHtml
      });
      logger.info(`Confirmation email sent to ${updatedPayment.email}`);
    } catch (emailError) {
      logger.error(`Email failed: ${emailError.message}`);
    }
  }

  const responsePayment = {
    ...updatedPayment.toObject(),
    amountPaid: updatedPayment.isEmi ? updatedPayment.monthlyEmiAmount : updatedPayment.amount
  };

  return {
    verified: true,
    payment: responsePayment,
    purchase: await CoursePurchase.findById(purchase._id)
  };
};

// ==================== GET MY PURCHASES ====================
exports.getMyPurchases = async (userId) => {
  logger.info(`getMyPurchases >> userId=${userId}`);
  return await coursePurchaseRepo.findPurchasesByUserId(userId);
};

// ==================== GET PURCHASE BY ID ====================
exports.getPurchaseById = async (purchaseId) => {
  return await coursePurchaseRepo.findPurchaseById(purchaseId);
};

// ==================== GET ALL SALES SUMMARY ====================
exports.getAllSalesSummary = async (userId = null) => {
  logger.info(`getAllSalesSummary >> userId=${userId || 'ALL'}`);

  const query = {};
  if (userId) {
    query.userId = userId;
  }

  const purchases = await CoursePurchase.find(query)
    .populate('userId', 'name email phone')
    .populate('courseId', 'title sellingPrice thumbnail')
    .populate({
      path: 'courseId',
      populate: {
        path: 'thumbnail',
        select: '_id filename contentType'
      }
    })
    .populate('paymentId')
    .sort({ purchaseDate: -1 });

  logger.info(`Found ${purchases.length} purchases`);
  return purchases;
};
