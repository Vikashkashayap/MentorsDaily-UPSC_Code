const express = require('express');
const router = express.Router();
const { uploadSingleWithContext } = require('../utility/multer.js');
const { auth, verifyTokenAndAdmin } = require('../middlewares/auth.middleware.js');
const {
  createBlogController,
  getBlogController,
  deleteBlogController,
  updateBlogController,
  getBlogByIdController,
  incrementBlogViewController,
  getBlogBySlugPublicController,
  getBlogMetaBySlugController,
} = require('../controllers/preparationBlog.controller.js');


router.post('/preparation/create-blog', verifyTokenAndAdmin, uploadSingleWithContext('file'), createBlogController);
router.get('/preparation/by-slug/:slug', getBlogBySlugPublicController);
router.get('/preparation/meta/:slug', getBlogMetaBySlugController);
router.get('/preparation/get-blog',getBlogController)
router.delete('/preparation/:id/delete-blog',verifyTokenAndAdmin,deleteBlogController)
router.put('/preparation/:id/update-blog', verifyTokenAndAdmin, uploadSingleWithContext('file'),updateBlogController);
router.get('/preparation/:id/get-blog',getBlogByIdController)
router.put('/preparation/:id/increment-views', incrementBlogViewController);


module.exports = router;
