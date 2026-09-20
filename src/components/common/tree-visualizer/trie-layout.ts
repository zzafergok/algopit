import { Trie, TrieNode } from '@/lib/algorithms/data-structures';
import { TrieVisualizationNode } from './types';

export function convertTrieToVisualization(
  trie: Trie,
): TrieVisualizationNode[] {
  const nodeWidth = 60;
  const levelHeight = 80;

  const root: TrieVisualizationNode = {
    char: 'ROOT',
    isEndOfWord: false,
    children: [],
    level: 0,
    x: 0,
    y: 0,
  };

  const queue: {
    trieNode: TrieNode;
    visNode: TrieVisualizationNode;
    path: string;
    level: number;
  }[] = [
    {
      trieNode: (trie as unknown as { root: TrieNode }).root,
      visNode: root,
      path: '',
      level: 0,
    },
  ];

  const levelNodes: TrieVisualizationNode[][] = [[]];
  levelNodes[0].push(root);

  while (queue.length > 0) {
    const { trieNode, visNode, path, level } = queue.shift()!;

    if (trieNode.children) {
      const childrenArray = Array.from(trieNode.children.entries());
      childrenArray.forEach(([char, childTrieNode]) => {
        const childPath = path + char;
        const childVisNode: TrieVisualizationNode = {
          char,
          isEndOfWord: childTrieNode.isEndOfWord,
          children: [],
          level: level + 1,
          x: 0,
          y: (level + 1) * levelHeight,
          word: childTrieNode.isEndOfWord ? childTrieNode.value : undefined,
          count: childTrieNode.count,
        };

        visNode.children.push(childVisNode);

        if (!levelNodes[level + 1]) {
          levelNodes[level + 1] = [];
        }
        levelNodes[level + 1].push(childVisNode);

        queue.push({
          trieNode: childTrieNode,
          visNode: childVisNode,
          path: childPath,
          level: level + 1,
        });
      });
    }
  }

  levelNodes.forEach((levelNodeList, level) => {
    const totalWidth = levelNodeList.length * nodeWidth * 2;
    const startX = -totalWidth / 2;

    levelNodeList.forEach((node, index) => {
      node.x = startX + index * nodeWidth * 2 + nodeWidth;
      node.y = level * levelHeight + 50;
    });
  });

  const setParentCoordinates = (
    node: TrieVisualizationNode,
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
