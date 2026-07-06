/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracing: false,
  typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;