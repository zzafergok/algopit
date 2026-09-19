import React from 'react';

export const PlatformArchitecture: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h3>Platform Mimarisi</h3>
      <p>
        AlgoPit, modern web teknolojileri kullanılarak geliştirilmiş bir
        full-stack uygulamadır. İşte platformun ana bileşenleri:
      </p>

      <h4>Frontend</h4>
      <ul>
        <li>
          <strong>Next.js:</strong> React tabanlı framework (App Router)
        </li>
        <li>
          <strong>TypeScript:</strong> Tip güvenliği
        </li>
        <li>
          <strong>Tailwind CSS:</strong> Stil ve arayüz
        </li>
        <li>
          <strong>radix/ui:</strong> UI bileşenleri
        </li>
        <li>
          <strong>Framer Motion:</strong> Animasyonlar
        </li>
      </ul>

      <h4>Dosya Yapısı</h4>
      <pre className="bg-obsidian/60 p-4 rounded-sm overflow-x-auto text-sm">
        {`algopit/
├── public/          # Statik dosyalar
├── src/
│   ├── app/         # Sayfa bileşenleri (Next.js App Router)
│   │   ├── algorithms/  # Algoritma sayfaları
│   │   ├── page.tsx     # Ana sayfa
│   ├── components/  # UI bileşenleri
│   │   ├── common/      # Ortak bileşenler
│   │   ├── layout/      # Düzen bileşenleri
│   │   ├── theme/       # Tema bileşenleri
│   │   ├── ui/          # Temel UI bileşenleri (radix-ui)
│   ├── context/     # React context tanımlamaları
│   ├── lib/         # Yardımcı fonksiyonlar ve algoritma uygulamaları
│   │   ├── algorithms/  # Algoritma implementasyonları
│   ├── styles/      # Global stil tanımlamaları`}
      </pre>

      <h4>Performans Optimizasyonları</h4>
      <p>Platform, optimum performans için aşağıdaki teknikleri kullanır:</p>
      <ul>
        <li>Next.js App Router ile statik sayfa oluşturma</li>
        <li>Görüntülerin otomatik optimizasyonu</li>
        <li>Code splitting</li>
        <li>Suspense ve lazy loading</li>
      </ul>
    </div>
  );
};
