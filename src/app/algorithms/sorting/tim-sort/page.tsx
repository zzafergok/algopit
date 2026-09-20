import React from 'react';
import type { Metadata } from 'next';
import { TimSortView } from '@/features/algorithms/tim-sort';

export const metadata: Metadata = {
  title: 'Tim Sort Algoritması | AlgoPit',
  description:
    'Tim Sort algoritması, hibrit sıralama mantığı, Python/Java implementasyonları ve interaktif görselleştirici.',
};

export default function TimSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <TimSortView />
    </div>
  );
}
