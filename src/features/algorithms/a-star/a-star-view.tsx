'use client';

import React from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { GridVisualizer } from '@/components/common/grid-visualizer';
import { pseudocode, implementations } from './data';

export function AStarView() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Grid Görselleştirici</h2>
        <GridVisualizer algorithm="astar" />
      </div>

      <AlgorithmExplanation
        title="A* (A-Star) Algoritması"
        description="A* algoritması, graf teorisinde en kısa yolu bulmak için kullanılan optimal ve tam bir arama algoritmasıdır. Dijkstra algoritmasının geliştirilmiş hali olup, heuristik fonksiyon kullanarak daha hızlı sonuç elde eder."
        timeComplexity={{
          best: 'O(b^d)',
          average: 'O(b^d)',
          worst: 'O(b^d)',
        }}
        spaceComplexity="O(b^d)"
        advantages={[
          'Optimal çözüm garantisi sağlar (admissible heuristic ile)',
          'Dijkstra algoritmasından genellikle daha hızlıdır',
          'Heuristik fonksiyon ile yönlendirilebilir arama yapar',
          'Çok çeşitli problem türlerine uygulanabilir',
        ]}
        disadvantages={[
          'Heuristik fonksiyonun kalitesine bağımlıdır',
          'Büyük graf yapılarında yüksek bellek tüketimi',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Video oyunlarında NPC navigasyonu ve yol bulma',
          'Robotik hareket planlaması',
          'Harita ve GPS navigasyon sistemleri',
          'Ağ paket yönlendirme algoritmaları',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
