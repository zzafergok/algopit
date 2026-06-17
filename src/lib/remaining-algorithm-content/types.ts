import type { CodeLanguage } from '@/components/common/algorithm-page-template';

export type RemainingAlgorithmKey =
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'hash-table'
  | 'fibonacci'
  | 'longest-common-subsequence'
  | 'bellman-ford'
  | 'sieve-of-eratosthenes'
  | 'bloom-filter'
  | 'reservoir-sampling'
  | 'genetic-algorithms'
  | 'simulated-annealing'
  | 'linear-search'
  | 'kmp'
  | 'rabin-karp'
  | 'fractional-knapsack'
  | 'primality-test'
  | 'base-conversion'
  | 'factorial'
  | 'exponentiation'
  | 'polynomial-operations'
  | 'matrix-operations'
  | 'gaussian-elimination'
  | 'interpolation-fitting'
  | 'numerical-integration'
  | 'random-number-generators';

export type RemainingAlgorithmContent = {
  title: string;
  category: string;
  categoryHref: string;
  family: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  sources: string[];
  summary: string;
  descriptionParagraphs: string[];
  sourceNotes: string[];
  steps: string[];
  pseudocode: string;
  codeExamples: Partial<Record<CodeLanguage, string>>;
  demo: {
    kind:
      | 'linear-search'
      | 'string-search'
      | 'fractional-knapsack'
      | 'operations'
      | 'fibonacci'
      | 'lcs'
      | 'bellman-ford'
      | 'sieve'
      | 'bloom-filter'
      | 'reservoir-sampling'
      | 'genetic-algorithm'
      | 'simulated-annealing'
      | 'primality-test'
      | 'base-conversion'
      | 'factorial'
      | 'exponentiation'
      | 'polynomial-operations'
      | 'matrix-operations'
      | 'gaussian-elimination'
      | 'interpolation-fitting'
      | 'numerical-integration'
      | 'random-number-generators';
    title: string;
    description: string;
    placeholder: string;
  };
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  analysisTitle: string;
  analysisPoints: string[];
  advantages: string[];
  disadvantages: string[];
  relatedAlgorithms: {
    title: string;
    description: string;
    href?: string;
  }[];
};
