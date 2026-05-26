const express = require('express');
const router = express.Router();
const { uploadSingleWithContext } = require('../utility/multer.js');
const { verifyTokenAndAdmin, auth } = require('../middlewares/auth.middleware.js');
const {
  createFreeResource,
  getAllFreeResources,
  getFreeResourceById,
  updateFreeResource,
  deleteFreeResource
} = require('../controllers/freeResource.controller.js');

// Public routes - anyone can view
router.get('/free-resourse/all', getAllFreeResources);
router.get('/get/free-resourse/:id', getFreeResourceById);

// Admin only routes - create, update, delete
router.post('/create-free-resourse', verifyTokenAndAdmin, uploadSingleWithContext('file'), createFreeResource);
router.put('/free-resourse/:id', verifyTokenAndAdmin, uploadSingleWithContext('file'), updateFreeResource);
router.delete('/free-resourse/:id', verifyTokenAndAdmin, deleteFreeResource);

module.exports = router;
