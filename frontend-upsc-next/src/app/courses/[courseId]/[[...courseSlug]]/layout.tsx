import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/config";
import {
  buildCourseKeywords,
  fetchCourseById,
  stripHtml,
} from "@/lib/seo/fetch-meta";

type Props = {
  params: Promise<{ courseId: string; courseSlug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseId, courseSlug } = await params;
  const course = await fetchCourseById(courseId);
  const title = stripHtml(course?.title) || "UPSC Course";
  const slugPart = courseSlug?.length ? `/${courseSlug.join("/")}` : "";
  const path = `/courses/${courseId}${slugPart}`;
  const description =
    stripHtml(course?.description) ||
    `${title} — expert UPSC mentorship and preparation on MentorsDaily.`;
  return buildMetadata({
    path,
    title: `${title.slice(0, 55)} | MentorsDaily`,
    description: description.slice(0, 160),
    keywords: course ? buildCourseKeywords(course) : undefined,
    image: course?.thumbnailUrl || course?.image,
  });
}

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
