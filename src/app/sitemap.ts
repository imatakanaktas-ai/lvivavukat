import type { MetadataRoute } from "next";
import { getAllServiceSlugs } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lvivavukat.com";
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/hizmetler`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/hakkimizda`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/iletisim`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/gizlilik-politikasi`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/kvkk`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Service pages
  const serviceSlugs = getAllServiceSlugs();
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/hizmetler/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  // Blog posts (static placeholders — in production, fetch from DB)
  const blogSlugs = [
    "ukraynada-oturum-izni-nasil-alinir",
    "ukraynada-turk-vatandaslari-evlilik",
    "ukraynada-sirket-kurma-rehberi",
    "ukraynada-calisma-izni-rehberi",
    "ukrayna-gayrimenkul-yatirim",
    "ukrayna-vergi-sistemi-turkler",
  ];
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
