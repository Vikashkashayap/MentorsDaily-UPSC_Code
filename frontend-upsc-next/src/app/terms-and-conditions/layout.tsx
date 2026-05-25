import { metadataForPath } from "@/lib/seo/pages";
export const metadata = metadataForPath("/terms-and-conditions");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
