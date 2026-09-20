import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { ContributingView } from '@/features/resources/contributing';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Katkıda Bulunma',
  description:
    "AlgoPit'e katkıda bulunmak için rehber. Açık kaynak topluluğuna destek olun ve yeni algoritma simülasyonları ekleyin.",
  path: '/resources/contributing',
  keywords: [
    'katkıda bulunma',
    'açık kaynak katkı',
    'algoritma ekleme',
    'github katkı',
  ],
});

export default function ContributingPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Kaynaklar', url: '/resources' },
    { name: 'Katkıda Bulunma', url: '/resources/contributing' },
  ]);

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <JsonLd data={breadcrumbs} />
      <PageHeaderCard
        title="Katkıda Bulunma"
        description="AlgoPit'e katkıda bulunmak için rehber. Bu projeye katkıda bulunarak, algoritma öğrenimine ve açık kaynak topluluğuna destek olabilirsiniz."
        className="mb-12"
      />
      <ContributingView />
    </div>
  );
}
