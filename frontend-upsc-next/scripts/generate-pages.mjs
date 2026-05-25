import fs from "fs";
import path from "path";

const appDir = path.join(process.cwd(), "src", "app");

const staticRoutes = [
  { segment: "page.tsx", importPath: "pages/public/LandingPage", layout: "public", metadataPath: "/" },
  { segment: "login/page.tsx", importPath: "pages/public/auth/Login", layout: "public", metadataPath: "/login" },
  { segment: "register/page.tsx", importPath: "pages/public/auth/Register", layout: "public", metadataPath: "/register" },
  { segment: "mentorship-courses/page.tsx", importPath: "pages/public/mentorship/MentorshipCourses", layout: "public", metadataPath: "/mentorship-courses" },
  { segment: "uppcs-mentorship/page.tsx", importPath: "pages/public/courses/UPPCSMentorship2025", layout: "public" },
  { segment: "uppcs-mentorship-2027/page.tsx", importPath: "pages/public/courses/UPPCSMentorship2027", layout: "public" },
  { segment: "mppsc-mentorship-2027/page.tsx", importPath: "pages/public/courses/MPPSCMentorship2027", layout: "public" },
  { segment: "integrated-mentorship/page.tsx", importPath: "pages/public/courses/IntegratedMentorship", layout: "public" },
  { segment: "integrated-mentorship-2026/page.tsx", importPath: "pages/public/courses/IntegratedMentorship2026", layout: "public" },
  { segment: "integrated-mentorship-2027/page.tsx", importPath: "pages/public/courses/IntegratedMentorship2027", layout: "public" },
  { segment: "integrated-mentorship-2028/page.tsx", importPath: "pages/public/courses/IntegratedMentorship2028", layout: "public" },
  { segment: "integrated-mentorship-2029/page.tsx", importPath: "pages/public/courses/IntegratedMentorship2029", layout: "public" },
  { segment: "integrated-mentorship-2030/page.tsx", importPath: "pages/public/courses/IntegratedMentorship2030", layout: "public" },
  { segment: "previous-year-papers/page.tsx", importPath: "pages/public/PreviousYearPapers", layout: "public", metadataPath: "/previous-year-papers" },
  { segment: "free-study-materials/page.tsx", importPath: "pages/public/FreeStudyMaterials", layout: "public", metadataPath: "/free-study-materials" },
  { segment: "upsc-syllabus/page.tsx", importPath: "pages/public/UPSC2026Syllabus", layout: "public" },
  { segment: "download-ncerts/page.tsx", importPath: "pages/public/DownloadNCERTs", layout: "public" },
  { segment: "upsc-age-calculator/page.tsx", importPath: "pages/public/UPSCAgeCalculator", layout: "public" },
  { segment: "current-affairs/page.tsx", importPath: "pages/public/currentAffairs/CurrentAffairsDropdown", layout: "public", metadataPath: "/current-affairs" },
  { segment: "contact-us/page.tsx", importPath: "pages/public/utils/ContactUs", layout: "public" },
  { segment: "about-us/page.tsx", importPath: "pages/public/utils/AboutUs", layout: "public" },
  { segment: "privacy-policy/page.tsx", importPath: "pages/public/utils/PrivacyPolicy", layout: "public" },
  { segment: "terms-and-conditions/page.tsx", importPath: "pages/public/utils/TermsAndConditions", layout: "public" },
  { segment: "refund-cancellation/page.tsx", importPath: "pages/public/utils/RefundCancellation", layout: "public" },
  { segment: "careers/page.tsx", importPath: "pages/public/utils/Careers", layout: "public" },
  { segment: "success-stories/page.tsx", importPath: "pages/public/SuccessStories", layout: "public" },
  { segment: "budget-survey/page.tsx", importPath: "pages/public/BudgetSurvey", layout: "public" },
  { segment: "preparation-blogs/page.tsx", importPath: "pages/public/PreparationBlogs", layout: "public", metadataPath: "/preparation-blogs" },
  { segment: "home/page.tsx", importPath: "pages/user/UserDashboard", layout: "protected" },
  { segment: "ask/page.tsx", importPath: "pages/user/AskMentorsDaily", layout: "protected" },
  { segment: "study/current-affairs/page.tsx", importPath: "pages/user/CurrentAffairsList", layout: "protected" },
  { segment: "library/page.tsx", importPath: "pages/user/MyLibrary", layout: "protected" },
  { segment: "mcq/page.tsx", importPath: "pages/user/MCQPractice", layout: "protected" },
  { segment: "pyqs/page.tsx", importPath: "pages/user/PrelimsPYQs", layout: "protected" },
  { segment: "my-tests/page.tsx", importPath: "pages/user/MyTests", layout: "protected" },
  { segment: "answer-evaluation/page.tsx", importPath: "pages/user/AnswerEvaluation", layout: "protected" },
  { segment: "mains-pyqs/page.tsx", importPath: "pages/user/MainsPYQs", layout: "protected" },
  { segment: "my-progress/page.tsx", importPath: "pages/user/MyProgress", layout: "protected" },
  { segment: "help-support/page.tsx", importPath: "pages/user/HelpSupport", layout: "protected" },
  { segment: "profile/page.tsx", importPath: "pages/user/Profile", layout: "protected" },
  { segment: "admin/dashboard/page.tsx", importPath: "pages/admin/AdminDashboard", layout: "protected-admin" },
  { segment: "admin/users/page.tsx", importPath: "pages/admin/AdminUsers", layout: "protected-admin" },
  { segment: "admin/payments/page.tsx", importPath: "pages/admin/AdminPayments", layout: "protected-admin" },
  { segment: "admin/courses/page.tsx", importPath: "pages/admin/AdminCourses", layout: "protected-admin" },
  { segment: "admin/current-affairs/page.tsx", importPath: "pages/admin/AdminCurrentAffairs", layout: "protected-admin" },
  { segment: "admin/previous-year-papers/page.tsx", importPath: "pages/admin/AdminPreviousYearPapers", layout: "protected-admin" },
  { segment: "admin/manage-free-resources/page.tsx", importPath: "pages/admin/ManageFreeResources", layout: "protected-admin" },
  { segment: "admin/preparation-blogs/page.tsx", importPath: "pages/admin/ManagePreparationBlogs", layout: "protected-admin" },
  { segment: "admin/analytics/page.tsx", importPath: "pages/admin/Analytics", layout: "protected-admin" },
  { segment: "admin/settings/page.tsx", importPath: "pages/admin/Settings", layout: "protected-admin" },
];

const blogRoutes = [
  ["upsc-prelims-2025-answer-key", "pages/public/blogs/UpscPrelims2025AnswerKey"],
  ["upsc-mains-result-2024", "pages/public/blogs/UpscMainsResult2024"],
  ["how-to-prepare-upsc-2025-in-100-days", "pages/public/blogs/HowToPrepareUpsc2025In100Days"],
  ["how-to-deal-with-stress", "pages/public/blogs/HowToDealWithStress"],
  ["timetable-for-upsc-aspirants", "pages/public/blogs/TimetableForUpscAspirants"],
  ["answer-writing-tips", "pages/public/blogs/AnswerWritingTips"],
  ["how-to-boost-memory", "pages/public/blogs/HowToBoostMemory"],
  ["effective-revision-techniques", "pages/public/blogs/EffectiveRevisionTechniques"],
  ["free-resources-upsc-preparation", "pages/public/blogs/FreeResourcesForUpscPreparation"],
  ["how-to-balance-job-upsc-preparation", "pages/public/blogs/HowToBalanceJobAndUpscPreparation"],
  ["top-5-mistakes-upsc-preparation", "pages/public/blogs/Top5MistakesInUpscPreparation"],
  ["cracking-upsc-first-attempt", "pages/public/blogs/CrackingUpscInFirstAttempt"],
  ["books-every-upsc-aspirant-must-read", "pages/public/blogs/BooksEveryUpscAspirantMustRead"],
  ["difference-prelims-mains", "pages/public/blogs/DifferenceBetweenPrelimsAndMains"],
  ["how-to-start-upsc-2026-preparation", "pages/public/blogs/HowToStartUpsc2026Preparation"],
];

function pathFromSegment(segment) {
  if (segment === "page.tsx") return "/";
  return `/${segment.replace(/\/page\.tsx$/, "")}`;
}

function writeLayout(dir, seoPath, blogSlug) {
  const layoutFile = path.join(dir, "layout.tsx");
  if (blogSlug) {
    fs.writeFileSync(
      layoutFile,
      `import { metadataForBlogSlug } from "@/lib/seo/pages";
export const metadata = metadataForBlogSlug("${blogSlug}");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`,
      "utf8"
    );
  } else {
    fs.writeFileSync(
      layoutFile,
      `import { metadataForPath } from "@/lib/seo/pages";
export const metadata = metadataForPath("${seoPath}");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
`,
      "utf8"
    );
  }
}

function clientPage(importPath) {
  return `"use client";

import LegacyPage from "@/legacy/${importPath}";

export default function GeneratedPage() {
  return <LegacyPage />;
}
`;
}

for (const r of staticRoutes) {
  const file = path.join(appDir, r.segment);
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  const seoPath = r.metadataPath ?? pathFromSegment(r.segment);
  // Root app/layout.tsx is the global shell — do not overwrite with per-page metadata.
  if (r.segment !== "page.tsx") {
    writeLayout(dir, seoPath);
  }
  fs.writeFileSync(file, clientPage(r.importPath), "utf8");
}

for (const [slug, importPath] of blogRoutes) {
  const dir = path.join(appDir, "blogs", slug);
  fs.mkdirSync(dir, { recursive: true });
  writeLayout(dir, `/blogs/${slug}`, slug);
  fs.writeFileSync(path.join(dir, "page.tsx"), clientPage(importPath), "utf8");
}

const dynamicRoutes = [
  {
    file: "course/[category]/[title]/page.tsx",
    layoutPath: "/course",
    body: clientPage("pages/public/mentorship/CourseDetails"),
  },
  {
    file: "courses/[courseId]/[[...courseSlug]]/page.tsx",
    body: clientPage("pages/public/mentorship/CourseDetails"),
  },
  {
    file: "program/[slug]/page.tsx",
    body: clientPage("pages/public/courses/DynamicImpLandingPage"),
  },
  {
    file: "free-resource/[id]/page.tsx",
    body: clientPage("pages/public/FreeResourceDetail"),
  },
  {
    file: "current-affairs/[slug]/page.tsx",
    body: clientPage("pages/public/currentAffairs/CurrentAffairDetail"),
  },
  {
    file: "preparation-blog/[slug]/page.tsx",
    server: true,
  },
  {
    file: "admin/courses/details/[id]/page.tsx",
    body: `"use client";
import AdminCourseDetails from "@/legacy/pages/admin/AdminCourseDetails";
export default function AdminCourseDetailsPage() {
  return <AdminCourseDetails />;
}`,
  },
  {
    file: "not-found.tsx",
    body: `"use client";
import NotFound from "@/legacy/pages/public/NotFound";
export default function NotFoundPage() {
  return <NotFound />;
}`,
  },
];

for (const d of dynamicRoutes) {
  const file = path.join(appDir, d.file);
  const dir = path.dirname(file);
  fs.mkdirSync(dir, { recursive: true });
  if (d.server) {
    fs.writeFileSync(
      path.join(dir, "layout.tsx"),
      `export default function Layout({ children }: { children: React.ReactNode }) { return children; }\n`,
      "utf8"
    );
    fs.writeFileSync(
      file,
      `import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { buildMetadata } from "@/lib/seo/config";
import PreparationBlogClient from "./PreparationBlogClient";

type Props = { params: Promise<{ slug: string }> };

async function fetchBlog(slug: string) {
  try {
    const res = await fetch(
      \`\${publicEnv.apiUrl}/api/v1/preparation/get-blog-by-slug/\${encodeURIComponent(slug)}\`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  const title = blog?.metaTitle || blog?.title || slug.replace(/-/g, " ");
  const description =
    blog?.metaDescription ||
    blog?.excerpt ||
    \`Read \${title} — UPSC preparation insights from MentorsDaily.\`;
  return buildMetadata({
    path: \`/preparation-blog/\${slug}\`,
    title: \`\${String(title).replace(/<[^>]*>/g, "").slice(0, 60)} | MentorsDaily\`,
    description: String(description).replace(/<[^>]*>/g, "").slice(0, 160),
    ogType: "article",
    image: blog?.ogImage || blog?.coverImage,
  });
}

export default function PreparationBlogPage() {
  return <PreparationBlogClient />;
}
`,
      "utf8"
    );
    fs.writeFileSync(
      path.join(dir, "PreparationBlogClient.tsx"),
      clientPage("pages/public/PreparationBlogDetail"),
      "utf8"
    );
  } else {
    fs.writeFileSync(file, d.body, "utf8");
  }
}

console.log("Generated route files");
