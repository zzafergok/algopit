import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';

export default function DijkstraPage() {
  const algorithm = getDuplicateAlgorithm('graph-algorithms', 'dijkstra');

  if (!algorithm) {
    notFound();
  }

  return <DuplicateAlgorithmPage algorithm={algorithm} />;
}
