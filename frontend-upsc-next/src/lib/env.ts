/** Centralized public env (client + server). */
export const publicEnv = {
  apiUrl: (
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
  ).replace(/\/$/, ""),
  siteUrl: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mentorsdaily.com"
  ).replace(/\/$/, ""),
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
  razorpayPaymentScreenName:
    process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_SCREEN_NAME ?? "MentorsDaily",
} as const;
