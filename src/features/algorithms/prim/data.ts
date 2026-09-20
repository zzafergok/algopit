export const pseudocode = `function Prim(graph, startVertex):
    mst = []
    visited = set()
    priorityQueue = MinHeap()
    
    visited.add(startVertex)
    for edge in graph.edges(startVertex):
        priorityQueue.insert(edge, edge.weight)
    
    while priorityQueue is not empty and len(visited) < graph.vertexCount:
        edge = priorityQueue.extractMin()
        if edge.to not in visited:
            mst.append(edge)
            visited.add(edge.to)
            for newEdge in graph.edges(edge.to):
                if newEdge.to not in visited:
                    priorityQueue.insert(newEdge, newEdge.weight)
    return mst`;

export const implementations = {
  typescript: `interface Edge {
  from: string;
  to: string;
  weight: number;
}

function prim(vertices: string[], edges: Edge[], startVertex: string) {
  const mst: Edge[] = [];
  const visited = new Set<string>([startVertex]);
  
  while (visited.size < vertices.length) {
    let minEdge: Edge | null = null;
    
    for (const edge of edges) {
      const fromVisited = visited.has(edge.from);
      const toVisited = visited.has(edge.to);
      
      if ((fromVisited && !toVisited) || (!fromVisited && toVisited)) {
        if (!minEdge || edge.weight < minEdge.weight) {
          minEdge = edge;
        }
      }
    }
    
    if (!minEdge) break;
    mst.push(minEdge);
    visited.add(minEdge.from);
    visited.add(minEdge.to);
  }
  return mst;
}`,
  python: `import heapq

def prim(graph, start_vertex):
    mst = []
    visited = set([start_vertex])
    edges = [(weight, start_vertex, to) for to, weight in graph[start_vertex]]
    heapq.heapify(edges)
    
    while edges and len(visited) < len(graph):
        weight, frm, to = heapq.heappop(edges)
        if to not in visited:
            visited.add(to)
            mst.append((frm, to, weight))
            for next_to, next_weight in graph[to]:
                if next_to not in visited:
                    heapq.heappush(edges, (next_weight, to, next_to))
                    
    return mst`,
  java: `public class PrimMST {
    // Prim's MST implementation with PriorityQueue
}`,
};
