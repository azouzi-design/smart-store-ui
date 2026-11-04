import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  async rewrites() {
    // BA-1842: static snapshot of the live shop page, served from public/ba-1842/
    return [{ source: "/ba-1842", destination: "/ba-1842/index.html" }];
  },
  partialPrefetching: true,
  images: {
    // 75 is the default; 90 keeps text and flat color in designed ad art crisp (BA-1649)
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
