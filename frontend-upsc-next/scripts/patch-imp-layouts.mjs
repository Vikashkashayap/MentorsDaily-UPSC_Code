import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "../src/app");

const paths = [
  "/integrated-mentorship",
  "/integrated-mentorship-2026",
  "/integrated-mentorship-2027",
  "/integrated-mentorship-2028",
  "/integrated-mentorship-2029",
  "/integrated-mentorship-2030",
  "/uppcs-mentorship",
  "/uppcs-mentorship-2027",
  "/mppsc-mentorship-2027",
];

for (const p of paths) {
  const dir = path.join(appDir, p.slice(1));
  const layoutPath = path.join(dir, "layout.tsx");
  if (!fs.existsSync(layoutPath)) {
    console.warn("skip", p);
    continue;
  }
  const content = `import { metadataForPath } from "@/lib/seo/pages";
import { MentorshipCourseJsonLd } from "@/lib/seo/PageSeoJsonLd";

export const metadata = metadataForPath(${JSON.stringify(p)});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MentorshipCourseJsonLd path={${JSON.stringify(p)}} />
      {children}
    </>
  );
}
`;
  fs.writeFileSync(layoutPath, content, "utf8");
  console.log("patched", p);
}
