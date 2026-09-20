import React from 'react';
import type { Metadata } from 'next';
import { ShellSortView } from '@/features/algorithms/shell-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Shell Sort Algoritması',
  description: 'Shell Sort algoritması, aralık (gap) temelli sıralama mantığı ve interaktif görselleştirici.',
  path: '/algorithms/sorting/shell-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Orta',
});

export default function ShellSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Shell Sort Algoritması',
    description: 'Shell Sort algoritması, aralık (gap) temelli sıralama mantığı ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/shell-sort',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <ShellSortView />
    </div>
  );
}
