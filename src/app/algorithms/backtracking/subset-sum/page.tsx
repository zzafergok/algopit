import React from 'react';
import type { Metadata } from 'next';
import { SubsetSumView } from '@/features/algorithms/backtracking/subset-sum';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Subset Sum (Alt Küme Toplamı)',
  description:
    'Subset Sum problemi çözümü, geri izleme ve dinamik programlama yaklaşımları ile interaktif demo.',
  path: '/algorithms/backtracking/subset-sum',
  category: 'Geri İzleme',
  difficulty: 'Orta',
});

export default function SubsetSumPage() {
  const schema = getAlgorithmSchema({
    name: 'Subset Sum (Alt Küme Toplamı)',
    description:
      'Subset Sum problemi çözümü, geri izleme ve dinamik programlama yaklaşımları ile interaktif demo.',
    category: 'Geri İzleme',
    categoryHref: '/algorithms/backtracking',
    path: '/algorithms/backtracking/subset-sum',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <SubsetSumView />
    </div>
  );
}
