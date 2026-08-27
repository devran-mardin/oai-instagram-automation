/* ═══════════════════════════════════════════════════
   @otomasyon_ai — INSTAGRAM AI AUTOMATION SCRIPT
   Web Sitemizden Canlı Bilgi Çeken Akıllı Ajan Motoru
   ═══════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {
  const chatBody = document.getElementById("igChatBody");
  const chatForm = document.getElementById("igChatForm");
  const chatInput = document.getElementById("igInput");
  const promptChips = document.querySelectorAll(".prompt-chip");

  if (!chatForm || !chatBody || !chatInput) return;

  // Web sitesinden çekilen canlı bilgi bankası sorgulayıcı
  function answerQueryFromWebsite(query) {
    const text = query.toLowerCase().trim();
    const kb = WEBSITE_KNOWLEDGE_BASE;

    // 1. Genel Tanıtım / OtomasyonAI Nedir / Kimdir
    if (text.includes("nedir") || text.includes("otomasyonai kimdir") || text.includes("hakkında") || text.includes("ne iş yapıyorsunuz") || text.includes("sistem ne")) {
      return `<strong>OtomasyonAI Hakkında Bilgi:</strong><br>` +
             `${kb.brand.slogan}<br><br>` +
             `Biz işletmeniz için yapay zeka destekli <strong>WhatsApp, Instagram, E-Posta, Randevu ve Stok Takip</strong> otomasyonları kuruyoruz. Tüm müşteri sorularınızı 7/24 otomatik yanıtlıyor ve satışa dönüştürüyoruz.<br><br>` +
             `📍 <strong>Merkezimiz:</strong> ${kb.brand.location}<br>` +
             `📲 <strong>WhatsApp İletişim:</strong> ${kb.brand.whatsapp}<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20OtomasyonAI%20hakkında%20bilgi%20almak%20istiyorum." target="_blank" class="chat-cta-btn">WhatsApp'tan Canlı Görüş ➔</a>`;
    }

    // 2. WhatsApp Botu Soruları
    if (text.includes("whatsapp") && (text.includes("bot") || text.includes("temsilci") || text.includes("ücret") || text.includes("fiyat") || text.includes("ne kadar"))) {
      const p = kb.products.find(x => x.id === "whatsapp-ai");
      return `<strong>💬 ${p.name}:</strong><br>` +
             `Fiyat: <strong>${p.price}</strong><br><br>` +
             `<strong>Öne Çıkan Özellikler:</strong><br>` +
             `• 7/24 Akıllı Müşteri Cevaplama & Randevu<br>` +
             `• Ad, Tel ve E-posta Bilgilerini Toplama<br>` +
             `• Fiyat & Ürün Bilgisi Verme<br>` +
             `• Gerekirse İnsan Personele Aktarma<br>` +
             `• <i>Opsiyonel:</i> AI Sesli Telefon Asistanı Modülü (+₺2.100)<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20WhatsApp%20AI%20temsilcisi%20hakkında%20bilgi%20almak%20istiyorum." target="_blank" class="chat-cta-btn">1 Ay Ücretsiz Deneme Başlat ➔</a>`;
    }

    // 3. Instagram Reels Yorum & DM Otomasyonu
    if (text.includes("instagram") || text.includes("reels") || text.includes("yorum") || text.includes("dm")) {
      const p = kb.products.find(x => x.id === "instagram-dm");
      return `<strong>📸 ${p.name}:</strong><br>` +
             `Fiyat: <strong>${p.price}</strong><br><br>` +
             `<strong>Nasıl Çalışır?</strong><br>` +
             `1. Takipçiniz Reels halkanıza veya gönderinize yorum yazar (Örn: "Fiyat?", "Detay").<br>` +
             `2. Sistemimiz yorumu saniyesinde beğenir & yanıtlar.<br>` +
             `3. Takipçinin DM kutusuna teklif ve satın alma linkinizi iletir.<br>` +
             `4. DM'den gelen tüm ek soruları 7/24 yapay zeka ile yanıtlar.<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20Instagram%20Reels%20DM%20otomasyonu%20için%20yazıyorum." target="_blank" class="chat-cta-btn">WhatsApp'tan Teklif Al ➔</a>`;
    }

    // 4. Randevu & Takvim Otomasyonu
    if (text.includes("randevu") || text.includes("takvim") || text.includes("cal.com") || text.includes("google takvim")) {
      const p = kb.products.find(x => x.id === "randevu-takvim");
      return `<strong>📅 ${p.name}:</strong><br>` +
             `Fiyat: <strong>${p.price}</strong><br><br>` +
             `<strong>Özellikler:</strong><br>` +
             `• Google Takvim & Cal.com Çift Taraflı Entegrasyon<br>` +
             `• SMS & WhatsApp Otomatik Randevu Hatırlatma<br>` +
             `• Çifte Randevu Çakışmasını Engelleme<br>` +
             `• İptal / Tarih Değişikliği Yönetimi<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20Randevu%20otomasyonu%20hakkında%20bilgi%20almak%20istiyorum." target="_blank" class="chat-cta-btn">Detaylı Bilgi Al ➔</a>`;
    }

    // 5. E-Posta Asistanı
    if (text.includes("eposta") || text.includes("e-posta") || text.includes("mail")) {
      const p = kb.products.find(x => x.id === "email-assistant");
      return `<strong>✉️ ${p.name}:</strong><br>` +
             `Fiyat: <strong>${p.price}</strong><br><br>` +
             `Gelen müşteri ve tedarikçi e-postalarını yapay zeka ile analiz eder, saniyeler içinde kurumsal dilde yanıt taslağı veya doğrudan cevap üretir.<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20E-posta%20asistanı%20hakkında%20bilgi%20almak%20istiyorum." target="_blank" class="chat-cta-btn">WhatsApp'tan Bağlan ➔</a>`;
    }

    // 6. Lead Scraping / B2B Bulucu
    if (text.includes("lead") || text.includes("b2b") || text.includes("veri") || text.includes("scraping") || text.includes("bulucu") || text.includes("sarı sayfalar") || text.includes("haritalar")) {
      const p = kb.products.find(x => x.id === "b2b-lead-finder");
      return `<strong>🎯 ${p.name}:</strong><br>` +
             `Fiyat: <strong>${p.price}</strong><br><br>` +
             `Hedeflediğiniz sektör ve şehirdeki potansiyel müşterilerin Google Haritalar & Rehberlerden telefon, e-posta, web sitesi ve adres verilerini Excel olarak anında önünüze getirir.<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20B2B%20Lead%20veri%20bulucu%20için%20yazıyorum." target="_blank" class="chat-cta-btn">Örnek Veri Listesi İste ➔</a>`;
    }

    // 7. Stok Takip Otomasyonu
    if (text.includes("stok") || text.includes("market") || text.includes("trendyol") || text.includes("hepsiburada") || text.includes("alarm")) {
      const p = kb.products.find(x => x.id === "stok-control");
      return `<strong>📦 ${p.name}:</strong><br>` +
             `Fiyat: <strong>${p.price}</strong><br><br>` +
             `Market ve E-ticaret mağazalarınız için anlık stok takibi yapar. Kritik stok seviyesine düşen ürünler için WhatsApp/Telegram üzerinden anında yetkililere alarm gönderir.<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20Market%20Stok%20otomasyonu%20teklifi%20almak%20istiyorum." target="_blank" class="chat-cta-btn">Özel Demo İste ➔</a>`;
    }

    // 8. Fiyat Listesi / Tüm Paketler
    if (text.includes("fiyat") || text.includes("ücret") || text.includes("paketler") || text.includes("kaç para") || text.includes("maliyet") || text.includes("liste")) {
      let listHtml = `<strong>📊 OtomasyonAI Güncel Fiyat Kataloğu:</strong><br><br>`;
      kb.products.forEach(p => {
        listHtml += `• <strong>${p.name}:</strong> ${p.price}<br>`;
      });
      listHtml += `<br>🎁 <strong>İlk 1 Ay ÜCRETSİZ Deneme Kampanyamız</strong> tüm paketlerde geçerlidir!<br><br>`;
      listHtml += `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20paket%20fiyatları%20hakkında%20bilgi%20almak%20istiyorum." target="_blank" class="chat-cta-btn">WhatsApp'tan Teklif Al ➔</a>`;
      return listHtml;
    }

    // 9. 1 Ay Ücretsiz Deneme Kampanyası
    if (text.includes("ücretsiz") || text.includes("deneme") || text.includes("1 ay") || text.includes("kampanya") || text.includes("taahhüt") || text.includes("cayma")) {
      const c = kb.campaigns.freeTrial;
      return `<strong>🎁 ${c.title}:</strong><br>` +
             `${c.description}<br><br>` +
             `<strong>Şartlar:</strong> ${c.terms}<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%201%20ay%20ücretsiz%20deneme%20kampanyasını%20başlatmak%20istiyorum." target="_blank" class="chat-cta-btn">1 Ay Ücretsiz Başlat ➔</a>`;
    }

    // 10. İletişim / Konum / Adres / Telefon
    if (text.includes("adres") || text.includes("konum") || text.includes("neredesiniz") || text.includes("telefon") || text.includes("iletişim") || text.includes("antalya")) {
      return `<strong>📍 İletişim & Merkez Bilgilerimiz:</strong><br>` +
             `• <strong>Merkezimiz:</strong> ${kb.brand.location}<br>` +
             `• <strong>WhatsApp:</strong> ${kb.brand.whatsapp}<br>` +
             `• <strong>E-Posta:</strong> ${kb.brand.email}<br>` +
             `• <strong>Instagram:</strong> ${kb.brand.instagram}<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20iletişime%20geçmek%20istiyorum." target="_blank" class="chat-cta-btn">WhatsApp'tan Mesaj Atın ➔</a>`;
    }

    // 11. Güvenlik & Spam Koruması
    if (text.includes("güvenli") || text.includes("kapanır mı") || text.includes("ban") || text.includes("spam") || text.includes("api")) {
      return `<strong>🛡️ Güvenlik & Meta API Garantisi:</strong><br>` +
             `Tüm yapay zeka sistemlerimiz Meta (WhatsApp & Instagram API) resmi altyapısı ile %100 uyumlu çalışır. Spam riskini sıfıra indiren doğal insan yazma hız simülasyonu içerir.<br><br>` +
             `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20güvenlik%20ve%20API%20detaylarını%20öğrenmek%20istiyorum." target="_blank" class="chat-cta-btn">WhatsApp'tan Sorun ➔</a>`;
    }

    // Varsayılan Akıllı Yanıt
    return `<strong>OtomasyonAI Asistanı:</strong><br>` +
           `Web sitemizdeki tüm çözümlerimiz hakkında bilgi verebilirim. 🤖<br><br>` +
           `Sormak istediğiniz konuyu yazabilirsiniz (Örn: <i>"WhatsApp bot fiyatı"</i>, <i>"Reels yorum otomasyonu"</i>, <i>"1 ay ücretsiz deneme"</i>, <i>"B2B veri bulucu"</i> vb.)<br><br>` +
           `<a href="${kb.brand.whatsappLink}?text=Merhaba,%20${encodeURIComponent(query)}%20hakkında%20bilgi%20almak%20istiyorum." target="_blank" class="chat-cta-btn">WhatsApp'tan Uzmanımızla Görüşün ➔</a>`;
  }

  function appendMessage(sender, htmlContent) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-msg ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.innerHTML = htmlContent;

    msgDiv.appendChild(bubble);
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleSend(messageText) {
    if (!messageText.trim()) return;

    // Kullanıcı Mesajı
    appendMessage("user", messageText);
    chatInput.value = "";

    // Doğal yazıyor efekti
    const typingDiv = document.createElement("div");
    typingDiv.className = "chat-msg bot";
    typingDiv.id = "typingIndicator";
    typingDiv.innerHTML = `<div class="msg-bubble" style="font-style:italic;color:#94a3b8;">@otomasyon_ai web sitesinden bilgi çekiyor...</div>`;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
      const indicator = document.getElementById("typingIndicator");
      if (indicator) indicator.remove();

      const reply = answerQueryFromWebsite(messageText);
      appendMessage("bot", reply);
    }, 900);
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSend(chatInput.value);
  });

  promptChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const msg = chip.dataset.msg;
      handleSend(msg);
    });
  });
});
