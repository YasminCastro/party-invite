/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URL: process.env.MONGO_URL,
    DB_NAME: process.env.DB_NAME,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    GUESTS_PASSWORD: process.env.GUESTS_PASSWORD,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
};

module.exports = nextConfig;
