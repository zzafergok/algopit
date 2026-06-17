import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function InterpolationFittingPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['interpolation-fitting']}
    />
  );
}
