import React from 'react';
import type { RemainingAlgorithmContent } from '@/lib/remaining-algorithm-content';

// Import types from types.ts
import type { SearchDemoResult, KnapsackDemoResult, GenericDemoResult } from './remaining-algorithm-demos/types';

// Export types so external files using them from remaining-algorithm-demos continue to work
export type { SearchDemoResult, KnapsackDemoResult, GenericDemoResult };

// Import runner functions from sub-files
import { runOperationsDemo } from './remaining-algorithm-demos/data-structures';
import { runLinearSearchDemo, runKmpDemo, runRabinKarpDemo } from './remaining-algorithm-demos/string-search';
import { runPrimalityTestDemo, runBaseConversionDemo, runFactorialDemo, runExponentiationDemo } from './remaining-algorithm-demos/math-basic';
import { runPolynomialOperationsDemo, runMatrixOperationsDemo, runGaussianEliminationDemo } from './remaining-algorithm-demos/math-poly-matrix';
import { runInterpolationFittingDemo } from './remaining-algorithm-demos/math-interpolation';
import { runNumericalIntegrationDemo } from './remaining-algorithm-demos/math-calculus';
import { runRandomNumberGeneratorsDemo } from './remaining-algorithm-demos/math-random';
import { runFibonacciDemo, runLcsDemo, runBellmanFordDemo } from './remaining-algorithm-demos/graphs-dp';
import { runFractionalKnapsackDemo, runGeneticAlgorithmDemo, runSimulatedAnnealingDemo } from './remaining-algorithm-demos/greedy-opt';
import { runSieveDemo, runBloomFilterDemo, runReservoirSamplingDemo } from './remaining-algorithm-demos/probabilistic';

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
    kind === 'random-number-generators'
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

export function runDemo(algorithm: RemainingAlgorithmContent, input: string) {
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

  if (algorithm.demo.kind === 'primality-test') {
    return runPrimalityTestDemo(input);
  }

  if (algorithm.demo.kind === 'base-conversion') {
    return runBaseConversionDemo(input);
  }

  if (algorithm.demo.kind === 'factorial') {
    return runFactorialDemo(input);
  }

  if (algorithm.demo.kind === 'exponentiation') {
    return runExponentiationDemo(input);
  }

  if (algorithm.demo.kind === 'polynomial-operations') {
    return runPolynomialOperationsDemo(input);
  }

  if (algorithm.demo.kind === 'matrix-operations') {
    return runMatrixOperationsDemo(input);
  }

  if (algorithm.demo.kind === 'gaussian-elimination') {
    return runGaussianEliminationDemo(input);
  }

  if (algorithm.demo.kind === 'interpolation-fitting') {
    return runInterpolationFittingDemo(input);
  }

  if (algorithm.demo.kind === 'numerical-integration') {
    return runNumericalIntegrationDemo(input);
  }

  if (algorithm.demo.kind === 'random-number-generators') {
    return runRandomNumberGeneratorsDemo(input);
  }

  if (algorithm.title.startsWith('Rabin-Karp')) {
    return runRabinKarpDemo(input);
  }

  return runKmpDemo(input);
}
