import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { CodeExamplesView } from '@/features/resources/code-examples/code-examples-view';
import { createPageMetadata, getBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Kod Örnekleri',
  description:
    'Farklı programlama dillerinde (TypeScript, Python, Java, C++, Go) optimize edilmiş algoritma implementasyonları ve açıklamalar.',
  path: '/resources/code-examples',
  keywords: [
    'algoritma kod örnekleri',
    'typescript algoritmalar',
    'python algoritmalar',
    'c++ algoritmalar',
  ],
});

export default function CodeExamplesPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Kaynaklar', url: '/resources' },
    { name: 'Kod Örnekleri', url: '/resources/code-examples' },
  ]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6">
      <JsonLd data={breadcrumbs} />
      <PageHeaderCard
        eyebrow="03 / RESOURCES"
        badge="CODE EXAMPLES"
        title="Kod Örnekleri"
        description="Farklı programlama dillerinde algoritma implementasyonları ve detaylı açıklamalar."
      />
      <CodeExamplesView />
    </div>
  );
}
