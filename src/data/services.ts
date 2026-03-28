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
  titleUk: string;
  services: ServiceItem[];
}

export interface ServiceItem {
  title: string;
  titleUk: string;
  slug: string;
  shortDescription: string;
  shortDescriptionUk: string;
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
  durationUk?: string;
  // Ukrainian locale fields
  metaTitleUk?: string;
  metaDescriptionUk?: string;
  heroDescriptionUk?: string;
  contentBlocksUk?: ContentBlock[];
  requiredDocumentsUk?: string[];
  processStepsUk?: { title: string; description: string }[];
  faqUk?: { question: string; answer: string }[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    title: "Oturum & Vize İşlemleri",
    titleUk: "Проживання та візові послуги",
    services: [
      {
        title: "Geçici Oturum İzni",
        titleUk: "Тимчасовий дозвіл на проживання",
        slug: "gecici-oturum-izni",
        shortDescription: "Ukrayna'da geçici ikamet izni başvurusu ve süreç yönetimi",
        shortDescriptionUk: "Подання заявки на тимчасове проживання в Україні та управління процесом",
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
            author: "Av. Lyudmyla Chubai"
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
        durationUk: "15–30 робочих днів",
        metaTitleUk: "Тимчасовий дозвіл на проживання в Україні | Адвокат Львів",
        metaDescriptionUk: "Оформлення тимчасової посвідки на проживання в Україні для іноземців. Подання документів до ДМС, повний юридичний супровід у Львові. Безкоштовна консультація.",
        heroDescriptionUk: "Допомагаємо іноземним громадянам отримати тимчасовий дозвіл на проживання в Україні. Повний юридичний супровід — від збору документів до отримання посвідки у Львові.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Тимчасовий дозвіл на проживання — ваш перший крок до легального перебування",
            content: "**Тимчасовий дозвіл на проживання в Україні** (посвідка на тимчасове проживання) — це офіційний документ, який дає іноземцю право законно проживати, працювати або навчатися в Україні протягом визначеного строку. Державна міграційна служба (ДМС) у Львові висуває чіткі вимоги до документів, і навіть незначна помилка може стати причиною відмови. Наше бюро забезпечує безпомилкове оформлення з першої спроби."
          },
          {
            type: "features",
            title: "Підстави для отримання тимчасового дозволу",
            items: [
              {
                title: "Працевлаштування в Україні",
                description: "Іноземець, який має дозвіл на роботу від українського роботодавця, подає заявку на тимчасове проживання. Ми координуємо процес разом із Центром зайнятості."
              },
              {
                title: "Шлюб із громадянином України",
                description: "Чоловік або дружина-іноземець має право на тимчасовий дозвіл після реєстрації шлюбу. Допомагаємо зібрати всі документи, включно з апостилем."
              },
              {
                title: "Навчання у ВНЗ",
                description: "Студенти-іноземці, зараховані до українського університету, отримують посвідку на весь період навчання. Супроводжуємо від запрошення до ДМС."
              },
              {
                title: "Ведення бізнесу",
                description: "Засновники та директори українських компаній-іноземці мають право на тимчасове проживання. Оформлюємо дозвіл паралельно з реєстрацією підприємства."
              }
            ]
          },
          {
            type: "markdown",
            content: "### Чому важливо звернутися до адвоката?\n\nПроцес отримання тимчасового дозволу на проживання у Львові лише на перший погляд виглядає простим. Насправді Державна міграційна служба (ДМС) ретельно перевіряє кожну заявку: правильність заповнення форм, наявність апостилю на документах, якість нотаріального перекладу та відповідність законодавчим вимогам.\n\nОстаннім часом вимоги стали суворішими — відмова через формальну помилку означає повторне подання, втрату часу та додаткові витрати. Як адвокат у Львові з понад 10-річним досвідом роботи з ДМС, я забезпечую:\n\n- Повну перевірку документів перед подачею\n- Правильний нотаріальний переклад із юридичною термінологією\n- Запис на прийом до ДМС та супровід при подачі\n- Відстеження статусу заявки до отримання посвідки\n\n### Строки та порядок дій\n\nЗа законодавством України (Закон «Про імміграцію», Закон «Про правовий статус іноземців та осіб без громадянства»), тимчасовий дозвіл на проживання оформлюється протягом 15–30 робочих днів. Термін залежить від підстави: для працевлаштування — після отримання дозволу на роботу, для шлюбу — після реєстрації в ДРАЦС, для навчання — після зарахування до ВНЗ."
          },
          {
            type: "stats",
            items: [
              { label: "Успішність подачі", value: "98%" },
              { label: "Середній строк", value: "20 днів" },
              { label: "Оформлено посвідок", value: "300+" },
              { label: "Років досвіду з ДМС", value: "10+" }
            ]
          },
          {
            type: "why_us",
            title: "Переваги роботи з нашим бюро",
            items: [
              "Знаємо вимоги ДМС Львова напам'ять — жодної відмови через формальну помилку",
              "Повний комплект документів готуємо за вас: переклади, апостиль, нотаріальне засвідчення",
              "Записуємо на прийом до ДМС без черг — економимо ваш час",
              "Відстежуємо статус заявки щоденно та повідомляємо про результат",
              "Безкоштовна перша консультація — оцінимо ситуацію та назвемо точну вартість"
            ]
          },
          {
            type: "alert",
            title: "Важливо: строки перебування",
            content: "Іноземець, який перебуває в Україні за візою або безвізовим режимом, повинен подати заявку на тимчасовий дозвіл ДО закінчення легального строку перебування. Прострочення може призвести до штрафу або заборони в'їзду.",
            level: "warning"
          },
          {
            type: "quote",
            text: "Кожна справа з ДМС — це деталі. Один пропущений документ означає повторну подачу. Моя задача — зробити процес бездоганним з першого разу.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Закордонний паспорт (дійсний мінімум 6 місяців)",
          "Копія паспорта з нотаріальним перекладом українською",
          "Заява встановленого зразка (Форма 1)",
          "2 фотокартки 3,5×4,5 см",
          "Поліс медичного страхування",
          "Документ про місце проживання (договір оренди або запрошення)",
          "Підтвердження фінансового забезпечення (банківська виписка)",
          "Документ-підстава (трудовий договір, свідоцтво про шлюб, лист із ВНЗ тощо)",
          "Квитанція про сплату адміністративного збору",
        ],
        processStepsUk: [
          { title: "Безкоштовна консультація", description: "Оцінюємо вашу ситуацію та визначаємо підстави для отримання тимчасового дозволу" },
          { title: "Збір та підготовка документів", description: "Готуємо повний пакет: переклади, апостиль, нотаріальне засвідчення, заповнення форм" },
          { title: "Подання до ДМС", description: "Записуємо на прийом, подаємо заявку та супроводжуємо при біометрії" },
          { title: "Отримання посвідки", description: "Відстежуємо статус та повідомляємо, коли посвідка готова до отримання" },
        ],
        faqUk: [
          { question: "Скільки часу займає оформлення тимчасового дозволу на проживання?", answer: "Стандартний строк — 15–30 робочих днів з моменту подачі повного пакета документів до ДМС у Львові. Ми готуємо документи заздалегідь, щоб уникнути затримок." },
          { question: "На який строк видається тимчасовий дозвіл?", answer: "Тимчасова посвідка видається на 1 рік з можливістю продовження. Для студентів — на весь строк навчання." },
          { question: "Що робити, якщо заявку відхилили?", answer: "Ви маєте право на оскарження рішення ДМС. Наше бюро готує апеляцію та представляє ваші інтереси у відповідних органах." },
          { question: "Чи потрібно бути в Україні під час подачі?", answer: "Так, заявник повинен особисто з'явитися до ДМС для подачі біометричних даних. Ми супроводжуємо вас на прийомі." },
          { question: "Скільки коштує оформлення тимчасового дозволу?", answer: "Вартість залежить від підстави та складності справи. Позателефонуйте для безкоштовної консультації — назвемо точну суму після аналізу документів." },
          { question: "Чи можна працювати з тимчасовим дозволом на проживання?", answer: "Так, але додатково потрібен дозвіл на працевлаштування, який оформлює роботодавець. Ми допомагаємо з обома документами одночасно." }
        ],
      },
      {
        title: "Kalıcı Oturum İzni",
        titleUk: "Постійний дозвіл на проживання",
        slug: "kalici-oturum-izni",
        shortDescription: "Ukrayna'da süresiz ikamet hakkı için kalıcı oturum başvurusu",
        shortDescriptionUk: "Подання заявки на безстрокове проживання в Україні",
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
        durationUk: "1–3 місяці",
        metaTitleUk: "Постійний дозвіл на проживання в Україні | Адвокат Львів",
        metaDescriptionUk: "Оформлення посвідки на постійне проживання (ПМЖ) в Україні. Підстави, документи, строки. Юридичний супровід адвоката у Львові. Безкоштовна консультація.",
        heroDescriptionUk: "Допомагаємо іноземцям отримати постійний дозвіл на проживання в Україні — право жити та працювати без обмежень. Повний супровід від адвоката у Львові.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Постійне проживання — необмежене право на життя в Україні",
            content: "**Постійний дозвіл на проживання** (посвідка на постійне проживання) дає іноземцю право необмежено жити та працювати в Україні без щорічного продовження. Це крок до повної інтеграції: вільний в'їзд та виїзд, працевлаштування без окремого дозволу, доступ до банківських послуг та можливість подати на громадянство. Процедура вимагає ретельної підготовки — наше бюро забезпечує позитивний результат."
          },
          {
            type: "features",
            title: "Хто може отримати постійний дозвіл?",
            items: [
              {
                title: "Подружжя громадянина України",
                description: "Іноземець, одружений із громадянином України, після перебування на тимчасовому дозволі має право подати на ПМЖ. Ми документально підтверджуємо реальність шлюбу."
              },
              {
                title: "Іноземці з тимчасовим дозволом",
                description: "Після кількох років легального проживання на тимчасовій посвідці іноземець може подати заявку на постійне проживання."
              },
              {
                title: "Висококваліфіковані фахівці",
                description: "IT-спеціалісти, науковці та інші фахівці, затребувані на ринку праці, можуть отримати ПМЖ за спрощеною процедурою."
              },
              {
                title: "Інвестори в економіку України",
                description: "Іноземні інвестори, які вклали кошти в українську економіку, мають право на постійний дозвіл на пільгових умовах."
              }
            ]
          },
          {
            type: "markdown",
            content: "### Відмінності від тимчасового дозволу\n\nТимчасова посвідка видається на 1 рік із необхідністю щорічного продовження. Постійний дозвіл — безстроковий: ви отримуєте посвідку один раз і більше не турбуєтесь про продовження.\n\nКрім того, постійний дозвіл звільняє від необхідності мати окремий дозвіл на працевлаштування. Ви можете вільно влаштуватися на будь-яку роботу або вести підприємницьку діяльність нарівні з громадянами України.\n\n### Підстави відповідно до законодавства\n\nЗгідно із Законом України «Про імміграцію» (ст. 4), постійний дозвіл на проживання видається іноземцям, які:\n\n- Перебувають у шлюбі з громадянином України понад 2 роки\n- Є близькими родичами громадян України\n- Мають статус висококваліфікованого фахівця\n- Інвестували в економіку України у встановленому обсязі\n- Мають право на імміграцію відповідно до міжнародних угод\n\n### Чому важлива допомога адвоката?\n\nДержавна міграційна служба розглядає заявки на ПМЖ ретельніше, ніж на тимчасовий дозвіл. Потрібно довести реальність підстави (наприклад, реальність шлюбу), зібрати документи з України та з країни походження заявника, забезпечити правильний переклад та апостиль. Один некоректний документ — і справу повертають на доопрацювання."
          },
          {
            type: "stats",
            items: [
              { label: "Оформлено посвідок ПМЖ", value: "150+" },
              { label: "Успішність справ", value: "97%" },
              { label: "Середній строк", value: "2 міс." },
              { label: "Років роботи з ДМС", value: "10+" }
            ]
          },
          {
            type: "why_us",
            title: "Наші переваги у справах ПМЖ",
            items: [
              "Перевіряємо відповідність вашої ситуації вимогам Закону про імміграцію до подачі",
              "Збираємо повний комплект документів: апостиль, переклад, нотаріальне засвідчення",
              "Готуємо заявника до можливої співбесіди у ДМС",
              "Супроводжуємо процес від подачі до отримання посвідки на руки",
              "Консультуємо щодо подальших кроків: отримання громадянства, возз'єднання сім'ї"
            ]
          },
          {
            type: "alert",
            title: "Важливо: квота на імміграцію",
            content: "Україна встановлює щорічну квоту на імміграцію. Деякі категорії іноземців (подружжя громадян, інвестори) не підпадають під квоту. Ми визначимо вашу категорію та підготуємо заявку відповідно.",
            level: "info"
          },
          {
            type: "quote",
            text: "Постійний дозвіл — це не просто документ, це свобода жити в Україні без обмежень. Ми робимо цей процес максимально простим для наших клієнтів.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Закордонний паспорт (дійсний мінімум 1 рік)",
          "Поточна посвідка на тимчасове проживання (копія)",
          "Заява на імміграцію встановленого зразка",
          "Документ-підстава (свідоцтво про шлюб, контракт, інвестиційний договір тощо)",
          "Довідка про несудимість з країни громадянства (з апостилем та перекладом)",
          "Підтвердження фінансового забезпечення",
          "Документ про місце проживання в Україні",
          "4 фотокартки 3,5×4,5 см",
          "Квитанція про сплату адміністративного збору",
        ],
        processStepsUk: [
          { title: "Аналіз підстав", description: "Визначаємо, до якої категорії імміграції ви належите та чи не підпадаєте під квоту" },
          { title: "Збір документів", description: "Отримуємо та оформлюємо всі необхідні документи з України та з-за кордону" },
          { title: "Подання заявки", description: "Подаємо повний пакет до ДМС та супроводжуємо процес розгляду" },
          { title: "Отримання посвідки ПМЖ", description: "Після схвалення — отримання посвідки на постійне проживання" },
        ],
        faqUk: [
          { question: "Скільки часу займає оформлення постійного дозволу?", answer: "Стандартний строк розгляду — від 1 до 3 місяців з моменту подання повного пакета документів до ДМС." },
          { question: "Чи можна з постійним дозволом отримати громадянство?", answer: "Так, постійний дозвіл на проживання — одна з передумов для подання на громадянство України після 5 років безперервного проживання." },
          { question: "Чи може бути скасований постійний дозвіл?", answer: "За певних обставин — так: тривале перебування за кордоном (понад 6 місяців), вчинення тяжкого злочину або надання неправдивих даних." },
          { question: "Які переваги постійного дозволу порівняно з тимчасовим?", answer: "Постійний дозвіл безстроковий, не потребує щорічного продовження та звільняє від необхідності мати окремий дозвіл на працевлаштування." },
          { question: "Чи потрібно складати іспит з української мови?", answer: "Для постійного дозволу іспит не потрібен. Знання мови потрібне лише для отримання громадянства." }
        ],
      },
      {
        title: "Çalışma İzni",
        titleUk: "Дозвіл на працевлаштування",
        slug: "calisma-izni",
        shortDescription: "Ukrayna'da yasal çalışma izni başvurusu ve işveren prosedürleri",
        shortDescriptionUk: "Подання заявки на дозвіл на працевлаштування в Україні та процедури для роботодавців",
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
        durationUk: "7–15 робочих днів",
        metaTitleUk: "Дозвіл на працевлаштування іноземця в Україні | Адвокат Львів",
        metaDescriptionUk: "Оформлення дозволу на працевлаштування іноземця в Україні. Допомога роботодавцям та працівникам. Юридичний супровід у Львові. Безкоштовна консультація.",
        heroDescriptionUk: "Допомагаємо роботодавцям оформити дозвіл на працевлаштування іноземного працівника та супроводжуємо весь процес — від Центру зайнятості до отримання дозволу на проживання.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Легальне працевлаштування іноземця — захист для роботодавця і працівника",
            content: "**Дозвіл на працевлаштування іноземця** (дозвіл на використання праці іноземців) — обов'язковий документ для будь-якого іноземного працівника в Україні. Заявку подає роботодавець до Центру зайнятості. Порушення правил працевлаштування загрожує штрафами для компанії та депортацією працівника. Наше бюро у Львові забезпечує повний супровід процесу відповідно до чинного Кодексу законів про працю (КЗпП) та міграційного законодавства."
          },
          {
            type: "features",
            title: "Типи дозволів на працевлаштування",
            items: [
              {
                title: "Засновник / директор компанії",
                description: "Іноземець, який заснував ТОВ в Україні та є його директором, потребує дозволу на працевлаштування. Оформлюємо паралельно з реєстрацією компанії."
              },
              {
                title: "Висококваліфікований фахівець",
                description: "IT-спеціалісти, інженери, науковці — для них діють пільгові умови з мінімальною зарплатою. Допомагаємо обрати оптимальну категорію."
              },
              {
                title: "Внутрішньокорпоративний переведення",
                description: "Працівник міжнародної компанії, переведений із закордонного офісу до українського. Специфічна процедура з окремими вимогами."
              },
              {
                title: "Стандартний дозвіл",
                description: "Для будь-яких інших категорій іноземних працівників: кухарі, будівельники, менеджери — стандартна процедура через Центр зайнятості."
              }
            ]
          },
          {
            type: "markdown",
            content: "### Відповідальність роботодавця\n\nВідповідно до Закону України «Про зайнятість населення», роботодавець зобов'язаний отримати дозвіл ДО початку роботи іноземця. За працевлаштування без дозволу передбачені штрафи у розмірі 20 мінімальних зарплат за кожного працівника.\n\nМи допомагаємо роботодавцям:\n\n- Визначити правильну категорію дозволу\n- Підготувати трудовий договір відповідно до КЗпП\n- Розрахувати мінімальну заробітну плату для іноземця\n- Зібрати та подати повний пакет документів до Центру зайнятості\n\n### Процес отримання дозволу\n\nРоботодавець подає заявку до обласного Центру зайнятості. Строк розгляду — 7–15 робочих днів. Після отримання дозволу іноземець подає заявку на тимчасовий дозвіл на проживання до ДМС.\n\n### Помилки, яких варто уникати\n\nБагато компаній намагаються самостійно оформити дозвіл, допускаючи типові помилки: неправильний розрахунок мінімальної зарплати, невідповідність посади освіті працівника, помилки у трудовому договорі. Кожна така помилка — повернення документів та затримка на тижні."
          },
          {
            type: "stats",
            items: [
              { label: "Дозволів оформлено", value: "200+" },
              { label: "Компаній-клієнтів", value: "80+" },
              { label: "Середній строк", value: "10 днів" },
              { label: "Відмов через помилки", value: "0" }
            ]
          },
          {
            type: "why_us",
            title: "Чому роботодавці обирають нас?",
            items: [
              "Аналізуємо відповідність посади, освіти та досвіду іноземця — уникаємо відмов",
              "Готуємо трудовий договір відповідно до КЗпП із правильним розрахунком зарплати",
              "Подаємо документи до Центру зайнятості за довіреністю — роботодавець не витрачає часу",
              "Після отримання дозволу супроводжуємо оформлення тимчасового дозволу на проживання",
              "Консультуємо з питань податків та ЄСВ для іноземних працівників"
            ]
          },
          {
            type: "alert",
            level: "info",
            title: "Мінімальна зарплата для іноземця",
            content: "Відповідно до законодавства, іноземний працівник повинен отримувати зарплату не нижче визначеного мінімуму (залежить від категорії). Для висококваліфікованих фахівців діють пільгові умови. Ми розрахуємо оптимальну структуру компенсації."
          },
          {
            type: "quote",
            text: "Дозвіл на працевлаштування — це не формальність, а захист бізнесу від штрафів і працівника від депортації. Ми робимо цей процес прозорим і швидким.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Заява роботодавця встановленого зразка",
          "Проєкт трудового договору (двомовний)",
          "Паспорт працівника-іноземця з нотаріальним перекладом",
          "Диплом про освіту (з апостилем та перекладом)",
          "Документи про досвід роботи (з перекладом)",
          "Медична довідка",
          "Установчі документи компанії-роботодавця",
          "Квитанція про сплату збору",
        ],
        processStepsUk: [
          { title: "Консультація роботодавця", description: "Визначаємо категорію дозволу, перевіряємо відповідність посади та кваліфікації працівника" },
          { title: "Підготовка документів", description: "Готуємо повний пакет: трудовий договір, переклади, нотаріальне засвідчення дипломів" },
          { title: "Подання до Центру зайнятості", description: "Подаємо заявку та документи до обласного Центру зайнятості від імені роботодавця" },
          { title: "Дозвіл + посвідка", description: "Отримуємо дозвіл на працевлаштування та оформлюємо тимчасовий дозвіл на проживання" },
        ],
        faqUk: [
          { question: "Скільки часу займає отримання дозволу на працевлаштування?", answer: "Стандартний строк розгляду — 7–15 робочих днів з моменту подання повного пакета до Центру зайнятості." },
          { question: "На який строк видається дозвіл?", answer: "Дозвіл видається на строк дії трудового договору — зазвичай від 1 до 3 років із можливістю продовження." },
          { question: "Чи потрібен дозвіл засновнику-іноземцю?", answer: "Так, якщо іноземець є директором або виконує будь-які функції в компанії, він потребує дозволу на працевлаштування." },
          { question: "Хто подає заявку — працівник чи роботодавець?", answer: "Заявку подає роботодавець. Ми готуємо всі документи та подаємо за довіреністю від імені компанії." },
          { question: "Які штрафи за працевлаштування без дозволу?", answer: "Штраф для роботодавця — 20 мінімальних заробітних плат за кожного нелегально працевлаштованого іноземця. Для працівника — можлива депортація." }
        ],
      },
      {
        title: "Öğrenci Vizesi",
        titleUk: "Студентська віза",
        slug: "ogrenci-vizesi",
        shortDescription: "Ukrayna üniversitelerinde eğitim için öğrenci vizesi ve oturum izni",
        shortDescriptionUk: "Студентська віза та дозвіл на проживання для навчання в університетах України",
        icon: GraduationCap,
        category: "oturum-vize",
        metaTitle: "Ukrayna Öğrenci Vizesi | Üniversite Kayıt ve Oturum İşlemleri",
        metaDescription: "Ukrayna'da üniversite eğitimi için öğrenci vizesi nasıl alınır? Kayıt, kabul, vize ve oturum izni süreçleri hakkında kapsamlı rehber.",
        heroDescription: "Ukrayna'da üniversite eğitimi almak isteyen Türk öğrenciler için vize, oturum izni ve kayıt süreçleri.",
        content: `Ukrayna, uygun eğitim maliyetleri ve kaliteli üniversiteleriyle Türk öğrenciler için cazip bir eğitim destinasyonudur.

## Öğrenci Vizesi Süreci

Ukrayna üniversitelerine kabul alan Türk öğrencilerin eğitim amaçlı geçici oturum izni alması gerekmektedir. Bu süreçte üniversite kayıt işlemleri ve oturum izni başvurusu paralel olarak yürütülür.`,
          contentBlocks: [
            { type: "markdown", content: "### **Ukrayna Öğrenci Vizesi** ve Oturum İzni Süreçleri\n\nUkrayna, uygun eğitim maliyetleri ve kaliteli üniversiteleriyle Türk öğrenciler için cazip bir eğitim destinasyonudur. Üniversiteye kayıt olduktan sonra en önemli adım, yasal statünüzü güvence altına alacak olan öğrenci oturum izni başvurunuzdur.\n\nEksik belgelerle yapılan başvurular, okul kabulünüzün iptaline ve deport edilmenize varan ciddi sonuçlar doğurabilir. Alanında uzman avukat kadromuzla, kabul belgenizi almanızdan oturum kartınızı elinize alana dek tüm süreci yönetiyoruz." },
            { type: "stats", items: [ { label: "Başarı Oranı", value: "%100" }, { label: "Bürokraside Tasarruf", value: "Tam Zamanlı" }, { label: "Türk Öğrenci", value: "Yüzlerce" }, { label: "Hızlı Sonuç", value: "Garantili" } ] },
            { type: "why_us", title: "Öğrenci Vizelerinde Neden Bizi Tercih Etmelisiniz?", items: [ "Üniversite Koordinasyonu: Davet mektubu (kabul) aşamasından itibaren okul yetkilileriyle doğrudan iletişime geçiyoruz.", "Eksiksiz Belge Hazırlığı: Diploma denklikleri, apostil ve yeminli tercüme işlemlerini tek elden yönetiyoruz.", "Yasal Danışmanlık: Sadece oturum izni değil, Ukrayna'da yabancı öğrenci olarak sahip olduğunuz haklar konusunda tam rehberlik sağlıyoruz.", "Riskleri Sıfıra İndiriyoruz: Yanlış beyan veya evrak eksikliği sebebiyle alınabilecek ret kararlarının önüne geçiyoruz." ] },
            { type: "quote", text: "Geleceğinizi inşa ederken bürokratik engellerin hayallerinizi ertelemesine izin vermeyin. Eğitim hayatınıza güvenle başlayın, yasal süreçleri bize bırakın.", author: "Av. Lyudmyla Chubai" }
          ],
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
        durationUk: "2–4 тижні",
        metaTitleUk: "Студентська віза в Україну | Адвокат Львів",
        metaDescriptionUk: "Оформлення студентської візи та дозволу на проживання для іноземних студентів в Україні. Допомога з вступом до ВНЗ, документами та ДМС у Львові.",
        heroDescriptionUk: "Допомагаємо іноземним студентам оформити дозвіл на проживання для навчання в українських університетах. Повний супровід — від запрошення до посвідки.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Студентська віза — законне перебування під час навчання",
            content: "Іноземні студенти, зараховані до українських ВНЗ, повинні оформити **тимчасовий дозвіл на проживання** на підставі навчання. Без цього документа перебування в Україні після закінчення безвізового строку є незаконним. Наше бюро у Львові супроводжує процес від отримання запрошення до видачі посвідки у ДМС."
          },
          {
            type: "features",
            title: "Наші послуги для іноземних студентів",
            items: [
              { title: "Координація з ВНЗ", description: "Допомагаємо отримати запрошення на навчання (invitation letter) від акредитованого університету в Україні." },
              { title: "Підготовка документів", description: "Переклад дипломів, атестатів, медичних довідок із нотаріальним засвідченням та апостилем." },
              { title: "Подання до ДМС", description: "Запис на прийом до Державної міграційної служби у Львові та супровід при подачі біометрії." },
              { title: "Продовження посвідки", description: "Щорічне продовження тимчасового дозволу на весь строк навчання — без пропуску термінів." }
            ]
          },
          {
            type: "markdown",
            content: "### Порядок оформлення\n\nПісля зарахування до ВНЗ іноземний студент отримує запрошення, на підставі якого оформлює в'їзну візу типу D. Після прибуття в Україну необхідно протягом 30 днів подати документи до ДМС для отримання тимчасової посвідки на проживання.\n\nВажливо: пропуск строку подачі загрожує штрафом та ускладненням подальшого перебування.\n\n### Чому слід звернутися до адвоката?\n\nБагато студентів намагаються оформити документи самостійно через посередників або «агентства». Це призводить до помилок у перекладах, невідповідності документів вимогам і відмов. Як ліцензований адвокат у Львові, я гарантую юридичну коректність кожного документа."
          },
          {
            type: "stats",
            items: [
              { label: "Студентів оформлено", value: "100+" },
              { label: "Успішність", value: "100%" },
              { label: "Університетів-партнерів", value: "15+" },
              { label: "Строк оформлення", value: "2–4 тиж." }
            ]
          },
          {
            type: "quote",
            text: "Навчання за кордоном — це інвестиція у майбутнє. Моя задача — забезпечити, щоб бюрократія не стала перешкодою для ваших планів.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Запрошення на навчання від ВНЗ",
          "Закордонний паспорт (дійсний мінімум 1 рік)",
          "Атестат або диплом з нотаріальним перекладом",
          "Медична довідка та результат аналізу на ВІЛ",
          "Поліс медичного страхування",
          "Підтвердження фінансового забезпечення",
          "6 фотокарток 3,5×4,5 см",
          "Свідоцтво про народження (з перекладом)",
        ],
        processStepsUk: [
          { title: "Отримання запрошення", description: "Координуємо з ВНЗ, щоб ви отримали офіційне запрошення на навчання" },
          { title: "Підготовка документів", description: "Переклад, апостиль та нотаріальне засвідчення всіх необхідних документів" },
          { title: "Подання до ДМС", description: "Запис та подача документів до Державної міграційної служби у Львові" },
          { title: "Отримання посвідки", description: "Отримуємо тимчасову посвідку на проживання на весь строк навчання" },
        ],
        faqUk: [
          { question: "Якою мовою навчання в українських ВНЗ?", answer: "У багатьох університетах є програми англійською, українською або російською мовами. Вибір залежить від ВНЗ та спеціальності." },
          { question: "Чи може студент працювати в Україні?", answer: "Студенти з дозволом на проживання мають право на обмежену зайнятість — до 20 годин на тиждень під час навчання." },
          { question: "На який строк видається дозвіл?", answer: "Тимчасова посвідка видається на 1 рік із щорічним продовженням на весь строк навчання." },
          { question: "Що робити після закінчення навчання?", answer: "Після завершення ВНЗ посвідка втрачає чинність. Для продовження перебування потрібна інша підстава: працевлаштування, шлюб тощо." }
        ],
      },
      {
        title: "Vize Uzatma",
        titleUk: "Продовження візи",
        slug: "vize-uzatma",
        shortDescription: "Ukrayna vize süresinin uzatılması ve yasal kalış süresinin yönetimi",
        shortDescriptionUk: "Продовження терміну візи в Україні та управління легальним перебуванням",
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
          contentBlocks: [
            { type: "markdown", content: "### **Ukrayna Vize Uzatma** İşlemleri\n\nUkrayna'daki kalış süreniz esnasında beklenmedik durumlar, iş fırsatları veya eğitim gibi sebeplerle mevcut vizenizi ya da yasal sürenizi uzatmanız gerekebilir. Ukrayna Göç Dairesi yetkilileri, vize uzatma taleplerini çok sıkı bir şekilde incelemekte ve genellikle sadece kanıtlanmış olağanüstü durumlarda veya güçlü yasal zeminlerde kabul etmektedir.\n\nYasal kalış süresini bir gün dahi aşan yabancılar, hem para cezası ile karşılaşır hem de ülkeden sınır dışı edilme tehlikesi yaşarlar. Dosyanızın ve gerekçelerinizin doğru bir hukuki dille anlatılması şarttır." },
            { type: "why_us", title: "Vize Uzatma Başvurunuz Neden Profesyonellerle Yapılmalı?", items: [ "Gerekçelendirme: Kalışınızı uzatma sebebinizin yetkililer tarafından güçlü bulunması için kanıt niteliğindeki belgeler ve dilekçeler hazırlanır.", "Tam Uyumluluk: Ukrayna göçmenlik kanunlarının belirlediği dar çerçeve içinde %100 uyumlu bir rota belirlenir.", "Zamanlama: Vize bitmeden en geç 3 gün öncesine kadar yapılması gereken başvuruyu anında işleme alırız." ] },
            { type: "alert", level: "warning", title: "Kesin Kaçınılması Gerekenler", content: "Son güne bırakılan başvurular genellikle sistemsel gecikmelere takılmaktadır. Vizenizin biteceği günden en az iki hafta önce bizimle iletişime geçin." },
            { type: "quote", text: "Zamanında yapılmayan basit bir başvuru, Ukrayna'daki planlarınızı yıllarca sekteye uğratabilir. Bürokratik süreleri şansa bırakmayın.", author: "Av. Lyudmyla Chubai" }
          ],
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
        durationUk: "Індивідуально",
        metaTitleUk: "Продовження візи в Україні | Адвокат Львів",
        metaDescriptionUk: "Продовження терміну перебування іноземця в Україні. Легальні способи продовження візи, оформлення дозволу на проживання у Львові. Консультація адвоката.",
        heroDescriptionUk: "Допомагаємо іноземцям легально продовжити строк перебування в Україні — через оформлення візи, дозволу на проживання або зміну підстави перебування.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Не допустіть прострочення — продовжте перебування вчасно",
            content: "Прострочення легального строку перебування в Україні загрожує штрафом, забороною в'їзду та навіть примусовим видворенням. **Продовження візи** або оформлення дозволу на проживання — єдиний легальний спосіб залишитися в Україні після закінчення безвізового або візового строку. Наше бюро у Львові допоможе визначити оптимальний шлях та оформити все вчасно."
          },
          {
            type: "features",
            title: "Способи продовження перебування",
            items: [
              { title: "Оформлення тимчасового дозволу", description: "Якщо у вас є підстава (робота, навчання, шлюб) — оформлюємо дозвіл на проживання до закінчення безвізового строку." },
              { title: "Продовження візи типу D", description: "Для тих, хто має довгострокову візу і потребує її продовження через зміну обставин." },
              { title: "Зміна підстави перебування", description: "Якщо первинна підстава змінилася (наприклад, закінчилося навчання, але з'явилася робота) — переоформлюємо документи." },
              { title: "Екстрені ситуації", description: "Допомагаємо навіть у випадках, коли строк перебування вже прострочено — мінімізуємо наслідки." }
            ]
          },
          {
            type: "markdown",
            content: "### Безвізовий режим та його обмеження\n\nГромадяни багатьох країн можуть перебувати в Україні без візи до 90 днів протягом 180-денного періоду. Після закінчення цього строку іноземець зобов'язаний виїхати або мати дозвіл на проживання.\n\n### Важливі строки\n\nЗаявку на продовження необхідно подати ДО закінчення легального строку перебування. ДМС не приймає заявки від осіб, які вже порушили міграційне законодавство. Ми рекомендуємо звертатися за 2–3 тижні до закінчення строку.\n\n### Наслідки прострочення\n\nЗгідно із Кодексом України про адміністративні правопорушення (ст. 203), порушення строку перебування карається:\n\n- Штрафом від 3 400 до 5 100 грн\n- Примусовим видворенням\n- Забороною в'їзду на строк до 5 років"
          },
          {
            type: "alert",
            level: "warning",
            title: "Не чекайте останнього дня!",
            content: "Подання заявки в останній день строку часто призводить до відмови через системні затримки. Зверніться до нас щонайменше за 14 днів до закінчення легального перебування."
          },
          {
            type: "quote",
            text: "Один прострочений день може коштувати п'ять років заборони в'їзду. Не ризикуйте — зверніться вчасно.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Закордонний паспорт зі штампом про в'їзд",
          "Документи-підстави для продовження (трудовий договір, запрошення ВНЗ, свідоцтво про шлюб тощо)",
          "Поліс медичного страхування",
          "Документ про місце проживання",
          "Підтвердження фінансового забезпечення",
          "Квитанція про сплату збору",
        ],
        processStepsUk: [
          { title: "Оцінка ситуації", description: "Визначаємо поточний статус, строки та оптимальний спосіб продовження перебування" },
          { title: "Вибір стратегії", description: "Обираємо між продовженням візи, оформленням дозволу на проживання або зміною підстави" },
          { title: "Підготовка та подання", description: "Готуємо та подаємо всі необхідні документи до ДМС у Львові" },
          { title: "Отримання документа", description: "Отримуємо продовжену візу або посвідку на проживання" },
        ],
        faqUk: [
          { question: "Що буде, якщо прострочити строк перебування?", answer: "Прострочення загрожує штрафом від 3 400 грн, можливим примусовим видворенням та забороною в'їзду до України на строк до 5 років." },
          { question: "За скільки днів до закінчення візи слід звернутися?", answer: "Рекомендуємо звертатися за 2–3 тижні до закінчення строку. Це дає достатньо часу для підготовки та подання документів." },
          { question: "Чи можна продовжити безвізове перебування?", answer: "Безвізовий строк не продовжується. Для легального перебування понад 90 днів необхідно оформити дозвіл на проживання на відповідній підставі." },
          { question: "Якщо строк вже прострочено — що робити?", answer: "Зверніться негайно. Ми допоможемо мінімізувати наслідки: сплатити штраф, оформити виїзд або знайти законну підставу для легалізації перебування." }
        ],
      },
    ],
  },
  {
    title: "Aile & Kişisel Hukuk",
    titleUk: "Сімейне та особисте право",
    services: [
      {
        title: "Evlilik İşlemleri",
        titleUk: "Оформлення шлюбу",
        slug: "evlilik-islemleri",
        shortDescription: "Ukrayna'da Türk vatandaşlarının evlilik başvurusu ve nikah işlemleri",
        shortDescriptionUk: "Подання заявки на шлюб та оформлення реєстрації для громадян Туреччини в Україні",
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
        durationUk: "1–30 днів",
        metaTitleUk: "Реєстрація шлюбу з іноземцем у Львові | Адвокат Чубай",
        metaDescriptionUk: "Шлюб з іноземцем в Україні: документи для ДРАЦС, апостиль, переклад. Реєстрація шлюбу у Львові — від підготовки документів до церемонії. Юридичний супровід.",
        heroDescriptionUk: "Повний юридичний супровід реєстрації шлюбу з іноземцем у Львові — від збору та легалізації документів до подання заяви в ДРАЦС та проведення церемонії.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Шлюб з іноземцем у Львові — крок за кроком",
            content: "Реєстрація шлюбу з іноземцем вимагає значно більшого пакету документів, ніж звичайний шлюб між громадянами України. Потрібні **апостилі, нотаріальні переклади, довідки про сімейний стан** з країни іноземця. Навіть незначна помилка у документах може стати причиною відмови ДРАЦС. Наше бюро у Львові щороку супроводжує десятки таких шлюбів і знає всі деталі процедури."
          },
          {
            type: "features",
            title: "Що входить до нашого супроводу",
            items: [
              { title: "Перевірка документів", description: "Аналізуємо паспорт, свідоцтва та довідки іноземця, визначаємо, які документи потрібно додатково оформити." },
              { title: "Апостиль та легалізація", description: "Забезпечуємо проставлення апостиля або консульську легалізацію документів з-за кордону." },
              { title: "Нотаріальний переклад", description: "Організовуємо переклад документів українською мовою з нотаріальним засвідченням у сертифікованих перекладачів." },
              { title: "Подання заяви до ДРАЦС", description: "Подаємо заяву, вирішуємо будь-які запитання реєстратора, погоджуємо дату церемонії." }
            ]
          },
          {
            type: "markdown",
            content: "### Які документи потрібні від іноземця\n\nВідповідно до ст. 28 Сімейного кодексу України, для реєстрації шлюбу з іноземцем необхідні:\n\n1. **Паспорт** (закордонний) з нотаріальним перекладом\n2. **Довідка про сімейний стан** — видається компетентним органом країни громадянства. Повинна підтверджувати, що особа не перебуває у шлюбі.\n3. **Свідоцтво про народження** з апостилем та перекладом\n4. **Документ про розірвання попереднього шлюбу** (якщо був) — свідоцтво про розлучення або рішення суду з апостилем\n5. **Довідка про місце реєстрації/проживання** в Україні\n\n### Процедура реєстрації\n\nЗаява подається особисто обома нареченими до ДРАЦС (Відділ реєстрації актів цивільного стану). Стандартний строк очікування — **1 місяць** з дати подання заяви. Однак закон передбачає можливість **скорочення строку** за наявності поважних причин (вагітність, від'їзд одного з наречених тощо).\n\n### Прискорена процедура\n\nЗа необхідності шлюб може бути зареєстрований у **день подання заяви**. Для цього необхідно подати обґрунтоване клопотання. Наше бюро допоможе підготувати всі документи для прискореної процедури."
          },
          {
            type: "alert",
            level: "info",
            title: "Визнання шлюбу за кордоном",
            content: "Шлюб, зареєстрований в Україні, визнається в більшості країн світу. Однак для деяких країн може знадобитися додаткова легалізація свідоцтва — проставлення апостиля та консульське підтвердження."
          },
          {
            type: "stats",
            items: [
              { value: "200+", label: "Шлюбів з іноземцями оформлено" },
              { value: "1 день", label: "Можлива прискорена реєстрація" },
              { value: "100%", label: "Успішних реєстрацій" },
              { value: "30+", label: "Країн походження подружжя" }
            ]
          },
          {
            type: "quote",
            text: "Правильно підготовлені документи — запорука реєстрації шлюбу без зайвих затримок. Ми знаємо вимоги кожного ДРАЦС у Львівській області.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Закордонний паспорт іноземця з нотаріальним перекладом",
          "Довідка про сімейний стан з апостилем",
          "Свідоцтво про народження з апостилем та перекладом",
          "Паспорт громадянина України (другого з подружжя)",
          "Документ про розірвання попереднього шлюбу (за наявності)",
          "Фотографії",
          "Квитанція про сплату адміністративного збору",
        ],
        processStepsUk: [
          { title: "Аналіз документів", description: "Перевіряємо наявні документи іноземця та складаємо перелік необхідних додаткових" },
          { title: "Легалізація та переклад", description: "Забезпечуємо апостилювання, переклад та нотаріальне засвідчення документів" },
          { title: "Подання заяви до ДРАЦС", description: "Подаємо заяву про реєстрацію шлюбу, узгоджуємо дату церемонії" },
          { title: "Реєстрація шлюбу", description: "Супроводжуємо на церемонії, отримуємо свідоцтво про шлюб, за потреби — апостиль для використання за кордоном" },
        ],
        faqUk: [
          { question: "Чи визнається шлюб, укладений в Україні, за кордоном?", answer: "Так. Шлюб, зареєстрований в Україні, визнається у більшості країн. За потреби ми допоможемо легалізувати свідоцтво для конкретної країни." },
          { question: "Скільки часу займає реєстрація шлюбу з іноземцем?", answer: "Від 1 дня (за прискореною процедурою) до 30 днів (стандартний строк). Підготовка документів зазвичай займає 1–2 тижні." },
          { question: "Чи потрібна віза для реєстрації шлюбу?", answer: "Іноземець повинен перебувати в Україні легально. Безвізового строку достатньо для подання заяви та реєстрації шлюбу." },
          { question: "Що робити, якщо документи не українською мовою?", answer: "Усі іноземні документи потребують нотаріального перекладу українською. Ми організовуємо переклад через сертифікованих перекладачів у Львові." },
          { question: "Чи можна зареєструвати шлюб без особистої присутності?", answer: "Ні. Обидва наречені повинні бути особисто присутніми при подачі заяви та на церемонії реєстрації." }
        ],
      },
      {
        title: "Boşanma",
        titleUk: "Розлучення",
        slug: "bosanma",
        shortDescription: "Ukrayna'da boşanma davası, anlaşmalı ve çekişmeli boşanma süreçleri",
        shortDescriptionUk: "Справа про розлучення в Україні, за згодою та спірне розлучення",
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
            author: "Av. Lyudmyla Chubai"
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
        durationUk: "1–6 місяців",
        metaTitleUk: "Розлучення в Україні | Адвокат у Львові — Чубай",
        metaDescriptionUk: "Розлучення за згодою та через суд у Львові. Поділ майна, аліменти, опіка. Повний юридичний супровід справи про розлучення. Консультація адвоката.",
        heroDescriptionUk: "Професійний юридичний супровід процедури розлучення у Львові — від подачі заяви через ДРАЦС або суд до поділу майна та визначення місця проживання дітей.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Розлучення у Львові — захист ваших прав",
            content: "Розлучення — складний юридичний та емоційний процес. В Україні розлучення можливе через **ДРАЦС** (за взаємною згодою, якщо немає спільних неповнолітніх дітей) або через **суд** (за наявності дітей чи спору). Наше бюро у Львові допоможе обрати оптимальний шлях та захистити ваші інтереси на кожному етапі."
          },
          {
            type: "features",
            title: "Наші послуги при розлучення",
            items: [
              { title: "Розлучення за згодою (ДРАЦС)", description: "Якщо обидва з подружжя згодні і немає спільних неповнолітніх дітей — оформлюємо через ДРАЦС за 1 місяць." },
              { title: "Розлучення через суд", description: "За наявності дітей, спору про майно або незгоди другого з подружжя — представляємо інтереси в суді." },
              { title: "Поділ майна", description: "Визначення часток у спільному майні подружжя: нерухомість, бізнес, транспорт, рахунки." },
              { title: "Аліменти та місце проживання дітей", description: "Визначення розміру аліментів, графіку спілкування та місця проживання дитини." }
            ]
          },
          {
            type: "markdown",
            content: "### Процедура розлучення в Україні\n\nВідповідно до Сімейного кодексу України (ст. 105–120):\n\n**Через ДРАЦС** — можливе за взаємною згодою подружжя без спільних неповнолітніх дітей. Заява подається спільно, розлучення оформлюється через 1 місяць.\n\n**Через суд** — обов'язкове, якщо:\n- Є спільні неповнолітні діти\n- Один з подружжя не згоден на розлучення\n- Є спір про поділ майна\n\n### Поділ майна при розлучення\n\nМайно, набуте під час шлюбу, є спільною сумісною власністю і ділиться порівну (ст. 60 СКУ). Однак суд може відступити від рівності часток з урахуванням інтересів дітей або інших обставин.\n\n### Міжнародне розлучення\n\nЯкщо один із подружжя є іноземцем — рішення українського суду визнається за кордоном через процедуру визнання та виконання судових рішень. Ми допомагаємо з усіма етапами."
          },
          {
            type: "stats",
            items: [
              { value: "300+", label: "Справ про розлучення" },
              { value: "1 міс.", label: "Мінімальний строк за згодою" },
              { value: "95%", label: "Успішних результатів" },
              { value: "10+ років", label: "Досвіду у сімейному праві" }
            ]
          },
          {
            type: "quote",
            text: "Розлучення — не кінець, а початок нового етапу. Наше завдання — зробити цей перехід максимально швидким і безболісним з юридичного боку.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Свідоцтво про шлюб (оригінал)",
          "Паспорти обох з подружжя",
          "Свідоцтва про народження дітей (за наявності)",
          "Документи на спільне майно (за наявності спору)",
          "Заява про розлучення",
        ],
        processStepsUk: [
          { title: "Консультація", description: "Оцінюємо ситуацію, визначаємо оптимальний спосіб розлучення (ДРАЦС чи суд)" },
          { title: "Підготовка документів", description: "Складаємо заяву, збираємо необхідні документи, готуємо позовну заяву (при судовому розлучення)" },
          { title: "Ведення справи", description: "Подаємо заяву, представляємо інтереси у суді, ведемо переговори з другою стороною" },
          { title: "Оформлення результату", description: "Отримуємо рішення суду або свідоцтво про розлучення, за потреби — виконавчий лист" },
        ],
        faqUk: [
          { question: "Скільки коштує розлучення у Львові?", answer: "Вартість залежить від складності справи. Розлучення за згодою через ДРАЦС — від 3 000 грн, через суд — від 8 000 грн. Точну вартість визначаємо після консультації." },
          { question: "Чи можна розлучитися без згоди другого з подружжя?", answer: "Так. Через суд можна розлучитися навіть без згоди другої сторони. Суд може надати строк для примирення до 6 місяців." },
          { question: "Як ділиться майно при розлучення?", answer: "Спільне майно ділиться порівну. Суд може відступити від рівності часток з урахуванням інтересів дітей або внеску кожного з подружжя." },
          { question: "Чи потрібно з'являтися в суд особисто?", answer: "Ні. Ви можете видати довіреність адвокату, і ми представлятимемо ваші інтереси без вашої присутності." }
        ],
      },
      {
        title: "Velayet",
        titleUk: "Опіка над дітьми",
        slug: "velayet",
        shortDescription: "Çocuk velayeti, nafaka ve aile hukuku davaları",
        shortDescriptionUk: "Справи про опіку над дітьми, аліменти та сімейне право",
        icon: Users,
        category: "aile-kisisel",
        metaTitle: "Ukrayna'da Velayet Davası | Çocuk Hakları ve Nafaka",
        metaDescription: "Ukrayna'da çocuk velayeti nasıl belirlenir? Velayet hakları, nafaka ve çocuğun üstün yararı prensibi hakkında bilgi.",
        heroDescription: "Çocuğunuzun hakları ve geleceği için velayet süreçlerinde profesyonel hukuki temsil sağlıyoruz.",
        content: `Çocuk velayeti davaları, aile hukukunun en hassas konularından biridir. Ukrayna hukuku, tüm kararlarda çocuğun üstün yararını esas almaktadır.`,
          contentBlocks: [
            { type: "markdown", content: "### **Ukrayna'da Velayet** ve Çocuk Hakları\n\nBoşanma sürecinin şüphesiz en hassas ve duygusal noktası, müşterek çocukların velayetidir. Ukrayna Aile Kanunu, velayet davalarında 'çocuğun üstün yararını' temel alır. Mahkemeler, anne ve babanın yaşam koşullarını, gelir durumlarını ve psikolojik stabilizasyonlarını detaylıca inceler.\n\nYabancı ülke vatandaşı ebeveynler için bu süreç, uluslararası çocuk kaçırma yasaları ve yerel dinamikler nedeniyle ekstra zorlayıcı olabilir. Ukrayna'daki yasal haklarınızı sonuna kadar savunmak, çocuğunuzla kopmaz bir bağ kurmanız için elimizden gelen tüm hukuki mücadaleyi veririz." },
            { type: "stats", items: [ { label: "Çocuğun Üstün Yararı", value: "Odak Noktası" }, { label: "Psikolojik Destek", value: "Rehberlik" }, { label: "Düzenli Görüşme", value: "Garantili" }, { label: "Mahkeme Süreci", value: "Şeffaf" } ] },
            { type: "why_us", title: "Velayet Savaşında Neden Aile Avukatınız Biz Olmalıyız?", items: [ "Duygusal Tarafsızlık, Hukuki Keskinlik: Duygusal olarak en yıprandığınız anlarda yasal haklarınızı koruyan, soğukkanlı ve rasyonel hamleler yapıyoruz.", "Pedagojik Yaklaşım: Mahkeme sürecinde çocuk psikolojisine zarar verebilecek çatışmaları minimize edecek diyalog yolları inşa ediyoruz.", "Nafaka ve Ziyaret Hakları: Yalnızca velayeti değil, nafaka oranının tespiti ve görüşme takviminin adil belirlenmesini sağlıyoruz." ] },
            { type: "quote", text: "Bir çocuğun tebessümü her hukuk zaferinden daha değerlidir. Gelin bu karmaşık süreci, çocuğunuzun geleceğini koruyacak şekilde yönetelim.", author: "Av. Lyudmyla Chubai" }
          ],
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
        durationUk: "2–6 місяців",
        metaTitleUk: "Опіка над дітьми | Адвокат у Львові — Чубай",
        metaDescriptionUk: "Опіка над дітьми, визначення місця проживання, аліменти. Захист прав дитини у суді. Адвокат з сімейного права у Львові.",
        heroDescriptionUk: "Захищаємо права дітей та батьків у справах про опіку, визначення місця проживання дитини, графік спілкування та стягнення аліментів.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Справи про опіку — інтереси дитини понад усе",
            content: "Спори про опіку над дітьми — найскладніші та найемоційніші справи у сімейному праві. Відповідно до Сімейного кодексу України, суд завжди керується **найкращими інтересами дитини**. Наше бюро у Львові має великий досвід у таких справах і забезпечує захист прав як дитини, так і батьків."
          },
          {
            type: "features",
            title: "Що ми вирішуємо",
            items: [
              { title: "Визначення місця проживання дитини", description: "Суд визначає, з ким із батьків проживатиме дитина, враховуючи вік, стосунки з батьками та умови життя." },
              { title: "Графік спілкування з дитиною", description: "Встановлюємо чіткий графік зустрічей того з батьків, хто проживає окремо." },
              { title: "Стягнення аліментів", description: "Визначаємо розмір аліментів — у частці від доходу або у фіксованій грошовій сумі." },
              { title: "Позбавлення батьківських прав", description: "У випадках жорстокого поводження, алкоголізму, ухилення від обов'язків — захищаємо дитину через позбавлення або обмеження прав." }
            ]
          },
          {
            type: "markdown",
            content: "### Як суд приймає рішення про опіку\n\nСтаття 161 Сімейного кодексу визначає критерії:\n\n1. **Вік дитини** — діти до 10 років зазвичай залишаються з матір'ю, якщо немає виняткових обставин\n2. **Думка дитини** — дитина старше 10 років має право висловити свою думку в суді\n3. **Умови проживання** — суд оцінює житлові умови кожного з батьків\n4. **Матеріальне забезпечення** — доходи та можливість забезпечити потреби дитини\n5. **Моральний клімат** — ставлення до дитини, виховання, зв'язок\n\n### Аліменти в Україні\n\nЗгідно зі ст. 183 СКУ, аліменти призначаються:\n- **У частці від доходу**: 1/4 на одну дитину, 1/3 на двох, 1/2 на трьох і більше\n- **У фіксованій сумі**: якщо дохід нестабільний або неможливо визначити\n- **Мінімальний розмір**: 50% прожиткового мінімуму на дитину відповідного віку\n\n### Виконання рішень\n\nЯкщо один з батьків не виконує рішення суду (не повертає дитину, не сплачує аліменти) — ми забезпечуємо примусове виконання через виконавчу службу."
          },
          {
            type: "stats",
            items: [
              { value: "200+", label: "Справ про опіку" },
              { value: "98%", label: "Успішних результатів" },
              { value: "Від 10 років", label: "Думка дитини враховується" },
              { value: "50%", label: "Мін. прожиткового мінімуму — аліменти" }
            ]
          },
          {
            type: "quote",
            text: "У справах про дітей немає переможців і переможених — є лише інтереси дитини, які мають бути захищені.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Свідоцтво про народження дитини",
          "Свідоцтво про шлюб / розлучення",
          "Довідки про доходи обох батьків",
          "Документ, що підтверджує місце проживання",
          "Характеристика з місця роботи / навчання",
          "Висновок органу опіки та піклування (за потреби)",
        ],
        processStepsUk: [
          { title: "Консультація", description: "Аналізуємо ситуацію, визначаємо правову позицію та стратегію захисту" },
          { title: "Підготовка позову", description: "Складаємо позовну заяву, збираємо докази, готуємо документи" },
          { title: "Судовий процес", description: "Представляємо інтереси в суді, працюємо з органом опіки" },
          { title: "Виконання рішення", description: "Забезпечуємо виконання рішення суду, за потреби — через виконавчу службу" },
        ],
        faqUk: [
          { question: "З якого віку дитина може самостійно обирати, з ким жити?", answer: "З 14 років дитина має право самостійно визначити місце проживання. З 10 років — суд зобов'язаний врахувати думку дитини." },
          { question: "Чи може батько забрати дитину без згоди матері?", answer: "Ні. Без рішення суду обидва батьки мають рівні права. Самовільне утримання дитини є порушенням закону." },
          { question: "Як стягнути аліменти, якщо батько не працює офіційно?", answer: "Суд може призначити аліменти у фіксованій сумі, незалежно від офіційного працевлаштування." },
          { question: "Чи можна змінити рішення суду про опіку?", answer: "Так. При зміні обставин (переїзд, зміна доходу, поведінка батька) можна подати новий позов про зміну порядку опіки." }
        ],
      },
      {
        title: "Aile Birleşimi",
        titleUk: "Воззʼєднання сімʼї",
        slug: "aile-birlesimi",
        shortDescription: "Ukrayna'da aile birleşimi yoluyla oturum izni başvurusu",
        shortDescriptionUk: "Подання заявки на дозвіл на проживання шляхом воззʼєднання сімʼї в Україні",
        icon: Users,
        category: "aile-kisisel",
        metaTitle: "Ukrayna Aile Birleşimi | Oturum İzni Başvurusu",
        metaDescription: "Ukrayna'da aile birleşimi yoluyla oturum izni nasıl alınır? Eş, çocuk ve ebeveyn birleşimi süreçleri hakkında detaylı bilgi.",
        heroDescription: "Ailenizle Ukrayna'da birlikte yaşamak için aile birleşimi oturum izni süreçlerini yönetiyoruz.",
        content: `Aile birleşimi, Ukrayna'da yasal olarak ikamet eden veya vatandaşlığa sahip kişilerin yakın aile üyelerini yanlarına getirmelerine olanak tanıyan yasal bir süreçtir.`,
          contentBlocks: [
            { type: "markdown", content: "### **Ukrayna Aile Birleşimi** ile Birlikte Yaşama Hakkı\n\nUkrayna vatandaşı veya Ukrayna’da kalıcı oturum izni sahibi biriyle evliyseniz, ailenizi tek bir çatı altında toplamak en doğal hakkınızdır. Ancak bu hakka kavuşmak, devasa bir evrak silsilesini ve bürokratik engelleri aşmayı gerektirir.\n\nHem eşinizin hem de varsa çocuklarınızın Ukrayna'da rahat, güvenli ve legal bir statüde yaşayabilmeleri için D tipi vize başvurusundan, oturum rozeti alım sürecine kadar tüm adımları hızlı, eksiksiz ve en güvenilir şekilde koordine ediyoruz." },
            { type: "stats", items: [ { label: "Aile Dosyaları", value: "Sıfır Hata" }, { label: "Memuriyette Zaman", value: "En Aza İner" }, { label: "Güven ve Şeffaflık", value: "%100" } ] },
            { type: "why_us", title: "Neden Birlikte Çalışmalıyız?", items: [ "Bürokrasisiz Geçiş: Onlarca belgeyi tercüme, apostil, onay üçgeninde yorulmadan sonuçlandırıyoruz.", "Memurlarla Etkili İletişim: Göç idaresinin dilinden anlayan bir yaklaşımla sürecin uzamasını engelliyoruz.", "Daimi Statüye Doğru: Aile birleşimiyle başlayan sürecinizi ileride Ukrayna Vatandaşlığına kadar taşıyacak bir master plan çiziyoruz." ] },
            { type: "quote", text: "Ailenizle olan birliğiniz sınırlarla bölünemez. Yasal boşlukları fırsata çevirerek ailenizi en kısa sürede bir araya getiriyoruz.", author: "Av. Lyudmyla Chubai" }
          ],
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
        durationUk: "1–3 місяці",
        metaTitleUk: "Возз'єднання сім'ї в Україні | Адвокат Львів",
        metaDescriptionUk: "Оформлення дозволу на проживання для возз'єднання сім'ї в Україні. Документи для ДМС, віза типу D, посвідка на проживання. Юридичний супровід у Львові.",
        heroDescriptionUk: "Допомагаємо іноземцям отримати дозвіл на проживання в Україні на підставі возз'єднання сім'ї — підготовка документів, подача до ДМС, отримання посвідки.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Возз'єднання сім'ї — право жити разом в Україні",
            content: "Якщо ваш чоловік, дружина, батьки або діти є іноземцями — вони мають право отримати **дозвіл на тимчасове проживання** в Україні на підставі возз'єднання сім'ї (ст. 4 Закону «Про імміграцію»). Це один із найпоширеніших способів легалізації іноземних членів сім'ї. Наше бюро у Львові щороку супроводжує десятки таких справ."
          },
          {
            type: "features",
            title: "Хто може скористатися",
            items: [
              { title: "Подружжя", description: "Чоловік або дружина громадянина України або особи з посвідкою на постійне проживання." },
              { title: "Неповнолітні діти", description: "Діти до 18 років, якщо один із батьків легально проживає в Україні." },
              { title: "Батьки", description: "Непрацездатні батьки громадян України, які потребують догляду." },
              { title: "Інші випадки", description: "Опікуни, утримувані особи та інші родичі, визначені законом." }
            ]
          },
          {
            type: "markdown",
            content: "### Процедура оформлення\n\n1. **Збір документів** — паспорт іноземця, документи, що підтверджують родинний зв'язок (свідоцтво про шлюб/народження), довідка про місце проживання запрошуючої сторони\n2. **Отримання візи типу D** — для в'їзду в Україну з метою возз'єднання сім'ї (якщо країна іноземця вимагає візу)\n3. **Подача заяви до ДМС** — протягом 15 днів після прибуття до України\n4. **Отримання посвідки** — тимчасова посвідка на проживання видається на 1 рік з правом продовження\n\n### Важливі нюанси\n\n- Шлюб повинен бути дійсним і не фіктивним — ДМС може перевіряти\n- Запрошуюча сторона повинна мати достатній дохід та житло\n- Документи з-за кордону потребують апостиля та нотаріального перекладу\n- Після 2 років проживання можна подати на ПМЖ\n\n### Відмова та оскарження\n\nВипадки відмови ДМС — не рідкість. Найчастіші причини: неповний пакет документів, сумнів у дійсності шлюбу, недостатнє фінансове забезпечення. Ми допомагаємо оскаржити відмову в адміністративному суді."
          },
          {
            type: "stats",
            items: [
              { value: "150+", label: "Справ з возз'єднання" },
              { value: "1 рік", label: "Термін першої посвідки" },
              { value: "15 днів", label: "Строк подачі після прибуття" },
              { value: "97%", label: "Успішних результатів" }
            ]
          },
          {
            type: "alert",
            level: "info",
            title: "Після возз'єднання — шлях до ПМЖ",
            content: "Через 2 роки проживання за тимчасовою посвідкою на підставі возз'єднання сім'ї можна подати заяву на постійне місце проживання (ПМЖ). Ми супроводжуємо цей процес від початку до кінця."
          },
          {
            type: "quote",
            text: "Сім'я має бути разом. Ми робимо все, щоб бюрократичні перешкоди не стояли на заваді вашому праву жити поруч із близькими.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Закордонний паспорт іноземного члена сім'ї",
          "Документ, що підтверджує родинний зв'язок (свідоцтво про шлюб, народження)",
          "Паспорт запрошуючої сторони (громадянина України)",
          "Довідка про місце реєстрації запрошуючої сторони",
          "Довідка про доходи запрошуючої сторони",
          "Поліс медичного страхування",
          "Фотографії",
          "Квитанція про сплату адміністративного збору",
        ],
        processStepsUk: [
          { title: "Перевірка підстав", description: "Визначаємо, чи відповідає ситуація вимогам возз'єднання сім'ї, аналізуємо документи" },
          { title: "Підготовка пакету", description: "Збираємо, перекладаємо та легалізуємо необхідні документи" },
          { title: "Подача до ДМС", description: "Подаємо заяву та документи до територіального підрозділу ДМС у Львові" },
          { title: "Отримання посвідки", description: "Отримуємо посвідку на тимчасове проживання, реєструємо місце проживання" },
        ],
        faqUk: [
          { question: "Чи можна оформити возз'єднання без шлюбу?", answer: "Возз'єднання сім'ї можливе лише для офіційних членів сім'ї: подружжя, неповнолітні діти, непрацездатні батьки. Фактичний шлюб (співжиття) не є підставою." },
          { question: "Скільки часу займає оформлення?", answer: "Від подання заяви до отримання посвідки — зазвичай 1–3 місяці. Підготовка документів може додати 2–4 тижні." },
          { question: "Чи може ДМС відмовити?", answer: "Так. Основні причини: неповний пакет документів, підозра на фіктивний шлюб, недостатній дохід запрошуючої сторони. Ми допомагаємо оскаржити відмову." },
          { question: "Чи можна працювати з посвідкою на возз'єднання?", answer: "Так. Тимчасова посвідка на проживання дає право працювати в Україні без додаткового дозволу на працевлаштування." }
        ],
      },
      {
        title: "Vatandaşlık",
        titleUk: "Громадянство",
        slug: "vatandaslik",
        shortDescription: "Ukrayna vatandaşlığı başvurusu ve doğal yoldan vatandaşlık edinme",
        shortDescriptionUk: "Подання заявки на громадянство України та натуралізація",
        icon: Globe,
        category: "aile-kisisel",
        metaTitle: "Ukrayna Vatandaşlığı | Başvuru Şartları ve Süreç",
        metaDescription: "Ukrayna vatandaşlığı nasıl alınır? Vatandaşlık başvuru şartları, gerekli belgeler ve süreç hakkında kapsamlı rehber.",
        heroDescription: "Ukrayna vatandaşlığı edinme sürecinde başvuru şartlarından vatandaşlık yeminine kadar tüm adımlarda yanınızdayız.",
        content: `Ukrayna vatandaşlığı, belirli koşulları karşılayan yabancı uyruklulara açıktır. Vatandaşlık başvurusu kapsamlı bir süreç olup, profesyonel rehberlik büyük önem taşır.`,
          contentBlocks: [
            { type: "markdown", content: "### **Ukrayna Vatandaşlığına** Geçiş ve Sürekli Oturum\n\nUkrayna vatandaşlığı almak, sadece bir pasaport elde etmek değil, tüm Avrupa'ya açılan yeni nesil bir entegrasyondur. Ukrayna kanunlarına göre vatandaşlık ediniminin çeşitli yolları (evlilik, yatırımlar, soy bağı vb.) bulunur ancak bu süreç devlet başkanlığı kararnamesine kadar uzanan, spesifik ve uzun bir maratondur.\n\nDosya hazırlığında yapılacak herhangi bir hata, beklediğiniz yılları boşa çıkarabilir. Sürecin tüm komisyon aşamalarını, dil sınavını ve idari testleri hesaba katarak en başından kusursuz bir başvuru paketi hazırlıyoruz." },
            { type: "stats", items: [ { label: "Dosya Güvenilirliği", value: "%100" }, { label: "Aşama Takibi", value: "Adım Adım" }, { label: "Referans", value: "Güçlü Başarı" }, { label: "Başvurular", value: "Eksiksiz" } ] },
            { type: "why_us", title: "Ukrayna Vatandaşlık Bürokrasisini Nasıl Aşıyoruz?", items: [ "Bireysel Analiz: Durumunuzu (yatırımcı mısınız, eş misiniz, köken bağı mı var?) analiz edip en kısa rotayı çiziyoruz.", "Dil Sınavı Rehberliği: Ukrayna dili ve tarihi testleri için pratik yönlendirmelerde bulunuyoruz.", "Üst Düzey Takibi: Evrakların komisyonlarda ve devlet makamlarındaki onay süreçlerini bizzat takip ediyoruz." ] },
            { type: "quote", text: "Vatandaşlık süreci uzun bir maratondur, doğru rehberle koşarsanız eninde sonunda bitiş çizgisine, kusursuz ulaşırsınız.", author: "Av. Lyudmyla Chubai" }
          ],
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
        durationUk: "6–12 місяців",
        metaTitleUk: "Громадянство України | Натуралізація — Адвокат Львів",
        metaDescriptionUk: "Отримання громадянства України через натуралізацію, шлюб, поновлення. Підготовка документів, мовний іспит, супровід у Львові. Адвокат Чубай.",
        heroDescriptionUk: "Повний юридичний супровід процедури набуття громадянства України — від перевірки підстав та підготовки документів до складання присяги громадянина.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Громадянство України — шлях до повноцінної інтеграції",
            content: "Набуття громадянства України відкриває доступ до **виборчого права, безвізових подорожей, соціальних гарантій** та повноцінної участі в суспільному житті. Процедура натуралізації включає мовний іспит, перевірку легальності проживання, відмову від попереднього громадянства та прийняття рішення Президентом. Наше бюро у Львові забезпечує бездоганну підготовку на кожному етапі."
          },
          {
            type: "features",
            title: "Підстави для набуття громадянства",
            items: [
              { title: "Натуралізація", description: "Після 5 років безперервного легального проживання, знання мови та наявності законних доходів." },
              { title: "Шлюб з громадянином України", description: "Спрощена процедура: 2 роки проживання замість 5, за умови перебування у шлюбі." },
              { title: "Поновлення громадянства", description: "Для осіб, які раніше мали громадянство України і втратили його." },
              { title: "Територіальне походження", description: "Для осіб, батьки або діди-бабусі яких народилися на території сучасної України." }
            ]
          },
          {
            type: "markdown",
            content: "### Вимоги для натуралізації\n\nЗгідно із Законом України «Про громадянство» (ст. 9), для натуралізації необхідно:\n\n1. **5 років безперервного проживання** в Україні на законних підставах\n2. **Знання української мови** — підтверджується складанням мовного іспиту\n3. **Наявність законних джерел доходу** — трудовий договір, підприємництво, пенсія тощо\n4. **Зобов'язання відмовитися від іноземного громадянства** — Україна не визнає подвійного громадянства офіційно\n\n### Мовний іспит\n\nКандидат повинен скласти іспит з української мови на рівень, достатній для спілкування у побутових та офіційних ситуаціях. Ми рекомендуємо курси підготовки та допомагаємо з реєстрацією на іспит.\n\n### Строки та процедура\n\nПісля подання повного пакету документів рішення приймається Комісією при Президентові України. Строк розгляду — від 6 до 12 місяців. Процедура завершується складанням присяги громадянина України та отриманням паспорта."
          },
          {
            type: "stats",
            items: [
              { value: "5 років", label: "Мінімальний строк проживання" },
              { value: "50+", label: "Справ з громадянства" },
              { value: "2 роки", label: "Спрощено при шлюбі" },
              { value: "95%", label: "Успішних заявок" }
            ]
          },
          {
            type: "alert",
            level: "warning",
            title: "Подвійне громадянство",
            content: "Україна офіційно не визнає подвійного громадянства. При натуралізації необхідно подати зобов'язання про вихід з попереднього громадянства. Однак на практиці контроль за виконанням цієї вимоги має свої особливості — проконсультуйтесь з адвокатом."
          },
          {
            type: "quote",
            text: "Громадянство — це не лише паспорт, а повноцінне членство в українському суспільстві. Ми допоможемо пройти цей шлях правильно.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Посвідка на постійне проживання",
          "Паспорт громадянина іноземної держави",
          "Сертифікат про складання мовного іспиту",
          "Довідка про доходи",
          "Довідка про несудимість",
          "Зобов'язання про вихід з іноземного громадянства",
          "Фотографії",
          "Квитанція про сплату збору",
        ],
        processStepsUk: [
          { title: "Перевірка підстав", description: "Аналізуємо вашу ситуацію та визначаємо оптимальну підставу для набуття громадянства" },
          { title: "Мовний іспит", description: "Допомагаємо з підготовкою та реєстрацією на іспит з української мови" },
          { title: "Подання заявки", description: "Готуємо та подаємо повний пакет документів до уповноваженого органу" },
          { title: "Присяга та паспорт", description: "Після прийняття рішення — складання присяги громадянина та отримання паспорта України" },
        ],
        faqUk: [
          { question: "Чи потрібно відмовлятися від поточного громадянства?", answer: "Формально — так, необхідно подати зобов'язання про вихід. Фактично — процедура має свої нюанси, які ми пояснимо на консультації." },
          { question: "Через скільки років можна подати на громадянство?", answer: "За загальним правилом — 5 років безперервного проживання. При шлюбі з громадянином України — 2 роки." },
          { question: "Чи потрібно знати українську мову?", answer: "Так, необхідно скласти мовний іспит. Рівень — достатній для побутового та офіційного спілкування." },
          { question: "Скільки коштує процедура громадянства?", answer: "Державний збір та витрати на документи залежать від підстави. Точну вартість визначаємо після аналізу вашої ситуації на консультації." }
        ],
      },
    ],
  },
  {
    title: "Ticari & Genel Hukuk",
    titleUk: "Комерційне та загальне право",
    services: [
      {
        title: "Şirket Kurma",
        titleUk: "Реєстрація компанії",
        slug: "sirket-kurma",
        shortDescription: "Ukrayna'da şirket kurma, tescil ve ticaret hukuku danışmanlığı",
        shortDescriptionUk: "Реєстрація компанії в Україні, реєстрація та консультації з комерційного права",
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
        durationUk: "3–7 робочих днів",
        metaTitleUk: "Реєстрація компанії в Україні | ТОВ, ФОП — Адвокат Львів",
        metaDescriptionUk: "Реєстрація ТОВ та ФОП у Львові. Відкриття бізнесу в Україні: статут, податковий облік, банківський рахунок. Юридичний супровід під ключ.",
        heroDescriptionUk: "Реєструємо компанії у Львові під ключ — від підготовки статуту та вибору системи оподаткування до відкриття рахунку та першої звітності.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Відкрийте бізнес у Львові — швидко та без ризиків",
            content: "Реєстрація ТОВ в Україні займає лише **3–7 робочих днів**, мінімальний статутний капітал — **не вимагається**. Однак неправильний вибір системи оподаткування, помилки у статуті або відсутність юридичної адреси можуть призвести до штрафів і блокування рахунку. Наше бюро у Львові забезпечує бездоганну реєстрацію від першого документа до першої операції."
          },
          {
            type: "features",
            title: "Що входить у пакет реєстрації",
            items: [
              { title: "Підготовка статуту (установчих документів)", description: "Складаємо статут ТОВ з урахуванням специфіки вашого бізнесу, розподілу часток та порядку прийняття рішень." },
              { title: "Юридична адреса", description: "Забезпечуємо легальну юридичну адресу у Львові, перевірену податковою." },
              { title: "Реєстрація у ЄДР", description: "Подаємо документи до Єдиного державного реєстру, отримуємо витяг та код ЄДРПОУ." },
              { title: "Вибір системи оподаткування", description: "Аналізуємо обороти та вид діяльності, обираємо оптимальну систему: загальна, спрощена (група 3 — 5% або 3% з ПДВ), ФОП." }
            ]
          },
          {
            type: "markdown",
            content: "### Які форми бізнесу існують в Україні\n\n**ТОВ (Товариство з обмеженою відповідальністю)** — найпопулярніша форма. Засновники відповідають лише в межах своїх внесків. Підходить для середнього та великого бізнесу.\n\n**ФОП (Фізична особа-підприємець)** — найпростіша форма. Ідеальна для фрілансерів, консультантів, малого бізнесу. Спрощене оподаткування: 5% від обороту (3 група).\n\n**Представництво іноземної компанії** — для іноземних компаній, які хочуть мати офіційну присутність в Україні без створення окремої юридичної особи.\n\n### Банківський рахунок\n\nПісля реєстрації відкриваємо рахунок у надійному банку (Приватбанк, Укрсиббанк, ПУМБ). Час відкриття — 1–3 робочих дні. Доступні рахунки в гривні, євро, доларах.\n\n### Система оподаткування\n\n| Система | Ставка | Для кого |\n|---------|--------|----------|\n| Спрощена (3 група) | 5% від обороту | До 7 млн грн/рік |\n| Спрощена з ПДВ | 3% + ПДВ | Експортери |\n| Загальна | 18% прибуток + 20% ПДВ | Великий бізнес |"
          },
          {
            type: "stats",
            items: [
              { value: "100+", label: "Зареєстрованих компаній" },
              { value: "3–7 днів", label: "Строк реєстрації" },
              { value: "0 грн", label: "Мін. статутний капітал" },
              { value: "5%", label: "Спрощений податок" }
            ]
          },
          {
            type: "quote",
            text: "Правильно побудований фундамент бізнесу — це економія тисяч гривень на штрафах та перерєстраціях у майбутньому.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Паспорт засновника (ів)",
          "Ідентифікаційний код (ІПН)",
          "Статут товариства",
          "Рішення засновника (протокол зборів)",
          "Документ про юридичну адресу",
          "Квитанція про сплату реєстраційного збору",
        ],
        processStepsUk: [
          { title: "Вибір форми бізнесу", description: "Визначаємо оптимальну організаційно-правову форму (ТОВ, ФОП, представництво)" },
          { title: "Підготовка документів", description: "Складаємо статут, рішення засновника, заяви для реєстрації" },
          { title: "Реєстрація", description: "Подаємо до ЄДР, отримуємо витяг та код ЄДРПОУ, ставимо на облік у податковій" },
          { title: "Запуск бізнесу", description: "Відкриваємо рахунок, обираємо систему оподаткування, готуємо першу звітність" },
        ],
        faqUk: [
          { question: "Скільки коштує реєстрація ТОВ?", answer: "Реєстраційний збір — безкоштовно. Послуги адвоката з підготовкою статуту та юридичною адресою — від 5 000 грн." },
          { question: "Чи може іноземець бути засновником ТОВ?", answer: "Так. Іноземці мають право створювати ТОВ в Україні на рівних умовах з громадянами. Потрібен ІПН та нотаріально завірений переклад паспорта." },
          { question: "Яку систему оподаткування обрати?", answer: "Залежить від обороту та виду діяльності. Для більшості малих бізнесів оптимальна спрощена система 3 групи (5% від обороту)." },
          { question: "Чи можна зареєструвати компанію дистанційно?", answer: "Так, за нотаріальною довіреністю. Ми оформимо все без вашої фізичної присутності у Львові." }
        ],
      },
      {
        title: "Gayrimenkul Hukuku",
        titleUk: "Право нерухомості",
        slug: "gayrimenkul-hukuku",
        shortDescription: "Ukrayna'da gayrimenkul alım-satım, kiralama ve mülkiyet hukuku",
        shortDescriptionUk: "Купівля-продаж нерухомості, оренда та право власності в Україні",
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
        durationUk: "2–4 тижні",
        metaTitleUk: "Нерухомість в Україні | Купівля квартири у Львові — Адвокат",
        metaDescriptionUk: "Юридичний супровід купівлі-продажу нерухомості у Львові. Перевірка об'єкта, підготовка договору, нотаріальне оформлення. Адвокат Чубай.",
        heroDescriptionUk: "Повний юридичний супровід угод з нерухомістю у Львові — від перевірки правового статусу об'єкта до нотаріального посвідчення договору та реєстрації права власності.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Купівля нерухомості без ризиків",
            content: "Купівля квартири, будинку або комерційного приміщення — одна з найбільших фінансових операцій у житті. **Перевірка правового статусу** об'єкта перед угодою може зберегти сотні тисяч гривень. Ми перевіряємо право власності, обтяження (іпотека, арешт, заборона відчуження), історію об'єкта та готуємо безпечний договір."
          },
          {
            type: "features",
            title: "Наші послуги з нерухомості",
            items: [
              { title: "Правова експертиза (Due Diligence)", description: "Перевіряємо правовстановлюючі документи, витяг з реєстру прав, відсутність обтяжень та судових спорів." },
              { title: "Підготовка договору", description: "Складаємо або перевіряємо договір купівлі-продажу, попередній договір, договір завдатку." },
              { title: "Нотаріальне оформлення", description: "Супроводжуємо нотаріальне посвідчення угоди, контролюємо правильність документів." },
              { title: "Реєстрація права власності", description: "Забезпечуємо внесення запису до Державного реєстру речових прав." }
            ]
          },
          {
            type: "markdown",
            content: "### На що звернути увагу при купівлі\n\n1. **Правовстановлюючий документ** — договір купівлі-продажу, свідоцтво про право власності, рішення суду тощо\n2. **Витяг з Державного реєстру речових прав** — підтверджує, хто є власником та чи є обтяження\n3. **Технічний паспорт** — відповідність планування фактичному стану (незаконне перепланування — частий ризик)\n4. **Відсутність боргів за ЖКП** — довідки з ОСББ або управляючої компанії\n5. **Сімейний стан продавця** — якщо нерухомість спільна — потрібна згода другого з подружжя\n\n### Особливості для іноземців\n\nІноземці мають право купувати квартири, будинки та комерційну нерухомість в Україні. Для оформлення угоди необхідний **ІПН (ідентифікаційний податковий номер)**, який ми допоможемо отримати.\n\n**Важливо**: іноземці не можуть купувати земельні ділянки сільськогосподарського призначення.\n\n### Податки при купівлі\n\n- Державне мито: 1% від вартості\n- Збір до Пенсійного фонду: 1%\n- Послуги нотаріуса: від 3 000 грн\n- Оцінка нерухомості: від 1 500 грн"
          },
          {
            type: "alert",
            level: "danger",
            title: "Перевіряйте перед тим, як платити!",
            content: "Шахрайство з нерухомістю в Україні — не рідкість. Продаж по підробленій довіреності, подвійний продаж, продаж арештованого майна — все це трапляється. Ніколи не передавайте гроші без попередньої правової перевірки."
          },
          {
            type: "stats",
            items: [
              { value: "500+", label: "Перевірених об'єктів" },
              { value: "0", label: "Проблемних угод для клієнтів" },
              { value: "2–4 тижні", label: "Повний цикл угоди" },
              { value: "100%", label: "Безпечних угод" }
            ]
          },
          {
            type: "quote",
            text: "Нерухомість — це надто серйозна інвестиція, щоб довіряти лише ріелтору. Адвокат бачить те, що не бачить покупець.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Паспорт та ІПН покупця",
          "Правовстановлюючий документ продавця",
          "Витяг з Державного реєстру речових прав",
          "Технічний паспорт об'єкта",
          "Довідка про відсутність боргів за ЖКП",
          "Оцінка нерухомості (експертна оцінка)",
          "Згода подружжя (за потреби)",
        ],
        processStepsUk: [
          { title: "Перевірка об'єкта", description: "Проводимо правову експертизу: право власності, обтяження, судові спори, борги" },
          { title: "Підготовка договору", description: "Складаємо або перевіряємо договір купівлі-продажу, узгоджуємо умови" },
          { title: "Нотаріальне оформлення", description: "Супроводжуємо угоду у нотаріуса, контролюємо правильність документів" },
          { title: "Реєстрація права", description: "Забезпечуємо реєстрацію права власності у Державному реєстрі" },
        ],
        faqUk: [
          { question: "Скільки коштує юридичний супровід купівлі квартири?", answer: "Від 5 000 грн залежно від складності угоди. Перевірка об'єкта — від 3 000 грн окремо." },
          { question: "Чи може іноземець купити квартиру в Україні?", answer: "Так. Потрібен ІПН (ідентифікаційний податковий номер), який ми допоможемо отримати за 1–2 дні." },
          { question: "Чи обов'язковий нотаріус при купівлі?", answer: "Так. Договір купівлі-продажу нерухомості підлягає обов'язковому нотаріальному посвідченню." },
          { question: "Як перевірити, чи немає арешту на квартирі?", answer: "Ми перевіряємо за Державним реєстром речових прав та реєстром судових рішень. Це входить у наш стандартний пакет послуг." }
        ],
      },
      {
        title: "İş Hukuku",
        titleUk: "Трудове право",
        slug: "is-hukuku",
        shortDescription: "İşçi-işveren ilişkileri, iş sözleşmeleri ve çalışma hakları",
        shortDescriptionUk: "Трудові відносини, трудові договори та права працівників",
        icon: Briefcase,
        category: "ticari-genel",
        metaTitle: "Ukrayna İş Hukuku | İşçi-İşveren İlişkileri Danışmanlığı",
        metaDescription: "Ukrayna'da iş hukuku: iş sözleşmeleri, çalışma hakları, işten çıkarma ve işçi-işveren uyuşmazlıkları konusunda hukuki danışmanlık.",
        heroDescription: "Ukrayna'da çalışan Türk vatandaşları ve Türk işverenler için iş hukuku danışmanlığı ve uyuşmazlık çözümü.",
        content: `Ukrayna iş hukuku, işçi ve işveren haklarını düzenleyen kapsamlı bir mevzuata sahiptir. Yabancı çalışanlar için özel düzenlemeler de mevcuttur.`,
          contentBlocks: [
            { type: "markdown", content: "### **Ukrayna İş Hukuku** ve Yabancı İş İçi Yasal Düzenlemeler\n\nUkrayna iş güvencesi mevzuatı çalışanı oldukça koruyan yapıda olmakla birlikte, işverenler açısından detaylı sözleşme şartları barındırır. Yabancı işçi istihdamında veya bir çalışan olarak Ukrayna'da çalışma şartlarınızda hak kaybına uğramamanız için İş Kanunu çerçevesinde net tanımlamalar gereklidir.\n\nMobbing, haksız fesih, kıdem tazminatı, maaş iptali gibi sorunlarda gerek işverenlerin doğru sözleşmeler hazırlaması, gerekse işçilerin haklarını alması için arabuluculuktan yargı aşamasına kadar 360 derece hizmet veriyoruz." },
            { type: "why_us", title: "İş Uyuşmazlıklarında Neden Biz?", items: [ "Önleyici Hukuk: Uyuşmazlık çıkmadan, kusursuz iş sözleşmeleri hazırlayarak riskleri ortadan kaldırıyoruz.", "Tazminat Odaklılık: Haksız fesihlerde maksimum mali telafi ve geçmiş maaşların temini için hızlı dava süreçleri açıyoruz.", "İşçi-İşveren Dengesi: Şirket iseniz, işçi davalarına ve cezalarına karşı sağlam bir hukuki altyapı oluşturuyoruz." ] },
            { type: "quote", text: "Terinizin kurumasına bile fırsat kalmadan haklarınızın güvence altında olduğu, şeffaf bir çalışma ekosistemi kuruyoruz.", author: "Av. Lyudmyla Chubai" }
          ],
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
        durationUk: "Індивідуально",
        metaTitleUk: "Трудове право | Адвокат у Львові — Чубай",
        metaDescriptionUk: "Трудові спори, незаконне звільнення, стягнення заробітної плати, трудовий договір. Захист прав працівників та роботодавців у Львові. Адвокат.",
        heroDescriptionUk: "Захищаємо права працівників та роботодавців у трудових спорах — незаконне звільнення, стягнення зарплати, дисциплінарні стягнення, трудовий договір.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Трудові спори — захист ваших прав на роботі",
            content: "Незаконне звільнення, невиплата зарплати, порушення умов трудового договору — все це підстави для звернення до суду. **Кодекс законів про працю України** захищає працівників, але роботодавці також потребують юридичного супроводу для уникнення ризиків. Наше бюро у Львові спеціалізується на трудових спорах обох сторін."
          },
          {
            type: "features",
            title: "Наші послуги",
            items: [
              { title: "Захист при звільненні", description: "Оскарження незаконного звільнення, поновлення на посаді, стягнення середньої зарплати за час вимушеного прогулу." },
              { title: "Стягнення заборгованості", description: "Стягнення невиплаченої зарплати, компенсації за відпустку, вихідної допомоги через суд." },
              { title: "Трудові договори", description: "Складання та перевірка трудових договорів, контрактів, угод про конфіденційність та неконкуренцію." },
              { title: "Консультації для роботодавців", description: "Правильне оформлення звільнень, скорочень, дисциплінарних стягнень для мінімізації судових ризиків." }
            ]
          },
          {
            type: "markdown",
            content: "### Незаконне звільнення\n\nЗгідно зі ст. 235 КЗпП, працівник, звільнений без законних підстав, має право на:\n- **Поновлення на посаді** за рішенням суду\n- **Виплату середньої зарплати** за весь час вимушеного прогулу\n- **Моральну компенсацію**\n\nСтрок звернення до суду — **1 місяць** з дня отримання наказу про звільнення.\n\n### Невиплата зарплати\n\nВідповідно до ст. 116 КЗпП, при звільненні роботодавець зобов'язаний розрахуватися з працівником у день звільнення. За кожен день затримки нараховується компенсація.\n\n### Трудові спори з іноземцями\n\nДля іноземців, які працюють в Україні за дозволом на працевлаштування, діють такі ж трудові гарантії, як і для громадян. Ми допомагаємо іноземним працівникам захистити свої права."
          },
          {
            type: "stats",
            items: [
              { value: "200+", label: "Трудових спорів" },
              { value: "1 міс.", label: "Строк оскарження звільнення" },
              { value: "90%", label: "Успішних результатів" },
              { value: "100%", label: "Конфіденційність" }
            ]
          },
          {
            type: "quote",
            text: "Ваша праця має бути оплачена, а ваші права — захищені. Ми не допустимо, щоб роботодавець порушував закон безкарно.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Трудовий договір / контракт",
          "Наказ про звільнення (за наявності)",
          "Розрахункові листи / довідка про зарплату",
          "Копія трудової книжки",
          "Документи, що підтверджують порушення (листування, акти)",
        ],
        processStepsUk: [
          { title: "Консультація", description: "Аналізуємо ситуацію, оцінюємо перспективи та обираємо стратегію" },
          { title: "Досудове врегулювання", description: "Направляємо претензію роботодавцю, проводимо переговори" },
          { title: "Судовий захист", description: "Подаємо позов, представляємо інтереси у суді" },
          { title: "Виконання рішення", description: "Забезпечуємо виконання рішення суду через виконавчу службу" },
        ],
        faqUk: [
          { question: "Протягом якого строку можна оскаржити звільнення?", answer: "1 місяць з дня отримання наказу про звільнення або копії трудової книжки." },
          { question: "Чи можна стягнути зарплату через суд?", answer: "Так. Суд стягне заборгованість із зарплати, компенсацію за затримку та моральну шкоду." },
          { question: "Що робити, якщо роботодавець не оформив офіційно?", answer: "Факт трудових відносин можна встановити через суд на підставі свідчень, листування, банківських переказів." }
        ],
      },
      {
        title: "Sözleşme Hukuku",
        titleUk: "Договірне право",
        slug: "sozlesme-hukuku",
        shortDescription: "Sözleşme hazırlama, inceleme ve uyuşmazlık çözümü",
        shortDescriptionUk: "Підготовка, перевірка договорів та вирішення спорів",
        icon: Handshake,
        category: "ticari-genel",
        metaTitle: "Ukrayna Sözleşme Hukuku | Sözleşme Hazırlama ve İnceleme",
        metaDescription: "Ukrayna'da sözleşme hazırlama, inceleme ve uyuşmazlık çözümü hizmetleri. Ticari ve bireysel sözleşmeler için profesyonel hukuki destek.",
        heroDescription: "Her türlü sözleşmenin hazırlanması, incelenmesi ve uyuşmazlıkların çözümünde profesyonel hukuki destek sunuyoruz.",
        content: `Sözleşmeler, ticari ve bireysel ilişkilerin temelini oluşturur. Ukrayna hukukuna uygun, haklarınızı koruyan sözleşmelerin hazırlanması büyük önem taşır.`,
          contentBlocks: [
            { type: "markdown", content: "### **Sözleşme Hukuku** ile Geleceğinizi Teminat Altına Alın\n\nTicari dünyada ve sosyal yaşamda her şey bir imza ile başlar ancak küçük bir madde veya yanlış kelime kullanımı, tüm geleceğinizi felakete sürükleyebilir. Ukrayna dilinde ve yasal zemininde yapılan sözleşmelerde sadece gramer çevirisinin değil, yasal terminolojinin doğru konumlandırılması hayatidir.\n\nHisse devri, bayilik, kira, gizlilik, yazılım veya uluslararası satım sözleşmelerinizde karşı tarafın gizlediği tuzak maddeleri buluyoruz. Hem Ukrayna Hukuku hem de Uluslararası Ticaret kurallarına göre sizi sıfır risk alanında tutacak metinler üretiyoruz." },
            { type: "stats", items: [ { label: "Çift Dilli Çeviri", value: "Terminolojik" }, { label: "İncelenen Kontrat", value: "Binlerce" }, { label: "Maliyet Koruması", value: "Üst Düzey" }, { label: "Ticari Güven", value: "Tam Güvence" } ] },
            { type: "why_us", title: "Sözleşmelerde Nasıl Fark Yaratıyoruz?", items: [ "İki Yönlü Dil Kontrolü: Sözleşmenin yerel dilde ve Türkçe çevirisinde yasal karşılıkların denkliğini sağlıyoruz.", "Gizli Tuzakları Tespiti: Karşı alacaklının gizlediği, ileride tazminat ödemenize yol açabilecek 'ince yazılı' maddeleri ortadan kaldırıyoruz.", "Geleceğe Yönelik Kodlama: Olası uyuşmazlıklarda mahkemeden bile geçmeyip arabuluculukla lehinize sonuçlanacak şarta bağlı maddeler ekliyoruz." ] },
            { type: "quote", text: "Atacağınız imza sadece bugünün anlaşması değil, yarının güvencesidir. Şansa bırakılmış kelimelerle anlaşma yapılmaz.", author: "Av. Lyudmyla Chubai" }
          ],
        requiredDocuments: ["Mevcut sözleşme (varsa)", "Tarafların kimlik bilgileri", "İlgili ticari belgeler"],
        processSteps: [
          { title: "İhtiyaç Analizi", description: "Sözleşme ihtiyaçlarınızın belirlenmesi" },
          { title: "Hazırlık/İnceleme", description: "Sözleşmenin hazırlanması veya mevcut sözleşmenin incelenmesi" },
          { title: "Müzakere", description: "Karşı tarafla sözleşme müzakereleri" },
          { title: "İmza", description: "Sözleşmenin nihai hale getirilmesi ve imzalanması" },
        ],
        faq: [],
        duration: "1-2 hafta",
        durationUk: "1–2 тижні",
        metaTitleUk: "Договірне право | Адвокат у Львові — Чубай",
        metaDescriptionUk: "Складання, перевірка та супровід договорів у Львові. Захист інтересів у договірних спорах. Юридичний аналіз контрактів. Адвокат.",
        heroDescriptionUk: "Складаємо, перевіряємо та супроводжуємо договори будь-якої складності — від купівлі-продажу до міжнародних комерційних контрактів.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Договір — фундамент будь-якої угоди",
            content: "Неправильно складений договір може коштувати значно більше, ніж послуги адвоката. **Невигідні умови, приховані штрафні санкції, відсутність захисних механізмів** — все це може призвести до значних фінансових втрат. Наше бюро у Львові спеціалізується на підготовці та аналізі договорів, що захищають ваші інтереси."
          },
          {
            type: "features",
            title: "Які договори ми готуємо",
            items: [
              { title: "Купівля-продаж", description: "Договори купівлі-продажу нерухомості, транспорту, бізнесу, корпоративних прав." },
              { title: "Оренда та найм", description: "Договори оренди комерційних приміщень, житла, обладнання з захистом обох сторін." },
              { title: "Комерційні контракти", description: "Договори поставки, підряду, надання послуг, франчайзингу, дистрибуції." },
              { title: "Корпоративні угоди", description: "Статути, корпоративні договори, угоди засновників, NDA, угоди про неконкуренцію." }
            ]
          },
          {
            type: "markdown",
            content: "### Що включає перевірка договору\n\n1. **Аналіз умов** — виявляємо невигідні, нечіткі та потенційно небезпечні положення\n2. **Перевірка контрагента** — аналізуємо правовий статус, судові спори, фінансовий стан\n3. **Рекомендації** — пропонуємо зміни та доповнення для захисту ваших інтересів\n4. **Узгодження** — ведемо переговори з іншою стороною щодо внесення змін\n\n### Договірні спори\n\nЯкщо контрагент порушив умови договору — ми забезпечуємо:\n- Досудове врегулювання (претензія, переговори, медіація)\n- Судовий захист (позов про стягнення збитків, неустойки, примусове виконання)\n- Забезпечувальні заходи (арешт рахунків або майна боржника)"
          },
          {
            type: "stats",
            items: [
              { value: "1000+", label: "Перевірених договорів" },
              { value: "1–2 дні", label: "Строк перевірки" },
              { value: "100%", label: "Захист інтересів клієнта" },
              { value: "5–7 днів", label: "Складання з нуля" }
            ]
          },
          {
            type: "quote",
            text: "Добрий договір — це той, який ніколи не знадобиться в суді. Ми складаємо саме такі договори.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Існуючий договір (для перевірки)",
          "Паспортні дані сторін / реквізити юридичних осіб",
          "Опис суті угоди та побажань клієнта",
          "Супутні документи (листування, акти, рахунки)",
        ],
        processStepsUk: [
          { title: "Аналіз потреб", description: "Визначаємо мету договору, ризики та ключові умови" },
          { title: "Підготовка / перевірка", description: "Складаємо новий договір або аналізуємо існуючий з юридичним висновком" },
          { title: "Узгодження", description: "Ведемо переговори з контрагентом, вносимо зміни" },
          { title: "Підписання", description: "Фіналізуємо документ, супроводжуємо підписання" },
        ],
        faqUk: [
          { question: "Скільки коштує перевірка договору?", answer: "Від 2 000 грн залежно від обсягу та складності. Стандартний договір — 1–2 робочих дні." },
          { question: "Чи можна розірвати невигідний договір?", answer: "Так, за наявності підстав: суттєве порушення умов, зміна обставин, обман. Ми допоможемо з розірванням у досудовому або судовому порядку." },
          { question: "Чи складаєте двомовні договори?", answer: "Так. Ми готуємо договори українською, англійською та турецькою мовами з юридично коректною термінологією." }
        ],
      },
      {
        title: "Ceza Hukuku",
        titleUk: "Кримінальне право",
        slug: "ceza-hukuku",
        shortDescription: "Ceza davalarında savunma, hukuki temsil ve haklar",
        shortDescriptionUk: "Захист у кримінальних справах, юридичне представництво та права",
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
              { label: "Anında Müdahale", value: "7/24" },
              { label: "Ana Dilde İletişim", value: "%100" },
              { label: "Ortalama Tecrübe", value: "10+ Yıl" },
              { label: "Ukrayna Geneli Destek", value: "Tam Kapsam" }
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
            author: "Av. Lyudmyla Chubai"
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
        durationUk: "Індивідуально",
        metaTitleUk: "Кримінальне право | Адвокат-захисник у Львові — Чубай",
        metaDescriptionUk: "Захист у кримінальних справах у Львові. Адвокат на досудовому слідстві та в суді. Затримання, підозра, обвинувачення — терміновий захист.",
        heroDescriptionUk: "Професійний кримінальний захист у Львові — від моменту затримання до винесення рішення суду. Терміновий виїзд до клієнта 24/7.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Кримінальна справа — кожна хвилина на рахунку",
            content: "Затримання, повідомлення про підозру, обшук — усе це вимагає **негайної участі адвоката**. Перші 72 години після затримання є вирішальними: саме тоді формується доказова база та визначається запобіжний захід. Наше бюро у Львові забезпечує терміновий виїзд адвоката та професійний захист на всіх етапах кримінального провадження."
          },
          {
            type: "features",
            title: "На яких етапах ми захищаємо",
            items: [
              { title: "Затримання та допит", description: "Присутність адвоката при затриманні, контроль законності дій поліції, участь у першому допиті." },
              { title: "Досудове слідство", description: "Аналіз доказів, подання клопотань, участь у слідчих діях, оскарження незаконних рішень слідчого." },
              { title: "Судовий розгляд", description: "Захист у суді першої інстанції, апеляційному та касаційному судах." },
              { title: "Угода зі слідством", description: "За потреби — переговори з прокурором щодо угоди про визнання винуватості з мінімальним покаранням." }
            ]
          },
          {
            type: "markdown",
            content: "### Ваші права при затриманні\n\nЗгідно з Кримінальним процесуальним кодексом України:\n\n- **Право на адвоката** — з моменту затримання\n- **Право на мовчання** — ви не зобов'язані давати показання проти себе\n- **Право на телефонний дзвінок** — повідомити близьких\n- **Право на перекладача** — якщо ви не володієте українською\n- **72 години** — максимальний строк затримання без рішення суду\n\n### Категорії справ\n\nМи захищаємо у справах про:\n- Крадіжку, шахрайство, привласнення\n- Тілесні ушкодження, хуліганство\n- Наркотичні злочини\n- Економічні злочини\n- ДТП з тяжкими наслідками\n- Домашнє насильство\n\n### Запобіжні заходи\n\nМаємо великий досвід у оскарженні тримання під вартою та отриманні більш м'яких запобіжних заходів: особисте зобов'язання, застава, домашній арешт."
          },
          {
            type: "alert",
            level: "danger",
            title: "Не давайте показань без адвоката!",
            content: "Перше, що ви повинні сказати при затриманні: «Хочу адвоката». Будь-які показання без присутності захисника можуть бути використані проти вас і ускладнити подальший захист."
          },
          {
            type: "stats",
            items: [
              { value: "24/7", label: "Терміновий виїзд" },
              { value: "300+", label: "Кримінальних справ" },
              { value: "72 год", label: "Критичний строк затримання" },
              { value: "85%", label: "Позитивних результатів" }
            ]
          },
          {
            type: "quote",
            text: "У кримінальній справі немає дрібниць. Кожне слово, кожен документ може вирішити долю. Тому захист має бути професійним від першої хвилини.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Паспорт (посвідчення особи)",
          "Протокол затримання (за наявності)",
          "Повідомлення про підозру (за наявності)",
          "Будь-які документи, пов'язані зі справою",
        ],
        processStepsUk: [
          { title: "Терміновий виїзд", description: "Прибуваємо до клієнта (відділ поліції, СІЗО, суд) у найкоротший строк" },
          { title: "Аналіз та стратегія", description: "Вивчаємо матеріали справи, визначаємо лінію захисту" },
          { title: "Досудовий захист", description: "Беремо участь у слідчих діях, оскаржуємо незаконні рішення, подаємо клопотання" },
          { title: "Судовий захист", description: "Захищаємо у суді, домагаємося виправдання, перекваліфікації або мінімального покарання" },
        ],
        faqUk: [
          { question: "Що робити, якщо затримали близьку людину?", answer: "Негайно зателефонуйте нам. Адвокат виїде до місця затримання. До приїзду адвоката порадьте затриманому не давати показань." },
          { question: "Скільки коштує захист у кримінальній справі?", answer: "Вартість залежить від складності справи та стадії провадження. Попередню оцінку надаємо після ознайомлення з обставинами." },
          { question: "Чи можна оскаржити арешт?", answer: "Так. Ми подаємо апеляцію на ухвалу про тримання під вартою та клопочемо про більш м'який запобіжний захід." },
          { question: "Чи захищаєте іноземців?", answer: "Так. Ми маємо досвід захисту іноземних громадян та забезпечуємо перекладача при потребі." }
        ],
      },
      {
        title: "Miras Hukuku",
        titleUk: "Спадкове право",
        slug: "miras-hukuku",
        shortDescription: "Miras davaları, veraset ilamı ve uluslararası miras süreçleri",
        shortDescriptionUk: "Спадкові справи, свідоцтво про спадщину та міжнародні спадкові процеси",
        icon: Landmark,
        category: "ticari-genel",
        metaTitle: "Ukrayna Miras Hukuku | Veraset ve İntikal İşlemleri",
        metaDescription: "Ukrayna'da miras hukuku: veraset ilamı, miras paylaşımı ve uluslararası miras süreçleri. Türk vatandaşları için hukuki danışmanlık.",
        heroDescription: "Ukrayna'da miras haklarınızın korunması ve veraset işlemlerinin yönetilmesi için profesyonel hukuki destek.",
        content: `Uluslararası miras süreçleri karmaşık olabilir. Ukrayna'da miras hakkı bulunan Türk vatandaşları için tüm yasal süreçleri yönetiyoruz.`,
          contentBlocks: [
            { type: "markdown", content: "### **Miras Hukuku** ve Yabancılar İçin Veraset İlamı\n\nUkrayna'daki bir akrabanızdan ya da yakınınızdan miras (gayrimenkul, banka hesabı, şirket hissesi) kaldığında, sürecin hem Ukrayna iç hukukuna hem de uluslararası anlaşmalara göre çözülmesi gerekir. Vefattan itibaren genelde 6 ay olan sürede veraset ilamına başlanmaması hak kayıpları yaratır.\n\nMirasın reddi, mirasçı analizi, vasiyetnamelerin iptali ve uluslararası varlık transfer süreçlerinde bürokratik engelleri adınıza çözüyor, mirasın adil ve hızlı bir şekilde tarafınıza aktarılmasını (veya Ukrayna'da satılıp Türkiye'ye naklini) sağlıyoruz." },
            { type: "alert", level: "warning", title: "Zamana Karşı Yarış", content: "Ukrayna'da miras işlemlerinde yasal kabul süresi genelde 6 aydır. Süre kaçırılırsa hakkınızı aramak ekstra yargı yollarına başvurmayı gerektirir." },
            { type: "why_us", title: "Zorlu Miras Süreçlerinde Neden Bizimle İlerlemelisiniz?", items: [ "Sınır Ötesi Yönetim: Türkiye'de otururken, vekalet yoluyla Ukrayna'daki varlıklarınızın tüm tescil ve satış sürecini yürütürüz.", "Vergi Optimizasyonu: Yabancıların miras alımında ortaya çıkan vergileri, yasal indirim ve çifte vergilendirme muafiyetlerine dayanarak en aza indiririz.", "Nizalı Miraslar: Diğer varislerle uyuşmazlık yaşadığınız davalarda, sizin payınızı garantileyen en güçlü savunmayı kurarız." ] },
            { type: "quote", text: "Size bırakılan miras bir külfet değil, bir değer olmalıdır. Bürokratik yükleri alır, hakkınız olanı size pürüzsüzce teslim ederiz.", author: "Av. Lyudmyla Chubai" }
          ],
        requiredDocuments: ["Veraset ilamı", "Ölüm belgesi", "Akrabalık belgeleri", "Miras bırakanın mal varlığı belgeleri", "Vasiyetname (varsa)"],
        processSteps: [
          { title: "Miras Tespiti", description: "Miras bırakanın mal varlığının tespiti" },
          { title: "Veraset", description: "Veraset ilamı ve mirasçılık belgesi alınması" },
          { title: "Paylaşım", description: "Miras paylaşımının yapılması" },
          { title: "Tescil", description: "Devir ve tescil işlemlerinin tamamlanması" },
        ],
        faq: [],
        duration: "2-6 ay",
        durationUk: "2–6 місяців",
        metaTitleUk: "Спадкове право | Оформлення спадщини у Львові — Адвокат",
        metaDescriptionUk: "Оформлення спадщини у Львові: свідоцтво про право на спадщину, спадкові спори, заповіти. Юридичний супровід спадкових справ. Адвокат Чубай.",
        heroDescriptionUk: "Повний юридичний супровід спадкових справ у Львові — від відкриття спадщини до оформлення права власності на спадкове майно.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Спадщина — оформіть вчасно та правильно",
            content: "Оформлення спадщини в Україні має чіткі **строки та процедуру**. Закон відводить 6 місяців на прийняття спадщини з дня смерті спадкодавця. Пропуск цього строку значно ускладнює процедуру. Наше бюро у Львові допоможе оформити спадщину швидко, без зайвих витрат та судових спорів."
          },
          {
            type: "features",
            title: "Наші послуги зі спадкового права",
            items: [
              { title: "Відкриття спадкової справи", description: "Подаємо заяву нотаріусу, збираємо документи, забезпечуємо дотримання строків." },
              { title: "Отримання свідоцтва про спадщину", description: "Оформлюємо свідоцтво про право на спадщину за законом або за заповітом." },
              { title: "Спадкові спори", description: "Оскарження заповіту, визнання недійсним, визначення часток, встановлення факту прийняття спадщини." },
              { title: "Спадщина іноземців", description: "Оформлення спадщини для іноземних спадкоємців, передача майна за кордон." }
            ]
          },
          {
            type: "markdown",
            content: "### Процедура оформлення спадщини\n\n1. **Відкриття спадщини** — настає з моменту смерті спадкодавця\n2. **Подача заяви нотаріусу** — протягом 6 місяців з дня відкриття\n3. **Збір документів** — свідоцтво про смерть, правовстановлюючі документи на майно, підтвердження родинних зв'язків\n4. **Отримання свідоцтва** — після спливу 6-місячного строку нотаріус видає свідоцтво про право на спадщину\n5. **Реєстрація права власності** — на нерухомість, транспорт, корпоративні права\n\n### Черги спадкоємців\n\nЦивільний кодекс визначає 5 черг спадкоємців за законом:\n- **1 черга**: діти, подружжя, батьки\n- **2 черга**: брати, сестри, бабусі, дідусі\n- **3 черга**: дядьки, тітки\n- **4 черга**: особи, що проживали зі спадкодавцем 5+ років\n- **5 черга**: інші родичі до 6 ступеня\n\n### Податок на спадщину\n\n- **0%** — для спадкоємців 1 черги (близькі родичі)\n- **5%** — для інших спадкоємців\n- **18%** — для спадкоємців-іноземців (нерезидентів)"
          },
          {
            type: "alert",
            level: "warning",
            title: "6 місяців — не пропустіть строк!",
            content: "Якщо ви не подали заяву про прийняття спадщини протягом 6 місяців — доведеться відновлювати строк через суд. Це додаткові витрати та час. Зверніться до нас якомога раніше."
          },
          {
            type: "stats",
            items: [
              { value: "6 міс.", label: "Строк прийняття спадщини" },
              { value: "0%", label: "Податок для близьких родичів" },
              { value: "150+", label: "Спадкових справ" },
              { value: "5 черг", label: "Спадкоємців за законом" }
            ]
          },
          {
            type: "quote",
            text: "Спадщина — це не лише майно, а й відповідальність. Ми допоможемо оформити все правильно та захистити ваші інтереси.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Свідоцтво про смерть спадкодавця",
          "Документи, що підтверджують родинні зв'язки",
          "Правовстановлюючі документи на майно",
          "Заповіт (за наявності)",
          "Паспорт та ІПН спадкоємця",
          "Довідка про останнє місце проживання спадкодавця",
        ],
        processStepsUk: [
          { title: "Відкриття справи", description: "Подаємо заяву нотаріусу про прийняття спадщини, відкриваємо спадкову справу" },
          { title: "Збір документів", description: "Збираємо та готуємо необхідні документи, встановлюємо склад спадкового майна" },
          { title: "Отримання свідоцтва", description: "Отримуємо свідоцтво про право на спадщину у нотаріуса" },
          { title: "Реєстрація права", description: "Реєструємо право власності на спадкове майно у відповідних реєстрах" },
        ],
        faqUk: [
          { question: "Що робити, якщо пропущено 6-місячний строк?", answer: "Можна відновити строк через суд, якщо є поважні причини пропуску. Або довести фактичне прийняття спадщини (проживання у квартирі, оплата комунальних тощо)." },
          { question: "Чи може іноземець успадкувати майно в Україні?", answer: "Так. Іноземці мають рівні спадкові права з громадянами України. Податок складає 18% для нерезидентів." },
          { question: "Як оскаржити заповіт?", answer: "Заповіт можна оскаржити через суд, якщо є підстави: недієздатність заповідача, підроблення, обман, тиск. Ми допомагаємо збирати докази та вести справу." },
          { question: "Скільки коштує оформлення спадщини?", answer: "Залежить від складності: кількості спадкоємців, виду майна, наявності спорів. Базова вартість — від 5 000 грн." }
        ],
      },
      {
        title: "Vergi Danışmanlığı",
        titleUk: "Податкове консультування",
        slug: "vergi-danismanligi",
        shortDescription: "Ukrayna vergi sistemi, beyanname ve vergi planlaması danışmanlığı",
        shortDescriptionUk: "Податкова система України, декларації та податкове планування",
        icon: DollarSign,
        category: "ticari-genel",
        metaTitle: "Ukrayna Vergi Danışmanlığı | Vergi Planlaması ve Beyanname",
        metaDescription: "Ukrayna'da vergi sistemi, vergi beyannamesi, çifte vergilendirme anlaşması ve vergi planlaması hakkında profesyonel danışmanlık.",
        heroDescription: "Ukrayna vergi mevzuatı ve Türkiye-Ukrayna çifte vergilendirme anlaşması çerçevesinde vergi danışmanlığı hizmeti sunuyoruz.",
        content: `Ukrayna vergi sistemi, yerel ve uluslararası düzenlemeleriyle karmaşık bir yapıya sahiptir. Özellikle yabancı vatandaşlar ve şirketler için doğru vergi planlaması büyük önem taşır.`,
          contentBlocks: [
            { type: "markdown", content: "### **Ukrayna Vergi Sistemi** ve Şirketler İçin Mali Danışmanlık\n\nUkrayna vergi sistemi, sürekli değişen reformlar ve ağır para cezalarıyla bilinir. Şirket kurulumundan (FOP veya TOV), ay sonu beyannamelerine ve KDV iade süreçlerine kadar en ufak bir muhasebe veya vergi hatası, tüm banka hesaplarınızın anında bloke olmasına yol açabilir.\n\nİşletmenizin faaliyet alanına en uygun vergi modelini seçmeniz, çifte vergilendirmeyi önleme anlaşmalarını kullanmanız ve devlet desteklerinden faydalanabilmeniz için sadece muhasebeci olarak değil, mali vergi avukatınız olarak size kalkan oluyoruz." },
            { type: "stats", items: [ { label: "Mali İnceleme", value: "Önleyici" }, { label: "Vergi Tasarrufu", value: "Optimum" }, { label: "Banka Blokesi", value: "Sıfır Risk" }, { label: "Şeffaf Muhasebe", value: "Sürekli" } ] },
            { type: "why_us", title: "Mali ve İdari Konularda Neden Biz?", items: [ "Çifte Vergilendirme: Türkiye ve Ukrayna arasındaki özel vergi maddelerini şirketiniz lehine kullandırıyoruz.", "Vergi Denetim Savunması: Şirketinize gelen sürpriz maliye denetimlerinde sizi temsil ediyor, usulsüz cezaları mahkemeden döndürüyoruz.", "Kesintisiz Akış: Her ay beyannamelerinizi zamanında, sıfır hatayla onaylıyor ve işletmenizi yasal güvenli alanda tutuyoruz." ] },
            { type: "quote", text: "Kazancınızın sürdürülebilir olması, doğru ve şeffaf bir vergi altyapısında filizlenir. Ceza riskini değil, kârı yönetin.", author: "Av. Lyudmyla Chubai" }
          ],
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
        durationUk: "Постійно",
        metaTitleUk: "Податкове консультування | Адвокат у Львові — Чубай",
        metaDescriptionUk: "Податкові консультації для бізнесу та фізичних осіб у Львові. Вибір системи оподаткування, податкові спори, декларації. Адвокат Чубай.",
        heroDescriptionUk: "Податкові консультації, оптимізація оподаткування, супровід перевірок та захист у податкових спорах. Індивідуальний підхід для бізнесу та фізичних осіб.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Податки — платіть правильно, а не більше",
            content: "Податкова система України має багато нюансів: **загальна система, спрощена (3 групи), єдиний податок, ПДВ**. Неправильний вибір або помилки в звітності призводять до штрафів та блокування рахунків. Ми консультуємо підприємців та фізичних осіб щодо легальної оптимізації податкового навантаження."
          },
          {
            type: "features",
            title: "Наші податкові послуги",
            items: [
              { title: "Вибір системи оподаткування", description: "Аналізуємо ваш бізнес та обираємо оптимальну систему: загальна, спрощена, ФОП." },
              { title: "Податкові декларації", description: "Готуємо та подаємо податкові декларації для фізичних осіб (ПДФО) та бізнесу." },
              { title: "Супровід перевірок", description: "Представляємо інтереси під час податкових перевірок, захищаємо від необгрунтованих донарахувань." },
              { title: "Податкові спори", description: "Оскаржуємо рішення податкової в адміністративному та судовому порядку." }
            ]
          },
          {
            type: "markdown",
            content: "### Основні податки в Україні\n\n| Податок | Ставка | Хто платить |\n|---------|--------|------------|\n| ПДФО | 18% + 1.5% ВЗ | Фізичні особи |\n| Податок на прибуток | 18% | Юридичні особи (загальна система) |\n| Єдиний податок (3 група) | 5% або 3%+ПДВ | ФОП та ТОВ до 7 млн грн/рік |\n| ПДВ | 20% | Реєстровані платники |\n| Військовий збір | 5% | Усі, станом на 2024+ |\n\n### Особливості для іноземців\n\n- Іноземці, які отримують дохід в Україні, зобов'язані сплачувати ПДФО\n- Нерезиденти сплачують підвищену ставку на деякі доходи (15-18%)\n- Діють угоди про уникнення подвійного оподаткування з багатьма країнами\n\n### Податкові перевірки\n\nЯкщо до вас прийшла податкова перевірка — не панікуйте. Ми забезпечимо присутність адвоката, контроль законності дій інспекторів та оскарження необгрунтованих донарахувань."
          },
          {
            type: "stats",
            items: [
              { value: "100+", label: "Клієнтів на супроводі" },
              { value: "5%", label: "Мін. ставка для ФОП" },
              { value: "95%", label: "Успіх в оскарженнях" },
              { value: "0 грн", label: "Штрафів для клієнтів" }
            ]
          },
          {
            type: "quote",
            text: "Закон дає легальні можливості зменшити податкове навантаження. Наша задача — знайти ці можливості для вас.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "ІПН (ідентифікаційний податковий номер)",
          "Виписка з ЄДР (для юридичних осіб)",
          "Бухгалтерська звітність",
          "Податкові декларації за попередні періоди",
          "Документи щодо доходів та витрат",
        ],
        processStepsUk: [
          { title: "Аналіз ситуації", description: "Вивчаємо поточний стан оподаткування, виявляємо ризики та можливості" },
          { title: "Рекомендації", description: "Пропонуємо оптимальну стратегію оподаткування з розрахунками" },
          { title: "Впровадження", description: "Допомагаємо перейти на обрану систему, готуємо документи" },
          { title: "Супровід", description: "Забезпечуємо постійний податковий супровід та подання звітності" },
        ],
        faqUk: [
          { question: "Яка система оподаткування найвигідніша для ФОП?", answer: "Для більшості ФОП з оборотом до 7 млн грн/рік — спрощена система 3 групи (5% від обороту). Але все залежить від виду діяльності та структури витрат." },
          { question: "Як оскаржити рішення податкової?", answer: "Спочатку — адміністративне оскарження (30 днів). Потім — до адміністративного суду. Ми супроводжуємо на обох етапах." },
          { question: "Чи потрібен бухгалтер, якщо є адвокат?", answer: "Ми консультуємо з податкових питань та представляємо у спорах. Для ведення поточної бухгалтерії рекомендуємо бухгалтера — можемо порекомендувати перевірених спеціалістів." }
        ],
      },
      {
        title: "Tercüme & Apostil",
        titleUk: "Переклад та апостиль",
        slug: "tercume-apostil",
        shortDescription: "Yeminli tercüme, noter tasdiki ve apostil işlemleri",
        shortDescriptionUk: "Присяжний переклад, нотаріальне засвідчення та апостиль",
        icon: Languages,
        category: "ticari-genel",
        metaTitle: "Ukrayna Tercüme & Apostil Hizmetleri | Belge Tasdik İşlemleri",
        metaDescription: "Ukrayna'da yeminli tercüme, noter tasdiki ve apostil işlemleri. Türkçe-Ukraynaca belge çeviri ve onay hizmetleri.",
        heroDescription: "Resmi belgelerin Türkçe-Ukraynaca yeminli tercümesi, noter tasdiki ve apostil işlemlerini eksiksiz gerçekleştiriyoruz.",
        content: `Ukrayna'daki tüm resmi işlemlerde belgelerinizin Ukraynaca tercümesi ve noter onayı gereklidir. Apostil işlemleri ise uluslararası belge geçerliliği için zorunludur.`,
          contentBlocks: [
            { type: "markdown", content: "### Türkçe-Ukraynaca **Yeminli Tercüme ve Apostil** İşlemleri\n\nUkrayna makamlarında onay görmesi gereken her belge mutlak dille ve terimsel bir hassasiyetle çevrilmiş olmalıdır. Adli, tıbbi veya ekonomik belgelerde yapılacak en ufak bir terim hatası, aylarca süren davalarınızın reddedilmesine neden olabilir.\n\nDoğrudan noter onaylı yeminli tercümanlarımızla, Apostilli devlet evrakları ve özel metinlerinizi resmi, hukuki zeminini bozmadan hızlıca çeviriyor ve ilgili makamlara yasal sunuma hazır hale getiriyoruz." },
            { type: "stats", items: [ { label: "Hukuki Çeviri", value: "Kusursuz" }, { label: "Teslim Süresi", value: "Çok Hızlı" }, { label: "Noter Tasdiki", value: "Tam Yetki" }, { label: "Apostil", value: "Tüm Evraklar" } ] },
            { type: "why_us", title: "Dil Bariyerini Nasıl Kırıyoruz?", items: [ "Hukuk Terimleri Uzmanlığı: Kelimesi kelimesine değil, kanunun metnindeki amacına uygun, teknik dil çevirisi yapıyoruz.", "Entegre Noter Ağı: Çevrilen evrakları kapı kapı dolaşmadan ofisimiz bünyesindeki bağlantılarla anında onaylatıyoruz.", "Gizlilik Politikası: Şirket bilançoları, gizlilik anlaşmaları ve teşhis raporlarınız maksimum güvenlik altında tercüme edilir." ] },
            { type: "quote", text: "Farklı dillerin arasındaki köprüyü inşa ederken, cümlenin değil yasal hakkın çevirisini yapıyoruz.", author: "Av. Lyudmyla Chubai" }
          ],
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
        durationUk: "1–7 робочих днів",
        metaTitleUk: "Переклад та апостиль у Львові | Нотаріальний переклад — Адвокат",
        metaDescriptionUk: "Нотаріальний переклад документів, апостиль у Львові. Переклад з/на українську, турецьку, англійську. Юридичний переклад для суду та ДМС.",
        heroDescriptionUk: "Нотаріальний переклад документів та проставлення апостиля у Львові — для подання до суду, ДМС, ДРАЦС, нотаріуса та за кордон.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Переклад та апостиль — швидко, точно, офіційно",
            content: "Багато юридичних процедур в Україні вимагають **нотаріального перекладу** іноземних документів та **апостиля** для міжнародного визнання. Помилка у перекладі юридичного терміну може призвести до відмови ДМС, суду або ДРАЦС. Ми працюємо лише з сертифікованими перекладачами, які спеціалізуються на юридичних текстах."
          },
          {
            type: "features",
            title: "Наші послуги",
            items: [
              { title: "Нотаріальний переклад", description: "Переклад з нотаріальним засвідченням: паспорти, свідоцтва, дипломи, довідки, рішення суду." },
              { title: "Апостиль", description: "Проставлення апостиля на українських документах для використання за кордоном." },
              { title: "Юридичний переклад", description: "Переклад договорів, позовних заяв, статутів, протоколів з дотриманням юридичної термінології." },
              { title: "Легалізація документів", description: "Консульська легалізація для країн, що не є учасницями Гаазької конвенції." }
            ]
          },
          {
            type: "markdown",
            content: "### Коли потрібен нотаріальний переклад\n\n- **ДМС**: дозвіл на проживання, візи, возз'єднання сім'ї\n- **ДРАЦС**: реєстрація шлюбу з іноземцем\n- **Суд**: судові рішення, довіреності, позовні заяви\n- **Нотаріус**: купівля нерухомості, спадщина, довіреність\n- **ВНЗ**: вступ до університету, визнання дипломів\n\n### Апостиль — що це\n\nАпостиль — це спеціальний штамп, який підтверджує справжність документа для використання в країнах-учасницях Гаазької конвенції (більше 120 країн). Апостиль проставляється Міністерством юстиції або МЗС України.\n\n### Мови перекладу\n\n| Мова | Тип |\n|------|-----|\n| Українська ↔ Турецька | Юридичний, загальний |\n| Українська ↔ Англійська | Юридичний, комерційний |\n| Українська ↔ Німецька, Французька | Загальний |\n\n### Строки\n\n- Стандартний переклад: **1–3 робочих дні**\n- Терміновий переклад: **протягом дня**\n- Апостиль: **3–7 робочих днів**"
          },
          {
            type: "stats",
            items: [
              { value: "5000+", label: "Перекладених документів" },
              { value: "1 день", label: "Терміновий переклад" },
              { value: "3–7 днів", label: "Апостиль" },
              { value: "100%", label: "Прийнятих документів" }
            ]
          },
          {
            type: "quote",
            text: "Юридичний переклад — це не про слова, а про точний юридичний зміст. Одне невірне слово може змінити значення всього документа.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Оригінал документа для перекладу",
          "Копія паспорта замовника",
        ],
        processStepsUk: [
          { title: "Прийом документів", description: "Приймаємо оригінали або скановані копії документів для перекладу" },
          { title: "Переклад", description: "Сертифікований перекладач виконує переклад з дотриманням юридичної термінології" },
          { title: "Нотаріальне засвідчення", description: "Нотаріус засвідчує вірність перекладу" },
          { title: "Апостиль (за потреби)", description: "Організовуємо проставлення апостиля в Мін'юсті або МЗС" },
        ],
        faqUk: [
          { question: "Скільки коштує нотаріальний переклад?", answer: "Від 300 грн за сторінку залежно від мови та терміновості. Юридичні документи — від 500 грн за сторінку." },
          { question: "Чи можна замовити переклад дистанційно?", answer: "Так. Надішліть скан документа, ми виконаємо переклад та надішлемо оригінал поштою або кур'єром." },
          { question: "Чи потрібен апостиль для ДМС?", answer: "Для документів з-за кордону — так, потрібен апостиль та нотаріальний переклад. Для українських документів апостиль потрібен, якщо вони подаються за кордон." }
        ],
      },
      {
        title: "Noter İşlemleri",
        titleUk: "Нотаріальні послуги",
        slug: "noter-islemleri",
        shortDescription: "Ukrayna'da noter hizmetleri, vekâletname ve resmi belge onayları",
        shortDescriptionUk: "Нотаріальні послуги в Україні, довіреність та засвідчення офіційних документів",
        icon: Stamp,
        category: "ticari-genel",
        metaTitle: "Ukrayna Noter İşlemleri | Vekâletname ve Belge Onayı",
        metaDescription: "Ukrayna'da noter işlemleri: vekâletname, sözleşme onayı, belge tasdiki. Türk vatandaşları için noter hizmetleri rehberi.",
        heroDescription: "Ukrayna'da her türlü noter işlemi, vekâletname düzenleme ve resmi belge onay süreçlerinde profesyonel destek.",
        content: `Ukrayna'da birçok hukuki işlem noter onayı gerektirmektedir. Gayrimenkul alım-satımı, vekâletname düzenleme, miras işlemleri ve şirket kuruluşu gibi konularda noter hizmetleri sunuyoruz.`,
          contentBlocks: [
            { type: "markdown", content: "### Ukrayna'da Hızlı ve Güvenilir **Noter İşlemleri**\n\nUkrayna'da bir vekaletname vermek, şirket kuruluş senedi onaylatmak veya taşınmaz alım-satım devrini yapmak uzun kuyruklar ve bürokratik engellerle dolu olabilir. Türkiye’deki noter sisteminden farklı olarak Ukrayna’da özel noterlik çok daha geniş ve katı kurallar barındıran bir zemine sahiptir.\n\nEvrak işlemlerinizi sıraya girmeden, dil bariyerini tamamen ortadan kaldıran yeminli tercümanlar eşliğinde koordine ediyor, imza atarken metnin size tanıdığı tüm yetkileri anında kendi dilinizde özetliyoruz." },
            { type: "stats", items: [ { label: "Sıra Bekleme", value: "Sıfır" }, { label: "Anında Tercüme", value: "Yerinde" }, { label: "Güvenlik", value: "Noter Tasdikli" }, { label: "Tüm Yetkiler", value: "Kapsamlı" } ] },
            { type: "why_us", title: "Noter İhtiyaçlarında Neden Aracısız Bizimle Çalışmalısınız?", items: [ "VIP Hizmet: Bekleme salonlarında vakit kaybetmeden, randevu saatinizde anında masaya oturursunuz.", "Anadilinizde Güvence: Vekaletname veya sözleşmenin neleri kapsadığını imza öncesinde şeffafça Türkçe açıklarız.", "Uluslararası Uyumluluk: Türkiye Başkonsolosluğu işlemlerine girecek evrakların, iki ülkenin şartlarını da sağlamasına özen gösteririz." ] },
            { type: "quote", text: "Atılan her imza, hukuki bir sorumluluğun başlangıcıdır. Neyin altına imza attığınızı %100 bilme hakkınızı koruyoruz.", author: "Av. Lyudmyla Chubai" }
          ],
        requiredDocuments: ["Pasaport", "İşleme göre değişen belgeler", "Tercüme belgeleri"],
        processSteps: [
          { title: "İhtiyaç Belirleme", description: "Hangi noter işleminin gerektiğinin belirlenmesi" },
          { title: "Belge Hazırlığı", description: "Noter için gerekli belgelerin hazırlanması" },
          { title: "Noter Randevusu", description: "Noter randevusu ve işlemlerin gerçekleştirilmesi" },
          { title: "Teslim", description: "Onaylı belgelerin teslimi" },
        ],
        faq: [],
        duration: "1-3 iş günü",
        durationUk: "1–3 робочих дні",
        metaTitleUk: "Нотаріальні послуги у Львові | Довіреність, посвідчення — Адвокат",
        metaDescriptionUk: "Нотаріальні послуги у Львові: довіреність, посвідчення договорів, засвідчення копій, заповіт. Супровід нотаріальних дій. Адвокат Чубай.",
        heroDescriptionUk: "Супроводжуємо нотаріальні дії у Львові — від складання довіреності до посвідчення договорів купівлі-продажу та оформлення заповітів.",
        contentBlocksUk: [
          {
            type: "highlight",
            title: "Нотаріальні послуги — юридична безпека кожного документа",
            content: "В Україні **нотаріальне посвідчення** є обов'язковим для багатьох угод: купівля-продаж нерухомості, довіреність, шлюбний договір, заповіт. Ми забезпечуємо підготовку документів та супровід у нотаріуса, щоб процедура пройшла швидко і без помилок."
          },
          {
            type: "features",
            title: "Які нотаріальні дії ми супроводжуємо",
            items: [
              { title: "Довіреність", description: "Генеральна, спеціальна, на представництво в суді, ДМС, банку. У тому числі для іноземців." },
              { title: "Посвідчення договорів", description: "Купівля-продаж нерухомості, дарування, міна, рента, шлюбний договір." },
              { title: "Заповіт", description: "Складання та посвідчення заповіту, секретний заповіт, зміна або скасування заповіту." },
              { title: "Засвідчення копій та підписів", description: "Нотаріальне засвідчення копій документів, справжності підпису на документах." }
            ]
          },
          {
            type: "markdown",
            content: "### Коли потрібен нотаріус\n\n**Обов'язкове нотаріальне посвідчення:**\n- Договір купівлі-продажу нерухомості\n- Договір дарування нерухомості\n- Довіреність на розпорядження нерухомістю\n- Шлюбний договір\n- Заповіт\n- Договір ренти\n\n**Необов'язкове, але рекомендоване:**\n- Договір позики на значну суму\n- Згода подружжя на угоду\n- Засвідчення копій документів для подання за кордон\n\n### Для іноземців\n\nІноземці часто потребують нотаріальних послуг для: довіреності на представника в Україні, посвідчення перекладів, оформлення угод з нерухомістю. Ми забезпечуємо перекладача під час нотаріальних дій."
          },
          {
            type: "stats",
            items: [
              { value: "1–3 дні", label: "Строк оформлення" },
              { value: "1000+", label: "Нотаріальних дій" },
              { value: "100%", label: "Юридична точність" },
              { value: "0", label: "Відмов нотаріуса" }
            ]
          },
          {
            type: "quote",
            text: "Кожен документ, посвідчений нотаріусом, — це юридичний факт. Ми гарантуємо, що цей факт захищає саме ваші інтереси.",
            author: "Адв. Людмила Чубай"
          }
        ],
        requiredDocumentsUk: [
          "Паспорт та ІПН",
          "Документи, що стосуються нотаріальної дії (договір, доручення тощо)",
          "Переклад документів (для іноземних документів)",
        ],
        processStepsUk: [
          { title: "Визначення потреби", description: "Консультуємо щодо необхідності нотаріального посвідчення та переліку документів" },
          { title: "Підготовка документів", description: "Складаємо або перевіряємо документи для нотаріуса" },
          { title: "Нотаріальна дія", description: "Супроводжуємо у нотаріуса, забезпечуємо перекладача за потреби" },
          { title: "Видача документів", description: "Передаємо посвідчені документи, за потреби — організовуємо апостиль" },
        ],
        faqUk: [
          { question: "Скільки коштують нотаріальні послуги?", answer: "Залежить від виду дії: довіреність — від 500 грн, посвідчення договору — від 1% вартості угоди + послуги нотаріуса." },
          { question: "Чи може іноземець оформити довіреність в Україні?", answer: "Так. Потрібен паспорт з нотаріальним перекладом та ІПН. Ми забезпечуємо перекладача під час оформлення." },
          { question: "Чи можна оформити довіреність дистанційно?", answer: "Довіреність оформлюється особисто у нотаріуса. Але ми можемо підготувати всі документи заздалегідь, щоб візит тривав мінімально." }
        ],
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

// Localized service data helpers
import type { Locale } from "@/i18n/config";

export interface LocalizedServiceItem {
  title: string;
  slug: string;
  shortDescription: string;
  icon: LucideIcon;
  category: string;
  duration?: string;
}

export interface LocalizedServiceCategory {
  title: string;
  services: LocalizedServiceItem[];
}

export function getLocalizedServiceCategories(locale: Locale): LocalizedServiceCategory[] {
  return serviceCategories.map((cat) => ({
    title: locale === "uk" ? cat.titleUk : cat.title,
    services: cat.services.map((s) => ({
      title: locale === "uk" ? s.titleUk : s.title,
      slug: s.slug,
      shortDescription: locale === "uk" ? s.shortDescriptionUk : s.shortDescription,
      icon: s.icon,
      category: s.category,
      duration: locale === "uk" ? (s.durationUk ?? s.duration) : s.duration,
    })),
  }));
}

export function getLocalizedServiceBySlug(slug: string, locale: Locale) {
  const service = getServiceBySlug(slug);
  if (!service) return undefined;
  return {
    ...service,
    localizedTitle: locale === "uk" ? service.titleUk : service.title,
    localizedShortDescription: locale === "uk" ? service.shortDescriptionUk : service.shortDescription,
  };
}
