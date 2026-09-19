import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { FAQView } from '@/features/resources/faq';

export const metadata: Metadata = {
  title: 'Sık Sorulan Sorular | AlgoPit',
  description: 'AlgoPit hakkında en çok sorulan sorular ve yanıtları',
};

export default function FAQPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <PageHeaderCard
        title="Sık Sorulan Sorular"
        description="AlgoPit hakkında en çok sorulan sorular ve yanıtları"
        className="mb-8"
      />
      <FAQView />
    </div>
  );
}
