import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function MatrixOperationsPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['matrix-operations']}
    />
  );
}
