import type { RemainingAlgorithmContent } from '@/lib/remaining-algorithm-content';

import { runOperationsDemo } from './data-structures';
import {
  runLinearSearchDemo,
  runKmpDemo,
  runRabinKarpDemo,
} from './string-search';
import {
  runPrimalityTestDemo,
  runBaseConversionDemo,
  runFactorialDemo,
  runExponentiationDemo,
} from './math-basic';
import {
  runPolynomialOperationsDemo,
  runMatrixOperationsDemo,
  runGaussianEliminationDemo,
} from './math-poly-matrix';
import { runInterpolationFittingDemo } from './math-interpolation';
import { runNumericalIntegrationDemo } from './math-calculus';
import { runRandomNumberGeneratorsDemo } from './math-random';
import { runFibonacciDemo, runLcsDemo, runBellmanFordDemo } from './graphs-dp';
import {
  runFractionalKnapsackDemo,
  runGeneticAlgorithmDemo,
  runSimulatedAnnealingDemo,
} from './greedy-opt';
import {
  runSieveDemo,
  runBloomFilterDemo,
  runReservoirSamplingDemo,
} from './probabilistic';
import {
  runQuicksortVariantsDemo,
  runRadixSortVariantsDemo,
  runBucketSortDemo,
  runOrderStatisticsDemo,
  runExternalSortingDemo,
  runSimpleSortsDemo,
} from './sorting';
import {
  runSearchTechniquesDemo,
  runSearchTreesDemo,
  runExternalSearchingHashingDemo,
  runOpenAddressingHashingDemo,
} from './searching-trees';
import {
  runHeapOperationsDemo,
  runUnionFindDemo,
  runSetOperationsDemo,
} from './structures-advanced';
import {
  runGraphTraversalsDemo,
  runShortestPathsMstDemo,
  runNetworkFlowDemo,
  runMatchingMarriageDemo,
  runGraphColoringBacktrackingDemo,
} from './graph-advanced';
import {
  runStringSearchMatchingDemo,
  runCompilersParsingDemo,
  runCompressionDemo,
  runCryptographyDemo,
} from './string-parsing-crypt';
import {
  runGeometricPrimitivesDemo,
  runContainmentQueryDemo,
  runConvexHullPathDemo,
  runProximityProblemsDemo,
  runSpatialSearchingDemo,
} from './geometry';
import {
  runBranchAndBoundNpDemo,
  runTravelingSalesmanDemo,
  runKnapsackVariantsDemo,
  runSchedulingChainDemo,
  runMultistageGraphsDemo,
  runGraphColoringNpDemo,
} from './design-optimization';
import {
  runFastFourierTransformDemo,
  runParallelMergingNetworksDemo,
  runMathClassicRiddlesDemo,
  runLinearProgrammingSimplexDemo,
  runMemoryManagementGcDemo,
} from './advanced-parallel-memory';

export function runDemo(algorithm: RemainingAlgorithmContent, input: string) {
  switch (algorithm.demo.kind) {
    case 'operations':
      return runOperationsDemo(algorithm, input);
    case 'fibonacci':
      return runFibonacciDemo(input);
    case 'lcs':
      return runLcsDemo(input);
    case 'bellman-ford':
      return runBellmanFordDemo(input);
    case 'sieve':
      return runSieveDemo(input);
    case 'bloom-filter':
      return runBloomFilterDemo(input);
    case 'reservoir-sampling':
      return runReservoirSamplingDemo(input);
    case 'genetic-algorithm':
      return runGeneticAlgorithmDemo(input);
    case 'simulated-annealing':
      return runSimulatedAnnealingDemo(input);
    case 'linear-search':
      return runLinearSearchDemo(input);
    case 'fractional-knapsack':
      return runFractionalKnapsackDemo(input);
    case 'primality-test':
      return runPrimalityTestDemo(input);
    case 'base-conversion':
      return runBaseConversionDemo(input);
    case 'factorial':
      return runFactorialDemo(input);
    case 'exponentiation':
      return runExponentiationDemo(input);
    case 'polynomial-operations':
      return runPolynomialOperationsDemo(input);
    case 'matrix-operations':
      return runMatrixOperationsDemo(input);
    case 'gaussian-elimination':
      return runGaussianEliminationDemo(input);
    case 'interpolation-fitting':
      return runInterpolationFittingDemo(input);
    case 'numerical-integration':
      return runNumericalIntegrationDemo(input);
    case 'random-number-generators':
      return runRandomNumberGeneratorsDemo(input);
    case 'quicksort-variants':
      return runQuicksortVariantsDemo(input);
    case 'radix-sort-variants':
      return runRadixSortVariantsDemo(input);
    case 'bucket-sort':
      return runBucketSortDemo(input);
    case 'order-statistics':
      return runOrderStatisticsDemo(input);
    case 'external-sorting':
      return runExternalSortingDemo(input);
    case 'simple-sorts':
      return runSimpleSortsDemo(input);
    case 'search-techniques':
      return runSearchTechniquesDemo(input);
    case 'search-trees':
      return runSearchTreesDemo(input);
    case 'external-searching-hashing':
      return runExternalSearchingHashingDemo(input);
    case 'open-addressing-hashing':
      return runOpenAddressingHashingDemo(input);
    case 'heap-operations':
      return runHeapOperationsDemo(input);
    case 'union-find':
      return runUnionFindDemo(input);
    case 'set-operations':
      return runSetOperationsDemo(input);
    case 'graph-traversals':
      return runGraphTraversalsDemo(input);
    case 'shortest-paths-mst':
      return runShortestPathsMstDemo(input);
    case 'network-flow':
      return runNetworkFlowDemo(input);
    case 'matching-marriage':
      return runMatchingMarriageDemo(input);
    case 'graph-coloring-backtracking':
      return runGraphColoringBacktrackingDemo(input);
    case 'string-search-matching':
      return runStringSearchMatchingDemo(input);
    case 'compilers-parsing':
      return runCompilersParsingDemo(input);
    case 'compression':
      return runCompressionDemo(input);
    case 'cryptography':
      return runCryptographyDemo(input);
    case 'geometric-primitives':
      return runGeometricPrimitivesDemo(input);
    case 'containment-query':
      return runContainmentQueryDemo(input);
    case 'convex-hull-path':
      return runConvexHullPathDemo(input);
    case 'proximity-problems':
      return runProximityProblemsDemo(input);
    case 'spatial-searching':
      return runSpatialSearchingDemo(input);
    case 'branch-and-bound-np':
      return runBranchAndBoundNpDemo(input);
    case 'traveling-salesman':
      return runTravelingSalesmanDemo(input);
    case 'knapsack-variants':
      return runKnapsackVariantsDemo(input);
    case 'scheduling-chain':
      return runSchedulingChainDemo(input);
    case 'multistage-graphs':
      return runMultistageGraphsDemo(input);
    case 'graph-coloring-np':
      return runGraphColoringNpDemo(input);
    case 'fast-fourier-transform':
      return runFastFourierTransformDemo(input);
    case 'parallel-merging-networks':
      return runParallelMergingNetworksDemo(input);
    case 'math-classic-riddles':
      return runMathClassicRiddlesDemo(input);
    case 'linear-programming-simplex':
      return runLinearProgrammingSimplexDemo(input);
    case 'memory-management-gc':
      return runMemoryManagementGcDemo(input);
    default:
      if (algorithm.title.startsWith('Rabin-Karp')) {
        return runRabinKarpDemo(input);
      }
      return runKmpDemo(input);
  }
}
