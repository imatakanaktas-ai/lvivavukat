export const locales = ["tr", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

// Locale-specific URL slugs for pages
export const pageSlugMap: Record<string, Record<Locale, string>> = {
  hizmetler: { tr: "hizmetler", uk: "poslugy" },
  hakkimizda: { tr: "hakkimizda", uk: "pro-nas" },
  iletisim: { tr: "iletisim", uk: "kontakty" },
  blog: { tr: "blog", uk: "blog" },
  "gizlilik-politikasi": { tr: "gizlilik-politikasi", uk: "polityka-konfidentsiynosti" },
  kvkk: { tr: "kvkk", uk: "zakhyst-danykh" },
};

// Reverse map: from Ukrainian slug to canonical (Turkish) key
export const ukSlugToCanonical: Record<string, string> = {};
for (const [canonical, slugs] of Object.entries(pageSlugMap)) {
  ukSlugToCanonical[slugs.uk] = canonical;
}
