import type { NextConfig } from "next";
module.exports = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ["images.unsplash.com"],
  },
};
const nextConfig: NextConfig = {
  eslint: {
    dirs: ["pages", "utils"],
  },
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
