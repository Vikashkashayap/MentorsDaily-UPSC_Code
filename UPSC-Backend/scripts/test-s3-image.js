/**
 * Smoke test: upload a 1×1 PNG to S3 (folder uploads/images/).
 *   node scripts/test-s3-image.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const { uploadBuffer } = require("../src/utility/s3.js");

const MIN_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

(async () => {
  try {
    const r = await uploadBuffer({
      buffer: MIN_PNG,
      contentType: "image/png",
      originalFilename: "pixel.png",
      folder: "images",
    });
    console.log("OK:", r.url);
  } catch (e) {
    console.error("FAIL:", e.message);
    process.exit(1);
  }
})();
