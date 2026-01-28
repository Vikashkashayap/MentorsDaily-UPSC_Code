const { uploadFileService, downloadFileService } = require('../services/uploadFiles.service.js');
const logger = require('../utility/logger.js');
const { setCreateSuccess, setBadRequest, setNotFoundError } = require('../utility/responseHelper.js');

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return setBadRequest(res, { message: 'No file uploaded' });
    }
    const result = await uploadFileService(file, req.user?._id);
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
    res.set({
      'Content-Type': file.contentType,
      'Content-Disposition': `attachment; filename="${file.filename}"`,
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
    
    res.set({
      'Content-Type': file.contentType,
    });

    return res.send(buffer);
  } catch (err) {
    logger.error(`uploadFiles.controller.js << viewFile() << Error: ${err}`);
    return setNotFoundError(res, { message: 'File not found' });
  }
};