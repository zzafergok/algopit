import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

const algorithm = getDuplicateAlgorithm('greedy-algorithms', 'huffman-coding');

export const metadata: Metadata = algorithm
  ? createAlgorithmMetadata({
      title: algorithm.title,
      description: algorithm.description,
      path: '/algorithms/greedy-algorithms/huffman-coding',
      category: algorithm.family || 'Açgözlü Algoritmalar',
      difficulty: algorithm.difficulty,
    })
  : {};

export default function HuffmanCodingPage() {
  if (!algorithm) {
    notFound();
  }

  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.description,
    category: algorithm.family || 'Açgözlü Algoritmalar',
    categoryHref: '/algorithms/greedy-algorithms',
    path: '/algorithms/greedy-algorithms/huffman-coding',
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
