/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URL: process.env.MONGO_URL,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    GUESTS_PASSWORD: process.env.GUESTS_PASSWORD,
  },
};

module.exports = nextConfig;
