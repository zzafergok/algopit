'use client';

import React from 'react';
import { AlgorithmPageTemplate } from '@/components/common/algorithm-page-template';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { bubbleSort } from '@/lib/algorithms/sorting';
import { implementations, bubbleSortDescription } from './data';

export function BubbleSortView() {
  return (
    <AlgorithmPageTemplate
      title="Bubble Sort Algoritması"
      descriptionTitle="Bubble Sort Açıklaması"
      description={bubbleSortDescription}
      codeExamples={implementations}
      codeIntro={
        <>
          Bubble Sort algoritmasının farklı programlama dillerindeki
          uygulamaları aşağıda verilmiştir.
        </>
      }
      demoDescription={
        <>
          Aşağıya kendi verilerinizi girerek Bubble Sort algoritmasını test
          edebilirsiniz.
        </>
      }
      demo={
        <InteractiveDemo
          title="Bubble Sort Demo"
          description="Verdiğiniz dizi Bubble Sort algoritması ile sıralanacaktır."
          algorithmFunction={bubbleSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
            </div>
          )}
        />
      }
      timeComplexity={{ best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' }}
      spaceComplexity="O(1)"
      analysisRightTitle="Kararlılık (Stability)"
      analysisRightContent={
        <p className="text-sm text-ash">
          Bubble Sort <span className="font-medium">kararlı</span> bir
          algoritmadır, eşit değere sahip elemanların göreceli sırası korunur.
        </p>
      }
      advantages={[
        'Anlaşılması ve uygulanması son derece kolaydır.',
        'Ekstra bellek alanı gerektirmez (O(1) alan karmaşıklığı).',
        'Kararlı bir algoritma olduğundan, eşit değerli elemanların sırası değişmez.',
        'Erken çıkış optimizasyonu ile zaten sıralı veriler için O(n) karmaşıklığa sahiptir.',
      ]}
      disadvantages={[
        'Büyük veri setleri için O(n²) zaman karmaşıklığı nedeniyle verimsizdir.',
        'Takas işlemi sayısı fazladır.',
      ]}
      relatedIntro={<>Bubble Sort'a benzer sıralama algoritmaları:</>}
      relatedAlgorithms={[
        {
          title: 'Insertion Sort',
          description: 'Küçük veri setleri için verimli ve kararlı sıralama.',
        },
        {
          title: 'Selection Sort',
          description:
            'Bubble Sort benzeri karmaşıklıkta, ancak daha az takas yapar.',
        },
      ]}
    />
  );
}
