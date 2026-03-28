import { locales, defaultLocale, pageSlugMap, type Locale } from "./config";

/** Check if a string is a supported locale */
export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

/**
 * Build a localized path.
 * - For Turkish (default): /hizmetler  
 * - For Ukrainian: /ua/poslugy
 */
export function localizedPath(pathname: string, locale: Locale): string {
  // Strip leading slash for processing
  const clean = pathname.replace(/^\//, "");
  const segments = clean.split("/");

  // Map the first segment if it's a known page
  if (segments[0] && pageSlugMap[segments[0]]) {
    segments[0] = pageSlugMap[segments[0]][locale];
  }

  const path = "/" + segments.join("/");

  if (locale === defaultLocale) {
    return path;
  }
  return `/ua${path}`;
}

/**
 * Get the alternate URL for a page in the other locale.
 * Given current locale + canonical page key, return the full path in otherLocale.
 */
export function alternateLocalePath(
  canonicalKey: string,
  restPath: string,
  locale: Locale
): string {
  const slug = pageSlugMap[canonicalKey]?.[locale] ?? canonicalKey;
  const base = locale === defaultLocale ? "" : "/ua";
  const rest = restPath ? `/${restPath}` : "";
  return `${base}/${slug}${rest}`;
}

/** Get the locale prefix for URLs */
export function getLocalePrefix(locale: Locale): string {
  return locale === defaultLocale ? "" : "/ua";
}
