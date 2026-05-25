import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mentorsdaily.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["recharts", "date-fns"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/currentAffairs",
        destination: "/current-affairs",
        permanent: true,
      },
      {
        source: "/currentAffairs/:slug",
        destination: "/current-affairs/:slug",
        permanent: true,
      },
      {
        source: "/MentorshipCourses",
        destination: "/mentorship-courses",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/preparation-blog/:slug",
        permanent: true,
      },
      {
        source: "/upsc-preparation-blog",
        destination: "/preparation-blogs",
        permanent: true,
      },
      {
        source: "/upsc-preparation-blog/:slug",
        destination: "/preparation-blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
