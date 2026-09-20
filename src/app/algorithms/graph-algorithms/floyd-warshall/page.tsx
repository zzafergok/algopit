import React from 'react';
import type { Metadata } from 'next';
import { FloydWarshallView } from '@/features/algorithms/floyd-warshall';

export const metadata: Metadata = {
  title: 'Floyd-Warshall Algoritması | AlgoPit',
  description:
    'Floyd-Warshall algoritması, tüm çiftler en kısa yol (APSP), matris tabanlı dinamik programlama ve interaktif görselleştirici.',
};

export default function FloydWarshallPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <FloydWarshallView />
    </div>
  );
}
