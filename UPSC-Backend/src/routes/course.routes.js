const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const {
  auth,
  verifyTokenAndAdmin,
  verifyTokenAndSuperAdmin,
} = require("../middlewares/auth.middleware.js");
const { uploadSingleWithContext } = require("../utility/multer.js");

router.post("/create-course", verifyTokenAndAdmin, uploadSingleWithContext('thumbnail'), courseController.createCourse);
router.get("/get-course", courseController.findAllCourse);
router.get("/course/:id", auth, courseController.findCourseById);
router.patch("/course/:id", verifyTokenAndAdmin, uploadSingleWithContext('thumbnail'), courseController.updateCourse);
router.delete("/course/:id", verifyTokenAndAdmin, courseController.deleteCourse);

module.exports = router;