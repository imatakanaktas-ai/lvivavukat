import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lvivavukat.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/panel-*",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
