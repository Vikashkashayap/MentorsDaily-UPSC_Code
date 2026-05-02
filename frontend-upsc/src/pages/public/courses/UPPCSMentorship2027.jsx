import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "../../../components/SEO/SEOHead";
import PaymentForm from "../../../components/payment/PaymentForm";
import "./uppcs2026Landing.css";

export const UPPCS_2027_SLUGS = {
  daily: "uppcs-2027-daily",
  bnsPrelims: "uppcs-2027-bns-prelims",
  combo: "uppcs-2027-upsc-combo",
  mains: "uppcs-2027-mains-booster",
};

/** @typedef {'daily' | 'bnsPrelims' | 'combo' | 'mains'} Uppcs2027PlanKey */

const PAYMENT_PLANS = {
  daily: {
    slug: UPPCS_2027_SLUGS.daily,
    title: "UPPCS 2027 — Complete (Daily)",
    sellingPrice: 60000,
    basePrice: 120000,
    discountPercentage: 50,
  },
  bnsPrelims: {
    slug: UPPCS_2027_SLUGS.bnsPrelims,
    title: "UPPCS 2027 — BNS for Prelims",
    sellingPrice: 15000,
    basePrice: 15000,
    discountPercentage: 0,
  },
  combo: {
    slug: UPPCS_2027_SLUGS.combo,
    title: "UPPCS + UPSC Combo 2027",
    sellingPrice: 45000,
    basePrice: 45000,
    discountPercentage: 0,
  },
  mains: {
    slug: UPPCS_2027_SLUGS.mains,
    title: "UPPCS 2027 — Mains Booster",
    sellingPrice: 20000,
    basePrice: 20000,
    discountPercentage: 0,
  },
};

const HERO_PILLS = [
  "Structured Syllabus Tree",
  "Daily Targets",
  "BNS / BNSS / BSA — Prelims Legal GK",
  "Module Tests",
  "Q-by-Q Test Analysis",
  "Mentor-Led Batches",
  "Exam: December 2027",
];

const HOW_STEPS = [
  {
    n: 1,
    title: "Syllabus Tree",
    body:
      "Your entire UPPCS syllabus is mapped into subjects → modules → daily topics on the portal. You know exactly what to study every single day — no confusion, no guesswork.",
  },
  {
    n: 2,
    title: "Module-Based Learning",
    body:
      "Each subject is divided into focused modules of 7–10 days. Structured notes, resources, and a clear topic list for each module. One module at a time — never overwhelmed.",
  },
  {
    n: 3,
    title: "Module Test",
    body:
      "After every module, you appear for a test covering only what you just studied. No random questions from 5 subjects — just focused, fair, modulespecific MCQs.",
  },
  {
    n: 4,
    title: "Test Analysis",
    body:
      "After every test, you fill a detailed Q-by-Q analysis — marking Status (Correct/Incorrect/Skipped), Difficulty, and the reason you got it wrong. This becomes your personal revision map.",
  },
  {
    n: 5,
    title: "Mentor Review",
    body:
      "Your assigned mentor reviews your test analysis and gives targeted feedback — exactly which topics need revisiting before you advance to the next module. No generic advice.",
  },
  {
    n: 6,
    title: "Revision Cycles",
    body:
      "Three structured revision phases are built into the plan — subject-wise revision, full-syllabus revision, and Prelims-focus mode. Nothing is left to chance before exam day.",
  },
];

const TIMELINE = [
  {
    phase: "Phase 1",
    title: "Full Syllabus Coverage",
    dates: "April 13 → August 10, 2027  |  120 Days",
    body:
      "All 15 GS subjects + UP State Section covered module by module. Daily targets assigned on the portal. Module test after every module. Mentor review throughout.",
    align: "left",
  },
  {
    phase: "Phase 2",
    title: "Subject-Wise Revision",
    dates: "August 11 → September 20, 2027  |  40 Days",
    body:
      "Quick subject-by-subject revision using your test analysis as a guide. Focus on weak topics flagged in Phase 1. Speed and consolidation — not new content.",
    align: "right",
  },
  {
    phase: "Phase 3",
    title: "Full Syllabus Rapid Revision",
    dates: "September 21 → October 7, 2027  |  17 Days",
    body:
      "Complete syllabus rapid-fire revision. Short notes, high-yield facts, and full-mock practice. Syllabus 100% done by 1st week of October.",
    align: "left",
  },
  {
    phase: "Phase 4",
    title: "Prelims Focus Mode",
    dates: "October 8 → December 2027  |  ~80 Days",
    body:
      "Intensive MCQ practice, PYQ series (2015–2024), full mock tests, UP GK sprints, CSAT revision, and dedicated BNS / BNSS / BSA legal-GK drills aligned with UPPSC. You enter the exam hall fully prepared.",
    align: "right",
  },
];

const SUBJECTS = [
  { tag: "GS Paper 1", tagClass: "uppcs-tag-gs1", title: "Ancient History", mods: "3 Modules + Full Test" },
  { tag: "GS Paper 1", tagClass: "uppcs-tag-gs1", title: "Medieval History", mods: "3 Modules + Full Test" },
  { tag: "GS Paper 1", tagClass: "uppcs-tag-gs1", title: "Modern History", mods: "5 Modules + Full Test" },
  { tag: "GS Paper 1", tagClass: "uppcs-tag-gs1", title: "Art & Culture", mods: "3 Modules + Full Test" },
  { tag: "GS Paper 1", tagClass: "uppcs-tag-gs1", title: "World Geography", mods: "3 Modules + Full Test" },
  { tag: "GS Paper 1", tagClass: "uppcs-tag-gs1", title: "Indian Geography", mods: "4 Modules + Full Test" },
  {
    tag: "Prelims Legal GK",
    tagClass: "uppcs-tag-gs2",
    title: "BNS, BNSS & BSA (New Criminal Laws)",
    mods: "Capsule modules + Legal GK MCQ Test",
  },
  { tag: "GS Paper 2", tagClass: "uppcs-tag-gs2", title: "Indian Polity", mods: "6 Modules + Full Test" },
  { tag: "GS Paper 2", tagClass: "uppcs-tag-gs2", title: "International Relations", mods: "2 Modules + Full Test" },
  { tag: "GS Paper 2", tagClass: "uppcs-tag-gs2", title: "Social Issues & Governance", mods: "2 Modules + Full Test" },
  { tag: "GS Paper 3", tagClass: "uppcs-tag-gs3", title: "Economy", mods: "6 Modules + Full Test" },
  { tag: "GS Paper 3", tagClass: "uppcs-tag-gs3", title: "Environment & Ecology", mods: "4 Modules + Full Test" },
  { tag: "GS Paper 3", tagClass: "uppcs-tag-gs3", title: "Science & Technology", mods: "3 Modules + Full Test" },
  { tag: "GS Paper 3", tagClass: "uppcs-tag-gs3", title: "Internal Security", mods: "2 Modules + Full Test" },
  { tag: "GS Paper 3", tagClass: "uppcs-tag-gs3", title: "Disaster Management", mods: "1 Module + Full Test" },
  { tag: "GS Paper 4", tagClass: "uppcs-tag-gs4", title: "Ethics & Integrity", mods: "3 Modules + Full Test" },
  {
    tag: "UP State Section",
    tagClass: "uppcs-tag-state",
    title: "UP History, Geography & Administration",
    mods: "2 Modules + State Test — Exclusive to UPPCS",
    highlight: true,
  },
];

const PORTAL_FEATURES = [
  {
    icon: "\u{1F333}",
    title: "Syllabus Tree",
    text: "Visual map of your entire UPPCS syllabus. Tick off topics as you complete them. Green = done, Orange = in progress, Grey = pending.",
  },
  {
    icon: "\u{1F3AF}",
    title: "Daily Target Dashboard",
    text: "Every morning you know exactly what today's topics are — no planning needed. Just open the portal and start studying.",
  },
  {
    icon: "\u{1F4CA}",
    title: "Module Progress Tracker",
    text: "See completion % for every subject and every module. Know at a glance where you're ahead and where you're behind.",
  },
  {
    icon: "\u{1F4DD}",
    title: "Test Submission & Q-by-Q Analysis",
    text: "Submit your test results with a detailed question-by-question breakdown — status, difficulty, and reason for error. Your weaknesses become visible.",
  },
  {
    icon: "\u{1F468}\u{200D}\u{1F3EB}",
    title: "Direct Mentor Access",
    text: "Your assigned mentor can see your progress, flag weak areas, and give you personalised guidance — not generic feedback.",
  },
];

const PORTAL_PROGRESS = [
  { subj: "Ancient History", pct: 100 },
  { subj: "Modern History", pct: 72 },
  { subj: "Indian Polity", pct: 45 },
  { subj: "Economy", pct: 20 },
  { subj: "Geography", pct: 60 },
];

const COMPLETE_FEATURES = [
  "Full syllabus — 15 GS subjects + UP State Section",
  "Module-based structured daily planner",
  "Test after every module (~50 tests total)",
  "Detailed Q-by-Q test analysis system",
  "Personal mentor assigned from Day 1",
  "Full MentorsDaily Portal access",
  "Syllabus Tree + Daily Target Dashboard",
  "4 structured revision cycles",
  "PYQ Practice Bank (2015–2024)",
  "5 Full Mock Tests in Prelims Phase",
  "UP-specific GK & Current Affairs module",
  "BNS / BNSS / BSA legal-GK module mapped to UPPSC Prelims pattern",
  "Valid through UPPCS Dec 2027 exam",
];

const BNS_PRELIMS_FEATURES = [
  "BNS (Bharatiya Nyaya Sanhita) — structured topic list to exam depth",
  "BNSS & BSA high-yield capsules where UPPSC asks MCQs",
  "IPC vs BNS comparison notes only where still exam-relevant",
  "Chapter- and offence-type MCQ sets after every capsule",
  "Mixed Legal GK tests — statutes, definitions, punishments, exceptions",
  "UP-specific legal current affairs tie-ins (notifications, rules)",
  "Portal access — progress tracker for legal GK completion",
  "Mentor support for statute-based doubts",
  "Flexible start — complete in 4–5 months alongside GS/CSAT",
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function UPPCSMentorship2027() {
  const location = useLocation();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  /** @type {[Uppcs2027PlanKey | null, function]} */
  const [enrollPlan, setEnrollPlan] = useState(null);

  const openCheckout = useCallback((plan) => {
    setEnrollPlan(plan);
    setShowPaymentForm(true);
  }, []);

  useEffect(() => {
    if (showPaymentForm) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPaymentForm]);

  const paymentCourse =
    enrollPlan && PAYMENT_PLANS[enrollPlan] ? PAYMENT_PLANS[enrollPlan] : PAYMENT_PLANS.daily;

  const closePayment = () => {
    setEnrollPlan(null);
    setShowPaymentForm(false);
  };

  return (
    <>
      <SEOHead pathname={location.pathname} />
      <div className="uppcs2026-landing">
        <div className="uppcs-hero">
          <div className="uppcs-hero-badge">UPPCS 2027 — Batch Open</div>
          <h1>
            Crack <span>UPPCS 2027</span>
            <br />
            The Right Way
          </h1>
          <p>
            India&apos;s most structured UPPCS programme — module-by-module, mentor-guided, with a live Syllabus Tree
            portal that tracks every topic you study.
          </p>
          <div className="uppcs-hero-pills">
            {HERO_PILLS.map((t) => (
              <span key={t} className="uppcs-pill">
                {t}
              </span>
            ))}
          </div>
          <div className="uppcs-hero-btns">
            <button type="button" className="uppcs-btn-primary" onClick={() => scrollToId("pricing")}>
              View Courses & Fees
            </button>
            <button type="button" className="uppcs-btn-outline" onClick={() => scrollToId("how")}>
              How It Works
            </button>
          </div>
          <div className="uppcs-hero-stats">
            <div className="uppcs-stat">
              <span className="uppcs-num">15+</span>
              <span className="uppcs-lbl">Subjects Covered</span>
            </div>
            <div className="uppcs-stat">
              <span className="uppcs-num">120+</span>
              <span className="uppcs-lbl">Modules & Tests</span>
            </div>
            <div className="uppcs-stat">
              <span className="uppcs-num">4</span>
              <span className="uppcs-lbl">Revision Cycles</span>
            </div>
          </div>
        </div>

        <section className="uppcs-how-bg uppcs-section" id="how">
          <div className="uppcs-container">
            <div className="uppcs-text-center">
              <div className="uppcs-section-label">The Method</div>
              <div className="uppcs-section-title">6 Steps from Enrolment to Exam Ready</div>
              <p className="uppcs-section-sub-center">
                We don&apos;t just give you content — we give you a complete system. Every step is intentional, trackable,
                and mentor-verified.
              </p>
            </div>
            <div className="uppcs-steps">
              {HOW_STEPS.map((s) => (
                <div key={s.n} className="uppcs-step">
                  <div className="uppcs-step-num">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="uppcs-section">
          <div className="uppcs-container">
            <div className="uppcs-text-center">
              <div className="uppcs-section-label">Study Plan</div>
              <div className="uppcs-section-title">Roadmap to UPPCS 2027</div>
              <p className="uppcs-section-sub-center">
                Full syllabus completed by 1st week of October 2027 — leaving 2 full months of dedicated Prelims
                preparation before the December exam.
              </p>
            </div>
            <div className="uppcs-timeline">
              {TIMELINE.map((item) => (
                <div key={item.phase} className="uppcs-tl-item">
                  {item.align === "left" ? (
                    <>
                      <div className="uppcs-tl-content">
                        <div className="uppcs-tl-phase">{item.phase}</div>
                        <h3>{item.title}</h3>
                        <div className="uppcs-dates">{item.dates}</div>
                        <p>{item.body}</p>
                      </div>
                      <div className="uppcs-tl-dot" />
                      <div className="uppcs-tl-spacer" />
                    </>
                  ) : (
                    <>
                      <div className="uppcs-tl-spacer" />
                      <div className="uppcs-tl-dot" />
                      <div className="uppcs-tl-content">
                        <div className="uppcs-tl-phase">{item.phase}</div>
                        <h3>{item.title}</h3>
                        <div className="uppcs-dates">{item.dates}</div>
                        <p>{item.body}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="uppcs-subjects-bg uppcs-section" id="subjects">
          <div className="uppcs-container">
            <div className="uppcs-text-center">
              <div className="uppcs-section-label uppcs-section-label--on-dark">What You&apos;ll Study</div>
              <div className="uppcs-section-title">Complete UPPCS Syllabus — Every Topic Covered</div>
              <p className="uppcs-section-sub-center">
                15 GS subjects mapped to UPPCS Prelims &amp; Mains pattern, plus a dedicated UP State Section not found in
                generic UPSC courses.
              </p>
            </div>
            <div className="uppcs-subj-grid">
              {SUBJECTS.map((s) => (
                <div
                  key={`${s.tag}-${s.title}`}
                  className={`uppcs-subj-card${s.highlight ? " uppcs-subj-card--highlight" : ""}`}
                >
                  <span className={`uppcs-subj-tag ${s.tagClass}`}>{s.tag}</span>
                  <h4>{s.title}</h4>
                  <div className="uppcs-mods">{s.mods}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="uppcs-section" id="portal">
          <div className="uppcs-container">
            <div className="uppcs-portal-grid">
              <div>
                <div className="uppcs-section-label">MentorsDaily Portal</div>
                <div className="uppcs-section-title">
                  Your Entire UPPCS Journey
                  <br />
                  On One Dashboard
                </div>
                <p className="uppcs-section-sub" style={{ marginBottom: 36 }}>
                  The portal is not just a course page — it is a live companion that tracks where you are, what you need
                  to do today, and what went wrong in your last test.
                </p>
                <div className="uppcs-portal-features">
                  {PORTAL_FEATURES.map((f) => (
                    <div key={f.title} className="uppcs-pf">
                      <div className="uppcs-pf-icon">{f.icon}</div>
                      <div className="uppcs-pf-text">
                        <h4>{f.title}</h4>
                        <p>{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="uppcs-portal-visual">
                <div className="uppcs-portal-mock">
                  <div className="uppcs-pm-title">Subject Progress</div>
                  {PORTAL_PROGRESS.map((row) => (
                    <div key={row.subj} className="uppcs-pm-row">
                      <span className="uppcs-pm-subj">{row.subj}</span>
                      <div className="uppcs-pm-bar-wrap">
                        <div className="uppcs-pm-bar" style={{ width: `${row.pct}%` }} />
                      </div>
                      <span className="uppcs-pm-pct">{row.pct}%</span>
                    </div>
                  ))}
                </div>
                <div className="uppcs-pm-today">
                  <div className="uppcs-label">Today&apos;s Target</div>
                  <div className="uppcs-task">Legal GK — BNS Capsule 2</div>
                  <div className="uppcs-sub">Offences against body &amp; person — MCQ drill + mentor notes</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="uppcs-pricing-bg uppcs-section" id="pricing">
          <div className="uppcs-container">
            <div className="uppcs-text-center">
              <div className="uppcs-section-label">Enrol Now</div>
              <div className="uppcs-section-title">Choose Your Course</div>
              <p className="uppcs-section-sub-center">
                Full Daily programme for UPPCS 2027, plus a focused <strong>BNS for Prelims</strong> add-on track for the new criminal law stack (BNS / BNSS / BSA).
              </p>
            </div>
            <div className="uppcs-pricing-grid">
              <div className="uppcs-price-card uppcs-featured">
                <span className="uppcs-pc-badge">Most Popular · 50% OFF</span>
                <div className="uppcs-pc-head">
                  <div className="uppcs-pc-name">Complete Programme — Daily</div>
                  <div className="uppcs-pc-price uppcs-pc-price--stacked">
                    <span className="uppcs-pc-mrp">&#8377;1,20,000</span>
                    <span className="uppcs-pc-sale">
                      &#8377;60,000<span>/course</span>
                    </span>
                  </div>
                  {/* <div className="uppcs-pc-duration">April 2027 – December 2027</div> */}
                  <div className="uppcs-pc-tagline">Prelims + Mains Foundation — Full Syllabus · Daily mentor rhythm</div>
                </div>
                <div className="uppcs-pc-body">
                  <ul className="uppcs-pc-features">
                    {COMPLETE_FEATURES.map((line) => (
                      <li key={line}>
                        <span className="uppcs-check">&#10003;</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="uppcs-pc-cta" onClick={() => openCheckout("daily")}>
                    Enrol — Daily Plan →
                  </button>
                  <div className="uppcs-pc-emi">
                    Easy EMI available: <strong>&#8377;20,000 × 3 months</strong>
                  </div>
                </div>
              </div>

              <div className="uppcs-price-card">
                <div className="uppcs-pc-head uppcs-prelims">
                  <div className="uppcs-pc-name">BNS for Prelims</div>
                  <div className="uppcs-pc-price">
                    &#8377;15,000<span>/course</span>
                  </div>
                  <div className="uppcs-pc-duration">Flexible Start  |  4–5 Months</div>
                  <div className="uppcs-pc-tagline">
                    Bharatiya Nyaya Sanhita + BNSS &amp; BSA — MCQ-first, UPPSC-aligned legal GK
                  </div>
                </div>
                <div className="uppcs-pc-body">
                  <ul className="uppcs-pc-features">
                    {BNS_PRELIMS_FEATURES.map((line) => (
                      <li key={line}>
                        <span className="uppcs-check">&#10003;</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="uppcs-pc-cta uppcs-pc-cta--navy" onClick={() => openCheckout("bnsPrelims")}>
                    Enrol — BNS for Prelims →
                  </button>
                  <div className="uppcs-pc-emi">
                    Add to Daily or study standalone — <strong>upgrade paths available</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="uppcs-section">
          <div className="uppcs-container">
            <div className="uppcs-text-center">
              <div className="uppcs-section-label">Also Consider</div>
              <div className="uppcs-section-title">Two More Ways to Prepare</div>
              <p className="uppcs-section-sub-center">
                For serious long-term aspirants and students who have already cleared Prelims.
              </p>
            </div>
            <div className="uppcs-suggest-grid">
              <div className="uppcs-sug-card">
                <span className="uppcs-sug-tag">Best Value</span>
                <h3 style={{ marginTop: 12 }}>UPPCS + UPSC Combo</h3>
                <div className="uppcs-sug-price">
                  ₹45,000{" "}
                  <span style={{ fontSize: 14, color: "var(--uppcs-muted)", fontWeight: 400 }}>Save ₹15,000</span>
                </div>
                <p>
                  Study common GS modules once — UPPCS track finishes by Oct 2027, then you seamlessly continue on the
                  UPSC track towards May 2028. One fee, two exams. Best for aspirants targeting both.
                </p>
                <button type="button" className="uppcs-sug-cta" onClick={() => openCheckout("combo")}>
                  Enrol — Combo →
                </button>
              </div>

              <div className="uppcs-sug-card">
                <span className="uppcs-sug-tag">Mains Ready</span>
                <h3 style={{ marginTop: 12 }}>UPPCS Mains Booster</h3>
                <div className="uppcs-sug-price">&#8377;20,000</div>
                <p>
                  Already cleared Prelims? This focused programme gives you a structured Mains plan — GS Paper 1 to 4
                  modules, answer-writing practice, and mentor feedback on your answers. For UPPCS Mains aspirants only.
                </p>
                <button type="button" className="uppcs-sug-cta" onClick={() => openCheckout("mains")}>
                  Enrol — Mains Booster →
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="uppcs-cta-banner">
          <h2>Your UPPCS 2027 Journey Starts Today</h2>
          <p>Seats are limited per batch to maintain mentorship quality. Batch starting April 2027.</p>
          <button type="button" className="uppcs-btn-primary" onClick={() => scrollToId("pricing")}>
            Secure Your Seat Now
          </button>
        </div>

      </div>

      {showPaymentForm && (
        <PaymentForm
          key={`${paymentCourse.slug}-${paymentCourse.sellingPrice}`}
          course={paymentCourse}
          mentorshipPlan={null}
          onPaymentSuccess={closePayment}
          onClose={closePayment}
        />
      )}
    </>
  );
}

