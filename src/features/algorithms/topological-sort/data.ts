export const pseudocode = `function topologicalSort(graph):
    visited = {}  # Kalıcı ziyaret edilen düğümler
    tempVisited = {}  # Geçici ziyaret edilen düğümler (çevrim tespiti için)
    result = []  # Sıralama sonucu
    hasCycle = false
    
    function dfs(node):
        if node in tempVisited:  # Çevrim tespiti
            hasCycle = true
            return
        
        if node in visited:  # Zaten işlendi
            return
        
        tempVisited[node] = true  # Geçici ziyaret işaretle
        
        for each neighbor in graph[node]:
            dfs(neighbor)
        
        visited[node] = true  # Kalıcı ziyaret işaretle
        tempVisited[node] = false  # Geçici işareti kaldır
        
        # Düğümü sonuç listesinin başına ekle
        result.insertAt(0, node)
    
    for each node in graph:
        if node not in visited:
            dfs(node)
    
    return { result, hasCycle }`;

export const implementations = {
  typescript: `function topologicalSort(graph: Record<string, string[]>): { result: string[], hasCycle: boolean } {
  const visited: Record<string, boolean> = {};
  const tempVisited: Record<string, boolean> = {};
  const result: string[] = [];
  let hasCycle = false;
  
  function dfs(node: string) {
    if (tempVisited[node]) {
      hasCycle = true;
      return;
    }
    if (visited[node]) {
      return;
    }
    tempVisited[node] = true;
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      dfs(neighbor);
    }
    visited[node] = true;
    tempVisited[node] = false;
    result.unshift(node);
  }
  
  for (const node of Object.keys(graph)) {
    if (!visited[node]) {
      dfs(node);
    }
  }
  
  return { result, hasCycle };
}`,
  python: `def topological_sort(graph):
    visited = set()
    temp_visited = set()
    result = []
    has_cycle = False
    
    def dfs(node):
        nonlocal has_cycle
        if node in temp_visited:
            has_cycle = True
            return
        if node in visited:
            return
            
        temp_visited.add(node)
        for neighbor in graph.get(node, []):
            dfs(neighbor)
            
        visited.add(node)
        temp_visited.remove(node)
        result.insert(0, node)
    
    for node in graph:
        if node not in visited:
            dfs(node)
            
    return {"result": result, "has_cycle": has_cycle}`,
  java: `import java.util.*;

public class TopologicalSort {
    private Map<String, List<String>> graph;
    private Set<String> visited;
    private Set<String> tempVisited;
    private LinkedList<String> result;
    private boolean hasCycle;
    
    public TopologicalSort(Map<String, List<String>> graph) {
        this.graph = graph;
        this.visited = new HashSet<>();
        this.tempVisited = new HashSet<>();
        this.result = new LinkedList<>();
        this.hasCycle = false;
    }
    
    public Map<String, Object> sort() {
        for (String node : graph.keySet()) {
            if (!visited.contains(node)) {
                dfs(node);
            }
        }
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", result);
        resultMap.put("hasCycle", hasCycle);
        return resultMap;
    }
    
    private void dfs(String node) {
        if (tempVisited.contains(node)) {
            hasCycle = true;
            return;
        }
        if (visited.contains(node)) {
            return;
        }
        tempVisited.add(node);
        List<String> neighbors = graph.getOrDefault(node, new ArrayList<>());
        for (String neighbor : neighbors) {
            dfs(neighbor);
        }
        visited.add(node);
        tempVisited.remove(node);
        result.addFirst(node);
    }
}`,
};
