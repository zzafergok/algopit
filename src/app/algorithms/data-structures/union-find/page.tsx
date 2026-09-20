import type { Metadata } from 'next';
import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

const algorithm = remainingAlgorithmContents['union-find'];

export const metadata: Metadata = createAlgorithmMetadata({
  title: algorithm.title,
  description: algorithm.summary,
  path: '/algorithms/data-structures/union-find',
  category: algorithm.category,
  difficulty: algorithm.difficulty,
});

export default function UnionFindPage() {
  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.summary,
    category: algorithm.category,
    categoryHref: algorithm.categoryHref,
    path: '/algorithms/data-structures/union-find',
    difficulty: algorithm.difficulty,
    timeComplexity: algorithm.timeComplexity,
    spaceComplexity: algorithm.spaceComplexity,
  });

  return (
    <>
      <JsonLd data={schema} />
      <RemainingAlgorithmPage algorithm={algorithm} />
    </>
  );
}
