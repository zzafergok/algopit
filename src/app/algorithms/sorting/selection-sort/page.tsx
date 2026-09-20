import React from 'react';
import type { Metadata } from 'next';
import { SelectionSortView } from '@/features/algorithms/selection-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Selection Sort (Seçmeli Sıralama)',
  description: 'Selection Sort algoritması, çalışma adımları, minimum bulma stratejisi ve interaktif görselleştirici.',
  path: '/algorithms/sorting/selection-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Kolay',
});

export default function SelectionSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Selection Sort (Seçmeli Sıralama)',
    description: 'Selection Sort algoritması, çalışma adımları, minimum bulma stratejisi ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/selection-sort',
    difficulty: 'Kolay',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <SelectionSortView />
    </div>
  );
}
