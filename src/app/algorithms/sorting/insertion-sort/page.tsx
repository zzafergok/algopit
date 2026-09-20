import React from 'react';
import type { Metadata } from 'next';
import { InsertionSortView } from '@/features/algorithms/insertion-sort';

export const metadata: Metadata = {
  title: 'Insertion Sort (Eklemeli Sıralama) | AlgoPit',
  description:
    'Insertion Sort algoritması, çalışma prensibi, küçük veri setlerindeki verimliliği ve interaktif görselleştirici.',
};

export default function InsertionSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <InsertionSortView />
    </div>
  );
}
