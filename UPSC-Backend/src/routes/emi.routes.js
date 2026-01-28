const express = require('express');
const router = express.Router();
const emiController = require('../controllers/emi.controller');
const { auth, verifyTokenAndAdmin } = require('../middlewares/auth.middleware');

router.post('/emi/pay-installment', emiController.payInstallment);
router.post('/emi/verify-installment-payment', emiController.verifyInstallmentPayment);

router.get('/emi/:courseId/installments', auth, emiController.getInstallmentsByCourse);
router.get('/emi/summary', verifyTokenAndAdmin, emiController.getEmiSummary);
router.get('/emi/purchase/:purchaseId/installments', verifyTokenAndAdmin, emiController.getInstallmentsByPurchase);

module.exports = router;
