import type { RemainingAlgorithmContent } from '@/lib/remaining-algorithm-content';

export type SearchDemoResult = {
  index: number;
  trace: string[];
  comparisons: number;
  metadata?: string[];
};

export type KnapsackDemoResult = {
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

export type GenericDemoResult = {
  result: string;
  trace: string[];
  metadata?: string[];
};
