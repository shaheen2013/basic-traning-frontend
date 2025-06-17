import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "10.0.0.193",
      },
    ],
  },
};

export default nextConfig;
