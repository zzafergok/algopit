import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

const algorithm = getDuplicateAlgorithm('data-structures', 'binary-search-tree');

export const metadata: Metadata = algorithm
  ? createAlgorithmMetadata({
      title: algorithm.title,
      description: algorithm.description,
      path: '/algorithms/data-structures/binary-search-tree',
      category: algorithm.family || 'Veri Yapıları',
      difficulty: algorithm.difficulty,
    })
  : {};

export default function BinarySearchTreePage() {
  if (!algorithm) {
    notFound();
  }

  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.description,
    category: algorithm.family || 'Veri Yapıları',
    categoryHref: '/algorithms/data-structures',
    path: '/algorithms/data-structures/binary-search-tree',
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
