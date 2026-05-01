const mongoose = require("mongoose");
const couponRepository = require("../repositories/coupon.repository");
const courseRepository = require("../repositories/course.repository");
const { computeDiscount } = require("../utils/coupon.util");

function sanitizeCouponCode(code) {
  return String(code || "").trim().toUpperCase();
}

function isCouponExpired(coupon) {
  if (!coupon?.expiry_date) return true;
  return new Date(coupon.expiry_date).getTime() < Date.now();
}

function extractCourseYear(course) {
  const source = [course?.slug, course?.title, course?.category].filter(Boolean).join(" ");
  const yearMatch = String(source).match(/\b(20\d{2})\b/);
  return yearMatch ? String(yearMatch[1]) : null;
}

function isCouponApplicableToCourse(coupon, course) {
  if (coupon.applies_to_all) return true;
  const targetCourseId = String(course?._id || "");
  const targetYear = extractCourseYear(course);

  const courseMatch =
    Array.isArray(coupon.applicable_courses) &&
    coupon.applicable_courses.some((id) => String(id) === targetCourseId);

  const yearMatch =
    Array.isArray(coupon.applicable_years) &&
    targetYear &&
    coupon.applicable_years.some((year) => String(year) === String(targetYear));

  return Boolean(courseMatch || yearMatch);
}

async function validateCouponForCourse({ coupon, course, orderValue }) {
  if (!coupon) return { valid: false, message: "Invalid coupon code." };
  if (isCouponExpired(coupon)) return { valid: false, message: "Coupon has expired." };
  if (!coupon.is_active) return { valid: false, message: "Coupon is inactive." };
  if (!isCouponApplicableToCourse(coupon, course)) {
    return { valid: false, message: "Coupon is not applicable for this course." };
  }

  const minOrderValue = Number(coupon.min_order_value || 0);
  if (minOrderValue > 0 && Number(orderValue || 0) < minOrderValue) {
    return {
      valid: false,
      message: `Minimum order value for this coupon is ₹${Math.round(minOrderValue)}.`,
    };
  }

  return { valid: true };
}

exports.createCoupon = async (payload) => {
  const code = sanitizeCouponCode(payload.code);
  if (!code) throw new Error("Coupon code is required.");
  if (!["percent", "flat"].includes(payload.discount_type)) {
    throw new Error("discount_type must be either percent or flat.");
  }

  const discountValue = Number(payload.discount_value);
  if (!Number.isFinite(discountValue) || discountValue < 0) {
    throw new Error("discount_value must be a non-negative number.");
  }
  if (payload.discount_type === "percent" && discountValue > 100) {
    throw new Error("For percent coupons, discount_value cannot exceed 100.");
  }

  const expiry = new Date(payload.expiry_date);
  if (Number.isNaN(expiry.getTime())) {
    throw new Error("expiry_date must be a valid date.");
  }

  const appliesToAll =
    payload.applicable_courses === "all" ||
    payload.applies_to_all === true ||
    (Array.isArray(payload.applicable_courses) &&
      payload.applicable_courses.some((v) => String(v).toLowerCase() === "all"));

  const courseIds = Array.isArray(payload.applicable_courses)
    ? payload.applicable_courses
        .filter((id) => String(id).toLowerCase() !== "all")
        .map((id) => String(id))
    : [];

  const invalidId = courseIds.find((id) => !mongoose.Types.ObjectId.isValid(id));
  if (invalidId) throw new Error("applicable_courses contains invalid course id(s).");

  const selectedYears = Array.isArray(payload.applicable_years)
    ? payload.applicable_years
        .map((y) => String(y).trim())
        .filter(Boolean)
    : [];
  const invalidYear = selectedYears.find((y) => !/^20\d{2}$/.test(y));
  if (invalidYear) throw new Error("applicable_years must contain valid years like 2027.");
  if (!appliesToAll && courseIds.length === 0 && selectedYears.length === 0) {
    throw new Error("Select at least one course or year, or enable applies_to_all.");
  }

  return couponRepository.createCoupon({
    code,
    discount_type: payload.discount_type,
    discount_value: discountValue,
    max_discount:
      payload.max_discount === undefined || payload.max_discount === null || payload.max_discount === ""
        ? null
        : Number(payload.max_discount),
    min_order_value:
      payload.min_order_value === undefined ||
      payload.min_order_value === null ||
      payload.min_order_value === ""
        ? null
        : Number(payload.min_order_value),
    expiry_date: expiry,
    is_active: payload.is_active !== false,
    auto_apply: payload.auto_apply === true,
    applies_to_all: appliesToAll,
    applicable_courses: appliesToAll ? [] : courseIds,
    applicable_years: appliesToAll ? [] : selectedYears,
  });
};

exports.listCoupons = async () => {
  await couponRepository.deactivateExpiredCoupons();
  return couponRepository.listCoupons();
};

exports.toggleCoupon = async (id, is_active) => {
  const wantActive = Boolean(is_active);
  if (wantActive) {
    const existing = await couponRepository.findById(id);
    if (!existing) throw new Error("Coupon not found.");
    if (isCouponExpired(existing)) {
      throw new Error("Cannot activate an expired coupon. Create a new coupon with a future expiry.");
    }
  }
  return couponRepository.updateById(id, { is_active: wantActive });
};

exports.deleteCoupon = async (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(String(id))) {
    throw new Error("Valid coupon id is required.");
  }
  const deleted = await couponRepository.deleteById(id);
  if (!deleted) {
    throw new Error("Coupon not found.");
  }
  return deleted;
};

exports.applyCoupon = async ({ code, courseId, orderValue }) => {
  if (!courseId || !mongoose.Types.ObjectId.isValid(String(courseId))) {
    throw new Error("Valid courseId is required.");
  }
  const normalizedCode = sanitizeCouponCode(code);
  if (!normalizedCode) throw new Error("Coupon code is required.");

  const course = await courseRepository.findCourseById(courseId);
  if (!course) throw new Error("Course not found.");

  const amountToEvaluate = Number.isFinite(Number(orderValue))
    ? Number(orderValue)
    : Number(course.sellingPrice ?? course.basePrice ?? 0);

  await couponRepository.deactivateExpiredCoupons();

  const coupon = await couponRepository.findByCode(normalizedCode);
  const validation = await validateCouponForCourse({
    coupon,
    course,
    orderValue: amountToEvaluate,
  });
  if (!validation.valid) {
    return { valid: false, message: validation.message };
  }

  const pricing = computeDiscount(amountToEvaluate, coupon);
  return {
    valid: true,
    message: "Coupon applied successfully.",
    coupon: {
      _id: coupon._id,
      code: coupon.code,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
      max_discount: coupon.max_discount,
    },
    pricing,
  };
};

exports.findBestAutoApplyCoupon = async ({ courseId, orderValue }) => {
  const course = await courseRepository.findCourseById(courseId);
  if (!course) return null;
  await couponRepository.deactivateExpiredCoupons();
  const coupons = await couponRepository.listActiveAutoApplyCoupons();
  let best = null;

  for (const coupon of coupons) {
    const validation = await validateCouponForCourse({ coupon, course, orderValue });
    if (!validation.valid) continue;
    const pricing = computeDiscount(orderValue, coupon);
    if (!best || pricing.discount_amount > best.pricing.discount_amount) {
      best = { coupon, pricing };
    }
  }

  if (!best) return null;
  return {
    coupon: {
      _id: best.coupon._id,
      code: best.coupon.code,
      discount_type: best.coupon.discount_type,
      discount_value: best.coupon.discount_value,
      max_discount: best.coupon.max_discount,
      auto_apply: best.coupon.auto_apply,
    },
    pricing: best.pricing,
  };
};

exports.getCouponAvailability = async ({ courseId }) => {
  if (!courseId || !mongoose.Types.ObjectId.isValid(String(courseId))) {
    throw new Error("Valid courseId is required.");
  }
  const course = await courseRepository.findCourseById(courseId);
  if (!course) return { available: false };
  await couponRepository.deactivateExpiredCoupons();
  const activeCoupons = await couponRepository.listActiveCoupons();
  const available = activeCoupons.some((coupon) =>
    isCouponApplicableToCourse(coupon, course)
  );
  return { available };
};
