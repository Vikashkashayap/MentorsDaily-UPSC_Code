import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import CreateCourseForm from "../../components/CreateCourseForm";
import CourseList from "./CourseList";

export default function AdminCourses() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("manage");

  return (
    <div className="p-4">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Courses Management</h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Create and manage courses</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab("manage")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "manage"
                ? isDark
                  ? "bg-blue-600 text-white"
                  : "bg-blue-600 text-white"
                : isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Manage Courses
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "create"
                ? isDark
                  ? "bg-green-600 text-white"
                  : "bg-green-600 text-white"
                : isDark
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Create Course
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "manage" && <CourseList />}
        
        {activeTab === "create" && (
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm p-6 border`}>
            <CreateCourseForm 
              onSuccess={() => setActiveTab("manage")}
              onCancel={() => setActiveTab("manage")}
              isModal={false}
              title="Create New Course"
            />
          </div>
        )}
      </div>
    </div>
  );
}