import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, Clock, FileText, ChevronDown, ArrowRight } from "lucide-react";
import { allServices, getAllServiceSlugs, getServiceBySlug } from "@/data/services";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  generateBreadcrumbSchema,
  generateLegalServiceSchema,
  generateFAQSchema,
} from "@/lib/seo/schemas";

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `https://lvivavukat.com/hizmetler/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://lvivavukat.com/hizmetler/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Anasayfa", url: "https://lvivavukat.com" },
    { name: "Hizmetlerimiz", url: "https://lvivavukat.com/hizmetler" },
    { name: service.title, url: `https://lvivavukat.com/hizmetler/${service.slug}` },
  ]);
  const legalServiceSchema = generateLegalServiceSchema({
    name: service.title,
    description: service.metaDescription,
    url: `https://lvivavukat.com/hizmetler/${service.slug}`,
  });
  const faqSchema = service.faq.length > 0 ? generateFAQSchema(service.faq) : null;

  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 6);
  const Icon = service.icon;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Hizmetlerimiz", href: "/hizmetler" },
              { label: service.title },
            ]}
          />
          <div className="mt-6 flex items-start gap-5">
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-accent/20 items-center justify-center flex-shrink-0">
              <Icon className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
                {service.title}
              </h1>
              <p className="mt-4 text-lg text-white/60 max-w-2xl">
                {service.heroDescription}
              </p>
              {service.duration && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-sm text-white/80">
                    Tahmini Süre: <strong className="text-accent">{service.duration}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Article content */}
              <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
                {service.content.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-2xl font-serif font-bold text-foreground mt-8 mb-4">
                        {paragraph.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith("- ")) {
                    const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                    return (
                      <ul key={i} className="space-y-2 my-4">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                            <span>{item.replace("- ", "")}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="mb-4">{paragraph}</p>;
                })}
              </div>

              {/* Process steps */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Süreç Adımları
                </h2>
                <div className="space-y-4">
                  {service.processSteps.map((step, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-xl bg-card border border-border/50">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                      <div>
                        <h3 className="font-serif font-bold text-foreground">{step.title}</h3>
                        <p className="text-sm text-muted mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required documents */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                  Gerekli Belgeler
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.requiredDocuments.map((doc, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary">
                      <FileText className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/80">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {service.faq.length > 0 && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                    Sıkça Sorulan Sorular
                  </h2>
                  <div className="space-y-3">
                    {service.faq.map((faq, i) => (
                      <details key={i} className="group border border-border/50 rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-secondary/50 transition-colors">
                          <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                          <ChevronDown className="w-5 h-5 text-muted flex-shrink-0 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-5 pb-5">
                          <p className="text-muted leading-relaxed">{faq.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* CTA Card */}
              <div className="sticky top-24 space-y-6">
                <div className="p-6 rounded-2xl bg-primary text-white">
                  <h3 className="font-serif font-bold text-lg mb-3">
                    Ücretsiz Danışma Alın
                  </h3>
                  <p className="text-sm text-white/60 mb-5">
                    {service.title} hakkında detaylı bilgi almak için hemen iletişime geçin.
                  </p>
                  <a
                    href="https://wa.me/380000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover 
                      text-primary py-3 rounded-xl font-bold text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp ile Ulaşın
                  </a>
                </div>

                {/* Other services */}
                <div className="p-6 rounded-2xl bg-card border border-border/50">
                  <h3 className="font-serif font-bold text-foreground mb-4">
                    Diğer Hizmetlerimiz
                  </h3>
                  <ul className="space-y-2">
                    {otherServices.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/hizmetler/${s.slug}`}
                          className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-foreground/70 
                            hover:bg-secondary hover:text-primary transition-all"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-accent" />
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
