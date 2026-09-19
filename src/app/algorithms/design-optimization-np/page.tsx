import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';

export const metadata: Metadata = {
  title: 'Tasarım, Optimizasyon ve NP Algoritmaları | AlgoPit',
  description:
    'Kombinatoryal optimizasyon, karar ağaçları, TSP sezgiselleri ve NP-Zor problemleri çözmek için kullanılan arama stratejileri.',
};

export default function DesignOptimizationNpPage() {
  const algorithms = createCategoryAlgorithms(
    '/algorithms/design-optimization-np',
  );

  return (
    <div className="space-y-8">
      <PageHeaderCard
        title="Tasarım, Optimizasyon ve NP Algoritmaları"
        description="Optimizasyon algoritmaları, kaynak sınırları dahilinde en verimli, en ucuz veya en kazançlı çözümü üretmeyi hedefler. Kombinatoryal optimizasyon, karar ağaçları, TSP sezgiselleri ve NP-Zor problemleri çözmek için kullanılan arama stratejilerini kapsar."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Tasarım, Optimizasyon ve NP Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Tasarım ve optimizasyon algoritmaları bilgisayar bilimlerindeki en
            karmaşık ve pratik öneme sahip alanlardan biridir. Üretim planlama,
            lojistik dağıtım rotaları, çip tasarımı, bütçe optimizasyonları ve
            yapay zeka karar ağaçları doğrudan bu yöntemlere dayanır.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Temel Tasarım Şemaları
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-ink">
                  Dallanıp Sınırlandırma (Branch and Bound)
                </h4>
                <p className="text-sm">
                  Çözüm ağacında suboptimal alt dalları budayarak tam sayımlı
                  kesin en iyi sonuçları arar. Arama uzayını daraltmak için
                  sürekli alt/üst limit değerlendirmeleri yapar.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  Gezgin Satıcı ve Yerel Arama (TSP & Local Search)
                </h4>
                <p className="text-sm">
                  Komşuluk ilişkilerini kullanarak mevcut bir çözümü yerel
                  modifikasyonlarla (2-Opt gibi) sürekli olarak iyileştiren
                  hızlı sezgisel yöntemlerdir. Kapsamlı aramaya göre katbekat
                  hızlıdır.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  NP-Zor ve SAT Çözücüler
                </h4>
                <p className="text-sm">
                  NP-Zor problemler polinomsal zamanda kesin çözülemeyen
                  problemleri ifade eder. SAT (Boolean Satisfiability) ise
                  Boolean ifadelerinin mantıksal olarak doğru kılınıp
                  kılınamayacağını dönüşümlü karar ağaçlarıyla çözen temel
                  optimizasyon problemidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
