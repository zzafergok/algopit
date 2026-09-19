import { PageHeaderCard } from '@/components/layout/page-header-card';
import { CodeExamplesView } from '@/features/resources/code-examples/code-examples-view';

export const metadata = {
  title: 'Kod Örnekleri',
  description:
    'Farklı programlama dillerinde optimize edilmiş algoritma implementasyonları.',
};

export default function CodeExamplesPage() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 py-6">
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
