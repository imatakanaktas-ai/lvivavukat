# 🇺🇦 Ukrainian Website Rewrite — Master Plan & Progress Tracker

> **Goal:** Make the `/ua` version a completely independent Ukrainian website — not a translation of the Turkish site, but a site written from scratch for Ukrainian clients. Different slugs, different content, different perspective.

> **Current state:** Turkish site targets Turkish diaspora/immigrants in Ukraine. Ukrainian version should target local Ukrainian people needing legal services from Av. Lyudmyla Chubai in Lviv.

---

## Architecture Overview

### Current Flow
```
/ua/hizmetler/velayet → middleware → /uk/hizmetler/velayet → [locale]/(public)/hizmetler/[slug]/page.tsx
```
- All slugs are Turkish
- Content is Turkish, some titles translated to Ukrainian
- Middleware just swaps `/ua` → `/uk`

### Target Flow
```
/ua/posluhy/opika-nad-ditmy → middleware → /uk/hizmetler/velayet → [locale]/(public)/hizmetler/[slug]/page.tsx
```
- Page slug mapping: `posluhy` → `hizmetler`, `pro-nas` → `hakkimizda`, etc.
- Service slug mapping: `opika-nad-ditmy` → `velayet`, etc.
- Each service page renders Ukrainian content when locale=uk
- All links generated with localized slugs

---

## Page Slug Mapping (already in config.ts)

| Page | TR Slug | UA Slug | Notes |
|------|---------|---------|-------|
| Services | `hizmetler` | `posluhy` | ✅ Already in pageSlugMap |
| About | `hakkimizda` | `pro-nas` | ✅ Already in pageSlugMap |
| Contact | `iletisim` | `kontakty` | ✅ Already in pageSlugMap |
| Blog | `blog` | `blog` | ✅ Same slug both languages |
| Privacy | `gizlilik-politikasi` | `polityka-konfidentsiynosti` | ✅ Already in pageSlugMap |
| Data Protection | `kvkk` | `zakhyst-danykh` | ✅ Already in pageSlugMap |

## Service Slug Mapping (NEW — needs to be added)

| # | TR Slug | UA Slug | TR Title | UA Title |
|---|---------|---------|----------|----------|
| 1 | `gecici-oturum-izni` | `tymchasove-prozhyvannia` | Geçici Oturum İzni | Тимчасовий дозвіл на проживання |
| 2 | `kalici-oturum-izni` | `postiine-prozhyvannia` | Kalıcı Oturum İzni | Постійний дозвіл на проживання |
| 3 | `calisma-izni` | `dozvil-na-pratsiu` | Çalışma İzni | Дозвіл на працевлаштування |
| 4 | `ogrenci-vizesi` | `studentska-viza` | Öğrenci Vizesi | Студентська віза |
| 5 | `vize-uzatma` | `prodovzhennia-vizy` | Vize Uzatma | Продовження візи |
| 6 | `evlilik-islemleri` | `oformlennia-shliubu` | Evlilik İşlemleri | Оформлення шлюбу |
| 7 | `bosanma` | `rozluchennia` | Boşanma | Розлучення |
| 8 | `velayet` | `opika-nad-ditmy` | Velayet | Опіка над дітьми |
| 9 | `aile-birlesimi` | `vozziednannia-simii` | Aile Birleşimi | Возз'єднання сім'ї |
| 10 | `vatandaslik` | `hromadianstvo` | Vatandaşlık | Громадянство |
| 11 | `sirket-kurma` | `reiestratsiia-kompanii` | Şirket Kurma | Реєстрація компанії |
| 12 | `gayrimenkul-hukuku` | `nerukhomist` | Gayrimenkul Hukuku | Право нерухомості |
| 13 | `is-hukuku` | `trudove-pravo` | İş Hukuku | Трудове право |
| 14 | `sozlesme-hukuku` | `dohovirne-pravo` | Sözleşme Hukuku | Договірне право |
| 15 | `ceza-hukuku` | `kryminalne-pravo` | Ceza Hukuku | Кримінальне право |
| 16 | `miras-hukuku` | `spadkove-pravo` | Miras Hukuku | Спадкове право |
| 17 | `vergi-danismanligi` | `podatkove-konsultuvannia` | Vergi Danışmanlığı | Податкове консультування |
| 18 | `tercume-apostil` | `pereklad-apostyl` | Tercüme & Apostil | Переклад та апостиль |
| 19 | `noter-islemleri` | `notarialni-posluhy` | Noter İşlemleri | Нотаріальні послуги |

---

## Files That Need Changes (Impact Map)

### Infrastructure Files
| File | Change Needed |
|------|--------------|
| `src/data/services.ts` | Add `slugUk` to interface + all 19 services |
| `src/middleware.ts` | Remap UA page slugs + service slugs to canonical |
| `src/i18n/config.ts` | Add service slug maps |
| `src/i18n/locale-utils.ts` | Add `localizedServiceSlug()` helper |
| `src/i18n/dictionaries/uk.json` | Full content rewrite for all sections |
| `src/app/sitemap.ts` | Generate UA URLs with Ukrainian slugs |

### Components (Link Generation — all use `${prefix}/hizmetler`)
| File | Hardcoded Turkish Slugs |
|------|------------------------|
| `src/components/layout/Header.tsx` | `/hizmetler`, `/hakkimizda`, `/iletisim`, `/blog` |
| `src/components/layout/Footer.tsx` | `/hizmetler`, `/hakkimizda`, `/iletisim`, `/blog`, `/gizlilik-politikasi`, `/kvkk`, `/hizmetler/${service.slug}` |
| `src/components/layout/MegaMenu.tsx` | `/hizmetler/${service.slug}`, `/hizmetler` |
| `src/components/layout/MobileMenu.tsx` | `/hizmetler`, `/hakkimizda`, `/blog`, `/iletisim`, `/hizmetler/${service.slug}` |
| `src/components/home/Hero.tsx` | `/hizmetler` |
| `src/components/home/ServicesGrid.tsx` | `/hizmetler/${service.slug}`, `/hizmetler` |
| `src/components/home/CTABanner.tsx` | `/iletisim` |

### Page Files (Content Rewrite)
| File | Current State | Target |
|------|--------------|--------|
| `src/app/[locale]/(public)/page.tsx` | Homepage — dict only | Rewrite uk.json hero, stats, etc. |
| `src/app/[locale]/(public)/hakkimizda/page.tsx` | 100% Turkish content | Full UA content in code or dict |
| `src/app/[locale]/(public)/iletisim/page.tsx` | Uses dict | Verify/enhance uk.json contact section |
| `src/app/[locale]/(public)/blog/page.tsx` | Hardcoded Turkish posts | Create UA blog posts |
| `src/app/[locale]/(public)/blog/[slug]/page.tsx` | Hardcoded Turkish content | Add UA post content |
| `src/app/[locale]/(public)/hizmetler/page.tsx` | Uses localized helpers | Links need slug mapping |
| `src/app/[locale]/(public)/hizmetler/[slug]/page.tsx` | Turkish contentBlocks | Full UA content per service |
| `src/app/[locale]/(public)/gizlilik-politikasi/page.tsx` | Unknown | Needs UA version |
| `src/app/[locale]/(public)/kvkk/page.tsx` | Unknown | Needs UA version |

---

## Execution Phases

### PHASE 0: Infrastructure (Slug Routing)
> Make Ukrainian slugs work in URLs before any content rewrite.

- [ ] **0.1** Add `slugUk` field to `ServiceItem` interface in `services.ts`
- [ ] **0.2** Add Ukrainian slugs to all 19 services in `services.ts`
- [ ] **0.3** Add service slug map + reverse lookup to `src/i18n/config.ts`
- [ ] **0.4** Update `middleware.ts` — remap UA page slugs AND service slugs to canonical
- [ ] **0.5** Add `localizedServiceSlug()` and `localizedPagePath()` helpers to `locale-utils.ts`
- [ ] **0.6** Update `Header.tsx` — use localized page slugs
- [ ] **0.7** Update `Footer.tsx` — use localized page + service slugs
- [ ] **0.8** Update `MegaMenu.tsx` — use localized service slugs
- [ ] **0.9** Update `MobileMenu.tsx` — use localized page + service slugs
- [ ] **0.10** Update `Hero.tsx` — use localized page slug for services link
- [ ] **0.11** Update `ServicesGrid.tsx` — use localized service slugs
- [ ] **0.12** Update `CTABanner.tsx` — use localized contact slug
- [ ] **0.13** Update `hizmetler/page.tsx` — use localized service slugs in links
- [ ] **0.14** Update `hizmetler/[slug]/page.tsx` — accept UA slugs, use localized links
- [ ] **0.15** Update `sitemap.ts` — generate UA URLs with Ukrainian slugs
- [ ] **0.16** Build & verify all routes work
- [ ] **0.17** Push to GitHub

### PHASE 1: Homepage & Core Pages Content
> Rewrite Ukrainian dictionary (uk.json) and page content for Ukrainian audience.

- [ ] **1.1** Rewrite `uk.json` — hero section (for Ukrainian clients, not Turkish immigrants)
- [ ] **1.2** Rewrite `uk.json` — stats, whyUs, process, testimonials sections
- [ ] **1.3** Rewrite `uk.json` — servicesGrid section labels
- [ ] **1.4** Rewrite `uk.json` — footer section
- [ ] **1.5** Rewrite About page (`hakkimizda/page.tsx`) — add locale-based content for UA
- [ ] **1.6** Verify Contact page works correctly in UA
- [ ] **1.7** Build & push

### PHASE 2: Services Content — Batch 1 (Residence & Visa, items 1-3)
> Full Ukrainian content for first 3 services. Content blocks, FAQ, documents, process steps — all written from scratch for Ukrainian audience.

- [ ] **2.1** Geçici Oturum İzni — Add UA contentBlocks, FAQ, docs, steps to `services.ts`
- [ ] **2.2** Kalıcı Oturum İzni — Add UA contentBlocks, FAQ, docs, steps
- [ ] **2.3** Çalışma İzni — Add UA contentBlocks, FAQ, docs, steps
- [ ] **2.4** Build & push

### PHASE 3: Services Content — Batch 2 (Visa + Family start, items 4-6)
- [ ] **3.1** Öğrenci Vizesi — Add UA content
- [ ] **3.2** Vize Uzatma — Add UA content
- [ ] **3.3** Evlilik İşlemleri — Add UA content
- [ ] **3.4** Build & push

### PHASE 4: Services Content — Batch 3 (Family Law, items 7-9)
- [ ] **4.1** Boşanma — Add UA content
- [ ] **4.2** Velayet — Add UA content
- [ ] **4.3** Aile Birleşimi — Add UA content
- [ ] **4.4** Build & push

### PHASE 5: Services Content — Batch 4 (Family + Commercial, items 10-12)
- [ ] **5.1** Vatandaşlık — Add UA content
- [ ] **5.2** Şirket Kurma — Add UA content
- [ ] **5.3** Gayrimenkul Hukuku — Add UA content
- [ ] **5.4** Build & push

### PHASE 6: Services Content — Batch 5 (Commercial, items 13-15)
- [ ] **6.1** İş Hukuku — Add UA content
- [ ] **6.2** Sözleşme Hukuku — Add UA content
- [ ] **6.3** Ceza Hukuku — Add UA content
- [ ] **6.4** Build & push

### PHASE 7: Services Content — Batch 6 (Remaining, items 16-19)
- [ ] **7.1** Miras Hukuku — Add UA content
- [ ] **7.2** Vergi Danışmanlığı — Add UA content
- [ ] **7.3** Tercüme & Apostil — Add UA content
- [ ] **7.4** Noter İşlemleri — Add UA content
- [ ] **7.5** Build & push

### PHASE 8: Blog
> Create Ukrainian blog posts — different topics relevant to Ukrainian audience.

- [ ] **8.1** Create 6 Ukrainian blog posts data (slugs, titles, excerpts, content)
- [ ] **8.2** Update `blog/page.tsx` to show locale-based posts
- [ ] **8.3** Update `blog/[slug]/page.tsx` to render UA post content
- [ ] **8.4** Build & push

### PHASE 9: Legal Pages
- [ ] **9.1** Rewrite Privacy Policy page for UA
- [ ] **9.2** Rewrite KVKK/Data Protection page for UA
- [ ] **9.3** Build & push

### PHASE 10: Final QA & SEO
- [ ] **10.1** Full navigation test — every link on UA site
- [ ] **10.2** Verify sitemap has correct UA URLs
- [ ] **10.3** Verify meta tags, canonical URLs, alternates
- [ ] **10.4** Test language switcher (TR↔UA) with slug mapping
- [ ] **10.5** Final push

---

## Content Strategy Notes

### Turkish Site (Current) — Target Audience: Turkish Diaspora in Ukraine
- "Ukrayna'da Türk vatandaşları için..." (For Turkish citizens in Ukraine...)
- Focus: Immigration, residency permits for foreigners, surviving Ukrainian bureaucracy
- Tone: "We help YOU (Turkish person) navigate THEIR (Ukrainian) system"

### Ukrainian Site (New) — Target Audience: Ukrainian Citizens & Residents
- "Юридичні послуги для громадян України..." (Legal services for citizens of Ukraine...)
- Focus: Domestic legal needs — family law, real estate, business law, criminal defense
- Tone: "Ми захищаємо ВАШІ права" (We protect YOUR rights)
- Residence/visa services framed as: helping foreigners (clients' family members, business partners) get permits
- Service content should reference Ukrainian laws, courts, procedures from LOCAL perspective

---

## Technical Notes

### Service Content Architecture
Each service in `services.ts` currently has Turkish-only `contentBlocks`, `requiredDocuments`, `processSteps`, `faq`. 

**Approach for UA content:** Add parallel `contentBlocksUk`, `requiredDocumentsUk`, `processStepsUk`, `faqUk` fields. The `[slug]/page.tsx` will select the appropriate version based on locale.

### Middleware Slug Resolution Order
```
1. Request: /ua/posluhy/opika-nad-ditmy
2. Strip /ua prefix → posluhy/opika-nad-ditmy
3. Split first segment: posluhy
4. Look up pageSlugMap reverse: posluhy → hizmetler
5. Split second segment: opika-nad-ditmy  
6. Look up serviceSlugMap reverse: opika-nad-ditmy → velayet
7. Rewrite to: /uk/hizmetler/velayet
```

### Link Generation Pattern
```typescript
// Current:  
href={`${prefix}/hizmetler/${service.slug}`}

// New:
href={`${prefix}/${localizedPageSlug('hizmetler', locale)}/${localizedServiceSlug(service.slug, locale)}`}
```

---

## Progress Summary

| Phase | Description | Status | Items Done |
|-------|------------|--------|------------|
| 0 | Infrastructure (Slug Routing) | ⬜ Not Started | 0/17 |
| 1 | Homepage & Core Pages | ⬜ Not Started | 0/7 |
| 2 | Services Batch 1 (Visa 1-3) | ⬜ Not Started | 0/4 |
| 3 | Services Batch 2 (Visa+Family 4-6) | ⬜ Not Started | 0/4 |
| 4 | Services Batch 3 (Family 7-9) | ⬜ Not Started | 0/4 |
| 5 | Services Batch 4 (Family+Comm 10-12) | ⬜ Not Started | 0/4 |
| 6 | Services Batch 5 (Commercial 13-15) | ⬜ Not Started | 0/4 |
| 7 | Services Batch 6 (Remaining 16-19) | ⬜ Not Started | 0/5 |
| 8 | Blog | ⬜ Not Started | 0/4 |
| 9 | Legal Pages | ⬜ Not Started | 0/3 |
| 10 | Final QA & SEO | ⬜ Not Started | 0/5 |
| **TOTAL** | | | **0/61** |
