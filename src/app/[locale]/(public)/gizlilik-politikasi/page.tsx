import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getDictionary } from "@/i18n/get-dictionary";
import { getLocalePrefix } from "@/i18n/locale-utils";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.privacy.title,
    description: dict.privacy.description,
    alternates: { canonical: "https://lvivavukat.com/gizlilik-politikasi" },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const prefix = getLocalePrefix(locale as Locale);

  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: dict.common.home, href: `${prefix}/` },
              { label: dict.privacy.title },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)] mt-4">
            Gizlilik Politikası
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-8">
            Son güncelleme: Ocak 2025
          </p>

          <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">1. Genel Bakış</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Lviv Avukat — Av. Lyudmyla Chubai (&quot;biz&quot;, &quot;bizim&quot;) olarak, web sitemizi
            (lvivavukat.com) ziyaret eden kullanıcılarımızın gizliliğine saygı duyuyoruz. Bu
            gizlilik politikası, hangi bilgileri topladığımızı, bu bilgileri nasıl kullandığımızı
            ve koruduğumuzu açıklamaktadır.
          </p>

          <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">2. Toplanan Bilgiler</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Web sitemiz aracılığıyla aşağıdaki bilgileri toplayabiliriz:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>İletişim formu aracılığıyla gönderdiğiniz ad, e-posta adresi, telefon numarası ve mesaj içeriği</li>
            <li>WhatsApp üzerinden iletişime geçtiğinizde paylaştığınız bilgiler</li>
            <li>Web sitesi kullanım verileri (çerezler, IP adresi, tarayıcı bilgileri)</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">3. Bilgilerin Kullanımı</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Topladığımız bilgileri şu amaçlarla kullanırız:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Hukuki danışmanlık taleplerinize yanıt vermek</li>
            <li>Size daha iyi hizmet sunmak</li>
            <li>Web sitemizi iyileştirmek</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">4. Bilgilerin Korunması</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Kişisel bilgilerinizi korumak için endüstri standardı güvenlik önlemleri uyguluyoruz.
            Verileriniz SSL şifreleme ile korunmaktadır ve yetkisiz erişime karşı güvenli ortamlarda
            saklanmaktadır.
          </p>

          <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">5. Üçüncü Taraf Paylaşımı</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Kişisel bilgilerinizi, yasal zorunluluklar dışında üçüncü taraflarla paylaşmıyoruz.
            Avukat-müvekkil gizliliği kapsamında tüm bilgileriniz korunmaktadır.
          </p>

          <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">6. Çerezler</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır.
            Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda
            bazı site işlevleri düzgün çalışmayabilir.
          </p>

          <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">7. Haklarınız</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Kişisel verilerinizle ilgili olarak aşağıdaki haklara sahipsiniz:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
            <li>Verilerinize erişim talep etme</li>
            <li>Verilerinizin düzeltilmesini isteme</li>
            <li>Verilerinizin silinmesini talep etme</li>
            <li>Veri işlemeye itiraz etme</li>
          </ul>

          <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">8. İletişim</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
          </p>
          <p className="text-gray-600 leading-relaxed">
            E-posta: info@lvivavukat.com<br />
            Adres: Svobody Ave, Lviv, Ukrayna 79000
          </p>
        </div>
      </section>
    </>
  );
}
