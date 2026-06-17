import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function FastFourierTransformPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['fast-fourier-transform']}
    />
  );
}
