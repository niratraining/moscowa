import type { NextConfig } from "next";
import path from "path";

const rootDir = process.cwd();

const nextConfig: NextConfig = {
  // Keep tracing/turbopack rooted in this project (avoids parent lockfile confusion)
  outputFileTracingRoot: path.join(rootDir),
  turbopack: {
    root: path.join(rootDir),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
