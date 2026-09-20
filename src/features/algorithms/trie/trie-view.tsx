'use client';

import React from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { TreeVisualizer } from '@/components/common/tree-visualizer';
import { pseudocode, implementations } from './data';

export function TrieView() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Ağaç Görselleştirici</h2>
        <TreeVisualizer treeType="trie" />
      </div>

      <AlgorithmExplanation
        title="Trie (Prefix Tree) Veri Yapısı"
        description="Trie, prefix tree olarak da bilinen, string verilerini verimli bir şekilde saklamak ve araştırmak için kullanılan ağaç benzeri bir veri yapısıdır. Her düğüm bir karakteri temsil eder ve kök düğümden yapraklara doğru giden yol bir string oluşturur."
        timeComplexity={{
          best: 'O(m)',
          average: 'O(m)',
          worst: 'O(m)',
        }}
        spaceComplexity="O(ALPHABET_SIZE * N * M)"
        advantages={[
          'Hızlı prefix arama ve otomatik tamamlama',
          'Arama süresi kelime uzunluğuna (m) bağlıdır, eleman sayısından bağımsızdır',
          'Ortak prefixler için bellek tasarrufu',
          'Sözlük sıralaması (lexicographical) doğal olarak korunur',
        ]}
        disadvantages={[
          'Yüksek bellek tüketimi (her düğümde çok sayıda işaretçi)',
          'Cache-locality düşüktür',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Google Search ve IDE autocomplete sistemleri',
          'Yazım denetimi (Spell Checkers)',
          'IP yönlendirme tabloları (Longest Prefix Match)',
          'Sözlük uygulamaları ve kelime oyunları',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
