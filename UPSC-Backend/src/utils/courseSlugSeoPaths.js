/** Root paths that are never course landing slugs (SPA routes, static, auth). */
const RESERVED_ROOT_SLUGS = new Set([
  "api",
  "assets",
  "images",
  "logo",
  "favicon.ico",
  "favicon.png",
  "apple-touch-icon.png",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "mentorship-courses",
  "mentorshipcourses",
  "login",
  "register",
  "home",
  "admin",
  "student",
  "contact-us",
  "about-us",
  "privacy-policy",
  "terms-and-conditions",
  "refund-cancellation",
  "careers",
  "success-stories",
  "budget-survey",
  "preparation-blogs",
  "preparation-blog",
  "blog",
  "current-affairs",
  "currentaffairs",
  "previous-year-papers",
  "free-study-materials",
  "free-resource",
  "upsc-syllabus",
  "download-ncerts",
  "upsc-age-calculator",
  "integrated-mentorship",
  "program",
  "courses",
  "course",
  "uppcs-mentorship",
  "uppcs-mentorship-2027",
  "mppsc-mentorship-2027",
]);

function decodePathSegment(raw) {
  if (raw == null) return "";
  try {
    return decodeURIComponent(String(raw));
  } catch {
    return String(raw);
  }
}

function isReservedRootSlug(slug) {
  const s = String(slug || "").trim().toLowerCase();
  if (!s) return true;
  if (RESERVED_ROOT_SLUGS.has(s)) return true;
  if (/\.[a-z0-9]{1,8}$/i.test(s)) return true;
  return false;
}

/** Extract a public course slug from `/{slug}` style landing URLs. */
function rootSlugFromPathname(pathname) {
  const p = String(pathname || "");
  const m = p.match(/^\/([^/]+)\/?$/);
  if (!m) return null;
  const slug = decodePathSegment(m[1]).trim();
  if (!slug || isReservedRootSlug(slug)) return null;
  return slug;
}

function isCourseBotHtmlPath(pathname) {
  const p = String(pathname || "");
  if (/^\/courses\/[^/]+(?:\/[^/]+)?\/?$/.test(p)) return true;
  if (/^\/program\/[^/]+\/?$/.test(p)) return true;
  if (/^\/integrated-mentorship-\d{4}\/?$/.test(p)) return true;
  if (rootSlugFromPathname(p)) return true;
  return false;
}

module.exports = {
  RESERVED_ROOT_SLUGS,
  decodePathSegment,
  isReservedRootSlug,
  rootSlugFromPathname,
  isCourseBotHtmlPath,
};
