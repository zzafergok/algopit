'use client';

import React, { useMemo } from 'react';
import {
  TreeVisualizerNode,
  TrieVisualizationNode,
  SegmentTreeVisualizationNode,
} from './types';

interface TreeCanvasProps {
  currentTreeType: 'trie' | 'segment';
  visualizationData: TreeVisualizerNode[];
  showLabels: boolean;
  showValues: boolean;
}

export function TreeCanvas({
  currentTreeType,
  visualizationData,
  showLabels,
  showValues,
}: TreeCanvasProps) {
  const svgDimensions = useMemo(() => {
    let minX = 0,
      maxX = 0,
      minY = 0,
      maxY = 0;

    const calculateBounds = (nodes: TreeVisualizerNode[]) => {
      nodes.forEach((node) => {
        minX = Math.min(minX, node.x - 40);
        maxX = Math.max(maxX, node.x + 40);
        minY = Math.min(minY, node.y - 20);
        maxY = Math.max(maxY, node.y + 20);

        if (node.children) {
          calculateBounds(node.children);
        }
      });
    };

    calculateBounds(visualizationData);

    const width = Math.max(400, maxX - minX + 100);
    const height = Math.max(300, maxY - minY + 100);
    const viewBoxX = minX - 50;
    const viewBoxY = minY - 50;

    return { width, height, viewBoxX, viewBoxY };
  }, [visualizationData]);

  const renderTreeNodes = (
    nodes: TreeVisualizerNode[],
  ): React.ReactElement[] => {
    const elements: React.ReactElement[] = [];

    nodes.forEach((node, index) => {
      if (node.parentX !== undefined && node.parentY !== undefined) {
        elements.push(
          <line
            key={`line-${index}-${node.char || node.value}`}
            x1={node.parentX}
            y1={node.parentY}
            x2={node.x}
            y2={node.y}
            stroke="hsl(var(--ash))"
            strokeWidth="0.125rem"
          />,
        );
      }

      if (currentTreeType === 'trie') {
        const trieNode = node as TrieVisualizationNode;
        elements.push(
          <g key={`node-${index}-${trieNode.char}`}>
            <circle
              cx={trieNode.x}
              cy={trieNode.y}
              r="25"
              fill={
                trieNode.isEndOfWord
                  ? 'hsl(var(--signal-green))'
                  : 'hsl(var(--gunmetal) / 0.3)'
              }
              stroke={
                trieNode.isEndOfWord
                  ? 'hsl(var(--signal-green))'
                  : 'hsl(var(--ash))'
              }
              strokeWidth="0.125rem"
              className="cursor-pointer hover:opacity-80"
            />
            <text
              x={trieNode.x}
              y={trieNode.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-sm font-bold fill-titanium pointer-events-none"
            >
              {trieNode.char}
            </text>
            {trieNode.isEndOfWord && trieNode.count && showValues && (
              <text
                x={trieNode.x}
                y={trieNode.y + 35}
                textAnchor="middle"
                className="text-xs fill-signal-green pointer-events-none"
              >
                ({trieNode.count})
              </text>
            )}
            {trieNode.word && showLabels && (
              <text
                x={trieNode.x}
                y={trieNode.y - 35}
                textAnchor="middle"
                className="text-xs fill-arcly-blue font-medium pointer-events-none"
              >
                "{trieNode.word}"
              </text>
            )}
          </g>,
        );
      } else {
        const segNode = node as SegmentTreeVisualizationNode;
        elements.push(
          <g key={`node-${index}-${segNode.value}`}>
            <rect
              x={segNode.x - 35}
              y={segNode.y - 15}
              width="70"
              height="30"
              fill={
                segNode.isLeaf
                  ? 'hsl(var(--arcly-blue) / 0.12)'
                  : 'hsl(var(--arcly-blue) / 0.18)'
              }
              stroke={
                segNode.isLeaf
                  ? 'hsl(var(--arcly-blue))'
                  : 'hsl(var(--arcly-blue))'
              }
              strokeWidth="0.125rem"
              rx="5"
              className="cursor-pointer hover:opacity-80"
            />
            <text
              x={segNode.x}
              y={segNode.y - 5}
              textAnchor="middle"
              className="text-xs font-bold fill-titanium pointer-events-none"
            >
              {segNode.value}
            </text>
            {showValues && (
              <text
                x={segNode.x}
                y={segNode.y + 8}
                textAnchor="middle"
                className="text-xs fill-ash pointer-events-none"
              >
                S:{segNode.sum} Min:{segNode.min} Max:{segNode.max}
              </text>
            )}
          </g>,
        );
      }

      if (node.children && node.children.length > 0) {
        elements.push(...renderTreeNodes(node.children));
      }
    });

    return elements;
  };

  return (
    <div className="flex justify-center">
      <div className="border-2 border-gunmetal rounded-sm bg-card overflow-auto">
        <svg
          width={svgDimensions.width}
          height={svgDimensions.height}
          viewBox={`${svgDimensions.viewBoxX} ${svgDimensions.viewBoxY} ${svgDimensions.width} ${svgDimensions.height}`}
        >
          <defs>
            <pattern
              id="tree-grid"
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
          <rect
            x={svgDimensions.viewBoxX}
            y={svgDimensions.viewBoxY}
            width={svgDimensions.width}
            height={svgDimensions.height}
            fill="url(#tree-grid)"
          />

          <g className="tree-visualization">
            {renderTreeNodes(visualizationData)}
          </g>
        </svg>
      </div>
    </div>
  );
}
