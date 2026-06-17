'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { AlgorithmPageTemplate } from '@/components/common/algorithm-page-template';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { RemainingAlgorithmContent } from '@/lib/remaining-algorithm-content';
import { runDemo, formatDemoOutput } from '@/lib/remaining-algorithm-demos';

type RemainingAlgorithmPageProps = {
  algorithm: RemainingAlgorithmContent;
};

export function RemainingAlgorithmPage({
  algorithm,
}: RemainingAlgorithmPageProps) {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="space-y-5">
        <Button variant="outline" size="sm" asChild>
          <Link
            href={algorithm.categoryHref}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {algorithm.category}
          </Link>
        </Button>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{algorithm.family}</Badge>
            <Badge variant="outline">{algorithm.difficulty}</Badge>
            {algorithm.sources.map((source) => (
              <Badge key={source} variant="default">
                {source}
              </Badge>
            ))}
          </div>

          <p className="max-w-4xl text-lg text-ash leading-relaxed">
            {algorithm.summary}
          </p>
        </div>
      </div>

      <AlgorithmPageTemplate
        title={`${algorithm.title} Algoritması`}
        descriptionTitle={`${algorithm.title} Açıklaması`}
        description={
          <div className="space-y-4">
            {algorithm.descriptionParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        }
        descriptionExtra={
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold">Kaynak Notları</h3>
              <ul className="list-disc space-y-2 pl-5">
                {algorithm.sourceNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Çalışma Prensibi</h3>
              <ol className="list-decimal space-y-2 pl-5">
                {algorithm.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        }
        codeExamples={algorithm.codeExamples}
        defaultCodeTab="typescript"
        codeIntro={
          <>
            Aşağıdaki uygulamalar PDF kaynaklarındaki pseudo kod akışını modern
            veri yapılarıyla ifade eder. Kenar durumları görünür bırakıldığı
            için örnekler doğrudan test edilebilir.
          </>
        }
        demoDescription={algorithm.demo.description}
        demo={
          <InteractiveDemo
            title={algorithm.demo.title}
            description={algorithm.demo.description}
            algorithmFunction={(input) => runDemo(algorithm, input)}
            inputType="text"
            inputPlaceholder={algorithm.demo.placeholder}
            outputFormatter={(output) =>
              formatDemoOutput(algorithm.demo.kind, output)
            }
          />
        }
        timeComplexity={algorithm.timeComplexity}
        spaceComplexity={algorithm.spaceComplexity}
        analysisRightTitle={algorithm.analysisTitle}
        analysisRightContent={
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {algorithm.analysisPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        }
        advantages={algorithm.advantages}
        disadvantages={algorithm.disadvantages}
        relatedAlgorithms={algorithm.relatedAlgorithms}
        className="space-y-12"
      />
    </div>
  );
}
