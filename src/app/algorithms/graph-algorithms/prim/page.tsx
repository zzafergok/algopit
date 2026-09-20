import React from 'react';
import type { Metadata } from 'next';
import { PrimView } from '@/features/algorithms/prim';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Prim Algoritması (MST)',
  description: 'Prim algoritması, öncelik kuyruğu yaklaşımı, MST inşası ve interaktif görselleştirici.',
  path: '/algorithms/graph-algorithms/prim',
  category: 'Graf Algoritmaları',
  difficulty: 'Orta',
});

export default function PrimPage() {
  const schema = getAlgorithmSchema({
    name: 'Prim Algoritması (MST)',
    description: 'Prim algoritması, öncelik kuyruğu yaklaşımı, MST inşası ve interaktif görselleştirici.',
    category: 'Graf Algoritmaları',
    categoryHref: '/algorithms/graph-algorithms',
    path: '/algorithms/graph-algorithms/prim',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <PrimView />
    </div>
  );
}
