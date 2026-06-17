import type { RemainingAlgorithmContent } from './types';

export const searchTechniquesContent: RemainingAlgorithmContent = {
  title: 'Arama Teknikleri (Search Techniques)',
  category: 'Arama Algoritmaları',
  categoryHref: '/algorithms/searching',
  family: 'Searching / Optimization',
  difficulty: 'Orta',
  sources: ['DSA', 'Sedgewick'],
  summary: 'Arama performansını optimize etmek amacıyla erişim sıklıklarına göre öğe düzenini dinamik olarak değiştiren veya tahmini konuma doğrudan atlayan tekniklerdir.',
  descriptionParagraphs: [
    'Arama Teknikleri, standart doğrusal ve ikili arama yöntemlerini daha verimli kılmak amacıyla geliştirilmiş optimize arama şemalarıdır. Bu başlık altında özellikle üç temel yöntem incelenir.',
    'Olasılıksal Arama (Probability Search), sık aranan elemanları listenin başına yakın tutarak doğrusal aramanın ortalama adım sayısını azaltır. Kendini Düzenleyen Arama (Self-Organizing Search) ise benzer mantıkla, aranan elemanı doğrudan en başa taşıyan "Move-To-Front" (MTF) veya bir önceki elemanla yer değiştiren "Transpose" tekniklerini kullanır.',
    'İnterpolasyon Araması (Interpolation Search), sıralı ve yaklaşık düzgün dağılıma sahip dizilerde hedef değere göre bir tahmin indeksi hesaplayarak doğrudan hedefe en yakın noktaya atlar. Bu yönüyle ikili aramadan daha hızlı, O(log log n) zamanda çalışabilir.'
  ],
  sourceNotes: [
    'DSA: Probability search counts accesses or dynamically moves matching records to the front.',
    'Sedgewick: Interpolation search calculates the index using linear interpolation formula: low + (high - low) * (key - A[low]) / (A[high] - A[low]).'
  ],
  steps: [
    'İnterpolasyon Araması için: low ve high sınırlarını belirle.',
    'Hedef değer ile sınırlar arasındaki mesafeye göre interpolasyon formülüyle tahmini bir `mid` indeksi hesapla.',
    'Eğer `mid` değerindeki eleman hedefe eşitse indeksi döndür; aksi halde sınırları güncelle ve tekrarla.',
    'Kendini Düzenleyen Arama için: Elemanı bulduğunda MTF stratejisine göre doğrudan indeksi 0\'a taşı veya Transpose stratejisine göre i. elemanı i-1. elemanla swap et.'
  ],
  pseudocode: `INTERPOLATION-SEARCH(A, target)
  low <- 0
  high <- length(A) - 1
  while A[low] <= target and target <= A[high] and A[low] != A[high]
    pos <- low + floor((high - low) * (target - A[low]) / (A[high] - A[low]))
    if A[pos] = target
      return pos
    if A[pos] < target
      low <- pos + 1
    else
      high <- pos - 1
  if A[low] = target
    return low
  return -1`,
  codeExamples: {
    typescript: `function interpolationSearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (arr[low] <= target && target <= arr[high] && arr[low] !== arr[high]) {
    const pos = low + Math.floor(
      ((high - low) * (target - arr[low])) / (arr[high] - arr[low])
    );

    if (arr[pos] === target) return pos;
    if (arr[pos] < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  if (arr[low] === target) return low;
  return -1;
}

function selfOrganizingSearchMoveToFront<T>(arr: T[], target: T): number {
  const idx = arr.indexOf(target);
  if (idx > 0) {
    // Bulunan elemanı en başa (index 0) taşı
    const item = arr.splice(idx, 1)[0];
    arr.unshift(item);
    return 0;
  }
  return idx;
}`,
    python: `def interpolation_search(arr, target):
    low = 0
    high = len(arr) - 1
    while arr[low] <= target and target <= arr[high] and arr[low] != arr[high]:
        pos = low + int(((high - low) * (target - arr[low])) / (arr[high] - arr[low]))
        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    if arr[low] == target:
        return low
    return -1`
  },
  demo: {
    kind: 'search-techniques',
    title: 'Arama Teknikleri Demo',
    description: 'Sıralı dizi elemanlarını ve aranacak hedefi girin. Örnek: 10,20,30,40,50,60,70,80; 60',
    placeholder: '10,20,30,40,50,60,70,80; 60'
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log log n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(1)',
  analysisTitle: 'Doğrusal Dağılım Hassasiyeti',
  analysisPoints: [
    'İnterpolasyon araması, verilerin aralığa düzgün dağıldığı durumlarda O(log log n) gibi son derece yüksek bir performans sunar (Örn: 10 milyon eleman için ortalama 3-4 karşılaştırma).',
    'Ancak veriler üstel (exponential) veya yoğun şekilde dengesiz dağılmışsa, formülün hesapladığı pozisyonlar sürekli kenarlarda kalır ve algoritma O(n) doğrusal arama hızına yavaşlar.',
    'Buna karşılık Kendini Düzenleyen Arama (Self-Organizing Search) amortize edilmiş zaman kazanımı sağlar.'
  ],
  advantages: [
    'Düzgün dağılımlı büyük dizilerde ikili aramadan (Binary Search) daha hızlıdır.',
    'Self-Organizing varyantları, veri modellerinin zaman içindeki "lokallik" (locality) özelliğinden faydalanarak dinamik optimizasyon yapar.'
  ],
  disadvantages: [
    'İnterpolasyon araması karmaşık aritmetik işlemler (çarpma/bölme) gerektirir.',
    'Sadece sıralı dizilere uygulanabilir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Binary Search',
      description: 'Sıralı dizilerde tahmine dayanmadan doğrudan ortadan bölerek arama yapar.',
      href: '/algorithms/searching/binary-search'
    },
    {
      title: 'Linear Search',
      description: 'Sıralanmamış veriler için standart sequential arama.',
      href: '/algorithms/searching/linear-search'
    }
  ]
};

export const searchTreesContent: RemainingAlgorithmContent = {
  title: 'Ağaçlar ve Arama Ağaçları (Trees & Search Trees)',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Trees / Self-balancing',
  difficulty: 'Zor',
  sources: ['Sedgewick', 'Aho'],
  summary: 'Hızlı arama, ekleme ve silme işlemleri sunan, dengeli ağaçlar (Red-Black, 2-3) ve bit tabanlı dijital indeksleme yapılarını (Patricia) kapsar.',
  descriptionParagraphs: [
    'Dengeli arama ağaçları, standart İkili Arama Ağacının (BST) en kötü durumda zincir listeye dönüşüp O(n) performansına gerilemesini önlemek amacıyla geliştirilmiş veri yapılarıdır.',
    'Kırmızı-Siyah Ağaç (Red-Black Tree), her düğümü kırmızı veya siyah olarak etiketleyip belirli kurallar altında (örn. ardışık kırmızı düğüm olmaması) rotasyonlar ve renk değişimleri ile dengeyi O(log n) seviyesinde korur. 2-3 ve 2-3-4 Ağaçları ise tek bir düğümde birden fazla anahtar barındırarak yukarıdan aşağıya (top-down) bölünmelerle genişler.',
    'Dijital Arama Ağaçları (Digital Search Trees) ve Patricia Ağacı (Patricia Tree), anahtarların doğrudan karşılaştırılması yerine, bitlerinin soldan sağa taranarak sol/sağ alt dallara yönlenmesini sağlayan, string ve sayı arama işlemlerinde son derece hızlı ve bellek verimli olan trie-tabanlı yapılardır.'
  ],
  sourceNotes: [
    'Sedgewick: Red-black tree is a representation of 2-3-4 tree where red links represent 3-nodes and 4-nodes internal connections.',
    'Aho: 2-3 trees support dictionary operations in O(log n) worst-case time by splitting/merging nodes on insertion/deletion.'
  ],
  steps: [
    'Ağaca eleman eklerken standart BST kurallarına göre yaprağa kadar in.',
    'Kırmızı-Siyah Ağaç için: Yeni eklenen düğümü kırmızı yap. Eğer ebeveyni de kırmızı ise kuralları ihlal etmiştir. Renk değiştirme (recolor) veya rotasyon (rotation - sol/sağ) uygulayarak ağacı dengele.',
    '2-3 Ağacı için: Yaprak düğüme ekleme yap. Eğer düğümde 3 anahtar birikirse (overflow), ortanca anahtarı yukarı (ebeveyne) göndererek düğümü ikiye böl. Bu işlemi gerekirse köke kadar tekrarlayarak ağaç yüksekliğini artır.'
  ],
  pseudocode: `LEFT-ROTATE(T, x)
  y <- x.right
  x.right <- y.left
  if y.left != T.nil
    y.left.p <- x
  y.p <- x.p
  if x.p = T.nil
    T.root <- y
  else if x = x.p.left
    x.p.left <- y
  else
    x.p.right <- y
  y.left <- x
  x.p <- y`,
  codeExamples: {
    typescript: `class RBTNode {
  val: number;
  color: 'RED' | 'BLACK';
  left: RBTNode | null = null;
  right: RBTNode | null = null;
  constructor(val: number) {
    this.val = val;
    this.color = 'RED';
  }
}

class RedBlackTree {
  root: RBTNode | null = null;

  insert(val: number, trace: string[]) {
    trace.push(\`\${val} ağaca ekleniyor.\`);
    this.root = this.insertRec(this.root, val, trace);
    this.root.color = 'BLACK'; // Kök her zaman siyahtır
  }

  private insertRec(node: RBTNode | null, val: number, trace: string[]): RBTNode {
    if (node === null) return new RBTNode(val);

    if (val < node.val) {
      node.left = this.insertRec(node.left, val, trace);
    } else if (val > node.val) {
      node.right = this.insertRec(node.right, val, trace);
    }

    // Dengelenme kuralları simülasyonu
    if (this.isRed(node.right) && !this.isRed(node.left)) {
      trace.push(\`Sola rotasyon yapılıyor: Node \${node.val}\`);
      node = this.rotateLeft(node);
    }
    if (this.isRed(node.left) && this.isRed(node.left?.left)) {
      trace.push(\`Sağa rotasyon yapılıyor: Node \${node.val}\`);
      node = this.rotateRight(node);
    }
    if (this.isRed(node.left) && this.isRed(node.right)) {
      trace.push(\`Renk değişimi yapılıyor: Node \${node.val}\`);
      this.flipColors(node);
    }

    return node;
  }

  private isRed(node: RBTNode | null): boolean {
    return node !== null && node.color === 'RED';
  }

  private rotateLeft(h: RBTNode): RBTNode {
    const x = h.right!;
    h.right = x.left;
    x.left = h;
    x.color = h.color;
    h.color = 'RED';
    return x;
  }

  private rotateRight(h: RBTNode): RBTNode {
    const x = h.left!;
    h.left = x.right;
    x.right = h;
    x.color = h.color;
    h.color = 'RED';
    return x;
  }

  private flipColors(h: RBTNode) {
    h.color = 'RED';
    if (h.left) h.left.color = 'BLACK';
    if (h.right) h.right.color = 'BLACK';
  }
}`,
    python: `class RBTNode:
    def __init__(self, val):
        self.val = val
        self.color = 'RED'
        self.left = None
        self.right = None

class RedBlackTree:
    def __init__(self):
        self.root = None
        
    def insert(self, val):
        self.root = self._insert(self.root, val)
        self.root.color = 'BLACK'
        
    def _insert(self, node, val):
        if not node:
            return RBTNode(val)
        if val < node.val:
            node.left = self._insert(node.left, val)
        elif val > node.val:
            node.right = self._insert(node.right, val)
            
        if self._is_red(node.right) and not self._is_red(node.left):
            node = self._rotate_left(node)
        if self._is_red(node.left) and self._is_red(node.left.left):
            node = self._rotate_right(node)
        if self._is_red(node.left) and self._is_red(node.right):
            self._flip_colors(node)
        return node`
  },
  demo: {
    kind: 'search-trees',
    title: 'Arama Ağaçları Demo',
    description: 'Kırmızı-Siyah Ağaca sırayla eklenecek tam sayıları virgülle ayırarak girin. Örnek: 10,20,30,15,25',
    placeholder: '10,20,30,15,25'
  },
  timeComplexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(log n)'
  },
  spaceComplexity: 'O(n)',
  analysisTitle: 'Rotasyon ve Balans Limitleri',
  analysisPoints: [
    'Kırmızı-Siyah ağaçlarda kökten herhangi bir yaprağa giden en uzun yol, en kısa yolun en fazla iki katı uzunluğunda olabilir.',
    'Ağacın dengede kalması, her eklemede (veya silmede) en fazla O(1) sayıda rotasyon işlemi yapılarak sağlanır.',
    'Patricia ağaçlarında ise arama performansı ağaçtaki toplam eleman sayısına değil, doğrudan aranan anahtarın bit uzunluğuna (k) bağlıdır (O(k)).'
  ],
  advantages: [
    'Arama, ekleme ve silme işlemlerinde en kötü durumda da O(log n) zamanını garanti eder.',
    'İkili arama ağaçlarına göre çok daha kararlı ve performanslıdır.'
  ],
  disadvantages: [
    'Düğüm başına renk etiketi veya çoklu pointer saklandığı için ek bellek tüketir.',
    'İmplementasyonu (rotasyon ve durum kontrolleri) oldukça karmaşıktır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Binary Search Tree',
      description: 'Dengeleme mekanizması bulunmayan temel ikili arama ağacı.',
      href: '/algorithms/data-structures/binary-search-tree'
    },
    {
      title: 'Trie',
      description: 'Bit veya karakter eşleme kullanan prefix ağacı.',
      href: '/algorithms/data-structures/trie'
    }
  ]
};

export const externalSearchingHashingContent: RemainingAlgorithmContent = {
  title: 'Harici Arama ve Hashing (External Searching & Hashing)',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Hashing / External',
  difficulty: 'Zor',
  sources: ['Sedgewick'],
  summary: 'Ana belleğe sığmayan çok büyük veri dosyalarında disk bloklarına erişimi minimumda tutmak için kullanılan dizin tabanlı ISAM ve dinamik kova bölünmeli Extendible Hashing yöntemleridir.',
  descriptionParagraphs: [
    'Harici Arama ve Hashing yöntemleri, disk tabanlı veritabanlarında ve dosya sistemlerinde verileri organize edip hızlıca sorgulamak amacıyla kullanılır. RAM\'e sığmayan verilerde ana maliyet disk okuma/yazma kafasının hareketidir.',
    'Dizinli Sıralı Erişim (ISAM - Indexed Sequential Access Method), verileri diskte sıralı bloklar halinde tutar ve üst seviyede statik bir indeks tablosu oluşturarak aramaları ilgili bloğa yönlendirir.',
    'Genişletilebilir Hashing (Extendible Hashing), verileri dinamik boyutlu kovalarda (buckets) saklar ve bir dizin tablosu (directory) kullanır. Bir kova dolduğunda, tüm hash tablosunun yeniden boyutlandırılması yerine sadece o kova ikiye bölünür ve dizin derinliği (global depth) 1 artırılarak dizin boyutu ikiye katlanır. Bu sayede her kayda en fazla 1 veya 2 disk erişimiyle ulaşılması garanti edilir.'
  ],
  sourceNotes: [
    'Sedgewick: ISAM uses index blocks to search keys sequentially but falls back to overflow areas on inserts.',
    'Sedgewick: Extendible hashing uses a directory of pointers to buckets. Directory size is 2^d (global depth).'
  ],
  steps: [
    'Extendible Hashing için: Başlangıçta global depth=1 ve local depth=1 olan boş kovalar oluştur.',
    'Yeni bir anahtarı eklerken anahtarın hash değerinin ilk d bitine (global depth) bakarak dizinden ilgili kova adresini bul.',
    'Eğer kova kapasitesi aşılmadıysa elemanı kovaya ekle.',
    'Eğer kova doluysa: Kovayı böl (local depth 1 artar). Eğer local depth > global depth olursa, global depth\'i 1 artırıp dizin boyutunu 2 katına çıkar. Kovadaki elemanları hash bitlerine göre iki yeni kovaya dağıt.'
  ],
  pseudocode: `EXTENDIBLE-HASH-INSERT(directory, key, value)
  h <- HASH(key)
  bucket <- directory[index-from-bits(h, directory.depth)]
  if bucket is not full
    INSERT-INTO-BUCKET(bucket, key, value)
  else
    if bucket.local_depth = directory.depth
      DOUBLE-DIRECTORY(directory)
    SPLIT-BUCKET(bucket)
    EXTENDIBLE-HASH-INSERT(directory, key, value)`,
  codeExamples: {
    typescript: `class ExtendibleBucket {
  localDepth: number = 1;
  keys: number[] = [];
  capacity: number;
  constructor(capacity: number) {
    this.capacity = capacity;
  }
}

class ExtendibleHashingSimulator {
  globalDepth: number = 1;
  directory: ExtendibleBucket[];
  bucketCapacity: number;

  constructor(capacity: number) {
    this.bucketCapacity = capacity;
    this.directory = [
      new ExtendibleBucket(capacity), // 0
      new ExtendibleBucket(capacity)  // 1
    ];
  }

  insert(key: number, trace: string[]) {
    const hashBits = key % 32; // Simüle hash
    let idx = hashBits & ((1 << this.globalDepth) - 1);
    let bucket = this.directory[idx];

    trace.push(\`\${key} ekleniyor (Hash bitleri: \${hashBits.toString(2)}). Hedef Kova indeksi: \${idx}\`);

    if (bucket.keys.length < this.bucketCapacity) {
      bucket.keys.push(key);
      trace.push(\`Kova dolmadığı için eleman eklendi. Kova içeriği: [\${bucket.keys.join(', ')}]\`);
      return;
    }

    // Kova Dolu, Bölünme gerek
    trace.push(\`Kova dolu! Kova bölünmesi başlatılıyor (Local depth: \${bucket.localDepth}, Global depth: \${this.globalDepth})\`);

    if (bucket.localDepth === this.globalDepth) {
      // Dizin genişletme
      trace.push(\`Local depth === Global depth olduğundan dizin ikiye katlanıyor.\`);
      const oldSize = this.directory.length;
      for (let i = 0; i < oldSize; i++) {
        this.directory.push(this.directory[i]);
      }
      this.globalDepth++;
    }

    // Yeni kova oluştur
    const newBucket = new ExtendibleBucket(this.bucketCapacity);
    bucket.localDepth++;
    newBucket.localDepth = bucket.localDepth;

    // Elemanları yeniden dağıt
    const allKeys = [...bucket.keys, key];
    bucket.keys = [];

    const mask = 1 << (bucket.localDepth - 1);
    const dIdx = hashBits & ((1 << this.globalDepth) - 1);

    // Dizin göstergelerini güncelle
    const dirSize = this.directory.length;
    for (let i = 0; i < dirSize; i++) {
      if (this.directory[i] === bucket) {
        if ((i & mask) !== 0) {
          this.directory[i] = newBucket;
        }
      }
    }

    // Dağıt
    for (const k of allKeys) {
      const kHash = k % 32;
      const kIdx = kHash & ((1 << this.globalDepth) - 1);
      this.directory[kIdx].keys.push(k);
    }

    trace.push(\`Yeniden dağıtım tamamlandı. Global Depth: \${this.globalDepth}\`);
  }
}`,
    python: `class Bucket:
    def __init__(self, capacity):
        self.capacity = capacity
        self.local_depth = 1
        self.keys = []

class ExtendibleHashing:
    def __init__(self, capacity):
        self.capacity = capacity
        self.global_depth = 1
        self.directory = [Bucket(capacity), Bucket(capacity)]
        
    def insert(self, key):
        hash_val = key % 32
        idx = hash_val & ((1 << self.global_depth) - 1)
        bucket = self.directory[idx]
        
        if len(bucket.keys) < self.capacity:
            bucket.keys.append(key)
            return
            
        if bucket.local_depth == self.global_depth:
            self.directory.extend(self.directory)
            self.global_depth += 1
            
        new_bucket = Bucket(self.capacity)
        bucket.local_depth += 1
        new_bucket.local_depth = bucket.local_depth
        
        all_keys = bucket.keys + [key]
        bucket.keys = []
        
        mask = 1 << (bucket.local_depth - 1)
        for i in range(len(self.directory)):
            if self.directory[i] is bucket and (i & mask) != 0:
                self.directory[i] = new_bucket
                
        for k in all_keys:
            k_hash = k % 32
            k_idx = k_hash & ((1 << self.global_depth) - 1)
            self.directory[k_idx].keys.append(k)`
  },
  demo: {
    kind: 'external-searching-hashing',
    title: 'Harici Arama ve Hashing Demo',
    description: 'Kova kapasitesini ve eklenecek anahtarları noktalı virgülle ayırarak girin. Örnek: 2; 4, 7, 24, 16, 10, 15',
    placeholder: '2; 4, 7, 24, 16, 10, 15'
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(1)',
    worst: 'O(1) disk erişimi'
  },
  spaceComplexity: 'O(n) kova ve dizin tablosu',
  analysisTitle: 'Kova Bölünmesi ve Dizin Katlanması',
  analysisPoints: [
    'Extendible hashing, tüm veri setini yeniden hash etmek yerine sadece ilgili dolan kova (bucket) seviyesinde yerel bir bölünme yapar.',
    'Dizin katlanması (directory doubling) sadece local depth global depth\'e eşit olduğunda gerçekleşir ve dizin pointer dizisidir, asıl veri disktedir.',
    'Arama işlemleri dizin tablosu üzerinden doğrudan kova adresine gidildiği için tek bir disk okuma adımında tamamlanır.'
  ],
  advantages: [
    'Tablo doldukça arama performansı yavaşlamaz (statik hash tablolarının aksine).',
    'Yeniden yapılandırma maliyeti yerel seviyededir, tüm disk veri kümesi kilitlenmez.'
  ],
  disadvantages: [
    'Dizin tablosu (directory) üstel olarak büyür (2^d), bu da dizinin kendisinin RAM sınırlarını zorlamasına yol açabilir.',
    'ISAM statik olduğundan sıralı veri taramalarında daha verimlidir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Hash Table',
      description: 'Klasik bellek içi hash tablosu ve çakışma çözümleme yöntemleri.',
      href: '/algorithms/data-structures/hash-table'
    }
  ]
};

export const openAddressingHashingContent: RemainingAlgorithmContent = {
  title: 'Açık Adreslemeli Hashing (Open Addressing Hashing)',
  category: 'Veri Yapıları',
  categoryHref: '/algorithms/data-structures',
  family: 'Hashing / Collisions',
  difficulty: 'Orta',
  sources: ['Sedgewick'],
  summary: 'Bağlı listeler kullanmadan çakışmaları çözmek için boş hücreleri doğrusal sonda (Linear Probing) veya ikincil hash adımlarıyla (Double Hashing) tarayan yöntemdir.',
  descriptionParagraphs: [
    'Açık Adreslemeli Hashing (Open Addressing), hash tablolarında çakışmaları çözmek için harici bağlı listeler (chaining) kullanmak yerine, tüm elemanları tablonun kendi hücrelerinde saklar.',
    'Çakışma anında boş bir yer bulana kadar tablodaki diğer indeksler taranır. Doğrusal Sonda (Linear Probing), çakışma indeksinden başlayarak sırayla birer birer ilerler (`index = (hash + i) % size`). Ancak bu yöntem ardışık dolu hücrelerden oluşan "birincil kümelenme" (primary clustering) sorununa yol açar.',
    'Çift Hashing (Double Hashing) ise bu sorunu çözmek için adımlama boyutunu ikinci bir bağımsız hash fonksiyonuyla hesaplar (`index = (hash1 + i * hash2) % size`). Böylece her anahtar için farklı bir tarama sırası oluşur ve kümelenme önlenir.'
  ],
  sourceNotes: [
    'Sedgewick: Linear probing is highly efficient when the table load factor is below 0.5.',
    'Sedgewick: Double hashing completely eliminates primary and secondary clustering by hashing the probe increment.'
  ],
  steps: [
    'Eklenecek anahtarın birincil hash değerini (`h1 = key % size`) hesapla.',
    'Eğer hedef indeks boşsa anahtarı oraya yerleştir.',
    'Eğer indeks doluysa (çakışma):',
    'Linear Probing için: Adım adım bir sonraki indeksi (`(idx + 1) % size`) kontrol et.',
    'Double Hashing için: İkincil hash değerini (`h2 = 1 + (key % (size - 1))`) hesapla. Boş hücre bulana kadar `(h1 + i * h2) % size` formülüyle adımla.',
    'Boş hücre bulduğunda anahtarı yerleştir.'
  ],
  pseudocode: `HASH-INSERT(T, key)
  i <- 0
  repeat
    q <- PROBE(key, i)
    if T[q] = NIL
      T[q] <- key
      return q
    else
      i <- i + 1
  until i = T.size
  error "hash table overflow"`,
  codeExamples: {
    typescript: `class OpenAddressingHashTable {
  size: number;
  table: (number | null)[];

  constructor(size: number) {
    this.size = size;
    this.table = Array(size).fill(null);
  }

  insertLinearProbing(key: number, trace: string[]) {
    let i = 0;
    const h = key % this.size;
    trace.push(\`Linear Probing: \${key} ekleniyor. İlk hash indeksi: \${h}\`);

    while (i < this.size) {
      const idx = (h + i) % this.size;
      if (this.table[idx] === null) {
        this.table[idx] = key;
        trace.push(\`  Boş hücre bulundu! İndeks \${idx} doldu.\`);
        return;
      }
      trace.push(\`  Çakışma! İndeks \${idx} dolu (\${this.table[idx]}). Sonraki indeks aranıyor.\`);
      i++;
    }
    trace.push('Tablo tamamen dolu, eklenemedi!');
  }

  insertDoubleHashing(key: number, trace: string[]) {
    let i = 0;
    const h1 = key % this.size;
    const h2 = 1 + (key % (this.size - 2)); // size asal olmalıdır
    trace.push(\`Double Hashing: \${key} ekleniyor. h1=\${h1}, h2 (adım)=\\u0024{h2}\`);

    while (i < this.size) {
      const idx = (h1 + i * h2) % this.size;
      if (this.table[idx] === null) {
        this.table[idx] = key;
        trace.push(\`  Boş hücre bulundu! İndeks \${idx} doldu.\`);
        return;
      }
      trace.push(\`  Çakışma! İndeks \${idx} dolu (\${this.table[idx]}). h2 (\${h2}) adımı ile aranıyor.\`);
      i++;
    }
    trace.push('Tablo tamamen dolu, eklenemedi!');
  }
}`,
    python: `class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size
        
    def insert_linear(self, key):
        h = key % self.size
        for i in range(self.size):
            idx = (h + i) % self.size
            if self.table[idx] is None:
                self.table[idx] = key
                return idx
        return -1
        
    def insert_double(self, key):
        h1 = key % self.size
        h2 = 1 + (key % (self.size - 2))
        for i in range(self.size):
            idx = (h1 + i * h2) % self.size
            if self.table[idx] is None:
                self.table[idx] = key
                return idx
        return -1`
  },
  demo: {
    kind: 'open-addressing-hashing',
    title: 'Açık Adreslemeli Hashing Demo',
    description: 'Tablo boyutu (asal olması önerilir) ve eklenecek sayıları girin. Örnek: 7; 12, 19, 26, 5',
    placeholder: '7; 12, 19, 26, 5'
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(1 / (1 - alpha))',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(size)',
  analysisTitle: 'Doluluk Oranı (alpha) ve Kümelenme',
  analysisPoints: [
    'Doluluk oranı alpha (n / size) 0.5 seviyesini aştığında açık adresleme performansı ciddi ölçüde düşer.',
    'Doğrusal sonda (Linear Probing), çakışma durumunda bitişik hücreleri doldurduğundan büyük bloklar oluşturur. Bu da arama adımlarını uzatır (birincil kümelenme).',
    'Çift Hashing (Double Hashing), her anahtara özel h2 adımları sunduğu için kümelenmeyi dağıtır ve doluluk oranı %80-90\'a kadar performansı korur.'
  ],
  advantages: [
    'Harici bağlı liste pointerları taşımadığı için veri başına bellek kullanımı azdır.',
    'Tüm veriler ardışık bellek bloklarında olduğundan CPU önbellek dostudur.'
  ],
  disadvantages: [
    'Tablo boyutu dolduğunda yeniden boyutlandırma (rehashing) maliyeti yüksektir.',
    'Eleman silme (deletion) işlemi karmaşıktır; silinen hücrelerin "silindi" (tombstone) olarak işaretlenmesi gerekir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Hash Table',
      description: 'Chaining (zincirleme) çakışma çözümleme şeması.',
      href: '/algorithms/data-structures/hash-table'
    }
  ]
};
