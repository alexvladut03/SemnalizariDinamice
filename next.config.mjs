/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"], // <-- and this
  },
  // and the following to enable top-level await support for Webpack
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
