import type { Metadata } from "next";
import {
  Scale,
  GraduationCap,
  Globe,
  Award,
  Users,
  Heart,
  MapPin,
  Calendar,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  generateBreadcrumbSchema,
  generateAttorneySchema,
} from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Hakkımızda | Av. Lyudmyla Chubai — Lviv'de Türk Vatandaşlarının Avukatı",
  description:
    "Av. Lyudmyla Chubai, Ukrayna Lviv'de 10+ yıllık deneyimle Türk vatandaşlarına oturum izni, evlilik, şirket kurma ve tüm hukuki süreçlerde destek sunan avukat.",
  alternates: { canonical: "https://lvivavukat.com/hakkimizda" },
};

const milestones = [
  { year: "2012", text: "Lviv Ulusal Üniversitesi Hukuk Fakültesi'nden mezuniyet" },
  { year: "2013", text: "Ukrayna Barolar Birliği'ne kabul" },
  { year: "2015", text: "Göç hukuku uzmanlık sertifikası" },
  { year: "2017", text: "Lviv Avukat ofisinin kurulması" },
  { year: "2019", text: "500. başarılı dava tamamlandı" },
  { year: "2022", text: "Uluslararası hukuk danışmanlığı genişlemesi" },
  { year: "2024", text: "Dijital hukuk hizmetlerinin başlatılması" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Güvenilirlik",
    description:
      "Müvekkil bilgilerinin gizliliğine en üst düzeyde önem veriyoruz. Her işlemi şeffaf ve güvenilir bir şekilde yürütüyoruz.",
  },
  {
    icon: Users,
    title: "Müvekkil Odaklılık",
    description:
      "Her müvekkilimiz bizim için özeldir. Kişiselleştirilmiş hukuki çözümler sunarak ihtiyaçlarınıza tam olarak cevap veriyoruz.",
  },
  {
    icon: Award,
    title: "Profesyonellik",
    description:
      "Güncel hukuk bilgisi ve sürekli mesleki gelişim ile en yüksek kalitede hukuki hizmet sunmayı taahhüt ediyoruz.",
  },
  {
    icon: Globe,
    title: "Çok Dilli Hizmet",
    description:
      "Türkçe, Ukraynaca, Rusça ve İngilizce dillerinde hizmet sunarak dil bariyerini tamamen ortadan kaldırıyoruz.",
  },
];

const stats = [
  { value: "10+", label: "Yıllık Deneyim" },
  { value: "500+", label: "Mutlu Müvekkil" },
  { value: "%98", label: "Başarı Oranı" },
  { value: "4", label: "Dil" },
];

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Anasayfa", url: "https://lvivavukat.com" },
    { name: "Hakkımızda", url: "https://lvivavukat.com/hakkimizda" },
  ]);
  const attorneySchema = generateAttorneySchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attorneySchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Hakkımızda" }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-serif font-bold text-white">
            Hakkımızda
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl">
            Ukrayna Lviv&apos;de Türk vatandaşlarına profesyonel hukuki danışmanlık
            ve avukatlık hizmeti sunuyoruz.
          </p>
        </div>
      </section>

      {/* Av. Lyudmyla Chubai */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 
                border border-border/50 flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-4 p-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Scale className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-sm text-muted">Fotoğraf yakında eklenecek</p>
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-2xl -z-10" />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">Kurucu Avukat</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                Av. Lyudmyla Chubai
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  Lviv Ulusal Üniversitesi Hukuk Fakültesi mezunu olan Av. Lyudmyla Chubai, 
                  10 yılı aşkın süredir Ukrayna'da yaşayan ve iş yapan Türk vatandaşlarına 
                  hukuki danışmanlık ve avukatlık hizmeti vermektedir.
                </p>
                <p>
                  Göç hukuku, aile hukuku, ticaret hukuku ve gayrimenkul hukuku alanlarında 
                  uzmanlaşan Av. Chubai, 500'den fazla Türk vatandaşının Ukrayna'daki hukuki 
                  süreçlerini başarıyla yönetmiştir.
                </p>
                <p>
                  Türkçe, Ukraynaca, Rusça ve İngilizce dillerinde akıcı konuşabilen Av. Chubai, 
                  müvekkillerinin dil bariyeri yaşamadan haklarını en etkili şekilde savunmalarını 
                  sağlamaktadır.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { icon: MapPin, text: "Lviv, Ukrayna" },
                  { icon: Calendar, text: "10+ Yıl Deneyim" },
                  { icon: BookOpen, text: "Göç Hukuku Uzmanı" },
                  { icon: Globe, text: "4 Dil" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm text-foreground/70"
                  >
                    <item.icon className="w-3.5 h-3.5 text-accent" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-serif font-bold text-accent">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Değerlerimiz
            </h2>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              Hukuki hizmetlerimizi şekillendiren temel ilkelerimiz
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="group p-6 rounded-2xl bg-card border border-border/50 
                    hover:border-accent/30 hover:shadow-lg transition-all duration-500 text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/5 group-hover:bg-accent/10 
                    flex items-center justify-center transition-colors duration-500 mb-4">
                    <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground">{val.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
              Kilometre Taşları
            </h2>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              Yıllar içindeki profesyonel gelişim yolculuğumuz
            </p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {milestones.map((ms, i) => (
                <div key={i} className="relative flex gap-6">
                  <div className="relative z-10 w-12 h-12 rounded-full bg-card border-2 border-accent 
                    flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{ms.year}</span>
                  </div>
                  <div className="pt-2.5">
                    <p className="text-foreground/80">{ms.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary-light to-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Hukuki Sürecinizde Yanınızdayız
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Ukrayna'daki hukuki ihtiyaçlarınız için ücretsiz ilk görüşme randevunuzu alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/380000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover 
                text-primary px-8 py-3.5 rounded-xl font-bold transition-colors"
            >
              WhatsApp ile Ulaşın
            </a>
            <a
              href="/iletisim"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 
                text-white px-8 py-3.5 rounded-xl font-bold transition-colors"
            >
              İletişim Formu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
