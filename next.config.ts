import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* A stray package-lock.json in the parent directory makes Turbopack infer the
     wrong workspace root. Pin it to this project. */
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
