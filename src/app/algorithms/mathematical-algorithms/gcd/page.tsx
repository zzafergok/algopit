import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';

export default function GcdPage() {
  const algorithm = getDuplicateAlgorithm('mathematical-algorithms', 'gcd');

  if (!algorithm) {
    notFound();
  }

  return <DuplicateAlgorithmPage algorithm={algorithm} />;
}
