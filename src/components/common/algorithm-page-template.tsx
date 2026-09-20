'use client';

import React from 'react';
import { Link } from '@/components/core/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { navigationConfig } from '@/config/navigation';
import { duplicateAlgorithmContents } from '@/lib/duplicate-algorithms';
import {
  AlgorithmCodeSection,
  AlgorithmAnalysisSection,
  AlgorithmRelatedSection,
} from './algorithm-page-sections';

function resolveAlgorithmHref(
  title: string,
  existingHref?: string,
): string | undefined {
  if (existingHref) return existingHref;

  const cleanTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
  if (!cleanTitle) return undefined;

  for (const item of duplicateAlgorithmContents) {
    const cleanItemTitle = item.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    if (
      cleanItemTitle === cleanTitle ||
      cleanItemTitle.includes(cleanTitle) ||
      cleanTitle.includes(cleanItemTitle)
    ) {
      return `/algorithms/${item.category}/${item.slug}`;
    }
  }

  for (const mainItem of navigationConfig.mainNavItems) {
    if (mainItem.children) {
      for (const cat of mainItem.children) {
        if (cat.children) {
          for (const item of cat.children) {
            const cleanLabel = item.label
              .trim()
              .toLowerCase()
              .replace(/[^a-z0-9]/g, '');
            if (
              cleanLabel === cleanTitle ||
              cleanLabel.includes(cleanTitle) ||
              cleanTitle.includes(cleanLabel)
            ) {
              return item.href;
            }
          }
        }
      }
    }
  }
  return undefined;
}

export type CodeLanguage = 'javascript' | 'typescript' | 'python' | 'java';

export type AlgorithmRelatedItem = {
  title: string;
  description: string;
  href?: string;
};

export type AlgorithmPageTemplateProps = {
  title: string;
  descriptionTitle?: string;
  description: React.ReactNode;
  descriptionExtra?: React.ReactNode;
  codeExamples: Partial<Record<CodeLanguage, string>>;
  defaultCodeTab?: CodeLanguage;
  codeIntro?: React.ReactNode;
  demoDescription?: React.ReactNode;
  demo: React.ReactNode;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  analysisRightTitle?: string;
  analysisRightContent?: React.ReactNode;
  advantages: string[];
  disadvantages: string[];
  relatedIntro?: React.ReactNode;
  relatedAlgorithms: AlgorithmRelatedItem[];
  className?: string;
};

const codeLanguageLabels: Record<CodeLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
};

export function AlgorithmPageTemplate({
  title,
  descriptionTitle,
  description,
  descriptionExtra,
  codeExamples,
  defaultCodeTab,
  codeIntro,
  demoDescription,
  demo,
  timeComplexity,
  spaceComplexity,
  analysisRightTitle = 'Kararlılık ve Kullanım',
  analysisRightContent,
  advantages,
  disadvantages,
  relatedIntro,
  relatedAlgorithms,
  className = 'container mx-auto py-12 space-y-12',
}: AlgorithmPageTemplateProps) {
  const codeEntries = (
    Object.entries(codeExamples) as Array<[CodeLanguage, string]>
  ).filter(([, code]) => Boolean(code));
  const activeCodeTab = defaultCodeTab ?? codeEntries[0]?.[0] ?? 'javascript';

  return (
    <div className={className}>
      <h1 className="text-4xl font-bold tracking-tight text-center text-arcly-blue">
        {title}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>{descriptionTitle ?? `${title} Açıklaması`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {typeof description === 'string' ? (
              <p className="whitespace-pre-wrap">{description}</p>
            ) : (
              description
            )}
          </div>
          {descriptionExtra}
        </CardContent>
      </Card>

      <AlgorithmCodeSection
        title={title}
        codeIntro={codeIntro}
        codeExamples={codeExamples}
        defaultCodeTab={defaultCodeTab}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-ash">
          {demoDescription ??
            'Aşağıya kendi verilerinizi girerek algoritmanın örnek çalışma akışını görebilirsiniz. Virgülle ayrılmış sayılar veya metin değerleri kullanabilirsiniz.'}
        </p>
        {demo}
      </section>

      <AlgorithmAnalysisSection
        timeComplexity={timeComplexity}
        spaceComplexity={spaceComplexity}
        analysisRightTitle={analysisRightTitle}
        analysisRightContent={analysisRightContent}
        advantages={advantages}
        disadvantages={disadvantages}
      />

      <AlgorithmRelatedSection
        title={title}
        relatedIntro={relatedIntro}
        relatedAlgorithms={relatedAlgorithms}
        resolveAlgorithmHref={resolveAlgorithmHref}
      />
    </div>
  );
}
