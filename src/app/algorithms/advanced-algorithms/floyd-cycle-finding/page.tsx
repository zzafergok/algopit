import React from 'react';
import type { Metadata } from 'next';
import { FloydCycleFindingView } from '@/features/algorithms/floyd-cycle-finding';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: "Floyd's Cycle-Finding (Tortoise & Hare)",
  description:
    "Floyd'un döngü bulma algoritması, bağlı listeler ve dizilerde döngü tespiti, başlangıç ve uzunluk hesaplaması.",
  path: '/algorithms/advanced-algorithms/floyd-cycle-finding',
  category: 'İleri Seviye Algoritmalar',
  difficulty: 'Orta',
});

export default function FloydCycleFindingPage() {
  const schema = getAlgorithmSchema({
    name: "Floyd's Cycle-Finding (Tortoise & Hare)",
    description:
      "Floyd'un döngü bulma algoritması, bağlı listeler ve dizilerde döngü tespiti, başlangıç ve uzunluk hesaplaması.",
    category: 'İleri Seviye Algoritmalar',
    categoryHref: '/algorithms/advanced-algorithms',
    path: '/algorithms/advanced-algorithms/floyd-cycle-finding',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <FloydCycleFindingView />
    </div>
  );
}
