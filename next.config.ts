import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "www.seriouseats.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "seriouseats.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ghodkesweets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.ghodkesweets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "curyleaf.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.curyleaf.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "myfoodstory.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.myfoodstory.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn3.foodviva.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.cdn3.foodviva.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dukaan.b-cdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.dukaan.b-cdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "curyleaf.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "www.curyleaf.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
