import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type MetadataProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  if (!(locales as readonly string[]).includes(locale)) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lvivavukat.com";
  const isUk = locale === "uk";

  return {
    title: {
      default: isUk
        ? "Адвокат у Львові | Юридичні послуги — Людмила Чубай"
        : "Lviv Avukat | Ukrayna'da Türkler İçin Hukuki Danışmanlık - Av. Lyudmyla Chubai",
      template: isUk
        ? "%s | Адвокат у Львові — Людмила Чубай"
        : "%s | Lviv Avukat - Av. Lyudmyla Chubai",
    },
    description: isUk
      ? "Професійні юридичні послуги у Львові для іноземних громадян. Дозволи на проживання, працевлаштування, сімейне право та реєстрація бізнесу. Адв. Людмила Чубай."
      : "Ukrayna Lviv'de Türk vatandaşlarına oturum izni, çalışma izni, evlilik, şirket kurma ve tüm hukuki süreçlerde profesyonel avukatlık ve danışmanlık hizmeti. Av. Lyudmyla Chubai.",
    keywords: isUk
      ? ["адвокат Львів", "юридичні послуги Львів", "дозвіл на проживання Україна", "Людмила Чубай"]
      : ["Lviv avukat", "Ukrayna avukat", "Ukrayna oturum izni", "Ukrayna çalışma izni", "Ukrayna evlilik", "Ukrayna Türk avukat"],
    authors: [{ name: "Av. Lyudmyla Chubai" }],
    creator: isUk ? "Адвокат у Львові" : "Lviv Avukat",
    openGraph: {
      type: "website",
      locale: isUk ? "uk_UA" : "tr_TR",
      alternateLocale: isUk ? ["tr_TR"] : ["uk_UA"],
      url: isUk ? `${siteUrl}/ua` : siteUrl,
      siteName: isUk ? "Адвокат у Львові" : "Lviv Avukat",
      title: isUk
        ? "Адвокат у Львові | Юридичні послуги — Людмила Чубай"
        : "Lviv Avukat | Ukrayna'da Türkler İçin Hukuki Danışmanlık",
      description: isUk
        ? "Професійні юридичні послуги у Львові для іноземних громадян."
        : "Ukrayna Lviv'de Türk vatandaşlarına profesyonel avukatlık hizmeti.",
    },
    twitter: {
      card: "summary_large_image",
      title: isUk
        ? "Адвокат у Львові | Юридичні послуги"
        : "Lviv Avukat | Ukrayna'da Türkler İçin Hukuki Danışmanlık",
      description: isUk
        ? "Професійні юридичні послуги у Львові."
        : "Ukrayna Lviv'de Türk vatandaşlarına profesyonel avukatlık hizmeti.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: isUk ? `${siteUrl}/ua` : siteUrl,
      languages: {
        tr: siteUrl,
        uk: `${siteUrl}/ua`,
        "x-default": siteUrl,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(locales as readonly string[]).includes(locale)) {
    notFound();
  }

  return children;
}
