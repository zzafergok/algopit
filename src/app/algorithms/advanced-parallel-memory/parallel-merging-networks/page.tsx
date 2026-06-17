import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function ParallelMergingNetworksPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['parallel-merging-networks']}
    />
  );
}
