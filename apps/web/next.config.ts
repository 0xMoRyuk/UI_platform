import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  // Required for monorepo: tell Next.js where the workspace root is
  outputFileTracingRoot: path.join(__dirname, "../../"),
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Optimize for Cloud Run deployment
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

export default nextConfig;
