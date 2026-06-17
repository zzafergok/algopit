import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function RadixSortVariantsPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['radix-sort-variants']}
    />
  );
}
