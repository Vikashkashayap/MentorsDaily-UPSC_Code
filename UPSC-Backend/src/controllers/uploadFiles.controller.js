const { uploadFileService, downloadFileService } = require('../services/uploadFiles.service.js');
const { getObject } = require('../utility/s3.js');
const logger = require('../utility/logger.js');
const { setCreateSuccess, setBadRequest, setNotFoundError } = require('../utility/responseHelper.js');

const MEDIA_FOLDERS = new Set(['images', 'pdfs', 'thumbnails']);
const SAFE_FILENAME = /^[A-Za-z0-9._-]+$/;

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return setBadRequest(res, { message: 'No file uploaded' });
    }
    const folderRaw = String(req.body?.folder || '').trim();
    const folder =
      folderRaw === 'pdfs' || folderRaw === 'thumbnails' || folderRaw === 'images'
        ? folderRaw
        : undefined;
    const result = await uploadFileService(file, { folder, uploadedBy: req.user?.id });
    return setCreateSuccess(res, { message: 'File uploaded successfully', data: result });
  } catch (err) {
    logger.error(`uploadFiles.controller.js << uploadFile() << Error: ${err}`);
    return setBadRequest(res, { message: 'Upload failed' });
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const file = await downloadFileService(req.params.id);
    const buffer = Buffer.from(file.data, 'base64');
    const isImage = file.contentType && String(file.contentType).startsWith('image/');
    res.set({
      'Content-Type': file.contentType,
      ...(isImage
        ? {
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Cache-Control': 'public, max-age=604800, immutable',
          }
        : {
            'Content-Disposition': `attachment; filename="${file.filename}"`,
          }),
    });
    return res.send(buffer);
  } catch (err) {
    logger.error(`uploadFiles.controller.js << downloadFile() << Error: ${err}`);
    return setNotFoundError(res, { message: 'File not found' });
  }
};
exports.viewFile = async (req, res) => {
  try {
    const file = await downloadFileService(req.params.id);
    const buffer = Buffer.from(file.data, 'base64');
    const isImage = file.contentType && String(file.contentType).startsWith('image/');
    res.set({
      'Content-Type': file.contentType,
      ...(isImage && {
        'Content-Disposition': `inline; filename="${file.filename}"`,
        'Cache-Control': 'public, max-age=604800, immutable',
      }),
    });

    return res.send(buffer);
  } catch (err) {
    logger.error(`uploadFiles.controller.js << viewFile() << Error: ${err}`);
    return setNotFoundError(res, { message: 'File not found' });
  }
};

/** Public proxy for private S3 objects under uploads/{images|pdfs|thumbnails}/. */
exports.serveMedia = async (req, res) => {
  try {
    const folder = String(req.params.folder || '').trim();
    const filename = String(req.params.filename || '').trim();
    if (!MEDIA_FOLDERS.has(folder) || !SAFE_FILENAME.test(filename)) {
      return setNotFoundError(res, { message: 'File not found' });
    }
    const key = `uploads/${folder}/${filename}`;
    const obj = await getObject(key);
    res.set({
      'Content-Type': obj.contentType,
      'Cache-Control': obj.cacheControl || 'public, max-age=31536000, immutable',
      ...(obj.contentLength != null ? { 'Content-Length': String(obj.contentLength) } : {}),
    });
    if (obj.body && typeof obj.body.pipe === 'function') {
      return obj.body.pipe(res);
    }
    const chunks = [];
    for await (const chunk of obj.body) chunks.push(chunk);
    return res.send(Buffer.concat(chunks));
  } catch (err) {
    logger.error(`uploadFiles.controller.js << serveMedia() << Error: ${err.message}`);
    return setNotFoundError(res, { message: 'File not found' });
  }
};