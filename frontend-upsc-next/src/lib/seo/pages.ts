import { buildMetadata, type PageSeoInput } from "@/lib/seo/config";
import {
  BLOG_SEO,
  PAGE_SEO,
  shouldNoindex,
  type BlogSeoEntry,
  type PageSeoEntry,
} from "@/lib/seo/seo-data";

export { BLOG_SEO, PAGE_SEO, shouldNoindex };

export function metadataForPath(path: string) {
  const seo = PAGE_SEO[path];
  const noindex = shouldNoindex(path) || seo?.noindex;

  if (seo) {
    return buildMetadata({ ...seo, path, noindex: noindex || seo.noindex });
  }

  const segment = path.split("/").filter(Boolean).pop() ?? "MentorsDaily";
  const title = segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return buildMetadata({
    path,
    title: `${title} | MentorsDaily`,
    description: `Explore ${title} on MentorsDaily — expert UPSC preparation and mentorship.`,
    noindex,
  });
}

export function metadataForBlogSlug(slug: string) {
  const seo: BlogSeoEntry | undefined = BLOG_SEO[slug];
  const path = `/blogs/${slug}`;
  if (seo) return buildMetadata({ ...seo, path });
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return buildMetadata({
    path,
    title: `${title} | MentorsDaily Blog`,
    description: `Expert UPSC guide: ${title}. Strategies and tips from MentorsDaily.`,
    ogType: "article",
  });
}

export function getPageSeoEntry(path: string): PageSeoEntry | undefined {
  return PAGE_SEO[path];
}

export function getBlogSeoEntry(slug: string): BlogSeoEntry | undefined {
  return BLOG_SEO[slug];
}
