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
import {
  runQuicksortVariantsDemo,
  runRadixSortVariantsDemo,
  runBucketSortDemo,
  runOrderStatisticsDemo,
  runExternalSortingDemo,
  runSimpleSortsDemo,
} from './remaining-algorithm-demos/sorting';
import {
  runSearchTechniquesDemo,
  runSearchTreesDemo,
  runExternalSearchingHashingDemo,
  runOpenAddressingHashingDemo,
} from './remaining-algorithm-demos/searching-trees';
import {
  runHeapOperationsDemo,
  runUnionFindDemo,
  runSetOperationsDemo,
} from './remaining-algorithm-demos/structures-advanced';
import {
  runGraphTraversalsDemo,
  runShortestPathsMstDemo,
  runNetworkFlowDemo,
  runMatchingMarriageDemo,
  runGraphColoringBacktrackingDemo,
} from './remaining-algorithm-demos/graph-advanced';
import {
  runStringSearchMatchingDemo,
  runCompilersParsingDemo,
  runCompressionDemo,
  runCryptographyDemo,
} from './remaining-algorithm-demos/string-parsing-crypt';
import {
  runGeometricPrimitivesDemo,
  runContainmentQueryDemo,
  runConvexHullPathDemo,
  runProximityProblemsDemo,
  runSpatialSearchingDemo,
} from './remaining-algorithm-demos/geometry';
import {
  runBranchAndBoundNpDemo,
  runTravelingSalesmanDemo,
  runKnapsackVariantsDemo,
  runSchedulingChainDemo,
  runMultistageGraphsDemo,
  runGraphColoringNpDemo,
} from './remaining-algorithm-demos/design-optimization';
import {
  runFastFourierTransformDemo,
  runParallelMergingNetworksDemo,
  runMathClassicRiddlesDemo,
  runLinearProgrammingSimplexDemo,
  runMemoryManagementGcDemo,
} from './remaining-algorithm-demos/advanced-parallel-memory';

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

  if (algorithm.demo.kind === 'quicksort-variants') {
    return runQuicksortVariantsDemo(input);
  }

  if (algorithm.demo.kind === 'radix-sort-variants') {
    return runRadixSortVariantsDemo(input);
  }

  if (algorithm.demo.kind === 'bucket-sort') {
    return runBucketSortDemo(input);
  }

  if (algorithm.demo.kind === 'order-statistics') {
    return runOrderStatisticsDemo(input);
  }

  if (algorithm.demo.kind === 'external-sorting') {
    return runExternalSortingDemo(input);
  }

  if (algorithm.demo.kind === 'simple-sorts') {
    return runSimpleSortsDemo(input);
  }

  if (algorithm.demo.kind === 'search-techniques') {
    return runSearchTechniquesDemo(input);
  }

  if (algorithm.demo.kind === 'search-trees') {
    return runSearchTreesDemo(input);
  }

  if (algorithm.demo.kind === 'external-searching-hashing') {
    return runExternalSearchingHashingDemo(input);
  }

  if (algorithm.demo.kind === 'open-addressing-hashing') {
    return runOpenAddressingHashingDemo(input);
  }

  if (algorithm.demo.kind === 'heap-operations') {
    return runHeapOperationsDemo(input);
  }

  if (algorithm.demo.kind === 'union-find') {
    return runUnionFindDemo(input);
  }

  if (algorithm.demo.kind === 'set-operations') {
    return runSetOperationsDemo(input);
  }

  if (algorithm.demo.kind === 'graph-traversals') {
    return runGraphTraversalsDemo(input);
  }

  if (algorithm.demo.kind === 'shortest-paths-mst') {
    return runShortestPathsMstDemo(input);
  }

  if (algorithm.demo.kind === 'network-flow') {
    return runNetworkFlowDemo(input);
  }

  if (algorithm.demo.kind === 'matching-marriage') {
    return runMatchingMarriageDemo(input);
  }

  if (algorithm.demo.kind === 'graph-coloring-backtracking') {
    return runGraphColoringBacktrackingDemo(input);
  }

  if (algorithm.demo.kind === 'string-search-matching') {
    return runStringSearchMatchingDemo(input);
  }

  if (algorithm.demo.kind === 'compilers-parsing') {
    return runCompilersParsingDemo(input);
  }

  if (algorithm.demo.kind === 'compression') {
    return runCompressionDemo(input);
  }

  if (algorithm.demo.kind === 'cryptography') {
    return runCryptographyDemo(input);
  }

  if (algorithm.demo.kind === 'geometric-primitives') {
    return runGeometricPrimitivesDemo(input);
  }

  if (algorithm.demo.kind === 'containment-query') {
    return runContainmentQueryDemo(input);
  }

  if (algorithm.demo.kind === 'convex-hull-path') {
    return runConvexHullPathDemo(input);
  }

  if (algorithm.demo.kind === 'proximity-problems') {
    return runProximityProblemsDemo(input);
  }

  if (algorithm.demo.kind === 'spatial-searching') {
    return runSpatialSearchingDemo(input);
  }

  if (algorithm.demo.kind === 'branch-and-bound-np') {
    return runBranchAndBoundNpDemo(input);
  }

  if (algorithm.demo.kind === 'traveling-salesman') {
    return runTravelingSalesmanDemo(input);
  }

  if (algorithm.demo.kind === 'knapsack-variants') {
    return runKnapsackVariantsDemo(input);
  }

  if (algorithm.demo.kind === 'scheduling-chain') {
    return runSchedulingChainDemo(input);
  }

  if (algorithm.demo.kind === 'multistage-graphs') {
    return runMultistageGraphsDemo(input);
  }

  if (algorithm.demo.kind === 'graph-coloring-np') {
    return runGraphColoringNpDemo(input);
  }

  if (algorithm.demo.kind === 'fast-fourier-transform') {
    return runFastFourierTransformDemo(input);
  }

  if (algorithm.demo.kind === 'parallel-merging-networks') {
    return runParallelMergingNetworksDemo(input);
  }

  if (algorithm.demo.kind === 'math-classic-riddles') {
    return runMathClassicRiddlesDemo(input);
  }

  if (algorithm.demo.kind === 'linear-programming-simplex') {
    return runLinearProgrammingSimplexDemo(input);
  }

  if (algorithm.demo.kind === 'memory-management-gc') {
    return runMemoryManagementGcDemo(input);
  }

  if (algorithm.title.startsWith('Rabin-Karp')) {
    return runRabinKarpDemo(input);
  }

  return runKmpDemo(input);
}
