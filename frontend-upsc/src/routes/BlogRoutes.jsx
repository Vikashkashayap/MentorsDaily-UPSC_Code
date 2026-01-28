import React, { lazy } from "react";
import { Route } from "react-router-dom";
import PublicLayout from "../components/Layout/PublicLayout";

// Lazy load blog components
const UpscPrelims2025AnswerKey = lazy(() => import('../pages/public/blogs/UpscPrelims2025AnswerKey'));
const UpscMainsResult2024 = lazy(() => import('../pages/public/blogs/UpscMainsResult2024'));
const HowToPrepareUpsc2025In100Days = lazy(() => import('../pages/public/blogs/HowToPrepareUpsc2025In100Days'));
const HowToDealWithStress = lazy(() => import('../pages/public/blogs/HowToDealWithStress'));
const TimetableForUpscAspirants = lazy(() => import('../pages/public/blogs/TimetableForUpscAspirants'));
const AnswerWritingTips = lazy(() => import('../pages/public/blogs/AnswerWritingTips'));
const HowToBoostMemory = lazy(() => import('../pages/public/blogs/HowToBoostMemory'));
const EffectiveRevisionTechniques = lazy(() => import('../pages/public/blogs/EffectiveRevisionTechniques'));
const FreeResourcesForUpscPreparation = lazy(() => import('../pages/public/blogs/FreeResourcesForUpscPreparation'));
const HowToBalanceJobAndUpscPreparation = lazy(() => import('../pages/public/blogs/HowToBalanceJobAndUpscPreparation'));
const Top5MistakesInUpscPreparation = lazy(() => import('../pages/public/blogs/Top5MistakesInUpscPreparation'));
const CrackingUpscInFirstAttempt = lazy(() => import('../pages/public/blogs/CrackingUpscInFirstAttempt'));
const BooksEveryUpscAspirantMustRead = lazy(() => import('../pages/public/blogs/BooksEveryUpscAspirantMustRead'));
const DifferenceBetweenPrelimsAndMains = lazy(() => import('../pages/public/blogs/DifferenceBetweenPrelimsAndMains'));
const HowToStartUpsc2026Preparation = lazy(() => import('../pages/public/blogs/HowToStartUpsc2026Preparation'));

const BlogRoutes = () => {
  return (
    <>
      {/* Blog Routes */}
      <Route path="/blogs/upsc-prelims-2025-answer-key" element={
        <PublicLayout>
          <UpscPrelims2025AnswerKey />
        </PublicLayout>
      } />
      <Route path="/blogs/upsc-mains-result-2024" element={
        <PublicLayout>
          <UpscMainsResult2024 />
        </PublicLayout>
      } />
      <Route path="/blogs/how-to-prepare-upsc-2025-in-100-days" element={
        <PublicLayout>
          <HowToPrepareUpsc2025In100Days />
        </PublicLayout>
      } />
      <Route path="/blogs/how-to-deal-with-stress" element={
        <PublicLayout>
          <HowToDealWithStress />
        </PublicLayout>
      } />
      <Route path="/blogs/timetable-for-upsc-aspirants" element={
        <PublicLayout>
          <TimetableForUpscAspirants />
        </PublicLayout>
      } />
      <Route path="/blogs/answer-writing-tips" element={
        <PublicLayout>
          <AnswerWritingTips />
        </PublicLayout>
      } />
      <Route path="/blogs/how-to-boost-memory" element={
        <PublicLayout>
          <HowToBoostMemory />
        </PublicLayout>
      } />
      <Route path="/blogs/effective-revision-techniques" element={
        <PublicLayout>
          <EffectiveRevisionTechniques />
        </PublicLayout>
      } />
      <Route path="/blogs/free-resources-upsc-preparation" element={
        <PublicLayout>
          <FreeResourcesForUpscPreparation />
        </PublicLayout>
      } />
      <Route path="/blogs/how-to-balance-job-upsc-preparation" element={
        <PublicLayout>
          <HowToBalanceJobAndUpscPreparation />
        </PublicLayout>
      } />
      <Route path="/blogs/top-5-mistakes-upsc-preparation" element={
        <PublicLayout>
          <Top5MistakesInUpscPreparation />
        </PublicLayout>
      } />
      <Route path="/blogs/cracking-upsc-first-attempt" element={
        <PublicLayout>
          <CrackingUpscInFirstAttempt />
        </PublicLayout>
      } />
      <Route path="/blogs/books-every-upsc-aspirant-must-read" element={
        <PublicLayout>
          <BooksEveryUpscAspirantMustRead />
        </PublicLayout>
      } />
      <Route path="/blogs/difference-prelims-mains" element={
        <PublicLayout>
          <DifferenceBetweenPrelimsAndMains />
        </PublicLayout>
      } />
      <Route path="/blogs/how-to-start-upsc-2026-preparation" element={
        <PublicLayout>
          <HowToStartUpsc2026Preparation />
        </PublicLayout>
      } />
    </>
  );
};

export default BlogRoutes;