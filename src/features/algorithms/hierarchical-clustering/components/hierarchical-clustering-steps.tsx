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
import { HierarchicalStep, ClusterNode, Point } from '../types';
import { ClusterVisualization } from './cluster-visualization';

interface HierarchicalClusteringStepsProps {
  steps: HierarchicalStep[];
  currentStep: number;
  onChangeStep: (step: number) => void;
  width: number;
  height: number;
  onSelectCluster?: (clusterId: number) => void;
}

export const HierarchicalClusteringSteps: React.FC<
  HierarchicalClusteringStepsProps
> = ({ steps, currentStep, onChangeStep, width, height }) => {
  const handlePrevious = () => {
    onChangeStep(Math.max(0, currentStep - 1));
  };

  const handleNext = () => {
    onChangeStep(Math.min(steps.length - 1, currentStep + 1));
  };

  if (steps.length === 0) {
    return <p>Adım bulunamadı</p>;
  }

  const step = steps[currentStep];
  const clusters = step.clusters || [];

  const allPoints = clusters.flatMap((cluster: ClusterNode) =>
    cluster.points.map((p: Point) => ({ ...p, cluster: cluster.id })),
  );

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
            <span>{step.description || 'Kümeleme Adımı'}</span>
            <Badge>{step.step}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ClusterVisualization
              points={allPoints}
              width={width}
              height={height / 2}
              highlightCluster={step.mergedCluster}
            />

            <div className="text-sm">
              <p className="font-medium">Küme Sayısı: {clusters.length}</p>
              {step.distance !== undefined && (
                <p>Birleştirme Mesafesi: {step.distance.toFixed(2)}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
