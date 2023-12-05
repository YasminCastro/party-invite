/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Isso se aplica a todas as páginas
        headers: [
          { key: "Cache-Control", value: "no-store" }, // Desativa o cache
        ],
      },
    ];
  },
};

module.exports = nextConfig;
