import React from 'react';
import type { Metadata } from 'next';
import { RadixSortView } from '@/features/algorithms/radix-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Radix Sort (Taban Sıralaması)',
  description: 'Radix Sort algoritması, basamak tabanlı sıralama, O(d*(n+k)) karmaşıklığı ve interaktif görselleştirici.',
  path: '/algorithms/sorting/radix-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Orta',
});

export default function RadixSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Radix Sort (Taban Sıralaması)',
    description: 'Radix Sort algoritması, basamak tabanlı sıralama, O(d*(n+k)) karmaşıklığı ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/radix-sort',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <RadixSortView />
    </div>
  );
}
