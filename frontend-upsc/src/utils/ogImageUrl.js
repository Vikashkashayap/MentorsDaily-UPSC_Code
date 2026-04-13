import { SEO_CONFIG } from "./seoUtils";

/** Default OG image under `public/images/` (served at `/images/...` in production). */
export const DEFAULT_OG_IMAGE_PATH = "/images/default-blog.png";

export function getSiteOrigin() {
  const env =
    typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL;
  const raw = (env && String(env).trim()) || SEO_CONFIG.siteUrl;
  return String(raw).replace(/\/$/, "");
}

/**
 * Convert a site-relative path (`/images/foo.png`) or absolute URL to a canonical HTTPS absolute URL.
 */
export function toAbsoluteOgUrl(pathOrUrl) {
  const base = getSiteOrigin();
  const fallback = `${base}${DEFAULT_OG_IMAGE_PATH}`;
  if (pathOrUrl == null || !String(pathOrUrl).trim()) return fallback;
  let s = String(pathOrUrl).trim();
  if (/^https?:\/\//i.test(s)) {
    if (/^http:\/\//i.test(s)) s = `https://${s.slice(7)}`;
    return s;
  }
  const path = s.startsWith("/") ? s : `/${s}`;
  return `${base}${path}`;
}

/**
 * Public API origin for asset URLs shared off-site (Open Graph, WhatsApp, etc.).
 * Must be an absolute URL reachable from the public internet (e.g. https://api.mentorsdaily.com).
 */
export function getPublicApiOrigin() {
  const pub =
    typeof import.meta !== "undefined" &&
    import.meta.env?.VITE_PUBLIC_API_URL &&
    String(import.meta.env.VITE_PUBLIC_API_URL).trim();
  const base =
    (pub && String(pub).trim()) ||
    (typeof import.meta !== "undefined" &&
      import.meta.env?.VITE_API_URL &&
      String(import.meta.env.VITE_API_URL).trim()) ||
    "";
  let out = String(base).replace(/\/$/, "");
  if (!out && typeof import.meta !== "undefined") {
    const site = import.meta.env?.VITE_SITE_URL && String(import.meta.env.VITE_SITE_URL).trim();
    if (site && /mentorsdaily\.com$/i.test(site.replace(/\/$/, ""))) {
      out = "https://api.mentorsdaily.com";
    }
  }
  return out;
}

function isLikelyBlogCoverImage(file) {
  if (!file) return false;
  const ct = file.contentType && String(file.contentType);
  if (ct && /^image\//i.test(ct)) return true;
  const name = (file.filename && String(file.filename).toLowerCase()) || "";
  return /\.(jpe?g|png|gif|webp|avif|bmp|svg)(\?|$)/i.test(name);
}

/**
 * Absolute URL for uploaded blog cover image (inline, crawler-friendly).
 */
export function uploadedBlogImageUrl(fileId, apiOrigin) {
  const api = (apiOrigin || getPublicApiOrigin()).replace(/\/$/, "");
  if (!api || !fileId) return "";
  let url = `${api}/api/v1/view/${fileId}`;
  if (/^http:\/\//i.test(url)) url = `https://${url.slice(7)}`;
  return url;
}

/**
 * Open Graph image for a preparation blog: hosted file (image/*) or default `hero.png`.
 */
export function getPreparationBlogOgImageUrl(blog) {
  const base = getSiteOrigin();
  if (blog?.metaImage && String(blog.metaImage).trim()) {
    return toAbsoluteOgUrl(blog.metaImage);
  }
  if (blog?.thumbnailUrl && String(blog.thumbnailUrl).trim()) {
    return toAbsoluteOgUrl(blog.thumbnailUrl);
  }
  if (blog?.thumbnail && String(blog.thumbnail).trim()) {
    return toAbsoluteOgUrl(blog.thumbnail);
  }
  const file = blog?.file;
  const fileId = file && (file._id ?? file);
  const api = getPublicApiOrigin();
  if (fileId && isLikelyBlogCoverImage(file) && api) {
    const u = uploadedBlogImageUrl(fileId, api);
    if (u) return u;
  }
  return `${base}${DEFAULT_OG_IMAGE_PATH}`;
}
