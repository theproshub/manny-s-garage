import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
