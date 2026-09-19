'use client';

import React from 'react';
import { Badge } from '@/components/core/badge';

interface SubsetVisualizerProps {
  originalArray: number[];
  subset: number[];
  targetSum: number;
}

export const SubsetVisualizer: React.FC<SubsetVisualizerProps> = ({
  originalArray,
  subset,
  targetSum,
}) => {
  const sum = subset.reduce((acc, val) => acc + val, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {originalArray.map((num, index) => {
          const isInSubset = subset.includes(num);

          return (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded-sm font-mono text-lg
                ${
                  isInSubset
                    ? 'bg-signal-green dark:bg-signal-green/80 text-titanium'
                    : 'bg-gunmetal/40 dark:bg-gunmetal text-titanium/80 dark:text-titanium/80'
                }`}
            >
              {num}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Toplam:</span>
        <Badge variant={sum === targetSum ? 'default' : 'outline'}>
          {sum} / {targetSum}
        </Badge>
      </div>
    </div>
  );
};
