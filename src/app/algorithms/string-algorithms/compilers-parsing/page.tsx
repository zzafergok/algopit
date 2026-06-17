import { RemainingAlgorithmPage } from '@/components/common/remaining-algorithm-page';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';

export default function CompilersParsingPage() {
  return (
    <RemainingAlgorithmPage
      algorithm={remainingAlgorithmContents['compilers-parsing']}
    />
  );
}
