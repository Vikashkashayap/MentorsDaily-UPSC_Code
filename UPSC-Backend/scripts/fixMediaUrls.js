/**
 * Rewrite localhost /api/v1/media/... URLs in Mongo to public S3 URLs.
 *   node scripts/fixMediaUrls.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env"), override: true });
const mongoose = require("mongoose");
const { toPublicMediaUrl, getBucket, getRegion } = require("../src/utility/s3.js");

const COLLECTIONS = [
  { name: "courses", fields: ["thumbnailUrl"] },
  { name: "currentaffairs", fields: ["thumbnailUrl"] },
  { name: "preparationblogs", fields: ["thumbnailUrl", "pdfUrl"] },
  { name: "freeresources", fields: ["pdfUrl"] },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`S3 target: https://${getBucket()}.s3.${getRegion()}.amazonaws.com`);

  let updated = 0;
  for (const { name, fields } of COLLECTIONS) {
    const col = mongoose.connection.collection(name);
    const or = fields.map((f) => ({ [f]: /\/api\/v1\/media\//i }));
    const docs = await col.find({ $or: or }).toArray();
    for (const doc of docs) {
      const $set = {};
      for (const f of fields) {
        if (doc[f] && /\/api\/v1\/media\//i.test(String(doc[f]))) {
          $set[f] = toPublicMediaUrl(String(doc[f]));
        }
      }
      if (Object.keys($set).length) {
        await col.updateOne({ _id: doc._id }, { $set });
        updated += 1;
        console.log(`updated ${name} ${doc._id}`, $set);
      }
    }
  }
  console.log(`Done. Documents updated: ${updated}`);
  await mongoose.disconnect();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
