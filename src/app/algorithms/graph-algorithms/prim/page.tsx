import React from 'react';
import type { Metadata } from 'next';
import { PrimView } from '@/features/algorithms/prim';

export const metadata: Metadata = {
  title: "Prim's Algorithm (Minimum Yayılma Ağacı) | AlgoPit",
  description:
    'Prim algoritması, öncelik kuyruğu yaklaşımı, MST inşası ve interaktif görselleştirici.',
};

export default function PrimPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <PrimView />
    </div>
  );
}
