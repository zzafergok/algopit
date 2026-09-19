'use client';

import React from 'react';
import { CodeBlock } from '@/components/common/code-block';
import { TreeVisualizer } from '@/components/common/tree-visualizer';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { algorithmData, segmentTreeImplementation } from './data';
import { segmentTreeQueryDemo, pointUpdateDemo } from './demos';
import { PerformanceTable } from './components';

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

      <div className="bg-obsidian/60 p-6 rounded-sm">
        <h3 className="text-xl font-bold mb-4">
          Zaman ve Alan Karmaşıklığı Analizi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-void-black p-4 rounded">
            <h4 className="font-semibold text-arcly-blue mb-3">
              Zaman Karmaşıklığı
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Build Operation:</strong> O(n) - linear time
              </div>
              <div>
                <strong>Range Query:</strong> O(log n) - logarithmic
              </div>
              <div>
                <strong>Point Update:</strong> O(log n) - logarithmic
              </div>
              <div>
                <strong>Range Update:</strong> O(log n) with lazy propagation
              </div>
              <div>
                <strong>Space Usage:</strong> O(n) - linear space
              </div>
            </div>
          </div>
          <div className="bg-void-black p-4 rounded">
            <h4 className="font-semibold text-signal-green mb-3">
              Karşılaştırma
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Naive Approach:</strong> O(n) query, O(1) update
              </div>
              <div>
                <strong>Prefix Sum:</strong> O(1) query, O(n) update
              </div>
              <div>
                <strong>Segment Tree:</strong> O(log n) query ve update
              </div>
              <div>
                <strong>Square Root Decomposition:</strong> O(√n) both
              </div>
              <div>
                <strong>Fenwick Tree:</strong> O(log n) - daha az memory
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <div>
            <strong className="text-arcly-blue dark:text-arcly-blue/80">
              Array Boyutu:
            </strong>
            <span className="ml-2">
              n boyutlu dizi için Segment Tree en fazla 4*n düğüme ihtiyaç
              duyar.
            </span>
          </div>
          <div>
            <strong className="text-arcly-blue dark:text-arcly-blue/80">
              Lazy Propagation:
            </strong>
            <span className="ml-2">
              Frequent range updates varsa mutlaka lazy propagation
              implementasyonu yapın.
            </span>
          </div>
          <div>
            <strong className="text-arcly-blue dark:text-arcly-blue/80">
              Alternative:
            </strong>
            <span className="ml-2">
              Sadece sum queries varsa Fenwick Tree daha memory efficient
              olabilir.
            </span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-sm">
        <h3 className="text-xl font-bold mb-4 text-indigo-800 dark:text-indigo-200">
          İleri Seviye Segment Tree Özellikleri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">
              Lazy Propagation ile Range Update
            </h4>
            <div className="bg-card dark:bg-obsidian p-4 rounded text-sm">
              <pre className="overflow-x-auto">
                {`// Lazy propagation örneği
class LazySegmentTree {
  updateRange(start, end, delta) {
    this.updateRangeLazy(this.root, start, end, delta);
  }
  
  updateRangeLazy(node, start, end, delta) {
    if (node.hasLazyValue) {
      node.sum += node.lazyValue * (node.end - node.start + 1);
      if (node.left) {
        node.left.lazyValue += node.lazyValue;
        node.left.hasLazyValue = true;
      }
      if (node.right) {
        node.right.lazyValue += node.lazyValue;
        node.right.hasLazyValue = true;
      }
      node.lazyValue = 0;
      node.hasLazyValue = false;
    }
    
    if (start <= node.start && end >= node.end) {
      node.lazyValue += delta;
      node.hasLazyValue = true;
      return;
    }
    
    const mid = Math.floor((node.start + node.end) / 2);
    if (start <= mid) {
      this.updateRangeLazy(node.left, start, end, delta);
    }
    if (end > mid) {
      this.updateRangeLazy(node.right, start, end, delta);
    }
  }
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">
              2D Segment Tree Örneği
            </h4>
            <div className="bg-card dark:bg-obsidian p-4 rounded text-sm">
              <pre className="overflow-x-auto">
                {`// 2D Segment Tree temel yapısı
class SegmentTree2D {
  constructor(matrix) {
    this.rows = matrix.length;
    this.cols = matrix[0].length;
    this.tree = this.build2D(matrix);
  }
  
  queryRect(x1, y1, x2, y2) {
    return this.queryRows(0, 0, this.rows - 1, x1, x2, y1, y2);
  }
  
  queryRows(node, start, end, x1, x2, y1, y2) {
    if (x1 > end || x2 < start) return 0;
    
    if (x1 <= start && end <= x2) {
      return this.queryCols(this.tree[node], 0, this.cols - 1, y1, y2);
    }
    
    const mid = Math.floor((start + end) / 2);
    return this.queryRows(2*node+1, start, mid, x1, x2, y1, y2) +
           this.queryRows(2*node+2, mid+1, end, x1, x2, y1, y2);
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-alert-red/10 dark:bg-alert-red/10 p-6 rounded-sm">
        <h3 className="text-xl font-bold mb-4 text-alert-red dark:text-alert-red/70">
          Competitive Programming İpuçları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-alert-red dark:text-alert-red/80 mb-2">
              Hızlı Template
            </h4>
            <div className="text-sm space-y-1">
              <div>• Array-based implementation kullanın (4*n boyut)</div>
              <div>
                • 1-indexed arrays tercih edin (implementation kolaylığı)
              </div>
              <div>• Recursive yerine iterative yaklaşım kullanın</div>
              <div>• Macro&apos;lar ile kod uzunluğunu azaltın</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-alert-red dark:text-alert-red/80 mb-2">
              Debug Teknikleri
            </h4>
            <div className="text-sm space-y-1">
              <div>• Tree&apos;yi print eden fonksiyon yazın</div>
              <div>• Küçük test case&apos;lerle doğrulayın</div>
              <div>• Edge case&apos;leri (tek eleman, boş dizi) test edin</div>
              <div>• Lazy propagation&apos;da push fonksiyonunu unutmayın</div>
            </div>
          </div>
        </div>
      </div>

      <PerformanceTable />

      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-sm">
        <h3 className="text-xl font-bold mb-4 text-orange-800 dark:text-orange-200">
          Yaygın Hatalar ve Çözümleri
        </h3>
        <div className="space-y-4">
          <div className="bg-card dark:bg-obsidian p-4 rounded">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
              ❌ Yanlış Array Boyutu
            </h4>
            <p className="text-sm mb-2">
              Segment tree için 4*n boyutunda array kullanmamak overflow&apos;a
              neden olur.
            </p>
            <div className="text-xs bg-gunmetal/20 dark:bg-gunmetal p-2 rounded">
              <code>// Yanlış: tree = new Array(2*n)</code>
              <br />
              <code>// Doğru: tree = new Array(4*n)</code>
            </div>
          </div>

          <div className="bg-card dark:bg-obsidian p-4 rounded">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
              ❌ Lazy Propagation Unutmak
            </h4>
            <p className="text-sm mb-2">
              Range update sonrası query yapmadan önce push fonksiyonunu
              çağırmamak.
            </p>
            <div className="text-xs bg-gunmetal/20 dark:bg-gunmetal p-2 rounded">
              <code>// Her query/update başında push() çağırmalı</code>
            </div>
          </div>

          <div className="bg-card dark:bg-obsidian p-4 rounded">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
              ❌ Edge Case Kontrolsüzlüğü
            </h4>
            <p className="text-sm mb-2">
              Boş aralık sorguları ve geçersiz indeksler için kontrol yapmamak.
            </p>
            <div className="text-xs bg-gunmetal/20 dark:bg-gunmetal p-2 rounded">
              <code>{`if (queryStart > queryEnd || queryEnd < nodeStart) return neutral;`}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
