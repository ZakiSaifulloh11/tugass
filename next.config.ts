import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://payroll.politekniklp3i-tasikmalaya.ac.id/:path*",
      },
    ];
  }
};

export default nextConfig;
