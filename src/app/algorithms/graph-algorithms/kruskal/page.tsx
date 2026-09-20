import React from 'react';
import type { Metadata } from 'next';
import { KruskalView } from '@/features/algorithms/kruskal';

export const metadata: Metadata = {
  title: "Kruskal's Algorithm (Minimum Yayılma Ağacı) | AlgoPit",
  description:
    'Kruskal algoritması, Union-Find veri yapısı, Minimum Spanning Tree (MST) inşası ve interaktif görselleştirici.',
};

export default function KruskalPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <KruskalView />
    </div>
  );
}
