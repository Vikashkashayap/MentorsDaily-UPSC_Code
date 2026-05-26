const couponService = require("../services/coupon.service");
const logger = require("../utility/logger");
const {
  setBadRequest,
  setCreateSuccess,
  setServerError,
  setSuccess,
} = require("../utility/responseHelper");

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await couponService.createCoupon(req.body || {});
    return setCreateSuccess(res, {
      message: "Coupon created successfully.",
      data: coupon,
    });
  } catch (err) {
    const msg = err?.message || "Failed to create coupon.";
    if (msg.includes("E11000")) {
      return setBadRequest(res, { message: "Coupon code already exists." });
    }
    return setBadRequest(res, { message: msg });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const coupons = await couponService.listCoupons();
    return setSuccess(res, {
      message: "Coupons fetched successfully.",
      data: coupons,
    });
  } catch (err) {
    logger.error(`coupon.controller.js << getCoupons << ${err.message}`);
    return setServerError(res, { message: "Failed to fetch coupons." });
  }
};

exports.toggleCouponStatus = async (req, res) => {
  try {
    const updated = await couponService.toggleCoupon(
      req.params.id,
      req.body?.is_active
    );
    return setSuccess(res, {
      message: "Coupon status updated successfully.",
      data: updated,
    });
  } catch (err) {
    return setBadRequest(res, { message: err?.message || "Failed to update coupon status." });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const deleted = await couponService.deleteCoupon(req.params.id);
    return setSuccess(res, {
      message: "Coupon deleted successfully.",
      data: deleted,
    });
  } catch (err) {
    return setBadRequest(res, { message: err?.message || "Failed to delete coupon." });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { code, courseId, orderValue } = req.body || {};
    const result = await couponService.applyCoupon({ code, courseId, orderValue });
    if (!result.valid) {
      return setBadRequest(res, { message: result.message });
    }
    return setSuccess(res, {
      message: result.message,
      data: result,
    });
  } catch (err) {
    return setBadRequest(res, { message: err?.message || "Unable to apply coupon." });
  }
};

exports.getAutoApplyCoupon = async (req, res) => {
  try {
    const { courseId, orderValue } = req.query || {};
    const parsedOrder = Number(orderValue || 0);
    const best = await couponService.findBestAutoApplyCoupon({
      courseId,
      orderValue: parsedOrder,
    });
    return setSuccess(res, {
      message: "Auto coupon lookup completed.",
      data: best,
    });
  } catch (err) {
    return setBadRequest(res, { message: err?.message || "Unable to fetch auto coupon." });
  }
};

exports.getCouponAvailability = async (req, res) => {
  try {
    const { courseId } = req.query || {};
    const data = await couponService.getCouponAvailability({ courseId });
    return setSuccess(res, {
      message: "Coupon availability fetched.",
      data,
    });
  } catch (err) {
    return setBadRequest(res, { message: err?.message || "Unable to fetch coupon availability." });
  }
};
