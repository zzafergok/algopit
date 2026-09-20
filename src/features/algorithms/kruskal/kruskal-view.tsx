'use client';

import React from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { MSTVisualizer } from '@/components/common/mst-visualizer';
import { pseudocode, implementations } from './data';

export function KruskalView() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Görselleştirici</h2>
        <MSTVisualizer algorithm="kruskal" />
      </div>

      <AlgorithmExplanation
        title="Kruskal's Algorithm (Kruskal Algoritması)"
        description="Kruskal algoritması, ağırlıklı bağlı bir grafta Minimum Spanning Tree (Minimum Yayılma Ağacı) bulan açgözlü bir algoritmadır. Joseph Kruskal tarafından 1956'da geliştirilmiş olup, kenar tabanlı bir yaklaşım kullanır ve Union-Find veri yapısından yararlanır."
        timeComplexity={{
          best: 'O(E log E)',
          average: 'O(E log E)',
          worst: 'O(E log E)',
        }}
        spaceComplexity="O(V)"
        advantages={[
          'Sparse (seyrek) graflar için verimlidir',
          'Kenar tabanlı yaklaşımı anlaşılması kolaydır',
          'Union-Find optimizasyonları ile hızlı çalışır',
          'Tüm kenarları aynı anda işleyebilir',
        ]}
        disadvantages={[
          'Kenarları sıralama işlemi O(E log E) zaman alır',
          'Dense (yoğun) graflar için Prim algoritmasından yavaş olabilir',
          'Union-Find veri yapısı ek karmaşıklık getirir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Ağ tasarımı ve kablo döşeme optimizasyonu',
          'Telefon hatları ve internet altyapısı planlaması',
          'Şehir planlama ve yol ağları tasarımı',
          'Kümeleme algoritmaları (clustering)',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
