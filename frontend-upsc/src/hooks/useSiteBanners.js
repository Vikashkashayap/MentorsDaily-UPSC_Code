import { useEffect, useState } from "react";
import { getSiteBanners } from "../api/coreService";

export const DEFAULT_SITE_BANNERS = {
  topBanner: {
    enabled: true,
    badgeText: "Free Session",
    message: "Book your free 1-on-1 UPSC mentorship call — limited slots available",
    linkUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSf8AwmqQ3wcORanh6L5hPVQYkZcCz-wyGBuQIIhnzp82yCcWA/viewform?usp=header",
    linkText: "Book Now",
  },
  offerBanner: {
    enabled: true,
    badgeText: "50% OFF",
    message: "Get 50% off on all courses — limited time offer!",
    linkUrl: "/mentorship-courses",
    linkText: "Explore Courses",
  },
};

function extractBannerPayload(response) {
  const payload = response?.data?.data ?? response?.data ?? response;
  return {
    topBanner: payload?.topBanner ?? DEFAULT_SITE_BANNERS.topBanner,
    offerBanner: payload?.offerBanner ?? DEFAULT_SITE_BANNERS.offerBanner,
    updatedAt: payload?.updatedAt ?? null,
  };
}

export function useSiteBanners() {
  const [banners, setBanners] = useState(DEFAULT_SITE_BANNERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadBanners = async () => {
      try {
        const response = await getSiteBanners();
        if (!cancelled) {
          setBanners(extractBannerPayload(response));
        }
      } catch {
        if (!cancelled) {
          setBanners(DEFAULT_SITE_BANNERS);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadBanners();
    return () => {
      cancelled = true;
    };
  }, []);

  return { banners, loading };
}
