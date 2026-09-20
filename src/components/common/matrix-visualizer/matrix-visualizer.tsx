'use client';

import React, { useState, useCallback } from 'react';
import { floydWarshall } from '@/lib/algorithms/graph';
import { cn } from '@/lib/utils';
import type { MatrixVisualizerProps, AlgorithmStats } from './types';
import {
  createInitialMatrix,
  convertToGraph,
} from './matrix-utils';
import { MatrixControls } from './matrix-controls';
import { MatrixTables } from './matrix-tables';

export function MatrixVisualizer({
  className,
  initialSize = 5,
  showControls = true,
}: MatrixVisualizerProps) {
  const [matrixSize, setMatrixSize] = useState(initialSize);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [distanceMatrix, setDistanceMatrix] = useState<number[][]>([]);
  const [nextMatrix, setNextMatrix] = useState<(string | null)[][]>([]);
  const [reconstructedPath, setReconstructedPath] = useState<number[]>([]);
  const [adjacencyMatrix, setAdjacencyMatrix] = useState<number[][]>(() =>
    createInitialMatrix(initialSize),
  );
  const [selectedPath, setSelectedPath] = useState<{
    from: number;
    to: number;
  } | null>(null);
  const [algorithmStats, setAlgorithmStats] = useState<AlgorithmStats>({
    iterations: 0,
    totalComparisons: 0,
    pathsFound: 0,
    executionTime: 0,
  });

  const runFloydWarshall = useCallback(async () => {
    setIsRunning(true);
    setCurrentStep(-1);
    setSelectedPath(null);
    setReconstructedPath([]);

    const startTime = performance.now();
    const graph = convertToGraph(adjacencyMatrix);
    const result = floydWarshall(graph);
    const endTime = performance.now();

    const newDistanceMatrix = Array(matrixSize)
      .fill(null)
      .map(() => Array(matrixSize).fill(Infinity));
    const newNextMatrix = Array(matrixSize)
      .fill(null)
      .map(() => Array(matrixSize).fill(null));

    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        const iStr = i.toString();
        const jStr = j.toString();
        newDistanceMatrix[i][j] =
          result.distances.get(iStr)?.get(jStr) ?? Infinity;
        newNextMatrix[i][j] = result.next.get(iStr)?.get(jStr) ?? null;
      }
    }

    setDistanceMatrix(newDistanceMatrix);
    setNextMatrix(newNextMatrix);

    let pathsFound = 0;
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (i !== j && newDistanceMatrix[i][j] !== Infinity) {
          pathsFound++;
        }
      }
    }

    setAlgorithmStats({
      iterations: matrixSize,
      totalComparisons: matrixSize * matrixSize * matrixSize,
      pathsFound,
      executionTime: endTime - startTime,
    });

    for (let k = 0; k < matrixSize; k++) {
      setCurrentStep(k);
      await new Promise((resolve) =>
        setTimeout(resolve, 101 - animationSpeed * 5),
      );
    }

    setCurrentStep(-1);
    setIsRunning(false);
  }, [adjacencyMatrix, matrixSize, animationSpeed]);

  const handlePathSelection = useCallback(
    (from: number, to: number) => {
      if (
        !nextMatrix.length ||
        from === to ||
        distanceMatrix[from][to] === Infinity
      ) {
        setSelectedPath(null);
        setReconstructedPath([]);
        return;
      }

      setSelectedPath({ from, to });

      const path: number[] = [from];
      let current = from;

      while (current !== to) {
        const nextNode = nextMatrix[current][to];
        if (nextNode === null) {
          setReconstructedPath([]);
          return;
        }
        current = parseInt(nextNode);
        path.push(current);

        if (path.length > matrixSize) {
          setReconstructedPath([]);
          return;
        }
      }

      setReconstructedPath(path);
    },
    [nextMatrix, distanceMatrix, matrixSize],
  );

  const updateMatrixCell = useCallback(
    (row: number, col: number, value: string) => {
      const numValue =
        value === '' ? Infinity : Math.max(0, parseInt(value) || 0);
      const newMatrix = adjacencyMatrix.map((r, i) =>
        r.map((val, j) => (i === row && j === col ? numValue : val)),
      );
      setAdjacencyMatrix(newMatrix);
      setDistanceMatrix([]);
      setNextMatrix([]);
      setSelectedPath(null);
      setReconstructedPath([]);
    },
    [adjacencyMatrix],
  );

  const resizeMatrix = useCallback((newSize: number) => {
    setMatrixSize(newSize);
    setAdjacencyMatrix(createInitialMatrix(newSize));
    setDistanceMatrix([]);
    setNextMatrix([]);
    setCurrentStep(-1);
    setSelectedPath(null);
    setReconstructedPath([]);
  }, []);

  const generateRandomMatrix = useCallback(() => {
    setAdjacencyMatrix(createInitialMatrix(matrixSize));
    setDistanceMatrix([]);
    setNextMatrix([]);
    setCurrentStep(-1);
    setSelectedPath(null);
    setReconstructedPath([]);
  }, [matrixSize]);

  const resetMatrix = useCallback(() => {
    const emptyMatrix = Array(matrixSize)
      .fill(null)
      .map(() => Array(matrixSize).fill(Infinity));
    for (let i = 0; i < matrixSize; i++) {
      emptyMatrix[i][i] = 0;
    }
    setAdjacencyMatrix(emptyMatrix);
    setDistanceMatrix([]);
    setNextMatrix([]);
    setCurrentStep(-1);
    setSelectedPath(null);
    setReconstructedPath([]);
  }, [matrixSize]);

  return (
    <div className={cn('space-y-6', className)}>
      {showControls && (
        <MatrixControls
          isRunning={isRunning}
          matrixSize={matrixSize}
          animationSpeed={animationSpeed}
          currentStep={currentStep}
          distanceMatrix={distanceMatrix}
          algorithmStats={algorithmStats}
          selectedPath={selectedPath}
          reconstructedPath={reconstructedPath}
          onRunFloydWarshall={runFloydWarshall}
          onResetMatrix={resetMatrix}
          onGenerateRandomMatrix={generateRandomMatrix}
          onResizeMatrix={resizeMatrix}
          onAnimationSpeedChange={setAnimationSpeed}
          onPathSelection={handlePathSelection}
        />
      )}

      <MatrixTables
        matrixSize={matrixSize}
        adjacencyMatrix={adjacencyMatrix}
        distanceMatrix={distanceMatrix}
        isRunning={isRunning}
        currentStep={currentStep}
        selectedPath={selectedPath}
        reconstructedPath={reconstructedPath}
        onCellChange={updateMatrixCell}
        onPathSelection={handlePathSelection}
      />
    </div>
  );
}
