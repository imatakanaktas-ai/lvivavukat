# 🇺🇦 Ukrainian Website Rewrite — Master Plan & Progress Tracker

> **Goal:** Make the `/ua` version a completely independent Ukrainian website — not a translation of the Turkish site, but a site written from scratch for Ukrainian clients. Different slugs, different content, different perspective.

> **Current state:** Turkish site targets Turkish diaspora/immigrants in Ukraine. Ukrainian version should target local Ukrainian people needing legal services from Av. Lyudmyla Chubai in Lviv.

---

## Architecture Overview

### What Changes
- User-facing URLs: `/ua/hakkimizda` → `/ua/pro-nas`, `/ua/hizmetler/velayet` → `/ua/posluhy/opika-nad-ditmy`
- Internal routing stays the same: `/ua/*` → middleware rewrites to `/uk/*` for Next.js `[locale]` segment
- **Middleware** remaps Ukrainian page slugs + service slugs back to canonical Turkish folder names
- All content rendered from locale-aware data/dictionaries

### Routing Flow
```
User visits: /ua/posluhy/opika-nad-ditmy
  ↓
Middleware strips /ua → posluhy/opika-nad-ditmy
  ↓
Remaps: posluhy → hizmetler, opika-nad-ditmy → velayet
  ↓
Rewrites to: /uk/hizmetler/velayet
  ↓
Next.js renders [locale=uk]/(public)/hizmetler/[slug=velayet]/page.tsx
  ↓
Page detects locale=uk → renders Ukrainian content, generates Ukrainian links
```

---

## Slug Mappings

### Page Slugs (already in config.ts — pageSlugMap)

| Page | TR Slug (folder) | UA URL Slug | Status |
|------|------------------|-------------|--------|
| Services | `hizmetler` | `posluhy` | ✅ In config |
| About | `hakkimizda` | `pro-nas` | ✅ In config |
| Contact | `iletisim` | `kontakty` | ✅ In config |
| Blog | `blog` | `blog` | ✅ Same |
| Privacy | `gizlilik-politikasi` | `polityka-konfidentsiynosti` | ✅ In config |
| Data Protection | `kvkk` | `zakhyst-danykh` | ✅ In config |

### Service Slugs (NEW — to be added)

| # | TR Slug | UA Slug | UA Title | Primary UA Keyword |
|---|---------|---------|----------|-------------------|
| 1 | `gecici-oturum-izni` | `tymchasove-prozhyvannia` | Тимчасовий дозвіл на проживання | тимчасове проживання Львів |
| 2 | `kalici-oturum-izni` | `postiine-prozhyvannia` | Постійний дозвіл на проживання | постійне проживання Україна |
| 3 | `calisma-izni` | `dozvil-na-pratsiu` | Дозвіл на працевлаштування | дозвіл на роботу Україна |
| 4 | `ogrenci-vizesi` | `studentska-viza` | Студентська віза | студентська віза Україна |
| 5 | `vize-uzatma` | `prodovzhennia-vizy` | Продовження візи | продовження візи Львів |
| 6 | `evlilik-islemleri` | `oformlennia-shliubu` | Оформлення шлюбу | реєстрація шлюбу Львів |
| 7 | `bosanma` | `rozluchennia` | Розлучення | розлучення адвокат Львів |
| 8 | `velayet` | `opika-nad-ditmy` | Опіка над дітьми | опіка над дітьми адвокат |
| 9 | `aile-birlesimi` | `vozziednannia-simii` | Возз'єднання сім'ї | возз'єднання сім'ї Україна |
| 10 | `vatandaslik` | `hromadianstvo` | Громадянство | громадянство України |
| 11 | `sirket-kurma` | `reiestratsiia-kompanii` | Реєстрація компанії | реєстрація ТОВ Львів |
| 12 | `gayrimenkul-hukuku` | `nerukhomist` | Право нерухомості | купівля нерухомості Львів |
| 13 | `is-hukuku` | `trudove-pravo` | Трудове право | трудовий адвокат Львів |
| 14 | `sozlesme-hukuku` | `dohovirne-pravo` | Договірне право | юрист договори Львів |
| 15 | `ceza-hukuku` | `kryminalne-pravo` | Кримінальне право | кримінальний адвокат Львів |
| 16 | `miras-hukuku` | `spadkove-pravo` | Спадкове право | спадковий адвокат Львів |
| 17 | `vergi-danismanligi` | `podatkove-konsultuvannia` | Податкове консультування | податковий консультант Львів |
| 18 | `tercume-apostil` | `pereklad-apostyl` | Переклад та апостиль | апостиль Львів |
| 19 | `noter-islemleri` | `notarialni-posluhy` | Нотаріальні послуги | нотаріус Львів |

---

## SEO & AEO Strategy

### Per-Service Page SEO Requirements
Each Ukrainian service page must have:

1. **Meta Title** — Primary keyword + "| Адвокат Львів" (max 60 chars)
2. **Meta Description** — Unique, keyword-rich, 150-160 chars with CTA
3. **H1** — Primary keyword, single per page
4. **Content length** — 1000-1500 words of useful, original content
5. **Keyword density** — Primary keyword 1.5-2.5%, 3-5 secondary keywords at 0.5-1%
6. **Structured data** — LegalService schema, FAQ schema, Breadcrumb schema
7. **Internal links** — 3-5 links to related services
8. **External authority signals** — References to Ukrainian laws (Сімейний кодекс, Цивільний кодекс, etc.)

### AEO (Answer Engine Optimization)
- Every service page includes **FAQ section** (5-8 questions) written as natural questions people ask
- FAQ questions match Google "People Also Ask" and AI assistant query patterns
- Answers are concise (2-3 sentences) but complete — optimized for featured snippets
- Content blocks use **question-answer format** where appropriate
- Process steps provide direct, actionable answers

### Content Block Types (Rich Visual Layout)
Every service page uses a MIX of these block types (not plain text):

| Block Type | Purpose | Visual |
|-----------|---------|--------|
| `highlight` | Key message / value proposition | Accent-colored card, full-width |
| `features` | Service capabilities / what's included | 2-column grid with icon cards |
| `stats` | Numbers that build trust | 4-column stat boxes |
| `why_us` | Competitive advantages | Gradient card with bullet list |
| `quote` | Attorney quote / trust signal | Styled blockquote |
| `alert` | Important warnings / deadlines | Warning/info banner |
| `markdown` | Detailed explanatory text with H3s | Prose with bold/lists |

**Minimum per page:** At least 5-6 different block types for visual variety.

### Keyword Map Per Service

#### Category: Проживання та візи
| Service | Primary Keyword | Secondary Keywords |
|---------|----------------|-------------------|
| Тимчасове проживання | тимчасовий дозвіл на проживання | посвідка на проживання, іноземці Україна, ДМС Львів, тимчасове проживання для іноземців |
| Постійне проживання | постійне проживання Україна | посвідка на постійне проживання, ПМЖ Україна, імміграція Львів, дозвіл на проживання |
| Дозвіл на працю | дозвіл на працевлаштування | робочий дозвіл Україна, працевлаштування іноземців, робоча віза, Центр зайнятості |
| Студентська віза | студентська віза Україна | навчання в Україні, дозвіл на проживання студент, іноземні студенти Львів |
| Продовження візи | продовження візи Україна | термін перебування, легальне перебування, ДМС продовження |

#### Category: Сімейне та особисте право
| Service | Primary Keyword | Secondary Keywords |
|---------|----------------|-------------------|
| Оформлення шлюбу | реєстрація шлюбу з іноземцем | шлюб з іноземцем Львів, ДРАЦС, документи для шлюбу, апостиль |
| Розлучення | розлучення адвокат Львів | розірвання шлюбу, поділ майна, аліменти, Сімейний кодекс |
| Опіка над дітьми | опіка над дітьми адвокат | визначення місця проживання дитини, батьківські права, аліменти на дитину |
| Возз'єднання сім'ї | возз'єднання сім'ї Україна | запрошення для іноземця, сімейна віза, дозвіл на проживання для родини |
| Громадянство | громадянство України | набуття громадянства, натуралізація, паспорт, Державна міграційна служба |

#### Category: Комерційне та загальне право
| Service | Primary Keyword | Secondary Keywords |
|---------|----------------|-------------------|
| Реєстрація компанії | реєстрація ТОВ Львів | відкрити фірму Україна, статут ТОВ, ЄДР, бізнес Україна |
| Нерухомість | купівля нерухомості Львів | купівля квартири, договір купівлі-продажу, нотаріус, перевірка нерухомості |
| Трудове право | трудовий адвокат Львів | трудовий спір, звільнення, КЗпП, трудовий договір |
| Договірне право | юрист договори Львів | складання договорів, перевірка контракту, комерційні угоди |
| Кримінальне право | кримінальний адвокат Львів | захист у кримінальній справі, адвокат 24/7, затримання, КПК |
| Спадкове право | спадковий адвокат Львів | оформлення спадщини, свідоцтво про спадщину, спадкова справа, нотаріус |
| Податки | податковий консультант Львів | ФОП, податкова оптимізація, ЄСВ, податкова декларація |
| Переклад та апостиль | апостиль Львів | легалізація документів, переклад документів, нотаріальний переклад |
| Нотаріальні послуги | нотаріус Львів | довіреність, посвідчення договору, нотаріальне засвідчення |

---

## Execution Phases

### PHASE 0: Infrastructure (Slug Routing & Links)
> Make Ukrainian slugs work in URLs. All links on UA site point to Ukrainian slugs.

- [x] **0.1** Add `slugUk` to `ServiceItem` interface in `services.ts`
- [x] **0.2** Add Ukrainian slugs to all 19 services in `services.ts`
- [x] **0.3** Add service slug map to `src/i18n/config.ts` (serviceSlugMap + reverse lookup)
- [x] **0.4** Update `middleware.ts` — remap UA page slugs AND service slugs to canonical
- [x] **0.5** Add `localizedHref()` helper to `locale-utils.ts` (replaces all manual prefix+slug)
- [x] **0.6** Update `getLocalizedServiceCategories()` in `services.ts` to include `slugUk`
- [x] **0.7** Update `Header.tsx` — use localized page paths
- [x] **0.8** Update `Footer.tsx` — use localized page + service paths
- [x] **0.9** Update `MegaMenu.tsx` — use localized service paths
- [x] **0.10** Update `MobileMenu.tsx` — use localized page + service paths
- [x] **0.11** Update `Hero.tsx` — use localized services page link
- [x] **0.12** Update `ServicesGrid.tsx` — use localized service paths
- [x] **0.13** Update `CTABanner.tsx` — use localized contact link
- [x] **0.14** Update `hizmetler/page.tsx` — use localized service paths
- [x] **0.15** Update `hizmetler/[slug]/page.tsx` — accept UA slugs, emit localized links
- [x] **0.16** Update `sitemap.ts` — emit UA URLs with Ukrainian slugs
- [x] **0.17** Build & verify all routes work
- [x] **0.18** Push to GitHub

### PHASE 1: Homepage & Core Pages Content (SEO)
> Rewrite uk.json + About page for Ukrainian audience. All SEO meta tags optimized.

- [x] **1.1** Rewrite `uk.json` — hero (for Ukrainian clients: "Юридичний захист у Львові")
- [x] **1.2** Rewrite `uk.json` — stats, whyUs, process, testimonials
- [x] **1.3** Rewrite `uk.json` — footer, servicesGrid labels
- [x] **1.4** Rewrite `uk.json` — services, about, contact section meta/content
- [x] **1.5** Rewrite About page (`hakkimizda/page.tsx`) — locale-branched content for UA (full original content, not translation)
- [x] **1.6** Verify Contact page — UA content, SEO meta
- [x] **1.7** Build & push

### PHASE 2: Services Batch 1 — Проживання та візи (1-3)
> 1000-1500 words each. Rich content blocks. Full SEO+AEO.

- [x] **2.1** Тимчасовий дозвіл на проживання — Full UA content (contentBlocksUk, faqUk, processStepsUk, requiredDocumentsUk, metaTitleUk, metaDescriptionUk, heroDescriptionUk)
- [x] **2.2** Постійний дозвіл на проживання — Full UA content
- [x] **2.3** Дозвіл на працевлаштування — Full UA content
- [x] **2.4** Update `[slug]/page.tsx` to render `*Uk` fields when locale=uk
- [x] **2.5** Build & push

### PHASE 3: Services Batch 2 — Візи + Сімейне (4-6)
- [ ] **3.1** Студентська віза — Full UA content
- [ ] **3.2** Продовження візи — Full UA content
- [ ] **3.3** Оформлення шлюбу — Full UA content
- [ ] **3.4** Build & push

### PHASE 4: Services Batch 3 — Сімейне право (7-9)
- [ ] **4.1** Розлучення — Full UA content
- [ ] **4.2** Опіка над дітьми — Full UA content
- [ ] **4.3** Возз'єднання сім'ї — Full UA content
- [ ] **4.4** Build & push

### PHASE 5: Services Batch 4 — Сімейне + Комерційне (10-12)
- [ ] **5.1** Громадянство — Full UA content
- [ ] **5.2** Реєстрація компанії — Full UA content
- [ ] **5.3** Нерухомість — Full UA content
- [ ] **5.4** Build & push

### PHASE 6: Services Batch 5 — Комерційне (13-15)
- [ ] **6.1** Трудове право — Full UA content
- [ ] **6.2** Договірне право — Full UA content
- [ ] **6.3** Кримінальне право — Full UA content
- [ ] **6.4** Build & push

### PHASE 7: Services Batch 6 — Решта (16-19)
- [ ] **7.1** Спадкове право — Full UA content
- [ ] **7.2** Податкове консультування — Full UA content
- [ ] **7.3** Переклад та апостиль — Full UA content
- [ ] **7.4** Нотаріальні послуги — Full UA content
- [ ] **7.5** Build & push

### PHASE 8: Blog (UA)
> 6 original Ukrainian blog posts. Different topics from TR blog — relevant to Ukrainian audience.

- [ ] **8.1** Create 6 UA blog posts: slugs, titles, excerpts, full content (SEO-optimized)
- [ ] **8.2** Update `blog/page.tsx` — show locale-based post list
- [ ] **8.3** Update `blog/[slug]/page.tsx` — render UA post content
- [ ] **8.4** Build & push

### PHASE 9: Legal Pages
- [ ] **9.1** Privacy Policy — full UA version
- [ ] **9.2** Data Protection (KVKK → GDPR/UA) — full UA version
- [ ] **9.3** Build & push

### PHASE 10: Final QA & SEO Audit
- [ ] **10.1** Full navigation test — every link on UA site uses Ukrainian slugs
- [ ] **10.2** Verify sitemap — all UA URLs have Ukrainian slugs
- [ ] **10.3** Meta tags audit — every UA page has unique meta title/description with keywords
- [ ] **10.4** Test language switcher (TR↔UA) with slug mapping
- [ ] **10.5** Lighthouse SEO score check
- [ ] **10.6** Final push

---

## Content Strategy

### Turkish Site — Target: Turkish Diaspora in Ukraine
- "Ukrayna'da Türk vatandaşları için..."
- Focus: Immigration, bureaucracy navigation for foreigners
- Tone: "We help YOU (Turkish person) navigate THEIR (Ukrainian) system"

### Ukrainian Site — Target: Ukrainian Citizens & Residents
- "Юридичні послуги у Львові..."
- Focus: Domestic legal needs — family, real estate, business, criminal defense
- Tone: "Ми захищаємо ваші права — професійно, швидко, конфіденційно"
- Residence/visa services framed as: helping foreigners (clients' family members, partners) get permits
- References to Ukrainian laws: Сімейний кодекс, Цивільний кодекс, КПК, КЗпП, Закон про ДМС
- All content from LOCAL Ukrainian perspective, not foreigner perspective

### Service Content Template
Each service page is built with these content blocks in this approximate order:
1. **highlight** — Main value proposition + primary keyword in first 100 words
2. **features** — 4 specific sub-services / what's included (icon cards, 2-col grid)
3. **markdown** — Detailed legal explanation with H3 headers, law references, internal links
4. **stats** — Trust numbers (cases won, success rate, experience years)
5. **why_us** — Competitive advantages (gradient card with bullets)
6. **alert** — Important deadline or warning
7. **quote** — Attorney quote as trust signal
8. **FAQ** — 5-8 natural questions (AEO-optimized for featured snippets)
9. **requiredDocuments** — Specific document list
10. **processSteps** — Step-by-step process (numbered cards)

---

## Technical Notes

### Service Data Architecture
Add parallel Ukrainian fields to `ServiceItem` interface:
```typescript
// New fields alongside existing Turkish ones:
slugUk: string;
metaTitleUk: string;
metaDescriptionUk: string;
heroDescriptionUk: string;
contentBlocksUk: ContentBlock[];
requiredDocumentsUk: string[];
processStepsUk: { title: string; description: string }[];
faqUk: { question: string; answer: string }[];
durationUk: string;
```

### Middleware Slug Resolution
```
1. /ua/posluhy/opika-nad-ditmy
2. Strip /ua → posluhy/opika-nad-ditmy
3. pageSlugMap reverse: posluhy → hizmetler
4. serviceSlugMap reverse: opika-nad-ditmy → velayet
5. Rewrite → /uk/hizmetler/velayet
```

### Link Generation (New Pattern)
```typescript
// Old: href={`${prefix}/hizmetler/${service.slug}`}
// New: href={localizedHref('/hizmetler/' + service.slug, locale)}
// Which produces: /ua/posluhy/opika-nad-ditmy (for uk) or /hizmetler/velayet (for tr)
```

---

## Progress Summary

| Phase | Description | Status | Done |
|-------|------------|--------|------|
| 0 | Infrastructure (Slug Routing) | ✅ Complete | 18/18 |
| 1 | Homepage & Core Pages | ✅ Complete | 7/7 |
| 2 | Services Batch 1 (Visa 1-3) | ✅ Complete | 5/5 |
| 3 | Services Batch 2 (Visa+Family 4-6) | ⬜ Not Started | 0/4 |
| 4 | Services Batch 3 (Family 7-9) | ⬜ Not Started | 0/4 |
| 5 | Services Batch 4 (Family+Comm 10-12) | ⬜ Not Started | 0/4 |
| 6 | Services Batch 5 (Commercial 13-15) | ⬜ Not Started | 0/4 |
| 7 | Services Batch 6 (Remaining 16-19) | ⬜ Not Started | 0/5 |
| 8 | Blog | ⬜ Not Started | 0/4 |
| 9 | Legal Pages | ⬜ Not Started | 0/3 |
| 10 | Final QA & SEO | ⬜ Not Started | 0/6 |
| **TOTAL** | | | **0/64** |
