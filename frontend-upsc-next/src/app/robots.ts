import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

const DISALLOW = [
  "/admin/",
  "/dashboard",
  "/home",
  "/library",
  "/profile",
  "/ask",
  "/study/current-affairs",
  "/mcq",
  "/pyqs",
  "/mains-pyqs",
  "/my-tests",
  "/my-progress",
  "/api/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: DISALLOW,
    },
    sitemap: `${publicEnv.siteUrl}/sitemap.xml`,
    host: publicEnv.siteUrl,
  };
}
