import React from 'react';
import type { Metadata } from 'next';
import { HeapSortView } from '@/features/algorithms/heap-sort';

export const metadata: Metadata = {
  title: 'Heap Sort (Yığın Sıralaması) | AlgoPit',
  description:
    'Heap Sort algoritması, ikili yığın yapısı, O(n log n) garantili zaman karmaşıklığı ve interaktif görselleştirici.',
};

export default function HeapSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <HeapSortView />
    </div>
  );
}
