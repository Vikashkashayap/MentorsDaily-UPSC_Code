/**
 * Default long-form landing copy for Integrated Mentorship 2028 (36-month program).
 * Admin overrides merge via course.detailPage — same shape as IMP 2027.
 */

import { mergeImpDetailPage } from "./imp2027DetailDefaults";

export { mergeImpDetailPage };

export const IMP_2028_SLUG = "integrated-mentorship-2028";

export function getDefaultImp2028DetailPage() {
  return {
    seo: {
      title: "IMP 2028 – 36-Month Integrated UPSC Mentorship Program | MentorsDaily",
      description:
        "Join MentorsDaily IMP 2028 — India's most comprehensive 36-month UPSC mentorship with 1:1 personalized mentoring, Student Dashboard, unlimited questions & 3 unmatched guarantees.",
    },
    announcement: {
      strong: "🎉 3 Guarantees, 0 Risk:",
      text: "100% Fee Refund · Free Hostel at Mains · Next Attempt Free — Only 15 seats per mentor. Enrolling now.",
      ctaText: "Reserve Your Seat →",
      ctaHref: "#enroll",
    },
    hero: {
      badge: "India's Most Advanced Program For UPSC 2028",
      badgeIcon: "Rocket",
      titleLines: [
        { text: "36 Months. One Mentor." },
        { fragment: true, accentText: "3 Guarantees", after: " &  AI-Powered Student Dashboard." },
        // { text: "Designed to Help You Reach Your IAS Goal..", accent: "purple" },
      ],
      subHtml:
        "IMP 2028 is MentorsDaily’s most comprehensive UPSC mentorship—a dedicated 1:1 mentor for 36 months, a personalised AI-powered Student Dashboard with 20,000+ practice questions, and 3 unmatched guarantees for complete peace of mind.Designed to help you reach your IAS goal.",

      perks: [
        "1:1 Dedicated Mentor",
        "Max 20 Students Per Mentor",
        "AI-Powered Student Dashboard",
        "Unlimited Practice Questions",
        "100% Fee Refund Guarantee",
      ],
      trustLineHtml:
        '<span class="text-[#F59E0B] tracking-wide">★★★★★</span> <strong class="text-white/85">600+ already enrolled</strong> · 100% Student Satisfaction · Trusted across India',
      cardRibbon: "PRELIMS + MAINS + INTERVIEW",
      cardBannerTitle: "INTEGRATED MENTORSHIP COURSE 2028",
      cardListingTitle: "Integrated Mentorship Program – 2028",
      cardMetaPills: [
        { icon: "Clock", label: "36 Months" },
        { icon: "Sun", label: "Hybrid" },
        { icon: "Globe", label: "English & Hindi" },
      ],
      cardTitle: "Integrated Mentorship Program (IMP) 2028",
      cardSubtitle: "From Basics to Interview — Complete UPSC Preparation with 1:1 Mentorship",
      cardFeatures: [
       
        "All NCERTs & Standard Books Provided",

        "Daily 1:1 Personalized Mentorship Sessions & Study Targets",
        "AI Powered Student Dashboard",
        "Biweekly Psychologist Support Sessions",
        "Prelims + Mains Test Series",
       
      ],
      enrollCta: "Enroll Now",
      cardTrust: "Secure payment · No hidden charges · EMI available",
      primaryCtaUsesIndigo: true,
    },
    trustBar: [
      { icon: "Users", num: "600+", lbl: "Already Enrolled" },
      { icon: "Star", num: "100%", lbl: "Student Satisfaction" },
      { icon: "UserRound", num: "Max 20", lbl: "Students Per Mentor" },
      { icon: "CalendarCheck", num: "36", lbl: "Months of Guidance" },
      { icon: "CircleHelp", num: "Unlimited", lbl: "Practice Questions" },
    ],
    pricingSection: {
      tag: "Choose Your Plan",
      title: "Two Plans. One 36-Month Journey.",
      sub: "Both plans cover the complete IMP 2028 program and all 3 guarantees. Choose the mentorship intensity that fits your lifestyle.",
      daily: {
        name: "Daily Plan",
        popularRibbon: "⭐ Recommended",
        tagline: "Maximum support. Maximum results.",
        price: 90000,
        oldPrice: 180000,
        saveLabel: "Save ₹90,000 — 50% Early Bird Price",
        durationLine: "36-Month Program · Batch Starts April 2026",
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
        cta: "Enroll in Daily Plan — Best Value",
      },
      weekly: {
        name: "Weekly Plan",
        ribbon: "Flexible",
        tagline: "Structured guidance for self-paced learners.",
        price: 60000,
        oldPrice: 90000,
        saveLabel: "Save ₹30,000 — 33.33% Off · Self-Paced",
        durationLine: "36-Month Program · Batch Starts April 2026",
        features: [
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
      comparisonTitle: "Full Feature Comparison",
      comparisonHead: {
        left: "Feature",
        midLabel: "Daily",
        rightLabel: "Weekly",
      },
      comparisonRows: [
        { type: "cat", label: "Mentoring & guidance" },
        { type: "text", f: "1:1 personalized mentor sessions", d: "Daily 1 session", w: "Weekly 1 session" },
        { type: "text", f: "Personalised study plan", d: "Daily update", w: "Weekly update" },
        { type: "bool", f: "Books & curated study material (home delivered)", d: true, w: false },
        { type: "text", f: "Psychologist + personality development sessions", d: "Bi-weekly", w: "Monthly" },

        { type: "cat", label: "Study resources" },
        { type: "bool", f: "NCERTs & standard references (curated set)", d: true, w: false },
        { type: "bool", f: "Daily Current Affairs PDF (evening)", d: true, w: true },
        {
          type: "bool",
          f: "Answer writing + review + live discussion",
          d: true,
          w: "No live discussion",
          wPill: true,
        },
        { type: "bool", f: "Essay & ethics practice sets", d: true, w: true },

        { type: "cat", label: "Community & events" },
        { type: "bool", f: "Peer community (program cohort)", d: true, w: true },
        { type: "bool", f: "Live webinars with experts", d: true, w: true },
        { type: "bool", f: "Structured progress review with mentor", d: true, w: false },

        { type: "cat", label: "Exclusive guarantees" },
        { type: "bool", f: "100% fee refund (Prelims cleared)", d: true, w: false },
        { type: "bool", f: "Free hostel accommodation (Mains)", d: true, w: true },
        { type: "bool", f: "One extra attempt at no cost", d: true, w: false },
        { type: "bool", f: "Accountability & mentor-led check-ins", d: true, w: true },

        { type: "cat", label: "Tests & answer writing" },
        { type: "bool", f: "MAP reports & performance analysis", d: true, w: true },
        { type: "text", f: "UPSC-style mock tests (full-length + sectional)", d: "Full series", w: "Full series" },
        { type: "text", f: "Practice Hub (topic-wise questions)", d: "Unlimited", w: "Limited" },
      ],
      helpHtml:
        'Questions about which plan is right for you? <a class="text-[#E86B2A] font-semibold underline-offset-2 hover:underline" href="https://wa.me/918766233193" target="_blank" rel="noreferrer">Chat with us on WhatsApp</a> and we\'ll help you decide.',
    },
    uspSection: {
      tag: "Our 3 Guarantees",
      title: "Prepare with Zero Financial Risk",
      sub: "IMP 2028 is backed by three guarantees no other UPSC program offers — because we're as committed to your success as you are.",
      cards: [
        {
          variant: "green",
          icon: "IndianRupee",
          title: "100% Fee Refund",
          body: "Clear your UPSC Prelims after completing IMP 2028, and we refund your entire program fee — every rupee, no questions asked.",
          steps: ["Full refund on Prelims clearance"],
        },
        {
          variant: "orange",
          icon: "House",
          title: "Free Hostel at Mains",
          body: "When you make it to UPSC Mains, MentorsDaily covers your hostel, meals, and stationery at our Noida facility for the full Mains period.",
          steps: ["Accommodation + meals + stationery"],
        },
        {
          variant: "purple",
          icon: "RefreshCw",
          title: "Next Attempt Free",
          body: "If you complete IMP 2028 but don't clear in the first attempt, your next full attempt is on us — at zero additional fee.",
          steps: ["Complete next attempt at ₹0"],
        },
      ],
      competitorHtml:
        "<strong>No other UPSC program in India offers all three guarantees together.</strong> IMP 2028 is built on a single belief: if you put in the work, your success should be guaranteed.",
    },
    featuresSection: {
      tag: "What Makes IMP 2028 Different",
      title: "Every Feature Designed\nfor UPSC 2028 Success",
      sub: "A 36-month program built on mentorship, data-driven tracking, and deep personalisation — not one-size-fits-all coaching.",
      items: [
        { theme: "navy", icon: "UserRound", title: "1:1 Dedicated Mentor", body: "Your mentor knows your strengths, weak areas, and personal study pace. With max 20 students per mentor, you get undivided attention throughout your 36-month journey." },
        { theme: "purple", icon: "Gauge", title: "AI-Powered Student Dashboard", body: "Track every aspect of your preparation — syllabus coverage, mock performance, weekly targets, fault analysis, and live progress — all in one powerful dashboard." },
        { theme: "orange", icon: "PenLine", title: "Unlimited Answer Writing", body: "Submit answers anytime and receive detailed, personalised feedback from your mentor within 24 hours. Covers both GS and optional subjects." },
        { theme: "green", icon: "LineChart", title: "MAP Report (Mentor Analysis)", body: "A detailed data-driven progress report prepared by your mentor every 15 days (Daily plan) or bi-monthly (Weekly plan) — covering performance trends, gaps, and next-phase strategy." },
        { theme: "sky", icon: "ClipboardList", title: "UPSC-Style Mock Tests", body: "Pattern-accurate full-length tests designed on actual UPSC pattern. Comes with detailed solutions, topic-wise rank analysis, and fault reports." },
        { theme: "gold", icon: "BookOpen", title: "Books & Daily CA PDF", body: "All required UPSC books are delivered to your home. Daily Current Affairs PDF (evening) keeps you updated without the noise of unfiltered news sources." },
        { theme: "navy", icon: "MessageCircle", title: "Doubt Clearing", body: "Get doubts resolved within 6 hours (Daily plan) or 48 hours (Weekly plan) via your dedicated mentor. No waiting for the next session — clarity when you need it." },
        { theme: "orange", icon: "Mic", title: "5+ Mock Interviews", body: "Comprehensive interview preparation including multiple mock interview rounds, personality test coaching, and post-interview feedback from experienced panellists." },
        { theme: "purple", icon: "Brain", title: "Personality Development + Expert Psychological Support", body: "Structured personality development sessions and dedicated mental health check-ins to keep you motivated, focused, and mentally resilient through the 36-month journey." },
      ],
    },
    dashboardSection: {
      tag: "Student Dashboard",
      title: " AI-Powered Student Dashboard",
      sub: "IMP 2028 students get exclusive access to a personalised digital dashboard that tracks every dimension of their UPSC preparation in real time.",
      cards: [
        { title: "Module Roadmap", body: "Visual journey of your entire 36-month syllabus broken into structured, week-by-week modules. Always know what's next.", icon: "Map", accent: "border-[#1A3C6E]", iconShell: "bg-[#EEF3FA] text-[#1A3C6E]" },
        { title: "Daily and Weekly Target System", body: "Auto-generated daily and weekly goals based on your progress, pace, and upcoming milestones. Stay on track without guesswork.", icon: "Target", accent: "border-[#E86B2A]", iconShell: "bg-[#FDE8D8] text-[#E86B2A]" },
        { title: "Syllabus Tracker", body: "Mark topics as Learned, In Progress, or Pending. Get a bird's-eye view of your coverage across all GS papers and optional.", icon: "ListChecks", accent: "border-[#2D7D4E]", iconShell: "bg-[#D1FAE5] text-[#2D7D4E]" },
        { title: "UPSC-Style Mock Tests", body: "Take full-length, UPSC pattern tests directly from your dashboard. Get instant scores, solutions, and topic-wise rank analysis.", icon: "FileCheck2", accent: "border-[#7C3AED]", iconShell: "bg-[#EDE9FE] text-[#7C3AED]", note: "Full Access · Both Plans", noteTone: "text-[#2D7D4E]" },
        { title: "Fault Analysis", body: "Identifies recurring error patterns across your mock tests — by topic, question type, and difficulty — so you fix weaknesses, not symptoms.", icon: "Search", accent: "border-[#F59E0B]", iconShell: "bg-[#FEF9C3] text-[#CA8A04]" },
        { title: "Practice Hub", body: "Access 20,000+ curated questions organised by subject, topic, and difficulty level. Drill any area of the syllabus on demand.", icon: "Dumbbell", accent: "border-[#5B8DB8]", iconShell: "bg-[#D5E8F0] text-[#1A3C6E]", note: "Full Access · Daily Plan", noteTone: "text-[#2D7D4E]", note2: "Limited · Weekly Plan", note2Tone: "text-[#E86B2A]" },
        { title: "Live Progress Dashboard", body: "Real-time visual graphs of your performance across all modules, answer writing scores, and mock test trends — updated after every activity.", icon: "BarChart3", accent: "border-[#2D3A8C]", iconShell: "bg-[#E0E7FF] text-[#2D3A8C]" },
        {
          title: "AI Mentor",
          body: "Get instant doubt support, personalized study suggestions, and smart next-step guidance based on your preparation data.",
          icon: "Bot",
          accent: "border-[#0D9488]",
          iconShell: "bg-[#CCFBF1] text-[#0F766E]",
          note: "24×7 Smart Guidance",
          noteTone: "text-[#0F766E]",
        },
      ],
    },
    timelineSection: {
      tag: "36-Month Journey",
      title: "Your Road to UPSC 2028 — Phase by Phase",
      sub: "A meticulously structured 10-phase roadmap from April 2026 to April 2029, covering every stage of UPSC preparation.",
      phases: [
        { numLabel: "1", color: "#E86B2A", sub: "Phase 1", label: "Orientation & Foundation" },
        { numLabel: "2", color: "#24527A", sub: "Phase 2", label: "NCERTs & Core Concepts" },
        { numLabel: "3", color: "#5B8DB8", sub: "Phase 3", label: "GS Paper I Deep Dive" },
        { numLabel: "4", color: "#5B8DB8", sub: "Phase 4", label: "GS Paper II & III" },
        { numLabel: "5", color: "#24527A", sub: "Phase 5", label: "GS Paper IV + Optional" },
        { numLabel: "6", color: "#24527A", sub: "Phase 6", label: "Integrated Revision I" },
        { numLabel: "7", color: "#5B8DB8", sub: "Phase 7", label: "Full Mock Test Series" },
        { numLabel: "8", color: "#E86B2A", sub: "Phase 8", label: "Prelims Final Sprint" },
        { numLabel: "9", color: "#2D7D4E", sub: "Phase 9", label: "Mains Answer Writing" },
        { numLabel: "🏆", color: "#7C3AED", sub: "Phase 10", label: "Mains Exam + Interview" },
      ],
      note: "All 10 phases are covered in both the Daily and Weekly plans. Your mentor personalises the pace and depth based on your individual progress at every stage.",
    },
    includedSection: {
      tag: "What's Included",
      title: "Everything You Get in IMP 2028",
      sub: "Explore each pillar of the program — from mentorship and tracking to resources and guarantees.",
      tabs: [
        {
          id: "mentorship",
          label: "Mentorship",
          items: [
            { icon: "UserRound", title: "1:1 Dedicated Mentor", body: "Your personalized mentor understands your strengths, weak areas, and study pace. With a maximum of 20 students per mentor, you receive undivided attention throughout your 36-month journey.." },
            { icon: "CalendarDays", title: "Regular Mentor Sessions", body: "Daily plan: daily 1:1 check-in with your mentor. Weekly plan: weekly 1:1 session. Sessions cover progress review, doubt resolution, and strategy adjustment." },
            { icon: "MessageCircle", title: "Rapid Doubt Clearing", body: "Daily plan: doubts resolved within 6 hours. Weekly plan: within 48 hours. Submit doubts anytime via WhatsApp or the dashboard — no waiting for the next session." },
            { icon: "Brain", title: "PD & Mental Health Sessions", body: "Regular personality development and mental wellness check-ins to keep you motivated, balanced, and focused during the long preparation cycle." },
          ],
        },
        {
          id: "tracking",
          label: "Planning & Tracking",
          items: [
            { icon: "Target", title: "Daily and Weekly Target System", body: "Auto-generated daily and weekly goals based on your current progress and upcoming milestones. Updated every week by your mentor to keep you on the optimal path." },
            { icon: "LineChart", title: "MAP Report (Mentor Analysis & Progress)", body: "A comprehensive data-driven report generated every 15 days (Daily plan) or bi-monthly (Weekly plan). Covers trends, weak areas, strengths, and updated strategy." },
            { icon: "ListChecks", title: "Syllabus Tracker", body: "Mark every topic across the UPSC syllabus as Learned, In Progress, or Pending. Your mentor reviews your tracker regularly and adjusts your plan accordingly." },
            { icon: "Map", title: "36-Month Module Roadmap", body: "A structured phase-by-phase roadmap covering all 10 phases — from Foundation to Mains & Interview. Always know exactly where you are and what's next." },
          ],
        },
        {
          id: "tests",
          label: "Tests & Writing",
          items: [
            { icon: "FileCheck2", title: "UPSC-Style Mock Tests", body: "Full-length tests designed on actual UPSC paper pattern — not NTA-based. Comes with detailed solutions, explanation videos, and rank-based performance analysis." },
            { icon: "PenLine", title: "Unlimited Answer Writing", body: "Submit answers anytime — no submission limits. Your mentor provides personalised written feedback within 24 hours, covering structure, content, and presentation." },
            { icon: "Search", title: "Fault Analysis Report", body: "AI-powered analysis of your errors across all tests — identifies recurring mistakes by topic, paper section, and difficulty so you fix root causes." },
            { icon: "Mic", title: "5+ Mock Interviews", body: "Multiple mock interview rounds after Mains, conducted by experienced panellists. Includes personality test coaching, feedback, and improvement sessions." },
          ],
        },
        {
          id: "dashboard",
          label: "Dashboard",
          items: [
            { icon: "Gauge", title: "Live Progress Dashboard", body: "Real-time visualisation of your performance across syllabus coverage, answer writing scores, mock test trends, and weekly target completion — updated live." },
            { icon: "Dumbbell", title: "Practice Hub — 20,000+ Questions", body: "Massive question bank organised by subject, topic, and difficulty. Full access for Daily plan students; limited access for Weekly plan students." },
            { icon: "BarChart3", title: "Performance Analytics", body: "Deep-dive graphs comparing your performance week-over-week, subject-wise, and against program benchmarks — helping your mentor fine-tune your strategy." },
            { icon: "Bot", title: "AI Mentor", body: "Instant doubt support, personalized study suggestions, and smart next-step guidance based on your preparation data — available round the clock inside your dashboard." },
            { icon: "Smartphone", title: "Accessible Anytime, Anywhere", body: "Your Student Dashboard is accessible on mobile and desktop — practice questions, track progress, and review reports whether at home, in the library, or on the move." },
          ],
        },
        {
          id: "resources",
          label: "Resources",
          items: [
            { icon: "BookMarked", title: "Books Home Delivered", body: "All required UPSC preparation books — standard references, GS papers, and optional subject material — delivered to your doorstep at the start of your program." },
            { icon: "Newspaper", title: "Daily Current Affairs PDF", body: "A curated, mentor-verified Current Affairs PDF delivered every evening — topic-tagged and syllabus-mapped so you study what matters for UPSC, not noise." },
            { icon: "MapPin", title: "Personalised Study Plan", body: "A customised month-by-month study plan created at the start of your program and revised regularly by your mentor based on your actual progress." },
            { icon: "House", title: "Free Hostel at Mains", body: "For students who reach Mains, MentorsDaily provides free hostel accommodation, meals, and stationery at our Noida facility for the entire Mains duration." },
          ],
        },
        {
          id: "guarantees",
          label: "Guarantees",
          items: [
            { icon: "IndianRupee", title: "100% Fee Refund Guarantee", body: "Clear UPSC Prelims after completing IMP 2028 and receive a full refund of your entire program fee. No conditions, no deductions — your success is our accountability.", border: "green" },
            { icon: "House", title: "Free Hostel at Mains Guarantee", body: "On qualifying for UPSC Mains, your stay at MentorsDaily's Noida facility is fully covered — hostel, daily meals, and stationery — so you focus only on Mains preparation.", border: "orange" },
            { icon: "RefreshCw", title: "Next Attempt Free Guarantee", body: "If you complete IMP 2028 sincerely but don't clear in the first attempt, your next complete attempt with a dedicated mentor is provided at absolutely zero additional fee.", border: "purple" },
            { icon: "Shield", title: "No Hidden Charges", body: "The price you see is the price you pay. Books, dashboard access, mock tests, answer writing evaluation, and hostel stay at Mains — all included. No surprise add-ons.", border: "navy" },
          ],
        },
      ],
    },
    testimonialsSection: {
      tag: "Student Stories",
      title: "Aspirants Who Chose IMP",
      sub: "Hear from students who transformed their UPSC preparation with a dedicated mentor by their side.",
      items: [
        { stage: "IMP 2028 Student", quote: "It’s just been a month that I’ve started studying here, and the best thing about the institute is the way the teachers emphasis on conceptual clarity and make the topics very easy to understand.", name: "Avira Banerjee", loc: "SRCC, DU", initial: "A", avBg: "#1A3C6E" },
        { stage: "IMP 2028 Student", quote: "The MAP Report every 15 days gives me a crystal-clear picture of where I stand and exactly what to fix. My mentor doesn't just track me — he genuinely understands my preparation and guides me accordingly.", name: "Rishita Sharma", loc: "SRCC, DU", initial: "RS", avBg: "#5B8DB8" },
        { stage: "IMP 2028 Student", quote: "Truly the Best Mentorship one can get. The Team, The Mentors especially guide you on a Daily Basis. I would like to Congratulate the Mentors Daily Team for the efforts they are literally giving to bring the best out of the Aspirants. ❤️✨", name: "Shubham Singh", loc: "Chhattishgarkh", initial: "SS", avBg: "#2D7D4E" },
      ],
    },
    faqSection: {
      tag: "FAQs",
      title: "Questions About IMP 2028?",
      sub: "Everything you need to know before enrolling. If your question isn't here, call or WhatsApp us anytime.",
      items: [
        { q: "What is IMP 2028?", a: "IMP 2028 (Integrated Mentorship Program 2028) is MentorsDaily's flagship 36-month UPSC mentorship designed for aspirants targeting UPSC CSE 2028. It provides a dedicated 1:1 mentor, a personalised Student Dashboard, 20,000+ practice questions, UPSC-style mock tests, and three industry-first guarantees — all in one program." },
        { q: "When does the program start and how long is it?", a: "IMP 2028 begins in April 2026 and runs for 36 months, ending in April 2029. The program covers all 10 phases from Foundation building right through to Mains examination and Interview preparation." },
        { q: "What is the difference between the Daily and Weekly plans?", a: "Both plans cover the complete 36-month IMP 2028 journey and include all 3 guarantees. The Daily Plan (₹89,999) includes daily 1:1 mentor sessions, 6-hour doubt clearing, MAP Reports every 15 days, and full Practice Hub access. The Weekly Plan (₹59,999) includes weekly 1:1 sessions, 48-hour doubt clearing, bi-monthly MAP Reports, and limited Practice Hub access. All other features — mock tests, answer writing, books, and guarantees — are identical." },
        { q: "How many students does each mentor handle?", a: "Each mentor handles a maximum of 15 students in IMP 2028. This strict limit ensures every student receives genuinely personalised attention — your mentor knows your preparation inside-out, not just your name." },
        { q: "Are there any lectures or classes in IMP 2028?", a: "No. IMP 2028 is a pure mentorship program — there are no lectures, recorded or live, of any kind throughout the course. The program is built entirely on 1:1 personalised mentoring, self-study guided by your mentor, and practice through the Student Dashboard." },
        { q: "What is the Student Dashboard and how does it help?", a: "The Student Dashboard is a personalised digital platform exclusive to IMP 2028 students. It includes 8 features: Module Roadmap, Weekly Target System, Syllabus Tracker, UPSC-Style Mock Tests, Fault Analysis, Practice Hub (20,000+ questions), Live Progress Dashboard, and AI Mentor for 24×7 smart guidance." },
        { q: "What are the UPSC-Style Mock Tests? Are they NTA-based?", a: "No — the mock tests in IMP 2028 are UPSC-pattern tests, not NTA-based. They mirror the actual UPSC CSE Prelims question style, difficulty, and pattern. Each test comes with detailed solutions, topic-wise analysis, rank comparisons, and Fault Analysis." },
        { q: "What is the MAP Report?", a: "MAP stands for Mentor Analysis & Progress. It is a comprehensive written report prepared by your mentor after analysing your performance data. Daily plan students receive the MAP Report every 15 days; Weekly plan students receive it bi-monthly." },
        { q: "What does the 100% Fee Refund guarantee mean exactly?", a: "If you complete the IMP 2028 program and clear UPSC Prelims, MentorsDaily will refund your entire program fee — 100%, with no deductions. Terms and conditions apply and are shared in full at enrolment." },
        { q: "What happens if I don't clear in my first attempt?", a: "If you complete IMP 2028 sincerely but don't clear in the first attempt, your next complete attempt — including a dedicated mentor for the full preparation cycle — is provided at zero additional fee. This is our Third Guarantee, and it applies to both Daily and Weekly plan students." },
        { q: "Is EMI available? What are the payment options?", a: "Yes, EMI options are available for both Daily and Weekly plans. We also accept payment via UPI, bank transfer, and major cards. There are no hidden charges — the price listed includes everything in the program." },
        { q: "Can I switch from the Weekly plan to the Daily plan later?", a: "Yes, plan upgrades are possible. If you enrol in the Weekly plan and later want the higher support of the Daily plan, you can upgrade by paying the difference in fees (subject to mentor availability). Contact us at enrolment to understand the upgrade process in detail." },
      ],
    },
    bottomCta: {
      title: "Your UPSC 2028 Journey\nStarts in April 2026.",
      sub: "Only 15 seats per mentor. Once filled, they're gone. Lock in your seat today and begin the most structured UPSC preparation of your life.",
      primary: "Enroll via WhatsApp",
      secondary: "Call to Enroll",
      guarantee: "Backed by 3 Guarantees · No Hidden Charges · EMI Available",
    },
    contact: {
      phoneDisplay: "+91 87662 33193",
      phoneTel: "+918766233193",
      wa: "918766233193",
      email: "info@mentorsdaily.in",
      address: "Noida, Uttar Pradesh",
      mapsQuery: "Noida+Uttar+Pradesh",
    },
    stickyMobileCta: "Enroll Now",
  };
}
