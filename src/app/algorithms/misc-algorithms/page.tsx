import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Diğer Önemli Algoritmalar',
  description:
    'Çeşitli problem alanlarında kullanılan, farklı kategorilere tam olarak sığmayan ancak yazılım geliştirmede kritik önem taşıyan algoritmalar.',
  path: '/algorithms/misc-algorithms',
  keywords: [
    'diğer önemli algoritmalar',
    'algoritmalar',
    'görselleştirme',
    'simülasyon',
  ],
});

export default function MiscAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Bloom Filter',
      path: '/algorithms/misc-algorithms/bloom-filter',
      description:
        'Bir elemanın bir kümede bulunup bulunmadığını hızlı şekilde kontrol eden, olasılıksal veri yapısı.',
    },
    {
      name: 'Reservoir Sampling',
      path: '/algorithms/misc-algorithms/reservoir-sampling',
      description:
        'Bilinmeyen boyuttaki veri akışından rastgele örneklem almaya yarayan algoritma.',
    },
  ];
  const categorySchema = getCategorySchema({
    name: 'Diğer Önemli Algoritmalar',
    description:
      'Çeşitli problem alanlarında kullanılan, farklı kategorilere tam olarak sığmayan ancak yazılım geliştirmede kritik önem taşıyan algoritmalar.',
    path: '/algorithms/misc-algorithms',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="Diğer Önemli Algoritmalar"
        description="Çeşitli problem alanlarında kullanılan, farklı kategorilere tam olarak sığmayan ancak yazılım geliştirmede kritik önem taşıyan algoritmalar."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Diğer Önemli Algoritmalar Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Bu bölümde yer alan algoritmalar, standart sınıflandırmalara tam
            olarak uymayan ancak modern yazılım geliştirmede önemli rol oynayan
            algoritmalardır. Bu algoritmaların çoğu, belirli problem alanlarına
            özel çözümler sunan, uzmanlaşmış veri yapıları ve teknikler içerir.
          </p>

          <p className="font-semibold text-ink">
            Bu özel amaçlı algoritmaların bazı önemli örnekleri:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Bloom Filter:</strong> Bir elemanın
              bir kümede bulunup bulunmadığını hızlı bir şekilde kontrol etmek
              için kullanılan olasılıksal bir veri yapısıdır. Web tarayıcıları,
              veritabanları ve önbellekleme sistemlerinde yaygın olarak
              kullanılır.
            </li>
            <li>
              <strong className="text-ink">Reservoir Sampling:</strong>{' '}
              Bilinmeyen boyuttaki bir veri akışından sabit boyutlu rastgele bir
              örneklem seçmek için kullanılan bir algoritmadır. Büyük veri
              analizinde ve veri madenciliğinde kullanılır.
            </li>
            <li>
              <strong className="text-ink">Karnaugh Haritası:</strong> Boolean
              fonksiyonlarını sadeleştirmek için kullanılan bir yöntemdir.
              Dijital mantık devrelerinin tasarımında ve optimizasyonunda
              kullanılır.
            </li>
            <li>
              <strong className="text-ink">Consensus Algoritmaları:</strong>{' '}
              Dağıtık sistemlerde birden fazla düğümün ortak bir karara
              varmasını sağlayan algoritmalardır. Blockchain teknolojisi,
              dağıtık veritabanları ve dağıtık sistemlerde yaygın olarak
              kullanılır.
            </li>
            <li>
              <strong className="text-ink">MapReduce:</strong> Büyük veri
              kümelerini işlemek için kullanılan bir programlama modeli ve veri
              işleme tekniğidir. Paralel işleme, dağıtık sistemler ve büyük veri
              analizinde kullanılır.
            </li>
            <li>
              <strong className="text-ink">Monte Carlo Metotları:</strong>{' '}
              Rastgele örnekleme yoluyla sayısal sonuçlar üreten bir hesaplama
              algoritmaları sınıfıdır. Sayısal entegrasyon, optimizasyon,
              rastgele sayı üretimi ve simülasyon gibi alanlarda kullanılır.
            </li>
          </ul>

          <p>
            Bu algoritmaların çoğu, özel problem alanlarında optimize edilmiş
            performans sağlamak veya belirli veri işleme ihtiyaçlarını
            karşılamak için tasarlanmıştır. Modern yazılım sistemlerinin
            karmaşıklığı arttıkça, bu tür uzmanlaşmış algoritmaların önemi de
            artmaktadır.
          </p>

          <p>
            Yazılım geliştiriciler için, bu algoritmaların temel prensiplerini
            ve kullanım alanlarını anlamak, karşılaşılan problemlere en uygun
            çözümü seçmek açısından değerlidir. Her algoritmanın kendine özgü
            avantajları, dezavantajları ve kullanım senaryoları vardır.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
