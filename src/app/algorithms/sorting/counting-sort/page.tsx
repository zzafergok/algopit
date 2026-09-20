import React from 'react';
import type { Metadata } from 'next';
import { CountingSortView } from '@/features/algorithms/counting-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Counting Sort (Sayarak Sıralama)',
  description: 'Counting Sort algoritması, frekans sayımı, lineer O(n+k) zaman karmaşıklığı ve interaktif görselleştirici.',
  path: '/algorithms/sorting/counting-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Orta',
});

export default function CountingSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Counting Sort (Sayarak Sıralama)',
    description: 'Counting Sort algoritması, frekans sayımı, lineer O(n+k) zaman karmaşıklığı ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/counting-sort',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <CountingSortView />
    </div>
  );
}
