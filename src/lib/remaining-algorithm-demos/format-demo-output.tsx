import React from 'react';
import type { RemainingAlgorithmContent } from '@/lib/remaining-algorithm-content';
import type {
  SearchDemoResult,
  KnapsackDemoResult,
  GenericDemoResult,
} from './types';

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

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function formatDemoOutput(
  kind: RemainingAlgorithmContent['demo']['kind'],
  output: unknown,
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
    kind === 'simulated-annealing' ||
    kind === 'primality-test' ||
    kind === 'base-conversion' ||
    kind === 'factorial' ||
    kind === 'exponentiation' ||
    kind === 'polynomial-operations' ||
    kind === 'matrix-operations' ||
    kind === 'gaussian-elimination' ||
    kind === 'interpolation-fitting' ||
    kind === 'numerical-integration' ||
    kind === 'random-number-generators' ||
    kind === 'quicksort-variants' ||
    kind === 'radix-sort-variants' ||
    kind === 'bucket-sort' ||
    kind === 'order-statistics' ||
    kind === 'external-sorting' ||
    kind === 'simple-sorts' ||
    kind === 'search-techniques' ||
    kind === 'search-trees' ||
    kind === 'external-searching-hashing' ||
    kind === 'open-addressing-hashing' ||
    kind === 'heap-operations' ||
    kind === 'union-find' ||
    kind === 'set-operations' ||
    kind === 'graph-traversals' ||
    kind === 'shortest-paths-mst' ||
    kind === 'network-flow' ||
    kind === 'matching-marriage' ||
    kind === 'graph-coloring-backtracking' ||
    kind === 'string-search-matching' ||
    kind === 'compilers-parsing' ||
    kind === 'compression' ||
    kind === 'cryptography' ||
    kind === 'geometric-primitives' ||
    kind === 'containment-query' ||
    kind === 'convex-hull-path' ||
    kind === 'proximity-problems' ||
    kind === 'spatial-searching' ||
    kind === 'branch-and-bound-np' ||
    kind === 'traveling-salesman' ||
    kind === 'knapsack-variants' ||
    kind === 'scheduling-chain' ||
    kind === 'multistage-graphs' ||
    kind === 'graph-coloring-np' ||
    kind === 'fast-fourier-transform' ||
    kind === 'parallel-merging-networks' ||
    kind === 'math-classic-riddles' ||
    kind === 'linear-programming-simplex' ||
    kind === 'memory-management-gc'
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
