import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';

export const metadata: Metadata = {
  title: 'Böl ve Fethet Algoritmaları | AlgoPit',
  description:
    'Böl ve fethet (divide and conquer), problemi aynı tipte daha küçük alt problemlere bölen, çözen ve sonuçları birleştiren algoritma tasarım yaklaşımıdır.',
};

export default function DivideAndConquerPage() {
  const algorithms = createCategoryAlgorithms('/algorithms/divide-and-conquer');

  return (
    <div className="space-y-8">
      <PageHeaderCard
        title="Böl ve Fethet Algoritmaları"
        description="Böl ve fethet (divide and conquer), problemi aynı tipte daha küçük alt problemlere bölen, çözen ve sonuçları birleştiren algoritma tasarım yaklaşımıdır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Böl ve Fethet Yaklaşımı Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Böl ve fethet yaklaşımı, karmaşık problemleri daha küçük alt
            problemlere bölerek çözmeyi amaçlayan temel bir algoritma tasarım
            prensibidir. Bu yaklaşım üç ana adımdan oluşur:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong className="text-ink">Böl (Divide):</strong> Problemi aynı
              türde daha küçük alt problemlere böl.
            </li>
            <li>
              <strong className="text-ink">Fethet (Conquer):</strong> Alt
              problemleri özyinelemeli (recursive) olarak çöz. Eğer alt
              problemler yeterince küçükse, doğrudan çöz.
            </li>
            <li>
              <strong className="text-ink">Birleştir (Combine):</strong> Alt
              problemlerin çözümlerini orijinal problemin çözümü için birleştir.
            </li>
          </ol>
          <p className="font-semibold text-ink">
            Böl ve fethet yaklaşımının avantajları:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Verimlilik:</strong> Birçok durumda,
              bu yaklaşım doğrusal algoritmalara göre daha verimlidir,
              logaritmik zaman karmaşıklığı sunar.
            </li>
            <li>
              <strong className="text-ink">Paralelleştirebilme:</strong> Alt
              problemler bağımsız olduğu için çözümleri paralel işlemlerle
              gerçekleştirilebilir.
            </li>
            <li>
              <strong className="text-ink">Ölçeklenebilirlik:</strong> Büyük
              veri setleri için bile etkin çözümler sunar.
            </li>
          </ul>
          <p className="font-semibold text-ink">Yaygın kullanım alanları:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sıralama algoritmaları (Merge Sort, Quick Sort)</li>
            <li>Arama algoritmaları (Binary Search)</li>
            <li>Matris çarpımı (Strassen&apos;s Algorithm)</li>
            <li>En yakın nokta çiftini bulma (Closest Pair of Points)</li>
            <li>Hızlı Fourier dönüşümü (FFT)</li>
          </ul>
          <p>
            Böl ve fethet algoritmaları genellikle O(n log n) veya daha iyi
            zaman karmaşıklığına sahiptir. Bu nedenle, büyük veri setleriyle
            çalışırken önemli performans avantajları sağlarlar.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
