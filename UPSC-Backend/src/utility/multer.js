const multer = require('multer');
const storage = multer.memoryStorage();

const MAX_BYTES = Math.min(
  parseInt(process.env.UPLOAD_MAX_FILE_BYTES || '52428800', 10) || 52428800,
  100 * 1024 * 1024
);

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'image/gif',
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and images are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: MAX_BYTES },
});

exports.uploadSingleWithContext = (fieldName) => {
  return upload.single(fieldName);
};