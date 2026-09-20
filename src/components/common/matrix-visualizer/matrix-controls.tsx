'use client';

import React from 'react';
import { Play, RotateCcw, Grid as GridIcon } from 'lucide-react';
import { Label } from '@/components/core/label';
import { Button } from '@/components/core/button';
import { Slider } from '@/components/ui/slider';
import type { AlgorithmStats } from './types';
import { formatMatrixValue } from './matrix-utils';

interface MatrixControlsProps {
  isRunning: boolean;
  matrixSize: number;
  animationSpeed: number;
  currentStep: number;
  distanceMatrix: number[][];
  algorithmStats: AlgorithmStats;
  selectedPath: { from: number; to: number } | null;
  reconstructedPath: number[];
  onRunFloydWarshall: () => void;
  onResetMatrix: () => void;
  onGenerateRandomMatrix: () => void;
  onResizeMatrix: (size: number) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onPathSelection: (from: number, to: number) => void;
}

export function MatrixControls({
  isRunning,
  matrixSize,
  animationSpeed,
  currentStep,
  distanceMatrix,
  algorithmStats,
  selectedPath,
  reconstructedPath,
  onRunFloydWarshall,
  onResetMatrix,
  onGenerateRandomMatrix,
  onResizeMatrix,
  onAnimationSpeedChange,
  onPathSelection,
}: MatrixControlsProps) {
  return (
    <div className="space-y-4 p-4 bg-obsidian/60 rounded-sm">
      <div className="flex flex-wrap gap-4 items-center">
        <Button
          onClick={onRunFloydWarshall}
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Floyd-Warshall Çalıştır
        </Button>

        <Button
          onClick={onResetMatrix}
          variant="outline"
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </Button>

        <Button
          onClick={onGenerateRandomMatrix}
          variant="outline"
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <GridIcon className="w-4 h-4" />
          Rastgele Matris
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Matris Boyutu: {matrixSize}</Label>
          <Slider
            value={[matrixSize]}
            onValueChange={([value]) => onResizeMatrix(value)}
            min={3}
            max={8}
            step={1}
            disabled={isRunning}
          />
        </div>

        <div className="space-y-2">
          <Label>Animasyon Hızı: {animationSpeed}</Label>
          <Slider
            value={[animationSpeed]}
            onValueChange={([value]) => onAnimationSpeedChange(value)}
            min={1}
            max={100}
            step={1}
          />
        </div>
      </div>

      {algorithmStats.totalComparisons > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-void-black rounded border">
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.iterations}
            </div>
            <div className="text-sm text-ash">İterasyonlar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.totalComparisons}
            </div>
            <div className="text-sm text-ash">Karşılaştırmalar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.pathsFound}
            </div>
            <div className="text-sm text-ash">Bulunan Yollar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.executionTime.toFixed(2)}ms
            </div>
            <div className="text-sm text-ash">Çalışma Süresi</div>
          </div>
        </div>
      )}

      {currentStep >= 0 && currentStep < matrixSize && (
        <div className="p-3 bg-arcly-blue/15 rounded border border-arcly-blue/40">
          <div className="text-sm font-medium text-arcly-blue">
            Şu anki iterasyon: k = {currentStep}
          </div>
          <div className="text-xs text-arcly-blue">
            {currentStep} numaralı düğüm üzerinden geçen yollar kontrol ediliyor
          </div>
        </div>
      )}

      {distanceMatrix.length > 0 && (
        <div className="space-y-2">
          <Label>Yol Görselleştirme (Kaynak → Hedef)</Label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: matrixSize }, (_, i) =>
              Array.from({ length: matrixSize }, (_, j) => {
                if (i === j || distanceMatrix[i][j] === Infinity) return null;

                const isSelected =
                  selectedPath?.from === i && selectedPath?.to === j;
                return (
                  <Button
                    key={`${i}-${j}`}
                    variant={isSelected ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => onPathSelection(i, j)}
                    className="text-xs"
                  >
                    {i} → {j}
                  </Button>
                );
              }),
            )}
          </div>

          {selectedPath && reconstructedPath.length > 0 && (
            <div className="p-3 bg-signal-green/10 rounded border border-signal-green/40">
              <div className="text-sm font-medium text-signal-green">
                En Kısa Yol ({selectedPath.from} → {selectedPath.to}):
              </div>
              <div className="text-sm text-signal-green">
                {reconstructedPath.join(' → ')}
                <span className="ml-2 font-medium">
                  (Toplam Mesafe:{' '}
                  {formatMatrixValue(
                    distanceMatrix[selectedPath.from][selectedPath.to],
                  )}
                  )
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
