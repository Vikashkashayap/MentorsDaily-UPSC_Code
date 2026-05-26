const UploadedDocuments = require("../models/uploadedDocuments.model.js");
const logger = require("../utility/logger.js");
const {
  buildObjectKey,
  putObjectWithRetry,
  publicUrlForKey,
} = require("../utility/s3.js");

function inferFolderFromMime(mimetype) {
  const m = String(mimetype || "");
  if (m === "application/pdf") return "pdfs";
  if (m.startsWith("image/")) return "images";
  return "images";
}

/**
 * Upload multipart file to S3.
 * @param {Express.Multer.File} file
 * @param {{ folder?: 'images'|'pdfs'|'thumbnails', uploadedBy?: string }} [options]
 * @returns {Promise<{ url: string, key: string, filename: string, contentType: string, size: number }>}
 */
exports.uploadFileService = async (file, options = {}) => {
  logger.info("uploadFiles.service.js << uploadFileService << S3 upload");
  if (!file || !file.buffer) {
    throw new Error("No file buffer");
  }
  const folder = options.folder || inferFolderFromMime(file.mimetype);
  const key = buildObjectKey(folder, file.originalname, file.mimetype);
  try {
    await putObjectWithRetry({
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype || "application/octet-stream",
    });
  } catch (err) {
    logger.error(`uploadFiles.service.js << uploadFileService << S3 error: ${err.message}`);
    throw new Error(err.message || "S3 upload failed");
  }
  const url = publicUrlForKey(key);
  return {
    url,
    key,
    filename: file.originalname,
    contentType: file.mimetype,
    size: file.size,
  };
};

/** Legacy: Mongo Grid-style base64 documents (pre-migration). */
exports.downloadFileService = async (id) => {
  logger.info(`uploadFiles.service.js << downloadFileService << Input: ${id}`);
  const file = await UploadedDocuments.findById(id);
  if (!file) {
    throw new Error("File not found");
  }
  return file.toObject();
};
