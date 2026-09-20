'use client';

import React from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { Input } from '@/components/core/input';
import { Label } from '@/components/core/label';
import { Button } from '@/components/core/button';
import { SegmentTree } from '@/lib/algorithms/data-structures';

interface TreeSegmentControlsProps {
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

export function TreeSegmentControls({
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
}: TreeSegmentControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Dizi Elemanları</Label>
        <div className="flex flex-wrap gap-2">
          {segmentArray.map((value, index) => (
            <div key={index} className="flex items-center gap-1">
              <Input
                type="number"
                value={value}
                onChange={(e) => onUpdateSegmentArray(index, e.target.value)}
                className="w-16 text-center"
              />
              <Button
                onClick={() => onRemoveFromSegmentArray(index)}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                disabled={segmentArray.length <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button onClick={onAddToSegmentArray} variant="outline" size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Sorgu Başlangıç İndeksi</Label>
          <Input
            type="number"
            value={queryStart}
            onChange={(e) => onQueryStartChange(parseInt(e.target.value) || 0)}
            min="0"
            max={segmentArray.length - 1}
          />
        </div>

        <div className="space-y-2">
          <Label>Sorgu Bitiş İndeksi</Label>
          <Input
            type="number"
            value={queryEnd}
            onChange={(e) => onQueryEndChange(parseInt(e.target.value) || 0)}
            min="0"
            max={segmentArray.length - 1}
          />
        </div>

        <div className="space-y-2">
          <Label>&nbsp;</Label>
          <Button onClick={onQuerySegmentTree} className="w-full">
            Sorgu Çalıştır
          </Button>
        </div>
      </div>

      <Button
        onClick={onBuildSegmentTree}
        variant="outline"
        className="flex items-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Ağacı Yeniden Oluştur
      </Button>

      {queryResult && (
        <div className="p-4 bg-signal-green/10 rounded border border-signal-green/30">
          <h4 className="font-semibold text-signal-green mb-2">
            Sorgu Sonucu [{queryStart}, {queryEnd}]
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-signal-green">Toplam:</span>
              <div className="text-xl font-bold text-signal-green">
                {queryResult.sum}
              </div>
            </div>
            <div>
              <span className="font-medium text-signal-green">Minimum:</span>
              <div className="text-xl font-bold text-signal-green">
                {queryResult.min}
              </div>
            </div>
            <div>
              <span className="font-medium text-signal-green">Maksimum:</span>
              <div className="text-xl font-bold text-signal-green">
                {queryResult.max}
              </div>
            </div>
          </div>
        </div>
      )}

      {segmentTree && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-void-black rounded border">
          <div className="text-center">
            <div className="text-xl font-bold text-arcly-blue">
              {segmentArray.length}
            </div>
            <div className="text-sm text-ash">Dizi Boyutu</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-arcly-blue">
              {segmentTree.getHeight()}
            </div>
            <div className="text-sm text-ash">Ağaç Yüksekliği</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-arcly-blue">
              {segmentTree.querySum(0, segmentArray.length - 1)}
            </div>
            <div className="text-sm text-ash">Toplam Değer</div>
          </div>
        </div>
      )}
    </div>
  );
}
