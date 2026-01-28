const CoursePurchase = require('../models/coursePurchase.model');

exports.createPurchase = async (purchaseData) => {
  return await CoursePurchase.create(purchaseData);
};

exports.findPurchaseById = async (id) => {
  return await CoursePurchase.findById(id)
    .populate('courseId', 'title description sellingPrice duration mode')
    .populate('userId', 'name email mobile')
    .populate('paymentId');
};

exports.findPurchasesByUserId = async (userId) => {
  return await CoursePurchase.find({ userId })
    .populate('courseId', 'title description sellingPrice duration mode thumbnail')
    .populate({
      path: 'courseId',
      populate: {
        path: 'thumbnail',
        select: '_id filename contentType'
      }
    })
    .populate('paymentId', 'orderId amount status paymentDate')
    .sort({ purchaseDate: -1 });
};

exports.findPurchasesByEmail = async (email) => {
  return await CoursePurchase.find({ 'guestInfo.email': email })
    .populate('courseId', 'title description sellingPrice duration mode thumbnail')
    .populate({
      path: 'courseId',
      populate: {
        path: 'thumbnail',
        select: '_id filename contentType'
      }
    })
    .populate('paymentId', 'orderId amount status paymentDate')
    .sort({ purchaseDate: -1 });
};

exports.findPurchaseByPaymentId = async (paymentId) => {
  return await CoursePurchase.findOne({ paymentId });
};

exports.updatePurchaseStatus = async (id, status) => {
  return await CoursePurchase.findByIdAndUpdate(
    id,
    { status, updatedAt: new Date() },
    { new: true }
  );
};

exports.checkUserPurchase = async (userId, courseId) => {
  return await CoursePurchase.findOne({ userId, courseId, status: { $in: ['ACTIVE', 'COMPLETED'] } });
};
