export interface Point {
  x: number;
  y: number;
  cluster: number;
}

export interface KMeansStep {
  points: Point[];
  centroids: Point[];
  step: string;
  changedAssignments?: number;
}
