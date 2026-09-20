import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Dinamik Programlama',
  description: 'Karmaşık problemleri alt problemlere bölerek ve sonuçları saklayarak tekrar hesaplamayı önleyen algoritma tasarım tekniği.',
  path: '/algorithms/dynamic-programming',
  keywords: ['dinamik programlama', 'algoritmalar', 'görselleştirme', 'simülasyon'],
});

export default function DynamicProgrammingPage() {
  const algorithms = createCategoryAlgorithms(
    '/algorithms/dynamic-programming',
  );
  const categorySchema = getCategorySchema({
    name: 'Dinamik Programlama',
    description: 'Karmaşık problemleri alt problemlere bölerek ve sonuçları saklayarak tekrar hesaplamayı önleyen algoritma tasarım tekniği.',
    path: '/algorithms/dynamic-programming',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="Dinamik Programlama"
        description="Dinamik Programlama (DP), karmaşık problemleri daha küçük alt problemlere bölerek ve alt problemlerin sonuçlarını saklayarak tekrar hesaplamayı önleyen bir algoritma tasarım tekniğidir."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Dinamik Programlama Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Dinamik Programlama (DP), karmaşık problemleri daha küçük alt
            problemlere bölen, bu alt problemlerin sonuçlarını saklayan ve
            tekrar hesaplama ihtiyacını ortadan kaldıran bir algoritma tasarım
            yaklaşımıdır. Bu yöntem, özellikle örtüşen alt problemleri olan ve
            optimal alt yapıya sahip problemlerde kullanılır.
          </p>

          <p className="font-semibold text-ink">
            Dinamik Programlama iki temel yaklaşımla uygulanır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">
                Memoization (Üstten-Aşağı Yaklaşım):
              </strong>{' '}
              Rekürsif olarak problem çözülürken, alt problemlerin sonuçları bir
              tabloda saklanır ve gerektiğinde tekrar kullanılır.
            </li>
            <li>
              <strong className="text-ink">
                Tabulation (Aşağıdan-Yukarı Yaklaşım):
              </strong>{' '}
              Alt problemlerden başlayarak, daha büyük problemlere doğru
              ilerleyerek tabloyu doldurur.
            </li>
          </ul>

          <p className="font-semibold text-ink">
            Bir problemin DP ile çözülebilmesi için genellikle şu özelliklere
            sahip olması gerekir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Örtüşen Alt Problemler:</strong> Aynı
              alt problemler, çözüm sürecinde birden fazla kez ortaya çıkar.
            </li>
            <li>
              <strong className="text-ink">Optimal Alt Yapı:</strong> Bir
              problemin optimal çözümü, alt problemlerin optimal çözümlerinden
              oluşur.
            </li>
          </ul>

          <p className="font-semibold text-ink">
            Dinamik Programlama yaygın olarak şu alanlarda kullanılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Optimizasyon problemleri (Knapsack Problem, Coin Change)</li>
            <li>Sekans analizi (Longest Common Subsequence, Edit Distance)</li>
            <li>Grafik algoritmaları (Shortest Path, Floyd-Warshall)</li>
            <li>Bilgisayarlı görü ve görüntü işleme</li>
            <li>Biyoinformatik</li>
            <li>Ekonomi ve finans modelleri</li>
          </ul>

          <p>
            DP yaklaşımı, brute force veya özyinelemeli (recursive) çözümlere
            kıyasla genellikle çok daha verimlidir. Ancak, doğru durum tanımını
            formüle etmek ve geçiş denklemlerini belirlemek, DP çözümlerinin en
            zorlu kısmı olabilir.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
