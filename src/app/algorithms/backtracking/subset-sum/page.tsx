import React from 'react';
import type { Metadata } from 'next';
import { SubsetSumView } from '@/features/algorithms/backtracking/subset-sum';

export const metadata: Metadata = {
  title: 'Subset Sum (Alt Küme Toplamı) | AlgoPit',
  description:
    'Subset Sum problemi çözümü, geri izleme ve dinamik programlama yaklaşımları ile interaktif demo.',
};

export default function SubsetSumPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <SubsetSumView />
    </div>
  );
}
