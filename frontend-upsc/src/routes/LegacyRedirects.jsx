import { Navigate, useLocation, useParams } from "react-router-dom";

/** Old CamelCase URL → SEO-friendly kebab-case (301-like client redirect). */
export function LegacyCurrentAffairsRedirect() {
  const location = useLocation();
  const rest = location.pathname.slice("/currentAffairs".length);
  const target = `/current-affairs${rest || ""}${location.search}${location.hash}`;
  return <Navigate to={target} replace />;
}

export function LegacyMentorshipCoursesRedirect() {
  return <Navigate to="/mentorship-courses" replace />;
}

/** Canonical preparation blog URLs use /preparation-blog/:slug only. */
export function LegacyPreparationBlogAliasRedirect() {
  const { slug } = useParams();
  if (!slug) return <Navigate to="/preparation-blogs" replace />;
  return <Navigate to={`/preparation-blog/${encodeURIComponent(slug)}`} replace />;
}
