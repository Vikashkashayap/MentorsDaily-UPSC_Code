import { metadataForBlogSlug } from "@/lib/seo/pages";
export const metadata = metadataForBlogSlug("answer-writing-tips");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
