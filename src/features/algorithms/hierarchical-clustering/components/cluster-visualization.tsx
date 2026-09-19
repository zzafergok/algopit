'use client';

import React from 'react';
import { Point } from '../types';

interface ClusterVisualizationProps {
  points: Point[];
  width: number;
  height: number;
  highlightCluster?: number;
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
  'hsl(var(--gunmetal))',
  'hsl(var(--alert-red-400))',
  'hsl(var(--arcly-blue-500))',
  'hsl(var(--arcly-blue-300))',
  'hsl(var(--ash))',
];

export const ClusterVisualization: React.FC<ClusterVisualizationProps> = ({
  points,
  width,
  height,
  highlightCluster,
}) => {
  const pointRadius = 5;

  return (
    <div className="border rounded-sm overflow-hidden bg-card dark:bg-obsidian">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {points.map((point, index) => {
          const isHighlighted =
            highlightCluster !== undefined &&
            point.cluster === highlightCluster;

          return (
            <circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r={isHighlighted ? pointRadius * 1.5 : pointRadius}
              fill={
                point.cluster >= 0
                  ? colors[point.cluster % colors.length]
                  : 'hsl(var(--gunmetal))'
              }
              stroke={
                isHighlighted
                  ? 'hsl(var(--void-black-500))'
                  : 'hsl(var(--titanium))'
              }
              strokeWidth={isHighlighted ? 2 : 1}
              opacity={isHighlighted ? 1 : 0.8}
            />
          );
        })}
      </svg>
    </div>
  );
};
