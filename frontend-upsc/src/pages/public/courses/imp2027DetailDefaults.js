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
      title: "IMP 2027 – 30-Month Integrated UPSC Mentorship Program | MentorsDaily",
      description:
        "Join MentorsDaily IMP 2027 — India's only 30-month UPSC mentorship with 100% fee refund after clearing Prelims, 1:1 personalized mentoring & free hostel for Mains. Plans from ₹30,000 (Weekly) or ₹48,000 (Daily).",
    },
    announcement: {
      strong: "🎉 Early Bird:",
      text: "Enroll now and save ₹30,000 — only limited seats available in this batch.",
      ctaText: "Grab Your Seat →",
      ctaHref: "#enroll",
    },
    hero: {
      badge: "Best for Freshers & Working Professionals",
      titleLines: [
        { text: "Start 30 Months Early." },
        { text: "Get Your ", accent: false },
        { text: "Full Fee Back", accent: true },
        { text: "After Clearing Prelims.", accent: false },
      ],
      subHtml:
        "IMP 2027 is India's only UPSC mentorship that combines a personalized 1:1 mentor, a 30-month structured plan, and a <strong>100% fee refund guarantee</strong> — so you prepare with confidence, not pressure.",
      perks: [
        "1:1 Dedicated Mentor",
        "Free Hostel & Library",
        "100% Fee Refund",
        "Flexible for Working Professionals",
      ],
      trustLine: "4.9/5 from 1,200+ UPSC selections · Trusted by aspirants across India",
      cardTitle: "Integrated Mentorship Program (IMP) 2027",
      cardSubtitle: "30 Months · UPSC CSE Prelims + Mains + Interview",
      cardFeatures: [
        "30 months of structured UPSC prep",
        "Weekly 1:1 mentor sessions",
        "Expert answer writing evaluation",
        "Mock tests + performance analysis",
        "<strong>Free hostel & library (Mains stage)</strong>",
        "<strong style=\"color:var(--imp-green)\">100% fee refund on clearing Prelims</strong>",
      ],
      enrollCta: "Enroll Now → Secure Your Seat",
      cardTrust: "Secure payment · No hidden charges · EMI available",
    },
    trustBar: [
      { icon: "Trophy", num: "1,200+", lbl: "UPSC Selections" },
      { icon: "Star", num: "98%", lbl: "Student Satisfaction" },
      { icon: "Headphones", num: "24/7", lbl: "Mentor Support" },
      { icon: "CalendarCheck", num: "30", lbl: "Months of Guidance" },
      { icon: "MapPin", num: "Noida", lbl: "Office + Hostel" },
    ],
    pricingSection: {
      tag: "Choose Your Plan",
      title: "Flexible Mentorship Plans\nBuilt for Serious Aspirants",
      sub: "Both plans cover the full 30-month IMP 2027 journey. Pick the intensity that matches your preparation style.",
      toggleHint: "Scroll down for a feature-by-feature comparison table ↓",
      weekly: {
        name: "Weekly Mentorship",
        price: 30000,
        oldPrice: 60000,
        saveLabel: "Save ₹30,000 (50% off) — Limited Seats",
        durationLine: "30-Month Full Program · Batch Starts June 2025",
        features: [
          { ok: true, cls: "green", text: "Weekly 1:1 Mentor Check-in (60 min)" },
          { ok: true, cls: "green", text: "Weekly Study Plan & Progress Review" },
          { ok: true, cls: "green", text: "Doubt Clearing within 48 Hours" },
          { ok: true, cls: "green", text: "Monthly Mock Interview with Feedback" },
          { ok: true, cls: "green", text: "Full Access to Study Material & Resources" },
          { ok: true, cls: "green", text: "Telegram Group & Community Access" },
          { ok: true, cls: "orange", text: "100% Fee Refund on Clearing Prelims", highlight: true },
          { ok: true, cls: "orange", text: "Free Hostel During Mains", highlight: true },
          { ok: false, text: "Daily Check-in & Priority Response" },
          { ok: false, text: "Dedicated WhatsApp Hotline" },
        ],
        cta: "Enroll in Weekly Plan",
      },
      daily: {
        name: "Daily Mentorship",
        popularRibbon: "Most Popular",
        price: 48000,
        oldPrice: 120000,
        saveLabel: "Save ₹72,000 (60% off) — Early Bird Price",
        durationLine: "30-Month Full Program · Batch Starts June 2025",
        features: [
          { ok: true, cls: "green", text: "Daily 1:1 Mentor Check-in (30 min)" },
          { ok: true, cls: "green", text: "Daily Personalised Study Plan Updates" },
          { ok: true, cls: "green", text: "Doubt Clearing within 6 Hours" },
          { ok: true, cls: "green", text: "Bi-Weekly Mock Interviews with Feedback" },
          { ok: true, cls: "green", text: "Full Access to Study Material & Resources" },
          { ok: true, cls: "green", text: "Telegram Group & Community Access" },
          { ok: true, cls: "orange", text: "100% Fee Refund on Clearing Prelims", highlight: true },
          { ok: true, cls: "orange", text: "Free Hostel During Mains", highlight: true },
          { ok: true, cls: "gold", text: "Daily Check-in & Priority Response" },
          { ok: true, cls: "gold", text: "Dedicated WhatsApp Hotline (8 AM–10 PM)" },
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
        { type: "text", f: "1:1 Mentor Sessions", w: "Weekly (60 min)", d: "Daily (30 min)" },
        { type: "text", f: "Personalised Study Plan", w: "Weekly Update", d: "Daily Update" },
        { type: "text", f: "Doubt Clearing TAT", w: "Within 48 hrs", d: "Within 6 hrs" },
        { type: "text", f: "Mock Interviews", w: "Monthly", d: "Bi-Weekly" },
        { type: "bool", f: "Dedicated WhatsApp Hotline", w: false, d: true },
        { type: "bool", f: "Priority Response Support", w: false, d: true },
        { type: "cat", label: "Study Resources" },
        { type: "bool", f: "Curated Study Material", w: true, d: true },
        { type: "bool", f: "Current Affairs Digest (Monthly)", w: true, d: true },
        { type: "bool", f: "Answer Writing Practice + Review", w: true, d: true },
        { type: "bool", f: "Essay & Ethics Practise Sets", w: true, d: true },
        { type: "cat", label: "Community & Events" },
        { type: "bool", f: "Telegram Peer Community", w: true, d: true },
        { type: "bool", f: "Monthly Live Webinars with Experts", w: true, d: true },
        { type: "bool", f: "Bi-Annual Progress Review Camp", w: false, d: true },
        { type: "cat", label: "Exclusive Guarantees" },
        { type: "bool", f: "100% Fee Refund (Prelims Cleared)", w: true, d: true },
        { type: "bool", f: "Free Hostel Accommodation (Mains)", w: true, d: true },
        { type: "bool", f: "Seat Reservation on Enrolment", w: true, d: true },
      ],
      helpHtml:
        'Questions about which plan is right for you? <a class="imp-a" href="https://wa.me/918766233193" target="_blank" rel="noreferrer">Chat with us on WhatsApp</a> and we\'ll help you decide.',
    },
    uspSection: {
      tag: "Why IMP 2027 is Different",
      title: "Two Guarantees No Other\nUPSC Program Offers",
      sub: "We didn't just build another coaching program. We made two promises that our competitors won't.",
      cards: [
        {
          variant: "green",
          icon: "Banknote",
          title: "100% Fee Refund After Clearing Prelims",
          body: "Clear your Prelims and we return every rupee of your enrollment fee (Weekly or Daily plan). No paperwork maze, no conditions. This is our bet on you — and our confidence in the program we've built.",
          steps: ["1 Enroll in IMP", "2 Clear Prelims", "3 Full Refund"],
          linkText: "Claim this guarantee →",
          linkHref: "#enroll",
        },
        {
          variant: "orange",
          icon: "House",
          title: "Free Hostel & Library for Mains + Interview",
          body: "Once you clear Prelims, move into our Noida facility — at zero extra cost. Study in a focused environment with fellow UPSC aspirants, unlimited library access, and all the peace you need to crack Mains and the Interview.",
          steps: ["Noida Hostel", "Full Library", "Peer Network"],
          linkText: "See the facility →",
          linkHref: "https://maps.google.com/?q=B-69,+Block+B,+Noida+Sector+2",
          external: true,
        },
      ],
      competitorHtml:
        "<strong>No competitor — not VisionIAS, not Unacademy, not Vajiram — offers both of these.</strong> These are MentorsDaily's promises to you.",
    },
    featuresSection: {
      tag: "What You Get",
      title: "Everything You Need to Clear UPSC 2027",
      sub: "IMP 2027 is built so every week of your preparation has a clear purpose, a defined outcome, and a mentor watching your back.",
      items: [
        { theme: "navy", icon: "GraduationCap", title: "Personalized 1:1 Mentorship", body: "Your dedicated mentor learns your strengths, weaknesses, and schedule from Day 1 — and builds everything around you, not a generic batch plan." },
        { theme: "orange", icon: "ClipboardList", title: "Strategic Weekly Study Plans", body: "Customized weekly plans aligned with the UPSC CSE 2027 calendar — updated every week based on how you're progressing, not how a batch is doing." },
        { theme: "sky", icon: "PenLine", title: "Expert Answer Evaluation", body: "Every answer you write gets reviewed by UPSC-experienced evaluators with detailed feedback and a targeted improvement roadmap — not a simple score." },
        { theme: "green", icon: "LineChart", title: "Mock Tests + Performance Analysis", body: "Regular full-length mock tests across all stages with detailed performance analytics — understand where you're losing marks and how to recover them fast." },
        { theme: "orange", icon: "HeartPulse", title: "Emotional & Mental Support", body: "UPSC preparation is a marathon that tests your mind as much as your knowledge. Your mentor keeps you grounded, consistent, and motivated — every single week." },
        { theme: "gold", icon: "Newspaper", title: "Current Affairs Integration", body: "Daily current affairs aren't just shared — your mentor shows you how to connect them to GS topics, answer writing, and the Interview. No more random reading." },
      ],
    },
    timelineSection: {
      tag: "Your 30-Month Journey",
      title: "A Clear Path from Day 1 to Interview Day",
      sub: "Starting early doesn't mean burning out early. It means building a foundation so solid that Prelims, Mains, and the Interview feel like natural steps — not sudden cliffs.",
      phases: [
        { icon: "Sprout", color: "var(--imp-navy-lt)", label: "Foundation", sub: "Months 1–8" },
        { icon: "BookOpen", color: "var(--imp-sky-dk)", label: "Prelims Prep", sub: "Months 9–20" },
        { icon: "Flag", color: "var(--imp-orange)", label: "Prelims Exam", sub: "Month ~21" },
        { icon: "House", color: "var(--imp-green)", label: "Mains + Hostel", sub: "Months 22–27" },
        { icon: "Mic", color: "var(--imp-gold)", label: "Interview Prep", sub: "Months 28–30" },
      ],
      note: "Fee refund triggers at the Prelims stage. Free hostel & library activates from the Mains stage. Your mentor stays with you through all 30 months.",
    },
    includedSection: {
      tag: "Full Curriculum",
      title: "What's Included at Every Stage",
      sub: "IMP 2027 covers you from the first study session to the final interview panel — here's exactly what you get at each stage.",
      tabs: [
        {
          id: "prelims",
          label: "Prelims",
          items: [
            { icon: "ScrollText", title: "Complete Syllabus Coverage", body: "All 9 GS papers + CSAT covered systematically with a month-by-month roadmap tailored to your starting level." },
            { icon: "FlaskConical", title: "1,000+ Practice Questions", body: "High-quality MCQ bank mapped to UPSC's question pattern — with detailed explanations and concept links." },
            { icon: "BarChart3", title: "Weekly Mock Tests + Analysis", body: "Full-length Prelims mocks every week with topic-wise performance breakdown and improvement priorities." },
            { icon: "Newspaper", title: "Current Affairs for Prelims", body: "Daily current affairs linked to static topics — so every news story becomes a potential Prelims question you've already prepared for." },
          ],
        },
        {
          id: "mains",
          label: "Mains",
          items: [
            { icon: "Pen", title: "Answer Writing from Month 1", body: "Start Mains answer writing practice early — not after Prelims. Build the skill over time with weekly evaluated assignments." },
            { icon: "House", title: "Free Hostel & Library Access", body: "After clearing Prelims, move into the MentorsDaily Noida facility for intensive Mains preparation — at zero cost." },
            { icon: "Layers", title: "GS + Optional Subject Strategy", body: "Dedicated sessions on Essay writing, Ethics, and integrated GS strategy with your mentor to maximize Mains marks." },
            { icon: "HelpCircle", title: "Doubt Clearing Sessions", body: "Scheduled weekly doubt sessions so no question stays unresolved for more than 48 hours." },
          ],
        },
        {
          id: "interview",
          label: "Interview",
          items: [
            { icon: "UserRound", title: "1:1 Mock Interview Sessions", body: "Multiple rounds of mock interviews with experienced mentors who simulate actual UPSC board dynamics and questioning styles." },
            { icon: "FileText", title: "Detailed Application Form (DAF) Review", body: "In-depth DAF analysis with your mentor — every hobby, achievement, and background angle prepared for potential board questions." },
            { icon: "Landmark", title: "Current Affairs for Interview", body: "Focused current affairs for the personality test — geo-political, governance, and social issues framed as interview-ready perspectives." },
            { icon: "MessageCircle", title: "Communication & Confidence Coaching", body: "Structured sessions on articulation, body language, and confidence — because how you say it matters as much as what you say." },
          ],
        },
        {
          id: "mentorship",
          label: "Mentorship",
          items: [
            { icon: "CalendarDays", title: "Weekly 1:1 Mentor Meetings", body: "Every week, sit with your dedicated mentor to review progress, adjust strategy, and get answers to every question — academic and beyond." },
            { icon: "SlidersHorizontal", title: "Dynamic Plan Adjustments", body: "Your study plan evolves every month based on your mock scores, time availability, and changing needs — it's never a fixed one-size plan." },
            { icon: "Heart", title: "Emotional & Motivational Support", body: "UPSC is a long journey with low points. Your mentor checks in on your mental state, not just your syllabus — because both matter." },
            { icon: "Smartphone", title: "Student Portal Access", body: "Track your performance, access study materials, submit assignments, and message your mentor — all through the MentorsDaily student portal." },
          ],
        },
      ],
    },
    testimonialsSection: {
      tag: "Student Stories",
      title: "Hear It From Our Students",
      sub: "Real aspirants. Real journeys. Real results from the MentorsDaily IMP program.",
      items: [
        { stage: "Freshers Batch", quote: "IMP 2027's 30-month timeline is exactly what a fresher needs. I'm not rushing through topics — I'm actually understanding them. My mentor builds a plan that fits my semester schedule too. The early start advantage is very real.", name: "Riya Kapoor", loc: "Ahmedabad", initial: "R", avBg: "var(--imp-navy)" },
        { stage: "Engineering Student", quote: "As a final-year engineering student, I was worried about balancing both. IMP 2027 solved that. My mentor fits UPSC prep around my college schedule — not against it. The accountability sessions every week keep me from slipping.", name: "Arun Prakash", loc: "Coimbatore", initial: "A", avBg: "var(--imp-sky-dk)" },
        { stage: "Working Professional", quote: "I was skeptical about mentorship programs. IMP 2027 changed my mind. 30 months means I can learn at my natural pace without burning out. My study plan changes every month as I progress. This doesn't feel like coaching — it feels like real support.", name: "Megha Jain", loc: "Indore", initial: "M", avBg: "var(--imp-green)" },
      ],
    },
    faqSection: {
      tag: "FAQs",
      title: "Every Question You Have — Answered",
      sub: "If you have a question that's not here, our team is one call away.",
      items: [
        { q: "What is the IMP 2027 program by MentorsDaily?", a: "IMP 2027 (Integrated Mentorship Program) is a 30-month personalized UPSC preparation program designed for UPSC CSE 2027 aspirants — particularly freshers and working professionals who want to start early with structured guidance. You get a dedicated 1:1 mentor, weekly study plans, answer evaluation, mock tests, and — uniquely — a 100% fee refund if you clear Prelims and free hostel & library access at the Mains stage." },
        { q: "How exactly does the 100% fee refund work?", a: "It's straightforward: if you clear the UPSC Prelims after enrolling in IMP 2027, you receive 100% of your paid plan fee back. No complex conditions, no deductions. We process the refund after verification of your Prelims result. This guarantee reflects our confidence in the program and our commitment to your success." },
        { q: "What does the free hostel and library include?", a: "After clearing Prelims, IMP 2027 students can move into the MentorsDaily facility in Noida Sector 2 for the Mains and Interview preparation phase — completely free. This includes accommodation, access to a curated UPSC library stocked with all standard reference books, a quiet study environment, and proximity to your mentors and peers. Hostel availability is subject to seat confirmation at the time of Prelims results." },
        { q: "Can I join IMP 2027 if I'm a working professional?", a: "Absolutely — IMP 2027 is specifically designed with working professionals in mind. Your mentor builds your study plan around your work schedule, not against it. Whether you have 2 hours a day or 4 hours on weekends, the program adapts. Many of our enrolled students are currently in jobs in IT, banking, teaching, and other fields." },
        { q: "How often will I interact with my mentor?", a: "Every week. You have a dedicated 1:1 session with your mentor every week to review what you studied, address doubts, adjust your plan, and get feedback on your answers. Outside of these sessions, you can also reach your mentor through the student portal for quick queries — they typically respond within 24 hours." },
        { q: "What stages does IMP 2027 cover?", a: "IMP 2027 covers all three stages of UPSC CSE: Prelims (GS Paper I + CSAT), Mains (all 9 papers including Essay and Ethics), and the Personality Test (Interview). The 30 months are structured so you build the foundation first, then systematically prepare for each stage with enough time to practice, review, and refine." },
        { q: "What is the difference between IMP and a regular coaching class?", a: "In a coaching class, you follow a batch schedule designed for the average student. In IMP 2027, everything is built around you — your pace, your gaps, your schedule, and your goals. There's no sitting through lectures on topics you already know or rushing past things you need more time on. Your mentor is accountable to your progress, not to a batch's syllabus completion." },
        { q: "Is the program online or offline?", a: "IMP 2027 is primarily online — mentor sessions, doubt clearing, answer evaluations, and the student portal are all accessible from anywhere in India. The hostel and library facility in Noida is a physical option that becomes available at the Mains stage for students who choose to use it." },
        { q: "What happens if I miss my weekly mentor session?", a: "Life happens. You can reschedule your session up to 24 hours in advance without any penalty. Your mentor is flexible and understands that work, family, and other commitments can come up. Missed sessions don't lapse — they're rescheduled within the same week wherever possible." },
        { q: "How do I enroll in IMP 2027?", a: 'You can enroll directly by clicking "Enroll Now" on this page, calling us at +91 87662 33193, or messaging on WhatsApp. Once enrolled, you\'ll receive onboarding details and be matched with a mentor within 48 hours. EMI options are available — contact us for details.' },
      ],
    },
    bottomCta: {
      title: "Your UPSC 2027 Journey Starts Here",
      sub: "30 months from now, you could be clearing Prelims and claiming your full fee back. Or you could still be figuring out where to start. The decision is now.",
      primary: "Enroll in IMP 2027",
      secondary: "Talk to Our Team",
      guarantee: "100% Fee Refund Guarantee · Free Hostel at Mains · 24/7 Support",
    },
    footer: {
      brand: "Empowering UPSC aspirants through personalized mentorship, structured guidance, and comprehensive support — from Day 1 to the Interview panel.",
      quickLinks: [
        { label: "About Us", href: "/about-us" },
        { label: "All Courses", href: "/MentorshipCourses" },
        { label: "IMP 2027", href: "/integrated-mentorship-2027" },
        { label: "UPPCS Mentorship", href: "/uppcs-mentorship" },
        { label: "Success Stories", href: "/success-stories" },
        { label: "UPSC Blog", href: "/preparation-blogs" },
        { label: "Contact Us", href: "/contact-us" },
      ],
      resources: [
        { label: "UPSC Mentorship", href: "/integrated-mentorship" },
        { label: "Current Affairs", href: "/currentAffairs" },
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
