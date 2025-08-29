import path from "path";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    config.devtool = dev ? "eval-cheap-module-source-map" : false;

    config.resolve.fallback = { fs: false };
    config.resolve.alias = {
      ...config.resolve.alias,
      "@emotion/react": path.resolve(
        __dirname,
        "../../node_modules/@emotion/react",
      ),
      "@emotion/styled": path.resolve(
        __dirname,
        "../../node_modules/@emotion/styled",
      ),
    };

    return config;
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "[project-id].supabase.co",
      // },
    ],
  },
  async rewrites() {
    return [
      // {
      //   source: "/addressApi/:path*",
      //   destination: `https://business.juso.go.kr/:path*`,
      // },
    ];
  },
  async redirects() {
    return [
      // {
      //   source: "/from",
      //   destination: "/to",
      //   permanent: true,
      // },
    ];
  },
  env: {
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  // experimental: {
  //   // The instrumentation hook is required for Sentry to work on the serverside
  //   instrumentationHook: true,
  // },
};

module.exports = nextConfig;
