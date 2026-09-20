import React from 'react';
import type { Metadata } from 'next';

import { PageHeaderCard } from '@/components/layout/page-header-card';
import { navigationConfig } from '@/config/navigation';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import {
  AlgorithmsHubView,
  categoryDescriptions,
  AlgorithmCategory,
} from '@/features/algorithms/algorithms-hub';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Algoritma Kütüphanesi',
  description:
    'Tüm algoritma kategorilerini keşfedin; interaktif görselleştirmeler, adım adım simülasyonlar ve detaylı açıklamalarla algoritmaları öğrenin.',
  path: '/algorithms',
  keywords: [
    'algoritma kütüphanesi',
    'veri yapıları',
    'algoritma kategorileri',
    'bilgisayar bilimi rehberi',
  ],
});

export default function AlgorithmsPage() {
  const algorithmRoot = navigationConfig.mainNavItems.find(
    (item) => item.href === '/algorithms',
  );

  const algorithmCategories: AlgorithmCategory[] = (
    algorithmRoot?.children ?? []
  ).map((category) => {
    const categorySlug = category.href.replace('/algorithms/', '');
    const algorithms = createCategoryAlgorithms(category.href).map((algo) => ({
      name: algo.name,
      slug: algo.path.split('/').pop() || '',
      description: algo.description || '',
      difficulty: algo.difficulty as 'Kolay' | 'Orta' | 'Zor' | undefined,
    }));

    return {
      title: category.label,
      slug: categorySlug,
      description:
        categoryDescriptions[categorySlug] ||
        `${category.label} kategorisi altındaki algoritmalar.`,
      algorithms,
    };
  });

  const hubSchema = getCategorySchema({
    name: 'Algoritma Kütüphanesi',
    description:
      'Tüm algoritma kategorilerini keşfedin; interaktif görselleştirmeler ve detaylı açıklamalarla algoritmaların nasıl çalıştığını öğrenin.',
    path: '/algorithms',
  });

  return (
    <div className="space-y-12">
      <JsonLd data={hubSchema} />
      <PageHeaderCard
        title="Algoritma Kütüphanesi"
        description="Tüm algoritma kategorilerini keşfedin, interaktif görselleştirmeler ve detaylı açıklamalarla algoritmaların nasıl çalıştığını öğrenin."
      />
      <AlgorithmsHubView categories={algorithmCategories} />
    </div>
  );
}
