import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function ReservoirSamplingPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['reservoir-sampling']}
    />
  );
}
