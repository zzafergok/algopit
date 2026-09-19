import React from 'react';
import Link from 'next/link';

import { Badge } from '@/components/core/badge';
import { CategoryOverviewProps } from './types';

const getDifficultyBadgeVariant = (difficulty?: string) => {
  switch (difficulty) {
    case 'Kolay':
      return 'success';
    case 'Orta':
      return 'warning';
    case 'Zor':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getCategoryBadgeVariant = (category?: string) => {
  switch (category) {
    case 'Traversal':
      return 'default';
    case 'Shortest Path':
      return 'secondary';
    case 'MST':
      return 'outline';
    default:
      return 'secondary';
  }
};

export const CategoryOverviewView: React.FC<CategoryOverviewProps> = ({
  algorithms,
  children,
}) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algorithm) => (
          <Link
            key={algorithm.name}
            href={algorithm.path}
            className="algorithm-card group flex flex-col justify-between p-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
          >
            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <h3 className="text-lg font-mono font-bold text-ink group-hover:text-turquoise transition-colors tracking-tight">
                  {algorithm.name}
                </h3>
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  {algorithm.category && (
                    <Badge
                      variant={getCategoryBadgeVariant(algorithm.category)}
                      size="sm"
                    >
                      {algorithm.category}
                    </Badge>
                  )}
                  {algorithm.difficulty && (
                    <Badge
                      variant={getDifficultyBadgeVariant(algorithm.difficulty)}
                      size="sm"
                    >
                      {algorithm.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-sm text-ash leading-relaxed">
                {algorithm.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {children && (
        <div className="mt-12 p-6 bg-obsidian/60 rounded-sm border border-line">
          {children}
        </div>
      )}
    </div>
  );
};
