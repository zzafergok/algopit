import { SegmentTree } from '@/lib/algorithms/data-structures';
import {
  QueryResult,
  PointUpdateResult,
  TreeStats,
  ParseArrayStringResult,
  TreeStatistics,
} from './types';

export const segmentTreeQueryDemo = (input: string | number): string => {
  const parts: string[] = input.toString().split(',');

  if (parts.length !== 3) {
    return 'Lütfen "dizi,başlangıç,bitiş" formatında girin (örn: 1 3 5 7 9,1,3)';
  }

  try {
    const arrayStr: string = parts[0].trim();
    const start: number = parseInt(parts[1].trim());
    const end: number = parseInt(parts[2].trim());

    const array: number[] = arrayStr
      .split(' ')
      .map((x: string) => parseInt(x.trim()))
      .filter((x: number) => !isNaN(x));

    if (array.length === 0) {
      return 'Geçerli bir sayı dizisi girin';
    }

    if (start < 0 || end >= array.length || start > end) {
      return `Geçersiz aralık. 0 ile ${array.length - 1} arasında olmalı`;
    }

    const segTree = new SegmentTree(array);
    const hasStats =
      'getStatistics' in segTree &&
      typeof (segTree as unknown as { getStatistics: () => TreeStatistics })
        .getStatistics === 'function';
    const treeStats = hasStats
      ? (
          segTree as unknown as { getStatistics: () => TreeStatistics }
        ).getStatistics()
      : null;

    const result: QueryResult = {
      array: array,
      queryRange: `[${start}, ${end}]`,
      sum: segTree.querySum(start, end),
      min: segTree.queryMin(start, end),
      max: segTree.queryMax(start, end),
      treeStats,
    };

    return JSON.stringify(result, null, 2);
  } catch (error) {
    return 'Hata: Geçerli format kullanın (örn: 1 3 5 7 9,0,2)';
  }
};

export const pointUpdateDemo = (input: string | number): string => {
  const parts: string[] = input.toString().split(',');

  if (parts.length !== 3) {
    return 'Lütfen "dizi,index,yeniDeğer" formatında girin';
  }

  try {
    const arrayStr: string = parts[0].trim();
    const index: number = parseInt(parts[1].trim());
    const newValue: number = parseInt(parts[2].trim());

    const parseArrayString = (str: string): ParseArrayStringResult => {
      const array: number[] = str
        .split(' ')
        .map((x: string) => parseInt(x.trim()))
        .filter((x: number) => !isNaN(x));

      return { array };
    };

    const { array }: ParseArrayStringResult = parseArrayString(arrayStr);

    if (array.length === 0) {
      return 'Geçerli bir sayı dizisi girin';
    }

    if (index < 0 || index >= array.length) {
      return `Geçersiz index. 0 ile ${array.length - 1} arasında olmalı`;
    }

    const segTree = new SegmentTree(array);
    const oldValue: number = array[index];

    const beforeUpdate: TreeStats = {
      sum: segTree.querySum(0, array.length - 1),
      min: segTree.queryMin(0, array.length - 1),
      max: segTree.queryMax(0, array.length - 1),
    };

    segTree.update(index, newValue);

    const afterUpdate: TreeStats = {
      sum: segTree.querySum(0, array.length - 1),
      min: segTree.queryMin(0, array.length - 1),
      max: segTree.queryMax(0, array.length - 1),
    };

    const result: PointUpdateResult = {
      originalArray: array,
      updatedIndex: index,
      oldValue: oldValue,
      newValue: newValue,
      beforeUpdate,
      afterUpdate,
      updatedArray: segTree.getArray(),
    };

    return JSON.stringify(result, null, 2);
  } catch (error) {
    return 'Hata: Geçerli format kullanın (örn: 1 3 5 7 9,2,10)';
  }
};
