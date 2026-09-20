import React from 'react';
import type { Metadata } from 'next';
import {
  StatsSection,
  HowItWorksSection,
  FeaturesSection,
  LearningPathSection,
  ContributingFutureSection,
} from '@/features/about';
import {
  createPageMetadata,
  getBreadcrumbSchema,
  SITE_URL,
  SITE_NAME,
} from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Hakkında',
  description:
    'AlgoPit algoritma görselleştirme ve öğrenme platformunun misyonu, mimarisi ve açık kaynak ekosistemi hakkında bilgiler.',
  path: '/about',
  keywords: ['hakkında', 'algopit nedir', 'algoritma platformu', 'açık kaynak'],
});

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'AlgoPit Hakkında',
    description:
      'AlgoPit algoritma görselleştirme ve öğrenme platformunun misyonu, mimarisi ve açık kaynak ekosistemi.',
    url: `${SITE_URL}/about`,
    inLanguage: 'tr-TR',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    breadcrumb: getBreadcrumbSchema([
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Hakkında', url: '/about' },
    ]),
  };

  return (
    <div className="mx-auto max-w-6xl space-y-12 py-4 sm:space-y-14 sm:py-6 lg:space-y-16 lg:py-8">
      <JsonLd data={aboutSchema} />
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <LearningPathSection />
      <ContributingFutureSection />
    </div>
  );
}
