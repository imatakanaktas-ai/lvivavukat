import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedHref } from "@/i18n/locale-utils";
import type { Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lvivavukat.com";
  return {
    title: dict.privacy.title,
    description: dict.privacy.description,
    alternates: { canonical: `${siteUrl}${localizedHref("/gizlilik-politikasi", locale as Locale)}` },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isUk = locale === "uk";

  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: dict.common.home, href: localizedHref("/", locale as Locale) },
              { label: dict.privacy.title },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)] mt-4">
            {dict.privacy.title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          {isUk ? <PrivacyContentUk /> : <PrivacyContentTr />}
        </div>
      </section>
    </>
  );
}

function PrivacyContentTr() {
  return (
    <>
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
    </>
  );
}

function PrivacyContentUk() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-8">
        Останнє оновлення: березень 2025
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">1. Загальні положення</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Адвокат Людмила Чубай (далі — &quot;ми&quot;, &quot;нас&quot;, &quot;наш&quot;) поважає
        конфіденційність відвідувачів веб-сайту lvivavukat.com. Ця Політика конфіденційності
        пояснює, яку інформацію ми збираємо, як використовуємо та захищаємо ваші персональні дані
        відповідно до Закону України «Про захист персональних даних» та Регламенту GDPR.
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">2. Інформація, яку ми збираємо</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Через наш веб-сайт ми можемо збирати такі дані:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Ім&apos;я, електронна адреса, номер телефону та зміст повідомлення, надіслані через контактну форму</li>
        <li>Інформація, надана при зверненні через WhatsApp або месенджери</li>
        <li>Дані про використання веб-сайту (файли cookie, IP-адреса, інформація про браузер)</li>
        <li>Дані, надані при записі на консультацію</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">3. Мета збору та обробки даних</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Зібрану інформацію ми використовуємо для:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Надання юридичних консультацій та відповіді на ваші запити</li>
        <li>Покращення якості наших послуг</li>
        <li>Удосконалення роботи веб-сайту</li>
        <li>Виконання законодавчих вимог</li>
        <li>Зв&apos;язку з вами щодо справ, які ми ведемо</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">4. Захист інформації</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Ми застосовуємо сучасні заходи безпеки для захисту ваших персональних даних.
        Дані передаються за допомогою SSL-шифрування та зберігаються в захищених середовищах
        з обмеженим доступом. Доступ до персональних даних мають лише уповноважені особи.
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">5. Передача даних третім особам</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Ми не передаємо ваші персональні дані третім особам, за винятком випадків,
        передбачених законодавством України. Адвокатська таємниця гарантує захист
        усієї інформації, отриманої в межах надання юридичних послуг (ст. 22 Закону
        України «Про адвокатуру та адвокатську діяльність»).
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">6. Файли cookie</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Наш веб-сайт використовує файли cookie для покращення користувацького досвіду.
        Ви можете вимкнути cookie у налаштуваннях браузера, проте деякі функції сайту
        можуть працювати некоректно.
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">7. Ваші права</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Відповідно до Закону України «Про захист персональних даних», ви маєте право:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Знати про місцезнаходження бази персональних даних та її володільця</li>
        <li>Отримати інформацію про умови надання доступу до персональних даних</li>
        <li>На доступ до своїх персональних даних</li>
        <li>Вимагати виправлення або видалення неточних чи неповних даних</li>
        <li>Вносити застереження щодо обмеження обробки своїх даних</li>
        <li>Відкликати згоду на обробку персональних даних</li>
        <li>Оскаржити дії чи бездіяльність у сфері захисту персональних даних</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">8. Контактна інформація</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Якщо у вас є питання щодо нашої Політики конфіденційності, зверніться до нас:
      </p>
      <p className="text-gray-600 leading-relaxed">
        Електронна пошта: info@lvivavukat.com<br />
        Адреса: просп. Свободи, Львів, Україна 79000
      </p>
    </>
  );
}
