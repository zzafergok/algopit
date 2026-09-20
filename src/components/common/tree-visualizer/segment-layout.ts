import { SegmentTree, SegmentTreeNode } from '@/lib/algorithms/data-structures';
import { SegmentTreeVisualizationNode } from './types';

export function convertSegmentTreeToVisualization(
  segmentTree: SegmentTree | null,
): SegmentTreeVisualizationNode[] {
  if (!segmentTree) return [];

  const nodeWidth = 80;
  const levelHeight = 100;

  const treeRoot = segmentTree.getTreeStructure();
  if (!treeRoot) return [];

  const queue: {
    segNode: SegmentTreeNode;
    visNode: SegmentTreeVisualizationNode;
    level: number;
  }[] = [];

  const root: SegmentTreeVisualizationNode = {
    value: `[${treeRoot.start}-${treeRoot.end}]`,
    start: treeRoot.start,
    end: treeRoot.end,
    sum: treeRoot.sum,
    min: treeRoot.min,
    max: treeRoot.max,
    children: [],
    level: 0,
    x: 0,
    y: 50,
    isLeaf: treeRoot.start === treeRoot.end,
  };

  queue.push({ segNode: treeRoot, visNode: root, level: 0 });

  const levelNodes: SegmentTreeVisualizationNode[][] = [[]];
  levelNodes[0].push(root);

  while (queue.length > 0) {
    const { segNode, visNode, level } = queue.shift()!;

    if (segNode.left) {
      const leftChild: SegmentTreeVisualizationNode = {
        value: `[${segNode.left.start}-${segNode.left.end}]`,
        start: segNode.left.start,
        end: segNode.left.end,
        sum: segNode.left.sum,
        min: segNode.left.min,
        max: segNode.left.max,
        children: [],
        level: level + 1,
        x: 0,
        y: (level + 1) * levelHeight + 50,
        isLeaf: segNode.left.start === segNode.left.end,
      };

      visNode.children.push(leftChild);

      if (!levelNodes[level + 1]) {
        levelNodes[level + 1] = [];
      }
      levelNodes[level + 1].push(leftChild);

      queue.push({
        segNode: segNode.left,
        visNode: leftChild,
        level: level + 1,
      });
    }

    if (segNode.right) {
      const rightChild: SegmentTreeVisualizationNode = {
        value: `[${segNode.right.start}-${segNode.right.end}]`,
        start: segNode.right.start,
        end: segNode.right.end,
        sum: segNode.right.sum,
        min: segNode.right.min,
        max: segNode.right.max,
        children: [],
        level: level + 1,
        x: 0,
        y: (level + 1) * levelHeight + 50,
        isLeaf: segNode.right.start === segNode.right.end,
      };

      visNode.children.push(rightChild);

      if (!levelNodes[level + 1]) {
        levelNodes[level + 1] = [];
      }
      levelNodes[level + 1].push(rightChild);

      queue.push({
        segNode: segNode.right,
        visNode: rightChild,
        level: level + 1,
      });
    }
  }

  // Calculate positions for each level
  levelNodes.forEach((levelNodeList, level) => {
    const totalWidth = levelNodeList.length * nodeWidth * 1.5;
    const startX = -totalWidth / 2;

    levelNodeList.forEach((node, index) => {
      node.x = startX + index * nodeWidth * 1.5 + nodeWidth / 2;
    });
  });

  // Set parent coordinates for line drawing
  const setParentCoordinates = (
    node: SegmentTreeVisualizationNode,
    parentX?: number,
    parentY?: number,
  ) => {
    if (parentX !== undefined && parentY !== undefined) {
      node.parentX = parentX;
      node.parentY = parentY;
    }

    node.children.forEach((child) => {
      setParentCoordinates(child, node.x, node.y);
    });
  };

  setParentCoordinates(root);

  return [root];
}
