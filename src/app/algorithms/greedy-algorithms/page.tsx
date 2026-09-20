import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Açgözlü Algoritmalar',
  description:
    'Açgözlü (Greedy) algoritmalar, her adımda en iyi görünen seçimi yaparak global optimum çözüm arayan problem çözme yaklaşımıdır.',
  path: '/algorithms/greedy-algorithms',
  keywords: [
    'açgözlü algoritmalar',
    'algoritmalar',
    'görselleştirme',
    'simülasyon',
  ],
});

export default function GreedyAlgorithmsPage() {
  const algorithms = createCategoryAlgorithms('/algorithms/greedy-algorithms');
  const categorySchema = getCategorySchema({
    name: 'Açgözlü Algoritmalar',
    description:
      'Açgözlü (Greedy) algoritmalar, her adımda en iyi görünen seçimi yaparak global optimum çözüm arayan problem çözme yaklaşımıdır.',
    path: '/algorithms/greedy-algorithms',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="Açgözlü Algoritmalar"
        description="Açgözlü (Greedy) algoritmalar, her adımda en iyi görünen seçimi yaparak global optimum çözüm arayan problem çözme yaklaşımıdır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Açgözlü Algoritmalar Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Açgözlü algoritmalar, optimizasyon problemlerini çözmek için
            kullanılan bir algoritma tasarım yaklaşımıdır. Bu yaklaşımda,
            algoritma her adımda mevcut durumda en iyi görünen seçimi yapar,
            gelecekteki sonuçları dikkate almadan ilerler. Bu nedenle
            &quot;açgözlü&quot; (greedy) olarak adlandırılır.
          </p>

          <p className="font-semibold text-ink">
            Açgözlü algoritmaların temel özellikleri:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Yerel Optimizasyon:</strong> Her
              adımda mevcut durumda en iyi görünen seçimi yapar.
            </li>
            <li>
              <strong className="text-ink">Geriye Dönüş Yok:</strong> Bir kez
              karar verildikten sonra, bu karar değiştirilmez.
            </li>
            <li>
              <strong className="text-ink">Basitlik:</strong> Genellikle
              anlaşılması ve uygulanması kolaydır.
            </li>
            <li>
              <strong className="text-ink">Verimlilik:</strong> Çoğu durumda çok
              hızlı çalışır, genellikle O(n log n) veya daha iyi.
            </li>
          </ul>

          <p className="font-semibold text-ink">
            Açgözlü algoritmaların başarılı olması için gereken koşullar:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Açgözlü Seçim Özelliği:</strong>{' '}
              Yerel optimum seçimler, global optimum çözüme yol açmalıdır.
            </li>
            <li>
              <strong className="text-ink">Optimal Alt Yapı:</strong> Problemin
              optimal çözümü, alt problemlerin optimal çözümlerini içermelidir.
            </li>
          </ul>

          <p>
            Açgözlü algoritmaların her zaman optimal çözümü garanti etmediğini
            unutmamak önemlidir. Bazı durumlarda, yerel optimum kararlar, global
            optimum çözüme ulaşmayı engelleyebilir. Ancak, belirli problem
            türlerinde açgözlü yaklaşım optimal sonuç verir.
          </p>

          <p className="font-semibold text-ink">
            Açgözlü algoritmaların kullanıldığı yaygın problemler:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Minimum Yayılma Ağacı (Kruskal ve Prim algoritmaları)</li>
            <li>Huffman Kodlama (veri sıkıştırma)</li>
            <li>Dijkstra En Kısa Yol Algoritması</li>
            <li>Kesirli Sırt Çantası Problemi (Fractional Knapsack)</li>
            <li>Etkinlik Seçim Problemi (Activity Selection)</li>
            <li>Para Üstü Problemi (Coin Change Problem - bazı durumlarda)</li>
          </ul>

          <p>
            Açgözlü algoritmalar, dinamik programlama veya geri izleme gibi
            diğer yaklaşımlara göre genellikle daha hızlı ve daha az bellek
            kullanır. Ancak, her problem için uygun olmayabilir ve bazen
            alt-optimal sonuçlar üretebilir. Bu nedenle, problemi dikkatli bir
            şekilde analiz etmek ve açgözlü yaklaşımın uygun olup olmadığını
            belirlemek önemlidir.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
