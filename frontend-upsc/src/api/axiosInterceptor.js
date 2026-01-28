import axios from "axios";
import { logout } from "../utils/authUtils";
import { ROUTES } from "../constants/routesEnum";

// Setup axios interceptor for global error handling
export const setupAxiosInterceptor = () => {
  // Response interceptor
  axios.interceptors.response.use(
    (response) => {
      // Return successful response as is
      return response;
    },
    (error) => {
      // Handle 401 Unauthorized errors (token expired or invalid)
      if (error.response?.status === 401) {
        // Check if this is a public request (doesn't require auth)
        const isPublicRequest = error.config?.isPublicRequest === true || 
                                error.config?.requiresAuth === false;
        
        // Check if we're on a public route
        const currentPath = window.location.pathname;
        const publicRoutes = [
          '/previous-year-papers',
          '/free-study-materials',
          '/upsc-syllabus',
          '/download-ncerts',
          '/currentAffairs',
          '/budget-survey',
          '/upsc-preparation-blog',
          '/success-stories',
          '/preparation-blogs',
          '/contact-us',
          '/about-us',
          '/privacy-policy',
          '/terms-and-conditions',
          '/refund-cancellation',
          '/',
          '/login',
          '/register'
        ];
        const isPublicRoute = publicRoutes.some(route => currentPath.startsWith(route));
        
        // Only redirect to login if it's NOT a public request/route
        if (!isPublicRequest && !isPublicRoute) {
          console.warn("Token expired or unauthorized. Logging out...");
          
          // Clear all authentication data
          logout();
          
          // Redirect to login page
          window.location.href = ROUTES.LOGIN;
        }
        
        // Return rejected promise to prevent further processing
        return Promise.reject(error);
      }
      
      // For other errors, just pass them through
      return Promise.reject(error);
    }
  );
};
