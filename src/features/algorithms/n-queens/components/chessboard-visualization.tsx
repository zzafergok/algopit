import React from 'react';
import { cn } from '@/lib/utils';

interface ChessboardVisualizationProps {
  size: number;
  solution: number[];
}

export function ChessboardVisualization({
  size,
  solution,
}: ChessboardVisualizationProps) {
  return (
    <div className="inline-grid gap-0.5 p-1 bg-gunmetal dark:bg-obsidian rounded-sm">
      <div
        className="inline-grid"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {Array.from({ length: size * size }).map((_, idx) => {
          const row = Math.floor(idx / size);
          const col = idx % size;
          const isDark = (row + col) % 2 === 1;
          const hasQueen = solution && solution[row] === col;

          return (
            <div
              key={idx}
              className={cn(
                'w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-lg select-none',
                isDark
                  ? 'bg-ash/20 dark:bg-card'
                  : 'bg-surface dark:bg-void-black',
                hasQueen ? 'text-signal-green font-mono' : '',
              )}
            >
              {hasQueen ? '♛' : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}
