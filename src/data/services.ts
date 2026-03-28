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
