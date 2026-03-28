# 🌐 Lviv Avukat — Çok Dilli (i18n) Uygulama Planı

> **Hedef:** Web sitesine Ukraynaca dil desteği eklemek. Türkçe ve Ukraynaca içerikler birbirinin çevirisi DEĞİL, farklı hedef kitlelere hitap eden bağımsız içeriklerdir.
>
> - **Türkçe (tr):** Ukrayna'da yaşayan/yaşamak isteyen Türk vatandaşları hedefler
> - **Ukraynaca (uk):** Ukrayna vatandaşlarını hedefler (avukatın yerli müşterileri)

---

## 🏗️ Mimari Kararlar

### URL Stratejisi
| Dil | Prefix | Örnek URL |
|-----|--------|-----------|
| Türkçe (varsayılan) | `/` (prefix yok) | `lvivavukat.com/hizmetler/oturum-izni` |
| Ukraynaca | `/ua/` | `lvivavukat.com/ua/poslugy/posvdika-na-prozhyvannia` |

> **Neden?** Mevcut Türkçe URL'ler değişmez → SEO kaybı sıfır. Ukraynaca `/ua/` prefix ile ayrılır. Google'ın hreflang ile her iki versiyon bağlanır.

### Sayfa Slug'ları (URL'ler)
| Türkçe Sayfa | Türkçe Slug | Ukraynaca Slug |
|--------------|-------------|----------------|
| Anasayfa | `/` | `/ua/` |
| Hizmetler | `/hizmetler` | `/ua/poslugy` |
| Hizmet Detay | `/hizmetler/[slug]` | `/ua/poslugy/[slug]` |
| Hakkımızda | `/hakkimizda` | `/ua/pro-nas` |
| Blog | `/blog` | `/ua/blog` |
| Blog Detay | `/blog/[slug]` | `/ua/blog/[slug]` |
| İletişim | `/iletisim` | `/ua/kontakty` |
| Gizlilik | `/gizlilik-politikasi` | `/ua/polityka-konfidentsiynosti` |
| KVKK | `/kvkk` | `/ua/zakhyst-danykh` |

### Teknoloji Seçimi
- **Kütüphane:** Next.js'in kendi i18n pattern'i (3rd party kütüphane yok — hafif, basit, Next.js 16 uyumlu)
- **Yaklaşım:** `app/[locale]/` dynamic segment + dictionary dosyaları
- **Locale Detection:** `Negotiator` + `@formatjs/intl-localematcher` (middleware/proxy seviyesinde Accept-Language header okuma)
- **Dictionary Pattern:** Her dil için JSON dictionary dosyaları + sayfa bazında ek içerik dosyaları

---

## 📋 UYGULAMA FAZLARI

---

### ✅ FAZ 1: Temel Altyapı (Core Infrastructure) — TAMAMLANDI
> Tüm diğer fazların temelini oluşturur — EN ÖNCELİKLİ

- [x] **1.1** `negotiator` ve `@formatjs/intl-localematcher` paketlerini yükle
- [x] **1.2** `src/i18n/config.ts` oluştur — Locale type tanımları, desteklenen diller, varsayılan dil
  ```typescript
  export const locales = ["tr", "uk"] as const;
  export type Locale = (typeof locales)[number];
  export const defaultLocale: Locale = "tr";
  ```
- [x] **1.3** `src/i18n/dictionaries/` klasörü oluştur — `tr.json` ve `uk.json` dosyaları
- [x] **1.4** `src/i18n/get-dictionary.ts` oluştur — Dictionary yükleme fonksiyonu (server-only)
- [x] **1.5** `src/i18n/locale-utils.ts` — URL'den locale çıkarma, locale kontrol, link oluşturma helper'ları
- [x] **1.6** Middleware/proxy'ye locale detection ve yönlendirme ekle:
  - Accept-Language header'dan dil tespit
  - Cookie'den önceki tercih oku (`NEXT_LOCALE`)
  - Locale prefix yoksa cookie/header'a göre yönlendir
  - Admin route'ları hariç tut (admin panel locale'den bağımsız)
  - Static asset'ler, API route'ları hariç tut

---

### ✅ FAZ 2: Routing Yeniden Yapılandırma — TAMAMLANDI
> Mevcut sayfa yapısını `[locale]` dynamic segment altına taşı

- [x] **2.1** `src/app/[locale]/` klasörü oluştur
- [x] **2.2** `src/app/[locale]/layout.tsx` oluştur — locale'e göre `<html lang>`, metadata, fonts
- [x] **2.3** Mevcut `(public)` grubu altındaki sayfaları `[locale]/(public)/` altına taşı:
  - `page.tsx` (anasayfa)
  - `hizmetler/page.tsx` + `hizmetler/[slug]/page.tsx`
  - `blog/page.tsx` + `blog/[slug]/page.tsx`
  - `hakkimizda/page.tsx`
  - `iletisim/page.tsx` + `iletisim/actions.ts`
  - `gizlilik-politikasi/page.tsx`
  - `kvkk/page.tsx`
- [x] **2.4** Ukraynaca route alias sistemi (rewrite):
  - `/ua/poslugy` → `[locale="uk"]/(public)/hizmetler`
  - `/ua/pro-nas` → `[locale="uk"]/(public)/hakkimizda`
  - `/ua/kontakty` → `[locale="uk"]/(public)/iletisim`
  - vs.
  - **ÖNEMLİ:** Türkçe slug'lar korunur (`/hizmetler`), Ukraynaca slug'lar eklenir (`/ua/poslugy`)
- [x] **2.5** `(public)/layout.tsx` güncelle — Header ve Footer'a locale prop geç
- [x] **2.6** Root `layout.tsx`'i minimalize et (sadece fonts + body)
- [x] **2.7** `generateStaticParams` fonksiyonlarını güncelle — her locale için path üret
- [x] **2.8** `not-found.tsx`, `error.tsx`, `loading.tsx` dosyalarını locale-aware yap

---

### ✅ FAZ 3: Veritabanı Şema Güncellemesi
> Blog ve iletişim formlarına dil desteği

- [ ] **3.1** `blogPosts` tablosuna `language` varchar(5) kolonu ekle (default: 'tr')
  ```sql
  ALTER TABLE blog_posts ADD COLUMN language VARCHAR(5) DEFAULT 'tr' NOT NULL;
  ```
- [ ] **3.2** `blogPosts` tablosunda slug unique constraint'i güncelle:
  - Mevcut: `slug` UNIQUE
  - Yeni: `(slug, language)` UNIQUE (aynı slug farklı dillerde olabilir)
- [ ] **3.3** `blogCategories` tablosuna `language` varchar(5) kolonu ekle (default: 'tr')
- [ ] **3.4** `contactSubmissions` tablosuna `language` varchar(5) kolonu ekle — hangi dilde form gönderildi bilgisi
- [ ] **3.5** Drizzle schema dosyasını güncelle (`src/lib/db/schema.ts`)
- [ ] **3.6** Migration oluştur ve çalıştır: `npx drizzle-kit generate` + `npx drizzle-kit push`
- [ ] **3.7** Mevcut blog verilerini Türkçe olarak işaretle

---

### ✅ FAZ 4: Çeviri Dictionary Dosyaları — TAMAMLANDI
> Tüm site genelindeki statik metinler için çeviri dosyaları

- [x] **4.1** `src/i18n/dictionaries/tr.json` oluştur — Türkçe dictionary:
  ```json
  {
    "nav": {
      "home": "Anasayfa",
      "services": "Hizmetlerimiz",
      "about": "Hakkımızda",
      "blog": "Blog",
      "contact": "İletişim",
      "freeConsultation": "Ücretsiz Danışma"
    },
    "footer": {
      "about": "Hakkımızda",
      "quickLinks": "Hızlı Bağlantılar",
      "services": "Hizmetlerimiz",
      "contact": "İletişim",
      "hours": "Çalışma Saatleri",
      "weekdays": "Pazartesi - Cuma: 09:00 - 18:00",
      "saturday": "Cumartesi: 10:00 - 14:00",
      "privacy": "Gizlilik Politikası",
      "copyright": "Tüm hakları saklıdır."
    },
    "hero": { ... },
    "stats": { ... },
    "whyUs": { ... },
    "process": { ... },
    "testimonials": { ... },
    "faq": { ... },
    "cta": { ... },
    "about": { ... },
    "contact": { ... },
    "blog": { ... },
    "common": {
      "readMore": "Devamını Oku",
      "viewAll": "Tümünü Gör",
      "loading": "Yükleniyor...",
      "error": "Bir hata oluştu",
      "search": "Ara...",
      "backToHome": "Anasayfaya Dön"
    }
  }
  ```
- [x] **4.2** `src/i18n/dictionaries/uk.json` oluştur — Ukraynaca dictionary:
  ```json
  {
    "nav": {
      "home": "Головна",
      "services": "Послуги",
      "about": "Про нас",
      "blog": "Блог",
      "contact": "Контакти",
      "freeConsultation": "Безкоштовна консультація"
    },
    ...
  }
  ```
- [ ] **4.3** Sayfa bazında özel içerik dosyaları (sadece farklı olan uzun içerikler):
  - `src/i18n/content/tr/about.ts` — Hakkımızda sayfası TR içeriği
  - `src/i18n/content/uk/about.ts` — Hakkımızda sayfası UK içeriği
  - `src/i18n/content/tr/faq.ts` — FAQ TR
  - `src/i18n/content/uk/faq.ts` — FAQ UK
  - `src/i18n/content/tr/testimonials.ts` — Referanslar TR
  - `src/i18n/content/uk/testimonials.ts` — Referanslar UK

---

### ✅ FAZ 5: Hizmetler Veri Yapısı Güncelleme
> 50+ hizmetin Ukraynaca versiyonları (farklı hedef kitle, farklı slug)

- [ ] **5.1** `src/data/services.ts` yapısına locale desteği ekle:
  ```typescript
  // Her ServiceItem'a locale-aware slug ve içerik map'i
  export interface LocalizedServiceItem extends ServiceItem {
    locale: Locale;
    // Ukraynaca'da slug farklı: "posvidka-na-prozhyvannia" vs "gecici-oturum-izni"
  }
  ```
- [ ] **5.2** `src/data/services-uk.ts` oluştur — Ukrayna vatandaşlarına yönelik farklı hizmetler
  - Ukraynaca başlıklar, slug'lar, açıklamalar
  - Hedef kitle farklı: "Як українцям отримати..." yerine "Як іноземцям отримати..."
  - Tüm processSteps, FAQs, requiredDocuments Ukraynaca
- [ ] **5.3** `getServiceBySlug()` ve `getAllServiceSlugs()` fonksiyonlarını locale-aware yap
- [ ] **5.4** MegaMenu, ServicesGrid, Footer'daki servis referanslarını locale-aware güncelle
- [ ] **5.5** `[slug]/page.tsx` → `generateStaticParams` her locale için slug üretsin

---

### ✅ FAZ 6: Component'ları i18n'e Uyarlama — TAMAMLANDI
> Tüm public component'lar dictionary'den metin alsın

- [x] **6.1** `Header.tsx` — navItems, CTA button, mega menu tetikleyicisi locale'den gelsin
- [x] **6.2** `Footer.tsx` — Tüm başlıklar, linkler, iletişim, çalışma saatleri dictionary'den
- [x] **6.3** `MegaMenu.tsx` — Hizmet kategorileri locale'e göre farklı data
- [x] **6.4** `Hero.tsx` — Badge, H1, description, CTA butonları dictionary'den
  - Türkçe: "Ukrayna'da Hukuki Haklarınızı Koruyoruz"
  - Ukraynaca: "Юридичний захист ваших прав в Україні" (farklı mesaj)
- [x] **6.5** `Stats.tsx` — İstatistik başlıkları ve açıklamaları
- [x] **6.6** `ServicesGrid.tsx` — Başlık + hizmet kartları locale'e göre
- [x] **6.7** `WhyUs.tsx` — Neden biz bölümü başlıklar ve maddeler
- [x] **6.8** `Process.tsx` — Süreç adımları başlıkları
- [x] **6.9** `Testimonials.tsx` — Referanslar (farklı dillerde farklı müşteriler)
  - TR: Türk müşteri yorumları
  - UK: Ukraynalı müşteri yorumları
- [x] **6.10** `FAQ.tsx` — SSS soruları ve cevapları (dile göre farklı sorular)
- [x] **6.11** `CTABanner.tsx` — CTA başlık, açıklama, buton metni
- [ ] **6.12** `Breadcrumb.tsx` — Ekmek kırıntısı etiketleri locale-aware
- [ ] **6.13** `WhatsAppButton.tsx` — Tooltip metni locale'e göre
- [x] **6.14** Dil değiştirici component (Language Switcher) oluştur:
  - Header'a entegre (bayrak ikonu + dil kodu)
  - Mevcut sayfanın diğer dildeki karşılığına link
  - Tıklandığında `NEXT_LOCALE` cookie set edilir
  - Mobil ve desktop uyumlu tasarım

---

### ✅ FAZ 7: Blog Çift Dil Sistemi
> Blog yazıları dil bazlı filtrelenir, AI ile dil seçimi yapılır

- [ ] **7.1** Public blog listesi sayfası — Locale'e göre filtreleme:
  - `/blog` → `language = 'tr'` olan postları göster
  - `/ua/blog` → `language = 'uk'` olan postları göster
- [ ] **7.2** Public blog detay sayfası — Her post tek bir dilde:
  - `/blog/[slug]` — TR post
  - `/ua/blog/[slug]` — UK post
  - Eğer aynı konunun diğer dilde karşılığı varsa, hreflang alternate link
- [ ] **7.3** Admin blog listesi — Dil filtresi ekle:
  - Her post yanında dil bayrağı/etiketi göster (🇹🇷 Türkçe / 🇺🇦 Ukraynaca)
  - Filtreleme: Tümü | Türkçe | Ukraynaca
- [ ] **7.4** Admin blog oluşturma formu — Dil seçici ekle:
  - Dropdown: Türkçe / Ukraynaca
  - Seçilen dile göre form submit'te `language` alanı kaydet
- [ ] **7.5** AI Blog Generation — Dil seçimi:
  - Blog oluştururken ilk adımda "Hangi dilde yazılsın?" sorusu
  - Seçilen dile göre farklı prompt templateları kullan
  - `BLOG_SYSTEM_PROMPT` zaten "kullanıcı hangi dilde yazıyorsa o dilde yaz" diyor — bunu genişlet
- [ ] **7.6** AI Prompt'ları güncelle:
  - `BLOG_TOPIC_PROMPT` — Dile göre farklı konu önerileri
  - `BLOG_CONTENT_PROMPT` — Dile göre tone ve hedef kitle bilgisi
  - `BLOG_META_PROMPT` — Slug oluşturmada Latin/Kiril dönüşümü
- [ ] **7.7** Blog kategorileri dil desteği — Her dilde ayrı kategoriler
- [ ] **7.8** Blog arama — Dil bazlı filtrelenmiş arama

---

### ✅ FAZ 8: Admin Panel Ukraynaca Arayüz
> Admin panelin tüm arayüzü Ukraynaca olacak

- [ ] **8.1** `src/i18n/dictionaries/admin-uk.json` oluştur:
  ```json
  {
    "sidebar": {
      "dashboard": "Панель управління",
      "clients": "Клієнти",
      "calendar": "Календар",
      "reminders": "Нагадування",
      "blog": "Блог",
      "documents": "Документи",
      "contactForms": "Форми зв'язку",
      "aiAssistant": "AI Асистент",
      "settings": "Налаштування",
      "logout": "Вийти"
    },
    "dashboard": { ... },
    "clients": { ... },
    ...
  }
  ```
- [ ] **8.2** `AdminSidebar.tsx` — Menü etiketlerini dictionary'den al
- [ ] **8.3** Admin Dashboard sayfası — Tüm etiketler Ukraynaca
- [ ] **8.4** Müvekkiller sayfası — Tablo başlıkları, butonlar, form etiketleri Ukraynaca
- [ ] **8.5** Takvim sayfası — Ay/gün isimleri, etiketler Ukraynaca
- [ ] **8.6** Hatırlatmalar sayfası — Labels Ukraynaca
- [ ] **8.7** Blog admin sayfası — Etiketler Ukraynaca (ama blog YAZILARI iki dilde olabilir)
- [ ] **8.8** Belgeler sayfası — Etiketler Ukraynaca
- [ ] **8.9** İletişim Formları sayfası — Etiketler Ukraynaca
- [ ] **8.10** AI Asistan sayfası — Interface Ukraynaca
- [ ] **8.11** Ayarlar sayfası — Etiketler Ukraynaca
- [ ] **8.12** Login sayfası — Ukraynaca giriş formu

---

### ✅ FAZ 9: SEO Optimizasyonu (100% Uyum)
> Her detay düşünülmüş, Google-ready multi-language SEO

- [x] **9.1** `<html lang>` attribute — Locale'e göre `"tr"` veya `"uk"` dinamik
- [x] **9.2** Metadata — Her sayfa için locale-specific metadata:
  ```typescript
  // Türkçe
  title: "Lviv Avukat | Ukrayna'da Türkler İçin Hukuki Danışmanlık"
  // Ukraynaca
  title: "Адвокат у Львові | Юридичні послуги — Людмила Чубай"
  ```
- [x] **9.3** OpenGraph locale:
  - TR: `locale: "tr_TR"`, `alternateLocales: ["uk_UA"]`
  - UK: `locale: "uk_UA"`, `alternateLocales: ["tr_TR"]`
- [x] **9.4** Hreflang alternate links — Her sayfanın `<head>`'inde:
  ```html
  <link rel="alternate" hreflang="tr" href="https://lvivavukat.com/hizmetler" />
  <link rel="alternate" hreflang="uk" href="https://lvivavukat.com/ua/poslugy" />
  <link rel="alternate" hreflang="x-default" href="https://lvivavukat.com/hizmetler" />
  ```
- [x] **9.5** Canonical URL'ler — Her dil versiyonu kendi canonical'ına sahip
- [ ] **9.6** Sitemap güncelle:
  - Her sayfa için iki entry (tr + uk)
  - Her entry'de `alternates` ile diğer dile referans
  ```typescript
  {
    url: "https://lvivavukat.com/hizmetler",
    alternates: {
      languages: {
        tr: "https://lvivavukat.com/hizmetler",
        uk: "https://lvivavukat.com/ua/poslugy",
      }
    }
  }
  ```
- [ ] **9.7** Robots.txt güncelle — Ukraynaca sitemap ekleme
- [ ] **9.8** JSON-LD Schema'lar locale-aware:
  - Organization schema → `inLanguage` parametresi
  - FAQ schema → Dile göre farklı FAQ
  - BreadcrumbList → Dile göre farklı breadcrumb
  - BlogPosting → `inLanguage` ile dil belirt
  - LegalService → Dile göre description
- [ ] **9.9** Keywords — Her dil için farklı anahtar kelimeler:
  - TR: "Lviv avukat", "Ukrayna oturum izni", "Ukrayna Türk avukat"
  - UK: "адвокат Львів", "юридичні послуги Львів", "Людмила Чубай адвокат"
- [ ] **9.10** Blog postlar için inter-language linking:
  - Her blog post sayfasında, aynı konunun diğer dildeki versiyonuna link (varsa)
- [ ] **9.11** `next/font` — Kiril alfabe desteği ekle:
  ```typescript
  // Inter ve Playfair Display'e "cyrillic" subset ekle
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]
  ```

---

### ✅ FAZ 10: Dil Tespit & Geçiş Mekanizması
> Otomatik dil tespiti + kullanıcı tercihi

- [ ] **10.1** Accept-Language based detection:
  - `uk`, `uk-UA`, `ru`, `ru-UA` → Ukraynaca (`/ua/`)
  - Diğer tümü (varsayılan) → Türkçe (`/`)
  - NOT: Rusça konuşanları da Ukraynaca'ya yönlendir (ortak hedef kitle)
- [ ] **10.2** Cookie persistence (`NEXT_LOCALE`):
  - Kullanıcı dil seçtiğinde cookie set et (1 yıl)
  - Sonraki ziyarette cookie'den oku → Accept-Language'den önce gelir
- [ ] **10.3** Language Switcher UI:
  - Header'da bayrak ikonları: 🇹🇷 / 🇺🇦
  - Tıklandığında:
    1. Cookie güncelle
    2. Mevcut sayfanın diğer dildeki karşılığına redirect
  - Mobilde hamburger menüde de görünsün
- [ ] **10.4** SEO-safe redirect:
  - Bot'lar yönlendirilMEZ (Googlebot, Bingbot, etc.)
  - Sadece gerçek kullanıcılar yönlendirilir
  - 302 (temporary) redirect kullan — Google'dan SEO penaltı almamak için
- [ ] **10.5** Geo-IP (gelecekte opsiyonel):
  - Şu an sadece Accept-Language kullan
  - İleride Vercel Edge ile geo-ip eklenebilir

---

### ✅ FAZ 11: İletişim Formu Dil Desteği
> Form hangi dilden gönderildiğini kaydet

- [ ] **11.1** İletişim formu — locale bilgisini hidden field olarak gönder
- [ ] **11.2** Form submit action'da `language` alanını DB'ye kaydet
- [ ] **11.3** Admin panelde iletişim formlarında dil bayrağı göster
- [ ] **11.4** İletişim sayfası Ukraynaca içerik — adres, çalışma saatleri, form etiketleri

---

### ✅ FAZ 12: Test & Kalite Kontrol
> Her şeyin doğru çalıştığından emin ol

- [ ] **12.1** Her Türkçe sayfa → doğru metadata, hreflang, canonical
- [ ] **12.2** Her Ukraynaca sayfa → doğru metadata, hreflang, canonical
- [ ] **12.3** Language switcher → Doğru sayfaya yönlendirme
- [ ] **12.4** Blog sistemi → Dil filtreleme, AI generation, admin panel
- [ ] **12.5** Sitemap → Tüm dil varyantları mevcut
- [ ] **12.6** SEO kontrol → Google Search Console doğrulama formatı
- [ ] **12.7** Mobil uyumluluk → Language switcher responsive
- [ ] **12.8** Build check → `next build` hatasız
- [ ] **12.9** Lighthouse SEO skoru → 100
- [ ] **12.10** hreflang kontrol → Karşılıklı referanslar doğru

---

## 📁 Yeni Dosya Yapısı (Sonuç)

```
src/
├── app/
│   ├── [locale]/                    # 🆕 Dynamic locale segment
│   │   ├── layout.tsx               # 🆕 Locale-aware layout (html lang, metadata)
│   │   ├── (public)/
│   │   │   ├── layout.tsx           # Header + Footer (locale-aware)
│   │   │   ├── page.tsx             # Anasayfa
│   │   │   ├── error.tsx
│   │   │   ├── loading.tsx
│   │   │   ├── hizmetler/
│   │   │   │   ├── page.tsx         # Hizmetler listesi
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # Hizmet detay
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx         # Blog listesi (dile göre filtrelenmiş)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx     # Blog detay
│   │   │   ├── hakkimizda/
│   │   │   │   └── page.tsx         # Hakkımızda
│   │   │   ├── iletisim/
│   │   │   │   ├── page.tsx
│   │   │   │   └── actions.ts
│   │   │   ├── gizlilik-politikasi/
│   │   │   │   └── page.tsx
│   │   │   └── kvkk/
│   │   │       └── page.tsx
│   │   └── not-found.tsx
│   ├── (admin)/                     # Admin panel OLDUĞU GİBİ kalır (locale segment dışında)
│   │   └── panel-yonetim2024x/
│   │       └── ...
│   ├── api/                         # API routes OLDUĞU GİBİ kalır
│   ├── layout.tsx                   # Root layout (fonts only)
│   ├── global-error.tsx
│   ├── not-found.tsx
│   ├── robots.ts                    # 📝 Güncelle
│   └── sitemap.ts                   # 📝 Büyük güncelleme
├── i18n/                            # 🆕 Tüm i18n altyapısı
│   ├── config.ts                    # Locale types, supported locales
│   ├── get-dictionary.ts            # Dictionary loader (server-only)
│   ├── locale-utils.ts              # URL helpers, locale detection
│   ├── dictionaries/
│   │   ├── tr.json                  # Türkçe UI metinleri
│   │   ├── uk.json                  # Ukraynaca UI metinleri
│   │   └── admin-uk.json            # Admin panel Ukraynaca
│   └── content/                     # Sayfa bazında büyük içerikler
│       ├── tr/
│       │   ├── about.ts             # Hakkımızda TR (milestones, values, stats)
│       │   ├── faq.ts               # SSS TR
│       │   └── testimonials.ts      # Referanslar TR
│       └── uk/
│           ├── about.ts             # Про нас UK
│           ├── faq.ts               # ЧАП UK
│           └── testimonials.ts      # Відгуки UK
├── data/
│   ├── services.ts                  # 📝 Refactored — TR services
│   └── services-uk.ts              # 🆕 UK services (farklı hedef kitle)
├── components/
│   ├── layout/
│   │   ├── Header.tsx               # 📝 Locale-aware
│   │   ├── Footer.tsx               # 📝 Locale-aware
│   │   ├── MegaMenu.tsx             # 📝 Locale-aware
│   │   └── LanguageSwitcher.tsx     # 🆕 Dil değiştirici
│   ├── home/
│   │   ├── Hero.tsx                 # 📝 Dictionary'den metin
│   │   ├── Stats.tsx                # 📝 Dictionary'den metin
│   │   ├── ServicesGrid.tsx         # 📝 Locale-aware services
│   │   ├── WhyUs.tsx                # 📝 Dictionary'den metin
│   │   ├── Process.tsx              # 📝 Dictionary'den metin
│   │   ├── Testimonials.tsx         # 📝 Locale content'ten
│   │   ├── FAQ.tsx                  # 📝 Locale content'ten
│   │   └── CTABanner.tsx            # 📝 Dictionary'den metin
│   └── admin/
│       └── AdminSidebar.tsx         # 📝 Ukraynaca
├── middleware.ts                     # 📝 Locale detection ekleme
└── lib/
    ├── ai/
    │   └── prompts.ts               # 📝 Dil seçimli prompt'lar
    ├── seo/
    │   └── schemas.ts               # 📝 Locale-aware schemas
    └── db/
        └── schema.ts                # 📝 language field ekleme
```

---

## ⚠️ Kritik Notlar

1. **Mevcut URL'ler KORUNMALI** — `/hizmetler`, `/blog`, `/hakkimizda` gibi Türkçe URL'ler asla değişmemeli. SEO açısından bu hayati önem taşır.

2. **Ukraynaca İçerik ≠ Çeviri** — İki dildeki içerikler birbirinin çevirisi DEĞİLDİR:
   - Türkçe: "Ukrayna'da Türk vatandaşları için oturum izni süreci"
   - Ukraynaca: "Юридичні послуги для іноземців у Львові" (yabancılara hukuki hizmet)

3. **Admin Panel Dil:** Admin panel tek dilde çalışır (Ukraynaca). Blog yazıları iki dilde olabilir ama admin arayüzü sadece Ukraynaca.

4. **Bot Detection:** Search engine bot'ları hiçbir zaman locale redirect'e maruz kalmamalı. Sadece real user'lar redirect edilir.

5. **Cookie > Header:** Kullanıcı bir kez dil seçtiyse (cookie), Accept-Language header'dan daha önceliklidir.

6. **Kiril Font:** Inter ve Playfair Display fontlarına `cyrillic` ve `cyrillic-ext` subset eklenmeli.

7. **Blog Slug Unique:** Blog slug'ları artık `(slug, language)` çifti olarak unique olmalı. `ukrayna-oturum-izni` slug'ı hem TR hem UK'da farklı içeriklerle kullanılabilir.

---

## 📊 Tahmini İş Dağılımı

| Faz | Açıklama | Öncelik |
|-----|----------|---------|
| Faz 1 | Core Infrastructure | 🔴 Kritik |
| Faz 2 | Routing Restructure | 🔴 Kritik |
| Faz 3 | DB Schema | 🔴 Kritik |
| Faz 4 | Translation Files | 🔴 Kritik |
| Faz 5 | Services Data | 🟡 Yüksek |
| Faz 6 | Components | 🟡 Yüksek |
| Faz 7 | Blog System | 🟡 Yüksek |
| Faz 8 | Admin Panel | 🟢 Orta |
| Faz 9 | SEO | 🔴 Kritik |
| Faz 10 | Language Detection | 🟡 Yüksek |
| Faz 11 | Contact Form | 🟢 Orta |
| Faz 12 | Testing | 🔴 Kritik |

---

## 🔄 Uygulama Sıralaması

```
Faz 1 (Altyapı) → Faz 2 (Routing) → Faz 3 (DB) → Faz 4 (Dictionary) 
     → Faz 11 (Font/Kiril) → Faz 6 (Components) → Faz 5 (Services) 
     → Faz 7 (Blog) → Faz 8 (Admin) → Faz 10 (Detection) 
     → Faz 9 (SEO) → Faz 12 (Test)
```

> Bu sıralama bağımlılıkları dikkate alır: Altyapı olmadan routing yapılamaz, routing olmadan component'lar güncellenemez, DB olmadan blog dil desteği eklenemez.
