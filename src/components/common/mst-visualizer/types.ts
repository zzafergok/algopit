import { Graph, GraphNode, GraphEdge } from '@/lib/algorithms/graph';

export interface MSTVisualizerProps {
  className?: string;
  initialNodeCount?: number;
  showControls?: boolean;
  algorithm?: 'kruskal' | 'prim';
}

export interface VisualNode extends GraphNode {
  fx?: number;
  fy?: number;
  vx?: number;
  vy?: number;
}

export interface AlgorithmStep {
  edge: GraphEdge;
  action: 'add' | 'reject' | 'consider';
  reason: string;
  totalWeight: number;
  edgesInMST: GraphEdge[];
}

export interface AlgorithmStats {
  totalEdges: number;
  edgesConsidered: number;
  edgesRejected: number;
  finalMSTWeight: number;
  executionTime: number;
}
