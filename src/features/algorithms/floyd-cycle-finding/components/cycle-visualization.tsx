'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';

export interface CycleResult {
  cycleExists: boolean;
  cycleStart?: number;
  cycleLength?: number;
}

interface CycleVisualizationProps {
  array: number[];
  result: CycleResult;
}

function isCycleMember(
  index: number,
  cycleStart: number,
  array: number[],
  cycleLength: number,
): boolean {
  let current = cycleStart;
  for (let i = 0; i < cycleLength; i++) {
    if (current === index) return true;
    current = array[current];
  }
  return false;
}

function getCycleMembers(
  cycleStart: number,
  array: number[],
  cycleLength: number,
): number[] {
  const members = [cycleStart];
  let current = array[cycleStart];

  for (let i = 1; i < cycleLength; i++) {
    members.push(current);
    current = array[current];
  }

  return members;
}

export const CycleVisualization: React.FC<CycleVisualizationProps> = ({
  array,
  result,
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">İşaretçi ve Dizin Grafı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            {array.map((value, index) => {
              let bgColor = 'bg-gunmetal/40 dark:bg-gunmetal';

              if (result.cycleExists && result.cycleStart !== undefined) {
                if (index === result.cycleStart) {
                  bgColor =
                    'bg-signal-green dark:bg-signal-green/90 text-titanium font-bold';
                } else if (
                  isCycleMember(
                    index,
                    result.cycleStart,
                    array,
                    result.cycleLength || 0,
                  )
                ) {
                  bgColor =
                    'bg-arcly-blue/40 dark:bg-arcly-blue/50 text-foreground font-semibold';
                }
              }

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`${bgColor} w-11 h-11 rounded-full flex items-center justify-center mb-1 text-sm shadow-sm`}
                  >
                    {value}
                  </div>
                  <div className="text-xs font-mono text-ash">idx: {index}</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-mono text-muted-foreground pt-2 border-t border-border/40">
            {array.map((value, index) => (
              <div
                key={index}
                className="px-2 py-1 rounded bg-muted/40 border border-border/30"
              >
                {index} → {value}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analiz Sonucu</CardTitle>
        </CardHeader>
        <CardContent>
          {result.cycleExists ? (
            <div className="space-y-2">
              <p className="text-signal-green dark:text-signal-green/90 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
                Döngü tespit edildi!
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                <li>
                  Döngünün başlangıç indeksi:{' '}
                  <span className="font-semibold text-foreground">
                    {result.cycleStart}
                  </span>
                </li>
                <li>
                  Döngünün uzunluğu:{' '}
                  <span className="font-semibold text-foreground">
                    {result.cycleLength}
                  </span>
                </li>
                <li>
                  Döngüdeki elemanlar (İndeks sırası):{' '}
                  <span className="font-mono text-foreground">
                    {getCycleMembers(
                      result.cycleStart || 0,
                      array,
                      result.cycleLength || 0,
                    ).join(' → ')}
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <p className="text-alert-red dark:text-alert-red/90 font-medium text-sm">
              Döngü tespit edilemedi (dizi sınırlarının dışına çıkıldı).
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
