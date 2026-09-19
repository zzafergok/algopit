import React from 'react';
import type { Metadata } from 'next';
import { SegmentTreeView } from '@/features/algorithms/segment-tree';

export const metadata: Metadata = {
  title: 'Segment Tree (Aralık Ağacı) | AlgoPit',
  description:
    'Segment Tree veri yapısı, aralık sorguları, nokta güncellemeleri ve interaktif görselleştirici.',
};

export default function SegmentTreeDataStructurePage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <SegmentTreeView />
    </div>
  );
}
