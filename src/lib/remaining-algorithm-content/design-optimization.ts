import type { RemainingAlgorithmContent } from './types';

export const branchAndBoundNpContent: RemainingAlgorithmContent = {
  title: 'Dallanıp Sınırlandırma (Branch and Bound)',
  category: 'Tasarım / Optimizasyon / NP',
  categoryHref: '/algorithms/design-optimization-np',
  family: 'Arama & Optimizasyon',
  difficulty: 'Zor',
  sources: ['DAA Notes', 'Sedgewick'],
  summary: 'Karar ağaçlarını sistematik olarak dolaşarak, sınır (bound) fonksiyonları yardımıyla suboptimal dalları budayan genel bir optimizasyon yöntemidir.',
  descriptionParagraphs: [
    'Dallanıp Sınırlandırma (Branch and Bound), özellikle NP-Zor tamsayılı programlama ve kombinatoryal optimizasyon problemlerinde kesin (exact) çözüm bulmak için kullanılan bir arama şemasıdır.',
    'Arama uzayı, düğümlerin durumları temsil ettiği bir durum uzayı ağacı (state space tree) olarak modellenir. Düğümlerin çocukları oluşturulurken (branching), her düğüm için çözümün kalitesine dair bir alt ve üst sınır (bounding) hesaplanır.',
    'Eğer bir düğümün en iyi ihtimalle verebileceği sınır değeri, şimdiye kadar bulunmuş en iyi geçerli çözümden daha kötüyse, o düğümün altındaki hiçbir dal taranmaz ve budanır (pruning). Aktif düğümlerin seçilme sırasına göre FIFO (Kuyruk/Breadth-First), LIFO (Yığın/Depth-First) veya LC (En Düşük Maliyetli / Priority Queue Best-First) stratejileri uygulanabilir.'
  ],
  sourceNotes: [
    'FIFO yaklaşımında standart Queue kullanılır ve ağaç seviye seviye taranır.',
    'LIFO yaklaşımında Stack kullanılır, derinlemesine arama yapılır.',
    'LC (Least Cost) veya Best-First arama stratejisinde ise sınır tahmini en iyi olan düğüm öncelikli olarak genişletilir, bu da arama uzayını genellikle en hızlı daraltan yaklaşımdır.'
  ],
  steps: [
    'Durum uzayı ağacının kök düğümünü aktif düğümler listesine (kuyruk, yığın veya öncelikli kuyruk) ekle.',
    'Şu ana kadar bulunan en iyi çözüm değerini (bestValue) başlangıçta geçersiz veya çok kötü bir değer olarak ayarla.',
    'Aktif düğümler listesi boşalana kadar:',
    '  Listeden bir düğüm seç (FIFO, LIFO veya LC kurallarına göre).',
    '  Eğer düğümün sınır değeri (bound), mevcut bestValue\'dan daha kötüyse düğümü buda ve geç.',
    '  Düğüm bir yaprak düğüm ise ve geçerli bir çözüm sunuyorsa, bestValue değerini güncelle.',
    '  Yaprak değilse, düğümün çocuk düğümlerini oluştur (branch).',
    '  Her çocuk düğümün sınır değerini hesapla. Sınırı uygun olanları aktif listeye ekle.',
    'Arama bittiğinde bestValue en iyi çözümü içerir.'
  ],
  pseudocode: `procedure BranchAndBound(problem)
    initialize active_nodes (FIFO, LIFO or PriorityQueue)
    best_value = -infinity
    root = create_root_node(problem)
    add root to active_nodes
    
    while active_nodes is not empty do
        node = extract_next(active_nodes)
        
        if EstimateBound(node) > best_value then
            if IsLeaf(node) then
                best_value = max(best_value, node.value)
            else
                for each child in Branch(node) do
                    if EstimateBound(child) > best_value then
                        add child to active_nodes
                    end if
                end for
            end if
        end if
    end while
    return best_value`,
  codeExamples: {
    typescript: `// Node definition for Branch and Bound Knapsack
interface BBNode {
  level: number;
  profit: number;
  weight: number;
  bound: number;
}

function getBound(node: BBNode, n: number, W: number, p: number[], w: number[]): number {
  if (node.weight >= W) return 0;
  
  let profitBound = node.profit;
  let j = node.level + 1;
  let totweight = node.weight;
  
  while (j < n && totweight + w[j] <= W) {
    totweight += w[j];
    profitBound += p[j];
    j++;
  }
  
  if (j < n) {
    profitBound += (W - totweight) * (p[j] / w[j]);
  }
  
  return profitBound;
}

export function knapsackBranchAndBound(W: number, w: number[], p: number[], n: number): number {
  // Sort items by profit/weight ratio in descending order
  const items = Array.from({ length: n }, (_, i) => ({ w: w[i], p: p[i], r: p[i]/w[i] }))
    .sort((a, b) => b.r - a.r);
    
  const sortedW = items.map(item => item.w);
  const sortedP = items.map(item => item.p);
  
  const queue: BBNode[] = [];
  const u: BBNode = { level: -1, profit: 0, weight: 0, bound: 0 };
  u.bound = getBound(u, n, W, sortedP, sortedW);
  queue.push(u);
  
  let maxProfit = 0;
  
  while (queue.length > 0) {
    // FIFO Strategy (shift from array)
    const t = queue.shift()!;
    
    if (t.level === n - 1) continue;
    
    const nextLevel = t.level + 1;
    
    // Left child: Include the item
    const withItem: BBNode = {
      level: nextLevel,
      profit: t.profit + sortedP[nextLevel],
      weight: t.weight + sortedW[nextLevel],
      bound: 0
    };
    
    if (withItem.weight <= W && withItem.profit > maxProfit) {
      maxProfit = withItem.profit;
    }
    
    withItem.bound = getBound(withItem, n, W, sortedP, sortedW);
    if (withItem.bound > maxProfit) {
      queue.push(withItem);
    }
    
    // Right child: Exclude the item
    const withoutItem: BBNode = {
      level: nextLevel,
      profit: t.profit,
      weight: t.weight,
      bound: 0
    };
    
    withoutItem.bound = getBound(withoutItem, n, W, sortedP, sortedW);
    if (withoutItem.bound > maxProfit) {
      queue.push(withoutItem);
    }
  }
  
  return maxProfit;
}`,
    python: `def get_bound(node, n, W, p, w):
    if node['weight'] >= W:
        return 0
    profit_bound = node['profit']
    j = node['level'] + 1
    totweight = node['weight']
    while j < n and totweight + w[j] <= W:
        totweight += w[j]
        profit_bound += p[j]
        j += 1
    if j < n:
        profit_bound += (W - totweight) * p[j] / w[j]
    return profit_bound

def knapsack_bb(W, w, p, n):
    # Sort by value/weight ratio
    items = sorted(zip(w, p), key=lambda x: x[1]/x[0], reverse=True)
    sorted_w = [item[0] for item in items]
    sorted_p = [item[1] for item in items]
    
    queue = []
    u = {'level': -1, 'profit': 0, 'weight': 0, 'bound': 0}
    u['bound'] = get_bound(u, n, W, sorted_p, sorted_w)
    queue.append(u)
    
    max_profit = 0
    while queue:
        # FIFO Queue
        t = queue.pop(0)
        if t['level'] == n - 1:
            continue
        next_level = t['level'] + 1
        
        # Left child: Take item
        left = {
            'level': next_level,
            'profit': t['profit'] + sorted_p[next_level],
            'weight': t['weight'] + sorted_w[next_level],
            'bound': 0
        }
        if left['weight'] <= W and left['profit'] > max_profit:
            max_profit = left['profit']
        left['bound'] = get_bound(left, n, W, sorted_p, sorted_w)
        if left['bound'] > max_profit:
            queue.append(left)
            
        # Right child: Skip item
        right = {
            'level': next_level,
            'profit': t['profit'],
            'weight': t['weight'],
            'bound': 0
        }
        right['bound'] = get_bound(right, n, W, sorted_p, sorted_w)
        if right['bound'] > max_profit:
            queue.append(right)
            
    return max_profit`
  },
  demo: {
    kind: 'branch-and-bound-np',
    title: 'Dallanıp Sınırlandırma Simülatörü',
    description: '0/1 Çanta probleminde FIFO, LIFO ve LC (Best-First) arama modellerini adım adım izleyin.',
    placeholder: 'FIFO; 15; 10,12,15,20; 2,3,5,7'
  },
  timeComplexity: {
    best: 'O(n log n) - Hızlı budama',
    average: 'Üstel - O(2^n)',
    worst: 'O(2^n) - Tüm uzay tarandığında'
  },
  spaceComplexity: 'O(2^n) - Aktif düğümler için kuyruk/yığın boyutu',
  analysisTitle: 'Optimizasyon ve Budama Analizi',
  analysisPoints: [
    'Sınır fonksiyonlarının sıkılığı (tightness), budama performansını doğrudan etkiler. Zayıf sınırlar ağacın neredeyse tamamının gezilmesine yol açar.',
    'LC (Least Cost) araması genellikle en az sayıda düğümü genişleterek sonuca ulaşır, fakat her adımda öncelikli kuyruk işlemleri gerektirir.',
    'LIFO stratejisi hafıza tüketimi açısından O(n) seviyesinde kalabilirken, FIFO stratejisi en geniş seviye düğüm sayısını barındırdığı için çok fazla bellek tüketebilir.'
  ],
  advantages: [
    'Yaklaşık çözümler yerine kesin (global optimal) sonucu bulur.',
    'Kaba kuvvet aramasına (exhaustive search) kıyasla çok daha az düğüm ziyaret eder.',
    'Budama sayesinde büyük alt ağaçlar tek seferde elenebilir.'
  ],
  disadvantages: [
    'En kötü durumda yine de üstel zaman karmaşıklığına sahiptir.',
    'Düğüm verilerinin saklanması durumunda bellek taşması (OOM) riski yüksektir.',
    'Uygulanması ve her problem için doğru sınır fonksiyonlarının formüle edilmesi zordur.'
  ],
  relatedAlgorithms: [
    { title: 'Backtracking', description: 'Tüm uzayı derinlemesine tarayan ama alt/üst sınır tabanlı budama yapmayan arama.' },
    { title: 'A* Arama Algoritması', description: 'Graf üzerinde sezgisel mesafe fonksiyonu kullanan best-first arama.' }
  ]
};

export const travelingSalesmanContent: RemainingAlgorithmContent = {
  title: 'Gezgin Satıcı ve Yerel Arama (Traveling Salesman & Local Search)',
  category: 'Tasarım / Optimizasyon / NP',
  categoryHref: '/algorithms/design-optimization-np',
  family: 'Kombinatoryal Optimizasyon',
  difficulty: 'Zor',
  sources: ['Aho', 'Sedgewick'],
  summary: 'Gezgin Satıcı Problemini (TSP) çözmek için kesin çözümler sunan kaba kuvvet aramasından, hızlı ve etkili 2-Opt yerel iyileştirme ve yaklaşıklık algoritmalarına kadar geniş bir spektrumu inceler.',
  descriptionParagraphs: [
    'Gezgin Satıcı Problemi (TSP), verilen n adet şehirden her birine tam olarak birer kez uğrayıp başlangıç noktasına dönen en kısa yolu bulma problemidir. NP-Zor yapısıyla bilinir.',
    'Kapsamlı Arama (Exhaustive Search), tüm olası (n-1)! / 2 turları inceleyerek kesin çözümü bulur, ancak n > 12 için pratik değildir. Bu sebeple pratikte sezgisel (heuristics) ve yaklaşıklık (approximation) algoritmaları tercih edilir.',
    'Yerel Arama (Local Search) yöntemlerinden en popüleri olan 2-Opt algoritması, mevcut bir turun kesişen veya verimsiz iki kenarını çıkarıp yolları ters çevirerek birleştirir. Bu işlem lokal iyileştirme yapılamayana kadar sürdürülür. En Yakın Komşu (Nearest Neighbor) ise başlangıç noktasına en yakın şehri seçerek ilerleyen açgözlü bir yaklaşıklık algoritmasıdır.'
  ],
  sourceNotes: [
    '2-Opt algoritması yerel minimumlara takılabilir. Bunu aşmak için çoklu başlangıçlı yerel arama (multi-start local search) uygulanır.',
    'Öklid uzayında Nearest Neighbor sezgisel yöntemi genellikle en iyi tur uzunluğunun 1.25 katı civarında sonuçlar verir.'
  ],
  steps: [
    'En Yakın Komşu Heuristiği:',
    '  Boş bir ziyaret listesi oluştur ve başlangıç şehrini ekle.',
    '  Şu anki şehre en yakın ve henüz ziyaret edilmemiş olan şehri bul.',
    '  O şehre git ve ziyaret edildi olarak işaretle.',
    '  Tüm şehirler bittiğinde başlangıç şehrine geri dönerek turu tamamla.',
    '2-Opt İyileştirmesi:',
    '  Mevcut bir tur al (örneğin En Yakın Komşu ile üretilmiş).',
    '  Her i ve j kenar çifti için (i+1 < j):',
    '    İki kenarı çıkar, aradaki yolu ters çevirerek bağla ve yeni tur uzunluğunu hesapla.',
    '    Eğer yeni uzunluk eskisinden kısaysa, değişikliği kalıcı yap ve aramayı baştan başlat.',
    '  Daha fazla iyileştirme yapılamayana (2-opt local minimum) kadar döngüyü sürdür.'
  ],
  pseudocode: `procedure TwoOpt(tour)
    improved = true
    while improved is true do
        improved = false
        for i = 1 to n - 2 do
            for j = i + 2 to n do
                new_tour = 2OptSwap(tour, i, j)
                if Distance(new_tour) < Distance(tour) then
                    tour = new_tour
                    improved = true
                end if
            end for
        end for
    end while
    return tour`,
  codeExamples: {
    typescript: `function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function calculateTotalDistance(tour: number[], pts: [number, number][]): number {
  let dist = 0;
  for (let i = 0; i < tour.length; i++) {
    const p1 = pts[tour[i]];
    const p2 = pts[tour[(i + 1) % tour.length]];
    dist += getDistance(p1[0], p1[1], p2[0], p2[1]);
  }
  return dist;
}

export function twoOpt(pts: [number, number][]): number[] {
  const n = pts.length;
  // Initialize with a simple 0..n-1 tour
  let tour = Array.from({ length: n }, (_, i) => i);
  let improved = true;
  
  while (improved) {
    improved = false;
    for (let i = 1; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        // 2-opt swap: reverse segment from i to j
        const newTour = [...tour.slice(0, i), ...tour.slice(i, j + 1).reverse(), ...tour.slice(j + 1)];
        if (calculateTotalDistance(newTour, pts) < calculateTotalDistance(tour, pts)) {
          tour = newTour;
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }
  return tour;
}`,
    python: `import math

def dist(p1, p2):
    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

def tour_distance(tour, points):
    d = 0
    for i in range(len(tour)):
        p1 = points[tour[i]]
        p2 = points[tour[(i + 1) % len(tour)]]
        d += dist(p1, p2)
    return d

def two_opt(points):
    n = len(points)
    tour = list(range(n))
    improved = True
    while improved:
        improved = False
        for i in range(1, n - 1):
            for j in range(i + 1, n):
                new_tour = tour[:i] + list(reversed(tour[i:j+1])) + tour[j+1:]
                if tour_distance(new_tour, points) < tour_distance(tour, points):
                    tour = new_tour
                    improved = True
                    break
            if improved:
                break
    return tour`
  },
  demo: {
    kind: 'traveling-salesman',
    title: 'TSP ve Yerel Arama Görselleştirici',
    description: 'Şehir koordinatlarını girerek 2-Opt yerel iyileştirmesi ve Kapsamlı Aramayı karşılaştırın.',
    placeholder: '2OPT; 0,0; 2,4; 5,2; 3,6; 1,1'
  },
  timeComplexity: {
    best: 'O(n^2) - Basit sezgisel',
    average: 'O(k * n^2) - 2-Opt iyileştirmesi',
    worst: 'O(n!) - Kapsamlı Arama'
  },
  spaceComplexity: 'O(n) - Tur dizisi saklama',
  analysisTitle: 'Heuristik ve Kesin Çözüm Kıyaslaması',
  analysisPoints: [
    'Kapsamlı Arama n=10 için yaklaşık 180,000 tur incelerken, n=15 için bu sayı 43 milyara çıkar ve hesaplanamaz hale gelir.',
    '2-Opt algoritması, n=100 gibi büyük boyutlarda bile milisaniyeler içinde optimuma çok yakın (%2-5 fark) çözümler üretebilir.',
    'Yerel aramanın kalitesi, başlangıç turuna çok bağımlıdır; bu nedenle önce Nearest Neighbor ile makul bir tur üretip ardından 2-Opt uygulamak yaygındır.'
  ],
  advantages: [
    '2-Opt, uygulaması kolay ve son derece hızlı çalışan bir lokal optimize edicidir.',
    'Çok büyük şehir setlerinde kabul edilebilir sürelerde oldukça kısa turlar sunar.',
    'NP-Zor bir problemi saniyeler bazında çözmek için idealdir.'
  ],
  disadvantages: [
    'Sezgisel yöntemlerin hiçbirisi global optimal çözümü garanti etmez.',
    'Lokal minimum tuzaklarına takılıp kalabilir.',
    'Büyük şehir adetlerinde 2-Opt araması da $O(n^2)$ yapısı gereği yavaşlayabilir.'
  ],
  relatedAlgorithms: [
    { title: 'Genetik Algoritmalar', description: 'TSP gibi zor optimizasyonlarda çaprazlama ve mutasyon kullanarak arama yapan evrimsel yöntem.' },
    { title: 'Simulated Annealing', description: 'Lokal minimum tuzaklarından kaçmak için kötü hamleleri olasılıksal olarak kabul eden meta-sezgisel.' }
  ]
};

export const knapsackVariantsContent: RemainingAlgorithmContent = {
  title: 'Çanta Problemi Varyantları (Knapsack Problem Variants)',
  category: 'Tasarım / Optimizasyon / NP',
  categoryHref: '/algorithms/design-optimization-np',
  family: 'Dinamik Programlama & Optimizasyon',
  difficulty: 'Zor',
  sources: ['DAA Notes'],
  summary: 'Eşyaların sınırlı miktarlarda (Bounded), sınırsızca (Unbounded), dallanıp sınırlandırmalı veya polinomsal doğrulamaya tabi tutularak (Nondeterministic / DKP) çanta problemlerinin çözüm yollarını kapsar.',
  descriptionParagraphs: [
    'Klasik 0/1 Çanta probleminde her nesneden sadece bir adet alınabilirken, varyantlar gerçek hayattaki farklı tedarik kısıtlarını modeller.',
    'Sınırlı Çanta (Bounded Knapsack) probleminde her eşya türünden en fazla $c_i$ adet alınabilir. Sınırsız Çanta (Unbounded Knapsack) probleminde ise her eşyadan istenildiği kadar sınırsızca alınabilir. Bu problemler Dinamik Programlama (DP) tabloları ile çözülür.',
    'Dallanıp Sınırlandırmalı Çanta (Branch-and-bound Knapsack), DP yerine durum ağacında kesirli gevşetme sınırlarını kullanarak kesin tamsayılı çözüm üretir. Nondeterministik Çanta (DKP) ise NP-tam sınıflarını betimlemek için tasarlanmıştır: Karar versiyonunda belirli bir hedef değere ulaşılabileceğini tahmin edip polinomsal sürede doğrular.'
  ],
  sourceNotes: [
    'Sınırsız çanta problemi, tek boyutlu bir DP dizisi $dp[w]$ ile çözülebilir ve her ağırlık için tüm nesneler tekrar tekrar değerlendirilir.',
    'Sınırlı çanta problemi, nesnelerin ikili (binary) gruplara bölünmesi tekniğiyle standart 0/1 çantasına dönüştürülerek optimize edilebilir.'
  ],
  steps: [
    'Sınırsız Çanta Dinamik Programlama:',
    '  Boyutu W+1 olan bir dp dizisi oluştur ve sıfırla. ($dp[w]$: w kapasitesi ile ulaşılabilecek max değer)',
    '  w = 0\'dan W\'ye kadar döngü kur:',
    '    Her i nesnesi için (ağırlığı w_i, değeri v_i):',
    '      Eğer w_i <= w ise: dp[w] = max(dp[w], dp[w - w_i] + v_i)',
    '  dp[W] değeri en yüksek kazancı verir.',
    'Nondeterministik Doğrulama (DKP):',
    '  Girilen "tahmin" (guess) seçim vektörünü (hangi eşyadan kaç adet alındığını) al.',
    '  Seçimin toplam ağırlığını ve toplam değerini hesapla.',
    '  Eğer toplam ağırlık <= W ve toplam değer >= TargetValue ise "GEÇERLİ", aksi halde "GEÇERSİZ" sonucunu döndür.'
  ],
  pseudocode: `procedure UnboundedKnapsack(W, weights, values, n)
    dp = array of size W + 1 initialized to 0
    for w = 1 to W do
        for i = 0 to n - 1 do
            if weights[i] <= w then
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
            end if
        end for
    end for
    return dp[W]`,
  codeExamples: {
    typescript: `export function unboundedKnapsack(W: number, w: number[], v: number[], n: number): number {
  const dp = new Array(W + 1).fill(0);
  
  for (let weight = 1; weight <= W; weight++) {
    for (let i = 0; i < n; i++) {
      if (w[i] <= weight) {
        dp[weight] = Math.max(dp[weight], dp[weight - w[i]] + v[i]);
      }
    }
  }
  return dp[W];
}

export function boundedKnapsack(W: number, w: number[], v: number[], c: number[], n: number): number {
  // Convert Bounded to 0/1 Knapsack using binary decomposition
  const newW: number[] = [];
  const newV: number[] = [];
  
  for (let i = 0; i < n; i++) {
    let limit = c[i];
    let k = 1;
    while (limit > 0) {
      const take = Math.min(k, limit);
      newW.push(take * w[i]);
      newV.push(take * v[i]);
      limit -= take;
      k *= 2;
    }
  }
  
  // Standard 0/1 DP
  const m = newW.length;
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < m; i++) {
    for (let weight = W; weight >= newW[i]; weight--) {
      dp[weight] = Math.max(dp[weight], dp[weight - newW[i]] + newV[i]);
    }
  }
  return dp[W];
}`,
    python: `def unbounded_knapsack(W, w, v, n):
    dp = [0] * (W + 1)
    for weight in range(1, W + 1):
        for i in range(n):
            if w[i] <= weight:
                dp[weight] = max(dp[weight], dp[weight - w[i]] + v[i])
    return dp[W]

def bounded_knapsack(W, w, v, c, n):
    new_w, new_v = [], []
    for i in range(n):
        limit = c[i]
        k = 1
        while limit > 0:
            take = min(k, limit)
            new_w.append(take * w[i])
            new_v.append(take * v[i])
            limit -= take
            k *= 2
            
    dp = [0] * (W + 1)
    for i in range(len(new_w)):
        for weight in range(W, new_w[i] - 1, -1):
            dp[weight] = max(dp[weight], dp[weight - new_w[i]] + new_v[i])
    return dp[W]`
  },
  demo: {
    kind: 'knapsack-variants',
    title: 'Çanta Problemi Varyantları Simülatörü',
    description: 'Sınırlı, Sınırsız, Branch & Bound ve Nondeterministik modlarda çanta problem çözümlerini karşılaştırın.',
    placeholder: 'UNBOUNDED; 10; 10,15,20; 2,3,4'
  },
  timeComplexity: {
    best: 'O(W * n) - Dynamic Programming',
    average: 'O(W * sum(log c_i)) - Sınırlı çanta ikili ayrıştırma ile',
    worst: 'O(2^n) - Branch and Bound worst-case'
  },
  spaceComplexity: 'O(W) - DP tabloları veya kuyruk yapıları için',
  analysisTitle: 'Dinamik Programlama Karmaşıklık Değerlendirmesi',
  analysisPoints: [
    'Sınırsız Çanta DP çözümünde bellek gereksinimi sadece $O(W)$\'dur, çünkü tablonun sadece bir önceki satırına değil aynı satırın gerisine başvurulur.',
    'İkili Ayrıştırma (Binary Decomposition), Bounded Knapsack problemini $O(W \sum c_i)$ yerine $O(W \sum \log c_i)$ süresine indirger ve büyük bir optimizasyon sağlar.',
    'Nondeterministik karar versiyonunda doğrulama adımları $O(n)$ sürmektedir, bu da problemin NP sınıfında olduğunu gösterir.'
  ],
  advantages: [
    'DP modelleri, tamsayı ağırlıklarda polinomsal olmayan ama pratikte hızlı çözümler sunar.',
    'Binary decomposition ile sınırlı kapasiteli tedarik problemleri verimli bir şekilde çözülebilir.',
    'Farklı kısıt yapılarına kolayca uyarlanabilir.'
  ],
  disadvantages: [
    'Kapasite W çok büyük olduğunda (örneğin kayan noktalı sayılar) DP yöntemi çalışmaz veya aşırı büyük bellek ister (pseudo-polynomial limit).',
    'Branch and Bound en kötü durumda tüm dalları açabilir.',
    'Gerçek dünya uygulamalarında sürekli ve tamsayılı olmayan kısıtlar ek formüller gerektirir.'
  ],
  relatedAlgorithms: [
    { title: 'Dinamik Programlama 0/1 Çantası', description: 'Eşyalardan sadece birer tane alınabilen temel sürüm.' },
    { title: 'Fractional Knapsack', description: 'Eşyaların bölünebildiği ve Greedy yaklaşımla O(n log n) sürede çözülen çanta sürümü.' }
  ]
};

export const schedulingChainContent: RemainingAlgorithmContent = {
  title: 'Zamanlama ve Zincir Optimizasyonu (Scheduling & Chain Optimization)',
  category: 'Tasarım / Optimizasyon / NP',
  categoryHref: '/algorithms/design-optimization-np',
  family: 'Dinamik Programlama & Greedy',
  difficulty: 'Orta',
  sources: ['DAA Notes'],
  summary: 'Kar optimizasyonlu iş zamanlama, matris zincir çarpım sırasını belirleme ve bütçe kısıtlı sistem güvenilirlik tasarımı gibi ardışık kar problemlerini çözmeyi amaçlar.',
  descriptionParagraphs: [
    'Zamanlama ve Zincir Optimizasyonu, sınırlı kaynakların veya hesaplama adımlarının en yüksek kar veya en düşük maliyet getirecek biçimde planlanmasıdır.',
    'Teslim Tarihli İş Sıralama (Job Sequencing with Deadlines), her işin bir süresi, son teslim tarihi (deadline) ve getirisi olduğu durumda, işleri çakışmayacak şekilde zamanlayarak karı maksimum yapan açgözlü (greedy) bir algoritmadır.',
    'Matris Zincir Çarpımı (Matrix-Chain Multiplication), bir dizi matrisi çarparken yapılacak skaler çarpım sayısını en aza indiren dinamik programlama yöntemidir. Güvenilirlik Tasarımı (Reliability Design) ise sistemdeki bileşenlerin yedekli kopyalarını oluşturup, bütçe sınırları dahilinde toplam sistem güvenilirliğini maksimize eden DP yaklaşımıdır.'
  ],
  sourceNotes: [
    'Job Sequencing algoritmasında işler karların büyüklüğüne göre sıralanır ve her iş son teslim tarihine en yakın boş güne yerleştirilir.',
    'Matris zincir probleminde k çarpım bölünme noktaları dinamik olarak taranarak $O(n^3)$ zamanda optimum gruplama bulunur.'
  ],
  steps: [
    'Matris Zincir Çarpımı:',
    '  n matris için boyutları p dizisi olarak al (A_i boyutu p[i-1] x p[i]).',
    '  dp[n][n] tablosu oluştur ve köşegenleri sıfırla (tek matrisin maliyeti 0).',
    '  l = 2\'den n\'e kadar zincir uzunluklarını tara:',
    '    Her i = 1\'den n-l+1 için:',
    '      j = i + l - 1 olarak hedef matrisi ayarla.',
    '      dp[i][j] = sonsuz yap.',
    '      k = i\'den j-1\'e kadar bölünme noktalarını tara:',
    '        maliyet = dp[i][k] + dp[k+1][j] + p[i-1]*p[k]*p[j]',
    '        Eğer maliyet < dp[i][j] ise dp[i][j] = maliyet yap ve k değerini kaydet.',
    '  dp[1][n] en düşük skaler çarpım maliyetini verir.',
    'Job Sequencing with Deadlines:',
    '  İşleri azalan karlarına göre sırala.',
    '  Max deadline boyutunda boş zaman dilimleri (slots) oluştur.',
    '  Her iş için:',
    '    İşin son teslim tarihinden (deadline) başlayıp geriye doğru ilk boş slotu ara.',
    '    Boş slot bulunursa işi oraya ata ve slotu dolu olarak işaretle.',
    '  Atanan işlerin toplam karını ve sıralamasını döndür.'
  ],
  pseudocode: `procedure MatrixChainOrder(p, n)
    m = 2D array of size n x n initialized to 0
    for l = 2 to n do
        for i = 1 to n - l + 1 do
            j = i + l - 1
            m[i][j] = infinity
            for k = i to j - 1 do
                q = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j]
                if q < m[i][j] then
                    m[i][j] = q
                end if
            end for
        end for
    end for
    return m[1][n]`,
  codeExamples: {
    typescript: `export interface Job {
  id: string;
  deadline: number;
  profit: number;
}

export function jobSequencing(jobs: Job[]): { sequence: string[]; totalProfit: number } {
  // Sort by profit descending
  const sorted = [...jobs].sort((a, b) => b.profit - a.profit);
  const maxDeadline = Math.max(...jobs.map(j => j.deadline));
  
  const slots = new Array(maxDeadline).fill(null);
  let totalProfit = 0;
  
  for (const job of sorted) {
    for (let t = Math.min(maxDeadline, job.deadline) - 1; t >= 0; t--) {
      if (slots[t] === null) {
        slots[t] = job.id;
        totalProfit += job.profit;
        break;
      }
    }
  }
  
  return {
    sequence: slots.filter(id => id !== null) as string[],
    totalProfit
  };
}

export function matrixChainMultiplication(p: number[]): { cost: number; split: number[][] } {
  const n = p.length - 1;
  const m = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  const s = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  
  for (let l = 2; l <= n; l++) {
    for (let i = 1; i <= n - l + 1; i++) {
      const j = i + l - 1;
      m[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
        if (q < m[i][j]) {
          m[i][j] = q;
          s[i][j] = k;
        }
      }
    }
  }
  
  return { cost: m[1][n], split: s };
}`,
    python: `def job_sequencing(jobs):
    # jobs is list of dicts: {'id': 'J1', 'deadline': 2, 'profit': 100}
    sorted_jobs = sorted(jobs, key=lambda x: x['profit'], reverse=True)
    max_d = max(j['deadline'] for j in jobs)
    slots = [None] * max_d
    total_profit = 0
    for job in sorted_jobs:
        for t in range(min(max_d, job['deadline']) - 1, -1, -1):
            if slots[t] is None:
                slots[t] = job['id']
                total_profit += job['profit']
                break
    return [s for s in slots if s is not None], total_profit

def matrix_chain(p):
    n = len(p) - 1
    m = [[0]*(n+1) for _ in range(n+1)]
    s = [[0]*(n+1) for _ in range(n+1)]
    for l in range(2, n + 1):
        for i in range(1, n - l + 2):
            j = i + l - 1
            m[i][j] = float('inf')
            for k in range(i, j):
                q = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j]
                if q < m[i][j]:
                    m[i][j] = q
                    s[i][j] = k
    return m[1][n], s`
  },
  demo: {
    kind: 'scheduling-chain',
    title: 'Zamanlama ve Zincir Optimizasyonu Simülatörü',
    description: 'Matris boyut dizisi veya iş listesi vererek en düşük çarpım maliyetini ya da en yüksek greedy karlarını hesaplayın.',
    placeholder: 'MATRIX; 10,20,50,1,100'
  },
  timeComplexity: {
    best: 'O(n log n) - İş Sıralama sıralaması dahil',
    average: 'O(n^3) - Matris Zincir Çarpımı',
    worst: 'O(n^3) - Matris Zincir Çarpımı'
  },
  spaceComplexity: 'O(n^2) - Matris Zincir DP tablosu için',
  analysisTitle: 'Bölünme ve Sıralama Analizi',
  analysisPoints: [
    'Matris Zincir Çarpımı probleminde sadece skaler çarpım adımlarını hesaplamaz, "Split" tablosu (s) yardımıyla en iyi parantezleme ağacını da rekonstrukte ederiz.',
    'Job Sequencing heuristiği kar-odaklı greedy yaklaşım kullandığından, kesin optimal sonucu verir (matroid yapısına sahiptir).',
    'Reliability Design bütçe kısıtlarını tamsayı kabul ederek her adımda sistemin çarpımsal olasılığını maksimize eder.'
  ],
  advantages: [
    'Matrislerin çarpım sırasını optimize etmek, büyük grafik ve 3D motorlarında işlem süresini binlerce kat kısaltabilir.',
    'İş sıralama algoritması, kaynakların zaman planlamasında basit ama etkili sonuçlar üretir.',
    'Güvenilirlik tasarımı, donanım yedekleme maliyetlerini minimize eder.'
  ],
  disadvantages: [
    'Matris zincir çarpımındaki $O(n^3)$ karmaşıklığı çok büyük matris dizilerinde yavaş kalabilir.',
    'İş sıralamada tek CPU kısıtı vardır; çoklu işlemcili (multiprocessor) sistemlerde NP-Zor hale gelir ve bu algoritma çalışmaz.',
    'DP modelleri durum sayısı arttıkça aşırı bellek tüketebilir.'
  ],
  relatedAlgorithms: [
    { title: 'Açgözlü (Greedy) Yaklaşım', description: 'Gelecekteki adımları düşünmeden o an için en iyi görünen seçimi yapan tasarım tekniği.' },
    { title: 'Dynamic Programming', description: 'Alt problemleri bir kez çözüp hafızaya kaydederek optimizasyon yapan teknik.' }
  ]
};

export const multistageGraphsContent: RemainingAlgorithmContent = {
  title: 'Çok Aşamalı Graflar (Multistage Graphs)',
  category: 'Tasarım / Optimizasyon / NP',
  categoryHref: '/algorithms/design-optimization-np',
  family: 'Graf Algoritmaları',
  difficulty: 'Orta',
  sources: ['DAA Notes'],
  summary: 'Aşamalı olarak yapılandırılmış yönlü graflarda (Directed Stage Graphs) kaynaktan hedefe en kısa yolu ileri (Forward) veya geri (Backward) formüllerle bulan dinamik programlama yöntemidir.',
  descriptionParagraphs: [
    'Çok Aşamalı Graf (Multistage Graph), köşe kümelerinin birbirini izleyen $k$ adet aşamaya (stages) ayrıldığı ve kenarların sadece aşama $i$ köşe kümesinden aşama $i+1$ köşe kümesine doğru yönlendiği özel bir Yönlü Döngüsüz Graftır (DAG).',
    'Kaynaktan (Stage 1) hedefe (Stage k) giden en kısa yol, dinamik programlama kullanılarak çözülür. İleri Akış (Forward) yaklaşımı, hedef düğümden başlayarak geriye doğru maliyetleri hesaplar; her düğümün hedefe olan en kısa mesafesini bulur.',
    'Geri Akış (Backward) yaklaşımı ise kaynaktan başlayarak ileriye doğru maliyetleri yığar ve hedefe kadar olan optimum kararları hesaplar. Her iki yaklaşım da en sonunda aynı optimal yolu üretir.'
  ],
  sourceNotes: [
    'Aşamalar arasındaki kenarlar yönlüdür ve aşamaları atlayarak doğrudan geçiş yapılamaz. Bu yapı, ardışık kaynak tahsisi süreçlerinde sıkça kullanılır.',
    'Karmaşıklığı köşe ve kenar sayısıyla doğrusal orantılı olup $O(V + E)$ sürede tamamlanır.'
  ],
  steps: [
    'İleri Akış Algoritması (Forward):',
    '  Hedef düğümün maliyetini 0 olarak belirle: cost[target] = 0.',
    '  Aşama k-1\'den aşama 1\'e doğru (tersten) her düğüm i için döngü kur:',
    '    i\'den çıkan her (i, j) kenarı için (ağırlığı w):',
    '      Mevcut aday mesafeyi hesapla: temp = w + cost[j]',
    '      cost[i] değerini bu adayların minimumu yap ve karar düğümünü d[i] = j olarak kaydet.',
    '  cost[source] minimum maliyeti verir. Yol reconstruct edilmek için d dizisi takip edilir: source -> d[source] -> d[d[source]]... -> target.',
    'Geri Akış Algoritması (Backward):',
    '  Kaynak düğümün maliyetini 0 olarak belirle: bcost[source] = 0.',
    '  Aşama 2\'den aşama k\'ya doğru her düğüm i için döngü kur:',
    '    i\'ye gelen her (j, i) kenarı için (ağırlığı w):',
    '      Aday mesafeyi hesapla: temp = bcost[j] + w',
    '      bcost[i] değerini bu adayların minimumu yap ve karar düğümünü bd[i] = j olarak kaydet.',
    '  Hedefe ulaşıldığında en kısa yol tersten reconstruct edilir.'
  ],
  pseudocode: `procedure ForwardFgraph(G, k)
    cost[n] = 0
    for i = n - 1 down to 1 do
        cost[i] = infinity
        for each vertex j adjacent to i do
            if c[i][j] + cost[j] < cost[i] then
                cost[i] = c[i][j] + cost[j]
                d[i] = j
            end if
        end for
    end for
    // Path: 1 -> d[1] -> d[d[1]] -> ... -> n
    return cost[1]`,
  codeExamples: {
    typescript: `export interface MultistageEdge {
  u: number;
  v: number;
  weight: number;
}

export function forwardMultistage(
  n: number, // Total number of vertices (1-indexed, target is n)
  edges: MultistageEdge[]
): { cost: number; path: number[] } {
  const cost = new Array(n + 1).fill(Infinity);
  const d = new Array(n + 1).fill(0);
  cost[n] = 0;
  
  // Group edges by source for fast lookup
  const adj: Record<number, { v: number; w: number }[]> = {};
  for (const edge of edges) {
    if (!adj[edge.u]) adj[edge.u] = [];
    adj[edge.u].push({ v: edge.v, w: edge.weight });
  }
  
  // Forward DP: iterate vertices backwards
  for (let i = n - 1; i >= 1; i--) {
    if (!adj[i]) continue;
    for (const edge of adj[i]) {
      const val = edge.w + cost[edge.v];
      if (val < cost[i]) {
        cost[i] = val;
        d[i] = edge.v;
      }
    }
  }
  
  // Reconstruct path
  const path: number[] = [1];
  let curr = 1;
  while (curr !== n && d[curr] !== 0) {
    curr = d[curr];
    path.push(curr);
  }
  
  return { cost: cost[1], path };
}`,
    python: `def forward_multistage(n, edges):
    cost = [float('inf')] * (n + 1)
    d = [0] * (n + 1)
    cost[n] = 0
    
    # Adjacency list
    adj = {i: [] for i in range(1, n + 1)}
    for u, v, w in edges:
        adj[u].append((v, w))
        
    for i in range(n - 1, 0, -1):
        for v, w in adj[i]:
            val = w + cost[v]
            if val < cost[i]:
                cost[i] = val
                d[i] = v
                
    path = [1]
    curr = 1
    while curr != n and d[curr] != 0:
        curr = d[curr]
        path.append(curr)
        
    return cost[1], path`
  },
  demo: {
    kind: 'multistage-graphs',
    title: 'Çok Aşamalı Graf Simülatörü',
    description: 'Aşamalardan oluşan yönlü bir graf girerek İleri (Forward) ve Geri (Backward) DP adımlarını adım adım simüle edin.',
    placeholder: 'FORWARD; 8; 1-2:2,1-3:1,1-4:3,2-5:2,2-6:3,3-5:6,3-6:7,4-6:8,5-7:1,5-8:4,6-7:3,6-8:2,7-8:1'
  },
  timeComplexity: {
    best: 'O(V + E) - Aşamalı yapıda doğrusal',
    average: 'O(V + E)',
    worst: 'O(V + E) - Tüm kenar ve düğümler taranır'
  },
  spaceComplexity: 'O(V) - cost ve karar dizileri için',
  analysisTitle: 'Sequential Decision Optimizasyonu',
  analysisPoints: [
    'Çok aşamalı graflar, aşama kısıtı barındırdığı için döngü içeremez. Bu sayede en kısa yol Dijkstra yerine çok daha hızlı olan DP ile çözülebilir.',
    'İleri (Forward) formülasyonu $cost(i) = \min_{j}\{c(i,j) + cost(j)\}$ hedeften kaynağa geriye doğru çalışır.',
    'Geri (Backward) formülasyonu ise $bcost(i) = \min_{j}\{bcost(j) + c(j,i)\}$ kaynaktan hedefe ileriye doğru çalışır.'
  ],
  advantages: [
    'Kenar ağırlıkları negatif olsa bile doğru çalışır (döngüsüz olduğu sürece).',
    'Matris çarpımları veya aşamalı bütçe kararları gibi ardışık problemleri graf modeline dökerek optimize edebilir.',
    'Hesaplama adımları basittir, tablolama (tabulation) kolaydır.'
  ],
  disadvantages: [
    'Grafın mutlaka katmanlara ayrılabilir (multistage) olması gerekir; rastgele çevrimsel graflara uygulanamaz.',
    'Eğer katmanlar iyi tanımlanmamışsa katmanları oluşturma maliyeti eklenir.',
    'Düğüm ve katman sayısının çok yüksek olduğu durumlarda bellek kullanımı artabilir.'
  ],
  relatedAlgorithms: [
    { title: 'Dijkstra Algoritması', description: 'Çevrimsel olabilen ve sadece pozitif kenarlar barındıran graflarda en kısa yol bulma.' },
    { title: 'Bellman-Ford Algoritması', description: 'Negatif kenar barındırabilen genel graflarda en kısa yol bulma.' }
  ]
};

export const graphColoringNpContent: RemainingAlgorithmContent = {
  title: 'Graf Boyama ve NP-Zor (Graph Coloring & Hard Problems)',
  category: 'Tasarım / Optimizasyon / NP',
  categoryHref: '/algorithms/design-optimization-np',
  family: 'NP-Zor & Geri İzleme',
  difficulty: 'Zor',
  sources: ['DAA Notes', 'Sedgewick'],
  summary: 'M renk kullanarak komşu düğümlerin aynı renge boyanmamasını sağlayan Graf Boyama backtracking algoritmasını ve Cook Teoremi temelli SAT çözücü (DPLL) yaklaşımını ele alır.',
  descriptionParagraphs: [
    'Graf Boyama (Graph Coloring), bir grafın köşelerine belirli renkler atanırken, birbirine bağlı hiçbir komşu köşenin aynı rengi almaması kısıtını güden klasik bir NP-Zor problemdir. Karar versiyonu (m renkle boyanabilir mi?) ise NP-Tamdır.',
    'Bu problemi çözmek için en yaygın kesin yöntem M-Boyama Geri İzleme (M-Coloring Backtracking) algoritmasıdır. Düğümler sırayla boyanır, eğer bir komşuluk çakışması olursa geri adım (backtrack) atılarak diğer alternatif renkler denenir.',
    'Cook Teoremi, Boolean Formülünün Karşılanabilirliği (SAT) probleminin ilk NP-Tam problem olduğunu kanıtlamıştır. DPLL (Davis-Putnam-Logemann-Loveland) algoritması, mantıksal formülleri (CNF formatında) çözmek için bir karar ağacı kurup, birim yayılımı (unit propagation) ve saf sembol elemeleriyle arama uzayını daraltan temel bir SAT çözücüdür.'
  ],
  sourceNotes: [
    'DPLL algoritması, modern endüstriyel SAT çözücülerin (MiniSAT vb.) temelini oluşturur ve çelişki tabanlı öğrenme (CDCL) ile genişletilmiştir.',
    'Harita boyama (Planar Graphs) problemleri en fazla 4 renkle çözülebilir (Dört Renk Teoremi).'
  ],
  steps: [
    'M-Boyama Geri İzleme:',
    '  Boyama fonksiyonunu düğüm 0 ile çağır.',
    '  Eğer tüm düğümler başarıyla boyandıysa, çözümü döndür.',
    '  Düğüm u için c = 1\'den m renk limitine kadar döngü kur:',
    '    Düğüm u\'yu c rengine boyamanın komşularıyla çakışıp çakışmadığını kontrol et (Safe check).',
    '    Çakışmıyorsa, düğüm u\'yu c rengine boya ve sonraki düğüm için fonksiyonu özyinelemeli çağır.',
    '    Çağrı başarılı olduysa sonucu ilet.',
    '    Başarısız olduysa, düğümün rengini sıfırla (backtrack) ve sonraki rengi dene.',
    '  Tüm renkler elendiyse başarısızlık döndür.',
    'DPLL SAT Çözücü:',
    '  Verilen mantıksal ifadeyi clauses listesi olarak al (CNF: Conjunctive Normal Form).',
    '  Eğer tüm clause listesi boşsa (tümü doğruysa), "SATISFIABLE" döndür.',
    '  Eğer boş bir clause varsa (çelişki oluştuysa), "UNSATISFIABLE" döndür.',
    '  Birim Clause (tek bir değişken içeren clause) varsa, o değişkene değerini ata, sadeleştir ve özyinelemeli çağır (Unit Propagation).',
    '  Bir değişken seç ve doğru (True) olduğunu varsay, formülü sadeleştir, çözmeyi dene.',
    '  Çözülemezse yanlış (False) olduğunu varsay, çözmeyi dene.',
    '  Her iki dal da başarısız olursa "UNSATISFIABLE" döndür.'
  ],
  pseudocode: `procedure DPLL(clauses, assignment)
    if clauses is empty then return true
    if clauses contains empty clause then return false
    
    // Unit Propagation
    for each clause in clauses do
        if clause has only one literal L then
            return DPLL(Simplify(clauses, L), assignment + L)
        end if
    end for
    
    // Split decision
    P = choose_literal(clauses)
    if DPLL(Simplify(clauses, P), assignment + P) then
        return true
    else
        return DPLL(Simplify(clauses, -P), assignment + -P)
    end if`,
  codeExamples: {
    typescript: `export function isColorSafe(
  node: number,
  graph: number[][],
  color: number[],
  c: number
): boolean {
  for (let i = 0; i < graph.length; i++) {
    if (graph[node][i] === 1 && color[i] === c) {
      return false;
    }
  }
  return true;
}

export function graphColoringBacktracking(
  graph: number[][],
  m: number,
  color: number[],
  node: number
): boolean {
  const v = graph.length;
  if (node === v) return true;
  
  for (let c = 1; c <= m; c++) {
    if (isColorSafe(node, graph, color, c)) {
      color[node] = c;
      if (graphColoringBacktracking(graph, m, color, node + 1)) {
        return true;
      }
      color[node] = 0; // Backtrack
    }
  }
  
  return false;
}`,
    python: `def is_safe(node, graph, color, c):
    for i in range(len(graph)):
        if graph[node][i] == 1 and color[i] == c:
            return False
    return True

def graph_coloring_util(graph, m, color, node):
    v = len(graph)
    if node == v:
        return True
    for c in range(1, m + 1):
        if is_safe(node, graph, color, c):
            color[node] = c
            if graph_coloring_util(graph, m, color, node + 1):
                return True
            color[node] = 0 # Backtrack
    return False

def graph_coloring(graph, m):
    color = [0] * len(graph)
    if graph_coloring_util(graph, m, color, 0):
        return color
    return None`
  },
  demo: {
    kind: 'graph-coloring-np',
    title: 'Graf Boyama ve DPLL SAT Çözücü',
    description: 'Graf boyama backtracking veya DPLL CNF SAT çözücü adımlarını komşuluk matrisleri ve mantıksal kurallarla izleyin.',
    placeholder: 'COLOR; 4; 0-1,1-2,2-3,3-0; 3'
  },
  timeComplexity: {
    best: 'O(V) - Çelişki bulunmayan durumlar',
    average: 'Üstel - O(m^V)',
    worst: 'O(m^V) / O(2^V) - Tüm arama ağacı gezildiğinde'
  },
  spaceComplexity: 'O(V) - Özyinelemeli çağrı yığını (call stack) derinliği',
  analysisTitle: 'NP-Zor Karar Ağacı Analizi',
  analysisPoints: [
    'M-Boyama probleminde düğüm sıralama stratejileri (örneğin derecesi en yüksek olanı önce boyama) arama derinliğini ve çelişkileri çok daha hızlı fark etmeyi sağlar.',
    'DPLL algoritmasında "Unit Propagation" adımları, arama ağacının derin dallarına inmeden önce milyarlarca olasılığı tek seferde eleyebilir.',
    'Cook-Levin teoremi, 3-SAT probleminin polinomsal sürede başka herhangi bir NP problemine indirgenebileceğini göstermiştir.'
  ],
  advantages: [
    'Kesin olarak grafın belirtilen m renk ile boyanıp boyanamayacağını veya formülün sağlanabilir olup olmadığını söyler.',
    'Backtracking sayesinde geçersiz atamalar tespit edildiği an geriye dönülerek gereksiz aramalar önlenir.',
    'SAT çözücü yapısı, donanım doğrulama (hardware verification) ve yapay zeka planlama problemlerine birebir uygulanabilir.'
  ],
  disadvantages: [
    'Büyük graflarda veya binlerce değişkene sahip SAT formüllerinde arama ağacı devasa hale gelir ve kilitlenmeye yol açabilir.',
    'NP-Zor bir problemi kesin olarak çözmek teorik olarak $P \\neq NP$ varsayımında polinomsal sürede imkansızdır.',
    'Hafıza tüketimi olmasa bile işlemciyi uzun süre kilitleyebilir.'
  ],
  relatedAlgorithms: [
    { title: 'Kaba Kuvvet (Exhaustive Search)', description: 'Tüm olası atamaları teker teker deneyen basit ve verimsiz yaklaşım.' },
    { title: 'Greedy Graf Boyama', description: 'Geri izleme yapmadan düğümleri hızlıca boyayan ancak minimum renk sayısını garanti etmeyen sezgisel.' }
  ]
};
