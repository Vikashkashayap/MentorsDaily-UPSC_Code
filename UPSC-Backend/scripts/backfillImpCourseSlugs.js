/**
 * One-time / ops: set `slug` (e.g. integrated-mentorship-2027) on IMP courses
 * whose titles contain a 20xx year but slug is missing. Fixes payment + GET /course/slug.
 *
 * Usage: node scripts/backfillImpCourseSlugs.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const Course = require("../src/models/course.model.js");

function stripHtml(s) {
  return String(s)
    .replace(/<!--.*?-->/gs, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function impYearFromTitle(title) {
  const t = stripHtml(title);
  if (!/integrated/i.test(t) || !/mentorship/i.test(t)) return null;
  const years = [...t.matchAll(/\b(20\d{2})\b/g)].map((x) => x[1]);
  const ok = years.find((y) => {
    const n = parseInt(y, 10);
    return n >= 2020 && n <= 2040;
  });
  return ok || null;
}

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const all = await Course.find({}).select("title slug _id").lean();
  let updated = 0;
  for (const row of all) {
    const year = impYearFromTitle(row.title);
    if (!year) continue;
    const nextSlug = `integrated-mentorship-${year}`;
    const cur = row.slug ? String(row.slug).trim() : "";
    if (cur === nextSlug) continue;
    const res = await Course.updateOne(
      { _id: row._id },
      { $set: { slug: nextSlug } }
    );
    if (res.modifiedCount) {
      console.log(`slug → ${nextSlug} | ${row._id} | ${stripHtml(row.title).slice(0, 60)}…`);
      updated += 1;
    }
  }
  console.log(`Done. Updated ${updated} course(s).`);
  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
