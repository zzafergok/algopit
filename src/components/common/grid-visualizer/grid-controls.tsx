'use client';

import React from 'react';
import {
  Zap,
  Play,
  Square,
  MapPin,
  Target,
  RotateCcw,
  Construction,
} from 'lucide-react';
import { Label } from '@/components/core/label';
import { Button } from '@/components/core/button';
import { Select } from '@/components/core/select';
import { Slider } from '@/components/ui/slider';
import type { CellMode, AlgorithmState, AlgorithmStats } from './types';

interface GridControlsProps {
  algorithmState: AlgorithmState;
  gridWidth: number;
  gridHeight: number;
  animationSpeed: number;
  heuristicType: 'manhattan' | 'euclidean';
  cellMode: CellMode;
  algorithmStats: AlgorithmStats;
  onRunAlgorithm: () => void;
  onResetGrid: () => void;
  onGenerateMaze: () => void;
  onClearObstacles: () => void;
  onGridWidthChange: (width: number) => void;
  onGridHeightChange: (height: number) => void;
  onAnimationSpeedChange: (speed: number) => void;
  onHeuristicChange: (heuristic: 'manhattan' | 'euclidean') => void;
  onCellModeChange: (mode: CellMode) => void;
}

export function GridControls({
  algorithmState,
  gridWidth,
  gridHeight,
  animationSpeed,
  heuristicType,
  cellMode,
  algorithmStats,
  onRunAlgorithm,
  onResetGrid,
  onGenerateMaze,
  onClearObstacles,
  onGridWidthChange,
  onGridHeightChange,
  onAnimationSpeedChange,
  onHeuristicChange,
  onCellModeChange,
}: GridControlsProps) {
  const isRunning = algorithmState === 'running';

  return (
    <div className="space-y-4 p-4 bg-obsidian/60 rounded-sm">
      <div className="flex flex-wrap gap-4 items-center">
        <Button
          onClick={onRunAlgorithm}
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Algoritma Çalıştır
        </Button>

        <Button
          onClick={onResetGrid}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </Button>

        <Button
          onClick={onGenerateMaze}
          variant="outline"
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Rastgele Labirent
        </Button>

        <Button
          onClick={onClearObstacles}
          variant="outline"
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Square className="w-4 h-4" />
          Engelleri Temizle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Genişlik: {gridWidth}</Label>
          <Slider
            value={[gridWidth]}
            onValueChange={([value]) => onGridWidthChange(value)}
            min={10}
            max={40}
            step={1}
            disabled={isRunning}
          />
        </div>

        <div className="space-y-2">
          <Label>Yükseklik: {gridHeight}</Label>
          <Slider
            value={[gridHeight]}
            onValueChange={([value]) => onGridHeightChange(value)}
            min={10}
            max={30}
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

        <div className="space-y-2">
          <Label>Sezgisel Fonksiyon</Label>
          <Select
            value={heuristicType}
            onChange={(e) =>
              onHeuristicChange(e.target.value as 'manhattan' | 'euclidean')
            }
            disabled={isRunning}
          >
            <option value="manhattan">Manhattan Distance</option>
            <option value="euclidean">Euclidean Distance</option>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Yerleştirme Modu</Label>
        <div className="flex flex-wrap gap-2">
          {[
            { mode: 'start' as CellMode, label: 'Başlangıç', icon: MapPin },
            { mode: 'goal' as CellMode, label: 'Hedef', icon: Target },
            {
              mode: 'obstacle' as CellMode,
              label: 'Engel',
              icon: Construction,
            },
            { mode: 'clear' as CellMode, label: 'Temizle', icon: Square },
          ].map(({ mode, label, icon: Icon }) => (
            <Button
              key={mode}
              variant={cellMode === mode ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCellModeChange(mode)}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {algorithmStats.nodesVisited > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-void-black rounded border">
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.pathLength}
            </div>
            <div className="text-sm text-ash">Yol Uzunluğu</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.nodesVisited}
            </div>
            <div className="text-sm text-ash">Ziyaret Edilen Düğüm</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.executionTime.toFixed(2)}ms
            </div>
            <div className="text-sm text-ash">Çalışma Süresi</div>
          </div>
        </div>
      )}
    </div>
  );
}
