// SEO utility functions for MentorsDaily
export const SEO_CONFIG = {
  siteName: 'MentorsDaily',
  siteUrl: 'https://mentorsdaily.com',
  defaultTitle: 'MentorsDaily - UPSC Preparation & Mentorship Platform',
  defaultDescription: 'Comprehensive UPSC preparation platform with expert mentorship, courses, study materials, and personalized guidance for civil services aspirants.',
  defaultKeywords: 'UPSC, civil services, IAS preparation, mentorship, study materials, current affairs, prelims, mains, interview',
  author: 'MentorsDaily Team',
  twitterHandle: '@mentorsdaily',
  facebookAppId: 'your-facebook-app-id',
  googleSiteVerification: 'your-google-verification-code'
};

export const stripHTML = (html = "") => {
  try {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  } catch {
    return String(html).replace(/<[^>]*>/g, '');
  }
};

// Decode HTML entities (e.g., &amp; to &, &lt; to <, etc.)
export const decodeHtmlEntities = (text = "") => {
  if (!text) return "";
  try {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  } catch {
    // Fallback: manually decode common entities
    return String(text)
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');
  }
};

// Generate an SEO-friendly slug from a string
export const slugify = (text = "") => {
  try {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, "") // remove non-letters/numbers except space and hyphen
      .replace(/\s+/g, "-") // collapse whitespace to single hyphen
      .replace(/-+/g, "-"); // collapse multiple hyphens
  } catch {
    return "";
  }
};

// Page-specific SEO data
export const PAGE_SEO_DATA = {
  '/': {
    title: 'MentorsDaily - Best UPSC Preparation Platform | Expert Mentorship',
    description: 'Join MentorsDaily for comprehensive UPSC preparation with expert mentorship, personalized courses, study materials, and proven strategies to crack civil services exam.',
    keywords: 'UPSC preparation, IAS coaching, civil services mentorship, UPSC courses, study materials, current affairs, prelims preparation, mains preparation',
    canonical: '/',
    ogImage: '/images/hero.png'
  },
  '/login': {
    title: 'Login - MentorsDaily | Access Your UPSC Preparation Dashboard',
    description: 'Login to your MentorsDaily account and continue your UPSC preparation journey with personalized mentorship and study materials.',
    keywords: 'UPSC login, MentorsDaily login, civil services dashboard, study progress',
    canonical: '/login'
  },
  '/register': {
    title: 'Register - MentorsDaily | Start Your UPSC Journey Today',
    description: 'Join thousands of successful UPSC aspirants with MentorsDaily. Get expert mentorship, comprehensive study materials, and personalized guidance.',
    keywords: 'UPSC registration, join MentorsDaily, civil services preparation, mentorship signup',
    canonical: '/register'
  },
  '/uppcs-mentorship': {
    title: 'UPPCS Mentorship 2025 | State PCS Preparation | MentorsDaily',
    description: 'Comprehensive UPPCS preparation program for 2025 with expert mentorship, study materials, and personalized guidance for state civil services.',
    keywords: 'UPPCS 2025, state PCS preparation, UPPSC mentorship, state civil services, PCS coaching',
    canonical: '/uppcs-mentorship'
  },
  '/integrated-mentorship': {
    title: 'Integrated Mentorship Program | Complete UPSC Preparation | MentorsDaily',
    description: 'Comprehensive integrated mentorship program covering all aspects of UPSC preparation - prelims, mains, and interview with expert guidance.',
    keywords: 'integrated UPSC preparation, complete mentorship, prelims mains interview, comprehensive coaching',
    canonical: '/integrated-mentorship'
  },
  '/integrated-mentorship-2026': {
    title: 'UPSC 2026 IMP | 18 Months Complete Preparation | MentorsDaily',
    description: 'Join UPSC 2026 Integrated Mentorship Program (IMP). 18 months comprehensive preparation covering Prelims, Mains & Interview. Get 100% fee refund after clearing Prelims, free hostel & library access, personalized 1:1 mentorship.',
    keywords: 'UPSC 2026, integrated mentorship program, IMP 2026, UPSC preparation 2026, civil services 2026, IAS preparation 2026, UPSC coaching 2026, mentorship program, prelims mains interview preparation, personalized mentorship, UPSC course 2026, best UPSC coaching, UPSC online course, civil services exam preparation, UPSC study plan, expert guidance UPSC, answer writing evaluation, UPSC mock tests, free hostel library UPSC, fee refund guarantee UPSC, UPSC success program, comprehensive UPSC preparation, UPSC mentorship 2026, UPSC guidance program, UPSC CSE 2026, IAS exam 2026, civil services coaching, UPSC prelims 2026, UPSC mains 2026, UPSC interview 2026, best UPSC institute, UPSC online coaching, UPSC test series, UPSC current affairs, UPSC optional subject, UPSC answer writing, UPSC study material, UPSC preparation strategy, UPSC coaching online, UPSC foundation course, UPSC preparation tips, UPSC exam pattern, UPSC syllabus 2026, UPSC notification 2026, UPSC eligibility, UPSC age limit, UPSC attempt limit, UPSC prelims preparation, UPSC mains preparation, UPSC interview preparation, UPSC personality test, UPSC DAF preparation, UPSC optional preparation, UPSC GS preparation, UPSC essay writing, UPSC ethics paper, UPSC preparation books, UPSC NCERT books, UPSC standard books, UPSC reference books, UPSC magazines, UPSC newspapers, UPSC monthly magazines, UPSC year book, UPSC atlas, UPSC notes, UPSC video lectures, UPSC online classes, UPSC live classes, UPSC recorded classes, UPSC doubt clearing, UPSC student support, UPSC helpline, UPSC study group, UPSC peer learning, UPSC success stories, UPSC toppers, UPSC rank holders, UPSC interview experience, UPSC mains experience, UPSC prelims experience, UPSC journey, UPSC motivation, UPSC inspiration, UPSC success tips, UPSC time management, UPSC stress management, UPSC mental health, UPSC psychological support, UPSC emotional support, UPSC career guidance, UPSC career counseling, UPSC facilities, UPSC library, UPSC hostel, UPSC accommodation, UPSC faculty, UPSC teachers, UPSC experts, UPSC mentors, UPSC strategy, UPSC plan, UPSC schedule, UPSC timetable, UPSC daily plan, UPSC weekly plan, UPSC monthly plan, UPSC long-term plan, UPSC flexible plan, UPSC customized plan, UPSC personalized plan, UPSC curriculum, UPSC syllabus coverage, UPSC complete coverage, UPSC comprehensive preparation, UPSC complete course, UPSC comprehensive program, UPSC complete mentorship, UPSC complete guidance, UPSC complete support, UPSC complete training, UPSC complete coaching, UPSC complete education, UPSC complete learning, UPSC complete study, UPSC complete exam preparation, UPSC complete test preparation, UPSC complete competitive exam preparation',
    canonical: '/integrated-mentorship-2026',
    ogImage: '/images/hero.png'
  },
  '/integrated-mentorship-2027': {
    title: 'UPSC 2027 IMP | 30 Months Early Start Program | MentorsDaily',
    description: 'Start early with UPSC 2027 Integrated Mentorship Program (IMP). 30 months comprehensive program perfect for freshers and working professionals. Build strong foundation with flexible schedule, comprehensive coverage from basics to interview.',
    keywords: 'UPSC 2027, integrated mentorship program 2027, IMP 2027, early UPSC preparation, UPSC for freshers, working professional UPSC, UPSC foundation course, 30 months UPSC program, flexible UPSC schedule, UPSC early start, civil services 2027, IAS preparation 2027, UPSC coaching 2027, beginner UPSC course, UPSC foundation building, long-term UPSC preparation, UPSC mentorship 2027, comprehensive UPSC program, UPSC guidance 2027, UPSC CSE 2027, IAS exam 2027, civil services coaching 2027, UPSC prelims 2027, UPSC mains 2027, UPSC interview 2027, best UPSC institute 2027, UPSC online coaching 2027, UPSC test series 2027, UPSC current affairs 2027, UPSC optional subject 2027, UPSC answer writing 2027, UPSC study material 2027, UPSC preparation strategy 2027, UPSC coaching online 2027, UPSC mentorship program 2027, UPSC foundation course 2027, UPSC preparation tips 2027, UPSC exam pattern 2027, UPSC syllabus 2027, UPSC notification 2027, UPSC eligibility 2027, UPSC age limit 2027, UPSC attempt limit 2027, UPSC prelims preparation 2027, UPSC mains preparation 2027, UPSC interview preparation 2027, UPSC personality test 2027, UPSC DAF preparation 2027, UPSC optional preparation 2027, UPSC GS preparation 2027, UPSC essay writing 2027, UPSC ethics paper 2027, UPSC preparation books 2027, UPSC NCERT books 2027, UPSC standard books 2027, UPSC reference books 2027, UPSC magazines 2027, UPSC newspapers 2027, UPSC monthly magazines 2027, UPSC year book 2027, UPSC atlas 2027, UPSC notes 2027, UPSC video lectures 2027, UPSC online classes 2027, UPSC live classes 2027, UPSC recorded classes 2027, UPSC doubt clearing 2027, UPSC student support 2027, UPSC helpline 2027, UPSC study group 2027, UPSC peer learning 2027, UPSC success stories 2027, UPSC toppers 2027, UPSC rank holders 2027, UPSC interview experience 2027, UPSC mains experience 2027, UPSC prelims experience 2027, UPSC journey 2027, UPSC motivation 2027, UPSC inspiration 2027, UPSC success tips 2027, UPSC time management 2027, UPSC stress management 2027, UPSC mental health 2027, UPSC psychological support 2027, UPSC emotional support 2027, UPSC career guidance 2027, UPSC career counseling 2027, UPSC facilities 2027, UPSC library 2027, UPSC hostel 2027, UPSC accommodation 2027, UPSC faculty 2027, UPSC teachers 2027, UPSC experts 2027, UPSC mentors 2027, UPSC strategy 2027, UPSC plan 2027, UPSC schedule 2027, UPSC timetable 2027, UPSC daily plan 2027, UPSC weekly plan 2027, UPSC monthly plan 2027, UPSC long-term plan 2027, UPSC flexible plan 2027, UPSC customized plan 2027, UPSC personalized plan 2027, UPSC curriculum 2027, UPSC syllabus coverage 2027, UPSC complete coverage 2027, UPSC comprehensive preparation 2027, UPSC complete course 2027, UPSC comprehensive program 2027, UPSC complete mentorship 2027, UPSC complete guidance 2027, UPSC complete support 2027, UPSC complete training 2027, UPSC complete coaching 2027, UPSC complete education 2027, UPSC complete learning 2027, UPSC complete study 2027, UPSC complete exam preparation 2027, UPSC complete test preparation 2027, UPSC complete competitive exam preparation 2027',
    canonical: '/integrated-mentorship-2027',
    ogImage: '/images/hero.png'
  },
  '/integrated-mentorship-2028': {
    title: 'UPSC 2028 IMP | 42 Months Long-term Strategy | MentorsDaily',
    description: 'Plan ahead with UPSC 2028 Integrated Mentorship Program (IMP). 42 months comprehensive long-term preparation with deep subject mastery, multiple attempt strategy, optional subject specialization, and advanced answer writing techniques.',
    keywords: 'UPSC 2028, integrated mentorship program 2028, IMP 2028, long-term UPSC preparation, UPSC multiple attempts, UPSC optional subject, deep subject mastery UPSC, advanced answer writing, UPSC strategy 2028, civil services 2028, IAS preparation 2028, UPSC coaching 2028, comprehensive UPSC program, UPSC foundation course, UPSC mentorship 2028, UPSC guidance program, UPSC preparation strategy, multiple attempt UPSC, optional subject UPSC, UPSC long-term course, UPSC CSE 2028, IAS exam 2028, civil services coaching 2028, UPSC prelims 2028, UPSC mains 2028, UPSC interview 2028, best UPSC institute 2028, UPSC online coaching 2028, UPSC test series 2028, UPSC current affairs 2028, UPSC optional subject 2028, UPSC answer writing 2028, UPSC study material 2028, UPSC preparation strategy 2028, UPSC coaching online 2028, UPSC mentorship program 2028, UPSC foundation course 2028, UPSC preparation tips 2028, UPSC exam pattern 2028, UPSC syllabus 2028, UPSC notification 2028, UPSC eligibility 2028, UPSC age limit 2028, UPSC attempt limit 2028, UPSC prelims preparation 2028, UPSC mains preparation 2028, UPSC interview preparation 2028, UPSC personality test 2028, UPSC DAF preparation 2028, UPSC optional preparation 2028, UPSC GS preparation 2028, UPSC essay writing 2028, UPSC ethics paper 2028, UPSC preparation books 2028, UPSC NCERT books 2028, UPSC standard books 2028, UPSC reference books 2028, UPSC magazines 2028, UPSC newspapers 2028, UPSC monthly magazines 2028, UPSC year book 2028, UPSC atlas 2028, UPSC notes 2028, UPSC video lectures 2028, UPSC online classes 2028, UPSC live classes 2028, UPSC recorded classes 2028, UPSC doubt clearing 2028, UPSC student support 2028, UPSC helpline 2028, UPSC study group 2028, UPSC peer learning 2028, UPSC success stories 2028, UPSC toppers 2028, UPSC rank holders 2028, UPSC interview experience 2028, UPSC mains experience 2028, UPSC prelims experience 2028, UPSC journey 2028, UPSC motivation 2028, UPSC inspiration 2028, UPSC success tips 2028, UPSC time management 2028, UPSC stress management 2028, UPSC mental health 2028, UPSC psychological support 2028, UPSC emotional support 2028, UPSC career guidance 2028, UPSC career counseling 2028, UPSC facilities 2028, UPSC library 2028, UPSC hostel 2028, UPSC accommodation 2028, UPSC faculty 2028, UPSC teachers 2028, UPSC experts 2028, UPSC mentors 2028, UPSC strategy 2028, UPSC plan 2028, UPSC schedule 2028, UPSC timetable 2028, UPSC daily plan 2028, UPSC weekly plan 2028, UPSC monthly plan 2028, UPSC long-term plan 2028, UPSC flexible plan 2028, UPSC customized plan 2028, UPSC personalized plan 2028, UPSC curriculum 2028, UPSC syllabus coverage 2028, UPSC complete coverage 2028, UPSC comprehensive preparation 2028, UPSC complete course 2028, UPSC comprehensive program 2028, UPSC complete mentorship 2028, UPSC complete guidance 2028, UPSC complete support 2028, UPSC complete training 2028, UPSC complete coaching 2028, UPSC complete education 2028, UPSC complete learning 2028, UPSC complete study 2028, UPSC complete exam preparation 2028, UPSC complete test preparation 2028, UPSC complete competitive exam preparation 2028',
    canonical: '/integrated-mentorship-2028',
    ogImage: '/images/hero.png'
  },
  '/integrated-mentorship-2029': {
    title: 'UPSC 2029 IMP | 54 Months Complete Preparation | MentorsDaily',
    description: 'Join UPSC 2029 Integrated Mentorship Program (IMP). 54 months comprehensive preparation covering Prelims, Mains & Interview. Get 100% fee refund after clearing Prelims, free hostel & library access, personalized 1:1 mentorship.',
    keywords: 'UPSC 2029, integrated mentorship program 2029, IMP 2029, UPSC preparation 2029, civil services 2029, IAS preparation 2029, UPSC coaching 2029, mentorship program, prelims mains interview preparation, personalized mentorship, UPSC course 2029, best UPSC coaching, UPSC online course, civil services exam preparation, UPSC study plan, expert guidance UPSC, answer writing evaluation, UPSC mock tests, free hostel library UPSC, fee refund guarantee UPSC, UPSC success program, comprehensive UPSC preparation, UPSC mentorship 2029, UPSC guidance program, UPSC CSE 2029, IAS exam 2029, civil services coaching, UPSC prelims 2029, UPSC mains 2029, UPSC interview 2029, best UPSC institute, UPSC online coaching, UPSC test series, UPSC current affairs, UPSC optional subject, UPSC answer writing, UPSC study material, UPSC preparation strategy, UPSC coaching online, UPSC foundation course, UPSC preparation tips, UPSC exam pattern, UPSC syllabus 2029, UPSC notification 2029, UPSC eligibility, UPSC age limit, UPSC attempt limit, UPSC prelims preparation, UPSC mains preparation, UPSC interview preparation, UPSC personality test, UPSC DAF preparation, UPSC optional preparation, UPSC GS preparation, UPSC essay writing, UPSC ethics paper, UPSC preparation books, UPSC NCERT books, UPSC standard books, UPSC reference books, UPSC magazines, UPSC newspapers, UPSC monthly magazines, UPSC year book, UPSC atlas, UPSC notes, UPSC video lectures, UPSC online classes, UPSC live classes, UPSC recorded classes, UPSC doubt clearing, UPSC student support, UPSC helpline, UPSC study group, UPSC peer learning, UPSC success stories, UPSC toppers, UPSC rank holders, UPSC interview experience, UPSC mains experience, UPSC prelims experience, UPSC journey, UPSC motivation, UPSC inspiration, UPSC success tips, UPSC time management, UPSC stress management, UPSC mental health, UPSC psychological support, UPSC emotional support, UPSC career guidance, UPSC career counseling, UPSC facilities, UPSC library, UPSC hostel, UPSC accommodation, UPSC faculty, UPSC teachers, UPSC experts, UPSC mentors, UPSC strategy, UPSC plan, UPSC schedule, UPSC timetable, UPSC daily plan, UPSC weekly plan, UPSC monthly plan, UPSC long-term plan, UPSC flexible plan, UPSC customized plan, UPSC personalized plan, UPSC curriculum, UPSC syllabus coverage, UPSC complete coverage, UPSC comprehensive preparation, UPSC complete course, UPSC comprehensive program, UPSC complete mentorship, UPSC complete guidance, UPSC complete support, UPSC complete training, UPSC complete coaching, UPSC complete education, UPSC complete learning, UPSC complete study, UPSC complete exam preparation, UPSC complete test preparation, UPSC complete competitive exam preparation',
    canonical: '/integrated-mentorship-2029',
    ogImage: '/images/hero.png'
  },
  '/integrated-mentorship-2030': {
    title: 'UPSC 2030 IMP | 66 Months Ultimate Preparation | MentorsDaily',
    description: 'Start your journey with UPSC 2030 Integrated Mentorship Program (IMP). 66 months comprehensive preparation covering Prelims, Mains & Interview. Get 100% fee refund after clearing Prelims, free hostel & library access, personalized 1:1 mentorship.',
    keywords: 'UPSC 2030, integrated mentorship program 2030, IMP 2030, UPSC preparation 2030, civil services 2030, IAS preparation 2030, UPSC coaching 2030, mentorship program, prelims mains interview preparation, personalized mentorship, UPSC course 2030, best UPSC coaching, UPSC online course, civil services exam preparation, UPSC study plan, expert guidance UPSC, answer writing evaluation, UPSC mock tests, free hostel library UPSC, fee refund guarantee UPSC, UPSC success program, comprehensive UPSC preparation, UPSC mentorship 2030, UPSC guidance program, UPSC CSE 2030, IAS exam 2030, civil services coaching, UPSC prelims 2030, UPSC mains 2030, UPSC interview 2030, best UPSC institute, UPSC online coaching, UPSC test series, UPSC current affairs, UPSC optional subject, UPSC answer writing, UPSC study material, UPSC preparation strategy, UPSC coaching online, UPSC foundation course, UPSC preparation tips, UPSC exam pattern, UPSC syllabus 2030, UPSC notification 2030, UPSC eligibility, UPSC age limit, UPSC attempt limit, UPSC prelims preparation, UPSC mains preparation, UPSC interview preparation, UPSC personality test, UPSC DAF preparation, UPSC optional preparation, UPSC GS preparation, UPSC essay writing, UPSC ethics paper, UPSC preparation books, UPSC NCERT books, UPSC standard books, UPSC reference books, UPSC magazines, UPSC newspapers, UPSC monthly magazines, UPSC year book, UPSC atlas, UPSC notes, UPSC video lectures, UPSC online classes, UPSC live classes, UPSC recorded classes, UPSC doubt clearing, UPSC student support, UPSC helpline, UPSC study group, UPSC peer learning, UPSC success stories, UPSC toppers, UPSC rank holders, UPSC interview experience, UPSC mains experience, UPSC prelims experience, UPSC journey, UPSC motivation, UPSC inspiration, UPSC success tips, UPSC time management, UPSC stress management, UPSC mental health, UPSC psychological support, UPSC emotional support, UPSC career guidance, UPSC career counseling, UPSC facilities, UPSC library, UPSC hostel, UPSC accommodation, UPSC faculty, UPSC teachers, UPSC experts, UPSC mentors, UPSC strategy, UPSC plan, UPSC schedule, UPSC timetable, UPSC daily plan, UPSC weekly plan, UPSC monthly plan, UPSC long-term plan, UPSC flexible plan, UPSC customized plan, UPSC personalized plan, UPSC curriculum, UPSC syllabus coverage, UPSC complete coverage, UPSC comprehensive preparation, UPSC complete course, UPSC comprehensive program, UPSC complete mentorship, UPSC complete guidance, UPSC complete support, UPSC complete training, UPSC complete coaching, UPSC complete education, UPSC complete learning, UPSC complete study, UPSC complete exam preparation, UPSC complete test preparation, UPSC complete competitive exam preparation',
    canonical: '/integrated-mentorship-2030',
    ogImage: '/images/hero.png'
  },
  '/previous-year-papers': {
    title: 'UPSC Previous Year Papers | Download PDFs | MentorsDaily',
    description: 'Download UPSC previous year question papers for prelims and mains. Practice with real exam papers and improve your preparation.',
    keywords: 'UPSC previous year papers, prelims papers, mains papers, question papers download',
    canonical: '/previous-year-papers'
  },
  '/free-study-materials': {
    title: 'Free UPSC Study Materials | NCERTs, Books & Resources | MentorsDaily',
    description: 'Access free UPSC study materials including NCERTs, reference books, current affairs, and comprehensive study resources.',
    keywords: 'free UPSC materials, NCERT books, study resources, current affairs, free downloads',
    canonical: '/free-study-materials'
  },
  '/upsc-syllabus': {
    title: 'UPSC Syllabus | Complete Syllabus Guide | MentorsDaily',
    description: 'Complete UPSC syllabus for prelims, mains, and interview. Detailed subject-wise syllabus with preparation tips.',
    keywords: 'UPSC syllabus, prelims syllabus, mains syllabus, civil services syllabus',
    canonical: '/upsc-syllabus'
  },
  '/download-ncerts': {
    title: 'Download NCERT Books for UPSC | Free PDFs | MentorsDaily',
    description: 'Download all NCERT books for UPSC preparation in PDF format. Essential foundation books for civil services preparation.',
    keywords: 'NCERT books download, UPSC NCERTs, free PDF books, foundation books',
    canonical: '/download-ncerts'
  },
  '/upsc-preparation-blog': {
    title: 'UPSC Preparation Blog | Tips, Strategies & Guidance | MentorsDaily',
    description: 'Expert UPSC preparation tips, strategies, and guidance from successful candidates. Learn from the best to crack civil services.',
    keywords: 'UPSC preparation tips, study strategies, exam guidance, success tips, preparation blog',
    canonical: '/upsc-preparation-blog'
  },
  '/currentAffairs': {
    title: 'Daily Current Affairs for UPSC Exam - Latest News | MentorsDaily',
    description: 'Comprehensive daily current affairs for UPSC 2025 preparation. Expert-curated news analysis organized by GS papers (GS1, GS2, GS3, GS4) with date-wise and paper-wise filtering. Perfect for prelims and mains exam preparation.',
    keywords: 'daily current affairs UPSC, UPSC current affairs 2025, current affairs for UPSC exam, GS paper current affairs, GS1 current affairs, GS2 current affairs, GS3 current affairs, GS4 current affairs, latest news for UPSC, current events UPSC, news analysis UPSC, civil services current affairs, IAS current affairs, UPSC preparation current affairs, daily news analysis, important current affairs, UPSC exam current affairs, prelims current affairs, mains current affairs, UPSC news today, current affairs for civil services, UPSC daily news, UPSC current affairs analysis, expert insights UPSC, current affairs syllabus, UPSC 2025 preparation, smart organization current affairs, date-wise current affairs, paper-wise current affairs, comprehensive current affairs, in-depth analysis UPSC, contemporary issues UPSC, static syllabus current affairs, history culture current affairs, geography environment current affairs, polity governance current affairs, international relations UPSC, economy development UPSC, science technology UPSC, social issues justice UPSC, ethics integrity UPSC, disaster management UPSC',
    canonical: '/currentAffairs',
    ogImage: '/images/hero.png'
  },
  '/MentorshipCourses': {
    title: 'UPSC Mentorship Courses | Expert Guidance Programs | MentorsDaily',
    description: 'Comprehensive UPSC mentorship courses with expert guidance, personalized study plans, and proven strategies for success.',
    keywords: 'UPSC mentorship, expert guidance, personalized courses, study plans, success strategies',
    canonical: '/MentorshipCourses'
  },
  '/about-us': {
    title: 'About Us - MentorsDaily | Leading UPSC Platform',
    description: 'Learn about MentorsDaily - India\'s leading UPSC preparation platform. Discover our vision, mission, and commitment to empowering civil services aspirants with expert mentorship and personalized guidance.',
    keywords: 'about MentorsDaily, UPSC coaching platform, civil services mentorship, IAS preparation, UPSC about us, mentorship platform, UPSC success stories, expert guidance UPSC',
    canonical: '/about-us',
    ogImage: '/images/hero.png'
  },
  '/contact-us': {
    title: 'Contact Us - MentorsDaily | UPSC Mentorship Support',
    description: 'Contact MentorsDaily for UPSC mentorship inquiries and support. Reach us at B-69, Block B, Noida Sector 2, Noida, UP 201301. Call +91 8766233193 or email contact@mentorsdaily.com.',
    keywords: 'contact MentorsDaily, UPSC mentorship contact, IAS coaching contact, civil services support, MentorsDaily phone number, UPSC inquiry, mentorship help, contact UPSC coaching',
    canonical: '/contact-us',
    ogImage: '/images/hero.png'
  },
  '/privacy-policy': {
    title: 'Privacy Policy - MentorsDaily | Data Protection & Privacy | UPSC Platform',
    description: 'Read MentorsDaily\'s Privacy Policy to understand how we collect, use, and protect your personal information. Learn about our data protection practices, cookie usage, and your privacy rights as a UPSC aspirant using our platform.',
    keywords: 'MentorsDaily privacy policy, data protection, UPSC platform privacy, user data security, privacy rights, cookie policy, data collection policy',
    canonical: '/privacy-policy'
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions - MentorsDaily | User Agreement | UPSC Platform Terms',
    description: 'Read MentorsDaily\'s Terms and Conditions to understand the rules and guidelines for using our UPSC preparation platform. Learn about content ownership, registration requirements, payment terms, and user conduct policies.',
    keywords: 'MentorsDaily terms and conditions, UPSC platform terms, user agreement, terms of service, platform rules, content ownership, registration terms',
    canonical: '/terms-and-conditions'
  },
  '/refund-cancellation': {
    title: 'Refund & Cancellation Policy - MentorsDaily | Payment Terms | UPSC Courses',
    description: 'Understand MentorsDaily\'s Refund and Cancellation Policy for UPSC courses and mentorship programs. Learn about payment gateway responsibilities, refund review process, transaction documentation, and how to contact us for payment issues.',
    keywords: 'MentorsDaily refund policy, cancellation policy, UPSC course refund, payment terms, refund process, cancellation terms, payment gateway, transaction ID',
    canonical: '/refund-cancellation'
  },
  '/careers': {
    title: 'Careers at MentorsDaily | Join Our Team | UPSC Education Jobs',
    description: 'Join MentorsDaily and be part of India\'s leading UPSC preparation platform. Explore career opportunities in content development, mentorship, business development, video editing, digital marketing, graphics design, and software development. Make a difference in students\' lives.',
    keywords: 'MentorsDaily careers, UPSC education jobs, mentorship jobs, content developer jobs, education technology careers, UPSC platform jobs, join MentorsDaily team',
    canonical: '/careers',
    ogImage: '/images/hero.png'
  },
  '/success-stories': {
    title: 'Success Stories - MentorsDaily | UPSC Toppers & Reviews',
    description: 'Read inspiring success stories from UPSC aspirants who achieved their goals with MentorsDaily. Discover real testimonials and achievements from successful candidates who cleared civil services.',
    keywords: 'MentorsDaily success stories, UPSC toppers, IAS success stories, student testimonials, UPSC achievements, mentorship success, civil services success, student reviews',
    canonical: '/success-stories',
    ogImage: '/images/hero.png'
  }
};

// Blog-specific SEO data
export const BLOG_SEO_DATA = {
  '/blogs/upsc-prelims-2025-answer-key': {
    title: 'UPSC Prelims 2025 Answer Key | Expected Cut-off | MentorsDaily',
    description: 'Get UPSC Prelims 2025 answer key with detailed explanations. Check expected cut-off and analyze your performance.',
    keywords: 'UPSC prelims 2025 answer key, cut-off analysis, prelims results, answer explanations',
    canonical: '/blogs/upsc-prelims-2025-answer-key'
  },
  '/blogs/upsc-mains-result-2024': {
    title: 'UPSC Mains Result 2024 | Analysis & Next Steps | MentorsDaily',
    description: 'Complete analysis of UPSC Mains 2024 results. Understand trends, cut-offs, and preparation strategies for interview.',
    keywords: 'UPSC mains 2024 result, result analysis, interview preparation, mains cut-off',
    canonical: '/blogs/upsc-mains-result-2024'
  },
  '/blogs/how-to-prepare-upsc-2025-in-100-days': {
    title: 'How to Prepare UPSC 2025 in 100 Days | Complete Strategy | MentorsDaily',
    description: 'Comprehensive 100-day strategy for UPSC 2025 preparation. Time management, study plan, and expert tips for last-minute preparation.',
    keywords: 'UPSC 100 days preparation, last minute strategy, time management, quick preparation',
    canonical: '/blogs/how-to-prepare-upsc-2025-in-100-days'
  },
  '/blogs/how-to-deal-with-stress': {
    title: 'How to Deal with UPSC Preparation Stress | Mental Health Tips | MentorsDaily',
    description: 'Essential tips to manage stress during UPSC preparation. Mental health guidance, stress management techniques, and maintaining work-life balance.',
    keywords: 'UPSC stress management, mental health, preparation stress, work-life balance, stress relief',
    canonical: '/blogs/how-to-deal-with-stress'
  },
  '/blogs/timetable-for-upsc-aspirants': {
    title: 'Perfect Timetable for UPSC Aspirants | Daily Study Schedule | MentorsDaily',
    description: 'Create an effective daily study timetable for UPSC preparation. Time management tips, subject allocation, and productivity strategies.',
    keywords: 'UPSC timetable, study schedule, time management, daily routine, productivity tips',
    canonical: '/blogs/timetable-for-upsc-aspirants'
  },
  '/blogs/answer-writing-tips': {
    title: 'UPSC Answer Writing Tips | Mains Preparation Strategy | MentorsDaily',
    description: 'Master UPSC answer writing with expert tips and techniques. Improve your mains performance with structured answer writing strategies.',
    keywords: 'UPSC answer writing, mains preparation, writing skills, answer structure, exam techniques',
    canonical: '/blogs/answer-writing-tips'
  },
  '/blogs/how-to-boost-memory': {
    title: 'How to Boost Memory for UPSC Preparation | Memory Techniques | MentorsDaily',
    description: 'Effective memory enhancement techniques for UPSC preparation. Learn proven methods to improve retention and recall during exams.',
    keywords: 'memory techniques, UPSC memory, retention tips, study memory, exam preparation',
    canonical: '/blogs/how-to-boost-memory'
  },
  '/blogs/effective-revision-techniques': {
    title: 'Effective Revision Techniques for UPSC | Study Strategies | MentorsDaily',
    description: 'Master the art of revision for UPSC preparation. Learn effective revision strategies, time management, and retention techniques.',
    keywords: 'UPSC revision, study techniques, revision strategy, exam preparation, study methods',
    canonical: '/blogs/effective-revision-techniques'
  },
  '/blogs/free-resources-upsc-preparation': {
    title: 'Free Resources for UPSC Preparation | Study Materials | MentorsDaily',
    description: 'Comprehensive list of free resources for UPSC preparation. Access quality study materials, books, and online resources without cost.',
    keywords: 'free UPSC resources, study materials, free books, online resources, preparation materials',
    canonical: '/blogs/free-resources-upsc-preparation'
  },
  '/blogs/how-to-balance-job-upsc-preparation': {
    title: 'How to Balance Job and UPSC Preparation | Working Professional Tips | MentorsDaily',
    description: 'Essential strategies for working professionals preparing for UPSC. Time management, study planning, and maintaining work-study balance.',
    keywords: 'job and UPSC preparation, working professional, time management, work-study balance',
    canonical: '/blogs/how-to-balance-job-upsc-preparation'
  },
  '/blogs/top-5-mistakes-upsc-preparation': {
    title: 'Top 5 Mistakes in UPSC Preparation | Avoid Common Pitfalls | MentorsDaily',
    description: 'Learn about common mistakes in UPSC preparation and how to avoid them. Expert guidance to improve your preparation strategy.',
    keywords: 'UPSC preparation mistakes, common errors, preparation pitfalls, study mistakes',
    canonical: '/blogs/top-5-mistakes-upsc-preparation'
  },
  '/blogs/cracking-upsc-first-attempt': {
    title: 'How to Crack UPSC in First Attempt | Success Strategy | MentorsDaily',
    description: 'Proven strategies to crack UPSC in your first attempt. Expert tips, study plans, and success stories from toppers.',
    keywords: 'crack UPSC first attempt, success strategy, topper tips, first attempt success',
    canonical: '/blogs/cracking-upsc-first-attempt'
  },
  '/blogs/books-every-upsc-aspirant-must-read': {
    title: 'Essential Books for UPSC Preparation | Must-Read Books | MentorsDaily',
    description: 'Comprehensive list of essential books for UPSC preparation. Subject-wise recommendations and reading strategies.',
    keywords: 'UPSC books, essential books, subject books, reading list, preparation books',
    canonical: '/blogs/books-every-upsc-aspirant-must-read'
  },
  '/blogs/difference-prelims-mains': {
    title: 'Difference Between UPSC Prelims and Mains | Preparation Strategy | MentorsDaily',
    description: 'Understand the key differences between UPSC prelims and mains. Preparation strategies, syllabus differences, and exam patterns.',
    keywords: 'UPSC prelims vs mains, exam differences, preparation strategy, syllabus comparison',
    canonical: '/blogs/difference-prelims-mains'
  },
  '/blogs/how-to-start-upsc-preparation-for-upsc-2026': {
    title: 'How to Start UPSC 2026 Preparation | Complete Beginner Guide | MentorsDaily',
    description: 'Complete beginner guide to start UPSC 2026 preparation. Step-by-step approach, study plan, and expert guidance for newcomers.',
    keywords: 'UPSC 2026 preparation, beginner guide, start preparation, study plan, new aspirants',
    canonical: '/blogs/how-to-start-upsc-preparation-for-upsc-2026'
  }
};

// Function to get SEO data for a specific page
export const getPageSEO = (pathname) => {
  // Check blog pages first
  if (pathname.startsWith('/blogs/')) {
    return BLOG_SEO_DATA[pathname] || {
      title: `${pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | MentorsDaily`,
      description: `Comprehensive guide on ${pathname.split('/').pop().replace(/-/g, ' ')} for UPSC preparation. Expert insights and strategies.`,
      keywords: 'UPSC preparation, study guide, exam tips, civil services',
      canonical: pathname
    };
  }
  
  // Check regular pages
  return PAGE_SEO_DATA[pathname] || {
    title: `${pathname.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | MentorsDaily`,
    description: `Access ${pathname.split('/').pop().replace(/-/g, ' ')} on MentorsDaily for comprehensive UPSC preparation.`,
    keywords: 'UPSC preparation, civil services, study materials, mentorship',
    canonical: pathname
  };
};

// Function to generate JSON-LD structured data
export const generateJSONLD = (pageData = {}, pathname) => {
  const baseUrl = SEO_CONFIG.siteUrl;
  const currentUrl = `${baseUrl}${pathname}`;
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "MentorsDaily",
    "url": baseUrl,
    "logo": `${baseUrl}/Logo/logo.png`,
    "description": "Comprehensive UPSC preparation platform with expert mentorship and study materials",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.facebook.com/mentorsdaily",
      "https://www.twitter.com/mentorsdaily",
      "https://www.linkedin.com/company/mentorsdaily"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MentorsDaily",
    "url": baseUrl,
    "description": "UPSC preparation platform with expert mentorship",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ]
  };

  // Add current page to breadcrumb
  if (pathname !== '/') {
    const pathSegments = pathname.split('/').filter(segment => segment);
    pathSegments.forEach((segment, index) => {
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        "item": `${baseUrl}/${pathSegments.slice(0, index + 1).join('/')}`
      });
    });
  }

  const schemas = [organizationSchema, websiteSchema, breadcrumbSchema];

  // Add CollectionPage schema for current affairs page
  if (pathname === '/currentAffairs') {
    const collectionPageSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageData.title || "Daily Current Affairs for UPSC 2025",
      "description": pageData.description || "Comprehensive daily current affairs for UPSC 2025 preparation with GS paper-wise organization",
      "url": currentUrl,
      "mainEntity": {
        "@type": "ItemList",
        "name": "UPSC Current Affairs Articles",
        "description": "Collection of daily current affairs articles for UPSC preparation, organized by GS papers and dates",
        "numberOfItems": "Multiple",
        "itemListElement": {
          "@type": "ListItem",
          "position": 1,
          "name": "Daily Current Affairs for UPSC"
        }
      },
      "about": {
        "@type": "Thing",
        "name": "UPSC Current Affairs",
        "description": "Daily news analysis and current events for civil services exam preparation"
      },
      "educationalUse": "UPSC Preparation",
      "learningResourceType": "Current Affairs Collection",
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "UPSC Aspirants"
      }
    };
    schemas.push(collectionPageSchema);

    // Add FAQ schema for common questions
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How to prepare current affairs for UPSC 2025?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To prepare current affairs for UPSC 2025, focus on daily news analysis, organize content by GS papers (GS1, GS2, GS3, GS4), maintain notes, revise regularly, and connect current events with static syllabus topics. Our platform provides comprehensive daily current affairs organized by GS papers and dates for systematic preparation."
          }
        },
        {
          "@type": "Question",
          "name": "Which GS paper covers which current affairs topics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GS1 covers history, geography, art and culture current affairs. GS2 covers polity, governance, international relations, and social justice. GS3 covers economy, environment, science and technology, disaster management, and security. GS4 covers ethics, integrity, and aptitude related current affairs. Our platform allows you to filter current affairs by specific GS papers."
          }
        },
        {
          "@type": "Question",
          "name": "How important are current affairs for UPSC exam?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Current affairs are extremely important for UPSC exam as they form a significant portion of both prelims and mains papers. Questions are often asked connecting current events with static syllabus topics. Regular reading and analysis of current affairs helps in answer writing, interview preparation, and overall understanding of contemporary issues."
          }
        },
        {
          "@type": "Question",
          "name": "How to filter current affairs by date and GS paper?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can filter current affairs by selecting a specific date using the date picker and choosing GS papers (GS1, GS2, GS3, GS4) or combinations from the filter sidebar. This helps you focus on specific topics and dates relevant to your preparation needs."
          }
        },
        {
          "@type": "Question",
          "name": "What topics are covered in daily current affairs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our daily current affairs cover all important topics including history, geography, polity, economy, environment, science and technology, international relations, governance, social issues, art and culture, ethics, and disaster management - all relevant for UPSC preparation."
          }
        }
      ]
    };
    schemas.push(faqSchema);
  }

  // Add AboutPage schema for About Us page
  if (pathname === '/about-us') {
    const aboutPageSchema = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": pageData.title || "About MentorsDaily",
      "description": pageData.description || "Learn about MentorsDaily - India's leading UPSC preparation platform",
      "url": currentUrl,
      "mainEntity": {
        "@type": "Organization",
        "name": "MentorsDaily",
        "description": "Comprehensive UPSC preparation platform with expert mentorship and study materials",
        "url": baseUrl,
        "logo": `${baseUrl}/Logo/logo.png`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "B-69, Block B, Noida Sector 2",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201301",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8766233193",
          "contactType": "customer service",
          "email": "contact@mentorsdaily.com",
          "availableLanguage": "English"
        }
      }
    };
    schemas.push(aboutPageSchema);
  }

  // Add ContactPage schema for Contact Us page
  if (pathname === '/contact-us') {
    const contactPageSchema = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": pageData.title || "Contact MentorsDaily",
      "description": pageData.description || "Contact MentorsDaily for UPSC mentorship inquiries and support",
      "url": currentUrl,
      "mainEntity": {
        "@type": "Organization",
        "name": "MentorsDaily",
        "telephone": "+91-8766233193",
        "email": "contact@mentorsdaily.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "B-69, Block B, Noida Sector 2",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201301",
          "addressCountry": "IN"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-8766233193",
            "contactType": "customer service",
            "email": "contact@mentorsdaily.com",
            "availableLanguage": "English",
            "areaServed": "IN"
          }
        ]
      }
    };
    schemas.push(contactPageSchema);
  }

  // Add WebPage schema for Privacy Policy
  if (pathname === '/privacy-policy') {
    const privacyPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pageData.title || "Privacy Policy",
      "description": pageData.description || "MentorsDaily Privacy Policy",
      "url": currentUrl,
      "isPartOf": {
        "@type": "WebSite",
        "name": "MentorsDaily",
        "url": baseUrl
      },
      "about": {
        "@type": "Thing",
        "name": "Privacy Policy",
        "description": "Data protection and privacy policy for MentorsDaily platform"
      }
    };
    schemas.push(privacyPageSchema);
  }

  // Add WebPage schema for Terms and Conditions
  if (pathname === '/terms-and-conditions') {
    const termsPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pageData.title || "Terms and Conditions",
      "description": pageData.description || "MentorsDaily Terms and Conditions",
      "url": currentUrl,
      "isPartOf": {
        "@type": "WebSite",
        "name": "MentorsDaily",
        "url": baseUrl
      },
      "about": {
        "@type": "Thing",
        "name": "Terms and Conditions",
        "description": "Terms of service and user agreement for MentorsDaily platform"
      }
    };
    schemas.push(termsPageSchema);
  }

  // Add WebPage schema for Refund Cancellation
  if (pathname === '/refund-cancellation') {
    const refundPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pageData.title || "Refund and Cancellation Policy",
      "description": pageData.description || "MentorsDaily Refund and Cancellation Policy",
      "url": currentUrl,
      "isPartOf": {
        "@type": "WebSite",
        "name": "MentorsDaily",
        "url": baseUrl
      },
      "about": {
        "@type": "Thing",
        "name": "Refund Policy",
        "description": "Refund and cancellation policy for MentorsDaily courses and services"
      }
    };
    schemas.push(refundPageSchema);
  }

  // Add JobPosting schema for Careers page
  if (pathname === '/careers') {
    const careersPageSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageData.title || "Careers at MentorsDaily",
      "description": pageData.description || "Join MentorsDaily team and make a difference in UPSC education",
      "url": currentUrl,
      "mainEntity": {
        "@type": "ItemList",
        "name": "Job Openings at MentorsDaily",
        "description": "Career opportunities in UPSC education and mentorship",
        "itemListElement": [
          {
            "@type": "JobPosting",
            "title": "Content Developer",
            "description": "Create engaging educational content for UPSC aspirants",
            "employmentType": "FULL_TIME",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "MentorsDaily",
              "sameAs": baseUrl
            }
          },
          {
            "@type": "JobPosting",
            "title": "Mentor",
            "description": "Guide and mentor UPSC aspirants in their preparation journey",
            "employmentType": "FULL_TIME",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "MentorsDaily",
              "sameAs": baseUrl
            }
          },
          {
            "@type": "JobPosting",
            "title": "Business Development Associate",
            "description": "Drive business growth by connecting with students and helping them choose the right mentorship programs",
            "employmentType": "FULL_TIME",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "MentorsDaily",
              "sameAs": baseUrl
            }
          }
        ]
      }
    };
    schemas.push(careersPageSchema);
  }

  // Add CollectionPage schema for Success Stories
  if (pathname === '/success-stories') {
    const successStoriesSchema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageData.title || "Success Stories",
      "description": pageData.description || "Success stories from UPSC aspirants who achieved their goals with MentorsDaily",
      "url": currentUrl,
      "mainEntity": {
        "@type": "ItemList",
        "name": "UPSC Success Stories",
        "description": "Testimonials and success stories from successful UPSC candidates",
        "numberOfItems": "1200+",
        "itemListElement": {
          "@type": "Review",
          "reviewBody": "Success stories from UPSC aspirants who cleared civil services with MentorsDaily mentorship",
          "author": {
            "@type": "Person",
            "name": "MentorsDaily Students"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        }
      },
      "about": {
        "@type": "Thing",
        "name": "UPSC Success Stories",
        "description": "Real testimonials and achievements from successful civil services candidates"
      }
    };
    schemas.push(successStoriesSchema);
  }

  // Add Course/EducationalProgram schema for Integrated Mentorship pages
  if (pathname === '/integrated-mentorship-2026' || pathname === '/integrated-mentorship-2027' || pathname === '/integrated-mentorship-2028' || pathname === '/integrated-mentorship-2029' || pathname === '/integrated-mentorship-2030') {
    const year = pathname.includes('2026') ? '2026' : pathname.includes('2027') ? '2027' : pathname.includes('2028') ? '2028' : pathname.includes('2029') ? '2029' : '2030';
    const duration = year === '2026' ? 'P18M' : year === '2027' ? 'P30M' : year === '2028' ? 'P42M' : year === '2029' ? 'P54M' : 'P66M';
    const durationText = year === '2026' ? '18 Months' : year === '2027' ? '30 Months' : year === '2028' ? '42 Months' : year === '2029' ? '54 Months' : '66 Months';
    
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": `Integrated Mentorship Program (IMP) ${year}`,
      "description": pageData.description || `Comprehensive UPSC ${year} preparation program with expert mentorship covering Prelims, Mains, and Interview`,
      "provider": {
        "@type": "EducationalOrganization",
        "name": "MentorsDaily",
        "url": baseUrl,
        "logo": `${baseUrl}/Logo/logo.png`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "B-69, Block B, Noida Sector 2",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "201301",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8766233193",
          "contactType": "customer service",
          "email": "contact@mentorsdaily.com"
        }
      },
      "courseCode": `IMP-${year}`,
      "educationalCredentialAwarded": "UPSC Civil Services Preparation Certificate",
      "timeRequired": duration,
      "coursePrerequisites": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "No prerequisites required"
      },
      "teaches": [
        "UPSC Prelims Preparation",
        "UPSC Mains Preparation",
        "UPSC Interview Preparation",
        "Answer Writing Skills",
        "Current Affairs Analysis",
        "Optional Subject Preparation",
        "Mock Test Practice",
        "Performance Analysis"
      ],
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student",
        "audienceType": "UPSC Aspirants"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": currentUrl,
        "priceValidUntil": `${year}-12-31`,
        "seller": {
          "@type": "EducationalOrganization",
          "name": "MentorsDaily"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "2500"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "UPSC Aspirants"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "reviewBody": "Excellent mentorship program with personalized guidance and comprehensive coverage"
        }
      ]
    };
    schemas.push(courseSchema);

    // Add FAQ schema for common questions
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is included in the Integrated Mentorship Program ${year}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The IMP ${year} program includes comprehensive coverage of Prelims, Mains, and Interview preparation. It features personalized 1:1 mentorship, strategic study plans, expert answer evaluation, emotional support, mock tests with performance analysis, and free hostel & library access for Mains and Interview preparation.`
          }
        },
        {
          "@type": "Question",
          "name": `How long is the Integrated Mentorship Program ${year}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The IMP ${year} program is a ${durationText} comprehensive program designed to provide complete coverage from Prelims to Interview with structured timeline and expert guidance.`
          }
        },
        {
          "@type": "Question",
          "name": "What is the fee refund policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer 100% fee refund guarantee after clearing Prelims. This demonstrates our confidence in the program's effectiveness and your success."
          }
        },
        {
          "@type": "Question",
          "name": "Is hostel and library access included?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, complimentary hostel and library facilities are provided for Mains and Interview preparation under expert guidance."
          }
        },
        {
          "@type": "Question",
          "name": "What makes this program different from other UPSC coaching?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Integrated Mentorship Program offers personalized 1:1 mentorship, weekly progress tracking, daily accountability, doubt resolution, and comprehensive support throughout your UPSC journey. We focus on individual learning pace and provide emotional support along with academic guidance."
          }
        }
      ]
    };
    schemas.push(faqSchema);
  }

  return schemas;
};

// SEO length constraints (characters)
export const SEO_LENGTHS = {
  TITLE_MAX: 60,        // Google displays ~50-60 chars (600px width)
  TITLE_OPTIMAL: 55,
  DESCRIPTION_MAX: 160, // Google displays ~150-160 chars (920px width)
  DESCRIPTION_OPTIMAL: 155,
  OG_TITLE_MAX: 60,
  OG_DESCRIPTION_MAX: 200,
  TWITTER_TITLE_MAX: 70,
  TWITTER_DESCRIPTION_MAX: 200
};

// Function to truncate text intelligently at word boundary
export const truncateText = (text, maxLength, suffix = '...') => {
  if (!text || text.length <= maxLength) return text;
  
  // Truncate at word boundary
  const truncated = text.substring(0, maxLength - suffix.length);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + suffix;
  }
  
  return truncated + suffix;
};

// Function to validate and optimize title length
export const optimizeTitle = (title, maxLength = SEO_LENGTHS.TITLE_MAX) => {
  if (!title) return SEO_CONFIG.defaultTitle;
  const clean = stripHTML(title);
  return truncateText(clean, maxLength);
};

// Function to validate and optimize description length
export const optimizeDescription = (description, maxLength = SEO_LENGTHS.DESCRIPTION_MAX) => {
  if (!description) return SEO_CONFIG.defaultDescription;
  const clean = stripHTML(description);
  return truncateText(clean, maxLength);
};

// Function to generate meta tags
export const generateMetaTags = (pageData, pathname) => {
  const baseUrl = SEO_CONFIG.siteUrl;
  const currentUrl = `${baseUrl}${pathname}`;
  const imageUrl = pageData.ogImage ? `${baseUrl}${pageData.ogImage}` : `${baseUrl}/images/hero.png`;

  // Optimize title and description lengths
  const optimizedTitle = optimizeTitle(pageData.title, SEO_LENGTHS.TITLE_MAX);
  const optimizedDescription = optimizeDescription(pageData.description, SEO_LENGTHS.DESCRIPTION_MAX);
  
  // OG title can be slightly longer, description can be up to 200 chars
  const ogTitle = optimizeTitle(pageData.title, SEO_LENGTHS.OG_TITLE_MAX);
  const ogDescription = optimizeDescription(pageData.description, SEO_LENGTHS.OG_DESCRIPTION_MAX);
  
  // Twitter title can be up to 70 chars, description up to 200
  const twitterTitle = optimizeTitle(pageData.title, SEO_LENGTHS.TWITTER_TITLE_MAX);
  const twitterDescription = optimizeDescription(pageData.description, SEO_LENGTHS.TWITTER_DESCRIPTION_MAX);

  return {
    title: optimizedTitle,
    description: optimizedDescription,
    keywords: pageData.keywords,
    canonical: currentUrl,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: currentUrl,
      siteName: SEO_CONFIG.siteName,
      image: imageUrl,
      type: 'website',
      locale: 'en_IN'
    },
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitterHandle,
      title: twitterTitle,
      description: twitterDescription,
      image: imageUrl
    }
  };
};
