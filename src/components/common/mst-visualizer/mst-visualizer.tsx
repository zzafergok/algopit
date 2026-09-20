'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { MSTVisualizerProps } from './types';
import { useMSTSimulation } from './use-mst-simulation';
import { MSTControls } from './mst-controls';
import { MSTCanvas } from './mst-canvas';
import { MSTInfoCards } from './mst-info-cards';

export function MSTVisualizer({
  className,
  initialNodeCount = 6,
  showControls = true,
  algorithm = 'kruskal',
}: MSTVisualizerProps) {
  const sim = useMSTSimulation(initialNodeCount, algorithm);

  return (
    <div className={cn('space-y-6', className)}>
      {showControls && (
        <MSTControls
          isRunning={sim.isRunning}
          algorithmType={sim.algorithmType}
          onAlgorithmTypeChange={sim.setAlgorithmType}
          onRun={sim.runMSTAlgorithm}
          onReset={sim.resetAlgorithm}
          onGenerateNewGraph={sim.generateNewGraph}
          nodeCount={sim.nodeCount}
          onNodeCountChange={sim.setNodeCount}
          onAddNode={sim.addNode}
          onRemoveNode={sim.removeNode}
          animationSpeed={sim.animationSpeed}
          onAnimationSpeedChange={sim.setAnimationSpeed}
          selectedStartNode={sim.selectedStartNode}
          onSelectedStartNodeChange={sim.setSelectedStartNode}
          graph={sim.graph}
          showWeights={sim.showWeights}
          onShowWeightsChange={sim.setShowWeights}
          showStepDetails={sim.showStepDetails}
          onShowStepDetailsChange={sim.setShowStepDetails}
          algorithmStats={sim.algorithmStats}
          currentStep={sim.currentStep}
          algorithmSteps={sim.algorithmSteps}
        />
      )}

      <MSTCanvas
        graph={sim.graph}
        showWeights={sim.showWeights}
        algorithmType={sim.algorithmType}
        selectedStartNode={sim.selectedStartNode}
        onSelectStartNode={sim.setSelectedStartNode}
        getEdgePath={sim.getEdgePath}
        getEdgeStyle={sim.getEdgeStyle}
        getEdgeMidpoint={sim.getEdgeMidpoint}
        getNodeStyle={sim.getNodeStyle}
      />

      <MSTInfoCards
        algorithmType={sim.algorithmType}
        mstEdges={sim.mstEdges}
        currentStep={sim.currentStep}
        totalSteps={sim.algorithmSteps.length}
        totalMSTWeight={sim.totalMSTWeight}
        nodeCount={sim.nodeCount}
        graph={sim.graph}
        algorithmStats={sim.algorithmStats}
      />
    </div>
  );
}
