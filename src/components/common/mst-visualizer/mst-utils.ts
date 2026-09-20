import { Graph, GraphEdge } from '@/lib/algorithms/graph';
import { VisualNode } from './types';

export function generateRandomGraph(numNodes: number): Graph {
  const nodes = new Map<string, VisualNode>();
  const edges: GraphEdge[] = [];
  const adjacencyList = new Map<string, { nodeId: string; weight: number }[]>();

  const canvasWidth = 400;
  const canvasHeight = 300;
  const radius = Math.min(canvasWidth, canvasHeight) * 0.35;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Create nodes in a circular layout
  for (let i = 0; i < numNodes; i++) {
    const angle = (2 * Math.PI * i) / numNodes;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const nodeId = i.toString();
    nodes.set(nodeId, {
      id: nodeId,
      x,
      y,
    });
    adjacencyList.set(nodeId, []);
  }

  // Ensure connectivity by creating a minimum spanning path
  for (let i = 0; i < numNodes - 1; i++) {
    const weight = Math.floor(Math.random() * 15) + 1;
    const edge: GraphEdge = {
      from: i.toString(),
      to: (i + 1).toString(),
      weight,
    };
    edges.push(edge);

    adjacencyList
      .get(i.toString())!
      .push({ nodeId: (i + 1).toString(), weight });
    adjacencyList
      .get((i + 1).toString())!
      .push({ nodeId: i.toString(), weight });
  }

  // Add additional random edges for complexity
  const additionalEdges = Math.floor(numNodes * 0.7);
  for (let i = 0; i < additionalEdges; i++) {
    const from = Math.floor(Math.random() * numNodes);
    const to = Math.floor(Math.random() * numNodes);

    if (from !== to) {
      // Check if edge already exists
      const existsForward = edges.some(
        (e) =>
          (e.from === from.toString() && e.to === to.toString()) ||
          (e.from === to.toString() && e.to === from.toString()),
      );

      if (!existsForward) {
        const weight = Math.floor(Math.random() * 20) + 1;
        const edge: GraphEdge = {
          from: from.toString(),
          to: to.toString(),
          weight,
        };
        edges.push(edge);

        adjacencyList
          .get(from.toString())!
          .push({ nodeId: to.toString(), weight });
        adjacencyList
          .get(to.toString())!
          .push({ nodeId: from.toString(), weight });
      }
    }
  }

  return { nodes, edges, adjacencyList };
}
