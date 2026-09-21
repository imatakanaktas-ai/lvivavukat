import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // AI assistant sends base64 PDFs/images through a server action;
    // the 1 MB default rejected anything but tiny files.
    serverActions: { bodySizeLimit: "30mb" },
  },
  // The PDF renderer reads its fonts from disk at runtime, which the tracer
  // cannot see; without this the fonts are missing from the deployed bundle.
  outputFileTracingIncludes: {
    "/panel-yonetim2024x/ai-asistan": ["./src/lib/pdf/fonts/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
};

export default nextConfig;
