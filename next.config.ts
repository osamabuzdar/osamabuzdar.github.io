import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,

  images: {
    unoptimized: isGitHubPages,
  },

  allowedDevOrigins: ["192.168.1.125"],

  trailingSlash: false,

  typedRoutes: false,
};

export default nextConfig;
