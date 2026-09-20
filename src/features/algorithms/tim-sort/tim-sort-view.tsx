'use client';

import React from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { timSort } from '@/lib/algorithms/sorting';
import { pseudocode, implementations } from './data';

export function TimSortView() {
  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Tim Sort Algoritması"
        description="Tim Sort, Python programlama dilinin yerleşik sort() fonksiyonunda kullanılan hibrit bir sıralama algoritmasıdır. Tim Peters tarafından 2002'de geliştirilmiş olup, merge sort ve insertion sort algoritmalarının avantajlarını birleştirir. Gerçek dünyadaki verilerde sıkça bulunan kısmen sıralı dizilerde mükemmel performans gösterir."
        timeComplexity={{
          best: 'O(n)',
          average: 'O(n log n)',
          worst: 'O(n log n)',
        }}
        spaceComplexity="O(n)"
        advantages={[
          'Adaptive algoritma - kısmen sıralı dizilerde O(n) performans',
          'Kararlı sıralama algoritmasıdır (stable)',
          'Gerçek dünyadaki veriler için optimize edilmiştir',
          "Doğal run'ları tespit ederek performansı artırır",
          'Küçük diziler için insertion sort kullanarak optimize eder',
          "En kötü durum garantisi O(n log n)'dir",
        ]}
        disadvantages={[
          'Karmaşık implementasyon gerektirir',
          'Ek O(n) bellek alanı gerektirir',
          'Küçük diziler için basit algoritmalardan yavaş olabilir',
          'Cache locality açısından optimal olmayabilir',
          'Anlaşılması ve debug edilmesi zordur',
        ]}
        pseudocode={pseudocode}
        applications={[
          "Python'un yerleşik sort() fonksiyonu",
          "Java'nın Arrays.sort() metodu (object dizileri için)",
          'Büyük ölçekli veri işleme uygulamaları',
          'Kısmen sıralı verilerin bulunduğu sistemler',
          'Production seviyesi yazılım geliştirme',
          'Veri analizi ve bilimsel hesaplama kütüphaneleri',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <InteractiveDemo
          title="Tim Sort Demo"
          description="Verdiğiniz dizi Tim Sort algoritması ile sıralanacaktır."
          algorithmFunction={timSort}
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
