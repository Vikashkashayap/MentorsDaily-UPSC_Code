import { metadataForPath } from "@/lib/seo/pages";
export const metadata = metadataForPath("/admin/settings");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
