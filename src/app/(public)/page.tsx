import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyUs from "@/components/home/WhyUs";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTABanner from "@/components/home/CTABanner";
import { generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema } from "@/lib/seo/schemas";

const homeFaqs = [
  {
    question: "Ukrayna'da Türk vatandaşları vize olmadan ne kadar kalabilir?",
    answer: "Türk vatandaşları Ukrayna'ya vizesiz olarak giriş yapabilir ve 90 gün süreyle kalabilir. Bu süre 180 günlük dönem içinde geçerlidir.",
  },
  {
    question: "Oturum izni başvurusu ne kadar sürer?",
    answer: "Geçici oturum izni başvurusu genellikle 15-30 iş günü içinde sonuçlanır.",
  },
  {
    question: "Ukrayna'da evlilik Türkiye'de geçerli midir?",
    answer: "Evet, Ukrayna'da usulüne uygun yapılan evlilik, Türk Konsolosluğuna tescil ettirildikten sonra Türkiye'de de geçerlidir.",
  },
  {
    question: "Danışmanlık ücreti ne kadardır?",
    answer: "İlk danışma görüşmemiz tamamen ücretsizdir. Şeffaf ücretlendirme ile sürpriz masraf yoktur.",
  },
  {
    question: "Hizmetleriniz sadece Lviv ile mi sınırlı?",
    answer: "Ofisimiz Lviv'de olmakla birlikte Ukrayna genelinde hukuki destek sunuyoruz.",
  },
  {
    question: "Şirket kurmak için Ukrayna'da bulunmam gerekiyor mu?",
    answer: "Belirli aşamalarda bulunmanız gerekebilir ancak vekâletname ile birçok işlem sizin adınıza yapılabilir.",
  },
];

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema(homeFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <Stats />
      <ServicesGrid />
      <WhyUs />
      <Process />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}
