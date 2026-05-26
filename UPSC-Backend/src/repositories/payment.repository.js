const Payment = require('../models/payment.model');

exports.createPayment = async (data) => {
  try {
    const payment = new Payment(data);
    return await payment.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findPaymentById = async (id) => {
  try {
    return await Payment.findById(id).populate('courseId','title');
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.updatePaymentStatus = async (id, updateData) => {
  try {
    return await Payment.findByIdAndUpdate(id, updateData, { new: true });
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findAllPayments = async () => {
  try {
    const payments = await Payment.find({})
      .sort({ createdAt: -1 })
      .populate('courseId', 'title price');
    return payments;
  } catch (err) {
    throw new Error(err.message);
  }
};