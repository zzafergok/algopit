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
};
