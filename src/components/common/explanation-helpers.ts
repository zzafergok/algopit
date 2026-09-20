import type { CodeLanguage } from '@/components/common/algorithm-page-template';

export function buildCodeExamples(
  title: string,
  pseudocode: string,
  complexity: string,
): Record<CodeLanguage, string> {
  const functionName = toFunctionName(title);

  return {
    javascript: `function ${functionName}(input) {
  // Pseudocode logic applied to JavaScript runtime
  return {
    input,
    algorithm: '${title}',
    complexity: '${complexity}',
  };
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

export function runGenericExplanationDemo(
  title: string,
  input: unknown[],
  complexity: string,
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

export function buildExplanationDemoResult(
  title: string,
  values: Array<number | string>,
) {
  const normalizedTitle = title.toLowerCase();
  const numbers = values.filter(
    (value): value is number => typeof value === 'number',
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
