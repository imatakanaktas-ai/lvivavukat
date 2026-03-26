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
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ContentBlock =
  | { type: "markdown"; content: string }
  | { type: "highlight"; title: string; content: string }
  | { type: "stats"; items: { label: string; value: string }[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "features"; title: string; items: { title: string; description: string }[] }
  | { type: "alert"; title: string; content: string; level: "info" | "warning" | "danger" }
  | { type: "why_us"; title: string; items: string[] };

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
  content: string; // Legacy fallback
  contentBlocks?: ContentBlock[]; // New rich blocks
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
        metaTitle: "Ukrayna Geçici Oturum İzni (İkamet İzni) Nasıl Alınır? | Lviv Avukat",
        metaDescription: "Ukrayna'da geçici oturum izni (ikamet) alma şartları nelerdir? Türk vatandaşları için profesyonel başvuru süreci, Lviv oturum izni evrakları ve yasal destek.",
        heroDescription: "Ukrayna'da huzurla yaşamak, çalışmak, eğitim görmek veya iş kurmak isteyen Türk vatandaşlarına, bürokratik engellere takılmadan hızlı ve garantili 'Geçici Oturum İzni' başvuru hizmeti sunuyoruz.",
        content: `Ukrayna'da geçici oturum izni başvuruları`,
        contentBlocks: [
          {
            type: "highlight",
            title: "Ukrayna'da Neden Güvenilir Bir Hukuki Desteğe İhtiyacınız Var?",
            content: "**Ukrayna geçici oturum izni** (Посвідка на тимчасове проживання), yabancı uyruklu kişilerin belirli bir süre için ülkede yasal ve sorunsuz bir şekilde kalabilmelerini sağlayan resmi bir kimlik belgesidir. Ancak Ukrayna Göç Dairesi'nin (DMS) kuralları ve belge talepleri sürekli olarak güncellenmektedir. Yanlış form doldurmak, tercüme hataları yapmak veya eksik bir evrakla başvurmak, aylar sürecek ret kararlarına hatta sınır dışı edilme riskine (deportasyon) yol açabilir. Bizimle çalıştığınızda, bu riskleri sıfıra indiriyor, süreci tamamen profesyonel avukatlar eşliğinde, stresten uzak bir şekilde tamamlıyorsunuz."
          },
          {
            type: "features",
            title: "Geçici Oturum İzni Hangi Durumlarda Alınabilir?",
            items: [
              {
                title: "Çalışma Amacıyla İkamet",
                description: "Ukrayna'daki bir şirkette resmi bir iş sözleşmesiyle çalışacak olanlar için öncelikle çalışma izni, ardından oturum izni sürecini yönetiyoruz."
              },
              {
                title: "Evlilik ve Aile Birleşimi",
                description: "Ukrayna vatandaşı ile evlenen Türk vatandaşlarının yasal ikamet izni alması sürecidir. Sahte evlilik denetimlerinden sorunsuz geçmeniz için dosyalarınızı kusursuz hazırlarız."
              },
              {
                title: "Şirket Kurulumu ve İşletme",
                description: "Lviv veya Ukrayna'nın diğer şehirlerinde kendi işini kurmak isteyen yatırımcılar ve temsilciler için özel stratejiler uyguluyoruz."
              },
              {
                title: "Eğitim ve Gönüllülük",
                description: "Üniversite öğrencileri, kültürel program katılımcıları veya yabancı medya temsilcileri için sağlanan yasal ikamet hakkıdır."
              }
            ]
          },
          {
            type: "markdown",
            content: "### Bireysel Başvuruların Gizli Tehlikeleri\n\nUkrayna'da bireysel olarak oturum izni almak dışarıdan bakıldığında sadece evrak tesliminden ibaretmiş gibi görünebilir. Ancak göç idaresi memurlarının talep ettiği spesifik tasdikler (Apostil), noter onaylı çevirilerin doğru hukuki terminolojiyle yapılmış olması veya randevu sistemindeki (E-Çerga) sıkışıklıklar ciddi zaman kaybına yol açar. \n\nÖzellikle son dönem mevzuat değişiklikleriyle, Ukrayna makamları yabancıların oturum izni başvurularını çok daha detaylı bir süzgeçten geçirmektedir. Kendi başınıza başvurup ret aldığınız takdirde, ülkeden hemen çıkış yapmanız gerekebilir. **Lviv oturum izni avukatı** olarak, sadece bir form doldurmuyor; oturum stratejinizi baştan sona planlıyor, randevunuzu alıyor, evrakları doğru sırayla onaylatıyor ve başvuruyu sizin adınıza veya sizin refakatinizde bizzat biz yapıyoruz."
          },
          {
            type: "why_us",
            title: "Oturum İzni Sürecini Neden Bize Bırakmalısınız?",
            items: [
              "Vakit Kaybına Son: Devlet dairelerinde günlerce sıra beklemezsiniz. Tüm bürokratik engelleri biz aşarız.",
              "Sıfır Hata Politikası: Çevirilerden devlet harçlarına kadar her detay alanında uzman avukatlarımızca denetlenir.",
              "Garantili Takip: Dosyanız teslim edildikten sonra statüsü günlük olarak takip edilir, memurlarla anlık iletişim kurulur.",
              "Dil ve Kültür Bariyeri Yok: İstekleriniz anadilinizde Türkçe dinlenir, işlemleriniz Ukraynaca ve yasal zemine uygun adımlarla gerçekleştirilir.",
              "Geleceğe Yatırım: Bugün alacağınız sağlam bir geçici oturum izni, yarın kalıcı oturum (süresiz ikamet) veya vatandaşlık başvurunuz için sağlam bir temel oluşturur."
            ]
          },
          {
            type: "stats",
            items: [
              { label: "Başarı Oranı", value: "%98.5" },
              { label: "Bürokraside Tasarruf", value: "3x Hızlı" },
              { label: "Türk Müvekkil", value: "500+" },
              { label: "Denetlenen Evrak", value: "Binlerce" }
            ]
          },
          {
            type: "quote",
            text: "Ukrayna'da geçirdiğiniz zamanın sadece evinize veya işinize odaklanarak geçmesi gerektiğine inanıyoruz. Evrak işlerinin getirdiği baş ağrısını bize bırakın.",
            author: "Uzman Göç Hukuku Departmanımız"
          }
        ],
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
        metaTitle: "Ukrayna Kalıcı Oturum İzni Nasıl Alınır? | Süresiz İkamet Şartları",
        metaDescription: "Ukrayna kalıcı oturum izni (süresiz ikamet) başvuru şartları, gerekli evraklar ve evlilik yoluyla oturum izni süreçleri. Lviv Göç avukatı danışmanlık hizmeti.",
        heroDescription: "Ukrayna'yı ikinci vatanı yapmak isteyenler için süresiz ikamet (Kalıcı Oturum İzni) süreçlerini kusursuz bir hukuki altyapıyla sizin adınıza yönetiyoruz.",
        content: `Kalıcı oturum izni, Ukrayna'da süresiz olarak yaşama hakkı tanıyan en kapsamlı ikamet belgesidir.`,
        contentBlocks: [
          {
            type: "highlight",
            title: "Süresiz Yaşamın Kapılarını Aralıyoruz",
            content: "**Ukrayna Kalıcı Oturum İzni** (Посвідка на постійне проживання), Türk vatandaşlarına Ukrayna'da oy kullanmak dışında, neredeyse bir Ukrayna vatandaşı ile aynı haklara sahip olma imkanı verir. Her sene ikamet uzatma stresi yaşamadan, vize problemi veya çalışma izni kısıtlamalarına takılmadan özgürce yaşamak ve çalışmak isteyenler için nihai hedeftir. Ancak bu statüyü kazanmak, oldukça titizlikle hazırlanmış bir 'Göçmenlik Kotası' başvurusunu veya özel yasal istisnaları gerektirir. Bireysel yapılan başvuruların eksik belge nedeniyle reddedilme oranı çok yüksektir."
          },
          {
            type: "features",
            title: "Kalıcı Oturum Size Hangi Ayrıcalıkları Sağlar?",
            items: [
              {
                title: "Vizesiz ve Süresiz Giriş Çıkış",
                description: "Hiçbir vize, davetiye veya sınır kısıtlamasına takılmadan Ukrayna'ya giriş çıkış yapabilirsiniz."
              },
              {
                title: "Çalışma İzninden Muafiyet",
                description: "Herhangi bir şirkette Ukrayna vatandaşları gibi çalışabilir, ek bir çalışma izni alma zorunluluğundan sonsuza dek kurtulursunuz."
              },
              {
                title: "Sosyal Haklar ve Ticari Özgürlük",
                description: "Banka kredileri, kredi kartı başvuruları, mülk edinimleri ve ticari faaliyetlerde yerel halkla aynı statüde değerlendirilirsiniz."
              },
              {
                title: "Ukrayna Vatandaşlığına Giden Yol",
                description: "Kalıcı oturum sahibi olmak, ileride yapacağınız muhtemel bir vatandaşlık başvurusunun en güçlü temel taşıdır."
              }
            ]
          },
          {
            type: "markdown",
            content: "### Kalıcı Oturum İçin Yasal Haklılık (Göç Kotası)\n\nUkrayna devleti, kalıcı oturum iznini her isteyene vermemekte, her yıl belirlenen göç kotaları (Emigrasyon Kotası) dahilinde veya kota dışı özel statüler üzerinden bu hakkı tanımaktadır. \n\n*   **Kota Dışı Başvurular:** Ukrayna vatandaşıyla 2 yılı doldurmuş evlilikler, Ukrayna doğumlu olma durumu veya doğrudan akrabalık bağları gibi durumlar kota dışı değerlendirilir ve süreç nispeten daha nettir.\n*   **Kota Dahili Başvurular:** Ukrayna ekonomisine yapılan büyük çaplı yabancı yatırımlar (minimum 100.000 USD), Ukrayna ekonomisi/kültürü için yüksek nitelikli uzman kategorisine girenler bu kota sistemiyle başvuru yaparlar.\n\nSürecin karmaşıklığı tam da burada başlar: Hangi kategoriye uyduğunuzu doğru tespit etmek, sabıka kayıtlarınızı, adres beyanlarınızı ve gerekçe belgelerinizi eksiksiz bir şekilde göç idaresi ve istihbarat güvenlik (SBU) onayından geçirmek uzmanlık ister. Biz, **Lviv kalıcı oturum avukatı** olarak dosyanızın onay makamlarının tüm şüphelerini giderecek şeffaflıkta ve yasal düzende olmasını garanti altına alıyoruz."
          },
          {
            type: "alert",
            level: "warning",
            title: "Önemli Uyarı: Süreç Aylar Sürebilir",
            content: "Kalıcı oturum (Emigrasyon İzni) başvurusu tek aşamalı değildir. Önce göçmenlik izni alınır (ki bu 6 ile 12 ay sürebilir), ardından kalıcı oturum kartı basılır. Bu uzun süreçte adres veya iletişim bilgisi değişikliği gibi ufak detaylar başvuruyu çökertebilir. Tüm bu yasal kurguyu sağlam şekilde takip etmek için profesyonel bir avukat tutmanız zamanınızı ve paranızı korur."
          },
          {
            type: "why_us",
            title: "Neden Doğru Avukatla Çalışmalısınız?",
            items: [
              "Hukuki Risk Analizi: Dosyanızdaki potansiyel ret sebeplerini başvuru yapmadan önce tespit eder ve onarırız.",
              "Karmaşık Bürokrasiyi Aşma: Türkiye'den alınacak belgelerin Ukrayna mercilerine uyarlanması ciddi bir know-how gerektirir.",
              "Güvenlik Soruşturmalarına Hazırlık: Dosyanız istihbarat ve polis onayı gibi birçok yerden dönecektir; yasal savunmanız ve tebligatlarınız bizim kontrolümüzde olur.",
              "Maliyet Avantajı: Ret aldıktan sonra yeniden başvuru yapmak, mahkemelerde iptal davaları açmak ilk baştan doğru avukatı tutmaktan çok daha pahalıdır."
            ]
          }
        ],
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
        metaTitle: "Ukrayna Çalışma İzni Almak | Türkler İçin İşveren ve İşçi Rehberi Lviv",
        metaDescription: "Ukrayna'da çalışma izni nasıl alınır? Yeni yasalara göre işçi ve şirket yöneticileri için Lviv avukat destekli garanti süreçler.",
        heroDescription: "Ukrayna'da profesyonel kariyerini kurmak isteyen uzmanlara veya şirketine Türk personel getirtmek isteyen işverenlere, bürokratik engelleri tamamen kaldıran 'Çalışma İzni' hizmeti sunuyoruz.",
        content: `Ukrayna'da yasal olarak çalışabilmek için çalışma izni (дозвіл на працевлаштування) almanız zorunludur.`,
        contentBlocks: [
          {
            type: "highlight",
            title: "Ukrayna'da Yasal Çalışma ve Yatırım İçin İlk Adım",
            content: "Yabancı bir yatırımcı olarak kendi kurduğunuz şirkette direktörlük yapmak ya da Ukraynalı bir şirkette uzman Türk personeli olarak istihdam edilmek istiyorsanız, **Ukrayna çalışma izni** (дозвіл на використання праці іноземців) almak yasal bir zorunluluktur. İşveren, çalışma iznini sizin adınıza İstihdam Merkezi'nden alır. Mevzuatların oldukça sık değiştiği bu alanda, dosyanızı bir avukat olmadan tek başınıza sunmanız çoğu zaman başvurunuzun iade edilmesiyle sonuçlanır. Lviv ve Ukrayna genelinde şirketlerin ve bireylerin yasal süreçlerini başından sonuna biz yönetiyoruz."
          },
          {
            type: "features",
            title: "Hangi Çalışma İzni Türü Size Uygun?",
            items: [
              {
                title: "Kurucu / Direktör İzni",
                description: "Ukrayna'da kendi LLC'sini (TOV) kuran ve kendi şirketinin genel müdürü olarak kalmak isteyenler için özel başvuru türü."
              },
              {
                title: "Yüksek Nitelikli Uzman",
                description: "BT uzmanları, mühendisler ve üst düzey yöneticiler için daha esnek asgari ücret şartları sunan izin türü."
              },
              {
                title: "Şirket İçi Transfer Kadrosu",
                description: "Uluslararası bir şirketin Türkiye şubesinden Ukrayna şubesine gönderilecek personellerin izinleri."
              },
              {
                title: "Standart Çalışma İzni",
                description: "Genel işçi, aşçı, inşaat ustası veya vasıflı diğer meslek grupları için yapılan standart kurallara tabi başvuru."
              }
            ]
          },
          {
            type: "markdown",
            content: "### Süreci Neden Hukuki Yollarla Güvenceye Almalısınız?\n\nBirçok kişi çalışma izni alırken Ukrayna'daki aracı 'şirketlere' güvenmekte ve sonrasında yapılan sahte bildirimler yüzünden hem izninden olmakta hem de **deport (sınır dışı)** riskiyle karşılaşmaktadır. Yasal olmayan yollarla veya sadece şeklen kurulmuş şirketler üzerinden çalışma izni alınması, Ukrayna İstihdam Merkezi ve Göç Dairesi tarafından rutin kontrollere tabi tutulmaktadır.\n\nİşverenler (şirket sahipleri) için de süreç risklidir: Yabancı bir işçiyi izinsiz çalıştırmanın cezası binlerce grivnayı bulmakta, şirket hesaplarına bloke konulabilmektedir. Amacımız şirketinizin ticari itibarına zarar vermeden, mevzuata %100 uygun asgari maaş sınırları ve iş sözleşmeleriyle personel tahsisini yasal hale getirmektir."
          },
          {
            type: "stats",
            items: [
              { label: "Kurumsal Müvekkil", value: "80+" },
              { label: "İşlem Süresi", value: "7-15 Gün" },
              { label: "Çeviri ve Noter", value: "Dahil" },
              { label: "Yasal Red Oranı", value: "%0" }
            ]
          },
          {
            type: "why_us",
            title: "Neden Av. Lyudmyla Chubai Yönetimi?",
            items: [
              "Risk Analizi: Şirketinizin veya mesleki durumunuzun çalışma izni kotasına ve asgari maaş şartlarına uygunluğunu analiz ederiz.",
              "Taslak İş Sözleşmeleri: Ukrayna çalışma yasasına (KZpP) uygun, işçiyi ve işvereni koruyan, iki dilli sağlam sözleşmeler hazırlarız.",
              "Çalışma İzni sonrası Oturum İzni (D-04 Vize): Çalışma izniniz onaylandıktan sonra, bunu yasal bir geçici oturum kartına çevirme sürecini de bizzat takip ederiz.",
              "Tüm Bürokrasiden Muafiyet: İşveren İstihdam Merkezi kapılarında sıra beklemez; vekaletnamemiz ile tüm süreci biz adınıza yürütürüz."
            ]
          },
          {
            type: "alert",
            level: "info",
            title: "Maaş Şartlarına Dikkat",
            content: "Mevzuatta yapılan güncellemelerle asgari vergilendirme, yabancı işçinin şirkete maliyeti gibi dengeler oldukça değişmiştir. Size en az vergi yükü çıkaracak ve aynı zamanda yasalara tam uyumlu iş sözleşmesi modellerini hazırlamak uzmanlığımızdır."
          }
        ],
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
        metaTitle: "Ukrayna'da Evlilik İşlemleri | Türkler İçin Nikah ve Kıyma Rehberi Lviv",
        metaDescription: "Ukrayna'da evlilik işlemleri nasıl yapılır? Gerekli belgeler, Türk konsolosluğu tescili, apostilli bekarlık belgesi. Lviv avukat destekli evlilik başvurusu.",
        heroDescription: "Ukrayna'da sevdiğiniz kişiyle hayatınızı birleştirirken resmi işlerin stresinden kurtulun. Yabancılar için nikah işlemlerinden evlilik cüzdanı çevirilerine kadar baştan sona profesyonel destek sağlıyoruz.",
        content: `Ukrayna'da evlilik işlemleri Türkiye'ye göre farklı prosedürlere sahiptir. Doğru belge hazırlığı ve yasal sürecin eksiksiz takibi büyük önem taşır.`,
        contentBlocks: [
          {
            type: "highlight",
            title: "Ukrayna'da Mutluluğunuza Bürokrasi Gölge Düşürmesin",
            content: "Ukrayna ile Türkiye arasındaki resmi prosedür farkları, evlilik gibi mutlu bir günü maalesef bir belge toplama maratonuna çevirebiliyor. DRACS (Ukrayna Nüfus Müdürlüğü) memurları, **Ukrayna'da evlilik** yapmak isteyen yabancılardan çok spesifik tasdiklere (Apostilli) sahip belgeler talep etmektedir. Türkiye'den alınan bekarlık belgesindeki en ufak bir harf hatası bile nikahın haftalarca ertelenmesine sebep olabilir. Biz, tüm bu evrak stresi ile sizin yerinize uğraşıyor ve nikah tarihinizi sorunsuz bir şekilde planlıyoruz."
          },
          {
            type: "features",
            title: "Evlilik Sürecinde Sunduğumuz Hukuki Destek",
            items: [
              {
                title: "Belge Tercüme ve Noter",
                description: "Türkiye'den getirdiğiniz evrakların Ukrayna yasalarına uygun olarak yeminli çevirisi ve noter onayı."
              },
              {
                title: "DRACS (Nüfus) Başvurusu",
                description: "Evlendirme dairesindeki uzun sıraları atlıyor, vekaletname veya refakatimizle gününüzü alıyoruz."
              },
              {
                title: "Hızlandırılmış Nikah 'Şlûb za dobu'",
                description: "Ukrayna'daki özel '1 Günde Evlilik' (Shlyub za dobu) projesi kapsamında işlemlerinizi standart 1 aylık bekleme süresi olmadan 24 saat içinde tamamlıyoruz."
              },
              {
                title: "Konsolosluk Tescil İşlemi",
                description: "Evliliğinizin Türkiye'de de resmiyet kazanması için Kiev veya Odessa konsolosluk bildirim şartlarını eksiksiz yerine getiriyoruz."
              }
            ]
          },
          {
            type: "alert",
            level: "info",
            title: "Oturum İzni İçin Evlilik Mi?",
            content: "Eğer Ukrayna vatandaşı ile evlenme amacınız temelde Oturum İzni almak ise, Ukrayna makamlarının 'Sahte Evlilik' (Fictitious Marriage) denetimlerini çok sıkı yaptığını unutmayın. Biz evliliğin yasal dayanaklarını ve göçmenlik dosyasına nasıl çevrileceğini adım adım kurguluyoruz."
          },
          {
            type: "markdown",
            content: "### Neden Ukrayna Evlilik Avukatına İhtiyacınız Var?\n\nKendi başınıza nikah memurlarıyla Ukraynaca bir sözleşme veya form doldurarak haklarınızı güvenceye alamayabilirsiniz. Özellikle daha önce boşanmış veya çocuğu olan kişilerin Ukrayna'da evlenmesi, eski evliliğin kanıtlanması gibi ekstra yükler getirir. Her şeyin düzgün ilerlemesi, tercümanların hazır bulunması (Yabancılar için nikah anında yeminli tercüman yasal zorunluluktur) bizim tarafımızdan sağlanır."
          }
        ],
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
        heroDescription: "Yıpratıcı boşanma süreçlerini hızlı, gizlilik içinde ve haklarınızı maksimum düzeyde koruyarak tamamlıyoruz. Ukraynalı eşinizle olan anlaşmalı veya çekişmeli boşanma davasında profesyonel temsil.",
        content: `Ukrayna'da boşanma süreci, anlaşmalı veya çekişmeli olmasına göre farklılık gösterir. Her iki durumda da haklarınızın korunması için profesyonel hukuki destek almanız önemlidir.`,
        contentBlocks: [
          {
            type: "highlight",
            title: "Uluslararası Boşanma: Çifte Hukuk, Çifte Risk",
            content: "Ukrayna vatandaşıyla evli bir Türk iseniz ve boşanma kararı aldıysanız, sadece Ukrayna mahkemelerinde karar çıkartmak yetmeyecek, aynı kararın Türkiye'de 'Tanıma ve Tenfiz' yoluyla da onaylatılması gerekecektir. **Ukrayna boşanma avukatı** olarak, sadece davanızı açmıyor; çocukların velayeti, nafaka, sınır ötesi mal paylaşımı gibi çok karmaşık konuları, tek bir celsede lehinize çözmek için çalışıyoruz."
          },
          {
            type: "features",
            title: "Boşanma Sürecinde Verdiğimiz Başlıca Hizmetler",
            items: [
              {
                title: "Anlaşmalı Boşanma (DRACS / Mahkeme)",
                description: "Ortak çocuk yoksa doğrudan idari yollarla, varsa mahkeme yoluyla en hızlı şekilde süreci sonlandırma."
              },
              {
                title: "Çekişmeli Boşanma",
                description: "Eşin boşanmak istememesi veya taleplerin uyuşmaması durumunda mahkemede güçlü ve agresif yasal temsil."
              },
              {
                title: "Tanıma ve Tenfiz",
                description: "Türkiye'de boşandıysanız bunun Ukrayna'da geçerli kılınması veya tam tersi durumlar."
              },
              {
                title: "Nafaka ve Velayet",
                description: "Çocukların ülkeye giriş-çıkış izinleri (yurt dışı çıkış blokajı iptali) ve adil nafaka/tazminat belirlenmesi."
              }
            ]
          },
          {
            type: "why_us",
            title: "Uzaktan Boşanmak Mümkün Mü?",
            items: [
              "Vekaletname ile Türkiye'den Ukrayna'ya gelmenize bile gerek kalmadan boşanma davanızı açar ve sonuçlandırabiliriz.",
              "Gergin geçen duruşmalara katılmak zorunda kalmazsınız; biz yasal sözcünüz oluruz.",
              "Mal paylaşımında Ukrayna'da bulunan şirket hisseniz veya mülkleriniz, Ukrayna Aile Kanunu'nun (SKU) özel koruma maddeleri kullanılarak güvence altına alınır."
            ]
          },
          {
            type: "quote",
            text: "Kötü biten bir evliliğin, hukuki bir kabusa dönüşmesine asla izin vermeyin. Güçlü bir savunma ile yeni hayatınıza hızlıca adım atın.",
            author: "Aile Hukuku Departmanı"
          }
        ],
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
        metaTitle: "Ukrayna'da Şirket Kurma - Lviv Şirket Kuruluşu ve Tescili | Lviv Avukat",
        metaDescription: "Ukrayna'da şirket nasıl kurulur? TОВ (LLC) kuruluşu, vergi kaydı, Lviv'de iş kurmak isteyen dev yatırımcılara ve KOBİ'lere uçtan uca hukuki destek.",
        heroDescription: "Ukrayna'nın altın fırsatlarla dolu pazarına emin adımlarla giriş yapın. Türk girişimcileri için şirket ana sözleşmesinin hazırlanmasından yasal adres teminine kadar tüm şirket (TОВ/LLC) kurulum süreçlerini yönetiyoruz.",
        content: `Ukrayna, canlı ekonomisi ve stratejik konumuyla Türk yatırımcılar için cazip bir pazar sunmaktadır. Şirket kurma süreci basit olmakla birlikte, yasal prosedürlerin doğru takibi önemlidir.`,
        contentBlocks: [
          {
            type: "highlight",
            title: "Ukrayna Pazarında Yanlış Adım Atmayın",
            content: "Yatırım yapmak veya Ukrayna pazarına girmek mükemmel bir karardır. Ancak ticari faaliyetlerinize yasal bir çatıyla başlamak en güvenlisidir. **Ukrayna'da şirket kurma** (özellikle TОВ / Limited Şirket) sürecinde en çok karşılaşılan tuzaklar; yasal adresin (yurydychna adresa) geçersiz olması, ana sözleşmedeki kâr dağıtım kurallarının yanlış çevrilmesi veya vergi modelinin yanlış seçilmesidir. Sizin yerinize ticari sicil dairelerinde, vergi dairelerinde ter döküyor, şirketinizi sıfır riskle, anahtar teslim kuruyoruz."
          },
          {
            type: "features",
            title: "TОВ (Limited Şirket) Kurulum Paketimiz Neleri Kapsıyor?",
            items: [
              {
                title: "Yasal Adres (Kayıtlı Ofis) Temini",
                description: "Ukrayna vergi dairelerinin onayladığı, kara listede olmayan ve tamamen yasal ticari adres sözleşmesi."
              },
              {
                title: "Vergi Kaydı ve Model Seçimi",
                description: "KDV (PDV) mi yoksa %5 Sabit Oran mı? Şirketinizin hacmine göre en ideal vergi sistemini mali müşavirlerimiz eşliğinde belirliyoruz."
              },
              {
                title: "Banka Hesabı ve Finans",
                description: "Ukrayna'daki köklü bankalarda kurumsal hesapların (Grivna, Dolar, Euro) açılması ve internet bankacılığı kurulumu."
              },
              {
                title: "Ana Sözleşme ve Noter Onayları",
                description: "Ticaret odası için zorunlu olan ve ileride yaşanacak ortaklık krizlerini önceden çözen özel 'Statüt' (Şirket Tüzüğü) hazırlanması."
              }
            ]
          },
          {
            type: "markdown",
            content: "### Uzaktan Şirket Kurulumu Mümkün Mü?\n\nEvet! Noterde düzenleteceğiniz apostilli bir vekaletname ile siz Türkiye'den veya dünyanın herhangi bir yerinden hiç kalkmadan, Ukrayna ticari sicilinde şirketinizin %100 sahibi olarak tescilini gerçekleştiriyoruz. **Lviv şirket kurma avukatı** arayışınızda bizimle çalışmanız, iş seyahatleriniz öncesinde bile tüm altyapınızın hazır olmasını sağlar."
          },
          {
            type: "stats",
            items: [
              { label: "Kurulan Şirket", value: "100+" },
              { label: "Kurulum Süresi", value: "3-7 İş Günü" },
              { label: "Yabancı Sermaye", value: "%100" },
              { label: "Hukuki Check-Up", value: "Ücretsiz" }
            ]
          },
          {
            type: "why_us",
            title: "Bizi Neden Tercih Etmelisiniz?",
            items: [
              "Hızlı Tescil: Devlet sicilindeki (Rejestr) uzun prosedürleri sadece birkaç iş günü içerisinde bitirme garantisi.",
              "Muhasebe Altyapısı: Şirketinizi kurup sizi yalnız bırakmıyor, ilk beyannameleriniz ve işçi bordrolarınız için muhasebe desteği de sunuyoruz.",
              "Sermaye Güvencesi: Ukrayna'da TОВ yatırımları için minimum yasal sermaye zorunluluğu kaldırılmıştır; yani bütçenizi tüketmeden şirket açabilirsiniz.",
              "Gümrük ve Çifte Vergilendirme: Türkiye-Ukrayna arasındaki serbest ticaret ve çifte vergilendirmeyi önleme anlaşmalarına tam hakimyiet."
            ]
          }
        ],
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
        metaTitle: "Ukrayna Gayrimenkul ve Emlak Hukuku | Ev Alma İşlemleri",
        metaDescription: "Ukrayna'da ev almak, arsa yatırımı yapmak veya tapu (gayrimenkul) işlemleri için eksiksiz araştırma ve avukatlık hizmetleri. Lviv emlak avukatı.",
        heroDescription: "Ukrayna'da dolandırıcılık riski olmadan, güvenle gayrimenkul edinmek isteyen yabancı yatırımcılara tapu araştırmasından satışın tamamlanmasına kadar hukuki kalkan oluşturuyoruz.",
        content: `Ukrayna'da yabancılar belirli koşullar altında gayrimenkul edinebilirler. Mülk alım-satım süreçlerinde hukuki güvence sağlamak için profesyonel destek almanız önemlidir.`,
        contentBlocks: [
          {
            type: "highlight",
            title: "Mülk Alırken Varlığınızı Riske Atmayın",
            content: "Ukrayna emlak piyasası oldukça hareketli olmakla birlikte hukuki gri alanlara sahiptir. Özellikle yeni yapılan projelerde 'ön-satış' sözleşmeleri, müteahhit firmanın iflas riskleri veya üzerinde haciz (ipotek, rehin, şerh) olan ikinci el daireler **Ukrayna gayrimenkul hukuku** açısından büyük tuzaklar barındırabilir. Bir evi çok beğendiğinizde sadece emlakçının söylediklerine güvenerek binlerce dolar transfer etmek hayatınızın hatası olabilir. Biz devreye giriyor, satın alacağınız mülkün devlet kayıtlarında detaylı analizini (Due Diligence) yapıyoruz."
          },
          {
            type: "markdown",
            content: "### Yabancılar Ukrayna'da Mülk Edinebilir mi?\n\nKısa cevap: **Evet!** Türkiye Cumhuriyeti vatandaşları da dahil olmak üzere yabancılar Ukrayna'da bağımsız bölüm (ev, daire, ofis, otel odası) satın alma hakkına tam olarak sahiptir. Ancak tarım arazisi (zemlya) satın alımında yabancılara yönelik çok katı kısıtlamalar bulunmaktadır.\n\nEvin satın alınması son derece resmi bir noter huzuru işlemidir. Resmi bir Vergi Numarasına (INN - İdentifikasyon Kodu) sahip olup olmadığınıza bakılır ve eğer yoksa bunu aynı gün içerisinde sizin adınıza çıkarıyoruz."
          },
          {
            type: "features",
            title: "Gayrimenkul Danışmanlığımız Neleri Kapsar?",
            items: [
              {
                title: "Detaylı Sicil Araştırması",
                description: "Satıcının gerçekten mal sahibi olup olmadığı, malın üzerinde banka rehni veya mahkeme şerhi bulunup bulunmadığı tek tek sorgulanır."
              },
              {
                title: "Vergi Levhası (İNN) Çıkarılması",
                description: "Ukrayna'da mülk alımı ve banka işlemleri yapabilmesi için zorunlu olan yabancı vergi numarasının temini."
              },
              {
                title: "Noter ve Sözleşme Temsili",
                description: "Satış işlemlerinde noter huzurunda evrakların Ukraynaca-Türkçe denetimi, yeminli tercümanlık ve avukat nezdinde güvenli imza süreci."
              },
              {
                title: "Yeni Proje İnşaat Sözleşmeleri",
                description: "Temelden alınan dairelerde müteahhidin inşaat ruhsatlarını, geçmiş teslimatlarını ve taslak sözleşmedeki haksız maddeleri analiz etme."
              }
            ]
          },
          {
            type: "why_us",
            title: "Güvenilir Yatırımın Tek Adresi",
            items: [
              "Ev sahibinin borçları yüzünden tapunuzun iptal edilme riskini hukuken ortadan kaldırırız.",
              "Paranın transferi ( Swift vs. ) işlemlerinde para aklama (Finansal Monitöring) yasalarına takılmadan yasal ödeme modeli sunarız.",
              "Gayrimenkul alımında yabancıların ödemesi gereken gizli vergilerin ve noter masraflarının satıcı tarafından haksızca size yıkılmasını önleriz.",
              "Aldığınız evi kiraladığınızda hazırlayacağınız Ukrayna kira sözleşmelerini, haklarınızı (zamanında çıkış ve tahliye) koruyacak şekilde biz yazarız."
            ]
          },
          {
            type: "alert",
            level: "danger",
            title: "Sahte Sözleşmelere Dikkat!",
            content: "Ukrayna'da emlak alımları mutlaka lisanslı ve sisteme kayıtlı bir noter önünde yapılmalıdır. Basit bir kağıda atılan 'Evi sattım, parasını aldım' imzalarının hukuken hiçbir geçerliliği yoktur."
          }
        ],
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
        metaTitle: "Ukrayna Ceza Avukatı | Lviv Ceza Hukuku Savunma ve Danışmanlık",
        metaDescription: "Ukrayna ceza avukatı arıyorsanız, Lviv ve tüm Ukrayna genelinde Türk vatandaşları için ağır ceza, tutuklama, soruşturma aşamalarında acil hukuki destek sağlıyoruz. Hemen bize ulaşın.",
        heroDescription: "Ukrayna'da herhangi bir suçlama, gözaltı veya ceza soruşturması ile karşı karşıya kalan Türk vatandaşlarına, haklarını en güçlü şekilde savunmak için anında, profesyonel ve sonuç odaklı avukatlık hizmeti sunuyoruz.",
        content: `Ceza hukuku süreçleri her zaman acil ve ciddidir. Ukrayna'da ceza soruşturması veya kovuşturması ile karşılaşan Türk vatandaşlarına profesyonel savunma hizmeti sağlıyoruz.`,
        contentBlocks: [
          {
            type: "highlight",
            title: "Ukrayna'da Ceza Avukatı Neden Kritik Öneme Sahiptir?",
            content: "Yabancı bir ülkede, dilini, kültürünü ve en önemlisi yasalarını tam olarak bilmediğiniz bir adalet sistemiyle karşı karşıya kalmak, son derece stresli ve riskli bir durumdur. **Ukrayna ceza avukatı** olarak bizler, yalnızca yasal maddeleri okuyarak değil, uygulamanın pratikte nasıl işlediğini, savcılık makamlarının nasıl hareket ettiğini çok iyi analiz ederek çalışıyoruz. Amacımız, Türk vatandaşlarının Ukrayna mahkemelerinde veya polis merkezlerinde haksızlığa uğramasını engellemek, en hızlı şekilde özgürlüklerine ve haklarına kavuşmalarını sağlamaktır."
          },
          {
            type: "markdown",
            content: "### Lviv ve Ukrayna Genelinde Profesyonel Savunma\n\nCeza hukuku davaları, saniyelerin ve ilk atılan adımların çok büyük önem taşıdığı süreçlerdir. İster **Lviv ceza avukatı** arayışında olun, ister Ukrayna'nın başka bir şehrinde acil müdahaleye ihtiyaç duyun, anında yanınızdayız. Gözaltı veya tutuklama durumlarında kolluk kuvvetlerine verilecek ilk ifade, davanın tüm seyrini değiştirebilir. Tercüman eksikliği, yanlış anlaşılan ifadeler veya haklarınız konusunda eksik bilgilendirilmeniz, telafisi imkansız hatalara yol açabilmektedir.\n\nBizimle çalışmanız, sizin adınıza gece gündüz mücadele edecek, **Ukrayna hukuku deneyimi** yüksek, Türk vatandaşlarının hassasiyetlerini anlayan bir yasal kalkana sahip olmanız demektir."
          },
          {
            type: "features",
            title: "Hangi Aşamalarda Destek Sağlıyoruz?",
            items: [
              {
                title: "Gözaltı ve Tutuklama Sırasında Acil Müdahale",
                description: "Gözaltına alındığınız anda yanınızda bulunarak ifadenize katılır, haklarınızı (susma hakkı, Türk Konsolosluğu'na haber verme vb.) anında kullanmanızı sağlarız."
              },
              {
                title: "Soruşturma ve İfade Süreçleri",
                description: "Savcılık süreçlerinin en başından sonuna kadar, aleyhinize toplanan delillerin hukuka uygunluğunu denetler, savunmanızın omurgasını burada kurgularız."
              },
              {
                title: "Ağır Ceza Mahkemelerinde Savunma",
                description: "Uyuşturucu suçları, dolandırıcılık, yaralama, ekonomik suçlar veya bilişim suçları gibi yüksek cezalar öngören dosyalarda stratejik savunma yönetimi."
              },
              {
                title: "Yakalama ve İade (Ekstradisyon) Süreçleri",
                description: "Interpol aracılığıyla aranan kişilerin veya Türkiye'ye iade süreçleriyle karşılaşan kişilerin yasal haklarının uluslararası çerçevede korunması."
              }
            ]
          },
          {
            type: "stats",
            items: [
              { label: "Anında Müdahale Edilen Vakalar", value: "7/24" },
              { label: "Türkçe Başarılı İletişim", value: "%100" },
              { label: "Tecrübe", value: "10+ Yıl" },
              { label: "Ukrayna Çapında Destek", value: "Tüm Bölge" }
            ]
          },
          {
            type: "alert",
            level: "danger",
            title: "DİKKAT: İlk 24 Saat Çok Önemli!",
            content: "Eğer bir yakınınız Ukrayna'da gözaltına alındıysa, ilk 24 saat içinde uzman bir avukatın devreye girmesi hayati önem taşır. Lütfen zaman kaybetmeden bizimle doğrudan iletişime geçiniz. Kendi kendinize vereceğiniz eksik bir ifade, sonradan değiştirilmesi çok güç yasal sonuçlar doğurabilir."
          },
          {
            type: "why_us",
            title: "Neden Süreci Bizimle Yönetmelisiniz?",
            items: [
              "Sistemdeki yasal boşlukları bilen ve müvekkil lehine kullanan tecrübeli avukat kadrosuna sahibiz.",
              "Türk müvekkillerimizle doğma büyüme anadilimiz veya akıcı seviyede iletişim kurarak aradaki köprüyü çok sağlam kurarız.",
              "Gerçekçi olmayan vaatler yerine, muhtemel senaryoları (en kötü ve en iyi sonuçları) rasyonel şeffaflıkla aktarırız.",
              "Mahkeme aşamasından çok önce, savcılık (hazırlık) aşamasında agresif müdahalelerle dosyanın kapanması için maksimum çabayı gösteririz.",
              "Bürokratik ve psikolojik stresi omuzlarınızdan alırız; siz sağlığınıza ve işinize odaklanırken, özgürlüğünüz için en iyi savunmayı biz yaparız."
            ]
          },
          {
            type: "markdown",
            content: "### **Ukrayna Ceza Hukuku** ve Yabancılar İçin Riskler\n\nUkrayna yasalarına göre bazı eylemler, sizin kendi ülkenizde suç sayılmasa bile veya farklı değerlendirilse dahi, ağır yaptırımlarla karşılaşmanıza sebep olabilir. Gümrük kurallarının ihlali, evrakta sahtecilik iddiası gibi durumlarda, olay bir idari para cezasından ziyade ağır ceza dosyasına dönüşebilir.\n\nBir soruşturmaya müdahil olduğunuzda veya haksız yere suçlandığınızda tek yapmanız gereken paniğe kapılmamak ve hemen alanında uzman, referansları kuvvetli bir **Ukrayna ceza avukatından** rehberlik almaktır. Sizi temsil edecek kişinin aynı zamanda Ukrayna sisteminin kültürel ve kanuni reflekslerini anlayabilmesi, davanızın seyrini olumlu yönde etkileyecek en net unsurdur."
          },
          {
            type: "quote",
            text: "Adaletin kılıcı keskindir ancak doğru savuma kalkanı olmadan bu adaleti aramak yalnızlığa yürümektir.",
            author: "Av. Lyudmyla Chubai Yönetimi"
          }
        ],
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
