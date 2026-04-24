const Coupon = require("../models/coupon.model");

exports.createCoupon = async (payload) => {
  const coupon = await Coupon.create(payload);
  return Coupon.findById(coupon._id).lean();
};

exports.listCoupons = async () => {
  return Coupon.find({}).sort({ createdAt: -1 }).lean();
};

exports.findByCode = async (code) => {
  if (!code) return null;
  return Coupon.findOne({ code: String(code).trim().toUpperCase() }).lean();
};

exports.findById = async (id) => {
  return Coupon.findById(id).lean();
};

exports.updateById = async (id, updateData) => {
  return Coupon.findByIdAndUpdate(id, updateData, { new: true }).lean();
};

exports.deleteById = async (id) => {
  return Coupon.findByIdAndDelete(id).lean();
};

exports.listActiveAutoApplyCoupons = async () => {
  return Coupon.find({
    is_active: true,
    auto_apply: true,
    expiry_date: { $gt: new Date() },
  })
    .sort({ createdAt: -1 })
    .lean();
};

exports.listActiveCoupons = async () => {
  return Coupon.find({
    is_active: true,
    expiry_date: { $gt: new Date() },
  }).lean();
};
