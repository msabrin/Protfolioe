import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    // local /public files need no domain config — Next.js serves them directly
    domains: [],
    // allow .jpg .png .webp .gif for the profile photo
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
