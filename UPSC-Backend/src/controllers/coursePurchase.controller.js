const coursePurchaseService = require('../services/coursePurchase.service');
const logger = require('../utility/logger');
const { setBadRequest, setCreateSuccess, setServerError, setSuccess } = require('../utility/responseHelper');

exports.buyCourse = async (req, res) => {
  try {
    const { 
      courseId, 
      name, 
      email, 
      mobile, 
      amount,
      paymentMethod, 
      isEmi, 
      emiDurationMonths 
    } = req.body;

    // Get userId from token (if logged in)
    const userId = req.user?.id || null;

    // Validation
    if (!courseId || !name || !email || !mobile || !amount || !paymentMethod) {
      logger.error('coursePurchaseController.js <<buyCourse>> Missing required fields');
      return setBadRequest(res, 'Missing required fields: courseId, name, email, mobile, amount, or paymentMethod');
    }

    // EMI validation - requires logged in user
    if (isEmi) {
      if (!userId) {
        logger.error('coursePurchaseController.js <<buyCourse>> EMI requires registered user');
        return setBadRequest(res, 'EMI option is only available for registered users. Please login first.');
      }
      
      if (!emiDurationMonths || parseInt(emiDurationMonths) < 2) {
        logger.error('coursePurchaseController.js <<buyCourse>> Invalid EMI duration');
        return setBadRequest(res, 'EMI duration must be at least 2 months');
      }
    }

    const result = await coursePurchaseService.buyCourse({
      courseId,
      userId: userId,
      name,
      email,
      mobile,
      amount: parseFloat(amount),
      paymentMethod,
      isEmi: !!isEmi,
      emiDurationMonths: parseInt(emiDurationMonths) || null
    });

    const { isEmi: emiSelected } = req.body;
    
    logger.info('coursePurchaseController.js <<buyCourse>> Course purchase initiated successfully');

    return setCreateSuccess(res, {
      message: emiSelected ? 'Course purchase initiated. Pay first EMI installment now.' : 'Course purchase initiated. Pay full amount now.',
      data: {
        paymentId: result.payment._id,
        course: {
          _id: result.course._id,
          title: result.course.title,
          sellingPrice: result.course.sellingPrice,
          thumbnail: result.course.thumbnail
        },
        razorpayOrder: {
          id: result.razorpayOrder.id,
          amount: result.razorpayOrder.amount,
          currency: result.razorpayOrder.currency
        },
        paymentDetails: {
          isEmi: result.payment.isEmi,
          emiDurationMonths: result.payment.emiDurationMonths,
          monthlyEmiAmount: result.payment.monthlyEmiAmount,
          totalAmount: result.payment.amount,
          amountToPay: emiSelected ? result.payment.monthlyEmiAmount : result.payment.amount
        }
      }
    });
  } catch (error) {
    logger.error('coursePurchaseController.js <<buyCourse>> Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.verifyPurchase = async (req, res) => {
  try {
    const { paymentId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    if (!paymentId || !razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      logger.error('coursePurchaseController.js <<verifyPurchase>> Missing fields');
      return setBadRequest(res, 'Missing payment verification fields');
    }

    const verificationResult = await coursePurchaseService.verifyPurchase({
      paymentId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature
    });

    if (verificationResult.verified) {
      return setSuccess(res, {
        message: 'Course purchased successfully',
        data: {
          payment: verificationResult.payment,
          purchase: verificationResult.purchase
        }
      });
    } else {
      return setBadRequest(res, { message: 'Payment verification failed' });
    }
  } catch (error) {
    logger.error('coursePurchaseController.js <<verifyPurchase>> Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.getMyPurchases = async (req, res) => {
  try {
    const userId = req.user.id;

    const purchases = await coursePurchaseService.getMyPurchases(userId);

    return setSuccess(res, {
      message: 'Purchases fetched successfully',
      data: purchases
    });
  } catch (error) {
    logger.error('coursePurchaseController.js <<getMyPurchases>> Error -', error.message);
    return setServerError(res, error.message);
  }
};

exports.getPurchaseById = async (req, res) => {
  try {
    const { purchaseId } = req.params;

    const purchase = await coursePurchaseService.getPurchaseById(purchaseId);

    if (!purchase) {
      return setBadRequest(res, 'Purchase not found');
    }

    return setSuccess(res, {
      message: 'Purchase details fetched successfully',
      data: purchase
    });
  } catch (error) {
    logger.error('coursePurchaseController.js <<getPurchaseById>> Error -', error.message);
    return setServerError(res, error.message);
  }
};
