import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function ShortestPathsMstPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['shortest-paths-mst']}
    />
  );
}
