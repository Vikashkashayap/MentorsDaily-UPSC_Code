import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "../../../components/SEO/SEOHead";
import Form from "../components/Form";
import { getCourses } from "../../../api/coreService";
import PaymentForm from "../../../components/payment/PaymentForm";

// Prelims Content Component
function PrelimsContent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fadeIn">
      <div className="flex justify-center w-full">
        <img
          src="/images/prelims.png"
        alt="UPSC Prelims Preparation Features - Comprehensive Prelims Study Plan, Mock Tests, Current Affairs Coverage for Civil Services Exam 2029"
          className="w-full h-auto max-w-none md:max-w-5xl rounded-none sm:rounded-xl shadow-none sm:shadow-lg sm:hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

// Mains Content Component
function MainsContent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fadeIn">
      <div className="flex justify-center w-full">
        <img
          src="/images/mains.png"
          alt="UPSC Mains Preparation Features - Answer Writing Practice, Essay Writing, Optional Subject Guidance, GS Paper Coverage for Civil Services Mains Exam 2029"
          className="w-full h-auto max-w-none md:max-w-5xl rounded-none sm:rounded-xl shadow-none sm:shadow-lg sm:hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

// Interview Content Component
function InterviewContent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fadeIn">
      <div className="flex justify-center w-full">
        <img
          src="/images/interview.png"
          alt="UPSC Interview Preparation Features - Personality Test Guidance, Mock Interviews, DAF Preparation, Communication Skills Training for Civil Services Final Stage"
          className="w-full h-auto max-w-none md:max-w-5xl rounded-none sm:rounded-xl shadow-none sm:shadow-lg sm:hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

// Mentorship Content Component
function MentorshipContent() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fadeIn">
      <div className="flex justify-center w-full">
        <img
          src="/images/mentorships.png"
          alt="Personalized UPSC Mentorship Program - 1:1 Mentorship, Expert Guidance, Study Plan Customization, Performance Tracking for Civil Services Aspirants"
          className="w-full h-auto max-w-none md:max-w-5xl rounded-none sm:rounded-xl shadow-none sm:shadow-lg sm:hover:scale-105 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

const keyFeatures = [
  {
    title: "Personalized 1:1 Mentorship",
    description: "Dedicated mentor to guide you based on your strengths, weaknesses, and goals.",
    image: "/images/personal.png"
  },
  {
    title: "Strategic Study Plans",
    description: "Weekly study plans tailored to UPSC CSE 2029 syllabus with structured timeline.",
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
    title: "Free Hostel & Library Access",
    description: "Complimentary hostel and library facilities for Mains and Interview preparation.",
    image: "/images/professtional.png"
  }
];

const testimonials = [
  {
    name: "Tanvi Agarwal",
    location: "Nagpur",
    text: "IMP 2029's 54-month journey is transforming how I approach UPSC. With this much time, I'm not just preparing for an exam - I'm building a knowledge foundation for life. My mentor helps me connect dots between subjects and understand the bigger picture. The program's philosophy is different from regular coaching.",
    rating: 5
  },
  {
    name: "Siddharth Rao",
    location: "Bhopal",
    text: "Planning for UPSC 2029 with a 54-month program means I can take sabbaticals, handle personal commitments, and still stay on track. The mentorship includes career counseling and life planning alongside exam preparation. It's holistic development, not just exam coaching.",
    rating: 5
  },
  {
    name: "Nandini Chatterjee",
    location: "Guwahati",
    text: "The 54-month timeline of IMP 2029 allows me to pursue parallel interests and build diverse experiences. My mentor encourages interdisciplinary learning and real-world application of knowledge. This program is for those who see UPSC as a means to serve, not just a career goal.",
    rating: 5
  }
];

export default function IMPPage() {
  const [activeTab, setActiveTab] = useState("prelims");
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Fetch course data based on year
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourses();
        const coursesData = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        
        // Find course matching "Integrated" and "2029"
        const foundCourse = coursesData.find(c => {
          const title = (c.title || '').toLowerCase();
          return title.includes('integrated') && title.includes('2029');
        });
        
        if (foundCourse) {
          setCourse(foundCourse);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  // Prevent body scroll when payment form is open
  useEffect(() => {
    if (showPaymentForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPaymentForm]);

  const handleEnrollClick = () => {
    if (course) {
      setShowPaymentForm(true);
    } else if (!loading) {
      // If course is not loaded and not loading, show enquiry form instead
      setShowEnquiryForm(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    // Optionally redirect or show success message
  };

  const handleClosePayment = () => {
    setShowPaymentForm(false);
  };

  // Pricing calculations
  const basePrice = course?.basePrice || 0;
  const sellingPrice = course?.sellingPrice || course?.basePrice || 0;
  const discountPercentage = course?.discountPercentage || 0;
  const savings = basePrice - sellingPrice;

  const formatPrice = (p) => (p === 0 ? "Free" : `₹${p?.toLocaleString?.('en-IN')}`);

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
              <span className="text-blue-700 font-semibold text-sm tracking-wide">Most Popular Program</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-gray-900">
              Integrated Mentorship Program
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                (IMP) 2029
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-6 font-medium">
              54 Months | Complete UPSC CSE 2029 Preparation
            </p>

            {/* Benefits Banner */}
            <div className="bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-lg p-3 md:p-4 mb-6 shadow-lg max-w-2xl mx-auto">
              <div className="space-y-1.5 md:space-y-2">
                <p className="text-sm md:text-base font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <span className="text-green-600">✓</span> Get 100% Fee Refund after Clearing Prelims!
                </p>
                <p className="text-sm md:text-base font-semibold text-gray-800 flex items-center justify-center gap-2">
                  <span className="text-green-600">✓</span> Free Hostel & Library facilities for Mains and Interview
                </p>
              </div>
            </div>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
              When we started building <strong className="text-gray-900">IMP – the Integrated Mentorship Program</strong>, we weren't chasing trends. We were listening to students.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <button
                onClick={handleEnrollClick}
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden text-center"
              >
                <span className="relative z-10">Enroll Now</span>
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
                The IMP Program by MentorsDaily
              </h3>
              <div className="space-y-3 text-gray-600 leading-relaxed text-sm md:text-base">
                <p>
                  UPSC 2029 might seem far away, but trust us - time flies when you're preparing. That's why starting now with a 54-month program makes perfect sense. You'll have enough time to cover everything thoroughly, practice extensively, and still maintain your sanity.
                </p>
                <p>
                  What we've learned from years of mentoring students is this: the ones who succeed aren't necessarily the smartest. They're the ones who stay consistent, get the right guidance, and don't give up when things get difficult. That's exactly what this program helps you with - consistency, guidance, and resilience.
                </p>
                <p>
                  Your mentor becomes your partner in this journey. They'll help you navigate through the vast syllabus, prioritize what's important, and keep you accountable. When you're doing well, they'll push you to do better. When you're struggling, they'll help you get back on track. And throughout it all, they'll make sure you're not just studying, but actually learning and growing.
                </p>
                <p className="font-semibold text-gray-900 text-base md:text-lg">
                  Success in UPSC isn't about working harder.{" "}
                  <em className="text-blue-600">
                    It's about working smarter, staying consistent, and having the right support system by your side.
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Image Section (below Hero) */}
      <section className="py-8 lg:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-0 sm:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-[#1a3da7] mb-6">
                What's really standing between you and your best attempt?
              </h2>
              <img
                src="/images/best-attemp.png"
                alt="Common UPSC Preparation Challenges - Identify and Overcome Obstacles in Your Civil Services Exam Journey with Expert Mentorship"
                className="w-full h-auto mx-auto rounded-none sm:rounded-xl shadow-none sm:shadow-lg max-w-none md:max-w-5xl"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Pricing Card - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Course Details</h3>
                  
                  {loading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-8 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  ) : course ? (
                    <>
                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                          {discountPercentage > 0 && basePrice > 0 && (
                            <span className="text-gray-400 text-lg line-through">
                              {formatPrice(basePrice)}
                            </span>
                          )}
                          <span className="text-3xl font-bold text-blue-600">
                            {formatPrice(sellingPrice)}
                          </span>
                          {discountPercentage > 0 && (
                            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                              {discountPercentage}% OFF
                            </span>
                          )}
                        </div>
                        {savings > 0 && (
                          <p className="text-green-600 font-semibold text-sm">
                            Save {formatPrice(savings)}
                          </p>
                        )}
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <button
                          onClick={handleEnrollClick}
                          className="block w-full bg-blue-600 text-white text-center font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                          {sellingPrice === 0 ? "Start Learning Free" : "Enroll Now"}
                        </button>
                        <button
                          onClick={() => setShowEnquiryForm(true)}
                          className="block w-full bg-white border-2 border-blue-600 text-blue-600 text-center font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-gray-500 py-4">
                      <p className="text-sm">Course details loading...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose IMP 2029 Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3da7] mb-4">
              Why Choose IMP 2029?
            </h2>
            <div className="w-32 h-1 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover the unique features that make our program the perfect choice for your UPSC journey
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
                      alt={`${feature.title} - ${feature.description} for UPSC 2029 Preparation`}
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

      {/* Program Highlights Section */}
      <section id="program-highlights" className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Program Highlights
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Discover what makes our Integrated Mentorship Program unique and effective
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
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">54 Months Comprehensive Program</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Complete coverage from Prelims to Interview with structured timeline</p>
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
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">100% Fee Refund Guarantee</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Get your complete fee back after clearing Prelims - our confidence in your success</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-purple-200 hover:border-purple-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Free Hostel & Library Access</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Complimentary facilities for Mains and Interview preparation under expert guidance</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-200 hover:border-orange-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Weekly Progress Tracking</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Regular assessments and detailed feedback to track your improvement journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMP Program Structure Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            What is included in the IMP Program?
          </h2>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center bg-gray-100 rounded-lg p-1 gap-2">
              {[
                { id: "prelims", label: "Prelims" },
                { id: "mains", label: "Mains" },
                { id: "interview", label: "Interview" },
                { id: "mentorship", label: "Mentorship" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px] flex justify-center">
            {activeTab === "prelims" && <PrelimsContent />}
            {activeTab === "mains" && <MainsContent />}
            {activeTab === "interview" && <InterviewContent />}
            {activeTab === "mentorship" && <MentorshipContent />}
          </div>
        </div>
      </section>

      

      {/* Additional Benefits Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Additional Benefits
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Unique advantages that set our program apart and support your success
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-2">
            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-indigo-200 hover:border-indigo-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Daily Accountability</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Stay consistent with daily check-ins and progress tracking to maintain momentum</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-200 hover:border-blue-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Doubt Resolution</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Quick support for academic or strategic doubts via call or message</p>
                </div>
              </div>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 hover:border-green-400">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Current Affairs Integration</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Regular updates and analysis of current events relevant to UPSC</p>
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
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Peer Learning</h3>
                  <p className="text-gray-600 leading-relaxed text-base">Group discussions and peer interactions for collaborative learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a3da7] mb-12">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-gray-300 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-500 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Get Started with Learning!
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Take the first step toward your UPSC Dreams with expert-led courses
            and personalized mentorship.
          </p>
          <button
            onClick={() => setShowRegistrationForm(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get the Course
          </button>
        </div>
      </section>
      </main>

      {/* Payment Form Modal */}
      {showPaymentForm && course && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
              <h3 className="text-xl font-semibold">
                Enroll in <span dangerouslySetInnerHTML={{ __html: course.title }} />
              </h3>
            </div>
            <button
              onClick={handleClosePayment}
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold z-10 transition-colors bg-black/20 rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              &times;
            </button>
            <PaymentForm
              course={{...course, basePrice, sellingPrice, discountPercentage}}
              onPaymentSuccess={handlePaymentSuccess}
              onClose={() => {
                handleClosePayment();
                // When payment receipt is closed, payment was successful
                handlePaymentSuccess();
              }}
            />
          </div>
        </div>
      )}

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <Form onClose={() => setShowEnquiryForm(false)} />
      )}

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <Form onClose={() => setShowRegistrationForm(false)} />
      )}
    </>
  );
}

