'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  aStar,
  Graph,
  GraphNode,
  createGridGraph,
  resetGraphState,
  manhattanDistance,
  euclideanDistance,
} from '@/lib/algorithms/graph';
import { cn } from '@/lib/utils';
import type {
  GridVisualizerProps,
  CellMode,
  AlgorithmState,
  AlgorithmStats,
} from './types';
import { generateMazeGraph, clearObstaclesGraph } from './grid-utils';
import { GridControls } from './grid-controls';
import { GridCanvas } from './grid-canvas';

export function GridVisualizer({
  className,
  initialWidth = 20,
  initialHeight = 15,
  showControls = true,
}: GridVisualizerProps) {
  const [gridWidth, setGridWidth] = useState(initialWidth);
  const [gridHeight, setGridHeight] = useState(initialHeight);
  const [graph, setGraph] = useState<Graph>(() =>
    createGridGraph(initialWidth, initialHeight),
  );
  const [startNode, setStartNode] = useState<string>('2-2');
  const [goalNode, setGoalNode] = useState<string>(
    `${initialWidth - 3}-${initialHeight - 3}`,
  );

  const [algorithmState, setAlgorithmState] = useState<AlgorithmState>('idle');
  const [cellMode, setCellMode] = useState<CellMode>('obstacle');
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [heuristicType, setHeuristicType] = useState<'manhattan' | 'euclidean'>(
    'manhattan',
  );
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const [visitedNodes, setVisitedNodes] = useState<GraphNode[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [algorithmStats, setAlgorithmStats] = useState<AlgorithmStats>({
    pathLength: 0,
    nodesVisited: 0,
    executionTime: 0,
  });

  const heuristicFunction = useMemo(() => {
    return heuristicType === 'manhattan'
      ? manhattanDistance
      : euclideanDistance;
  }, [heuristicType]);

  const resetGrid = useCallback(() => {
    setAlgorithmState('idle');
    setCurrentStep(0);
    setVisitedNodes([]);
    setAlgorithmStats({ pathLength: 0, nodesVisited: 0, executionTime: 0 });

    const newGraph = createGridGraph(gridWidth, gridHeight);
    resetGraphState(newGraph);
    setGraph(newGraph);
  }, [gridWidth, gridHeight]);

  const updateGridSize = useCallback((newWidth: number, newHeight: number) => {
    setGridWidth(newWidth);
    setGridHeight(newHeight);
    setStartNode('2-2');
    setGoalNode(`${newWidth - 3}-${newHeight - 3}`);

    const newGraph = createGridGraph(newWidth, newHeight);
    setGraph(newGraph);
    setAlgorithmState('idle');
    setCurrentStep(0);
    setVisitedNodes([]);
  }, []);

  const handleCellClick = useCallback(
    (nodeId: string) => {
      if (algorithmState === 'running') return;

      const newGraph = { ...graph };
      const node = newGraph.nodes.get(nodeId);
      if (!node) return;

      switch (cellMode) {
        case 'start':
          if (startNode && newGraph.nodes.has(startNode)) {
            newGraph.nodes.get(startNode)!.isObstacle = false;
          }
          setStartNode(nodeId);
          node.isObstacle = false;
          break;

        case 'goal':
          if (goalNode && newGraph.nodes.has(goalNode)) {
            newGraph.nodes.get(goalNode)!.isObstacle = false;
          }
          setGoalNode(nodeId);
          node.isObstacle = false;
          break;

        case 'obstacle':
          if (nodeId !== startNode && nodeId !== goalNode) {
            node.isObstacle = !node.isObstacle;
          }
          break;

        case 'clear':
          if (nodeId !== startNode && nodeId !== goalNode) {
            node.isObstacle = false;
          }
          break;
      }

      setGraph(newGraph);
    },
    [graph, cellMode, startNode, goalNode, algorithmState],
  );

  const handleCellMouseEnter = useCallback(
    (nodeId: string) => {
      if (!isMouseDown || algorithmState === 'running') return;

      if (cellMode === 'obstacle' || cellMode === 'clear') {
        handleCellClick(nodeId);
      }
    },
    [isMouseDown, cellMode, handleCellClick, algorithmState],
  );

  const runAlgorithm = useCallback(async () => {
    if (algorithmState === 'running') return;

    resetGraphState(graph);
    setAlgorithmState('running');
    setCurrentStep(0);

    const startTime = performance.now();
    const result = aStar(graph, startNode, goalNode, heuristicFunction);
    const endTime = performance.now();

    const visited: GraphNode[] = [];
    graph.nodes.forEach((node) => {
      if (node.visited && node.id !== startNode && node.id !== goalNode) {
        visited.push(node);
      }
    });

    setVisitedNodes(visited);

    for (let i = 0; i < visited.length; i++) {
      setCurrentStep(i + 1);
      await new Promise((resolve) => setTimeout(resolve, 101 - animationSpeed));
    }

    if (result.path.length > 0) {
      result.path.forEach((node) => {
        node.inPath = true;
      });
    }

    setAlgorithmStats({
      pathLength: result.path.length,
      nodesVisited: visited.length,
      executionTime: endTime - startTime,
    });

    setAlgorithmState('completed');
  }, [
    graph,
    startNode,
    goalNode,
    heuristicFunction,
    animationSpeed,
    algorithmState,
  ]);

  const generateMaze = useCallback(() => {
    setGraph((prev) => generateMazeGraph(prev, startNode, goalNode));
  }, [startNode, goalNode]);

  const clearObstacles = useCallback(() => {
    setGraph((prev) => clearObstaclesGraph(prev));
  }, []);

  useEffect(() => {
    if (algorithmState === 'idle') {
      updateGridSize(gridWidth, gridHeight);
    }
  }, [gridWidth, gridHeight, algorithmState, updateGridSize]);

  return (
    <div className={cn('space-y-6', className)}>
      {showControls && (
        <GridControls
          algorithmState={algorithmState}
          gridWidth={gridWidth}
          gridHeight={gridHeight}
          animationSpeed={animationSpeed}
          heuristicType={heuristicType}
          cellMode={cellMode}
          algorithmStats={algorithmStats}
          onRunAlgorithm={runAlgorithm}
          onResetGrid={resetGrid}
          onGenerateMaze={generateMaze}
          onClearObstacles={clearObstacles}
          onGridWidthChange={setGridWidth}
          onGridHeightChange={setGridHeight}
          onAnimationSpeedChange={setAnimationSpeed}
          onHeuristicChange={setHeuristicType}
          onCellModeChange={setCellMode}
        />
      )}

      <GridCanvas
        graph={graph}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        startNode={startNode}
        goalNode={goalNode}
        algorithmState={algorithmState}
        currentStep={currentStep}
        visitedNodes={visitedNodes}
        onCellClick={handleCellClick}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onMouseEnter={handleCellMouseEnter}
        onMouseLeave={() => setIsMouseDown(false)}
      />
    </div>
  );
}
