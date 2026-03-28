import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  generateBreadcrumbSchema,
  generateBlogPostSchema,
} from "@/lib/seo/schemas";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localizedHref } from "@/i18n/locale-utils";

// Placeholder blog content — will be replaced with DB queries when admin is ready
const placeholderPostsContent: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readingTime: number;
    metaDescription: string;
    content: string;
  }
> = {
  "ukraynada-oturum-izni-nasil-alinir": {
    title: "Ukrayna'da Oturum İzni Nasıl Alınır? 2024 Kapsamlı Rehber",
    category: "Oturum İzni",
    date: "2024-12-15",
    readingTime: 8,
    metaDescription:
      "Ukrayna'da geçici ve kalıcı oturum izni başvurusu nasıl yapılır? 2024 güncel gereksinimler, belgeler ve adım adım süreç rehberi.",
    content: `Ukrayna'da yaşamak isteyen Türk vatandaşları için oturum izni almak, en kritik hukuki adımlardan biridir. Bu rehberde, 2024 yılı itibarıyla güncel başvuru sürecini detaylı olarak inceliyoruz.

## Oturum İzni Türleri

Ukrayna'da iki temel oturum izni türü bulunmaktadır:

**Geçici Oturum İzni (Тимчасове проживання):** 1 yıla kadar geçerli olan bu izin; çalışma, eğitim, aile birleşimi veya yatırım gerekçelerinden biriyle alınabilir.

**Kalıcı Oturum İzni (Постійне проживання):** Süresiz geçerli olan bu izin, belirli koşulların sağlanmasının ardından verilebilir. Genellikle 5 yıl süreyle Ukrayna'da yasal olarak yaşamış olanlar başvurabilir.

## Başvuru İçin Gerekli Belgeler

Başvuru sürecinde aşağıdaki belgeler talep edilmektedir:
- Geçerli pasaport (en az 6 ay süreli)
- Sağlık sigortası
- İkamet adresi belgesi
- Başvuru gerekçesini destekleyen belgeler
- 4 adet biyometrik fotoğraf
- Adli sicil kaydı (apostilli)
- Tercüme ve noter onaylı belgeler

## Başvuru Süreci

1. **Belge Hazırlığı:** Tüm belgelerin Ukraynacaya çevrilmesi ve noter onayı
2. **Başvuru Randevusu:** Göç idaresine randevu alınması
3. **Başvuru Sunumu:** Belgelerin göç dairesine teslimi
4. **İnceleme Süreci:** 15-30 iş günü bekleme süresi
5. **Sonuç:** Onay durumunda oturum kartının teslim alınması

## Profesyonel Destek Neden Önemli?

Ukrayna göç mevzuatı sık değişiklik göstermektedir. Eksik veya hatalı başvurular reddedilebilir ve bu durum hem zaman hem de maddi kayba neden olabilir. Profesyonel hukuki destek ile başvurunuzun doğru ve eksiksiz yapılmasını sağlayabilirsiniz.

Oturum izni başvurunuz hakkında ücretsiz ön değerlendirme için bizimle iletişime geçebilirsiniz.`,
  },
  "ukraynada-turk-vatandaslari-evlilik": {
    title: "Ukrayna'da Türk Vatandaşlarının Evlilik İşlemleri",
    category: "Aile Hukuku",
    date: "2024-11-28",
    readingTime: 6,
    metaDescription:
      "Türk vatandaşlarının Ukrayna'da evlenme süreci, gerekli belgeler ve hukuki prosedür hakkında kapsamlı bilgiler.",
    content: `Ukrayna'da bir Türk vatandaşı olarak evlenme süreci, bazı özel hukuki gereksinimleri beraberinde getirmektedir. Bu yazımızda sürecin tüm aşamalarını ele alıyoruz.

## Evlilik Başvurusu İçin Gerekenler

Türk vatandaşlarının Ukrayna'da evlenebilmesi için aşağıdaki belgeleri hazırlaması gerekmektedir:
- Geçerli pasaport
- Bekârlık belgesi (Türkiye'den alınacak, apostilli)
- Doğum belgesi (apostilli)
- Nüfus kayıt örneği
- Belgelerin Ukraynaca tercümesi ve noter onayı

## Süreç Adımları

1. **Belge Hazırlığı:** Türkiye'den gerekli belgelerin temini ve apostillenmesi
2. **Tercüme ve Onay:** Belgelerin yeminli tercüman tarafından Ukraynacaya çevrilmesi
3. **RACS Başvurusu:** Ukrayna Sivil Kayıt Dairesi'ne (РАЦС) başvuru
4. **Bekleme Süresi:** 30 günlük yasal bekleme süresi (acil durumlarda kısaltılabilir)
5. **Nikâh Töreni:** Resmi nikâh işlemi

## Önemli Bilgiler

Evlilik işlemi sonrasında Türkiye'deki nüfus müdürlüğüne de bildirim yapılması gerekmektedir. Ayrıca evlilik, oturum izni başvurusunda ek bir gerekçe olarak kullanılabilir.

Evlilik süreciniz hakkında detaylı bilgi ve destek için ofisimize başvurabilirsiniz.`,
  },
};

// Ukrainian blog post content
const placeholderPostsContentUk: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readingTime: number;
    metaDescription: string;
    content: string;
  }
> = {
  "yak-oformyty-spadshchynu-u-lvovi": {
    title: "Як правильно оформити спадщину у Львові: покрокова інструкція",
    category: "Спадкове право",
    date: "2025-03-10",
    readingTime: 9,
    metaDescription:
      "Як оформити спадщину у Львові: строки, документи, черги спадкоємців за законом та заповітом. Покрокова інструкція від адвоката.",
    content: `Оформлення спадщини — одна з найпоширеніших юридичних процедур, з якою стикаються громадяни України. Проте навіть у стандартних випадках виникають складнощі: пропущені строки, спори між спадкоємцями, відсутність документів. У цій статті розглянемо покрокову процедуру оформлення спадщини у Львові.

## Строки прийняття спадщини

Відповідно до статті 1270 Цивільного кодексу України, спадщину необхідно прийняти **протягом 6 місяців** з дня відкриття спадщини (тобто з дня смерті спадкодавця).

**Важливо:** якщо ви пропустили цей строк — його можна поновити через суд, але лише за наявності поважних причин (хвороба, перебування за кордоном, незнання про смерть тощо).

## Черги спадкоємців за законом

Якщо заповіту немає, спадщина розподіляється за чергами:
- **1 черга:** діти, батьки, подружжя
- **2 черга:** рідні брати та сестри, бабусі та дідусі
- **3 черга:** рідні дядьки та тітки
- **4 черга:** особи, які проживали разом зі спадкодавцем не менше 5 років
- **5 черга:** інші родичі до 6 ступеня споріднення

## Необхідні документи

Для оформлення спадщини у нотаріуса потрібно підготувати:
- Свідоцтво про смерть (оригінал)
- Документ, що підтверджує родинні зв'язки
- Паспорт та ІПН спадкоємця
- Правовстановлюючі документи на майно
- Довідка про останнє місце проживання спадкодавця
- Заява про прийняття спадщини

## Покрокова процедура

1. **Звернення до нотаріуса** — протягом 6 місяців подайте заяву про прийняття спадщини до нотаріуса за останнім місцем проживання спадкодавця
2. **Збір документів** — підготуйте всі необхідні документи та оцінку майна
3. **Отримання свідоцтва** — після спливу 6 місяців нотаріус видає свідоцтво про право на спадщину
4. **Реєстрація права власності** — зареєструйте право на нерухомість у Державному реєстрі речових прав

## Податок на спадщину

Ставка податку залежить від ступеня споріднення:
- **0%** — спадкоємці 1-2 черги (діти, батьки, подружжя, брати, сестри)
- **5%** — інші спадкоємці
- **18%** — спадкоємці-нерезиденти

## Коли потрібен адвокат?

Допомога адвоката необхідна, якщо є спори між спадкоємцями, пропущено строк прийняття, спадщина включає корпоративні права або нерухомість за кордоном. Наша команда у Львові має багаторічний досвід у спадкових справах та допоможе на кожному етапі.`,
  },
  "rozluchennya-v-ukrayini-2025": {
    title: "Розлучення в Україні у 2025 році: через РАЦС та суд",
    category: "Сімейне право",
    date: "2025-02-18",
    readingTime: 8,
    metaDescription:
      "Розлучення в Україні 2025: через РАЦС та суд, необхідні документи, поділ майна, аліменти. Юридичний гайд від адвоката у Львові.",
    content: `Розлучення — це завжди непростий крок. Проте знання юридичної процедури допоможе пройти цей процес швидше та з мінімальними втратами. У 2025 році в Україні існує два шляхи розірвання шлюбу: через РАЦС (ДРАЦС) та через суд.

## Розлучення через РАЦС

Подружжя може розірвати шлюб через РАЦС, якщо виконуються **обидві умови**:
- Обоє згодні на розлучення
- Немає спільних неповнолітніх дітей

**Процедура:**
1. Подача спільної заяви до РАЦС (особисто або через «Дію»)
2. Місячний строк для примирення
3. Повторна явка та отримання свідоцтва про розірвання шлюбу

**Вартість:** державне мито — 0,5 прожиткового мінімуму (близько 700 грн у 2025 році).

## Розлучення через суд

Звернення до суду обов'язкове, якщо:
- Є спільні неповнолітні діти
- Один з подружжя не згоден
- Потрібен поділ майна

**Документи для суду:**
- Позовна заява
- Свідоцтво про шлюб (оригінал)
- Свідоцтва про народження дітей
- Документи на спільне майно
- Квитанція про сплату судового збору

**Строки:** розгляд справи займає від 1 до 6 місяців залежно від складності.

## Поділ спільного майна

Згідно зі ст. 60 Сімейного кодексу України, майно, набуте у шлюбі, належить подружжю на праві **спільної сумісної власності** і ділиться порівну. Виняток — майно, отримане у спадщину або дарунок.

**Що вважається спільним:**
- Нерухомість, придбана у шлюбі
- Автомобілі
- Банківські вклади та інвестиції
- Доходи від підприємницької діяльності

## Аліменти на дітей

Після розлучення той з батьків, хто не проживає з дитиною, зобов'язаний сплачувати аліменти — не менше **50% прожиткового мінімуму** для дитини відповідного віку (ст. 182 СК).

## Поради адвоката

Якщо розлучення супроводжується спорами щодо дітей або майна — обов'язково зверніться до адвоката. Грамотна правова позиція на ранній стадії може зекономити місяці судових розглядів та значні кошти.`,
  },
  "reyestratsiya-tov-u-lvovi": {
    title: "Реєстрація ТОВ у Львові: повний гайд для підприємців",
    category: "Бізнес право",
    date: "2025-01-25",
    readingTime: 10,
    metaDescription:
      "Як зареєструвати ТОВ у Львові: документи, статутний капітал, система оподаткування, строки. Покрокова інструкція від юриста.",
    content: `Товариство з обмеженою відповідальністю (ТОВ) — найпопулярніша організаційно-правова форма бізнесу в Україні. У цій статті розглянемо, як зареєструвати ТОВ у Львові у 2025 році: від підготовки документів до отримання виписки з ЄДР.

## Переваги ТОВ

Чому підприємці обирають саме ТОВ:
- Обмежена відповідальність учасників (ризикуєте лише внеском)
- Можливість мати кількох засновників
- Гнучка система управління
- Можливість залучення інвестицій
- Більша довіра контрагентів та банків

## Необхідні документи

Для реєстрації ТОВ потрібно підготувати:
- Рішення засновника (або протокол зборів засновників)
- Статут товариства
- Заява про державну реєстрацію (форма 1)
- Копії паспортів та ІПН засновників і директора
- Документ про юридичну адресу

## Статутний капітал

З 2024 року мінімальний статутний капітал ТОВ **не встановлений законом** — його розмір визначають засновники самостійно. Проте для деяких видів діяльності (банки, страхові компанії) існують обов'язкові мінімуми.

**Практична рекомендація:** оптимальний початковий статутний капітал — від 1 000 грн. Це демонструє серйозність намірів без зайвого навантаження.

## Покрокова процедура реєстрації

1. **Підготовка документів** — складання статуту, рішення засновників, заповнення форм
2. **Подання до державного реєстратора** — через ЦНАП (Центр надання адміністративних послуг) або онлайн через «Дію»
3. **Отримання виписки з ЄДР** — протягом 24 годин після подання
4. **Відкриття банківського рахунку** — обираєте банк та подаєте документи
5. **Реєстрація в податковій** — обрання системи оподаткування (загальна або спрощена)
6. **Замовлення печатки** (за бажанням — з 2017 року печатка не є обов'язковою)

## Система оподаткування

ТОВ може обрати одну з двох систем:

**Загальна система:**
- Податок на прибуток — 18%
- ПДВ — 20% (обов'язково при обороті понад 1 млн грн)

**Спрощена система (3 група):**
- Єдиний податок — 5% (без ПДВ) або 3% (з ПДВ)
- Обмеження обороту — до 1167 мінімальних зарплат на рік

## Строки та вартість

Реєстрація ТОВ під ключ зазвичай займає **3-5 робочих днів**. Державне мито за реєстрацію — безкоштовно. Вартість юридичних послуг у Львові — від 3 000 до 8 000 грн залежно від складності структури.

## Звертайтесь до нас

Ми допоможемо підготувати всі документи, обрати оптимальну систему оподаткування та пройти реєстрацію швидко та без помилок.`,
  },
  "prava-pratsivnyka-pry-zvilnenni": {
    title: "Права працівника при звільненні: що потрібно знати у 2025",
    category: "Трудове право",
    date: "2025-01-08",
    readingTime: 7,
    metaDescription:
      "Права працівника при звільненні в Україні: підстави за КЗпП, вихідна допомога, строки розрахунку, оскарження незаконного звільнення.",
    content: `Звільнення з роботи — стресова ситуація, але знання своїх прав допоможе захиститися від незаконних дій роботодавця. У цій статті розглянемо основні підстави звільнення, ваші права та порядок оскарження.

## Підстави звільнення за КЗпП

Кодекс законів про працю України передбачає кілька підстав розірвання трудового договору:

**За ініціативою працівника (ст. 38):**
- Подання заяви за 2 тижні до звільнення
- У разі порушення роботодавцем законодавства — без відпрацювання

**За ініціативою роботодавця (ст. 40):**
- Скорочення штату
- Невідповідність займаній посаді
- Систематичне невиконання обов'язків
- Прогул без поважних причин
- Поява на роботі в стані сп'яніння

**За угодою сторін (ст. 36):**
- Обидві сторони домовляються про умови

## Ваші права при звільненні

Незалежно від підстави звільнення, роботодавець зобов'язаний:
- Видати трудову книжку (або надати інформацію з реєстру) **у день звільнення**
- Провести повний розрахунок **у день звільнення** (ст. 116 КЗпП)
- Виплатити компенсацію за невикористану відпустку
- Видати копію наказу про звільнення (за вимогою)

## Вихідна допомога

При деяких підставах звільнення працівнику належить вихідна допомога:
- **Скорочення штату** — не менше середньомісячного заробітку
- **Порушення роботодавцем законодавства** — не менше 3-місячного заробітку
- **Призов на військову службу** — не менше 2-місячного заробітку

## Кого не можна звільнити?

Законодавство забороняє звільнення за ініціативою роботодавця:
- Вагітних жінок та жінок з дітьми до 3 років
- Одиноких матерів з дітьми до 14 років
- Працівників під час відпустки або лікарняного

## Як оскаржити незаконне звільнення?

Якщо ви вважаєте звільнення незаконним:
1. **Подайте позов до суду** протягом 1 місяця з дня отримання наказу (ст. 233 КЗпП)
2. **Судовий збір** — звільнені від сплати (працівники не платять за трудові спори)
3. **Результат** — суд може поновити на роботі та стягнути зарплату за весь час вимушеного прогулу

## Порада адвоката

Зберігайте всі документи: копію трудового договору, наказів, розрахункових листків. У разі конфлікту з роботодавцем — зверніться до адвоката якнайраніше. Це значно підвищить шанси на успішне вирішення справи.`,
  },
  "kupivlya-kvartiry-u-lvovi": {
    title: "Купівля квартири у Львові: юридичні нюанси та перевірка",
    category: "Нерухомість",
    date: "2024-12-20",
    readingTime: 9,
    metaDescription:
      "Купівля квартири у Львові: юридична перевірка, договір купівлі-продажу, податки, ризики. Практичні поради від адвоката з нерухомості.",
    content: `Купівля квартири — одна з найбільших фінансових операцій у житті. У Львові ринок нерухомості активно розвивається, і разом із цим зростає кількість юридичних ризиків. У цьому гайді розкажемо, як убезпечити себе при купівлі квартири.

## Юридична перевірка перед купівлею

Перш ніж підписувати будь-які документи, необхідно перевірити:

**Право власності продавця:**
- Витяг з Державного реєстру речових прав на нерухоме майно
- Підстави набуття (договір купівлі-продажу, дарування, свідоцтво про спадщину)
- Відсутність обтяжень, арештів та іпотеки

**Технічна документація:**
- Технічний паспорт на квартиру
- Відповідність фактичного планування документам (перепланування мають бути узаконені)

**Юридична чистота:**
- Відсутність зареєстрованих мешканців
- Згода подружжя продавця (якщо майно набуте у шлюбі)
- Відсутність прав неповнолітніх на квартиру

## Договір купівлі-продажу

Договір купівлі-продажу нерухомості в Україні **обов'язково посвідчується нотаріально** (ст. 657 ЦК). Нотаріус перевіряє:
- Дієздатність сторін
- Відсутність заборон на відчуження
- Правильність реквізитів
- Сплату необхідних податків

**На що звернути увагу в договорі:**
- Повна ціна квартири (не занижена)
- Строки передачі та виселення попередніх мешканців
- Стан квартири та комунікацій
- Відповідальність за приховані недоліки

## Податки при купівлі

При оформленні купівлі-продажу сплачуються:
- **1% від вартості** — збір до Пенсійного фонду (сплачує покупець)
- **Держмито** — 1% від вартості
- **Податок на дохід** — 5% + 1,5% військовий збір (сплачує продавець, якщо продає вперше за рік — 0%)
- **Послуги нотаріуса** — від 3 000 до 10 000 грн

## Поширені ризики

**На що звернути увагу:**
- Квартира в новобудові без введення в експлуатацію
- Продаж за дорученням (перевірте дійсність довіреності)
- Заниження ціни в договорі (ризик втрати коштів при визнанні правочину недійсним)
- Борги за комунальні послуги
- Спадкові квартири (можуть з'явитися невідомі спадкоємці)

## Новобудови: особливі нюанси

При купівлі квартири в новобудові:
- Перевірте дозвільну документацію забудовника
- Переконайтесь у введенні будинку в експлуатацію
- Уважно читайте договір із забудовником (інвестиційний, пайовий, попередній)
- Перевірте історію забудовника (відгуки, завершені проєкти)

## Рекомендація

Юридичний супровід купівлі квартири — це інвестиція у вашу безпеку. Адвокат перевірить документи, виявить ризики та проконтролює процес оформлення. Вартість юридичного супроводу — від 5 000 грн, що мізерно порівняно з ціною квартири.`,
  },
  "zakhyst-prav-spozhyvachiv": {
    title: "Захист прав споживачів: як повернути неякісний товар",
    category: "Цивільне право",
    date: "2024-12-05",
    readingTime: 6,
    metaDescription:
      "Захист прав споживачів в Україні: повернення товару, строки, претензія продавцю, суд. Поради адвоката у Львові.",
    content: `Кожен із нас хоча б раз стикався з неякісним товаром або неналежним обслуговуванням. Закон України «Про захист прав споживачів» надає широкі можливості для захисту ваших інтересів. Розглянемо основні права та порядок дій.

## Ваші основні права як споживача

Згідно із Законом, ви маєте право на:
- **Якісний товар** — товар повинен відповідати заявленим характеристикам
- **Безпеку** — товар не повинен завдавати шкоди здоров'ю
- **Повну інформацію** — про товар, виробника, гарантію
- **Відшкодування збитків** — у разі придбання неякісного товару

## Повернення якісного товару

Якщо товар якісний, але не підійшов за формою, розміром, кольором:
- **Строк повернення** — 14 днів з моменту покупки (не рахуючи дня придбання)
- **Умови:** товар не використовувався, збережено товарний вигляд, ярлики, чек
- **Результат:** обмін або повернення коштів протягом 7 днів

**Увага:** деякі категорії товарів не підлягають поверненню (білизна, ліки, парфуми тощо — повний перелік у Постанові КМУ №172).

## Повернення неякісного товару

Якщо товар має недоліки (дефект, брак):

**Протягом гарантійного строку** ви маєте право вимагати:
- Безоплатного усунення недоліків (ремонт)
- Зменшення ціни
- Заміни на аналогічний товар
- Повернення грошей

**Якщо гарантія не встановлена** — строк звернення становить 2 роки з моменту покупки.

## Порядок подання претензії

1. **Складіть письмову претензію** — опишіть проблему, вкажіть вимоги, додайте копію чека
2. **Подайте продавцю** — особисто (з відміткою про отримання) або рекомендованим листом
3. **Очікуйте відповідь** — продавець має 14 днів на розгляд
4. **Якщо відмовили** — зверніться до суду

## Захист через суд

Споживачі мають значні переваги в суді:
- **Звільнені від судового збору** (позови до 2 млн грн)
- Можуть подати позов **за місцем свого проживання**
- Мають право на **моральну компенсацію**
- Суд може стягнути **пеню** за кожен день прострочення (1% від вартості товару)

## Практичні поради

- Завжди зберігайте чеки та гарантійні талони
- Фотографуйте дефекти товару
- Подавайте претензію письмово (не усно!)
- Не зволікайте — строки дуже важливі

Якщо продавець відмовляється добровільно задовольнити ваші вимоги — зверніться до адвоката. Ми допоможемо скласти претензію та, за потреби, представимо ваші інтереси в суді.`,
  },
};

const allSlugsTr = [
  "ukraynada-oturum-izni-nasil-alinir",
  "ukraynada-turk-vatandaslari-evlilik",
  "ukraynada-sirket-kurma-rehberi",
  "ukrayna-calisma-izni-sureci",
  "ukraynada-gayrimenkul-alimi",
  "ukrayna-vize-turleri-karsilastirma",
];

const allSlugsUk = [
  "yak-oformyty-spadshchynu-u-lvovi",
  "rozluchennya-v-ukrayini-2025",
  "reyestratsiya-tov-u-lvovi",
  "prava-pratsivnyka-pry-zvilnenni",
  "kupivlya-kvartiry-u-lvovi",
  "zakhyst-prav-spozhyvachiv",
];

export function generateStaticParams() {
  const trParams = allSlugsTr.map((slug) => ({ locale: "tr", slug }));
  const ukParams = allSlugsUk.map((slug) => ({ locale: "uk", slug }));
  return [...trParams, ...ukParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const isUk = locale === "uk";
  const postsContent = isUk ? placeholderPostsContentUk : placeholderPostsContent;
  const post = postsContent[slug];
  if (!post) return {};
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lvivavukat.com";
  const postHref = localizedHref(`/blog/${slug}`, locale as Locale);
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical: `${siteUrl}${postHref}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      url: `${siteUrl}${postHref}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const isUk = locale === "uk";
  const dict = await getDictionary(locale as Locale);
  const postsContent = isUk ? placeholderPostsContentUk : placeholderPostsContent;
  const allSlugs = isUk ? allSlugsUk : allSlugsTr;
  const post = postsContent[slug];
  const dateLocale = isUk ? "uk-UA" : "tr-TR";

  if (!post) {
    // For slugs that exist in the static list but have no content yet
    if (allSlugs.includes(slug)) {
      return <PlaceholderPost slug={slug} locale={locale as Locale} />;
    }
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lvivavukat.com";
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.nav.home, url: `${siteUrl}${localizedHref("/", locale as Locale)}` },
    { name: dict.blog.title, url: `${siteUrl}${localizedHref("/blog", locale as Locale)}` },
    { name: post.title, url: `${siteUrl}${localizedHref(`/blog/${slug}`, locale as Locale)}` },
  ]);
  const blogSchema = generateBlogPostSchema({
    title: post.title,
    description: post.metaDescription,
    url: `${siteUrl}${localizedHref(`/blog/${slug}`, locale as Locale)}`,
    datePublished: post.date,
    dateModified: post.date,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            homeHref={localizedHref("/", locale as Locale)}
            items={[
              { label: "Blog", href: localizedHref("/blog", locale as Locale) },
              { label: post.title },
            ]}
          />
          <div className="mt-6 flex items-center gap-3 text-sm text-white/50">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-accent/20 text-accent 
              font-semibold rounded-md text-xs">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.date).toLocaleDateString(dateLocale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime} {dict.blog.minRead}
            </span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white max-w-4xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Article */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-serif font-bold text-foreground mt-10 mb-4">
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return (
                  <p key={i} className="font-semibold text-foreground mb-4">
                    {block.replace(/\*\*/g, "")}
                  </p>
                );
              }
              if (block.startsWith("- ")) {
                const items = block.split("\n").filter((l) => l.startsWith("- "));
                return (
                  <ul key={i} className="space-y-2 my-4">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                        <span>{item.replace("- ", "")}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.match(/^\d+\.\s/)) {
                const items = block.split("\n").filter((l) => l.match(/^\d+\.\s/));
                return (
                  <ol key={i} className="space-y-2 my-4 list-none">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{j + 1}</span>
                        </span>
                        <span dangerouslySetInnerHTML={{
                          __html: item
                            .replace(/^\d+\.\s/, "")
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                        }} />
                      </li>
                    ))}
                  </ol>
                );
              }
              // Handle inline bold
              const html = block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
              return <p key={i} className="mb-4" dangerouslySetInnerHTML={{ __html: html }} />;
            })}
          </article>

          {/* Share + back */}
          <div className="mt-12 pt-8 border-t border-border/50 flex items-center justify-between">
            <Link
              href={localizedHref("/blog", locale as Locale)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent 
                hover:text-accent-hover transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {dict.blog.allPosts}
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
              aria-label={isUk ? "Поділитися" : "Paylaş"}
            >
              <Share2 className="w-4 h-4" />
              {isUk ? "Поділитися" : "Paylaş"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function PlaceholderPost({ slug, locale }: { slug: string; locale: Locale }) {
  const isUk = locale === "uk";
  return (
    <>
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Blog", href: localizedHref("/blog", locale) },
              { label: isUk ? "Стаття" : "Yazı" },
            ]}
          />
          <h1 className="mt-6 text-3xl sm:text-4xl font-serif font-bold text-white">
            {isUk ? "Ця стаття скоро буде опублікована" : "Bu yazı yakında yayınlanacak"}
          </h1>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted mb-6">
            {isUk
              ? "Ця стаття блогу готується до публікації. Вона з'явиться найближчим часом."
              : "Bu blog yazısı hazırlık aşamasındadır. Çok yakında yayınlanacaktır."}
          </p>
          <Link
            href={localizedHref("/blog", locale)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent 
              hover:text-accent-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {isUk ? "Повернутися до блогу" : "Blog'a Dön"}
          </Link>
        </div>
      </section>
    </>
  );
}
