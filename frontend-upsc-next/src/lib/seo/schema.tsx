import { SEO_CONFIG } from "@/lib/seo/config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.logoUrl}`,
    description: SEO_CONFIG.defaultDescription,
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    sameAs: [
      "https://www.facebook.com/mentorsdaily",
      "https://www.twitter.com/mentorsdaily",
      "https://www.linkedin.com/company/mentorsdaily",
    ],
  };
}

export function articleSchema(data: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}) {
  const base = SEO_CONFIG.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: data.image
      ? data.image.startsWith("http")
        ? data.image
        : `${base}${data.image}`
      : `${base}${SEO_CONFIG.defaultOgImage}`,
    author: {
      "@type": "Person",
      name: data.author ?? SEO_CONFIG.author,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${base}${SEO_CONFIG.logoUrl}`,
      },
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified ?? data.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": data.url },
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
) {
  const base = SEO_CONFIG.siteUrl;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${base}${item.path}`,
    })),
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function courseSchema(data: {
  name: string;
  description: string;
  url: string;
  provider?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: data.name,
    description: data.description,
    url: data.url,
    provider: {
      "@type": "Organization",
      name: data.provider ?? SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
  };
}

export function webApplicationSchema(data: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
