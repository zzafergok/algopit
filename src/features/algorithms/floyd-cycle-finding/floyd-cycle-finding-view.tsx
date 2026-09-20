'use client';

import React, { useState } from 'react';
import { Input } from '@/components/core/input';
import { Label } from '@/components/core/label';
import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { AlgorithmExplanation } from '@/components/common/explanation';
import {
  CycleVisualization,
  type CycleResult,
} from './components/cycle-visualization';
import { pseudocode, implementations } from './data';

function getNextIndex(arr: number[], currentIndex: number): number {
  if (currentIndex < 0 || currentIndex >= arr.length) {
    return -1;
  }
  const nextIndex = arr[currentIndex];
  if (
    typeof nextIndex !== 'number' ||
    nextIndex < 0 ||
    nextIndex >= arr.length
  ) {
    return -1;
  }
  return nextIndex;
}

function floydCycleFinding(arr: number[]): CycleResult {
  if (arr.length === 0) {
    return { cycleExists: false };
  }

  let tortoise = 0;
  let hare = 0;

  do {
    tortoise = getNextIndex(arr, tortoise);
    hare = getNextIndex(arr, getNextIndex(arr, hare));

    if (tortoise === -1 || hare === -1) {
      return { cycleExists: false };
    }
  } while (tortoise !== hare);

  tortoise = 0;
  while (tortoise !== hare) {
    tortoise = getNextIndex(arr, tortoise);
    hare = getNextIndex(arr, hare);
  }

  let cycleLength = 1;
  hare = getNextIndex(arr, tortoise);
  while (tortoise !== hare) {
    hare = getNextIndex(arr, hare);
    cycleLength++;
  }

  return {
    cycleExists: true,
    cycleStart: tortoise,
    cycleLength,
  };
}

const DEFAULT_ARRAY = [1, 3, 4, 2, 2];
const DEFAULT_TEXT = '1, 3, 4, 2, 2';

export function FloydCycleFindingView() {
  const [inputArray, setInputArray] = useState<number[]>(DEFAULT_ARRAY);
  const [inputText, setInputText] = useState(DEFAULT_TEXT);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<CycleResult>(() =>
    floydCycleFinding(DEFAULT_ARRAY),
  );

  const handleRunAlgorithm = () => {
    try {
      setErrorMessage(null);
      const parsedArray = inputText
        .split(',')
        .map((item) => parseInt(item.trim(), 10))
        .filter((num) => !isNaN(num));

      if (parsedArray.length === 0) {
        throw new Error('Lütfen geçerli bir sayı dizisi girin.');
      }

      const isValid = parsedArray.every(
        (num) => num >= 0 && num < parsedArray.length,
      );
      if (!isValid) {
        throw new Error(
          'Her değer dizi uzunluğundan küçük olmalıdır (geçerli indeks olarak çalışması için).',
        );
      }

      setInputArray(parsedArray);
      const algorithmResult = floydCycleFinding(parsedArray);
      setResult(algorithmResult);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Bir hata oluştu!',
      );
    }
  };

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            İnteraktif Dizi / Graf Girişi
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="array-input">
              İşaretçi Dizisi (Virgülle ayrılmış indeks hedefleri, örn: 1, 3, 4,
              2, 2)
            </Label>
            <Input
              id="array-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="1, 3, 4, 2, 2"
              className="font-mono text-sm"
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-alert-red">{errorMessage}</p>
          )}

          <div className="flex gap-2">
            <Button onClick={handleRunAlgorithm}>Döngüyü Tespit Et</Button>
            <Button
              variant="outline"
              onClick={() => {
                setInputText(DEFAULT_TEXT);
                setInputArray(DEFAULT_ARRAY);
                setResult(floydCycleFinding(DEFAULT_ARRAY));
                setErrorMessage(null);
              }}
            >
              Varsayılana Sıfırla
            </Button>
          </div>
        </CardContent>
      </Card>

      <CycleVisualization array={inputArray} result={result} />

      <AlgorithmExplanation
        title="Floyd's Cycle Finding Algoritması (Tortoise and Hare)"
        description="Floyd'un Döngü Bulma Algoritması, bağlı listelerdeki döngüleri tespit etmek için kullanılan verimli bir algoritmadır. 'Kaplumbağa ve Tavşan' algoritması olarak da bilinir. Biri yavaş (kaplumbağa), diğeri hızlı (tavşan) hareket eden iki işaretçi kullanarak, döngü varsa bu iki işaretçinin mutlaka bir noktada buluşacağı prensibine dayanır."
        timeComplexity={{
          best: 'O(n)',
          average: 'O(n)',
          worst: 'O(n)',
        }}
        spaceComplexity="O(1)"
        advantages={[
          'Sabit bellek kullanımı (O(1) uzay karmaşıklığı)',
          'Doğrusal zaman karmaşıklığı (O(n))',
          'Döngünün başlangıç noktasını ve uzunluğunu tespit edebilir',
          'Uygulaması basittir ve minimum işaretçi kullanır',
        ]}
        disadvantages={[
          'Yalnızca bağlı listeler veya işaretçi temelli veri yapıları için tasarlanmıştır',
          'Algoritma, durum makinesi veya otomat tabanlı algoritmalardan daha az sezgiseldir',
          'Hash tablosu kullanarak çözme yaklaşımından biraz daha yavaş olabilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Bağlı listelerde döngü tespiti',
          'Bellek sızıntılarını tespit etme',
          'Döngüsel referansları bulma',
          'Sayı dizilerinde döngü tespiti (örn. çarpım zinciri)',
          'Rasgele sayı üreteçlerinde döngü tespiti',
          'Fonksiyon iterasyonlarında desen tespiti',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
