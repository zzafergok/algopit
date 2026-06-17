import type { RemainingAlgorithmContent } from './types';

export const heapOperationsContent: RemainingAlgorithmContent = {
  title: 'Yığın İşlemleri (Heap & PQ Operations)',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Heaps / Priority Queues',
  difficulty: 'Orta',
  sources: ['Sedgewick'],
  summary: 'Bir diziyi doğrusal O(n) zamanda yığın (heap) yapısına dönüştüren Heapify ve veri taşımayı önleyen Dolaylı Yığın (Index Heap) işlemlerini kapsar.',
  descriptionParagraphs: [
    'İkili Yığın (Binary Heap), en büyük veya en küçük elemana O(1) zamanda erişim sunan ve ekleme/silme işlemlerini O(log n) zamanda gerçekleştiren, tamamlanmış ikili ağaç tabanlı bir veri yapısıdır.',
    'Diziden Yığın Oluşturma (Heap Construction / Heapify), rastgele sıralı bir diziyi en alt seviyedeki yaprak olmayan düğümlerden başlayarak yukarıya doğru aşağı süzme (sink/heapify-down) yöntemiyle O(n) doğrusal zamanda yığına dönüştürür. Bu, her elemanı tek tek yukarı süzerek (swim/heapify-up) O(n log n) zamanda yığın yapmaktan çok daha verimlidir.',
    'Dolaylı Yığın (Indirect Heap veya Index Heap), yığının kendisinde verileri taşımak yerine, verilerin orijinal indekslerini yığın olarak organize eder. Bu sayede büyük veya karmaşık nesnelerin taşınma maliyetlerinden kaçınılır ve öncelikli kuyrukta anahtarların değerleri dışarıdan güncellenebilir (decrease-key).'
  ],
  sourceNotes: [
    'Sedgewick: Bottom-up heap construction runs in linear O(n) time by calling sink from N/2 down to 1.',
    'Sedgewick: Indirect heaps maintain an index mapping array pq[] and inverse mapping array qp[] to allow fast element updates.'
  ],
  steps: [
    'Yığın Oluşturma için: n elemanlı dizinin n/2. indeksindeki düğümden (son yaprak olmayan düğüm) başla.',
    'Köke doğru sırayla her düğüm için aşağı süzme (sink) fonksiyonunu çalıştır.',
    'Aşağı süzmede, düğümü iki çocuğuyla karşılaştır; büyük olan çocukla düğümü yer değiştir ve işlem düğüm doğru konuma inene kadar devam et.',
    'Dolaylı Yığın için: Öncelik kuyruğu dizisinde nesnelerin kendilerini değil indekslerini tut. İndeksler üzerinden karşılaştırmalar yap.'
  ],
  pseudocode: `BUILD-MAX-HEAP(A)
  heap_size <- length(A)
  for i <- floor(length(A) / 2) down to 0
    MAX-HEAPIFY(A, i)

MAX-HEAPIFY(A, i)
  l <- LEFT(i)
  r <- RIGHT(i)
  largest <- i
  if l < heap_size and A[l] > A[largest]
    largest <- l
  if r < heap_size and A[r] > A[largest]
    largest <- r
  if largest != i
    exchange A[i] with A[largest]
    MAX-HEAPIFY(A, largest)`,
  codeExamples: {
    typescript: `function heapify(arr: number[], n: number, i: number, trace?: string[]) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    if (trace) {
      trace.push(\`  Swap(arr[\${i}]=\${arr[i]}, arr[\${largest}]=\${arr[largest]}) -> \${arr[largest]} yukarı süzüldü.\`);
    }
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, trace);
  }
}

function buildMaxHeap(arr: number[], trace?: string[]): number[] {
  const n = arr.length;
  if (trace) trace.push(\`Yığın oluşturma başladı. Baş yaprak dışı indeks: \${Math.floor(n / 2) - 1}\`);
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (trace) trace.push(\`Indeks \${i} (\${arr[i]}) için aşağı süzme:\`);
    heapify(arr, n, i, trace);
  }
  return arr;
}`,
    python: `def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
        
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def build_max_heap(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    return arr`
  },
  demo: {
    kind: 'heap-operations',
    title: 'Yığın İşlemleri Demo',
    description: 'Yığına dönüştürülecek sayıları virgülle ayırarak girin. Örnek: 4, 10, 3, 5, 1, 15, 7, 12',
    placeholder: '4, 10, 3, 5, 1, 15, 7, 12'
  },
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(1) in-place veya O(log n) rekürsif çağrı yığını',
  analysisTitle: 'Neden O(n) Zamanında Çalışır?',
  analysisPoints: [
    'Her düğüm için maksimum süzülme mesafesi o düğümün yüksekliği ile orantılıdır.',
    'Ağacın alt seviyelerinde çok sayıda düğüm vardır ancak bunların süzülme yüksekliği çok azdır (örn. yaprakların yüksekliği 0).',
    'Ağacın yukarısındaki düğümlerin yüksekliği fazladır ancak sayıları çok azdır (örn. sadece 1 kök vardır).',
    'Matematiksel toplam serisi (sum of height * nodes-at-height) çözüldüğünde limit O(n) doğrusal değerine yakınsar.'
  ],
  advantages: [
    'Ekstra bellek kullanmadan (in-place) bir diziyi yığına dönüştürür.',
    'Öncelikli kuyruk ilklendirmelerinde O(n log n) yerine O(n) zaman avantajı sağlar.'
  ],
  disadvantages: [
    'Doğrusal bellek sıralamasına göre önbellek dostu (cache locality) değildir (çocuklara erişmek için indeks çarpımları yapıldığından hafıza atlamaları olur).'
  ],
  relatedAlgorithms: [
    {
      title: 'Heap Sort',
      description: 'Max-Heap yapısını kullanarak diziyi sıralayan algoritma.',
      href: '/algorithms/sorting/heap-sort'
    }
  ]
};

export const unionFindContent: RemainingAlgorithmContent = {
  title: 'Ayrık Küme (Disjoint-Set / Union-Find)',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Disjoint-Set / Forests',
  difficulty: 'Orta',
  sources: ['DAA Notes', 'Sedgewick'],
  summary: 'Küme elemanlarının birbirleriyle olan bağlantılarını yöneten, ağırlık dengeleme ve yol yassılaştırma (Path Compression) ile neredeyse sabit zamanda birleştirme/sorgulama sunan veri yapısıdır.',
  descriptionParagraphs: [
    'Ayrık Küme (Disjoint-Set) veya Union-Find, bir grup elemanın birbiriyle çakışmayan alt kümelere ayrılmasını ve bu kümelerin birleştirilmesini yöneten son derece verimli bir veri yapısıdır. İki temel operasyonu vardır: `Union` (iki kümeyi birleştirir) ve `Find` (bir elemanın hangi kümeye ait olduğunu belirler).',
    'Basit Union-Find yapısı ağaç yüksekliğini dengelemediği için en kötü durumda doğrusal O(n) zincir yapısına dönüşebilir. Bu problemi çözmek için iki ana dengeleme tekniği kullanılır: Ağırlık Dengeli (Weight Balancing / Union by Size) küçük ağacı büyük ağacın altına bağlar. Yükseklik Dengeli (Height Balancing / Union by Rank) ise derinliği az olan ağacı derinliği fazla olan ağacın altına bağlar.',
    'Yassılaştırıcı Bulma (Collapsing Find / Path Compression), `Find` operasyonu sırasında uğranan tüm düğümleri doğrudan kök düğüme bağlayarak ağacı tamamen düzleştirir. Bu iki optimizasyon birlikte kullanıldığında, operasyon başına çalışma süresi pratikte sabit zaman olan Ackermann fonksiyonunun tersi α(n) değerine iner.'
  ],
  sourceNotes: [
    'DAA Notes: Weight balancing keeps trees balanced. Path compression flattens the path recursively during find.',
    'Sedgewick: Weighted quick-union with path compression guarantees almost O(1) time per operation.'
  ],
  steps: [
    'İlklendirme: Her elemanın ebeveynini kendisi olarak ayarla (parent[i] = i) ve ağırlık/rütbe dizisini 1 yap.',
    'Find(i): i düğümünden başlayarak ebeveyn işaretçilerini takip ederek kök düğümü bul.',
    'Yol Yassılaştırma: Geçilen tüm düğümlerin ebeveynini doğrudan bulduğun kök düğüme eşle.',
    'Union(i, j): i ve j\'nin köklerini bul. Kökler farklıysa, ağırlığı/rütbesi küçük olan kökün ebeveynini büyük olan kök yap.'
  ],
  pseudocode: `MAKE-SET(x)
  parent[x] <- x
  rank[x] <- 0

FIND(x)
  if parent[x] != x
    parent[x] <- FIND(parent[x])   // Path compression
  return parent[x]

UNION(x, y)
  rootX <- FIND(x)
  rootY <- FIND(y)
  if rootX != rootY
    if rank[rootX] < rank[rootY]
      parent[rootX] <- rootY
    else if rank[rootX] > rank[rootY]
      parent[rootY] <- rootX
    else
      parent[rootY] <- rootX
      rank[rootX] <- rank[rootX] + 1`,
  codeExamples: {
    typescript: `class DisjointSet {
  parent: number[];
  rank: number[];

  constructor(size: number) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(i: number, trace?: string[]): number {
    if (this.parent[i] === i) return i;
    
    const root = this.find(this.parent[i], trace);
    if (this.parent[i] !== root) {
      if (trace) {
        trace.push(\`  [Yol Yassılaştırma] Düğüm \${i} ebeveyni güncellendi: \${this.parent[i]} -> \${root}\`);
      }
      this.parent[i] = root; // Path compression
    }
    return root;
  }

  union(i: number, j: number, trace?: string[]): boolean {
    const rootX = this.find(i, trace);
    const rootY = this.find(j, trace);

    if (rootX === rootY) {
      if (trace) trace.push(\`\${i} ve \${j} zaten aynı kümede (Kök: \${rootX}).\`);
      return false;
    }

    if (trace) {
      trace.push(\`Birleştiriliyor: Kök \${rootX} (Rütbe: \${this.rank[rootX]}) ve Kök \${rootY} (Rütbe: \${this.rank[rootY]})\`);
    }

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
      if (trace) trace.push(\`  Kök \${rootX} -> Kök \${rootY} altına bağlandı.\`);
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
      if (trace) trace.push(\`  Kök \${rootY} -> Kök \${rootX} altına bağlandı.\`);
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
      if (trace) trace.push(\`  Rütbeler eşit. Kök \${rootY} -> Kök \${rootX} altına bağlandı, rütbe \${this.rank[rootX]} yapıldı.\`);
    }
    return true;
  }
}`,
    python: `class DisjointSet:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size
        
    def find(self, i):
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(this.parent[i])
        return self.parent[i]
        
    def union(self, i, j):
        root_x = self.find(i)
        root_y = self.find(j)
        if root_x != root_y:
            if self.rank[root_x] < self.rank[root_y]:
                self.parent[root_x] = root_y
            elif self.rank[root_x] > self.rank[root_y]:
                self.parent[root_y] = root_x
            else:
                self.parent[root_y] = root_x
                self.rank[root_x] += 1
            return True
        return False`
  },
  demo: {
    kind: 'union-find',
    title: 'Ayrık Küme (Union-Find) Demo',
    description: 'Küme boyutu ve birleştirme/bulma işlemlerini girin (U x y: Birleştir, F x: Bul). Örnek: 5; U 0 1, U 2 3, U 1 2, F 0',
    placeholder: '5; U 0 1, U 2 3, U 1 2, F 0'
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(α(n))',
    worst: 'O(α(n))'
  },
  spaceComplexity: 'O(n) parent ve rank dizileri',
  analysisTitle: 'Ackermann Fonksiyonunun Tersi α(n)',
  analysisPoints: [
    'α(n), Ackermann fonksiyonunun tersidir ve son derece yavaş büyüyen bir fonksiyondur.',
    'Evrendeki atom sayısı gibi devasa n değerleri için bile α(n) değeri 5\'i geçemez.',
    'Bu nedenle dengeli ve yassılaştırılmış Union-Find işlemlerinin karmaşıklığı pratikte sabit zaman O(1) olarak kabul edilir.'
  ],
  advantages: [
    'Graf algoritmalarında (örn. Kruskal Minimum Spanning Tree) çevrim tespiti için son derece hızlıdır.',
    'Bellek kullanımı son derece düşüktür (sadece iki tamsayı dizisi).'
  ],
  disadvantages: [
    'Birleştirilen kümelerin bölünmesi (split/undo) işlemi varsayılan olarak desteklenmez (ekstra yığın/geçmiş verisi gerekir).'
  ],
  relatedAlgorithms: [
    {
      title: "Kruskal's Algorithm",
      description: 'MST oluştururken kenar döngüsü kontrolünde Union-Find kullanır.',
      href: '/algorithms/graph-algorithms/kruskal'
    }
  ]
};

export const setOperationsContent: RemainingAlgorithmContent = {
  title: 'Küme İşlemleri ve MFSET (Set Operations & MFSET)',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Set Theory / Equivalence',
  difficulty: 'Kolay',
  sources: ['Aho'],
  summary: 'Matematiksel kümeler üzerinde Birleşim (Union), Kesişim (Intersection), Birleştirme (MERGE) ve Bölme (SPLIT) işlemlerini kapsayan veri yapıları şemasıdır.',
  descriptionParagraphs: [
    'Küme İşlemleri, bilgisayar bilimlerinde soyut veri türü olarak kümelerin (set) verimli şekilde saklanmasını ve bu kümeler üzerindeki ilişkilerin hesaplanmasını sağlar. Aho kaynağında bu yapılar detaylı olarak incelenmiştir.',
    'MFSET (Merge-Find Set), aralarında eşdeğerlik ilişkisi (equivalence relation) olan eleman gruplarını dinamik olarak birleştiren ve sorgulayan yapıyı tanımlar. Union-Find veri yapısı bu ADT\'nin en yaygın gerçekleşmesidir.',
    'MERGE ve SPLIT set algoritmaları, sıralı kümeler üzerinde çalışır. MERGE, iki sıralı kümeyi birleştirip tek bir sıralı küme yaparken; SPLIT, bir kümeyi belirtilen bir sınır değerine göre o değerden küçükler ve büyükler olarak iki ayrı kümeye böler. Set Union ve Intersection ise sırasıyla küme birleşimi ve kesişimi işlemlerini gerçekleştirir.'
  ],
  sourceNotes: [
    'Aho: MFSET is a merge-find set abstract data type representing disjoint sets.',
    'Aho: MERGE and SPLIT partition or combine ordered sets, frequently using search trees for logarithmic bounds.'
  ],
  steps: [
    'Set Union için: A ve B kümelerini al. İki kümedeki benzersiz elemanları bir araya getirerek yeni bir küme oluştur.',
    'Set Intersection için: İki kümede de ortak olan elemanları bulup yeni bir kümeye ekle.',
    'SPLIT için: Bir S kümesi ve pivot x değeri al. Kümeyi dolaş, x\'ten küçük elemanları S1\'e, büyükleri S2\'ye yerleştir.'
  ],
  pseudocode: `SET-UNION(A, B)
  Result <- EmptySet
  for each x in A
    INSERT(Result, x)
  for each y in B
    INSERT(Result, y)
  return Result

SET-INTERSECTION(A, B)
  Result <- EmptySet
  for each x in A
    if MEMBER(B, x)
      INSERT(Result, x)
  return Result`,
  codeExamples: {
    typescript: `function setUnion<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>(setA);
  for (const item of setB) {
    result.add(item);
  }
  return result;
}

function setIntersection<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  const result = new Set<T>();
  for (const item of setA) {
    if (setB.has(item)) {
      result.add(item);
    }
  }
  return result;
}

function setSplit(setS: Set<number>, pivot: number): [Set<number>, Set<number>] {
  const set1 = new Set<number>();
  const set2 = new Set<number>();
  for (const val of setS) {
    if (val < pivot) {
      set1.add(val);
    } else if (val > pivot) {
      set2.add(val);
    }
  }
  return [set1, set2];
}`,
    python: `def set_union(set_a, set_b):
    return set_a.union(set_b)

def set_intersection(set_a, set_b):
    return set_a.intersection(set_b)

def set_split(set_s, pivot):
    set1 = {x for x in set_s if x < pivot}
    set2 = {x for x in set_s if x > pivot}
    return set1, set2`
  },
  demo: {
    kind: 'set-operations',
    title: 'Küme İşlemleri ve MFSET Demo',
    description: 'İki kümeyi virgülle ayırarak girin (Kümeleri ; ile ayırın). Örnek: 1, 2, 3; 3, 4, 5',
    placeholder: '1, 2, 3; 3, 4, 5'
  },
  timeComplexity: {
    best: 'O(n + m)',
    average: 'O(n + m)',
    worst: 'O(n + m)'
  },
  spaceComplexity: 'O(n + m) sonuç kümesi için',
  analysisTitle: 'Ağaçlar Üzerinde MERGE ve SPLIT',
  analysisPoints: [
    'Eğer kümeler sıralı diziler olarak saklanıyorsa, Birleşim ve Kesişim iki-imleçli (two-pointer) tarama ile O(n + m) zamanda yapılabilir.',
    'Kümeler dengeli arama ağaçları (örn. AVL, Red-Black) ile ifade ediliyorsa, SPLIT ve MERGE işlemleri ağaçların kökten bölünmesi veya birleştirilmesi şeklinde O(log n) gibi logaritmik sürelerde tamamlanabilir.',
    'Bu durum veri tabanı sorgu optimizasyonlarında sıklıkla tercih edilir.'
  ],
  advantages: [
    'Veri gruplarını matematiksel küme kuralları altında doğrulamayı ve işlemeyi kolaylaştırır.',
    'Unique (benzersiz) eleman kontrolü sağlar.'
  ],
  disadvantages: [
    'Büyük veri kümelerinde indeksleme olmadan yapıldığında yüksek karşılaştırma maliyetleri doğurabilir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Ayrık Küme (Union-Find)',
      description: 'Ayrık alt kümelerin birleştirilmesi için optimize edilmiş veri yapısı.',
      href: '/algorithms/data-structures/union-find'
    }
  ]
};
