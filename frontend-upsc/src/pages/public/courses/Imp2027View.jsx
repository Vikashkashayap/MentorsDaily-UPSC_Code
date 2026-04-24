import { useCallback, useEffect, useRef, useState } from "react";
import { DynIcon } from "./impViewLucideIcons.jsx";
import CouponApplyBox from "../../../components/coupon/CouponApplyBox";

function fmt(n) {
  if (n == null || n === "") return "—";
  return `₹${Number(n).toLocaleString("en-IN")}`;
}

function HtmlLine({ html, className }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function renderComparisonValueCell(value) {
  if (typeof value === "boolean") {
    return (
      <span className={`text-lg font-bold ${value ? "text-[#4ADE80]" : "text-[#F87171]"}`}>
        {value ? "✓" : "✕"}
      </span>
    );
  }
  if (value == null || value === "") {
    return <span className="text-white/40">—</span>;
  }
  return (
    <span className="inline-flex min-w-[44px] justify-center px-2 py-1 rounded-md bg-white text-[#0D2240] text-[0.9rem] font-extrabold shadow-sm">
      {String(value)}
    </span>
  );
}

export default function Imp2027View({
  d,
  sellingPrice,
  basePrice,
  discountPercentage,
  savings,
  onEnroll,
  onEnquire,
  onApplyCoupon,
  onClearCoupon,
  couponApplying,
  couponError,
  appliedCoupon,
  showCouponInput = true,
}) {
  const [tab, setTab] = useState("foundation");
  const [openFaq, setOpenFaq] = useState(-1);
  const [timelineViewPct, setTimelineViewPct] = useState(100);
  const timelineScrollRef = useRef(null);

  const included = d.includedSection.tabs.find((t) => t.id === tab);

  const updateTimelineScroll = useCallback(() => {
    const el = timelineScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    if (max <= 0) {
      setTimelineViewPct(100);
      return;
    }
    const p = Math.round((scrollLeft / max) * 100);
    setTimelineViewPct(Math.min(100, Math.max(4, p || 4)));
  }, []);

  useEffect(() => {
    updateTimelineScroll();
    window.addEventListener("resize", updateTimelineScroll);
    return () => window.removeEventListener("resize", updateTimelineScroll);
  }, [updateTimelineScroll, d.timelineSection?.phases?.length]);

  const heroPrice = fmt(sellingPrice);
  const heroOld = basePrice > sellingPrice ? fmt(basePrice) : null;
  const saveLine =
    discountPercentage > 0 && savings > 0
      ? `🎉 ${discountPercentage}% OFF · Early Bird — Save ${fmt(savings)}`
      : "";
  const dashboardCards = [
    {
      title: "Module Roadmap",
      body: "Visual journey of your entire 36-month syllabus broken into structured, week-by-week modules.",
      icon: "Map",
      accent: "border-[#1A3C6E]",
      iconShell: "bg-[#E8F1FF] text-[#1A3C6E]",
    },
    {
      title: "Weekly Target System",
      body: "Auto-generated weekly goals based on your progress, pace, and learning milestones.",
      icon: "Target",
      accent: "border-[#E86B2A]",
      iconShell: "bg-[#FDE8D8] text-[#E86B2A]",
    },
    {
      title: "Syllabus Tracker",
      body: "Track topic-wise learning in progress, or finished. Get a clear view of your coverage ratio.",
      icon: "ListChecks",
      accent: "border-[#2D7D4E]",
      iconShell: "bg-[#D1FAE5] text-[#2D7D4E]",
    },
    {
      title: "UPSC-style Mock Tests",
      body: "Take full-length tests from your dashboard and get instant scores, solutions, and topic-wise analytics.",
      icon: "FileCheck2",
      accent: "border-[#8B5CF6]",
      iconShell: "bg-[#EDE9FE] text-[#8B5CF6]",
      note: "Full Access: Daily Plan",
      noteTone: "text-[#0D9488]",
    },
    {
      title: "Fault Analysis",
      body: "Identify recurring error patterns across your mock tests by topic, question type, and difficulty.",
      icon: "CircleAlert",
      accent: "border-[#F59E0B]",
      iconShell: "bg-[#FEF3C7] text-[#CA8A04]",
    },
    {
      title: "Practice Hub",
      body: "Access topic-wise practice questions organised by subject, topic, and difficulty level.",
      icon: "Crosshair",
      accent: "border-[#5B8DB8]",
      iconShell: "bg-[#D5E8F0] text-[#1A3C6E]",
      note: "Full Access: Daily Part + Weekend Daily Plan",
      noteTone: "text-[#E86B2A]",
    },
    {
      title: "Live Progress Dashboard",
      body: "Real-time visual graph of your performance across all modules, answer writing scores, and mock trends.",
      icon: "BarChart3",
      accent: "border-[#1A3C6E]",
      iconShell: "bg-[#E8F1FF] text-[#1A3C6E]",
    },
    {
      title: "AI Mentor",
      body: "Get instant doubt support, personalized study suggestions, and smart next-step guidance based on your preparation data.",
      icon: "Bot",
      accent: "border-[#0D9488]",
      iconShell: "bg-[#CCFBF1] text-[#0F766E]",
      note: "24x7 Smart Guidance",
      noteTone: "text-[#0F766E]",
    },
  ];

  return (
    <div className="imp2027-root bg-white overflow-x-hidden pb-24 md:pb-0">
      {/* Announcement */}
      <div className="bg-[#0D2240] text-[#D5E8F0] text-center py-2 px-6 text-sm font-medium">
        <strong className="text-[#E86B2A]">{d.announcement.strong}</strong> {d.announcement.text}{" "}
        <button
          type="button"
          className="text-[#E86B2A] font-bold ml-3 bg-transparent border-0 cursor-pointer p-0 font-inherit underline-offset-2 hover:underline"
          onClick={() => onEnroll?.("daily")}
        >
          {d.announcement.ctaText}
        </button>
      </div>

      {/* Hero — site Navbar + Footer come from PublicLayout */}
      <section className="relative bg-gradient-to-br from-[#0D2240] via-[#1A3C6E] to-[#1e4d82] pt-16 pb-14 overflow-hidden" id="top">
        <div className="pointer-events-none absolute -top-[120px] -right-[120px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(232,107,42,0.12)_0%,transparent_70%)]" />
        <div className="max-w-[1180px] mx-auto px-6 grid lg:grid-cols-[1fr_420px] gap-14 lg:gap-16 items-center">
          <div>
            <div className="imp-fade-up inline-flex items-center gap-1.5 bg-[rgba(232,107,42,0.18)] border border-[rgba(232,107,42,0.4)] text-[#E86B2A] text-[0.82rem] font-bold px-3.5 py-1.5 rounded-full mb-5">
              <DynIcon name="Star" size={12} /> {d.hero.badge}
            </div>
            <h1 className="imp-fade-up delay-1 font-['Poppins'] font-black text-[clamp(1.9rem,4vw,2.9rem)] text-white leading-[1.18] mb-4">
              {d.hero.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line.accent ? <span className="text-[#E86B2A]">{line.text}</span> : line.text}
                </span>
              ))}
            </h1>
            <p
              className="imp-fade-up delay-2 text-[1.05rem] text-white/76 leading-relaxed mb-7 imp-html-inline"
              dangerouslySetInnerHTML={{ __html: d.hero.subHtml }}
            />
            <div className="imp-fade-up delay-2 flex flex-wrap gap-2.5 mb-8">
              {d.hero.perks.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 bg-white/8 border border-white/14 px-3.5 py-1.5 rounded-full text-sm text-[#D5E8F0]"
                >
                  <DynIcon name="CheckCircle" className="text-[#E86B2A] w-3.5 h-3.5" />
                  {p}
                </div>
              ))}
            </div>
            <div className="imp-fade-up delay-3 flex flex-wrap items-center gap-3.5 mb-8">
              <button
                type="button"
                onClick={() => onEnroll?.("daily")}
                className="inline-flex items-center gap-2 bg-[#E86B2A] text-white font-['Poppins'] font-bold px-8 py-3.5 rounded-lg shadow-[0_4px_16px_rgba(232,107,42,0.35)] hover:bg-[#d05a1e] transition-colors duration-200"
              >
                Enroll Now — {heroPrice} <DynIcon name="ArrowRight" size={18} />
              </button>
              <a
                href="#program"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-['Poppins'] font-semibold px-7 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <DynIcon name="Compass" size={18} /> Explore Program
              </a>
            </div>
            <div className="imp-fade-up delay-3 flex items-center gap-2 text-sm text-white/55">
              <span
                className="text-white/55 imp-html-inline"
                dangerouslySetInnerHTML={{
                  __html:
                    d.hero.socialProofHtml ||
                    '<strong class="text-white/85">1200+ Already enrolled</strong> · 98% Student Satisfaction · Trusted by aspirants across India',
                }}
              />
            </div>
          </div>

          <div className="imp-fade-up delay-2 bg-white rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.28)] overflow-hidden" id="enroll">
            <div className="bg-gradient-to-br from-[#1A3C6E] to-[#24527A] px-6 py-6 text-center">
              <div className="w-16 h-16 rounded-[14px] bg-[#E86B2A] mx-auto mb-3 flex items-center justify-center text-white text-3xl shadow-[0_8px_20px_rgba(232,107,42,0.4)]">
                <DynIcon name="GraduationCap" size={32} />
              </div>
              <h3 className="text-white text-[1.05rem] font-bold mb-1">{d.hero.cardTitle}</h3>
              <p className="text-[#D5E8F0] text-[0.82rem]">{d.hero.cardSubtitle}</p>
            </div>
            <div className="p-6">
              <div className="flex items-end gap-2.5 mb-1">
                <div className="font-['Poppins'] text-4xl font-black text-[#1A3C6E]">{heroPrice}</div>
                {heroOld && <div className="text-[#6B7280] line-through text-lg mb-1">{heroOld}</div>}
              </div>
              {saveLine && (
                <div className="inline-block bg-[#FEF9C3] text-[#92400E] text-xs font-bold px-2.5 py-1 rounded-full border border-[#F59E0B] mb-4">
                  {saveLine}
                </div>
              )}
              {showCouponInput ? (
                <div className="mb-4">
                  <CouponApplyBox
                    onApply={onApplyCoupon}
                    onClear={onClearCoupon}
                    loading={couponApplying}
                    appliedCoupon={appliedCoupon}
                    errorMessage={couponError}
                    compact
                  />
                </div>
              ) : null}
              <ul className="list-none mb-5 space-y-0">
                {d.hero.cardFeatures.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 items-start text-sm text-[#1C2B3A] py-1.5 border-b border-[#F2F4F7] last:border-0"
                  >
                    <DynIcon name="Check" className="text-[#2D7D4E] shrink-0 mt-0.5" size={16} />
                    <HtmlLine html={line} />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onEnroll?.("daily")}
                className="block w-full text-center bg-[#E86B2A] text-white font-['Poppins'] font-bold py-4 rounded-[10px] shadow-[0_4px_14px_rgba(232,107,42,0.35)] hover:bg-[#d05a1e] transition-colors duration-200"
              >
                {d.hero.enrollCta}
              </button>
              <button
                type="button"
                onClick={onEnquire}
                className="block w-full text-center border-2 border-[#5B8DB8] text-[#1A3C6E] font-['Poppins'] font-semibold py-3 rounded-[10px] mt-2.5 hover:bg-[#D5E8F0] transition-colors duration-200"
              >
                <DynIcon name="Phone" className="inline mr-1" size={16} /> Enquire Before Enrolling
              </button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-[#6B7280] mt-3.5">
                <DynIcon name="Shield" className="text-[#2D7D4E]" size={14} /> {d.hero.cardTrust}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[#1A3C6E] py-5">
        <div className="max-w-[1180px] mx-auto px-6 flex flex-wrap justify-around gap-5 items-center">
          {d.trustBar.map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-[10px] bg-white/10 flex items-center justify-center text-[#E86B2A]">
                <DynIcon name={t.icon} size={20} />
              </div>
              <div>
                <div className="font-['Poppins'] text-xl font-extrabold text-white">{t.num}</div>
                <div className="text-[0.78rem] text-[#D5E8F0]">{t.lbl}</div>
              </div>
              {i < d.trustBar.length - 1 && <div className="hidden md:block w-px h-10 bg-white/15 mx-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <section className="bg-[#0D2240] py-20" id="pricing">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-3">
            <span className="inline-block bg-[#FDE8D8] text-[#E86B2A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
              {d.pricingSection.tag}
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[clamp(1.6rem,3vw,2.1rem)] text-white leading-tight whitespace-pre-line">
              {d.pricingSection.title}
            </h2>
            <p className="text-[#D5E8F0] mt-3 max-w-xl mx-auto leading-relaxed">{d.pricingSection.sub}</p>
          </div>
          <p className="text-center text-sm text-white/45 mb-12 whitespace-pre-line">
            {d.pricingSection.toggleHint ||
              "Scroll down for a feature-by-feature comparison table ↓"}
          </p>

          <div className="grid md:grid-cols-2 gap-7 mb-12 items-stretch">
            {/* Daily first (left) */}
            <div className="rounded-[20px] overflow-hidden bg-white border-2 border-[#E86B2A] shadow-[0_12px_48px_rgba(232,107,42,0.28)] relative hover:-translate-y-1 transition-transform flex flex-col">
              <div className="absolute top-[18px] -right-7 bg-[#E86B2A] text-white text-[0.72rem] font-extrabold py-1.5 px-9 rotate-[38deg] z-[2] tracking-wide">
                {d.pricingSection.daily.popularRibbon}
              </div>
              <div className="px-8 pt-8 pb-5 border-b border-[#F2F4F7] bg-gradient-to-br from-[#1A3C6E] to-[#24527A]">
                <div className="font-['Poppins'] text-2xl font-extrabold text-white mb-2">{d.pricingSection.daily.name}</div>
                <div className="flex items-end gap-2 flex-wrap">
                  <span className="font-['Poppins'] text-4xl font-black text-white">{fmt(d.pricingSection.daily.price)}</span>
                  <span className="text-white/45 line-through text-base mb-1">{fmt(d.pricingSection.daily.oldPrice)}</span>
                </div>
                <div className="inline-block mt-2 text-xs font-bold px-2.5 py-1 rounded-full bg-[rgba(245,158,11,0.2)] text-[#F59E0B]">
                  {d.pricingSection.daily.saveLabel}
                </div>
                <p className="text-sm font-semibold text-[#D5E8F0] mt-3">{d.pricingSection.daily.durationLine}</p>
              </div>
              <div className="px-8 py-6 flex flex-col grow">
                <ul className="space-y-0 mb-6">
                  {d.pricingSection.daily.features.map((f, i) => (
                    <li key={i} className="flex gap-2.5 py-2 border-b border-[#F2F4F7] text-sm text-[#1C2B3A]">
                      <DynIcon
                        name="Check"
                        className={`shrink-0 mt-0.5 ${
                          f.cls === "green"
                            ? "text-[#2D7D4E]"
                            : f.cls === "orange"
                              ? "text-[#E86B2A]"
                              : "text-[#F59E0B]"
                        }`}
                        size={16}
                      />
                      <span className={f.highlight ? "font-bold text-[#E86B2A]" : ""}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={() => onEnroll?.("daily")}
                    className="group block w-full text-center bg-[#E86B2A] text-white font-['Poppins'] font-bold py-4 rounded-[10px] hover:bg-[#d05a1e] shadow-[0_8px_20px_rgba(232,107,42,0.3)] transition-all"
                  >
                    {d.pricingSection.daily.cta} <DynIcon name="ArrowRight" className="inline transition-transform group-hover:translate-x-0.5" size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Weekly second (right) */}
            <div className="rounded-[20px] overflow-hidden bg-white border-2 border-[#CBD5E1] hover:-translate-y-1 transition-transform shadow-[0_10px_30px_rgba(13,34,64,0.12)] relative flex flex-col">
              <div className="absolute top-5 right-5 text-[0.68rem] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full bg-[#E8F1FF] text-[#1A3C6E] border border-[#BFD7F1]">
                Value Plan
              </div>
              <div className="px-8 pt-8 pb-5 border-b border-[#E5E7EB] bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FB]">
                <div className="font-['Poppins'] text-2xl font-extrabold text-[#1A3C6E] mb-2">{d.pricingSection.weekly.name}</div>
                <div className="flex items-end gap-2 flex-wrap">
                  <span className="font-['Poppins'] text-4xl font-black text-[#1A3C6E]">{fmt(d.pricingSection.weekly.price)}</span>
                  <span className="text-[#6B7280] line-through text-base mb-1">{fmt(d.pricingSection.weekly.oldPrice)}</span>
                </div>
                <div className="inline-block mt-2 text-xs font-bold px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#2D7D4E]">
                  {d.pricingSection.weekly.saveLabel}
                </div>
                <p className="text-sm font-semibold text-[#5B8DB8] mt-3">{d.pricingSection.weekly.durationLine}</p>
              </div>
              <div className="px-8 py-6 flex flex-col grow">
                <ul className="space-y-0 mb-6">
                  {d.pricingSection.weekly.features.map((f, i) => (
                    <li
                      key={i}
                      className={`flex gap-2.5 py-2 border-b border-[#F2F4F7] text-sm ${
                        f.ok === false ? "text-[#6B7280]" : "text-[#1C2B3A]"
                      }`}
                    >
                      {f.ok === false ? (
                        <DynIcon name="X" className="text-[#D1D5DB] shrink-0 mt-0.5" size={16} />
                      ) : (
                        <DynIcon
                          name="Check"
                          className={`shrink-0 mt-0.5 ${
                            f.cls === "green"
                              ? "text-[#2D7D4E]"
                              : f.cls === "orange"
                                ? "text-[#E86B2A]"
                                : "text-[#F59E0B]"
                          }`}
                          size={16}
                        />
                      )}
                      <span className={f.highlight ? "font-bold text-[#E86B2A]" : ""}>{f.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={() => onEnroll?.("weekly")}
                    className="group block w-full text-center bg-[#1A3C6E] text-white font-['Poppins'] font-bold py-4 rounded-[10px] hover:bg-[#0D2240] shadow-[0_8px_20px_rgba(13,34,64,0.28)] transition-all"
                  >
                    {d.pricingSection.weekly.cta} <DynIcon name="ArrowRight" className="inline transition-transform group-hover:translate-x-0.5" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="rounded-[18px] overflow-hidden border border-white/10 bg-white/4">
            <h3 className="text-center py-6 font-['Poppins'] font-bold text-white border-b border-white/10">
              {d.pricingSection.comparisonTitle}
            </h3>
            <div className="overflow-x-auto">
              <table className="imp2027-comparison-table w-full table-fixed border-collapse text-sm">
                <thead>
                  <tr className="bg-white/6">
                    <th className="w-[44%] align-middle text-left py-3.5 px-5 font-['Poppins'] text-xs font-bold text-[#D5E8F0] uppercase tracking-wide">
                      {d.pricingSection.comparisonHead.left}
                    </th>
                    <th className="w-[28%] align-middle py-3.5 px-4">
                      <div className="flex flex-col items-center justify-center gap-0.5 text-center">
                        <span className="font-['Poppins'] text-xs font-bold uppercase tracking-wide text-[#FFB48A]">
                          {d.pricingSection.comparisonHead.midLabel}
                        </span>
                        <span className="font-['Poppins'] text-[0.82rem] font-semibold leading-tight text-white drop-shadow-sm">
                          {d.pricingSection.comparisonHead.midPrice}
                        </span>
                      </div>
                    </th>
                    <th className="w-[28%] align-middle py-3.5 px-4">
                      <div className="flex flex-col items-center justify-center gap-0.5 text-center">
                        <span className="font-['Poppins'] text-xs font-bold uppercase tracking-wide text-[#D5E8F0]">
                          {d.pricingSection.comparisonHead.rightLabel}
                        </span>
                        <span className="font-['Poppins'] text-[0.82rem] font-semibold leading-tight text-white drop-shadow-sm">
                          {d.pricingSection.comparisonHead.rightPrice}
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {d.pricingSection.comparisonRows.map((row, ri) => {
                    if (row.type === "cat") {
                      return (
                        <tr key={ri} className="bg-[rgba(26,60,110,0.5)]">
                          <td colSpan={3} className="py-3 px-5 font-['Poppins'] text-xs font-bold text-[#D5E8F0] uppercase tracking-wide">
                            {row.label}
                          </td>
                        </tr>
                      );
                    }
                    if (row.type === "text") {
                      return (
                        <tr key={ri} className="border-b border-white/6 hover:bg-white/4">
                          <td className="align-middle py-3.5 px-5 text-white/75">{row.f}</td>
                          <td className="align-middle px-3 text-center text-[0.85rem] font-semibold text-[#4ADE80]">
                            {row.d}
                          </td>
                          <td className="align-middle px-3 text-center text-[0.85rem] font-semibold text-[#E86B2A]">
                            {row.w}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={ri} className="border-b border-white/6 hover:bg-white/4">
                        <td className="align-middle py-3.5 px-5 text-white/75">{row.f}</td>
                        <td className="align-middle px-3 text-center">{renderComparisonValueCell(row.d)}</td>
                        <td className="align-middle px-3 text-center">{renderComparisonValueCell(row.w)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <p
            className="text-center mt-9 text-sm text-white/45 imp-html-inline"
            dangerouslySetInnerHTML={{ __html: d.pricingSection.helpHtml }}
          />
        </div>
      </section>

      {/* USP */}
      <section className="bg-[#F8F9FB] py-20" id="program">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FDE8D8] text-[#E86B2A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
              {d.uspSection.tag}
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[clamp(1.6rem,3vw,2.1rem)] text-[#1A3C6E] whitespace-pre-line leading-tight">
              {d.uspSection.title}
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-3 leading-relaxed">{d.uspSection.sub}</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-7">
            {d.uspSection.cards.map((c, i) => {
              const shell =
                c.variant === "green"
                  ? "border-l-[#2D7D4E] bg-[#F0FDF4]"
                  : c.variant === "blue"
                    ? "border-l-[#5B8DB8] bg-[#EFF6FF]"
                    : "border-l-[#E86B2A] bg-[#FFF7F3]";
              const iconShell =
                c.variant === "green"
                  ? "bg-[#D1FAE5] text-[#2D7D4E]"
                  : c.variant === "blue"
                    ? "bg-[#BFDBFE] text-[#1A3C6E]"
                    : "bg-[#FDE8D8] text-[#E86B2A]";
              const titleCls =
                c.variant === "green"
                  ? "text-[#2D7D4E]"
                  : c.variant === "blue"
                    ? "text-[#1A3C6E]"
                    : "text-[#E86B2A]";
              const chip =
                c.variant === "green"
                  ? "bg-[#D1FAE5] text-[#2D7D4E]"
                  : c.variant === "blue"
                    ? "bg-[#DBEAFE] text-[#1A3C6E]"
                    : "bg-[#FDE8D8] text-[#E86B2A]";
              const linkCls =
                c.variant === "green"
                  ? "text-[#2D7D4E]"
                  : c.variant === "blue"
                    ? "text-[#1A3C6E]"
                    : "text-[#E86B2A]";
              return (
              <div
                key={i}
                className={`rounded-2xl p-8 shadow-md border-l-[6px] transition hover:-translate-y-1 hover:shadow-lg ${shell}`}
              >
                <div
                  className={`w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl mb-4 ${iconShell}`}
                >
                  <DynIcon name={c.icon} size={28} />
                </div>
                <h3 className={`text-lg font-extrabold mb-2 ${titleCls}`}>{c.title}</h3>
                {c.bodyHtml ? (
                  <p
                    className="text-[#6B7280] leading-relaxed text-[0.96rem] mb-4 imp-html-inline"
                    dangerouslySetInnerHTML={{ __html: c.bodyHtml }}
                  />
                ) : (
                  <p className="text-[#6B7280] leading-relaxed text-[0.96rem] mb-4">{c.body}</p>
                )}
                {c.stepsMode === "stack" ? (
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-semibold">
                    {c.steps.map((s, j) => (
                      <span key={j} className={`px-2.5 py-1 rounded-md text-center whitespace-nowrap ${chip}`}>
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold">
                  {c.steps.map((s, j) => (
                    <span key={j} className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md ${chip}`}>{s}</span>
                      {j < c.steps.length - 1 && <span className="text-[#6B7280]">→</span>}
                    </span>
                  ))}
                </div>
                )}
                {c.linkText &&
                  (c.external ? (
                    <a
                      href={c.linkHref}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 font-bold text-sm ${linkCls}`}
                    >
                      {c.linkText} <DynIcon name="ArrowRight" size={14} />
                    </a>
                  ) : (
                    <a href={c.linkHref} className={`inline-flex items-center gap-1 font-bold text-sm ${linkCls}`}>
                      {c.linkText} <DynIcon name="ArrowRight" size={14} />
                    </a>
                  ))}
              </div>
              );
            })}
          </div>
          <div className="mt-8 bg-[#1A3C6E] rounded-xl px-6 py-5 flex gap-3.5 items-start">
            <DynIcon name="Trophy" className="text-[#F59E0B] shrink-0 mt-0.5" size={24} />
            <p className="text-[#D5E8F0] text-sm font-semibold m-0 imp-html-inline" dangerouslySetInnerHTML={{ __html: d.uspSection.competitorHtml }} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white">
        <div className="max-w-[1180px] mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FDE8D8] text-[#E86B2A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
              {d.featuresSection.tag}
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[clamp(1.6rem,3vw,2.1rem)] text-[#1A3C6E]">{d.featuresSection.title}</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-3">{d.featuresSection.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {d.featuresSection.items.map((it, i) => {
              const bar = {
                navy: "bg-[#1A3C6E]",
                orange: "bg-[#E86B2A]",
                sky: "bg-[#5B8DB8]",
                green: "bg-[#2D7D4E]",
                gold: "bg-[#F59E0B]",
                rose: "bg-[#E11D48]",
              };
              const iconBg = {
                navy: "bg-[#EEF3FA] text-[#1A3C6E]",
                orange: "bg-[#FDE8D8] text-[#E86B2A]",
                sky: "bg-[#D5E8F0] text-[#5B8DB8]",
                green: "bg-[#D1FAE5] text-[#2D7D4E]",
                gold: "bg-[#FEF9C3] text-[#F59E0B]",
                rose: "bg-[#FFE4E6] text-[#E11D48]",
              };
              return (
                
                <div
                  key={i}
                  className="relative border border-[#E5E7EB] rounded-2xl p-7 shadow-sm hover:-translate-y-1 hover:shadow-lg transition overflow-hidden"
                >
                  <div className={`w-[58px] h-[58px] rounded-[14px] flex items-center justify-center text-2xl mb-4 ${iconBg[it.theme]}`}>
                    <DynIcon name={it.icon} size={26} />
                  </div>
                  <h3 className="font-bold text-[#1A3C6E] mb-2 text-[1.05rem]">{it.title}</h3>
                  <p className="text-[#6B7280] text-[0.92rem] leading-relaxed">{it.body}</p>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl ${bar[it.theme]}`} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Dashboard */}
      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-11">
            <span className="inline-block bg-[#FDE8D8] text-[#E86B2A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
              Student Dashboard
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[clamp(1.6rem,3vw,2.15rem)] text-[#1A3C6E] leading-tight">
              AI Powered Student Dashboard
              {/* <br className="hidden sm:block" /> In One Smart Dashboard */}
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto mt-3 leading-relaxed text-[0.95rem]">
              IMP 2027 students get exclusive access to a personalised digital dashboard that tracks every
              dimension of UPSC preparation in real time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dashboardCards.map((card, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-[#E5E7EB] border-t-[3px] ${card.accent} p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all`}
              >
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-3 ${card.iconShell}`}>
                  <DynIcon name={card.icon} size={18} />
                </div>
                <h3 className="font-['Poppins'] text-[0.96rem] font-bold text-[#1A3C6E] mb-2">{card.title}</h3>
                <p className="text-[#6B7280] text-[0.82rem] leading-relaxed">{card.body}</p>
                {card.note && <p className={`mt-2 text-[0.72rem] font-bold ${card.noteTone}`}>{card.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — horizontal scroll + progress (matches IMP roadmap design) */}
      <section className="bg-[#0D2240] py-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-block bg-[rgba(232,107,42,0.22)] text-[#E86B2A] text-[0.68rem] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3.5 border border-[rgba(232,107,42,0.35)]">
              {d.timelineSection.tag}
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[clamp(1.5rem,3vw,2.1rem)] text-white leading-tight">
              {d.timelineSection.title}
            </h2>
            <p className="text-[#D5E8F0] max-w-2xl mx-auto mt-3 text-[0.92rem] md:text-[0.98rem] leading-relaxed">
              {d.timelineSection.sub}
            </p>
          </div>

          <div
            ref={timelineScrollRef}
            onScroll={updateTimelineScroll}
            className="imp-timeline-scroll -mx-6 px-6 overflow-x-auto overflow-y-visible pb-2 scroll-smooth snap-x snap-mandatory lg:overflow-x-visible [scrollbar-width:thin] [scrollbar-color:rgba(232,107,42,0.6)_rgba(255,255,255,0.08)]"
          >
            <div className="imp-timeline-row relative flex lg:grid lg:grid-cols-8 gap-5 md:gap-6 pt-1 pb-6 min-w-[1280px] lg:min-w-0">
              <div
                className="pointer-events-none absolute top-[27px] left-[calc(3.5rem/2)] right-[calc(3.5rem/2)] h-[3px] z-0 rounded-full opacity-95 hidden sm:block imp-timeline-line"
                aria-hidden
              />
              {d.timelineSection.phases.map((ph, i) => {
                const durTone = ph.durationTone || "default";
                const durCls =
                  durTone === "orange"
                    ? "bg-[#E86B2A]/25 text-[#FDBA74] border border-[#E86B2A]/45"
                    : durTone === "green"
                      ? "bg-[#2D7D4E]/28 text-[#86EFAC] border border-[#2D7D4E]/45"
                      : durTone === "teal"
                        ? "bg-[#0D9488]/25 text-[#5EEAD4] border border-[#0D9488]/45"
                        : durTone === "yellow"
                          ? "bg-[#CA8A04]/22 text-[#FDE68A] border border-[#CA8A04]/40"
                          : durTone === "purple"
                            ? "bg-[#8B5CF6]/22 text-[#DDD6FE] border border-[#8B5CF6]/40"
                            : durTone === "blue"
                              ? "bg-[#3B82F6]/18 text-[#BFDBFE] border border-[#3B82F6]/35"
                              : durTone === "lavender"
                                ? "bg-[#9D8DF1]/22 text-[#EDE9FE] border border-[#9D8DF1]/45"
                                : "bg-white/10 text-[#D5E8F0] border border-white/15";
                return (
                  <div
                    key={i}
                    className="text-center relative z-[1] w-[11.5rem] sm:w-[12.5rem] lg:w-auto shrink-0 lg:shrink flex flex-col items-center snap-center lg:snap-none"
                  >
                    <div
                      className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center text-white shadow-lg ${
                        ph.highlight
                          ? "ring-[3px] ring-[#E86B2A]/55 shadow-[0_0_28px_rgba(232,107,42,0.42)]"
                          : ""
                      }`}
                      style={{ background: ph.color }}
                    >
                      <DynIcon name={ph.icon} size={22} />
                    </div>
                    {ph.dates && (
                      <div className="text-[0.62rem] sm:text-[0.65rem] font-bold uppercase tracking-wider text-[#E86B2A] mb-1">
                        {ph.dates}
                      </div>
                    )}
                    <div className="font-['Poppins'] font-bold text-white text-[0.78rem] sm:text-[0.82rem] leading-snug mb-1.5 min-h-[2.4rem] flex items-center justify-center">
                      {ph.label}
                    </div>
                    {ph.detail && (
                      <p className="text-[0.65rem] sm:text-[0.68rem] leading-relaxed text-[#D5E8F0]/88 mb-2 grow text-balance">
                        {ph.detail}
                      </p>
                    )}
                    {!ph.detail && ph.sub && (
                      <div className="text-[0.78rem] text-[#D5E8F0]">{ph.sub}</div>
                    )}
                    {ph.duration && (
                      <span
                        className={`inline-block mt-auto text-[0.55rem] sm:text-[0.58rem] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md ${durCls}`}
                      >
                        {ph.duration}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-4">
            <div className="h-1 rounded-full bg-white/12 mb-3 overflow-hidden">
              <div
                className="h-full bg-[#E86B2A] rounded-full transition-[width] duration-150 ease-out"
                style={{ width: `${timelineViewPct}%` }}
              />
            </div>
            <div className="bg-[#1A3C6E] border border-white/10 rounded-xl py-4 px-5 md:px-6 flex items-start gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <DynIcon name="Info" className="text-[#E86B2A] shrink-0 mt-0.5" size={20} />
              <p className="text-left text-[#E8F1F8] text-[0.88rem] md:text-sm leading-relaxed m-0">
                {d.timelineSection.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Included tabs */}
      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-[#FDE8D8] text-[#E86B2A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
              {d.includedSection.tag}
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[clamp(1.6rem,3vw,2.1rem)] text-[#1A3C6E]">{d.includedSection.title}</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-3">{d.includedSection.sub}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {d.includedSection.tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`font-['Poppins'] text-sm font-semibold px-6 py-2.5 rounded-full border-2 transition ${
                  tab === t.id
                    ? "bg-[#1A3C6E] text-white border-[#1A3C6E]"
                    : "border-[#5B8DB8] text-[#1A3C6E] hover:bg-[#1A3C6E] hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {included && (
            <div className="grid md:grid-cols-2 gap-5">
              {included.items.map((it, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-5 flex gap-3.5 shadow-sm border-l-4 border-[#1A3C6E]"
                >
                  <div className="w-[42px] h-[42px] shrink-0 rounded-[10px] bg-[#D5E8F0] text-[#1A3C6E] flex items-center justify-center">
                    <DynIcon name={it.icon} size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A3C6E] text-[0.95rem] mb-1">{it.title}</h4>
                    <p className="text-[#6B7280] text-[0.85rem] leading-snug">{it.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FDE8D8] text-[#E86B2A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
              {d.testimonialsSection.tag}
            </span>
            <h2 className="font-['Poppins'] font-extrabold text-[clamp(1.6rem,3vw,2.1rem)] text-[#1A3C6E]">{d.testimonialsSection.title}</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto mt-3">{d.testimonialsSection.sub}</p>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {d.testimonialsSection.items.map((t, i) => (
              <div
                key={i}
                className="bg-[#F8F9FB] rounded-2xl p-7 shadow-sm border-t-4 border-[#1A3C6E] relative hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <span className="absolute top-5 right-5 text-[0.72rem] font-bold px-2.5 py-1 rounded-full bg-[#FDE8D8] text-[#E86B2A]">
                  {t.stage}
                </span>
                <DynIcon name="Quote" className="text-[#D5E8F0] mb-3" size={32} />
                <div className="text-[#F59E0B] text-sm mb-3">★★★★★</div>
                <p className="text-[#1C2B3A] leading-relaxed italic text-[0.96rem] mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-['Poppins'] font-extrabold"
                    style={{ background: t.avBg }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold text-[#1A3C6E] text-sm">{t.name}</div>
                    <div className="text-xs text-[#6B7280] flex items-center gap-1">
                      <DynIcon name="MapPin" className="text-[#E86B2A]" size={12} /> {t.loc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F8F9FB] py-20">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
            <div>
              <span className="inline-block bg-[#FDE8D8] text-[#E86B2A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
                {d.faqSection.tag}
              </span>
              <h2 className="font-['Poppins'] font-extrabold text-[clamp(1.6rem,3vw,2.1rem)] text-[#1A3C6E] mb-3">{d.faqSection.title}</h2>
              <p className="text-[#6B7280] mb-7">{d.faqSection.sub}</p>
              <div className="bg-[#1A3C6E] rounded-xl p-7">
                <p className="text-[#D5E8F0] text-sm mb-3.5">Still have questions? Talk to our team directly.</p>
                <a
                  href={`https://wa.me/${d.contact.wa}?text=${encodeURIComponent("Hello MentorsDaily! I have a query about IMP 2027.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#E86B2A] text-white text-sm font-bold px-5 py-3 rounded-lg"
                >
                  <DynIcon name="MessageCircle" size={18} /> Chat on WhatsApp
                </a>
                <div className="mt-3">
                  <a href={`tel:${d.contact.phoneTel}`} className="text-[#D5E8F0] text-sm flex items-center gap-2">
                    <DynIcon name="Phone" size={16} /> {d.contact.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
            <ul className="list-none m-0 p-0 space-y-3">
              {d.faqSection.items.map((item, i) => (
                <li
                  key={i}
                  className={`rounded-xl border border-[#E5E7EB] bg-white px-4 sm:px-5 transition-shadow duration-200 ${
                    openFaq === i ? "shadow-sm" : "hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between gap-3 py-4 text-left font-['Poppins'] font-semibold text-[#1A3C6E] hover:text-[#E86B2A] bg-transparent border-0 cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  >
                    {item.q}
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 transition ${
                        openFaq === i ? "bg-[#E86B2A] text-white rotate-45" : "bg-[#D5E8F0] text-[#24527A]"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="pb-4 text-[#6B7280] text-[0.94rem] leading-relaxed">{item.a}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-br from-[#0D2240] to-[#1A3C6E] py-20 text-center">
        <div className="max-w-[1180px] mx-auto px-6">
          <h2 className="font-['Poppins'] font-black text-[clamp(1.8rem,4vw,2.6rem)] text-white mb-3">{d.bottomCta.title}</h2>
          <p className="text-[#D5E8F0] max-w-xl mx-auto mb-9 leading-relaxed">{d.bottomCta.sub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => onEnroll?.("daily")}
              className="inline-flex items-center gap-2 bg-[#E86B2A] text-white font-bold px-9 py-4 rounded-lg text-lg hover:bg-[#d05a1e]"
            >
              {d.bottomCta.primary} — {heroPrice} <DynIcon name="ArrowRight" />
            </button>
            <a
              href={`https://wa.me/${d.contact.wa}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10"
            >
              <DynIcon name="MessageCircle" /> {d.bottomCta.secondary}
            </a>
          </div>
          <p className="mt-6 text-sm text-white/50 flex flex-wrap justify-center gap-2 items-center">
            <DynIcon name="Shield" className="text-[#2D7D4E]" size={16} /> {d.bottomCta.guarantee}
          </p>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[#E5E7EB] p-3 z-[998] shadow-[0_-4px_20px_rgba(0,0,0,0.12)]">
        <button
          type="button"
          onClick={() => onEnroll?.("daily")}
          className="w-full flex items-center justify-center gap-2 bg-[#E86B2A] text-white font-bold py-3 rounded-lg transition-colors duration-200 hover:bg-[#d05a1e]"
        >
          {d.stickyMobileCta} — {heroPrice} <DynIcon name="ArrowRight" size={18} />
        </button>
      </div>
    </div>
  );
}
