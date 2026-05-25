import { metadataForPath } from "@/lib/seo/pages";
export const metadata = metadataForPath("/previous-year-papers");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
