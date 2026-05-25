import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { PAGE_SEO } from "@/lib/seo/seo-data";

const BLOG_PATHS = [
  "/blogs/how-to-prepare-upsc-2025-in-100-days",
  "/blogs/answer-writing-tips",
  "/blogs/how-to-deal-with-stress",
  "/blogs/timetable-for-upsc-aspirants",
  "/blogs/how-to-boost-memory",
  "/blogs/effective-revision-techniques",
  "/blogs/free-resources-upsc-preparation",
  "/blogs/how-to-balance-job-upsc-preparation",
  "/blogs/top-5-mistakes-upsc-preparation",
  "/blogs/cracking-upsc-first-attempt",
  "/blogs/books-every-upsc-aspirant-must-read",
  "/blogs/difference-prelims-mains",
  "/blogs/how-to-start-upsc-2026-preparation",
  "/blogs/upsc-prelims-2025-answer-key",
  "/blogs/upsc-mains-result-2024",
];

const STATIC_PATHS = [
  "/",
  ...Object.keys(PAGE_SEO).filter((p) => p !== "/login"),
  ...BLOG_PATHS,
  "/help-support",
  "/budget-survey",
  "/answer-evaluation",
];

function slugForBlog(b: { slug?: string; title?: string }): string {
  if (b.slug?.trim()) return String(b.slug).trim();
  const plain = String(b.title ?? "")
    .replace(/<[^>]*>/g, " ")
    .trim();
  return plain
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugForAffair(a: { slug?: string; title?: string }): string {
  if (a.slug?.trim()) return String(a.slug).trim();
  return slugForBlog(a);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = publicEnv.siteUrl;
  const now = new Date();
  const uniquePaths = [...new Set(STATIC_PATHS)];
  const entries: MetadataRoute.Sitemap = uniquePaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/current-affairs" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path.startsWith("/blogs/") ? 0.75 : 0.8,
  }));

  try {
    const res = await fetch(
      `${publicEnv.apiUrl}/api/v1/preparation/get-blog?visibility=public&limit=500`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const body = await res.json();
      const blogs = Array.isArray(body?.data?.data)
        ? body.data.data
        : Array.isArray(body?.data)
          ? body.data
          : [];
      for (const b of blogs) {
        const slug = slugForBlog(b);
        if (!slug) continue;
        entries.push({
          url: `${base}/preparation-blog/${encodeURIComponent(slug)}`,
          lastModified: b.updatedAt
            ? new Date(b.updatedAt)
            : b.createdAt
              ? new Date(b.createdAt)
              : now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // API optional at build time
  }

  try {
    let page = 1;
    let hasMore = true;
    while (hasMore && page <= 20) {
      const res = await fetch(
        `${publicEnv.apiUrl}/api/v1/get-affairs?limit=100&page=${page}`,
        { next: { revalidate: 3600 } }
      );
      if (!res.ok) break;
      const body = await res.json();
      const payload = body?.data ?? body;
      const list = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload)
          ? payload
          : [];
      for (const a of list) {
        const slug = slugForAffair(a);
        if (!slug) continue;
        entries.push({
          url: `${base}/current-affairs/${encodeURIComponent(slug)}`,
          lastModified: a.date ? new Date(a.date) : a.updatedAt ? new Date(a.updatedAt) : now,
          changeFrequency: "daily",
          priority: 0.7,
        });
      }
      const totalPages = payload?.totalPages ?? payload?.pagination?.totalPages;
      hasMore = totalPages ? page < totalPages : list.length === 100;
      page += 1;
    }
  } catch {
    // optional
  }

  return entries;
}
