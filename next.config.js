/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { webpack }) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;