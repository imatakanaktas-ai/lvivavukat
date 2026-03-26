# TASKS — Lviv Avukat Projesi

## Faz 1: Proje Temeli & Altyapı ✅
- [x] Next.js 14 proje oluştur (App Router, TS, Tailwind)
- [x] shadcn/ui + tema konfigürasyonu (lacivert + gold)
- [x] Drizzle ORM + Neon DB şeması (14 tablo)
- [x] Vercel Blob konfigürasyonu
- [x] .env.local + environment variables
- [x] Temel layout + fontlar (Inter + Playfair Display)
- [x] Middleware iskelet (güvenlik + auth + rate limiting)
- [x] AI (Gemini/Vertex) client + prompts
- [x] Zod validasyon şemaları
- [x] NextAuth.js v5 konfigürasyonu
- [x] SEO şemaları (JSON-LD generators)
- [x] Hizmet verileri (19 hizmet, tam içerik)
- [x] next.config.ts (güvenlik headers, image config)

## Faz 2: Public Site — Layout, Navigasyon & Anasayfa
- [ ] Header (sticky, scroll efekti, mega menü, mobil menü)
- [ ] Footer (4 kolon)
- [ ] Hero section (animasyonlu, CTA)
- [ ] Güven barı (sayaç animasyonu)
- [ ] Hizmetler grid
- [ ] Neden Biz bölümü
- [ ] Süreç adımları (timeline)
- [ ] Referanslar carousel
- [ ] Son blog yazıları
- [ ] SSS accordion
- [ ] CTA banner
- [ ] WhatsApp floating button

## Faz 3: Public Site — Hizmetler & Mega Menü
- [ ] Mega menü (3 kategori)
- [ ] /hizmetler ana sayfa
- [ ] /hizmetler/[slug] detay sayfaları (19 sayfa)
- [ ] Breadcrumb navigation
- [ ] LegalService JSON-LD her sayfada

## Faz 4: Public Site — Hakkımızda, Blog & İletişim
- [ ] /hakkimizda (avukat profili, timeline, Attorney schema)
- [ ] /blog (listeleme, pagination, kategori filtre)
- [ ] /blog/[slug] (detay, içindekiler, paylaşım, BlogPosting schema)
- [ ] /iletisim (form, Google Maps, LocalBusiness schema)
- [ ] İletişim form server action

## Faz 5: Admin Panel — Temel & Dashboard
- [ ] Admin login page (gizli URL)
- [ ] Admin layout (sidebar, topbar)
- [ ] Dashboard (özet kartlar, takvim, hatırlatma, mesajlar)
- [ ] Auth koruması (middleware + page-level)

## Faz 6: Admin Panel — Müvekkil Yönetimi
- [ ] Müvekkil listesi (tablo, arama, filtre)
- [ ] Müvekkil ekleme/düzenleme formu
- [ ] Müvekkil detay (6 tab: belgeler, ödemeler, mahkeme, hatırlatmalar, takvim, notlar)
- [ ] Belge yükleme (Vercel Blob, drag & drop)
- [ ] Ödeme yönetimi

## Faz 7: Admin Panel — Takvim & Hatırlatma
- [ ] Tam takvim (aylık/haftalık/günlük)
- [ ] Etkinlik CRUD (renk kodlama, müvekkil seçimi)
- [ ] Hatırlatma yönetimi
- [ ] In-app bildirim sistemi

## Faz 8: Admin Panel — AI Blog Sistemi
- [ ] Blog CRUD (liste, kategori yönetimi)
- [ ] AI konu önerileri (Gemini)
- [ ] AI anahat oluşturma
- [ ] AI içerik üretimi (bölüm bazlı)
- [ ] SEO analiz (meta, slug, kelime yoğunluğu)
- [ ] Rich text editör
- [ ] Humanize butonu
- [ ] Başlık alternatifleri
- [ ] Kapak görseli upload
- [ ] Önizleme & yayınlama

## Faz 9: Admin Panel — Belge Oluşturma & Ek AI
- [ ] Belge şablon sistemi
- [ ] AI belge taslağı oluşturma
- [ ] PDF export
- [ ] AI asistan (sidebar chat)
- [ ] İletişim formu yönetimi
- [ ] Site ayarları

## Faz 10: SEO, AEO & Performans
- [ ] sitemap.xml (dinamik)
- [ ] robots.txt
- [ ] generateMetadata her sayfada
- [ ] Open Graph + Twitter Card
- [ ] JSON-LD tüm sayfalarda
- [ ] AEO (FAQ, HowTo schema)
- [ ] Performans optimizasyonu

## Faz 11: Güvenlik Sertleştirme
- [ ] Gizli admin URL (env variable)
- [ ] Rate limiting (IP bazlı)
- [ ] Security headers (CSP, HSTS, vb.)
- [ ] Input sanitization
- [ ] File upload validation
- [ ] Honeypot form koruması

## Faz 12: Tasarım & Animasyonlar
- [ ] Framer Motion animasyonları
- [ ] Page transitions
- [ ] Scroll reveal
- [ ] Hover efektleri
- [ ] Mobile-first responsive

## Faz 13: Deployment & Son Kontroller
- [ ] Vercel deployment
- [ ] Seed script (admin user, hizmetler, kategoriler)
- [ ] Lighthouse audit
- [ ] Cross-browser test
- [ ] 404 sayfası
