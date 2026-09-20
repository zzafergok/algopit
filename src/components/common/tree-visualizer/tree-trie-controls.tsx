'use client';

import React from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { Input } from '@/components/core/input';
import { Label } from '@/components/core/label';
import { Button } from '@/components/core/button';
import { Trie } from '@/lib/algorithms/data-structures';

interface TreeTrieControlsProps {
  trie: Trie;
  trieWords: string[];
  newWord: string;
  onNewWordChange: (val: string) => void;
  onAddWord: () => void;
  searchTerm: string;
  onSearchTermChange: (val: string) => void;
  onSearch: () => void;
  onRemoveWord: (word: string) => void;
  searchResults: string[];
}

export function TreeTrieControls({
  trie,
  trieWords,
  newWord,
  onNewWordChange,
  onAddWord,
  searchTerm,
  onSearchTermChange,
  onSearch,
  onRemoveWord,
  searchResults,
}: TreeTrieControlsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Kelime Ekle</Label>
          <div className="flex gap-2">
            <Input
              value={newWord}
              onChange={(e) => onNewWordChange(e.target.value)}
              placeholder="Yeni kelime..."
              onKeyDown={(e) => e.key === 'Enter' && onAddWord()}
            />
            <Button onClick={onAddWord} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Kelime Ara / Prefix</Label>
          <div className="flex gap-2">
            <Input
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder="Arama terimi..."
            />
            <Button onClick={onSearch} size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Mevcut Kelimeler ({trie.getWordCount()})</Label>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {trieWords.map((word) => (
            <div
              key={word}
              className="flex items-center gap-1 px-2 py-1 bg-arcly-blue/15 text-arcly-blue rounded text-sm"
            >
              <span>{word}</span>
              <Button
                onClick={() => onRemoveWord(word)}
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-alert-red/15"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="space-y-2">
          <Label>Arama Sonuçları</Label>
          <div className="flex flex-wrap gap-2">
            {searchResults.map((word) => (
              <div
                key={word}
                className="px-2 py-1 bg-signal-green/15 text-signal-green rounded text-sm"
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-void-black rounded border">
        <div className="text-center">
          <div className="text-xl font-bold text-arcly-blue">
            {trie.getWordCount()}
          </div>
          <div className="text-sm text-ash">Toplam Kelime</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-arcly-blue">
            {searchResults.length}
          </div>
          <div className="text-sm text-ash">Bulunan Sonuç</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-arcly-blue">
            {trie.startsWith(searchTerm) ? 'Evet' : 'Hayır'}
          </div>
          <div className="text-sm text-ash">Prefix Var mı?</div>
        </div>
      </div>
    </div>
  );
}
