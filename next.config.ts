import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
            {
                protocol: "https",
                hostname: "www.cdw.com",
            },
            {
                protocol: "https",
                hostname: "media.licdn.com",
            }
        ],
    },
};

export default nextConfig;

