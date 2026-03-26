import type { Metadata } from "next";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Lviv Avukat KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aydınlatma metni.",
  alternates: { canonical: "https://lvivavukat.com/kvkk" },
};

export default function KVKKPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Anasayfa", href: "/" },
              { label: "KVKK Aydınlatma Metni" },
            ]}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)] mt-4">
            KVKK Aydınlatma Metni
          </h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
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
        </div>
      </section>
    </>
  );
}
