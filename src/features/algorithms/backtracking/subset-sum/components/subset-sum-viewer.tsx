'use client';

import React from 'react';
import { Button } from '@/components/core/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/core/card';
import { SubsetVisualizer } from './subset-visualizer';

interface SubsetSumViewerProps {
  array: number[];
  targetSum: number;
  solutions: number[][];
  currentSolutionIndex: number;
  onChangeSolution: (index: number) => void;
}

export const SubsetSumViewer: React.FC<SubsetSumViewerProps> = ({
  array,
  targetSum,
  solutions,
  currentSolutionIndex,
  onChangeSolution,
}) => {
  const handlePrevious = () => {
    onChangeSolution(
      (currentSolutionIndex - 1 + solutions.length) % solutions.length,
    );
  };

  const handleNext = () => {
    onChangeSolution((currentSolutionIndex + 1) % solutions.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={solutions.length <= 1}
        >
          Önceki Çözüm
        </Button>
        <span className="text-sm font-medium">
          {solutions.length > 0
            ? `Çözüm ${currentSolutionIndex + 1} / ${solutions.length}`
            : 'Çözüm bulunamadı'}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={solutions.length <= 1}
        >
          Sonraki Çözüm
        </Button>
      </div>

      {solutions.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Bulunan Alt Küme</CardTitle>
          </CardHeader>
          <CardContent>
            <SubsetVisualizer
              originalArray={array}
              subset={solutions[currentSolutionIndex]}
              targetSum={targetSum}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-alert-red/10 dark:bg-alert-red/10 border-alert-red/30 dark:border-alert-red/30">
          <CardContent className="pt-6">
            <p className="text-alert-red dark:text-alert-red/80 font-medium">
              Bu dizi ve hedef toplam için çözüm bulunamadı.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
