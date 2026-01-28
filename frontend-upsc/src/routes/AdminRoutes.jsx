import { lazy } from "react";
import { Route } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROUTES } from '../constants/routesEnum';

// Admin roles constant
const ADMIN_ROLES = ["admin", "super_admin"];

// Lazy load admin components
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminUsers = lazy(() => import("../pages/admin/AdminUsers"));
const AdminPayments = lazy(() => import("../pages/admin/AdminPayments"));
const AdminCourses = lazy(() => import("../pages/admin/AdminCourses"));
const AdminCourseDetails = lazy(() => import("../pages/admin/AdminCourseDetails"));
const AdminCurrentAffairs = lazy(() => import("../pages/admin/AdminCurrentAffairs"));
const AdminPreviousYearPapers = lazy(() => import("../pages/admin/AdminPreviousYearPapers"));
const ManageFreeResources = lazy(() => import("../pages/admin/ManageFreeResources"));
const ManagePreparationBlogs = lazy(() => import("../pages/admin/ManagePreparationBlogs"));
const Analytics = lazy(() => import("../pages/admin/Analytics"));
const Settings = lazy(() => import("../pages/admin/Settings"));

const AdminRoutes = () => {
  return (
    <>
      {/* Admin Dashboard Routes */}
      <Route path={ROUTES.ADMIN_DASHBOARD} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <AdminDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />
      
      {/* Legacy admin route redirect */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <AdminDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* User Management */}
      <Route path={ROUTES.ADMIN_USERS} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <AdminUsers />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Payment Management */}
      <Route path={ROUTES.ADMIN_PAYMENTS} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <AdminPayments />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Course Management */}
      <Route path={ROUTES.ADMIN_COURSES} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <AdminCourses />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin/courses/details/:id" element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <AdminCourseDetails />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Current Affairs Management */}
      <Route path={ROUTES.ADMIN_CURRENT_AFFAIRS} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <AdminCurrentAffairs />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Previous Year Papers Management */}
      <Route path={ROUTES.ADMIN_PREVIOUS_YEAR_PAPERS} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <AdminPreviousYearPapers />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Free Resources Management */}
      <Route path={ROUTES.MANAGE_FREE_RESOURCES} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <ManageFreeResources />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Preparation Blogs Management */}
      <Route path="/admin/preparation-blogs" element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <ManagePreparationBlogs />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Analytics & Settings */}
      <Route path={ROUTES.ADMIN_ANALYTICS} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <Analytics />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.ADMIN_SETTINGS} element={
        <ProtectedRoute allowedRoles={ADMIN_ROLES}>
          <MainLayout>
            <Settings />
          </MainLayout>
        </ProtectedRoute>
      } />
    </>
  );
};

export default AdminRoutes;