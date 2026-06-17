import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function LinearProgrammingSimplexPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['linear-programming-simplex']}
    />
  );
}
