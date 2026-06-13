'use client';

import React from 'react';

import { AlgorithmExplanation } from '@/components/common/explanation';
import { MatrixVisualizer } from '@/components/common/matrix-visualizer';

export default function FloydWarshallPage() {
  const pseudocode = `function floydWarshall(graph):
    n = number of vertices
    dist = adjacency matrix (distance[i][j] = weight of edge from i to j)
    next = matrix for path reconstruction
    
    // Initialize distance matrix
    for i = 1 to n:
        for j = 1 to n:
            if i == j:
                dist[i][j] = 0
            else if edge exists from i to j:
                dist[i][j] = weight(i, j)
                next[i][j] = j
            else:
                dist[i][j] = infinity
                next[i][j] = null
    
    // Main algorithm - try all intermediate vertices
    for k = 1 to n:
        for i = 1 to n:
            for j = 1 to n:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next[i][j] = next[i][k]
    
    return dist, next`;

  const implementations = {
    typescript: `interface Graph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

// Floyd-Warshall algorithm for all-pairs shortest paths
function floydWarshall(graph: Graph): {
  distances: Map<string, Map<string, number>>;
  next: Map<string, Map<string, string | null>>;
} {
  const nodeIds = Array.from(graph.nodes.keys());
  const distances = new Map<string, Map<string, number>>();
  const next = new Map<string, Map<string, string | null>>();

  // Initialize distance and next matrices
  nodeIds.forEach(i => {
    distances.set(i, new Map<string, number>());
    next.set(i, new Map<string, string | null>());
    
    nodeIds.forEach(j => {
      if (i === j) {
        distances.get(i)!.set(j, 0);
      } else {
        distances.get(i)!.set(j, Infinity);
      }
      next.get(i)!.set(j, null);
    });
  });

  // Set direct edge distances
  graph.edges.forEach(edge => {
    distances.get(edge.from)!.set(edge.to, edge.weight);
    next.get(edge.from)!.set(edge.to, edge.to);
  });

  // Main Floyd-Warshall algorithm
  nodeIds.forEach(k => {
    nodeIds.forEach(i => {
      nodeIds.forEach(j => {
        const currentDistance = distances.get(i)!.get(j)!;
        const newDistance = distances.get(i)!.get(k)! + distances.get(k)!.get(j)!;
        
        if (newDistance < currentDistance) {
          distances.get(i)!.set(j, newDistance);
          next.get(i)!.set(j, next.get(i)!.get(k));
        }
      });
    });
  });

  return { distances, next };
}

// Reconstruct shortest path between two nodes
function reconstructPath(
  next: Map<string, Map<string, string | null>>,
  start: string,
  end: string
): string[] {
  if (next.get(start)!.get(end) === null) {
    return []; // No path exists
  }

  const path: string[] = [start];
  let current = start;

  while (current !== end) {
    current = next.get(current)!.get(end)!;
    path.push(current);
  }

  return path;
}

// Usage example
const graph: Graph = createExampleGraph();
const result = floydWarshall(graph);
const path = reconstructPath(result.next, '0', '3');
console.log('Shortest path from 0 to 3:', path);
console.log('Distance:', result.distances.get('0')!.get('3'));`,
    python: `from typing import Dict, List, Tuple, Optional
import math

class FloydWarshall:
    def __init__(self, num_vertices: int):
        self.num_vertices = num_vertices
        self.distance_matrix = [[math.inf] * num_vertices for _ in range(num_vertices)]
        self.next_matrix = [[None] * num_vertices for _ in range(num_vertices)]
        
        # Initialize diagonal to 0 (distance from vertex to itself)
        for i in range(num_vertices):
            self.distance_matrix[i][i] = 0
    
    def add_edge(self, from_vertex: int, to_vertex: int, weight: float):
        """Add an edge to the graph"""
        self.distance_matrix[from_vertex][to_vertex] = weight
        self.next_matrix[from_vertex][to_vertex] = to_vertex
    
    def run_algorithm(self) -> Tuple[List[List[float]], List[List[Optional[int]]]]:
        """
        Run Floyd-Warshall algorithm to find all-pairs shortest paths
        
        Returns:
            Tuple of (distance_matrix, next_matrix) for path reconstruction
        """
        n = self.num_vertices
        
        # Main Floyd-Warshall algorithm
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    # Check if path through vertex k is shorter
                    if (self.distance_matrix[i][k] + self.distance_matrix[k][j] < 
                        self.distance_matrix[i][j]):
                        
                        self.distance_matrix[i][j] = (
                            self.distance_matrix[i][k] + self.distance_matrix[k][j]
                        )
                        self.next_matrix[i][j] = self.next_matrix[i][k]
        
        return self.distance_matrix, self.next_matrix
    
    def reconstruct_path(self, start: int, end: int) -> List[int]:
        """
        Reconstruct shortest path between two vertices
        
        Args:
            start: Starting vertex
            end: Ending vertex
            
        Returns:
            List of vertices in the shortest path, empty if no path exists
        """
        if self.next_matrix[start][end] is None:
            return []  # No path exists
        
        path = [start]
        current = start
        
        while current != end:
            current = self.next_matrix[current][end]
            if current is None:
                return []  # Path reconstruction failed
            path.append(current)
        
        return path
    
    def get_shortest_distance(self, start: int, end: int) -> float:
        """Get shortest distance between two vertices"""
        return self.distance_matrix[start][end]
    
    def print_distance_matrix(self):
        """Print the distance matrix in a readable format"""
        print("Distance Matrix:")
        print("     ", end="")
        for j in range(self.num_vertices):
            print(f"{j:6}", end="")
        print()
        
        for i in range(self.num_vertices):
            print(f"{i:3}: ", end="")
            for j in range(self.num_vertices):
                if self.distance_matrix[i][j] == math.inf:
                    print("  ∞   ", end="")
                else:
                    print(f"{self.distance_matrix[i][j]:6.1f}", end="")
            print()
    
    def detect_negative_cycle(self) -> bool:
        """
        Detect if there's a negative cycle in the graph
        
        Returns:
            True if negative cycle exists, False otherwise
        """
        for i in range(self.num_vertices):
            if self.distance_matrix[i][i] < 0:
                return True
        return False

# Usage example
def main():
    # Create a graph with 4 vertices
    fw = FloydWarshall(4)
    
    # Add edges (from, to, weight)
    fw.add_edge(0, 1, 3)
    fw.add_edge(0, 3, 7)
    fw.add_edge(1, 0, 8)
    fw.add_edge(1, 2, 2)
    fw.add_edge(2, 0, 5)
    fw.add_edge(2, 3, 1)
    fw.add_edge(3, 0, 2)
    
    # Run the algorithm
    distances, next_vertices = fw.run_algorithm()
    
    # Print results
    fw.print_distance_matrix()
    
    # Find shortest path between vertices 1 and 3
    path = fw.reconstruct_path(1, 3)
    distance = fw.get_shortest_distance(1, 3)
    
    print(f"\\nShortest path from 1 to 3: {' -> '.join(map(str, path))}")
    print(f"Distance: {distance}")
    
    # Check for negative cycles
    if fw.detect_negative_cycle():
        print("\\nWarning: Negative cycle detected!")
    else:
        print("\\nNo negative cycles found.")

if __name__ == "__main__":
    main()`,
    java: `import java.util.*;

public class FloydWarshall {
    private int numVertices;
    private double[][] distanceMatrix;
    private Integer[][] nextMatrix;
    private static final double INF = Double.POSITIVE_INFINITY;
    
    public FloydWarshall(int numVertices) {
        this.numVertices = numVertices;
        this.distanceMatrix = new double[numVertices][numVertices];
        this.nextMatrix = new Integer[numVertices][numVertices];
        
        // Initialize matrices
        for (int i = 0; i < numVertices; i++) {
            for (int j = 0; j < numVertices; j++) {
                if (i == j) {
                    distanceMatrix[i][j] = 0;
                } else {
                    distanceMatrix[i][j] = INF;
                }
                nextMatrix[i][j] = null;
            }
        }
    }
    
    /**
     * Add an edge to the graph
     */
    public void addEdge(int from, int to, double weight) {
        distanceMatrix[from][to] = weight;
        nextMatrix[from][to] = to;
    }
    
    /**
     * Run Floyd-Warshall algorithm to find all-pairs shortest paths
     */
    public void runAlgorithm() {
        // Main Floyd-Warshall algorithm
        for (int k = 0; k < numVertices; k++) {
            for (int i = 0; i < numVertices; i++) {
                for (int j = 0; j < numVertices; j++) {
                    // Check if path through vertex k is shorter
                    if (distanceMatrix[i][k] + distanceMatrix[k][j] < distanceMatrix[i][j]) {
                        distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
                        nextMatrix[i][j] = nextMatrix[i][k];
                    }
                }
            }
        }
    }
    
    /**
     * Reconstruct shortest path between two vertices
     */
    public List<Integer> reconstructPath(int start, int end) {
        if (nextMatrix[start][end] == null) {
            return new ArrayList<>(); // No path exists
        }
        
        List<Integer> path = new ArrayList<>();
        path.add(start);
        int current = start;
        
        while (current != end) {
            current = nextMatrix[current][end];
            if (current == null) {
                return new ArrayList<>(); // Path reconstruction failed
            }
            path.add(current);
        }
        
        return path;
    }
    
    /**
     * Get shortest distance between two vertices
     */
    public double getShortestDistance(int start, int end) {
        return distanceMatrix[start][end];
    }
    
    /**
     * Print the distance matrix in a readable format
     */
    public void printDistanceMatrix() {
        System.out.println("Distance Matrix:");
        System.out.print("     ");
        for (int j = 0; j < numVertices; j++) {
            System.out.printf("%6d", j);
        }
        System.out.println();
        
        for (int i = 0; i < numVertices; i++) {
            System.out.printf("%3d: ", i);
            for (int j = 0; j < numVertices; j++) {
                if (distanceMatrix[i][j] == INF) {
                    System.out.print("  ∞   ");
                } else {
                    System.out.printf("%6.1f", distanceMatrix[i][j]);
                }
            }
            System.out.println();
        }
    }
    
    /**
     * Detect if there's a negative cycle in the graph
     */
    public boolean hasNegativeCycle() {
        for (int i = 0; i < numVertices; i++) {
            if (distanceMatrix[i][i] < 0) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Get all shortest paths from a source vertex
     */
    public Map<Integer, Double> getShortestDistancesFrom(int source) {
        Map<Integer, Double> distances = new HashMap<>();
        for (int i = 0; i < numVertices; i++) {
            distances.put(i, distanceMatrix[source][i]);
        }
        return distances;
    }
    
    public static void main(String[] args) {
        // Create a graph with 4 vertices
        FloydWarshall fw = new FloydWarshall(4);
        
        // Add edges (from, to, weight)
        fw.addEdge(0, 1, 3);
        fw.addEdge(0, 3, 7);
        fw.addEdge(1, 0, 8);
        fw.addEdge(1, 2, 2);
        fw.addEdge(2, 0, 5);
        fw.addEdge(2, 3, 1);
        fw.addEdge(3, 0, 2);
        
        // Run the algorithm
        fw.runAlgorithm();
        
        // Print results
        fw.printDistanceMatrix();
        
        // Find shortest path between vertices 1 and 3
        List<Integer> path = fw.reconstructPath(1, 3);
        double distance = fw.getShortestDistance(1, 3);
        
        System.out.println("\\nShortest path from 1 to 3: " + 
            String.join(" -> ", path.stream().map(String::valueOf).toArray(String[]::new)));
        System.out.println("Distance: " + distance);
        
        // Check for negative cycles
        if (fw.hasNegativeCycle()) {
            System.out.println("\\nWarning: Negative cycle detected!");
        } else {
            System.out.println("\\nNo negative cycles found.");
        }
    }
}`,
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Floyd-Warshall Algoritması"
        description="Floyd-Warshall algoritması, ağırlıklı bir grafta tüm düğüm çiftleri arasındaki en kısa yolları bulan dinamik programlama tabanlı bir algoritmadır. Roy Warshall ve Robert Floyd tarafından geliştirilmiş olup, pozitif ve negatif kenar ağırlıklarını destekler ancak negatif çevrimler olmamalıdır."
        timeComplexity={{
          best: 'O(V³)',
          average: 'O(V³)',
          worst: 'O(V³)',
        }}
        spaceComplexity="O(V²)"
        advantages={[
          'Tüm düğüm çiftleri arasındaki en kısa yolları tek seferde bulur',
          'Negatif kenar ağırlıklarını destekler',
          'Negatif çevrimleri tespit edebilir',
          'Uygulaması basit ve anlaşılırdır',
          'Yol rekonstrüksiyonu için next matrisi sağlar',
          'Dense (yoğun) graflarda verimli çalışır',
        ]}
        disadvantages={[
          "Zaman karmaşıklığı O(V³)'tür, büyük graflarda yavaş",
          'Alan karmaşıklığı O(V²), büyük graflarda bellek problemi',
          'Negatif çevrimler varsa sonuçlar geçersiz olur',
          'Sparse (seyrek) graflarda diğer algoritmalardan daha yavaş',
          'Tek kaynak en kısa yol problemleri için aşırı kapsamlı',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Ağ yönlendirme protokolleri (OSPF, BGP)',
          'Şehir içi ulaşım planlama sistemleri',
          'Oyun geliştirme (NPC navigasyonu)',
          'Sosyal ağ analizi (bağlantı mesafeleri)',
          'Malzeme akış optimizasyonu',
          'Grafik teorisi araştırmaları',
          'Coğrafi bilgi sistemleri (GIS)',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
