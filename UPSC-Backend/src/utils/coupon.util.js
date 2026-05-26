function roundPrice(value) {
  const n = Number(value || 0);
  return Math.max(0, Math.round(n));
}

function computeDiscount(basePrice, coupon) {
  const price = Number(basePrice || 0);
  if (!coupon || price <= 0) {
    return {
      original_price: roundPrice(price),
      final_price: roundPrice(price),
      discount_amount: 0,
      effective_discount_percent: 0,
    };
  }

  let discountAmount = 0;
  if (coupon.discount_type === "percent") {
    discountAmount = (price * Number(coupon.discount_value || 0)) / 100;
  } else {
    discountAmount = Number(coupon.discount_value || 0);
  }

  if (
    coupon.max_discount !== undefined &&
    coupon.max_discount !== null &&
    Number(coupon.max_discount) >= 0
  ) {
    discountAmount = Math.min(discountAmount, Number(coupon.max_discount));
  }

  discountAmount = Math.min(discountAmount, price);
  const finalPrice = Math.max(price - discountAmount, 0);
  const effectivePercent =
    price > 0 ? Math.round((discountAmount / price) * 100) : 0;

  return {
    original_price: roundPrice(price),
    final_price: roundPrice(finalPrice),
    discount_amount: roundPrice(discountAmount),
    effective_discount_percent: effectivePercent,
  };
}

module.exports = {
  computeDiscount,
};
