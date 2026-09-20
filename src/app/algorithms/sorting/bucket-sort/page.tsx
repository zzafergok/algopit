import type { Metadata } from 'next';
import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

const algorithm = remainingAlgorithmContents['bucket-sort'];

export const metadata: Metadata = createAlgorithmMetadata({
  title: algorithm.title,
  description: algorithm.summary,
  path: '/algorithms/sorting/bucket-sort',
  category: algorithm.category,
  difficulty: algorithm.difficulty,
});

export default function BucketSortPage() {
  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.summary,
    category: algorithm.category,
    categoryHref: algorithm.categoryHref,
    path: '/algorithms/sorting/bucket-sort',
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
