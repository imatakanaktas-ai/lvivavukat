import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/data/services";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { generateBreadcrumbSchema } from "@/lib/seo/schemas";
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
    title: dict.services.title,
    description: dict.services.description,
    alternates: { canonical: `${siteUrl}${prefix}/hizmetler` },
  };
}

export default async function ServicesPage({
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
    { name: dict.services.title, url: `${siteUrl}${prefix}/hizmetler` },
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
          <Breadcrumb items={[{ label: dict.services.title }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-serif font-bold text-white">
            {dict.services.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl">
            {dict.services.heroDescription}
          </p>
        </div>
      </section>

      {/* Services by category */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {serviceCategories.map((category) => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-border" />
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-foreground whitespace-nowrap">
                  {category.title}
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.slug}
                      href={`${prefix}/hizmetler/${service.slug}`}
                      className="group p-6 rounded-2xl bg-card border border-border/50 
                        hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 
                        transition-all duration-500 hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-accent/10 
                        flex items-center justify-center transition-colors duration-500 mb-5">
                        <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-500" />
                      </div>
                      <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {service.shortDescription}
                      </p>
                      {service.duration && (
                        <p className="mt-3 text-xs text-accent font-semibold">
                          {dict.services.duration}: {service.duration}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-accent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {dict.services.details}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
