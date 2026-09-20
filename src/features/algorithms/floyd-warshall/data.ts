export const pseudocode = `function floydWarshall(graph):
    n = number of vertices
    dist = adjacency matrix
    next = matrix for path reconstruction
    
    for i = 1 to n:
        for j = 1 to n:
            if i == j: dist[i][j] = 0
            else if edge(i, j): dist[i][j] = weight(i, j); next[i][j] = j
            else: dist[i][j] = infinity; next[i][j] = null
    
    for k = 1 to n:
        for i = 1 to n:
            for j = 1 to n:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next[i][j] = next[i][k]
    return dist, next`;

export const implementations = {
  typescript: `function floydWarshall(n: number, edges: [number, number, number][]) {
  const dist: number[][] = Array.from({ length: n }, () => Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of edges) dist[u][v] = w;

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
  python: `def floyd_warshall(n, edges):
    dist = [[float('inf')] * n for _ in range(n)]
    for i in range(n):
        dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = w
        
    for k in range(n):
        for i in range(n):
            for j in range(n):
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                
    return dist`,
  java: `public class FloydWarshall {
    final static int INF = 99999;
    void floydWarshall(int graph[][], int V) {
        int dist[][] = new int[V][V];
        for (int i = 0; i < V; i++)
            for (int j = 0; j < V; j++) dist[i][j] = graph[i][j];

        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}`,
};
