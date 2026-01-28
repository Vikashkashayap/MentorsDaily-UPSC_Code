import React, { useEffect, useState } from "react";
import { getCourses } from "../../../api/coreService";
import CourseCard from "../../../components/CourseCard"; // Same component

const MentorshipCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIdx, setExpandedIdx] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(Array.isArray(res.data) ? res.data : res.data?.data || []);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

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
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600 bg-clip-text text-transparent">
              Featured Courses
            </span>
            <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-gray-800 to-gray-600 rounded-full"></div>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              <div className="col-span-full text-center text-lg">Loading...</div>
            ) : error ? (
              <div className="col-span-full text-center text-red-600">{error}</div>
            ) : courses.length === 0 ? (
              <div className="col-span-full text-center text-gray-600">
                No courses found.
              </div>
            ) : (
              courses.map((course, idx) => {
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
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorshipCourses;