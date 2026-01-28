import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "../../../components/SEO/SEOHead";
import Form from "../components/Form";

const testimonials = [
  {
    name: "Neha Tiwari",
    location: "Varanasi",
    text: "UPPCS Mentorship 2025 was a turning point in my preparation. The program understood that UPPCS is different from UPSC - different pattern, different emphasis. Govind Sir's personalized approach helped me focus on the right topics. The weekly strategy sessions and doubt clearing were exactly what I needed.",
  },
  {
    name: "Rohit Chauhan",
    location: "Meerut",
    text: "As someone preparing for UPPCS 2025, I was confused about the syllabus differences from UPSC. MentorsDaily cleared all my doubts. Digvijay Sir's mentorship was exceptional - he understood UPPCS pattern deeply and helped me create a winning strategy. The mock interviews were particularly helpful.",
  },
  {
    name: "Poonam Singh",
    location: "Agra",
    text: "MentorsDaily के UPPCS Mentorship Program ने मेरी तैयारी को नया मोड़ दिया। अमृत सिंह सर के साथ अंग्रेजी और CSAT की तैयारी आसान हो गई। गोविंद सर के जवाब लिखने के टिप्स ने मेरे writing को बहुत सुधारा। UPPCS 2025 के लिए यह सबसे अच्छा mentorship है।",
  },
  {
    name: "Amitesh Kumar",
    location: "Allahabad",
    text: "The UPPCS Mentorship Program 2025 gave me the competitive edge I needed. Unlike generic UPSC coaching, this program focused specifically on UPPCS requirements. Amrit Sir's current affairs sessions and Govind Sir's answer evaluation helped me understand the exam's nuances. The personalized attention made all the difference.",
  },
  {
    name: "Shreya Gupta",
    location: "Noida",
    text: "Working professional होने के बावजूद UPPCS की तैयारी संभालना मुश्किल था। MentorsDaily का mentorship program perfect balance प्रदान करता है। Flexible timing, regular feedback, और personalized guidance - सब कुछ मिला। Govind Sir की mentorship से न सिर्फ preparation सुधरी बल्कि confidence भी बढ़ा।",
  },
];

const timeline = [
  {
    title: "Orientation",
    period: "Week 1",
    points: [
      "1:1 onboarding call with mentor",
      "Strength-weakness analysis",
      "Personalized roadmap setup",
    ],
  },
  {
    title: "Foundation",
    period: "Month 1–2",
    points: [
      "Weekly study plan + tracker",
      "NCERT-based test series",
      "Doubt-clearing sessions",
    ],
  },
  {
    title: "Prelims Phase",
    period: "Month 3–5",
    points: [
      "Full-length Prelims test series",
      "Weekly GS+CSAT assessments",
      "Analysis-based feedback",
    ],
  },
  {
    title: "Pre-Mains Transition",
    period: "5 Days Post Prelims",
    points: [
      "Focused GS Paper 1–4 review",
      "Answer Writing sprint + past PYQ focus",
      "Mentor strategy call",
    ],
  },
  {
    title: "Mains Focus",
    period: "Month 6–8",
    points: [
      "Weekly Mains Answer Writing + Evaluations",
      "Essay templates + practice",
      "Peer discussion",
    ],
  },
  {
    title: "Interview",
    period: "Post-Mains",
    points: [
      "Mock interviews",
      "DAF worksheet & review",
      "Confidence building & mindset mentoring",
    ],
  },
];

const keyFeatures = [
  {
    title: "Personalized 1:1 Mentorship",
    description: "Dedicated mentor to guide you based on your strengths, weaknesses, and goals.",
    image: "/images/personal.png"
  },
  {
    title: "Strategic Study Plans",
    description: "Weekly study plans tailored to UPPCS syllabus with structured timeline.",
    image: "/images/statgy.png"
  },
  {
    title: "Expert Answer Evaluation",
    description: "Comprehensive answer writing evaluation with detailed feedback and improvement strategies.",
    image: "/images/feedback.png"
  },
  {
    title: "Emotional & Mental Support",
    description: "Stay grounded and consistent with emotional support during tough preparation days.",
    image: "/images/emotional.png"
  },
  {
    title: "Mock Tests & Performance Analysis",
    description: "Regular mock tests with detailed performance analysis and improvement roadmap.",
    image: "/images/support.png"
  },
  {
    title: "Doubt Resolution & Guidance",
    description: "Quick support for academic or strategic doubts via call or message anytime you need it.",
    image: "/images/professtional.png"
  }
];

export default function UPPCSMentorshipProgram() {
  const location = useLocation();
  const [showForm, setShowForm] = useState(false);

  // Prevent body scroll when form is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showForm]);

  return (
    <>
      <SEOHead pathname={location.pathname} />
      <main className="min-h-screen bg-white">
      {/* Enhanced Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-white via-blue-50 to-white py-8 lg:py-12 overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232563eb' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        {/* Animated Blur Circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg border border-blue-100 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-blue-700 font-semibold text-sm tracking-wide">
                State PCS Preparation Program
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
              UPPCS Mentorship Program
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">

              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-6 font-medium">
              Crack UPPCS with a Plan Built Just for You
            </p>

            {/* Benefits Banner */}
            <div className="bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-lg p-3 md:p-4 mb-6 shadow-lg max-w-2xl mx-auto">
              <div className="space-y-1.5 md:space-y-2">
                <p className="text-sm md:text-base font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <span className="text-green-600">✓</span> One-on-one mentorship with expert mentors
                </p>
                <p className="text-sm md:text-base font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <span className="text-green-600">✓</span> Customized study plans tailored to your needs
                </p>
              </div>
            </div>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
              One-on-one mentorship, customized study plans, emotional guidance, and expert answer writing evaluation — designed for serious aspirants aiming for UPPCS success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <button
                onClick={() => setShowForm(true)}
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden text-center"
              >
                <span className="relative z-10">Book Your Free Mentorship Call</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </button>
              <a
                href="#program-highlights"
                className="inline-flex items-center justify-center gap-3 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Content Section Below Hero */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-blue-100 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                The UPPCS Mentorship Program by MentorsDaily
              </h3>
              <div className="space-y-3 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  Preparing for UPPCS is different from UPSC. The syllabus might overlap, but the approach, the strategy, and the focus areas are unique. That's why we created a program specifically for UPPCS aspirants - one that understands what you need and delivers it.
                </p>
                <p>
                  Here's the thing - most coaching centers treat UPPCS as a smaller version of UPSC. But that's not how it works. UPPCS has its own pattern, its own emphasis areas, and its own way of testing candidates. Our mentors know this because they've been through it themselves. They know what works, what doesn't, and how to help you crack it.
                </p>
                <p>
                  Your mentor will work with you to understand your background, your strengths, and your goals. They'll create a study plan that makes sense for UPPCS, not a generic UPSC plan. They'll help you focus on the right topics, practice the right kind of questions, and develop the skills that actually matter for this exam.
                </p>
                <p className="font-semibold text-gray-900 text-base md:text-lg">
                  This isn't just another coaching program.{" "}
                  <em className="text-blue-600">
                    It's mentorship that understands UPPCS, understands you, and helps you succeed.
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Program is Different Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3da7] mb-4">
              Why This Program is Different?
            </h2>
            <div className="w-32 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover what makes our UPPCS mentorship program unique and effective
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl p-6 md:p-8 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-5">
                    <img
                      src={feature.image}
                      alt={`${feature.title} - ${feature.description} for UPPCS 2025 Preparation`}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Key Features
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Everything you need for comprehensive UPPCS preparation
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                Personalized 1:1 mentorship approach
              </h3>
              <p className="text-gray-700">
                Dedicated mentor to guide you based on your strengths, weaknesses, and goals.
              </p>
            </div>
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                Weekly study plans tailored to UPPCS syllabus
              </h3>
              <p className="text-gray-700">
                Structured plans aligned with exam stages, ensuring timely syllabus completion.
              </p>
            </div>
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                Daily and weekly accountability check-ins
              </h3>
              <p className="text-gray-700">
                Stay consistent and motivated with regular progress tracking and gentle nudges.
              </p>
            </div>
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                Mains Answer Writing with evaluation
              </h3>
              <p className="text-gray-700">
                Practice writing quality answers with expert evaluation to improve structure and content.
              </p>
            </div>
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                Mock Tests + Regular feedback loop
              </h3>
              <p className="text-gray-700">
                Simulate real exam pressure and get actionable insights from your performance.
              </p>
            </div>
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                Doubt resolution via call/message
              </h3>
              <p className="text-gray-700">
                Quick support system for academic or strategic doubts — anytime you need it.
              </p>
            </div>
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                Mental well-being & balance support
              </h3>
              <p className="text-gray-700">
                Support for emotional health and routine balance to prevent burnout.
              </p>
            </div>
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                PYQ + Detailed Topic Mastery Guidance
              </h3>
              <p className="text-gray-700">
                Focused sessions on mastering past year trends and high-yield topics effectively.
              </p>
            </div>
            <div className="text-center space-y-2 bg-blue-50 p-6 rounded-xl">
              <h3 className="font-bold text-indigo-700 text-lg">
                Personality Test readiness (if applicable)
              </h3>
              <p className="text-gray-700">
                Personalized DAF review, mock interviews, and grooming for the final stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights Section */}
      <section id="program-highlights" className="py-12 md:py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Program Highlights
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover what makes our UPPCS Mentorship Program unique and effective
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-2">
            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-200 hover:border-blue-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Structured Timeline</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Complete coverage from Orientation to Interview with structured timeline designed for UPPCS success</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 hover:border-green-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Personalized Approach</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Customized study plans and mentorship tailored to your individual needs and goals</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-200 hover:border-purple-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Continuous Evaluation</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Regular assessments and detailed feedback to track your improvement journey</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-200 hover:border-orange-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Expert Mentors</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Learn from experienced mentors who understand UPPCS pattern and requirements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Timeline Section */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Structured Timeline for Success
            </h2>
            <div className="w-32 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              A clear roadmap from orientation to interview
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {timeline.map((step) => {
              const highlight = step.points?.[0];
              const rest = step.points?.slice(1) || [];
              return (
                <div
                  key={step.title}
                  className="bg-white border-2 border-blue-600 rounded-xl shadow-sm hover:shadow-md transition p-6 flex flex-col"
                >
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-extrabold text-blue-700">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-medium">{step.period}</p>
                  </div>
                  {highlight && (
                    <p className="text-center text-red-600 font-semibold leading-relaxed mb-4">
                      {highlight}
                    </p>
                  )}
                  {rest.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {rest.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Continuous Evaluation System */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Continuous Evaluation System: Built for Real Progress
            </h2>
            <div className="w-32 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Track your progress and improve continuously with our comprehensive evaluation system
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white border-2 border-blue-600 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg md:text-xl font-extrabold text-blue-700 text-center mb-3">
                Regular Mains Copy Evaluation
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
                <li>
                  Line-by-line feedback to improve content, structure, and presentation.
                </li>
                <li>
                  Highlight repetitive errors and weak introductions/conclusions.
                </li>
                <li>Compare with model answers and toppers' strategies.</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-white border-2 border-blue-600 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg md:text-xl font-extrabold text-blue-700 text-center mb-3">
                Topic-Wise Mastery Tracking
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Evaluate performance across GS topics (History, Polity, etc.), data-based questions, and expression quality.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border-2 border-blue-600 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg md:text-xl font-extrabold text-blue-700 text-center mb-3">
                Peer Benchmarking Insights
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Anonymous benchmarking shows where you lead or lag, enabling healthy competition without pressure.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border-2 border-blue-600 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg md:text-xl font-extrabold text-blue-700 text-center mb-3">
                Prelims Practice Test Reviews
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
                <li>
                  Error analysis of logic, silly mistakes, and knowledge gaps.
                </li>
                <li>Weekly review sessions to think like the examiner.</li>
                <li>Personalized suggestions to tweak your approach.</li>
              </ul>
            </div>

            {/* Card 5 */}
            <div className="bg-white border-2 border-blue-600 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg md:text-xl font-extrabold text-blue-700 text-center mb-3">
                Weekly Review Call With Mentor
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
                <li>Review past progress and modify the plan if needed.</li>
                <li>Discuss emotional challenges, exam anxiety, or burnout.</li>
                <li>Get clear action steps for the next week.</li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="bg-white border-2 border-blue-600 rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-lg md:text-xl font-extrabold text-blue-700 text-center mb-3">
                Track Your Progress
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                We track syllabus coverage (Prelims + Mains), answer-writing frequency and quality, and test performance trends. You get a visual report every 2 weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Prepare With a Mentor Who Cares?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Book a free mentorship call to get your personalized UPPCS roadmap.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-block bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-100 transition-all duration-300 text-lg"
          >
            Book Your Free Mentorship Call
          </button>
        </div>
      </section>

      {/* Who This Program is For */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Who This Program is For?
            </h2>
            <div className="w-32 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Find out if this program is the right fit for you
            </p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src="/images/repeaters.png"
                alt="Repeaters illustration"
                className="w-40 h-40 object-contain mb-4"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-blue-700 font-semibold mb-2 text-lg">Repeaters</h3>
              <p className="text-gray-700 text-sm">
                Perfect for those who've tried before and now seek clear strategy, feedback, and structure to avoid repeating past mistakes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src="/images/professtional.png"
                alt="Working professional illustration"
                className="w-40 h-40 object-contain mb-4"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-blue-700 font-semibold mb-2 text-lg">
                Working Professionals
              </h3>
              <p className="text-gray-700 text-sm">
                Ideal for busy aspirants needing time‑efficient plans and consistent mentorship to stay on track.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src="/images/fresher.png"
                alt="Freshers illustration"
                className="w-40 h-40 object-contain mb-4"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-blue-700 font-semibold mb-2 text-lg">Freshers</h3>
              <p className="text-gray-700 text-sm">
                For those feeling lost in the vast UPPCS syllabus — start smart, not stressed.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
              <img
                src="/images/support.png"
                alt="Emotional and academic support illustration"
                className="w-40 h-40 object-contain mb-4"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-blue-700 font-semibold mb-2 text-lg">
                Emotional & Academic Support
              </h3>
              <p className="text-gray-700 text-sm">
                Made for students who want guidance beyond study material, with steady mental strength and focus.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3da7] mb-4">
              Aspirants Who Transformed Their UPPCS Journey
            </h2>
            <div className="w-32 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
          </div>
          {/* Masonry layout using CSS columns to avoid large gaps */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className={`${
                  idx === 3
                    ? "bg-indigo-700 text-white"
                    : "bg-gradient-to-br from-blue-50 to-indigo-50"
                } border-2 border-blue-600 rounded-xl p-6 shadow-md flex flex-col break-inside-avoid mb-6 w-full hover:shadow-xl transition-all duration-300`}
              >
                <p className="leading-relaxed mb-6 flex-1">{t.text}</p>
                <div className="mt-auto pt-4 border-t border-blue-100/60">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="text-sm opacity-80">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        id="contact"
        className="py-16 bg-gradient-to-r from-blue-500 to-indigo-500 text-center"
      >
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6">Your UPPCS 2025 Starts Here</h2>
          <p className="text-lg text-blue-100 mb-8">
            You've waited long enough. It's time to move from confusion to clarity — with expert support and a plan that works for{" "}
            <span className="font-bold text-white">you</span>.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdrO7Wu8AOc48jWf7Moj0vnKuZmMPs04Kkm2GkwtTqQy2UkDg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get in Touch
          </a>
          <div className="mt-8 text-blue-100">
            <p>B-69, Block B, Noida Sector 2, Noida, Uttar Pradesh 201301</p>
            <p>Call: +91 8766233193 | Email: contact@mentorsdaily.com</p>
          </div>
        </div>
      </section>
      </main>

      {/* Form Modal */}
      {showForm && (
        <Form onClose={() => setShowForm(false)} />
      )}
    </>
  );
}
