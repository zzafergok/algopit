'use client';

import React from 'react';
import { Graph, GraphEdge } from '@/lib/algorithms/graph';

interface MSTCanvasProps {
  graph: Graph;
  showWeights: boolean;
  algorithmType: 'kruskal' | 'prim';
  selectedStartNode: string;
  onSelectStartNode: (nodeId: string) => void;
  getEdgePath: (edge: GraphEdge) => string;
  getEdgeStyle: (edge: GraphEdge) => string;
  getEdgeMidpoint: (edge: GraphEdge) => { x: number; y: number };
  getNodeStyle: (nodeId: string) => string;
}

export function MSTCanvas({
  graph,
  showWeights,
  algorithmType,
  onSelectStartNode,
  getEdgePath,
  getEdgeStyle,
  getEdgeMidpoint,
  getNodeStyle,
}: MSTCanvasProps) {
  return (
    <div className="flex justify-center">
      <div className="border-2 border-gunmetal rounded-sm bg-card overflow-hidden">
        <svg width="500" height="400" viewBox="0 0 500 400">
          <defs>
            <pattern
              id="mst-grid-pattern"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="hsl(var(--gunmetal) / 0.35)"
                strokeWidth="0.0625rem"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mst-grid-pattern)" />

          <g className="edges">
            {graph.edges.map((edge, index) => {
              const midpoint = getEdgeMidpoint(edge);
              return (
                <g key={`edge-${index}`}>
                  <path
                    d={getEdgePath(edge)}
                    className={getEdgeStyle(edge)}
                    fill="none"
                  />

                  {showWeights && (
                    <g>
                      <circle
                        cx={midpoint.x}
                        cy={midpoint.y}
                        r="12"
                        fill="white"
                        stroke="hsl(var(--ash))"
                        strokeWidth="0.0625rem"
                      />
                      <text
                        x={midpoint.x}
                        y={midpoint.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-xs font-medium fill-titanium"
                      >
                        {edge.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          <g className="nodes">
            {Array.from(graph.nodes.entries()).map(([nodeId, node]) => (
              <g key={nodeId}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  className={getNodeStyle(nodeId)}
                  onClick={() =>
                    algorithmType === 'prim' && onSelectStartNode(nodeId)
                  }
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-sm font-bold fill-titanium pointer-events-none"
                >
                  {nodeId}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
