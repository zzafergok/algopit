'use client';

import React from 'react';
import { Point } from '../types';

interface ClusterVisualizationProps {
  points: Point[];
  centroids: Point[];
  width: number;
  height: number;
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

export const ClusterVisualization: React.FC<ClusterVisualizationProps> = ({
  points,
  centroids,
  width,
  height,
}) => {
  return (
    <div className="border rounded-sm overflow-hidden bg-card dark:bg-obsidian">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {points.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={5}
            fill={
              point.cluster >= 0
                ? colors[point.cluster % colors.length]
                : 'hsl(var(--gunmetal))'
            }
            stroke="hsl(var(--titanium))"
            strokeWidth="0.0625rem"
          />
        ))}

        {centroids.map((centroid, index) => (
          <g key={`centroid-${index}`}>
            <circle
              cx={centroid.x}
              cy={centroid.y}
              r={8}
              fill={colors[index % colors.length]}
              stroke="hsl(var(--void-black-500))"
              strokeWidth="0.125rem"
            />
            <text
              x={centroid.x}
              y={centroid.y + 20}
              textAnchor="middle"
              fill="hsl(var(--gunmetal))"
              fontSize="12"
              fontWeight="bold"
            >
              C{index + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
