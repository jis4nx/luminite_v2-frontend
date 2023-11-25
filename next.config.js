/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL || "http://127.0.0.1:8000",
    BASE_URL_ACCOUNT: process.env.BASE_URL_ACCOUNT ||
      "http://127.0.0.1:8000/account",
    BASE_URL_SHOP: process.env.BASE_URL_SHOP || "http://127.0.0.1:8000/shop",
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
