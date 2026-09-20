import React from 'react';
import type { Metadata } from 'next';
import { KMeansView } from '@/features/algorithms/k-means';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'K-Means Kümeleme',
  description: 'K-Means algoritması görselleştirmesi, kümeleme adımları ve interaktif simülatör.',
  path: '/algorithms/clustering-algorithms/k-means',
  category: 'Kümeleme Algoritmaları',
  difficulty: 'Orta',
});

export default function KMeansPage() {
  const schema = getAlgorithmSchema({
    name: 'K-Means Kümeleme',
    description: 'K-Means algoritması görselleştirmesi, kümeleme adımları ve interaktif simülatör.',
    category: 'Kümeleme Algoritmaları',
    categoryHref: '/algorithms/clustering-algorithms',
    path: '/algorithms/clustering-algorithms/k-means',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <KMeansView />
    </div>
  );
}
