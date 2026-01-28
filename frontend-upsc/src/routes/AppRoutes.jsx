import React, { Suspense } from "react";
import { Routes } from "react-router-dom";
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import BlogRoutes from './BlogRoutes';

// Loading component for lazy loading
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);


export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        {PublicRoutes()}

        {/* Blog Routes */}
        {BlogRoutes()}

        {/* Admin Routes */}
        {AdminRoutes()}

        {/* User Routes */}
        {UserRoutes()}
      </Routes>
    </Suspense>
  );
}