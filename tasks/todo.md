# Tasks Todo

## İnceleme Kaydı — Vitest Geçişi (2026-09-20)

- Jest, `ts-jest` ve Node'un deneysel ESM bayrağı kaldırıldı; test komutu `vitest run` olarak sadeleştirildi.
- `vitest.config.ts`, proje `@/` alias'ını ve Node test ortamını tanımlar. Mevcut üç SEO testi açık Vitest importlarıyla çalışır.
- Doğrulama: `npm test` (3/3), `npm run type-check`, `npm run lint` ve `npm run build` (164 rota) başarılı. Kontroller `.next` üretimi nedeniyle sıralı çalıştırıldı.
- Açık kalan nokta: Yok.

## İnceleme Kaydı — OG ve Sitemap Düzeltmesi (2026-09-20)

- Varsayılan OG görseli `/opengraph-image` olarak düzeltildi. Üretim çıktısında eski `/og-image.png` referansı 0, dinamik OG rota referansı 159 sayfa olarak doğrulandı.
- Sitemap, görselleştirici türü olan `demo.kind` yerine içerik slug'ını kullanacak şekilde düzeltildi. `kmp`, `linked-list`, `longest-common-subsequence`, `sieve-of-eratosthenes` ve `genetic-algorithms` URL'leri üretimde doğrulandı.
- Vitest ve TypeScript dönüşümü eklendi; OG fallback'i ile tüm remaining algoritma URL'lerini kapsayan 3 test oluşturuldu.
- Doğrulama: `npm test -- --runInBand` (3/3), `npm run type-check`, `npm run lint` ve `npm run build` (164 rota) başarılı.
- Açık kalan nokta: Yok.

## Tamamlanma ve İnceleme Özeti (Definition of Done)

### 1. Yapılan Değişiklikler ve Mimari İyileştirmeler

- **Tüm 130 `page.tsx` Sayfasının Modern SEO & AI Standartlarına Göre Revizyonu:**
  - Projedeki 130 sayfanın tamamı incelendi ve eski/yeni standart uyuşmazlıkları giderildi.
  - **Mükerrer Başlık Sorununun Çözümü:** `layout.tsx` dosyasındaki `template: '%s | AlgoPit'` şablonuyla çakışan ve sayfalarda `... | AlgoPit | AlgoPit` çift son ekine yol açan 42 başlıktaki hardcoded son ekler temizlendi.
  - **Eksik Metadata Kapsaması (0 Eksik):** Önceden metadata içermeyen 84 sayfa (ana sayfa, 64 kalan algoritma sayfası, 8 yinelenen algoritma sayfası ve 11 dinamik slug rotası) `createPageMetadata` / `createAlgorithmMetadata` ile zenginleştirildi.
  - **Dinamik Rotalar (`generateMetadata`):** 11 dinamik slug sayfası (`src/app/algorithms/[category]/[slug]/page.tsx`) `generateMetadata` fonksiyonuyla her algoritma için özelleştirilmiş başlık, açıklama, anahtar kelimeler ve kanonik URL'e kavuşturuldu.

- **Google Rich Results ve AI Arama Motorları (GEO / LLM) İçin JSON-LD Yapılandırılmış Veri:**
  - `src/lib/seo/` modülü altında tip güvenli Schema.org şema oluşturucuları geliştirildi:
    - **Algoritma Sayfaları:** `TechArticle`, `SoftwareApplication` ve `BreadcrumbList` şemaları (zorluk, zaman/alan karmaşıklığı, kategori, başlık, açıklama ve eğitim seviyesi).
    - **Kategori & Hub Sayfaları:** `CollectionPage` ve `BreadcrumbList` şemaları.
    - **Ana Sayfa:** `WebSite` (SearchAction ile) ve `Organization` şemaları.
    - **SSS Sayfası:** Google zengin sonuçları ve AI soru-cevap motorları için `FAQPage` şeması.
    - **Hakkında Sayfası:** `AboutPage` ve `Organization` şemaları.
  - `src/components/common/json-ld.tsx` Server Component'i ile tüm sayfalara JSON-LD script etiketleri entegre edildi.

- **Arama Motoru ve AI Bot Keşif Altyapısı:**
  - `src/app/robots.ts`: Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot gibi meşru arama ve AI tarayıcıları için optimize edilmiş, sitemap bağlantılı robots kuralları oluşturuldu.
  - `src/app/sitemap.ts`: Platformdaki 150 URL'in tamamını (statik sayfalar, kategoriler, özel ve yinelenen algoritmalar) öncelik ve değişim sıklığıyla dinamik olarak indeksleyen sitemap oluşturuldu.
  - `src/app/layout.tsx`: `metadataBase`, global OpenGraph, Twitter, robots ve canonical ayarlarıyla donatıldı.

- **AGENTS.md Kurallarına Tam Uyum:**
  - **Maksimum 250 Satır Kuralı:** SEO yardımcı modülü `src/lib/seo/` (`types.ts`, `metadata.ts`, `schema.ts`, `index.ts`) şeklinde modülerleştirildi. Projedeki hiçbir yeni veya değiştirilen dosya 250 satırı aşmamaktadır (0 ihlal).
  - **App Router İzolasyonu:** `src/app` altında yalnızca standart Next.js yönlendirme dosyaları yer aldı. Tüm sayfalar 100% Server Component olarak korundu (0 'use client').
  - **İçe Aktarma Standartları:** Bütün dosyalarda `@/...` alias importları kullanıldı.

---

### 2. Kalite Kontrol ve Doğrulama Sonuçları (Pre-Flight)

- **TypeScript Doğrulaması (`npm run type-check` / `npx tsc --noEmit`):** 0 hata ile başarıyla tamamlandı.
- **Linter Doğrulaması (`npm run lint`):** 0 hata ve 0 uyarı ile başarıyla tamamlandı.
- **Production Build Doğrulaması (`npm run build`):**
  - Tüm 130 statik sayfa, 11 dinamik SSG slug rotası, `/robots.txt` ve `/sitemap.xml` başarıyla derlendi.
  - Üretilen HTML çıktılarında `<title>`, `<link rel="canonical">`, `<meta property="og:*">`, `<meta name="twitter:*">` ve `<script type="application/ld+json">` etiketlerinin eksiksiz yer aldığı doğrulandı.

---

### 3. Açık Kalan Noktalar

- Açık hata, eksik metadata veya kural ihlali bulunmamaktadır. Tüm gereksinimler eksiksiz tamamlanmıştır.
