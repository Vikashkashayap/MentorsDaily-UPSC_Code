const express = require("express");
const router = express.Router();
const siteBannerController = require("../controllers/siteBanner.controller");
const { verifyTokenAndAdmin } = require("../middlewares/auth.middleware");

router.get("/site-banners", siteBannerController.getSiteBanners);
router.post(
  "/admin/site-banners",
  verifyTokenAndAdmin,
  siteBannerController.updateSiteBanners
);

module.exports = router;
