import React from 'react';

export function SegmentTreeAdvancedFeatures() {
  return (
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
  );
}
