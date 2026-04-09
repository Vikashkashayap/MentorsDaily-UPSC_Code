import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { getCourseBySlug, getCourses } from "../../../api/coreService";
import PaymentForm from "../../../components/payment/PaymentForm";
import Form from "../components/Form";
import Imp2027View from "./Imp2027View";
import "./imp2027LandingExtras.css";
import {
  IMP_2027_SLUG,
  getDefaultImp2027DetailPage,
  mergeImpDetailPage,
} from "./imp2027DetailDefaults";

function unwrapCourseResponse(payload) {
  const inner = payload?.data;
  if (inner?.data && (inner.data._id || inner.data.title)) return inner.data;
  if (inner?._id || inner?.title) return inner;
  return null;
}

export default function IntegratedMentorship2027() {
  const [course, setCourse] = useState(null);
  const [detail, setDetail] = useState(() => getDefaultImp2027DetailPage());
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
        const res = await getCourseBySlug(IMP_2027_SLUG);
        if (res) c = unwrapCourseResponse(res);
        if (!c) {
          const res2 = await getCourses();
          const inner = res2?.data;
          const list = Array.isArray(inner?.data) ? inner.data : [];
          c = list.find((x) => {
            const t = (x.title || "").toLowerCase();
            return t.includes("integrated") && t.includes("2027");
          });
        }
        if (cancelled) return;
        const base = getDefaultImp2027DetailPage();
        if (c) {
          setCourse(c);
          setDetail(mergeImpDetailPage(base, c.detailPage || {}));
        } else {
          setDetail(base);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setDetail(getDefaultImp2027DetailPage());
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
    course?.sellingPrice != null ? course.sellingPrice : course?.basePrice ?? 30000;
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
    if (course) setShowPaymentForm(true);
    else if (!loading) setShowEnquiryForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-[#F8F9FB]">
        <div className="text-[#1A3C6E] font-semibold animate-pulse">Loading programme…</div>
      </div>
    );
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

      <Imp2027View
        d={detail}
        sellingPrice={heroSelling}
        basePrice={heroBase}
        discountPercentage={heroDiscountPct}
        savings={heroSavings}
        onEnroll={handleEnrollClick}
        onEnquire={() => setShowEnquiryForm(true)}
      />

      {showPaymentForm && course && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-[#1A3C6E] to-[#24527A] p-4 text-white">
              <h3 className="text-xl font-semibold">
                Enroll in <span dangerouslySetInnerHTML={{ __html: course.title }} />
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
              course={{
                ...course,
                basePrice:
                  enrollPlan === "weekly" && weeklyPlan?.oldPrice != null
                    ? Number(weeklyPlan.oldPrice)
                    : enrollPlan === "daily" && dailyPlan?.oldPrice != null
                      ? Number(dailyPlan.oldPrice)
                      : basePrice,
                sellingPrice:
                  enrollPlan === "weekly" && weeklyPlan?.price != null
                    ? Number(weeklyPlan.price)
                    : enrollPlan === "daily" && dailyPlan?.price != null
                      ? Number(dailyPlan.price)
                      : sellingPrice,
                discountPercentage:
                  enrollPlan === "weekly" || enrollPlan === "daily"
                    ? (() => {
                        const bp =
                          enrollPlan === "weekly"
                            ? Number(weeklyPlan?.oldPrice ?? 0)
                            : Number(dailyPlan?.oldPrice ?? 0);
                        const sp =
                          enrollPlan === "weekly"
                            ? Number(weeklyPlan?.price ?? 0)
                            : Number(dailyPlan?.price ?? 0);
                        return bp > sp && bp > 0 ? Math.round(((bp - sp) / bp) * 100) : discountPercentage;
                      })()
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
