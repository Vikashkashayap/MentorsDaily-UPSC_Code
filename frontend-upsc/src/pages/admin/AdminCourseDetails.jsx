import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { getCourseById } from "../../api/coreService";
import EditCourseModal from "../../components/EditCourseModal";
import { messageHandler } from "../../utils/messageHandler";
import { formatDate, formatRelativeTime } from "../../utils/dateUtils";

export default function AdminCourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Toast notification function
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handle edit course
  const handleEditCourse = () => {
    setShowEditModal(true);
  };

  // Handle edit success
  const handleEditSuccess = () => {
    // Refresh course data
    if (id) {
      fetchCourseDetails();
    }
  };

  const fetchCourseDetails = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      // Try API call first
      try {
        const response = await getCourseById(id);
        setCourse(response.data?.data || response.data);
      } catch (apiError) {
        console.warn("API not available, using mock data:", apiError);
        // Mock data for development
        setCourse({
          _id: id,
          title: "Integrated Mentorship Program - 2027",
          description: "From NCERT to Prelims, Mains & Interview - All-in-One UPSC preparation is a marathon, not a sprint. Most aspirants fail not because of lack of talent, but because of scattered resources, unstructured study, and lack of guidance.",
          category: "PRELIMS + MAINS + INTERVIEW",
          basePrice: 120000,
          sellingPrice: 60000,
          discountPercentage: 50,
          duration: "36 Months",
          mode: "Online",
          language: "English & Hindi",
          thumbnail: null,
          features: [
            "Comprehensive NCERT Coverage",
            "Daily Current Affairs",
            "Mock Tests & Practice Papers",
            "Personal Mentorship",
            "Interview Preparation",
            "Answer Writing Practice"
          ],
          syllabus: [
            "History & Culture",
            "Geography",
            "Polity & Governance",
            "Economy",
            "Science & Technology",
            "Environment & Ecology"
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Failed to load course details";
      setError(errorMsg);
      messageHandler.error(errorMsg);
      console.error("Error fetching course details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadCourseDetails = async () => {
      await fetchCourseDetails();
    };

    if (id) {
      loadCourseDetails();
    }
  }, [id]);

  const getThumbnailUrl = (thumb) => {
    if (!thumb) return null;
    
    // If it's already a URL string
    if (typeof thumb === 'string') return thumb;
    
    // If it's a base64 object
    if (thumb && thumb.data) {
      return `data:${thumb.contentType || 'image/png'};base64,${thumb.data}`;
    }
    
    // If it's an object with _id (from backend populate)
    if (thumb && thumb._id) {
      const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
      return `${BASE_URL}/api/v1/view/${thumb._id}`;
    }
    
    return null;
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (title) => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-blue-600',
      'bg-gradient-to-r from-green-500 to-green-600',
      'bg-gradient-to-r from-purple-500 to-purple-600',
      'bg-gradient-to-r from-orange-500 to-orange-600',
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${isDark ? 'border-blue-400' : 'border-blue-600'} mx-auto mb-4`}></div>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`text-6xl mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>⚠️</div>
          <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Course Not Found</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{error || "The requested course could not be found."}</p>
          <button
            onClick={() => navigate('/admin/courses')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const thumbnailUrl = getThumbnailUrl(course.thumbnail);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/courses')}
                className={`p-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Course Details</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>View and manage course information</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleEditCourse}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Course
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="md:w-1/3">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                    {thumbnailUrl && !imageError ? (
                      <img
                        src={thumbnailUrl}
                        onError={() => setImageError(true)}
                        alt={course.title}
                        className="w-full h-full object-cover object-left-top"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${getAvatarColor(course.title)}`}>
                        <div className="text-white text-4xl font-bold drop-shadow-lg">
                          {getInitials(course.title)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="md:w-2/3">
                  <div className="mb-4">
                    {course.category && (
                      <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold uppercase mb-3">
                        {course.category}
                      </span>
                    )}
                    <h2 
                      className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 prose max-w-none ${isDark ? 'prose-invert' : ''}`}
                      dangerouslySetInnerHTML={{ __html: course.title }}
                    />
                  </div>

                  {/* Course Tags */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className={`flex items-center gap-2 px-3 py-2 ${isDark ? 'bg-blue-900/30 border-blue-800/50' : 'bg-blue-50 border-blue-200'} border rounded-lg`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span 
                        className={`text-sm font-medium ${isDark ? 'text-blue-200' : 'text-blue-700'} prose max-w-none prose-sm ${isDark ? 'prose-invert' : ''}`}
                        dangerouslySetInnerHTML={{ __html: course.duration }}
                      />
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-2 ${isDark ? 'bg-purple-900/30 border-purple-800/50' : 'bg-purple-50 border-purple-200'} border rounded-lg`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span 
                        className={`text-sm font-medium ${isDark ? 'text-purple-200' : 'text-purple-700'} prose max-w-none prose-sm ${isDark ? 'prose-invert' : ''}`}
                        dangerouslySetInnerHTML={{ __html: course.mode }}
                      />
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-2 ${isDark ? 'bg-orange-900/30 border-orange-800/50' : 'bg-orange-50 border-orange-200'} border rounded-lg`}>
                      <svg className={`w-5 h-5 ${isDark ? 'text-orange-300' : 'text-orange-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3c4.97 0 9 4.03 9 9 0 3.9-2.5 7.22-6 8.48M12 3C7.03 3 3 7.03 3 12c0 3.9 2.5 7.22 6 8.48M12 3v18m-6-9h12" />
                      </svg>
                      <span 
                        className={`text-sm font-medium ${isDark ? 'text-orange-200' : 'text-orange-700'} prose max-w-none prose-sm ${isDark ? 'prose-invert' : ''}`}
                        dangerouslySetInnerHTML={{ __html: course.language }}
                      />
                    </div>
                  </div>

                  {/* Price */}
                  <div className={`p-4 ${isDark ? 'bg-green-900/20 border-green-800/50' : 'bg-green-50 border-green-200'} border rounded-lg`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-3">
                        {course.discountPercentage > 0 && (
                          <span className={`text-lg line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            ₹{course.basePrice?.toLocaleString()}
                          </span>
                        )}
                        <span className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                          ₹{course.sellingPrice?.toLocaleString()}
                        </span>
                      </div>
                      {course.discountPercentage > 0 && (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                          {course.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Course Description</h3>
              <div
                className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </div>

            {/* Features */}
            {course.features && course.features.length > 0 && (
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Course Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Course Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Created</span>
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatDate(course.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated</span>
                  <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatRelativeTime(course.updatedAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleEditCourse}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Course
                </button>

                <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Course Modal */}
      <EditCourseModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        course={course}
        onSuccess={handleEditSuccess}
        showToastNotification={showToastNotification}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out">
          <div className={`px-6 py-4 rounded-lg shadow-lg ${toastMessage.includes('success') || toastMessage.includes('successfully')
            ? isDark ? 'bg-green-800 text-green-200 border border-green-700' : 'bg-green-100 text-green-800 border border-green-200'
            : isDark ? 'bg-red-800 text-red-200 border border-red-700' : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {toastMessage.includes('success') || toastMessage.includes('successfully') ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm font-medium">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}