const emiService = require('../services/emi.service');
const logger = require('../utility/logger');
const { setBadRequest, setCreateSuccess, setServerError, setSuccess } = require('../utility/responseHelper');

exports.payInstallment = async (req, res) => {
  try {
    const { installmentId } = req.body;

    if (!installmentId) {
      logger.error('emiController.js <<payInstallment>> Missing installmentId');
      return setBadRequest(res, 'Missing required field: installmentId');
    }

    const result = await emiService.payInstallment(installmentId);

    logger.info('emiController.js <<payInstallment>> Installment payment initiated');

    return setCreateSuccess(res, {
      message: 'Installment payment initiated successfully',
      data: {
        installmentId: result.installment._id,
        installmentNumber: result.installment.installmentNumber,
        amountDue: result.installment.amountDue,
        dueDate: result.installment.dueDate,
        razorpayOrder: {
          id: result.razorpayOrder.id,
          amount: result.razorpayOrder.amount,
          currency: result.razorpayOrder.currency
        }
      }
    });
  } catch (error) {
    logger.error('emiController.js <<payInstallment>> Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.verifyInstallmentPayment = async (req, res) => {
  try {
    const { installmentId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!installmentId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      logger.error('emiController.js <<verifyInstallmentPayment>> Missing fields');
      return setBadRequest(res, 'Missing payment verification fields');
    }

    const verificationResult = await emiService.verifyInstallmentPayment({
      installmentId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature
    });

    if (verificationResult.verified) {
      return setSuccess(res, {
        message: 'Installment payment verified successfully',
        data: {
          installment: verificationResult.installment
        }
      });
    } else {
      return setBadRequest(res, { message: 'Payment verification failed' });
    }
  } catch (error) {
    logger.error('emiController.js <<verifyInstallmentPayment>> Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.getInstallmentsByCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    if (!courseId) {
      return setBadRequest(res, 'Course ID is required');
    }

    const installments = await emiService.getInstallmentsByCourse(userId, courseId);

    return setSuccess(res, {
      message: 'Course installments fetched successfully',
      data: installments
    });
  } catch (error) {
    logger.error('emiController.js <<getInstallmentsByCourse>> Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.getInstallmentsByPurchase = async (req, res) => {
  try {
    const { purchaseId } = req.params;

    if (!purchaseId) {
      return setBadRequest(res, 'Purchase ID is required');
    }

    const installments = await emiService.getInstallmentsByPurchase(purchaseId);

    return setSuccess(res, {
      message: 'Purchase installments fetched successfully',
      data: installments
    });
  } catch (error) {
    logger.error('emiController.js <<getInstallmentsByPurchase>> Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.getEmiSummary = async (req, res) => {
  try {
    const userId = req.query.userId || null;

    const summary = await emiService.getEmiSummary(userId);

    return setSuccess(res, {
      message: userId ? 'User EMI summary fetched successfully' : 'All EMI summaries fetched successfully',
      data: summary
    });
  } catch (error) {
    logger.error('emiController.js <<getEmiSummary>> Error -', error.message);
    return setServerError(res, error.message);
  }
};
