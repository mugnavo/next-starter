import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // https://nextjs.org/docs/app/api-reference/config/next-config-js/authInterrupts
    authInterrupts: true,
  },
};

export default nextConfig;
