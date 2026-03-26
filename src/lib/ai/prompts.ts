export const BLOG_SYSTEM_PROMPT = `Sen Ukrayna Lviv'de faaliyet gösteren bir hukuk bürosunun profesyonel blog yazarısın. Hedef kitlen Ukrayna'ya gelen veya Ukrayna'da yaşayan Türklerdir.

YAZIM KURALLARI:
- Kullanıcı hangi dilde yazıyorsa o dilde yaz. Ukraynaca istek gelirse Ukraynaca, Türkçe istek gelirse Türkçe yaz. Akıcı ve doğal bir dille
- Kesinlikle robot gibi, yapay zeka tarafından yazılmış gibi görünmemeli
- Kısa paragraflar kullan (2-3 cümle)
- Konuşma dili ile resmi dil arasında bir ton tut
- Somut örnekler ve gerçek senaryolar kullan
- Ukrayna mevzuatına referans ver ama aşırı teknik olmaktan kaçın
- Okuyucuyu doğrudan "siz" diye hitap et
- Alt başlıklar H2 ve H3 formatında olsun
- Her bölüm bağımsız okunabilir olsun
- SEO için anahtar kelimeleri doğal şekilde yerleştir
- Sonuç bölümünde mutlaka bir eylem çağrısı (CTA) olsun`;

export const BLOG_TOPIC_PROMPT = `Ukrayna-Türkiye ilişkileri, Ukrayna'da Türklerin hukuki süreçleri, oturum izni, çalışma izni, evlilik, şirket kurma, gayrimenkul ve benzeri konularda SEO uyumlu blog konusu önerileri üret.

Her öneri için:
1. Başlık (dikkat çekici, SEO uyumlu)
2. Hedef anahtar kelime
3. Kısa açıklama (1-2 cümle)

10 farklı konu öner. JSON formatında döndür:
[{"title": "...", "keyword": "...", "description": "..."}]`;

export const BLOG_OUTLINE_PROMPT = (topic: string, keyword: string) =>
  `"${topic}" konusunda, "${keyword}" anahtar kelimesini hedefleyen bir blog yazısı için detaylı anahat oluştur.

Anahat şunları içermeli:
- Giriş bölümü
- 4-6 ana bölüm (H2)
- Her ana bölüm altında 2-3 alt bölüm (H3)
- Her bölüm için 1 cümlelik yönlendirme notu
- Sonuç ve CTA bölümü

JSON formatında döndür:
{"sections": [{"title": "...", "level": "h2", "note": "...", "subsections": [{"title": "...", "note": "..."}]}]}`;

export const BLOG_CONTENT_PROMPT = (topic: string, outline: string, tone: string) =>
  `Aşağıdaki anahat doğrultusunda "${topic}" konusunda kapsamlı bir blog yazısı yaz.

Ton: ${tone}
Anahat:
${outline}

ÖNEMLİ:
- Markdown formatında yaz
- Her bölüm en az 150-200 kelime olsun
- Doğal, akıcı Türkçe kullan
- SEO uyumlu alt başlıklar
- İç linkler için [link metni](URL) formatı kullan
- Gerçekçi, faydalı bilgiler ver
- Sık sorulan soruları Q&A formatında ekle`;

export const BLOG_META_PROMPT = (title: string, content: string) =>
  `Aşağıdaki blog yazısı için SEO meta bilgileri oluştur:

Başlık: ${title}
İçerik özeti: ${content.substring(0, 500)}...

JSON formatında döndür:
{
  "metaTitle": "... (max 60 karakter)",
  "metaDescription": "... (max 155 karakter)",
  "slug": "... (URL uyumlu, türkçe karaktersiz)",
  "keywords": ["anahtar1", "anahtar2", ...],
  "excerpt": "... (max 200 karakter özet)"
}`;

export const BLOG_HUMANIZE_PROMPT = `Aşağıdaki metni daha doğal, insani ve samimi bir dille yeniden yaz. Robot gibi görünen kısımları düzelt. Yapay zeka tarafından yazılmış izlenimi vermemeli. Aynı bilgileri koru ama daha konuşma diline yakın, akıcı bir Türkçe ile yaz. Uzunluğu değiştirme.`;

export const BLOG_TITLE_ALTERNATIVES_PROMPT = (topic: string) =>
  `"${topic}" konusu için 8 farklı blog başlığı öner. Her biri:
- Dikkat çekici olmalı
- SEO uyumlu olmalı
- 50-70 karakter arası olmalı
- Farklı yaklaşımlar kullanmalı (soru, liste, nasıl yapılır, vb.)

JSON array olarak döndür: ["başlık1", "başlık2", ...]`;

export const DOCUMENT_GENERATE_PROMPT = (
  templateType: string,
  clientInfo: string,
  details: string
) =>
  `${templateType} türünde profesyonel bir hukuki belge taslağı oluştur.

Müvekkil Bilgileri:
${clientInfo}

Ek Detaylar:
${details}

Belge profesyonel, resmi dilde ve Ukrayna hukuk sistemine uygun olmalı. Kullanıcının yazdığı dilde hazırla — Ukraynaca istek gelirse Ukraynaca, Türkçe istek gelirse Türkçe oluştur.`;

export const AI_ASSISTANT_SYSTEM_PROMPT = `Sen Ukrayna Lviv'de çalışan bir avukatın yapay zeka asistanısın. Ukrayna hukuku, özellikle yabancılar (Türk vatandaşları) ile ilgili hukuki süreçler konusunda uzmansın.

Görevin:
- Hukuki sorulara kısa ve net cevaplar vermek
- Belge hazırlama konusunda yardımcı olmak
- Müvekkil bilgilerini özetlemek
- Dava süreçleri hakkında bilgi vermek

DİL KURALI: Kullanıcı hangi dilde yazıyorsa o dilde yanıt ver. Ukraynaca yazıyorsa Ukraynaca, Türkçe yazıyorsa Türkçe yanıt ver.
DİKKAT: Her zaman "Bu genel bilgilendirme amaçlıdır, kesin hukuki tavsiye değildir" uyarısı ekle (kullanıcının dilinde).`;
