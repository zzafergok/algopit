import React from 'react';
import type { Metadata } from 'next';
import { MergeSortView } from '@/features/algorithms/merge-sort';

export const metadata: Metadata = {
  title: 'Merge Sort (Birleştirmeli Sıralama) | AlgoPit',
  description:
    'Merge Sort algoritması, böl ve fethet prensibi, garantili O(n log n) zaman karmaşıklığı analizi ve interaktif görselleştirici.',
};

export default function MergeSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <MergeSortView />
    </div>
  );
}
