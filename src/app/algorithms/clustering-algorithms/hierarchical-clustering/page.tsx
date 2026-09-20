import React from 'react';
import type { Metadata } from 'next';
import { HierarchicalClusteringView } from '@/features/algorithms/hierarchical-clustering';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Hiyerarşik Kümeleme (Hierarchical Clustering)',
  description: 'Hiyerarşik kümeleme algoritması görselleştirmesi, dendrogram yapısı ve interaktif simülatör.',
  path: '/algorithms/clustering-algorithms/hierarchical-clustering',
  category: 'Kümeleme Algoritmaları',
  difficulty: 'Orta',
});

export default function HierarchicalClusteringPage() {
  const schema = getAlgorithmSchema({
    name: 'Hiyerarşik Kümeleme (Hierarchical Clustering)',
    description: 'Hiyerarşik kümeleme algoritması görselleştirmesi, dendrogram yapısı ve interaktif simülatör.',
    category: 'Kümeleme Algoritmaları',
    categoryHref: '/algorithms/clustering-algorithms',
    path: '/algorithms/clustering-algorithms/hierarchical-clustering',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <HierarchicalClusteringView />
    </div>
  );
}
