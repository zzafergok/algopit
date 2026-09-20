import React from 'react';
import type { Metadata } from 'next';
import { TimSortView } from '@/features/algorithms/tim-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Tim Sort Algoritması',
  description: 'Tim Sort algoritması, hibrit sıralama mantığı, Python/Java implementasyonları ve interaktif görselleştirici.',
  path: '/algorithms/sorting/tim-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Orta',
});

export default function TimSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Tim Sort Algoritması',
    description: 'Tim Sort algoritması, hibrit sıralama mantığı, Python/Java implementasyonları ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/tim-sort',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <TimSortView />
    </div>
  );
}
