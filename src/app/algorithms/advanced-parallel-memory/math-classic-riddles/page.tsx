import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function MathClassicRiddlesPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['math-classic-riddles']}
    />
  );
}
