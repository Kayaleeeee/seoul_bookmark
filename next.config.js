/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["api.enicom.co.kr", "smart.l4d.or.kr", "img.libbook.co.kr"],
  },
  env: {
    api:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "https://steady-conkies-7a74ef.netlify.app/api",
  },
};

module.exports = nextConfig;
