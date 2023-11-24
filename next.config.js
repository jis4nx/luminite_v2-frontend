/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_URL_ACCOUNT: process.env.BASE_URL_ACCOUNT,
    BASE_URL_SHOP: process.env.BASE_URL_SHOP,
  },
  images: {
    domains: ["127.0.0.1", "luminitev2-production.up.railway.app"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
