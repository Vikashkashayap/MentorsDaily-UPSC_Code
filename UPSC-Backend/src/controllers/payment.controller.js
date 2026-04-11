const paymentService = require('../services/payment.service');
const logger = require('../utility/logger');
const { getErrorMessage } = require('../utility/errorMessage');

const { setBadRequest, setCreateSuccess, setServerError, setSuccess, setNotFoundError } = require('../utility/responseHelper');

exports.initiateCoursePayment = async (req, res) => {
  try {
    const {
      studentName, mobile, email, courseId, courseSlug, paymentMethod,
      isEmi,
      emiDurationMonths,
      mentorshipPlan,
    } = req.body;

    const hasCourseId = courseId != null && String(courseId).trim() !== '';
    const hasCourseSlug = courseSlug != null && String(courseSlug).trim() !== '';

    if (!studentName || !mobile || !email || !paymentMethod) {
      logger.error('paymentController.js < initiateCoursePayment: Missing required fields');
      return setBadRequest(res, 'Missing required fields: studentName, mobile, email, or paymentMethod');
    }
    if (!hasCourseId && !hasCourseSlug) {
      logger.error('paymentController.js < initiateCoursePayment: Missing courseId and courseSlug');
      return setBadRequest(res, 'Missing courseId or courseSlug (slug is enough if the course exists in the catalog)');
    }


    if (isEmi && (!emiDurationMonths || parseInt(emiDurationMonths) < 2)) {
      logger.error('paymentController.js < initiateCoursePayment: Invalid EMI duration specified.');
      return setBadRequest(res, 'EMI duration must be specified and be at least 2 months.');
    }

    const paymentResult = await paymentService.initiateCoursePayment({
      studentName,
      mobile,
      email,
      courseId: hasCourseId ? String(courseId).trim() : undefined,
      courseSlug: hasCourseSlug ? String(courseSlug).trim() : undefined,
      paymentMethod,

      isEmi: !!isEmi,
      emiDurationMonths: parseInt(emiDurationMonths) || null,
      mentorshipPlan: mentorshipPlan === 'weekly' || mentorshipPlan === 'daily' ? mentorshipPlan : null,
    });

    logger.info('paymentController.js < initiateCoursePayment: Payment initiated successfully');

    return setCreateSuccess(res, {
      message: 'Course payment initiated successfully',
      payment: paymentResult.payment,
      course: paymentResult.course,
      razorpayOrder: paymentResult.razorpayOrder
    });
  } catch (error) {
    const msg = getErrorMessage(error);
    logger.error(`paymentController.js < initiateCoursePayment: ${msg}`);
    return setServerError(res, msg);
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
    const msg = getErrorMessage(error);
    logger.error(`paymentController.js < verifyCoursePayment: ${msg}`);
    return setServerError(res, msg);
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
    const msg = getErrorMessage(error);
    logger.error(`paymentController.js < getPaymentReceipt: ${msg}`);
    return setServerError(res, msg);
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

