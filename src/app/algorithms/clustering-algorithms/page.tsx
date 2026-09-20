import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Kümeleme Algoritmaları',
  description:
    'Kümeleme algoritmaları, benzer özelliklere sahip verileri gruplandırmak için kullanılan gözetimsiz öğrenme yöntemleridir.',
  path: '/algorithms/clustering-algorithms',
  keywords: [
    'kümeleme algoritmaları',
    'algoritmalar',
    'görselleştirme',
    'simülasyon',
  ],
});

export default function ClusteringAlgorithmsPage() {
  const algorithms = [
    {
      name: 'K-Means',
      path: '/algorithms/clustering-algorithms/k-means',
      description:
        'Verileri K adet kümeye ayıran, her kümenin merkezi etrafında gruplandıran popüler bir kümeleme algoritması.',
    },
    {
      name: 'Hierarchical Clustering',
      path: '/algorithms/clustering-algorithms/hierarchical-clustering',
      description:
        'Verileri hiyerarşik bir ağaç yapısında gruplayan, farklı seviyelerde kümeleme imkanı sunan algoritma.',
    },
  ];
  const categorySchema = getCategorySchema({
    name: 'Kümeleme Algoritmaları',
    description:
      'Kümeleme algoritmaları, benzer özelliklere sahip verileri gruplandırmak için kullanılan gözetimsiz öğrenme yöntemleridir.',
    path: '/algorithms/clustering-algorithms',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="Kümeleme Algoritmaları"
        description="Kümeleme algoritmaları, benzer özelliklere sahip verileri gruplandırmak için kullanılan gözetimsiz öğrenme yöntemleridir. Bu algoritmalar, veri analizinde, müşteri segmentasyonunda ve desen tanımada yaygın olarak kullanılır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Kümeleme Algoritmaları Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Kümeleme algoritmaları, etiketlenmemiş verileri benzerliklerine göre
            gruplara ayırmak için kullanılan gözetimsiz öğrenme yöntemleridir.
            Bu algoritmalar, veri içindeki doğal grupları veya kalıpları
            keşfetmeyi amaçlar.
          </p>
          <p className="font-semibold text-ink">
            Temel kümeleme yöntemleri şu şekilde sınıflandırılabilir:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Bölümleyici Kümeleme:</strong> Veriyi
              önceden belirlenen sayıda kümeye ayırır (K-Means gibi).
            </li>
            <li>
              <strong className="text-ink">Hiyerarşik Kümeleme:</strong> Veriyi
              bir ağaç yapısında gruplar, farklı kümeleme seviyeleri sunar.
            </li>
            <li>
              <strong className="text-ink">Yoğunluk Bazlı Kümeleme:</strong>{' '}
              Yoğun bölgeleri arayarak kümeleri belirler (DBSCAN gibi).
            </li>
            <li>
              <strong className="text-ink">Model Bazlı Kümeleme:</strong>{' '}
              İstatistiksel modeller kullanarak kümelemeyi gerçekleştirir.
            </li>
          </ul>
          <p className="font-semibold text-ink">
            Kümeleme algoritmaları birçok alanda kullanılır:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Pazarlama: Müşteri segmentasyonu ve hedef kitle analizi</li>
            <li>Biyoloji: Genetik veriler üzerinde grupların tespiti</li>
            <li>Görüntü İşleme: Renk kuantalama ve görüntü segmentasyonu</li>
            <li>Sosyal Ağ Analizi: Topluluk tespiti ve ağ yapısı analizi</li>
            <li>
              Öneri Sistemleri: Benzer kullanıcı veya ürünlerin gruplanması
            </li>
          </ul>
          <p>
            İyi bir kümeleme algoritması seçimi, veri yapısına, küme şekline ve
            problem türüne bağlıdır. Her algoritmanın kendine özgü avantajları
            ve sınırlamaları vardır.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
