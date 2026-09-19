'use client';

import React from 'react';
import Link from 'next/link';

import { CodeBlock } from '@/components/common/code-block';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getComplexityName } from '@/lib/utils';
import { navigationConfig } from '@/config/navigation';
import { duplicateAlgorithmContents } from '@/lib/duplicate-algorithms';

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

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-ash">
          {codeIntro ??
            `${title} algoritmasının farklı programlama dillerindeki uygulamaları aşağıda verilmiştir. Her örnek, algoritmanın temel akışını açık şekilde gösterecek biçimde sunulmuştur.`}
        </p>

        <Tabs defaultValue={activeCodeTab}>
          <TabsList>
            {codeEntries.map(([language]) => (
              <TabsTrigger key={language} value={language}>
                {codeLanguageLabels[language]}
              </TabsTrigger>
            ))}
          </TabsList>
          {codeEntries.map(([language, code]) => (
            <TabsContent key={language} value={language}>
              <CodeBlock
                code={code}
                language={language}
                title={`${title} - ${codeLanguageLabels[language]}`}
              />
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-ash">
          {demoDescription ??
            'Aşağıya kendi verilerinizi girerek algoritmanın örnek çalışma akışını görebilirsiniz. Virgülle ayrılmış sayılar veya metin değerleri kullanabilirsiniz.'}
        </p>
        {demo}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Analizi</h2>

        <Card>
          <CardHeader>
            <CardTitle>Zaman ve Alan Karmaşıklığı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-semibold">Zaman Karmaşıklığı</h3>
                <p className="text-sm">
                  <strong>En İyi Durum:</strong>{' '}
                  <span className="font-mono">{timeComplexity.best}</span>
                </p>
                <p className="text-sm">
                  <strong>Ortalama Durum:</strong>{' '}
                  <span className="font-mono">{timeComplexity.average}</span>
                </p>
                <p className="text-sm">
                  <strong>En Kötü Durum:</strong>{' '}
                  <span className="font-mono">{timeComplexity.worst}</span>
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Alan Karmaşıklığı</h3>
                <p className="text-sm">
                  <span className="font-mono">{spaceComplexity}</span> -{' '}
                  {getComplexityName(spaceComplexity).description}
                </p>

                <h3 className="font-semibold">{analysisRightTitle}</h3>
                {analysisRightContent ?? (
                  <p className="text-sm text-ash">
                    Algoritmanın uygunluğu, veri boyutu, girdi yapısı ve
                    beklenen doğruluk/performans dengesine göre
                    değerlendirilmelidir.
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Avantajlar ve Dezavantajlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-semibold text-signal-green dark:text-signal-green/80">
                  Avantajlar
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  {advantages.map((advantage) => (
                    <li key={advantage}>{advantage}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-alert-red dark:text-alert-red/80">
                  Dezavantajlar
                </h3>
                <ul className="list-disc space-y-2 pl-5">
                  {disadvantages.map((disadvantage) => (
                    <li key={disadvantage}>{disadvantage}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-ash">
          {relatedIntro ??
            `${title} ile benzer veya alternatif olarak değerlendirilebilecek diğer başlıklar:`}
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {relatedAlgorithms.map((algorithm) => {
            const href = resolveAlgorithmHref(algorithm.title, algorithm.href);
            const content = (
              <div>
                <h3 className="text-base font-mono font-bold text-ink group-hover:text-turquoise transition-colors tracking-tight mb-1.5">
                  {algorithm.title}
                </h3>
                <p className="text-sm text-ash leading-relaxed">
                  {algorithm.description}
                </p>
              </div>
            );

            if (href) {
              return (
                <Link
                  key={algorithm.title}
                  href={href}
                  className="algorithm-card group flex flex-col justify-between p-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={algorithm.title}
                className="algorithm-card flex flex-col justify-between p-5"
              >
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
