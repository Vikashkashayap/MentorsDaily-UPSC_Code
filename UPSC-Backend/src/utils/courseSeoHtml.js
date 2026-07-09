const { stripHtmlTags, escapeHtmlAttr, ensureHttps, resolvePublicApiOrigin } = require("./blogSeoHtml.js");

function isAbsoluteHttpUrl(url) {
  return /^https?:\/\//i.test(String(url || "").trim());
}

function buildCourseMeta(course, env = process.env, pathname = "/") {
  const siteUrl = (env.SITE_URL || env.FRONTEND_URL || "https://mentorsdaily.com").replace(/\/$/, "");
  const apiPublic = resolvePublicApiOrigin(env, siteUrl);

  const plainTitle =
    (course?.metaTitle && String(course.metaTitle).trim()) ||
    stripHtmlTags(course?.title) ||
    "MentorsDaily Course";
  const title = `${plainTitle} | MentorsDaily`;

  const rawDesc =
    (course?.metaDescription && String(course.metaDescription).trim()) ||
    (course?.shortDescription && String(course.shortDescription).trim()) ||
    stripHtmlTags(course?.description).slice(0, 180) ||
    "Explore this course on MentorsDaily.";
  const description = rawDesc.length > 200 ? `${rawDesc.slice(0, 197)}...` : rawDesc;

  const defaultImage = ensureHttps(`${siteUrl}/images/hero.webp`);
  let image = defaultImage;

  const thumb = course?.thumbnailUrl && String(course.thumbnailUrl).trim();
  if (isAbsoluteHttpUrl(thumb)) {
    image = ensureHttps(thumb);
  } else if (course?.thumbnail?._id && apiPublic) {
    image = ensureHttps(`${apiPublic}/api/v1/view/${course.thumbnail._id}`);
  }

  const safePath = String(pathname || "/").startsWith("/") ? String(pathname || "/") : `/${String(pathname || "/")}`;
  const url = ensureHttps(`${siteUrl}${safePath}`);

  const keywords =
    (course?.seoKeyword && String(course.seoKeyword).trim()) || "";

  return { title, description, image, url, pathname: safePath, plainTitle, keywords };
}

function buildInjectedHeadFragment(meta) {
  const t = escapeHtmlAttr(meta.title);
  const d = escapeHtmlAttr(meta.description);
  const img = escapeHtmlAttr(meta.image);
  const u = escapeHtmlAttr(meta.url);
  const plain = escapeHtmlAttr(meta.plainTitle || stripHtmlTags(meta.title.replace(/\s*\|\s*MentorsDaily\s*$/i, "")));
  const secureImg = meta.image && String(meta.image).startsWith("https://") ? `<meta property="og:image:secure_url" content="${img}" />` : "";
  const keywordsTag = meta.keywords
    ? `<meta name="keywords" content="${escapeHtmlAttr(meta.keywords)}" />`
    : "";
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    keywordsTag,
    `<link rel="canonical" href="${u}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${img}" />`,
    secureImg,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${plain}" />`,
    `<meta property="og:url" content="${u}" />`,
    `<meta property="og:type" content="website" />`,
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

module.exports = {
  buildCourseMeta,
  buildInjectedHeadFragment,
};

