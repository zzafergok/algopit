import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function SimpleSortsPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['simple-sorts']}
    />
  );
}
