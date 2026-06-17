import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function LinkedListPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['linked-list']}
    />
  );
}
