import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function BellmanFordPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['bellman-ford']}
    />
  );
}
