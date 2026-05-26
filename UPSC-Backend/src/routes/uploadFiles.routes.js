const { Router } = require('express');
const { uploadFile, downloadFile,viewFile } = require('../controllers/uploadFiles.controller.js');
const { uploadSingleWithContext } = require('../utility/multer.js');
const { verifyTokenAndAdmin } = require('../middlewares/auth.middleware.js');

const router = Router();

router.post('/upload', verifyTokenAndAdmin, uploadSingleWithContext('file'), uploadFile);
router.get('/download/:id', downloadFile);
router.get('/view/:id', viewFile);

module.exports = router;