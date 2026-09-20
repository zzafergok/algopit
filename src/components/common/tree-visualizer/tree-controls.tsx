'use client';

import React from 'react';
import { Label } from '@/components/core/label';
import { Select } from '@/components/core/select';
import { Switch } from '@/components/ui/switch';
import { Trie, SegmentTree } from '@/lib/algorithms/data-structures';
import { TreeTrieControls } from './tree-trie-controls';
import { TreeSegmentControls } from './tree-segment-controls';

interface TreeControlsProps {
  currentTreeType: 'trie' | 'segment';
  onTreeTypeChange: (val: 'trie' | 'segment') => void;
  showLabels: boolean;
  onShowLabelsChange: (val: boolean) => void;
  showValues: boolean;
  onShowValuesChange: (val: boolean) => void;
  // Trie props
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
  // Segment tree props
  segmentArray: number[];
  onUpdateSegmentArray: (index: number, val: string) => void;
  onAddToSegmentArray: () => void;
  onRemoveFromSegmentArray: (index: number) => void;
  queryStart: number;
  onQueryStartChange: (val: number) => void;
  queryEnd: number;
  onQueryEndChange: (val: number) => void;
  onQuerySegmentTree: () => void;
  onBuildSegmentTree: () => void;
  queryResult: { sum: number; min: number; max: number } | null;
  segmentTree: SegmentTree | null;
}

export function TreeControls({
  currentTreeType,
  onTreeTypeChange,
  showLabels,
  onShowLabelsChange,
  showValues,
  onShowValuesChange,
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
  segmentArray,
  onUpdateSegmentArray,
  onAddToSegmentArray,
  onRemoveFromSegmentArray,
  queryStart,
  onQueryStartChange,
  queryEnd,
  onQueryEndChange,
  onQuerySegmentTree,
  onBuildSegmentTree,
  queryResult,
  segmentTree,
}: TreeControlsProps) {
  return (
    <div className="space-y-4 p-4 bg-obsidian/60 rounded-sm">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="space-y-2 w-48">
          <Label>Ağaç Türü</Label>
          <Select
            value={currentTreeType}
            onChange={(e) =>
              onTreeTypeChange(e.target.value as 'trie' | 'segment')
            }
          >
            <option value="trie">Trie (Prefix Tree)</option>
            <option value="segment">Segment Tree</option>
          </Select>
        </div>

        <div className="flex flex-wrap gap-4 items-center pt-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-labels"
              checked={showLabels}
              onCheckedChange={onShowLabelsChange}
            />
            <Label htmlFor="show-labels">Etiketleri Göster</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="show-values"
              checked={showValues}
              onCheckedChange={onShowValuesChange}
            />
            <Label htmlFor="show-values">Değerleri Göster</Label>
          </div>
        </div>
      </div>

      {currentTreeType === 'trie' ? (
        <TreeTrieControls
          trie={trie}
          trieWords={trieWords}
          newWord={newWord}
          onNewWordChange={onNewWordChange}
          onAddWord={onAddWord}
          searchTerm={searchTerm}
          onSearchTermChange={onSearchTermChange}
          onSearch={onSearch}
          onRemoveWord={onRemoveWord}
          searchResults={searchResults}
        />
      ) : (
        <TreeSegmentControls
          segmentArray={segmentArray}
          onUpdateSegmentArray={onUpdateSegmentArray}
          onAddToSegmentArray={onAddToSegmentArray}
          onRemoveFromSegmentArray={onRemoveFromSegmentArray}
          queryStart={queryStart}
          onQueryStartChange={onQueryStartChange}
          queryEnd={queryEnd}
          onQueryEndChange={onQueryEndChange}
          onQuerySegmentTree={onQuerySegmentTree}
          onBuildSegmentTree={onBuildSegmentTree}
          queryResult={queryResult}
          segmentTree={segmentTree}
        />
      )}
    </div>
  );
}
