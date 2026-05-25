import { metadataForPath } from "@/lib/seo/pages";
export const metadata = metadataForPath("/admin/users");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
