import { useEffect, useState } from "react";
import { getSiteBanners, updateSiteBanners } from "../../api/coreService";
import { DEFAULT_SITE_BANNERS } from "../../hooks/useSiteBanners";
import { messageHandler } from "../../utils/messageHandler";
import { useTheme } from "../../contexts/ThemeContext";

const emptyBannerForm = {
  enabled: true,
  badgeText: "",
  message: "",
  linkUrl: "",
  linkText: "",
};

function toFormBanner(banner = {}) {
  return {
    enabled: Boolean(banner.enabled),
    badgeText: banner.badgeText || "",
    message: banner.message || "",
    linkUrl: banner.linkUrl || "",
    linkText: banner.linkText || "",
  };
}

function BannerFields({ title, description, form, onChange, isDark }) {
  const inputClass = `w-full rounded-lg border px-3 py-2 text-sm ${
    isDark
      ? "bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
      : "bg-white border-gray-300 text-gray-900"
  }`;

  const labelClass = `block text-sm font-medium mb-1 ${
    isDark ? "text-gray-200" : "text-gray-700"
  }`;

  return (
    <section
      className={`rounded-xl border p-5 space-y-4 ${
        isDark ? "border-gray-700 bg-gray-900/40" : "border-gray-200 bg-white"
      }`}
    >
      <div>
        <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
          {title}
        </h2>
        <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {description}
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.enabled}
          onChange={(e) => onChange("enabled", e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className={isDark ? "text-gray-200" : "text-gray-700"}>Show this banner</span>
      </label>

      <div>
        <label className={labelClass}>Badge text</label>
        <input
          type="text"
          value={form.badgeText}
          onChange={(e) => onChange("badgeText", e.target.value)}
          placeholder="e.g. Free Session / 50% OFF"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <input
          type="text"
          value={form.message}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder="Main banner message"
          className={inputClass}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Link URL</label>
          <input
            type="text"
            value={form.linkUrl}
            onChange={(e) => onChange("linkUrl", e.target.value)}
            placeholder="/mentorship-courses or https://..."
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Link text</label>
          <input
            type="text"
            value={form.linkText}
            onChange={(e) => onChange("linkText", e.target.value)}
            placeholder="Book Now / Explore Courses"
            className={inputClass}
          />
        </div>
      </div>
    </section>
  );
}

export default function Settings() {
  const { isDark } = useTheme();
  const [topBanner, setTopBanner] = useState(emptyBannerForm);
  const [offerBanner, setOfferBanner] = useState(emptyBannerForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadBanners = async () => {
    setLoading(true);
    try {
      const response = await getSiteBanners();
      const payload = response?.data?.data ?? response?.data ?? response;
      setTopBanner(toFormBanner(payload?.topBanner ?? DEFAULT_SITE_BANNERS.topBanner));
      setOfferBanner(toFormBanner(payload?.offerBanner ?? DEFAULT_SITE_BANNERS.offerBanner));
    } catch {
      setTopBanner(toFormBanner(DEFAULT_SITE_BANNERS.topBanner));
      setOfferBanner(toFormBanner(DEFAULT_SITE_BANNERS.offerBanner));
      messageHandler.error("Failed to load banner settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!topBanner.message.trim() || !offerBanner.message.trim()) {
      messageHandler.error("Both banner messages are required.");
      return;
    }

    setSaving(true);
    try {
      await updateSiteBanners({
        topBanner,
        offerBanner,
      });
      messageHandler.success("Site banners updated successfully.");
      await loadBanners();
    } catch (err) {
      messageHandler.error(err?.response?.data?.data?.message || "Failed to save banner settings.");
    } finally {
      setSaving(false);
    }
  };

  const updateTop = (field, value) => {
    setTopBanner((prev) => ({ ...prev, [field]: value }));
  };

  const updateOffer = (field, value) => {
    setOfferBanner((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          Site Banners
        </h1>
        <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Manage the top mentorship bar (above navbar) and the course offer bar (below navbar).
        </p>
      </div>

      {loading ? (
        <div className={`rounded-xl border p-6 ${isDark ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"}`}>
          Loading banner settings...
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <BannerFields
            title="Top Banner (above navbar)"
            description="Free session / mentorship call announcement shown at the very top of the site."
            form={topBanner}
            onChange={updateTop}
            isDark={isDark}
          />

          <BannerFields
            title="Offer Banner (below navbar)"
            description="Course discount or promotional offer shown directly under the main navigation."
            form={offerBanner}
            onChange={updateOffer}
            isDark={isDark}
          />

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {saving ? "Saving..." : "Save Banners"}
          </button>
        </form>
      )}
    </div>
  );
}
