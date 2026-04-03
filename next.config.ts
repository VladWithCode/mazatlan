import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    /* config options here */
    output: "standalone",
    basePath: isProduction ? "/terrenos/mazatlan-02" : "",
};

export default nextConfig;
