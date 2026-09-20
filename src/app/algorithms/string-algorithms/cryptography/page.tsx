import type { Metadata } from 'next';
import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

const algorithm = remainingAlgorithmContents['cryptography'];

export const metadata: Metadata = createAlgorithmMetadata({
  title: algorithm.title,
  description: algorithm.summary,
  path: '/algorithms/string-algorithms/cryptography',
  category: algorithm.category,
  difficulty: algorithm.difficulty,
});

export default function CryptographyPage() {
  const schema = getAlgorithmSchema({
    name: algorithm.title,
    description: algorithm.summary,
    category: algorithm.category,
    categoryHref: algorithm.categoryHref,
    path: '/algorithms/string-algorithms/cryptography',
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
