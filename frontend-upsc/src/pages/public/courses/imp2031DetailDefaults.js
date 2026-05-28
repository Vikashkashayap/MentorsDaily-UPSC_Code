/**
 * Default long-form landing copy for Integrated Mentorship 2031.
 * Admin overrides merge shallow-deep via course.detailPage (Mongo Mixed).
 */

export const IMP_2031_SLUG = "integrated-mentorship-2031";

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

export function getDefaultImp2031DetailPage() {
  return {
    seo: {
      title: "IMP 2031 – Integrated UPSC Mentorship Program | MentorsDaily",
      description:
        "Join MentorsDaily IMP 2031 — a long-term, fully integrated UPSC mentorship journey with 1:1 mentoring, structured targets, practice, tests, and complete support across Prelims, Mains & Interview. Daily mentorship plan fee: ₹1,90,000.",
    },
    announcement: {
      strong: "Admissions Open:",
      text: "IMP 2031 Daily Mentorship intake is now open — limited seats.",
      ctaText: "Grab Your Seat →",
      ctaHref: "#enroll",
    },
    hero: {
      badge: "Start Early. Prepare Smart. Stay Consistent.",
      titleLines: [
        { text: "Integrated Mentorship Program" },
        { text: "(IMP) 2031", accent: true },
      ],
      subHtml:
        "The MentorsDaily Integrated Program brings everything together under one roof—foundation building, personalized mentorship, curated resources, structured practice, psychological support, and interview guidance—creating a complete ecosystem for UPSC success.",
      perks: [
        "1:1 Dedicated Mentor",
        "AI Powered Student Dashboard",
        "Free Hostel & Library",
        "Prelims + Mains Test Series",
        "24/7 Mentor Support",
      ],
      socialProofHtml:
        '<strong class="text-white/85">Aspirants across India</strong> · Long-term preparation · Mentor-led accountability',
      trustLine: "Mentor-led · Structured · Consistent",
      cardTitle: "Integrated Mentorship Program (IMP) 2031",
      cardSubtitle: "From Basics to Interview — Complete UPSC Preparation with 1:1 Mentorship",
      cardFeatures: [
        "All NCERTs & Standard Books Provided",
        "Daily 1:1 Personalized Mentorship Sessions & Study Targets",
        "AI Powered Student Dashboard",
        "Psychologist Support Sessions",
        "Prelims + Mains Test Series",
      ],
      enrollCta: "Enroll Now → Secure Your Seat",
      cardTrust: "Secure payment · No hidden charges · EMI available",
    },
    trustBar: [
      { icon: "Trophy", num: "1,200+", lbl: "UPSC Aspirants" },
      { icon: "Star", num: "98%", lbl: "Student Satisfaction" },
      { icon: "Headphones", num: "24/7", lbl: "Mentor Support" },
      { icon: "CalendarCheck", num: "Long", lbl: "Term Guidance" },
      { icon: "MapPin", num: "Noida", lbl: "Office + Hostel" },
    ],
    pricingSection: {
      tag: "Daily Mentorship Plan",
      title: "One Plan.\nComplete Support.",
      sub: "Daily 1:1 mentorship, structured targets, evaluations, tests and full program support. (Weekly plan is not available for IMP 2031.)",
      daily: {
        name: "Daily Mentorship",
        popularRibbon: "Daily Only",
        price: 190000,
        oldPrice: 380000,
        saveLabel: "Save ₹1,90,000 (50% OFF)",
        durationLine: "IMP 2031 · Daily 1:1 mentorship",
        features: [
          { ok: true, cls: "green", text: "All NCERTs & Standard Books Provided" },
          { ok: true, cls: "green", text: "Daily 1:1 Personalized Mentor Sessions" },
          { ok: true, cls: "green", text: "Structured Daily Targets & Reviews" },
          { ok: true, cls: "green", text: "Answer Writing & PYQ Practice + Evaluation" },
          { ok: true, cls: "green", text: "Prelims + Mains Test Series" },
          { ok: true, cls: "green", text: "24×7 Mentor Support" },
          { ok: true, cls: "orange", text: "Interview & Personality Development Guidance" },
          { ok: true, cls: "gold", text: "Performance Reports & Analysis" },
        ],
        cta: "Enroll in Daily Plan",
      },
      helpHtml:
        'Questions? <a class="imp-a" href="https://wa.me/918766233193" target="_blank" rel="noreferrer">Chat with us on WhatsApp</a> and we\'ll help you decide.',
    },
    uspSection: {
      tag: "Why IMP 2031",
      title: "Three Guarantees No Other\nUPSC Program Offers",
      sub: "We didn't just build another coaching program. We made three commitments that remove risk and ensure you stay supported until you succeed.",
      cards: [
        {
          variant: "orange",
          icon: "Banknote",
          title: "100% Fee Refund After Clearing Prelims",
          body:
            "Clear your Prelims and we return every rupee of your fee. No paperwork maze, no conditions. This is our bet on you — and our confidence in the program we've built.",
          steps: ["1 Enroll in IMP", "2 Clear Prelims", "3 Full Refund"],
          linkHref: "#enroll",
        },
        {
          variant: "green",
          icon: "House",
          title: "Free Hostel, Meals & Stationery for Mains + Interview",
          body:
            "Once you clear Prelims, move into our Noida facility — accommodation, food, and stationery all at zero extra cost. Study in a focused environment with fellow aspirants, unlimited library access, and all the peace you need to crack Mains and the Interview.",
          steps: ["🏠 Noida Hostel", "🍴 Free Meals", "📚 Library + Stationery"],
          linkHref: "https://maps.google.com/?q=B-69,+Block+B,+Noida+Sector+2",
          external: true,
        },
        {
          variant: "blue",
          icon: "RefreshCw",
          title: "Next Attempt Is On Us — If You Don't Qualify in Your First Try",
          bodyHtml:
            "If you complete the full IMP program and don't qualify in your first attempt, we continue your mentorship for the next attempt at <strong>zero additional fee</strong>. No re-enrollment, no extra charges — we stay with you until you clear it.",
          stepsMode: "stack",
          steps: ["🎓 Complete IMP —", "✖ Didn't Clear —", "🎁 Next Attempt Free"],
          linkHref: "#enroll",
        },
      ],
      competitorHtml:
        "<strong>While most programs focus only on teaching, MentorsDaily goes beyond with mentorship, continuous support, and risk-free preparation—offering all three guarantees together to ensure you succeed.</strong>",
    },
    featuresSection: {
      tag: "WHAT YOU GET",
      title: "Everything You Need — End to End",
      sub: "Mentorship, targets, tests, evaluation and support designed to keep you consistent and improving.",
      items: [
        { theme: "navy", icon: "Users", title: "Small Batches", body: "Personal attention with limited mentor load." },
        { theme: "orange", icon: "ClipboardList", title: "Daily Targets", body: "Clear daily targets and accountability reviews." },
        { theme: "sky", icon: "BarChart3", title: "Progress Analytics", body: "Insights on strengths, gaps and performance trends." },
        { theme: "green", icon: "FileCheck", title: "Answer Evaluation", body: "Regular answer writing practice with feedback." },
        { theme: "gold", icon: "FlaskConical", title: "Tests & Practice", body: "Prelims + Mains tests with analysis." },
        { theme: "rose", icon: "Heart", title: "Support System", body: "Guidance to stay consistent and handle stress." },
      ],
    },
    timelineSection: {
      tag: "YOUR JOURNEY",
      title: "A Structured Roadmap — With Daily Mentorship",
      sub: "From foundation to the final result — your mentor helps you plan, execute, and improve continuously.",
      phases: [
        { icon: "Sprout", color: "#5B8DB8", dates: "Phase 1", label: "Foundation", detail: "NCERTs + references · note-making · answer writing", duration: "FOUNDATION", durationTone: "default" },
        { icon: "Zap", color: "#3B7AB8", dates: "Phase 2", label: "Prelims Focus", detail: "Revision + MCQ drills · test series", duration: "PRELIMS", durationTone: "blue" },
        { icon: "Timer", color: "#8B5CF6", dates: "Phase 3", label: "Simulators", detail: "Timed tests · analysis · elimination practice", duration: "TESTS", durationTone: "purple" },
        { icon: "Flag", color: "var(--imp-orange)", dates: "Phase 4", label: "Prelims Exam", detail: "Exam day readiness", duration: "EXAM", durationTone: "orange", highlight: true },
        { icon: "House", color: "var(--imp-green)", dates: "Phase 5", label: "Mains Intensive", detail: "Answer writing + tests + mentor reviews", duration: "MAINS", durationTone: "green" },
        { icon: "NotebookPen", color: "#0D9488", dates: "Phase 6", label: "Mains Exam", detail: "Paper-wise strategy + execution", duration: "EXAM", durationTone: "teal" },
        { icon: "Mic", color: "#CA8A04", dates: "Phase 7", label: "Interview", detail: "Mock interviews + DAF + communication", duration: "INTERVIEW", durationTone: "yellow" },
        { icon: "Trophy", color: "#9D8DF1", dates: "Phase 8", label: "Final Result", detail: "End-to-end support till result", duration: "RESULT", durationTone: "lavender" },
      ],
      note: "IMP 2031 is a Daily-only mentorship plan. Your mentor aligns targets, reviews and strategy consistently through all stages.",
    },
    includedSection: {
      tag: "FULL CURRICULUM",
      title: "What's Included",
      sub: "Everything from foundation to interview preparation.",
      tabs: [
        {
          id: "mentorship",
          label: "Mentorship",
          items: [
            { icon: "CalendarDays", title: "Daily 1:1 Mentor Sessions", body: "Daily review, doubt solving, strategy and accountability." },
            { icon: "ClipboardList", title: "Daily Target System", body: "Targets built around your pace and progress." },
            { icon: "BarChart3", title: "Progress Analytics", body: "Track coverage and performance trends." },
            { icon: "Smartphone", title: "Portal Access", body: "Materials, tests and submissions in one place." },
          ],
        },
        {
          id: "foundation",
          label: "Foundation",
          items: [
            { icon: "BookOpen", title: "NCERTs + Standard Books", body: "Build fundamentals and complete syllabus coverage." },
            { icon: "NotebookPen", title: "Notes + Integration", body: "Connect static topics with current affairs." },
            { icon: "PenLine", title: "Answer Writing", body: "Start writing early and improve consistently." },
            { icon: "FlaskConical", title: "Tests + Practice", body: "Topic tests and full-length tests with analysis." },
          ],
        },
        {
          id: "prelimsFocus",
          label: "Prelims Focus",
          items: [
            { icon: "RotateCcw", title: "Revision Cycles", body: "Multiple revision loops with mentor tracking." },
            { icon: "Users", title: "Group Support", body: "Peer accountability and structured drills." },
            { icon: "BookMarked", title: "Quick Revision Material", body: "Condensed sheets and rapid recall kits." },
            { icon: "ClipboardCheck", title: "Test Series", body: "Timed tests + detailed analytics." },
          ],
        },
        {
          id: "mainsResidential",
          label: "Mains",
          items: [
            { icon: "House", title: "Hostel / Facility Support", body: "Residential option during intensive phases (as available)." },
            { icon: "UtensilsCrossed", title: "Focus Support", body: "An environment built to maximize focus." },
            { icon: "Headphones", title: "Mentor Access", body: "Regular reviews and strategy updates." },
            { icon: "ScrollText", title: "Mains Test Series", body: "Paper-wise practice and improvement loops." },
          ],
        },
        {
          id: "interview",
          label: "Interview",
          items: [
            { icon: "UserRound", title: "Mock Interviews", body: "Multiple rounds with feedback." },
            { icon: "FileText", title: "DAF Review", body: "Structured DAF analysis and question banking." },
            { icon: "Landmark", title: "Current Affairs", body: "Interview-ready opinions and articulation." },
            { icon: "MessageCircle", title: "Communication Coaching", body: "Confidence and clarity in delivery." },
          ],
        },
      ],
    },
    testimonialsSection: {
      tag: "STUDENT STORIES",
      title: "Hear It From Our Students",
      sub: "Real aspirants. Real journeys. Real mentorship outcomes.",
      items: [
        { stage: "IMP", quote: "Daily mentorship kept me consistent and accountable. The plan was always clear.", name: "Student A", loc: "India", initial: "A", avBg: "var(--imp-navy)" },
        { stage: "IMP", quote: "The dashboard + mentor reviews helped me fix mistakes early.", name: "Student B", loc: "India", initial: "B", avBg: "var(--imp-green)" },
        { stage: "IMP", quote: "Regular evaluation and targets improved my answer writing drastically.", name: "Student C", loc: "India", initial: "C", avBg: "var(--imp-sky-dk)" },
      ],
    },
    faqSection: {
      tag: "FAQs",
      title: "Every Question You Have — Answered",
      sub: "If you have a question that's not here, our team is one call away.",
      items: [
        { q: "Is there a weekly plan for IMP 2031?", a: "No. IMP 2031 is Daily mentorship only." },
        { q: "What is the fee for IMP 2031?", a: "IMP 2031 Daily plan fee is ₹1,90,000." },
        { q: "How do I enroll?", a: 'Click "Enroll Now" on this page or talk to our team on WhatsApp / call.' },
      ],
    },
    bottomCta: {
      title: "Start Your IMP 2031 Journey",
      sub: "Daily mentorship + structured targets + complete support — built for serious aspirants.",
      primary: "Enroll in IMP 2031",
      secondary: "Talk to Our Team",
      guarantee: "Daily Mentorship · Structured Targets · Full Support",
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

