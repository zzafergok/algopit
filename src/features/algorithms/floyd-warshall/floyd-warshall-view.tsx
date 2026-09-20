'use client';

import React from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { MatrixVisualizer } from '@/components/common/matrix-visualizer';
import { pseudocode, implementations } from './data';

export function FloydWarshallView() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          İnteraktif Matris Görselleştirici
        </h2>
        <MatrixVisualizer algorithm="floyd-warshall" />
      </div>

      <AlgorithmExplanation
        title="Floyd-Warshall Algoritması"
        description="Floyd-Warshall algoritması, ağırlıklı bir grafta tüm düğüm çiftleri arasındaki en kısa yolları bulan dinamik programlama tabanlı bir algoritmadır. Roy Warshall ve Robert Floyd tarafından geliştirilmiş olup, pozitif ve negatif kenar ağırlıklarını destekler ancak negatif çevrimler olmamalıdır."
        timeComplexity={{
          best: 'O(V³)',
          average: 'O(V³)',
          worst: 'O(V³)',
        }}
        spaceComplexity="O(V²)"
        advantages={[
          'Tüm düğüm çiftleri arasındaki en kısa yolları tek seferde bulur',
          'Negatif kenar ağırlıklarını destekler',
          'Negatif çevrimleri tespit edebilir',
          'Uygulaması basit ve anlaşılırdır',
        ]}
        disadvantages={[
          "Zaman karmaşıklığı O(V³)'tür, büyük graflarda yavaş",
          'Alan karmaşıklığı O(V²), büyük graflarda bellek problemi',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Ağ yönlendirme protokolleri (OSPF, BGP)',
          'Şehir içi ulaşım planlama sistemleri',
          'Oyun geliştirme (NPC navigasyonu)',
          'Sosyal ağ analizi',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
