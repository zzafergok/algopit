import React from 'react';
import type { Metadata } from 'next';
import { NQueensView } from '@/features/algorithms/n-queens';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'N-Queens Problemi (Geri İzleme)',
  description: 'N-Queens problemi, backtracking (geri izleme) algoritması analizi ve interaktif satranç tahtası çözücüsü.',
  path: '/algorithms/backtracking/n-queens',
  category: 'Geri İzleme',
  difficulty: 'Zor',
});

export default function NQueensPage() {
  const schema = getAlgorithmSchema({
    name: 'N-Queens Problemi (Geri İzleme)',
    description: 'N-Queens problemi, backtracking (geri izleme) algoritması analizi ve interaktif satranç tahtası çözücüsü.',
    category: 'Geri İzleme',
    categoryHref: '/algorithms/backtracking',
    path: '/algorithms/backtracking/n-queens',
    difficulty: 'Zor',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <NQueensView />
    </div>
  );
}
