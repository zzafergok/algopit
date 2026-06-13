'use client';

import React from 'react';

import { MSTVisualizer } from '@/components/common/mst-visualizer';
import { AlgorithmExplanation } from '@/components/common/explanation';

export default function KruskalPage() {
  const pseudocode = `function kruskal(graph):
    mst = empty set
    edges = sort all edges by weight in ascending order
    unionFind = initialize union-find structure for all vertices
    
    for each edge (u, v) in edges:
        if find(unionFind, u) != find(unionFind, v):
            // Adding this edge won't create a cycle
            add edge (u, v) to mst
            union(unionFind, u, v)
            
            if mst has (V-1) edges:
                break  // MST is complete
    
    return mst`;

  const implementations = {
    typescript: `interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface UnionFind {
  parent: Map<string, string>;
  rank: Map<string, number>;
}

// Kruskal's algorithm for Minimum Spanning Tree
function kruskal(graph: Graph): {
  mstEdges: Edge[];
  totalWeight: number;
  steps: { edge: Edge; action: 'add' | 'reject'; reason: string }[];
} {
  const sortedEdges = [...graph.edges].sort((a, b) => a.weight - b.weight);
  const mstEdges: Edge[] = [];
  const steps: { edge: Edge; action: 'add' | 'reject'; reason: string }[] = [];
  const unionFind = createUnionFind(Array.from(graph.nodes.keys()));
  let totalWeight = 0;

  // Process edges in order of increasing weight
  for (const edge of sortedEdges) {
    const rootFrom = find(unionFind, edge.from);
    const rootTo = find(unionFind, edge.to);

    // Check if adding this edge would create a cycle
    if (rootFrom !== rootTo) {
      union(unionFind, edge.from, edge.to);
      mstEdges.push(edge);
      totalWeight += edge.weight;
      steps.push({ 
        edge, 
        action: 'add', 
        reason: \`Added edge (\${edge.from} -> \${edge.to}) with weight \${edge.weight}\` 
      });
      
      // Stop when we have n-1 edges for n nodes
      if (mstEdges.length === graph.nodes.size - 1) {
        break;
      }
    } else {
      steps.push({ 
        edge, 
        action: 'reject', 
        reason: \`Rejected edge (\${edge.from} -> \${edge.to}) - would create cycle\` 
      });
    }
  }

  return { mstEdges, totalWeight, steps };
}

// Union-Find data structure implementation
function createUnionFind(nodes: string[]): UnionFind {
  const parent = new Map<string, string>();
  const rank = new Map<string, number>();

  // Initialize each node as its own parent with rank 0
  nodes.forEach(node => {
    parent.set(node, node);
    rank.set(node, 0);
  });

  return { parent, rank };
}

// Find operation with path compression
function find(unionFind: UnionFind, node: string): string {
  if (unionFind.parent.get(node) !== node) {
    // Path compression optimization
    unionFind.parent.set(node, find(unionFind, unionFind.parent.get(node)!));
  }
  return unionFind.parent.get(node)!;
}

// Union operation by rank
function union(unionFind: UnionFind, node1: string, node2: string): void {
  const root1 = find(unionFind, node1);
  const root2 = find(unionFind, node2);

  if (root1 === root2) return;

  const rank1 = unionFind.rank.get(root1)!;
  const rank2 = unionFind.rank.get(root2)!;

  // Union by rank optimization
  if (rank1 < rank2) {
    unionFind.parent.set(root1, root2);
  } else if (rank1 > rank2) {
    unionFind.parent.set(root2, root1);
  } else {
    unionFind.parent.set(root2, root1);
    unionFind.rank.set(root1, rank1 + 1);
  }
}

// Usage example
const graph = createExampleGraph();
const result = kruskal(graph);
console.log('MST edges:', result.mstEdges);
console.log('Total weight:', result.totalWeight);`,
    python: `from typing import List, Dict, Tuple, Set
import heapq

class Edge:
    def __init__(self, from_vertex: str, to_vertex: str, weight: float):
        self.from_vertex = from_vertex
        self.to_vertex = to_vertex
        self.weight = weight
    
    def __lt__(self, other):
        return self.weight < other.weight
    
    def __repr__(self):
        return f"Edge({self.from_vertex} -> {self.to_vertex}, weight: {self.weight})"

class UnionFind:
    def __init__(self, vertices: List[str]):
        self.parent = {vertex: vertex for vertex in vertices}
        self.rank = {vertex: 0 for vertex in vertices}
    
    def find(self, vertex: str) -> str:
        """Find operation with path compression"""
        if self.parent[vertex] != vertex:
            # Path compression optimization
            self.parent[vertex] = self.find(self.parent[vertex])
        return self.parent[vertex]
    
    def union(self, vertex1: str, vertex2: str) -> bool:
        """Union operation by rank"""
        root1 = self.find(vertex1)
        root2 = self.find(vertex2)
        
        if root1 == root2:
            return False  # Already in same set
        
        # Union by rank optimization
        if self.rank[root1] < self.rank[root2]:
            self.parent[root1] = root2
        elif self.rank[root1] > self.rank[root2]:
            self.parent[root2] = root1
        else:
            self.parent[root2] = root1
            self.rank[root1] += 1
        
        return True

class KruskalMST:
    def __init__(self, vertices: List[str]):
        self.vertices = vertices
        self.edges: List[Edge] = []
    
    def add_edge(self, from_vertex: str, to_vertex: str, weight: float):
        """Add an edge to the graph"""
        self.edges.append(Edge(from_vertex, to_vertex, weight))
    
    def find_mst(self) -> Tuple[List[Edge], float, List[Dict]]:
        """
        Find Minimum Spanning Tree using Kruskal's algorithm
        
        Returns:
            Tuple of (mst_edges, total_weight, algorithm_steps)
        """
        if not self.vertices:
            return [], 0.0, []
        
        # Sort edges by weight
        sorted_edges = sorted(self.edges)
        union_find = UnionFind(self.vertices)
        
        mst_edges: List[Edge] = []
        total_weight = 0.0
        steps = []
        
        for edge in sorted_edges:
            # Check if adding this edge creates a cycle
            if union_find.find(edge.from_vertex) != union_find.find(edge.to_vertex):
                # Add edge to MST
                union_find.union(edge.from_vertex, edge.to_vertex)
                mst_edges.append(edge)
                total_weight += edge.weight
                
                steps.append({
                    'edge': edge,
                    'action': 'add',
                    'reason': f'Added edge ({edge.from_vertex} -> {edge.to_vertex}) with weight {edge.weight}'
                })
                
                # MST is complete when we have (V-1) edges
                if len(mst_edges) == len(self.vertices) - 1:
                    break
            else:
                steps.append({
                    'edge': edge,
                    'action': 'reject',
                    'reason': f'Rejected edge ({edge.from_vertex} -> {edge.to_vertex}) - would create cycle'
                })
        
        return mst_edges, total_weight, steps
    
    def print_mst(self):
        """Print the Minimum Spanning Tree"""
        mst_edges, total_weight, steps = self.find_mst()
        
        print("Minimum Spanning Tree (Kruskal's Algorithm):")
        print("-" * 50)
        
        for i, edge in enumerate(mst_edges, 1):
            print(f"{i}. {edge.from_vertex} -- {edge.to_vertex} (weight: {edge.weight})")
        
        print(f"\\nTotal weight: {total_weight}")
        print(f"Number of edges: {len(mst_edges)}")
        
        return mst_edges, total_weight

# Usage example
def main():
    # Create a graph with vertices
    vertices = ['A', 'B', 'C', 'D', 'E', 'F']
    kruskal_mst = KruskalMST(vertices)
    
    # Add edges (from, to, weight)
    edges_data = [
        ('A', 'B', 4), ('A', 'F', 2),
        ('B', 'C', 6), ('B', 'F', 5),
        ('C', 'D', 3), ('C', 'F', 1),
        ('D', 'E', 2), ('D', 'F', 4),
        ('E', 'F', 4)
    ]
    
    for from_v, to_v, weight in edges_data:
        kruskal_mst.add_edge(from_v, to_v, weight)
    
    # Find and print MST
    mst_edges, total_weight = kruskal_mst.print_mst()
    
    # Print algorithm steps
    _, _, steps = kruskal_mst.find_mst()
    print("\\nAlgorithm Steps:")
    for i, step in enumerate(steps, 1):
        print(f"{i}. {step['reason']}")

if __name__ == "__main__":
    main()`,
    java: `import java.util.*;

class Edge implements Comparable<Edge> {
    String from, to;
    int weight;
    
    public Edge(String from, String to, int weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
    
    @Override
    public int compareTo(Edge other) {
        return Integer.compare(this.weight, other.weight);
    }
    
    @Override
    public String toString() {
        return String.format("Edge(%s -> %s, weight: %d)", from, to, weight);
    }
}

class UnionFind {
    private Map<String, String> parent;
    private Map<String, Integer> rank;
    
    public UnionFind(Set<String> vertices) {
        parent = new HashMap<>();
        rank = new HashMap<>();
        
        for (String vertex : vertices) {
            parent.put(vertex, vertex);
            rank.put(vertex, 0);
        }
    }
    
    public String find(String vertex) {
        if (!parent.get(vertex).equals(vertex)) {
            // Path compression optimization
            parent.put(vertex, find(parent.get(vertex)));
        }
        return parent.get(vertex);
    }
    
    public boolean union(String vertex1, String vertex2) {
        String root1 = find(vertex1);
        String root2 = find(vertex2);
        
        if (root1.equals(root2)) {
            return false; // Already in same set
        }
        
        // Union by rank optimization
        int rank1 = rank.get(root1);
        int rank2 = rank.get(root2);
        
        if (rank1 < rank2) {
            parent.put(root1, root2);
        } else if (rank1 > rank2) {
            parent.put(root2, root1);
        } else {
            parent.put(root2, root1);
            rank.put(root1, rank1 + 1);
        }
        
        return true;
    }
}

class KruskalResult {
    List<Edge> mstEdges;
    int totalWeight;
    List<String> steps;
    
    public KruskalResult(List<Edge> mstEdges, int totalWeight, List<String> steps) {
        this.mstEdges = mstEdges;
        this.totalWeight = totalWeight;
        this.steps = steps;
    }
}

public class KruskalMST {
    private Set<String> vertices;
    private List<Edge> edges;
    
    public KruskalMST() {
        vertices = new HashSet<>();
        edges = new ArrayList<>();
    }
    
    public void addVertex(String vertex) {
        vertices.add(vertex);
    }
    
    public void addEdge(String from, String to, int weight) {
        vertices.add(from);
        vertices.add(to);
        edges.add(new Edge(from, to, weight));
    }
    
    public KruskalResult findMST() {
        if (vertices.isEmpty()) {
            return new KruskalResult(new ArrayList<>(), 0, new ArrayList<>());
        }
        
        // Sort edges by weight
        Collections.sort(edges);
        
        UnionFind unionFind = new UnionFind(vertices);
        List<Edge> mstEdges = new ArrayList<>();
        List<String> steps = new ArrayList<>();
        int totalWeight = 0;
        
        for (Edge edge : edges) {
            // Check if adding this edge creates a cycle
            if (!unionFind.find(edge.from).equals(unionFind.find(edge.to))) {
                // Add edge to MST
                unionFind.union(edge.from, edge.to);
                mstEdges.add(edge);
                totalWeight += edge.weight;
                
                steps.add(String.format("Added edge (%s -> %s) with weight %d", 
                    edge.from, edge.to, edge.weight));
                
                // MST is complete when we have (V-1) edges
                if (mstEdges.size() == vertices.size() - 1) {
                    break;
                }
            } else {
                steps.add(String.format("Rejected edge (%s -> %s) - would create cycle", 
                    edge.from, edge.to));
            }
        }
        
        return new KruskalResult(mstEdges, totalWeight, steps);
    }
    
    public void printMST() {
        KruskalResult result = findMST();
        
        System.out.println("Minimum Spanning Tree (Kruskal's Algorithm):");
        System.out.println("-".repeat(50));
        
        for (int i = 0; i < result.mstEdges.size(); i++) {
            Edge edge = result.mstEdges.get(i);
            System.out.printf("%d. %s -- %s (weight: %d)%n", 
                i + 1, edge.from, edge.to, edge.weight);
        }
        
        System.out.printf("%nTotal weight: %d%n", result.totalWeight);
        System.out.printf("Number of edges: %d%n", result.mstEdges.size());
        
        System.out.println("\\nAlgorithm Steps:");
        for (int i = 0; i < result.steps.size(); i++) {
            System.out.printf("%d. %s%n", i + 1, result.steps.get(i));
        }
    }
    
    public static void main(String[] args) {
        KruskalMST kruskal = new KruskalMST();
        
        // Add edges to create a sample graph
        int[][] edgesData = {
            {'A', 'B', 4}, {'A', 'F', 2},
            {'B', 'C', 6}, {'B', 'F', 5},
            {'C', 'D', 3}, {'C', 'F', 1},
            {'D', 'E', 2}, {'D', 'F', 4},
            {'E', 'F', 4}
        };
        
        for (int[] edgeData : edgesData) {
            kruskal.addEdge(
                String.valueOf((char) edgeData[0]), 
                String.valueOf((char) edgeData[1]), 
                edgeData[2]
            );
        }
        
        kruskal.printMST();
    }
}`,
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Kruskal's Algorithm (Kruskal Algoritması)"
        description="Kruskal algoritması, ağırlıklı bağlı bir grafta Minimum Spanning Tree (Minimum Yayılma Ağacı) bulan açgözlü bir algoritmadır. Joseph Kruskal tarafından 1956'da geliştirilmiş olup, kenar tabanlı bir yaklaşım kullanır ve Union-Find veri yapısından yararlanır."
        timeComplexity={{
          best: 'O(E log E)',
          average: 'O(E log E)',
          worst: 'O(E log E)',
        }}
        spaceComplexity="O(V)"
        advantages={[
          'Sparse (seyrek) graflar için verimlidir',
          'Kenar tabanlı yaklaşımı anlaşılması kolaydır',
          'Union-Find optimizasyonları ile hızlı çalışır',
          'Tüm kenarları aynı anda işleyebilir',
          'Paralel işleme uygun bir yapıya sahiptir',
          'Deterministik sonuçlar verir',
        ]}
        disadvantages={[
          'Kenarları sıralama işlemi O(E log E) zaman alır',
          'Dense (yoğun) graflar için Prim algoritmasından yavaş olabilir',
          'Union-Find veri yapısı ek karmaşıklık getirir',
          'Başlangıç düğümü seçimi yapılamaz',
          'Büyük edge sayısına sahip graflarda bellek sorunu yaşanabilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Ağ tasarımı ve kablo döşeme optimizasyonu',
          'Telefon hatları ve internet altyapısı planlaması',
          'Şehir planlama ve yol ağları tasarımı',
          'Kümeleme algoritmaları (clustering)',
          'Image segmentation (görüntü bölütleme)',
          'Circuit design ve PCB tasarımı',
          'Social network analysis',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
