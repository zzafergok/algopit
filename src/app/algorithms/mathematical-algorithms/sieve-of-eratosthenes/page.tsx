import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function SieveOfEratosthenesPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['sieve-of-eratosthenes']}
    />
  );
}
