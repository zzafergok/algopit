import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Geri İzleme Algoritmaları',
  description:
    'Geri izleme (backtracking), bir problem için olası tüm çözümleri adım adım keşfeden ve geçersiz çözüm yollarını eleme yöntemiyle ilerleyen bir algoritma stratejisidir.',
  path: '/algorithms/backtracking',
  keywords: [
    'geri i̇zleme algoritmaları',
    'algoritmalar',
    'görselleştirme',
    'simülasyon',
  ],
});

export default function BacktrackingPage() {
  const algorithms = createCategoryAlgorithms('/algorithms/backtracking');
  const categorySchema = getCategorySchema({
    name: 'Geri İzleme Algoritmaları',
    description:
      'Geri izleme (backtracking), bir problem için olası tüm çözümleri adım adım keşfeden ve geçersiz çözüm yollarını eleme yöntemiyle ilerleyen bir algoritma stratejisidir.',
    path: '/algorithms/backtracking',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="Geri İzleme Algoritmaları"
        description="Geri izleme (backtracking), bir problem için olası tüm çözümleri adım adım keşfeden ve geçersiz çözüm yollarını eleme yöntemiyle ilerleyen bir algoritma stratejisidir."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Geri İzleme Algoritmaları Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Geri izleme, bir araştırma ağacını derinlemesine dolaşarak çözüm
            arayan bir problem çözme tekniğidir. Algoritma, her adımda bir seçim
            yapar ve bu seçimin sonuçlarını inceler. Eğer seçim kısıtlamaları
            ihlal ediyorsa, algoritma geri döner (backtrack) ve başka bir seçim
            yapar.
          </p>
          <p>
            Bu yaklaşım, kombinatoryal problemlerde özellikle etkilidir.
            Örneğin; permütasyonlar, kombinasyonlar, bulmacalar ve oyunlar gibi
            çözüm uzayının büyük olduğu durumlarda kullanışlıdır.
          </p>
          <p>
            Geri izleme algoritmaları genellikle rekürsif yapıdadır ve
            &quot;kaba kuvvet&quot; yaklaşımına göre daha verimlidir, çünkü
            geçersiz çözüm yollarını erken aşamada tespit edip elemek mümkündür.
          </p>
          <p className="font-semibold text-ink">
            Yaygın geri izleme kullanım alanları:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Bulmacalar (Sudoku, Satranç, N-Queens, vb.)</li>
            <li>
              Kombinatoryal problemler (Subset Sum, Kombinasyon, Permütasyon)
            </li>
            <li>Labirent çözme</li>
            <li>Graf boyama ve diğer graf problemleri</li>
          </ul>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
