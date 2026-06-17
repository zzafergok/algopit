import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function BucketSortPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['bucket-sort']}
    />
  );
}
