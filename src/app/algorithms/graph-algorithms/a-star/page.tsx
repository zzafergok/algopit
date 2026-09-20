import React from 'react';
import type { Metadata } from 'next';
import { AStarView } from '@/features/algorithms/a-star';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'A* (A-Star) Arama Algoritması',
  description: 'A* algoritması, sezgisel yol bulma, grid analizi ve interaktif görselleştirici.',
  path: '/algorithms/graph-algorithms/a-star',
  category: 'Graf Algoritmaları',
  difficulty: 'Orta',
});

export default function AStarPage() {
  const schema = getAlgorithmSchema({
    name: 'A* (A-Star) Arama Algoritması',
    description: 'A* algoritması, sezgisel yol bulma, grid analizi ve interaktif görselleştirici.',
    category: 'Graf Algoritmaları',
    categoryHref: '/algorithms/graph-algorithms',
    path: '/algorithms/graph-algorithms/a-star',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <AStarView />
    </div>
  );
}
