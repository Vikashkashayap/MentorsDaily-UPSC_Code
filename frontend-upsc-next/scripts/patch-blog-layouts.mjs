import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogsDir = path.join(__dirname, "../src/app/blogs");

for (const name of fs.readdirSync(blogsDir)) {
  const layoutPath = path.join(blogsDir, name, "layout.tsx");
  if (!fs.existsSync(layoutPath)) continue;
  const slug = name;
  const content = `import { metadataForBlogSlug } from "@/lib/seo/pages";
import { BlogSeoJsonLd } from "@/lib/seo/BlogSeoJsonLd";

export const metadata = metadataForBlogSlug(${JSON.stringify(slug)});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BlogSeoJsonLd slug={${JSON.stringify(slug)}} />
      {children}
    </>
  );
}
`;
  fs.writeFileSync(layoutPath, content, "utf8");
  console.log("patched", slug);
}
