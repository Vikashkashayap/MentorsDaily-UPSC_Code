import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  getPageSEO,
  generateMetaTags,
  generateJSONLD,
  SEO_CONFIG,
  shouldNoindexPath,
} from '../../utils/seoUtils';

const SEOHead = ({ pathname, customData = {} }) => {
  const pageData = { ...getPageSEO(pathname), ...customData };
  const metaTags = generateMetaTags(pageData, pathname);
  const jsonLd = generateJSONLD(pageData, pathname);
  const noindex = shouldNoindexPath(pathname) || Boolean(pageData?.noindex);
  const robotsContent = noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      <meta name="author" content={SEO_CONFIG.author} />
      <meta name="robots" content={metaTags.robots || robotsContent} />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={metaTags.canonical} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={metaTags.openGraph.title} />
      <meta property="og:description" content={metaTags.openGraph.description} />
      <meta property="og:url" content={metaTags.openGraph.url} />
      <meta property="og:site_name" content={metaTags.openGraph.siteName} />
      <meta property="og:image" content={metaTags.openGraph.image} />
      <meta property="og:type" content={metaTags.openGraph.type} />
      <meta property="og:locale" content={metaTags.openGraph.locale} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={metaTags.openGraph.title} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={metaTags.twitter.card} />
      <meta name="twitter:site" content={metaTags.twitter.site} />
      <meta name="twitter:title" content={metaTags.twitter.title} />
      <meta name="twitter:description" content={metaTags.twitter.description} />
      <meta name="twitter:image" content={metaTags.twitter.image} />
      <meta name="twitter:image:alt" content={metaTags.twitter.title} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="MentorsDaily" />
      
      {/* Google Site Verification */}
      {SEO_CONFIG.googleSiteVerification && (
        <meta name="google-site-verification" content={SEO_CONFIG.googleSiteVerification} />
      )}
      
      {/* Facebook App ID */}
      {SEO_CONFIG.facebookAppId && (
        <meta property="fb:app_id" content={SEO_CONFIG.facebookAppId} />
      )}
      
      {/* JSON-LD Structured Data */}
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="MentorsDaily" />
      <meta name="msapplication-tooltip" content="UPSC Preparation Platform" />
      <meta name="msapplication-starturl" content="/" />
      
      {/* Mobile Optimization Meta Tags */}
      {/* Keep viewport/mobile meta in `index.html` to avoid duplicates */}
      
      {/* Hreflang tags for international SEO */}
      <link rel="alternate" hrefLang="en-IN" href={metaTags.canonical} />
      <link rel="alternate" hrefLang="en" href={metaTags.canonical} />
      <link rel="alternate" hrefLang="x-default" href={metaTags.canonical} />
      
      {/* Additional Open Graph tags */}
      <meta property="og:see_also" content={SEO_CONFIG.siteUrl} />
      
      {/* Additional Twitter tags */}
      <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />
      <meta name="twitter:domain" content="mentorsdaily.com" />
      
      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/Logo/icon.png" color="#2563eb" />
    </Helmet>
  );
};

export default SEOHead;
