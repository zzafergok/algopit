import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';

export default function KnapsackPage() {
  const algorithm = getDuplicateAlgorithm('dynamic-programming', 'knapsack');

  if (!algorithm) {
    notFound();
  }

  return <DuplicateAlgorithmPage algorithm={algorithm} />;
}
