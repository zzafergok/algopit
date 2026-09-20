import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { DocumentationView } from '@/features/resources/documentation';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Teknik Dokümantasyon',
  description:
    "AlgoPit'in tüm özelliklerini, algoritma simülatör mimarisini ve kullanımını anlatan kapsamlı teknik dokümantasyon.",
  path: '/resources/documentation',
  keywords: [
    'dokümantasyon',
    'algopit rehberi',
    'teknik mimari',
    'simülatör api',
  ],
});

export default function DocumentationPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Kaynaklar', url: '/resources' },
    { name: 'Dokümantasyon', url: '/resources/documentation' },
  ]);

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <JsonLd data={breadcrumbs} />
      <PageHeaderCard
        title="Belgelendirme"
        description="AlgoPit'in tüm özelliklerini ve kullanımını anlatan kapsamlı teknik belgelendirme"
        className="mb-8"
      />
      <DocumentationView />
    </div>
  );
}
