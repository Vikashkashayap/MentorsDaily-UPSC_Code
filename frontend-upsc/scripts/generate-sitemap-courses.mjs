/**
 * Generates public/sitemap-courses.xml from the courses API.
 *
 * Run before deploy:
 *   SITE_URL=https://mentorsdaily.com API_URL=https://api.mentorsdaily.com node scripts/generate-sitemap-courses.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(__dirname, "..", "public", "sitemap-courses.xml");

const SITE_URL = (process.env.SITE_URL || "https://mentorsdaily.com").replace(/\/$/, "");
const API_URL = (process.env.API_URL || process.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

function stripHtml(html) {
  if (!html) return "";
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(text) {
  const plain = stripHtml(text);
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

function courseListFromEnvelope(json) {
  // Accept multiple shapes: array, {data: []}, {data:{data:[]}}
  if (Array.isArray(json)) return json;
  if (Array.isArray(json?.data)) return json.data;
  if (Array.isArray(json?.data?.data)) return json.data.data;
  return [];
}

async function fetchAllCourses() {
  const pageSize = 200;
  const maxPages = 50;
  const out = [];

  for (let page = 1; page <= maxPages; page++) {
    const endpoint = `${API_URL}/api/v1/get-course?page=${page}&limit=${pageSize}`;
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`courses sitemap: API ${endpoint} failed: ${res.status}`);
    }
    const json = await res.json();
    const items = courseListFromEnvelope(json);
    if (!items.length) break;
    out.push(...items);
    if (items.length < pageSize) break;
  }

  return out;
}

async function main() {
  const courses = await fetchAllCourses();
  const now = new Date().toISOString().slice(0, 10);

  const lines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ];

  for (const c of courses) {
    const id = c?._id ? String(c._id) : "";
    if (!id) continue;
    const rawSlug = c?.slug && String(c.slug).trim() ? String(c.slug).trim() : slugify(c?.title || "");
    const loc = `${SITE_URL}/courses/${encodeURIComponent(id)}${rawSlug ? `/${encodeURIComponent(rawSlug)}` : ""}`;
    const last = c.updatedAt || c.createdAt;
    const lastmod = last ? new Date(last).toISOString().slice(0, 10) : now;
    lines.push(`  <url>`);
    lines.push(`    <loc>${escapeXml(loc)}</loc>`);
    lines.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`);
    lines.push(`    <changefreq>weekly</changefreq>`);
    lines.push(`    <priority>0.7</priority>`);
    lines.push(`  </url>`);
  }

  lines.push(`</urlset>`);
  fs.writeFileSync(outFile, lines.join("\n"), "utf8");
  console.log(`Wrote ${courses.length} course URLs to ${outFile}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

