'use client';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { AlgorithmPageTemplate } from '@/components/common/algorithm-page-template';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  type DuplicateAlgorithmContent,
  duplicateAlgorithmContents,
} from '@/lib/duplicate-algorithms';

const categoryLabels: Record<string, string> = {
  sorting: 'Sıralama Algoritmaları',
  searching: 'Arama Algoritmaları',
  'data-structures': 'Veri Yapıları',
  'graph-algorithms': 'Graf Algoritmaları',
  'dynamic-programming': 'Dinamik Programlama',
  backtracking: 'Geri İzleme',
  'greedy-algorithms': 'Açgözlü Algoritmalar',
  'mathematical-algorithms': 'Matematiksel Algoritmalar',
  'string-algorithms': 'Metin İşleme Algoritmaları',
  'advanced-algorithms': 'İleri Seviye Algoritmalar',
  'divide-and-conquer': 'Böl ve Fethet',
};

interface DuplicateAlgorithmPageProps {
  algorithm: DuplicateAlgorithmContent;
}

export function DuplicateAlgorithmPage({
  algorithm,
}: DuplicateAlgorithmPageProps) {
  const categoryHref = `/algorithms/${algorithm.category}`;
  const codeExamples = buildCodeExamples(algorithm);
  const relatedAlgorithms = duplicateAlgorithmContents
    .filter(
      (item) =>
        item.slug !== algorithm.slug &&
        (item.category === algorithm.category || item.family === algorithm.family)
    )
    .slice(0, 3);

  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="space-y-5">
        <Button variant="outline" size="sm" asChild>
          <Link href={categoryHref} className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {categoryLabels[algorithm.category] ?? 'Algoritmalar'}
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
            {algorithm.description}
          </p>
        </div>
      </div>

      <AlgorithmPageTemplate
        title={`${algorithm.title} Algoritması`}
        descriptionTitle={`${algorithm.title} Açıklaması`}
        description={algorithm.synthesis}
        descriptionExtra={
          <div>
            <h3 className="mb-3 font-semibold">Çalışma Prensibi</h3>
            <ol className="list-decimal space-y-2 pl-5">
              {algorithm.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        }
        codeExamples={codeExamples}
        codeIntro={
          <>
            {algorithm.title} için pseudo koddan türetilmiş örnek uygulama
            iskeletleri aşağıda verilmiştir. Gerçek projelerde veri modeli ve
            hata kontrolleri probleme göre özelleştirilmelidir.
          </>
        }
        demoDescription={
          <>
            Aşağıya kendi verilerinizi girerek {algorithm.title} akışını örnek
            bir demo üzerinde izleyebilirsiniz. Virgülle ayrılmış değerler girin
            veya JSON dizi formatı kullanın.
          </>
        }
        demo={
          <InteractiveDemo
            title={`${algorithm.title} Demo`}
            description="Girilen veri, algoritmanın temel adımlarına göre örnek bir izleme çıktısına dönüştürülür."
            algorithmFunction={(input) => runGenericDemo(algorithm, input)}
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
                      <span className="font-medium">İzlenen Adımlar:</span>
                      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ash">
                        {output.trace.map((step: string) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </>
                )}
              </div>
            )}
          />
        }
        timeComplexity={algorithm.timeComplexity}
        spaceComplexity={algorithm.spaceComplexity}
        analysisRightTitle="Kullanım Alanları"
        analysisRightContent={
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {algorithm.applications.map((application) => (
              <li key={application}>{application}</li>
            ))}
          </ul>
        }
        advantages={algorithm.advantages}
        disadvantages={algorithm.disadvantages}
        relatedIntro={
          <>
            Aynı kategori veya aynı problem ailesinde değerlendirilebilecek
            diğer algoritmalar:
          </>
        }
        relatedAlgorithms={relatedAlgorithms.map((related) => ({
          title: related.title,
          description: related.family,
          href: `/algorithms/${related.category}/${related.slug}`,
        }))}
        className="space-y-12"
      />
    </div>
  );
}

function buildCodeExamples(algorithm: DuplicateAlgorithmContent) {
  const functionName = toFunctionName(algorithm.title);
  const indentedPseudocode = algorithm.pseudocode
    .split('\n')
    .map((line) => ` * ${line}`)
    .join('\n');

  return {
    javascript: `/**
 * ${algorithm.title} implementation outline
 *
${indentedPseudocode}
 */
function ${functionName}(input) {
  // Implement the pseudo code above for your concrete input model.
  // Keep intermediate states visible while testing.
  return {
    input,
    algorithm: '${algorithm.title}',
    complexity: '${algorithm.timeComplexity.average}',
  };
}`,
    typescript: `type AlgorithmResult<T> = {
  input: T;
  algorithm: string;
  complexity: string;
};

/**
 * ${algorithm.title} implementation outline
 */
function ${functionName}<T>(input: T): AlgorithmResult<T> {
  // Translate the pseudo code into strongly typed domain structures.
  return {
    input,
    algorithm: '${algorithm.title}',
    complexity: '${algorithm.timeComplexity.average}',
  };
}`,
    python: `def ${toPythonFunctionName(algorithm.title)}(input_data):
    \"\"\"${algorithm.title} implementation outline.

    Translate the page pseudo code into concrete Python data structures.
    Expected average complexity: ${algorithm.timeComplexity.average}
    \"\"\"
    return {
        "input": input_data,
        "algorithm": "${algorithm.title}",
        "complexity": "${algorithm.timeComplexity.average}",
    }`,
    java: `public class ${toClassName(algorithm.title)} {
    /**
     * ${algorithm.title} implementation outline.
     */
    public static <T> AlgorithmResult<T> run(T input) {
        return new AlgorithmResult<>(
            input,
            "${algorithm.title}",
            "${algorithm.timeComplexity.average}"
        );
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

function runGenericDemo(algorithm: DuplicateAlgorithmContent, input: unknown[]) {
  const values = Array.isArray(input) ? input : [input];
  const numericValues = values.filter(
    (value): value is number => typeof value === 'number' && Number.isFinite(value)
  );
  const normalizedValues =
    numericValues.length === values.length && numericValues.length > 0
      ? numericValues
      : values.map((value) => String(value));

  const result = buildDemoResult(algorithm, normalizedValues);

  return {
    input: values,
    result,
    complexity: algorithm.timeComplexity.average,
    trace: algorithm.steps.slice(0, 4),
  };
}

function buildDemoResult(
  algorithm: DuplicateAlgorithmContent,
  values: Array<number | string>
) {
  const title = algorithm.title.toLowerCase();
  const numbers = values.filter(
    (value): value is number => typeof value === 'number'
  );

  if (title.includes('search') && values.length > 0) {
    const target = values[values.length - 1];
    const source = values.slice(0, -1);
    return `"${target}" değeri ${source.length} elemanlık veri içinde aranır.`;
  }

  if (title.includes('sort') || title.includes('merge')) {
    return numbers.length === values.length
      ? JSON.stringify([...numbers].sort((a, b) => a - b))
      : JSON.stringify([...values].sort());
  }

  if (title.includes('gcd') && numbers.length >= 2) {
    return String(numbers.reduce((acc, value) => gcd(acc, value)));
  }

  if (title.includes('matrix')) {
    return `${values.length} değer matris girdisi olarak yorumlandı. Boyutlandırma uygulama modeline göre yapılmalıdır.`;
  }

  if (
    title.includes('graph') ||
    title.includes('path') ||
    title.includes('component') ||
    title.includes('cycle')
  ) {
    return `${values.length} düğüm/kenar etiketi üzerinde graf akışı izlenir.`;
  }

  if (title.includes('knapsack') && numbers.length > 0) {
    return `Toplam değer/ağırlık adayı: ${numbers.reduce((sum, value) => sum + value, 0)}`;
  }

  return `${values.length} girdi öğesi algoritma adımlarıyla işlendi.`;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const next = x % y;
    x = y;
    y = next;
  }

  return x;
}
