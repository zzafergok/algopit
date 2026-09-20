import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

const algorithm = getDuplicateAlgorithm('searching', 'binary-search');

export const metadata: Metadata = algorithm
  ? createAlgorithmMetadata({
      title: algorithm.title,
      description: algorithm.description,
      path: '/algorithms/searching/binary-search',
      category: algorithm.family || 'Arama Algoritmaları',
      difficulty: algorithm.difficulty,
    })
  : {};

export default function BinarySearchPage() {
  if (!algorithm) {
    notFound();
  }

  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.description,
    category: algorithm.family || 'Arama Algoritmaları',
    categoryHref: '/algorithms/searching',
    path: '/algorithms/searching/binary-search',
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
