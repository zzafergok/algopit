import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function MatchingMarriagePage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['matching-marriage']}
    />
  );
}
