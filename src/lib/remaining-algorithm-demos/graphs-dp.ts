import type { GenericDemoResult } from './types';

export function runFibonacciDemo(input: string): GenericDemoResult {
  const n = Number(input.trim());

  if (!Number.isInteger(n) || n < 0 || n > 50) {
    throw new Error('0 ile 50 arasında bir tamsayı girin.');
  }

  const sequence = [0, 1];
  const trace = ['F(0)=0, F(1)=1 taban değerleri alındı.'];

  for (let index = 2; index <= n; index += 1) {
    sequence[index] = sequence[index - 1] + sequence[index - 2];
    trace.push(`F(${index}) = F(${index - 1}) + F(${index - 2}) = ${sequence[index]}`);
  }

  return {
    result: `F(${n}) = ${sequence[n] ?? n}`,
    trace,
    metadata: [`Dizi: ${sequence.slice(0, n + 1).join(', ')}`],
  };
}

export function runLcsDemo(input: string): GenericDemoResult {
  const [first, second] = splitRequired(input, '|');
  const a = first.trim();
  const b = second.trim();
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  let i = a.length;
  let j = b.length;
  const lcs: string[] = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      lcs.unshift(a[i - 1]);
      i -= 1;
      j -= 1;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i -= 1;
    } else {
      j -= 1;
    }
  }

  return {
    result: lcs.join('') || 'Ortak alt dizi yok',
    trace: [
      `${a.length + 1} x ${b.length + 1} DP tablosu kuruldu.`,
      `LCS uzunluğu ${dp[a.length][b.length]} olarak hesaplandı.`,
      'Tablodan geriye yürünerek örnek bir LCS üretildi.',
    ],
    metadata: [`Uzunluk: ${dp[a.length][b.length]}`],
  };
}

export function runBellmanFordDemo(input: string): GenericDemoResult {
  const [source, rawEdges] = splitRequired(input, ';');
  const edges = rawEdges
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [from, to, rawWeight] = entry.split('>').map((part) => part.trim());
      const weight = Number(rawWeight);

      if (!from || !to || !Number.isFinite(weight)) {
        throw new Error('Kenarları A>B>3 biçiminde girin.');
      }

      return { from, to, weight };
    });
  const vertices = Array.from(
    new Set([source.trim(), ...edges.flatMap((edge) => [edge.from, edge.to])])
  );
  const distances = new Map(vertices.map((vertex) => [vertex, Infinity]));
  const trace: string[] = [];
  distances.set(source.trim(), 0);

  for (let pass = 1; pass < vertices.length; pass += 1) {
    let changed = false;

    for (const edge of edges) {
      const fromDistance = distances.get(edge.from) ?? Infinity;
      const candidate = fromDistance + edge.weight;

      if (fromDistance !== Infinity && candidate < (distances.get(edge.to) ?? Infinity)) {
        distances.set(edge.to, candidate);
        changed = true;
        trace.push(`${pass}. tur: ${edge.from}->${edge.to} gevşetildi, yeni mesafe ${candidate}.`);
      }
    }

    if (!changed) {
      trace.push(`${pass}. turda değişiklik olmadı; erken duruldu.`);
      break;
    }
  }

  const hasNegativeCycle = edges.some((edge) => {
    const fromDistance = distances.get(edge.from) ?? Infinity;
    return fromDistance !== Infinity && fromDistance + edge.weight < (distances.get(edge.to) ?? Infinity);
  });

  return {
    result: hasNegativeCycle
      ? 'Kaynağa erişilebilir negatif çevrim tespit edildi.'
      : vertices
          .map((vertex) => `${vertex}: ${distances.get(vertex) === Infinity ? '∞' : distances.get(vertex)}`)
          .join(', '),
    trace,
    metadata: [`Düğüm sayısı: ${vertices.length}`, `Kenar sayısı: ${edges.length}`],
  };
}

function splitRequired(input: string, separator: string): [string, string] {
  const separatorIndex = input.indexOf(separator);
  if (separatorIndex === -1) {
    throw new Error(`Girdiyi "${separator}" karakteriyle iki parçaya ayırın.`);
  }
  return [
    input.slice(0, separatorIndex).trim(),
    input.slice(separatorIndex + 1).trim(),
  ];
}
