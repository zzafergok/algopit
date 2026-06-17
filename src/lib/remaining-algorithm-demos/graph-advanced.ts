import type { GenericDemoResult } from './types';

// Helper to split a string with required separator
function splitRequired(input: string, separator: string): [string, string] {
  const idx = input.indexOf(separator);
  if (idx === -1) {
    throw new Error(`Girdiyi "${separator}" karakteriyle ayırın.`);
  }
  return [input.slice(0, idx).trim(), input.slice(idx + 1).trim()];
}

// 1. Graph Traversals Demo (PFS and Cycle Detection)
export function runGraphTraversalsDemo(input: string): GenericDemoResult {
  const [rawV, rawEdges] = splitRequired(input, ';');
  const V = Number(rawV.trim());
  if (isNaN(V) || V <= 0) {
    throw new Error('Düğüm sayısı (V) pozitif bir sayı olmalıdır.');
  }

  const adjList = new Map<number, Array<{ node: number; weight: number }>>();
  for (let i = 0; i < V; i++) {
    adjList.set(i, []);
  }

  const rawEdgesSplit = rawEdges.split(',').map((e) => e.trim()).filter(Boolean);
  const edgeList: [number, number, number][] = [];

  for (const edgeStr of rawEdgesSplit) {
    const parts = edgeStr.split('-');
    if (parts.length < 2) {
      throw new Error(`Geçersiz kenar formatı: "${edgeStr}". Örnek format: 0-1 veya 0-1-5`);
    }
    const u = Number(parts[0]);
    const v = Number(parts[1]);
    const w = parts[2] ? Number(parts[2]) : 1;

    if (isNaN(u) || isNaN(v) || isNaN(w) || u < 0 || u >= V || v < 0 || v >= V) {
      throw new Error(`Düğüm indeksi sınır dışı veya geçersiz ağırlık: "${edgeStr}" (V=${V})`);
    }

    adjList.get(u)!.push({ node: v, weight: w });
    adjList.get(v)!.push({ node: u, weight: w }); // Undirected assumption
    edgeList.push([u, v, w]);
  }

  const trace: string[] = [];
  trace.push(`Graf oluşturuldu. Düğüm sayısı: ${V}`);
  trace.push(`Kenarlar: ${edgeList.map(([u, v, w]) => `${u}-${v} (w:${w})`).join(', ')}`);

  // Section A: Cycle Detection using DFS
  trace.push('\n--- Döngü (Cycle) Tespiti ---');
  const visited = new Set<number>();
  const recStack = new Set<number>();
  let hasCycle = false;

  function dfsCycleDetect(node: number, parent: number | null): boolean {
    visited.add(node);
    recStack.add(node);
    trace.push(`  DFS Ziyaret: Düğüm ${node} (Ebeveyn: ${parent !== null ? parent : 'Yok'})`);

    const neighbors = adjList.get(node) ?? [];
    for (const neighbor of neighbors) {
      const v = neighbor.node;
      if (!visited.has(v)) {
        if (dfsCycleDetect(v, node)) return true;
      } else if (v !== parent) {
        trace.push(`    [Döngü Tespit Edildi!] Geri yönlü kenar (back edge): ${node} -> ${v}`);
        return true;
      }
    }
    recStack.delete(node);
    return false;
  }

  for (let i = 0; i < V; i++) {
    if (!visited.has(i)) {
      trace.push(`Yeni bileşen için DFS başlatılıyor: Düğüm ${i}`);
      if (dfsCycleDetect(i, null)) {
        hasCycle = true;
        break;
      }
    }
  }

  if (!hasCycle) {
    trace.push('  Graf içerisinde herhangi bir döngü bulunamadı (Acyclic).');
  }

  // Section B: PFS (Priority-First Search) Simulation
  trace.push('\n--- Öncelik Öncelikli Dolaşma (PFS) Simülasyonu ---');
  const dist = Array(V).fill(Infinity);
  const parent = Array(V).fill(-1);
  const pfsVisited = new Set<number>();
  
  dist[0] = 0;
  trace.push(`Düğüm 0 başlangıç olarak seçildi (Mesafe = 0).`);

  for (let step = 0; step < V; step++) {
    // Find vertex with minimum distance among unvisited
    let u = -1;
    let minDist = Infinity;
    for (let i = 0; i < V; i++) {
      if (!pfsVisited.has(i) && dist[i] < minDist) {
        minDist = dist[i];
        u = i;
      }
    }

    if (u === -1) {
      trace.push(`  Ziyaret edilmemiş erişilebilir düğüm kalmadı.`);
      break;
    }

    pfsVisited.add(u);
    trace.push(`  [Çıkarılan Düğüm] Düğüm ${u} seçildi (Mesafe: ${dist[u]}). Ziyaret edilenler listesine eklendi.`);

    const neighbors = adjList.get(u) ?? [];
    for (const edge of neighbors) {
      const v = edge.node;
      const weight = edge.weight;
      if (!pfsVisited.has(v)) {
        const newDist = dist[u] + weight;
        trace.push(`    Komşu denetleniyor: ${u} -> ${v} (Ağırlık: ${weight})`);
        if (newDist < dist[v]) {
          trace.push(`      [Relaxation] Mesafe güncellendi: dist[${v}] ${dist[v]} -> ${newDist}, parent[${v}] = ${u}`);
          dist[v] = newDist;
          parent[v] = u;
        } else {
          trace.push(`      Gevşetme yapılmadı (Mevcut dist[${v}]: ${dist[v]} <= Yeni dist: ${newDist})`);
        }
      }
    }
  }

  const resultStr = hasCycle ? 'Graf döngü barındırıyor.' : 'Graf döngü barındırmıyor.';

  return {
    result: resultStr,
    trace,
    metadata: [
      `Döngü Durumu: ${hasCycle ? 'DÖNGÜ VAR' : 'DÖNGÜ YOK'}`,
      `Düğüm Mesafeleri (0'dan): ${dist.map((d, i) => `${i}:${d === Infinity ? '∞' : d}`).join(', ')}`,
      `Ebeveyn Ağacı (Parent Array): [${parent.join(', ')}]`
    ]
  };
}

// 2. Shortest Paths & MST Demo (Euclidean MST and Dijkstra Path Printing)
export function runShortestPathsMstDemo(input: string): GenericDemoResult {
  // Parse points, e.g., "0,0; 2,2; 0,2; 2,0"
  const rawPoints = input.split(';').map((p) => p.trim()).filter(Boolean);
  const points: [number, number][] = [];

  for (const ptStr of rawPoints) {
    const coords = ptStr.split(',');
    if (coords.length !== 2) {
      throw new Error(`Geçersiz nokta formatı: "${ptStr}". Örnek format: x,y`);
    }
    const x = Number(coords[0].trim());
    const y = Number(coords[1].trim());
    if (isNaN(x) || isNaN(y)) {
      throw new Error(`Koordinatlar sayı olmalıdır: "${ptStr}"`);
    }
    points.push([x, y]);
  }

  const n = points.length;
  if (n < 2) {
    throw new Error('MST veya en kısa yol hesaplamak için en az 2 nokta girilmelidir.');
  }

  const trace: string[] = [];
  trace.push(`Girdi Noktaları:`);
  points.forEach((p, i) => trace.push(`  Nokta ${i}: (${p[0]}, ${p[1]})`));

  // 1. Euclidean MST using Kruskal
  trace.push('\n--- Öklid MST (Kruskal) İşlemleri ---');
  const edges: Array<{ u: number; v: number; weight: number }> = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dist = Math.sqrt((points[i][0] - points[j][0]) ** 2 + (points[i][1] - points[j][1]) ** 2);
      edges.push({ u: i, v: j, weight: dist });
    }
  }

  // Sort edges
  edges.sort((a, b) => a.weight - b.weight);
  trace.push(`Tüm çiftler arası kenarlar hesaplandı ve ağırlığa göre sıralandı:`);
  edges.forEach((e) => trace.push(`  Kenar ${e.u}-${e.v} (Mesafe: ${e.weight.toFixed(3)})`));

  // Union-Find setup
  const dsuParent = Array.from({ length: n }, (_, i) => i);
  function dsuFind(i: number): number {
    if (dsuParent[i] === i) return i;
    return (dsuParent[i] = dsuFind(dsuParent[i]));
  }
  function dsuUnion(i: number, j: number): boolean {
    const rootU = dsuFind(i);
    const rootV = dsuFind(j);
    if (rootU !== rootV) {
      dsuParent[rootU] = rootV;
      return true;
    }
    return false;
  }

  const mstEdges: Array<{ u: number; v: number; weight: number }> = [];
  let totalMstWeight = 0;

  for (const edge of edges) {
    trace.push(`Kenar denetleniyor: ${edge.u}-${edge.v} (${edge.weight.toFixed(3)})`);
    if (dsuUnion(edge.u, edge.v)) {
      mstEdges.push(edge);
      totalMstWeight += edge.weight;
      trace.push(`  -> MST'ye Eklendi.`);
      if (mstEdges.length === n - 1) {
        trace.push(`  [MST Tamamlandı] Gerekli kenar sayısına ulaşıldı: ${n - 1}`);
        break;
      }
    } else {
      trace.push(`  -> Çevrim oluşturduğu için atlandı (Zaten bağlı).`);
    }
  }

  // 2. Shortest Path from point 0 to point n-1 using Dijkstra on the complete graph
  trace.push(`\n--- En Kısa Yol (Dijkstra) Yazdırma (0 -> ${n - 1}) ---`);
  const dist = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  const visited = new Set<number>();
  dist[0] = 0;

  for (let step = 0; step < n; step++) {
    let u = -1;
    let minDist = Infinity;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i) && dist[i] < minDist) {
        minDist = dist[i];
        u = i;
      }
    }

    if (u === -1) break;
    visited.add(u);

    for (let v = 0; v < n; v++) {
      if (u !== v && !visited.has(v)) {
        const weight = Math.sqrt((points[u][0] - points[v][0]) ** 2 + (points[u][1] - points[v][1]) ** 2);
        if (dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
          prev[v] = u;
        }
      }
    }
  }

  // Path printing backtracking
  const path: number[] = [];
  let curr = n - 1;
  while (curr !== -1) {
    path.push(curr);
    curr = prev[curr];
  }
  path.reverse();

  trace.push(`Dijkstra tamamlandı.`);
  trace.push(`Mesafe listesi: ${dist.map((d, i) => `${i}:${d.toFixed(2)}`).join(', ')}`);
  trace.push(`Ebeveyn dizisi (prev): [${prev.join(', ')}]`);
  trace.push(`Hesaplanan Rota: ${path.join(' -> ')}`);

  return {
    result: `MST Ağırlığı: ${totalMstWeight.toFixed(3)}, En Kısa Rota (0->${n-1}): ${path.join(' -> ')}`,
    trace,
    metadata: [
      `MST Kenar Sayısı: ${mstEdges.length}`,
      `Seçilen MST Kenarları: ${mstEdges.map((e) => `${e.u}-${e.v}`).join(', ')}`,
      `En Kısa Yol Uzunluğu: ${dist[n - 1].toFixed(3)}`
    ]
  };
}

// 3. Network Flow Demo (Ford-Fulkerson Max Flow / Min Cut)
export function runNetworkFlowDemo(input: string): GenericDemoResult {
  // Input format: "0-1-10, 0-2-5, 1-3-5, 2-3-10, 1-2-2"
  const edgeTokens = input.split(',').map((t) => t.trim()).filter(Boolean);
  
  let maxNode = 0;
  const parsedEdges: Array<{ u: number; v: number; cap: number }> = [];

  for (const token of edgeTokens) {
    const parts = token.split('-');
    if (parts.length !== 3) {
      throw new Error(`Geçersiz kenar formatı: "${token}". Format: U-V-Kapasite (Örn: 0-1-10)`);
    }
    const u = Number(parts[0]);
    const v = Number(parts[1]);
    const cap = Number(parts[2]);

    if (isNaN(u) || isNaN(v) || isNaN(cap) || u < 0 || v < 0 || cap < 0) {
      throw new Error(`Geçersiz düğüm indeksi veya kapasite: "${token}"`);
    }

    parsedEdges.push({ u, v, cap });
    maxNode = Math.max(maxNode, u, v);
  }

  const V = maxNode + 1;
  const s = 0;
  const t = maxNode;

  if (V < 2) {
    throw new Error('Akış ağı en az 2 düğüm (0 ve 1) içermelidir.');
  }

  // Setup capacity matrix and flow matrix
  const capacity = Array.from({ length: V }, () => Array(V).fill(0));
  const flow = Array.from({ length: V }, () => Array(V).fill(0));

  for (const edge of parsedEdges) {
    capacity[edge.u][edge.v] += edge.cap; // Accumulate capacities if duplicate edge
  }

  const trace: string[] = [];
  trace.push(`Akış Ağı oluşturuldu. Toplam Düğüm Sayısı: ${V}`);
  trace.push(`Kaynak (Source): ${s}, Hedef (Sink): ${t}`);
  trace.push(`Kapasite Matrisi:`);
  for (let i = 0; i < V; i++) {
    trace.push(`  Düğüm ${i} -> ${capacity[i].map((c, j) => c > 0 ? `${j}(K:${c})` : '').filter(Boolean).join(', ')}`);
  }

  let maxFlow = 0;
  const parent = Array(V).fill(-1);

  // Helper BFS function to find augmenting paths
  function bfs(): boolean {
    const visited = Array(V).fill(false);
    const queue: number[] = [s];
    visited[s] = true;
    parent.fill(-1);

    while (queue.length > 0) {
      const u = queue.shift()!;
      for (let v = 0; v < V; v++) {
        const residual = capacity[u][v] - flow[u][v];
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

  trace.push('\n--- Ford-Fulkerson (Edmonds-Karp) Simülasyonu ---');
  let iter = 1;

  while (bfs()) {
    // Determine bottleneck capacity
    let pathFlow = Infinity;
    const path: number[] = [];
    for (let v = t; v !== s; v = parent[v]) {
      const u = parent[v];
      pathFlow = Math.min(pathFlow, capacity[u][v] - flow[u][v]);
      path.push(v);
    }
    path.push(s);
    path.reverse();

    trace.push(`Adım ${iter}: Artırma Yolu Bulundu: ${path.join(' -> ')}`);
    trace.push(`  Darboğaz Kapasitesi (Bottleneck): ${pathFlow}`);

    // Update residual capacities
    for (let v = t; v !== s; v = parent[v]) {
      const u = parent[v];
      flow[u][v] += pathFlow;
      flow[v][u] -= pathFlow;
      trace.push(`    Akış güncelleme: ${u} -> ${v} (${flow[u][v]}/${capacity[u][v]})`);
    }

    maxFlow += pathFlow;
    trace.push(`  Toplam Maksimum Akış: ${maxFlow}\n`);
    iter++;
  }

  trace.push('Artık grafa göre artırma yolu kalmadı.');

  // Find Min-Cut
  const reachableFromSource = Array(V).fill(false);
  const queue: number[] = [s];
  reachableFromSource[s] = true;

  while (queue.length > 0) {
    const u = queue.shift()!;
    for (let v = 0; v < V; v++) {
      const residual = capacity[u][v] - flow[u][v];
      if (!reachableFromSource[v] && residual > 0) {
        reachableFromSource[v] = true;
        queue.push(v);
      }
    }
  }

  const minCutEdges: Array<{ u: number; v: number; cap: number }> = [];
  trace.push('\n--- Minimum Kesik (Min-Cut) Tespiti ---');
  trace.push(`Kaynaktan artık graf üzerinde erişilebilen düğümler (S tarafı): {${reachableFromSource.map((r, i) => r ? i : '').filter(x => x !== '').join(', ')}}`);

  for (let u = 0; u < V; u++) {
    if (reachableFromSource[u]) {
      for (let v = 0; v < V; v++) {
        if (!reachableFromSource[v] && capacity[u][v] > 0) {
          minCutEdges.push({ u, v, cap: capacity[u][v] });
          trace.push(`  Kesilen Orijinal Kenar: ${u} -> ${v} (Kapasite: ${capacity[u][v]})`);
        }
      }
    }
  }

  const minCutSum = minCutEdges.reduce((sum, e) => sum + e.cap, 0);
  trace.push(`Min-Cut Toplam Kapasitesi: ${minCutSum} (Maksimum Akış ${maxFlow} ile eşit olmalıdır).`);

  return {
    result: `Maksimum Akış: ${maxFlow}`,
    trace,
    metadata: [
      `Maksimum Akış Değeri: ${maxFlow}`,
      `Min-Cut Kenarları: ${minCutEdges.map((e) => `${e.u}->${e.v} (c:${e.cap})`).join(', ')}`,
      `Min-Cut Kapasite Toplamı: ${minCutSum}`
    ]
  };
}

// 4. Matching & Marriage Demo (Gale-Shapley Stable Marriage)
export function runMatchingMarriageDemo(input: string): GenericDemoResult {
  // Input format: "M1:W1,W2|M2:W2,W1 ; W1:M2,M1|W2:M1,M2"
  const [rawMen, rawWomen] = splitRequired(input, ';');

  const parsePrefs = (raw: string): Record<string, string[]> => {
    const record: Record<string, string[]> = {};
    const tokens = raw.split('|').map((t) => t.trim()).filter(Boolean);
    for (const token of tokens) {
      const [name, listStr] = splitRequired(token, ':');
      const list = listStr.split(',').map((x) => x.trim()).filter(Boolean);
      record[name] = list;
    }
    return record;
  };

  const menPrefs = parsePrefs(rawMen);
  const womenPrefs = parsePrefs(rawWomen);

  const men = Object.keys(menPrefs);
  const women = Object.keys(womenPrefs);

  if (men.length === 0 || women.length === 0) {
    throw new Error('Erkek ve kadın tercih listeleri boş olamaz.');
  }

  const trace: string[] = [];
  trace.push('Kararlı Evlilik Algoritması (Gale-Shapley) Başlatılıyor.');
  trace.push('Erkeklerin Tercihleri:');
  for (const m of men) {
    trace.push(`  ${m}: [${menPrefs[m].join(', ')}]`);
  }
  trace.push('Kadınların Tercihleri:');
  for (const w of women) {
    trace.push(`  ${w}: [${womenPrefs[w].join(', ')}]`);
  }

  const freeMen = [...men];
  const engagements: Record<string, string> = {}; // Kadın -> Erkek
  const proposals: Record<string, number> = {}; // Erkek -> Sıradaki kadına indeks

  for (const m of men) {
    proposals[m] = 0;
  }

  // Pre-index women's preference rankings for O(1) checks
  const womenPrefRank: Record<string, Record<string, number>> = {};
  for (const w of women) {
    womenPrefRank[w] = {};
    const prefs = womenPrefs[w] ?? [];
    prefs.forEach((mName, rank) => {
      womenPrefRank[w][mName] = rank;
    });
  }

  let round = 1;
  while (freeMen.length > 0) {
    const m = freeMen.shift()!;
    const mList = menPrefs[m] ?? [];
    const pIdx = proposals[m];

    if (pIdx >= mList.length) {
      trace.push(`Tur ${round}: ${m} bekar kaldı fakat tercih listesindeki tüm kadınlara teklif etti.`);
      continue;
    }

    const w = mList[pIdx];
    proposals[m]++; // Increment proposal index for next time

    trace.push(`Tur ${round}: Erkek ${m}, Kadın ${w}'ye teklif ediyor...`);

    const currentPartner = engagements[w];
    if (!currentPartner) {
      // Woman is free, accepts proposal
      engagements[w] = m;
      trace.push(`  -> ${w} bekar olduğu için teklifi kabul etti. (${m} & ${w} nişanlandı).`);
    } else {
      // Woman is engaged, compare preferences
      const rankNew = womenPrefRank[w][m] !== undefined ? womenPrefRank[w][m] : Infinity;
      const rankOld = womenPrefRank[w][currentPartner] !== undefined ? womenPrefRank[w][currentPartner] : Infinity;

      trace.push(`  -> ${w} zaten ${currentPartner} ile nişanlı.`);
      if (rankNew < rankOld) {
        // Prefers the new man
        engagements[w] = m;
        freeMen.push(currentPartner); // Old partner becomes free
        trace.push(`  -> ${w}, yeni aday ${m}'yi eski nişanlısı ${currentPartner}'ye tercih etti!`);
        trace.push(`     (${m} & ${w} nişanlandı, ${currentPartner} serbest kaldı).`);
      } else {
        // Rejects the new man
        freeMen.push(m);
        trace.push(`  -> ${w}, mevcut nişanlısı ${currentPartner}'yi yeni aday ${m}'ye tercih etti.`);
        trace.push(`     (Teklif reddedildi, ${m} bekar kaldı).`);
      }
    }
    round++;
  }

  trace.push('\nAlgoritma Sonlandı. Tüm bekar adaylar veya teklif listeleri tükendi.');

  const finalMatches = Object.entries(engagements).map(([w, m]) => `${m} <-> ${w}`);

  return {
    result: finalMatches.join(', '),
    trace,
    metadata: [
      `Toplam Prosedür Adımı: ${round - 1}`,
      `Eşleşme Sayısı: ${finalMatches.length}`
    ]
  };
}

// 5. Graph Coloring Backtracking Demo
export function runGraphColoringBacktrackingDemo(input: string): GenericDemoResult {
  // Input format: "M; 0-1, 1-2, 2-3, 3-0, 0-2"
  const [rawM, rawEdges] = splitRequired(input, ';');
  const m = Number(rawM.trim());
  if (isNaN(m) || m <= 0) {
    throw new Error('Renk sayısı (M) pozitif bir tam sayı olmalıdır.');
  }

  // Parse edges and find max node index
  const edgeTokens = rawEdges.split(',').map((t) => t.trim()).filter(Boolean);
  let maxNode = 0;
  const parsedEdges: Array<[number, number]> = [];

  for (const token of edgeTokens) {
    const parts = token.split('-');
    if (parts.length !== 2) {
      throw new Error(`Geçersiz kenar formatı: "${token}". Format: U-V (Örn: 0-1)`);
    }
    const u = Number(parts[0]);
    const v = Number(parts[1]);

    if (isNaN(u) || isNaN(v) || u < 0 || v < 0) {
      throw new Error(`Geçersiz düğüm indeksleri: "${token}"`);
    }

    parsedEdges.push([u, v]);
    maxNode = Math.max(maxNode, u, v);
  }

  const V = maxNode + 1;
  if (V <= 0) {
    throw new Error('Boş graf boyanamaz.');
  }

  // Create adjacency matrix
  const graph = Array.from({ length: V }, () => Array(V).fill(0));
  for (const [u, v] of parsedEdges) {
    graph[u][v] = 1;
    graph[v][u] = 1; // Undirected graph
  }

  const trace: string[] = [];
  trace.push(`Graf Boyama Simülasyonu Başlatıldı. Renk Sayısı (M): ${m}`);
  trace.push(`Toplam Düğüm Sayısı: ${V}`);
  trace.push(`Kenarlar: ${parsedEdges.map(([u, v]) => `${u}-${v}`).join(', ')}`);

  const colors = Array(V).fill(0);
  let callCount = 0;

  function isSafe(node: number, c: number): boolean {
    for (let i = 0; i < V; i++) {
      if (graph[node][i] === 1 && colors[i] === c) {
        return false;
      }
    }
    return true;
  }

  function colorGraphRec(node: number): boolean {
    callCount++;
    if (callCount > 1000) {
      trace.push('  [Sınır Uyarısı] Çok fazla arama adımı yapıldı. Budama sınırlandırılıyor.');
      return false;
    }

    if (node === V) {
      trace.push(`\n[Başarılı] Tüm düğümler boyandı!`);
      return true;
    }

    for (let c = 1; c <= m; c++) {
      trace.push(`Düğüm ${node} için Renk ${c} deneniyor... (Mevcut Durum: [${colors.join(', ')}])`);
      if (isSafe(node, c)) {
        colors[node] = c;
        trace.push(`  -> [Kabul] Düğüm ${node} rengi ${c} yapıldı.`);

        if (colorGraphRec(node + 1)) {
          return true;
        }

        // Backtrack
        trace.push(`  <- [Geri Adım] Düğüm ${node} için Renk ${c} ile devam edilemedi, sıfırlanıyor.`);
        colors[node] = 0;
      } else {
        trace.push(`  -> [Başarısız] Renk ${c} komşu renk kısıtını ihlal ediyor.`);
      }
    }
    return false;
  }

  const success = colorGraphRec(0);

  let resultStr = '';
  if (success) {
    resultStr = `Başarılı. Atanan Renkler: [${colors.join(', ')}]`;
  } else {
    resultStr = `Maliyet Kısıtı Aşımı. Graf ${m} renk ile boyanamaz.`;
  }

  return {
    result: resultStr,
    trace,
    metadata: [
      `Boyama Sonucu: ${success ? 'BAŞARILI' : 'BAŞARISIZ'}`,
      `Arama Adım Sayısı: ${callCount}`,
      `Son Renk Dizisi: [${colors.join(', ')}]`
    ]
  };
}
