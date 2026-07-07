import React, { useEffect, useState, useCallback, useMemo } from "react";
import { getCourses, clearCoursesCache } from "../../../api/coreService";
import CourseCard from "../../../components/CourseCard";
import { sortMentorshipCourses, courseGroup } from "./mentorshipCourseSort";
import { COURSES_UPDATED_EVENT, unwrapCourseList } from "../courses/courseVisibility";

const PAGE_SIZE = 12;

const FILTERS = [
  { id: "all", label: "All Programs" },
  { id: "imp", label: "Integrated Mentorship" },
  { id: "super5", label: "Super 5 Batch" },
  { id: "other", label: "Specialized" },
];

const MentorshipCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [couponTargetCourseId, setCouponTargetCourseId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const hasMore = pagination ? page < pagination.totalPages : false;

  const filterCounts = useMemo(() => {
    const counts = { all: courses.length, imp: 0, super5: 0, other: 0 };
    courses.forEach((c) => {
      const g = courseGroup(c);
      if (counts[g] !== undefined) counts[g] += 1;
    });
    return counts;
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (activeFilter === "all") return courses;
    return courses.filter((c) => courseGroup(c) === activeFilter);
  }, [courses, activeFilter]);

  const fetchCourses = useCallback(async (pageNum = 1, append = false, { showLoading = true } = {}) => {
    if (append) setLoadingMore(true);
    else if (showLoading) setLoading(true);
    try {
      const res = await getCourses({ page: pageNum, limit: PAGE_SIZE });
      const list = unwrapCourseList(res);
      if (res.pagination) {
        setPagination(res.pagination);
        setPage(res.pagination.page);
      }
      if (append) {
        setCourses((prev) => sortMentorshipCourses([...prev, ...list]));
      } else {
        setCourses(sortMentorshipCourses(list));
      }
      setError(null);
    } catch (err) {
      if (!append) setError("Failed to load courses");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses(1, false);
    const onCoursesUpdated = () => {
      clearCoursesCache();
      fetchCourses(1, false, { showLoading: false });
    };
    window.addEventListener(COURSES_UPDATED_EVENT, onCoursesUpdated);
    return () => window.removeEventListener(COURSES_UPDATED_EVENT, onCoursesUpdated);
  }, [fetchCourses]);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    fetchCourses(page + 1, true);
  };

  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Header */}
      <div className="text-gray-900 py-12 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Mentorship Courses
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700">
          Explore our Personalized Mentorship courses today and take the first
          step toward achieving your UPSC dream.
        </p>
      </div>

      {/* Courses Section */}
      <section className="w-full py-12 md:py-16">
        <div className="max-w-[1400px] xl:max-w-[1600px] mx-auto px-4 md:px-6">
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              <>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={`skeleton-${idx}`} className="h-full">
                    <div className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white shadow-sm p-4 animate-pulse">
                      <div className="h-40 rounded-xl bg-gray-200 mb-4" />
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                      <div className="flex items-center justify-between mt-auto">
                        <div className="h-6 w-24 bg-gray-200 rounded-full" />
                        <div className="h-10 w-28 bg-gray-200 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : error ? (
              <div className="col-span-full text-center text-red-600">{error}</div>
            ) : filteredCourses.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                No courses found.
              </div>
            ) : (
              <>
                {filteredCourses.map((course, idx) => (
                  <div key={course._id || idx} className="h-full">
                    <CourseCard
                      {...course}
                      variant="landing"
                      couponTargetCourseId={couponTargetCourseId}
                      onCouponTargetSelect={setCouponTargetCourseId}
                      couponRadioName="mentorship-coupon-target"
                    />
                  </div>
                ))}
                {hasMore && (
                  <div className="col-span-full flex justify-center pt-6">
                    <button
                      type="button"
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="px-6 py-3 rounded-lg font-medium bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                      {loadingMore ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorshipCourses;