import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { ResourcesView } from '@/features/resources/resources-hub';
import { createPageMetadata, getBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Kaynaklar',
  description:
    'Algoritma öğrenme yolculuğunuzu destekleyecek kapsamlı kaynaklar, teknik belgeler, kod örnekleri ve katkı rehberleri.',
  path: '/resources',
  keywords: [
    'algoritma kaynakları',
    'teknik belgeler',
    'kod örnekleri',
    'katkı rehberi',
  ],
});

export default function ResourcesPage() {
  const resourcesSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AlgoPit Kaynaklar',
    description:
      'Algoritma öğrenme yolculuğunuzu destekleyecek kapsamlı kaynaklar, teknik belgeler ve rehberler.',
    url: `${SITE_URL}/resources`,
    inLanguage: 'tr-TR',
    breadcrumb: getBreadcrumbSchema([
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Kaynaklar', url: '/resources' },
    ]),
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <JsonLd data={resourcesSchema} />
      <PageHeaderCard
        title="Kaynaklar"
        description="Algoritma öğrenme yolculuğunuzu destekleyecek kapsamlı kaynaklar, belgeler ve rehberler"
        className="mb-12"
      />
      <ResourcesView />
    </div>
  );
}
