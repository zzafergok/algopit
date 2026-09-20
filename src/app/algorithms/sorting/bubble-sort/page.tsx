import React from 'react';
import type { Metadata } from 'next';
import { BubbleSortView } from '@/features/algorithms/bubble-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Bubble Sort (Kabarcık Sıralaması)',
  description: 'Bubble Sort algoritması, komşu eleman karşılaştırmaları, erken çıkış optimizasyonu ve interaktif görselleştirici.',
  path: '/algorithms/sorting/bubble-sort',
  category: 'Sıralama Algoritmaları',
  difficulty: 'Kolay',
});

export default function BubbleSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Bubble Sort (Kabarcık Sıralaması)',
    description: 'Bubble Sort algoritması, komşu eleman karşılaştırmaları, erken çıkış optimizasyonu ve interaktif görselleştirici.',
    category: 'Sıralama Algoritmaları',
    categoryHref: '/algorithms/sorting',
    path: '/algorithms/sorting/bubble-sort',
    difficulty: 'Kolay',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <BubbleSortView />
    </div>
  );
}
