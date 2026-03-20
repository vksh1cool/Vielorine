import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignore ESLint errors during build (Workaround for circular JSON structure bug)
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Enable modern image formats for optimization
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for smaller images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Trailing slash for static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
