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
    title: dict.kvkk.title,
    description: dict.kvkk.description,
    alternates: { canonical: `${siteUrl}${localizedHref("/kvkk", locale as Locale)}` },
  };
}

export default async function KVKKPage({
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
              { label: dict.kvkk.title },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)] mt-4">
            {dict.kvkk.title}
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          {isUk ? <DataProtectionContentUk /> : <DataProtectionContentTr />}
        </div>
      </section>
    </>
  );
}

function DataProtectionContentTr() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-8">
        6698 Sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) kapsamında
        aydınlatma yükümlülüğümüzü yerine getirmek amacıyla hazırlanmıştır.
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">1. Veri Sorumlusu</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Kişisel verileriniz, veri sorumlusu sıfatıyla Av. Lyudmyla Chubai (Lviv Avukat)
        tarafından aşağıda açıklanan kapsamda işlenecektir.
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">2. Kişisel Verilerin İşlenme Amacı</h2>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Hukuki danışmanlık hizmetlerinin sunulması</li>
        <li>İletişim taleplerinin değerlendirilmesi ve yanıtlanması</li>
        <li>Avukat-müvekkil ilişkisinin yürütülmesi</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        <li>Hizmet kalitesinin artırılması</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">3. İşlenen Kişisel Veri Kategorileri</h2>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Kimlik bilgileri (ad, soyad)</li>
        <li>İletişim bilgileri (e-posta, telefon numarası)</li>
        <li>Hukuki süreç bilgileri</li>
        <li>İnternet sitesi kullanım verileri</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">4. Kişisel Verilerin Aktarılması</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Kişisel verileriniz; yasal zorunluluklar kapsamında yetkili kamu kurum ve
        kuruluşlarına ve hukuki süreçlerin yürütülmesi amacıyla ilgili mahkemelere aktarılabilir.
        Bunun dışında verileriniz üçüncü kişilerle paylaşılmamaktadır.
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Kişisel verileriniz; web sitemizdeki iletişim formu, e-posta, telefon ve WhatsApp
        kanalları aracılığıyla, açık rızanıza veya kanunlarda öngörülen hukuki sebeplere
        dayalı olarak toplanmaktadır.
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">6. KVKK Kapsamındaki Haklarınız</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        KVKK&apos;nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
        <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
        <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
        <li>Eksik veya yanlış işlenmiş olması durumunda düzeltilmesini isteme</li>
        <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
        <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">7. İletişim</h2>
      <p className="text-gray-600 leading-relaxed">
        KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki kanallardan bize ulaşabilirsiniz:<br /><br />
        E-posta: info@lvivavukat.com<br />
        Adres: Svobody Ave, Lviv, Ukrayna 79000
      </p>
    </>
  );
}

function DataProtectionContentUk() {
  return (
    <>
      <p className="text-gray-600 leading-relaxed mb-8">
        Цей документ підготовлений відповідно до Закону України «Про захист персональних даних»
        від 01.06.2010 № 2297-VI та Регламенту (ЄС) 2016/679 (GDPR) з метою інформування
        суб&apos;єктів персональних даних про порядок обробки їхніх даних.
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">1. Володілець персональних даних</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Володільцем персональних даних є Адвокат Людмила Чубай (Lviv Avukat),
        яка здійснює обробку ваших персональних даних у порядку, описаному нижче.
      </p>
      <p className="text-gray-600 leading-relaxed mb-4">
        Адреса: просп. Свободи, Львів, Україна 79000<br />
        Електронна пошта: info@lvivavukat.com
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">2. Мета обробки персональних даних</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Ваші персональні дані обробляються з такою метою:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Надання юридичних послуг та правової допомоги</li>
        <li>Розгляд та відповідь на звернення через контактну форму, email, телефон чи месенджери</li>
        <li>Ведення адвокатської справи та виконання договору про надання правової допомоги</li>
        <li>Виконання вимог законодавства України</li>
        <li>Покращення якості юридичних послуг та роботи веб-сайту</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">3. Категорії персональних даних, що обробляються</h2>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Ідентифікаційні дані (прізвище, ім&apos;я, по батькові)</li>
        <li>Контактні дані (електронна адреса, номер телефону, адреса проживання)</li>
        <li>Дані, пов&apos;язані з юридичною справою (опис ситуації, документи, судові рішення)</li>
        <li>Технічні дані (IP-адреса, тип браузера, дані cookie при відвідуванні сайту)</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">4. Підстави обробки персональних даних</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Обробка персональних даних здійснюється на підставі:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Вашої згоди (ст. 6 Закону «Про захист персональних даних»)</li>
        <li>Виконання договору про надання правової допомоги</li>
        <li>Виконання законодавчих обов&apos;язків</li>
        <li>Захисту законних інтересів володільця даних</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">5. Передача персональних даних</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Ваші персональні дані можуть бути передані:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Судам та правоохоронним органам — у випадках, передбачених законодавством</li>
        <li>Державним органам — на виконання законних вимог (ДМС, нотаріус, РАЦС тощо)</li>
        <li>Іншим адвокатам або експертам — за вашою згодою для забезпечення належного захисту</li>
      </ul>
      <p className="text-gray-600 leading-relaxed mb-4">
        В інших випадках ваші дані не передаються третім особам. Адвокатська таємниця
        гарантується ст. 22 Закону України «Про адвокатуру та адвокатську діяльність».
      </p>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">6. Строки зберігання даних</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Персональні дані зберігаються протягом строку, необхідного для досягнення мети обробки,
        але не менше строків, визначених законодавством:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Дані адвокатського досьє — 5 років після завершення справи</li>
        <li>Бухгалтерські документи — відповідно до вимог податкового законодавства</li>
        <li>Дані контактної форми — до 1 року після останнього звернення</li>
        <li>Cookie та технічні дані — до 12 місяців</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">7. Ваші права як суб&apos;єкта персональних даних</h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Відповідно до ст. 8 Закону України «Про захист персональних даних», ви маєте право:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
        <li>Знати про джерела збирання, місцезнаходження своїх персональних даних</li>
        <li>Отримувати інформацію про умови надання доступу до персональних даних</li>
        <li>На доступ до своїх персональних даних</li>
        <li>Отримати відповідь про те, чи обробляються ваші персональні дані, та отримати зміст таких даних</li>
        <li>Пред&apos;являти вмотивовану вимогу щодо зміни або знищення своїх персональних даних</li>
        <li>Відкликати згоду на обробку персональних даних</li>
        <li>Звертатися зі скаргою до Уповноваженого Верховної Ради України з прав людини</li>
        <li>Застосовувати засоби правового захисту в разі порушення законодавства про захист персональних даних</li>
      </ul>

      <h2 className="text-xl font-bold text-[#0A1628] mt-8 mb-4">8. Контактна інформація</h2>
      <p className="text-gray-600 leading-relaxed">
        Для реалізації ваших прав або з будь-яких питань щодо обробки персональних даних
        зверніться до нас:<br /><br />
        Електронна пошта: info@lvivavukat.com<br />
        Адреса: просп. Свободи, Львів, Україна 79000
      </p>
    </>
  );
}
