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

app.use(cors());
app.use(express.json());

// ── 1. Ana Sayfa & Sağlık Kontrolü ──
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>@otomasyon_ai — Canlı Bot Sunucusu</title>
        <style>
          body { font-family: sans-serif; background: #090d16; color: #f8fafc; text-align: center; padding: 3rem; }
          .badge { background: #25d366; color: #000; padding: 0.4rem 1rem; border-radius: 999px; font-weight: bold; }
          .card { background: rgba(255,255,255,0.05); padding: 2rem; border-radius: 16px; display: inline-block; margin-top: 1.5rem; }
        </style>
      </head>
      <body>
        <h2>🤖 @otomasyon_ai Instagram Yapay Zeka Otomasyon Sunucusu</h2>
        <p><span class="badge">CANLI & AKTİF</span></p>
        <div class="card">
          <p><strong>Webhook URL:</strong> <code>/webhook</code></p>
          <p><strong>Doğrulama Jetonu:</strong> <code>${VERIFY_TOKEN}</code></p>
          <p><strong>Otomasyon Hesabı:</strong> @otomasyon_ai</p>
        </div>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "online",
    account: "@otomasyon_ai",
    webhookUrl: "/webhook",
    timestamp: new Date().toISOString()
  });
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

// ── 3. Yapay Zeka Yanıt Üretici (Website Knowledge Engine) ──
function generateSmartReply(userText) {
  const text = (userText || "").toLowerCase().trim();
  const kb = websiteKnowledge;

  // Özel Sorgu Eşleştirme
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

  // Varsayılan Yanıt
  return `Merhaba! 👋 Ben @otomasyon_ai yapay zeka asistanıyım.\n\n` +
         `OtomasyonAI çözümlerimiz (WhatsApp, Instagram, Randevu, E-Posta, B2B Lead Scraping) hakkında detaylı bilgi ve 1 Ay ÜCRETSİZ Deneme fırsatı sunuyoruz.\n\n` +
         `Bize WhatsApp'tan anında ulaşabilirsiniz: https://wa.me/905530551369?text=Merhaba,%20otomasyon%20bilgisi%20almak%20istiyorum.`;
}

// ── 4. Instagram Graph API Mesaj Gönderimi ──
async function sendInstagramMessage(recipientId, text) {
  if (!PAGE_ACCESS_TOKEN) {
    console.log(`[SIMULATED OUTGOING DM] To User ${recipientId}:\n${text}`);
    return;
  }

  try {
    const url = `${GRAPH_API_URL}/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
    await axios.post(url, {
      recipient: { id: recipientId },
      message: { text: text }
    });
    console.log(`[OFFICIAL GRAPH API DM SENT] To User ${recipientId}`);
  } catch (error) {
    console.error("[GRAPH API SEND ERROR]", error.response ? error.response.data : error.message);
  }
}

// ── 5. Meta Webhook Dinleyici (POST /webhook) ──
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "instagram" || body.object === "page") {
    body.entry.forEach(entry => {
      // DM mesajları dinleme
      if (entry.messaging) {
        entry.messaging.forEach(event => {
          if (event.message && event.message.text && !event.message.is_echo) {
            const senderId = event.sender.id;
            const messageText = event.message.text;

            console.log(`[@otomasyon_ai Gelen DM] User ${senderId}: "${messageText}"`);

            const aiReply = generateSmartReply(messageText);

            // Doğal insan yanıt zamanlaması (1.2 saniye)
            setTimeout(() => {
              sendInstagramMessage(senderId, aiReply);
            }, 1200);
          }
        });
      }

      // Yorumlar dinleme
      if (entry.changes) {
        entry.changes.forEach(change => {
          if (change.field === "comments") {
            const commentVal = change.value;
            console.log(`[@otomasyon_ai Gelen Yorum] Comment ID ${commentVal.id}: "${commentVal.text}"`);

            const aiReply = generateSmartReply(commentVal.text);
            if (commentVal.from && commentVal.from.id) {
              sendInstagramMessage(commentVal.from.id, `Merhaba! Yorumunuz üzerine yazıyorum 🚀\n\n${aiReply}`);
            }
          }
        });
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

// ── 6. Sunucuyu Başlat ──
app.listen(PORT, () => {
  console.log(`
  ════════════════════════════════════════════════════
  🚀 @otomasyon_ai INSTAGRAM OTOMASYON SUNUCUSU CANLI
  • Port: ${PORT}
  • Webhook Adresi: http://localhost:${PORT}/webhook
  • Durum: 7/24 Aktif ve Dinliyor
  ════════════════════════════════════════════════════
  `);
});
