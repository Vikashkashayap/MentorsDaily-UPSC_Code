const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },
  studentName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  
  orderId: { type: String, required: true, unique: true },
  razorpayOrderId: { type: String, unique: true, sparse: true },
  razorpayPaymentId: { type: String, unique: true, sparse: true },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true, min: 0 }, 
  currency: { type: String, default: 'INR' },
  paymentMethod: {
    type: String,
    enum: ['CARD', 'NETBANKING', 'UPI', 'WALLET', 'CASH', 'CHEQUE'],
    required: true
  },
  paymentGateway: {
    type: String,
    enum: ['RAZORPAY', 'MANUAL'],
    default: 'RAZORPAY'
  },
  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'],
    default: 'PENDING'
  },
  
  isEmi: { type: Boolean, default: false },
  installmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmiInstallment',
    default: null,
    index: true
  },
  emiDurationMonths: { type: Number },
  monthlyEmiAmount: { type: Number }, 
  emiStatus: {
    type: String,
    enum: ['ACTIVE', 'COMPLETED', 'LATE', 'CANCELLED'],
    default: null 
  },
  installmentsCompleted: { type: Number, default: 0 },
  
  paymentDate: { type: Date },
  failureReason: { type: String },
  receiptNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);