export interface Point {
  x: number;
  y: number;
  cluster: number;
}

export interface ClusterNode {
  id: number;
  points: Point[];
  children?: [ClusterNode, ClusterNode];
  distance?: number;
}

export interface HierarchicalStep {
  clusters?: ClusterNode[];
  step: string;
  description: string;
  mergedIndices?: [number, number];
  mergedCluster?: number;
  mergedClusters?: [number, number];
  distance?: number;
  newClusterId?: number;
  clustersCount?: number;
}

export interface DendrogramNode {
  id: number;
  x: number;
  y: number;
  points: number;
  distance: number;
  isLeaf: boolean;
}

export interface DendrogramEdge {
  from: { id?: number; x: number; y: number };
  to: { id?: number; x: number; y: number };
  id?: string;
}
