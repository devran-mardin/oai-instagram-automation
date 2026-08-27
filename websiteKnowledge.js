/* ═══════════════════════════════════════════════════
   OTOMASYONAI WEB SİTESİ CANLI BİLGİ BANKASI (KNOWLEDGE BASE)
   Projeler/Otomasyon_Marketi verilerinden çekilmiştir.
   ═══════════════════════════════════════════════════ */

const WEBSITE_KNOWLEDGE_BASE = {
  brand: {
    name: "OtomasyonAI",
    website: "https://otomasyonmarketi.netai",
    location: "Antalya, Türkiye",
    whatsapp: "0553 055 13 69",
    whatsappLink: "https://wa.me/905530551369",
    email: "platform@otomasyonmarketi.net",
    instagram: "@otomasyon_ai (https://www.instagram.com/otomasyon_ai/)",
    slogan: "Yapay zeka destekli otomasyon çözümleri ile işletmenizi geleceğe taşıyın."
  },

  campaigns: {
    freeTrial: {
      title: "1 Ay Ücretsiz Deneme Kampanyası",
      description: "Seçtiğiniz otomasyonu 30 gün boyunca hiçbir abonelik veya kurulum ücreti ödemeden canlı deneyebilirsiniz.",
      terms: "30 günlük sürenin sonunda taahhüt, cayma bedeli veya cezai şart yoktur. İster devam eder, ister iptal edersiniz."
    }
  },

  products: [
    {
      id: "whatsapp-ai",
      name: "WhatsApp Akıllı Müşteri Temsilcisi",
      price: "₺2.490 /aylık",
      numericPrice: 2490,
      billing: "Aylık",
      features: [
        "7/24 Akıllı Müşteri Cevaplama",
        "Müşteri Bilgilerini (Ad, Tel, E-posta) Toplama",
        "Otomatik Randevu Oluşturma",
        "Ürün ve Hizmet Fiyat Bilgisi Verme",
        "Satışa Yönlendirme",
        "Zorlu Sorularda İnsan Personele Aktarma",
        "AI Telefon Asistanı Modülü (+₺2.100 Opsiyonel)"
      ]
    },
    {
      id: "randevu-takvim",
      name: "AI Akıllı Randevu & Takvim Otomasyonu",
      price: "₺1.390 /aylık",
      numericPrice: 1390,
      billing: "Aylık",
      features: [
        "Google Takvim & Cal.com Entegrasyonu",
        "Otomatik Müşteri Randevu Hatırlatma (SMS/WhatsApp)",
        "Çift Randevu Çakışmasını Önleme",
        "İptal ve Değişiklik Yönetimi"
      ]
    },
    {
      id: "instagram-dm",
      name: "Instagram Auto-DM & Yorum Yanıtlayıcı",
      price: "₺2.490 /aylık",
      numericPrice: 2490,
      billing: "Aylık",
      features: [
        "Reels Yorumlarını Anında Beğenme ve Yorum Atma",
        "Yorum Yapan Takipçiye Otomatik DM Gönderme",
        "Gelen DM Sorularına 7/24 Yapay Zeka Yanıtı",
        "Özel İndirim & Kampanya Linki İletme"
      ]
    },
    {
      id: "email-assistant",
      name: "AI Akıllı E-Posta Asistanı",
      price: "₺1.990 /aylık",
      numericPrice: 1990,
      billing: "Aylık",
      features: [
        "Gelen Müşteri & Tedarikçi Maillerini Analiz Etme",
        "Kurumsal Dilde Otomatik Yanıt Taslağı Oluşturma",
        "Önemli Talepleri Etiketleme ve Bildirim Gönderme"
      ]
    },
    {
      id: "b2b-lead-finder",
      name: "B2B Müşteri & E-Posta Bulucu (Lead Scraping)",
      price: "₺2.490 /tek seferlik",
      numericPrice: 2490,
      billing: "Tek Seferlik",
      features: [
        "Google Haritalar & Sektörel Rehberlerden Veri Çekme",
        "Hedef Sektördeki Şirketlerin Tel & E-Postalarını Listeleme",
        "Excel / CSV Formatında Anında Teslim"
      ]
    },
    {
      id: "stok-control",
      name: "Market Stock Control Otomasyonu",
      price: "₺49.900 /tek seferlik",
      numericPrice: 49900,
      billing: "Tek Seferlik",
      features: [
        "Market & E-Ticaret Anlık Stok Takibi",
        "Kritik Stok Uyarısı (WhatsApp & Telegram Alarmı)",
        "ERP & Trendyol / Hepsiburada Otomatik Entegrasyon"
      ]
    },
    {
      id: "custom-automation",
      name: "Özel / Kurumsal Terzi Usulü Otomasyon",
      price: "İhtiyaca Özel Teklif",
      billing: "Özel Mimari",
      features: [
        "İşletmenizin Özel Yazılımlarına Entegrasyon",
        "Özel Yapay Zeka Ajan Mimarisi",
        "SLA & Güvenlik Garantisi"
      ]
    }
  ],

  faqs: [
    {
      q: "Otomasyonların kurulumu nasıl yapılıyor? Benim teknik bilgiye ihtiyacım var mı?",
      a: "Hayır! Tüm kurulum, yapılandırma ve test süreçleri uzman ekibimiz tarafından anahtar teslim yapılmaktadır."
    },
    {
      q: "Hesabım kapanır mı? Meta veya Telegram kurallarına uygun mu?",
      a: "Tüm sistemlerimiz Meta (WhatsApp & Instagram API) ve Telegram'ın resmi API altyapısı ile %100 uyumlu ve resmi izinli çalışır."
    },
    {
      q: "Deneme süresi bittiğinde zorunlu ödeme var mı?",
      a: "Kesinlikle hayır. 30 günlük ücretsiz deneme sonunda onayınız olmadan herhangi bir çekim yapılmaz."
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = WEBSITE_KNOWLEDGE_BASE;
}
