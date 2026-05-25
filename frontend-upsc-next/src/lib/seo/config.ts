import { publicEnv } from "@/lib/env";

export const SEO_CONFIG = {
  siteName: "MentorsDaily",
  siteUrl: publicEnv.siteUrl,
  defaultTitle: "MentorsDaily - UPSC Preparation & Mentorship Platform",
  defaultDescription:
    "Comprehensive UPSC preparation platform with expert mentorship, courses, study materials, and personalized guidance for civil services aspirants.",
  defaultKeywords:
    "UPSC, civil services, IAS preparation, mentorship, study materials, current affairs, prelims, mains, interview",
  author: "MentorsDaily Team",
  twitterHandle: "@mentorsdaily",
  defaultOgImage: "/images/hero.webp",
  logoUrl: "/Logo/logo.png",
  locale: "en_IN",
} as const;

export type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
};

export function buildMetadata(input: PageSeoInput) {
  const base = SEO_CONFIG.siteUrl;
  const canonical = `${base}${input.path.startsWith("/") ? input.path : `/${input.path}`}`;
  const image = input.image?.startsWith("http")
    ? input.image
    : `${base}${input.image ?? SEO_CONFIG.defaultOgImage}`;

  return {
    metadataBase: new URL(base),
    title: input.title,
    description: input.description,
    keywords: input.keywords ?? SEO_CONFIG.defaultKeywords,
    alternates: { canonical },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      type: input.ogType ?? "website",
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      site: SEO_CONFIG.twitterHandle,
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}
