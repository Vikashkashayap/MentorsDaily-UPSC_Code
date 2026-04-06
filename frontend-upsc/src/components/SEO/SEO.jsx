import React from "react";
import { Helmet } from "react-helmet-async";
import {
  SEO_CONFIG,
  optimizeTitle,
  optimizeDescription,
  SEO_LENGTHS,
} from "../../utils/seoUtils";

function resolveSiteUrl() {
  const env = import.meta.env.VITE_SITE_URL;
  if (env && String(env).trim()) return String(env).replace(/\/$/, "");
  return SEO_CONFIG.siteUrl.replace(/\/$/, "");
}

function isAbsoluteUrl(u) {
  return typeof u === "string" && /^https?:\/\//i.test(u);
}

/**
 * Core Open Graph + Twitter meta for any page (SPA). Bots that execute JS see updates;
 * use backend HTML injection for crawlers that do not.
 */
export default function SEO({
  title,
  description,
  image,
  url,
  siteName = SEO_CONFIG.siteName,
  ogType = "website",
  noindex = false,
}) {
  const baseUrl = resolveSiteUrl();
  const fallbackImage = `${baseUrl}/images/hero.png`;

  const safeTitle = optimizeTitle(
    title && String(title).trim() ? title : SEO_CONFIG.defaultTitle,
    SEO_LENGTHS.TITLE_MAX
  );
  const safeDescription = optimizeDescription(
    description && String(description).trim()
      ? description
      : SEO_CONFIG.defaultDescription,
    SEO_LENGTHS.DESCRIPTION_MAX
  );

  let imageUrl = fallbackImage;
  if (image != null && String(image).trim()) {
    const raw = String(image).trim();
    imageUrl = isAbsoluteUrl(raw)
      ? raw
      : `${baseUrl}${raw.startsWith("/") ? "" : "/"}${raw}`;
  }
  if (/^http:\/\//i.test(imageUrl)) {
    imageUrl = `https://${imageUrl.slice(7)}`;
  }

  let pageUrl = baseUrl;
  if (url != null && String(url).trim()) {
    const raw = String(url).trim();
    pageUrl = isAbsoluteUrl(raw)
      ? raw
      : `${baseUrl}${raw.startsWith("/") ? "" : "/"}${raw}`;
  } else if (typeof window !== "undefined" && window.location?.href) {
    pageUrl = window.location.href.split("#")[0];
  }
  if (/^http:\/\//i.test(pageUrl)) {
    pageUrl = `https://${pageUrl.slice(7)}`;
  }

  const ogTitle = optimizeTitle(title || SEO_CONFIG.defaultTitle, SEO_LENGTHS.OG_TITLE_MAX);
  const ogDescription = optimizeDescription(
    description || SEO_CONFIG.defaultDescription,
    SEO_LENGTHS.OG_DESCRIPTION_MAX
  );

  return (
    <Helmet>
      <title>{safeTitle}</title>
      <meta name="description" content={safeDescription} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={imageUrl} />
      {/^https:\/\//i.test(imageUrl) && (
        <meta property="og:image:secure_url" content={imageUrl} />
      )}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogTitle} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={ogTitle} />
    </Helmet>
  );
}
