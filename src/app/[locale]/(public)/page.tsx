import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyUs from "@/components/home/WhyUs";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTABanner from "@/components/home/CTABanner";
import { generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema } from "@/lib/seo/schemas";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const faqItems = dict.faq.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema(faqItems);

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
      <Hero dict={dict} locale={locale as Locale} />
      <Stats dict={dict} />
      <ServicesGrid dict={dict} locale={locale as Locale} />
      <WhyUs dict={dict} />
      <Process dict={dict} />
      <Testimonials dict={dict} />
      <FAQ dict={dict} />
      <CTABanner dict={dict} locale={locale as Locale} />
    </>
  );
}
