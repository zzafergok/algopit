# Öğrenilen Dersler (Lessons Learned)

## AGENTS.md Standartlarına Geçiş ve Mimari İpuçları

1. **App Router İzolasyonu**:
   - `src/app/` dizini kesinlikle yalnızca Next.js routing (`page.tsx`, `layout.tsx`, `loading.tsx`, vb.) için rezerve edilmelidir.
   - Tüm UI bileşenleri, veri yapıları ve tipler ilgili `src/features/[feature]/` modülüne taşınmalıdır.
   - Sayfa bileşenleri (`page.tsx`) Server Component olarak metadata ve layout sarmalamasını üstlenmeli; durum yönetimi içeren arayüzler feature client component'lerinde (`*-view.tsx`) toplanmalıdır.

2. **Core Tasarım Sistemi Standartları**:
   - Ham HTML etiketleri (`<button>`, `<table>`, vb.) veya ad-hoc Tailwind stilleri yerine `@/components/core/` bileşenleri (`Button`, `Table`, `Input`, `Card`, `Badge`) kullanılmalıdır.
   - `button.tsx` için WCAG uyumlu min 44x44px dokunma hedefi (touch target) ve `focus-visible` stilleri zorunludur.
   - `badge.tsx` için projede kullanılan tüm semantik varyantlar (`success`, `warning`, `secondary`, `outline`, `destructive`) ve boyutlar desteklenmelidir.

3. **Dosya İsimlendirme ve macOS APFS Dosya Sistemi**:
   - macOS dosya sistemi büyük/küçük harfe duyarsız (case-preserving, case-insensitive) olduğu için `Navbar.tsx` ve `navbar.tsx` gibi dosyaları silerken veya yeniden adlandırırken tek seferlik silme yerine kontrollü geçiş yapılmalıdır.
   - Tüm bileşen ve veri dosyaları kesinlikle `kebab-case` formatında adlandırılmalıdır.

4. **Tip Güvenliği ve `any` İzolasyonu**:
   - Görselleştirici ve simülatör gibi karmaşık matematiksel veri modellerinde (`HierarchicalStep`, `KMeansStep`, `SubsetSumStep`, `TreeVisualizerNode`) tam tiplendirme yapılmalıdır.
   - `InteractiveDemo` gibi genel amaçlı simülasyon arayüzlerinde `any` yerine `(input: TInput) => TOutput` generic sözleşmesi kullanılmalıdır.

5. **250 Satır Kuralı ve Monolitlerin Bölünmesi**:
   - Büyük algoritma sayfaları (`hierarchical-clustering`, `segment-tree`, `k-means`, `subset-sum`) şu katmanlara ayrılarak modülerleştirilmelidir:
     - `types.ts`: Tip tanımları
     - `utils.ts` / `algorithm.ts`: Saf algoritma ve matematik fonksiyonları
     - `data.ts`: Örnek kodlar, karmaşıklık ve açıklama metinleri
     - `components/*`: Küçük, odaklı alt görselleştiriciler
     - `*-view.tsx`: Birleştirici client görünüm bileşeni

6. **UI ve Core Bileşen Fazlalıklarının Tasfiyesi**:
   - `src/components/core/` içinde karşılığı bulunan temel UI bileşenleri (`button`, `badge`, `card`, `input`, `label`, `separator`, `textarea`) `src/components/ui/` altından tamamen kaldırılmalı ve projedeki tüm importlar doğrudan `@/components/core/*` modüllerine yönlendirilmelidir.
   - `src/components/ui/` altında yalnızca `core` eşdeğeri olmayan Radix/özelleşmiş bileşenler (`dialog`, `dropdown-menu`, `performance-metrics`, `scroll-area`, `slider`, `switch`, `tabs`, `toast`) tutulmalıdır.
