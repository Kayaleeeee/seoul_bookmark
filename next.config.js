/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["api.enicom.co.kr"],
  },
};

module.exports = nextConfig;
