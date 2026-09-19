'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { Label } from '@/components/core/label';
import { Slider } from '@/components/ui/slider';
import { AlgorithmExplanation } from '@/components/common/explanation';

import { Point, KMeansStep } from './types';
import {
  generateRandomPoints,
  generateClusteredPoints,
  kMeansAlgorithm,
} from './utils';
import { ClusterVisualization, KMeansStepsViewer } from './components';
import { pseudocode, implementations, explanationData } from './data';

export function KMeansView() {
  const width = 500;
  const height = 400;

  const [k, setK] = useState<number>(3);
  const [steps, setSteps] = useState<KMeansStep[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [numPoints, setNumPoints] = useState<number>(50);
  const [centroids, setCentroids] = useState<Point[]>([]);
  const [iterations, setIterations] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [dataType, setDataType] = useState<'random' | 'clustered'>('clustered');

  const generateData = useCallback(() => {
    let newPoints: Point[] = [];

    if (dataType === 'random') {
      newPoints = generateRandomPoints(numPoints, width, height);
    } else {
      const pointsPerCluster = Math.floor(numPoints / k);
      const remainingPoints = numPoints - pointsPerCluster * k;

      newPoints = generateClusteredPoints(
        k,
        pointsPerCluster,
        width,
        height,
        50,
      );

      if (remainingPoints > 0) {
        const extraPoints = generateRandomPoints(
          remainingPoints,
          width,
          height,
        );
        newPoints = [...newPoints, ...extraPoints];
      }
    }

    setPoints(newPoints);
    setSteps([]);
    setCurrentStep(0);
    setCentroids([]);
    setIterations(0);
  }, [dataType, numPoints, k, width, height]);

  useEffect(() => {
    generateData();
  }, [generateData]);

  const handleRunAlgorithm = () => {
    try {
      setIsRunning(true);

      setTimeout(() => {
        try {
          const result = kMeansAlgorithm([...points], k, 100);
          setPoints(result.points);
          setCentroids(result.centroids);
          setIterations(result.iterations);
          setSteps(result.steps);
          setCurrentStep(0);
        } catch (error) {
          console.error('Algoritma çalıştırma hatası:', error);
        } finally {
          setIsRunning(false);
        }
      }, 50);
    } catch {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title={explanationData.title}
        description={explanationData.description}
        timeComplexity={explanationData.timeComplexity}
        spaceComplexity={explanationData.spaceComplexity}
        advantages={explanationData.advantages}
        disadvantages={explanationData.disadvantages}
        pseudocode={pseudocode}
        applications={explanationData.applications}
        codeExamples={implementations}
        defaultCodeTab="typescript"
        demo={
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Algoritma Parametreleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Veri Tipi</Label>
                      <div className="flex space-x-2">
                        <Button
                          variant={
                            dataType === 'random' ? 'default' : 'outline'
                          }
                          onClick={() => setDataType('random')}
                          disabled={isRunning}
                        >
                          Rastgele
                        </Button>
                        <Button
                          variant={
                            dataType === 'clustered' ? 'default' : 'outline'
                          }
                          onClick={() => setDataType('clustered')}
                          disabled={isRunning}
                        >
                          Kümelenmiş
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="kValue">Küme Sayısı (k): {k}</Label>
                      </div>
                      <Slider
                        id="kValue"
                        min={2}
                        max={8}
                        step={1}
                        value={[k]}
                        onValueChange={(val) => setK(val[0])}
                        disabled={isRunning}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="numPoints">
                          Nokta Sayısı: {numPoints}
                        </Label>
                      </div>
                      <Slider
                        id="numPoints"
                        min={20}
                        max={150}
                        step={10}
                        value={[numPoints]}
                        onValueChange={(val) => setNumPoints(val[0])}
                        disabled={isRunning}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button onClick={generateData} disabled={isRunning}>
                        Yeni Veri Oluştur
                      </Button>
                      <Button
                        onClick={handleRunAlgorithm}
                        disabled={isRunning || points.length === 0}
                      >
                        {isRunning ? 'Çalışıyor...' : 'Algoritmayı Çalıştır'}
                      </Button>
                    </div>

                    {iterations > 0 && (
                      <div className="text-sm text-ash">
                        Tamamlandı: {iterations} iterasyon
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Veri Görselleştirmesi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ClusterVisualization
                    points={points}
                    centroids={centroids}
                    width={width}
                    height={height}
                  />
                </CardContent>
              </Card>
            </div>

            {steps.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Adım Adım İlerleme</h3>
                <KMeansStepsViewer
                  steps={steps}
                  currentStep={currentStep}
                  onChangeStep={setCurrentStep}
                  width={width}
                  height={height}
                />
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
