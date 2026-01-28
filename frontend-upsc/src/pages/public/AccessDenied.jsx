import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { getUserData } from "../../utils/authUtils";

export default function AccessDenied() {
  const { isDark } = useTheme();
  const userData = getUserData();
  const isAdmin = userData?.role === "admin" || userData?.role === "super_admin";

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full mx-auto text-center px-4">
        {/* Access Denied Illustration */}
        <div className="mb-8">
          <div className={`text-8xl font-bold ${isDark ? 'text-red-700' : 'text-red-500'} mb-4`}>
            403
          </div>
          <div className="relative">
            <svg 
              className={`w-32 h-32 mx-auto ${isDark ? 'text-red-600' : 'text-red-500'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1.5" 
                d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-5V9m0 0V7m0 2h2m-2 0H10m2-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728A9 9 0 015.636 5.636"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Access Denied
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            You don't have permission to access this page.
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            This page requires {isAdmin ? 'super admin' : 'admin'} privileges.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to={isAdmin ? "/admin/dashboard" : "/home"}
            className={`inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go to {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className={`inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium border rounded-lg transition-all duration-200 ${
              isDark 
                ? 'text-gray-300 border-gray-600 hover:bg-gray-800 hover:text-white' 
                : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            Need higher privileges? Contact your{' '}
            <Link 
              to="/contact-us" 
              className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} underline`}
            >
              system administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}