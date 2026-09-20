'use client';

import React from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { MSTVisualizer } from '@/components/common/mst-visualizer';
import { pseudocode, implementations } from './data';

export function PrimView() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Görselleştirici</h2>
        <MSTVisualizer algorithm="prim" />
      </div>

      <AlgorithmExplanation
        title="Prim's Algorithm (Prim Algoritması)"
        description="Prim algoritması, ağırlıklı bağlantılı bir grafın minimum yayılma ağacını (MST) bulmak için kullanılan açgözlü bir algoritmadır. Algoritma, bir düğümden başlayarak her adımda mevcut ağaca en yakın düğümü ekler."
        timeComplexity={{
          best: 'O(E log V)',
          average: 'O(E log V)',
          worst: 'O(E log V)',
        }}
        spaceComplexity="O(V)"
        advantages={[
          'Dense graflarda Kruskal algoritmasından daha etkilidir',
          'Öncelik kuyruğu ile verimli implementasyon mümkündür',
          'Her zaman bağlı bir MST oluşturur',
          'Incremental olarak MST inşa eder',
        ]}
        disadvantages={[
          'Sparse graflarda Kruskal algoritmasından yavaş olabilir',
          'Union-Find yapısına göre daha karmaşık veri yapıları gerektirir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Ağ tasarımı ve kablolama maliyeti minimizasyonu',
          'Cluster analysis ve phylogenetic trees',
          'Telekomünikasyon şebekesi planlaması',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
