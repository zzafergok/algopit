export interface TreeVisualizerProps {
  className?: string;
  treeType?: 'trie' | 'segment';
  showControls?: boolean;
  initialData?: string[] | number[];
}

export interface TrieVisualizationNode {
  char: string;
  isEndOfWord: boolean;
  children: TrieVisualizationNode[];
  level: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
  word?: string;
  count?: number;
  value?: string;
  isLeaf?: boolean;
}

export interface SegmentTreeVisualizationNode {
  value: string;
  start: number;
  end: number;
  sum: number;
  min: number;
  max: number;
  children: SegmentTreeVisualizationNode[];
  level: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
  isLeaf: boolean;
  char?: string;
  isEndOfWord?: boolean;
}

export type TreeVisualizerNode =
  TrieVisualizationNode | SegmentTreeVisualizationNode;
