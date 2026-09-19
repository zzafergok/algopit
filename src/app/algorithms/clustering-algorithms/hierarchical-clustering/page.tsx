import React from 'react';
import type { Metadata } from 'next';
import { HierarchicalClusteringView } from '@/features/algorithms/hierarchical-clustering';

export const metadata: Metadata = {
  title: 'Hiyerarşik Kümeleme (Hierarchical Clustering) | AlgoPit',
  description:
    'Hiyerarşik kümeleme algoritması görselleştirmesi, dendrogram yapısı ve interaktif simülatör.',
};

export default function HierarchicalClusteringPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <HierarchicalClusteringView />
    </div>
  );
}
