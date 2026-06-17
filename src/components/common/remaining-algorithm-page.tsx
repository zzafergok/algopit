'use client';

import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { AlgorithmPageTemplate } from '@/components/common/algorithm-page-template';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { RemainingAlgorithmContent } from '@/lib/remaining-algorithm-content';

type RemainingAlgorithmPageProps = {
  algorithm: RemainingAlgorithmContent;
};

type SearchDemoResult = {
  index: number;
  trace: string[];
  comparisons: number;
  metadata?: string[];
};

type KnapsackDemoResult = {
  totalValue: number;
  selected: Array<{
    name: string;
    value: number;
    weight: number;
    ratio: number;
    fraction: number;
  }>;
  trace: string[];
};

type GenericDemoResult = {
  result: string;
  trace: string[];
  metadata?: string[];
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

function runDemo(algorithm: RemainingAlgorithmContent, input: string) {
  if (algorithm.demo.kind === 'operations') {
    return runOperationsDemo(algorithm, input);
  }

  if (algorithm.demo.kind === 'fibonacci') {
    return runFibonacciDemo(input);
  }

  if (algorithm.demo.kind === 'lcs') {
    return runLcsDemo(input);
  }

  if (algorithm.demo.kind === 'bellman-ford') {
    return runBellmanFordDemo(input);
  }

  if (algorithm.demo.kind === 'sieve') {
    return runSieveDemo(input);
  }

  if (algorithm.demo.kind === 'bloom-filter') {
    return runBloomFilterDemo(input);
  }

  if (algorithm.demo.kind === 'reservoir-sampling') {
    return runReservoirSamplingDemo(input);
  }

  if (algorithm.demo.kind === 'genetic-algorithm') {
    return runGeneticAlgorithmDemo(input);
  }

  if (algorithm.demo.kind === 'simulated-annealing') {
    return runSimulatedAnnealingDemo(input);
  }

  if (algorithm.demo.kind === 'linear-search') {
    return runLinearSearchDemo(input);
  }

  if (algorithm.demo.kind === 'fractional-knapsack') {
    return runFractionalKnapsackDemo(input);
  }

  if (algorithm.title.startsWith('Rabin-Karp')) {
    return runRabinKarpDemo(input);
  }

  return runKmpDemo(input);
}

function formatDemoOutput(
  kind: RemainingAlgorithmContent['demo']['kind'],
  output: unknown
) {
  if (!output) {
    return <span className="text-ash">Henüz çalıştırılmadı</span>;
  }

  if (kind === 'fractional-knapsack') {
    const result = output as KnapsackDemoResult;

    return (
      <div className="space-y-3">
        <p>
          <span className="font-medium">Toplam Değer: </span>
          <span>{round(result.totalValue)}</span>
        </p>
        <div>
          <span className="font-medium">Seçilenler:</span>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ash">
            {result.selected.map((item) => (
              <li key={item.name}>
                {item.name}: %{round(item.fraction * 100)} alındı, oran{' '}
                {round(item.ratio)}
              </li>
            ))}
          </ul>
        </div>
        <TraceList trace={result.trace} />
      </div>
    );
  }

  if (
    kind === 'operations' ||
    kind === 'fibonacci' ||
    kind === 'lcs' ||
    kind === 'bellman-ford' ||
    kind === 'sieve' ||
    kind === 'bloom-filter' ||
    kind === 'reservoir-sampling' ||
    kind === 'genetic-algorithm' ||
    kind === 'simulated-annealing'
  ) {
    const result = output as GenericDemoResult;

    return (
      <div className="space-y-3">
        <p>
          <span className="font-medium">Sonuç: </span>
          <span>{result.result}</span>
        </p>
        {result.metadata && (
          <ul className="list-disc space-y-1 pl-5 text-sm text-ash">
            {result.metadata.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        <TraceList trace={result.trace} />
      </div>
    );
  }

  const result = output as SearchDemoResult;

  return (
    <div className="space-y-3">
      <p>
        <span className="font-medium">Sonuç: </span>
        <span>
          {result.index >= 0
            ? `Eşleşme ${result.index}. indekste bulundu.`
            : 'Eşleşme bulunamadı.'}
        </span>
      </p>
      <p>
        <span className="font-medium">Karşılaştırma: </span>
        <span>{result.comparisons}</span>
      </p>
      {result.metadata && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-ash">
          {result.metadata.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <TraceList trace={result.trace} />
    </div>
  );
}

function TraceList({ trace }: { trace: string[] }) {
  return (
    <div>
      <span className="font-medium">İz:</span>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ash">
        {trace.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

function runLinearSearchDemo(input: string): SearchDemoResult {
  const [rawItems, rawTarget] = splitRequired(input, ';');
  const items = rawItems.split(',').map((item) => item.trim()).filter(Boolean);
  const target = rawTarget.trim();
  const trace: string[] = [];

  if (!items.length || !target) {
    throw new Error('Liste ve hedef değer girin. Örnek: 8,3,11,5; 11');
  }

  for (let index = 0; index < items.length; index += 1) {
    trace.push(`${index}. indeks kontrol edildi: ${items[index]}`);

    if (items[index] === target) {
      return {
        index,
        trace,
        comparisons: index + 1,
      };
    }
  }

  return {
    index: -1,
    trace,
    comparisons: items.length,
  };
}

function runKmpDemo(input: string): SearchDemoResult {
  const { text, pattern } = parseTextPattern(input);
  const lps = buildLps(pattern);
  const trace: string[] = [`LPS tablosu: [${lps.join(', ')}]`];
  let comparisons = 0;
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    comparisons += 1;
    trace.push(
      `text[${textIndex}]='${text[textIndex]}' ile pattern[${patternIndex}]='${pattern[patternIndex]}' karşılaştırıldı.`
    );

    if (text[textIndex] === pattern[patternIndex]) {
      textIndex += 1;
      patternIndex += 1;

      if (patternIndex === pattern.length) {
        return {
          index: textIndex - patternIndex,
          trace,
          comparisons,
          metadata: [`LPS: [${lps.join(', ')}]`],
        };
      }
    } else if (patternIndex > 0) {
      patternIndex = lps[patternIndex - 1];
      trace.push(`Uyuşmazlık sonrası desen imleci ${patternIndex} değerine çekildi.`);
    } else {
      textIndex += 1;
    }
  }

  return {
    index: -1,
    trace,
    comparisons,
    metadata: [`LPS: [${lps.join(', ')}]`],
  };
}

function runRabinKarpDemo(input: string): SearchDemoResult {
  const { text, pattern } = parseTextPattern(input);
  const base = 256;
  const prime = 1_000_000_007;
  const patternLength = pattern.length;
  let highBase = 1;
  let patternHash = 0;
  let windowHash = 0;
  let comparisons = 0;
  const trace: string[] = [];

  if (patternLength > text.length) {
    return {
      index: -1,
      comparisons: 0,
      trace: ['Desen metinden uzun olduğu için arama yapılmadı.'],
    };
  }

  for (let index = 0; index < patternLength - 1; index += 1) {
    highBase = (highBase * base) % prime;
  }

  for (let index = 0; index < patternLength; index += 1) {
    patternHash = (patternHash * base + pattern.charCodeAt(index)) % prime;
    windowHash = (windowHash * base + text.charCodeAt(index)) % prime;
  }

  for (let start = 0; start <= text.length - patternLength; start += 1) {
    comparisons += 1;
    trace.push(`${start}. pencere hash=${windowHash}, pattern hash=${patternHash}`);

    if (
      patternHash === windowHash &&
      text.slice(start, start + patternLength) === pattern
    ) {
      trace.push('Hash eşleşmesi karakter karşılaştırmasıyla doğrulandı.');

      return {
        index: start,
        trace,
        comparisons,
        metadata: [`base=${base}`, `prime=${prime}`],
      };
    }

    if (start < text.length - patternLength) {
      const removed = text.charCodeAt(start) * highBase;
      const added = text.charCodeAt(start + patternLength);
      windowHash = (windowHash - removed) % prime;
      windowHash = (windowHash + prime) % prime;
      windowHash = (windowHash * base + added) % prime;
    }
  }

  return {
    index: -1,
    trace,
    comparisons,
    metadata: [`base=${base}`, `prime=${prime}`],
  };
}

function runFractionalKnapsackDemo(input: string): KnapsackDemoResult {
  const [rawCapacity, rawItems] = splitRequired(input, ';');
  const capacity = Number(rawCapacity.trim());

  if (!Number.isFinite(capacity) || capacity <= 0) {
    throw new Error('Pozitif bir kapasite girin.');
  }

  const items = rawItems
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry, index) => {
      const [name = `item-${index + 1}`, rawValue, rawWeight] = entry
        .split(':')
        .map((part) => part.trim());
      const value = Number(rawValue);
      const weight = Number(rawWeight);

      if (!Number.isFinite(value) || !Number.isFinite(weight) || weight <= 0) {
        throw new Error('Nesneleri ad:değer:ağırlık biçiminde girin.');
      }

      return {
        name,
        value,
        weight,
        ratio: value / weight,
      };
    })
    .sort((a, b) => b.ratio - a.ratio);

  let remaining = capacity;
  let totalValue = 0;
  const selected: KnapsackDemoResult['selected'] = [];
  const trace = [`Orana göre sıralama: ${items.map((item) => item.name).join(', ')}`];

  for (const item of items) {
    if (remaining <= 0) {
      break;
    }

    const fraction = Math.min(1, remaining / item.weight);
    selected.push({ ...item, fraction });
    totalValue += item.value * fraction;
    remaining -= item.weight * fraction;
    trace.push(
      `${item.name} için ${round(fraction * 100)}% alındı; kalan kapasite ${round(remaining)}.`
    );
  }

  return {
    totalValue,
    selected,
    trace,
  };
}

function runOperationsDemo(
  algorithm: RemainingAlgorithmContent,
  input: string
): GenericDemoResult {
  if (algorithm.title.startsWith('Linked List')) {
    return runLinkedListDemo(input);
  }

  if (algorithm.title.startsWith('Stack')) {
    return runStackDemo(input);
  }

  if (algorithm.title.startsWith('Queue')) {
    return runQueueDemo(input);
  }

  return runHashTableDemo(input);
}

function runLinkedListDemo(input: string): GenericDemoResult {
  const list: string[] = [];
  const trace: string[] = [];

  for (const command of parseCommands(input)) {
    const [operation, value = ''] = command.split(':').map((part) => part.trim());

    if (operation === 'add') {
      list.push(value);
      trace.push(`${value} tail düğümü olarak eklendi.`);
    } else if (operation === 'remove') {
      const index = list.indexOf(value);

      if (index >= 0) {
        list.splice(index, 1);
        trace.push(`${value} düğümü listeden çıkarıldı.`);
      } else {
        trace.push(`${value} bulunamadı; liste değişmedi.`);
      }
    } else if (operation === 'contains') {
      trace.push(`${value} araması: ${list.includes(value) ? 'bulundu' : 'bulunamadı'}.`);
    } else {
      throw new Error('Komutlar add:value, remove:value veya contains:value olmalı.');
    }
  }

  return {
    result: list.length ? list.join(' -> ') : 'Boş liste',
    trace,
    metadata: [`Düğüm sayısı: ${list.length}`],
  };
}

function runStackDemo(input: string): GenericDemoResult {
  const stack: string[] = [];
  const trace: string[] = [];

  for (const command of parseCommands(input)) {
    const [operation, value = ''] = command.split(':').map((part) => part.trim());

    if (operation === 'push') {
      stack.push(value);
      trace.push(`${value} yığının tepesine eklendi.`);
    } else if (operation === 'pop') {
      trace.push(`${stack.pop() ?? 'Boş yığın'} pop edildi.`);
    } else if (operation === 'peek') {
      trace.push(`Tepedeki değer: ${stack.at(-1) ?? 'Boş yığın'}.`);
    } else {
      throw new Error('Komutlar push:value, pop veya peek olmalı.');
    }
  }

  return {
    result: stack.length ? `[${stack.join(', ')}]` : 'Boş yığın',
    trace,
    metadata: [`Top: ${stack.at(-1) ?? 'yok'}`],
  };
}

function runQueueDemo(input: string): GenericDemoResult {
  const queue: string[] = [];
  const trace: string[] = [];

  for (const command of parseCommands(input)) {
    const [operation, value = ''] = command.split(':').map((part) => part.trim());

    if (operation === 'enqueue') {
      queue.push(value);
      trace.push(`${value} kuyruğun arkasına eklendi.`);
    } else if (operation === 'dequeue') {
      trace.push(`${queue.shift() ?? 'Boş kuyruk'} dequeue edildi.`);
    } else if (operation === 'peek') {
      trace.push(`Öndeki değer: ${queue[0] ?? 'Boş kuyruk'}.`);
    } else {
      throw new Error('Komutlar enqueue:value, dequeue veya peek olmalı.');
    }
  }

  return {
    result: queue.length ? `[${queue.join(', ')}]` : 'Boş kuyruk',
    trace,
    metadata: [`Front: ${queue[0] ?? 'yok'}`],
  };
}

function runHashTableDemo(input: string): GenericDemoResult {
  const buckets = Array.from({ length: 7 }, () => [] as string[]);
  const trace: string[] = [];

  for (const command of parseCommands(input)) {
    const [operation, rawValue = ''] = command.split(':').map((part) => part.trim());
    const bucketIndex = hashString(rawValue) % buckets.length;
    const bucket = buckets[bucketIndex];

    if (operation === 'put') {
      if (!bucket.includes(rawValue)) {
        bucket.push(rawValue);
      }
      trace.push(`${rawValue} h=${bucketIndex} kovasına eklendi.`);
    } else if (operation === 'get') {
      trace.push(
        `${rawValue} h=${bucketIndex} kovasında ${bucket.includes(rawValue) ? 'bulundu' : 'bulunamadı'}.`
      );
    } else if (operation === 'remove') {
      const index = bucket.indexOf(rawValue);

      if (index >= 0) {
        bucket.splice(index, 1);
      }

      trace.push(`${rawValue} h=${bucketIndex} kovasından silme denendi.`);
    } else {
      throw new Error('Komutlar put:value, get:value veya remove:value olmalı.');
    }
  }

  return {
    result: buckets
      .map((bucket, index) => `${index}: [${bucket.join(', ')}]`)
      .join(' | '),
    trace,
    metadata: [`Kova sayısı: ${buckets.length}`, 'Çakışmalar chaining ile tutulur.'],
  };
}

function runFibonacciDemo(input: string): GenericDemoResult {
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

function runLcsDemo(input: string): GenericDemoResult {
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

function runBellmanFordDemo(input: string): GenericDemoResult {
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

function runSieveDemo(input: string): GenericDemoResult {
  const limit = Number(input.trim());

  if (!Number.isInteger(limit) || limit < 2 || limit > 10000) {
    throw new Error('2 ile 10000 arasında bir tamsayı girin.');
  }

  const isPrime = Array(limit + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  const trace: string[] = [];

  for (let number = 2; number * number <= limit; number += 1) {
    if (!isPrime[number]) {
      continue;
    }

    let marked = 0;
    for (let multiple = number * number; multiple <= limit; multiple += number) {
      if (isPrime[multiple]) {
        marked += 1;
      }
      isPrime[multiple] = false;
    }
    trace.push(`${number} asal kabul edildi; ${number * number} değerinden başlayan ${marked} kat işaretlendi.`);
  }

  const primes = isPrime
    .map((prime, index) => (prime ? index : null))
    .filter((value): value is number => value !== null);

  return {
    result: primes.join(', '),
    trace,
    metadata: [`Asal sayısı: ${primes.length}`, `Limit: ${limit}`],
  };
}

function runBloomFilterDemo(input: string): GenericDemoResult {
  const [rawInsertions, rawQueries] = splitRequired(input, ';');
  const inserted = rawInsertions
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const queries = rawQueries
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const bitCount = 32;
  const bits = Array(bitCount).fill(false);
  const trace: string[] = [];

  for (const item of inserted) {
    const indexes = bloomIndexes(item, bitCount);
    indexes.forEach((index) => {
      bits[index] = true;
    });
    trace.push(`${item} için bitler ayarlandı: ${indexes.join(', ')}.`);
  }

  const queryResults = queries.map((item) => {
    const indexes = bloomIndexes(item, bitCount);
    const possible = indexes.every((index) => bits[index]);
    trace.push(`${item} sorgusu ${indexes.join(', ')} bitlerine baktı: ${possible ? 'possibly in set' : 'definitely not in set'}.`);
    return `${item}: ${possible ? 'possibly in set' : 'definitely not in set'}`;
  });

  return {
    result: queryResults.join(' | '),
    trace,
    metadata: [
      `Bit dizisi: ${bits.map((bit) => (bit ? 1 : 0)).join('')}`,
      'Pozitif sonuçlar olasılıksaldır; negatif sonuçlar kesindir.',
    ],
  };
}

function runReservoirSamplingDemo(input: string): GenericDemoResult {
  const [rawItems, rawSize] = splitRequired(input, ';');
  const items = rawItems
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const sampleSize = Number(rawSize.trim());

  if (!Number.isInteger(sampleSize) || sampleSize <= 0 || sampleSize > items.length) {
    throw new Error('Örneklem boyutu pozitif ve eleman sayısından küçük/eşit olmalı.');
  }

  const reservoir = items.slice(0, sampleSize);
  const trace = [`İlk ${sampleSize} eleman reservoir içine alındı: ${reservoir.join(', ')}.`];

  for (let index = sampleSize; index < items.length; index += 1) {
    const randomIndex = deterministicIndex(items[index], index + 1);

    if (randomIndex < sampleSize) {
      trace.push(`${items[index]} için j=${randomIndex}; ${reservoir[randomIndex]} değiştirildi.`);
      reservoir[randomIndex] = items[index];
    } else {
      trace.push(`${items[index]} için j=${randomIndex}; reservoir değişmedi.`);
    }
  }

  return {
    result: reservoir.join(', '),
    trace,
    metadata: [`Akış uzunluğu: ${items.length}`, `Örneklem boyutu: ${sampleSize}`],
  };
}

function runGeneticAlgorithmDemo(input: string): GenericDemoResult {
  const [rawTarget, rawPopulation] = splitRequired(input, ';');
  const target = rawTarget.trim();
  let population = rawPopulation
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length === target.length);

  if (!target || population.length < 2) {
    throw new Error('Hedef ve aynı uzunlukta en az iki birey girin.');
  }

  const trace: string[] = [];

  for (let generation = 1; generation <= 4; generation += 1) {
    population = population
      .map((candidate) => ({
        candidate,
        fitness: hammingFitness(candidate, target),
      }))
      .sort((a, b) => b.fitness - a.fitness)
      .map((item) => item.candidate);

    trace.push(`${generation}. nesil en iyi birey: ${population[0]} (${hammingFitness(population[0], target)}/${target.length}).`);

    if (population[0] === target) {
      break;
    }

    const [first, second] = population;
    const crossoverPoint = Math.max(1, Math.floor(target.length / 2));
    const child = mutateTowardTarget(
      first.slice(0, crossoverPoint) + second.slice(crossoverPoint),
      target,
      generation - 1
    );
    population = [population[0], child, ...population.slice(1, -1)];
  }

  return {
    result: population[0],
    trace,
    metadata: [`Hedef: ${target}`, `Fitness: ${hammingFitness(population[0], target)}/${target.length}`],
  };
}

function runSimulatedAnnealingDemo(input: string): GenericDemoResult {
  const [rawStart, rawTarget] = splitRequired(input, ';');
  let current = Number(rawStart.trim());
  const target = Number(rawTarget.trim());

  if (!Number.isFinite(current) || !Number.isFinite(target)) {
    throw new Error('Başlangıç ve hedef sayılarını girin.');
  }

  let temperature = 10;
  const trace: string[] = [];

  for (let step = 1; step <= 12; step += 1) {
    const direction = current < target ? 1 : -1;
    const candidate = current + direction * Math.max(1, Math.ceil(temperature / 4));
    const currentEnergy = Math.abs(target - current);
    const candidateEnergy = Math.abs(target - candidate);
    const delta = candidateEnergy - currentEnergy;
    const acceptance = delta <= 0 ? 1 : Math.exp(-delta / temperature);
    const accepted = delta <= 0 || deterministicUnit(step, current, target) < acceptance;

    trace.push(`${step}. adım T=${round(temperature)} aday=${candidate}, delta=${round(delta)}, kabul=${accepted ? 'evet' : 'hayır'}.`);

    if (accepted) {
      current = candidate;
    }

    temperature *= 0.72;
  }

  return {
    result: `x=${round(current)}, enerji=${round(Math.abs(target - current))}`,
    trace,
    metadata: [`Hedef: ${target}`, 'Sıcaklık azaldıkça kötü hamle kabul olasılığı düşer.'],
  };
}

function parseTextPattern(input: string) {
  const [text, pattern] = splitRequired(input, '|');

  if (!text || !pattern) {
    throw new Error('Metin ve desen girin. Örnek: metin | desen');
  }

  return {
    text,
    pattern,
  };
}

function parseCommands(input: string) {
  const commands = input
    .split(',')
    .map((command) => command.trim())
    .filter(Boolean);

  if (!commands.length) {
    throw new Error('En az bir komut girin.');
  }

  return commands;
}

function hashString(value: string) {
  let hash = 0;

  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return hash;
}

function buildLps(pattern: string) {
  const lps = Array(pattern.length).fill(0);
  let length = 0;
  let index = 1;

  while (index < pattern.length) {
    if (pattern[index] === pattern[length]) {
      length += 1;
      lps[index] = length;
      index += 1;
    } else if (length > 0) {
      length = lps[length - 1];
    } else {
      index += 1;
    }
  }

  return lps;
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

function bloomIndexes(value: string, bitCount: number) {
  const first = hashString(value) % bitCount;
  const second = (hashString(`${value}:salt`) % bitCount) || 1;
  return [first, (first + second) % bitCount, (first + 2 * second) % bitCount];
}

function deterministicIndex(value: string, modulo: number) {
  return hashString(`${value}:${modulo}`) % modulo;
}

function deterministicUnit(step: number, current: number, target: number): number {
  const hash = hashString(`${step}:${current}:${target}`);
  return hash / 4294967296; // Map 32-bit unsigned int to [0, 1)
}


function hammingFitness(candidate: string, target: string) {
  return [...candidate].reduce(
    (score, character, index) => score + (character === target[index] ? 1 : 0),
    0
  );
}

function mutateTowardTarget(candidate: string, target: string, offset: number) {
  const chars = [...candidate];
  const mismatchIndex = chars.findIndex((character, index) => character !== target[index]);

  if (mismatchIndex >= 0) {
    chars[(mismatchIndex + offset) % chars.length] =
      target[(mismatchIndex + offset) % chars.length];
  }

  return chars.join('');
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}
