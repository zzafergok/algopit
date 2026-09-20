import React from 'react';
import type { Metadata } from 'next';
import { QuickSortView } from '@/features/algorithms/quick-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Quick Sort (Hızlı Sıralama)',
  description: 'Quick Sort algoritması, böl ve fethet yaklaşımı, zaman/alan karmaşıklığı analizi ve interaktif demosu.',
  path: '/algorithms/sorting/quick-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Orta',
});

export default function QuickSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Quick Sort (Hızlı Sıralama)',
    description: 'Quick Sort algoritması, böl ve fethet yaklaşımı, zaman/alan karmaşıklığı analizi ve interaktif demosu.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/quick-sort',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <QuickSortView />
    </div>
  );
}
