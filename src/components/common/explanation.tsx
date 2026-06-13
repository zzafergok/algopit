'use client';

import React from 'react';

import {
  AlgorithmPageTemplate,
  type CodeLanguage,
} from '@/components/common/algorithm-page-template';
import { InteractiveDemo } from '@/components/common/interactive-demo';

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
    codeExamples ?? buildCodeExamples(title, pseudocode, timeComplexity.average);
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
              runGenericExplanationDemo(title, input, timeComplexity.average)
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

function buildCodeExamples(title: string, pseudocode: string, complexity: string) {
  const functionName = toFunctionName(title);

  return {
    javascript: `/**
 * ${title} implementation outline
 */
function ${functionName}(input) {
  // Follow the pseudo code shown on this page.
  // Average complexity: ${complexity}
  return { input, algorithm: '${title}' };
}`,
    typescript: `type AlgorithmResult<T> = {
  input: T;
  algorithm: string;
};

function ${functionName}<T>(input: T): AlgorithmResult<T> {
  // Follow the pseudo code shown on this page.
  return { input, algorithm: '${title}' };
}`,
    python: `def ${toPythonFunctionName(title)}(input_data):
    \"\"\"${title} implementation outline.

    Average complexity: ${complexity}
    \"\"\"
    return {"input": input_data, "algorithm": "${title}"}`,
    java: `public class ${toClassName(title)} {
    public static <T> AlgorithmResult<T> run(T input) {
        return new AlgorithmResult<>(input, "${title}");
    }
}`,
  };
}

function toFunctionName(title: string) {
  const [first = 'run', ...rest] = title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part) => part.toLowerCase());

  return [first, ...rest.map((part) => part[0].toUpperCase() + part.slice(1))]
    .join('')
    .replace(/^[0-9]/, 'run$&');
}

function toPythonFunctionName(title: string) {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .join('_')
    .toLowerCase()
    .replace(/^[0-9]/, 'run_');
}

function toClassName(title: string) {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join('')
    .replace(/^[0-9]/, 'Algorithm$&');
}

function runGenericExplanationDemo(
  title: string,
  input: unknown[],
  complexity: string
) {
  const values = Array.isArray(input) ? input : [input];
  const numericValues = values.filter(
    (value): value is number => typeof value === 'number' && Number.isFinite(value)
  );
  const normalizedValues =
    numericValues.length === values.length && numericValues.length > 0
      ? numericValues
      : values.map((value) => String(value));

  return {
    input: values,
    result: buildExplanationDemoResult(title, normalizedValues),
    complexity,
    notes: [
      'Girdi parse edildi ve örnek algoritma akışına alındı.',
      'Çıktı, sayfadaki pseudo kodun gerçek uygulamaya çevrilmesi için kontrol amaçlıdır.',
      'Üretim kodunda veri yapısı ve kenar durumları algoritmaya göre özelleştirilmelidir.',
    ],
  };
}

function buildExplanationDemoResult(title: string, values: Array<number | string>) {
  const normalizedTitle = title.toLowerCase();
  const numbers = values.filter(
    (value): value is number => typeof value === 'number'
  );

  if (
    normalizedTitle.includes('sort') ||
    normalizedTitle.includes('sıral') ||
    normalizedTitle.includes('sirala')
  ) {
    return numbers.length === values.length
      ? JSON.stringify([...numbers].sort((a, b) => a - b))
      : JSON.stringify([...values].sort());
  }

  if (
    normalizedTitle.includes('search') ||
    normalizedTitle.includes('arama') ||
    normalizedTitle.includes('path')
  ) {
    const target = values[values.length - 1];
    return `"${target}" hedefi ${Math.max(values.length - 1, 0)} öğe içinde değerlendirilir.`;
  }

  if (
    normalizedTitle.includes('tree') ||
    normalizedTitle.includes('graph') ||
    normalizedTitle.includes('graf')
  ) {
    return `${values.length} düğüm/kenar etiketi üzerinde yapı gezintisi simüle edildi.`;
  }

  if (numbers.length > 0) {
    return `Sayısal özet: min=${Math.min(...numbers)}, max=${Math.max(...numbers)}, toplam=${numbers.reduce((sum, value) => sum + value, 0)}`;
  }

  return `${values.length} girdi öğesi işlendi.`;
}
