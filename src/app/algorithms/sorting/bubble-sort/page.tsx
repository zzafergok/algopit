import React from 'react';
import type { Metadata } from 'next';
import { BubbleSortView } from '@/features/algorithms/bubble-sort';

export const metadata: Metadata = {
  title: 'Bubble Sort (Kabarcık Sıralaması) | AlgoPit',
  description:
    'Bubble Sort algoritması, komşu eleman karşılaştırmaları, erken çıkış optimizasyonu ve interaktif görselleştirici.',
};

export default function BubbleSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <BubbleSortView />
    </div>
  );
}
