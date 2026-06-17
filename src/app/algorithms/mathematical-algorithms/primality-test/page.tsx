import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function PrimalityTestPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['primality-test']}
    />
  );
}
