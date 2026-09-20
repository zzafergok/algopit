import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

const algorithm = getDuplicateAlgorithm('mathematical-algorithms', 'gcd');

export const metadata: Metadata = algorithm
  ? createAlgorithmMetadata({
      title: algorithm.title,
      description: algorithm.description,
      path: '/algorithms/mathematical-algorithms/gcd',
      category: algorithm.family || 'Matematiksel Algoritmalar',
      difficulty: algorithm.difficulty,
    })
  : {};

export default function GcdPage() {
  if (!algorithm) {
    notFound();
  }

  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.description,
    category: algorithm.family || 'Matematiksel Algoritmalar',
    categoryHref: '/algorithms/mathematical-algorithms',
    path: '/algorithms/mathematical-algorithms/gcd',
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
