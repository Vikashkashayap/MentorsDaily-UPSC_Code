/** Client-side Razorpay id checks before opening Standard Checkout. */

const ORDER_ID_RE = /^order_[A-Za-z0-9]{10,}$/;
const SUBSCRIPTION_ID_RE = /^sub_[A-Za-z0-9]{10,}$/;

export function assertValidRazorpayOrderId(orderId) {
  const id = orderId != null ? String(orderId).trim() : "";
  if (!id || !ORDER_ID_RE.test(id)) {
    throw new Error(
      `Invalid Razorpay order id "${id || "(empty)"}". Payment was not initiated correctly.`
    );
  }
  return id;
}

export function assertValidRazorpaySubscriptionId(subscriptionId) {
  const id = subscriptionId != null ? String(subscriptionId).trim() : "";
  if (!id || !subscriptionId.startsWith("sub_") || !SUBSCRIPTION_ID_RE.test(id)) {
    throw new Error("Invalid subscription id");
  }
  return id;
}

export function assertRazorpayPublicKey(key) {
  const k = key != null ? String(key).trim() : "";
  if (!k || !/^rzp_(live|test)_/.test(k)) {
    throw new Error(
      "Razorpay key is missing or invalid. Set VITE_RAZORPAY_KEY_ID in frontend-upsc/.env (must match backend RAZORPAY_KEY_ID mode: live vs test)."
    );
  }
  return k;
}
