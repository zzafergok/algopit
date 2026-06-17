import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function SearchTreesPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['search-trees']}
    />
  );
}
