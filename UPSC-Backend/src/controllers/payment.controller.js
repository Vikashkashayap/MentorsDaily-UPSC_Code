const paymentService = require('../services/payment.service');
const logger = require('../utility/logger');

const { setBadRequest, setCreateSuccess, setServerError, setSuccess, setNotFoundError } = require('../utility/responseHelper');

exports.initiateCoursePayment = async (req, res) => {
  try {
    const {
      studentName, mobile, email, courseId, paymentMethod,
      isEmi,
      emiDurationMonths
    } = req.body;

    if (!studentName || !mobile || !email || !courseId || !paymentMethod) {
      logger.error('paymentController.js < initiateCoursePayment: Missing required fields');
      return setBadRequest(res, 'Missing required fields: studentName, mobile, email, courseId, or paymentMethod');
    }


    if (isEmi && (!emiDurationMonths || parseInt(emiDurationMonths) < 2)) {
      logger.error('paymentController.js < initiateCoursePayment: Invalid EMI duration specified.');
      return setBadRequest(res, 'EMI duration must be specified and be at least 2 months.');
    }

    const paymentResult = await paymentService.initiateCoursePayment({
      studentName,
      mobile,
      email,
      courseId,
      paymentMethod,

      isEmi: !!isEmi,
      emiDurationMonths: parseInt(emiDurationMonths) || null
    });

    logger.info('paymentController.js < initiateCoursePayment: Payment initiated successfully');

    return setCreateSuccess(res, {
      message: 'Course payment initiated successfully',
      payment: paymentResult.payment,
      course: paymentResult.course,
      razorpayOrder: paymentResult.razorpayOrder
    });
  } catch (error) {
    logger.error('paymentController.js < initiateCoursePayment: Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.verifyCoursePayment = async (req, res) => {
  try {
    const { paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!paymentId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      logger.error('paymentController.js < verifyCoursePayment: Missing fields');
      return setBadRequest(res, 'Missing payment verification fields');
    }

    const verificationResult = await paymentService.verifyCoursePayment({
      paymentId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature
    });

    if (verificationResult.verified) {
      return setSuccess(res, { message: 'Payment verified successfully', payment: verificationResult.payment });
    } else {
      return setBadRequest(res, { message: 'Payment verification failed' });
    }
  } catch (error) {
    logger.error('paymentController.js < verifyCoursePayment: Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.getPaymentReceipt = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const payment = await paymentService.getPaymentReceipt(paymentId);
    if (!payment) return setNotFoundError(res, 'Payment not found');

    return setSuccess(res, {
      message: 'Payment receipt fetched successfully',
      receipt: {
        paymentId: payment._id,
        orderId: payment.orderId,
        studentName: payment.studentName,
        courseId: payment.courseId,
        amountPaid: payment.isEmi ? payment.monthlyEmiAmount : payment.amount,
        totalAmount: payment.amount,
        isEmi: payment.isEmi,
        installmentNumber: payment.installmentsCompleted,
        emiDurationMonths: payment.emiDurationMonths,
        paymentDate: payment.paymentDate,
        status: payment.status
      }
    });
  } catch (error) {
    logger.error('paymentController.js < getPaymentReceipt: Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.getAllPayment = async (req, res) => {
  try {
    logger.info('paymentController.js <<getAllPayment>> Request received');

    const payments = await paymentService.getAllPayments();

    return setSuccess(res, {
      message: 'Payments retrieved successfully',
      data: payments,
    });

  } catch (error) {
    logger.error(`paymentController.js <<getAllPayment>> Error: ${error.message}`);
    return setServerError(res, 'An error occurred while fetching payments.');
  }
};

