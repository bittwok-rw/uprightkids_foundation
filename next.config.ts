import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        pathname: "/Dyzh3pFX/MG-6720.png",
      },
    ],
  },
};

export default nextConfig;
