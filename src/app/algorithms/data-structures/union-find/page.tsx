import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function UnionFindPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['union-find']}
    />
  );
}
