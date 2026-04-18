/**
 * Default long-form landing copy for Integrated Mentorship 2027.
 * Admin overrides merge shallow-deep via course.detailPage (Mongo Mixed).
 */

export const IMP_2027_SLUG = "integrated-mentorship-2027";

function deepClone(obj) {
  try {
    return structuredClone(obj);
  } catch {
    return JSON.parse(JSON.stringify(obj));
  }
}

/** Merge admin overrides into defaults (arrays replaced wholesale when provided). */
export function mergeImpDetailPage(base, override) {
  if (!override || typeof override !== "object") return deepClone(base);
  const out = deepClone(base);
  function walk(target, src) {
    for (const key of Object.keys(src)) {
      const v = src[key];
      if (v === undefined) continue;
      if (Array.isArray(v)) {
        target[key] = v.slice();
      } else if (v !== null && typeof v === "object" && !Array.isArray(v)) {
        if (!target[key] || typeof target[key] !== "object") target[key] = {};
        walk(target[key], v);
      } else {
        target[key] = v;
      }
    }
  }
  walk(out, override);
  return out;
}

export function getDefaultImp2027DetailPage() {
  return {
    seo: {
      title: "IMP 2027 – 24-Month Integrated UPSC Mentorship Program | MentorsDaily",
      description:
        "Join MentorsDaily IMP 2027 — a 24-month personalized UPSC CSE 2027 journey with 100% fee refund after clearing Prelims, 1:1 mentoring, free hostel, meals & stationery for Mains, and next-attempt support. Plans from ₹30,000 (Weekly) or ₹48,000 (Daily).",
    },
    announcement: {
      strong: "🎉 Early Bird:",
      text: "Enroll now and save ₹48,000 — only limited seats available in this batch.",
      ctaText: "Grab Your Seat →",
      ctaHref: "#enroll",
    },
    hero: {
      badge: "Start Your UPSC Journey — With Zero Risk & Complete Support",
      titleLines: [
        { text: "Clear 2027 Prelims → Get" },
        { text: "100% Fee Refund", accent: true },
        // { text: "Get Your ", accent: false },
        // { text: "Full Fee Back", accent: true },
        // { text: "After Clearing Prelims.", accent: false },
      ],
      subHtml:
        "The MentorsDaily Integrated Program brings everything together under one roof—foundation building, personalized mentorship, curated resources, structured practice, psychological support, and interview guidance—creating a complete ecosystem for UPSC success.",
      perks: [
        "1:1 Dedicated Mentor",
        "AI Powered Student Dashboard",
        "Free Hostel & Library",
        "100% Fee Refund",
        "24/7 Mentor Support",
      ],
      /** Hero stats line (HTML allowed: <strong>, ·, etc.) */
      socialProofHtml:
        '<strong class="text-white/85">1200+ Already enrolled</strong> · 98% Student Satisfaction · Trusted by aspirants across India',
      trustLine: "4.9/5 Trusted by aspirants across India",
      cardTitle: "Integrated Mentorship Program (IMP) 2027",
      cardSubtitle: "From Basics to Interview — Complete UPSC Preparation with 1:1 Mentorship",
      cardFeatures: [
        "All NCERTs & Standard Books Provided",

        "Daily 1:1 Personalized Mentorship Sessions & Study Targets",
        "AI Powered Student Dashboard",
        "Biweekly Psychologist Support Sessions",
        "Prelims + Mains Test Series",
      ],
      enrollCta: "Enroll Now → Secure Your Seat",
      cardTrust: "Secure payment · No hidden charges · EMI available",
    },
    trustBar: [
      { icon: "Trophy", num: "1,200+", lbl: "UPSC Aspirants" },
      { icon: "Star", num: "98%", lbl: "Student Satisfaction" },
      { icon: "Headphones", num: "24/7", lbl: "Mentor Support" },
      { icon: "CalendarCheck", num: "24", lbl: "Months of Guidance" },
      { icon: "MapPin", num: "Noida", lbl: "Office + Hostel" },
    ],
    pricingSection: {
      tag: "Choose Your Plan",
      title: "Flexible Mentorship Plans\nBuilt for Serious Aspirants",
      sub: "Both plans cover the full 24-month IMP 2027 journey. Pick the intensity that matches your preparation style.",
      toggleHint: "Scroll down for a feature-by-feature comparison table ↓",
      weekly: {
        name: "Weekly Mentorship",
        price: 30000,
        oldPrice: 60000,
        saveLabel: "Save ₹30,000 (50% off) — Limited Seats",
        // durationLine: "30-Month Full Program · Batch Starts June 2025",
        features: [
          // { ok: true, cls: "green", text: "All NCERT Books Provided" },
          { ok: true, cls: "green", text: "Weekly 1:1 Personalized Mentor Sessions" },
          { ok: true, cls: "green", text: "Monthly Psychologist Support Sessions" },
          { ok: true, cls: "green", text: "Answer Writing & PYQ Practice" },
          // { ok: true, cls: "green", text: "Weekly Modular Tests" },
          { ok: true, cls: "green", text: "Prelims + Mains Test Series" },
          // { ok: true, cls: "green", text: "24×7 Mentor Support" },
          // { ok: true, cls: "orange", text: "Peer Learning & Accountability Groups" },
          { ok: true, cls: "orange", text: "Interview & Personality Development Guidance" },
          { ok: true, cls: "gold", text: "Weekly Performance Reports & Analysis" },
        ],
        cta: "Enroll in Weekly Plan",
      },
      daily: {
        name: "Daily Mentorship",
        popularRibbon: "Most Popular",
        price: 48000,
        oldPrice: 120000,
        saveLabel: "Save ₹72,000 (60% off) — Early Bird Price",
        // durationLine: "30-Month Full Program · Batch Starts June 2025",
        features: [
          { ok: true, cls: "green", text: "All NCERTs & Standard Books Provided" },
          { ok: true, cls: "green", text: "Daily 1:1 Personalized Mentor Sessions" },
          { ok: true, cls: "green", text: "Biweekly Psychologist Support Sessions" },
          { ok: true, cls: "green", text: "Answer Writing & PYQ Practice" },
          { ok: true, cls: "green", text: "Weekly Modular Tests" },
          { ok: true, cls: "green", text: "Prelims + Mains Test Series" },
          { ok: true, cls: "green", text: "24×7 Mentor Support" },
          { ok: true, cls: "orange", text: "Peer Learning & Accountability Groups" },
          { ok: true, cls: "orange", text: "Interview & Personality Development Guidance" },
          { ok: true, cls: "gold", text: "Weekly Performance Reports & Analysis" },
        ],
        cta: "Enroll in Daily Plan",
      },
      comparisonTitle: "Full Feature Comparison",
      comparisonHead: {
        left: "Feature",
        midLabel: "Daily",
        midPrice: "₹48,000",
        rightLabel: "Weekly",
        rightPrice: "₹30,000",
      },
      comparisonRows: [
        { type: "cat", label: "Mentoring & Guidance" },
        { type: "text", f: "1:1 Personalized Mentor Sessions", w: "Weekly 1 Session", d: "Daily 1 Session" },
        { type: "text", f: "Personalised Study Plan", w: "Weekly Update", d: "Daily Update" },
        // { type: "text", f: "Doubt Clearing TAT", w: "Within 48 hrs", d: "Within 6 hrs" },
        { type: "bool", f: "Study Materials", d: true, w: false },
        { type: "text", f: "Psychologist + Personality Development Session", w: "Monthly", d: "Bi-Weekly" },
        // { type: "bool", f: "Dedicated WhatsApp Hotline", w: false, d: true },
        // { type: "bool", f: "Priority Response Support", w: false, d: true },
        { type: "cat", label: "Study Resources" },
        { type: "bool", f: "Curated Study Material", w: false, d: true },
        { type: "bool", f: "Current Affairs Digest (Monthly)", w: true, d: true },
        { type: "bool", f: "Answer Writing Practice + Review + Live Diccussion", w: " No Live Diccussion", d: true },
        { type: "bool", f: "Essay & Ethics Practise Sets", w: true, d: true },
        { type: "cat", label: "Community & Events" },
        { type: "bool", f: "Telegram Peer Community", w: true, d: true },
        { type: "bool", f: "Monthly Live Webinars with Experts", w: true, d: true },
        { type: "bool", f: "Bi-Annual Progress Review Camp", w: false, d: true },
        { type: "cat", label: "Exclusive Guarantees" },
        { type: "bool", f: "100% Fee Refund (Prelims Cleared)", w: false, d: true },
        { type: "bool", f: "Free Hostel Accommodation (Mains)", w: true, d: true },
       
        { type: "bool", f: "One Extra Attempt at No Cost", w: false, d: true },
        { type: "bool", f: "Peer Learning & Accountability Groups", w: true, d: true },
        { type: "cat", label: "Tests and Answer Writing" },
        { type: "bool", f: "Weekly Performance Reports & Analysis", w: true, d: true },
        { type: "bool", f: "Weekly Modular Tests for Prelims & Mains", w: "80+ ", d: "200+ " },
        { type: "bool", f: "Full Length Tests for Prelims & Mains", w: "50+ ", d: "100+ " },
      ],
      helpHtml:
        'Questions about which plan is right for you? <a class="imp-a" href="https://wa.me/918766233193" target="_blank" rel="noreferrer">Chat with us on WhatsApp</a> and we\'ll help you decide.',
    },
    uspSection: {
      tag: "Why IMP 2027 is Different",
      title: "Three Guarantees No Other\nUPSC Program Offers",
      sub: "We didn't just build another coaching program. We made three commitments that remove risk and ensure you stay supported until you succeed.",

      cards: [
        {
          variant: "green",
          icon: "Banknote",
          title: "100% Fee Refund After Clearing Prelims",
          body: "Clear your Prelims and we return every rupee of your ₹30,000 enrollment fee. No paperwork maze, no conditions. This is our bet on you — and our confidence in the program we've built.",
          steps: ["1 Enroll in IMP", "2 Clear Prelims", "3 Full Refund"],
          // linkText: "Claim this guarantee →",
          linkHref: "#enroll",
        },
        {
          variant: "orange",
          icon: "House",
          title: "Free Hostel, Meals & Stationery for Mains + Interview",
          body: "Once you clear Prelims, move into our Noida facility — accommodation, food, and stationery all at zero extra cost. Study in a focused environment with fellow UPSC aspirants, unlimited library access, and all the peace you need to crack Mains and the Interview.",
          steps: ["🏠 Noida Hostel", "🍴 Free Meals", "📚 Library + Stationery"],
          // linkText: "See the facility →",
          linkHref: "https://maps.google.com/?q=B-69,+Block+B,+Noida+Sector+2",
          external: true,
        },
        {
          variant: "blue",
          icon: "RefreshCw",
          title: "Next Attempt Is On Us — If You Don't Qualify in Your First Try",
          body: "",
          bodyHtml:
            "If you complete the full IMP 2027 program and don't qualify in your first attempt, we continue your mentorship for the next attempt at <strong>zero additional fee</strong>. No re-enrollment, no extra charges — we stay with you until you clear it.",
          stepsMode: "stack",
          steps: ["🎓 Complete IMP —", "✖ Didn't Clear —", "🎁 Next Attempt Free"],
          // linkText: "Enroll with full confidence →",
          linkHref: "#enroll",
        },
      ],
      competitorHtml:
        "<strong> While most programs focus only on teaching, MentorsDaily goes beyond with mentorship, continuous support, and risk-free preparation—offering all three guarantees together to ensure you succeed.</strong>",
    },
    featuresSection: {
      tag: "WHAT YOU GET",
      title: "Everything You Need to Clear UPSC 2027",
      sub: "IMP 2027 is built so every day of your preparation has a clear purpose, a defined outcome, and a mentor watching your back.",
      items: [
        { theme: "navy", icon: "Users", title: "Small Batches - Max 15 Students Per Mentor", body: "While other institutes assign 200+ students to one mentor, we cap each mentor at 15. Your mentor actually knows you — your patterns, your gaps, your pace." },
        { theme: "orange", icon: "ClipboardList", title: "DART - Daily Activity & Reflection Tracker", body: "Every day you fill a structured tracker covering what you studied, how you felt, and what you struggled with. This data powers your personalized mentorship — not guesswork." },
        { theme: "sky", icon: "BarChart3", title: "MAP Report - Data Scientist-Backed Progress Analysis", body: "Every 15-20 days, a team of Data Scientists generates your Mentorship Analysis & Progress Report — a personalized deep dive into your patterns, not just scores." },
        { theme: "green", icon: "FileCheck", title: "Unlimited Answer Writing - 24-72 hr Evaluation", body: "Submit as many answers as you write — every single one gets reviewed within 24-72 hours with detailed feedback. Build the skill over time, not in a last-minute rush." },
        { theme: "rose", icon: "Heart", title: "Boost Up, PD & Mental Health Sessions", body: "Structured sessions every 15-20 days — not just \"support\", but dedicated Personality Development and Mental Health check-ins with trained psychologists." },
        { theme: "gold", icon: "FileText", title: "Daily CA PDF + Weekly Live CA Sessions", body: "Every evening a curated Current Affairs PDF lands in your inbox. Every week a live CA sessions ties it all to the syllabus, Prelims questions, and Mains answers." },
        { theme: "navy", icon: "BookOpen", title: "Hard Copy Books - Home Delivered", body: "20+ English books & 16+ Hindi books including M. Laxmikanth, Nitin Singhania, and in-house MentorsDaily material — shipped directly to your address at no extra cost." },
        { theme: "sky", icon: "FlaskConical", title: "10,000+ Questions - Module Tests with Pass Standards", body: "A bank of 10,000+ Prelims questions targeting 100 full CSE 2027 papers. Every module has a 50% minimum pass mark — with anti-cheat screen-switch detection built in." },
        { theme: "green", icon: "RefreshCw", title: "Extra Year Support - At No Additional Fee", body: "If you need another year, you get it — no re-enrollment, no extra charges. Your syllabus updates dynamically so you're always preparing for the current exam, not last year's." },
      ],
    },
    timelineSection: {
      tag: "YOUR 24-MONTH JOURNEY · APR 2026 · APR 2028",
      title: "Every Month Has a Purpose. Every Stage Has a Safety Net.",
      sub: "From first reading to final result — 8 distinct phases, each designed so you enter the next one fully prepared. Scroll to see the full roadmap.",
      phases: [
        {
          icon: "Sprout",
          color: "#5B8DB8",
          dates: "Phase 1",
          label: "Foundation & Mains-Ready",
          detail:
            "Full syllabus · NCERTs & reference books · Note-making · Answer writing · Static + CA links · 50+ tests (50Q) + 20 tests (100Q)",
          duration: "9 MONTHS",
          durationTone: "default",
        },
        {
          icon: "Zap",
          color: "#3B7AB8",
          dates: "Phase 2",
          label: "Prelims Focus Batch",
          detail:
            "Prelims-pivoted revision · Group sessions · Quick revision material · 100-Test series (7,500+ Qs) begins",
          duration: "2 MONTHS",
          durationTone: "blue",
        },
        {
          icon: "Timer",
          color: "#8B5CF6",
          dates: "Phase 3",
          label: "Prelims Simulators",
          detail:
            "10 Sundays at UPSC timing · GS 9:30–11:30 · CSAT 2:30–4:30 · Full exam environment training",
          duration: "10 SUNDAYS",
          durationTone: "purple",
        },
        {
          icon: "Flag",
          color: "var(--imp-orange)",
          dates: "Phase 4",
          label: "UPSC Prelims Exam",
          detail:
            "GS Paper I + CSAT · Fee refund triggered on clearing · Hostel, meals & stationery activated",
          duration: "EXAM DAY",
          durationTone: "orange",
          highlight: true,
        },
        {
          icon: "House",
          color: "var(--imp-green)",
          dates: "Phase 5",
          label: "Mains Residential Batch",
          detail:
            "Free hostel · Meals · Stationery · 24×7 mentors · Mains test series & simulators · Quick revision material",
          duration: "HOSTEL ACTIVATED",
          durationTone: "green",
        },
        {
          icon: "NotebookPen",
          color: "#0D9488",
          dates: "Phase 6",
          label: "UPSC Mains Exam",
          detail:
            "All 9 papers · Essay · Ethics · GS I–IV · Optional subject — fully supported from the hostel",
          duration: "EXAM DAYS",
          durationTone: "teal",
        },
        {
          icon: "Mic",
          color: "#CA8A04",
          dates: "Phase 7",
          label: "5+ Mock Interviews",
          detail:
            "UPSC board simulation · DAF review · Communication coaching · Personality test preparation",
          duration: "5+ SESSIONS",
          durationTone: "yellow",
        },
        {
          icon: "Trophy",
          color: "#9D8DF1",
          dates: "Phase 8",
          label: "Final Result",
          detail:
            "UPSC Final Result announced · 24 months of structured preparation complete · Your IAS/IPS journey begins",
          duration: "MONTH 24",
          durationTone: "lavender",
        },
      ],
      note: "Fee refund triggers the moment you clear Prelims. Hostel + meals + stationery activate from May 2027. If you don't clear in 2027, your next attempt is fully covered at zero extra cost — your mentor stays with you throughout.",
    },
    includedSection: {
      tag: "FULL CURRICULUM",
      title: "What's Included at Every Stage",
      sub: "IMP 2027 covers you from the first study session to the final interview panel — here's exactly what you get at each stage.",
      tabs: [

        {
          id: "mentorship",
          label: "Mentorship",
          items: [
            {
              icon: "CalendarDays",
              title: "Daily 1:1 Personalized Mentorhip Sessions",
              body: "Every day, sit with your dedicated mentor to review progress, adjust strategy, and get answers to every question — academic and beyond.",
            },
            {
              icon: "ClipboardList",
              title: "DART — Daily Activity & Reflection Tracker",
              body: "Structured daily logs (study, mood, blockers) that feed your mentor real signal — not guesswork about how your week actually went.",
            },
            {
              icon: "BarChart3",
              title: "MAP Reports Every 15–20 Days",
              body: "Data-backed Mentorship Analysis & Progress reports — pattern recognition on effort, errors, and trajectory, not just scores.",
            },
            {
              icon: "Smartphone",
              title: "Portal, Materials & Submissions",
              body: "Submit answers, access PDFs and tests, and message your mentor — one pipeline from study to feedback.",
            },
          ],
        },
        {
          id: "foundation",
          label: "Foundation",
          items: [
            {
              icon: "BookOpen",
              title: "Full Syllabus — NCERTs + Reference Books",
              body: "Complete one full reading of the entire UPSC syllabus: all NCERTs plus standard references like Laxmikanth, Nitin Singhania, and more. Done by December 2026 — 9 months in.",
            },
            {
              icon: "NotebookPen",
              title: "Note-Making + Static — CA Integration",
              body: "Learn to build your own notes and connect static syllabus with current affairs — so the same topic prepares you for both Prelims MCQs and Mains answers.",
            },
            {
              icon: "PenLine",
              title: "Answer Writing from  Month 1",
              body: "Mains-style answer writing begins from Month 1 — not after Prelims. By December 2026, you'll be ready to secure good marks even if Mains were held early.",
            },
            {
              icon: "FlaskConical",
              title: "200+ Module Tests — Proof of Delivery",
              body: "175+ module tests of 50 questions each + 25 FLT (Full Length Tests) of 100 questions each — with a  minimum pass mark and anti-cheat screen-switch detection.",
            },
          ],
        },
        {
          id: "prelimsFocus",
          label: "Prelims Focus",
          items: [
            {
              icon: "RotateCcw",
              title: "Prelims-Pivoted Revision",
              body: "Syllabus and tests shift to Prelims weightage — rapid recall, elimination skills, and CSAT rhythm without losing Mains touch.",
            },
            {
              icon: "Users",
              title: "Group Sessions & Peer Drills",
              body: "Structured group sessions for high-yield topics, doubt bursts, and accountability — so you stay exam-sharp in the final stretch.",
            },
            {
              icon: "BookMarked",
              title: "Quick Revision Material",
              body: "Condensed revision kits and one-glance sheets so you can rotate the full syllabus multiple times before exam day.",
            },
            {
              icon: "ClipboardCheck",
              title: "Prelims Test Series (GS/CSAT)",
              body: "Full GS + CSAT test series begins — timed, analyzed, and reviewed so gaps show up in data, not surprises in the hall.",
            },
          ],
        },
        {
          id: "mainsResidential",
          label: "Mains Residential",
          items: [
            {
              icon: "House",
              title: "Free Hostel in Noida",
              body: "Move into our Noida facility after Prelims — a quiet, exam-first campus so you can live and breathe Mains without logistics eating your hours.",
            },
            {
              icon: "UtensilsCrossed",
              title: "Meals & Stationery Included",
              body: "Food and stationery covered at zero extra cost — show up and focus on papers, not pantry runs.",
            },
            {
              icon: "Headphones",
              title: "24×7 Mentor Access",
              body: "Mentors on campus for doubts, strategy checks, and morale — you're not preparing Mains in isolation.",
            },
            {
              icon: "ScrollText",
              title: "Mains Tests, Simulators & Quick Revision",
              body: "Mains test series, exam-style simulators, and rapid revision loops — engineered for all 7 papers under real pressure.",
            },
          ],
        },
        {
          id: "interview",
          label: "Interview",
          items: [
            {
              icon: "UserRound",
              title: "1:1 Mock Interview Sessions",
              body: "Multiple rounds simulating actual UPSC board dynamics — so the real panel feels familiar, not frightening.",
            },
            {
              icon: "FileText",
              title: "DAF Review & Question Banking",
              body: "Line-by-line DAF analysis — hobbies, job, optional, and bio-data — with probable questions and crisp, honest framing.",
            },
            {
              icon: "Landmark",
              title: "Current Affairs for the Personality Test",
              body: "Geo-politics, governance, and social issues distilled into interview-ready opinions — not textbook paragraphs.",
            },
            {
              icon: "MessageCircle",
              title: "Communication & Confidence Coaching",
              body: "Articulation, body language, and calm under fire — because delivery decides as much as content in those 30 minutes.",
            },
          ],
        },
        
      ],
    },
    testimonialsSection: {
      tag: "STUDENT STORIES",
      title: "Hear It From Our Students",
      sub: "Real aspirants. Real journeys. Real results from the MentorsDaily IMP program.",
      items: [
        // { stage: "Freshers Batch", quote: "IMP 2027's 24-month timeline is exactly what a fresher needs. I'm not rushing through topics — I'm actually understanding them. My mentor builds a plan that fits my semester schedule too. The early start advantage is very real.", name: "Rishita Sharma", loc: "SRCC, DU", initial: "RS", avBg: "var(--imp-navy)" },
        { stage: "IMP 2027 - 100% Scholarship Student", quote: "I'm very grateful to Anurag sir and Govind sir for assisting me at the right time in this preparation. Tracking me regularly in all the tests, giving feedback on where to improve, all these are pushing me to finally qualify UPSC and see my name in ranklist.", name: "Sneha RAIR10", loc: "Bangalore", initial: "PC", avBg: "var(--imp-sky-dk)" },
        { stage: "IMP 2027", quote: "I was skeptical about mentorship programs. IMP 2027 changed my mind. 24 months means I can learn at my natural pace without burning out. My study plan changes every month as I progress. This doesn't feel like coaching — it feels like real support.", name: "Seema Yadav", loc: "Motilal Nehru College, DU", initial: "SY", avBg: "var(--imp-green)" },
        { stage: "IMP 2027", quote: "I’ve been associated with MentorsDaily for my UPSC preparation, and it has been a great experience. Their student portal allows regular self-paced tests along with structured subject-wise module tests, which helps maintain consistency. The detailed test analysis with mentors is very insightful and improves answer-writing and overall strategy. The one-to-one mentorship is especially valuable, as it aligns preparation with a personalized study pattern and helps overcome individual weaknesses. Overall, a highly recommended platform for serious UPSC aspirants seeking structured guidance and continuous improvement.", name: "Dhananjay Devgun", loc: "VikashPuri,New Delhi", initial: "SY", avBg: "var(--imp-green)" },
      ],
    },
    faqSection: {
      tag: "FAQs",
      title: "Every Question You Have — Answered",
      sub: "If you have a question that's not here, our team is one call away.",
      items: [
        { q: "What is the IMP 2027 program by MentorsDaily?", a: " IMP 2027 (Integrated Mentorship Program) is a 24-month personalized UPSC preparation program designed for UPSC CSE 2027 aspirants — especially those who want to start early with structured guidance, including working professionals managing preparation alongside their jobs.You get a dedicated 1:1 mentor, structured study plans, answer evaluation, mock tests, and — uniquely — a 100% fee refund if you clear Prelims, along with free hostel & library access at the Mains stage. " },
        { q: "How exactly does the 100% fee refund work?", a: "It’s straightforward: if you clear the UPSC Prelims after enrolling in IMP 2027, you receive 100% of your enrollment fee back. No complex conditions, no deductions. We process the refund after verification of your Prelims result. This guarantee reflects our confidence in the program and our commitment to your success." },
        { q: "What does the free hostel and library include?", a: "After clearing Prelims, IMP 2027 students can move into the MentorsDaily facility in Noida Sector 2 for the Mains and Interview preparation phase — completely free. This includes accommodation, meals, stationery, access to a curated UPSC library, a quiet study environment, and proximity to your mentors and peers. Hostel availability is subject to seat confirmation at the time of Prelims results." },
        { q: "Can I join IMP 2027 if I'm a working professional?", a: "Absolutely — IMP 2027 is specifically designed with working professionals in mind. Your mentor builds your study plan around your work schedule, not against it. Whether you have 2 hours a day or 4 hours on weekends, the program adapts. Many of our enrolled students are currently in jobs in IT, banking, teaching, and other fields." },
        { q: "How often will I interact with my mentor?", a: "Daily. You have a dedicated 1:1 session with your mentor to review what you studied, address doubts, adjust your plan, and get feedback on your answers. Outside of these sessions, you can also reach your mentor through the student portal for quick queries — they respond within 24 hours." },
        { q: "What stages does IMP 2027 cover?", a: "IMP 2027 covers all three stages of UPSC CSE: Prelims (GS Paper I + CSAT), Mains (7 papers including Essay and Ethics, excluding the optional paper), and the Personality Test (Interview).The 24 months are structured so you build the foundation first, then systematically prepare for each stage with enough time to practice, review, and refine." },
        { q: "What is the difference between IMP and a regular coaching class?", a: "In a coaching class, you follow a batch schedule designed for the average student. In IMP 2027, everything is built around you — your pace, your gaps, your schedule, and your goals. There's no sitting through lectures on topics you already know or rushing past things you need more time on. Your mentor is accountable to your progress, not to a batch's syllabus completion." },
        { q: "Is the program online or offline?", a: "IMP 2027 is primarily online — mentor sessions, doubt clearing, answer evaluations, and the student portal are all accessible from anywhere in India. The hostel, meals, stationery, and library facility in Noida is a physical option that becomes available at the Mains stage for students who choose to use it." },
        { q: "What happens if I miss my daily mentor session?", a: "Life happens. You can reschedule your session for next day in advance without any penalty. Your mentor is flexible and understands that work, family, and other commitments can come up. Missed sessions don't lapse — they're rescheduled within the same week wherever possible." },
        { q: "What happens if I don't qualify in my 2027 attempt?", a: "If you complete the full IMP 2027 program and don't qualify in your 2027 attempt, we continue your mentorship for the 2028 attempt at zero additional fee — no re-enrollment and no extra program charges. Your mentor stays with you; syllabus and materials update so you're always aligned to the current exam cycle." },
        { q: "What is the DART tracker and how does it work?", a: "DART (Daily Activity & Reflection Tracker) is a short structured form you fill every day: what you studied, how confident you felt, and where you struggled. That data feeds your mentor and powers MAP reports — so guidance is based on your real patterns, not assumptions." },
        { q: "What books and study materials will I receive?", a: "You get 20+ English and 16+ Hindi hard-copy books — including standards like M. Laxmikanth and Nitin Singhania plus in-house MentorsDaily material — home-delivered at no extra cost. Digital Current Affairs PDFs and weekly live CA lectures are part of the online workflow." },
        { q: "How do I enroll in IMP 2027?", a: 'You can enroll directly by clicking "Enroll Now" on this page, calling us at +91 87662 33193, or messaging on WhatsApp. Once enrolled, you\'ll receive onboarding details and be matched with a mentor within 48 hours. EMI options are available — contact us for details.' },
      ],
    },
    bottomCta: {
      title: "Your UPSC 2027 Journey Starts Here",
      sub: "24 months from now, you could be clearing Prelims and claiming your full fee back. Or you could still be figuring out where to start. The decision is now.",
      primary: "Enroll in IMP 2027",
      secondary: "Talk to Our Team",
      guarantee: "100% Fee Refund Guarantee · Free Hostel at Mains · 24/7 Support",
    },
    footer: {
      brand: "Empowering UPSC aspirants through personalized mentorship, structured guidance, and comprehensive support — from Day 1 to the Interview panel.",
      quickLinks: [
        { label: "About Us", href: "/about-us" },
        { label: "All Courses", href: "/mentorship-courses" },
        { label: "IMP 2027", href: "/integrated-mentorship-2027" },
        { label: "UPPCS Mentorship", href: "/uppcs-mentorship" },
        { label: "Success Stories", href: "/success-stories" },
        { label: "UPSC Blog", href: "/preparation-blogs" },
        { label: "Contact Us", href: "/contact-us" },
      ],
      resources: [
        { label: "UPSC Mentorship", href: "/integrated-mentorship" },
        { label: "Current Affairs", href: "/current-affairs" },
        { label: "UPSC Guides", href: "/preparation-blogs" },
        { label: "Careers", href: "/careers" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
        { label: "Refund Policy", href: "/refund-cancellation" },
      ],
      social: [
        { icon: "Linkedin", href: "https://www.linkedin.com/company/mentorsdaily" },
        { icon: "Twitter", href: "https://twitter.com/@MentorsDaily_" },
        { icon: "Instagram", href: "https://www.instagram.com/mentorsdaily" },
        { icon: "Facebook", href: "https://www.facebook.com/mentorsdaily" },
        { icon: "Send", href: "https://t.me/MentorsDailyOfficial" },
        { icon: "Youtube", href: "https://www.youtube.com/@MentorsDailyOfficial" },
      ],
      copy: "© 2026 MentorsDaily · Sempiternity Technologies · All rights reserved.",
    },
    contact: {
      phoneDisplay: "+91 87662 33193",
      phoneTel: "+918766233193",
      wa: "918766233193",
      email: "contact@mentorsdaily.com",
      address: "B-69, Block B, Noida Sector 2, Noida, UP 201301",
      mapsQuery: "B-69,+Block+B,+Noida+Sector+2",
    },
    stickyMobileCta: "Enroll Now",
  };
}
