import React, { Suspense } from "react";
import { Routes } from "react-router-dom";
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import BlogRoutes from './BlogRoutes';
import RouteSkeleton from "../components/utility/RouteSkeleton";

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteSkeleton />}>
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