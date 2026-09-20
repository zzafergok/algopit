import { AlgorithmsBreadcrumb } from '@/components/layout/algorithms-breadcrumb';

export const dynamicParams = false;

export default function AlgorithmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-10">
      <AlgorithmsBreadcrumb />
      {children}
    </div>
  );
}
