import React, { lazy } from "react";
import { Route } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { ROUTES } from '../constants/routesEnum';

// Lazy load user components
const UserDashboard = lazy(() => import("../pages/user/UserDashboard"));
const AskMentorsDaily = lazy(() => import("../pages/user/AskMentorsDaily"));
const CurrentAffairs = lazy(() => import("../pages/user/CurrentAffairsList"));
const MyLibrary = lazy(() => import("../pages/user/MyLibrary"));
const MCQPractice = lazy(() => import("../pages/user/MCQPractice"));
const PrelimsPYQs = lazy(() => import("../pages/user/PrelimsPYQs"));
const MyTests = lazy(() => import("../pages/user/MyTests"));
const AnswerEvaluation = lazy(() => import("../pages/user/AnswerEvaluation"));
const MainsPYQs = lazy(() => import("../pages/user/MainsPYQs"));
const MyProgress = lazy(() => import("../pages/user/MyProgress"));
const HelpSupport = lazy(() => import("../pages/user/HelpSupport"));
const Profile = lazy(() => import("../pages/user/Profile"));

const UserRoutes = () => {
  return (
    <>
      {/* User Dashboard */}
      <Route path={ROUTES.USER_DASHBOARD} element={
        <ProtectedRoute>
          <MainLayout>
            <UserDashboard />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Study Features */}
      <Route path={ROUTES.ASK_MENTORSDAILY} element={
        <ProtectedRoute>
          <MainLayout>
            <AskMentorsDaily />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.CURRENT_AFFAIRS} element={
        <ProtectedRoute>
          <MainLayout>
            <CurrentAffairs />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.MY_LIBRARY} element={
        <ProtectedRoute>
          <MainLayout>
            <MyLibrary />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* Practice & Tests */}
      <Route path={ROUTES.MCQ_PRACTICE} element={
        <ProtectedRoute>
          <MainLayout>
            <MCQPractice />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.PRELIMS_PYQS} element={
        <ProtectedRoute>
          <MainLayout>
            <PrelimsPYQs />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.MY_TESTS} element={
        <ProtectedRoute>
          <MainLayout>
            <MyTests />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.ANSWER_EVALUATION} element={
        <ProtectedRoute>
          <MainLayout>
            <AnswerEvaluation />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.MAINS_PYQS} element={
        <ProtectedRoute>
          <MainLayout>
            <MainsPYQs />
          </MainLayout>
        </ProtectedRoute>
      } />

      {/* User Management */}
      <Route path={ROUTES.MY_PROGRESS} element={
        <ProtectedRoute>
          <MainLayout>
            <MyProgress />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.HELP_SUPPORT} element={
        <ProtectedRoute>
          <MainLayout>
            <HelpSupport />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.PROFILE} element={
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>
      } />
    </>
  );
};

export default UserRoutes;