const mongoose = require('mongoose');

const emiInstallmentSchema = new mongoose.Schema({
  paymentId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true,
    index: true 
  },
  coursePurchaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CoursePurchase',
    default: null,
    index: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },
  installmentNumber: { type: Number, required: true, min: 1 }, 
  amountDue: { type: Number, required: true, min: 0 },
  dueDate: { type: Date, required: true, index: true }, 
  status: { 
    type: String, 
    enum: ['PENDING', 'PAID', 'LATE', 'FAILED'], 
    default: 'PENDING' 
  },
  paymentReferenceId: { type: String }, 
  paidDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmiInstallment', emiInstallmentSchema);