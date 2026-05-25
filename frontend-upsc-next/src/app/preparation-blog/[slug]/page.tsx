import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { buildMetadata } from "@/lib/seo/config";
import PreparationBlogClient from "./PreparationBlogClient";

type Props = { params: Promise<{ slug: string }> };

async function fetchBlog(slug: string) {
  try {
    const res = await fetch(
      `${publicEnv.apiUrl}/api/v1/preparation/get-blog-by-slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? json;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  const title = blog?.metaTitle || blog?.title || slug.replace(/-/g, " ");
  const description =
    blog?.metaDescription ||
    blog?.excerpt ||
    `Read ${title} — UPSC preparation insights from MentorsDaily.`;
  return buildMetadata({
    path: `/preparation-blog/${slug}`,
    title: `${String(title).replace(/<[^>]*>/g, "").slice(0, 60)} | MentorsDaily`,
    description: String(description).replace(/<[^>]*>/g, "").slice(0, 160),
    ogType: "article",
    image: blog?.ogImage || blog?.coverImage,
  });
}

export default function PreparationBlogPage() {
  return <PreparationBlogClient />;
}
