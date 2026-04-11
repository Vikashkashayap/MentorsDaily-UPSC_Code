/**
 * Normalize errors from Razorpay SDK, Mongoose, axios, etc. Many omit `message`.
 */
function getErrorMessage(error) {
  if (error == null) return "Unknown error";
  if (typeof error === "string") return error;
  if (typeof error.message === "string" && error.message.trim()) return error.message;

  if (error.name === "ValidationError" && error.errors) {
    const parts = Object.values(error.errors).map((e) => e.message);
    if (parts.length) return parts.join("; ");
  }

  const inner = error.error;
  if (inner && typeof inner === "object") {
    if (typeof inner.description === "string" && inner.description.trim()) return inner.description;
    if (typeof inner.message === "string" && inner.message.trim()) return inner.message;
  }
  if (typeof inner === "string" && inner.trim()) return inner;

  const body = error.body ?? error.response?.data ?? error.response?.body;
  if (body && typeof body === "object") {
    const d = body.error?.description ?? body.error?.message ?? body.message;
    if (typeof d === "string" && d.trim()) return d;
  }

  try {
    const compact = inner ?? error;
    if (compact && typeof compact === "object") return JSON.stringify(compact);
  } catch {
    /* ignore */
  }

  return error.name || "Request failed";
}

module.exports = { getErrorMessage };
