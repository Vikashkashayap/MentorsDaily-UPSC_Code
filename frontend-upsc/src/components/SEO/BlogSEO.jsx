import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../../utils/seoUtils';

const BlogSEO = ({ 
  title, 
  description, 
  keywords, 
  author = "MentorsDaily Team",
  publishDate,
  modifiedDate,
  imageUrl,
  articleUrl,
  category = "UPSC Preparation",
  readingTime = "5 min read"
}) => {
  const baseUrl = SEO_CONFIG.siteUrl;
  const fullImageUrl = imageUrl ? `${baseUrl}${imageUrl}` : `${baseUrl}/images/blog-hero.png`;
  const fullArticleUrl = articleUrl ? `${baseUrl}${articleUrl}` : window.location.href;

  // Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": fullImageUrl,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "MentorsDaily",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/Logo/logo.png`
      }
    },
    "datePublished": publishDate,
    "dateModified": modifiedDate || publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullArticleUrl
    },
    "articleSection": category,
    "wordCount": Math.ceil(description.length / 5), // Rough estimate
    "timeRequired": readingTime
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/upsc-preparation-blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": fullArticleUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="article:author" content={author} />
      <meta name="article:section" content={category} />
      <meta name="article:published_time" content={publishDate} />
      <meta name="article:modified_time" content={modifiedDate || publishDate} />
      <meta name="article:tag" content={category} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullArticleUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullArticleUrl} />
      <meta property="og:site_name" content="MentorsDaily" />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="article:author" content={author} />
      <meta property="article:section" content={category} />
      <meta property="article:published_time" content={publishDate} />
      <meta property="article:modified_time" content={modifiedDate || publishDate} />
      <meta property="article:tag" content={category} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@mentorsdaily" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@mentorsdaily" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="MentorsDaily" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="MentorsDaily" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Helmet>
  );
};

export default BlogSEO;
