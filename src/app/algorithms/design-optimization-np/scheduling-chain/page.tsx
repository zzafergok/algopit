import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function SchedulingChainPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['scheduling-chain']}
    />
  );
}
