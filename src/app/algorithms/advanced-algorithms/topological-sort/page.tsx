import React from 'react';
import type { Metadata } from 'next';
import { TopologicalSortView } from '@/features/algorithms/topological-sort';

export const metadata: Metadata = {
  title: 'Topolojik Sıralama (Topological Sort) | AlgoPit',
  description:
    'Yönlü asiklik graflarda (DAG) topolojik sıralama algoritması, bağımlılık çözümü ve çevrim tespiti görselleştirmesi.',
};

export default function TopologicalSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <TopologicalSortView />
    </div>
  );
}
