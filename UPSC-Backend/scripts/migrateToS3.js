/**
 * One-time migration: UploadedDocuments base64 + Grid refs → S3 URLs on Course, PreparationBlog, FreeResource, CurrentAffair.
 *
 * Usage (from repo root):
 *   npm run migrate:s3
 *
 * Dry run (no DB writes, no S3 uploads):
 *   MIGRATE_S3_DRY_RUN=1 npm run migrate:s3
 *
 * Requires .env: MONGO_URI, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME or AWS_S3_BUCKET
 */

require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const mongoose = require("mongoose");
const UploadedDocuments = require("../src/models/uploadedDocuments.model.js");
const Course = require("../src/models/course.model.js");
const PreparationBlog = require("../src/models/preparationBlog.model.js");
const CurrentAffair = require("../src/models/CurrentAffair.js");
const FreeResource = require("../src/models/freeResource.model.js");
const { uploadBuffer } = require("../src/utility/s3.js");

const DRY = String(process.env.MIGRATE_S3_DRY_RUN || "").trim() === "1";

function parseDataUrl(s) {
  const m = String(s || "").match(/^data:([^;]+);base64,(.+)$/i);
  if (!m) return null;
  try {
    return { contentType: m[1].trim(), buffer: Buffer.from(m[2], "base64") };
  } catch {
    return null;
  }
}

function isHttpUrl(s) {
  return /^https?:\/\//i.test(String(s || "").trim());
}

function looksLikeBase64Field(s) {
  const t = String(s || "").trim();
  if (!t) return false;
  if (t.startsWith("data:")) return true;
  if (isHttpUrl(t)) return false;
  return t.length > 200 && /^[A-Za-z0-9+/=\s]+$/.test(t.slice(0, 500));
}

async function uploadFromUploadedDoc(doc, folder) {
  if (!doc || !doc.data) {
    console.warn("  skip: missing data on UploadedDocuments", doc?._id);
    return null;
  }
  if (DRY) {
    console.log(`  [dry-run] would upload UploadedDocuments ${doc._id} → uploads/${folder}/…`);
    return `https://example.invalid/dry-run/${doc._id}`;
  }
  const buf = Buffer.from(doc.data, "base64");
  const { url } = await uploadBuffer({
    buffer: buf,
    contentType: doc.contentType || "application/octet-stream",
    originalFilename: doc.filename || "file",
    folder,
  });
  return url;
}

async function migrateCourses() {
  const list = await Course.collection
    .find({ thumbnail: { $exists: true, $ne: null } })
    .toArray();
  let n = 0;
  for (const c of list) {
    const id = c.thumbnail;
    if (!id || !mongoose.Types.ObjectId.isValid(String(id))) continue;
    const doc = await UploadedDocuments.findById(id).lean();
    const url = await uploadFromUploadedDoc(doc, "thumbnails");
    if (!url) continue;
    if (!DRY) {
      await Course.updateOne(
        { _id: c._id },
        { $set: { thumbnailUrl: url }, $unset: { thumbnail: "" } }
      );
    }
    n += 1;
    console.log(`Course ${c._id} → thumbnailUrl`);
  }
  console.log(`Courses migrated (thumbnail ref): ${n}`);
}

async function migrateBlogs() {
  const blogs = await PreparationBlog.collection.find({}).toArray();
  let n = 0;
  for (const b of blogs) {
    const set = {};
    const unset = {};

    const fileRef = b.file;
    if (fileRef && mongoose.Types.ObjectId.isValid(String(fileRef))) {
      const doc = await UploadedDocuments.findById(fileRef).lean();
      if (doc) {
        const folder = String(doc.contentType || "").includes("pdf") ? "pdfs" : "thumbnails";
        const url = await uploadFromUploadedDoc(doc, folder);
        if (url) {
          if (folder === "pdfs") set.pdfUrl = url;
          else if (!b.thumbnailUrl) set.thumbnailUrl = url;
          unset.file = "";
          n += 1;
        }
      }
    }

    if (b.thumbnail != null && String(b.thumbnail).trim() && !b.thumbnailUrl) {
      const t = String(b.thumbnail).trim();
      if (isHttpUrl(t)) {
        set.thumbnailUrl = t;
        unset.thumbnail = "";
        n += 1;
      } else if (t.startsWith("data:")) {
        const parsed = parseDataUrl(t);
        if (parsed && !DRY) {
          const { url } = await uploadBuffer({
            buffer: parsed.buffer,
            contentType: parsed.contentType,
            originalFilename: "legacy-thumb",
            folder: "thumbnails",
          });
          set.thumbnailUrl = url;
          unset.thumbnail = "";
          n += 1;
        } else if (parsed && DRY) {
          console.log(`  [dry-run] data-URL legacy thumbnail blog ${b._id}`);
          n += 1;
        }
      }
    }

    const tu = b.thumbnailUrl || set.thumbnailUrl;
    if (tu && looksLikeBase64Field(tu) && !isHttpUrl(tu) && !String(tu).startsWith("data:")) {
      try {
        const buf = Buffer.from(String(tu).replace(/\s/g, ""), "base64");
        if (buf.length >= 32) {
          if (!DRY) {
            const { url } = await uploadBuffer({
              buffer: buf,
              contentType: "image/jpeg",
              originalFilename: "thumb-raw-b64.jpg",
              folder: "thumbnails",
            });
            set.thumbnailUrl = url;
          }
          n += 1;
        }
      } catch {
        /* ignore */
      }
    } else if (tu && String(tu).startsWith("data:")) {
      const parsed = parseDataUrl(tu);
      if (parsed) {
        if (!DRY) {
          const { url } = await uploadBuffer({
            buffer: parsed.buffer,
            contentType: parsed.contentType,
            originalFilename: "thumb-from-data-url",
            folder: "thumbnails",
          });
          set.thumbnailUrl = url;
        }
        n += 1;
      }
    }

    if (Object.keys(set).length && !DRY) {
      await PreparationBlog.updateOne(
        { _id: b._id },
        {
          $set: set,
          ...(Object.keys(unset).length ? { $unset: unset } : {}),
        }
      );
      console.log(`Blog ${b._id} updated`);
    } else if (Object.keys(set).length && DRY) {
      console.log(`[dry-run] Blog ${b._id} would set`, Object.keys(set));
    }
  }
  console.log(`Blogs touched: ${n}`);
}

async function migrateCurrentAffairs() {
  const list = await CurrentAffair.find({}).lean();
  let n = 0;
  for (const a of list) {
    const tu = a.thumbnailUrl;
    if (!tu || isHttpUrl(tu)) continue;
    if (!looksLikeBase64Field(tu)) continue;
    const parsed = parseDataUrl(tu);
    if (!parsed) {
      try {
        const buf = Buffer.from(String(tu).replace(/\s/g, ""), "base64");
        if (buf.length < 32) continue;
        if (!DRY) {
          const { url } = await uploadBuffer({
            buffer: buf,
            contentType: "image/jpeg",
            originalFilename: "affair-thumb.jpg",
            folder: "thumbnails",
          });
          await CurrentAffair.updateOne({ _id: a._id }, { $set: { thumbnailUrl: url } });
        }
        n += 1;
        console.log(`CurrentAffair ${a._id} base64 → S3`);
      } catch {
        /* ignore */
      }
      continue;
    }
    if (!DRY) {
      const { url } = await uploadBuffer({
        buffer: parsed.buffer,
        contentType: parsed.contentType,
        originalFilename: "affair-thumb",
        folder: "thumbnails",
      });
      await CurrentAffair.updateOne({ _id: a._id }, { $set: { thumbnailUrl: url } });
    }
    n += 1;
    console.log(`CurrentAffair ${a._id} data URL → S3`);
  }
  console.log(`Current affairs migrated: ${n}`);
}

async function migrateFreeResources() {
  const list = await FreeResource.collection
    .find({ fileId: { $exists: true, $ne: null } })
    .toArray();
  let n = 0;
  for (const r of list) {
    const fid = r.fileId;
    if (!fid || !mongoose.Types.ObjectId.isValid(fid)) continue;
    const doc = await UploadedDocuments.findById(fid).lean();
    const url = await uploadFromUploadedDoc(doc, "pdfs");
    if (!url) continue;
    if (!DRY) {
      await FreeResource.updateOne(
        { _id: r._id },
        { $set: { pdfUrl: url }, $unset: { fileId: "" } }
      );
    }
    n += 1;
    console.log(`FreeResource ${r._id} → pdfUrl`);
  }
  console.log(`Free resources migrated: ${n}`);
}

async function optionalDeleteUploadedDocs() {
  if (DRY || String(process.env.MIGRATE_S3_DELETE_UPLOADED_DOCS || "").trim() !== "1") {
    console.log("UploadedDocuments collection not deleted (set MIGRATE_S3_DELETE_UPLOADED_DOCS=1 to remove after verify).");
    return;
  }
  const r = await UploadedDocuments.deleteMany({});
  console.log(`Deleted UploadedDocuments count: ${r.deletedCount}`);
}

async function main() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing");
    process.exit(1);
  }
  console.log(DRY ? "DRY RUN — no writes" : "LIVE migration");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo connected");

  await migrateCourses();
  await migrateBlogs();
  await migrateCurrentAffairs();
  await migrateFreeResources();
  await optionalDeleteUploadedDocs();

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
