import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  ...(process.env.RABIA_PREVIEW_DIR ? { distDir: process.env.RABIA_PREVIEW_DIR } : {}),
};

export default nextConfig;
