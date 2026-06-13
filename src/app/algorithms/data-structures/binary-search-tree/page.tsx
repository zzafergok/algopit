import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import { getDuplicateAlgorithm } from '@/lib/duplicate-algorithms';

export default function BinarySearchTreePage() {
  const algorithm = getDuplicateAlgorithm(
    'data-structures',
    'binary-search-tree-operations'
  );

  if (!algorithm) {
    notFound();
  }

  return <DuplicateAlgorithmPage algorithm={algorithm} />;
}
