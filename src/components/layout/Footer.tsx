import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Scale,
} from "lucide-react";
import { serviceCategories } from "@/data/services";

const quickLinks = [
  { label: "Anasayfa", href: "/" },
  { label: "Hizmetlerimiz", href: "/hizmetler" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
];

export default function Footer() {
  const topServices = serviceCategories.flatMap((c) => c.services).slice(0, 8);

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
                <p className="text-accent text-xs tracking-[0.2em] uppercase">Hukuk & Danışmanlık</p>
              </div>
            </div>
            <a
              href="https://wa.me/380000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent-hover text-primary px-6 py-3 rounded-lg 
                font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              Ücretsiz Danışma Al
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4">Hakkımızda</h3>
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              Ukrayna Lviv&apos;de Türk vatandaşlarına oturum izni, çalışma izni, evlilik işlemleri 
              ve tüm hukuki süreçlerde profesyonel avukatlık ve danışmanlık hizmeti sunuyoruz.
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Scale className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Lisanslı Avukat
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg font-bold mb-4">Hızlı Bağlantılar</h3>
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
            <h3 className="text-white font-serif text-lg font-bold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2.5">
              {topServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/hizmetler/${service.slug}`}
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
            <h3 className="text-white font-serif text-lg font-bold mb-4">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60">
                  Svobody Ave, Lviv, Ukrayna 79000
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
                  <p>Pazartesi - Cuma: 09:00 - 18:00</p>
                  <p>Cumartesi: 10:00 - 14:00</p>
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
              © {new Date().getFullYear()} Lviv Avukat - Av. Lyudmyla Chubai. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/gizlilik-politikasi" className="text-xs text-white/40 hover:text-accent transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kvkk" className="text-xs text-white/40 hover:text-accent transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
