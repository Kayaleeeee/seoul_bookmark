/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "api.enicom.co.kr",
      "smart.l4d.or.kr",
      "img.libbook.co.kr",
      "k.kakaocdn.net",
    ],
  },
  env: {
    domain:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://seoul-bookmark.vercel.app",
    api:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api"
        : "https://seoul-bookmark.vercel.app/api",
  },
};

module.exports = nextConfig;
