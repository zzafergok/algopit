import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';

export const metadata: Metadata = {
  title: 'Arama Algoritmaları | AlgoPit',
  description:
    'Arama algoritmaları, veri yapıları içerisinde belirli bir elemanı bulmak için kullanılan algoritmalardır.',
};

export default function SearchingAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Linear Search',
      path: '/algorithms/searching/linear-search',
      description:
        'Bir dizide elemanları sırayla kontrol ederek arama yapan en basit algoritma.',
    },
    {
      name: 'Binary Search',
      path: '/algorithms/searching/binary-search',
      description:
        'Sıralı dizilerde, her adımda arama alanını yarıya bölerek logaritmik zamanda arama yapan algoritma.',
    },
    {
      name: 'Arama Teknikleri (Search Techniques)',
      path: '/algorithms/searching/search-techniques',
      description:
        'Olasılıksal Arama (Probability Search), Kendini Düzenleyen Arama (Self-Organizing Search) ve İnterpolasyon Araması (Interpolation Search) varyantlarını içerir.',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeaderCard
        title="Arama Algoritmaları"
        description="Arama algoritmaları, veri yapıları içerisinde belirli bir elemanı bulmak için kullanılan algoritmalardır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Arama Algoritmaları Hakkında
        </h2>
        <div className="max-w-none text-muted leading-relaxed">
          <p>
            Arama algoritmaları, bir veri yapısı içerisinde belirli bir elemanı
            veya değeri bulmak için kullanılan temel algoritmalardır. Yazılım
            uygulamalarında, veritabanlarında, dosya sistemlerinde ve birçok
            farklı alanda sıkça kullanılırlar.
          </p>

          <p className="mt-4">
            Arama algoritmaları, çalışma prensipleri ve performans
            karakteristiklerine göre çeşitli kategorilere ayrılabilir:
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong className="text-ink">
                Doğrusal Arama Algoritmaları:
              </strong>{' '}
              Veri yapısının tüm elemanlarını tek tek kontrol ederek arama
              yapar. (Örn: Linear Search)
            </li>
            <li>
              <strong className="text-ink">İkili Arama Algoritmaları:</strong>{' '}
              Sıralı veri yapılarında, arama uzayını her adımda yarıya bölerek
              logaritmik bir zaman karmaşıklığında çalışır. (Örn: Binary Search)
            </li>
            <li>
              <strong className="text-ink">
                Sıçramalı Arama Algoritmaları:
              </strong>{' '}
              Belirli bir adım boyutuyla ilerleyerek arama yapar. (Örn: Jump
              Search)
            </li>
            <li>
              <strong className="text-ink">Hash Tabanlı Arama:</strong>{' '}
              Anahtarların hash değerlerini kullanarak sabit zamanda arama
              yapar. (Örn: Hash Tables)
            </li>
            <li>
              <strong className="text-ink">Ağaç Tabanlı Arama:</strong> Ağaç
              veri yapılarını kullanarak logaritmik zamanda arama yapar. (Örn:
              Binary Search Tree)
            </li>
          </ul>

          <p className="mt-4">
            Arama algoritmalarının seçimi, aşağıdaki faktörlere bağlı olarak
            değişir:
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Verinin boyutu ve yapısı</li>
            <li>Verinin sıralı olup olmadığı</li>
            <li>Bellek kısıtlamaları</li>
            <li>Arama işleminin sıklığı</li>
            <li>Ekleme ve silme işlemlerinin sıklığı</li>
          </ul>

          <p className="mt-4">
            Arama algoritmalarının bazı önemli performans metrikleri:
          </p>

          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>
              <strong className="text-ink">Zaman Karmaşıklığı:</strong>{' '}
              Algoritmanın çalışma süresi (En kötü, ortalama ve en iyi durum)
            </li>
            <li>
              <strong className="text-ink">Alan Karmaşıklığı:</strong>{' '}
              Algoritmanın bellek kullanımı
            </li>
            <li>
              <strong className="text-ink">Verimlilik:</strong> Algoritmanın
              pratik performansı
            </li>
          </ul>

          <p className="mt-4">
            Doğru arama algoritmasını seçmek, yazılım uygulamalarının
            performansını ve verimini önemli ölçüde etkileyebilir. Örneğin,
            büyük veri yapılarında Binary Search gibi logaritmik karmaşıklığa
            sahip algoritmalar, Linear Search gibi doğrusal karmaşıklığa sahip
            algoritmalara göre çok daha hızlı çalışır.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
