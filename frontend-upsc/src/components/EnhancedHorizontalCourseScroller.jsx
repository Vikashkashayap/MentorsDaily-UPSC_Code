import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

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
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 4;
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

  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const getIntegratedRoute = (course) => {
    const courseTitle = course.title?.toLowerCase() || "";
    const category = course.category?.toLowerCase() || "";

    if (courseTitle.includes("integrated") || category.includes("integrated")) {
      const yearMatch = courseTitle.match(/202[6-8]/) || category.match(/202[6-8]/);
      if (yearMatch) {
        return `/integrated-mentorship-${yearMatch[0]}`;
      }
    }
    return null;
  };

  const handleCourseClick = (course) => {
    const integratedRoute = getIntegratedRoute(course);
    if (integratedRoute) {
      navigate(integratedRoute);
      return;
    }

    const courseSlug = generateSlug(course.title);
    const categorySlug = course.category ? generateSlug(course.category) : "course";
    navigate(`/course/${categorySlug}/${courseSlug}`);
  };

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="pl-5 text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {title}
            </h3>
            <div className="pl-6 w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
          </div>
        </div>
      )}

      <div className="flex items-center gap-x-2 md:gap-x-4">
        <button
          type="button"
          onClick={() => autoScroll("left")}
          aria-label="Scroll courses left"
          className="p-3 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollContainerRef}
          className="flex-1 flex overflow-x-auto scrollbar-hide gap-6 py-4 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {courses.map((course, idx) => (
            <div key={course._id || idx} className="flex-shrink-0 w-80 snap-start">
              <div
                onClick={() => handleCourseClick(course)}
                className="cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <CourseCard {...course} onEnrollClick={() => onEnrollClick(course)} />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => autoScroll("right")}
          aria-label="Scroll courses right"
          className="p-3 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(courses.length / getVisibleCards()) }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to course slide group ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === Math.floor(currentIndex / getVisibleCards())
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 hover:bg-blue-400"
            }`}
            onClick={() => scrollToIndex(index * getVisibleCards())}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedHorizontalCourseScroller;
