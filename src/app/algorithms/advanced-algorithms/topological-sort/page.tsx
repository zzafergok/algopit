import React from 'react';
import type { Metadata } from 'next';
import { TopologicalSortView } from '@/features/algorithms/topological-sort';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Topolojik Sıralama (Topological Sort)',
  description: 'Yönlü asiklik graflarda (DAG) topolojik sıralama algoritması, bağımlılık çözümü ve çevrim tespiti görselleştirmesi.',
  path: '/algorithms/advanced-algorithms/topological-sort',
  category: 'İleri Seviye Algoritmalar',
  difficulty: 'Orta',
});

export default function TopologicalSortPage() {
  const schema = getAlgorithmSchema({
    name: 'Topolojik Sıralama (Topological Sort)',
    description: 'Yönlü asiklik graflarda (DAG) topolojik sıralama algoritması, bağımlılık çözümü ve çevrim tespiti görselleştirmesi.',
    category: 'İleri Seviye Algoritmalar',
    categoryHref: '/algorithms/advanced-algorithms',
    path: '/algorithms/advanced-algorithms/topological-sort',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <TopologicalSortView />
    </div>
  );
}
