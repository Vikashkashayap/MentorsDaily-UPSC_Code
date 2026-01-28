const express = require('express');
const router = express.Router();
const coursePurchaseController = require('../controllers/coursePurchase.controller');
const { auth, optionalAuth } = require('../middlewares/auth.middleware');

router.post('/course-purchase/buy', optionalAuth, coursePurchaseController.buyCourse);
router.post('/course-purchase/verify-purchase', coursePurchaseController.verifyPurchase);
router.get('/course-purchase/my-purchases', auth, coursePurchaseController.getMyPurchases);
router.get('/course-purchase/purchase/:purchaseId', auth, coursePurchaseController.getPurchaseById);

module.exports = router;
