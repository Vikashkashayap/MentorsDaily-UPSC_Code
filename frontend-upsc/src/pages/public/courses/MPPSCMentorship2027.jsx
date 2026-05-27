import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "../../../components/SEO/SEOHead";
import PaymentForm from "../../../components/payment/PaymentForm";
import "./uppcs2026Landing.css";

export const MPPSC_2027_SLUGS = {
  daily: "mppsc-2027-daily",
};

const PAYMENT_PLAN = {
  slug: MPPSC_2027_SLUGS.daily,
  title: "MPPSC 2027 — Daily Mentorship Programme",
  sellingPrice: 35000,
  basePrice: 40000,
  discountPercentage: 12.5,
};

const HERO_PILLS = [
  "Daily Live Sessions",
  "Structured Syllabus Tree",
  "Daily Targets",
  "Module Tests",
  "Mentor-Led Batches",
  "MP State Focus",
];

const HOW_STEPS = [
  {
    n: 1,
    title: "Syllabus Tree",
    body:
      "Your entire MPPSC syllabus is mapped into subjects → modules → daily topics on the portal. You know exactly what to study every single day.",
  },
  {
    n: 2,
    title: "Daily Sessions",
    body:
      "Structured daily mentorship sessions keep you accountable — concept clarity, doubt resolution, and direction so you never lose momentum.",
  },
  {
    n: 3,
    title: "Module-Based Learning",
    body:
      "Each subject is divided into focused modules of 7–10 days. Structured notes, resources, and a clear topic list for each module.",
  },
  {
    n: 4,
    title: "Module Test",
    body:
      "After every module, you appear for a test covering only what you just studied — focused, fair, module-specific MCQs.",
  },
  {
    n: 5,
    title: "Test Analysis",
    body:
      "Detailed Q-by-Q analysis — marking status, difficulty, and why you got it wrong. This becomes your personal revision map.",
  },
  {
    n: 6,
    title: "Mentor Review",
    body:
      "Your assigned mentor reviews your progress and gives targeted feedback before you advance to the next module.",
  },
];

const TIMELINE = [
  {
    phase: "Phase 1",
    title: "Full Syllabus Coverage",
    dates: "120 Days",
    body:
      "All GS subjects + MP State Section covered module by module. Daily targets on the portal. Module test after every module.",
    align: "left",
  },
  {
    phase: "Phase 2",
    title: "Subject-Wise Revision",
    dates: "40 Days",
    body:
      "Quick subject-by-subject revision using your test analysis. Focus on weak topics flagged in Phase 1.",
    align: "right",
  },
  {
    phase: "Phase 3",
    title: "Full Syllabus Rapid Revision",
    dates: "17 Days",
    body:
      "Complete syllabus rapid-fire revision. Short notes, high-yield facts, and full-mock practice.",
    align: "left",
  },
  {
    phase: "Phase 4",
    title: "Prelims Focus Mode",
    dates: "~80 Days",
    body:
      "Intensive MCQ practice, PYQ series, full mock tests, MP GK sprints, and CSAT revision before exam day.",
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
    tag: "MP State Section",
    tagClass: "uppcs-tag-state",
    title: "MP History, Geography & Administration",
    mods: "2 Modules + State Test — Exclusive to MPPSC",
    highlight: true,
  },
];

const PORTAL_FEATURES = [
  {
    icon: "\u{1F333}",
    title: "Syllabus Tree",
    text: "Visual map of your entire MPPSC syllabus. Tick off topics as you complete them.",
  },
  {
    icon: "\u{1F3AF}",
    title: "Daily Target Dashboard",
    text: "Every morning you know exactly what today's topics are — open the portal and start studying.",
  },
  {
    icon: "\u{1F4CA}",
    title: "Module Progress Tracker",
    text: "See completion % for every subject and every module at a glance.",
  },
  {
    icon: "\u{1F4DD}",
    title: "Test Submission & Q-by-Q Analysis",
    text: "Submit test results with a detailed question-by-question breakdown.",
  },
  {
    icon: "\u{1F468}\u{200D}\u{1F3EB}",
    title: "Direct Mentor Access",
    text: "Your mentor sees your progress, flags weak areas, and gives personalised guidance.",
  },
];

const PORTAL_PROGRESS = [
  { subj: "Ancient History", pct: 100 },
  { subj: "Modern History", pct: 72 },
  { subj: "Indian Polity", pct: 45 },
  { subj: "Economy", pct: 20 },
  { subj: "Geography", pct: 60 },
];

const PROGRAMME_FEATURES = [
  "Daily mentorship sessions — live guidance every day",
  "Full syllabus — GS subjects + MP State Section",
  "Module-based structured daily planner",
  "Test after every module",
  "Detailed Q-by-Q test analysis system",
  "Personal mentor assigned from Day 1",
  "Full MentorsDaily Portal access",
  "Syllabus Tree + Daily Target Dashboard",
  "4 structured revision cycles",
  "PYQ Practice Bank",
  "Full Mock Tests in Prelims Phase",
  "MP-specific GK & Current Affairs module",
  "Valid through MPPSC 2027 exam cycle",
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function MPPSCMentorship2027() {
  const location = useLocation();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const openCheckout = useCallback(() => {
    setShowPaymentForm(true);
  }, []);

  useEffect(() => {
    if (showPaymentForm) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPaymentForm]);

  const closePayment = () => {
    setShowPaymentForm(false);
  };

  return (
    <>
      <SEOHead pathname={location.pathname} />
      <div className="uppcs2026-landing">
        <div className="uppcs-hero">
          <div className="uppcs-hero-badge">MPPSC 2027 — Batch Open · Daily Sessions</div>
          <h1>
            Crack <span>MPPSC 2027</span>
            <br />
            With Daily Mentorship
          </h1>
          <p>
            India&apos;s structured MPPSC programme — daily sessions, module-by-module learning, mentor-guided, with a
            live Syllabus Tree portal that tracks every topic you study.
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
              Enrol Now — ₹35,000
            </button>
            <button type="button" className="uppcs-btn-outline" onClick={() => scrollToId("how")}>
              How It Works
            </button>
          </div>
          <div className="uppcs-hero-stats">
            <div className="uppcs-stat">
              <span className="uppcs-num">Daily</span>
              <span className="uppcs-lbl">Live Sessions</span>
            </div>
            <div className="uppcs-stat">
              <span className="uppcs-num">15+</span>
              <span className="uppcs-lbl">Subjects Covered</span>
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
                Daily sessions plus a complete system — every step is intentional, trackable, and mentor-verified.
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
              <div className="uppcs-section-title">Roadmap to MPPSC 2027</div>
              <p className="uppcs-section-sub-center">
                Full syllabus coverage, revision cycles, and Prelims-focus mode — built around the MPPSC 2027 timeline.
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
              <div className="uppcs-section-title">Complete MPPSC Syllabus — Every Topic Covered</div>
              <p className="uppcs-section-sub-center">
                GS subjects mapped to MPPSC Prelims &amp; Mains pattern, plus a dedicated MP State Section.
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
                  Your Entire MPPSC Journey
                  <br />
                  On One Dashboard
                </div>
                <p className="uppcs-section-sub" style={{ marginBottom: 36 }}>
                  The portal tracks where you are, what you need to do today, and what went wrong in your last test.
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
                  <div className="uppcs-task">Modern History — Module 3</div>
                  <div className="uppcs-sub">1857 Revolt: Causes, Events &amp; Consequences</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        


        <section className="uppcs-pricing-bg uppcs-section" id="pricing">
          <div className="uppcs-container">
            <div className="uppcs-text-center">
              <div className="uppcs-section-label">Enrol Now</div>
              <div className="uppcs-section-title">MPPSC 2027 — Daily Mentorship</div>
              <p className="uppcs-section-sub-center">
                One complete programme with daily sessions — limited-time offer at ₹35,000.
              </p>
            </div>
            <div className="uppcs-pricing-grid" style={{ maxWidth: 480, margin: "0 auto" }}>
              <div className="uppcs-price-card uppcs-featured">
                <span className="uppcs-pc-badge">Limited Offer · Save ₹5,000</span>
                <div className="uppcs-pc-head">
                  <div className="uppcs-pc-name">MPPSC Daily Programme 2027</div>
                  <div className="uppcs-pc-price uppcs-pc-price--stacked">
                    <span className="uppcs-pc-mrp">&#8377;40,000</span>
                    <span className="uppcs-pc-sale">
                      &#8377;35,000<span>/course</span>
                    </span>
                  </div>
                  <div className="uppcs-pc-tagline">Daily Sessions · Prelims + Mains Foundation</div>
                </div>
                <div className="uppcs-pc-body">
                  <ul className="uppcs-pc-features">
                    {PROGRAMME_FEATURES.map((line) => (
                      <li key={line}>
                        <span className="uppcs-check">&#10003;</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="uppcs-pc-cta" onClick={openCheckout}>
                    Enrol Now — Pay with Razorpay →
                  </button>
                  <div className="uppcs-pc-emi">
                    Secure checkout via <strong>Razorpay</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="uppcs-cta-banner">
          <h2>Your MPPSC 2027 Journey Starts Today</h2>
          <p>Daily mentorship sessions. Seats limited per batch to maintain quality.</p>
          <button type="button" className="uppcs-btn-primary" onClick={() => scrollToId("pricing")}>
            Secure Your Seat — ₹35,000
          </button>
        </div>
      </div>

      {showPaymentForm && (
        <PaymentForm
          key={`${PAYMENT_PLAN.slug}-${PAYMENT_PLAN.sellingPrice}`}
          course={PAYMENT_PLAN}
          mentorshipPlan={null}
          onPaymentSuccess={closePayment}
          onClose={closePayment}
        />
      )}
    </>
  );
}
