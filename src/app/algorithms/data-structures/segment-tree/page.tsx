import React from 'react';
import type { Metadata } from 'next';
import { SegmentTreeView } from '@/features/algorithms/segment-tree';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Segment Tree (Aralık Ağacı)',
  description: 'Segment Tree veri yapısı, aralık sorguları, nokta güncellemeleri ve interaktif görselleştirici.',
  path: '/algorithms/data-structures/segment-tree',
  category: 'Veri Yapıları',
  difficulty: 'Zor',
});

export default function SegmentTreePage() {
  const schema = getAlgorithmSchema({
    name: 'Segment Tree (Aralık Ağacı)',
    description: 'Segment Tree veri yapısı, aralık sorguları, nokta güncellemeleri ve interaktif görselleştirici.',
    category: 'Veri Yapıları',
    categoryHref: '/algorithms/data-structures',
    path: '/algorithms/data-structures/segment-tree',
    difficulty: 'Zor',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <SegmentTreeView />
    </div>
  );
}
