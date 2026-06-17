import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function MemoryManagementGcPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['memory-management-gc']}
    />
  );
}
