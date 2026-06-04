/**
 * Razorpay resource id validators (orders + subscriptions).
 * Valid ids: prefix + opaque suffix (e.g. order_SxU8w2lQLWn4Rc, sub_00000000000001).
 */

const ORDER_ID_RE = /^order_[A-Za-z0-9]{10,}$/;
const SUBSCRIPTION_ID_RE = /^sub_[A-Za-z0-9]{10,}$/;

function assertValidRazorpayOrderId(orderId, context = 'razorpay order') {
  const id = orderId != null ? String(orderId).trim() : '';
  if (!id || !ORDER_ID_RE.test(id)) {
    throw new Error(
      `Invalid ${context} id "${id || '(empty)'}". Expected format order_<id> from Razorpay orders.create.`
    );
  }
  return id;
}

function assertValidRazorpaySubscriptionId(subscriptionId, context = 'razorpay subscription') {
  const id = subscriptionId != null ? String(subscriptionId).trim() : '';
  if (!id || !SUBSCRIPTION_ID_RE.test(id)) {
    throw new Error(
      `Invalid ${context} id "${id || '(empty)'}". Expected format sub_<id> from Razorpay subscriptions.create — not "sub_" alone.`
    );
  }
  return id;
}

function isValidRazorpayOrderId(orderId) {
  const id = orderId != null ? String(orderId).trim() : '';
  return Boolean(id && ORDER_ID_RE.test(id));
}

function isValidRazorpaySubscriptionId(subscriptionId) {
  const id = subscriptionId != null ? String(subscriptionId).trim() : '';
  return Boolean(id && SUBSCRIPTION_ID_RE.test(id));
}

module.exports = {
  ORDER_ID_RE,
  SUBSCRIPTION_ID_RE,
  assertValidRazorpayOrderId,
  assertValidRazorpaySubscriptionId,
  isValidRazorpayOrderId,
  isValidRazorpaySubscriptionId,
};
