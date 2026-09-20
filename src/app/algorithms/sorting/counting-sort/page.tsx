import React from 'react';
import type { Metadata } from 'next';
import { CountingSortView } from '@/features/algorithms/counting-sort';

export const metadata: Metadata = {
  title: 'Counting Sort (Sayarak Sıralama) | AlgoPit',
  description:
    'Counting Sort algoritması, frekans sayımı, lineer O(n+k) zaman karmaşıklığı ve interaktif görselleştirici.',
};

export default function CountingSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <CountingSortView />
    </div>
  );
}
