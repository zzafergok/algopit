import { Point, ClusterNode, HierarchicalStep } from './types';

export function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export function calculateClusterDistance(
  clusterA: ClusterNode,
  clusterB: ClusterNode,
): number {
  let minDistance = Infinity;

  for (const pointA of clusterA.points) {
    for (const pointB of clusterB.points) {
      const distance = euclideanDistance(pointA, pointB);
      minDistance = Math.min(minDistance, distance);
    }
  }

  return minDistance;
}

export function hierarchicalClustering(
  points: Point[],
  cutoffDistance: number = Infinity,
): {
  dendrogram: ClusterNode;
  clusterAssignments: number[];
  steps: HierarchicalStep[];
} {
  const steps: HierarchicalStep[] = [];

  let clusters: ClusterNode[] = points.map((point, index) => ({
    id: index,
    points: [{ ...point, cluster: index }],
  }));

  steps.push({
    clusters: JSON.parse(JSON.stringify(clusters)),
    step: 'initialization',
    description: 'Her nokta kendi kümesini oluşturur',
  });

  let nextId = points.length;
  while (clusters.length > 1) {
    let minDistance = Infinity;
    let closestPair: [number, number] = [-1, -1];

    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        const distance = calculateClusterDistance(clusters[i], clusters[j]);

        if (distance < minDistance) {
          minDistance = distance;
          closestPair = [i, j];
        }
      }
    }

    if (minDistance > cutoffDistance) {
      break;
    }

    const [i, j] = closestPair;
    const mergedCluster: ClusterNode = {
      id: nextId++,
      points: [...clusters[i].points, ...clusters[j].points],
      children: [clusters[i], clusters[j]],
      distance: minDistance,
    };

    mergedCluster.points.forEach((p) => (p.cluster = mergedCluster.id));

    const newClusters = clusters.filter(
      (_, index) => index !== i && index !== j,
    );
    newClusters.push(mergedCluster);
    clusters = newClusters;

    steps.push({
      clusters: JSON.parse(JSON.stringify(clusters)),
      mergedIndices: closestPair,
      distance: minDistance,
      step: 'merge',
      description: `Kümeler birleştirildi (Mesafe: ${minDistance.toFixed(2)})`,
    });
  }

  const clusterAssignments = new Array(points.length).fill(-1);

  for (const cluster of clusters) {
    for (const point of cluster.points) {
      const originalIndex = points.findIndex(
        (p) => p.x === point.x && p.y === point.y,
      );
      if (originalIndex !== -1) {
        clusterAssignments[originalIndex] = cluster.id;
      }
    }
  }

  let dendrogram: ClusterNode;
  if (clusters.length === 1) {
    dendrogram = clusters[0];
  } else {
    dendrogram = {
      id: nextId,
      points: clusters.flatMap((c) => c.points),
      children: clusters.length >= 2 ? [clusters[0], clusters[1]] : undefined,
    };
  }

  return { dendrogram, clusterAssignments, steps };
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
