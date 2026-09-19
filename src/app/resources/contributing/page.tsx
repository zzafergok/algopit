import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { ContributingView } from '@/features/resources/contributing';

export const metadata: Metadata = {
  title: 'Katkıda Bulunma | AlgoPit',
  description:
    "AlgoPit'e katkıda bulunmak için rehber. Açık kaynak topluluğuna destek olun.",
};

export default function ContributingPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <PageHeaderCard
        title="Katkıda Bulunma"
        description="AlgoPit'e katkıda bulunmak için rehber. Bu projeye katkıda bulunarak, algoritma öğrenimine ve açık kaynak topluluğuna destek olabilirsiniz."
        className="mb-12"
      />
      <ContributingView />
    </div>
  );
}
