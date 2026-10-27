import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,

  images: {
    unoptimized: isGitHubPages,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "api.bulkbytes.org",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**"
      }
    ]
  },

  allowedDevOrigins: ["192.168.1.125"],

  trailingSlash: false,

  typedRoutes: false,
};

export default nextConfig;
