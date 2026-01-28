import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../api/coreService";
import HeroSection from "./components/HeroSection";
import WhyMentorsDaily from "./utils/WhyMentorsDaily.jsx";
import Faq from "./utils/Faq.jsx";
import Reviews from "./components/Reviews";
import Blog from "./Blog";
import PaymentForm from "../../components/payment/PaymentForm.jsx";
import CourseCard from "../../components/CourseCard";
import TodaysCurrentAffairs from "./currentAffairs/TodaysCurrentAffairs";
import ScholarshipAnnouncement from "./Announcement";
import DiwaliOfferBanner from "../../components/DiwaliOfferBanner";
import MentorshipBanner from "../../components/MentorshipBanner";
import AIStudentDashboardBanner from "../../components/AIStudentDashboardBanner";
import ContactForm from "../../pages/public/components/Form.jsx";

const EnhancedHorizontalCourseScroller = ({
  courses,
  onEnrollClick,
  title,
}) => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const getVisibleCards = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1; // mobile
    if (width < 1024) return 2; // tablet
    return 4; // desktop
  };

  const scrollToIndex = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320;
    const gap = 24;
    const scrollPosition = index * (cardWidth + gap);

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const autoScroll = (direction) => {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, courses.length - visibleCards);

    if (direction === "right") {
      const nextIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
      scrollToIndex(nextIndex);
    } else {
      const prevIndex = currentIndex - 1 < 0 ? maxIndex : currentIndex - 1;
      scrollToIndex(prevIndex);
    }
  };

  const handleScrollButtonClick = (direction) => {
    autoScroll(direction);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 320;
    const gap = 24;
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));

    setCurrentIndex(Math.max(0, Math.min(newIndex, courses.length - 1)));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [courses.length]);

  // Generate URL-friendly slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Check if course is integrated and get the year
  const getIntegratedRoute = (course) => {
    const title = course.title?.toLowerCase() || '';
    const category = course.category?.toLowerCase() || '';
    
    // Check if title or category contains "integrated"
    if (title.includes('integrated') || category.includes('integrated')) {
      // Extract year (2026, 2027, 2028)
      const yearMatch = title.match(/202[6-8]/) || category.match(/202[6-8]/);
      if (yearMatch) {
        return `/integrated-mentorship-${yearMatch[0]}`;
      }
    }
    return null;
  };

  const handleCourseClick = (course) => {
    // Check if it's an integrated course first
    const integratedRoute = getIntegratedRoute(course);
    if (integratedRoute) {
      navigate(integratedRoute);
      return;
    }

    // Otherwise, use default routing
    const courseSlug = generateSlug(course.title);
    const categorySlug = course.category
      ? generateSlug(course.category)
      : "course";
    const url = `/course/${categorySlug}/${courseSlug}`;

    // Navigate to course detail page
    navigate(url);
  };

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="pl-5 text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {title}
            </h3>
            <div className="pl-6 w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-x-2 md:gap-x-4">
        {/* Left scroll button */}
        <button
          onClick={() => handleScrollButtonClick("left")}
          className="p-3 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex-1 flex overflow-x-auto scrollbar-hide gap-6 py-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {courses.map((course, idx) => (
            <div
              key={course._id || idx}
              className="flex-shrink-0 w-80 snap-start"
            >
              <div
                onClick={() => handleCourseClick(course)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <CourseCard
                  {...course}
                  onEnrollClick={() => onEnrollClick(course)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={() => handleScrollButtonClick("right")}
          className="p-3 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({
          length: Math.ceil(courses.length / getVisibleCards()),
        }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === Math.floor(currentIndex / getVisibleCards())
              ? "bg-blue-600 scale-125"
              : "bg-gray-300 hover:bg-blue-400"
              }`}
            onClick={() => {
              scrollToIndex(index * getVisibleCards());
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Mobile Course Carousel Component
const MobileCourseCarousel = ({ courses, onEnrollClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Check if course is integrated and get the year
  const getIntegratedRoute = (course) => {
    const title = course.title?.toLowerCase() || '';
    const category = course.category?.toLowerCase() || '';
    
    // Check if title or category contains "integrated"
    if (title.includes('integrated') || category.includes('integrated')) {
      // Extract year (2026, 2027, 2028)
      const yearMatch = title.match(/202[6-8]/) || category.match(/202[6-8]/);
      if (yearMatch) {
        return `/integrated-mentorship-${yearMatch[0]}`;
      }
    }
    return null;
  };

  const handleCourseClick = (course) => {
    // Check if it's an integrated course first
    const integratedRoute = getIntegratedRoute(course);
    if (integratedRoute) {
      navigate(integratedRoute);
      return;
    }

    // Otherwise, use default routing
    const courseSlug = generateSlug(course.title);
    const url = `/courses/${course._id}/${courseSlug}`;
    navigate(url);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === courses.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-blue-600 transition-all duration-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Carousel content */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {courses.map((course, idx) => (
            <div
              key={course._id || idx}
              className="w-full flex-shrink-0 px-4"
            >
              <div
                onClick={() => handleCourseClick(course)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <CourseCard
                  {...course}
                  onEnrollClick={() => onEnrollClick(course)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {courses.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
              ? "bg-blue-600 scale-125"
              : "bg-gray-300 hover:bg-blue-400"
              }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        const coursesData = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        setCourses(coursesData);
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
    document.getElementById("courses").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Diwali Offer Banner */}
      {/* <DiwaliOfferBanner /> */}

      {/* Mentorship Banner */}
      <MentorshipBanner />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
        <HeroSection onEnquiryClick={() => setShowEnquiryForm(true)} />

       

        {/* Today's Current Affairs Section */}
        <TodaysCurrentAffairs />
        {/* Scholarship Announcement Banner */}
        <ScholarshipAnnouncement />

        <section
          id="courses"
          className="w-full py-12 md:py-20 relative bg-gray-50"
        >
          <div className="max-w-[1600px] mx-auto px-8 sm:px-12 lg:px-16 relative">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Featured Courses
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-4 md:mb-6"></div>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Comprehensive courses designed by experts to help you excel in
                your UPSC preparation journey
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 px-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-[400px] md:h-[500px]"
                  >
                    <div className="animate-pulse">
                      <div className="bg-blue-100 h-40 md:h-48 w-full"></div>
                      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                        <div className="h-5 md:h-6 bg-blue-100 rounded w-3/4"></div>
                        <div className="h-3 md:h-4 bg-blue-100 rounded w-1/2"></div>
                        <div className="h-3 md:h-4 bg-blue-100 rounded w-2/3"></div>
                        <div className="h-10 md:h-12 bg-blue-100 rounded w-full mt-3 md:mt-4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-red-600 bg-red-50 py-6 md:py-8 rounded-xl max-w-md mx-4">
                <svg
                  className="w-10 h-10 md:w-12 md:h-12 mx-auto text-red-400 mb-3 md:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <p className="text-sm md:text-base px-4">{error}</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center text-gray-600 bg-white py-8 md:py-12 rounded-xl shadow-sm mx-4">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-400 mb-3 md:mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="text-base md:text-lg font-medium mb-2">
                  No courses found
                </p>
                <p className="text-sm md:text-base text-gray-500">
                  Check back later for new course offerings
                </p>
              </div>
            ) : (
              <>
                {/* Mobile View - Carousel */}
                <div className="block lg:hidden">
                  <MobileCourseCarousel
                    courses={courses.slice(0, 20)}
                    onEnrollClick={handleEnrollClick}
                  />
                  {courses.length > 20 && (
                    <div className="text-center mt-6">
                      <button
                        onClick={handleViewAllCourses}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                      >
                        View All Courses ({courses.length})
                      </button>
                    </div>
                  )}
                </div>

                {/* Desktop View - Enhanced Horizontal Scroller */}
                <div className="hidden lg:block">
                  <EnhancedHorizontalCourseScroller
                    courses={courses.slice(0, 20)}
                    onEnrollClick={handleEnrollClick}
                    title={null}
                  />
                </div>
              </>
            )}
          </div>
        </section>

        <div className="mt-4">
          <WhyMentorsDaily />
        </div>

 {/* AI Student Dashboard Banner */}
 <AIStudentDashboardBanner />
        <Reviews />
        <Blog />
        <Faq />
      </div>

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
            <PaymentForm
              course={selectedCourse}
              onPaymentSuccess={handlePaymentSuccess}
              onClose={handleClosePayment}
            />
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