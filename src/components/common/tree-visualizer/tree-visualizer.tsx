'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Trie, SegmentTree } from '@/lib/algorithms/data-structures';
import { TreeVisualizerProps } from './types';
import { convertTrieToVisualization } from './trie-layout';
import { convertSegmentTreeToVisualization } from './segment-layout';
import { TreeControls } from './tree-controls';
import { TreeCanvas } from './tree-canvas';
import { TreeInfoCards } from './tree-info-cards';

export function TreeVisualizer({
  className,
  treeType = 'trie',
  showControls = true,
  initialData,
}: TreeVisualizerProps) {
  const [currentTreeType, setCurrentTreeType] = useState<'trie' | 'segment'>(
    treeType,
  );

  const [trie, setTrie] = useState<Trie>(() => {
    const newTrie = new Trie();
    if (currentTreeType === 'trie' && initialData) {
      (initialData as string[]).forEach((word) => newTrie.insert(word));
    }
    return newTrie;
  });
  const [trieWords, setTrieWords] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newWord, setNewWord] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const [segmentArray, setSegmentArray] = useState<number[]>(() =>
    currentTreeType === 'segment' && initialData
      ? (initialData as number[])
      : [1, 3, 5, 7, 9, 11],
  );
  const [segmentTree, setSegmentTree] = useState<SegmentTree | null>(null);
  const [queryStart, setQueryStart] = useState<number>(0);
  const [queryEnd, setQueryEnd] = useState<number>(2);
  const [queryResult, setQueryResult] = useState<{
    sum: number;
    min: number;
    max: number;
  } | null>(null);

  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showValues, setShowValues] = useState<boolean>(true);

  const buildSegmentTree = useCallback(() => {
    if (segmentArray.length === 0) return;
    const newTree = new SegmentTree(segmentArray);
    setSegmentTree(newTree);
  }, [segmentArray]);

  useEffect(() => {
    if (currentTreeType === 'trie') {
      const newTrie = new Trie();
      const defaultWords = [
        'cat',
        'car',
        'card',
        'care',
        'careful',
        'cats',
        'dog',
        'dogs',
      ];
      defaultWords.forEach((word) => newTrie.insert(word));
      setTrie(newTrie);
      setTrieWords(defaultWords);
    } else {
      buildSegmentTree();
    }
  }, [currentTreeType, buildSegmentTree]);

  const addWordToTrie = useCallback(() => {
    if (newWord.trim() && !trieWords.includes(newWord.trim().toLowerCase())) {
      const word = newWord.trim().toLowerCase();
      trie.insert(word);
      setTrieWords((prev) => [...prev, word]);
      setNewWord('');
    }
  }, [newWord, trie, trieWords]);

  const removeWordFromTrie = useCallback(
    (word: string) => {
      if (trie.delete(word)) {
        setTrieWords((prev) => prev.filter((w) => w !== word));
      }
    },
    [trie],
  );

  const searchInTrie = useCallback(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      const results = trie.getWordsWithPrefix(term);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, trie]);

  const updateSegmentArray = useCallback(
    (index: number, newValue: string) => {
      const value = parseInt(newValue) || 0;
      const newArray = [...segmentArray];
      newArray[index] = value;
      setSegmentArray(newArray);
    },
    [segmentArray],
  );

  const addToSegmentArray = useCallback(() => {
    setSegmentArray((prev) => [...prev, 0]);
  }, []);

  const removeFromSegmentArray = useCallback(
    (index: number) => {
      if (segmentArray.length > 1) {
        setSegmentArray((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [segmentArray],
  );

  const querySegmentTree = useCallback(() => {
    if (
      segmentTree &&
      queryStart <= queryEnd &&
      queryStart >= 0 &&
      queryEnd < segmentArray.length
    ) {
      const sum = segmentTree.querySum(queryStart, queryEnd);
      const min = segmentTree.queryMin(queryStart, queryEnd);
      const max = segmentTree.queryMax(queryStart, queryEnd);
      setQueryResult({ sum, min, max });
    }
  }, [segmentTree, queryStart, queryEnd, segmentArray.length]);

  useEffect(() => {
    if (currentTreeType === 'segment') {
      buildSegmentTree();
    }
  }, [segmentArray, currentTreeType, buildSegmentTree]);

  useEffect(() => {
    if (currentTreeType === 'trie') {
      searchInTrie();
    }
  }, [searchTerm, currentTreeType, searchInTrie]);

  const visualizationData = useMemo(() => {
    if (currentTreeType === 'trie') {
      return convertTrieToVisualization(trie);
    } else {
      return convertSegmentTreeToVisualization(segmentTree);
    }
  }, [currentTreeType, trie, segmentTree]);

  return (
    <div className={cn('space-y-6', className)}>
      {showControls && (
        <TreeControls
          currentTreeType={currentTreeType}
          onTreeTypeChange={setCurrentTreeType}
          showLabels={showLabels}
          onShowLabelsChange={setShowLabels}
          showValues={showValues}
          onShowValuesChange={setShowValues}
          trie={trie}
          trieWords={trieWords}
          newWord={newWord}
          onNewWordChange={setNewWord}
          onAddWord={addWordToTrie}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearch={searchInTrie}
          onRemoveWord={removeWordFromTrie}
          searchResults={searchResults}
          segmentArray={segmentArray}
          onUpdateSegmentArray={updateSegmentArray}
          onAddToSegmentArray={addToSegmentArray}
          onRemoveFromSegmentArray={removeFromSegmentArray}
          queryStart={queryStart}
          onQueryStartChange={setQueryStart}
          queryEnd={queryEnd}
          onQueryEndChange={setQueryEnd}
          onQuerySegmentTree={querySegmentTree}
          onBuildSegmentTree={buildSegmentTree}
          queryResult={queryResult}
          segmentTree={segmentTree}
        />
      )}

      <TreeCanvas
        currentTreeType={currentTreeType}
        visualizationData={visualizationData}
        showLabels={showLabels}
        showValues={showValues}
      />

      <TreeInfoCards currentTreeType={currentTreeType} />
    </div>
  );
}
