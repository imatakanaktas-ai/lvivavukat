import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "İletişim | Lviv Avukat — Ücretsiz Hukuki Danışma",
  description:
    "Ukrayna Lviv'de hukuki danışmanlık için bizimle iletişime geçin. WhatsApp, telefon, e-posta veya iletişim formu ile ücretsiz ön görüşme alın.",
  alternates: { canonical: "https://lvivavukat.com/iletisim" },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Adres",
    details: ["Svobody Ave, Lviv", "Lviv Oblast, 79000", "Ukrayna"],
  },
  {
    icon: Phone,
    title: "Telefon",
    details: ["+380 00 000 00 00"],
  },
  {
    icon: Mail,
    title: "E-posta",
    details: ["info@lvivavukat.com"],
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    details: ["Pazartesi – Cuma: 09:00 – 18:00", "Cumartesi: 10:00 – 14:00", "Pazar: Kapalı"],
  },
];

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Anasayfa", url: "https://lvivavukat.com" },
    { name: "İletişim", url: "https://lvivavukat.com/iletisim" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "İletişim" }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-serif font-bold text-white">
            İletişim
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl">
            Hukuki ihtiyaçlarınız için bizimle iletişime geçin. İlk görüşme ücretsizdir.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="p-8 rounded-2xl bg-card border border-border/50">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Bize Yazın
                </h2>
                <p className="text-muted text-sm mb-8">
                  Formu doldurarak mesajınızı gönderin. En kısa sürede size dönüş yapacağız.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Info sidebar */}
            <aside className="space-y-6">
              {/* Contact info cards */}
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.title}
                    className="p-5 rounded-2xl bg-card border border-border/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-serif font-bold text-foreground">{info.title}</h3>
                    </div>
                    <div className="space-y-1">
                      {info.details.map((d, i) => (
                        <p key={i} className="text-sm text-muted">{d}</p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* WhatsApp CTA */}
              <div className="p-6 rounded-2xl bg-primary text-white">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-8 h-8 text-accent" />
                  <h3 className="font-serif font-bold text-lg">Hızlı İletişim</h3>
                </div>
                <p className="text-sm text-white/60 mb-5">
                  Acil sorularınız için WhatsApp üzerinden anında ulaşın.
                </p>
                <a
                  href="https://wa.me/380000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover 
                    text-primary py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp ile Ulaşın
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-2xl overflow-hidden border border-border/50 bg-card">
            <div className="aspect-[16/6] flex items-center justify-center bg-primary/5">
              <div className="text-center space-y-2">
                <MapPin className="w-10 h-10 text-accent mx-auto" />
                <p className="text-muted text-sm">
                  Google Maps entegrasyonu yakında eklenecek
                </p>
                <p className="text-xs text-muted">
                  Svobody Ave, Lviv, Ukrayna 79000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
