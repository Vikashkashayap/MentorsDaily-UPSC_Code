import { useEffect, useRef, useState } from "react";
import CourseCard from "./CourseCard";

const EnhancedHorizontalCourseScroller = ({
  courses,
  onEnrollClick,
  title,
  variant = "default",
  showCoupon = true,
}) => {
  const scrollContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardWidth = variant === "landing" ? 300 : 320;
  const gap = 20;

  const getVisibleCards = () => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1280) return 3;
    return 4;
  };

  const updateScrollState = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 10);
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    const newIndex = Math.round(container.scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.max(0, Math.min(newIndex, courses.length - 1)));
  };

  const scrollToIndex = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  };

  const autoScroll = (direction) => {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, courses.length - visibleCards);
    if (direction === "right") {
      scrollToIndex(currentIndex + 1 > maxIndex ? 0 : currentIndex + 1);
    } else {
      scrollToIndex(currentIndex - 1 < 0 ? maxIndex : currentIndex - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => container.removeEventListener("scroll", updateScrollState);
  }, [courses.length, cardWidth]);

  if (courses.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">No courses in this category yet.</p>
    );
  }

  return (
    <div>
      {title && (
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />
          </div>
        </div>
      )}

      <div className="relative">
        {canScrollLeft && (
          <div className="absolute left-12 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none hidden lg:block" />
        )}
        {canScrollRight && (
          <div className="absolute right-12 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none hidden lg:block" />
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => autoScroll("left")}
            disabled={!canScrollLeft && courses.length <= getVisibleCards()}
            aria-label="Scroll courses left"
            className="shrink-0 p-3 rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex-1 flex overflow-x-auto scrollbar-hide gap-5 py-2 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {courses.map((course, idx) => (
              <div
                key={course._id || idx}
                className="shrink-0 snap-start"
                style={{ width: cardWidth }}
              >
                <CourseCard
                  {...course}
                  variant={variant}
                  showCoupon={showCoupon}
                  featured={idx === 0 && variant === "landing"}
                  onEnrollClick={() => onEnrollClick(course)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => autoScroll("right")}
            disabled={!canScrollRight && courses.length <= getVisibleCards()}
            aria-label="Scroll courses right"
            className="shrink-0 p-3 rounded-full bg-white shadow-md border border-gray-100 text-gray-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {courses.length > getVisibleCards() && (
        <div className="flex justify-center mt-6 gap-1.5">
          {Array.from({ length: Math.ceil(courses.length / getVisibleCards()) }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide group ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === Math.floor(currentIndex / getVisibleCards())
                  ? "w-6 bg-blue-600"
                  : "w-1.5 bg-gray-300 hover:bg-blue-300"
              }`}
              onClick={() => scrollToIndex(index * getVisibleCards())}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedHorizontalCourseScroller;
