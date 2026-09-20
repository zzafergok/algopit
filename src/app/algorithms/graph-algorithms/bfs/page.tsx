import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

const algorithm = getDuplicateAlgorithm('graph-algorithms', 'bfs');

export const metadata: Metadata = algorithm
  ? createAlgorithmMetadata({
      title: algorithm.title,
      description: algorithm.description,
      path: '/algorithms/graph-algorithms/bfs',
      category: algorithm.family || 'Graf Algoritmaları',
      difficulty: algorithm.difficulty,
    })
  : {};

export default function BfsPage() {
  if (!algorithm) {
    notFound();
  }

  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.description,
    category: algorithm.family || 'Graf Algoritmaları',
    categoryHref: '/algorithms/graph-algorithms',
    path: '/algorithms/graph-algorithms/bfs',
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
