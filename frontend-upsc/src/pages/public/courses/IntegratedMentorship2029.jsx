import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  applyCoupon,
  getCouponAvailability,
  getAutoApplyCoupon,
  getCourseBySlug,
  unwrapCourseFromSlugResponse,
} from "../../../api/coreService";
import { IMP_2029_SLUG } from "./imp2029DetailDefaults";
import PaymentForm from "../../../components/payment/PaymentForm";
import Form from "../components/Form";
import Imp2029View from "./Imp2029View";
import "./imp2027LandingExtras.css";
import {
  getDefaultImp2029DetailPage,
  mergeImpDetailPage,
} from "./imp2029DetailDefaults";

function Imp2029DetailSkeleton() {
  return (
    <div className="bg-white overflow-x-hidden pb-10 animate-pulse">
      <div className="h-10 bg-[#1A2260]" />
      <section className="bg-gradient-to-br from-[#0F1F4E] via-[#1A2F6B] to-[#2538A0] pt-16 pb-14">
        <div className="max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-16 items-start">
          <div>
            <div className="h-7 w-44 rounded-full bg-white/20 mb-6" />
            <div className="h-10 w-[85%] rounded bg-white/20 mb-3" />
            <div className="h-10 w-[65%] rounded bg-white/20 mb-5" />
            <div className="h-4 w-[90%] rounded bg-white/20 mb-2" />
            <div className="h-4 w-[72%] rounded bg-white/20 mb-8" />
            <div className="flex gap-3 mb-8">
              <div className="h-12 w-56 rounded-lg bg-white/25" />
              <div className="h-12 w-44 rounded-lg bg-white/20" />
            </div>
          </div>
          <div className="bg-white rounded-[20px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
            <div className="h-24 rounded-lg bg-[#E5E7EB] mb-4" />
            <div className="h-5 w-full rounded bg-[#E5E7EB] mb-4" />
            <div className="h-10 w-40 rounded bg-[#E5E7EB] mb-6" />
            <div className="h-12 w-full rounded-lg bg-[#E5E7EB]" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function IntegratedMentorship2029() {
  const [course, setCourse] = useState(null);
  const [detail, setDetail] = useState(() => getDefaultImp2029DetailPage());
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [couponApplying, setCouponApplying] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponAdjustedDailyPrice, setCouponAdjustedDailyPrice] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(true);
  /** @type {null | 'daily' | 'weekly'} */
  const [enrollPlan, setEnrollPlan] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        let c = null;
        const envelope = await getCourseBySlug(IMP_2029_SLUG);
        c = unwrapCourseFromSlugResponse(envelope);
        if (cancelled) return;
        const base = getDefaultImp2029DetailPage();
        if (c) {
          setCourse(c);
          setDetail(mergeImpDetailPage(base, c.detailPage || {}));
        } else {
          setDetail(base);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setDetail(getDefaultImp2029DetailPage());
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (showPaymentForm) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPaymentForm]);

  const basePrice = course?.basePrice ?? 0;
  const sellingPrice =
    course?.sellingPrice != null ? course.sellingPrice : course?.basePrice ?? 120000;
  const discountPercentage = course?.discountPercentage ?? 0;
  const savings = Math.max(0, basePrice - sellingPrice);

  const dailyPlan = detail?.pricingSection?.daily;
  const weeklyPlan = detail?.pricingSection?.weekly;
  const heroSelling =
    dailyPlan?.price != null ? Number(dailyPlan.price) : sellingPrice;
  const heroBase =
    dailyPlan?.oldPrice != null ? Number(dailyPlan.oldPrice) : basePrice;
  const heroDiscountPct =
    heroBase > 0 && heroSelling >= 0 && heroBase > heroSelling
      ? Math.round(((heroBase - heroSelling) / heroBase) * 100)
      : discountPercentage;
  const heroSavings = Math.max(0, heroBase - heroSelling);
  const resolvedCourseId =
    course?._id ||
    (typeof import.meta.env.VITE_IMP_2029_COURSE_ID === "string"
      ? import.meta.env.VITE_IMP_2029_COURSE_ID.trim()
      : "");

  useEffect(() => {
    setCouponAdjustedDailyPrice(null);
    setAppliedCoupon(null);
    setCouponError("");
  }, [course?._id, heroSelling, heroBase]);

  useEffect(() => {
    const autoApply = async () => {
      if (!resolvedCourseId) return;
      try {
        const res = await getAutoApplyCoupon({
          courseId: resolvedCourseId,
          orderValue: heroSelling,
        });
        const autoData = res?.data?.data;
        if (!autoData?.coupon || autoData?.pricing?.final_price == null) return;
        setAppliedCoupon(autoData.coupon);
        setCouponAdjustedDailyPrice(Number(autoData.pricing.final_price));
      } catch {
        // optional
      }
    };
    autoApply();
  }, [resolvedCourseId, heroSelling]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!resolvedCourseId) {
        setShowCouponInput(true);
        return;
      }
      try {
        await getCouponAvailability({ courseId: resolvedCourseId });
        setShowCouponInput(true);
      } catch {
        setShowCouponInput(true);
      }
    };
    checkAvailability();
  }, [resolvedCourseId]);

  const displayedHeroSelling =
    couponAdjustedDailyPrice != null ? couponAdjustedDailyPrice : heroSelling;
  const displayedHeroDiscountPct =
    heroBase > 0 && displayedHeroSelling >= 0 && heroBase > displayedHeroSelling
      ? Math.round(((heroBase - displayedHeroSelling) / heroBase) * 100)
      : heroDiscountPct;
  const displayedHeroSavings = Math.max(0, heroBase - displayedHeroSelling);

  const handleApplyCoupon = async (code) => {
    try {
      if (!resolvedCourseId) {
        setCouponError("Coupon is available after course is loaded.");
        return;
      }
      setCouponApplying(true);
      setCouponError("");
      const res = await applyCoupon({
        code,
        courseId: resolvedCourseId,
        orderValue: heroSelling,
      });
      const payload = res?.data?.data;
      if (payload?.pricing?.final_price == null || !payload?.coupon) {
        setCouponError("Invalid coupon response.");
        return;
      }
      setAppliedCoupon(payload.coupon);
      setCouponAdjustedDailyPrice(Number(payload.pricing.final_price));
    } catch (err) {
      setCouponError(
        err?.response?.data?.data?.message ||
          err?.response?.data?.message ||
          "Invalid or expired coupon."
      );
    } finally {
      setCouponApplying(false);
    }
  };

  const clearAppliedCoupon = () => {
    setCouponAdjustedDailyPrice(null);
    setAppliedCoupon(null);
    setCouponError("");
  };

  const handleEnrollClick = (plan) => {
    setEnrollPlan(plan === "weekly" || plan === "daily" ? plan : "daily");
    setShowPaymentForm(true);
  };

  /** When the API does not return the course (common on local dev), still show the payment UI using defaults + detail; set VITE_IMP_2029_COURSE_ID for a real Razorpay order. */
  const paymentCourseBase =
    course ??
    (() => {
      const id =
        typeof import.meta.env.VITE_IMP_2029_COURSE_ID === "string"
          ? import.meta.env.VITE_IMP_2029_COURSE_ID.trim()
          : "";
      return {
        _id: id || undefined,
        title: detail?.hero?.cardTitle ?? "Integrated Mentorship Program - 2029",
        slug: IMP_2029_SLUG,
        basePrice,
        sellingPrice,
        discountPercentage,
      };
    })();

  const selectedBasePrice =
    enrollPlan === "weekly" && weeklyPlan?.oldPrice != null
      ? Number(weeklyPlan.oldPrice)
      : enrollPlan === "daily" && dailyPlan?.oldPrice != null
        ? Number(dailyPlan.oldPrice)
        : basePrice;
  const selectedSellingPrice =
    enrollPlan === "weekly" && weeklyPlan?.price != null
      ? Number(weeklyPlan.price)
      : enrollPlan === "daily" && dailyPlan?.price != null
        ? couponAdjustedDailyPrice != null
          ? Number(couponAdjustedDailyPrice)
          : Number(dailyPlan.price)
        : sellingPrice;

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
  };

  if (loading) {
    return <Imp2029DetailSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>{detail.seo?.title}</title>
        <meta name="description" content={detail.seo?.description || ""} />
        <meta
          name="keywords"
          content="UPSC mentorship 2029, IAS coaching online, UPSC preparation program 2029, 1:1 UPSC mentor, UPSC 2029 preparation, best UPSC mentorship India, IMP 2029 MentorsDaily"
        />
        <link rel="canonical" href="https://mentorsdaily.in/imp-2029" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Imp2029View
        d={detail}
        sellingPrice={displayedHeroSelling}
        basePrice={heroBase}
        discountPercentage={displayedHeroDiscountPct}
        savings={displayedHeroSavings}
        onEnroll={handleEnrollClick}
        onEnquire={() => setShowEnquiryForm(true)}
        onApplyCoupon={handleApplyCoupon}
        onClearCoupon={clearAppliedCoupon}
        couponApplying={couponApplying}
        couponError={couponError}
        appliedCoupon={appliedCoupon}
        showCouponInput={showCouponInput}
      />

      {showPaymentForm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-[#1A2260] to-[#2D3A8C] p-4 text-white">
              <h3 className="text-xl font-semibold">
                Enroll in{" "}
                <span dangerouslySetInnerHTML={{ __html: paymentCourseBase.title }} />
                {enrollPlan === "weekly" || enrollPlan === "daily" ? (
                  <span className="block text-sm font-normal text-white/90 mt-1">
                    Plan: {enrollPlan === "daily" ? "Daily Mentorship" : "Weekly Mentorship"}
                  </span>
                ) : null}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setEnrollPlan(null);
                setShowPaymentForm(false);
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold z-10 transition-colors bg-black/20 rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>
            <PaymentForm
              key={`${paymentCourseBase._id ?? "local"}-${enrollPlan || "default"}-${selectedSellingPrice}`}
              course={{
                ...paymentCourseBase,
                basePrice: selectedBasePrice,
                sellingPrice: selectedSellingPrice,
                appliedCoupon:
                  enrollPlan === "daily" && appliedCoupon?.code ? appliedCoupon : null,
                discountPercentage:
                  selectedBasePrice > selectedSellingPrice && selectedBasePrice > 0
                    ? Math.round(((selectedBasePrice - selectedSellingPrice) / selectedBasePrice) * 100)
                    : discountPercentage,
              }}
              mentorshipPlan={enrollPlan === "weekly" || enrollPlan === "daily" ? enrollPlan : null}
              onPaymentSuccess={handlePaymentSuccess}
              onClose={() => {
                setEnrollPlan(null);
                setShowPaymentForm(false);
                handlePaymentSuccess();
              }}
            />
          </div>
        </div>
      )}

      {showEnquiryForm && <Form onClose={() => setShowEnquiryForm(false)} />}
    </>
  );
}
