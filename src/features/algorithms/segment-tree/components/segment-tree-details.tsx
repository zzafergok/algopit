import React from 'react';

export function SegmentTreeComplexity() {
  return (
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
            n boyutlu dizi için Segment Tree en fazla 4*n düğüme ihtiyaç duyar.
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
  );
}

export function SegmentTreeTipsAndPitfalls() {
  return (
    <>
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
    </>
  );
}
