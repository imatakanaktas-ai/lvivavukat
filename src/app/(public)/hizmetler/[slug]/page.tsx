import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, Clock, FileText, ChevronDown, ArrowRight, CheckCircle2, AlertCircle, Quote } from "lucide-react";
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

// Block Renderer Component
function BlockRenderer({ block, index }: { block: any, index: number }) {
  const renderTextWithBold = (text: string, boldClassName: string = "text-foreground font-semibold") => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, k) => 
      part.startsWith("**") && part.endsWith("**") 
        ? <strong key={k} className={boldClassName}>{part.slice(2, -2)}</strong> 
        : part
    );
  };

  if (block.type === "markdown") {
    return (
      <div key={index} className="prose prose-lg max-w-none text-foreground/80 leading-relaxed mb-10">
        {block.content.split("\n\n").map((paragraph: string, i: number) => {
          if (paragraph.startsWith("### ")) {
            return (
              <h3 key={i} className="text-xl font-serif font-bold text-foreground mt-6 mb-3">
                {renderTextWithBold(paragraph.replace("### ", ""), "text-primary font-bold")}
              </h3>
            );
          }
          if (paragraph.startsWith("## ")) {
            return (
              <h2 key={i} className="text-2xl font-serif font-bold text-primary mt-8 mb-4">
                {renderTextWithBold(paragraph.replace("## ", ""), "text-foreground font-bold")}
              </h2>
            );
          }
          if (paragraph.startsWith("- ")) {
            const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
            return (
              <ul key={i} className="space-y-2 my-4">
                {items.map((item, j) => {
                  let text = item.replace("- ", "");
                  return (
                    <li key={j} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                      <span>{renderTextWithBold(text, "text-foreground font-semibold")}</span>
                    </li>
                  );
                })}
              </ul>
            );
          }
          return (
            <p key={i} className="mb-4">
              {renderTextWithBold(paragraph, "text-foreground font-semibold")}
            </p>
          );
        })}
      </div>
    );
  }

  if (block.type === "highlight") {
    return (
      <div key={index} className="my-10 p-8 rounded-2xl bg-primary text-white shadow-xl shadow-primary/10">
        <h3 className="text-xl font-serif font-bold text-accent mb-3">{block.title}</h3>
        <p className="text-white/80 leading-relaxed">{block.content}</p>
      </div>
    );
  }

  if (block.type === "stats") {
    return (
      <div key={index} className="my-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {block.items.map((stat: any, i: number) => (
          <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
            <div className="text-sm font-medium text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "quote") {
    return (
      <div key={index} className="my-10 relative p-8 rounded-2xl bg-secondary/50 border-l-4 border-accent">
        <Quote className="absolute top-4 right-4 w-12 h-12 text-accent/10" />
        <p className="text-lg italic text-foreground/80 relative z-10">"{block.text}"</p>
        {block.author && (
          <p className="mt-4 font-semibold text-primary">— {block.author}</p>
        )}
      </div>
    );
  }

  if (block.type === "features") {
    return (
      <div key={index} className="my-10">
        <h3 className="text-2xl font-serif font-bold text-primary mb-6">{block.title}</h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {block.items.map((item: any, i: number) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "alert") {
    const isWarning = block.level === "warning" || block.level === "danger";
    return (
      <div key={index} className={`my-10 p-6 rounded-2xl flex gap-4 ${isWarning ? "bg-red-50 text-red-900 border border-red-100" : "bg-blue-50 text-blue-900 border border-blue-100"}`}>
        <AlertCircle className={`w-6 h-6 flex-shrink-0 ${isWarning ? "text-red-500" : "text-blue-500"}`} />
        <div>
          <h4 className={`font-bold mb-1 ${isWarning ? "text-red-800" : "text-blue-800"}`}>{block.title}</h4>
          <p className={isWarning ? "text-red-700/90" : "text-blue-700/90"}>{block.content}</p>
        </div>
      </div>
    );
  }

  if (block.type === "why_us") {
    return (
      <div key={index} className="my-10 p-8 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white">
        <h3 className="text-2xl font-serif font-bold text-accent mb-6">{block.title}</h3>
        <ul className="space-y-4">
          {block.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-3">
              <ArrowRight className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-white/90 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
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
              {/* Dynamic Content Blocks or Fallback */}
              {service.contentBlocks && service.contentBlocks.length > 0 ? (
                <div>
                  {service.contentBlocks.map((block, i) => (
                    <BlockRenderer key={i} block={block} index={i} />
                  ))}
                </div>
              ) : (
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
              )}

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
