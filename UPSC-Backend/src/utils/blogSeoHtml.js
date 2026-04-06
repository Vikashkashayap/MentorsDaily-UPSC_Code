const mongoose = require("mongoose");

function stripHtmlTags(html) {
  if (html == null) return "";
  return String(html).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function generateSlugFromTitle(title) {
  if (!title) return "";
  const plain = stripHtmlTags(title);
  return plain
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtmlAttr(value) {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function ensureHttps(url) {
  if (!url || typeof url !== "string") return "";
  if (/^https:\/\//i.test(url)) return url;
  if (/^http:\/\//i.test(url)) return `https://${url.slice(7)}`;
  return url;
}

/**
 * Build absolute meta fields for a preparation blog (server-side).
 * @param {object} blog — mongoose doc or plain object with title, content, shortDescription, slug, file
 * @param {string} requestSlug — slug from URL (for canonical path)
 * @param {object} env — process.env
 */
function buildBlogMeta(blog, requestSlug, env = process.env) {
  const siteUrl = (env.SITE_URL || env.FRONTEND_URL || "https://mentorsdaily.com").replace(/\/$/, "");
  const apiPublic = (
    env.PUBLIC_API_BASE_URL ||
    env.API_PUBLIC_URL ||
    env.VITE_API_URL ||
    siteUrl
  ).replace(/\/$/, "");

  const plainTitle = stripHtmlTags(blog.title) || "UPSC Preparation Blog";
  const title = `${plainTitle} | MentorsDaily`;
  const rawDesc =
    (blog.shortDescription && String(blog.shortDescription).trim()) ||
    stripHtmlTags(blog.content).slice(0, 160) ||
    "Expert UPSC preparation insights and guidance from MentorsDaily.";
  const description = rawDesc.length > 200 ? `${rawDesc.slice(0, 197)}...` : rawDesc;

  let image = ensureHttps(`${siteUrl}/images/hero.png`);
  const file = blog.file;
  const fileId = file && (file._id || file);
  const contentType = file && file.contentType;
  if (fileId && contentType && String(contentType).startsWith("image/")) {
    image = ensureHttps(`${apiPublic}/api/v1/download/${fileId}`);
  }

  const slugPath = requestSlug || blog.slug || generateSlugFromTitle(blog.title) || String(blog._id || "");
  const pathname = `/preparation-blog/${encodeURIComponent(String(slugPath).replace(/\/+/g, ""))}`;
  const url = ensureHttps(`${siteUrl}${pathname}`);

  return { title, description, image, url, pathname, plainTitle };
}

/**
 * Remove default title / OG / Twitter / canonical from static index.html so crawler sees a single set.
 */
function stripHeadSocialDefaults(html) {
  let h = html.replace(/<title>[\s\S]*?<\/title>/i, "");
  h = h.replace(/<meta\s+[^>]*\bname=["']description["'][^>]*>/gi, "");
  h = h.replace(/<meta\s+[^>]*\bname=["']robots["'][^>]*>/gi, "");
  h = h.replace(/<meta\s+[^>]*\bproperty=["']og:[^"']+["'][^>]*>/gi, "");
  h = h.replace(/<meta\s+[^>]*\bname=["']twitter:[^"']+["'][^>]*>/gi, "");
  h = h.replace(/<link\s+[^>]*\brel=["']canonical["'][^>]*>/gi, "");
  return h;
}

function buildInjectedHeadFragment(meta) {
  const t = escapeHtmlAttr(meta.title);
  const d = escapeHtmlAttr(meta.description);
  const img = escapeHtmlAttr(meta.image);
  const u = escapeHtmlAttr(meta.url);
  const plain = escapeHtmlAttr(meta.plainTitle || stripHtmlTags(meta.title.replace(/\s*\|\s*MentorsDaily\s*$/i, "")));
  const secureImg = meta.image && String(meta.image).startsWith("https://") ? `<meta property="og:image:secure_url" content="${img}" />` : "";
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${u}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${img}" />`,
    secureImg,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${plain}" />`,
    `<meta property="og:url" content="${u}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="MentorsDaily" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@mentorsdaily" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<meta name="twitter:image:alt" content="${plain}" />`,
    `<meta name="robots" content="index, follow" />`,
  ]
    .filter(Boolean)
    .join("\n    ");
}

const CRAWLER_SUBSTRINGS = [
  "facebookexternalhit",
  "facebot",
  "whatsapp",
  "linkedinbot",
  "twitterbot",
  "slackbot",
  "discordbot",
  "telegrambot",
  "pinterest",
  "googlebot",
  "bingbot",
  "embedly",
  "quora link preview",
];

function isSocialOrSearchBot(userAgent) {
  if (!userAgent || typeof userAgent !== "string") return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_SUBSTRINGS.some((s) => ua.includes(s));
}

function isObjectIdString(s) {
  return mongoose.Types.ObjectId.isValid(s) && String(new mongoose.Types.ObjectId(s)) === String(s);
}

module.exports = {
  stripHtmlTags,
  generateSlugFromTitle,
  escapeHtmlAttr,
  ensureHttps,
  buildBlogMeta,
  stripHeadSocialDefaults,
  buildInjectedHeadFragment,
  isSocialOrSearchBot,
  isObjectIdString,
};
