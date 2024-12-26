import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost"],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    loader: "default",
    path: "/_next/image",
    unoptimized: true,
    minimumCacheTTL: 60,
    // dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/imagebucket/**",
      },
    ],
    // localPatterns: [
    //   {
    //     pathname: "/assets/images/**",
    //     search: "",
    //   },
    // ],
  },
};

export default nextConfig;
