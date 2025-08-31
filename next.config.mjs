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
};

export default withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  // reloadOnOnline: true,
  swcMinify: true,
  disable: String(process.env.NODE_ENV) === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
  fallbacks: {
    document: "/offline",
  },
})(nextConfig);
