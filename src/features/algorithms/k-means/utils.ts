import { Point, KMeansStep } from './types';

export function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export function assignPointsToClusters(
  points: Point[],
  centroids: Point[],
): void {
  for (const point of points) {
    let minDistance = Infinity;
    let closestCluster = 0;

    for (let i = 0; i < centroids.length; i++) {
      const distance = euclideanDistance(point, centroids[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestCluster = i;
      }
    }

    point.cluster = closestCluster;
  }
}

export function updateCentroids(
  points: Point[],
  centroids: Point[],
  k: number,
): boolean {
  let hasUpdated = false;

  for (let i = 0; i < k; i++) {
    const clusterPoints = points.filter((p) => p.cluster === i);

    if (clusterPoints.length === 0) continue;

    const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
    const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
    const newX = sumX / clusterPoints.length;
    const newY = sumY / clusterPoints.length;

    if (centroids[i].x !== newX || centroids[i].y !== newY) {
      centroids[i].x = newX;
      centroids[i].y = newY;
      hasUpdated = true;
    }
  }

  return hasUpdated;
}

export function kMeansAlgorithm(
  points: Point[],
  k: number,
  maxIterations: number = 100,
): {
  points: Point[];
  centroids: Point[];
  iterations: number;
  steps: KMeansStep[];
} {
  if (points.length < k) {
    throw new Error('Nokta sayısı küme sayısından az olamaz.');
  }

  const steps: KMeansStep[] = [];
  const centroids: Point[] = [];
  const usedIndices = new Set<number>();

  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * points.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      centroids.push({
        x: points[randomIndex].x,
        y: points[randomIndex].y,
        cluster: centroids.length,
      });
    }
  }

  steps.push({
    points: JSON.parse(JSON.stringify(points)),
    centroids: JSON.parse(JSON.stringify(centroids)),
    step: 'initialization',
  });

  let iterations = 0;
  let isConverged = false;

  while (!isConverged && iterations < maxIterations) {
    assignPointsToClusters(points, centroids);

    steps.push({
      points: JSON.parse(JSON.stringify(points)),
      centroids: JSON.parse(JSON.stringify(centroids)),
      step: 'assignment',
    });

    const hasUpdated = updateCentroids(points, centroids, k);

    steps.push({
      points: JSON.parse(JSON.stringify(points)),
      centroids: JSON.parse(JSON.stringify(centroids)),
      step: 'update',
    });

    isConverged = !hasUpdated;
    iterations++;
  }

  return { points, centroids, iterations, steps };
}

export function generateRandomPoints(
  numPoints: number,
  maxX: number,
  maxY: number,
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      cluster: -1,
    });
  }
  return points;
}

export function generateClusteredPoints(
  numClusters: number,
  pointsPerCluster: number,
  maxX: number,
  maxY: number,
  spread: number,
): Point[] {
  const points: Point[] = [];
  const clusterCenters: { x: number; y: number }[] = [];

  for (let i = 0; i < numClusters; i++) {
    clusterCenters.push({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  }

  for (let i = 0; i < numClusters; i++) {
    for (let j = 0; j < pointsPerCluster; j++) {
      const offsetX = (Math.random() - 0.5) * 2 * spread;
      const offsetY = (Math.random() - 0.5) * 2 * spread;

      const x = Math.max(0, Math.min(maxX, clusterCenters[i].x + offsetX));
      const y = Math.max(0, Math.min(maxY, clusterCenters[i].y + offsetY));

      points.push({ x, y, cluster: -1 });
    }
  }

  return points;
}
