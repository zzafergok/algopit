import React from 'react';
import type { Metadata } from 'next';
import { RadixSortView } from '@/features/algorithms/radix-sort';

export const metadata: Metadata = {
  title: 'Radix Sort (Taban Sıralaması) | AlgoPit',
  description:
    'Radix Sort algoritması, basamak tabanlı sıralama, O(d*(n+k)) karmaşıklığı ve interaktif görselleştirici.',
};

export default function RadixSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <RadixSortView />
    </div>
  );
}
