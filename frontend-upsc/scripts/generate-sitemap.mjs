/**
 * Generates public/sitemap-preparation-blogs.xml from the preparation blogs API.
 * Run before deploy: SITE_URL=... API_URL=... node scripts/generate-sitemap.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(__dirname, "..", "public", "sitemap-preparation-blogs.xml");

const SITE_URL = (process.env.SITE_URL || "https://mentorsdaily.com").replace(/\/$/, "");
const API_URL = (process.env.API_URL || process.env.VITE_API_URL || "http://localhost:5000").replace(
  /\/$/,
  ""
);

function stripHtml(html) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function slugForBlog(b) {
  if (b.slug && String(b.slug).trim()) return String(b.slug).trim();
  const plain = stripHtml(b.title);
  return plain
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function main() {
  const apiEndpoint = `${API_URL}/api/v1/preparation/get-blog`;
  const res = await fetch(apiEndpoint);
  if (!res.ok) {
    console.error(`generate-sitemap: API ${apiEndpoint} failed: ${res.status}`);
    process.exit(1);
  }
  const body = await res.json();
  const raw = body?.data?.data;
  const blogs = Array.isArray(raw) ? raw : [];

  const now = new Date().toISOString().slice(0, 10);
  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `  <url>`,
    `    <loc>${escapeXml(`${SITE_URL}/preparation-blogs`)}</loc>`,
    `    <lastmod>${now}</lastmod>`,
    `    <changefreq>daily</changefreq>`,
    `    <priority>0.85</priority>`,
    `  </url>`,
  ];

  for (const b of blogs) {
    const slug = slugForBlog(b);
    if (!slug) continue;
    const loc = `${SITE_URL}/preparation-blog/${encodeURIComponent(slug)}`;
    const last = b.updatedAt || b.createdAt;
    const lastmod = last ? new Date(last).toISOString().slice(0, 10) : now;
    lines.push(`  <url>`);
    lines.push(`    <loc>${escapeXml(loc)}</loc>`);
    lines.push(`    <lastmod>${lastmod}</lastmod>`);
    lines.push(`    <changefreq>weekly</changefreq>`);
    lines.push(`    <priority>0.8</priority>`);
    lines.push(`  </url>`);
  }

  lines.push(`</urlset>`);
  fs.writeFileSync(outFile, lines.join("\n"), "utf8");
  console.log(`Wrote ${blogs.length} blog URLs to ${outFile}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
