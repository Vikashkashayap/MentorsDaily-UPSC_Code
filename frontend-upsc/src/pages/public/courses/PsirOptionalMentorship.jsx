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
import "./psirOptionalExtras.css";

export const PSIR_OPTIONAL_SLUG = "psir-optional-course";

const FALLBACK_BASE_PRICE = 29999;
const FALLBACK_SELLING_PRICE = 24999;

const formatINR = (value) => `₹${Math.round(Number(value) || 0).toLocaleString("en-IN")}`;

const Chevron = () => (
  <svg
    className="psir-chev w-5 h-5 text-gray-400 shrink-0 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
);

const PAIN_POINTS = [
  ["01", '"I know the thinkers but can\'t connect them."', "Locke, Rawls, Gramsci, Gandhi sit in separate boxes. The exam wants you to make them talk to each other."],
  ["02", '"My answers describe. They don\'t analyse."', "You reproduce theory, but Paper II wants you to apply it to Indian federalism, foreign policy and global order — with judgement."],
  ["03", '"My IR is just current affairs."', "You track the news but can't anchor it to realism, liberalism or structuralism — so answers read like a newspaper, not an analysis."],
  ["04", '"Every batch starts and I\'ve already fallen behind."', 'You wait for the "next batch", miss week one, and quietly conclude the program isn\'t for you.'],
  ["05", '"Nobody actually reads what I write."', "Test series returns a number weeks later. You never learn why the answer was a 6, not an 11."],
];

const COMPARISON_ROWS = [
  ["To join whenever you're ready", "Fixed batch — miss it, wait months", "Always running — join today, mid-topic is fine"],
  ["To link thinkers & apply theory", "Topic-by-topic lectures in isolation", "PLM linkage trained on every single topic"],
  ["Answers that are read, not scored", "A number, weeks later", "PAE competency feedback + rewrite loop"],
  ['To never fall behind', 'Linear ladder — miss a rung, panic', "The Revolution — every topic comes back"],
  ['To not feel out of place', '"Advanced batch" vs "beginner batch"', "One room, PLM depth adapts to you"],
];

const FRAMEWORKS = [
  ["DDF · Demand Decode", "Read what the question actually asks — directive, dimension, and the thinker or school it's fishing for."],
  ["TLF · Theorist Linking", "Put any two thinkers or IR schools in conversation — agree, contrast, extend — on demand."],
  ["IAB · Indian Application Bridge", "Carry a Western concept across to Indian federalism, party system, movements, foreign policy — with a real example."],
  ["CPB · Cross-Paper Bridge", "Feed Paper I theory into Paper II comparative & IR answers, and vice-versa — one mind, both papers."],
  ["DDL · Definition & Diagram", "Open with a crisp definition and a diagram the examiner remembers."],
  ["JES · Judgement & Evaluation", "End with a defended position — the political judgement most answers never reach."],
];

const CURRICULUM = [
  ["01", "Political Theory & Approaches", "Meaning & approaches · state, sovereignty, power · justice, equality, rights, liberty, democracy."],
  ["02", "Western & Indian Political Thought", "Plato→Marx · Gramsci & hegemony · Kautilya, Gandhi, Ambedkar, Nehru, M.N. Roy — with TLF linkage."],
  ["03", "Indian Government & Politics", "Nationalism & Constitution · organs of govt & federalism · parties, movements, political economy."],
  ["04", "Comparative Politics & Political Economy", "Nature & approaches · state in comparative perspective · development, underdevelopment, globalisation."],
  ["05", "International Relations — Theory & Concepts", "Realism, liberalism, Marxist, feminist, systems · power, security, balance · global order — via CPB."],
  ["06", "India & the World", "Foreign policy determinants · NAM & nuclear · neighbours, big powers, UN, IMF/WB, regionalism, current issues."],
];

const DELIVERABLES = [
  ["Daily notes (Hindi/Eng)", "One concept, fully developed, PYQ-tagged, diagram-backed."],
  ["Framework Handbook", "All six PLM engines, defined and ready to apply."],
  ["Thinker & School Maps", "Visual TLF maps connecting political theorists & IR schools."],
  ["Question Bank", "Decoded PYQs and practice questions by demand type."],
  ["Model Answer Library", "Reference answers annotated by PLM layer and framework."],
  ["Revision Sheets", "One-pager per topic, reused across the Revolution."],
  ["PAE Evaluation Sheets", "The rubric for scoring your own and peers' answers."],
  ["Progress Dashboard", "Monthly competency growth and weak-area tracker."],
];

const WHO = [
  ["First attempt / fresh graduate", "Start with the right method — see, link, argue — instead of unlearning bad habits later."],
  ['Repeater — "notes but flat marks"', "Break the plateau by fixing linkage and judgement, the piece test series never gave you."],
  ["Working professional", "A 90-minute daily routine with a Sunday catch-up window that respects your hours."],
  ["Switching to PSIR", "The Foundation track builds your base from zero while the Orbit keeps you in the cohort."],
  ["Non-humanities background", 'Afraid it\'s "too theoretical"? PLM makes theory concrete — a concept, a link, an example.'],
  ["Hindi-medium aspirant", "Every note is bilingual; write and get evaluated in the medium you'll use in the exam."],
];

const OUTCOMES = [
  "Decode the exact demand of any PSIR question.",
  "Put any two thinkers or IR schools in conversation on demand.",
  "Bridge Western theory to Indian polity and foreign policy with real examples.",
  "Move Paper I theory into Paper II comparative & IR answers, and back.",
  "Anchor current global events to IR theory instead of narrating news.",
  "Open with a definition and a diagram the examiner remembers.",
  "End every answer with a defended political judgement.",
  "Improve continuously on a measured, monthly curve.",
];

const FAQ_GROUPS = [
  {
    heading: "Joining & the running model",
    items: [
      ['There\'s no batch — how do I "join"?', "You join on any date and immediately get two tracks: today's Orbit (the shared daily topic) and your own Foundation (the self-paced spine from the beginning). There is no start line, so there is nothing to be late for."],
      ["I'm joining months after others. Won't I be behind?", 'No. The syllabus is a Revolution — a loop that restarts. Whatever you join in the middle of comes back around, and your Foundation fills any gap in the meantime. "Behind" only exists in a linear batch, and this isn\'t one.'],
      ["What if I miss a topic or a few days?", "It returns in the next Revolution, and everything stays accessible. Sunday is a built-in catch-up day. You're never penalised for falling out of step."],
      ["Is there any live element or is it all self-paced?", "Both. The Orbit is a shared daily rhythm with a weekly live doubt session (recorded); the Foundation is self-paced. You get cohort energy and personal pace at once."],
      ["How long will I be in the program?", "As long as you're preparing. Each Revolution goes deeper — build, then sharpen, then exam-mode. You exit on your exam date, not on a batch's end date."],
    ],
  },
  {
    heading: "The method",
    items: [
      ["What is PLM?", "The 3-Layer Political Mind: See the concept, Link it (to thinkers, the other paper, Indian polity and world affairs), Argue it under time. Every topic and every answer runs through all three layers, in order."],
      ["I can never connect thinkers. Does this help?", "That's exactly what the Theorist Linking Framework (TLF) trains — putting any two thinkers or IR schools in conversation on demand, instead of memorising them in separate boxes."],
      ["My IR answers are just current affairs.", "The frameworks anchor every current event to an IR theory — realism, liberalism, structuralism — so you analyse, not narrate. Current affairs become illustrations of a position, not the position itself."],
      ["My Paper II answers lack application.", "The Indian Application Bridge (IAB) trains you to carry a Western concept across to Indian federalism, party system, movements or foreign policy with a concrete example — every time."],
      ["Will you give me templates to memorise?", "No. Templates break on unfamiliar questions. You learn six transferable frameworks you can apply to any topic in either paper."],
      ["Does it cover both papers fully?", "Yes — Paper I (political theory + Indian govt) and Paper II (comparative politics + IR), complete, and deliberately cross-linked (CPB) so the two papers reinforce each other instead of being learned twice."],
    ],
  },
  {
    heading: "Evaluation & feedback",
    items: [
      ["How are my answers evaluated?", "On the PAE Rubric (PSIR Answer Evaluation) — a breakdown across demand, theorist linkage, Indian/global application, judgement, presentation and time, with a specific next fix. Not one vague number."],
      ["Does someone actually read what I write?", "Yes. Daily answers get peer + mentor reads in the cohort; one answer a week gets a full personal evaluation, and monthly sectional tests are returned within 72 hours."],
      ["Do I have to rewrite answers?", "Yes — that's the Orbit Loop: Practice, Assess, Reflect, Rewrite, Improve. Rewriting is where most of the improvement happens."],
      ["Can I track my progress?", "Your dashboard charts PAE competency growth month over month and flags weak areas across the syllabus."],
    ],
  },
  {
    heading: "Time, language & enrolment",
    items: [
      ["What language is the program in?", "Bilingual. Notes are in Hindi and English, and you write and get evaluated in the medium you'll use in the exam."],
      ["I'm a working professional. Can I keep up?", "Yes. The daily routine is about 90 minutes, with a Sunday catch-up window. It's designed around limited time."],
      ["How do I pay — one-time or monthly?", "Both. A monthly membership you can pause or cancel, or a full-access membership (one-time or EMI) through your attempt. Pricing is shown at checkout."],
      ["Do you offer scholarships?", "Yes. Support is available for candidates who need it — mention it when you join."],
      ["Are there fake topper claims or paid testimonials?", "No. As we build, we publish only real member results, as they happen."],
    ],
  },
];

const ORBIT_LOOP = [
  ["1", "Practice", "Write under real time constraints."],
  ["2", "Assess", "Score on the PAE rubric."],
  ["3", "Reflect", "Name the missing link or judgement."],
  ["4", "Rewrite", "Produce the improved answer."],
];

export default function PsirOptionalMentorship() {
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
    document.querySelectorAll(".psir-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const envelope = await getCourseBySlug(PSIR_OPTIONAL_SLUG);
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
        // Optional enhancement.
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
    title: course?.title || "PSIR Optional Mentorship",
    slug: PSIR_OPTIONAL_SLUG,
    thumbnail: course?.thumbnail,
    basePrice,
    sellingPrice: displayedPrice,
    discountPercentage,
    appliedCoupon: appliedCoupon?.code ? appliedCoupon : null,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((g) =>
      g.items.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      }))
    ),
  };

  return (
    <div className="psir-root bg-white text-gray-900 antialiased">
      <SEO
        title={course?.metaTitle || course?.title || "PSIR Optional Mentorship"}
        description={
          course?.metaDescription ||
          "An always-running, join-anytime Political Science & International Relations (PSIR) Optional mentorship built on the 3-Layer Political Mind (PLM): See, Link, Argue."
        }
        image={getCourseOgImageUrl(course)}
        url={`/${PSIR_OPTIONAL_SLUG}`}
      />
      <Helmet>
        <meta
          name="keywords"
          content="UPSC PSIR Optional, political science mentorship, PSIR optional 2026, PSIR answer writing, evergreen PSIR course, international relations optional, MentorsDaily"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "MentorsDaily PSIR Optional Mentorship",
            description:
              "An always-running, join-anytime Political Science & International Relations Optional mentorship built on the 3-Layer Political Mind (PLM).",
            provider: { "@type": "Organization", name: "MentorsDaily", sameAs: "/" },
          })}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ============ 1. HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-14 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 flex-wrap mb-5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-brand-100 text-brand-700 text-xs font-bold psir-badge uppercase">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 1l2.39 5.84L18.5 7.5l-4.75 4.05L15.2 18 10 14.85 4.8 18l1.45-6.45L1.5 7.5l6.11-.66L10 1z" />
                </svg>
                Flagship Optional
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand-600 text-white text-xs font-bold psir-badge uppercase">
                Always running · Join any day
              </span>
            </div>
            <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">UPSC PSIR Optional Mentorship</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              Stop collecting notes.
              <br />
              Start <span className="text-brand-600">arguing</span> like a political scientist.
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl">
              Political Science &amp; IR is not a reading subject — it is an arguing subject. Most aspirants own three sets
              of notes and still write description, not analysis. This program teaches PSIR as a system:{" "}
              <strong>See the concept, Link it to Indian polity and world affairs, Argue it under exam time.</strong> And
              because it runs every single day, you can <strong>join today</strong> — you&apos;ll never have to
              &quot;catch up&quot;.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-2.5 max-w-2xl">
              {[
                "Join on any date — no batch, no start line to miss",
                "Link any two thinkers or IR schools on demand — no silos",
                "Bridge theory to Indian polity & foreign policy, every answer",
                "Turn description into examiner-grade judgement",
                "Miss a topic? The Revolution brings it back",
                "Learn & write in Hindi or English",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-0.5 text-brand-600">✓</span> {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPaymentForm(true)}
                className="inline-flex px-6 py-3 text-base font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700 shadow-sm"
              >
                Join the program
              </button>
              <a
                href="#curriculum"
                className="inline-flex px-6 py-3 text-base font-semibold text-brand-700 bg-white border border-brand-100 rounded-xl hover:border-brand-200"
              >
                See the curriculum
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="text-brand-600">◆</span> Evergreen · join anytime
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
            <div className="rounded-2xl border-2 border-brand-600 bg-white shadow-xl shadow-brand-900/10 overflow-hidden">
              <div className="bg-brand-600 text-white px-6 py-3 flex items-center justify-between">
                <span className="font-bold">PSIR Optional Mentorship</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15 psir-badge uppercase">
                  Full Access
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-bold psir-badge uppercase text-brand-600">Membership</p>
                <div className="mt-2 flex items-center flex-wrap gap-2">
                  {discountPercentage > 0 && (
                    <span className="text-lg text-gray-400 line-through font-medium">{formatINR(basePrice)}</span>
                  )}
                  <span className="text-3xl font-black text-brand-700">{formatINR(displayedPrice)}</span>
                  {discountPercentage > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Always running · join any day · Razorpay checkout (UPI, cards, EMI)
                </p>
                <div className="mt-4">
                  <CouponApplyBox
                    onApply={handleApplyCoupon}
                    onClear={clearCoupon}
                    loading={couponApplying}
                    appliedCoupon={appliedCoupon}
                    errorMessage={couponError}
                    compact
                  />
                </div>
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {[
                    "Daily Orbit + self-paced Foundation",
                    "Daily notes, tasks & practice answers",
                    "Weekly evaluation + live doubt session",
                    "Monthly sectional test + dashboard",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-brand-600 shrink-0">✓</span> {t}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(true)}
                  className="mt-6 block w-full text-center px-5 py-3 text-sm font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700"
                >
                  Join Today — {formatINR(displayedPrice)}
                </button>
                <p className="mt-3 text-center text-[11px] text-gray-400">
                  Scholarship support available — mention when you join.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. CORE BELIEF ============ */}
      <section className="bg-brand-900 text-white psir-grain">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-16 text-center">
          <p className="text-xs font-bold psir-badge uppercase text-brand-200">Our core belief</p>
          <p className="mt-4 text-2xl md:text-4xl font-bold leading-tight">
            &quot;Political Science is not a reading subject. It is a{" "}
            <span className="text-brand-200">seeing and connecting</span> subject — the marks come from linkage and
            judgement, not information.&quot;
          </p>
          <p className="mt-6 text-brand-200/80 text-sm max-w-2xl mx-auto">
            Everyone reads the same Gauba, the same Heywood. The topper isn&apos;t the one who read more — it&apos;s the
            one who can link a theorist to a headline and defend a position. This program trains that.
          </p>
        </div>
      </section>

      {/* ============ 3. PAIN POINTS ============ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 psir-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">Sound familiar?</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            You&apos;ve read the whole syllabus. The optional score won&apos;t move.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            If any of these describe you, the problem isn&apos;t the books. It&apos;s the missing system between what
            you&apos;ve read and what reaches the answer sheet.
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
              None of these are &quot;read more&quot; problems. They are seeing, linking and arguing problems — and every
              one of them is trainable, daily.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 4. COMPARISON ============ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 psir-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">The category problem</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              Why the usual PSIR course leaves you exactly where you started
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              This isn&apos;t a criticism of any institute. It&apos;s a structural gap in how the category is designed.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4 font-semibold text-gray-500 w-1/3">What you actually need</th>
                  <th className="p-4 font-semibold text-gray-500">The typical program</th>
                  <th className="p-4 font-semibold text-brand-700">This program</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON_ROWS.map(([need, typical, ours]) => (
                  <tr key={need}>
                    <td className="p-4 font-medium">{need}</td>
                    <td className="p-4 text-gray-600">{typical}</td>
                    <td className="p-4 text-brand-700 font-medium">{ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ 5. PLM SYSTEM ============ */}
      <section id="system" className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">The system</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">The 3-Layer Political Mind</h2>
          <p className="mt-4 text-lg text-gray-600">
            Not a lecture series — a way of thinking you can apply to any topic, any question, in either paper.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            ["1", "See", "Get the concept exactly right — definition, thinker, origin, PYQ angle. Clean, bilingual, diagram-backed."],
            ["2", "Link", "Connect the concept to other thinkers, to the other paper, and to Indian polity & world affairs — the linkage that separates an 11 from a 6."],
            ["3", "Argue", "Take a position and defend it in a timed, examiner-shaped answer. Judgement, not narration.", true],
          ].map(([n, title, desc, highlight]) => (
            <div
              key={n}
              className={`rounded-2xl border p-7 ${highlight ? "border-brand-200 bg-brand-50" : "border-gray-100"}`}
            >
              <div
                className={`w-11 h-11 rounded-xl grid place-items-center font-black text-lg ${
                  highlight ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-600"
                }`}
              >
                {n}
              </div>
              <h3 className={`mt-4 font-bold text-xl ${highlight ? "text-brand-900" : ""}`}>{title}</h3>
              <p className={`mt-2 text-sm ${highlight ? "text-brand-900/80" : "text-gray-600"}`}>{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">The engines inside PLM</p>
          <h3 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">Six named frameworks you actually reuse</h3>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FRAMEWORKS.map(([tag, desc]) => (
            <div key={tag} className="rounded-2xl border border-gray-100 p-6">
              <div className="text-xs font-bold text-brand-700 psir-badge uppercase">{tag}</div>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 6. HOW IT RUNS ============ */}
      <section id="running" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">How it runs</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              Two tracks run every day, side by side, forever
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join on any date and you land in <strong>today&apos;s Orbit</strong> while your{" "}
              <strong>Foundation</strong> starts from the beginning.
            </p>
          </div>
          <div className="mt-12 grid lg:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-white border border-gray-200 p-7">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-600 text-white grid place-items-center font-black">O</div>
                <h3 className="font-bold text-xl">Orbit — the shared heartbeat</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                One topic goes live per day, the same for everyone in the program — wherever the loop currently is.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {["Daily topic, PYQ-tagged, bilingual", "One practice answer posted to the cohort", "Live cohort energy, every day"].map(
                  (t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-brand-600">✓</span> {t}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 p-7">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 grid place-items-center font-black">F</div>
                <h3 className="font-bold text-xl">Foundation — your private spine</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                A self-paced track in fixed order — political theory → political thought → Indian govt &amp; politics → comparative politics → IR → India &amp; the world.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {["Go at your own speed, no clock", "Fills whatever the Orbit assumes you know", "So a new joiner is never lost in a live topic"].map(
                  (t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-brand-600">✓</span> {t}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-brand-900 text-white psir-grain p-7 md:p-10">
            <p className="text-xs font-bold psir-badge uppercase text-brand-200">The Revolution — why nobody is ever &quot;late&quot;</p>
            <div className="mt-4 grid md:grid-cols-4 gap-4">
              {[
                ["1 loop = full syllabus", "Paper I + Paper II is one revolution. It ends, then restarts."],
                ["Miss a topic? It returns", "Skipped realism in March? It comes back next revolution."],
                ["Join mid-loop, no problem", "Orbit picks you up now; Foundation fills the gap you skipped."],
                ['No "week 1"', "No start line means no way to be behind it. Ever."],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-xl bg-white/5 border border-white/10 p-5">
                  <div className="font-bold">{title}</div>
                  <p className="mt-1 text-sm text-brand-100/70">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. INSIDE ONE DAY ============ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">Inside one day</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">A 90-minute routine, built for real lives</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ["Step 1 · ~30 min", "See the note", "One concept, fully developed — definition, thinker, PYQ angle, Indian/global example."],
            ["Step 2 · ~15 min", "Do the Link task", "Connect the concept to a thinker/school or apply it to Indian polity or foreign policy."],
            ["Step 3 · ~30 min", "Argue — write an answer", "One 10/15/20-marker, posted to the cohort for peer + mentor read."],
            ["Step 4 · ~15 min", "Revision sheet", "A one-page self-test, reused in weekly and monthly revision.", true],
          ].map(([step, title, desc, highlight]) => (
            <div
              key={step}
              className={`rounded-xl p-6 ${highlight ? "bg-brand-600 text-white" : "bg-white border border-gray-200"}`}
            >
              <div className={`text-xs font-bold psir-badge uppercase ${highlight ? "text-brand-100" : "text-brand-700"}`}>
                {step}
              </div>
              <div className="mt-1 font-bold text-lg">{title}</div>
              <p className={`mt-1 text-sm ${highlight ? "text-brand-100" : "text-gray-600"}`}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 8. CURRICULUM ============ */}
      <section id="curriculum" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">Curriculum</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              The full syllabus — as a loop you enter anywhere
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {CURRICULUM.map(([num, title, desc]) => (
              <div key={num} className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="text-3xl font-black text-brand-200">{num}</div>
                <div className="mt-2 font-bold text-lg">{title}</div>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 9. EVALUATION ============ */}
      <section id="evaluation" className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">Evaluation</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              You&apos;ll never get &quot;6/10, add more content&quot; again
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every answer is scored on the <strong>PAE Rubric — PSIR Answer Evaluation</strong>.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 shadow-xl shadow-brand-900/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-400 psir-badge uppercase">Sample PAE Scorecard</div>
                <div className="font-bold text-lg">Answer · Paper I · Theories of Justice</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-brand-600">
                  7.5<span className="text-base text-gray-400">/10</span>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Demand fulfilment", 80, "brand"],
                ["Theorist linkage", 60, "accent"],
                ["Indian / global application", 70, "brand"],
                ["Political judgement", 60, "accent"],
                ["Presentation & diagram", 90, "brand"],
                ["Time discipline", 70, "brand"],
              ].map(([label, pct, tone]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="font-semibold">{Math.round(pct / 10)}/10</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-2 rounded-full ${tone === "accent" ? "bg-accent-500" : "bg-brand-600"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-brand-50 p-4 text-sm text-brand-900">
              <span className="font-bold">Fix next:</span> Theorist linkage. You explained Rawls and Nozick separately — put them in conversation (justice as fairness vs. the entitlement theory) for one line of real judgement.
            </div>
          </div>
        </div>
      </section>

      {/* ============ 10. ORBIT LOOP ============ */}
      <section className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">The signature loop</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              Every answer is rewritten. That&apos;s where the marks come from.
            </h2>
          </div>
          <div className="mt-12 flex flex-col md:flex-row items-stretch gap-3">
            {ORBIT_LOOP.map(([num, title, desc]) => (
              <React.Fragment key={num}>
                <div className="flex-1 rounded-2xl bg-white border border-gray-200 p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-brand-50 text-brand-600 grid place-items-center font-black">
                    {num}
                  </div>
                  <div className="mt-3 font-bold">{title}</div>
                  <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
                <div className="hidden md:grid place-items-center text-2xl psir-flow-arrow">→</div>
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

      {/* ============ 11. DELIVERABLES ============ */}
      <section className="bg-brand-900 text-white psir-grain">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-200 psir-badge uppercase">What you receive</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              A complete PSIR toolkit — not just classes
            </h2>
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

      {/* ============ 12. WHO IT'S FOR ============ */}
      <section id="who" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">Who it&apos;s for</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
              Whatever stage you&apos;re at, there&apos;s a door in
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHO.map(([title, desc]) => (
              <div key={title} className="rounded-2xl bg-white border border-gray-200 p-6">
                <div className="font-bold text-lg">{title}</div>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 13. OUTCOMES ============ */}
      <section className="bg-brand-900 text-white psir-grain">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-brand-200 psir-badge uppercase">Outcomes</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">What you&apos;ll be able to do</h2>
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

      {/* ============ 14. ENROLL ============ */}
      <section id="enroll" className="max-w-7xl mx-auto px-4 md:px-8 py-24 psir-reveal">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">Join</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
            Membership, not a batch. Start the day you&apos;re ready.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Pick the access that fits — both open the full system on day one.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto rounded-3xl border-2 border-brand-600 shadow-2xl shadow-brand-900/10 overflow-hidden">
          <div className="bg-brand-600 text-white px-8 py-4 flex items-center justify-between">
            <span className="font-bold">PSIR Optional Mentorship</span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/15 psir-badge uppercase">Full Access</span>
          </div>
          <div className="p-8">
            <div className="mt-2 flex items-center flex-wrap gap-3 justify-center">
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
            <p className="mt-2 text-sm text-gray-500 text-center">
              Secure checkout via Razorpay — UPI, cards, netbanking &amp; EMI supported.
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
                "Daily Orbit + self-paced Foundation",
                "Daily notes, tasks & practice answers",
                "Weekly personal evaluation + live doubt session",
                "Monthly sectional test + dashboard",
                "Full Framework Handbook + Model Answer Library",
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
              Join Today — {formatINR(displayedPrice)}
            </button>
            <p className="mt-3 text-center text-xs text-gray-400">
              Scholarship support available — mention it when you join.
            </p>
          </div>
        </div>
      </section>

      {/* ============ 15. FAQ ============ */}
      <section id="faq" className="max-w-4xl mx-auto px-4 md:px-8 py-24 psir-reveal">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-brand-700 psir-badge uppercase">FAQ</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">Every question, answered</h2>
        </div>
        <div className="mt-10 space-y-8">
          {FAQ_GROUPS.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-bold text-gray-400 psir-badge uppercase mb-3">{group.heading}</h3>
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

      {/* ============ 16. FINAL CTA ============ */}
      <section className="bg-brand-900 text-white psir-grain">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 text-center psir-reveal">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            PSIR can be learned as a system —
            <br />
            and you can start today.
          </h2>
          <p className="mt-6 text-lg text-brand-100/80 max-w-2xl mx-auto">
            If you&apos;ve been &quot;starting PSIR next month&quot; for six months, the missing piece was never more
            notes. It was a system that runs every day and never lets you fall behind.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="#enroll"
              className="inline-flex px-7 py-3.5 text-base font-semibold bg-white text-brand-700 rounded-xl hover:bg-brand-50"
            >
              Join today
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

      {/* Mobile sticky bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500">Always running</div>
          <div className="font-bold text-sm">Join any day · never behind</div>
        </div>
        <a href="#enroll" className="px-5 py-2.5 text-sm font-semibold bg-brand-600 text-white rounded-lg">
          Join
        </a>
      </div>
      <div className="lg:hidden h-16" />

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
