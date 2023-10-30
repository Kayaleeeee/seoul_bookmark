/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["api.enicom.co.kr", "smart.l4d.or.kr", "img.libbook.co.kr"],
  },
};

module.exports = nextConfig;
