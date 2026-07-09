const mongoose = require("mongoose");

const bannerConfigSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: true },
    badgeText: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
    linkUrl: { type: String, default: "", trim: true },
    linkText: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const DEFAULT_TOP_BANNER = {
  enabled: true,
  badgeText: "Free Session",
  message: "Book your free 1-on-1 UPSC mentorship call — limited slots available",
  linkUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSf8AwmqQ3wcORanh6L5hPVQYkZcCz-wyGBuQIIhnzp82yCcWA/viewform?usp=header",
  linkText: "Book Now",
};

const DEFAULT_OFFER_BANNER = {
  enabled: true,
  badgeText: "50% OFF",
  message: "Get 50% off on all courses — limited time offer!",
  linkUrl: "/mentorship-courses",
  linkText: "Explore Courses",
};

const siteBannerSchema = new mongoose.Schema(
  {
    key: { type: String, default: "default", unique: true },
    topBanner: {
      type: bannerConfigSchema,
      default: () => ({ ...DEFAULT_TOP_BANNER }),
    },
    offerBanner: {
      type: bannerConfigSchema,
      default: () => ({ ...DEFAULT_OFFER_BANNER }),
    },
  },
  { timestamps: true }
);

siteBannerSchema.statics.getDefaults = () => ({
  topBanner: { ...DEFAULT_TOP_BANNER },
  offerBanner: { ...DEFAULT_OFFER_BANNER },
});

module.exports = mongoose.model("SiteBanner", siteBannerSchema);
