import { locales, defaultLocale, pageSlugMap, serviceSlugMap, type Locale } from "./config";

/** Check if a string is a supported locale */
export function isValidLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

/**
 * Build a fully localized href from a canonical (Turkish) path.
 * Handles page slugs, service slugs, and the /ua prefix.
 *
 * Examples (locale = "uk"):
 *   localizedHref("/hizmetler", "uk")          → "/ua/posluhy"
 *   localizedHref("/hizmetler/velayet", "uk")   → "/ua/posluhy/opika-nad-ditmy"
 *   localizedHref("/hakkimizda", "uk")           → "/ua/pro-nas"
 *   localizedHref("/iletisim", "uk")             → "/ua/kontakty"
 *
 * For Turkish locale, returns the path unchanged (no prefix).
 */
export function localizedHref(canonicalPath: string, locale: Locale): string {
  const clean = canonicalPath.replace(/^\//, "");
  const segments = clean.split("/").filter(Boolean);

  // Map first segment (page slug)
  if (segments[0] && pageSlugMap[segments[0]]) {
    segments[0] = pageSlugMap[segments[0]][locale];
  }

  // Map second segment (service slug, e.g. under hizmetler)
  if (segments.length > 1 && segments[1] && serviceSlugMap[segments[1]]) {
    segments[1] = serviceSlugMap[segments[1]][locale];
  }

  const path = "/" + segments.join("/");
  return locale === defaultLocale ? path : `/ua${path}`;
}

/**
 * Build a localized path.
 * @deprecated Use localizedHref() instead — it handles both page and service slugs.
 */
export function localizedPath(pathname: string, locale: Locale): string {
  const clean = pathname.replace(/^\//, "");
  const segments = clean.split("/");

  if (segments[0] && pageSlugMap[segments[0]]) {
    segments[0] = pageSlugMap[segments[0]][locale];
  }

  const path = "/" + segments.join("/");
  return locale === defaultLocale ? path : `/ua${path}`;
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
