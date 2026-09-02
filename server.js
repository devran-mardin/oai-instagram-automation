/* ═══════════════════════════════════════════════════
  @otomasyon_ai — LIVE INSTAGRAM AUTOMATION SERVER
  Meta Graph API Webhook & AI Auto-Reply Engine
  ═══════════════════════════════════════════════════ */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const websiteKnowledge = require("./websiteKnowledge");

const app = express();
const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "otomasyon_ai_secure_webhook_token_2026";
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || "";
const GRAPH_API_URL = "https://graph.facebook.com/v19.0";

const path = require("path");
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

app.use(cors());
app.use(express.json());

// Statik dosya servisi (index.html, style.css, app.js test simülatörü için)
app.use(express.static(__dirname));

// ── 1. Ana Sayfa, Demo & Sağlık Kontrolü ──
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/status", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>@otomasyon_ai — Canlı Bot Durumu</title>
        <style>
          body { font-family: sans-serif; background: #090d16; color: #f8fafc; text-align: center; padding: 3rem; }
          .badge { background: #25d366; color: #000; padding: 0.4rem 1rem; border-radius: 999px; font-weight: bold; }
          .card { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 16px; display: inline-block; margin-top: 1.5rem; text-align: left; }
        </style>
      </head>
      <body>
        <h2>🤖 @otomasyon_ai Instagram Yapay Zeka Otomasyon Sunucusu</h2>
        <p><span class="badge">CANLI & AKTİF</span></p>
        <div class="card">
          <p><strong>Webhook URL:</strong> <code>/webhook</code></p>
          <p><strong>Doğrulama Jetonu:</strong> <code>${VERIFY_TOKEN}</code></p>
          <p><strong>Yapay Zeka Motoru:</strong> OpenAI (${OPENAI_MODEL}) ${OPENAI_API_KEY ? "✅ AKTİF" : "⚠️ YEDEK MOD"}</p>
          <p><strong>Meta Token:</strong> ${PAGE_ACCESS_TOKEN ? "✅ YÜKLÜ" : "⚠️ EKSİK"}</p>
          <p><strong>Canlı Simülatör Arayüzü:</strong> <a href="/demo" style="color:#60a5fa;">/demo</a></p>
        </div>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    account: "@otomasyon_ai",
    ai_engine: OPENAI_API_KEY ? "openai-" + OPENAI_MODEL : "keyword-fallback",
    webhookUrl: "/webhook",
    timestamp: new Date().toISOString()
  });
});

// ── Test Simülatörü ve Ön Yüz için Doğrudan AI Chat Endpoint'i ──
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Mesaj boş olamaz" });
  try {
    const reply = await generateSmartReply(message, "simulator");
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── 2. Meta Webhook Doğrulama (GET /webhook) ──
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("[@otomasyon_ai] Meta Webhook Başarıyla Doğrulandı!");
      res.status(200).send(challenge);
    } else {
      console.error("[@otomasyon_ai] Webhook Doğrulama Hatası: Jeton eşleşmedi.");
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// ── 3. Yedek Kural Tabanlı Yanıt Motoru (Keyword Fallback) ──
function generateKeywordReply(userText) {
  const text = (userText || "").toLowerCase().trim();
  const kb = websiteKnowledge;

  if (text.includes("reels") || text.includes("yorum") || text.includes("link")) {
    return `Merhaba! 👋 Reels paylaşımımıza ilginiz için teşekkürler.\n\n` +
      `İşletmeniz için 7/24 Instagram Auto-DM & Yorum otomasyon paketimiz ₺2.490 /aylıktır.\n` +
      `🎁 1 Ay ÜCRETSİZ Deneme Fırsatıyla canlı test edebilirsiniz!\n\n` +
      `Detaylı bilgi ve 1 ay ücretsiz deneme için WhatsApp hattımız: https://wa.me/905530551369?text=Merhaba,%20Reels%20otomasyonu%20için%20yazıyorum.`;
  }

  if (text.includes("fiyat") || text.includes("ücret") || text.includes("paket") || text.includes("kaç")) {
    let priceList = `📊 OtomasyonAI Paket Fiyatlarımız:\n\n`;
    kb.products.forEach(p => {
      priceList += `• ${p.name}: ${p.price}\n`;
    });
    priceList += `\n🎁 Tüm paketlerimizde 1 Ay ÜCRETSİZ Deneme Kampanyası geçerlidir!\n\n`;
    priceList += `WhatsApp Bilgi Hattı: https://wa.me/905530551369`;
    return priceList;
  }

  if (text.includes("whatsapp") || text.includes("bot")) {
    return `💬 WhatsApp Akıllı Müşteri Temsilcisi:\n` +
      `Fiyat: ₺2.490 /aylık\n` +
      `Müşteri sorularınızı 7/24 yanıtlar, randevu oluşturur ve müşteri bilgilerini toplar.\n\n` +
      `1 Ay Ücretsiz Denemek İçin: https://wa.me/905530551369?text=Merhaba,%20WhatsApp%20botu%20hakkında%20bilgi%20almak%20istiyorum.`;
  }

  if (text.includes("ücretsiz") || text.includes("deneme")) {
    return `🎁 1 Ay Ücretsiz Canlı Deneme Kampanyası:\n` +
      `Seçtiğiniz otomasyonu 30 gün boyunca hiçbir ücret ödemeden deneyebilirsiniz. Taahhüt veya cayma bedeli yoktur.\n\n` +
      `Hemen Başlatın: https://wa.me/905530551369?text=Merhaba,%201%20ay%20ücretsiz%20deneme%20başlatmak%20istiyorum.`;
  }

  if (text.includes("adres") || text.includes("konum") || text.includes("iletişim") || text.includes("antalya")) {
    return `📍 OtomasyonAI İletişim Bilgileri:\n` +
      `• Merkezimiz: Antalya, Türkiye\n` +
      `• WhatsApp: 0553 055 13 69\n` +
      `• E-Posta: platform@otomasyonmarketi.net\n\n` +
      `İletişime Geçin: https://wa.me/905530551369`;
  }

  return `Merhaba! 👋 Ben @otomasyon_ai yapay zeka asistanıyım.\n\n` +
    `OtomasyonAI çözümlerimiz (WhatsApp, Instagram, Randevu, E-Posta, B2B Lead Scraping) hakkında detaylı bilgi ve 1 Ay ÜCRETSİZ Deneme fırsatı sunuyoruz.\n\n` +
    `Bize WhatsApp'tan anında ulaşabilirsiniz: https://wa.me/905530551369?text=Merhaba,%20otomasyon%20bilgisi%20almak%20istiyorum.`;
}

// ── 4. OpenAI Destekli Akıllı Yanıt Motoru (LLM Engine) ──
async function generateSmartReply(userText, context = "dm") {
  if (!OPENAI_API_KEY) {
    console.log("[@otomasyon_ai] OpenAI anahtarı yok, kural motoruna yönlendirildi.");
    return generateKeywordReply(userText);
  }

  const kb = websiteKnowledge;
  const productsSummary = kb.products.map(p => `- ${p.name}: ${p.price} (Özellikler: ${p.features.join(", ")})`).join("\n");

  const systemPrompt = `Sen @otomasyon_ai Instagram hesabının resmi yapay zeka asistanısın.
Şirket Adı: ${kb.brand.name}
Slogan: ${kb.brand.slogan}
Merkez: ${kb.brand.location}
WhatsApp Hattı: ${kb.brand.whatsapp} (Link: ${kb.brand.whatsappLink})
E-posta: ${kb.brand.email}

KAMPANYA:
- 1 Ay Ücretsiz Deneme Kampanyası: 30 gün boyunca hiçbir ücret ödemeden kurulum ve canlı deneme hakkı var. Taahhüt, cayma bedeli yok.

ÜRÜNLER VE FİYATLAR:
${productsSummary}

GÖREVİN VE KURALLARIN:
1. Instagram DM veya yorumuna cevap veriyorsun. Samimi, enerjik, profesyonel ve güven verici bir Türkçe kullan.
2. Mesajlarını çok uzun paragraflar halinde yazma; maddeli, okuması kolay ve Instagram DM formatına uygun (kısa ve öz) tut.
3. Uygun emojiler (🚀, 👋, 📊, 💬 vb.) kullan.
4. Müşteriler Reels, gönderi yorumu veya DM ile ilgili soru sorduğunda, bunun "Instagram Auto-DM & Yorum Yanıtlayıcı" paketimiz (₺2.490 /aylık) olduğunu, Reels yorumlarını anında beğendiğini, yorum atanlara özel teklif DM'si ilettiğini ve DM sorularını yanıtladığını belirt.
5. Müşteriyi her zaman 1 Ay Ücretsiz Deneme fırsatımıza veya WhatsApp hattımıza yönlendir (WhatsApp linki: https://wa.me/905530551369).
6. Asla hayali bilgi, farklı telefon numarası veya listede olmayan fiyat uydurma.
7. Eğer soru çok belirsiz veya genel bir selamlaşmaysa ("selam", "merhaba"), samimi bir karşılık verip 1 ay ücretsiz deneme ile işletmesine nasıl otomasyon kurabileceğimizi özetle.`;


  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: OPENAI_MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userText || "Merhaba" }
        ],
        temperature: 0.7,
        max_tokens: 350
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 9000
      }
    );

    const reply = response.data.choices?.[0]?.message?.content?.trim();
    if (reply) {
      console.log("[@otomasyon_ai] OpenAI yanıtı başarıyla üretildi.");
      return reply;
    }
    return generateKeywordReply(userText);
  } catch (error) {
    console.error("[@otomasyon_ai] OpenAI API Hatası:", error.response ? error.response.data : error.message);
    console.log("[@otomasyon_ai] Kural motoruna fallback yapılıyor...");
    return generateKeywordReply(userText);
  }
}

// ── 5. Instagram Graph API Mesaj Gönderimi (DM & Yorum Özel Yanıt) ──
async function sendInstagramMessage(recipientPayload, text) {
  if (!PAGE_ACCESS_TOKEN) {
    console.log(`[SIMULATED OUTGOING DM] To:`, recipientPayload, `\n${text}`);
    return;
  }

  // Eğer doğrudan kullanıcı ID'si string olarak iletildiyse objeye sar
  const recipient = typeof recipientPayload === "string" 
    ? { id: recipientPayload } 
    : recipientPayload;

  try {
    const url = `${GRAPH_API_URL}/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
    const response = await axios.post(url, {
      recipient: recipient,
      message: { text: text }
    });
    console.log(`[OFFICIAL GRAPH API DM SENT] To:`, recipient, `Result:`, response.data);
  } catch (error) {
    console.error("[GRAPH API SEND ERROR]", error.response ? error.response.data : error.message);
  }
}

// ── 6. Instagram Yoruma Herkese Açık Yanıt Gönderme ──
async function replyInstagramComment(commentId, replyText) {
  if (!PAGE_ACCESS_TOKEN || !commentId) {
    console.log(`[SIMULATED PUBLIC COMMENT REPLY] To Comment ${commentId}: "${replyText}"`);
    return;
  }

  try {
    const url = `${GRAPH_API_URL}/${commentId}/replies?access_token=${PAGE_ACCESS_TOKEN}`;
    await axios.post(url, { message: replyText });
    console.log(`[OFFICIAL GRAPH API COMMENT REPLIED] Comment ID: ${commentId}`);
  } catch (error) {
    console.error("[GRAPH API COMMENT REPLY ERROR]", error.response ? error.response.data : error.message);
  }
}

// ── 7. Meta Webhook Dinleyici (POST /webhook) ──
app.post("/webhook", (req, res) => {
  const body = req.body;

  // Meta'ya bekletmeden 200 EVENT_RECEIVED dön (Meta zaman aşımını önler)
  if (body.object === "instagram" || body.object === "page") {
    res.status(200).send("EVENT_RECEIVED");

    body.entry?.forEach(entry => {
      // 1. Gelen Instagram DM Mesajları
      if (entry.messaging) {
        entry.messaging.forEach(async (event) => {
          if (event.message && event.message.text && !event.message.is_echo) {
            const senderId = event.sender.id;
            const messageText = event.message.text;

            console.log(`[@otomasyon_ai Gelen DM] User ${senderId}: "${messageText}"`);

            const aiReply = await generateSmartReply(messageText, "dm");

            // Doğal insan yanıt zamanlaması (1 saniye)
            setTimeout(() => {
              sendInstagramMessage({ id: senderId }, aiReply);
            }, 1000);
          }
        });
      }

      // 2. Gelen Reels & Post Yorumları
      if (entry.changes) {
        entry.changes.forEach(async (change) => {
          if (change.field === "comments") {
            const commentVal = change.value;
            const commentId = commentVal.id;
            const commentText = commentVal.text;

            console.log(`[@otomasyon_ai Gelen Yorum] Comment ID ${commentId}: "${commentText}"`);

            // 1. Adım: Yoruma herkese açık yanıt bırak
            replyInstagramComment(commentId, "Harika! Detayları ve 1 ay ücretsiz deneme linkini DM kutunuza ilettik 🚀");

            // 2. Adım: OpenAI ile akıllı DM yanıtı üret
            const aiReply = await generateSmartReply(commentText, "comment");

            // 3. Adım: Meta Private Reply formatında (comment_id ile) DM gönder
            setTimeout(() => {
              sendInstagramMessage({ comment_id: commentId }, `Merhaba! Yorumunuz üzerine yazıyorum 👋\n\n${aiReply}`);
            }, 1200);
          }
        });
      }
    });
  } else {
    res.sendStatus(404);
  }
});

// ── 8. Sunucuyu Başlat ──
app.listen(PORT, () => {
  console.log(`
  ════════════════════════════════════════════════════
  🚀 @otomasyon_ai INSTAGRAM OTOMASYON SUNUCUSU CANLI
  • Port: ${PORT}
  • Webhook Adresi: http://localhost:${PORT}/webhook
  • AI Motoru: OpenAI ${OPENAI_MODEL}
  • Test Simülatörü: http://localhost:${PORT}/demo
  • Durum: 7/24 Aktif ve Dinliyor
  ════════════════════════════════════════════════════
  `);
});

