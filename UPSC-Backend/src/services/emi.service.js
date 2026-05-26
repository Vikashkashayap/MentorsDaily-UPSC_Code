const emiInstallmentRepo = require('../repositories/emi.installment.repository');
const logger = require('../utility/logger');
const razorpay = require('../utility/razorpay');
const crypto = require('crypto');
const Payment = require('../models/payment.model');
const CoursePurchase = require('../models/coursePurchase.model');
const EmiInstallment = require('../models/emi.model');
const { generateInstallmentPaymentEmail } = require('../utility/paymentConfirmationEmail');
const { sendEmail } = require('../utility/email.service');

const generateReceiptNumber = () => `emi_rcpt_${Math.random().toString(36).substring(2, 11)}`;
const generateOrderId = () => Math.random().toString(36).substring(2, 11);

exports.payInstallment = async (installmentId) => {
  logger.info(`payInstallment >> installmentId=${installmentId}`);

  const installment = await emiInstallmentRepo.findInstallmentById(installmentId);
  if (!installment) throw new Error('Installment not found');

  if (installment.status === 'PAID') {
    throw new Error('This installment has already been paid');
  }

  const originalPayment = installment.paymentId;
  if (!originalPayment) throw new Error('Original payment record not found');

  const receiptNumber = generateReceiptNumber();
  const orderId = generateOrderId();

  logger.debug(`Creating payment for installment #${installment.installmentNumber} | Amount: ₹${installment.amountDue}`);

  // Create new Payment record for this installment
  const installmentPaymentData = {
    userId: installment.userId || null,
    studentName: originalPayment.studentName,
    mobile: originalPayment.mobile,
    email: originalPayment.email,
    courseId: originalPayment.courseId,
    orderId: orderId,
    amount: installment.amountDue,
    currency: 'INR',
    paymentMethod: originalPayment.paymentMethod,
    paymentGateway: 'RAZORPAY',
    status: 'PENDING',
    receiptNumber: receiptNumber,
    isEmi: true,
    installmentId: installment._id,
    emiDurationMonths: originalPayment.emiDurationMonths,
    monthlyEmiAmount: installment.amountDue
  };

  const newPayment = await Payment.create(installmentPaymentData);
  logger.info(`Payment created: ${newPayment._id}`);

  const razorpayOrderOptions = {
    amount: parseInt(installment.amountDue * 100),
    currency: 'INR',
    receipt: receiptNumber,
    notes: {
      installmentId: installment._id.toString(),
      paymentId: newPayment._id.toString(),
      originalPaymentId: originalPayment._id.toString(),
      installmentNumber: installment.installmentNumber.toString(),
      courseId: originalPayment.courseId.toString()
    }
  };

  const razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);

  // Update payment with razorpay order ID
  await Payment.findByIdAndUpdate(newPayment._id, {
    razorpayOrderId: razorpayOrder.id
  });

  logger.info(`Razorpay order created for installment ${installmentId}: ${razorpayOrder.id}`);

  return {
    installment,
    razorpayOrder,
    payment: newPayment
  };
};

exports.verifyInstallmentPayment = async ({ installmentId, razorpayPaymentId, razorpayOrderId, razorpaySignature }) => {
  logger.info(`verifyInstallmentPayment >> installmentId=${installmentId}`);

  const installment = await emiInstallmentRepo.findInstallmentById(installmentId);
  if (!installment) throw new Error('Installment not found');

  const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  if (generatedSignature !== razorpaySignature) {
    logger.warn('Razorpay signature mismatch');
    return { verified: false };
  }

  logger.debug('Signature verified successfully');

  // Find the payment record for this installment
  const installmentPayment = await Payment.findOne({
    installmentId: installment._id,
    razorpayOrderId: razorpayOrderId
  });

  if (!installmentPayment) {
    throw new Error('Payment record not found for this installment');
  }

  // Update installment payment record
  await Payment.findByIdAndUpdate(installmentPayment._id, {
    status: 'SUCCESS',
    razorpayPaymentId: razorpayPaymentId,
    razorpaySignature: razorpaySignature,
    paymentDate: new Date()
  });

  // Update installment status
  await emiInstallmentRepo.updateInstallmentStatus(installment._id, {
    status: 'PAID',
    paidDate: new Date(),
    paymentReferenceId: razorpayPaymentId
  });

  logger.info(`Installment marked as PAID`);

  // Update original payment's installment count
  const originalPayment = await Payment.findById(installment.paymentId);
  if (originalPayment) {
    const allInstallments = await emiInstallmentRepo.findInstallmentsByPaymentId(originalPayment._id);
    const paidCount = allInstallments.filter(inst => inst.status === 'PAID').length;

    const updateFields = {
      installmentsCompleted: paidCount
    };

    if (paidCount === allInstallments.length) {
      updateFields.emiStatus = 'COMPLETED';
      logger.info(`All installments completed! 🎉`);

      await CoursePurchase.findOneAndUpdate(
        { paymentId: originalPayment._id },
        { status: 'COMPLETED', updatedAt: new Date() }
      );
      logger.debug('CoursePurchase status updated to COMPLETED');
    }

    await Payment.findByIdAndUpdate(originalPayment._id, updateFields);
  }

  // Fetch updated data with proper population
  const updatedInstallment = await emiInstallmentRepo.findInstallmentById(installmentId);
  const updatedPayment = await Payment.findById(installmentPayment._id).populate('courseId');
  const updatedOriginalPayment = await Payment.findById(originalPayment._id).populate('courseId');

  // Send installment payment email
  try {
    const emailHtml = generateInstallmentPaymentEmail({
      installment: updatedInstallment,
      payment: updatedPayment,
      originalPayment: updatedOriginalPayment
    });

    await sendEmail({
      to: updatedPayment.email,
      subject: `💳 EMI Payment Successful - Installment ${updatedInstallment.installmentNumber}`,
      html: emailHtml
    });

    logger.info(`Installment payment email sent to ${updatedPayment.email}`);
  } catch (emailError) {
    logger.error(`Failed to send installment email: ${emailError.message}`);
  }

  return {
    verified: true,
    installment: updatedInstallment,
    payment: updatedPayment,
    summary: {
      installmentNumber: updatedInstallment.installmentNumber,
      totalInstallments: updatedOriginalPayment.emiDurationMonths,
      amountPaid: updatedInstallment.amountDue,
      totalPaid: updatedOriginalPayment.monthlyEmiAmount * updatedOriginalPayment.installmentsCompleted,
      totalAmount: updatedOriginalPayment.amount,
      remainingAmount: updatedOriginalPayment.amount - (updatedOriginalPayment.monthlyEmiAmount * updatedOriginalPayment.installmentsCompleted),
      pendingInstallments: updatedOriginalPayment.emiDurationMonths - updatedOriginalPayment.installmentsCompleted,
      courseName: updatedOriginalPayment.courseId?.title || 'N/A'
    }
  };
};
exports.getInstallmentsByCourse = async (userId, courseId) => {
  logger.info(`getInstallmentsByCourse >> userId=${userId}, courseId=${courseId}`);

  // Find purchase for this user and course
  const purchase = await CoursePurchase.findOne({ userId, courseId });

  if (!purchase) {
    throw new Error('No purchase found for this course');
  }

  // Get all installments for this purchase
  const installments = await EmiInstallment.find({
    coursePurchaseId: purchase._id
  })
    .sort({ installmentNumber: 1 })
    .populate({
      path: 'paymentId',
      populate: {
        path: 'courseId',
        select: 'title sellingPrice'
      }
    });

  return installments;
};

exports.getInstallmentsByPurchase = async (purchaseId) => {
  logger.info(`getInstallmentsByPurchase >> purchaseId=${purchaseId}`);

  // Get all installments for this purchase
  const installments = await EmiInstallment.find({
    coursePurchaseId: purchaseId
  })
    .sort({ installmentNumber: 1 })
    .select('installmentNumber amountDue dueDate status paidDate paymentReferenceId');

  if (!installments || installments.length === 0) {
    throw new Error('No installments found for this purchase');
  }

  // Clean response - only essential fields
  const cleanedInstallments = installments.map(inst => ({
    _id: inst._id,
    installmentNumber: inst.installmentNumber,
    amountDue: inst.amountDue,
    dueDate: inst.dueDate,
    status: inst.status,
    paidDate: inst.paidDate || null,
    paymentReferenceId: inst.paymentReferenceId || null
  }));

  return cleanedInstallments;
};

exports.getEmiSummary = async (userId = null) => {
  logger.info(`getEmiSummary >> userId=${userId || 'ALL'}`);

  const query = {};
  if (userId) {
    query.userId = userId;
  }

  const purchases = await CoursePurchase.find(query)
    .populate('userId', 'name email phone')
    .populate('courseId', 'title sellingPrice')
    .populate('paymentId', 'amount status paymentDate emiDurationMonths monthlyEmiAmount emiStatus installmentsCompleted')
    .select('_id courseId userId guestInfo totalAmount isEmi emiDurationMonths status purchaseDate')
    .sort({ purchaseDate: -1 })
    .lean();

  logger.info(`Found ${purchases.length} purchases`);
  return purchases;
};
