/**
 * One-off port: legacy seoUtils.js → src/lib/seo/seo-data.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = fs.readFileSync(
  path.join(root, "src/legacy/utils/seoUtils.js"),
  "utf8"
);

const BLOG_IMAGES = {
  "upsc-prelims-2025-answer-key": "/images/blog-prelim.webp",
  "upsc-mains-result-2024": "/images/blog-mains.webp",
  "how-to-prepare-upsc-2025-in-100-days": "/images/blog-100days.webp",
  "how-to-deal-with-stress": "/images/blog-stress.webp",
  "timetable-for-upsc-aspirants": "/images/blog-timetable.webp",
  "answer-writing-tips": "/images/blog-answer-writing.webp",
  "how-to-boost-memory": "/images/blog-boost.webp",
  "effective-revision-techniques": "/images/blog-technic.webp",
  "free-resources-upsc-preparation": "/images/blog-resouces.webp",
  "how-to-balance-job-upsc-preparation": "/images/blog-balance.webp",
  "top-5-mistakes-upsc-preparation": "/images/blog-mistake.webp",
  "cracking-upsc-first-attempt": "/images/blog-crack-first.webp",
  "books-every-upsc-aspirant-must-read": "/images/blog-book.webp",
  "difference-prelims-mains": "/images/blog-prelimsvsmains.webp",
  "how-to-start-upsc-2026-preparation": "/images/blog-preparation.webp",
};

function extractObject(name) {
  const start = src.indexOf(`export const ${name} = {`);
  if (start < 0) throw new Error(`Missing ${name}`);
  let i = src.indexOf("{", start);
  let depth = 0;
  let inStr = null;
  let escape = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (escape) escape = false;
      else if (c === "\\") escape = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === "'" || c === '"' || c === "`") {
      inStr = c;
      continue;
    }
    if (c === "{") depth++;
    if (c === "}") {
      depth--;
      if (depth === 0) return src.slice(src.indexOf("{", start), i + 1);
    }
  }
  throw new Error(`Unclosed ${name}`);
}

function parseEntries(objLiteral) {
  const entries = {};
  const keyRe = /['"]([^'"]+)['"]\s*:\s*\{/g;
  let m;
  while ((m = keyRe.exec(objLiteral)) !== null) {
    const key = m[1];
    const blockStart = m.index + m[0].length - 1;
    let depth = 0;
    let inStr = null;
    let escape = false;
    let blockEnd = blockStart;
    for (let i = blockStart; i < objLiteral.length; i++) {
      const c = objLiteral[i];
      if (inStr) {
        if (escape) escape = false;
        else if (c === "\\") escape = true;
        else if (c === inStr) inStr = null;
        continue;
      }
      if (c === "'" || c === '"') {
        inStr = c;
        continue;
      }
      if (c === "{") depth++;
      if (c === "}") {
        depth--;
        if (depth === 0) {
          blockEnd = i + 1;
          break;
        }
      }
    }
    const block = objLiteral.slice(blockStart, blockEnd);
    const pick = (field) => {
      const re = new RegExp(`${field}:\\s*['"]((?:\\\\.|[^'"])*)['"]`);
      const fm = block.match(re);
      return fm ? fm[1].replace(/\\'/g, "'").replace(/\\"/g, '"') : undefined;
    };
    entries[key] = {
      title: pick("title"),
      description: pick("description"),
      keywords: pick("keywords"),
      image: pick("ogImage"),
    };
  }
  return entries;
}

const pageRaw = extractObject("PAGE_SEO_DATA");
const blogRaw = extractObject("BLOG_SEO_DATA");
const pages = parseEntries(pageRaw);
const blogsByPath = parseEntries(blogRaw);

const EXTRA_PAGES = {
  "/preparation-blogs": {
    title: "UPSC Preparation Blogs | Tips & Strategies | MentorsDaily",
    description:
      "Expert UPSC preparation tips, strategies, and guidance from successful candidates.",
    keywords:
      "UPSC preparation tips, study strategies, exam guidance, success tips, preparation blog",
  },
  "/help-support": {
    title: "Help & Support | MentorsDaily UPSC Platform",
    description:
      "Get help with MentorsDaily UPSC courses, mentorship programs, payments, and account support.",
    keywords:
      "MentorsDaily help, UPSC support, mentorship help, course support, customer support",
  },
  "/budget-survey": {
    title: "Budget Survey | MentorsDaily",
    description: "Share your feedback on Union Budget topics relevant to UPSC preparation.",
    keywords: "Union Budget UPSC, budget survey, economy current affairs, GS3 budget",
  },
  "/answer-evaluation": {
    title: "UPSC Answer Evaluation | Mains Writing Review | MentorsDaily",
    description:
      "Get expert evaluation of your UPSC mains answers with detailed feedback and improvement tips.",
    keywords:
      "UPSC answer evaluation, mains answer review, answer writing feedback, MentorsDaily evaluation",
  },
  "/mains-pyqs": {
    title: "UPSC Mains Previous Year Questions | MentorsDaily",
    description: "Practice UPSC mains previous year questions with structured guidance.",
    keywords: "UPSC mains PYQ, mains previous year questions, answer writing practice",
  },
  "/pyqs": {
    title: "UPSC PYQs | Prelims & Mains Questions | MentorsDaily",
    description: "Access UPSC previous year questions for prelims and mains practice.",
    keywords: "UPSC PYQ, previous year questions, prelims PYQ, mains PYQ",
  },
};

Object.assign(pages, EXTRA_PAGES);
if (pages["/upsc-preparation-blog"]) {
  Object.assign(pages["/preparation-blogs"], pages["/upsc-preparation-blog"]);
  delete pages["/upsc-preparation-blog"];
}

const blogSlugFix = {
  "/blogs/how-to-start-upsc-preparation-for-upsc-2026":
    "how-to-start-upsc-2026-preparation",
};

const BLOG_SEO = {};
for (const [p, v] of Object.entries(blogsByPath)) {
  let slug = p.replace(/^\/blogs\//, "");
  if (blogSlugFix[p]) slug = blogSlugFix[p];
  BLOG_SEO[slug] = {
    title: v.title,
    description: v.description,
    keywords: v.keywords,
    ogType: "article",
    image: BLOG_IMAGES[slug] || v.image,
  };
}

const esc = (s) =>
  JSON.stringify(s ?? "")
    .replace(/\$/g, "\\$");

let out = `import type { PageSeoInput } from "@/lib/seo/config";

export type PageSeoEntry = Omit<PageSeoInput, "path">;
export type BlogSeoEntry = PageSeoEntry & { ogType?: "article" };

/** Paths that must not be indexed (user dashboards, tools behind login, admin). */
export const NOINDEX_PATH_PREFIXES = [
  "/admin",
  "/home",
  "/library",
  "/profile",
  "/ask",
  "/mcq",
  "/my-tests",
  "/my-progress",
  "/study/current-affairs",
  "/dashboard",
] as const;

export const NOINDEX_EXACT_PATHS = new Set(["/login"]);

export function shouldNoindex(path: string): boolean {
  if (NOINDEX_EXACT_PATHS.has(path)) return true;
  return NOINDEX_PATH_PREFIXES.some(
    (p) => path === p || path.startsWith(\`\${p}/\`)
  );
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
`;

for (const [path, v] of Object.entries(pages).sort(([a], [b]) => a.localeCompare(b))) {
  const lines = [`  ${JSON.stringify(path)}: {`];
  lines.push(`    title: ${esc(v.title)},`);
  lines.push(`    description: ${esc(v.description)},`);
  if (v.keywords) lines.push(`    keywords: ${esc(v.keywords)},`);
  if (v.image) lines.push(`    image: ${esc(v.image)},`);
  if (path === "/login") lines.push(`    noindex: true,`);
  lines.push(`  },`);
  out += lines.join("\n") + "\n";
}
out += `};\n\nexport const BLOG_SEO: Record<string, BlogSeoEntry> = {\n`;
for (const [slug, v] of Object.entries(BLOG_SEO).sort(([a], [b]) => a.localeCompare(b))) {
  const lines = [`  ${JSON.stringify(slug)}: {`];
  lines.push(`    title: ${esc(v.title)},`);
  lines.push(`    description: ${esc(v.description)},`);
  if (v.keywords) lines.push(`    keywords: ${esc(v.keywords)},`);
  lines.push(`    ogType: "article" as const,`);
  if (v.image) lines.push(`    image: ${esc(v.image)},`);
  lines.push(`  },`);
  out += lines.join("\n") + "\n";
}
out += `};\n`;

const outPath = path.join(root, "src/lib/seo/seo-data.ts");
fs.writeFileSync(outPath, out, "utf8");
console.log("Wrote", outPath, Object.keys(pages).length, "pages", Object.keys(BLOG_SEO).length, "blogs");
