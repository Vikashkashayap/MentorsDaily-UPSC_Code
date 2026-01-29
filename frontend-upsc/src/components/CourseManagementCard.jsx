import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { formatDate, formatRelativeTime } from "../utils/dateUtils";

const CourseManagementCard = ({ item, onEdit, onDelete, onView, className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const { isDark } = useTheme();

  // Helper function to get thumbnail URL
  const getThumbnailUrl = (thumb) => {
    if (!thumb) return null;

    // If it's already a URL string
    if (typeof thumb === 'string') {
      return thumb;
    }

    // If it's a base64 object
    if (thumb && thumb.data) {
      return `data:${thumb.contentType || 'image/png'};base64,${thumb.data}`;
    }

    // If it's an object with _id (from backend populate)
    if (thumb && thumb._id) {
      const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
      return `${BASE_URL}/api/v1/view/${thumb._id}`;
    }

    // If it's a file path
    if (thumb && thumb.path) {
      return thumb.path;
    }

    return null;
  };

  // Helper function to get initials for fallback avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to get avatar color
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

  const thumbnailUrl = getThumbnailUrl(item.thumbnail);
  return (
    <div className={`group relative p-2 rounded-xl border-2 ${isDark ? 'border-gray-600 bg-gray-800' : 'border-blue-200 bg-white'} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${className}`}>
      {/* Category Ribbon */}
      {item.category && (
        <div className="absolute -top-2 -left-2 z-20">
          <div className="bg-orange-500 text-white px-3 py-1 rounded-none shadow-lg text-xs font-bold uppercase">
            {item.category}
          </div>
        </div>
      )}

      {/* Inner Card */}
      <div
        className={`h-[450px] rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300`}
        onClick={() => onView && onView(item)}
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
          {thumbnailUrl && !imageError ? (
            <img
              src={thumbnailUrl}
              onError={() => setImageError(true)}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${getAvatarColor(item.title)}`}>
              <div className="text-white text-6xl font-bold drop-shadow-lg">
                {getInitials(item.title)}
              </div>
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title */}
          <h3
            className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-3 line-clamp-2 leading-tight prose max-w-none ${isDark ? 'prose-invert' : ''}`}
            dangerouslySetInnerHTML={{ __html: item.title }}
          />

          {/* Course Info Tags */}
          <div className="flex items-center flex-wrap gap-2 text-sm mb-4">
            {item.duration && (
              <div className={`flex items-center space-x-1 ${isDark ? 'bg-blue-900/30 border border-blue-800/50' : 'bg-blue-50'} px-2 py-1 rounded-lg`}>
                <svg className={`w-4 h-4 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span
                  className={`font-medium text-sm ${isDark ? 'text-blue-200' : 'text-blue-700'} prose max-w-none prose-sm ${isDark ? 'prose-invert' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.duration }}
                />
              </div>
            )}
            {item.mode && (
              <div className={`flex items-center space-x-1 ${isDark ? 'bg-purple-900/30 border border-purple-800/50' : 'bg-purple-50'} px-2 py-1 rounded-lg`}>
                <svg className={`w-4 h-4 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
                <span
                  className={`text-sm font-medium ${isDark ? 'text-purple-200' : 'text-purple-700'} prose max-w-none prose-sm ${isDark ? 'prose-invert' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.mode }}
                />
              </div>
            )}
            {item.language && (
              <div className={`flex items-center space-x-1 ${isDark ? 'bg-orange-900/30 border border-orange-800/50' : 'bg-orange-50'} px-2 py-1 rounded-lg`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${isDark ? 'text-orange-300' : 'text-orange-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c4.97 0 9 4.03 9 9 0 3.9-2.5 7.22-6 8.48M12 3C7.03 3 3 7.03 3 12c0 3.9 2.5 7.22 6 8.48M12 3v18m-6-9h12" />
                </svg>
                <span
                  className={`text-sm font-medium ${isDark ? 'text-orange-200' : 'text-orange-700'} prose max-w-none prose-sm ${isDark ? 'prose-invert' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.language }}
                />
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className={`mb-4 p-4 ${isDark ? 'bg-green-900/20 border-green-800/50' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} border rounded-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline space-x-3">
                {item.discountPercentage > 0 && (
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-lg line-through font-medium`}>
                    ₹{item.basePrice?.toLocaleString()}
                  </span>
                )}
                <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                  ₹{item.sellingPrice?.toLocaleString()}
                </div>
              </div>
              {item.discountPercentage > 0 && (
                <span className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full font-bold">
                  {item.discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Date Information */}
          {(item.createdAt || item.updatedAt) && (
            <div className={`mb-4 p-3 ${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'} border rounded-lg`}>
              <div className="space-y-2 text-sm">
                {item.createdAt && (
                  <div className="flex justify-between">
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Created:</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                )}
                {item.updatedAt && (
                  <div className="flex justify-between">
                    <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Updated:</span>
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'} font-medium`}>
                      {formatRelativeTime(item.updatedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                className={`flex-1 py-3 text-sm font-medium ${isDark ? 'text-gray-300 bg-gray-700 hover:bg-gray-600' : 'text-gray-700 bg-gray-100 hover:bg-gray-200'} rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item._id);
                }}
                className="flex-1 py-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagementCard;