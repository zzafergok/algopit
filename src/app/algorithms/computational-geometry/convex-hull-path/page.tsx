import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function ConvexHullPathPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['convex-hull-path']}
    />
  );
}
