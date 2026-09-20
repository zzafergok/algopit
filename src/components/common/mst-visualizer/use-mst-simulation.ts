'use client';

import { useState, useCallback } from 'react';
import {
  prim,
  Graph,
  kruskal,
  GraphEdge,
  resetGraphState,
} from '@/lib/algorithms/graph';
import { AlgorithmStep, AlgorithmStats } from './types';
import { generateRandomGraph } from './mst-utils';
import {
  getEdgeStyle,
  getNodeStyle,
  getEdgePath,
  getEdgeMidpoint,
} from './mst-canvas-utils';

export function useMSTSimulation(
  initialNodeCount = 6,
  initialAlgorithm: 'kruskal' | 'prim' = 'kruskal',
) {
  const [mstEdges, setMstEdges] = useState<GraphEdge[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [nodeCount, setNodeCount] = useState(initialNodeCount);
  const [showWeights, setShowWeights] = useState<boolean>(true);
  const [totalMSTWeight, setTotalMSTWeight] = useState<number>(0);
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [showStepDetails, setShowStepDetails] = useState<boolean>(true);
  const [selectedStartNode, setSelectedStartNode] = useState<string>('0');
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>([]);
  const [graph, setGraph] = useState<Graph>(() =>
    generateRandomGraph(initialNodeCount),
  );
  const [algorithmType, setAlgorithmType] = useState<'kruskal' | 'prim'>(
    initialAlgorithm,
  );

  const [algorithmStats, setAlgorithmStats] = useState<AlgorithmStats>({
    totalEdges: 0,
    edgesConsidered: 0,
    edgesRejected: 0,
    finalMSTWeight: 0,
    executionTime: 0,
  });

  const resetAlgorithm = useCallback(() => {
    setCurrentStep(-1);
    setAlgorithmSteps([]);
    setMstEdges([]);
    setTotalMSTWeight(0);
    setIsRunning(false);
    resetGraphState(graph);
    setAlgorithmStats({
      totalEdges: 0,
      edgesConsidered: 0,
      edgesRejected: 0,
      finalMSTWeight: 0,
      executionTime: 0,
    });
  }, [graph]);

  const generateNewGraph = useCallback(() => {
    const newGraph = generateRandomGraph(nodeCount);
    setGraph(newGraph);
    setSelectedStartNode('0');
    resetAlgorithm();
  }, [nodeCount, resetAlgorithm]);

  const addNode = useCallback(() => {
    if (nodeCount >= 10) return;
    setNodeCount(nodeCount + 1);
    generateNewGraph();
  }, [nodeCount, generateNewGraph]);

  const removeNode = useCallback(() => {
    if (nodeCount <= 3) return;
    setNodeCount(nodeCount - 1);
    generateNewGraph();
  }, [nodeCount, generateNewGraph]);

  const runMSTAlgorithm = useCallback(async () => {
    setIsRunning(true);
    setCurrentStep(-1);
    setMstEdges([]);
    setTotalMSTWeight(0);
    resetGraphState(graph);

    const startTime = performance.now();
    let result;
    let steps: AlgorithmStep[] = [];

    if (algorithmType === 'kruskal') {
      const kruskalResult = kruskal(graph);
      result = kruskalResult;
      let totalWeight = 0;
      const edgesInMST: GraphEdge[] = [];

      steps = kruskalResult.steps.map((step) => {
        if (step.action === 'add') {
          totalWeight += step.edge.weight;
          edgesInMST.push(step.edge);
        }
        return {
          edge: step.edge,
          action: step.action,
          reason: step.reason,
          totalWeight,
          edgesInMST: [...edgesInMST],
        };
      });
    } else {
      const primResult = prim(graph, selectedStartNode);
      result = primResult;
      let totalWeight = 0;
      const edgesInMST: GraphEdge[] = [];

      steps = primResult.steps.map((step) => {
        if (step.action === 'add' && step.edge) {
          totalWeight += step.edge.weight;
          edgesInMST.push(step.edge);
          return {
            edge: step.edge,
            action: 'add' as const,
            reason: step.reason,
            totalWeight,
            edgesInMST: [...edgesInMST],
          };
        }
        return {
          edge: step.edge || { from: '', to: '', weight: 0 },
          action: 'consider' as const,
          reason: step.reason,
          totalWeight,
          edgesInMST: [...edgesInMST],
        };
      });
    }

    const endTime = performance.now();
    setAlgorithmSteps(steps);
    setTotalMSTWeight(result.totalWeight);

    const edgesConsidered = steps.length;
    const edgesRejected = steps.filter((s) => s.action === 'reject').length;

    setAlgorithmStats({
      totalEdges: graph.edges.length,
      edgesConsidered,
      edgesRejected,
      finalMSTWeight: result.totalWeight,
      executionTime: endTime - startTime,
    });

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setMstEdges(steps[i].edgesInMST);
      setTotalMSTWeight(steps[i].totalWeight);
      await new Promise((resolve) => setTimeout(resolve, 101 - animationSpeed));
    }

    setIsRunning(false);
  }, [graph, algorithmType, selectedStartNode, animationSpeed]);

  const handleGetEdgeStyle = useCallback(
    (edge: GraphEdge) =>
      getEdgeStyle(edge, mstEdges, currentStep, algorithmSteps),
    [mstEdges, currentStep, algorithmSteps],
  );

  const handleGetNodeStyle = useCallback(
    (nodeId: string) =>
      getNodeStyle(nodeId, algorithmType, selectedStartNode, mstEdges),
    [algorithmType, selectedStartNode, mstEdges],
  );

  const handleGetEdgePath = useCallback(
    (edge: GraphEdge) => getEdgePath(edge, graph),
    [graph],
  );

  const handleGetEdgeMidpoint = useCallback(
    (edge: GraphEdge) => getEdgeMidpoint(edge, graph),
    [graph],
  );

  return {
    graph,
    nodeCount,
    setNodeCount,
    mstEdges,
    currentStep,
    isRunning,
    totalMSTWeight,
    animationSpeed,
    setAnimationSpeed,
    showWeights,
    setShowWeights,
    showStepDetails,
    setShowStepDetails,
    selectedStartNode,
    setSelectedStartNode,
    algorithmSteps,
    algorithmType,
    setAlgorithmType,
    algorithmStats,
    runMSTAlgorithm,
    resetAlgorithm,
    generateNewGraph,
    addNode,
    removeNode,
    getEdgeStyle: handleGetEdgeStyle,
    getNodeStyle: handleGetNodeStyle,
    getEdgePath: handleGetEdgePath,
    getEdgeMidpoint: handleGetEdgeMidpoint,
  };
}
