'use client';

import React from 'react';

import {
  AlgorithmPageTemplate,
  type CodeLanguage,
} from '@/components/common/algorithm-page-template';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import {
  buildCodeExamples,
  runGenericExplanationDemo,
} from './explanation-helpers';

interface AlgorithmExplanationProps {
  title: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  pseudocode: string;
  applications: string[];
  codeExamples?: Partial<Record<CodeLanguage, string>>;
  defaultCodeTab?: CodeLanguage;
  demo?: React.ReactNode;
  demoDescription?: string;
  relatedAlgorithms?: Array<{
    title: string;
    description: string;
  }>;
}

export function AlgorithmExplanation({
  title,
  description,
  timeComplexity,
  spaceComplexity,
  advantages,
  disadvantages,
  pseudocode,
  applications,
  codeExamples,
  defaultCodeTab,
  demo,
  demoDescription,
  relatedAlgorithms,
}: AlgorithmExplanationProps) {
  const resolvedCodeExamples =
    codeExamples ??
    buildCodeExamples(title, pseudocode, timeComplexity.average);
  const resolvedRelatedAlgorithms =
    relatedAlgorithms ??
    applications.slice(0, 3).map((application) => ({
      title: application,
      description:
        'Bu kullanım alanı, algoritmanın benzer problem aileleriyle birlikte incelenmesi için iyi bir başlangıç noktasıdır.',
    }));

  return (
    <AlgorithmPageTemplate
      title={title}
      description={description}
      codeExamples={resolvedCodeExamples}
      defaultCodeTab={defaultCodeTab}
      demoDescription={demoDescription}
      demo={
        demo ?? (
          <InteractiveDemo
            title={`${title} Demo`}
            description="Girilen veri, algoritmanın pseudo kodundaki genel akışa göre örnek bir sonuca dönüştürülür."
            algorithmFunction={(input) =>
              runGenericExplanationDemo(
                title,
                input as unknown[],
                timeComplexity.average,
              )
            }
            inputType="array"
            inputPlaceholder="5,3,8,4,2"
            outputFormatter={(output) => (
              <div className="space-y-3">
                {!output ? (
                  <span className="text-ash">Henüz çalıştırılmadı</span>
                ) : (
                  <>
                    <div>
                      <span className="font-medium">Yorumlanan Girdi: </span>
                      <span>{JSON.stringify(output.input)}</span>
                    </div>
                    <div>
                      <span className="font-medium">Demo Sonucu: </span>
                      <span>{output.result}</span>
                    </div>
                    <div>
                      <span className="font-medium">Karmaşıklık: </span>
                      <span className="font-mono">{output.complexity}</span>
                    </div>
                    <div>
                      <span className="font-medium">Kontrol Notları:</span>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ash">
                        {output.notes.map((note: string) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}
          />
        )
      }
      timeComplexity={timeComplexity}
      spaceComplexity={spaceComplexity}
      advantages={advantages}
      disadvantages={disadvantages}
      relatedAlgorithms={resolvedRelatedAlgorithms}
      className="algorithm-explanation space-y-12"
    />
  );
}
