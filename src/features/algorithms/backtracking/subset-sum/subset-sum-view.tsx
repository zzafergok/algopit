'use client';

import React, { useState } from 'react';
import { Label } from '@/components/core/label';
import { Input } from '@/components/core/input';
import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/core/card';
import { AlgorithmExplanation } from '@/components/common/explanation';

import { findSubsetSum, dpSubsetSumAll } from './utils';
import { SubsetSumViewer } from './components';
import { pseudocode, implementations, explanationData } from './data';

export function SubsetSumView() {
  const [targetSum, setTargetSum] = useState<number>(9);
  const initialResult = findSubsetSum([3, 34, 4, 12, 5, 2], 9);
  const [solutions, setSolutions] = useState<number[][]>(() => initialResult.subsets);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [targetSumInput, setTargetSumInput] = useState<string>('9');
  const [arrayInput, setArrayInput] = useState<string>('3, 34, 4, 12, 5, 2');
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0);
  const [algorithm, setAlgorithm] = useState<'backtracking' | 'dp'>(
    'backtracking',
  );
  const [originalArray, setOriginalArray] = useState<number[]>([
    3, 34, 4, 12, 5, 2,
  ]);

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrayInput(e.target.value);
  };

  const handleTargetSumInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTargetSumInput(e.target.value);
  };

  const handleRunAlgorithm = () => {
    try {
      setIsRunning(true);

      const parsedArray = arrayInput
        .split(',')
        .map((item) => parseInt(item.trim(), 10))
        .filter((num) => !isNaN(num));

      if (parsedArray.length === 0) {
        throw new Error('Lütfen geçerli bir sayı dizisi girin.');
      }

      const parsedTargetSum = parseInt(targetSumInput.trim(), 10);
      if (isNaN(parsedTargetSum)) {
        throw new Error('Lütfen geçerli bir hedef toplam girin.');
      }

      setOriginalArray(parsedArray);
      setTargetSum(parsedTargetSum);

      setTimeout(() => {
        try {
          if (algorithm === 'backtracking') {
            const { subsets } = findSubsetSum(parsedArray, parsedTargetSum);
            setSolutions(subsets);
          } else {
            const dpSolutions = dpSubsetSumAll(parsedArray, parsedTargetSum);
            setSolutions(dpSolutions);
          }

          setCurrentSolutionIndex(0);
        } catch (error) {
          console.error('Algoritma çalışma hatası:', error);
        } finally {
          setIsRunning(false);
        }
      }, 0);
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
        demoDescription="Subset Sum problemini test etmek için bir sayı dizisi ve hedef toplamı girin. Algoritma, dizideki sayılardan oluşan ve toplamı hedef değere eşit olan tüm olası alt kümeleri bulacaktır."
        demo={
          <Card>
            <CardHeader>
              <CardTitle>Subset Sum Problemi Demo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="array-input">
                      Sayı Dizisi (virgülle ayrılmış)
                    </Label>
                    <Input
                      id="array-input"
                      value={arrayInput}
                      onChange={handleArrayInputChange}
                      placeholder="Örn: 3, 34, 4, 12, 5, 2"
                      disabled={isRunning}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target-sum-input">Hedef Toplam</Label>
                    <Input
                      id="target-sum-input"
                      value={targetSumInput}
                      onChange={handleTargetSumInputChange}
                      placeholder="Örn: 9"
                      type="number"
                      disabled={isRunning}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium">Algoritma:</span>
                    <Button
                      variant={
                        algorithm === 'backtracking' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setAlgorithm('backtracking')}
                      disabled={isRunning}
                    >
                      Geri İzleme
                    </Button>
                    <Button
                      variant={algorithm === 'dp' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAlgorithm('dp')}
                      disabled={isRunning}
                    >
                      Dinamik Programlama
                    </Button>
                  </div>

                  <Button
                    onClick={handleRunAlgorithm}
                    disabled={isRunning}
                    className="w-full"
                  >
                    {isRunning ? 'Çalışıyor...' : 'Çalıştır'}
                  </Button>

                  <p className="text-xs text-ash">
                    Not: Geri izleme tüm olası alt kümeleri arar; büyük veri
                    setlerinde çalışma süresi hızlı artabilir.
                  </p>
                </div>

                <Card className="bg-obsidian/50">
                  <CardContent className="pt-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-sm font-medium">
                        Bulunan Alt Küme Sayısı:
                      </span>
                      <Badge variant="outline">{solutions.length}</Badge>
                    </div>

                    <SubsetSumViewer
                      array={originalArray}
                      targetSum={targetSum}
                      solutions={solutions}
                      currentSolutionIndex={currentSolutionIndex}
                      onChangeSolution={setCurrentSolutionIndex}
                    />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        }
        relatedAlgorithms={explanationData.relatedAlgorithms}
      />
    </div>
  );
}
