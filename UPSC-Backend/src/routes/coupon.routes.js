const express = require("express");
const router = express.Router();
const couponController = require("../controllers/coupon.controller");
const { verifyTokenAndAdmin } = require("../middlewares/auth.middleware");

router.post("/admin/coupons", verifyTokenAndAdmin, couponController.createCoupon);
router.get("/admin/coupons", verifyTokenAndAdmin, couponController.getCoupons);
router.patch(
  "/admin/coupons/:id/toggle",
  verifyTokenAndAdmin,
  couponController.toggleCouponStatus
);
router.delete(
  "/admin/coupons/:id",
  verifyTokenAndAdmin,
  couponController.deleteCoupon
);

router.post("/apply-coupon", couponController.applyCoupon);
router.get("/coupon/auto-apply", couponController.getAutoApplyCoupon);
router.get("/coupon/availability", couponController.getCouponAvailability);

module.exports = router;
