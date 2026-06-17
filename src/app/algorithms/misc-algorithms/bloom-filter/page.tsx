import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function BloomFilterPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['bloom-filter']}
    />
  );
}
