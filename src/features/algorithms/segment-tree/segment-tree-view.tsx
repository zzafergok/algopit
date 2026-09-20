'use client';

import React from 'react';
import { CodeBlock } from '@/components/common/code-block';
import { TreeVisualizer } from '@/components/common/tree-visualizer';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { algorithmData, segmentTreeImplementation } from './data';
import { segmentTreeQueryDemo, pointUpdateDemo } from './demos';
import {
  PerformanceTable,
  SegmentTreeComplexity,
  SegmentTreeAdvancedFeatures,
  SegmentTreeTipsAndPitfalls,
} from './components';

export function SegmentTreeView() {
  return (
    <div className="space-y-8">
      <AlgorithmExplanation {...algorithmData} />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          İnteraktif Segment Tree Görselleştirme
        </h2>
        <p className="text-ash">
          Aşağıdaki görselleştirici ile Segment Tree veri yapısını
          keşfedebilirsiniz. Dizi elemanlarını değiştirin, aralık sorguları
          yapın ve tree&apos;nin nasıl güncellendiğini gözlemleyin.
        </p>
        <TreeVisualizer
          treeType="segment"
          initialData={[1, 3, 5, 7, 9, 11]}
          showControls={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InteractiveDemo
          title="Aralık Sorgusu Demo"
          description="Dizi, başlangıç indeks ve bitiş indeks girerek aralık sorgusu yapın"
          algorithmFunction={segmentTreeQueryDemo}
          inputPlaceholder="1 3 5 7 9,1,3"
          inputType="text"
        />

        <InteractiveDemo
          title="Nokta Güncelleme Demo"
          description="Belirli bir indeksteki değeri güncelleyin"
          algorithmFunction={pointUpdateDemo}
          inputPlaceholder="1 3 5 7 9,2,10"
          inputType="text"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">JavaScript Implementasyonu</h2>
        <p className="text-ash">
          Segment Tree veri yapısının tam JavaScript implementasyonu. Aralık
          sorguları, nokta güncellemeleri ve tree validasyonu özellikleri
          içerir.
        </p>
        <CodeBlock
          code={segmentTreeImplementation}
          language="javascript"
          showLineNumbers={true}
          title="Segment Tree - Tam Implementasyon"
        />
      </div>

      <SegmentTreeComplexity />
      <SegmentTreeAdvancedFeatures />
      <PerformanceTable />
      <SegmentTreeTipsAndPitfalls />
    </div>
  );
}
