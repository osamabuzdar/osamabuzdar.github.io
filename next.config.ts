import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.1.125"],
  trailingSlash: false,
  typedRoutes: false,
};

export default nextConfig;
