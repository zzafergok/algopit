import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { ResourcesView } from '@/features/resources/resources-hub';

export const metadata: Metadata = {
  title: 'Kaynaklar | AlgoPit',
  description:
    'Algoritma öğrenme yolculuğunuzu destekleyecek kapsamlı kaynaklar, belgeler ve rehberler',
};

export default function ResourcesPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <PageHeaderCard
        title="Kaynaklar"
        description="Algoritma öğrenme yolculuğunuzu destekleyecek kapsamlı kaynaklar, belgeler ve rehberler"
        className="mb-12"
      />
      <ResourcesView />
    </div>
  );
}
