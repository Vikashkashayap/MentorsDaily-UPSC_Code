import React, { useEffect, useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import {
  getCourses,
  deleteCourse,
} from "../../api/coreService";
import CourseManagementCard from "../../components/CourseManagementCard";
import EditCourseModal from "../../components/EditCourseModal";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { messageHandler } from "../../utils/messageHandler";




const CourseList = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);



  const loadCourses = async () => {
    try {
      setCoursesLoading(true);
      const res = await getCourses();
      setCourses(Array.isArray(res.data?.data) ? res.data.data : []);
      if (res.data?.message) {
        messageHandler.success(res.data.message);
      }
      setHasLoaded(true);
    } catch (e) {
      console.error("Error loading courses:", e);
      const errMsg = e?.response?.data?.message || "Failed to load courses";
      messageHandler.error(errMsg);
      setHasLoaded(true);
    } finally {
      setCoursesLoading(false);
    }
  };

  useEffect(() => {
    if (!hasLoaded) {
      loadCourses();
    }
  }, [hasLoaded]);

  const startEditCourse = (course) => {
    setEditCourse(course);
    setShowEditModal(true);
  };



  // Handle view course details
  const handleViewCourse = (course) => {
    navigate(`/admin/courses/details/${course._id}`);
  };

  // Handle edit success callback
  const handleEditSuccess = () => {
    loadCourses(); // Refresh the courses list
  };

  // Delete a course
  const removeCourse = async (id) => {
    try {
      const res = await deleteCourse(id);
      const msg = res.data?.message || "Course deleted successfully";
      messageHandler.success(msg);
      await loadCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      const errMsg = err?.response?.data?.message || err?.message || "Failed to delete course";
      messageHandler.error(errMsg);
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm p-4 border`}>



      {/* List / Cards */}
      {coursesLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : courses.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="mt-2 text-gray-600">No courses found. Try adding new ones from the post page.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((item) => (
            <CourseManagementCard
              key={item._id}
              item={item}
              onEdit={startEditCourse}
              onDelete={removeCourse}
              onView={handleViewCourse}
            />
          ))}
        </div>
      )}

      {/* Edit Course Modal */}
      <EditCourseModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        course={editCourse}
        onSuccess={handleEditSuccess}
      />






    </div>
  );
};

export default CourseList;