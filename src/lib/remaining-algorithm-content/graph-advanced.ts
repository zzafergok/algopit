import type { RemainingAlgorithmContent } from './types';

export const graphTraversalsContent: RemainingAlgorithmContent = {
  title: 'Graf Dolaşma ve Arama (Graph Traversals & Searching)',
  category: 'Graf Algoritmaları',
  categoryHref: '/algorithms/graph-algorithms',
  family: 'Graph / Traversals',
  difficulty: 'Orta',
  sources: ['DSA', 'Sedgewick'],
  summary: 'Graf düğümlerini öncelik kuyruğu kullanarak belirli ağırlıklara göre ziyaret eden Öncelik Öncelikli Dolaşma (PFS) ve çevrim tespiti (Cycle Testing) yöntemleridir.',
  descriptionParagraphs: [
    'Graf dolaşma algoritmaları, graf yapısındaki tüm düğüm ve kenarların belirli bir sırada ziyaret edilmesini sağlar. BFS ve DFS temel dolaşma yöntemleridir.',
    'Öncelik Öncelikli Dolaşma (PFS - Priority-First Search), kuyruk yerine bir öncelik kuyruğu kullanarak bir sonraki ziyaret edilecek düğümü kenar ağırlıklarına göre dinamik olarak seçer. Sedgewick notlarında bu yöntem, seyrek graflarda adjacency list ile O(E log V) (Sparse PFS), yoğun graflarda ise adjacency matrix ile O(V^2) (Dense PFS) zamanda çalışacak şekilde iki varyantta optimize edilir.',
    'Çevrim Testi (Cycle Testing) ve tüm çevrimleri dolaşma şemaları, grafın DFS ile taranması sırasında ebeveyn olmayan, daha önce ziyaret edilmiş bir düğüme geri yönlü kenar (back edge) bulunup bulunmadığını kontrol ederek çevrimleri doğrular.'
  ],
  sourceNotes: [
    'DSA: Breadth-first tree traversal visits nodes level by level using a queue.',
    'Sedgewick: PFS uses a priority queue to generalize graph search. Sparse PFS runs in O(E log V) and Dense PFS in O(V^2).'
  ],
  steps: [
    'PFS için: Başlangıç düğümünü öncelik kuyruğuna ekle ve mesafesini 0 yap.',
    'Kuyruk boş olmadığı sürece en yüksek öncelikli (en kısa mesafeli) düğümü çek.',
    'Ziyaret edilmemişse ziyaret edildi olarak işaretle ve komşu düğümlerin mesafelerini gevşeterek (relaxation) kuyruğu güncelle.',
    'Çevrim tespiti için: DFS başlat. Ziyaret edilen düğümleri aktif çağrı yığınında tut. Komşu düğüm zaten yığındaysa çevrim bulunmuştur.'
  ],
  pseudocode: `PFS(G, start)
  for each vertex u in G
    dist[u] <- infinity
    parent[u] <- NIL
  dist[start] <- 0
  Insert start into priority queue PQ
  while PQ is not empty
    u <- POP-MIN(PQ)
    for each neighbor v of u
      if dist[u] + weight(u, v) < dist[v]
        dist[v] <- dist[u] + weight(u, v)
        parent[v] <- u
        DECREASE-KEY(PQ, v, dist[v])`,
  codeExamples: {
    typescript: `function hasCycleDFS(adjList: Map<number, number[]>, node: number, visited: Set<number>, recStack: Set<number>, parent: number | null = null): boolean {
  visited.add(node);
  recStack.add(node);

  const neighbors = adjList.get(node) ?? [];
  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      if (hasCycleDFS(adjList, neighbor, visited, recStack, node)) return true;
    } else if (recStack.has(neighbor) && neighbor !== parent) {
      return true; // Back edge bulduk, çevrim var
    }
  }

  recStack.delete(node);
  return false;
}

function detectCycle(n: number, edges: [number, number][]): boolean {
  const adjList = new Map<number, number[]>();
  for (const [u, v] of edges) {
    if (!adjList.has(u)) adjList.set(u, []);
    if (!adjList.has(v)) adjList.set(v, []);
    adjList.get(u)!.push(v);
    adjList.get(v)!.push(u); // Un-directed graf varsayımı
  }

  const visited = new Set<number>();
  const recStack = new Set<number>();

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      if (hasCycleDFS(adjList, i, visited, recStack)) return true;
    }
  }
  return false;
}`,
    python: `def has_cycle_dfs(adj, node, visited, rec_stack, parent=None):
    visited.add(node)
    rec_stack.add(node)
    for neighbor in adj.get(node, []):
        if neighbor not in visited:
            if has_cycle_dfs(adj, neighbor, visited, rec_stack, node):
                return True
        elif neighbor in rec_stack and neighbor != parent:
            return True
    rec_stack.remove(node)
    return False`
  },
  demo: {
    kind: 'graph-traversals',
    title: 'Graf Dolaşma ve Çevrim Testi Demo',
    description: 'Düğüm sayısını ve kenarları girin. Çevrim test edilecektir. Örnek: 4; 0-1, 1-2, 2-3, 3-0',
    placeholder: '4; 0-1, 1-2, 2-3, 3-0'
  },
  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V log V + E)',
    worst: 'O(V^2) yoğun graflarda'
  },
  spaceComplexity: 'O(V + E) adj listesi ve ziyaretçi yığınları',
  analysisTitle: 'Sparse vs Dense PFS Karşılaştırması',
  analysisPoints: [
    'Seyrek graflarda (Sparse E ≈ V), adjacency list ve binary heap öncelik kuyruğu kullanımı O(E log V) süreyle optimumdur.',
    'Yoğun graflarda (Dense E ≈ V^2), öncelik kuyruğu araması yerine basit bir dizi araması (linear scan) tercih edilir, bu da PFS\'i O(V^2) süresine çeker ve heap aşımını önler.',
    'Çevrim testleri DFS tabanlı çalıştırıldığında O(V + E) doğrusal zamanda sonlanır.'
  ],
  advantages: [
    'PFS, Dijkstra ve Prim gibi birçok ağırlıklı graf probleminin genel çatı algoritmasıdır.',
    'Çevrim testi graflarda kilitlenmeleri (deadlock) önceden fark etmeyi sağlar.'
  ],
  disadvantages: [
    'Öncelik kuyruğunun bellek ve operasyonel karmaşıklığı basit BFS/DFS kuyruklarına göre fazladır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Breadth-First Search (BFS)',
      description: 'Öncelik yerine kuyruk (LIFO) kullanan standart dolaşma.',
      href: '/algorithms/graph-algorithms/bfs'
    },
    {
      title: 'Depth-First Search (DFS)',
      description: 'Öncelik yerine yığın (FIFO) kullanan derinlemesine dolaşma.',
      href: '/algorithms/graph-algorithms/dfs'
    }
  ]
};

export const shortestPathsMstContent: RemainingAlgorithmContent = {
  title: 'En Kısa Yollar ve MST (Shortest Paths & MST)',
  category: 'Graf Algoritmaları',
  categoryHref: '/algorithms/graph-algorithms',
  family: 'Graph / Optimization',
  difficulty: 'Zor',
  sources: ['Aho', 'Sedgewick'],
  summary: 'Dijkstra veya BFS tarafından bulunan en kısa yolun ebeveyn işaretçileriyle ekrana yazdırılması ve 2 boyutlu düzlemde noktalar arası Öklid MST ağacı çıkarılması işlemleridir.',
  descriptionParagraphs: [
    'En Kısa Yollar ve Minimum Spanning Tree (MST) algoritmaları, ağ tasarımlarında ve optimizasyon problemlerinde kritik rol oynar.',
    'En Kısa Yol Yazdırma (Shortest Path Printing), Dijkstra veya Bellman-Ford gibi algoritmaların hesapladığı mesafe dizilerinin ötesinde, ebeveyn dizisinden (prev[]) geri izleme yaparak başlangıç düğümünden hedef düğüme giden gerçek yolu sırasıyla yazar.',
    'Öklid MST (Euclidean Minimum Spanning Tree), 2D koordinat düzlemindeki noktaları düğüm kabul eder ve noktalar arasındaki mesafeleri kenar ağırlığı (Öklid mesafesi) sayarak tüm noktaları minimum maliyetle birleştiren ağacı bulur.'
  ],
  sourceNotes: [
    'Aho: Shortest path printing uses recursive backtrack from target to source using parent pointers.',
    'Sedgewick: Euclidean MST constructs MST on a complete graph of V points where weights are Euclidean distances.'
  ],
  steps: [
    'Yol Yazdırma için: prev[] dizisini doldur (Dijkstra çalıştır). Target düğümünden başla, target !== null olduğu sürece parent değerine zıpla ve yığına ekle, yığını tersten yazdır.',
    'Öklid MST için: Noktaların koordinatlarını al.',
    'Tüm nokta çiftleri arasındaki Öklid mesafelerini hesaplayıp tam bağlı graf (complete graph) oluştur.',
    'Kruskal veya Prim algoritmasını kullanarak bu grafın MST\'sini elde et.'
  ],
  pseudocode: `PRINT-PATH(prev, target)
  path <- EmptyList
  curr <- target
  while curr is not NIL
    Prepend curr to path
    curr <- prev[curr]
  PRINT path`,
  codeExamples: {
    typescript: `function getEuclideanDistance(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

function buildEuclideanMST(points: [number, number][]): Array<{ u: number; v: number; weight: number }> {
  const n = points.length;
  const edges: Array<{ u: number; v: number; weight: number }> = [];

  // 1. Tüm çiftler arası kenarları hesapla
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push({ u: i, v: j, weight: getEuclideanDistance(points[i], points[j]) });
    }
  }

  // 2. Kruskal çalıştır
  edges.sort((a, b) => a.weight - b.weight);
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(i: number): number {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  }

  const mst: Array<{ u: number; v: number; weight: number }> = [];
  for (const edge of edges) {
    const rootU = find(edge.u);
    const rootV = find(edge.v);
    if (rootU !== rootV) {
      mst.push(edge);
      parent[rootU] = rootV;
      if (mst.length === n - 1) break;
    }
  }
  return mst;
}`,
    python: `import math

def euclidean_dist(p1, p2):
    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

def build_euclidean_mst(points):
    n = len(points)
    edges = []
    for i in range(n):
        for j in range(i + 1, n):
            edges.append((i, j, euclidean_dist(points[i], points[j])))
    edges.sort(key=lambda x: x[2])
    
    parent = list(range(n))
    def find(i):
        if parent[i] == i:
            return i
        parent[i] = find(parent[i])
        return parent[i]
        
    mst = []
    for u, v, w in edges:
        root_u = find(u)
        root_v = find(v)
        if root_u != root_v:
            mst.append((u, v, w))
            parent[root_u] = root_v
    return mst`
  },
  demo: {
    kind: 'shortest-paths-mst',
    title: 'Öklid MST Demo',
    description: '2D düzlemdeki x,y koordinatlarını noktalı virgülle ayırarak girin. Örnek: 0,0; 2,2; 0,2; 2,0',
    placeholder: '0,0; 2,2; 0,2; 2,0'
  },
  timeComplexity: {
    best: 'O(V^2)',
    average: 'O(V^2)',
    worst: 'O(V^2)'
  },
  spaceComplexity: 'O(V^2) tam bağlı graf kenarları',
  analysisTitle: 'Düzlemsel Optimizasyon',
  analysisPoints: [
    'Öklid MST problemi Delaunay Triangulation kullanılarak tam bağlı graf oluşturmadan O(V log V) süresine indirilebilir.',
    'Basit Kruskal/Prim entegrasyonu V^2 kenar ürettiği için O(V^2 log V) veya O(V^2) zamanında çalışır.',
    'En kısa yol yazdırma işlemi, ebeveyn geri izlemesiyle doğrusal O(P) zamanda tamamlanır (P: yolun uzunluğu).'
  ],
  advantages: [
    'Fiziksel kablolama ve ağ yerleşimlerinde minimum maliyetli bağlantıları doğrudan koordinatlar üzerinden hesaplar.',
    'Path printing yardımıyla mesafelerden ziyade rota planı kullanıcıya sunulabilir.'
  ],
  disadvantages: [
    'Nokta sayısı çok arttığında tüm kenarları hesaplamak (V^2) bellek sınırlarını zorlar.'
  ],
  relatedAlgorithms: [
    {
      title: "Kruskal's Algorithm",
      description: 'Kenar listesini kullanarak MST bulur.',
      href: '/algorithms/graph-algorithms/kruskal'
    },
    {
      title: "Dijkstra's Algorithm",
      description: 'En kısa yol prev[] ebeveyn işaretçilerini oluşturan temel algoritma.',
      href: '/algorithms/graph-algorithms/dijkstra'
    }
  ]
};

export const networkFlowContent: RemainingAlgorithmContent = {
  title: 'Ağ Akışı (Network Flow)',
  category: 'Graf Algoritmaları',
  categoryHref: '/algorithms/graph-algorithms',
  family: 'Graph / Network Flow',
  difficulty: 'Zor',
  sources: ['Sedgewick'],
  summary: 'Bir kaynaktan hedefe taşınabilecek maksimum akışı bulmak için artık grafları (residual graphs) tarayan Ford-Fulkerson algoritması ve ilişkili min-cut teoremini kapsar.',
  descriptionParagraphs: [
    'Ağ Akışı (Network Flow), yönlü kenarların belirli kapasiteleri olduğu bir akış ağında (flow network), kaynaktan (source) hedefe (sink) birim zamanda aktarılabilecek en yüksek veri/madde miktarını bulma problemidir.',
    'Ford-Fulkerson algoritması, akış değerini her adımda artırarak maksimum seviyeye ulaştırır. Algoritma, grafın "artık graf" (residual graph) gösterimini kullanarak kapasitesi dolmamış yolları (augmenting paths) arar. BFS (Edmonds-Karp varyantı) veya DFS ile bulunan her yolun minimum geçiş kapasitesi kadar akış ağa eklenir ve kenarların kalan kapasiteleri güncellenir.',
    'Maksimum Akış / Minimum Kesik (Max-Flow/Min-Cut) teoremi, bir akış ağındaki maksimum akış değerinin, kaynağı hedeften ayıran kesik kenarlarının (cut) alabileceği minimum kapasiteye tam olarak eşit olduğunu kanıtlar. Bu kesik, ağdaki en dar darboğazı (bottleneck) gösterir.'
  ],
  sourceNotes: [
    'Sedgewick: Ford-Fulkerson algorithm uses residual capacities and backward edges to find augmenting paths.',
    'Sedgewick: Min-cut is found by taking vertices reachable from source in the final residual graph.'
  ],
  steps: [
    'Başlangıçta tüm kenarların akışını 0 yap.',
    'Artık graf üzerinde kaynaktan (S) hedefe (T) giden ve pozitif kapasiteye sahip bir artırma yolu (augmenting path) ara.',
    'Eğer yol bulunursa, bu yol üzerindeki minimum kapasiteyi (darboğazı) bul.',
    'Yol üzerindeki kenarlara darboğaz kadar akış ekle, ters kenarlardan aynı miktarı çıkar (residual updates).',
    'Yol bulunmayana kadar bu döngüyü tekrarla. Ulaşılan toplam akış maksimum akıştır.',
    'Min-cut tespiti için: S\'den artık graf yardımıyla ulaşılan düğümleri işaretle. İşaretli düğümlerden işaretsiz düğümlere giden orijinal graf kenarları minimum kesiği oluşturur.'
  ],
  pseudocode: `FORD-FULKERSON(G, s, t)
  for each edge (u, v) in G.E
    f[u, v] <- 0
  while there exists a path p from s to t in residual network G_f
    c_f(p) <- min { c_f(u, v) : (u, v) is in p }
    for each edge (u, v) in p
      f[u, v] <- f[u, v] + c_f(p)
      f[v, u] <- -f[u, v]
  return sum of f[s, v] for all v`,
  codeExamples: {
    typescript: `class FordFulkerson {
  private size: number;
  private capacities: number[][];
  private flows: number[][];

  constructor(size: number) {
    this.size = size;
    this.capacities = Array.from({ length: size }, () => Array(size).fill(0));
    this.flows = Array.from({ length: size }, () => Array(size).fill(0));
  }

  addEdge(u: number, v: number, cap: number) {
    this.capacities[u][v] = cap;
  }

  private bfs(s: number, t: number, parent: number[]): boolean {
    const visited = Array(this.size).fill(false);
    const queue: number[] = [s];
    visited[s] = true;

    while (queue.length > 0) {
      const u = queue.shift()!;
      for (let v = 0; v < this.size; v++) {
        const residual = this.capacities[u][v] - this.flows[u][v];
        if (!visited[v] && residual > 0) {
          parent[v] = u;
          visited[v] = true;
          if (v === t) return true;
          queue.push(v);
        }
      }
    }
    return false;
  }

  getMaxFlow(s: number, t: number, trace?: string[]): number {
    const parent = Array(this.size).fill(-1);
    let maxFlow = 0;

    while (this.bfs(s, t, parent)) {
      let pathFlow = Infinity;
      // Yol üzerindeki darboğazı bul
      for (let v = t; v !== s; v = parent[v]) {
        const u = parent[v];
        pathFlow = Math.min(pathFlow, this.capacities[u][v] - this.flows[u][v]);
      }

      if (trace) {
        const path: number[] = [];
        for (let v = t; v !== s; v = parent[v]) path.push(v);
        path.push(s);
        trace.push(\`Yol Bulundu: \${path.reverse().join(' -> ')} (Kapasite: \${pathFlow})\`);
      }

      // Kapasiteleri ve akışları güncelle
      for (let v = t; v !== s; v = parent[v]) {
        const u = parent[v];
        this.flows[u][v] += pathFlow;
        this.flows[v][u] -= pathFlow;
      }
      maxFlow += pathFlow;
    }
    return maxFlow;
  }
}`,
    python: `def bfs(s, t, parent, cap, flow, size):
    visited = [False] * size
    queue = [s]
    visited[s] = True
    while queue:
        u = queue.pop(0)
        for v in range(size):
            residual = cap[u][v] - flow[u][v]
            if not visited[v] and residual > 0:
                parent[v] = u
                visited[v] = True
                if v == t: return True
                queue.append(v)
    return False

def ford_fulkerson(cap, s, t, size):
    flow = [[0]*size for _ in range(size)]
    parent = [-1] * size
    max_flow = 0
    while bfs(s, t, parent, cap, flow, size):
        path_flow = float('Inf')
        v = t
        while v != s:
            u = parent[v]
            path_flow = min(path_flow, cap[u][v] - flow[u][v])
            v = parent[v]
        v = t
        while v != s:
            u = parent[v]
            flow[u][v] += path_flow
            flow[v][u] -= path_flow
            v = parent[v]
        max_flow += path_flow
    return max_flow`
  },
  demo: {
    kind: 'network-flow',
    title: 'Ağ Akışı (Ford-Fulkerson) Demo',
    description: 'Kenar kapasitelerini formatta girin (U-V-Kapasite). S=0 ve T=3 olarak simüle edilir. Örnek: 0-1-10, 0-2-5, 1-3-5, 2-3-10, 1-2-2',
    placeholder: '0-1-10, 0-2-5, 1-3-5, 2-3-10, 1-2-2'
  },
  timeComplexity: {
    best: 'O(E * f) f: max flow',
    average: 'O(V * E^2) Edmonds-Karp varyantı',
    worst: 'O(E * f)'
  },
  spaceComplexity: 'O(V^2) akış ve kapasite matrisleri',
  analysisTitle: 'Edmonds-Karp ve Darboğazlar',
  analysisPoints: [
    'Ford-Fulkerson DFS kullanırsa, kapasitelerin çok büyük olduğu durumlarda en küçük akış artışlarıyla yavaşlayabilir (O(E * f)).',
    'Edmonds-Karp varyantı, en kısa yolu bulmak için BFS (Breadth-First Search) kullanarak bu problemi çözer ve garanti O(V * E^2) süresine erişir.',
    'Maksimum akış elde edildiğinde, artık graf üzerinde S\'den ulaşılamayan sınırlardaki kenarlar kesildiğinde minimum kesik (min-cut) elde edilir.'
  ],
  advantages: [
    'Taşıma, boru hattı, telekomünikasyon ve lojistik ağlarındaki fiziksel darboğazları tespit eder.',
    'Bipartite matching problemlerini çözmek için genel amaçlı şablon sunar.'
  ],
  disadvantages: [
    'Büyük graflarda akış matrislerinin güncellenmesi ve sürekli yol aranması yavaştır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Breadth-First Search (BFS)',
      description: 'Edmonds-Karp varyantında yol bulmak için kullanılan algoritma.',
      href: '/algorithms/graph-algorithms/bfs'
    }
  ]
};

export const matchingMarriageContent: RemainingAlgorithmContent = {
  title: 'Eşleştirme ve Evlilik (Matching & Marriage)',
  category: 'Graf Algoritmaları',
  categoryHref: '/algorithms/graph-algorithms',
  family: 'Graph / Matching',
  difficulty: 'Zor',
  sources: ['Aho', 'Sedgewick'],
  summary: 'İki parçalı graflarda eşleşmeleri maksimize eden Bipartite Matching ve tercih sıralamalarına göre kararlı çiftler oluşturan Kararlı Evlilik (Stable Marriage - Gale-Shapley) algoritmalarını içerir.',
  descriptionParagraphs: [
    'Eşleştirme (Matching), bir grafta ortak ucu olmayan kenarların seçilmesi problemidir.',
    'İki Parçalı Eşleştirme (Bipartite Matching), düğümlerin iki gruba ayrıldığı (örn. işler ve işçiler) ve sadece gruplar arası kenarların olduğu yapılarda eşleşmeleri maksimize eder. Bu problem, kaynağa ve hedefe sanal kenarlar eklenerek maksimum akış (Network Flow) problemine indirgenebilir.',
    'Kararlı Evlilik Problemi (Stable Marriage), iki eşit büyüklükteki kümenin (örn. adaylar ve şirketler) birbirleri hakkındaki tercih listelerine göre eşleştirilmesidir. Gale-Shapley algoritması, hiçbir adayın ve şirketin mevcut eşlerinden ziyade birbirlerini tercih etmeyeceği "kararlı" (stable) bir eşleşmeyi garanti eder. Algoritma her zaman kararlı ve teklif eden taraf lehine en optimum sonucu üretir.'
  ],
  sourceNotes: [
    'Aho: Bipartite matching can be solved in O(V * E) using augmenting paths.',
    'Sedgewick: Gale-Shapley algorithm guarantees stable marriages in O(N^2) iterations.'
  ],
  steps: [
    'Gale-Shapley için: Tüm erkekleri ve kadınları serbest (bekar) olarak başlat.',
    'Serbest bir erkek (m) olduğu ve teklif edebileceği bir kadın (w) kaldığı sürece:',
    'm, tercih listesinde henüz teklif etmediği en popüler kadına (w) teklif eder.',
    'Eğer w bekar ise, m ile nişanlanır.',
    'Eğer w nişanlı ise (m\'), m ile m\' arasında tercih kıyaslaması yapar. Yeni adayı (m) eski adayına (m\') tercih ediyorsa, m\' bekar kalır, w yeni adayla nişanlanır.',
    'Tüm erkekler eşleşene veya teklif hakkı kalmayana kadar devam et.'
  ],
  pseudocode: `GALE-SHAPLEY(Men, Women)
  Initialize each man and woman to be free
  while there is a free man m who has a woman w to propose to
    w <- m's highest ranked woman to whom he has not proposed
    if w is free
      (m, w) become engaged
    else some pair (m', w) is engaged
      if w prefers m to m'
        (m, w) become engaged
        m' becomes free
      else
        (m', w) remain engaged`,
  codeExamples: {
    typescript: `function galeShapley(
  menPrefs: Record<string, string[]>,
  womenPrefs: Record<string, string[]>
): Record<string, string> {
  const men = Object.keys(menPrefs);
  const freeMen = [...men];
  const engagements: Record<string, string> = {}; // Kadın -> Erkek
  const proposals: Record<string, number> = {}; // Erkek -> Teklif indeksi

  for (const m of men) proposals[m] = 0;

  // Yardımcı tercih sırası araması
  const womenPrefIndex: Record<string, Record<string, number>> = {};
  for (const w of Object.keys(womenPrefs)) {
    womenPrefIndex[w] = {};
    womenPrefs[w].forEach((man, rank) => {
      womenPrefIndex[w][man] = rank;
    });
  }

  while (freeMen.length > 0) {
    const m = freeMen.shift()!;
    const mList = menPrefs[m];
    const pIdx = proposals[m];

    if (pIdx < mList.length) {
      const w = mList[pIdx];
      proposals[m]++; // Sonraki teklif için

      const currentPartner = engagements[w];
      if (!currentPartner) {
        // Kadın bekar
        engagements[w] = m;
      } else {
        // Tercih karşılaştır
        const rankNew = womenPrefIndex[w][m] ?? Infinity;
        const rankOld = womenPrefIndex[w][currentPartner] ?? Infinity;

        if (rankNew < rankOld) {
          engagements[w] = m;
          freeMen.push(currentPartner); // Eski eş serbest kaldı
        } else {
          freeMen.push(m); // Teklif reddedildi
        }
      }
    }
  }

  return engagements;
}`,
    python: `def gale_shapley(men_prefs, women_prefs):
    free_men = list(men_prefs.keys())
    engagements = {} # woman -> man
    proposals = {m: 0 for m in men_prefs}
    
    # Pre-index women preferences for O(1) comparison
    women_rank = {}
    for w, prefs in women_prefs.items():
        women_rank[w] = {man: rank for rank, man in enumerate(prefs)}
        
    while free_men:
        m = free_men.pop(0)
        m_list = men_prefs[m]
        p_idx = proposals[m]
        if p_idx < len(m_list):
            w = m_list[p_idx]
            proposals[m] += 1
            if w not in engagements:
                engagements[w] = m
            else:
                curr_man = engagements[w]
                if women_rank[w][m] < women_rank[w][curr_man]:
                    engagements[w] = m
                    free_men.append(curr_man)
                else:
                    free_men.append(m)
    return engagements`
  },
  demo: {
    kind: 'matching-marriage',
    title: 'Kararlı Evlilik (Gale-Shapley) Demo',
    description: 'Erkek ve Kadın tercihlerini ayırın (; ve | ile). Örnek: M1:W1,W2|M2:W2,W1 ; W1:M2,M1|W2:M1,M2',
    placeholder: 'M1:W1,W2|M2:W2,W1 ; W1:M2,M1|W2:M1,M2'
  },
  timeComplexity: {
    best: 'O(N)',
    average: 'O(N^2)',
    worst: 'O(N^2)'
  },
  spaceComplexity: 'O(N^2) tercih matrisleri',
  analysisTitle: 'Kararlılık ve Strateji',
  analysisPoints: [
    'Eşleşmede "kararsızlık" (instability), bir erkeğin kendi eşinden ziyade bir kadını ve o kadının da kendi eşinden ziyade o erkeği tercih etmesi durumudur.',
    'Gale-Shapley bu durumun oluşmasını engeller ve her zaman kararlı bir eşleşme üretir.',
    'Teklifi başlatan erkek grubu ise, erkekler için "en iyi kararlı" (male-optimal), kadınlar için ise "en kötü kararlı" (female-pessimal) sonuç elde edilir.'
  ],
  advantages: [
    'Okul/Üniversite yerleştirmelerinde (örn. TUS, ÖSYM) ve organ nakli eşleşmelerinde doğrudan adil çözümler üretir.',
    'Her girdi için mutlaka kararlı bir çözümün olduğunu garanti eder.'
  ],
  disadvantages: [
    'Teklif eden gruba bariz bir avantaj sağladığı için stratejik manipülasyonlara (yalan tercih listesi verme) açıktır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Network Flow',
      description: 'Bipartite matching probleminin çözüldüğü genel ağ akışı.',
      href: '/algorithms/graph-algorithms/network-flow'
    }
  ]
};

export const graphColoringBacktrackingContent: RemainingAlgorithmContent = {
  title: 'Graf Boyama (Graph Coloring & Backtracking)',
  category: 'Graf Algoritmaları',
  categoryHref: '/algorithms/graph-algorithms',
  family: 'Graph / Backtracking',
  difficulty: 'Zor',
  sources: ['DAA Notes'],
  summary: 'Grafın komşu düğümlerinin aynı renge boyanmaması koşuluyla, en fazla M adet renk kullanarak düğümleri boyayan geri izleme (backtracking) algoritmasıdır.',
  descriptionParagraphs: [
    'Graf Boyama (Graph Coloring), graf teorisinde en çok çalışılan NP-Zor (NP-Hard) problemlerden biridir. Amaç, grafın düğümlerini belirli sayıda renk kullanarak öyle boyamaktır ki, birbirine bağlı olan (adjacent) hiçbir iki düğüm aynı renge sahip olmasın.',
    'M-Boyama Problemi, bu kısıt altında grafın M adet renk kullanılarak boyanıp boyanamayacağını sorgular.',
    'Geri İzleme (Backtracking) algoritması, düğümlere sırayla renk ataması yapar. Her düğüme renk verirken komşularla çakışıp çakışmadığını denetler. Çakışma varsa sonraki rengi dener. Eğer düğüm için hiçbir renk geçerli olmazsa, bir önceki adıma (ebeveyn düğüme) geri dönerek onun rengini değiştirir ve arama ağacını budayarak ilerler.'
  ],
  sourceNotes: [
    'DAA Notes: M-Coloring problem uses backtracking to color vertices. State space tree is of size M^V.',
    'DAA Notes: Safe check ensures adj[u][v] = 0 or color[u] != color[v].'
  ],
  steps: [
    'Boyama işlemine 0. düğümden başla.',
    'Geçerli düğüme 1\'den M\'ye kadar sırayla bir renk atamayı dene.',
    'Atanan rengin komşu düğümlerin renkleriyle çakışıp çakışmadığını (`isSafe` kontrolü) denetle.',
    'Çakışma yoksa rengi düğüme kaydet ve sonraki düğüm için rekürsif olarak boyamayı sürdür.',
    'Düğümün tüm renk denemeleri başarısız olursa, rengini sıfırla (backtrack) ve bir önceki düğüme geri dönüp yeni bir renk dene.'
  ],
  pseudocode: `GRAPH-COLORING(g, m, color, v)
  if v = g.V
    return true
  for c <- 1 to m
    if IS-SAFE(g, v, color, c)
      color[v] <- c
      if GRAPH-COLORING(g, m, color, v + 1)
        return true
      color[v] <- 0
  return false`,
  codeExamples: {
    typescript: `function isSafe(
  node: number,
  graph: number[][],
  colors: number[],
  color: number
): boolean {
  for (let i = 0; i < graph.length; i++) {
    // Komşu düğüm aynı renge sahipse güvensizdir
    if (graph[node][i] === 1 && colors[i] === color) {
      return false;
    }
  }
  return true;
}

function colorGraphRec(
  node: number,
  graph: number[][],
  m: number,
  colors: number[],
  trace: string[]
): boolean {
  if (node === graph.length) return true; // Tüm düğümler boyandı

  for (let c = 1; c <= m; c++) {
    trace.push(\`Düğüm \${node} için Renk \${c} deneniyor...\`);
    if (isSafe(node, graph, colors, c)) {
      colors[node] = c;
      trace.push(\`  [Renk Atandı] Düğüm \${node} -> Renk \${c}\`);
      
      if (colorGraphRec(node + 1, graph, m, colors, trace)) return true;
      
      trace.push(\`  [Geri İzleme - Backtrack] Düğüm \${node} rengi sıfırlanıyor (\${c})\`);
      colors[node] = 0; // Backtrack
    } else {
      trace.push(\`  [Çakışma] Renk \${c} komşularla çakışıyor.\`);
    }
  }
  return false;
}

function solveMColoring(graph: number[][], m: number, trace: string[]): number[] | null {
  const colors = Array(graph.length).fill(0);
  if (colorGraphRec(0, graph, m, colors, trace)) {
    return colors;
  }
  return null;
}`,
    python: `def is_safe(node, graph, colors, c):
    for i in range(len(graph)):
        if graph[node][i] == 1 and colors[i] == c:
            return False
    return True

def color_graph_rec(node, graph, m, colors, trace):
    if node == len(graph):
        return True
    for c in range(1, m + 1):
        if is_safe(node, graph, colors, c):
            colors[node] = c
            if color_graph_rec(node + 1, graph, m, colors, trace):
                return True
            colors[node] = 0 # Backtrack
    return False`
  },
  demo: {
    kind: 'graph-coloring-backtracking',
    title: 'Graf Boyama (M-Coloring) Demo',
    description: 'Renk sayısı (M) ve kenarları girin. Sınırlı graf simüle edilir. Örnek: 3; 0-1, 1-2, 2-3, 3-0, 0-2',
    placeholder: '3; 0-1, 1-2, 2-3, 3-0, 0-2'
  },
  timeComplexity: {
    best: 'O(V)',
    average: 'O(M^V)',
    worst: 'O(M^V)'
  },
  spaceComplexity: 'O(V) rekürsif çağrı yığını ve renk dizisi',
  analysisTitle: 'NP-Zorluk ve Arama Ağacı',
  analysisPoints: [
    'M-Boyama probleminin durum uzayı (state space tree) M^V düğümden oluşur, bu da problemi kaba kuvvetle çözmeyi imkansız kılar.',
    'Geri izleme (Backtracking) yöntemi çakışma durumunda tüm alt ağaçları budadığı (pruning) için pratikte kaba kuvvet aramalarından çok daha hızlı sonuç üretir.',
    '2-boyama doğrusal O(V + E) zamanda çözülebilir (Bipartite Graph tespiti), ancak M >= 3 için problem NP-Tam haline gelir.'
  ],
  advantages: [
    'Frekans planlama, sınav zaman çizelgesi hazırlama (scheduling) ve harita renklendirmede kesin çözümler bulur.',
    'Çözüm bulunamadığında bunu kesin olarak garanti eder.'
  ],
  disadvantages: [
    'Büyük ve aşırı yoğun graflarda (E ≈ V^2) arama süresi üstel (exponential) olarak artar.'
  ],
  relatedAlgorithms: [
    {
      title: 'N-Queens Problem',
      description: 'Backtracking kullanan bir diğer klasik NP-Zor problem.',
      href: '/algorithms/backtracking/n-queens'
    }
  ]
};
