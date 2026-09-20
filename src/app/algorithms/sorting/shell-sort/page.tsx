import React from 'react';
import type { Metadata } from 'next';
import { ShellSortView } from '@/features/algorithms/shell-sort';

export const metadata: Metadata = {
  title: 'Shell Sort Algoritması | AlgoPit',
  description:
    'Shell Sort algoritması, aralık (gap) temelli sıralama mantığı ve interaktif görselleştirici.',
};

export default function ShellSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <ShellSortView />
    </div>
  );
}
