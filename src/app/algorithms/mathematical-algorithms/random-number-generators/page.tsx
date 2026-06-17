import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function RandomNumberGeneratorsPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['random-number-generators']}
    />
  );
}
