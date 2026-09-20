'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { AlgorithmExplanation } from '@/components/common/explanation';

import { Point, ClusterNode, HierarchicalStep } from './types';
import {
  generateRandomPoints,
  generateClusteredPoints,
  hierarchicalClustering,
} from './utils';
import {
  ClusterVisualization,
  DendrogramVisualization,
  HierarchicalClusteringSteps,
  HierarchicalParamsCard,
} from './components';
import { implementations, pseudocode, explanationData } from './data';

export function HierarchicalClusteringView() {
  const width = 500;
  const height = 400;

  const [steps, setSteps] = useState<HierarchicalStep[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [numPoints, setNumPoints] = useState<number>(30);
  const [numClusters, setNumClusters] = useState<number>(3);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cutoffValue, setCutoffValue] = useState<number>(100);
  const [, setCutoffDistance] = useState<number>(Infinity);
  const [dendrogram, setDendrogram] = useState<ClusterNode | null>(null);
  const [clusterAssignments, setClusterAssignments] = useState<number[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [dataType, setDataType] = useState<'random' | 'clustered'>('clustered');

  const generateData = useCallback(() => {
    let newPoints: Point[];

    if (dataType === 'random') {
      newPoints = generateRandomPoints(numPoints, width, height);
    } else {
      const pointsPerCluster = Math.floor(numPoints / numClusters);
      newPoints = generateClusteredPoints(
        numClusters,
        pointsPerCluster,
        width,
        height,
        50,
      );
    }

    setPoints(newPoints);
    setSteps([]);
    setCurrentStep(0);
    setDendrogram(null);
    setClusterAssignments([]);
    setSelectedCluster(null);
  }, [dataType, numPoints, numClusters, width, height]);

  useEffect(() => {
    generateData();
  }, [generateData]);

  const runAlgorithm = useCallback(() => {
    if (points.length === 0 || isRunning) return;

    setIsRunning(true);

    const actualCutoff =
      cutoffValue === 100 ? Infinity : (cutoffValue / 100) * 200;
    setCutoffDistance(actualCutoff);

    setTimeout(() => {
      try {
        const result = hierarchicalClustering(points, actualCutoff);

        setDendrogram(result.dendrogram);
        setClusterAssignments(result.clusterAssignments);
        setSteps(result.steps);
        setCurrentStep(0);
      } catch (error) {
        console.error('Algoritma çalıştırılırken hata oluştu:', error);
      } finally {
        setIsRunning(false);
      }
    }, 100);
  }, [points, isRunning, cutoffValue]);

  const handleSelectCluster = (clusterId: number) => {
    setSelectedCluster(clusterId === selectedCluster ? null : clusterId);
  };

  const getPointsInCluster = useCallback(() => {
    if (!selectedCluster || !dendrogram) return [];

    const findClusterNode = (node: ClusterNode): ClusterNode | null => {
      if (node.id === selectedCluster) return node;
      if (!node.children) return null;

      const leftResult = findClusterNode(node.children[0]);
      if (leftResult) return leftResult;

      return findClusterNode(node.children[1]);
    };

    const clusterNode = findClusterNode(dendrogram);
    return clusterNode ? clusterNode.points : [];
  }, [selectedCluster, dendrogram]);

  const selectedPoints = getPointsInCluster();

  const handleCutoffChange = (value: number[]) => {
    setCutoffValue(value[0]);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="space-y-8">
      <AlgorithmExplanation
        title={explanationData.title}
        description={explanationData.description}
        timeComplexity={explanationData.timeComplexity}
        spaceComplexity={explanationData.spaceComplexity}
        advantages={explanationData.advantages}
        disadvantages={explanationData.disadvantages}
        pseudocode={pseudocode}
        applications={explanationData.applications}
        codeExamples={implementations}
        defaultCodeTab="typescript"
        demo={
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HierarchicalParamsCard
                dataType={dataType}
                setDataType={setDataType}
                isRunning={isRunning}
                numPoints={numPoints}
                setNumPoints={setNumPoints}
                numClusters={numClusters}
                setNumClusters={setNumClusters}
                cutoffValue={cutoffValue}
                handleCutoffChange={handleCutoffChange}
                generateData={generateData}
                runAlgorithm={runAlgorithm}
                pointsLength={points.length}
              />

              <Card>
                <CardHeader>
                  <CardTitle>Veri Görselleştirmesi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ClusterVisualization
                    points={points.map((p) => ({
                      ...p,
                      cluster: clusterAssignments[points.indexOf(p)] || -1,
                    }))}
                    width={width}
                    height={height}
                    highlightCluster={
                      selectedCluster !== null ? selectedCluster : undefined
                    }
                  />

                  {selectedCluster !== null && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">
                        Seçili Küme: {selectedCluster} ({selectedPoints.length}{' '}
                        nokta)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {dendrogram && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dendrogram</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DendrogramVisualization
                      dendrogram={dendrogram}
                      width={width}
                      height={height}
                      onSelectCluster={handleSelectCluster}
                    />
                    <p className="text-sm text-ash mt-2">
                      Düğümlere tıklayarak kümeleri seçebilirsiniz
                    </p>
                  </CardContent>
                </Card>

                <div>
                  <HierarchicalClusteringSteps
                    steps={steps}
                    currentStep={currentStep}
                    onChangeStep={handleStepChange}
                    width={width}
                    height={height}
                    onSelectCluster={handleSelectCluster}
                  />
                </div>
              </div>
            )}
          </>
        }
      />
    </div>
  );
}
