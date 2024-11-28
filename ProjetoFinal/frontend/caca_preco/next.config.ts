import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: {
   
  },
  serverRuntimeConfig: {
    HOST: '192.168.56.1',
  },
};

export default nextConfig;
