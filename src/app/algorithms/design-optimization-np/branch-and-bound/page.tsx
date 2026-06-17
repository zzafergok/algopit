import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function BranchAndBoundPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['branch-and-bound-np']}
    />
  );
}
