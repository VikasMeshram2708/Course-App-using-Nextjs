import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "i.pravatar.cc",
        protocol: "https",
      },
      {
        hostname: "i.ytimg.com",
        protocol: "https",
      },
      {
        hostname: "placehold.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
