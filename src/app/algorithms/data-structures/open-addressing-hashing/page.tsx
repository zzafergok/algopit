import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function OpenAddressingHashingPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['open-addressing-hashing']}
    />
  );
}
