import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../../../components/ui/SectionHeading";
import CourseCard from "../../../components/CourseCard";
import EnhancedHorizontalCourseScroller from "../../../components/EnhancedHorizontalCourseScroller";
import { courseGroup } from "../mentorship/mentorshipCourseSort";

const FILTERS = [
  { id: "all", label: "All Programs" },
  { id: "imp", label: "Integrated Mentorship" },
  { id: "super5", label: "Super 5 Batch" },
  { id: "other", label: "Specialized" },
];

const HIGHLIGHTS = [
  { icon: "🎯", label: "1:1 Daily Mentorship" },
  { icon: "📝", label: "Answer Writing & Tests" },
  { icon: "📚", label: "Prelims + Mains + Interview" },
  { icon: "💳", label: "Flexible Payment Options" },
];

const MobileCourseCarousel = ({ courses, onEnrollClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === courses.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? courses.length - 1 : prev - 1));

  if (courses.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">No courses in this category yet.</p>
    );
  }

  return (
    <div className="relative px-1">
      {courses.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous course"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-blue-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next course"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-blue-600 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div className="overflow-hidden mx-8">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {courses.map((course) => (
            <div key={course._id} className="w-full shrink-0 px-2">
              <CourseCard
                {...course}
                variant="landing"
                showCoupon={false}
                onEnrollClick={() => onEnrollClick(course)}
              />
            </div>
          ))}
        </div>
      </div>

      {courses.length > 1 && (
        <div className="flex justify-center mt-5 gap-1.5">
          {courses.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-blue-600" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FeaturedCoursesSection = ({
  courses,
  loading,
  error,
  onEnrollClick,
  onViewAll,
  totalCount,
}) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const filteredCourses = useMemo(() => {
    if (activeFilter === "all") return courses;
    return courses.filter((c) => courseGroup(c) === activeFilter);
  }, [courses, activeFilter]);

  const filterCounts = useMemo(() => {
    const counts = { all: courses.length, imp: 0, super5: 0, other: 0 };
    courses.forEach((c) => {
      const g = courseGroup(c);
      if (counts[g] !== undefined) counts[g] += 1;
    });
    return counts;
  }, [courses]);

  return (
    <section
      id="courses"
      aria-labelledby="featured-courses-heading"
      className="relative w-full py-16 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50" />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(37 99 235 / 0.08) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
        <SectionHeading
          id="featured-courses-heading"
          badge="Top Programs"
          title="Featured"
          highlight="Courses"
          subtitle="Handpicked UPSC mentorship programs for every stage — from foundation to interview readiness."
        />

        {/* Program highlights */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 -mt-6">
          {HIGHLIGHTS.map((h) => (
            <span
              key={h.label}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-full text-sm font-medium text-gray-700 shadow-sm"
            >
              <span>{h.icon}</span>
              {h.label}
            </span>
          ))}
        </div>

        {/* Category filters */}
        {!loading && !error && courses.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTERS.map((f) => {
              const count = filterCounts[f.id] ?? 0;
              if (f.id !== "all" && count === 0) return null;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeFilter === f.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  {f.label}
                  <span
                    className={`ml-1.5 text-xs ${
                      activeFilter === f.id ? "text-blue-100" : "text-gray-400"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 h-[420px] animate-pulse"
              >
                <div className="bg-gray-200 h-44 w-full" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-10 bg-gray-100 rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-50 py-10 rounded-2xl max-w-md mx-auto border border-red-100">
            <p>{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center text-gray-600 bg-white py-14 rounded-2xl border border-gray-100">
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-sm text-gray-500 mt-1">Check back later for new offerings</p>
          </div>
        ) : (
          <>
            <div className="block lg:hidden">
              <MobileCourseCarousel
                courses={filteredCourses}
                onEnrollClick={onEnrollClick}
              />
            </div>

            <div className="hidden lg:block">
              <EnhancedHorizontalCourseScroller
                courses={filteredCourses}
                onEnrollClick={onEnrollClick}
                variant="landing"
                showCoupon={false}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <button
                type="button"
                onClick={onViewAll}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore All {totalCount || courses.length} Courses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => navigate("/mentorship-courses")}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:bg-blue-50 transition-colors"
              >
                Compare Programs
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
