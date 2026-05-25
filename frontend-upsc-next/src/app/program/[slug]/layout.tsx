import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/config";
import { fetchCourseBySlug, stripHtml } from "@/lib/seo/fetch-meta";
import { getPageSeoEntry } from "@/lib/seo/pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const staticPath = `/${slug}`;
  const staticSeo = getPageSeoEntry(staticPath);
  const course = await fetchCourseBySlug(slug);
  if (!course) {
    if (staticSeo) {
      return buildMetadata({ ...staticSeo, path: `/program/${slug}` });
    }
    return buildMetadata({
      path: `/program/${slug}`,
      title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | MentorsDaily`,
      description: `Explore ${slug.replace(/-/g, " ")} UPSC program on MentorsDaily.`,
    });
  }
  const title = stripHtml(course.title) || slug.replace(/-/g, " ");
  const description =
    stripHtml(course.description) ||
    `${title} — structured UPSC mentorship program on MentorsDaily.`;
  return buildMetadata({
    path: `/program/${slug}`,
    title: `${title.slice(0, 55)} | MentorsDaily`,
    description: description.slice(0, 160),
    keywords: `${title}, UPSC mentorship program, MentorsDaily, civil services coaching`,
    image: course.thumbnailUrl || course.image,
  });
}

export default function ProgramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
