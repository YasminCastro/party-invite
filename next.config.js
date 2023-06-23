/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO_URL: process.env.MONGO_URL,
    SECRET_TOKEN: process.env.SECRET_TOKEN,
    SECRET_TOKEN: process.env.SENHA_SECRETA,
  },
};

module.exports = nextConfig
