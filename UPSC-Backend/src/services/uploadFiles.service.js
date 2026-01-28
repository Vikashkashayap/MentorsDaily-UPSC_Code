const UploadedDocuments = require('../models/uploadedDocuments.model.js');
const logger = require('../utility/logger.js');

exports.uploadFileService = async (file, userId) => {
  logger.info('uploadFiles.service.js << uploadFileService << Uploading file');
  try {
    const base64Data = file.buffer.toString('base64');
    const newDoc = await UploadedDocuments.create({
      filename: file.originalname,
      contentType: file.mimetype,
      size: file.size,
      data: base64Data,
      uploadedBy: userId || null,
    });
    const { data, ...safeDoc } = newDoc.toObject();
    return safeDoc;
  } catch (error) {
    logger.error(`uploadFiles.service.js << uploadFileService << ${error}`);
    throw error;
  }
};

exports.downloadFileService = async (id) => {
  logger.info(`uploadFiles.service.js << downloadFileService << Input: ${id}`);
  const file = await UploadedDocuments.findById(id);
  if (!file) {
    throw new Error('File not found');
  }
  return file.toObject();
};