import React from 'react';
import type { Metadata } from 'next';
import { TrieView } from '@/features/algorithms/trie';
import { createAlgorithmMetadata, getAlgorithmSchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createAlgorithmMetadata({
  title: 'Trie (Prefix Tree) Veri Yapısı',
  description: 'Trie veri yapısı, prefix arama, otomatik tamamlama algoritmaları ve interaktif ağaç görselleştirici.',
  path: '/algorithms/data-structures/trie',
  category: 'Veri Yapıları',
  difficulty: 'Orta',
});

export default function TriePage() {
  const schema = getAlgorithmSchema({
    name: 'Trie (Prefix Tree) Veri Yapısı',
    description: 'Trie veri yapısı, prefix arama, otomatik tamamlama algoritmaları ve interaktif ağaç görselleştirici.',
    category: 'Veri Yapıları',
    categoryHref: '/algorithms/data-structures',
    path: '/algorithms/data-structures/trie',
    difficulty: 'Orta',
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <JsonLd data={schema} />
      <TrieView />
    </div>
  );
}
