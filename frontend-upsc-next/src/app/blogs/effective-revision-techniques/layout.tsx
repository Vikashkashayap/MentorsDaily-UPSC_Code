import { metadataForBlogSlug } from "@/lib/seo/pages";
export const metadata = metadataForBlogSlug("effective-revision-techniques");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
