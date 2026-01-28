import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./payment/PaymentForm";
import { formatDateRange } from "../utils/dateUtils";

const CourseCard = ({
  title,
  description,
  price,
  duration,
  mode,
  startDate,
  endDate,
  language,
  thumbnail,
  category,
  expanded = false,
  onToggle,
  inlineExpand = true,
  overlayMode = false,
  onEnrollClick,
  _id,
  showPaymentForm: externalShowPaymentForm,
  onPaymentFormClose,
  ...course
}) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    if (typeof expanded === "boolean") setShowDetails(expanded);
  }, [expanded]);

  // Use external showPaymentForm if provided
  const shouldShowPaymentForm = externalShowPaymentForm !== undefined
    ? externalShowPaymentForm
    : showPaymentForm;

  useEffect(() => {
    if (shouldShowPaymentForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [shouldShowPaymentForm]);

  const getThumbnailUrl = (thumb) => {
    if (!thumb) return null;
    if (typeof thumb === 'string') return thumb;
    if (thumb.data) {
      return `data:${thumb.contentType || 'image/png'};base64,${thumb.data}`;
    }
    return null;
  };

  const thumbnailUrl = getThumbnailUrl(thumbnail);

  const {
    basePrice = 0,
    discountPercentage = 0,
    sellingPrice = 0,
  } = course;

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

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleEnrollClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (typeof onEnrollClick === "function") {
      onEnrollClick({ ...course, title, price, _id, thumbnail });
      return;
    }
    
    setShowPaymentForm(true);
  };

  // Check if course is integrated and get the year
  const getIntegratedRoute = () => {
    const titleLower = title?.toLowerCase() || '';
    const categoryLower = category?.toLowerCase() || '';
    
    // Check if title or category contains "integrated"
    if (titleLower.includes('integrated') || categoryLower.includes('integrated')) {
      // Extract IMP target year (2026–2030)
      // Covers: 2026, 2027, 2028, 2029, 2030
      const yearMatch =
        titleLower.match(/(202[6-9]|2030)/) ||
        categoryLower.match(/(202[6-9]|2030)/);
      if (yearMatch) {
        return `/integrated-mentorship-${yearMatch[0]}`;
      }
    }
    return null;
  };

  const handleCardClick = (e) => {
    if (!e.target.closest('button')) {
      // Check if it's an integrated course first
      const integratedRoute = getIntegratedRoute();
      if (integratedRoute) {
        navigate(integratedRoute);
        return;
      }

      // Otherwise, use default routing
      const courseSlug = generateSlug(title);
      const categorySlug = category ? generateSlug(category) : 'course';
      const url = `/course/${categorySlug}/${courseSlug}`;
      navigate(url);
    }
  };

  const handlePaymentSuccess = (payment) => {
    setShowPaymentForm(false);
    if (typeof onPaymentFormClose === "function") {
      onPaymentFormClose();
    }
  };

  const handleClosePayment = () => {
    setShowPaymentForm(false);
    if (typeof onPaymentFormClose === "function") {
      onPaymentFormClose();
    }
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
      'bg-gradient-to-r from-pink-500 to-pink-600',
      'bg-gradient-to-r from-indigo-500 to-indigo-600',
      'bg-gradient-to-r from-teal-500 to-teal-600',
      'bg-gradient-to-r from-red-500 to-red-600',
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  // Payment Form Component - Fixed positioning
  const PaymentModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-md w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
            <h3 className="text-xl font-semibold">
              Enroll in <span dangerouslySetInnerHTML={{ __html: title }} />
            </h3>
          </div>
          <button
            onClick={handleClosePayment}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold z-10 transition-colors bg-black/20 rounded-full w-8 h-8 flex items-center justify-center"
            aria-label="Close"
          >
            &times;
          </button>
          <PaymentForm
            course={{ ...course, title, basePrice, discountPercentage, sellingPrice, _id, thumbnail }}
            onPaymentSuccess={handlePaymentSuccess}
            onClose={handleClosePayment}
          />
        </div>
      </div>
    </div>
  );

  if (overlayMode && expanded) {
    return (
      <>
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5 relative">
              <div className="bg-gray-100">
                {thumbnailUrl && !imageError ? (
                  <img
                    src={thumbnailUrl}
                    onError={() => setImageError(true)}
                    alt={title}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <div className="h-64 lg:h-full">
                    <div className={`w-full h-full flex items-center justify-center ${getAvatarColor(title)}`}>
                      <div className="text-white text-6xl font-bold drop-shadow-lg">
                        {getInitials(title)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {category && (
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {category}
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 
                  className="text-3xl font-bold text-gray-900 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <button
                  onClick={onToggle}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {description && (
                <div 
                  className="text-gray-600 mb-6 leading-relaxed prose max-w-none prose-sm"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                {duration && (
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span 
                      className="font-medium text-sm prose max-w-none prose-sm"
                      dangerouslySetInnerHTML={{ __html: duration }}
                    />
                  </div>
                )}
                {mode && (
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                    </svg>
                    <span 
                      className="text-sm prose max-w-none prose-sm"
                      dangerouslySetInnerHTML={{ __html: mode }}
                    />
                  </div>
                )}
                {language && (
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                    <span 
                      className="text-sm prose max-w-none prose-sm"
                      dangerouslySetInnerHTML={{ __html: language }}
                    />
                  </div>
                )}
                {/* {(startDate || endDate) && (
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-sm">
                      {formatDateRange(startDate, endDate)}
                    </span>
                  </div>
                )} */}
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline space-x-4">
                    {discountPercentage > 0 && (
                      <span className="text-gray-500 text-lg line-through">
                        {formatPrice(basePrice)}
                      </span>
                    )}
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {formatPrice(sellingPrice)}
                    </div>
                    {discountPercentage > 0 && (
                      <span className="ml-3 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-semibold border border-green-200">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </div>
                  <button
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={handleEnrollClick}
                  >
                    {sellingPrice === 0 ? "Start Learning Free" : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {shouldShowPaymentForm && <PaymentModal />}
      </>
    );
  }

  // Regular card view
  return (
    <>
      {/* Outer Card Container */}
      <div className="relative p-2 rounded-xl border-2 border-blue-200 shadow-lg bg-white">
        {/* Category Ribbon - Between outer and inner */}
        {category && (
          <div className="absolute -top-2 -left-2 z-20">
            <div className="bg-orange-500 text-white px-3 py-1 rounded-none shadow-lg text-xs font-bold uppercase">
              {category}
            </div>
          </div>
        )}

        {/* Inner Card */}
        <div
          className={`h-[380px] rounded-lg bg-white overflow-hidden cursor-pointer flex flex-col ${
            showDetails ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={handleCardClick}
        >
          <div className="relative h-40 overflow-hidden bg-gray-100">
            {thumbnailUrl && !imageError ? (
              <img
                src={thumbnailUrl}
                onError={() => setImageError(true)}
                alt={title}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center ${getAvatarColor(
                  title
                )}`}
              >
                <div className="text-white text-4xl font-bold drop-shadow-lg">
                  {getInitials(title)}
                </div>
              </div>
            )}
          </div>
          <div className="p-2 flex flex-col flex-grow">
            <h3 
              className="text-base font-bold text-gray-900 mb-2 line-clamp-2 leading-tight prose max-w-none"
              dangerouslySetInnerHTML={{ __html: title }}
            />

            <div className="flex items-center flex-wrap gap-2 text-sm text-gray-600">
              {duration && (
                <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span 
                    className="font-medium text-xs prose max-w-none prose-xs"
                    dangerouslySetInnerHTML={{ __html: duration }}
                  />
                </div>
              )}
              {mode && (
                <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                  <span 
                    className="text-xs prose max-w-none prose-xs"
                    dangerouslySetInnerHTML={{ __html: mode }}
                  />
                </div>
              )}
              {language && (
                <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3c4.97 0 9 4.03 9 9 0 3.9-2.5 7.22-6 8.48M12 3C7.03 3 3 7.03 3 12c0 3.9 2.5 7.22 6 8.48M12 3v18m-6-9h12"
                    />
                  </svg>
                  <span 
                    className="text-xs text-blue-700 font-medium prose max-w-none prose-xs"
                    dangerouslySetInnerHTML={{ __html: language }}
                  />
                </div>
              )}
            </div>

            <div className="mb-2 mt-2">
              <div className="flex items-baseline space-x-3">
                {discountPercentage > 0 && (
                  <span className="text-gray-500 text-2xl line-through font-medium">
                    {formatPrice(basePrice)}
                  </span>
                )}
                <div className="text-xl font-semibold text-gray-800">
                  {formatPrice(sellingPrice)}
                </div>
                {discountPercentage > 0 && (
                  <span className="ml-2 text-sm px-3 py-1 rounded-full bg-green-100 text-green-800 font-bold border border-green-200">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            <div className="mt-auto">
              <button
                className={`w-full py-3 rounded-lg font-semibold shadow-sm ${
                  showDetails
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-blue-600 text-white"
                }`}
                onClick={handleEnrollClick}
              >
                {sellingPrice === 0 ? "Start Learning Free" : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {shouldShowPaymentForm && <PaymentModal />}
    </>
  );
};

export default CourseCard;