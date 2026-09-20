import React from 'react';
import type { Metadata } from 'next';
import { TrieView } from '@/features/algorithms/trie';

export const metadata: Metadata = {
  title: 'Trie (Prefix Tree) Veri Yapısı | AlgoPit',
  description:
    'Trie veri yapısı, prefix arama, otomatik tamamlama algoritmaları ve interaktif ağaç görselleştirici.',
};

export default function TriePage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <TrieView />
    </div>
  );
}
