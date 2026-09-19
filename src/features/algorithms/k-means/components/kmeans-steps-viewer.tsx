'use client';

import React from 'react';
import { Button } from '@/components/core/button';
import { Badge } from '@/components/core/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/core/card';
import { KMeansStep } from '../types';
import { ClusterVisualization } from './cluster-visualization';

interface KMeansStepsViewerProps {
  steps: KMeansStep[];
  currentStep: number;
  onChangeStep: (step: number) => void;
  width: number;
  height: number;
}

export const KMeansStepsViewer: React.FC<KMeansStepsViewerProps> = ({
  steps,
  currentStep,
  onChangeStep,
  width,
  height,
}) => {
  if (steps.length === 0) {
    return <p>Adım bulunamadı</p>;
  }

  const handlePrevious = () => {
    onChangeStep(Math.max(0, currentStep - 1));
  };

  const handleNext = () => {
    onChangeStep(Math.min(steps.length - 1, currentStep + 1));
  };

  const step = steps[currentStep];
  const stepType = step.step;

  let stepDescription = '';
  switch (stepType) {
    case 'initialization':
      stepDescription = 'Başlatma: Rastgele merkez noktaları seçildi';
      break;
    case 'assignment':
      stepDescription = 'Atama: Noktalar en yakın merkeze atandı';
      break;
    case 'update':
      stepDescription = 'Güncelleme: Merkez noktalar yeniden hesaplandı';
      break;
    default:
      stepDescription = 'Adım';
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Önceki Adım
        </Button>
        <span className="text-sm font-medium">
          Adım {currentStep + 1} / {steps.length}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Sonraki Adım
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{stepDescription}</span>
            <Badge>{stepType}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ClusterVisualization
            points={step.points}
            centroids={step.centroids}
            width={width}
            height={height}
          />
        </CardContent>
      </Card>
    </div>
  );
};
