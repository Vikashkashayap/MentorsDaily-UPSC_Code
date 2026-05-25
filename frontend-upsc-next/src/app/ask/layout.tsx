import { metadataForPath } from "@/lib/seo/pages";
export const metadata = metadataForPath("/ask");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
