import { metadataForPath } from "@/lib/seo/pages";
export const metadata = metadataForPath("/current-affairs");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
