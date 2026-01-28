import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';

const EnhancedHorizontalCourseScroller = ({
  courses,
  onEnrollClick,
  title,
}) => {
  const navigate = useNavigate();

  // Generate URL-friendly slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
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
    const categorySlug = course.category ? generateSlug(course.category) : 'course';
    const url = `/course/${categorySlug}/${courseSlug}`;
    
    // Navigate to course detail page
    navigate(url);
  };
  const scrollContainerRef = useRef(null);
  const autoScrollIntervalRef = useRef(null);

  const autoScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = 320;
    const visibleCards = Math.floor(container.clientWidth / cardWidth);

    if (direction === "right") {
      const currentPosition = Math.round(container.scrollLeft / cardWidth);
      const nextPosition = currentPosition + visibleCards;
      if (nextPosition >= courses.length) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({
          left: cardWidth * visibleCards,
          behavior: "smooth",
        });
      }
    } else {
      const currentPosition = Math.round(container.scrollLeft / cardWidth);
      const prevPosition = currentPosition - visibleCards;
      if (prevPosition <= 0) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({
          left: -cardWidth * visibleCards,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScrollButtonClick = (direction) => {
    autoScroll(direction);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    autoScrollIntervalRef.current = setInterval(
      () => autoScroll("right"),
      5000
    );
    return () => clearInterval(autoScrollIntervalRef.current);
  }, [courses]);

  return (
    <div className="relative">
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
      
      <div className="flex items-center">
        {/* Left Navigation Button */}
        <button
          onClick={() => handleScrollButtonClick("left")}
          className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 z-20 mr-8"
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

        {/* Scroll Container with adjusted height */}
        <div className="flex-1 relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-6 py-6 px-6 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {courses.map((course, idx) => (
              <div key={course._id || idx} className="flex-shrink-0 w-80"> 
                <div 
                  onClick={() => handleCourseClick(course)}
                  className="cursor-pointer"
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
        
        {/* Right Navigation Button */}
        <button
          onClick={() => handleScrollButtonClick("right")}
          className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 z-20 ml-8"
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
      <div className="md:hidden flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(courses.length / 2) }).map(
          (_, index) => (
            <button
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300 hover:bg-blue-600"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({
                    left: index * scrollContainerRef.current.clientWidth,
                    behavior: "smooth",
                  });
                }
              }}
            ></button>
          )
        )}
      </div>
    </div>
  );
};

export default EnhancedHorizontalCourseScroller;