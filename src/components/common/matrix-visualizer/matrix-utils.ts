import type { Graph, GraphNode, GraphEdge } from '@/lib/algorithms/graph';

export function createInitialMatrix(size: number): number[][] {
  const matrix = Array(size)
    .fill(null)
    .map(() => Array(size).fill(Infinity));

  for (let i = 0; i < size; i++) {
    matrix[i][i] = 0;
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i !== j && Math.random() < 0.4) {
        matrix[i][j] = Math.floor(Math.random() * 10) + 1;
      }
    }
  }

  return matrix;
}

export function convertToGraph(matrix: number[][]): Graph {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];
  const adjacencyList = new Map<string, { nodeId: string; weight: number }[]>();

  for (let i = 0; i < matrix.length; i++) {
    const nodeId = i.toString();
    nodes.set(nodeId, {
      id: nodeId,
      x: i,
      y: 0,
    });
    adjacencyList.set(nodeId, []);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i !== j && matrix[i][j] !== Infinity) {
        const edge: GraphEdge = {
          from: i.toString(),
          to: j.toString(),
          weight: matrix[i][j],
        };
        edges.push(edge);
        adjacencyList.get(i.toString())!.push({
          nodeId: j.toString(),
          weight: matrix[i][j],
        });
      }
    }
  }

  return { nodes, edges, adjacencyList };
}

export function formatMatrixValue(value: number): string {
  if (value === Infinity) return '∞';
  if (value === 0) return '0';
  return value.toString();
}
