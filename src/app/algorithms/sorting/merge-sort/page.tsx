import React from 'react';
import type { Metadata } from 'next';
import { MergeSortView } from '@/features/algorithms/merge-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Merge Sort (Birleştirmeli Sıralama)',
  description: 'Merge Sort algoritması, böl ve fethet prensibi, garantili O(n log n) zaman karmaşıklığı analizi ve interaktif görselleştirici.',
  path: '/algorithms/sorting/merge-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Orta',
});

export default function MergeSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Merge Sort (Birleştirmeli Sıralama)',
    description: 'Merge Sort algoritması, böl ve fethet prensibi, garantili O(n log n) zaman karmaşıklığı analizi ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/merge-sort',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <MergeSortView />
    </div>
  );
}
