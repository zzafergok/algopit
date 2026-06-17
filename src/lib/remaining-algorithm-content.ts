import type { RemainingAlgorithmKey, RemainingAlgorithmContent } from './remaining-algorithm-content/types';

export type { RemainingAlgorithmKey, RemainingAlgorithmContent };

import { linearSearchContent, kmpContent } from './remaining-algorithm-content/search';
import { rabinKarpContent, bloomFilterContent } from './remaining-algorithm-content/string-matching';
import { linkedListContent, stackContent } from './remaining-algorithm-content/structures-linear';
import { queueContent, hashTableContent } from './remaining-algorithm-content/structures-other';
import { fibonacciContent, longestCommonSubsequenceContent } from './remaining-algorithm-content/dynamic-programming';
import { bellmanFordContent, fractionalKnapsackContent } from './remaining-algorithm-content/graphs-greedy';
import { sieveOfEratosthenesContent, reservoirSamplingContent } from './remaining-algorithm-content/probabilistic';
import { geneticAlgorithmsContent } from './remaining-algorithm-content/genetic-algorithms';
import { simulatedAnnealingContent } from './remaining-algorithm-content/simulated-annealing';
import { primalityTestContent, baseConversionContent } from './remaining-algorithm-content/math-basic';
import { factorialContent, exponentiationContent } from './remaining-algorithm-content/math-basic-2';
import { polynomialOperationsContent, matrixOperationsContent } from './remaining-algorithm-content/math-advanced';
import { gaussianEliminationContent, interpolationFittingContent } from './remaining-algorithm-content/math-advanced-2';
import { numericalIntegrationContent, randomNumberGeneratorsContent } from './remaining-algorithm-content/math-advanced-3';
import {
  quicksortVariantsContent,
  radixSortVariantsContent,
  bucketSortContent,
  orderStatisticsContent,
  externalSortingContent,
  simpleSortsContent,
} from './remaining-algorithm-content/sorting';
import {
  searchTechniquesContent,
  searchTreesContent,
  externalSearchingHashingContent,
  openAddressingHashingContent,
} from './remaining-algorithm-content/searching-trees';
import {
  heapOperationsContent,
  unionFindContent,
  setOperationsContent,
} from './remaining-algorithm-content/structures-advanced';
import {
  graphTraversalsContent,
  shortestPathsMstContent,
  networkFlowContent,
  matchingMarriageContent,
  graphColoringBacktrackingContent,
} from './remaining-algorithm-content/graph-advanced';
import {
  stringSearchMatchingContent,
  compilersParsingContent,
  compressionContent,
  cryptographyContent,
} from './remaining-algorithm-content/string-parsing-crypt';
import {
  geometricPrimitivesContent,
  containmentQueryContent,
  convexHullPathContent,
  proximityProblemsContent,
  spatialSearchingContent,
} from './remaining-algorithm-content/geometry';
import {
  branchAndBoundNpContent,
  travelingSalesmanContent,
  knapsackVariantsContent,
  schedulingChainContent,
  multistageGraphsContent,
  graphColoringNpContent,
} from './remaining-algorithm-content/design-optimization';
import {
  fastFourierTransformContent,
  parallelMergingNetworksContent,
  mathClassicRiddlesContent,
  linearProgrammingSimplexContent,
  memoryManagementGcContent,
} from './remaining-algorithm-content/advanced-parallel-memory';

export const remainingAlgorithmContents: Record<
  RemainingAlgorithmKey,
  RemainingAlgorithmContent
> = {
  'linear-search': linearSearchContent,
  kmp: kmpContent,
  'rabin-karp': rabinKarpContent,
  'fractional-knapsack': fractionalKnapsackContent,
  'linked-list': linkedListContent,
  stack: stackContent,
  queue: queueContent,
  'hash-table': hashTableContent,
  fibonacci: fibonacciContent,
  'longest-common-subsequence': longestCommonSubsequenceContent,
  'bellman-ford': bellmanFordContent,
  'sieve-of-eratosthenes': sieveOfEratosthenesContent,
  'bloom-filter': bloomFilterContent,
  'reservoir-sampling': reservoirSamplingContent,
  'genetic-algorithms': geneticAlgorithmsContent,
  'simulated-annealing': simulatedAnnealingContent,
  'primality-test': primalityTestContent,
  'base-conversion': baseConversionContent,
  factorial: factorialContent,
  exponentiation: exponentiationContent,
  'polynomial-operations': polynomialOperationsContent,
  'matrix-operations': matrixOperationsContent,
  'gaussian-elimination': gaussianEliminationContent,
  'interpolation-fitting': interpolationFittingContent,
  'numerical-integration': numericalIntegrationContent,
  'random-number-generators': randomNumberGeneratorsContent,
  'quicksort-variants': quicksortVariantsContent,
  'radix-sort-variants': radixSortVariantsContent,
  'bucket-sort': bucketSortContent,
  'order-statistics': orderStatisticsContent,
  'external-sorting': externalSortingContent,
  'simple-sorts': simpleSortsContent,
  'search-techniques': searchTechniquesContent,
  'search-trees': searchTreesContent,
  'external-searching-hashing': externalSearchingHashingContent,
  'open-addressing-hashing': openAddressingHashingContent,
  'heap-operations': heapOperationsContent,
  'union-find': unionFindContent,
  'set-operations': setOperationsContent,
  'graph-traversals': graphTraversalsContent,
  'shortest-paths-mst': shortestPathsMstContent,
  'network-flow': networkFlowContent,
  'matching-marriage': matchingMarriageContent,
  'graph-coloring-backtracking': graphColoringBacktrackingContent,
  'string-search-matching': stringSearchMatchingContent,
  'compilers-parsing': compilersParsingContent,
  compression: compressionContent,
  cryptography: cryptographyContent,
  'geometric-primitives': geometricPrimitivesContent,
  'containment-query': containmentQueryContent,
  'convex-hull-path': convexHullPathContent,
  'proximity-problems': proximityProblemsContent,
  'spatial-searching': spatialSearchingContent,
  'branch-and-bound-np': branchAndBoundNpContent,
  'traveling-salesman': travelingSalesmanContent,
  'knapsack-variants': knapsackVariantsContent,
  'scheduling-chain': schedulingChainContent,
  'multistage-graphs': multistageGraphsContent,
  'graph-coloring-np': graphColoringNpContent,
  'fast-fourier-transform': fastFourierTransformContent,
  'parallel-merging-networks': parallelMergingNetworksContent,
  'math-classic-riddles': mathClassicRiddlesContent,
  'linear-programming-simplex': linearProgrammingSimplexContent,
  'memory-management-gc': memoryManagementGcContent,
};
