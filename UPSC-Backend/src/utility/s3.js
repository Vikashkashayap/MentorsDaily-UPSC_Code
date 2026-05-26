const path = require("path");
const crypto = require("crypto");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

let _client;

function getBucket() {
  const b = process.env.AWS_BUCKET_NAME || process.env.AWS_S3_BUCKET;
  if (!b || !String(b).trim()) {
    throw new Error("Set AWS_BUCKET_NAME or AWS_S3_BUCKET in .env");
  }
  return String(b).trim();
}

function getRegion() {
  const r = process.env.AWS_REGION;
  if (!r || !String(r).trim()) {
    throw new Error("Set AWS_REGION in .env");
  }
  return String(r).trim();
}

/** Prefer explicit env keys when set; otherwise use default chain (EC2 instance profile, etc.). */
function s3ClientConfig() {
  const region = getRegion();
  const accessKeyId = String(process.env.AWS_ACCESS_KEY_ID || "").trim();
  const secretAccessKey = String(process.env.AWS_SECRET_ACCESS_KEY || "").trim();
  const sessionToken = String(process.env.AWS_SESSION_TOKEN || "").trim();
  if (accessKeyId && secretAccessKey) {
    return {
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
        ...(sessionToken ? { sessionToken } : {}),
      },
    };
  }
  return { region };
}

function getS3Client() {
  if (!_client) {
    _client = new S3Client(s3ClientConfig());
  }
  return _client;
}

const MIME_EXT = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
};

function extensionForUpload(originalname, mimetype) {
  const ext = path.extname(originalname || "").toLowerCase();
  if (ext && ext.length <= 8) return ext;
  return MIME_EXT[String(mimetype)] || "";
}

/**
 * @param {'images'|'pdfs'|'thumbnails'} folder
 * @returns {string} S3 object key (no leading slash)
 */
function buildObjectKey(folder, originalname, mimetype) {
  const safeFolder = ["images", "pdfs", "thumbnails"].includes(folder) ? folder : "images";
  const ext = extensionForUpload(originalname, mimetype);
  const unique = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  return `uploads/${safeFolder}/${unique}`;
}

function publicUrlForKey(key) {
  const custom = String(process.env.AWS_S3_PUBLIC_BASE_URL || "").trim().replace(/\/$/, "");
  const encoded = String(key)
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  if (custom) {
    return `${custom}/${encoded}`;
  }
  const bucket = getBucket();
  const region = getRegion();
  return `https://${bucket}.s3.${region}.amazonaws.com/${encoded}`;
}

function isRetryableS3Error(err) {
  const name = err?.name || "";
  const status = err?.$metadata?.httpStatusCode;
  return (
    name === "TimeoutError" ||
    name === "NetworkingError" ||
    status === 503 ||
    status === 500 ||
    status === 429
  );
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * @param {{ Key: string, Body: Buffer, ContentType: string, CacheControl?: string }} params
 */
async function putObjectWithRetry(params, maxAttempts = 3) {
  const client = getS3Client();
  const bucket = getBucket();
  const acl = String(process.env.AWS_S3_OBJECT_ACL || "").trim();

  let lastErr;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const input = {
        Bucket: bucket,
        Key: params.Key,
        Body: params.Body,
        ContentType: params.ContentType,
        CacheControl: params.CacheControl || "public, max-age=31536000, immutable",
      };
      if (acl === "public-read" || acl === "private") {
        input.ACL = acl;
      }
      await client.send(new PutObjectCommand(input));
      return;
    } catch (err) {
      lastErr = err;
      if (!isRetryableS3Error(err) || attempt === maxAttempts) {
        throw err;
      }
      await sleep(200 * attempt);
    }
  }
  throw lastErr;
}

/**
 * Upload a buffer to S3.
 * @param {'images'|'pdfs'|'thumbnails'} folder
 */
async function uploadBuffer({ buffer, contentType, originalFilename, folder }) {
  const safeFolder = folder || "images";
  const key = buildObjectKey(safeFolder, originalFilename || "file", contentType);
  await putObjectWithRetry({
    Key: key,
    Body: buffer,
    ContentType: contentType || "application/octet-stream",
  });
  return { key, url: publicUrlForKey(key) };
}

module.exports = {
  getBucket,
  getRegion,
  getS3Client,
  buildObjectKey,
  publicUrlForKey,
  putObjectWithRetry,
  uploadBuffer,
  extensionForUpload,
};
