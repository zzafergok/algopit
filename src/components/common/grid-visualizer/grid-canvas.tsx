'use client';

import React from 'react';
import { MapPin, Target, Construction } from 'lucide-react';
import type { Graph, GraphNode } from '@/lib/algorithms/graph';
import { cn } from '@/lib/utils';
import type { AlgorithmState } from './types';

interface GridCanvasProps {
  graph: Graph;
  gridWidth: number;
  gridHeight: number;
  startNode: string;
  goalNode: string;
  algorithmState: AlgorithmState;
  currentStep: number;
  visitedNodes: GraphNode[];
  onCellClick: (nodeId: string) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseEnter: (nodeId: string) => void;
  onMouseLeave: () => void;
}

export function GridCanvas({
  graph,
  gridWidth,
  gridHeight,
  startNode,
  goalNode,
  algorithmState,
  currentStep,
  visitedNodes,
  onCellClick,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
}: GridCanvasProps) {
  const getCellClasses = (nodeId: string, node: GraphNode) => {
    const baseClasses =
      'w-6 h-6 border border-gunmetal/30 flex items-center justify-center text-xs transition-colors cursor-pointer select-none';

    if (nodeId === startNode) {
      return cn(baseClasses, 'bg-signal-green hover:bg-signal-green/90');
    }

    if (nodeId === goalNode) {
      return cn(baseClasses, 'bg-alert-red hover:bg-alert-red/90');
    }

    if (node.inPath && algorithmState === 'completed') {
      return cn(baseClasses, 'bg-arcly-blue/70 hover:bg-arcly-blue');
    }

    if (
      node.visited &&
      currentStep > visitedNodes.findIndex((n) => n.id === nodeId)
    ) {
      return cn(baseClasses, 'bg-arcly-blue/20 hover:bg-arcly-blue/30');
    }

    if (node.isObstacle) {
      return cn(baseClasses, 'bg-void-black hover:bg-gunmetal');
    }

    return cn(baseClasses, 'bg-card hover:bg-gunmetal/20');
  };

  const getCellIcon = (nodeId: string, node: GraphNode) => {
    if (nodeId === startNode) {
      return <MapPin className="w-4 h-4 text-titanium" />;
    }

    if (nodeId === goalNode) {
      return <Target className="w-4 h-4 text-titanium" />;
    }

    if (node.isObstacle) {
      return <Construction className="w-3 h-3 text-titanium" />;
    }

    return null;
  };

  return (
    <>
      <div className="flex justify-center">
        <div
          className="inline-block border-2 border-gunmetal bg-card"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
            gap: '0.0625rem',
          }}
          onMouseLeave={onMouseLeave}
        >
          {Array.from({ length: gridHeight }, (_, y) =>
            Array.from({ length: gridWidth }, (_, x) => {
              const nodeId = `${x}-${y}`;
              const node = graph.nodes.get(nodeId);

              if (!node) return null;

              return (
                <div
                  key={nodeId}
                  className={getCellClasses(nodeId, node)}
                  onClick={() => onCellClick(nodeId)}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onMouseEnter={() => onMouseEnter(nodeId)}
                  title={`Node: ${nodeId}${node.isObstacle ? ' (Obstacle)' : ''}`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {getCellIcon(nodeId, node)}
                  </div>
                </div>
              );
            }),
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-signal-green border border-gunmetal flex items-center justify-center">
            <MapPin className="w-3 h-3 text-titanium" />
          </div>
          <span>Başlangıç</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-alert-red border border-gunmetal flex items-center justify-center">
            <Target className="w-3 h-3 text-titanium" />
          </div>
          <span>Hedef</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-void-black border border-gunmetal"></div>
          <span>Engel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-arcly-blue/20 border border-gunmetal"></div>
          <span>Ziyaret Edildi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-arcly-blue/70 border border-gunmetal"></div>
          <span>En Kısa Yol</span>
        </div>
      </div>
    </>
  );
}
