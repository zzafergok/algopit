import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import {
  getDuplicateAlgorithm,
  getDuplicateAlgorithmsByCategory,
} from '@/lib/duplicate-algorithms';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export function generateStaticParams() {
  return getDuplicateAlgorithmsByCategory('advanced-algorithms').map((algorithm) => ({
    slug: algorithm.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const algorithm = getDuplicateAlgorithm('advanced-algorithms', slug);

  if (!algorithm) {
    return {};
  }

  return createAlgorithmMetadata({
    title: algorithm.title,
    description: algorithm.description,
    path: `/algorithms/advanced-algorithms/${slug}`,
    category: algorithm.family || 'İleri Seviye Algoritmalar',
    difficulty: algorithm.difficulty,
  });
}

export default async function AdvancedAlgorithmsDuplicatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const algorithm = getDuplicateAlgorithm('advanced-algorithms', slug);

  if (!algorithm) {
    notFound();
  }

  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.description,
    category: algorithm.family || 'İleri Seviye Algoritmalar',
    categoryHref: '/algorithms/advanced-algorithms',
    path: `/algorithms/advanced-algorithms/${slug}`,
    difficulty: algorithm.difficulty,
    timeComplexity: algorithm.timeComplexity,
    spaceComplexity: algorithm.spaceComplexity,
  });

  return (
    <>
      <JsonLd data={schema} />
      <DuplicateAlgorithmPage algorithm={algorithm} />
    </>
  );
}
