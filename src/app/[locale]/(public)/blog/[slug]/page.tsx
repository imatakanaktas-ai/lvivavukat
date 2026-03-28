import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  generateBreadcrumbSchema,
  generateBlogPostSchema,
} from "@/lib/seo/schemas";
import { type Locale } from "@/i18n/config";
import { localizedHref } from "@/i18n/locale-utils";

// Placeholder blog content — will be replaced with DB queries when admin is ready
const placeholderPostsContent: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readingTime: number;
    metaDescription: string;
    content: string;
  }
> = {
  "ukraynada-oturum-izni-nasil-alinir": {
    title: "Ukrayna'da Oturum İzni Nasıl Alınır? 2024 Kapsamlı Rehber",
    category: "Oturum İzni",
    date: "2024-12-15",
    readingTime: 8,
    metaDescription:
      "Ukrayna'da geçici ve kalıcı oturum izni başvurusu nasıl yapılır? 2024 güncel gereksinimler, belgeler ve adım adım süreç rehberi.",
    content: `Ukrayna'da yaşamak isteyen Türk vatandaşları için oturum izni almak, en kritik hukuki adımlardan biridir. Bu rehberde, 2024 yılı itibarıyla güncel başvuru sürecini detaylı olarak inceliyoruz.

## Oturum İzni Türleri

Ukrayna'da iki temel oturum izni türü bulunmaktadır:

**Geçici Oturum İzni (Тимчасове проживання):** 1 yıla kadar geçerli olan bu izin; çalışma, eğitim, aile birleşimi veya yatırım gerekçelerinden biriyle alınabilir.

**Kalıcı Oturum İzni (Постійне проживання):** Süresiz geçerli olan bu izin, belirli koşulların sağlanmasının ardından verilebilir. Genellikle 5 yıl süreyle Ukrayna'da yasal olarak yaşamış olanlar başvurabilir.

## Başvuru İçin Gerekli Belgeler

Başvuru sürecinde aşağıdaki belgeler talep edilmektedir:
- Geçerli pasaport (en az 6 ay süreli)
- Sağlık sigortası
- İkamet adresi belgesi
- Başvuru gerekçesini destekleyen belgeler
- 4 adet biyometrik fotoğraf
- Adli sicil kaydı (apostilli)
- Tercüme ve noter onaylı belgeler

## Başvuru Süreci

1. **Belge Hazırlığı:** Tüm belgelerin Ukraynacaya çevrilmesi ve noter onayı
2. **Başvuru Randevusu:** Göç idaresine randevu alınması
3. **Başvuru Sunumu:** Belgelerin göç dairesine teslimi
4. **İnceleme Süreci:** 15-30 iş günü bekleme süresi
5. **Sonuç:** Onay durumunda oturum kartının teslim alınması

## Profesyonel Destek Neden Önemli?

Ukrayna göç mevzuatı sık değişiklik göstermektedir. Eksik veya hatalı başvurular reddedilebilir ve bu durum hem zaman hem de maddi kayba neden olabilir. Profesyonel hukuki destek ile başvurunuzun doğru ve eksiksiz yapılmasını sağlayabilirsiniz.

Oturum izni başvurunuz hakkında ücretsiz ön değerlendirme için bizimle iletişime geçebilirsiniz.`,
  },
  "ukraynada-turk-vatandaslari-evlilik": {
    title: "Ukrayna'da Türk Vatandaşlarının Evlilik İşlemleri",
    category: "Aile Hukuku",
    date: "2024-11-28",
    readingTime: 6,
    metaDescription:
      "Türk vatandaşlarının Ukrayna'da evlenme süreci, gerekli belgeler ve hukuki prosedür hakkında kapsamlı bilgiler.",
    content: `Ukrayna'da bir Türk vatandaşı olarak evlenme süreci, bazı özel hukuki gereksinimleri beraberinde getirmektedir. Bu yazımızda sürecin tüm aşamalarını ele alıyoruz.

## Evlilik Başvurusu İçin Gerekenler

Türk vatandaşlarının Ukrayna'da evlenebilmesi için aşağıdaki belgeleri hazırlaması gerekmektedir:
- Geçerli pasaport
- Bekârlık belgesi (Türkiye'den alınacak, apostilli)
- Doğum belgesi (apostilli)
- Nüfus kayıt örneği
- Belgelerin Ukraynaca tercümesi ve noter onayı

## Süreç Adımları

1. **Belge Hazırlığı:** Türkiye'den gerekli belgelerin temini ve apostillenmesi
2. **Tercüme ve Onay:** Belgelerin yeminli tercüman tarafından Ukraynacaya çevrilmesi
3. **RACS Başvurusu:** Ukrayna Sivil Kayıt Dairesi'ne (РАЦС) başvuru
4. **Bekleme Süresi:** 30 günlük yasal bekleme süresi (acil durumlarda kısaltılabilir)
5. **Nikâh Töreni:** Resmi nikâh işlemi

## Önemli Bilgiler

Evlilik işlemi sonrasında Türkiye'deki nüfus müdürlüğüne de bildirim yapılması gerekmektedir. Ayrıca evlilik, oturum izni başvurusunda ek bir gerekçe olarak kullanılabilir.

Evlilik süreciniz hakkında detaylı bilgi ve destek için ofisimize başvurabilirsiniz.`,
  },
};

const allSlugs = [
  "ukraynada-oturum-izni-nasil-alinir",
  "ukraynada-turk-vatandaslari-evlilik",
  "ukraynada-sirket-kurma-rehberi",
  "ukrayna-calisma-izni-sureci",
  "ukraynada-gayrimenkul-alimi",
  "ukrayna-vize-turleri-karsilastirma",
];

export function generateStaticParams() {
  const locales = ["tr", "uk"];
  return locales.flatMap((locale) =>
    allSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = placeholderPostsContent[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `https://lvivavukat.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      url: `https://lvivavukat.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = placeholderPostsContent[slug];

  if (!post) {
    // For slugs that exist in the static list but have no content yet
    if (allSlugs.includes(slug)) {
      return <PlaceholderPost slug={slug} locale={locale as Locale} />;
    }
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Anasayfa", url: `https://lvivavukat.com${localizedHref("/", locale as Locale)}` },
    { name: "Blog", url: `https://lvivavukat.com${localizedHref("/blog", locale as Locale)}` },
    { name: post.title, url: `https://lvivavukat.com${localizedHref(`/blog/${slug}`, locale as Locale)}` },
  ]);
  const blogSchema = generateBlogPostSchema({
    title: post.title,
    description: post.metaDescription,
    url: `https://lvivavukat.com/blog/${slug}`,
    datePublished: post.date,
    dateModified: post.date,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            homeHref={localizedHref("/", locale as Locale)}
            items={[
              { label: "Blog", href: localizedHref("/blog", locale as Locale) },
              { label: post.title },
            ]}
          />
          <div className="mt-6 flex items-center gap-3 text-sm text-white/50">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-accent/20 text-accent 
              font-semibold rounded-md text-xs">
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
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white max-w-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-serif font-bold text-foreground mt-10 mb-4">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return (
                  <p key={i} className="font-semibold text-foreground mb-4">
                    {block.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (block.startsWith("- ")) {
                const items = block.split("\n").filter((l) => l.startsWith("- "));
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
              if (block.match(/^\d+\.\s/)) {
                const items = block.split("\n").filter((l) => l.match(/^\d+\.\s/));
                return (
                  <ol key={i} className="space-y-2 my-4 list-none">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{j + 1}</span>
                        </span>
                        <span dangerouslySetInnerHTML={{
                          __html: item
                            .replace(/^\d+\.\s/, "")
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                        }} />
                      </li>
                    ))}
                  </ol>
                );
              }
              // Handle inline bold
              const html = block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
              return <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: html }} />;
            })}
          </article>

          {/* Share + back */}
          <div className="mt-12 pt-8 border-t border-border/50 flex items-center justify-between">
            <Link
              href={localizedHref("/blog", locale as Locale)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent 
                hover:text-accent-hover transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tüm Yazılar
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              aria-label="Paylaş"
            >
              <Share2 className="w-4 h-4" />
              Paylaş
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function PlaceholderPost({ slug, locale }: { slug: string; locale: Locale }) {
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Blog", href: localizedHref("/blog", locale) },
              { label: "Yazı" },
            ]}
          />
          <h1 className="mt-6 text-3xl sm:text-4xl font-serif font-bold text-white">
            Bu yazı yakında yayınlanacak
          </h1>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted mb-6">
            Bu blog yazısı hazırlık aşamasındadır. Çok yakında yayınlanacaktır.
          </p>
          <Link
            href={localizedHref("/blog", locale)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent 
              hover:text-accent-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog&apos;a Dön
          </Link>
        </div>
      </section>
    </>
  );
}
