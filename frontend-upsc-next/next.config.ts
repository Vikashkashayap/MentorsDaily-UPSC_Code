import type { NextConfig } from "next";
import path from "path";

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
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      const axiosRoot = path.join(process.cwd(), "node_modules/axios");
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /axios[\\/]lib[\\/]adapters[\\/]http\.js$/,
          path.join(axiosRoot, "lib/helpers/null.js")
        ),
        new webpack.NormalModuleReplacementPlugin(
          /axios[\\/]lib[\\/]platform[\\/]node[\\/]index\.js$/,
          path.join(axiosRoot, "lib/platform/browser/index.js")
        ),
        new webpack.NormalModuleReplacementPlugin(
          /axios[\\/]lib[\\/]platform[\\/]node[\\/]classes[\\/]FormData\.js$/,
          path.join(axiosRoot, "lib/helpers/null.js")
        )
      );
    }
    return config;
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
