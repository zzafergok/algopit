# Tasks Todo

## Faz 1: Altyapı, Paketler, Core & Form Bileşenleri ve İsimlendirme Düzeltmeleri

- [x] `react-hook-form`, `zod`, `@hookform/resolvers` paketlerini yükle
- [x] `@/components/core/` dizinini oluştur ve eksiksiz core bileşenleri ekle (button, input, textarea, select, label, table, card, badge, separator, link)
- [x] `button.tsx` touch target boyutlarını min 44x44px standardına uyarla
- [x] `@/components/layout/page-header-card.tsx` bileşenini oluştur
- [x] `@/components/forms/` dizininde react-hook-form & zod tabanlı form bileşenlerini oluştur
- [x] İsimlendirme standartlarını düzelt:
  - [x] `src/components/layout/Navigation/` -> `navigation/`
  - [x] `src/hooks/useNavigation.ts` -> `use-navigation.ts`
  - [x] Layout bileşen dosyalarını kebab-case'e normalize et (geriye dönük export desteğiyle)
  - [x] camelCase FAQ veri dosyalarını kebab-case'e dönüştür (`src/features/resources/faq/`)

## Faz 2: Linter, TypeScript ve Kod Kalitesi İyileştirmeleri

- [x] `npm run lint` çıktısındaki 6 adet `react-hooks/exhaustive-deps` uyarısını gider
- [x] 23 adet `any` türünü daraltılmış güvenli TypeScript arayüzleri/tipleriyle değiştir
- [x] Üretim kodunda kalan debug `console.log` çağrılarını temizle

## Faz 3: App Directory Kuralı ve Feature Modülerleştirmesi (`src/features/`)

- [x] `src/features/` dizin yapısını kur
- [x] `src/app/components/` (home bileşenleri) -> `src/features/home/` altına taşı
- [x] `src/app/resources/*` (code-examples, documentation, faq, contributing) bileşen ve veri dosyalarını `src/features/resources/` altına taşı
- [x] `src/app/about/*` bileşen ve verilerini `src/features/about/` altına taşı
- [x] `src/app/page.tsx` ve tüm kaynak sayfalarını Server Component yap; interaktif kısımları feature Client Component'lerine delege et

## Faz 4: 250 Satır Kuralı Kapsamında Aşırı Uzun Dosyaları Modülerleştirme

- [x] Aşırı uzun algoritma sayfalarını alt bileşenlere, yardımcı fonksiyonlara ve veri modüllerine bölerek `src/features/algorithms/` altında modülerleştir:
  - [x] `hierarchical-clustering` (1103 satırdan modüler feature yapısına)
  - [x] `segment-tree` (1068 satırdan modüler feature yapısına; core Table entegrasyonu)
  - [x] `k-means` (841 satırdan modüler feature yapısına)
  - [x] `subset-sum` (639 satırdan modüler feature yapısına)

## Faz 5: Doğrulama ve Definition of Done (DoD)

- [x] `npx tsc --noEmit` çalıştır (0 hata)
- [x] `npm run lint` çalıştır (0 hata, 0 uyarı)
- [x] `npm run build` çalıştır (Başarılı build, tüm sayfalar SSG/Static olarak derlendi)
