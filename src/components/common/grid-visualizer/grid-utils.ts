import type { Graph } from '@/lib/algorithms/graph';

export function generateMazeGraph(
  graph: Graph,
  startNode: string,
  goalNode: string,
): Graph {
  const newGraph = { ...graph };

  newGraph.nodes.forEach((node) => {
    node.isObstacle = false;
  });

  newGraph.nodes.forEach((node, nodeId) => {
    if (nodeId !== startNode && nodeId !== goalNode && Math.random() < 0.3) {
      node.isObstacle = true;
    }
  });

  return newGraph;
}

export function clearObstaclesGraph(graph: Graph): Graph {
  const newGraph = { ...graph };
  newGraph.nodes.forEach((node) => {
    node.isObstacle = false;
  });
  return newGraph;
}
