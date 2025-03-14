import type { NextConfig } from "next";
module.exports = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "img.ltwebstatic.com",
      "us.shein.com",
    ],
  },
};
const nextConfig: NextConfig = {
  eslint: {
    dirs: ["pages", "utils"],
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "img.ltwebstatic.com" },
      { hostname: "us.shein.com" },
    ],
  },
};

export default nextConfig;
