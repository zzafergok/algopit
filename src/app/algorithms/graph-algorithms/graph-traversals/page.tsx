import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function GraphTraversalsPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['graph-traversals']}
    />
  );
}
