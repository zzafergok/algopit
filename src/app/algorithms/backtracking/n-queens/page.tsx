import React from 'react';
import type { Metadata } from 'next';
import { NQueensView } from '@/features/algorithms/n-queens';

export const metadata: Metadata = {
  title: 'N-Queens Problemi (Geri İzleme) | AlgoPit',
  description:
    'N-Queens problemi, backtracking (geri izleme) algoritması analizi ve interaktif satranç tahtası çözücüsü.',
};

export default function NQueensPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <NQueensView />
    </div>
  );
}
