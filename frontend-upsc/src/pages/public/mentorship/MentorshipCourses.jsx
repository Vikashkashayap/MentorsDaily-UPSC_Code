import React, { useEffect, useState, useCallback } from "react";
import { getCourses } from "../../../api/coreService";
import CourseCard from "../../../components/CourseCard";

const PAGE_SIZE = 12;

const MentorshipCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const hasMore = pagination ? page < pagination.totalPages : false;

  const fetchCourses = useCallback(async (pageNum = 1, append = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    try {
      const res = await getCourses({ page: pageNum, limit: PAGE_SIZE });
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      if (res.pagination) {
        setPagination(res.pagination);
        setPage(res.pagination.page);
      }
      if (append) {
        setCourses((prev) => [...prev, ...list]);
      } else {
        setCourses(list);
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
          {/* <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
              Featured Courses
            </span>
            <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-gray-800 to-gray-600 rounded-full"></div>
          </h2> */}

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
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                No courses found.
              </div>
            ) : (
              <>
                {courses.map((course, idx) => {
                  const isExpanded = expandedIdx === idx;
                  return (
                    <div key={course._id || idx} className="h-full">
                      <CourseCard
                        {...course}
                        expanded={isExpanded}
                        inlineExpand={false}
                        onToggle={() => setExpandedIdx(isExpanded ? null : idx)}
                        overlayMode={isExpanded}
                      />
                    </div>
                  );
                })}
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