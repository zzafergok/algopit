'use client';

import React from 'react';
import { TreePine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AlgorithmStep, AlgorithmStats } from './types';

interface MSTStepDetailsProps {
  algorithmStats: AlgorithmStats;
  showStepDetails: boolean;
  currentStep: number;
  algorithmSteps: AlgorithmStep[];
}

export function MSTStepDetails({
  algorithmStats,
  showStepDetails,
  currentStep,
  algorithmSteps,
}: MSTStepDetailsProps) {
  return (
    <>
      {algorithmStats.totalEdges > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-void-black rounded border">
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.totalEdges}
            </div>
            <div className="text-sm text-ash">Toplam Kenar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.edgesConsidered}
            </div>
            <div className="text-sm text-ash">İncelenen Kenar</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.finalMSTWeight}
            </div>
            <div className="text-sm text-ash">MST Toplam Ağırlığı</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-arcly-blue">
              {algorithmStats.executionTime.toFixed(2)}ms
            </div>
            <div className="text-sm text-ash">Çalışma Süresi</div>
          </div>
        </div>
      )}

      {showStepDetails &&
        currentStep >= 0 &&
        currentStep < algorithmSteps.length && (
          <div className="p-4 bg-void-black rounded border">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="w-5 h-5" />
              <span className="font-semibold">
                Adım {currentStep + 1}/{algorithmSteps.length}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">Kenar:</span>
                <span>
                  {algorithmSteps[currentStep].edge.from} ↔{' '}
                  {algorithmSteps[currentStep].edge.to} (Ağırlık:{' '}
                  {algorithmSteps[currentStep].edge.weight})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">İşlem:</span>
                <span
                  className={cn(
                    'px-2 py-1 rounded text-xs font-medium',
                    algorithmSteps[currentStep].action === 'add' &&
                      'bg-signal-green/15 text-signal-green',
                    algorithmSteps[currentStep].action === 'reject' &&
                      'bg-alert-red/15 text-alert-red',
                    algorithmSteps[currentStep].action === 'consider' &&
                      'bg-arcly-blue/10 text-arcly-blue',
                  )}
                >
                  {algorithmSteps[currentStep].action === 'add' && 'Eklendi'}
                  {algorithmSteps[currentStep].action === 'reject' &&
                    'Reddedildi'}
                  {algorithmSteps[currentStep].action === 'consider' &&
                    'İnceleniyor'}
                </span>
              </div>

              <div className="text-ash">
                {algorithmSteps[currentStep].reason}
              </div>

              <div className="flex items-center gap-4 pt-2 border-t">
                <span className="font-medium">
                  MST'deki Kenarlar:{' '}
                  {algorithmSteps[currentStep].edgesInMST.length}
                </span>
                <span className="font-medium">
                  Toplam Ağırlık: {algorithmSteps[currentStep].totalWeight}
                </span>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
