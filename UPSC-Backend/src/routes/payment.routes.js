const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller.js');

const {verifyTokenAndAdmin}=require('../middlewares/auth.middleware.js')

router.post('/initiate-course-payment', paymentController.initiateCoursePayment);
router.post('/verify-course-payment',paymentController.verifyCoursePayment);
router.get('/payment-receipt/:paymentId',paymentController.getPaymentReceipt);
router.get('/recent-payment',verifyTokenAndAdmin, paymentController.getAllPayment);


module.exports = router;
