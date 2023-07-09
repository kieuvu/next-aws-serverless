/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  output: "standalone",
  assetPrefix: `https://${process.env.AWS_STATIC_BUCKET}.s3.amazonaws.com`
};

module.exports = nextConfig;