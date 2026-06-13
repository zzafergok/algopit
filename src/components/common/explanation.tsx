'use client';

import React from 'react';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { getComplexityName } from '@/lib/utils';

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

type CodeLanguage = 'javascript' | 'typescript' | 'python' | 'java';

const codeLanguageLabels: Record<CodeLanguage, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
};

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
  const codeEntries = (Object.entries(resolvedCodeExamples) as Array<
    [CodeLanguage, string]
  >).filter(([, code]) => Boolean(code));
  const activeCodeTab = defaultCodeTab ?? codeEntries[0]?.[0] ?? 'javascript';
  const resolvedRelatedAlgorithms =
    relatedAlgorithms ??
    applications.slice(0, 3).map((application) => ({
      title: application,
      description:
        'Bu kullanım alanı, algoritmanın benzer problem aileleriyle birlikte incelenmesi için iyi bir başlangıç noktasıdır.',
    }));

  return (
    <div className="algorithm-explanation space-y-12">
      <h1 className="text-4xl font-bold tracking-tight text-center text-arcly-blue">
        {title}
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>{title} Açıklaması</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{description}</p>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-ash">
          {title} algoritmasının farklı programlama dillerindeki uygulamaları
          aşağıda verilmiştir. Her örnek, algoritmanın temel akışını açık
          şekilde gösterecek biçimde sunulmuştur.
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
        {demo ?? (
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
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Analizi</h2>
        <Card>
          <CardHeader>
            <CardTitle>Zaman ve Alan Karmaşıklığı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <h3 className="font-semibold">Kararlılık ve Kullanım</h3>
                <p className="text-sm text-ash">
                  Algoritmanın uygunluğu, veri boyutu, girdi yapısı ve beklenen
                  doğruluk/performans dengesine göre değerlendirilmelidir.
                </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="mb-3 font-semibold text-signal-green dark:text-signal-green/80">
                  Avantajlar
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-alert-red dark:text-alert-red/80">
                  Dezavantajlar
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {disadvantages.map((disadvantage, index) => (
                    <li key={index}>{disadvantage}</li>
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
          {title} ile benzer veya alternatif olarak değerlendirilebilecek diğer
          başlıklar:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resolvedRelatedAlgorithms.map((algorithm, index) => (
            <Card
              key={`${algorithm.title}-${index}`}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{algorithm.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-ash">
                  {algorithm.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
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
