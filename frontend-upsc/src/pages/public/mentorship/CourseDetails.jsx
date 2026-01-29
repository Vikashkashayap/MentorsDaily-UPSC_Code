import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourses } from '../../../api/coreService';
import PaymentForm from '../../../components/payment/PaymentForm';
import { formatDateRange } from '../../../utils/dateUtils';
import ContactForm from '../components/Form';

const CourseDetails = () => {
  const { courseId, category, title } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await getCourses();
        const coursesData = Array.isArray(res.data) 
          ? res.data 
          : (res.data?.data || []);
        
        let foundCourse = null;
        
        if (courseId) {
          foundCourse = coursesData.find(c => c._id === courseId);
        }
        else if (category && title) {
          foundCourse = coursesData.find(c => {
            const courseSlug = generateSlug(c.title);
            const categorySlug = c.category ? generateSlug(c.category) : 'course';
            return courseSlug === title && categorySlug === category;
          });
        }
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        setError('Failed to load course details');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId || (category && title)) {
      fetchCourse();
    }
  }, [courseId, category, title]);

  // Prevent body scroll when any modal is open
  useEffect(() => {
    if (showPaymentForm || showEnquiryForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showPaymentForm, showEnquiryForm]);

  const getThumbnailUrl = (thumb) => {
    if (!thumb) return null;
    
    // If it's already a URL string
    if (typeof thumb === 'string') return thumb;
    
    // If it's a base64 object
    if (thumb.data) {
      return `data:${thumb.contentType || 'image/png'};base64,${thumb.data}`;
    }
    
    // If it's an object with _id (from backend populate)
    if (thumb._id) {
      const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
      return `${BASE_URL}/api/v1/view/${thumb._id}`;
    }
    
    return null;
  };

  const basePrice = course?.basePrice || 0;
  const sellingPrice = course?.sellingPrice || 0;
  const discountPercentage = course?.discountPercentage || 0;

  const formatPrice = (p) => (p === 0 ? "Free" : `₹${p?.toLocaleString?.()}`);
  
  const formatCrossedPrice = (p) =>
    p === 0 ? null : p ? `₹${Math.ceil(p * 1.3).toLocaleString()}` : null;
  
  // const formatDateRange = (s, e) => {
  //   if (!s && !e) return "Flexible Schedule";
  //   const f = (d) =>
  //     d
  //       ? new Date(d).toLocaleDateString("en-IN", {
  //           month: "short",
  //           day: "numeric",
  //           year: "2-digit",
  //         })
  //       : "TBD";
  //   return `${f(s)} - ${f(e)}`;
  // };

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
      'bg-gradient-to-r from-pink-500 to-pink-600',
      'bg-gradient-to-r from-indigo-500 to-indigo-600',
      'bg-gradient-to-r from-teal-500 to-teal-600',
      'bg-gradient-to-r from-red-500 to-red-600',
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  const handleEnrollClick = () => {
    setShowPaymentForm(true);
  };

  const handleEnquiryClick = () => {
    setShowEnquiryForm(true);
  };

  const handlePaymentSuccess = (payment) => {
    setShowPaymentForm(false);
  };

  const handleClosePayment = () => {
    setShowPaymentForm(false);
  };

  const handleCloseEnquiry = () => {
    setShowEnquiryForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The course you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/MentorshipCourses')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Mentorship Courses
          </button>
        </div>
      </div>
    );
  }

  const thumbnailUrl = getThumbnailUrl(course.thumbnail);

  // Check if the course is an UPSC Integrated course
  const isIntegratedCourse = () => {
    if (!course) return false;
    const title = course.title?.toLowerCase() || '';
    const category = course.category?.toLowerCase() || '';
    
    // Check if title contains "integrated" (case-insensitive)
    return title.includes('integrated') || category.includes('integrated');
  };

  const showIntegratedFeatures = isIntegratedCourse();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/MentorshipCourses')}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Mentorship Courses
          </button>
        </div>
      </div>

      {/* Course Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Image */}
            <div className="mb-8">
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt={course.title}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="relative h-64 md:h-80">
                    <div className={`w-full h-full flex items-center justify-center ${getAvatarColor(course.title)}`}>
                      <div className="text-white text-6xl font-bold drop-shadow-lg">
                        {getInitials(course.title)}
                      </div>
                    </div>
                  </div>
                )}
                {course.category && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {course.category}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h1 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: course.title }}
              />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {course.duration && (
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p 
                        className="font-semibold text-gray-800 prose max-w-none prose-sm"
                        dangerouslySetInnerHTML={{ __html: course.duration }}
                      />
                    </div>
                  </div>
                )}

                {course.mode && (
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <svg className="w-6 h-6 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Mode</p>
                      <p 
                        className="font-semibold text-gray-800 prose max-w-none prose-sm"
                        dangerouslySetInnerHTML={{ __html: course.mode }}
                      />
                    </div>
                  </div>
                )}

                {course.language && (
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Language</p>
                      <p className="font-semibold text-gray-800">{course.language}</p>
                    </div>
                  </div>
                )}

                {(course.startDate || course.endDate) && (
                  <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                    <svg className="w-6 h-6 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">Schedule</p>
                      <p className="font-semibold text-gray-800">{formatDateRange(course.startDate, course.endDate)}</p>
                    </div>
                  </div>
                )}
              </div>
              {course.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">About this Course</h3>


                  <div className="rich-text-content text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: course.description }} />
                </div>
              )}

              {/* Course Features */}
            </div>
          </div>

          {/* Sidebar - Pricing and Enrollment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Course Details</h3>
              
              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  {discountPercentage > 0 && (
                    <span className="text-lg text-gray-500 line-through mr-2">
                      {formatPrice(basePrice)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(sellingPrice)}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="ml-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <p className="text-sm text-green-600 font-medium">
                    Save ₹{(basePrice - sellingPrice).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Enrollment Button */}
              <div className="space-y-3">
                <button
                  onClick={handleEnrollClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {sellingPrice === 0 ? "Start Learning Free" : "Enroll Now"}
                </button>
                <button
                  onClick={handleEnquiryClick}
                  className="w-full border border-blue-600 text-blue-600 font-semibold py-4 px-6 rounded-xl hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                  Enquire Now
                </button>
              </div>

              {/* Enhanced Features - Only for UPSC Integrated Courses */}
              {showIntegratedFeatures && (
                <div className="mt-6 space-y-4">
                  {/* 100% Fee Refund Feature */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-bold text-green-800 leading-tight">
                          Get 100% Fee Refund after Clearing Prelims!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Free Hostel & Library Feature */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-bold text-blue-800 leading-tight">
                          Free Hostel & Library facilities for Mains and Interview — under expert mentors
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-6 space-y-3">
                {/* <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Lifetime Access
                </div> */}
                {/* <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Study Materials Included
                </div> */}
                {/* <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Expert Mentorship
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Complete Your Enrollment</h3>
                <button
                  onClick={handleClosePayment}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <PaymentForm
                course={{...course, basePrice, sellingPrice, discountPercentage}}
                onSuccess={handlePaymentSuccess}
                onClose={handleClosePayment}
              />
            </div>
          </div>
        </div>
      )}

      {/* Enquiry Form Modal */}
      {showEnquiryForm && (
        <ContactForm onClose={handleCloseEnquiry} />
      )}
    </div>
  );
};

export default CourseDetails;