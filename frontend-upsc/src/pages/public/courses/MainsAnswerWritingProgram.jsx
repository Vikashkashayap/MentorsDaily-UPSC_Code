import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  applyCoupon,
  getAutoApplyCoupon,
  getCourseBySlug,
  unwrapCourseFromSlugResponse,
} from "../../../api/coreService";
import PaymentForm from "../../../components/payment/PaymentForm";
import CouponApplyBox from "../../../components/coupon/CouponApplyBox";
import SEO from "../../../components/SEO/SEO";
import { getCourseOgImageUrl } from "../../../utils/ogImageUrl";
import "./mainsAnswerWritingExtras.css";

export const MAINS_ANSWER_WRITING_SLUG = "mains-answer-writing-excellence-program";

/** Fallback pricing used until the backend course row loads (matches the course card: ₹24,999 → ₹19,999, 20% OFF). */
const FALLBACK_BASE_PRICE = 24999;
const FALLBACK_SELLING_PRICE = 19999;

const formatINR = (value) => `₹${Math.round(Number(value) || 0).toLocaleString("en-IN")}`;

const Chevron = () => (
  <svg
    className="maw-chev w-5 h-5 text-gray-400 shrink-0 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const MMEF_STAGES = [
  { n: "1", label: "Knowledge", dim: true },
  { n: "2", label: "Recognition", dim: true },
  { n: "3", label: "Interpretation", dim: true },
  { n: "4", label: "Thinking" },
  { n: "5", label: "Decision Making" },
  { n: "6", label: "Structuring" },
  { n: "7", label: "Communication" },
  { n: "8", label: "Presentation", strong: true, note: "Others start here" },
  { n: "9", label: "Evaluation", strong: true },
  { n: "10", label: "Improvement", strong: true },
];

const PAIN_POINTS = [
  ["01", '"I know the content but I can\'t write it."', "Knowledge sits in your head but won't organise itself into an answer under time pressure."],
  ["02", '"My answers describe. They don\'t analyse."', "You fill the page, but the examiner wants judgement, linkages and dimensions — not narration."],
  ["03", '"I never fully understand the demand."', "You answer what you know instead of what was asked — and lose marks you already earned."],
  ["04", '"I can\'t finish the paper."', "The first answers are polished, the last five are half-written. Time runs out before content does."],
  ["05", '"I don\'t know what the examiner expects."', "Without a model of how answers are scored, every attempt is a guess in the dark."],
];

const COMPARISON_ROWS = [
  ["Thinking training before writing", "Skipped — jumps straight to writing", "Trained explicitly, stage by stage"],
  ["Specific, diagnostic feedback", "Generic comments, a number out of 10", "20-competency scorecard per answer"],
  ["Structured progression", "Write test → get marks → repeat", "Sequenced frameworks, one skill at a time"],
  ["Measurable improvement", '"You\'ll improve with practice"', "Competency growth tracked monthly"],
  ["A repeatable method", "Model answers to imitate", "Named frameworks you apply anywhere"],
];

const FLOW_STAGES = [
  { n: "Stage 1", title: "Knowledge", desc: "What you carry in.", tone: "light" },
  { n: "Stage 2", title: "Recognition", desc: "Seeing what the question is really about.", tone: "light" },
  { n: "Stage 3", title: "Interpretation", desc: "Decoding the exact demand.", tone: "light" },
  { n: "Stage 4", title: "Thinking", desc: "Generating dimensions and angles.", tone: "mid" },
  { n: "Stage 5", title: "Decision Making", desc: "Choosing what to include and drop.", tone: "mid" },
  { n: "Stage 6", title: "Structuring", desc: "Engineering the shape of the answer.", tone: "mid" },
  { n: "Stage 7", title: "Communication", desc: "Writing with clarity and precision.", tone: "mid" },
  { n: "Stage 8", title: "Presentation", desc: "Making it easy to evaluate.", tone: "dark" },
  { n: "Stage 9", title: "Evaluation", desc: "Scoring against a rubric.", tone: "dark" },
  { n: "Stage 10", title: "Improvement", desc: "Rewriting to lock the gain.", tone: "dark" },
];

const NINE_LAYERS = [
  ["Question Reading", "Read every word — directive, keyword, scope."],
  ["Demand Identification", "Pin down explicit and hidden demands."],
  ["Content Recall", "Surface everything you know, fast."],
  ["Content Selection", "Keep the relevant, cut the rest."],
  ["Structural Design", "Choose the shape before you write."],
  ["Writing", "Execute with rhythm and clarity."],
  ["Presentation", "Make it effortless to evaluate."],
  ["Self Verification", "Check the answer against the demand."],
  ["Learning Capture", "Log the lesson so it compounds."],
];

const ENGINES = [
  {
    tag: "Thinking Engine",
    title: "Understand the question",
    items: [
      ["QDM", "Question Deconstruction Matrix — break any question into directive, demand, scope, hidden demand."],
      ["DCF", "Demand Clarity Framework — separate what UPSC asked from what you know."],
      ["STF", "Scope Testing Framework — decide relevant vs. important vs. extra vs. irrelevant."],
    ],
  },
  {
    tag: "Generation Engine",
    title: "Never go blank",
    items: [
      ["MGF", "Multidimensional Generation Framework — produce angles on any issue on demand."],
      ["CPF", "Content Prioritization Framework — pick the best 8 points from 20."],
      ["EBF", "Evidence Building Framework — the right data, report, committee or case."],
    ],
  },
  {
    tag: "Writing Engine",
    title: "Structure & express",
    items: [
      ["SES", "Structure Engineering System — 15 answer structures and when to use each."],
      ["IMS", "Introduction Mastery System — 20 ways to open with impact."],
      ["CMS", "Conclusion Mastery System — 20 ways to close with weight."],
    ],
  },
  {
    tag: "Presentation Engine",
    title: "Make it examiner-friendly",
    items: [
      ["PPS", "Presentation Precision System — spacing, boxes, keywords, highlighting."],
      ["DVS", "Diagram Visualization System — learn when to draw, not just how."],
    ],
  },
  {
    tag: "Exam Engine",
    title: "Perform under pressure",
    items: [
      ["TES", "Time Execution System — write a complete answer in ~7 minutes."],
      ["EMS", "Exam Mindset System — handle panic, blank mind and question switching."],
    ],
  },
  {
    tag: "Improvement Engine",
    title: "Compound every week",
    items: [
      ["AIR", "Assess → Improve → Rewrite — the signature loop. Every answer is rewritten."],
      ["ELS", "Error Logging System — an error notebook with real analytics."],
      ["PRS", "Progress Review System — see competency growth month over month."],
    ],
  },
];

const PHASES = [
  ["Phase 1 · Weeks 1–2", "Foundation", "Understand how UPSC Mains is actually evaluated. Internalise the MMEF model and the 9-Layer Architecture. Diagnostic answer to set your baseline.", "Builds layers 1–2 · Sets baseline competencies"],
  ["Phase 2 · Weeks 3–6", "Question Decoding", "Master QDM, DCF and STF. Learn to read the demand precisely and decide what belongs in the answer before you write a word.", "Builds layers 1–4 · Daily decoding drills"],
  ["Phase 3 · Weeks 7–10", "Content Generation", "MGF, CPF and EBF. Generate multidimensional content on demand, prioritise the strongest points, and back them with the right evidence.", "Builds layers 3–4 · Never-go-blank training"],
  ["Phase 4 · Weeks 11–14", "Structure & Writing", "SES, IMS and CMS. Choose from 15 structures, open and close with impact, and write with clarity under a ticking clock.", "Builds layers 5–6 · Full-answer practice"],
  ["Phase 5 · Weeks 15–17", "Presentation & Speed", "PPS, DVS, TES and EMS. Make answers examiner-friendly, decide when to draw, and finish the paper on time under pressure.", "Builds layers 7 · Timed full papers"],
];

const MODULES = [
  {
    n: "1",
    title: "Understanding UPSC Mains",
    sub: "How the exam is evaluated — and why knowledge alone doesn't score.",
    open: true,
    objectives: ["Understand what examiners reward and penalise", "Internalise the MMEF model and 9-Layer Architecture", "Set a measured baseline for every competency"],
    skills: ["Evaluator's perspective", "Self-diagnosis"],
    activities: ["Diagnostic answer + self-scoring", "Marked-answer teardown"],
    deliverables: ["Baseline competency report", "You can articulate exactly where you stand"],
  },
  {
    n: "2",
    title: "Question Decoding",
    sub: "QDM · DCF · STF — read the demand before you write.",
    objectives: ["Deconstruct any question into directive, demand, scope, hidden demand", 'Separate "what\'s asked" from "what I know"', "Judge relevant vs. important vs. extra vs. irrelevant"],
    skills: ["Demand clarity", "Scope control"],
    activities: ["Daily decoding drills on real PYQs", "Demand-mapping worksheets"],
    deliverables: ["Decoded question bank", "You stop answering the wrong question"],
  },
  {
    n: "3",
    title: "Thinking & Content Generation",
    sub: "MGF · CPF · EBF — never sit blank in front of a question.",
    objectives: ["Generate 16+ dimensions on any issue", "Prioritise the strongest 8 points from 20", "Attach the right evidence to each point"],
    skills: ["Idea generation", "Prioritisation"],
    activities: ["Dimension-mapping sprints", "Evidence-matching sets"],
    deliverables: ["Personal dimension + evidence bank", "You produce rich content under time pressure"],
  },
  {
    n: "4",
    title: "Structuring Answers",
    sub: "SES · IMS · CMS — 15 structures, 20 intros, 20 conclusions.",
    objectives: ["Match question type to the right structure", "Open and close with analytical weight"],
    skills: ["Structural design", "Framing"],
    activities: ["Structure-selection drills", "Intro/conclusion rewriting"],
    deliverables: ["Structure handbook", "Your answers read as designed, not dumped"],
  },
  {
    n: "5",
    title: "Presentation Skills",
    sub: "PPS · DVS — make every answer effortless to evaluate.",
    objectives: ["Use spacing, boxes, keywords and highlighting deliberately", "Decide when a diagram adds value"],
    skills: ["Visual clarity", "Examiner empathy"],
    activities: ["Presentation makeovers", "Diagram-decision sets"],
    deliverables: ["Presentation checklist", "Same content, visibly higher marks"],
  },
  {
    n: "6",
    title: "Content Enrichment",
    sub: "Data, reports, committees, judgments — the right evidence, ready.",
    objectives: ["Build a reusable evidence library", "Deploy the strongest evidence per demand"],
    skills: ["Evidence selection", "Recall under pressure"],
    activities: ["Evidence-bank building", "Point-to-evidence matching"],
    deliverables: ["Personal evidence handbook", "Your answers carry authority"],
  },
  {
    n: "7",
    title: "GS Paper-wise Writing",
    sub: "Apply the system to GS1, GS2, GS3 and GS4.",
    objectives: ["Adapt the frameworks to each paper's demand", "Handle ethics case studies and essays' analytical needs"],
    skills: ["Paper-specific judgement"],
    activities: ["Paper-wise timed sets", "GS4 case-study workshops"],
    deliverables: ["Paper-wise playbooks", "Consistent performance across all four papers"],
  },
  {
    n: "8",
    title: "Time Management",
    sub: "TES · EMS — finish the full paper, calmly.",
    objectives: ["Write a complete answer in ~7 minutes", "Manage panic, blank mind and question order"],
    skills: ["Micro-planning", "Decision speed"],
    activities: ["Timed full-paper simulations", "Pressure drills"],
    deliverables: ["Personal time plan", "You attempt every question, every time"],
  },
  {
    n: "9",
    title: "Continuous Improvement System",
    sub: "AIR Loop · ELS · PRS — turn every answer into progress.",
    objectives: ["Run the Assess → Improve → Rewrite loop on every answer", "Maintain an error log with real analytics"],
    skills: ["Reflection", "Self-correction"],
    activities: ["Rewrite workshops", "Monthly progress reviews"],
    deliverables: ["Error notebook + growth dashboard", "You improve on a visible, measurable curve"],
  },
];

const SESSION_FLOW = [
  ["Min 0–5", "Icebreaker", "A sharp warm-up that primes today's skill."],
  ["Min 5–15", "Problem Statement", "A real question exposes the exact gap you'll close."],
  ["Min 15–35", "Concept + Framework", "The framework of the day, explained with a model."],
  ["Min 35–50", "Live Demonstration", "The mentor thinks aloud through a real answer."],
  ["Min 50–75", "Student Practice", "You apply the framework on a fresh question."],
  ["Min 75–90", "Discussion", "Compare approaches; surface better decisions."],
  ["Min 90–105", "Evaluation", "Score your own work on the ACE rubric."],
  ["Min 105–115", "Improvement", "Rewrite one section using the feedback."],
  ["Min 115–120", "Homework", "A targeted assignment to lock the skill in."],
];

const JOURNEY = [
  ["01", "Beginner", "You understand how Mains is scored and can decode a question's demand.", "text-brand-200"],
  ["02", "Intermediate", "You generate multidimensional content and structure it deliberately.", "text-brand-300"],
  ["03", "Advanced", "You write analytical, well-presented answers at speed.", "text-brand-400"],
];

const DELIVERABLES = [
  ["Student Workbook", "Guided exercises with space to write in every session."],
  ["Framework Handbook", "All 21 frameworks, defined and ready to apply."],
  ["Question Bank", "Decoded PYQs and practice questions by demand type."],
  ["Model Answer Library", "Reference answers annotated by layer and framework."],
  ["Evaluation Sheets", "The ACE rubric for scoring your own and peers' work."],
  ["Homework Booklets", "Targeted assignments tied to each session's skill."],
  ["Revision Notes", "Condensed framework recaps for fast pre-exam review."],
  ["Performance Reports", "Monthly competency growth on your dashboard."],
];

const SCORECARD = [
  ["Demand fulfilment", "8/10", 80, "bg-brand-600"],
  ["Structure", "7/10", 70, "bg-brand-600"],
  ["Analysis depth", "6/10", 60, "bg-accent-500"],
  ["Evidence", "8/10", 80, "bg-brand-600"],
  ["Presentation", "9/10", 90, "bg-brand-600"],
  ["Time discipline", "7/10", 70, "bg-brand-600"],
];

const AIR_LOOP = [
  ["1", "Practice", "Write under real time constraints."],
  ["2", "Assess", "Score on the ACE rubric."],
  ["3", "Reflect", "Log the error, name the pattern."],
  ["4", "Rewrite", "Produce the improved answer."],
];

const FEATURES = [
  ["Live workshop classes", "Interactive sessions where you write, not just watch.", null],
  ["Daily answer writing", "Consistent, structured practice with the frameworks.", null],
  ["Structured mentor feedback", "Diagnostic ACE feedback, never generic comments.", null],
  ["AI-supported evaluation", "An assistant mentor for demand, structure and presentation checks.", "Future-ready"],
  ["Model answer library", "Reference answers annotated by layer and framework.", null],
  ["Weekly workshops", "Deep-dives on structures, evidence and paper-wise writing.", null],
  ["Error tracking", "The ELS error notebook with real analytics.", null],
  ["Progress dashboard", "See competency growth month over month.", null],
  ["Revision framework", "Condensed recaps for fast pre-exam review.", null],
];

const WHO = [
  ["Beginners", "Start with the right method instead of unlearning bad habits later."],
  ["Mains-qualified", "Convert knowledge into marks with a sharper thinking system."],
  ["Working professionals", "A structured, self-study-first system that respects limited time."],
  ["Repeat aspirants", "Break the plateau by fixing process, not just adding content."],
  ["Serious candidates", "Anyone who wants a measurable, repeatable path to high scores."],
];

const OUTCOMES = [
  "Decode the demand of any Mains question accurately.",
  "Pick the right structure for each directive word.",
  "Generate multidimensional content even on unfamiliar topics.",
  "Write concise, analytical introductions and conclusions.",
  "Present answers in an examiner-friendly format.",
  "Complete the full paper within the time limit.",
  "Evaluate your own answers on a standardised rubric.",
  "Improve continuously through structured reflection.",
];

const MENTOR_METHOD = [
  ["MOS · Mentor Operating System", "Every session follows the same academic structure and script, so no class is left to improvisation."],
  ["FQS · Faculty Quality System", "Mentors are evaluated against the same standard your answers are — quality is measured, not assumed."],
  ["Live thinking & correction", "Mentors think aloud through real answers and correct your work in real time, modelling the decisions you're learning."],
];

const FAQ_GROUPS = [
  {
    heading: "About the course",
    items: [
      ["Is this just another answer-writing course?", "No. It's a structured academic system — the Mains Excellence Framework (MMEF). Instead of tips and model answers to copy, you learn 21 named frameworks that train the thinking behind a high-scoring answer."],
      ["I already know a lot. Why do I need this?", "Because Mains rewards how you use knowledge under time pressure, not how much you have. Most aspirants who plateau have enough content but no system to convert it into marks. That gap is exactly what this program closes."],
      ["How long is the program?", "Roughly 50 sessions, about 100 hours, at around 2 hours per session, plus daily practice and the ongoing improvement loop."],
      ["Is it live or recorded?", "Sessions are live, interactive workshops where you write and get feedback. Supporting material and revision resources are available to keep for reference."],
      ["Do I need prior answer-writing experience?", "No. Beginners start with the correct method; experienced aspirants sharpen and restructure what they already do."],
      ["Which papers does it cover?", "The frameworks are universal, and paper-wise application covers GS1–GS4, including ethics case studies and the analytical demands of the essay."],
      ["What makes MMEF different from coaching?", "Coaching typically teaches introduction–body–conclusion and evaluates. MMEF trains the full ten-stage process, uses the 9-Layer Answer Architecture, and measures competency growth."],
    ],
  },
  {
    heading: "Writing & method",
    items: [
      ["What if I go blank in front of a question?", "The Multidimensional Generation Framework (MGF) trains you to produce angles on any issue on demand, so a blank mind stops being a risk."],
      ["How will I learn to structure answers?", "The Structure Engineering System (SES) gives you 15 structures and teaches which to use for each question type — well beyond intro–body–conclusion."],
      ["I run out of time in the exam. Does this help?", "Yes. The Time Execution System (TES) trains you to write a complete answer in about 7 minutes through micro-planning and decision speed."],
      ["Will you give me templates to memorise?", "No. Templates break on unfamiliar questions. You learn transferable frameworks you can apply to any question, in any subject."],
      ["How much writing practice is there?", "Daily. The program is practice-first — you write in almost every session and leave with evaluated work, not just notes."],
      ["Do you teach introductions and conclusions?", "Yes — the Introduction Mastery System and Conclusion Mastery System each teach 20 distinct approaches, so your openings and closings carry weight."],
    ],
  },
  {
    heading: "Evaluation & feedback",
    items: [
      ["How are my answers evaluated?", "On the ACE Rubric (Answer Competency Evaluation). Instead of one number, you get a breakdown across the competencies that decide marks, with a specific next fix."],
      ["Isn't feedback usually generic?", "That's the problem we fixed. Every score is tied to the 9-Layer Architecture and standardised across mentors, so feedback is specific and consistent."],
      ["Will I know why I lost marks?", "Always. The scorecard shows exactly which competency cost you and what to change — no guessing."],
      ["Can I track my improvement?", "Yes. The Progress Review System charts competency growth month over month, and the Error Logging System turns mistakes into shrinking patterns."],
      ["Do I have to rewrite answers?", "Yes — that's the signature AIR Loop. Every answer is assessed, improved and rewritten. Rewriting is where most of the improvement happens."],
    ],
  },
  {
    heading: "Time, language & mentorship",
    items: [
      ["What language is the program in?", "English and Hindi support, so you can learn and write in the medium you'll use in the exam."],
      ["I'm a working professional. Can I keep up?", "Yes. It's self-study-first and structured for limited time — sequenced skills and clear homework mean no wasted effort."],
      ["How much time should I commit weekly?", "Plan for the live sessions plus daily answer practice and the rewrite loop. Consistency matters more than volume."],
      ["What kind of mentor support is there?", "Structured, standardised feedback via the Mentor Operating System, plus live correction in sessions. Support is system-level and consistent, not dependent on one person."],
      ["Will I get individual attention?", "The Founding Cohort is deliberately limited so every member gets meaningful attention on their answers and progress."],
    ],
  },
  {
    heading: "Enrollment & refunds",
    items: [
      ["What is the Founding Cohort?", "The first, limited group to join the program. Founding members get a founding rate, full access, and direct input into how the program develops."],
      ["How much does it cost?", 'A founding rate shown at checkout, with EMI options. Pricing is value-based and honest — no inflated "discounts".'],
      ["Do you offer scholarships?", "Yes. Support is available for candidates who need it — mention it on your application."],
      ["What is the refund policy?", "Refund terms are shown clearly at checkout before you pay. We don't use pressure tactics to enroll you."],
      ["How do I enroll?", "Apply for the Founding Cohort using the button above. We keep the cohort small, so applications are reviewed in order."],
      ["Are there fake topper claims or paid testimonials?", "No. As a new program we publish only real results, from the Founding Cohort, as they happen."],
    ],
  },
];

const flowToneClass = (tone) => {
  if (tone === "light") return "border-brand-100 bg-brand-50";
  if (tone === "mid") return "border-brand-200 bg-brand-100";
  return "border-brand-600 bg-brand-600 text-white";
};

export default function MainsAnswerWritingProgram() {
  const [course, setCourse] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [couponApplying, setCouponApplying] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponAdjustedPrice, setCouponAdjustedPrice] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".maw-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const envelope = await getCourseBySlug(MAINS_ANSWER_WRITING_SLUG);
        const c = unwrapCourseFromSlugResponse(envelope);
        if (!cancelled && c) setCourse(c);
      } catch (e) {
        console.error(e);
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

  const basePrice = Number(course?.basePrice ?? FALLBACK_BASE_PRICE);
  const sellingPrice = Number(
    course?.sellingPrice != null ? course.sellingPrice : FALLBACK_SELLING_PRICE
  );
  const resolvedCourseId = course?._id || "";

  const displayedPrice = couponAdjustedPrice != null ? couponAdjustedPrice : sellingPrice;
  const discountPercentage =
    basePrice > displayedPrice && basePrice > 0
      ? Math.round(((basePrice - displayedPrice) / basePrice) * 100)
      : 0;

  useEffect(() => {
    setCouponAdjustedPrice(null);
    setAppliedCoupon(null);
    setCouponError("");
  }, [resolvedCourseId, sellingPrice]);

  useEffect(() => {
    const autoApply = async () => {
      if (!resolvedCourseId) return;
      try {
        const res = await getAutoApplyCoupon({
          courseId: resolvedCourseId,
          orderValue: sellingPrice,
        });
        const autoData = res?.data?.data;
        if (!autoData?.coupon || autoData?.pricing?.final_price == null) return;
        setAppliedCoupon(autoData.coupon);
        setCouponAdjustedPrice(Number(autoData.pricing.final_price));
      } catch {
        // Optional enhancement, ignore silently.
      }
    };
    autoApply();
  }, [resolvedCourseId, sellingPrice]);

  const handleApplyCoupon = async (code) => {
    if (!resolvedCourseId) {
      setCouponError("Coupon is available once the course finishes loading.");
      return;
    }
    try {
      setCouponApplying(true);
      setCouponError("");
      const res = await applyCoupon({
        code,
        courseId: resolvedCourseId,
        orderValue: sellingPrice,
      });
      const payload = res?.data?.data;
      if (payload?.pricing?.final_price == null || !payload?.coupon) {
        setCouponError("Invalid coupon response.");
        return;
      }
      setAppliedCoupon(payload.coupon);
      setCouponAdjustedPrice(Number(payload.pricing.final_price));
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

  const clearCoupon = () => {
    setCouponAdjustedPrice(null);
    setAppliedCoupon(null);
    setCouponError("");
  };

  const paymentCourse = {
    _id: resolvedCourseId || undefined,
    title: course?.title || "Mains Answer Writing Excellence Program",
    slug: MAINS_ANSWER_WRITING_SLUG,
    thumbnail: course?.thumbnail,
    basePrice,
    sellingPrice: displayedPrice,
    discountPercentage,
    appliedCoupon: appliedCoupon?.code ? appliedCoupon : null,
  };

  return (
    <div className="maw-root bg-white text-gray-900 antialiased">
      <SEO
        title={course?.metaTitle || course?.title || "Mains Answer Writing Excellence Program"}
        description={
          course?.metaDescription ||
          "A structured academic system for UPSC Mains answer writing built on the MentorsDaily Mains Excellence Framework (MMEF)."
        }
        image={getCourseOgImageUrl(course)}
        url={`/${MAINS_ANSWER_WRITING_SLUG}`}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "MentorsDaily Mains Answer Writing Excellence Program",
            description:
              "A structured academic system for UPSC Mains answer writing built on the MentorsDaily Mains Excellence Framework (MMEF).",
            provider: { "@type": "Organization", name: "MentorsDaily", sameAs: "/" },
          })}
        </script>
      </Helmet>

      {/* ============ 1. HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-14 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 flex-wrap mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-brand-100 text-brand-700 text-xs font-bold maw-badge uppercase">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 1l2.39 5.84L18.5 7.5l-4.75 4.05L15.2 18 10 14.85 4.8 18l1.45-6.45L1.5 7.5l6.11-.66L10 1z" />
                </svg>
                Flagship Program
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-600 text-white text-xs font-bold maw-badge uppercase">
                Founding Cohort · Now Open
              </span>
            </div>
            <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Mains Answer Writing Excellence</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Stop writing more answers.
              <br />
              Start <span className="text-brand-600">thinking</span> like a high scorer.
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl">
              Most aspirants know enough to score well and still don't. The gap is not knowledge — it is the absence of a
              structured thinking system. This program teaches answer writing as an engineered, measurable skill: decode the
              demand, decide what matters, structure it, and finish on time.
            </p>

            <ul className="mt-7 grid sm:grid-cols-2 gap-2.5 max-w-2xl">
              {[
                "Decode the exact demand of any question",
                "Never go blank — generate content on demand",
                "Choose the right structure, not just intro–body–conclusion",
                "Finish the full paper inside the time limit",
                "Know exactly why you lost every mark",
                "Improve on a measurable, weekly loop",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 text-brand-600">✓</span> {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#enroll"
                className="inline-flex px-6 py-3 text-base font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700 shadow-sm"
              >
                Enroll — Founding Cohort
              </a>
              <a
                href="#curriculum"
                className="inline-flex px-6 py-3 text-base font-semibold text-brand-700 bg-white border border-brand-100 rounded-xl hover:border-brand-200"
              >
                See the full curriculum
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="text-brand-600">◆</span> Self-study first
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-brand-600">◆</span> Competency-based evaluation
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-brand-600">◆</span> No hype · no false claims
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-brand-900/5 p-6">
              <p className="text-xs font-bold maw-badge uppercase text-gray-400">The MMEF Model</p>
              <p className="mt-1 text-sm text-gray-600">
                Every answer passes through ten stages. Most programs teach only the last three.
              </p>
              <ol className="mt-5 space-y-2 text-sm">
                {MMEF_STAGES.map((s) => (
                  <li
                    key={s.n}
                    className={`flex items-center gap-3 ${s.dim ? "opacity-60" : ""} ${
                      s.strong ? "text-brand-700 font-semibold" : ""
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md grid place-items-center text-xs font-bold ${
                        s.strong
                          ? "bg-brand-600 text-white"
                          : s.dim
                          ? "bg-gray-100"
                          : "bg-brand-100 text-brand-700"
                      }`}
                    >
                      {s.n}
                    </span>
                    {s.label}
                    {s.note && (
                      <span className="text-[10px] font-bold text-gray-400 maw-badge uppercase ml-auto">{s.note}</span>
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-5 text-xs text-gray-400">MMEF trains all ten. That is the difference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. CORE BELIEF BAR ============ */}
      <section className="bg-brand-900 text-white maw-grain">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 text-center">
          <p className="text-xs font-bold maw-badge uppercase text-brand-200">Our core belief</p>
          <p className="mt-4 text-2xl md:text-4xl font-bold leading-tight">
            "Answer writing is not a writing skill. It is a{" "}
            <span className="text-brand-200">thinking and decision-making</span> skill performed under severe time
            constraints."
          </p>
          <p className="mt-6 text-brand-200/80 text-sm max-w-2xl mx-auto">
            Writing is only the visible final step. The real work happens earlier — in how you interpret the question and
            decide what to include and exclude. This program trains that.
          </p>
        </div>
      </section>

      {/* ============ 3. STUDENT PAIN POINTS ============ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 maw-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Sound familiar?</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            You've read thousands of pages. The marks haven't moved.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            If any of these describe you, the problem isn't effort or knowledge. It's the missing system between what you
            know and what reaches the answer sheet.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {PAIN_POINTS.map(([num, title, desc]) => (
            <div key={num} className="rounded-2xl border border-gray-100 p-6 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 grid place-items-center text-lg font-bold">
                {num}
              </div>
              <h3 className="mt-4 font-bold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
            <h3 className="font-bold text-lg text-brand-900">The common thread</h3>
            <p className="mt-2 text-sm text-brand-900/80">
              None of these are knowledge problems. They are thinking, decision and process problems — and every one of
              them is trainable.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 4. WHY EXISTING PROGRAMS DON'T WORK ============ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 maw-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">The category problem</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              Why most answer-writing programs don't move the needle
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              This isn't a criticism of any institute. It's a structural gap in how the category is designed. Most programs
              stop where the real training should begin.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4 font-semibold text-gray-500 w-1/3">What you actually need</th>
                  <th className="p-4 font-semibold text-gray-500">The typical program</th>
                  <th className="p-4 font-semibold text-brand-700">MMEF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map(([need, typical, mmef]) => (
                  <tr key={need}>
                    <td className="p-4 font-medium">{need}</td>
                    <td className="p-4 text-gray-500">{typical}</td>
                    <td className="p-4 text-gray-900">{mmef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            Evaluation alone is not teaching. Being told an answer is a 6/10 tells you the score, not the fix.
          </p>
        </div>
      </section>

      {/* ============ 5. THE MENTORSDAILY DIFFERENCE ============ */}
      <section id="difference" className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">The MentorsDaily difference</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            We teach the whole process — not just the visible end of it
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            A high-scoring answer is the output of ten decisions made before and during writing. Train the decisions, and
            the answer takes care of itself.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3">
          {FLOW_STAGES.map((s) => (
            <div key={s.n} className={`rounded-xl border p-4 ${flowToneClass(s.tone)}`}>
              <div className={`text-xs font-bold maw-badge uppercase ${s.tone === "dark" ? "text-brand-100" : "text-brand-700"}`}>
                {s.n}
              </div>
              <div className="mt-1 font-bold">{s.title}</div>
              <p className={`mt-1 text-xs ${s.tone === "dark" ? "text-brand-100" : "text-gray-600"}`}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-brand-100 border border-brand-200"></span> Stages 4–7: the thinking most
            programs never train
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-brand-600"></span> Stages 8–10: where typical programs begin and end
          </span>
        </div>
      </section>

      {/* ============ 6. THE 9-LAYER ANSWER ARCHITECTURE ============ */}
      <section className="bg-brand-900 text-white maw-grain">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-brand-200 maw-badge uppercase">Proprietary model</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">The 9-Layer Answer Architecture</h2>
              <p className="mt-4 text-lg text-brand-100/80">
                Forget "introduction, body, conclusion." Every high-scoring answer is built from nine layers. Each module in
                this program strengthens one or more of them — so you always know exactly which skill you are training.
              </p>
              <p className="mt-6 text-sm text-brand-200/70">
                This is the central model of the entire curriculum. Learn it once, apply it to every question in every GS
                paper.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ol className="space-y-3">
                {NINE_LAYERS.map(([title, desc], i) => (
                  <li key={title} className="flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-4">
                    <span className="w-9 h-9 shrink-0 rounded-lg bg-brand-500 grid place-items-center font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <div className="font-bold">{title}</div>
                      <div className="text-sm text-brand-100/70">{desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. INSIDE THE METHOD — FRAMEWORK ENGINES ============ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Inside the method</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            Nine engines. Twenty-one named frameworks.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            The program isn't a stack of tips. It's an engineered system where every recurring problem has a named,
            teachable framework. Each is delivered with its own worksheet, practice set and evaluation criteria.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ENGINES.map((engine) => (
            <div key={engine.tag} className="rounded-2xl border border-gray-100 p-6 hover:shadow-md transition">
              <div className="text-xs font-bold text-brand-700 maw-badge uppercase">{engine.tag}</div>
              <h3 className="mt-1 font-bold text-lg">{engine.title}</h3>
              <div className="mt-4 space-y-3 text-sm">
                {engine.items.map(([code, text]) => (
                  <p key={code}>
                    <span className="inline-block px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold text-xs">
                      {code}
                    </span>{" "}
                    {text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="text-xs font-bold text-brand-700 maw-badge uppercase">Mentor Engine</div>
            <p className="mt-2 text-sm text-gray-700">
              <span className="inline-block px-2 py-0.5 rounded bg-white text-brand-700 font-bold text-xs border border-gray-200">
                MOS
              </span>{" "}
              Mentor Operating System ·{" "}
              <span className="inline-block px-2 py-0.5 rounded bg-white text-brand-700 font-bold text-xs border border-gray-200">
                FQS
              </span>{" "}
              Faculty Quality System ·{" "}
              <span className="inline-block px-2 py-0.5 rounded bg-white text-brand-700 font-bold text-xs border border-gray-200">
                CLS
              </span>{" "}
              Classroom Learning System — so every mentor teaches to the same standard.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <div className="text-xs font-bold text-brand-700 maw-badge uppercase">Assessment & AI Engine</div>
            <p className="mt-2 text-sm text-gray-700">
              <span className="inline-block px-2 py-0.5 rounded bg-white text-brand-700 font-bold text-xs border border-gray-200">
                ACE
              </span>{" "}
              Answer Competency Evaluation rubric · Growth Dashboard · AI-supported evaluation (future-ready) as an assistant
              mentor for demand, structure and presentation.
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-500 max-w-3xl">
          These named frameworks are the intellectual core of MentorsDaily. They make the method easy to teach, easy to
          remember, and transferable across every subject and question type.
        </p>
      </section>

      {/* ============ 8. HOW THE PROGRAM WORKS ============ */}
      <section id="how" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">How it works</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              A sequenced build — one skill at a time
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              The program runs roughly 50 sessions (~100 hours). You don't practise randomly — you climb a deliberate
              ladder, mastering each engine before the next. Here's the arc from enrollment to exam-ready.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {PHASES.map(([phase, title, desc, note]) => (
              <div
                key={phase}
                className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="md:w-40 shrink-0">
                  <div className="text-xs font-bold text-brand-700 maw-badge uppercase">{phase}</div>
                  <div className="font-bold">{title}</div>
                </div>
                <div className="flex-1 text-sm text-gray-600">{desc}</div>
                <div className="md:w-56 shrink-0 text-xs text-gray-500">{note}</div>
              </div>
            ))}
            <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="md:w-40 shrink-0">
                <div className="text-xs font-bold text-brand-700 maw-badge uppercase">Phase 6 · Ongoing</div>
                <div className="font-bold">Improvement Loop</div>
              </div>
              <div className="flex-1 text-sm text-brand-900/80">
                The AIR Loop runs throughout: every answer is assessed on the ACE rubric, improved, and rewritten. ELS and
                PRS turn your errors into tracked, shrinking patterns.
              </div>
              <div className="md:w-56 shrink-0 text-xs text-brand-700">Builds layers 8–9 · Compounding gains</div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Week ranges are indicative of the learning sequence and adjust to cohort pace. GS paper-wise application
            (GS1–GS4) is woven through Phases 3–6.
          </p>
        </div>
      </section>

      {/* ============ 9. CURRICULUM ============ */}
      <section id="curriculum" className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Curriculum</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            Nine modules, each built to close a specific gap
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Every module states why you learn it, what you'll be able to do, and how it's practised. Expand any module for
            the detail.
          </p>
        </div>

        <div className="mt-10 divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {MODULES.map((m) => (
            <details key={m.n} className="group" open={m.open}>
              <summary className="flex items-center gap-4 p-6 cursor-pointer list-none hover:bg-gray-50">
                <span
                  className={`w-10 h-10 rounded-xl grid place-items-center font-bold shrink-0 ${
                    m.open ? "bg-brand-600 text-white" : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {m.n}
                </span>
                <div className="flex-1">
                  <div className="font-bold text-lg">{m.title}</div>
                  <div className="text-sm text-gray-500">{m.sub}</div>
                </div>
                <Chevron />
              </summary>
              <div className="px-6 pb-6 pl-20 grid md:grid-cols-2 gap-6 text-sm">
                {[
                  ["Learning objectives", m.objectives],
                  ["Skills developed", m.skills],
                  ["Practice activities", m.activities],
                  ["Deliverables & outcome", m.deliverables],
                ].map(([label, list]) => (
                  <div key={label}>
                    <div className="font-semibold text-gray-900 mb-1">{label}</div>
                    <ul className="list-disc pl-4 text-gray-600 space-y-1">
                      {list.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ============ 10. INSIDE ONE SESSION ============ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Inside one session</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">A workshop, not a lecture</h2>
            <p className="mt-4 text-lg text-gray-600">
              No session is a talk you passively watch. You do something every 10–15 minutes. Here's the standardised flow
              of a two-hour class.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {SESSION_FLOW.map(([min, title, desc]) => (
              <div key={min} className="rounded-xl bg-white border border-gray-200 p-5">
                <div className="text-xs font-bold text-brand-700 maw-badge uppercase">{min}</div>
                <div className="mt-1 font-bold">{title}</div>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
            <div className="rounded-xl bg-brand-600 text-white p-5">
              <div className="text-xs font-bold text-brand-100 maw-badge uppercase">Every session</div>
              <div className="mt-1 font-bold">You leave with written work</div>
              <p className="mt-1 text-sm text-brand-100">Never just notes — always a finished, evaluated answer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 11. STUDENT JOURNEY ============ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Your journey</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">From "I can't write" to exam-ready</h2>
          <p className="mt-4 text-lg text-gray-600">
            A clear path with visible milestones, so you always know where you are and what's next.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-4 gap-5">
          {JOURNEY.map(([num, title, desc, color]) => (
            <div key={num} className="rounded-2xl border border-gray-100 p-6">
              <div className={`text-3xl font-black ${color}`}>{num}</div>
              <div className="mt-2 font-bold text-lg">{title}</div>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <div className="text-3xl font-black text-brand-600">04</div>
            <div className="mt-2 font-bold text-lg text-brand-900">Exam-Ready</div>
            <p className="mt-2 text-sm text-brand-900/80">
              You finish full papers on time and improve on a measured curve.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 12. DELIVERABLES ============ */}
      <section className="bg-brand-900 text-white maw-grain">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-200 maw-badge uppercase">What you receive</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              A complete academic toolkit — not just classes
            </h2>
            <p className="mt-4 text-lg text-brand-100/80">
              Every framework ships with printable, reusable material. You keep the system for life.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DELIVERABLES.map(([title, desc]) => (
              <div key={title} className="rounded-xl bg-white/5 border border-white/10 p-5">
                <div className="font-bold">{title}</div>
                <p className="mt-1 text-sm text-brand-100/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 13. EVALUATION SYSTEM (ACE) ============ */}
      <section id="evaluation" className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Evaluation</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              You'll never get "6/10, write more" again
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every answer is scored on the <strong>ACE Rubric — Answer Competency Evaluation</strong>. Instead of one vague
              number, you receive a breakdown across the competencies that actually decide marks — so you know exactly what
              to fix next.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> Standardised across every mentor and every answer
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> Tied directly to the 9-Layer Architecture
              </li>
              <li className="flex gap-2">
                <span className="text-brand-600">✓</span> Feeds your monthly competency growth chart
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 shadow-xl shadow-brand-900/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-400 maw-badge uppercase">Sample ACE Scorecard</div>
                <div className="font-bold text-lg">Answer · GS2 · Governance</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-brand-600">
                  7.5<span className="text-base text-gray-400">/10</span>
                </div>
                <div className="text-xs text-gray-400">Overall</div>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {SCORECARD.map(([label, score, width, bar]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="font-semibold">{score}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-gray-100">
                    <div className={`h-2 rounded-full ${bar}`} style={{ width: `${width}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-brand-50 p-4 text-sm text-brand-900">
              <span className="font-bold">Fix next:</span> Analysis depth. You described three schemes but didn't weigh
              their trade-offs — add one line of judgement per point.
            </div>
            <p className="mt-3 text-xs text-gray-400">Illustrative scorecard. Full ACE rubric scores up to 20 competencies.</p>
          </div>
        </div>
      </section>

      {/* ============ 14. IMPROVEMENT LOOP (AIR) ============ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">The signature loop</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              Every answer is rewritten. That's where the marks come from.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Writing fifty answers without feedback teaches little. Ten answers run through the <strong>AIR Loop</strong> —
              Assess, Improve, Rewrite — teach far more. This loop runs on every single answer you write.
            </p>
          </div>
          <div className="mt-12 flex flex-col md:flex-row items-stretch gap-3">
            {AIR_LOOP.map(([num, title, desc], idx) => (
              <React.Fragment key={num}>
                <div className="flex-1 rounded-2xl bg-white border border-gray-200 p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-brand-50 text-brand-600 grid place-items-center font-black">
                    {num}
                  </div>
                  <div className="mt-3 font-bold">{title}</div>
                  <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
                <div className="hidden md:grid place-items-center text-2xl maw-flow-arrow">→</div>
              </React.Fragment>
            ))}
            <div className="flex-1 rounded-2xl bg-brand-600 text-white p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-white/15 grid place-items-center font-black">5</div>
              <div className="mt-3 font-bold">Improve</div>
              <p className="mt-1 text-sm text-brand-100">The gain is locked in and measured.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 15. FEATURES ============ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Features</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">Everything the system needs to work</h2>
          <p className="mt-4 text-lg text-gray-600">Each feature exists to serve learning — nothing is here for decoration.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(([title, desc, badge]) => (
            <div key={title} className="rounded-2xl border border-gray-100 p-6">
              <div className="font-bold text-lg">
                {title}
                {badge && (
                  <span className="ml-1 text-[10px] align-middle px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-bold maw-badge uppercase">
                    {badge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 16. MENTOR METHODOLOGY ============ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Mentor methodology</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">The method is the mentor</h2>
            <p className="mt-4 text-lg text-gray-600">
              This program isn't built around one star teacher whose absence would break it. It's built around a system
              every mentor is trained to deliver identically — so your experience is consistent, standardised and
              quality-controlled, whoever teaches your cohort.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {MENTOR_METHOD.map(([tag, desc]) => (
              <div key={tag} className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="text-xs font-bold text-brand-700 maw-badge uppercase">{tag}</div>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 17. WHO SHOULD JOIN ============ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Who it's for</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            Built for serious aspirants at every stage
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WHO.map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-gray-100 p-6">
              <div className="font-bold">{title}</div>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 18. OUTCOMES ============ */}
      <section className="bg-brand-900 text-white maw-grain">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-200 maw-badge uppercase">Outcomes</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              What you'll be able to do by the end
            </h2>
          </div>
          <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-4">
            {OUTCOMES.map((o) => (
              <div key={o} className="flex gap-3">
                <span className="text-brand-200">✓</span>
                <p className="text-brand-100/90">{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 19. PRICING ============ */}
      <section id="enroll" className="max-w-7xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Enrollment</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">Join the Founding Cohort</h2>
          <p className="mt-4 text-lg text-gray-600">
            We're opening the program to a first, limited cohort. Founding members get the full system, a lower founding
            rate, and direct influence on how the program evolves.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto rounded-3xl border-2 border-brand-600 shadow-2xl shadow-brand-900/10 overflow-hidden">
          <div className="bg-brand-600 text-white px-8 py-4 flex items-center justify-between">
            <span className="font-bold">Mains Answer Writing Excellence</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/15 maw-badge uppercase">Founding Cohort</span>
          </div>
          <div className="p-8">
            <p className="text-xs font-bold maw-badge uppercase text-brand-600">Early Bird Offer</p>
            <div className="mt-2 flex items-center flex-wrap gap-3">
              {discountPercentage > 0 && (
                <span className="text-xl text-gray-400 line-through font-medium">{formatINR(basePrice)}</span>
              )}
              <span className="text-4xl font-black text-brand-700">{formatINR(displayedPrice)}</span>
              {discountPercentage > 0 && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Limited early-bird pricing for the Founding Cohort. Secure checkout via Razorpay — UPI, cards, netbanking &amp;
              EMI supported.
            </p>

            <div className="mt-5">
              <CouponApplyBox
                onApply={handleApplyCoupon}
                onClear={clearCoupon}
                loading={couponApplying}
                appliedCoupon={appliedCoupon}
                errorMessage={couponError}
                compact
              />
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              {[
                "~50 live workshop sessions (~100 hours)",
                "All 21 frameworks + printable Framework Handbook",
                "Student Workbook, Question Bank & Model Answer Library",
                "ACE competency evaluation on every answer",
                "Progress dashboard + error analytics",
                "Founding-member rate + direct access to the team",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-brand-600">✓</span> {t}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setShowPaymentForm(true)}
              className="mt-8 block w-full text-center px-6 py-3.5 text-base font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700"
            >
              Enroll Now — {formatINR(displayedPrice)}
            </button>
            <p className="mt-3 text-center text-xs text-gray-400">
              Scholarship support available for candidates who need it — mention it on your application.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 20. RESULTS PLACEHOLDER ============ */}
      {/* <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 text-center maw-reveal">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">Results</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">Proof, not promises</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We're a new program, so we won't show you testimonials we don't have. Instead, this space is reserved for the
            Founding Cohort — real before-and-after answers, real competency growth, published here as it happens.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-400">
              Founding-member story — coming soon
            </div>
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-400">
              Before / after answer — coming soon
            </div>
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-400">
              Competency growth chart — coming soon
            </div>
          </div>
        </div>
      </section> */}

      {/* ============ 21. FAQ ============ */}
      <section id="faq" className="max-w-4xl mx-auto px-4 md:px-8 py-24 maw-reveal">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand-700 maw-badge uppercase">FAQ</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">Every question, answered</h2>
        </div>

        <div className="mt-10 space-y-8">
          {FAQ_GROUPS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-bold text-gray-400 maw-badge uppercase mb-3">{group.heading}</h3>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
                {group.items.map(([q, a]) => (
                  <details key={q} className="group">
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-gray-50">
                      <span className="font-semibold text-gray-900">{q}</span>
                      <Chevron />
                    </summary>
                    <div className="px-5 pb-5 text-sm text-gray-600">{a}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 22. FINAL CTA ============ */}
      <section className="bg-brand-900 text-white maw-grain">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 text-center maw-reveal">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Answer writing can be learned
            <br />
            systematically — not accidentally.
          </h2>
          <p className="mt-6 text-lg text-brand-100/80 max-w-2xl mx-auto">
            If you've been writing answers and waiting to improve, the missing piece was never more effort. It was a system.
            This is that system.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#enroll"
              className="inline-flex px-7 py-3.5 text-base font-semibold bg-white text-brand-700 rounded-xl hover:bg-brand-50"
            >
              Apply for the Founding Cohort
            </a>
            <a
              href="#curriculum"
              className="inline-flex px-7 py-3.5 text-base font-semibold text-white border border-white/25 rounded-xl hover:bg-white/10"
            >
              Review the curriculum
            </a>
          </div>
        </div>
      </section>

      {showPaymentForm && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-brand-700 to-brand-600 p-4 text-white">
              <h3 className="text-xl font-semibold">Enroll in {paymentCourse.title}</h3>
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
              key={`${paymentCourse._id ?? "local"}-${displayedPrice}`}
              course={paymentCourse}
              onPaymentSuccess={() => setShowPaymentForm(false)}
              onClose={() => setShowPaymentForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
