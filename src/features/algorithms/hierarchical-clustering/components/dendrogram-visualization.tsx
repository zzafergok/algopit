'use client';

import React, { useState } from 'react';
import { ClusterNode, DendrogramNode, DendrogramEdge } from '../types';

interface DendrogramVisualizationProps {
  dendrogram: ClusterNode;
  width: number;
  height: number;
  onSelectCluster: (clusterId: number) => void;
}

const colors = [
  'hsl(var(--alert-red))',
  'hsl(var(--signal-green))',
  'hsl(var(--arcly-blue))',
  'hsl(var(--alert-red-300))',
  'hsl(var(--signal-green-300))',
  'hsl(var(--arcly-blue-300))',
  'hsl(var(--signal-green-500))',
  'hsl(var(--arcly-blue-400))',
  'hsl(var(--arcly-blue-700))',
  'hsl(var(--arcly-blue-600))',
];

export const DendrogramVisualization: React.FC<
  DendrogramVisualizationProps
> = ({ dendrogram, width, height, onSelectCluster }) => {
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);

  const horizontalScale = width * 0.9;
  const verticalScale = height * 0.9;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  const nodes: DendrogramNode[] = [];
  const edges: DendrogramEdge[] = [];

  function getTreeDepth(node: ClusterNode): number {
    if (!node.children) return 1;
    const [left, right] = node.children;
    return 1 + Math.max(getTreeDepth(left), getTreeDepth(right));
  }

  function traverseTree(
    node: ClusterNode,
    depth: number,
    x: number,
    w: number,
  ) {
    const y =
      margin.top +
      (depth * (verticalScale - margin.top - margin.bottom)) /
        getTreeDepth(dendrogram);

    nodes.push({
      id: node.id,
      x: x + w / 2,
      y,
      points: node.points.length,
      distance: node.distance || 0,
      isLeaf: !node.children,
    });

    if (node.children) {
      const [left, right] = node.children;
      const childWidth = w / 2;

      traverseTree(left, depth + 1, x, childWidth);
      traverseTree(right, depth + 1, x + childWidth, childWidth);

      const leftNode = nodes.find((n) => n.id === left.id);
      const rightNode = nodes.find((n) => n.id === right.id);

      if (leftNode && rightNode) {
        edges.push({
          from: { id: node.id, x: x + w / 2, y },
          to: { id: left.id, x: leftNode.x, y: leftNode.y },
        });

        edges.push({
          from: { id: node.id, x: x + w / 2, y },
          to: { id: right.id, x: rightNode.x, y: rightNode.y },
        });
      }
    }
  }

  traverseTree(
    dendrogram,
    0,
    margin.left,
    horizontalScale - margin.left - margin.right,
  );

  return (
    <div className="border rounded-sm overflow-hidden bg-card dark:bg-obsidian">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {edges.map((edge, index) => (
          <line
            key={`edge-${index}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke="hsl(var(--ash))"
            strokeWidth="0.09375rem"
          />
        ))}

        {nodes.map((node) => (
          <g
            key={`node-${node.id}`}
            onClick={() => onSelectCluster(node.id)}
            onMouseEnter={() => setHoveredCluster(node.id)}
            onMouseLeave={() => setHoveredCluster(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.isLeaf ? 4 : 6}
              fill={
                node.isLeaf
                  ? colors[node.id % colors.length]
                  : 'hsl(var(--titanium))'
              }
              stroke={
                hoveredCluster === node.id
                  ? 'hsl(var(--void-black-500))'
                  : 'hsl(var(--ash))'
              }
              strokeWidth={hoveredCluster === node.id ? 2 : 1}
            />

            {!node.isLeaf && (
              <text
                x={node.x}
                y={node.y - 10}
                textAnchor="middle"
                fontSize="10"
                fill="hsl(var(--ash))"
              >
                {node.points}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
