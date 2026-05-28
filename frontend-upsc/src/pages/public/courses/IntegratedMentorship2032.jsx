import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  applyCoupon,
  getCouponAvailability,
  getAutoApplyCoupon,
  getCourseBySlug,
  unwrapCourseFromSlugResponse,
} from "../../../api/coreService";
import SEO from "../../../components/SEO/SEO";
import PaymentForm from "../../../components/payment/PaymentForm";
import Form from "../components/Form";
import Imp2032View from "./Imp2032View";
import "./imp2032LandingExtras.css";
import {
  IMP_2032_SLUG,
  getDefaultImp2032DetailPage,
  mergeImpDetailPage,
} from "./imp2032DetailDefaults";

function Imp2032DetailSkeleton() {
  return (
    <div className="bg-white overflow-x-hidden pb-10 animate-pulse">
      <div className="h-10 bg-[#0D2240]" />
      <section className="bg-gradient-to-br from-[#0D2240] via-[#1A3C6E] to-[#1e4d82] pt-16 pb-14">
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
            <div className="h-4 w-80 rounded bg-white/20" />
          </div>
          <div className="bg-white rounded-[20px] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
            <div className="h-5 w-52 rounded bg-[#E5E7EB] mb-4" />
            <div className="h-10 w-40 rounded bg-[#E5E7EB] mb-6" />
            <div className="space-y-3 mb-6">
              <div className="h-4 w-full rounded bg-[#E5E7EB]" />
              <div className="h-4 w-[92%] rounded bg-[#E5E7EB]" />
              <div className="h-4 w-[82%] rounded bg-[#E5E7EB]" />
            </div>
            <div className="h-12 w-full rounded-lg bg-[#E5E7EB]" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default function IntegratedMentorship2032() {
  const [course, setCourse] = useState(null);
  const [detail, setDetail] = useState(() => getDefaultImp2032DetailPage());
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [couponApplying, setCouponApplying] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponAdjustedPrice, setCouponAdjustedPrice] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const envelope = await getCourseBySlug(IMP_2032_SLUG);
        const c = unwrapCourseFromSlugResponse(envelope);
        if (cancelled) return;
        const base = getDefaultImp2032DetailPage();
        if (c) {
          setCourse(c);
          setDetail(mergeImpDetailPage(base, c.detailPage || {}));
        } else {
          setDetail(base);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setDetail(getDefaultImp2032DetailPage());
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

  const dailyPlan = detail?.pricingSection?.daily;
  const heroSelling = dailyPlan?.price != null ? Number(dailyPlan.price) : Number(course?.sellingPrice ?? course?.basePrice ?? 210000);
  const heroBase = dailyPlan?.oldPrice != null ? Number(dailyPlan.oldPrice) : Number(course?.basePrice ?? heroSelling);

  const discountPercentage =
    heroBase > 0 && heroSelling >= 0 && heroBase > heroSelling ? Math.round(((heroBase - heroSelling) / heroBase) * 100) : Number(course?.discountPercentage ?? 0);
  const savings = Math.max(0, heroBase - heroSelling);

  const resolvedCourseId =
    course?._id ||
    (typeof import.meta.env.VITE_IMP_2032_COURSE_ID === "string"
      ? import.meta.env.VITE_IMP_2032_COURSE_ID.trim()
      : "");

  useEffect(() => {
    setCouponAdjustedPrice(null);
    setAppliedCoupon(null);
    setCouponError("");
  }, [course?._id, heroSelling, heroBase]);

  useEffect(() => {
    const autoApply = async (orderValue) => {
      if (!resolvedCourseId) return;
      try {
        const res = await getAutoApplyCoupon({ courseId: resolvedCourseId, orderValue });
        const autoData = res?.data?.data;
        if (!autoData?.coupon || autoData?.pricing?.final_price == null) return;
        setAppliedCoupon(autoData.coupon);
        setCouponAdjustedPrice(Number(autoData.pricing.final_price));
      } catch {
        // Optional enhancement, ignore silently.
      }
    };
    autoApply(heroSelling);
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

  const parseApplyPayload = (res) => {
    const payload = res?.data?.data;
    if (payload?.pricing?.final_price == null || !payload?.coupon) return null;
    return payload;
  };

  const couponErrMsg = (err) =>
    err?.response?.data?.data?.message ||
    err?.response?.data?.message ||
    (typeof err?.message === "string" ? err.message : null) ||
    "Invalid or expired coupon.";

  const handleApplyCoupon = async (code) => {
    if (!resolvedCourseId) {
      setCouponError("Coupon is available after course is loaded.");
      return;
    }

    setCouponApplying(true);
    setCouponError("");

    try {
      const res = await applyCoupon({ code, courseId: resolvedCourseId, orderValue: heroSelling });
      const payload = parseApplyPayload(res);
      if (!payload) {
        setCouponError("Invalid coupon response.");
        return;
      }
      setAppliedCoupon(payload.coupon);
      setCouponAdjustedPrice(Number(payload.pricing.final_price));
    } catch (err) {
      setCouponError(couponErrMsg(err));
    } finally {
      setCouponApplying(false);
    }
  };

  const clearAppliedCoupon = () => {
    setCouponAdjustedPrice(null);
    setAppliedCoupon(null);
    setCouponError("");
  };

  const handleEnrollClick = () => {
    setShowPaymentForm(true);
  };

  const paymentCourseBase =
    course ??
    (() => {
      const id =
        typeof import.meta.env.VITE_IMP_2032_COURSE_ID === "string"
          ? import.meta.env.VITE_IMP_2032_COURSE_ID.trim()
          : "";
      return {
        _id: id || undefined,
        title: detail?.hero?.cardTitle ?? "Integrated Mentorship Program - 2032",
        slug: IMP_2032_SLUG,
        basePrice: heroBase,
        sellingPrice: heroSelling,
        discountPercentage,
      };
    })();

  const selectedBasePrice = dailyPlan?.oldPrice != null ? Number(dailyPlan.oldPrice) : heroBase;
  const selectedSellingPrice =
    couponAdjustedPrice != null
      ? Number(couponAdjustedPrice)
      : dailyPlan?.price != null
        ? Number(dailyPlan.price)
        : heroSelling;

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
  };

  if (loading) return <Imp2032DetailSkeleton />;

  return (
    <>
      <SEO
        title={detail.seo?.title}
        description={detail.seo?.description}
        url="/integrated-mentorship-2032"
      />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Imp2032View
        d={detail}
        sellingPrice={couponAdjustedPrice != null ? couponAdjustedPrice : heroSelling}
        basePrice={heroBase}
        discountPercentage={discountPercentage}
        savings={savings}
        onEnroll={handleEnrollClick}
        onEnquire={() => setShowEnquiryForm(true)}
        onApplyCoupon={handleApplyCoupon}
        onClearCoupon={clearAppliedCoupon}
        couponApplying={couponApplying}
        couponError={couponError}
        appliedCoupon={appliedCoupon}
        discountedDailyPrice={couponAdjustedPrice}
        showCouponInput={showCouponInput}
      />

      {showPaymentForm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-[#1A3C6E] to-[#24527A] p-4 text-white">
              <h3 className="text-xl font-semibold">
                Enroll in <span dangerouslySetInnerHTML={{ __html: paymentCourseBase.title }} />
                <span className="block text-sm font-normal text-white/90 mt-1">Plan: Daily Mentorship</span>
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowPaymentForm(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold z-10 transition-colors bg-black/20 rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>
            <PaymentForm
              key={`${paymentCourseBase._id ?? "local"}-daily-${selectedSellingPrice}`}
              course={{
                ...paymentCourseBase,
                basePrice: selectedBasePrice,
                sellingPrice: selectedSellingPrice,
                appliedCoupon: appliedCoupon?.code ? appliedCoupon : null,
                discountPercentage:
                  selectedBasePrice > selectedSellingPrice && selectedBasePrice > 0
                    ? Math.round(((selectedBasePrice - selectedSellingPrice) / selectedBasePrice) * 100)
                    : discountPercentage,
              }}
              mentorshipPlan="daily"
              onPaymentSuccess={handlePaymentSuccess}
              onClose={() => {
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

