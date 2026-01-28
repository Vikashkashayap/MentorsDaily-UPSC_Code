import { Navigate, useLocation } from "react-router-dom";
import { getUserData, isAuthenticated } from "../utils/authUtils";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const location = useLocation();
  
  // Check if user is authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role-based access
  try {
    const userData = getUserData();
    
    if (!userData) {
      return <Navigate to="/login" replace />;
    }
    
    // If no specific roles required, allow access
    if (allowedRoles.length === 0) {
      return children;
    }
    
    // Check if user's role is in allowed roles
    if (allowedRoles.includes(userData.role)) {
      return children;
    }
    
    // If user doesn't have required role, redirect based on their role
    const userRole = userData.role;
    if (userRole === "admin" || userRole === "super_admin") {
      // Admin users go to admin dashboard if they don't have access to specific admin page
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      // Regular users go to user dashboard
      return <Navigate to="/home" replace />;
    }
  } catch (error) {
    console.error("Error checking user permissions:", error);
    return <Navigate to="/login" replace />;
  }
}