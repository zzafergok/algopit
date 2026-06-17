import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function ContainmentQueryPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['containment-query']}
    />
  );
}
