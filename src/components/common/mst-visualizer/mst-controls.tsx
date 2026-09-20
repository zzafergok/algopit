'use client';

import React from 'react';
import { Plus, Play, Minus, Shuffle, RotateCcw } from 'lucide-react';

import { Label } from '@/components/core/label';
import { Button } from '@/components/core/button';
import { Select } from '@/components/core/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { AlgorithmStep, AlgorithmStats } from './types';
import { Graph } from '@/lib/algorithms/graph';
import { MSTStepDetails } from './mst-step-details';

interface MSTControlsProps {
  isRunning: boolean;
  algorithmType: 'kruskal' | 'prim';
  onAlgorithmTypeChange: (val: 'kruskal' | 'prim') => void;
  onRun: () => void;
  onReset: () => void;
  onGenerateNewGraph: () => void;
  nodeCount: number;
  onNodeCountChange: (count: number) => void;
  onAddNode: () => void;
  onRemoveNode: () => void;
  animationSpeed: number;
  onAnimationSpeedChange: (speed: number) => void;
  selectedStartNode: string;
  onSelectedStartNodeChange: (nodeId: string) => void;
  graph: Graph;
  showWeights: boolean;
  onShowWeightsChange: (val: boolean) => void;
  showStepDetails: boolean;
  onShowStepDetailsChange: (val: boolean) => void;
  algorithmStats: AlgorithmStats;
  currentStep: number;
  algorithmSteps: AlgorithmStep[];
}

export function MSTControls({
  isRunning,
  algorithmType,
  onAlgorithmTypeChange,
  onRun,
  onReset,
  onGenerateNewGraph,
  nodeCount,
  onNodeCountChange,
  onAddNode,
  onRemoveNode,
  animationSpeed,
  onAnimationSpeedChange,
  selectedStartNode,
  onSelectedStartNodeChange,
  graph,
  showWeights,
  onShowWeightsChange,
  showStepDetails,
  onShowStepDetailsChange,
  algorithmStats,
  currentStep,
  algorithmSteps,
}: MSTControlsProps) {
  return (
    <div className="space-y-4 p-4 bg-obsidian/60 rounded-sm">
      <div className="flex flex-wrap gap-4 items-center">
        <Button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {algorithmType === 'kruskal' ? 'Kruskal' : 'Prim'} Çalıştır
        </Button>

        <Button
          onClick={onReset}
          variant="outline"
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Sıfırla
        </Button>

        <Button
          onClick={onGenerateNewGraph}
          variant="outline"
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          Yeni Graf
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Algoritma</Label>
          <Select
            value={algorithmType}
            onChange={(e) =>
              onAlgorithmTypeChange(e.target.value as 'kruskal' | 'prim')
            }
            disabled={isRunning}
          >
            <option value="kruskal">Kruskal's Algorithm</option>
            <option value="prim">Prim's Algorithm</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Düğüm Sayısı: {nodeCount}</Label>
          <div className="flex items-center gap-2">
            <Button
              onClick={onRemoveNode}
              variant="outline"
              size="sm"
              disabled={isRunning || nodeCount <= 3}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Slider
              value={[nodeCount]}
              onValueChange={([value]) => onNodeCountChange(value)}
              min={3}
              max={10}
              step={1}
              disabled={isRunning}
              className="flex-1"
            />
            <Button
              onClick={onAddNode}
              variant="outline"
              size="sm"
              disabled={isRunning || nodeCount >= 10}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
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

      {algorithmType === 'prim' && (
        <div className="space-y-2">
          <Label>Başlangıç Düğümü (Prim için)</Label>
          <div className="w-32">
            <Select
              value={selectedStartNode}
              onChange={(e) => onSelectedStartNodeChange(e.target.value)}
              disabled={isRunning}
            >
              {Array.from(graph.nodes.keys()).map((nodeId) => (
                <option key={nodeId} value={nodeId}>
                  Düğüm {nodeId}
                </option>
              ))}
            </Select>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Switch
            id="show-weights"
            checked={showWeights}
            onCheckedChange={onShowWeightsChange}
          />
          <Label htmlFor="show-weights">Ağırlıkları Göster</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="show-steps"
            checked={showStepDetails}
            onCheckedChange={onShowStepDetailsChange}
          />
          <Label htmlFor="show-steps">Adım Detaylarını Göster</Label>
        </div>
      </div>

      <MSTStepDetails
        algorithmStats={algorithmStats}
        showStepDetails={showStepDetails}
        currentStep={currentStep}
        algorithmSteps={algorithmSteps}
      />
    </div>
  );
}
