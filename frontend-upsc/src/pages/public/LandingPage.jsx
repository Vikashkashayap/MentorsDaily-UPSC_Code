import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getCourses } from "../../api/coreService";
import HeroSection from "./components/HeroSection";
import FeaturedCoursesSection from "./components/FeaturedCoursesSection";
import PrepJourneySection from "./components/PrepJourneySection";
const WhyMentorsDaily = lazy(() => import("./utils/WhyMentorsDaily.jsx"));
const Faq = lazy(() => import("./utils/Faq.jsx"));
const Reviews = lazy(() => import("./components/Reviews"));
const Blog = lazy(() => import("./Blog"));
const PaymentForm = lazy(() => import("../../components/payment/PaymentForm.jsx"));
const TodaysCurrentAffairs = lazy(() => import("./currentAffairs/TodaysCurrentAffairs"));
import ScholarshipAnnouncement from "./Announcement";
import ContactForm from "../../pages/public/components/Form.jsx";
import DeferredSection from "../../components/utility/DeferredSection.jsx";
import { SEO_CONFIG } from "../../utils/seoUtils";
import { sortMentorshipCourses } from "./mentorship/mentorshipCourseSort";

const DISPLAY_COURSES_LIMIT = 20;

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const navigate = useNavigate();
  const baseUrl = SEO_CONFIG.siteUrl || "https://mentorsdaily.com";
  const homepageUrl = `${baseUrl}/`;
  const topCourses = courses.slice(0, DISPLAY_COURSES_LIMIT);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        const coursesData = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        setCourses(sortMentorshipCourses(coursesData));
      } catch (err) {
        setError("Failed to load courses");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = (payment) => {
    setShowPaymentForm(false);
    setSelectedCourse(null);
    // Optionally redirect to dashboard or show success message
    navigate("/user-dashboard");
  };

  const handleClosePayment = () => {
    setShowPaymentForm(false);
    setSelectedCourse(null);
  };

  const handleViewAllCourses = () => {
    navigate("/mentorship-courses");
  };

  const landingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does MentorsDaily offer for UPSC preparation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MentorsDaily offers structured UPSC mentorship, current affairs support, answer writing evaluation, tests, and personalized guidance for Prelims, Mains, and Interview preparation.",
        },
      },
      {
        "@type": "Question",
        name: "Are MentorsDaily courses suitable for beginners and repeat aspirants?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. MentorsDaily courses are designed for beginners, working professionals, and repeat aspirants with guided timelines, mentor feedback, and flexible learning support.",
        },
      },
      {
        "@type": "Question",
        name: "How can I start with MentorsDaily?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can explore featured courses on the landing page, review program details, and enroll directly through the course cards or enquiry options.",
        },
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured UPSC Mentorship Courses",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: topCourses.length,
    itemListElement: topCourses.map((course, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: course.title || "UPSC Course",
      description: course.description || "UPSC mentorship and preparation course",
      url: homepageUrl,
    })),
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet>
        <meta
          name="description"
          content="MentorsDaily helps UPSC aspirants with expert mentorship, structured preparation, current affairs support, and focused learning for Prelims, Mains, and Interview."
        />
        <meta
          name="keywords"
          content="UPSC mentorship, UPSC preparation, IAS coaching, civil services courses, UPSC current affairs, answer writing"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MentorsDaily - UPSC Preparation with Expert Mentorship" />
        <meta
          property="og:description"
          content="Explore UPSC mentorship programs, featured courses, and result-driven preparation support from MentorsDaily."
        />
        <meta property="og:url" content={homepageUrl} />
        <script type="application/ld+json">
          {JSON.stringify(landingFaqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      </Helmet>

      <main id="landing-page-content">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5 pointer-events-none" aria-hidden="true" />
        <HeroSection onEnquiryClick={() => setShowEnquiryForm(true)} />

        {/* Today's Current Affairs Section */}
        <DeferredSection fallback={<div className="min-h-[200px]" />}>
          <Suspense fallback={<div className="min-h-[200px]" />}>
            <TodaysCurrentAffairs />
          </Suspense>
        </DeferredSection>
        {/* Scholarship Announcement Banner */}
        <ScholarshipAnnouncement />

        <FeaturedCoursesSection
          courses={topCourses}
          loading={loading}
          error={error}
          totalCount={courses.length}
          onEnrollClick={handleEnrollClick}
          onViewAll={handleViewAllCourses}
        />

        <PrepJourneySection />

        <DeferredSection fallback={<div className="min-h-[220px]" />}>
          <Suspense fallback={<div className="min-h-[220px]" />}>
            <div className="mt-4">
              <WhyMentorsDaily />
            </div>
          </Suspense>
        </DeferredSection>

        <DeferredSection fallback={<div className="min-h-[240px]" />}>
          <Suspense fallback={<div className="min-h-[240px]" />}>
            <Reviews />
          </Suspense>
        </DeferredSection>
        <DeferredSection fallback={<div className="min-h-[240px]" />}>
          <Suspense fallback={<div className="min-h-[240px]" />}>
            <Blog />
          </Suspense>
        </DeferredSection>
        <DeferredSection fallback={<div className="min-h-[240px]" />}>
          <Suspense fallback={<div className="min-h-[240px]" />}>
            <Faq />
          </Suspense>
        </DeferredSection>
      </div>
      </main>

      {showPaymentForm && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
              <h3 className="text-xl font-semibold">
                Enroll in <span dangerouslySetInnerHTML={{ __html: selectedCourse.title }} />
              </h3>
            </div>
            <button
              onClick={handleClosePayment}
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold z-10 transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
            <Suspense fallback={<div className="p-6 text-center">Loading payment form...</div>}>
              <PaymentForm
                course={selectedCourse}
                onPaymentSuccess={handlePaymentSuccess}
                onClose={handleClosePayment}
              />
            </Suspense>
          </div>
        </div>
      )}

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <ContactForm onClose={() => setShowEnquiryForm(false)} />
      )}
    </div>
  );
};

export default LandingPage;
