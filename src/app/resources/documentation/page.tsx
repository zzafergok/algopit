import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { DocumentationView } from '@/features/resources/documentation';

export const metadata: Metadata = {
  title: 'Belgelendirme | AlgoPit',
  description:
    "AlgoPit'in tüm özelliklerini ve kullanımını anlatan kapsamlı teknik belgelendirme",
};

export default function DocumentationPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <PageHeaderCard
        title="Belgelendirme"
        description="AlgoPit'in tüm özelliklerini ve kullanımını anlatan kapsamlı teknik belgelendirme"
        className="mb-8"
      />
      <DocumentationView />
    </div>
  );
}
