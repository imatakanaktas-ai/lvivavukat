export const locales = ["tr", "uk"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

// Locale-specific URL slugs for pages
export const pageSlugMap: Record<string, Record<Locale, string>> = {
  hizmetler: { tr: "hizmetler", uk: "posluhy" },
  hakkimizda: { tr: "hakkimizda", uk: "pro-nas" },
  iletisim: { tr: "iletisim", uk: "kontakty" },
  blog: { tr: "blog", uk: "blog" },
  "gizlilik-politikasi": { tr: "gizlilik-politikasi", uk: "polityka-konfidentsiynosti" },
  kvkk: { tr: "kvkk", uk: "zakhyst-danykh" },
};

// Locale-specific URL slugs for services
export const serviceSlugMap: Record<string, Record<Locale, string>> = {
  "gecici-oturum-izni": { tr: "gecici-oturum-izni", uk: "tymchasove-prozhyvannia" },
  "kalici-oturum-izni": { tr: "kalici-oturum-izni", uk: "postiine-prozhyvannia" },
  "calisma-izni": { tr: "calisma-izni", uk: "dozvil-na-pratsiu" },
  "ogrenci-vizesi": { tr: "ogrenci-vizesi", uk: "studentska-viza" },
  "vize-uzatma": { tr: "vize-uzatma", uk: "prodovzhennia-vizy" },
  "evlilik-islemleri": { tr: "evlilik-islemleri", uk: "oformlennia-shliubu" },
  "bosanma": { tr: "bosanma", uk: "rozluchennia" },
  "velayet": { tr: "velayet", uk: "opika-nad-ditmy" },
  "aile-birlesimi": { tr: "aile-birlesimi", uk: "vozziednannia-simii" },
  "vatandaslik": { tr: "vatandaslik", uk: "hromadianstvo" },
  "sirket-kurma": { tr: "sirket-kurma", uk: "reiestratsiia-kompanii" },
  "gayrimenkul-hukuku": { tr: "gayrimenkul-hukuku", uk: "nerukhomist" },
  "is-hukuku": { tr: "is-hukuku", uk: "trudove-pravo" },
  "sozlesme-hukuku": { tr: "sozlesme-hukuku", uk: "dohovirne-pravo" },
  "ceza-hukuku": { tr: "ceza-hukuku", uk: "kryminalne-pravo" },
  "miras-hukuku": { tr: "miras-hukuku", uk: "spadkove-pravo" },
  "vergi-danismanligi": { tr: "vergi-danismanligi", uk: "podatkove-konsultuvannia" },
  "tercume-apostil": { tr: "tercume-apostil", uk: "pereklad-apostyl" },
  "noter-islemleri": { tr: "noter-islemleri", uk: "notarialni-posluhy" },
};

// Reverse maps: from Ukrainian slug to canonical (Turkish) key
export const ukSlugToCanonical: Record<string, string> = {};
for (const [canonical, slugs] of Object.entries(pageSlugMap)) {
  ukSlugToCanonical[slugs.uk] = canonical;
}

export const ukServiceSlugToCanonical: Record<string, string> = {};
for (const [canonical, slugs] of Object.entries(serviceSlugMap)) {
  ukServiceSlugToCanonical[slugs.uk] = canonical;
}
