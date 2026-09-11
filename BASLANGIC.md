# 🤖 @otomasyon_ai Instagram AI Otomasyonu — Proje Durumu & Dersler

## 📌 Proje Özeti
@otomasyon_ai Instagram hesabı için 7/24 otomatik DM yanıtlayıcı, Reels yorum takipçisi ve müşteri lead toplama sistemi.

---

## ✅ Tamamlanan Adımlar (11 Eylül 2026 itibarıyla)
1. **Frontend & Simülatör:** `index.html`, `style.css`, `app.js` ile canlı Instagram DM ve kampanya test arayüzü kuruldu.
2. **Yapay Zeka Engine:** `websiteKnowledge.js` ve `server.js` ile ürün kataloğu, fiyat listesi, 1 ay ücretsiz deneme ve WhatsApp yönlendirme altyapısı hazırlandı.
3. **GitHub Entegrasyonu:** Private repo: [`devran-mardin/oai-instagram-automation`](https://github.com/devran-mardin/oai-instagram-automation).
4. **Railway 7/24 Deploy:**
   - **Canlı Sunucu Adresi:** `https://oai-instagram-bot-production.up.railway.app`
   - **Health Check:** `/health` — ONLINE
   - **Webhook URL:** `/webhook`
5. **Meta uygulaması (`fukara`) yayına alındı (Live/Published):**
   - Gizlilik politikası, hizmet şartları, veri silme talimatları sayfaları eklendi (`privacy.html`, `terms.html`, `data-deletion.html`), uygulama simgesi yüklendi, kategori "İşletmeler İçin Messenger Botları" seçildi.
   - Uygulama incelemesi (App Review) **atlandı** — sadece kendi işletmesi için geliştirme yapan doğrudan geliştiriciler için Meta bunu şart koşmuyor.
6. **Instagram girişiyle API kurulumu (Instagram Business Login) tamamlandı:**
   - `otomasyon_ai` Instagram hesabı Tester olarak eklendi ve davet kabul edildi.
   - Erişim jetonu (`PAGE_ACCESS_TOKEN`, IGAA... ön ekli) oluşturuldu.
   - Webhook aboneliği bu hesap için **Açık**.
7. **Webhook uçtan uca doğrulandı:** Meta'nın webhook test panelinden gönderilen örnek `messages` verisi sunucuya ulaşıyor, AI yanıtı üretiliyor ve Instagram Graph API'sine gönderiliyor.

---

## 🔧 Bu Oturumda Bulunan ve Düzeltilen Kritik Hatalar
1. **Webhook imza doğrulaması eksikti** → `META_APP_SECRET` Railway'de doğru Instagram App Secret ile güncellendi (eski, farklı bir secret kayıtlıydı).
2. **Uygulama "Geliştirme" modundaydı** → Meta, yayınlanmamış (unpublished) uygulamalara webhook (test dahil) göndermiyor. Gerekli tüm alanlar dolduruldu ve uygulama **Yayınlandı**.
3. **DM'ler hiç işlenmiyordu** → Instagram Business Login ürünü mesajları klasik `entry.messaging` formatı yerine `entry.changes` + `field:"messages"` formatında gönderiyor. `server.js` bu formatı da işleyecek şekilde güncellendi.
4. **`PAGE_ACCESS_TOKEN` süresi dolmuştu** (27 Ağustos'ta) → Instagram Business Login akışından taze bir jeton oluşturuldu.
5. **Railway'de Chrome sayfa çevirisi değişken adını bozdu** → `PAGE_ACCESS_TOKEN` yanlışlıkla "ERİŞİM_BELİRTECİ" olarak kaydedilmişti, sunucu bulamıyordu. Doğru adla yeniden oluşturuldu.
   - ⚠️ **Ders:** Railway dashboard'unda değişken düzenlerken tarayıcı sayfa çevirisini KAPALI tutun — çeviri özelliği sadece görünümü değil, gerçek alan adlarını/değerlerini de değiştirebiliyor.
6. **Yanlış Graph API domaini kullanılıyordu** → `IGAA...` ön ekli Instagram Business Login tokenları `graph.facebook.com` tarafından kabul edilmiyor ("Cannot parse access token" hatası). `GRAPH_API_URL`, `https://graph.instagram.com/v21.0` olarak değiştirildi.

---

## ⏳ Şu An Doğrulanıyor
- `graph.instagram.com` düzeltmesi deploy edildi; gerçek bir Instagram DM'ine botun **gerçekten** yanıt gönderip göndermediği test ediliyor (önceki denemeler "Cannot parse access token" hatasıyla başarısız oluyordu).

---

## 💡 Kritik Dersler & Notlar
- `PAGE_ACCESS_TOKEN` güncellendiğinde Railway otomatik yeni bir deployment başlatabilir; bazen manuel `railway up` veya dashboard'da "Dağıt" gerekebilir.
- Railway CLI (`npx @railway/cli`) bu makinede kimlik doğrulamalı ve projeye bağlı; `railway logs`, `railway variables`, `railway up` canlı teşhis için çok değerli.
- Meta portalında "Test" butonuyla gönderilen örnek webhook verisi gerçek bir uçtan uca test sağlıyor — gerçek bir Instagram mesajı beklemeden sorunları teşhis etmek için kullanılabilir.
- Instagram Business Login (yeni) ile Facebook Page'e bağlı klasik Instagram entegrasyonu birbirinden farklı: ayrı Graph API domaini (`graph.instagram.com`), ayrı webhook payload formatı (`entry.changes`), ayrı token tipi (IGAA...).
