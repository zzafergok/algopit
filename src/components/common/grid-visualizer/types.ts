export interface GridVisualizerProps {
  className?: string;
  initialWidth?: number;
  initialHeight?: number;
  showControls?: boolean;
  algorithm?: 'astar';
}

export type CellMode = 'start' | 'goal' | 'obstacle' | 'clear';
export type AlgorithmState = 'idle' | 'running' | 'paused' | 'completed';

export interface AlgorithmStats {
  pathLength: number;
  nodesVisited: number;
  executionTime: number;
}
