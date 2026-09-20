'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Label } from '@/components/core/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/core/button';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { solveNQueens, pseudocode, implementations } from './data';
import { ChessboardVisualization } from './components/chessboard-visualization';

export function NQueensView() {
  const [boardSize, setBoardSize] = useState<number>(4);
  const [solutions, setSolutions] = useState<number[][]>([]);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleSolve = useCallback(() => {
    setIsRunning(true);
    setTimeout(() => {
      try {
        const foundSolutions = solveNQueens(boardSize);
        setSolutions(foundSolutions);
        setCurrentSolutionIndex(0);
      } finally {
        setIsRunning(false);
      }
    }, 0);
  }, [boardSize]);

  useEffect(() => {
    handleSolve();
  }, [handleSolve]);

  return (
    <div className="space-y-12">
      <div className="p-6 border border-line bg-surface rounded-sm space-y-6">
        <h2 className="text-2xl font-bold">İnteraktif N-Queens Simülasyonu</h2>
        <div className="flex flex-wrap items-center gap-6">
          <div className="space-y-2 w-64">
            <Label>Tahta Boyutu (N): {boardSize}</Label>
            <Slider
              value={[boardSize]}
              onValueChange={([val]) => setBoardSize(val)}
              min={4}
              max={10}
              step={1}
              disabled={isRunning}
            />
          </div>
          <div className="flex items-center gap-2 pt-4">
            <Button
              onClick={() =>
                setCurrentSolutionIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentSolutionIndex <= 0}
              variant="outline"
              size="sm"
            >
              Önceki Çözüm
            </Button>
            <span className="text-sm font-mono">
              Çözüm {solutions.length > 0 ? currentSolutionIndex + 1 : 0} /{' '}
              {solutions.length}
            </span>
            <Button
              onClick={() =>
                setCurrentSolutionIndex((prev) =>
                  Math.min(solutions.length - 1, prev + 1),
                )
              }
              disabled={currentSolutionIndex >= solutions.length - 1}
              variant="outline"
              size="sm"
            >
              Sonraki Çözüm
            </Button>
          </div>
        </div>

        {solutions.length > 0 && (
          <div className="flex justify-center pt-4">
            <ChessboardVisualization
              size={boardSize}
              solution={solutions[currentSolutionIndex]}
            />
          </div>
        )}
      </div>

      <AlgorithmExplanation
        title="N-Queens Problemi (Geri İzleme Algoritması)"
        description="N-Queens problemi, n×n boyutundaki bir satranç tahtasına n adet veziri, hiçbirinin birbirini tehdit etmeyecek şekilde yerleştirme sorunudur. Vezirler yatay, dikey ve çapraz hareket edebildiği için geri izleme (backtracking) algoritmasının klasik uygulamasıdır."
        timeComplexity={{
          best: 'O(n!)',
          average: 'O(n!)',
          worst: 'O(n!)',
        }}
        spaceComplexity="O(n²)"
        advantages={[
          'Her boyuttaki tahtada tüm olası çözümleri bulabilir',
          'Çözümü olmayan durumları erken tespit eder',
          'Geçersiz dalları erken budar',
        ]}
        disadvantages={[
          'Üstel zaman karmaşıklığı O(n!)',
          'Büyük n değerleri için çözüm sayısı ve süre hızla artar',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Satranç yapay zekası ve kısıt tatmini bulmacaları',
          'Kaynak tahsisi ve çizelgeleme problemleri',
          'Paralel sistemlerde yük dengeleme',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
