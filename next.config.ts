import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:4000",
        port: "4000",
      },
    ],
  },
};

export default nextConfig;
