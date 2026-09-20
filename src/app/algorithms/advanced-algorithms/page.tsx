import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'İleri Seviye Algoritmalar',
  description:
    'İleri seviye algoritmalar, karmaşık problemleri çözmek için optimize edilmiş, özel durumlara yönelik geliştirilmiş algoritmalardır.',
  path: '/algorithms/advanced-algorithms',
  keywords: [
    'i̇leri seviye algoritmalar',
    'algoritmalar',
    'görselleştirme',
    'simülasyon',
  ],
});

export default function AdvancedAlgorithmsPage() {
  const algorithms = createCategoryAlgorithms(
    '/algorithms/advanced-algorithms',
  );
  const categorySchema = getCategorySchema({
    name: 'İleri Seviye Algoritmalar',
    description:
      'İleri seviye algoritmalar, karmaşık problemleri çözmek için optimize edilmiş, özel durumlara yönelik geliştirilmiş algoritmalardır.',
    path: '/algorithms/advanced-algorithms',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="İleri Seviye Algoritmalar"
        description="İleri seviye algoritmalar, karmaşık problemleri çözmek için optimize edilmiş, özel durumlara yönelik geliştirilmiş algoritmalardır. Bu algoritmaları anlamak, verimli yazılım çözümleri geliştirmede kritik öneme sahiptir."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // İleri Seviye Algoritmalar Hakkında
        </h2>
        <div className="prose dark:prose-invert max-w-none text-muted leading-relaxed">
          <p>
            İleri seviye algoritmalar, genellikle belirli türdeki problemlere
            yönelik optimize edilmiş özel çözümlerdir. Bu algoritmalar
            çoğunlukla temel algoritmaların varyasyonları veya uzantıları olarak
            ortaya çıkar ve performans, verimlilik veya özel kullanım durumları
            için geliştirilmiştir.
          </p>
          <p className="mt-4">
            Bu algoritmalar, yazılım mühendisliği ve bilgisayar biliminde daha
            karmaşık ve özelleştirilmiş problemleri çözmek için kullanılır.
            Örneğin, bağlı listelerde döngü tespiti (Floyd&apos;s Cycle-Finding)
            veya bağımlılık çözümleme (Topological Sort) gibi özel durumlar için
            tasarlanmışlardır.
          </p>
          <p className="mt-4">
            İleri seviye algoritmaların anlaşılması, karmaşık yazılım
            sistemlerinin geliştirilmesinde ve optimizasyonunda önemli bir
            beceridir.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
