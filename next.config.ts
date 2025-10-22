import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
  reactCompiler: true,

  // https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents
  cacheComponents: true,

  experimental: {
    // https://nextjs.org/docs/app/api-reference/config/next-config-js/authInterrupts
    authInterrupts: true,

    // https://nextjs.org/docs/app/api-reference/config/next-config-js/staleTimes
    staleTimes: {
      dynamic: 60, // 1 minute
      static: 300, // 5 minutes
    },

    // https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackFileSystemCache
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
