import React from 'react';
import type { Metadata } from 'next';
import { KruskalView } from '@/features/algorithms/kruskal';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Kruskal Algoritması (MST)',
  description: 'Kruskal algoritması, Union-Find veri yapısı, Minimum Spanning Tree (MST) inşası ve interaktif görselleştirici.',
  path: '/algorithms/graph-algorithms/kruskal',
  category: 'Graf Algoritmaları',
  difficulty: 'Orta',
});

export default function KruskalPage() {
  const schema = getAlgorithmSchema({
    name: 'Kruskal Algoritması (MST)',
    description: 'Kruskal algoritması, Union-Find veri yapısı, Minimum Spanning Tree (MST) inşası ve interaktif görselleştirici.',
    category: 'Graf Algoritmaları',
    categoryHref: '/algorithms/graph-algorithms',
    path: '/algorithms/graph-algorithms/kruskal',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <KruskalView />
    </div>
  );
}
