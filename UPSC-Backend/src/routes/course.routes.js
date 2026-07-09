const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const {
  auth,
  verifyTokenAndAdmin,
  verifyTokenAndSuperAdmin,
  optionalAuth,
} = require("../middlewares/auth.middleware.js");
const { uploadSingleWithContext } = require("../utility/multer.js");

router.post("/create-course", verifyTokenAndAdmin, uploadSingleWithContext('thumbnail'), courseController.createCourse);
router.get("/get-course", optionalAuth, courseController.findAllCourse);
router.get("/course/meta/id/:id", courseController.getCourseMetaById);
router.get("/course/meta/:slug", courseController.getCourseMetaBySlug);
router.get("/course/slug/:slug", courseController.findCourseBySlug);
router.get("/course/:id", auth, courseController.findCourseById);
router.patch("/course/:id", verifyTokenAndAdmin, uploadSingleWithContext('thumbnail'), courseController.updateCourse);
router.delete("/course/:id", verifyTokenAndAdmin, courseController.deleteCourse);

module.exports = router;