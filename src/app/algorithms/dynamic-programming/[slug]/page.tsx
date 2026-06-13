import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import {
  getDuplicateAlgorithm,
  getDuplicateAlgorithmsByCategory,
} from '@/lib/duplicate-algorithms';

export function generateStaticParams() {
  return getDuplicateAlgorithmsByCategory('dynamic-programming').map(
    (algorithm) => ({
      slug: algorithm.slug,
    })
  );
}

export default async function DynamicProgrammingDuplicatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const algorithm = getDuplicateAlgorithm('dynamic-programming', slug);

  if (!algorithm) {
    notFound();
  }

  return <DuplicateAlgorithmPage algorithm={algorithm} />;
}
