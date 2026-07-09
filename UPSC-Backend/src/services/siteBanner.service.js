const SiteBanner = require("../models/siteBanner.model");

const SETTINGS_KEY = "default";

function normalizeBannerConfig(input = {}, fallback = {}) {
  return {
    enabled: input.enabled !== undefined ? Boolean(input.enabled) : Boolean(fallback.enabled),
    badgeText: String(input.badgeText ?? fallback.badgeText ?? "").trim(),
    message: String(input.message ?? fallback.message ?? "").trim(),
    linkUrl: String(input.linkUrl ?? fallback.linkUrl ?? "").trim(),
    linkText: String(input.linkText ?? fallback.linkText ?? "").trim(),
  };
}

async function getOrCreateSettings() {
  let settings = await SiteBanner.findOne({ key: SETTINGS_KEY });
  if (!settings) {
    const defaults = SiteBanner.getDefaults();
    settings = await SiteBanner.create({
      key: SETTINGS_KEY,
      topBanner: defaults.topBanner,
      offerBanner: defaults.offerBanner,
    });
  }
  return settings;
}

exports.getSiteBanners = async () => {
  const settings = await getOrCreateSettings();
  return {
    topBanner: settings.topBanner,
    offerBanner: settings.offerBanner,
    updatedAt: settings.updatedAt,
  };
};

exports.updateSiteBanners = async (payload = {}) => {
  const current = await getOrCreateSettings();
  const defaults = SiteBanner.getDefaults();

  const topBanner = payload.topBanner
    ? normalizeBannerConfig(payload.topBanner, current.topBanner || defaults.topBanner)
    : current.topBanner;

  const offerBanner = payload.offerBanner
    ? normalizeBannerConfig(payload.offerBanner, current.offerBanner || defaults.offerBanner)
    : current.offerBanner;

  if (!topBanner.message) {
    throw new Error("Top banner message is required.");
  }
  if (!offerBanner.message) {
    throw new Error("Offer banner message is required.");
  }

  current.topBanner = topBanner;
  current.offerBanner = offerBanner;
  await current.save();

  return {
    topBanner: current.topBanner,
    offerBanner: current.offerBanner,
    updatedAt: current.updatedAt,
  };
};
