export interface BenchmarkResult {
  name: string;
  complexity: string;
  time: number;
  bars: number;
  status: 'OPTIMAL' | 'NORMAL' | 'SLOW' | 'CRITICAL';
  diff: string;
}

export const BENCHMARK_DATA: Record<
  string,
  Record<string, BenchmarkResult[]>
> = {
  sorting: {
    '1K': [
      {
        name: 'QuickSort (Hoare)',
        complexity: 'O(n log n)',
        time: 0.08,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'MergeSort',
        complexity: 'O(n log n)',
        time: 0.12,
        bars: 12,
        status: 'NORMAL',
        diff: '+50%',
      },
      {
        name: 'HeapSort',
        complexity: 'O(n log n)',
        time: 0.18,
        bars: 9,
        status: 'SLOW',
        diff: '+125%',
      },
      {
        name: 'BubbleSort',
        complexity: 'O(n²)',
        time: 1.84,
        bars: 2,
        status: 'CRITICAL',
        diff: '+2200%',
      },
    ],
    '10K': [
      {
        name: 'QuickSort (Hoare)',
        complexity: 'O(n log n)',
        time: 0.42,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'MergeSort',
        complexity: 'O(n log n)',
        time: 0.58,
        bars: 13,
        status: 'NORMAL',
        diff: '+38%',
      },
      {
        name: 'HeapSort',
        complexity: 'O(n log n)',
        time: 0.89,
        bars: 8,
        status: 'SLOW',
        diff: '+112%',
      },
      {
        name: 'BubbleSort',
        complexity: 'O(n²)',
        time: 14.8,
        bars: 2,
        status: 'CRITICAL',
        diff: '+3420%',
      },
    ],
    '100K': [
      {
        name: 'QuickSort (Hoare)',
        complexity: 'O(n log n)',
        time: 4.65,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'MergeSort',
        complexity: 'O(n log n)',
        time: 6.42,
        bars: 12,
        status: 'NORMAL',
        diff: '+38%',
      },
      {
        name: 'HeapSort',
        complexity: 'O(n log n)',
        time: 9.85,
        bars: 7,
        status: 'SLOW',
        diff: '+111%',
      },
      {
        name: 'BubbleSort',
        complexity: 'O(n²)',
        time: 168.0,
        bars: 1,
        status: 'CRITICAL',
        diff: 'TIMEOUT',
      },
    ],
  },
  searching: {
    '1K': [
      {
        name: 'Binary Search',
        complexity: 'O(log n)',
        time: 0.001,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'Interpolation Search',
        complexity: 'O(log log n)',
        time: 0.002,
        bars: 15,
        status: 'OPTIMAL',
        diff: '+100%',
      },
      {
        name: 'Jump Search',
        complexity: 'O(√n)',
        time: 0.008,
        bars: 11,
        status: 'NORMAL',
        diff: '+700%',
      },
      {
        name: 'Linear Search',
        complexity: 'O(n)',
        time: 0.045,
        bars: 4,
        status: 'SLOW',
        diff: '+4400%',
      },
    ],
    '10K': [
      {
        name: 'Binary Search',
        complexity: 'O(log n)',
        time: 0.002,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'Interpolation Search',
        complexity: 'O(log log n)',
        time: 0.003,
        bars: 15,
        status: 'OPTIMAL',
        diff: '+50%',
      },
      {
        name: 'Jump Search',
        complexity: 'O(√n)',
        time: 0.024,
        bars: 10,
        status: 'NORMAL',
        diff: '+1100%',
      },
      {
        name: 'Linear Search',
        complexity: 'O(n)',
        time: 0.38,
        bars: 3,
        status: 'CRITICAL',
        diff: '+18900%',
      },
    ],
    '100K': [
      {
        name: 'Binary Search',
        complexity: 'O(log n)',
        time: 0.003,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'Interpolation Search',
        complexity: 'O(log log n)',
        time: 0.004,
        bars: 15,
        status: 'OPTIMAL',
        diff: '+33%',
      },
      {
        name: 'Jump Search',
        complexity: 'O(√n)',
        time: 0.078,
        bars: 8,
        status: 'SLOW',
        diff: '+2500%',
      },
      {
        name: 'Linear Search',
        complexity: 'O(n)',
        time: 3.92,
        bars: 2,
        status: 'CRITICAL',
        diff: '+130000%',
      },
    ],
  },
};
