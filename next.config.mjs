/** @type {import('next').NextConfig} */
import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // // 👇 add this to control what the dev server watches
  // webpackDevMiddleware: (config) => {
  //   config.watchOptions = {
  //     poll: 1000, // check files every second (fixes pnpm + macOS fsevents issues)
  //     aggregateTimeout: 300, // debounce rebuilds
  //     ignored: [
  //       "**/node_modules/**",
  //       "**/.git/**",
  //       "**/.next/**",
  //       "**/dist/**", // ignore built outputs from sibling packages
  //     ],
  //   };
  //   return config;
  // },
};

export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  // reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
  fallbacks: {
    document: "/offline",
  },
})(nextConfig);
