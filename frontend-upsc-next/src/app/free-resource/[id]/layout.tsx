import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/config";
import {
  buildFreeResourceKeywords,
  fetchFreeResourceById,
  stripHtml,
} from "@/lib/seo/fetch-meta";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const resource = await fetchFreeResourceById(id);
  const title = stripHtml(resource?.title) || "Free Study Material";
  const description =
    stripHtml(resource?.description) ||
    `Download ${title} — free UPSC study material from MentorsDaily.`;
  return buildMetadata({
    path: `/free-resource/${id}`,
    title: `${title.slice(0, 55)} | Free UPSC Material | MentorsDaily`,
    description: description.slice(0, 160),
    keywords: resource ? buildFreeResourceKeywords(resource) : undefined,
  });
}

export default function FreeResourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
