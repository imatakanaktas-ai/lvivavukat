import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Scale,
} from "lucide-react";
import { getLocalizedServiceCategories } from "@/data/services";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { localizedHref } from "@/i18n/locale-utils";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const localizedCategories = getLocalizedServiceCategories(locale);
  const topServices = localizedCategories.flatMap((c) => c.services).slice(0, 8);

  const quickLinks = [
    { label: dict.nav.home, href: localizedHref("/", locale) },
    { label: dict.nav.services, href: localizedHref("/hizmetler", locale) },
    { label: dict.nav.about, href: localizedHref("/hakkimizda", locale) },
    { label: dict.nav.blog, href: localizedHref("/blog", locale) },
    { label: dict.nav.contact, href: localizedHref("/iletisim", locale) },
  ];

  return (
    <footer className="bg-primary text-white/80">
      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-primary font-serif font-bold text-xl">LC</span>
              </div>
              <div>
                <p className="text-white font-serif text-lg font-bold">LYUDMYLA CHUBAI</p>
                <p className="text-accent text-xs tracking-[0.2em] uppercase">
                  {locale === "uk" ? "Юридичні послуги" : "Hukuk & Danışmanlık"}
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/380000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-hover text-primary px-6 py-3 rounded-lg 
                font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              {dict.footer.freeConsultation}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4">{dict.footer.aboutTitle}</h3>
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              {dict.footer.aboutText}
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Scale className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                {locale === "uk" ? "Ліцензований адвокат" : "Lisanslı Avukat"}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4">{dict.footer.quickLinks}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4">{dict.footer.servicesTitle}</h3>
            <ul className="space-y-2.5">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={localizedHref(`/hizmetler/${service.slug}`, locale)}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4">{dict.footer.contactTitle}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60">
                  {dict.footer.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="tel:+380000000000" className="text-sm text-white/60 hover:text-accent transition-colors">
                  +380 (00) 000-00-00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:info@lvivavukat.com" className="text-sm text-white/60 hover:text-accent transition-colors">
                  info@lvivavukat.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-white/60">
                  <p>{dict.footer.weekdays}</p>
                  <p>{dict.footer.saturday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} {locale === "uk" ? "Адвокат у Львові" : "Lviv Avukat"} - Av. Lyudmyla Chubai. {dict.footer.copyright}
            </p>
            <div className="flex items-center gap-4">
              <Link href={localizedHref("/gizlilik-politikasi", locale)} className="text-xs text-white/40 hover:text-accent transition-colors">
                {dict.footer.privacy}
              </Link>
              <Link href={localizedHref("/kvkk", locale)} className="text-xs text-white/40 hover:text-accent transition-colors">
                {dict.footer.kvkk}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
