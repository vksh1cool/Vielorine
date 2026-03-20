import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Cloudflare Pages
  output: 'export',
  // Ignore ESLint errors during build (Workaround for circular JSON structure bug)
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Required for static export (no server for image optimization)
    unoptimized: true,
  },
  // Trailing slash for static hosting compatibility
  trailingSlash: true,
};

export default nextConfig;
