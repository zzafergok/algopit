'use client';

import React from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { shellSort } from '@/lib/algorithms/sorting';
import { pseudocode, implementations } from './data';

export function ShellSortView() {
  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Shell Sort Algoritması"
        description="Shell Sort, Insertion Sort'un geliştirilmiş bir versiyonudur. Donald Shell tarafından 1959'da geliştirilen bu algoritma, elemanları belirli aralıklarla (gap) karşılaştırarak sıralama işlemini optimize eder. Gap değeri her iterasyonda azaltılarak son aşamada normal insertion sort uygulanır."
        timeComplexity={{
          best: 'O(n log n)',
          average: 'O(n log²n)',
          worst: 'O(n²)',
        }}
        spaceComplexity="O(1)"
        advantages={[
          "Insertion Sort'tan önemli ölçüde daha hızlıdır",
          'In-place sıralama algoritmasıdır (O(1) alan karmaşıklığı)',
          'Adaptive algoritma - kısmen sıralı dizilerde daha hızlı çalışır',
          'Küçük ve orta boyutlu diziler için oldukça verimlidir',
        ]}
        disadvantages={[
          "En kötü durum karmaşıklığı O(n²)'dir",
          'Kararlı bir sıralama algoritması değildir',
          'Gap dizisinin seçimi performansı önemli ölçüde etkiler',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Orta boyutlu veri setlerinin sıralanması',
          'Embedded sistemler (düşük bellek kullanımı)',
          'Kısmen sıralı verilerin optimize edilmesi',
          'Hibrit sıralama algoritmalarında alt algoritma olarak kullanım',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <InteractiveDemo
          title="Shell Sort Demo"
          description="Verdiğiniz dizi Shell Sort algoritması ile sıralanacaktır."
          algorithmFunction={shellSort}
          inputType="array"
          inputPlaceholder="64,34,25,12,22,11,90"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
