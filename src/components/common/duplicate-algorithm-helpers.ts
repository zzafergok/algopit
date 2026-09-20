import type { CodeLanguage } from '@/components/common/algorithm-page-template';
import type { DuplicateAlgorithmContent } from '@/lib/duplicate-algorithms';

export function buildCodeExamples(
  algorithm: DuplicateAlgorithmContent,
): Record<CodeLanguage, string> {
  const functionName = toFunctionName(algorithm.title);

  return {
    javascript: `/**
 * ${algorithm.title} implementation outline
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

export function toFunctionName(title: string) {
  const [first = 'run', ...rest] = title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part) => part.toLowerCase());

  return [first, ...rest.map((part) => part[0].toUpperCase() + part.slice(1))]
    .join('')
    .replace(/^[0-9]/, 'run$&');
}

export function toPythonFunctionName(title: string) {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .join('_')
    .toLowerCase()
    .replace(/^[0-9]/, 'run_');
}

export function toClassName(title: string) {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join('')
    .replace(/^[0-9]/, 'Algorithm$&');
}

export function runGenericDemo(
  algorithm: DuplicateAlgorithmContent,
  input: unknown[],
) {
  const values = Array.isArray(input) ? input : [input];
  const numericValues = values.filter(
    (value): value is number =>
      typeof value === 'number' && Number.isFinite(value),
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

export function buildDemoResult(
  algorithm: DuplicateAlgorithmContent,
  values: Array<number | string>,
) {
  const title = algorithm.title.toLowerCase();
  const numbers = values.filter(
    (value): value is number => typeof value === 'number',
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

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const next = x % y;
    x = y;
    y = next;
  }

  return x;
}
