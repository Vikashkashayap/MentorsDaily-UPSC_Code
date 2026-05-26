const mongoose = require('mongoose');

const coursePurchaseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },
  guestInfo: {
    name: { type: String },
    email: { type: String },
    mobile: { type: String }
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  isEmi: {
    type: Boolean,
    default: false
  },
  emiDurationMonths: {
    type: Number,
    default: null
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'COMPLETED', 'CANCELLED','PENDING'],
    default: 'ACTIVE'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

coursePurchaseSchema.index({ userId: 1, courseId: 1 });
coursePurchaseSchema.index({ 'guestInfo.email': 1 });

module.exports = mongoose.model('CoursePurchase', coursePurchaseSchema);
