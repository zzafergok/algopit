import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';

export default function BfsPage() {
  const algorithm = getDuplicateAlgorithm('graph-algorithms', 'bfs');

  if (!algorithm) {
    notFound();
  }

  return <DuplicateAlgorithmPage algorithm={algorithm} />;
}
