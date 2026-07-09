const siteBannerService = require("../services/siteBanner.service");
const {
  setBadRequest,
  setCreateSuccess,
  setServerError,
  setSuccess,
} = require("../utility/responseHelper");

exports.getSiteBanners = async (req, res) => {
  try {
    const banners = await siteBannerService.getSiteBanners();
    return setSuccess(res, {
      message: "Site banners fetched successfully.",
      data: banners,
    });
  } catch (err) {
    return setServerError(res, { message: "Failed to fetch site banners." });
  }
};

exports.updateSiteBanners = async (req, res) => {
  try {
    const updated = await siteBannerService.updateSiteBanners(req.body || {});
    return setCreateSuccess(res, {
      message: "Site banners updated successfully.",
      data: updated,
    });
  } catch (err) {
    return setBadRequest(res, {
      message: err?.message || "Failed to update site banners.",
    });
  }
};
