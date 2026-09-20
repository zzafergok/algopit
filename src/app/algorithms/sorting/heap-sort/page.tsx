import React from 'react';
import type { Metadata } from 'next';
import { HeapSortView } from '@/features/algorithms/heap-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Heap Sort (Yığın Sıralaması)',
  description: 'Heap Sort algoritması, ikili yığın yapısı, O(n log n) garantili zaman karmaşıklığı ve interaktif görselleştirici.',
  path: '/algorithms/sorting/heap-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Orta',
});

export default function HeapSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Heap Sort (Yığın Sıralaması)',
    description: 'Heap Sort algoritması, ikili yığın yapısı, O(n log n) garantili zaman karmaşıklığı ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/heap-sort',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <HeapSortView />
    </div>
  );
}
