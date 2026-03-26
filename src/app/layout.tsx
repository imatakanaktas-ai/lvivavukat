import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lvivavukat.com"),
  title: {
    default: "Lviv Avukat | Ukrayna'da Türkler İçin Hukuki Danışmanlık - Av. Lyudmyla Chubai",
    template: "%s | Lviv Avukat - Av. Lyudmyla Chubai",
  },
  description:
    "Ukrayna Lviv'de Türk vatandaşlarına oturum izni, çalışma izni, evlilik, şirket kurma ve tüm hukuki süreçlerde profesyonel avukatlık ve danışmanlık hizmeti. Av. Lyudmyla Chubai.",
  keywords: [
    "Lviv avukat",
    "Ukrayna avukat",
    "Ukrayna oturum izni",
    "Ukrayna çalışma izni",
    "Ukrayna evlilik",
    "Ukrayna Türk avukat",
    "Lviv hukuk danışmanlık",
    "Ukrayna şirket kurma",
  ],
  authors: [{ name: "Av. Lyudmyla Chubai" }],
  creator: "Lviv Avukat",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://lvivavukat.com",
    siteName: "Lviv Avukat",
    title: "Lviv Avukat | Ukrayna'da Türkler İçin Hukuki Danışmanlık",
    description:
      "Ukrayna Lviv'de Türk vatandaşlarına oturum izni, çalışma izni, evlilik, şirket kurma ve tüm hukuki süreçlerde profesyonel avukatlık hizmeti.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lviv Avukat | Ukrayna'da Türkler İçin Hukuki Danışmanlık",
    description:
      "Ukrayna Lviv'de Türk vatandaşlarına profesyonel avukatlık ve danışmanlık hizmeti.",
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
    canonical: "https://lvivavukat.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
