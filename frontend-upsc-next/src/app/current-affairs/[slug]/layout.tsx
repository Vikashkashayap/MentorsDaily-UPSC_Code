import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/config";
import {
  buildCurrentAffairKeywords,
  fetchCurrentAffairBySlug,
  stripHtml,
} from "@/lib/seo/fetch-meta";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const affair = await fetchCurrentAffairBySlug(slug);
  const title = stripHtml(affair?.title) || slug.replace(/-/g, " ");
  const description =
    stripHtml(affair?.description) ||
    `Read ${title} — UPSC current affairs analysis on MentorsDaily.`;
  return buildMetadata({
    path: `/current-affairs/${slug}`,
    title: `${title.slice(0, 55)} | UPSC Current Affairs | MentorsDaily`,
    description: description.slice(0, 160),
    keywords: affair ? buildCurrentAffairKeywords(affair) : undefined,
    ogType: "article",
    image: affair?.thumbnailUrl,
  });
}

export default function CurrentAffairSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
