import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Tag,
  BookOpen,
} from "lucide-react";
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
    title: dict.blog.title,
    description: dict.blog.description,
    alternates: { canonical: `${siteUrl}${prefix}/blog` },
  };
}

// Static placeholder posts until DB/admin is connected
const placeholderPosts = [
  {
    slug: "ukraynada-oturum-izni-nasil-alinir",
    title: "Ukrayna'da Oturum İzni Nasıl Alınır? 2024 Kapsamlı Rehber",
    excerpt:
      "Ukrayna'da geçici ve kalıcı oturum izni başvuru süreci, gerekli belgeler ve dikkat edilmesi gerekenler hakkında detaylı bilgi.",
    category: "Oturum İzni",
    date: "2024-12-15",
    readingTime: 8,
  },
  {
    slug: "ukraynada-turk-vatandaslari-evlilik",
    title: "Ukrayna'da Türk Vatandaşlarının Evlilik İşlemleri",
    excerpt:
      "Türk vatandaşlarının Ukrayna'da evlenmek için takip etmesi gereken hukuki süreç, belgeler ve önemli bilgiler.",
    category: "Aile Hukuku",
    date: "2024-11-28",
    readingTime: 6,
  },
  {
    slug: "ukraynada-sirket-kurma-rehberi",
    title: "Ukrayna'da Şirket Kurma: Türk Yatırımcılar İçin Rehber",
    excerpt:
      "Ukrayna'da Türk yatırımcıların şirket kurması için gerekli adımlar, şirket türleri, vergi sistemi ve hukuki gereksinimler.",
    category: "Ticaret Hukuku",
    date: "2024-11-10",
    readingTime: 10,
  },
  {
    slug: "ukrayna-calisma-izni-sureci",
    title: "Ukrayna Çalışma İzni Süreci ve Gereksinimleri",
    excerpt:
      "Türk vatandaşlarının Ukrayna'da çalışma izni başvurusu, işveren gereksinimleri ve izin türleri hakkında rehber.",
    category: "Çalışma İzni",
    date: "2024-10-20",
    readingTime: 7,
  },
  {
    slug: "ukraynada-gayrimenkul-alimi",
    title: "Ukrayna'da Gayrimenkul Alımı: Yabancılar İçin Kılavuz",
    excerpt:
      "Yabancı uyruklu kişilerin Ukrayna'da mülk edinmesi, tapu işlemleri ve hukuki dikkat edilmesi gerekenler.",
    category: "Gayrimenkul",
    date: "2024-10-05",
    readingTime: 9,
  },
  {
    slug: "ukrayna-vize-turleri-karsilastirma",
    title: "Ukrayna Vize Türleri: Hangisi Size Uygun?",
    excerpt:
      "Ukrayna'ya giriş için farklı vize türlerinin karşılaştırması, başvuru şartları ve süreleri hakkında bilgi.",
    category: "Vize",
    date: "2024-09-18",
    readingTime: 5,
  },
];

const categories = [
  "Oturum İzni",
  "Aile Hukuku",
  "Ticaret Hukuku",
  "Çalışma İzni",
  "Gayrimenkul",
  "Vize",
];

export default async function BlogPage({
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
    { name: dict.blog.title, url: `${siteUrl}${prefix}/blog` },
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
          <Breadcrumb items={[{ label: dict.blog.title }]} />
          <h1 className="mt-6 text-4xl sm:text-5xl font-serif font-bold text-white">
            {dict.blog.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl">
            {dict.blog.heroDescription}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Posts */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {placeholderPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group p-6 rounded-2xl bg-card border border-border/50 
                      hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 
                      transition-all duration-500"
                  >
                    <div className="flex items-center gap-3 mb-3 text-sm text-muted">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-accent/10 
                        text-accent font-semibold rounded-md text-xs">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readingTime} dk okuma
                      </span>
                    </div>

                    <Link href={`${prefix}/blog/${post.slug}`}>
                      <h2 className="text-xl font-serif font-bold text-foreground 
                        group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    <Link
                      href={`${prefix}/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent 
                        hover:text-accent-hover transition-colors"
                    >
                      Devamını Oku
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </article>
                ))}
              </div>

              {/* Placeholder: pagination will be added when DB is connected */}
              <div className="flex justify-center mt-10">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <BookOpen className="w-4 h-4" />
                  Blog yazıları admin panelden eklenecek ve burada listelenecektir.
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Search */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-serif font-bold text-foreground mb-4">
                  Blog&apos;da Ara
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Anahtar kelime..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary border border-border/50 
                      text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 
                      focus:ring-accent/30 transition-shadow"
                    disabled
                    aria-label="Blog arama"
                  />
                </div>
                <p className="text-xs text-muted mt-2">Arama özelliği yakında aktif olacaktır.</p>
              </div>

              {/* Categories */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-serif font-bold text-foreground mb-4">
                  Kategoriler
                </h3>
                <ul className="space-y-1.5">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <span className="flex items-center justify-between py-2 px-3 rounded-lg 
                        text-sm text-foreground/70 hover:bg-secondary transition-colors cursor-pointer">
                        {cat}
                        <span className="text-xs text-muted bg-secondary px-2 py-0.5 rounded-md">
                          {placeholderPosts.filter((p) => p.category === cat).length}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 rounded-2xl bg-primary text-white">
                <h3 className="font-serif font-bold text-lg mb-3">
                  Hukuki Sorularınız mı Var?
                </h3>
                <p className="text-sm text-white/60 mb-5">
                  Ukrayna hukuku hakkında sorularınız için bizimle iletişime geçin.
                </p>
                <a
                  href="https://wa.me/380000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover 
                    text-primary py-3 rounded-xl font-bold text-sm transition-colors"
                >
                  Ücretsiz Danışma
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
