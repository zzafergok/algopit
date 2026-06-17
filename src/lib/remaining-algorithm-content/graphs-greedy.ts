import type { RemainingAlgorithmContent } from './types';

export const bellmanFordContent: RemainingAlgorithmContent = {
  title: 'Bellman-Ford',
  category: 'Graf Algoritmaları',
  categoryHref: '/algorithms/graph-algorithms',
  family: 'Graph / Shortest Path',
  difficulty: 'Zor',
  sources: ['DAA Notes'],
  summary:
    'Negatif ağırlıklı kenarlara izin vererek tek kaynaktan en kısa yolları bulur ve negatif çevrim tespit eder.',
  descriptionParagraphs: [
    'DAA notları, directed graph üzerinde single-source shortest path için Bellman-Ford and Dijkstra yaklaşımlarını ayırır. Bellman-Ford negatif ağırlıklı kenarlara izin verir; eğer kaynaktan erişilebilir negatif çevrim varsa çözüm olmadığını bildirir.',
    'Algoritma tüm kenarları |V|-1 kez gevşetir. Her gevşetme, bir kenar üzerinden daha kısa mesafe bulunup bulunmadığını kontrol eder. Son ek turda hâlâ iyileşme varsa bu, kaynağa erişilebilir negatif ağırlıklı çevrim olduğu anlamına gelir.',
  ],
  sourceNotes: [
    'DAA Notes: Bellman-Ford negatif ağırlıklı kenarları kabul eder.',
    'DAA Notes: algoritma shortest path bulur veya negatif ağırlıklı çevrim tespit eder.',
    'DAA Notes: Dijkstra yalnız pozitif ağırlıklar için verilir; bu ayrım Bellman-Fordun kullanım sınırını netleştirir.',
  ],
  steps: [
    'Tüm mesafeleri sonsuz, kaynak mesafesini 0 yap.',
    '|V|-1 tur boyunca tüm kenarları gevşet.',
    'd[u] + w(u,v) < d[v] ise d[v] değerini güncelle.',
    'Ek bir turda hâlâ güncelleme oluyorsa negatif çevrim bildir.',
    'Aksi halde kaynak mesafelerini döndür.',
  ],
  pseudocode: `BELLMAN-FORD(G, source)
  for each vertex v
    dist[v] <- infinity
  dist[source] <- 0
  repeat |V|-1 times
    for each edge (u, v, w)
      if dist[u] + w < dist[v]
        dist[v] <- dist[u] + w
  for each edge (u, v, w)
    if dist[u] + w < dist[v]
      return negative-cycle
  return dist`,
  codeExamples: {
    typescript: `type Edge = { from: string; to: string; weight: number };

function bellmanFord(vertices: string[], edges: Edge[], source: string) {
  const distance = new Map(vertices.map((vertex) => [vertex, Infinity]));
  distance.set(source, 0);
  for (let pass = 1; pass < vertices.length; pass += 1) {
    for (const edge of edges) {
      const candidate = distance.get(edge.from)! + edge.weight;
      if (candidate < distance.get(edge.to)!) {
        distance.set(edge.to, candidate);
      }
    }
  }
  const hasNegativeCycle = edges.some((edge) => distance.get(edge.from)! + edge.weight < distance.get(edge.to)!);
  return { distance, hasNegativeCycle };
}`,
  },
  demo: {
    kind: 'bellman-ford',
    title: 'Bellman-Ford Demo',
    description:
      'Kaynak ve kenarları girin. Örnek: A; A>B>4, A>C>5, B>C>-2, C>D>3',
    placeholder: 'A; A>B>4, A>C>5, B>C>-2, C>D>3',
  },
  timeComplexity: {
    best: 'O(VE)',
    average: 'O(VE)',
    worst: 'O(VE)',
  },
  spaceComplexity: 'O(V)',
  analysisTitle: 'Negatif Kenarlar',
  analysisPoints: [
    'Negatif kenarlar olabilir; negatif çevrim varsa en kısa yol tanımsızdır.',
    'Dijkstra daha hızlı olabilir ama negatif kenar varsayımını taşımaz.',
    'Erken durma, bir turda değişiklik olmadığında pratik maliyeti azaltabilir.',
  ],
  advantages: [
    'Negatif ağırlıklı kenarları destekler.',
    'Negatif çevrim tespiti yapar.',
    'Kenar listesi temsiliyle uygulaması nettir.',
  ],
  disadvantages: [
    'Dijkstra’ya göre daha yavaştır.',
    'Yoğun graflarda O(VE) maliyet büyüktür.',
    'Negatif çevrim varsa mesafeler anlamlı sonuç değildir.',
  ],
  relatedAlgorithms: [
    {
      title: 'Dijkstra',
      description: 'Negatif olmayan ağırlıklarda daha hızlı tek kaynak en kısa yol algoritmasıdır.',
      href: '/algorithms/graph-algorithms/dijkstra',
    },
    {
      title: 'Floyd-Warshall',
      description: 'Tüm düğüm çiftleri arasında en kısa yolları hesaplar.',
      href: '/algorithms/graph-algorithms/floyd-warshall',
    },
    {
      title: 'Single-Source Shortest Path',
      description: 'Tek kaynaklı en kısa yol probleminin genel ailesidir.',
      href: '/algorithms/graph-algorithms/single-source-shortest-path',
    },
  ],
};

export const fractionalKnapsackContent: RemainingAlgorithmContent = {
  title: 'Fractional Knapsack',
  category: 'Açgözlü Algoritmalar',
  categoryHref: '/algorithms/greedy-algorithms',
  family: 'Greedy / Optimization',
  difficulty: 'Orta',
  sources: ['DAA Notes'],
  summary:
    'Bölünebilir nesneleri değer/ağırlık oranına göre seçerek kapasite içinde maksimum değeri hedefler.',
  descriptionParagraphs: [
    'Fractional Knapsack, klasik çanta probleminin nesnelerin parçalanabildiği sürümüdür. Her nesne için değer/ağırlık oranı hesaplanır; en yüksek oranlı nesneler önce çantaya alınır, kapasite yetmezse son nesnenin yalnızca uygun kesri eklenir.',
    'DAA notlarında GreedyKnapsack akışı, p[i]/w[i] oranına göre sıralanmış nesneler üzerinde çözüm vektörünü önce sıfırlayıp kapasite dolana kadar tam nesne, son adımda ise kesirli nesne seçimiyle kurar.',
  ],
  sourceNotes: [
    'DAA Notes: p[i]/w[i] oranına göre azalan sıralama ve x[i] çözüm vektörü.',
    'DAA Notes: kapasite yetmediğinde x[i] = U / w[i] ile son nesnenin kesirli alınması.',
  ],
  steps: [
    'Her nesne için değer/ağırlık oranını hesapla.',
    'Nesneleri orana göre azalan sırala.',
    'Kalan kapasite nesneyi tamamen alabiliyorsa tamamını seç.',
    'Kapasite yetmiyorsa kalan kapasite kadar kesirli parça al ve dur.',
    'Seçilen kesirleri ve toplam değeri döndür.',
  ],
  pseudocode: `FRACTIONAL-KNAPSACK(items, capacity)
  sort items by value / weight descending
  totalValue <- 0
  remaining <- capacity
  for item in items
    if item.weight <= remaining
      take all item
      remaining <- remaining - item.weight
      totalValue <- totalValue + item.value
    else
      fraction <- remaining / item.weight
      take fraction of item
      totalValue <- totalValue + item.value * fraction
      break
  return totalValue`,
  codeExamples: {
    typescript: `type Item = { name: string; value: number; weight: number; };
function fractionalKnapsack(items: Item[], capacity: number) {
  const sortedItems = [...items].sort((a, b) => b.value / b.weight - a.value / a.weight);
  let remaining = capacity, totalValue = 0;
  const selected: Array<Item & { fraction: number }> = [];
  for (const item of sortedItems) {
    if (remaining <= 0) break;
    const fraction = Math.min(1, remaining / item.weight);
    selected.push({ ...item, fraction });
    totalValue += item.value * fraction;
    remaining -= item.weight * fraction;
  }
  return { totalValue, selected };
}`,
    python: `def fractional_knapsack(items, capacity):
    sorted_items = sorted(items, key=lambda item: item["value"] / item["weight"], reverse=True)
    remaining, total_value, selected = capacity, 0, []
    for item in sorted_items:
        if remaining <= 0: break
        fraction = min(1, remaining / item["weight"])
        selected.append({**item, "fraction": fraction})
        total_value += item["value"] * fraction
        remaining -= item["weight"] * fraction
    return total_value, selected`,
  },
  demo: {
    kind: 'fractional-knapsack',
    title: 'Fractional Knapsack Demo',
    description:
      'Kapasite ve nesneleri noktalı virgülle ayırın. Örnek: 50; gold:60:10, silver:100:20, bronze:120:30',
    placeholder: '50; gold:60:10, silver:100:20, bronze:120:30',
  },
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
  },
  spaceComplexity: 'O(n)',
  analysisTitle: 'Greedy Seçim Neden Çalışır?',
  analysisPoints: [
    'Nesneler bölünebildiği için en yüksek değer yoğunluğunu önce almak yerel olarak en iyi ve global olarak optimaldir.',
    'Maliyet çoğunlukla oran sıralamasından gelir; seçim turu O(n) sürer.',
    '0/1 Knapsack için aynı strateji optimal değildir, çünkü nesneler bölünemez.',
  ],
  advantages: [
    'Bölünebilir nesnelerde optimal çözümü hızlı üretir.',
    'Uygulaması kısa ve izlenebilir bir greedy akışa sahiptir.',
    'Seçim vektörü, hangi nesneden ne kadar alındığını açık gösterir.',
  ],
  disadvantages: [
    'Nesnelerin parçalanamadığı 0/1 Knapsack probleminde optimal garanti vermez.',
    'Sıralama maliyeti nedeniyle tamamen doğrusal değildir.',
    'Değer ve ağırlık değerlerinin pozitif ve anlamlı olması gerekir.',
  ],
  relatedAlgorithms: [
    {
      title: '0/1 Knapsack',
      description: 'Nesnelerin ya tamamen alındığı ya da dışarıda bırakıldığı DP problemi.',
      href: '/algorithms/dynamic-programming/knapsack',
    },
    {
      title: 'Huffman Coding',
      description: 'Yerel greedy seçimlerle minimum ağırlıklı kod ağacı kurar.',
      href: '/algorithms/greedy-algorithms/huffman-coding',
    },
    {
      title: 'Bounded Knapsack',
      description: 'Her nesneden sınırlı sayıda kullanılabilen çanta varyantı.',
    },
  ],
};
