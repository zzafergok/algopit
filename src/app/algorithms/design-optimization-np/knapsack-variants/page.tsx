import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function KnapsackVariantsPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['knapsack-variants']}
    />
  );
}
