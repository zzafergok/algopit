export interface MatrixVisualizerProps {
  className?: string;
  initialSize?: number;
  showControls?: boolean;
  algorithm?: 'floyd-warshall';
}

export interface AlgorithmStats {
  iterations: number;
  totalComparisons: number;
  pathsFound: number;
  executionTime: number;
}
