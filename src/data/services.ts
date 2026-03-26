import {
  FileText,
  Home,
  Briefcase,
  GraduationCap,
  Clock,
  Heart,
  Scale,
  Users,
  Globe,
  Award,
  Building2,
  MapPin,
  Gavel,
  Handshake,
  ShieldAlert,
  Landmark,
  DollarSign,
  Languages,
  Stamp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ServiceCategory {
  title: string;
  services: ServiceItem[];
}

export interface ServiceItem {
  title: string;
  slug: string;
  shortDescription: string;
  icon: LucideIcon;
  category: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  content: string;
  requiredDocuments: string[];
  processSteps: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  duration?: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Oturum & Vize İşlemleri",
    services: [
      {
        title: "Geçici Oturum İzni",
        slug: "gecici-oturum-izni",
        shortDescription: "Ukrayna'da geçici ikamet izni başvurusu ve süreç yönetimi",
        icon: Home,
        category: "oturum-vize",
        metaTitle: "Ukrayna Geçici Oturum İzni | Türkler İçin Başvuru Rehberi",
        metaDescription: "Ukrayna'da geçici oturum izni nasıl alınır? Türk vatandaşları için başvuru şartları, gerekli belgeler ve süreç hakkında detaylı bilgi. Lviv'de profesyonel hukuki destek.",
        heroDescription: "Ukrayna'da yaşamak ve çalışmak isteyen Türk vatandaşları için geçici oturum izni başvuru sürecini A'dan Z'ye yönetiyoruz.",
        content: `Ukrayna'da geçici oturum izni (Посвідка на тимчасове проживання), yabancı uyruklu kişilerin belirli bir süre için ülkede yasal olarak kalabilmelerini sağlayan resmi bir belgedir.

## Geçici Oturum İzni Nedir?

Geçici oturum izni, Ukrayna'da 1 yıla kadar yasal olarak ikamet etmenizi sağlar. Bu izin; çalışma, eğitim, aile birleşimi veya yatırım gibi çeşitli gerekçelerle alınabilir.

## Kimler Başvurabilir?

- Ukrayna'da çalışmak isteyen Türk vatandaşları
- Eğitim amacıyla gelen öğrenciler
- Ukraynalı vatandaşlarla evli olanlar
- Yatırım yapan işadamları
- Gönüllü çalışma yapanlar

## Başvuru Süreci

Başvuru süreci ortalama 15-30 iş günü sürmektedir. Ofisimiz olarak tüm belgelerin hazırlanması, tercümesi ve başvuru sürecinin takibini eksiksiz şekilde gerçekleştiriyoruz.

## Neden Profesyonel Destek Almalısınız?

Ukrayna göç mevzuatı sürekli güncellenmektedir. Yanlış veya eksik başvurular reddedilebilir ve bu durum ek maliyetlere ve zaman kaybına neden olabilir. Deneyimli ekibimiz ile başvurunuzun ilk seferde onaylanmasını sağlıyoruz.`,
        requiredDocuments: [
          "Geçerli pasaport (en az 6 ay süreli)",
          "Pasaport fotokopisi ve noter onaylı tercümesi",
          "Başvuru formu (Форма 1)",
          "2 adet vesikalık fotoğraf (3.5x4.5 cm)",
          "Sağlık sigortası",
          "Konaklama belgesi (kira sözleşmesi veya davet mektubu)",
          "Mali yeterlilik belgesi (banka hesap özeti)",
          "Başvuru gerekçesine ait belgeler (iş sözleşmesi, kabul belgesi vb.)",
          "Devlet harcı makbuzu",
        ],
        processSteps: [
          { title: "Ücretsiz Danışma", description: "Durumunuzu değerlendiriyor ve en uygun başvuru stratejisini belirliyoruz" },
          { title: "Belge Hazırlığı", description: "Tüm gerekli belgelerin toplanması, tercümesi ve noter onayı" },
          { title: "Başvuru", description: "Göç idaresine başvurunuzun yapılması ve takibi" },
          { title: "Sonuç", description: "Oturum izni kartınızın teslim alınması" },
        ],
        faq: [
          { question: "Geçici oturum izni ne kadar sürede çıkar?", answer: "Normal başvurularda 15-30 iş günü içinde sonuçlanır. Acil durumlarda hızlandırılmış prosedür uygulanabilir." },
          { question: "Geçici oturum izni kaç yıl geçerlidir?", answer: "Geçici oturum izni genellikle 1 yıl geçerlidir ve yenilenebilir." },
          { question: "Başvurum reddedilirse ne olur?", answer: "Ret kararına itiraz hakkınız bulunmaktadır. Ofisimiz itiraz sürecini de yönetmektedir." },
          { question: "Başvuru sırasında Ukrayna'da bulunmam gerekiyor mu?", answer: "Evet, başvuru sırasında Ukrayna'da bulunmanız ve biyometrik verilerinizi vermeniz gerekmektedir." },
        ],
        duration: "15-30 iş günü",
      },
      {
        title: "Kalıcı Oturum İzni",
        slug: "kalici-oturum-izni",
        shortDescription: "Ukrayna'da süresiz ikamet hakkı için kalıcı oturum başvurusu",
        icon: Award,
        category: "oturum-vize",
        metaTitle: "Ukrayna Kalıcı Oturum İzni | Süresiz İkamet Başvurusu",
        metaDescription: "Ukrayna'da kalıcı oturum izni nasıl alınır? Başvuru şartları, gerekli belgeler ve süreç. Türk vatandaşları için profesyonel hukuki destek.",
        heroDescription: "Ukrayna'da kalıcı olarak yaşamak isteyenler için süresiz ikamet izni başvuru süreçlerini yönetiyoruz.",
        content: `Kalıcı oturum izni, Ukrayna'da süresiz olarak yaşama hakkı tanıyan en kapsamlı ikamet belgesidir.

## Kalıcı Oturum İzni Nedir?

Kalıcı oturum izni (Посвідка на постійне проживання), sahibine Ukrayna'da süresiz olarak yaşama ve çalışma hakkı tanır. Bu izin, vatandaşlık başvurusu için de ön koşuldur.

## Başvuru Koşulları

Kalıcı oturum izni alabilmek için belirli koşulları karşılamanız gerekmektedir:
- Ukraynalı vatandaşla evlilik (en az 2 yıl)
- Ukrayna'da en az 5 yıl kesintisiz yasal ikamet
- Ukrayna'ya önemli yatırım yapmış olmak
- Ukraynalı vatandaşın yakın akrabası olmak

## Avantajları

- Süresiz ikamet hakkı
- Serbest çalışma hakkı
- Sosyal haklardan yararlanma
- Vatandaşlık başvurusu yapabilme`,
        requiredDocuments: [
          "Geçerli pasaport ve noter onaylı tercümesi",
          "Mevcut geçici oturum izni",
          "Başvuru gerekçesini destekleyen belgeler",
          "Adli sicil kaydı (Türkiye + Ukrayna)",
          "Sağlık raporu",
          "Mali yeterlilik belgesi",
          "Konaklama belgesi",
          "4 adet vesikalık fotoğraf",
          "Devlet harcı makbuzu",
        ],
        processSteps: [
          { title: "Uygunluk Değerlendirmesi", description: "Kalıcı oturum için gerekli koşulları karşılayıp karşılamadığınızı belirliyoruz" },
          { title: "Belge Toplama", description: "Türkiye ve Ukrayna'dan gerekli tüm belgelerin temin edilmesi" },
          { title: "Başvuru Dosyası", description: "Eksiksiz başvuru dosyasının hazırlanması ve sunulması" },
          { title: "Takip & Sonuç", description: "Başvurunun takibi ve kalıcı oturum kartının teslimi" },
        ],
        faq: [
          { question: "Kalıcı oturum izni ne kadar sürede çıkar?", answer: "Başvuru süreci genellikle 1-3 ay arasında sürmektedir." },
          { question: "Kalıcı oturum izni ile vatandaşlık alabilir miyim?", answer: "Evet, kalıcı oturum izni vatandaşlık başvurusu için ön koşullardan biridir." },
          { question: "Kalıcı oturum izni iptal edilebilir mi?", answer: "Belirli koşullarda (uzun süreli yurt dışında kalma, suç işleme vb.) iptal edilebilir." },
        ],
        duration: "1-3 ay",
      },
      {
        title: "Çalışma İzni",
        slug: "calisma-izni",
        shortDescription: "Ukrayna'da yasal çalışma izni başvurusu ve işveren prosedürleri",
        icon: Briefcase,
        category: "oturum-vize",
        metaTitle: "Ukrayna Çalışma İzni | Türkler İçin İş İzni Başvurusu",
        metaDescription: "Ukrayna'da çalışma izni nasıl alınır? İşveren prosedürleri, gerekli belgeler ve başvuru süreci. Türk işçi ve yöneticiler için rehber.",
        heroDescription: "Ukrayna'da çalışmak isteyen Türk vatandaşları ve Türk personel istihdam etmek isteyen şirketler için çalışma izni süreçleri.",
        content: `Ukrayna'da yasal olarak çalışabilmek için çalışma izni (дозвіл на працевлаштування) almanız zorunludur.

## Çalışma İzni Türleri

Ukrayna'da farklı çalışma izni kategorileri bulunmaktadır:
- Standart çalışma izni
- Yüksek nitelikli uzman izni
- Şirket içi transfer izni
- Mevsimlik çalışma izni

## Süreç Nasıl İşler?

Çalışma izni başvurusu işveren tarafından yapılır. İşverenin önce Ukrayna iş piyasasında uygun aday bulamadığını kanıtlaması gerekir. Ofisimiz hem işveren hem de çalışan tarafındaki tüm süreçleri yönetmektedir.`,
        requiredDocuments: [
          "İşveren başvuru dilekçesi",
          "İş sözleşmesi taslağı",
          "Çalışanın pasaportu ve tercümesi",
          "Eğitim belgeleri (diploma) ve tercümesi",
          "Mesleki deneyim belgeleri",
          "Sağlık raporu",
          "İşveren şirket evrakları",
          "Devlet harcı makbuzu",
        ],
        processSteps: [
          { title: "İşveren Danışmanlığı", description: "İşveren prosedürlerinin belirlenmesi ve iş piyasası testi" },
          { title: "Belge Hazırlığı", description: "İşveren ve çalışan belgelerinin eksiksiz hazırlanması" },
          { title: "Başvuru", description: "Çalışma Bakanlığı'na başvuru ve takip" },
          { title: "İzin & Oturum", description: "Çalışma izni alındıktan sonra oturum izni başvurusu" },
        ],
        faq: [
          { question: "Çalışma izni ne kadar sürede çıkar?", answer: "Standart başvurularda 7-15 iş günü içinde sonuçlanır." },
          { question: "Çalışma izni kaç yıl geçerlidir?", answer: "Genellikle 1-3 yıl arası verilir, iş sözleşmesi süresine bağlıdır." },
          { question: "Kendi işimi kurarsam çalışma iznine ihtiyacım var mı?", answer: "Şirket kurduğunuzda direktör olarak çalışma izni almanız gerekebilir." },
        ],
        duration: "7-15 iş günü",
      },
      {
        title: "Öğrenci Vizesi",
        slug: "ogrenci-vizesi",
        shortDescription: "Ukrayna üniversitelerinde eğitim için öğrenci vizesi ve oturum izni",
        icon: GraduationCap,
        category: "oturum-vize",
        metaTitle: "Ukrayna Öğrenci Vizesi | Üniversite Kayıt ve Oturum İşlemleri",
        metaDescription: "Ukrayna'da üniversite eğitimi için öğrenci vizesi nasıl alınır? Kayıt, kabul, vize ve oturum izni süreçleri hakkında kapsamlı rehber.",
        heroDescription: "Ukrayna'da üniversite eğitimi almak isteyen Türk öğrenciler için vize, oturum izni ve kayıt süreçleri.",
        content: `Ukrayna, uygun eğitim maliyetleri ve kaliteli üniversiteleriyle Türk öğrenciler için cazip bir eğitim destinasyonudur.

## Öğrenci Vizesi Süreci

Ukrayna üniversitelerine kabul alan Türk öğrencilerin eğitim amaçlı geçici oturum izni alması gerekmektedir. Bu süreçte üniversite kayıt işlemleri ve oturum izni başvurusu paralel olarak yürütülür.`,
        requiredDocuments: [
          "Üniversite kabul mektubu (davet belgesi)",
          "Geçerli pasaport",
          "Lise diploması ve not transkripti",
          "Sağlık raporu ve HIV testi",
          "Sağlık sigortası",
          "Mali yeterlilik belgesi",
          "6 adet vesikalık fotoğraf",
          "Doğum belgesi (noter onaylı tercüme)",
        ],
        processSteps: [
          { title: "Üniversite Seçimi", description: "Hedeflerinize uygun üniversite ve bölüm belirleme" },
          { title: "Kabul İşlemleri", description: "Üniversite başvurusu ve kabul mektubu alınması" },
          { title: "Vize & Giriş", description: "Ukrayna'ya giriş ve geçici oturum izni başvurusu" },
          { title: "Kayıt", description: "Üniversitede kesin kayıt ve ikamet kaydı" },
        ],
        faq: [
          { question: "Ukrayna'da eğitim dili nedir?", answer: "Birçok üniversitede İngilizce, Ukraynaca veya Rusça eğitim seçenekleri mevcuttur." },
          { question: "Öğrenci olarak çalışabilir miyim?", answer: "Öğrenci oturum izni ile sınırlı saatlerde çalışma hakkınız bulunmaktadır." },
          { question: "Eğitim süresi boyunca oturum iznim geçerli mi?", answer: "Oturum izni her yıl yenilenmek kaydıyla eğitim süresince geçerlidir." },
        ],
        duration: "2-4 hafta",
      },
      {
        title: "Vize Uzatma",
        slug: "vize-uzatma",
        shortDescription: "Ukrayna vize süresinin uzatılması ve yasal kalış süresinin yönetimi",
        icon: Clock,
        category: "oturum-vize",
        metaTitle: "Ukrayna Vize Uzatma | Kalış Süresini Yasal Olarak Uzatın",
        metaDescription: "Ukrayna'da vize süresi nasıl uzatılır? Türk vatandaşları için vize uzatma prosedürleri, gerekli belgeler ve dikkat edilmesi gerekenler.",
        heroDescription: "Ukrayna'da kalış sürenizi yasal yollarla uzatmanız için gereken tüm prosedürleri yönetiyoruz.",
        content: `Türk vatandaşları Ukrayna'ya vizesiz olarak giriş yapabilmektedir ancak kalış süresi sınırlıdır. Sürenizi uzatmanız gerektiğinde profesyonel hukuki destek almanız önemlidir.

## Vize Uzatma Seçenekleri

- 90 günlük vizesiz süre uzatma
- Oturum iznine geçiş
- Çalışma izni üzerinden uzatma
- Eğitim amaçlı uzatma`,
        requiredDocuments: [
          "Geçerli pasaport",
          "Ukrayna'ya giriş damgası",
          "Uzatma gerekçesini destekleyen belgeler",
          "Sağlık sigortası",
          "Konaklama belgesi",
          "Mali yeterlilik belgesi",
          "Devlet harcı makbuzu",
        ],
        processSteps: [
          { title: "Durum Değerlendirmesi", description: "Mevcut vize durumunuzu ve seçeneklerinizi belirliyoruz" },
          { title: "Strateji Belirleme", description: "En uygun uzatma yönteminin seçilmesi" },
          { title: "Başvuru", description: "Gerekli başvuruların yapılması" },
          { title: "Sonuç", description: "Yasal kalış sürenizin uzatılması" },
        ],
        faq: [
          { question: "Vizesiz kalış sürem dolduktan sonra ne olur?", answer: "Süre aşımı durumunda para cezası ve sınır dışı edilme riski bulunmaktadır. Süreniz dolmadan başvuru yapmanız kritik öneme sahiptir." },
          { question: "Vizesiz süreyi kaç gün uzatabilirim?", answer: "Bu, uzatma gerekçenize bağlıdır. Oturum izni başvurusu yapılması en güvenli seçenektir." },
        ],
        duration: "Değişken",
      },
    ],
  },
  {
    title: "Aile & Kişisel Hukuk",
    services: [
      {
        title: "Evlilik İşlemleri",
        slug: "evlilik-islemleri",
        shortDescription: "Ukrayna'da Türk vatandaşlarının evlilik başvurusu ve nikah işlemleri",
        icon: Heart,
        category: "aile-kisisel",
        metaTitle: "Ukrayna'da Evlilik İşlemleri | Türk Vatandaşları İçin Nikah Rehberi",
        metaDescription: "Ukrayna'da evlilik nasıl yapılır? Türk vatandaşları için nikah başvurusu, gerekli belgeler, süreç ve dikkat edilmesi gerekenler.",
        heroDescription: "Ukrayna'da evlenmek isteyen Türk vatandaşları için nikah başvurusu, belge hazırlığı ve tüm yasal süreçleri yönetiyoruz.",
        content: `Ukrayna'da evlilik işlemleri Türkiye'ye göre farklı prosedürlere sahiptir. Doğru belge hazırlığı ve yasal sürecin eksiksiz takibi büyük önem taşır.

## Ukrayna'da Evlilik Süreci

Ukrayna'da evlilik, yerel DRACS (Nüfus Müdürlüğü) ofislerinde gerçekleştirilir. Başvurudan nikaha kadar olan süreç genellikle 1-30 gün arasında değişir.

## Önemli Noktalar

- Bekarlık belgesi Türkiye'den alınmalı ve apostil yapılmalıdır
- Tüm belgeler Ukraynaca'ya yeminli tercüme ettirilmelidir
- Evlilik Türk konsolosluğuna bildirilmelidir`,
        requiredDocuments: [
          "Geçerli pasaport ve noter onaylı tercümesi",
          "Bekarlık belgesi (apostilli)",
          "Doğum belgesi (apostilli)",
          "Nüfus kayıt örneği",
          "Fotoğraflar",
          "Varsa önceki evlilik/boşanma belgeleri",
          "Devlet harcı makbuzu",
        ],
        processSteps: [
          { title: "Belge Hazırlığı", description: "Türkiye'den gerekli belgelerin alınması ve apostil işlemleri" },
          { title: "Tercüme & Onay", description: "Belgelerin Ukraynaca'ya tercümesi ve noter tasdiki" },
          { title: "DRACS Başvurusu", description: "Nüfus müdürlüğüne evlilik başvurusu" },
          { title: "Nikah & Tescil", description: "Nikah töreni ve evliliğin Türk konsolosluğunda tescili" },
        ],
        faq: [
          { question: "Ukrayna'da evlilik Türkiye'de geçerli mi?", answer: "Evet, Ukrayna'da yapılan evlilik Türk konsolosluğuna tescil ettirildikten sonra Türkiye'de de geçerlidir." },
          { question: "Evlilik işlemleri ne kadar sürer?", answer: "Belgelerin hazır olmasından sonra 1-30 gün arasında nikah yapılabilir. Hızlandırılmış prosedür de mevcuttur." },
        ],
        duration: "1-30 gün",
      },
      {
        title: "Boşanma",
        slug: "bosanma",
        shortDescription: "Ukrayna'da boşanma davası, anlaşmalı ve çekişmeli boşanma süreçleri",
        icon: Scale,
        category: "aile-kisisel",
        metaTitle: "Ukrayna'da Boşanma | Türk Vatandaşları İçin Boşanma Süreci",
        metaDescription: "Ukrayna'da boşanma nasıl yapılır? Anlaşmalı ve çekişmeli boşanma, nafaka, mal paylaşımı süreçleri. Profesyonel hukuki temsil.",
        heroDescription: "Ukrayna'da boşanma süreçlerinde haklarınızın korunması için profesyonel hukuki destek sunuyoruz.",
        content: `Ukrayna'da boşanma süreci, anlaşmalı veya çekişmeli olmasına göre farklılık gösterir. Her iki durumda da haklarınızın korunması için profesyonel hukuki destek almanız önemlidir.`,
        requiredDocuments: ["Evlilik cüzdanı", "Pasaport", "Varsa çocuk doğum belgeleri", "Mal varlığı belgeleri", "Başvuru dilekçesi"],
        processSteps: [
          { title: "Danışma", description: "Durumunuzun değerlendirilmesi ve strateji belirlenmesi" },
          { title: "Dava/Başvuru", description: "Anlaşmalı boşanma başvurusu veya dava açılması" },
          { title: "Süreç Yönetimi", description: "Mahkeme sürecinin ve müzakerelerin yönetilmesi" },
          { title: "Kesinleşme", description: "Boşanma kararının kesinleşmesi ve tescili" },
        ],
        faq: [
          { question: "Ukrayna'da boşanma Türkiye'de geçerli mi?", answer: "Evet, tanıma ve tenfiz davası ile Türkiye'de de geçerli hale getirilebilir." },
          { question: "Anlaşmalı boşanma ne kadar sürer?", answer: "Anlaşmalı boşanma genellikle 1-2 ay içinde sonuçlanır." },
        ],
        duration: "1-6 ay",
      },
      {
        title: "Velayet",
        slug: "velayet",
        shortDescription: "Çocuk velayeti, nafaka ve aile hukuku davaları",
        icon: Users,
        category: "aile-kisisel",
        metaTitle: "Ukrayna'da Velayet Davası | Çocuk Hakları ve Nafaka",
        metaDescription: "Ukrayna'da çocuk velayeti nasıl belirlenir? Velayet hakları, nafaka ve çocuğun üstün yararı prensibi hakkında bilgi.",
        heroDescription: "Çocuğunuzun hakları ve geleceği için velayet süreçlerinde profesyonel hukuki temsil sağlıyoruz.",
        content: `Çocuk velayeti davaları, aile hukukunun en hassas konularından biridir. Ukrayna hukuku, tüm kararlarda çocuğun üstün yararını esas almaktadır.`,
        requiredDocuments: ["Doğum belgesi", "Evlilik/boşanma belgesi", "Gelir belgeleri", "Konaklama belgesi", "Tanık beyanları"],
        processSteps: [
          { title: "Değerlendirme", description: "Aile durumunuzun ve haklarınızın değerlendirilmesi" },
          { title: "Dava Hazırlığı", description: "Velayet davası dosyasının hazırlanması" },
          { title: "Mahkeme Süreci", description: "Duruşmalara katılım ve hukuki temsil" },
          { title: "Karar & İcra", description: "Mahkeme kararının uygulanması" },
        ],
        faq: [
          { question: "Velayet kararı hangi ülkede geçerlidir?", answer: "Ukrayna mahkeme kararları tanıma/tenfiz ile Türkiye'de de geçerli kılınabilir." },
        ],
        duration: "2-6 ay",
      },
      {
        title: "Aile Birleşimi",
        slug: "aile-birlesimi",
        shortDescription: "Ukrayna'da aile birleşimi yoluyla oturum izni başvurusu",
        icon: Users,
        category: "aile-kisisel",
        metaTitle: "Ukrayna Aile Birleşimi | Oturum İzni Başvurusu",
        metaDescription: "Ukrayna'da aile birleşimi yoluyla oturum izni nasıl alınır? Eş, çocuk ve ebeveyn birleşimi süreçleri hakkında detaylı bilgi.",
        heroDescription: "Ailenizle Ukrayna'da birlikte yaşamak için aile birleşimi oturum izni süreçlerini yönetiyoruz.",
        content: `Aile birleşimi, Ukrayna'da yasal olarak ikamet eden veya vatandaşlığa sahip kişilerin yakın aile üyelerini yanlarına getirmelerine olanak tanıyan yasal bir süreçtir.`,
        requiredDocuments: ["Aile bağını kanıtlayan belgeler", "Davet eden kişinin oturum belgesi", "Pasaportlar", "Mali yeterlilik belgesi", "Konaklama belgesi", "Sağlık sigortası"],
        processSteps: [
          { title: "Uygunluk Kontrolü", description: "Aile birleşimi koşullarının değerlendirilmesi" },
          { title: "Belge Hazırlığı", description: "Aile bağını kanıtlayan belgelerin hazırlanması" },
          { title: "Başvuru", description: "Göç idaresine başvuru" },
          { title: "Oturum İzni", description: "Aile birleşimi oturum izninin alınması" },
        ],
        faq: [
          { question: "Kimler aile birleşimi başvurusu yapabilir?", answer: "Eş, 18 yaş altı çocuklar ve bakıma muhtaç ebeveynler başvurabilir." },
        ],
        duration: "1-3 ay",
      },
      {
        title: "Vatandaşlık",
        slug: "vatandaslik",
        shortDescription: "Ukrayna vatandaşlığı başvurusu ve doğal yoldan vatandaşlık edinme",
        icon: Globe,
        category: "aile-kisisel",
        metaTitle: "Ukrayna Vatandaşlığı | Başvuru Şartları ve Süreç",
        metaDescription: "Ukrayna vatandaşlığı nasıl alınır? Vatandaşlık başvuru şartları, gerekli belgeler ve süreç hakkında kapsamlı rehber.",
        heroDescription: "Ukrayna vatandaşlığı edinme sürecinde başvuru şartlarından vatandaşlık yeminine kadar tüm adımlarda yanınızdayız.",
        content: `Ukrayna vatandaşlığı, belirli koşulları karşılayan yabancı uyruklulara açıktır. Vatandaşlık başvurusu kapsamlı bir süreç olup, profesyonel rehberlik büyük önem taşır.`,
        requiredDocuments: ["Kalıcı oturum izni", "Ukraynaca dil yeterlilik belgesi", "Gelir belgesi", "Adli sicil kaydı", "Mevcut vatandaşlıktan çıkış başvurusu"],
        processSteps: [
          { title: "Uygunluk Tespiti", description: "Vatandaşlık koşullarını karşılayıp karşılamadığınızın tespiti" },
          { title: "Dil Sınavı", description: "Ukraynaca dil yeterlilik sınavına hazırlık ve başvuru" },
          { title: "Başvuru Dosyası", description: "Kapsamlı vatandaşlık başvuru dosyasının hazırlanması" },
          { title: "Vatandaşlık Yemini", description: "Başvurunun onaylanması ve vatandaşlık yemini" },
        ],
        faq: [
          { question: "Çifte vatandaşlık mümkün mü?", answer: "Ukrayna hukuku çifte vatandaşlığı resmi olarak tanımamaktadır. Türk vatandaşlığından çıkış prosedürü gerekebilir." },
          { question: "Kaç yıl sonra vatandaşlık başvurusu yapabilirim?", answer: "Genellikle 5 yıl kesintisiz yasal ikamet sonrası başvuru yapılabilir." },
        ],
        duration: "6-12 ay",
      },
    ],
  },
  {
    title: "Ticari & Genel Hukuk",
    services: [
      {
        title: "Şirket Kurma",
        slug: "sirket-kurma",
        shortDescription: "Ukrayna'da şirket kurma, tescil ve ticaret hukuku danışmanlığı",
        icon: Building2,
        category: "ticari-genel",
        metaTitle: "Ukrayna'da Şirket Kurma | Türk Yatırımcılar İçin Rehber",
        metaDescription: "Ukrayna'da şirket nasıl kurulur? LLC, şube açma, vergi kaydı ve tüm ticaret sicil işlemleri. Türk yatırımcılar için kapsamlı hukuki destek.",
        heroDescription: "Ukrayna'da iş kurmak isteyen Türk girişimciler ve yatırımcılar için şirket tescilinden vergi kaydına kadar tüm süreçleri yönetiyoruz.",
        content: `Ukrayna, canlı ekonomisi ve stratejik konumuyla Türk yatırımcılar için cazip bir pazar sunmaktadır. Şirket kurma süreci basit olmakla birlikte, yasal prosedürlerin doğru takibi önemlidir.`,
        requiredDocuments: ["Kurucu(ların) pasaportu", "Şirket ana sözleşmesi", "Tescil başvuru formu", "Kayıtlı ofis adresi belgesi", "Kurucu kararı", "Devlet harcı makbuzu"],
        processSteps: [
          { title: "Şirket Yapısı", description: "Uygun şirket türünün belirlenmesi (LLC, JSC, şube vb.)" },
          { title: "Kuruluş Belgeleri", description: "Ana sözleşme ve kuruluş belgelerinin hazırlanması" },
          { title: "Tescil", description: "Ticaret siciline tescil ve vergi kaydı" },
          { title: "Operasyonel Hazırlık", description: "Banka hesabı açma, mühür ve ilk vergi beyannameleri" },
        ],
        faq: [
          { question: "Ukrayna'da en yaygın şirket türü nedir?", answer: "Limited Liability Company (TOV/ТОВ) en yaygın ve tercih edilen şirket türüdür." },
          { question: "Şirket kurmak ne kadar sürer?", answer: "Belgelerin hazır olması durumunda 3-7 iş günü içinde tescil tamamlanabilir." },
          { question: "Minimum sermaye gerekli mi?", answer: "LLC için minimum sermaye zorunluluğu bulunmamaktadır." },
        ],
        duration: "3-7 iş günü",
      },
      {
        title: "Gayrimenkul Hukuku",
        slug: "gayrimenkul-hukuku",
        shortDescription: "Ukrayna'da gayrimenkul alım-satım, kiralama ve mülkiyet hukuku",
        icon: MapPin,
        category: "ticari-genel",
        metaTitle: "Ukrayna Gayrimenkul Hukuku | Mülk Alım-Satım Danışmanlığı",
        metaDescription: "Ukrayna'da gayrimenkul nasıl alınır? Yabancıların mülk edinme hakları, alım-satım süreçleri ve hukuki dikkat edilmesi gerekenler.",
        heroDescription: "Ukrayna'da gayrimenkul yatırımı yapmak isteyen Türk vatandaşları için mülkiyet hukuku danışmanlığı ve alım-satım süreç yönetimi.",
        content: `Ukrayna'da yabancılar belirli koşullar altında gayrimenkul edinebilirler. Mülk alım-satım süreçlerinde hukuki güvence sağlamak için profesyonel destek almanız önemlidir.`,
        requiredDocuments: ["Pasaport", "Vergi numarası (INN)", "Alım-satım sözleşmesi", "Mülk tapu belgesi", "Teknik pasaport", "Değerleme raporu"],
        processSteps: [
          { title: "Mülk İnceleme", description: "Gayrimenkulün hukuki durumunun araştırılması (tapu, ipotek, haciz)" },
          { title: "Sözleşme Hazırlığı", description: "Alım-satım sözleşmesinin müzakeresi ve hazırlanması" },
          { title: "Noter İşlemleri", description: "Sözleşmenin noter huzurunda imzalanması" },
          { title: "Tescil", description: "Tapu devir işlemlerinin tamamlanması" },
        ],
        faq: [
          { question: "Yabancılar Ukrayna'da arazi satın alabilir mi?", answer: "Tarım arazisi dışında, yabancılar konut ve ticari gayrimenkul alabilir." },
          { question: "Gayrimenkul alımında vergi var mı?", answer: "Evet, alım-satım vergisi ve noter masrafları bulunmaktadır." },
        ],
        duration: "2-4 hafta",
      },
      {
        title: "İş Hukuku",
        slug: "is-hukuku",
        shortDescription: "İşçi-işveren ilişkileri, iş sözleşmeleri ve çalışma hakları",
        icon: Briefcase,
        category: "ticari-genel",
        metaTitle: "Ukrayna İş Hukuku | İşçi-İşveren İlişkileri Danışmanlığı",
        metaDescription: "Ukrayna'da iş hukuku: iş sözleşmeleri, çalışma hakları, işten çıkarma ve işçi-işveren uyuşmazlıkları konusunda hukuki danışmanlık.",
        heroDescription: "Ukrayna'da çalışan Türk vatandaşları ve Türk işverenler için iş hukuku danışmanlığı ve uyuşmazlık çözümü.",
        content: `Ukrayna iş hukuku, işçi ve işveren haklarını düzenleyen kapsamlı bir mevzuata sahiptir. Yabancı çalışanlar için özel düzenlemeler de mevcuttur.`,
        requiredDocuments: ["İş sözleşmesi", "Çalışma izni", "Kimlik belgeleri", "İlgili yazışmalar"],
        processSteps: [
          { title: "Hukuki Analiz", description: "Durumunuzun iş hukuku çerçevesinde değerlendirilmesi" },
          { title: "Strateji", description: "Çözüm stratejisinin belirlenmesi" },
          { title: "Müzakere/Dava", description: "Arabuluculuk veya dava sürecinin yönetilmesi" },
          { title: "Sonuç", description: "Uyuşmazlığın çözüme kavuşturulması" },
        ],
        faq: [
          { question: "Haksız yere işten çıkarıldım ne yapabilirim?", answer: "Ukrayna iş hukukuna göre haksız fesih durumunda tazminat ve işe iade talep edebilirsiniz." },
        ],
        duration: "Değişken",
      },
      {
        title: "Sözleşme Hukuku",
        slug: "sozlesme-hukuku",
        shortDescription: "Sözleşme hazırlama, inceleme ve uyuşmazlık çözümü",
        icon: Handshake,
        category: "ticari-genel",
        metaTitle: "Ukrayna Sözleşme Hukuku | Sözleşme Hazırlama ve İnceleme",
        metaDescription: "Ukrayna'da sözleşme hazırlama, inceleme ve uyuşmazlık çözümü hizmetleri. Ticari ve bireysel sözleşmeler için profesyonel hukuki destek.",
        heroDescription: "Her türlü sözleşmenin hazırlanması, incelenmesi ve uyuşmazlıkların çözümünde profesyonel hukuki destek sunuyoruz.",
        content: `Sözleşmeler, ticari ve bireysel ilişkilerin temelini oluşturur. Ukrayna hukukuna uygun, haklarınızı koruyan sözleşmelerin hazırlanması büyük önem taşır.`,
        requiredDocuments: ["Mevcut sözleşme (varsa)", "Tarafların kimlik bilgileri", "İlgili ticari belgeler"],
        processSteps: [
          { title: "İhtiyaç Analizi", description: "Sözleşme ihtiyaçlarınızın belirlenmesi" },
          { title: "Hazırlık/İnceleme", description: "Sözleşmenin hazırlanması veya mevcut sözleşmenin incelenmesi" },
          { title: "Müzakere", description: "Karşı tarafla sözleşme müzakereleri" },
          { title: "İmza", description: "Sözleşmenin nihai hale getirilmesi ve imzalanması" },
        ],
        faq: [],
        duration: "1-2 hafta",
      },
      {
        title: "Ceza Hukuku",
        slug: "ceza-hukuku",
        shortDescription: "Ceza davalarında savunma, hukuki temsil ve haklar",
        icon: ShieldAlert,
        category: "ticari-genel",
        metaTitle: "Ukrayna Ceza Hukuku | Ceza Davalarında Savunma",
        metaDescription: "Ukrayna'da ceza davası süreçleri: soruşturma, kovuşturma, savunma hakları. Türk vatandaşları için acil hukuki destek.",
        heroDescription: "Ukrayna'da ceza davalarında haklarınızın korunması için deneyimli savunma avukatlığı hizmeti sunuyoruz.",
        content: `Ceza hukuku süreçleri her zaman acil ve ciddidir. Ukrayna'da ceza soruşturması veya kovuşturması ile karşılaşan Türk vatandaşlarına profesyonel savunma hizmeti sağlıyoruz.`,
        requiredDocuments: ["Pasaport", "Gözaltı/tutuklama belgeleri", "İlgili deliller", "Tanık bilgileri"],
        processSteps: [
          { title: "Acil Müdahale", description: "Anında hukuki destek ve haklarınızın bilgilendirilmesi" },
          { title: "Soruşturma", description: "Soruşturma sürecinde savunma stratejisinin belirlenmesi" },
          { title: "Kovuşturma", description: "Mahkeme sürecinde etkin savunma" },
          { title: "Sonuç", description: "Beraat, ceza indirimi veya uzlaşma" },
        ],
        faq: [
          { question: "Gözaltına alındığımda haklarım nelerdir?", answer: "Avukat talep etme, konsolosluğa bilgi verme ve susma hakkınız bulunmaktadır." },
        ],
        duration: "Değişken",
      },
      {
        title: "Miras Hukuku",
        slug: "miras-hukuku",
        shortDescription: "Miras davaları, veraset ilamı ve uluslararası miras süreçleri",
        icon: Landmark,
        category: "ticari-genel",
        metaTitle: "Ukrayna Miras Hukuku | Veraset ve İntikal İşlemleri",
        metaDescription: "Ukrayna'da miras hukuku: veraset ilamı, miras paylaşımı ve uluslararası miras süreçleri. Türk vatandaşları için hukuki danışmanlık.",
        heroDescription: "Ukrayna'da miras haklarınızın korunması ve veraset işlemlerinin yönetilmesi için profesyonel hukuki destek.",
        content: `Uluslararası miras süreçleri karmaşık olabilir. Ukrayna'da miras hakkı bulunan Türk vatandaşları için tüm yasal süreçleri yönetiyoruz.`,
        requiredDocuments: ["Veraset ilamı", "Ölüm belgesi", "Akrabalık belgeleri", "Miras bırakanın mal varlığı belgeleri", "Vasiyetname (varsa)"],
        processSteps: [
          { title: "Miras Tespiti", description: "Miras bırakanın mal varlığının tespiti" },
          { title: "Veraset", description: "Veraset ilamı ve mirasçılık belgesi alınması" },
          { title: "Paylaşım", description: "Miras paylaşımının yapılması" },
          { title: "Tescil", description: "Devir ve tescil işlemlerinin tamamlanması" },
        ],
        faq: [],
        duration: "2-6 ay",
      },
      {
        title: "Vergi Danışmanlığı",
        slug: "vergi-danismanligi",
        shortDescription: "Ukrayna vergi sistemi, beyanname ve vergi planlaması danışmanlığı",
        icon: DollarSign,
        category: "ticari-genel",
        metaTitle: "Ukrayna Vergi Danışmanlığı | Vergi Planlaması ve Beyanname",
        metaDescription: "Ukrayna'da vergi sistemi, vergi beyannamesi, çifte vergilendirme anlaşması ve vergi planlaması hakkında profesyonel danışmanlık.",
        heroDescription: "Ukrayna vergi mevzuatı ve Türkiye-Ukrayna çifte vergilendirme anlaşması çerçevesinde vergi danışmanlığı hizmeti sunuyoruz.",
        content: `Ukrayna vergi sistemi, yerel ve uluslararası düzenlemeleriyle karmaşık bir yapıya sahiptir. Özellikle yabancı vatandaşlar ve şirketler için doğru vergi planlaması büyük önem taşır.`,
        requiredDocuments: ["Vergi numarası (INN)", "Gelir belgeleri", "Mevcut vergi beyannameleri", "Şirket mali tabloları"],
        processSteps: [
          { title: "Vergi Analizi", description: "Mevcut vergi durumunuzun analizi" },
          { title: "Planlama", description: "Vergi optimizasyon stratejisinin belirlenmesi" },
          { title: "Beyanname", description: "Vergi beyannamelerinin hazırlanması ve sunulması" },
          { title: "Takip", description: "Vergi dairesi ile ilişkilerin yönetilmesi" },
        ],
        faq: [
          { question: "Türkiye-Ukrayna çifte vergilendirme anlaşması var mı?", answer: "Evet, iki ülke arasında çifte vergilendirmeyi önleme anlaşması mevcut olup, bu anlaşma çerçevesinde vergi avantajlarından yararlanılabilir." },
        ],
        duration: "Sürekli",
      },
      {
        title: "Tercüme & Apostil",
        slug: "tercume-apostil",
        shortDescription: "Yeminli tercüme, noter tasdiki ve apostil işlemleri",
        icon: Languages,
        category: "ticari-genel",
        metaTitle: "Ukrayna Tercüme & Apostil Hizmetleri | Belge Tasdik İşlemleri",
        metaDescription: "Ukrayna'da yeminli tercüme, noter tasdiki ve apostil işlemleri. Türkçe-Ukraynaca belge çeviri ve onay hizmetleri.",
        heroDescription: "Resmi belgelerin Türkçe-Ukraynaca yeminli tercümesi, noter tasdiki ve apostil işlemlerini eksiksiz gerçekleştiriyoruz.",
        content: `Ukrayna'daki tüm resmi işlemlerde belgelerinizin Ukraynaca tercümesi ve noter onayı gereklidir. Apostil işlemleri ise uluslararası belge geçerliliği için zorunludur.`,
        requiredDocuments: ["Tercüme edilecek orijinal belgeler", "Pasaport fotokopisi"],
        processSteps: [
          { title: "Belge Teslim", description: "Tercüme edilecek belgelerin teslim alınması" },
          { title: "Tercüme", description: "Yeminli tercüman tarafından resmi tercüme" },
          { title: "Noter Onayı", description: "Tercümenin noter tarafından tasdiki" },
          { title: "Apostil", description: "Gerekli durumlarda apostil işleminin yapılması" },
        ],
        faq: [
          { question: "Tercüme ne kadar sürede hazır olur?", answer: "Standart belgeler 1-3 iş günü, kapsamlı belgeler 3-7 iş günü içinde hazır olur." },
        ],
        duration: "1-7 iş günü",
      },
      {
        title: "Noter İşlemleri",
        slug: "noter-islemleri",
        shortDescription: "Ukrayna'da noter hizmetleri, vekâletname ve resmi belge onayları",
        icon: Stamp,
        category: "ticari-genel",
        metaTitle: "Ukrayna Noter İşlemleri | Vekâletname ve Belge Onayı",
        metaDescription: "Ukrayna'da noter işlemleri: vekâletname, sözleşme onayı, belge tasdiki. Türk vatandaşları için noter hizmetleri rehberi.",
        heroDescription: "Ukrayna'da her türlü noter işlemi, vekâletname düzenleme ve resmi belge onay süreçlerinde profesyonel destek.",
        content: `Ukrayna'da birçok hukuki işlem noter onayı gerektirmektedir. Gayrimenkul alım-satımı, vekâletname düzenleme, miras işlemleri ve şirket kuruluşu gibi konularda noter hizmetleri sunuyoruz.`,
        requiredDocuments: ["Pasaport", "İşleme göre değişen belgeler", "Tercüme belgeleri"],
        processSteps: [
          { title: "İhtiyaç Belirleme", description: "Hangi noter işleminin gerektiğinin belirlenmesi" },
          { title: "Belge Hazırlığı", description: "Noter için gerekli belgelerin hazırlanması" },
          { title: "Noter Randevusu", description: "Noter randevusu ve işlemlerin gerçekleştirilmesi" },
          { title: "Teslim", description: "Onaylı belgelerin teslimi" },
        ],
        faq: [],
        duration: "1-3 iş günü",
      },
    ],
  },
];

// Flat list of all services
export const allServices: ServiceItem[] = serviceCategories.flatMap((cat) => cat.services);

// Helper to find a service by slug
export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return allServices.find((s) => s.slug === slug);
}

// Helper to get all slugs (for static generation)
export function getAllServiceSlugs(): string[] {
  return allServices.map((s) => s.slug);
}
