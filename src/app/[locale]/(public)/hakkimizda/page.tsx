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
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lvivavukat.com";
  const prefix = locale === "uk" ? "/ua" : "";

  return {
    title: dict.about.title,
    description: dict.about.description,
    alternates: { canonical: `${siteUrl}${prefix}/hakkimizda` },
  };
}

const valueIcons = [ShieldCheck, Users, Award, Globe];
const tagIcons = [MapPin, Calendar, BookOpen, Globe];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const prefix = locale === "uk" ? "/ua" : "";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lvivavukat.com";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.nav.home, url: `${siteUrl}${prefix}` },
    { name: dict.about.title, url: `${siteUrl}${prefix}/hakkimizda` },
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
          <Breadcrumb items={[{ label: dict.about.title }]} homeLabel={dict.nav.home} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-serif font-bold text-white">
            {dict.about.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl">
            {dict.about.heroDescription}
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
                  <p className="text-sm text-muted">{dict.about.photoPlaceholder}</p>
                </div>
              </div>
              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-2xl -z-10" />
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{dict.about.founderTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">
                Av. Lyudmyla Chubai
              </h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>{dict.about.bio1}</p>
                <p>{dict.about.bio2}</p>
                <p>{dict.about.bio3}</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { icon: MapPin, text: dict.about.tagLocation },
                  { icon: Calendar, text: dict.about.tagExperience },
                  { icon: BookOpen, text: dict.about.tagSpecialty },
                  { icon: Globe, text: dict.about.tagLanguages },
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
            {[
              { value: "10+", label: dict.about.statsYears },
              { value: "500+", label: dict.about.statsClients },
              { value: "%98", label: dict.about.statsSuccess },
              { value: "4", label: dict.about.statsLanguages },
            ].map((stat) => (
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
              {dict.about.valuesTitle}
            </h2>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              {dict.about.valuesDescription}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.about.values.map((val, idx) => {
              const Icon = valueIcons[idx];
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
              {dict.about.milestonesTitle}
            </h2>
            <p className="mt-3 text-muted max-w-xl mx-auto">
              {dict.about.milestonesDescription}
            </p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {dict.about.milestones.map((ms, i) => (
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
            {dict.about.ctaTitle}
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            {dict.about.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/380000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover 
                text-primary px-8 py-3.5 rounded-xl font-bold transition-colors"
            >
              {dict.about.ctaWhatsApp}
            </a>
            <a
              href={`${prefix}/iletisim`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 
                text-white px-8 py-3.5 rounded-xl font-bold transition-colors"
            >
              {dict.nav.contact}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
