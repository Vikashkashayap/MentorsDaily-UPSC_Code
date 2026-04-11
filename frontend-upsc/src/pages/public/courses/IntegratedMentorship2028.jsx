import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { getCourseBySlug, unwrapCourseFromSlugResponse } from "../../../api/coreService";
import { IMP_2028_SLUG } from "./imp2028DetailDefaults";
import PaymentForm from "../../../components/payment/PaymentForm";
import Form from "../components/Form";
import Imp2028View from "./Imp2028View";
import "./imp2027LandingExtras.css";
import {
  getDefaultImp2028DetailPage,
  mergeImpDetailPage,
} from "./imp2028DetailDefaults";

function Imp2028DetailSkeleton() {
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

export default function IntegratedMentorship2028() {
  const [course, setCourse] = useState(null);
  const [detail, setDetail] = useState(() => getDefaultImp2028DetailPage());
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  /** @type {null | 'daily' | 'weekly'} */
  const [enrollPlan, setEnrollPlan] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        let c = null;
        const envelope = await getCourseBySlug(IMP_2028_SLUG);
        c = unwrapCourseFromSlugResponse(envelope);
        if (cancelled) return;
        const base = getDefaultImp2028DetailPage();
        if (c) {
          setCourse(c);
          setDetail(mergeImpDetailPage(base, c.detailPage || {}));
        } else {
          setDetail(base);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setDetail(getDefaultImp2028DetailPage());
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
    course?.sellingPrice != null ? course.sellingPrice : course?.basePrice ?? 90000;
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

  const handleEnrollClick = (plan) => {
    setEnrollPlan(plan === "weekly" || plan === "daily" ? plan : "daily");
    setShowPaymentForm(true);
  };

  /** When the API does not return the course (common on local dev), still show the payment UI using defaults + detail; set VITE_IMP_2028_COURSE_ID for a real Razorpay order. */
  const paymentCourseBase =
    course ??
    (() => {
      const id =
        typeof import.meta.env.VITE_IMP_2028_COURSE_ID === "string"
          ? import.meta.env.VITE_IMP_2028_COURSE_ID.trim()
          : "";
      return {
        _id: id || undefined,
        title: detail?.hero?.cardTitle ?? "Integrated Mentorship Program - 2028",
        slug: IMP_2028_SLUG,
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
        ? Number(dailyPlan.price)
        : sellingPrice;

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
  };

  if (loading) {
    return <Imp2028DetailSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>{detail.seo?.title}</title>
        <meta name="description" content={detail.seo?.description || ""} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Imp2028View
        d={detail}
        sellingPrice={heroSelling}
        basePrice={heroBase}
        discountPercentage={heroDiscountPct}
        savings={heroSavings}
        onEnroll={handleEnrollClick}
        onEnquire={() => setShowEnquiryForm(true)}
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
