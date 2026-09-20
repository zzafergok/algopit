import React from 'react';
import type { Metadata } from 'next';
import { SelectionSortView } from '@/features/algorithms/selection-sort';

export const metadata: Metadata = {
  title: 'Selection Sort (Seçmeli Sıralama) | AlgoPit',
  description:
    'Selection Sort algoritması, çalışma adımları, minimum bulma stratejisi ve interaktif görselleştirici.',
};

export default function SelectionSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <SelectionSortView />
    </div>
  );
}
