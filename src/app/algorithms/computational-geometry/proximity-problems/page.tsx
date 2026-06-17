import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function ProximityProblemsPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['proximity-problems']}
    />
  );
}
