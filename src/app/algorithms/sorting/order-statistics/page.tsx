import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function OrderStatisticsPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['order-statistics']}
    />
  );
}
