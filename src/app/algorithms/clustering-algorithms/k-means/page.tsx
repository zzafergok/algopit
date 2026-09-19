import React from 'react';
import type { Metadata } from 'next';
import { KMeansView } from '@/features/algorithms/k-means';

export const metadata: Metadata = {
  title: 'K-Means Kümeleme | AlgoPit',
  description:
    'K-Means algoritması görselleştirmesi, kümeleme adımları ve interaktif simülatör.',
};

export default function KMeansPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <KMeansView />
    </div>
  );
}
