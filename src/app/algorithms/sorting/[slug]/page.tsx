import { notFound } from 'next/navigation';

import { DuplicateAlgorithmPage } from '@/components/common/duplicate-algorithm-page';
import {
  getDuplicateAlgorithm,
  getDuplicateAlgorithmsByCategory,
} from '@/lib/duplicate-algorithms';

export function generateStaticParams() {
  return getDuplicateAlgorithmsByCategory('sorting').map((algorithm) => ({
    slug: algorithm.slug,
  }));
}

export default async function SortingDuplicatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const algorithm = getDuplicateAlgorithm('sorting', slug);

  if (!algorithm) {
    notFound();
  }

  return <DuplicateAlgorithmPage algorithm={algorithm} />;
}
