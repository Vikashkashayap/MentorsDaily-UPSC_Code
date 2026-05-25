import type { PageSeoInput } from "@/lib/seo/config";

export type PageSeoEntry = Omit<PageSeoInput, "path">;
export type BlogSeoEntry = PageSeoEntry & { ogType?: "article" };

/** Paths that must not be indexed (user dashboards, tools behind login, admin). */
export const NOINDEX_PATH_PREFIXES = [
  "/admin",
  "/home",
  "/library",
  "/profile",
  "/ask",
  "/mcq",
  "/my-tests",
  "/my-progress",
  "/study/current-affairs",
  "/dashboard",
] as const;

export const NOINDEX_EXACT_PATHS = new Set(["/login"]);

export function shouldNoindex(path: string): boolean {
  if (NOINDEX_EXACT_PATHS.has(path)) return true;
  return NOINDEX_PATH_PREFIXES.some(
    (p) => path === p || path.startsWith(`${p}/`)
  );
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  "/": {
    title: "MentorsDaily - Best UPSC Preparation Platform | Expert Mentorship",
    description: "Join MentorsDaily for comprehensive UPSC preparation with expert mentorship, personalized courses, study materials, and proven strategies to crack civil services exam.",
    keywords: "UPSC preparation, IAS coaching, civil services mentorship, UPSC courses, study materials, current affairs, prelims preparation, mains preparation",
    image: "/images/hero.webp",
  },
  "/about-us": {
    title: "About Us - MentorsDaily | Leading UPSC Platform",
    description: "Learn about MentorsDaily - India's leading UPSC preparation platform. Discover our vision, mission, and commitment to empowering civil services aspirants with expert mentorship and personalized guidance.",
    keywords: "about MentorsDaily, UPSC coaching platform, civil services mentorship, IAS preparation, UPSC about us, mentorship platform, UPSC success stories, expert guidance UPSC",
    image: "/images/hero.webp",
  },
  "/answer-evaluation": {
    title: "UPSC Answer Evaluation | Mains Writing Review | MentorsDaily",
    description: "Get expert evaluation of your UPSC mains answers with detailed feedback and improvement tips.",
    keywords: "UPSC answer evaluation, mains answer review, answer writing feedback, MentorsDaily evaluation",
  },
  "/budget-survey": {
    title: "Budget Survey | MentorsDaily",
    description: "Share your feedback on Union Budget topics relevant to UPSC preparation.",
    keywords: "Union Budget UPSC, budget survey, economy current affairs, GS3 budget",
  },
  "/careers": {
    title: "Careers at MentorsDaily | Join Our Team | UPSC Education Jobs",
    description: "Join MentorsDaily and be part of India's leading UPSC preparation platform. Explore career opportunities in content development, mentorship, business development, video editing, digital marketing, graphics design, and software development. Make a difference in students' lives.",
    keywords: "MentorsDaily careers, UPSC education jobs, mentorship jobs, content developer jobs, education technology careers, UPSC platform jobs, join MentorsDaily team",
    image: "/images/hero.webp",
  },
  "/contact-us": {
    title: "Contact Us - MentorsDaily | UPSC Mentorship Support",
    description: "Contact MentorsDaily for UPSC mentorship inquiries and support. Reach us at B-69, Block B, Noida Sector 2, Noida, UP 201301. Call +91 8766233193 or email contact@mentorsdaily.com.",
    keywords: "contact MentorsDaily, UPSC mentorship contact, IAS coaching contact, civil services support, MentorsDaily phone number, UPSC inquiry, mentorship help, contact UPSC coaching",
    image: "/images/hero.webp",
  },
  "/current-affairs": {
    title: "Daily Current Affairs for UPSC Exam - Latest News | MentorsDaily",
    description: "Comprehensive daily current affairs for UPSC 2025 preparation. Expert-curated news analysis organized by GS papers (GS1, GS2, GS3, GS4) with date-wise and paper-wise filtering. Perfect for prelims and mains exam preparation.",
    keywords: "daily current affairs UPSC, UPSC current affairs 2025, current affairs for UPSC exam, GS paper current affairs, GS1 current affairs, GS2 current affairs, GS3 current affairs, GS4 current affairs, latest news for UPSC, current events UPSC, news analysis UPSC, civil services current affairs, IAS current affairs, UPSC preparation current affairs, daily news analysis, important current affairs, UPSC exam current affairs, prelims current affairs, mains current affairs, UPSC news today, current affairs for civil services, UPSC daily news, UPSC current affairs analysis, expert insights UPSC, current affairs syllabus, UPSC 2025 preparation, smart organization current affairs, date-wise current affairs, paper-wise current affairs, comprehensive current affairs, in-depth analysis UPSC, contemporary issues UPSC, static syllabus current affairs, history culture current affairs, geography environment current affairs, polity governance current affairs, international relations UPSC, economy development UPSC, science technology UPSC, social issues justice UPSC, ethics integrity UPSC, disaster management UPSC",
    image: "/images/hero.webp",
  },
  "/download-ncerts": {
    title: "Download NCERT Books for UPSC | Free PDFs | MentorsDaily",
    description: "Download all NCERT books for UPSC preparation in PDF format. Essential foundation books for civil services preparation.",
    keywords: "NCERT books download, UPSC NCERTs, free PDF books, foundation books",
  },
  "/free-study-materials": {
    title: "Free UPSC Study Materials | NCERTs, Books & Resources | MentorsDaily",
    description: "Access free UPSC study materials including NCERTs, reference books, current affairs, and comprehensive study resources.",
    keywords: "free UPSC materials, NCERT books, study resources, current affairs, free downloads",
  },
  "/help-support": {
    title: "Help & Support | MentorsDaily UPSC Platform",
    description: "Get help with MentorsDaily UPSC courses, mentorship programs, payments, and account support.",
    keywords: "MentorsDaily help, UPSC support, mentorship help, course support, customer support",
  },
  "/integrated-mentorship": {
    title: "Integrated Mentorship Program | Complete UPSC Preparation | MentorsDaily",
    description: "Comprehensive integrated mentorship program covering all aspects of UPSC preparation - prelims, mains, and interview with expert guidance.",
    keywords: "integrated UPSC preparation, complete mentorship, prelims mains interview, comprehensive coaching",
  },
  "/integrated-mentorship-2026": {
    title: "UPSC 2026 IMP | 18 Months Complete Preparation | MentorsDaily",
    description: "Join UPSC 2026 Integrated Mentorship Program (IMP). 18 months comprehensive preparation covering Prelims, Mains & Interview. Get 100% fee refund after clearing Prelims, free hostel & library access, personalized 1:1 mentorship.",
    keywords: "UPSC 2026, integrated mentorship program, IMP 2026, UPSC preparation 2026, civil services 2026, IAS preparation 2026, UPSC coaching 2026, mentorship program, prelims mains interview preparation, personalized mentorship, UPSC course 2026, best UPSC coaching, UPSC online course, civil services exam preparation, UPSC study plan, expert guidance UPSC, answer writing evaluation, UPSC mock tests, free hostel library UPSC, fee refund guarantee UPSC, UPSC success program, comprehensive UPSC preparation, UPSC mentorship 2026, UPSC guidance program, UPSC CSE 2026, IAS exam 2026, civil services coaching, UPSC prelims 2026, UPSC mains 2026, UPSC interview 2026, best UPSC institute, UPSC online coaching, UPSC test series, UPSC current affairs, UPSC optional subject, UPSC answer writing, UPSC study material, UPSC preparation strategy, UPSC coaching online, UPSC foundation course, UPSC preparation tips, UPSC exam pattern, UPSC syllabus 2026, UPSC notification 2026, UPSC eligibility, UPSC age limit, UPSC attempt limit, UPSC prelims preparation, UPSC mains preparation, UPSC interview preparation, UPSC personality test, UPSC DAF preparation, UPSC optional preparation, UPSC GS preparation, UPSC essay writing, UPSC ethics paper, UPSC preparation books, UPSC NCERT books, UPSC standard books, UPSC reference books, UPSC magazines, UPSC newspapers, UPSC monthly magazines, UPSC year book, UPSC atlas, UPSC notes, UPSC video lectures, UPSC online classes, UPSC live classes, UPSC recorded classes, UPSC doubt clearing, UPSC student support, UPSC helpline, UPSC study group, UPSC peer learning, UPSC success stories, UPSC toppers, UPSC rank holders, UPSC interview experience, UPSC mains experience, UPSC prelims experience, UPSC journey, UPSC motivation, UPSC inspiration, UPSC success tips, UPSC time management, UPSC stress management, UPSC mental health, UPSC psychological support, UPSC emotional support, UPSC career guidance, UPSC career counseling, UPSC facilities, UPSC library, UPSC hostel, UPSC accommodation, UPSC faculty, UPSC teachers, UPSC experts, UPSC mentors, UPSC strategy, UPSC plan, UPSC schedule, UPSC timetable, UPSC daily plan, UPSC weekly plan, UPSC monthly plan, UPSC long-term plan, UPSC flexible plan, UPSC customized plan, UPSC personalized plan, UPSC curriculum, UPSC syllabus coverage, UPSC complete coverage, UPSC comprehensive preparation, UPSC complete course, UPSC comprehensive program, UPSC complete mentorship, UPSC complete guidance, UPSC complete support, UPSC complete training, UPSC complete coaching, UPSC complete education, UPSC complete learning, UPSC complete study, UPSC complete exam preparation, UPSC complete test preparation, UPSC complete competitive exam preparation",
    image: "/images/hero.webp",
  },
  "/integrated-mentorship-2027": {
    title: "UPSC 2027 IMP | 30 Months Early Start Program | MentorsDaily",
    description: "Start early with UPSC 2027 Integrated Mentorship Program (IMP). 30 months comprehensive program perfect for freshers and working professionals. Build strong foundation with flexible schedule, comprehensive coverage from basics to interview.",
    keywords: "UPSC 2027, integrated mentorship program 2027, IMP 2027, early UPSC preparation, UPSC for freshers, working professional UPSC, UPSC foundation course, 30 months UPSC program, flexible UPSC schedule, UPSC early start, civil services 2027, IAS preparation 2027, UPSC coaching 2027, beginner UPSC course, UPSC foundation building, long-term UPSC preparation, UPSC mentorship 2027, comprehensive UPSC program, UPSC guidance 2027, UPSC CSE 2027, IAS exam 2027, civil services coaching 2027, UPSC prelims 2027, UPSC mains 2027, UPSC interview 2027, best UPSC institute 2027, UPSC online coaching 2027, UPSC test series 2027, UPSC current affairs 2027, UPSC optional subject 2027, UPSC answer writing 2027, UPSC study material 2027, UPSC preparation strategy 2027, UPSC coaching online 2027, UPSC mentorship program 2027, UPSC foundation course 2027, UPSC preparation tips 2027, UPSC exam pattern 2027, UPSC syllabus 2027, UPSC notification 2027, UPSC eligibility 2027, UPSC age limit 2027, UPSC attempt limit 2027, UPSC prelims preparation 2027, UPSC mains preparation 2027, UPSC interview preparation 2027, UPSC personality test 2027, UPSC DAF preparation 2027, UPSC optional preparation 2027, UPSC GS preparation 2027, UPSC essay writing 2027, UPSC ethics paper 2027, UPSC preparation books 2027, UPSC NCERT books 2027, UPSC standard books 2027, UPSC reference books 2027, UPSC magazines 2027, UPSC newspapers 2027, UPSC monthly magazines 2027, UPSC year book 2027, UPSC atlas 2027, UPSC notes 2027, UPSC video lectures 2027, UPSC online classes 2027, UPSC live classes 2027, UPSC recorded classes 2027, UPSC doubt clearing 2027, UPSC student support 2027, UPSC helpline 2027, UPSC study group 2027, UPSC peer learning 2027, UPSC success stories 2027, UPSC toppers 2027, UPSC rank holders 2027, UPSC interview experience 2027, UPSC mains experience 2027, UPSC prelims experience 2027, UPSC journey 2027, UPSC motivation 2027, UPSC inspiration 2027, UPSC success tips 2027, UPSC time management 2027, UPSC stress management 2027, UPSC mental health 2027, UPSC psychological support 2027, UPSC emotional support 2027, UPSC career guidance 2027, UPSC career counseling 2027, UPSC facilities 2027, UPSC library 2027, UPSC hostel 2027, UPSC accommodation 2027, UPSC faculty 2027, UPSC teachers 2027, UPSC experts 2027, UPSC mentors 2027, UPSC strategy 2027, UPSC plan 2027, UPSC schedule 2027, UPSC timetable 2027, UPSC daily plan 2027, UPSC weekly plan 2027, UPSC monthly plan 2027, UPSC long-term plan 2027, UPSC flexible plan 2027, UPSC customized plan 2027, UPSC personalized plan 2027, UPSC curriculum 2027, UPSC syllabus coverage 2027, UPSC complete coverage 2027, UPSC comprehensive preparation 2027, UPSC complete course 2027, UPSC comprehensive program 2027, UPSC complete mentorship 2027, UPSC complete guidance 2027, UPSC complete support 2027, UPSC complete training 2027, UPSC complete coaching 2027, UPSC complete education 2027, UPSC complete learning 2027, UPSC complete study 2027, UPSC complete exam preparation 2027, UPSC complete test preparation 2027, UPSC complete competitive exam preparation 2027",
    image: "/images/hero.webp",
  },
  "/integrated-mentorship-2028": {
    title: "UPSC 2028 IMP | 42 Months Long-term Strategy | MentorsDaily",
    description: "Plan ahead with UPSC 2028 Integrated Mentorship Program (IMP). 42 months comprehensive long-term preparation with deep subject mastery, multiple attempt strategy, optional subject specialization, and advanced answer writing techniques.",
    keywords: "UPSC 2028, integrated mentorship program 2028, IMP 2028, long-term UPSC preparation, UPSC multiple attempts, UPSC optional subject, deep subject mastery UPSC, advanced answer writing, UPSC strategy 2028, civil services 2028, IAS preparation 2028, UPSC coaching 2028, comprehensive UPSC program, UPSC foundation course, UPSC mentorship 2028, UPSC guidance program, UPSC preparation strategy, multiple attempt UPSC, optional subject UPSC, UPSC long-term course, UPSC CSE 2028, IAS exam 2028, civil services coaching 2028, UPSC prelims 2028, UPSC mains 2028, UPSC interview 2028, best UPSC institute 2028, UPSC online coaching 2028, UPSC test series 2028, UPSC current affairs 2028, UPSC optional subject 2028, UPSC answer writing 2028, UPSC study material 2028, UPSC preparation strategy 2028, UPSC coaching online 2028, UPSC mentorship program 2028, UPSC foundation course 2028, UPSC preparation tips 2028, UPSC exam pattern 2028, UPSC syllabus 2028, UPSC notification 2028, UPSC eligibility 2028, UPSC age limit 2028, UPSC attempt limit 2028, UPSC prelims preparation 2028, UPSC mains preparation 2028, UPSC interview preparation 2028, UPSC personality test 2028, UPSC DAF preparation 2028, UPSC optional preparation 2028, UPSC GS preparation 2028, UPSC essay writing 2028, UPSC ethics paper 2028, UPSC preparation books 2028, UPSC NCERT books 2028, UPSC standard books 2028, UPSC reference books 2028, UPSC magazines 2028, UPSC newspapers 2028, UPSC monthly magazines 2028, UPSC year book 2028, UPSC atlas 2028, UPSC notes 2028, UPSC video lectures 2028, UPSC online classes 2028, UPSC live classes 2028, UPSC recorded classes 2028, UPSC doubt clearing 2028, UPSC student support 2028, UPSC helpline 2028, UPSC study group 2028, UPSC peer learning 2028, UPSC success stories 2028, UPSC toppers 2028, UPSC rank holders 2028, UPSC interview experience 2028, UPSC mains experience 2028, UPSC prelims experience 2028, UPSC journey 2028, UPSC motivation 2028, UPSC inspiration 2028, UPSC success tips 2028, UPSC time management 2028, UPSC stress management 2028, UPSC mental health 2028, UPSC psychological support 2028, UPSC emotional support 2028, UPSC career guidance 2028, UPSC career counseling 2028, UPSC facilities 2028, UPSC library 2028, UPSC hostel 2028, UPSC accommodation 2028, UPSC faculty 2028, UPSC teachers 2028, UPSC experts 2028, UPSC mentors 2028, UPSC strategy 2028, UPSC plan 2028, UPSC schedule 2028, UPSC timetable 2028, UPSC daily plan 2028, UPSC weekly plan 2028, UPSC monthly plan 2028, UPSC long-term plan 2028, UPSC flexible plan 2028, UPSC customized plan 2028, UPSC personalized plan 2028, UPSC curriculum 2028, UPSC syllabus coverage 2028, UPSC complete coverage 2028, UPSC comprehensive preparation 2028, UPSC complete course 2028, UPSC comprehensive program 2028, UPSC complete mentorship 2028, UPSC complete guidance 2028, UPSC complete support 2028, UPSC complete training 2028, UPSC complete coaching 2028, UPSC complete education 2028, UPSC complete learning 2028, UPSC complete study 2028, UPSC complete exam preparation 2028, UPSC complete test preparation 2028, UPSC complete competitive exam preparation 2028",
    image: "/images/hero.webp",
  },
  "/integrated-mentorship-2029": {
    title: "UPSC 2029 IMP | 48 Months Complete Preparation | MentorsDaily",
    description: "Join UPSC 2029 Integrated Mentorship Program (IMP). 48 months comprehensive preparation covering Prelims, Mains & Interview. Get 100% fee refund after clearing Prelims, free hostel & library access, personalized 1:1 mentorship.",
    keywords: "UPSC 2029, integrated mentorship program 2029, IMP 2029, UPSC preparation 2029, civil services 2029, IAS preparation 2029, UPSC coaching 2029, mentorship program, prelims mains interview preparation, personalized mentorship, UPSC course 2029, best UPSC coaching, UPSC online course, civil services exam preparation, UPSC study plan, expert guidance UPSC, answer writing evaluation, UPSC mock tests, free hostel library UPSC, fee refund guarantee UPSC, UPSC success program, comprehensive UPSC preparation, UPSC mentorship 2029, UPSC guidance program, UPSC CSE 2029, IAS exam 2029, civil services coaching, UPSC prelims 2029, UPSC mains 2029, UPSC interview 2029, best UPSC institute, UPSC online coaching, UPSC test series, UPSC current affairs, UPSC optional subject, UPSC answer writing, UPSC study material, UPSC preparation strategy, UPSC coaching online, UPSC foundation course, UPSC preparation tips, UPSC exam pattern, UPSC syllabus 2029, UPSC notification 2029, UPSC eligibility, UPSC age limit, UPSC attempt limit, UPSC prelims preparation, UPSC mains preparation, UPSC interview preparation, UPSC personality test, UPSC DAF preparation, UPSC optional preparation, UPSC GS preparation, UPSC essay writing, UPSC ethics paper, UPSC preparation books, UPSC NCERT books, UPSC standard books, UPSC reference books, UPSC magazines, UPSC newspapers, UPSC monthly magazines, UPSC year book, UPSC atlas, UPSC notes, UPSC video lectures, UPSC online classes, UPSC live classes, UPSC recorded classes, UPSC doubt clearing, UPSC student support, UPSC helpline, UPSC study group, UPSC peer learning, UPSC success stories, UPSC toppers, UPSC rank holders, UPSC interview experience, UPSC mains experience, UPSC prelims experience, UPSC journey, UPSC motivation, UPSC inspiration, UPSC success tips, UPSC time management, UPSC stress management, UPSC mental health, UPSC psychological support, UPSC emotional support, UPSC career guidance, UPSC career counseling, UPSC facilities, UPSC library, UPSC hostel, UPSC accommodation, UPSC faculty, UPSC teachers, UPSC experts, UPSC mentors, UPSC strategy, UPSC plan, UPSC schedule, UPSC timetable, UPSC daily plan, UPSC weekly plan, UPSC monthly plan, UPSC long-term plan, UPSC flexible plan, UPSC customized plan, UPSC personalized plan, UPSC curriculum, UPSC syllabus coverage, UPSC complete coverage, UPSC comprehensive preparation, UPSC complete course, UPSC comprehensive program, UPSC complete mentorship, UPSC complete guidance, UPSC complete support, UPSC complete training, UPSC complete coaching, UPSC complete education, UPSC complete learning, UPSC complete study, UPSC complete exam preparation, UPSC complete test preparation, UPSC complete competitive exam preparation",
    image: "/images/hero.webp",
  },
  "/integrated-mentorship-2030": {
    title: "UPSC 2030 IMP | 66 Months Ultimate Preparation | MentorsDaily",
    description: "Start your journey with UPSC 2030 Integrated Mentorship Program (IMP). 66 months comprehensive preparation covering Prelims, Mains & Interview. Get 100% fee refund after clearing Prelims, free hostel & library access, personalized 1:1 mentorship.",
    keywords: "UPSC 2030, integrated mentorship program 2030, IMP 2030, UPSC preparation 2030, civil services 2030, IAS preparation 2030, UPSC coaching 2030, mentorship program, prelims mains interview preparation, personalized mentorship, UPSC course 2030, best UPSC coaching, UPSC online course, civil services exam preparation, UPSC study plan, expert guidance UPSC, answer writing evaluation, UPSC mock tests, free hostel library UPSC, fee refund guarantee UPSC, UPSC success program, comprehensive UPSC preparation, UPSC mentorship 2030, UPSC guidance program, UPSC CSE 2030, IAS exam 2030, civil services coaching, UPSC prelims 2030, UPSC mains 2030, UPSC interview 2030, best UPSC institute, UPSC online coaching, UPSC test series, UPSC current affairs, UPSC optional subject, UPSC answer writing, UPSC study material, UPSC preparation strategy, UPSC coaching online, UPSC foundation course, UPSC preparation tips, UPSC exam pattern, UPSC syllabus 2030, UPSC notification 2030, UPSC eligibility, UPSC age limit, UPSC attempt limit, UPSC prelims preparation, UPSC mains preparation, UPSC interview preparation, UPSC personality test, UPSC DAF preparation, UPSC optional preparation, UPSC GS preparation, UPSC essay writing, UPSC ethics paper, UPSC preparation books, UPSC NCERT books, UPSC standard books, UPSC reference books, UPSC magazines, UPSC newspapers, UPSC monthly magazines, UPSC year book, UPSC atlas, UPSC notes, UPSC video lectures, UPSC online classes, UPSC live classes, UPSC recorded classes, UPSC doubt clearing, UPSC student support, UPSC helpline, UPSC study group, UPSC peer learning, UPSC success stories, UPSC toppers, UPSC rank holders, UPSC interview experience, UPSC mains experience, UPSC prelims experience, UPSC journey, UPSC motivation, UPSC inspiration, UPSC success tips, UPSC time management, UPSC stress management, UPSC mental health, UPSC psychological support, UPSC emotional support, UPSC career guidance, UPSC career counseling, UPSC facilities, UPSC library, UPSC hostel, UPSC accommodation, UPSC faculty, UPSC teachers, UPSC experts, UPSC mentors, UPSC strategy, UPSC plan, UPSC schedule, UPSC timetable, UPSC daily plan, UPSC weekly plan, UPSC monthly plan, UPSC long-term plan, UPSC flexible plan, UPSC customized plan, UPSC personalized plan, UPSC curriculum, UPSC syllabus coverage, UPSC complete coverage, UPSC comprehensive preparation, UPSC complete course, UPSC comprehensive program, UPSC complete mentorship, UPSC complete guidance, UPSC complete support, UPSC complete training, UPSC complete coaching, UPSC complete education, UPSC complete learning, UPSC complete study, UPSC complete exam preparation, UPSC complete test preparation, UPSC complete competitive exam preparation",
    image: "/images/hero.webp",
  },
  "/login": {
    title: "Login - MentorsDaily | Access Your UPSC Preparation Dashboard",
    description: "Login to your MentorsDaily account and continue your UPSC preparation journey with personalized mentorship and study materials.",
    keywords: "UPSC login, MentorsDaily login, civil services dashboard, study progress",
    noindex: true,
  },
  "/mains-pyqs": {
    title: "UPSC Mains Previous Year Questions | MentorsDaily",
    description: "Practice UPSC mains previous year questions with structured guidance.",
    keywords: "UPSC mains PYQ, mains previous year questions, answer writing practice",
  },
  "/mentorship-courses": {
    title: "UPSC Mentorship Courses | Expert Guidance Programs | MentorsDaily",
    description: "Comprehensive UPSC mentorship courses with expert guidance, personalized study plans, and proven strategies for success.",
    keywords: "UPSC mentorship, expert guidance, personalized courses, study plans, success strategies",
  },
  "/mppsc-mentorship-2027": {
    title: "MPPSC 2027 Programme | MentorsDaily",
    description: "MPPSC 2027 daily mentorship — structured syllabus, module tests, MP state focus, and Razorpay enrolment at ₹35,000.",
    keywords: "MPPSC 2027, Madhya Pradesh PCS, state PCS, daily sessions, mentorship, MentorsDaily",
  },
  "/preparation-blogs": {
    title: "UPSC Preparation Blog | Tips, Strategies & Guidance | MentorsDaily",
    description: "Expert UPSC preparation tips, strategies, and guidance from successful candidates. Learn from the best to crack civil services.",
    keywords: "UPSC preparation tips, study strategies, exam guidance, success tips, preparation blog",
  },
  "/previous-year-papers": {
    title: "UPSC Previous Year Papers | Download PDFs | MentorsDaily",
    description: "Download UPSC previous year question papers for prelims and mains. Practice with real exam papers and improve your preparation.",
    keywords: "UPSC previous year papers, prelims papers, mains papers, question papers download",
  },
  "/privacy-policy": {
    title: "Privacy Policy - MentorsDaily | Data Protection & Privacy | UPSC Platform",
    description: "Read MentorsDaily's Privacy Policy to understand how we collect, use, and protect your personal information. Learn about our data protection practices, cookie usage, and your privacy rights as a UPSC aspirant using our platform.",
    keywords: "MentorsDaily privacy policy, data protection, UPSC platform privacy, user data security, privacy rights, cookie policy, data collection policy",
  },
  "/pyqs": {
    title: "UPSC PYQs | Prelims & Mains Questions | MentorsDaily",
    description: "Access UPSC previous year questions for prelims and mains practice.",
    keywords: "UPSC PYQ, previous year questions, prelims PYQ, mains PYQ",
  },
  "/refund-cancellation": {
    title: "Refund & Cancellation Policy - MentorsDaily | Payment Terms | UPSC Courses",
    description: "Understand MentorsDaily's Refund and Cancellation Policy for UPSC courses and mentorship programs. Learn about payment gateway responsibilities, refund review process, transaction documentation, and how to contact us for payment issues.",
    keywords: "MentorsDaily refund policy, cancellation policy, UPSC course refund, payment terms, refund process, cancellation terms, payment gateway, transaction ID",
  },
  "/register": {
    title: "Register - MentorsDaily | Start Your UPSC Journey Today",
    description: "Join thousands of successful UPSC aspirants with MentorsDaily. Get expert mentorship, comprehensive study materials, and personalized guidance.",
    keywords: "UPSC registration, join MentorsDaily, civil services preparation, mentorship signup",
  },
  "/success-stories": {
    title: "Success Stories - MentorsDaily | UPSC Toppers & Reviews",
    description: "Read inspiring success stories from UPSC aspirants who achieved their goals with MentorsDaily. Discover real testimonials and achievements from successful candidates who cleared civil services.",
    keywords: "MentorsDaily success stories, UPSC toppers, IAS success stories, student testimonials, UPSC achievements, mentorship success, civil services success, student reviews",
    image: "/images/hero.webp",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions - MentorsDaily | User Agreement | UPSC Platform Terms",
    description: "Read MentorsDaily's Terms and Conditions to understand the rules and guidelines for using our UPSC preparation platform. Learn about content ownership, registration requirements, payment terms, and user conduct policies.",
    keywords: "MentorsDaily terms and conditions, UPSC platform terms, user agreement, terms of service, platform rules, content ownership, registration terms",
  },
  "/uppcs-mentorship": {
    title: "UPPCS 2026 Programme | MentorsDaily",
    description: "Structured UPPCS 2026 batch — syllabus tree, module tests, mentor review, and MentorsDaily portal. Complete and Prelims Booster tracks.",
    keywords: "UPPCS 2026, UPPSC, state PCS, Prelims, Mains, mentorship, MentorsDaily",
  },
  "/uppcs-mentorship-2027": {
    title: "UPPCS 2027 Programme | MentorsDaily",
    description: "Structured UPPCS 2027 batch — syllabus tree, module tests, mentor review, and MentorsDaily portal. Complete and Prelims Booster tracks.",
    keywords: "UPPCS 2027, UPPSC, state PCS, Prelims, Mains, mentorship, MentorsDaily",
  },
  "/upsc-age-calculator": {
    title: "UPSC Age Calculator 2026 - Check IAS Eligibility & Attempts",
    description: "Use MentorsDaily UPSC Age Calculator to instantly check IAS eligibility, UPSC age limit, category relaxation, and remaining attempts for UPSC CSE 2026.",
    keywords: "UPSC Age Calculator, IAS Age Calculator, UPSC Eligibility Calculator, UPSC Age Limit Calculator, UPSC Attempt Calculator, IAS Eligibility Checker, UPSC Eligibility by DOB, UPSC Age Criteria, UPSC Age Limit for OBC, UPSC Age Limit for SC ST, UPSC Age Limit for General",
    image: "/images/hero.webp",
  },
  "/upsc-syllabus": {
    title: "UPSC Syllabus | Complete Syllabus Guide | MentorsDaily",
    description: "Complete UPSC syllabus for prelims, mains, and interview. Detailed subject-wise syllabus with preparation tips.",
    keywords: "UPSC syllabus, prelims syllabus, mains syllabus, civil services syllabus",
  },
};

export const BLOG_SEO: Record<string, BlogSeoEntry> = {
  "answer-writing-tips": {
    title: "UPSC Answer Writing Tips | Mains Preparation Strategy | MentorsDaily",
    description: "Master UPSC answer writing with expert tips and techniques. Improve your mains performance with structured answer writing strategies.",
    keywords: "UPSC answer writing, mains preparation, writing skills, answer structure, exam techniques",
    ogType: "article" as const,
    image: "/images/blog-answer-writing.webp",
  },
  "books-every-upsc-aspirant-must-read": {
    title: "Essential Books for UPSC Preparation | Must-Read Books | MentorsDaily",
    description: "Comprehensive list of essential books for UPSC preparation. Subject-wise recommendations and reading strategies.",
    keywords: "UPSC books, essential books, subject books, reading list, preparation books",
    ogType: "article" as const,
    image: "/images/blog-book.webp",
  },
  "cracking-upsc-first-attempt": {
    title: "How to Crack UPSC in First Attempt | Success Strategy | MentorsDaily",
    description: "Proven strategies to crack UPSC in your first attempt. Expert tips, study plans, and success stories from toppers.",
    keywords: "crack UPSC first attempt, success strategy, topper tips, first attempt success",
    ogType: "article" as const,
    image: "/images/blog-crack-first.webp",
  },
  "difference-prelims-mains": {
    title: "Difference Between UPSC Prelims and Mains | Preparation Strategy | MentorsDaily",
    description: "Understand the key differences between UPSC prelims and mains. Preparation strategies, syllabus differences, and exam patterns.",
    keywords: "UPSC prelims vs mains, exam differences, preparation strategy, syllabus comparison",
    ogType: "article" as const,
    image: "/images/blog-prelimsvsmains.webp",
  },
  "effective-revision-techniques": {
    title: "Effective Revision Techniques for UPSC | Study Strategies | MentorsDaily",
    description: "Master the art of revision for UPSC preparation. Learn effective revision strategies, time management, and retention techniques.",
    keywords: "UPSC revision, study techniques, revision strategy, exam preparation, study methods",
    ogType: "article" as const,
    image: "/images/blog-technic.webp",
  },
  "free-resources-upsc-preparation": {
    title: "Free Resources for UPSC Preparation | Study Materials | MentorsDaily",
    description: "Comprehensive list of free resources for UPSC preparation. Access quality study materials, books, and online resources without cost.",
    keywords: "free UPSC resources, study materials, free books, online resources, preparation materials",
    ogType: "article" as const,
    image: "/images/blog-resouces.webp",
  },
  "how-to-balance-job-upsc-preparation": {
    title: "How to Balance Job and UPSC Preparation | Working Professional Tips | MentorsDaily",
    description: "Essential strategies for working professionals preparing for UPSC. Time management, study planning, and maintaining work-study balance.",
    keywords: "job and UPSC preparation, working professional, time management, work-study balance",
    ogType: "article" as const,
    image: "/images/blog-balance.webp",
  },
  "how-to-boost-memory": {
    title: "How to Boost Memory for UPSC Preparation | Memory Techniques | MentorsDaily",
    description: "Effective memory enhancement techniques for UPSC preparation. Learn proven methods to improve retention and recall during exams.",
    keywords: "memory techniques, UPSC memory, retention tips, study memory, exam preparation",
    ogType: "article" as const,
    image: "/images/blog-boost.webp",
  },
  "how-to-deal-with-stress": {
    title: "How to Deal with UPSC Preparation Stress | Mental Health Tips | MentorsDaily",
    description: "Essential tips to manage stress during UPSC preparation. Mental health guidance, stress management techniques, and maintaining work-life balance.",
    keywords: "UPSC stress management, mental health, preparation stress, work-life balance, stress relief",
    ogType: "article" as const,
    image: "/images/blog-stress.webp",
  },
  "how-to-prepare-upsc-2025-in-100-days": {
    title: "How to Prepare UPSC 2025 in 100 Days | Complete Strategy | MentorsDaily",
    description: "Comprehensive 100-day strategy for UPSC 2025 preparation. Time management, study plan, and expert tips for last-minute preparation.",
    keywords: "UPSC 100 days preparation, last minute strategy, time management, quick preparation",
    ogType: "article" as const,
    image: "/images/blog-100days.webp",
  },
  "how-to-start-upsc-2026-preparation": {
    title: "How to Start UPSC 2026 Preparation | Complete Beginner Guide | MentorsDaily",
    description: "Complete beginner guide to start UPSC 2026 preparation. Step-by-step approach, study plan, and expert guidance for newcomers.",
    keywords: "UPSC 2026 preparation, beginner guide, start preparation, study plan, new aspirants",
    ogType: "article" as const,
    image: "/images/blog-preparation.webp",
  },
  "timetable-for-upsc-aspirants": {
    title: "Perfect Timetable for UPSC Aspirants | Daily Study Schedule | MentorsDaily",
    description: "Create an effective daily study timetable for UPSC preparation. Time management tips, subject allocation, and productivity strategies.",
    keywords: "UPSC timetable, study schedule, time management, daily routine, productivity tips",
    ogType: "article" as const,
    image: "/images/blog-timetable.webp",
  },
  "top-5-mistakes-upsc-preparation": {
    title: "Top 5 Mistakes in UPSC Preparation | Avoid Common Pitfalls | MentorsDaily",
    description: "Learn about common mistakes in UPSC preparation and how to avoid them. Expert guidance to improve your preparation strategy.",
    keywords: "UPSC preparation mistakes, common errors, preparation pitfalls, study mistakes",
    ogType: "article" as const,
    image: "/images/blog-mistake.webp",
  },
  "upsc-mains-result-2024": {
    title: "UPSC Mains Result 2024 | Analysis & Next Steps | MentorsDaily",
    description: "Complete analysis of UPSC Mains 2024 results. Understand trends, cut-offs, and preparation strategies for interview.",
    keywords: "UPSC mains 2024 result, result analysis, interview preparation, mains cut-off",
    ogType: "article" as const,
    image: "/images/blog-mains.webp",
  },
  "upsc-prelims-2025-answer-key": {
    title: "UPSC Prelims 2025 Answer Key | Expected Cut-off | MentorsDaily",
    description: "Get UPSC Prelims 2025 answer key with detailed explanations. Check expected cut-off and analyze your performance.",
    keywords: "UPSC prelims 2025 answer key, cut-off analysis, prelims results, answer explanations",
    ogType: "article" as const,
    image: "/images/blog-prelim.webp",
  },
};
