import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Don't stop the build on ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Useful to also ignore TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
