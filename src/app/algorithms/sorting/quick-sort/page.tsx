import React from 'react';
import type { Metadata } from 'next';
import { QuickSortView } from '@/features/algorithms/quick-sort';

export const metadata: Metadata = {
  title: 'Quick Sort (Hızlı Sıralama) | AlgoPit',
  description:
    'Quick Sort algoritması, böl ve fethet yaklaşımı, zaman/alan karmaşıklığı analizi ve interaktif demosu.',
};

export default function QuickSortPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <QuickSortView />
    </div>
  );
}
