import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function FractionalKnapsackPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['fractional-knapsack']}
    />
  );
}
