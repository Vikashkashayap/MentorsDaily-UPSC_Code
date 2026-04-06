import React from "react";
import { Helmet } from "react-helmet-async";
import SEO from "./SEO";
import { getSiteOrigin } from "../../utils/ogImageUrl";

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
  readingTime = "5 min read",
}) => {
  const baseUrl = getSiteOrigin();
  const fullArticleUrl = (() => {
    if (articleUrl == null || articleUrl === "") {
      return typeof window !== "undefined" ? window.location.href.split("#")[0] : baseUrl;
    }
    const isAbs = typeof articleUrl === "string" && /^https?:\/\//i.test(articleUrl);
    if (isAbs) return articleUrl.replace(/^http:\/\//i, "https://");
    return `${baseUrl}${articleUrl.startsWith("/") ? articleUrl : `/${articleUrl}`}`;
  })();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "MentorsDaily",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/Logo/logo.png`,
      },
    },
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullArticleUrl,
    },
    articleSection: category,
    wordCount: Math.ceil(String(description || "").length / 5),
    timeRequired: readingTime,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Preparation blogs",
        item: `${baseUrl}/preparation-blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: fullArticleUrl,
      },
    ],
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        image={imageUrl}
        url={articleUrl}
        ogType="article"
      />
      <Helmet>
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="article:author" content={author} />
        <meta name="article:section" content={category} />
        {publishDate && (
          <meta name="article:published_time" content={publishDate} />
        )}
        {(modifiedDate || publishDate) && (
          <meta
            name="article:modified_time"
            content={modifiedDate || publishDate}
          />
        )}
        <meta property="article:author" content={author} />
        <meta property="article:section" content={category} />
        {publishDate && (
          <meta property="article:published_time" content={publishDate} />
        )}
        {(modifiedDate || publishDate) && (
          <meta
            property="article:modified_time"
            content={modifiedDate || publishDate}
          />
        )}
        <meta name="twitter:creator" content="@mentorsdaily" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Helmet>
    </>
  );
};

export default BlogSEO;
