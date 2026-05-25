import { metadataForPath } from "@/lib/seo/pages";
export const metadata = metadataForPath("/mentorship-courses");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
