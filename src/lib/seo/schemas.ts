export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Lviv Avukat - Av. Lyudmyla Chubai",
    alternateName: "Lviv Avukat",
    url: "https://lvivavukat.com",
    logo: "https://lvivavukat.com/logo.png",
    description:
      "Ukrayna Lviv'de Türk vatandaşlarına oturum izni, çalışma izni, evlilik, şirket kurma ve tüm hukuki süreçlerde profesyonel avukatlık ve danışmanlık hizmeti.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Svobody Ave",
      addressLocality: "Lviv",
      addressRegion: "Lviv Oblast",
      postalCode: "79000",
      addressCountry: "UA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.8397,
      longitude: 24.0297,
    },
    telephone: "+380000000000",
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [],
    areaServed: {
      "@type": "Country",
      name: "Ukraine",
    },
    knowsLanguage: ["tr", "uk", "ru", "en"],
  };
}

export function generateAttorneySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: "Lyudmyla Chubai",
    jobTitle: "Avukat / Hukuk Danışmanı",
    url: "https://lvivavukat.com/hakkimizda",
    worksFor: {
      "@type": "LegalService",
      name: "Lviv Avukat",
      url: "https://lvivavukat.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lviv",
      addressCountry: "UA",
    },
    knowsLanguage: ["tr", "uk", "ru", "en"],
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  imageUrl?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: post.url,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    image: post.imageUrl || "https://lvivavukat.com/og-image.jpg",
    author: {
      "@type": "Person",
      name: post.authorName || "Av. Lyudmyla Chubai",
    },
    publisher: {
      "@type": "Organization",
      name: "Lviv Avukat",
      logo: {
        "@type": "ImageObject",
        url: "https://lvivavukat.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.url,
    },
  };
}

export function generateLegalServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@type": "Attorney",
      name: "Lyudmyla Chubai",
      url: "https://lvivavukat.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Ukraine",
    },
    serviceType: "Legal Consulting",
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lviv Avukat",
    url: "https://lvivavukat.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://lvivavukat.com/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}
