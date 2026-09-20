import React from 'react';
import type { Metadata } from 'next';
import { InsertionSortView } from '@/features/algorithms/insertion-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Insertion Sort (Eklemeli Sıralama)',
  description: 'Insertion Sort algoritması, çalışma prensibi, küçük veri setlerindeki verimliliği ve interaktif görselleştirici.',
  path: '/algorithms/sorting/insertion-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Kolay',
});

export default function InsertionSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Insertion Sort (Eklemeli Sıralama)',
    description: 'Insertion Sort algoritması, çalışma prensibi, küçük veri setlerindeki verimliliği ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/insertion-sort',
    difficulty: 'Kolay',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <InsertionSortView />
    </div>
  );
}
