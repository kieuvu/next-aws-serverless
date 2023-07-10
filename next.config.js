/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: "standalone",
  assetPrefix: process.env.APP_ENV != 'local'
    ? `https://${process.env.AWS_STATIC_BUCKET}.s3.amazonaws.com`
    : undefined
};

module.exports = nextConfig;