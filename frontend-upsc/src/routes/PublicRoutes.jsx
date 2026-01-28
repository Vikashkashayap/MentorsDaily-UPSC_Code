import React, { lazy } from "react";
import { Route } from "react-router-dom";
import PublicLayout from "../components/Layout/PublicLayout";
import { ROUTES } from '../constants/routesEnum';

// Lazy load components for better performance
const LandingPage = lazy(() => import("../pages/public/LandingPage"));
const Register = lazy(() => import("../pages/public/auth/Register"));
const Login = lazy(() => import("../pages/public/auth/Login"));
const NotFound = lazy(() => import("../pages/public/NotFound"));

// Course Pages
const CourseDetails = lazy(() => import("../pages/public/mentorship/CourseDetails"));
const MentorshipCourses = lazy(() => import("../pages/public/mentorship/MentorshipCourses"));
const UPPCSMentorshipProgram = lazy(() => import("../pages/public/courses/UPPCSMentorship2025"));
const IntegratedMentorship = lazy(() => import("../../src/pages/public/courses/IntegratedMentorship"));
const IntegratedMentorship2026 = lazy(() => import("../../src/pages/public/courses/IntegratedMentorship2026"));
const IntegratedMentorship2027 = lazy(() => import("../../src/pages/public/courses/IntegratedMentorship2027"));
const IntegratedMentorship2028 = lazy(() => import("../../src/pages/public/courses/IntegratedMentorship2028"));
const IntegratedMentorship2029 = lazy(() => import("../../src/pages/public/courses/IntegratedMentorship2029"));
const IntegratedMentorship2030 = lazy(() => import("../../src/pages/public/courses/IntegratedMentorship2030"));

// Study Material Pages
const PreviousYearPapers = lazy(() => import('../pages/public/PreviousYearPapers'));
const FreeStudyMaterials = lazy(() => import('../pages/public/FreeStudyMaterials'));
const FreeResourceDetail = lazy(() => import('../pages/public/FreeResourceDetail'));
const UPSC2026Syllabus = lazy(() => import('../pages/public/UPSC2026Syllabus'));
const DownloadNCERTs = lazy(() => import('../pages/public/DownloadNCERTs'));

// Current Affairs
const CurrentAffairsDropdown = lazy(() => import("../pages/public/currentAffairs/CurrentAffairsDropdown"));
const CurrentAffairDetail = lazy(() => import("../pages/public/currentAffairs/CurrentAffairDetail"));

// Utility Pages
const ContactUs = lazy(() => import("../pages/public/utils/ContactUs"));
const AboutUs = lazy(() => import("../pages/public/utils/AboutUs"));
const PrivacyPolicy = lazy(() => import("../pages/public/utils/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/public/utils/TermsAndConditions"));
const RefundCancellation = lazy(() => import("../pages/public/utils/RefundCancellation"));
const Careers = lazy(() => import("../pages/public/utils/Careers"));

// Other Pages
const BudgetSurvey = lazy(() => import('../pages/public/BudgetSurvey'));

const SuccessStories = lazy(() => import("../pages/public/SuccessStories"));

// Preparation Blogs
const PreparationBlogs = lazy(() => import('../pages/public/PreparationBlogs'));
const PreparationBlogDetail = lazy(() => import('../pages/public/PreparationBlogDetail'));

const PublicRoutes = () => {
  return (
    <>
      {/* Authentication Routes */}
      <Route path={ROUTES.LANDING} element={
        <PublicLayout>
          <LandingPage />
        </PublicLayout>
      } />
      <Route path={ROUTES.REGISTER} element={
        <PublicLayout>
          <Register />
        </PublicLayout>
      } />
      <Route path={ROUTES.LOGIN} element={
        <PublicLayout>
          <Login />
        </PublicLayout>
      } />

      {/* Course Routes */}
      <Route path="/course/:category/:title" element={
        <PublicLayout>
          <CourseDetails />
        </PublicLayout>
      } />
      <Route path="/courses/:courseId/:courseSlug?" element={
        <PublicLayout>
          <CourseDetails />
        </PublicLayout>
      } />
      <Route path="/MentorshipCourses" element={
        <PublicLayout>
          <MentorshipCourses />
        </PublicLayout>
      } />
      <Route path="/uppcs-mentorship" element={
        <PublicLayout>
          <UPPCSMentorshipProgram />
        </PublicLayout>
      } />
      <Route path="/integrated-mentorship" element={
        <PublicLayout>
          <IntegratedMentorship />
        </PublicLayout>
      } />
      <Route path="/integrated-mentorship-2026" element={
        <PublicLayout>
          <IntegratedMentorship2026 />
        </PublicLayout>
      } />
      <Route path="/integrated-mentorship-2027" element={
        <PublicLayout>
          <IntegratedMentorship2027 />
        </PublicLayout>
      } />
      <Route path="/integrated-mentorship-2028" element={
        <PublicLayout>
          <IntegratedMentorship2028 />
        </PublicLayout>
      } />
      <Route path="/integrated-mentorship-2029" element={
        <PublicLayout>
          <IntegratedMentorship2029 />
        </PublicLayout>
      } />
      <Route path="/integrated-mentorship-2030" element={
        <PublicLayout>
          <IntegratedMentorship2030 />
        </PublicLayout>
      } />

      {/* Study Material Routes */}
      <Route path="/previous-year-papers" element={
        <PublicLayout>
          <PreviousYearPapers />
        </PublicLayout>
      } />
      <Route path="/free-study-materials" element={
        <PublicLayout>
          <FreeStudyMaterials />
        </PublicLayout>
      } />
      <Route path="/free-resource/:id" element={
        <PublicLayout>
          <FreeResourceDetail />
        </PublicLayout>
      } />
      <Route path="/upsc-syllabus" element={
        <PublicLayout>
          <UPSC2026Syllabus />
        </PublicLayout>
      } />
      <Route path="/download-ncerts" element={
        <PublicLayout>
          <DownloadNCERTs />
        </PublicLayout>
      } />

      {/* Current Affairs Routes */}
      <Route path="/currentAffairs" element={
        <PublicLayout>
          <CurrentAffairsDropdown />
        </PublicLayout>
      } />
      <Route path="/currentAffairs/:slug" element={
        <PublicLayout showFooter={false}>
          <CurrentAffairDetail />
        </PublicLayout>
      } />
      <Route path="/currentAffairs/:id/:slug" element={
        <PublicLayout showFooter={false}>
          <CurrentAffairDetail />
        </PublicLayout>
      } />

      {/* Utility Pages */}
      <Route path="/contact-us" element={
        <PublicLayout>
          <ContactUs />
        </PublicLayout>
      } />
      <Route path="/about-us" element={
        <PublicLayout>
          <AboutUs />
        </PublicLayout>
      } />
      <Route path="/privacy-policy" element={
        <PublicLayout>
          <PrivacyPolicy />
        </PublicLayout>
      } />
      <Route path="/terms-and-conditions" element={
        <PublicLayout>
          <TermsAndConditions />
        </PublicLayout>
      } />
      <Route path="/refund-cancellation" element={
        <PublicLayout>
          <RefundCancellation />
        </PublicLayout>
      } />
      <Route path="/careers" element={
        <PublicLayout>
          <Careers />
        </PublicLayout>
      } />
      <Route path="/success-stories" element={
        <PublicLayout>
          <SuccessStories />
        </PublicLayout>
      } />
      <Route path="/budget-survey" element={
        <PublicLayout>
          <BudgetSurvey />
        </PublicLayout>
      } />

      {/* Preparation Blogs Routes */}
      <Route path="/preparation-blogs" element={
        <PublicLayout>
          <PreparationBlogs />
        </PublicLayout>
      } />
      <Route path="/preparation-blog/:slug" element={
        <PublicLayout>
          <PreparationBlogDetail />
        </PublicLayout>
      } />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </>
  );
};

export default PublicRoutes;