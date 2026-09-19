export interface ParsedArray {
  array: number[];
}

export interface TreeStatistics {
  nodeCount: number;
  leafCount: number;
  height: number;
  arraySize: number;
}

export interface QueryResult {
  array: number[];
  queryRange: string;
  sum: number;
  min: number;
  max: number;
  treeStats: TreeStatistics | null;
}

export interface SegmentTreeInterface {
  querySum(start: number, end: number): number;
  queryMin(start: number, end: number): number;
  queryMax(start: number, end: number): number;
  getStatistics?(): TreeStatistics;
}

export interface ParseArrayStringResult {
  array: number[];
}

export interface TreeStats {
  sum: number;
  min: number;
  max: number;
}

export interface PointUpdateResult {
  originalArray: number[];
  updatedIndex: number;
  oldValue: number;
  newValue: number;
  beforeUpdate: TreeStats;
  afterUpdate: TreeStats;
  updatedArray: number[];
}

export interface SegmentTreeWithArray extends SegmentTreeInterface {
  updatePoint(index: number, newValue: number): void;
  getArray?(): number[];
}
