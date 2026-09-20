'use client';

import React from 'react';
import { Calculator, Grid as GridIcon } from 'lucide-react';
import { Input } from '@/components/core/input';
import { cn } from '@/lib/utils';
import { formatMatrixValue } from './matrix-utils';

interface MatrixTablesProps {
  matrixSize: number;
  adjacencyMatrix: number[][];
  distanceMatrix: number[][];
  isRunning: boolean;
  currentStep: number;
  selectedPath: { from: number; to: number } | null;
  reconstructedPath: number[];
  onCellChange: (row: number, col: number, value: string) => void;
  onPathSelection: (from: number, to: number) => void;
}

export function MatrixTables({
  matrixSize,
  adjacencyMatrix,
  distanceMatrix,
  isRunning,
  currentStep,
  selectedPath,
  reconstructedPath,
  onCellChange,
  onPathSelection,
}: MatrixTablesProps) {
  const getCellStyle = (row: number, col: number, isDistanceMatrix: boolean = false) => {
    let baseClasses = 'w-16 h-10 text-center border border-gunmetal text-sm';

    if (isDistanceMatrix) {
      baseClasses += ' bg-arcly-blue/10';

      if (selectedPath && reconstructedPath.length > 0) {
        const isInPath =
          reconstructedPath.includes(row) && reconstructedPath.includes(col);
        if (row === selectedPath.from && col === selectedPath.to) {
          baseClasses += ' bg-signal-green/20 font-bold';
        } else if (isInPath) {
          baseClasses += ' bg-arcly-blue/10';
        }
      }

      if (currentStep >= 0 && currentStep < matrixSize) {
        if (row === currentStep || col === currentStep) {
          baseClasses += ' bg-arcly-blue/15';
        }
      }
    } else {
      baseClasses += ' bg-card';

      if (row === col) {
        baseClasses += ' bg-gunmetal/20';
      }
    }

    return baseClasses;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Komşuluk Matrisi (Giriş)
        </h3>
        <div className="overflow-x-auto">
          <div className="inline-block p-4 bg-card rounded border">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${matrixSize + 1}, 1fr)`,
              }}
            >
              <div className="w-10 h-10 flex items-center justify-center font-bold"></div>
              {Array.from({ length: matrixSize }, (_, i) => (
                <div
                  key={i}
                  className="w-16 h-10 flex items-center justify-center font-bold text-sm bg-gunmetal/20 border"
                >
                  {i}
                </div>
              ))}

              {Array.from({ length: matrixSize }, (_, row) => (
                <React.Fragment key={row}>
                  <div className="w-10 h-10 flex items-center justify-center font-bold text-sm bg-gunmetal/20 border">
                    {row}
                  </div>

                  {Array.from({ length: matrixSize }, (_, col) => (
                    <Input
                      key={`${row}-${col}`}
                      className={cn(getCellStyle(row, col), 'p-1')}
                      value={
                        adjacencyMatrix[row][col] === Infinity
                          ? ''
                          : adjacencyMatrix[row][col].toString()
                      }
                      onChange={(e) => onCellChange(row, col, e.target.value)}
                      disabled={isRunning || row === col}
                      placeholder={row === col ? '0' : '∞'}
                      type="number"
                      min="0"
                      step="1"
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="text-sm text-ash">
          <p>• Komşuluk matrisinde kenar ağırlıklarını girin</p>
          <p>• Boş hücreler sonsuz (∞) mesafe olarak kabul edilir</p>
          <p>• Köşegen elemanlar (kendinden kendine mesafe) otomatik olarak 0'dır</p>
        </div>
      </div>

      {distanceMatrix.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <GridIcon className="w-5 h-5" />
            En Kısa Mesafe Matrisi (Çıktı)
          </h3>
          <div className="overflow-x-auto">
            <div className="inline-block p-4 bg-arcly-blue/10 rounded border">
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${matrixSize + 1}, 1fr)`,
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center font-bold"></div>
                {Array.from({ length: matrixSize }, (_, i) => (
                  <div
                    key={i}
                    className="w-16 h-10 flex items-center justify-center font-bold text-sm bg-arcly-blue/15 border"
                  >
                    {i}
                  </div>
                ))}

                {Array.from({ length: matrixSize }, (_, row) => (
                  <React.Fragment key={row}>
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-sm bg-arcly-blue/15 border">
                      {row}
                    </div>

                    {Array.from({ length: matrixSize }, (_, col) => (
                      <div
                        key={`${row}-${col}`}
                        className={cn(
                          getCellStyle(row, col, true),
                          'flex items-center justify-center cursor-pointer hover:bg-arcly-blue/15',
                          row !== col && distanceMatrix[row][col] !== Infinity
                            ? 'hover:scale-105 transition-transform'
                            : '',
                        )}
                        onClick={() =>
                          row !== col &&
                          distanceMatrix[row][col] !== Infinity &&
                          onPathSelection(row, col)
                        }
                        title={
                          row !== col && distanceMatrix[row][col] !== Infinity
                            ? `${row} → ${col} yolunu göster`
                            : ''
                        }
                      >
                        {formatMatrixValue(distanceMatrix[row][col])}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="text-sm text-ash">
            <p>• Bu matris tüm düğüm çiftleri arasındaki en kısa mesafeleri gösterir</p>
            <p>• Bir hücreye tıklayarak o yolu görselleştirebilirsiniz</p>
            <p>• Mor renk mevcut iterasyonda işlenen düğümü gösterir</p>
          </div>
        </div>
      )}

      <div className="p-4 bg-obsidian/60 rounded-sm">
        <h3 className="text-lg font-semibold mb-3">Floyd-Warshall Algoritması</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Zaman Karmaşıklığı:</strong> O(n³) - Üç iç içe döngü kullanır
          </p>
          <p>
            <strong>Alan Karmaşıklığı:</strong> O(n²) - İki boyutlu mesafe matrisi
          </p>
          <p>
            <strong>Çalışma Prensibi:</strong> Her iterasyonda, bir ara düğüm (k) üzerinden geçen yolları kontrol eder ve daha kısa yol bulursa günceller.
          </p>
          <p>
            <strong>Kullanım Alanları:</strong> Ağ yönlendirme, şehir planlama, oyun geliştirme (NPC navigasyonu), graf analizi
          </p>
        </div>
      </div>
    </div>
  );
}
