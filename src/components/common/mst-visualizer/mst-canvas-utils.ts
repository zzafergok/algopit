import { Graph, GraphEdge } from '@/lib/algorithms/graph';
import { cn } from '@/lib/utils';
import { AlgorithmStep } from './types';

export function getEdgeStyle(
  edge: GraphEdge,
  mstEdges: GraphEdge[],
  currentStep: number,
  algorithmSteps: AlgorithmStep[],
): string {
  const isMSTEdge = mstEdges.some(
    (e) =>
      (e.from === edge.from && e.to === edge.to) ||
      (e.from === edge.to && e.to === edge.from),
  );

  const currentStepEdge =
    currentStep >= 0 && currentStep < algorithmSteps.length
      ? algorithmSteps[currentStep].edge
      : null;

  const isCurrentEdge =
    currentStepEdge &&
    ((currentStepEdge.from === edge.from && currentStepEdge.to === edge.to) ||
      (currentStepEdge.from === edge.to && currentStepEdge.to === edge.from));

  if (isCurrentEdge) {
    const action = algorithmSteps[currentStep].action;
    if (action === 'add') return 'stroke-signal-green stroke-4';
    if (action === 'reject') return 'stroke-alert-red stroke-3 stroke-dasharray-4';
    return 'stroke-arcly-blue stroke-3';
  }

  if (isMSTEdge) return 'stroke-arcly-blue stroke-3';
  return 'stroke-gunmetal stroke-2';
}

export function getNodeStyle(
  nodeId: string,
  algorithmType: 'kruskal' | 'prim',
  selectedStartNode: string,
  mstEdges: GraphEdge[],
): string {
  const baseClasses =
    'fill-titanium stroke-gunmetal stroke-2 cursor-pointer hover:fill-gunmetal/20';

  if (algorithmType === 'prim') {
    if (nodeId === selectedStartNode) {
      return cn(baseClasses, 'fill-signal-green/20 stroke-signal-green');
    }
    const isConnected = mstEdges.some(
      (edge) => edge.from === nodeId || edge.to === nodeId,
    );
    if (isConnected) {
      return cn(baseClasses, 'fill-arcly-blue/20 stroke-arcly-blue');
    }
  }
  return baseClasses;
}

export function getEdgePath(edge: GraphEdge, graph: Graph): string {
  const fromNode = graph.nodes.get(edge.from);
  const toNode = graph.nodes.get(edge.to);
  if (!fromNode || !toNode) return '';
  return `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`;
}

export function getEdgeMidpoint(
  edge: GraphEdge,
  graph: Graph,
): { x: number; y: number } {
  const fromNode = graph.nodes.get(edge.from);
  const toNode = graph.nodes.get(edge.to);
  if (!fromNode || !toNode) return { x: 0, y: 0 };
  return {
    x: (fromNode.x + toNode.x) / 2,
    y: (fromNode.y + toNode.y) / 2,
  };
}
