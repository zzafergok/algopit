import { AlgorithmCardItem, NavigationConfig } from '@/types/navigation';
import {
  DuplicateAlgorithmCategory,
  getDuplicateAlgorithmsByCategory,
} from '@/lib/duplicate-algorithms';

const duplicateNavItems = (
  category: DuplicateAlgorithmCategory,
  excludedSlugs: string[] = [],
) =>
  getDuplicateAlgorithmsByCategory(category)
    .filter((algorithm) => !excludedSlugs.includes(algorithm.slug))
    .map((algorithm) => ({
      label: algorithm.title,
      href: `/algorithms/${category}/${algorithm.slug}`,
      description: algorithm.description,
      difficulty: algorithm.difficulty,
      category: algorithm.family,
    }));

export const algorithmCardItemsByCategory: Record<string, AlgorithmCardItem[]> =
  {
    '/algorithms/advanced-algorithms': [
      {
        name: "Floyd's Cycle-Finding",
        path: '/algorithms/advanced-algorithms/floyd-cycle-finding',
        description:
          "Bağlı listelerde döngüleri bulmak için kullanılan verimli bir algoritma. 'Tortoise and Hare' olarak da bilinir.",
      },
      {
        name: 'Topological Sort',
        path: '/algorithms/advanced-algorithms/topological-sort',
        description:
          'Yönlü asiklik graflarda (DAG) düğümleri bağımlılıklarına göre sıralayan algoritma.',
      },
    ],
    '/algorithms/backtracking': [
      {
        name: 'N-Queens Problem',
        path: '/algorithms/backtracking/n-queens',
        description:
          'N adet veziri, birbirlerini tehdit etmeyecek şekilde N×N boyutundaki satranç tahtasına yerleştirme problemi.',
      },
      {
        name: 'Subset Sum Problem',
        path: '/algorithms/backtracking/subset-sum',
        description:
          'Bir dizi içerisindeki sayıların alt kümelerinin toplamının belirli bir değere eşit olup olmadığını bulan algoritma.',
      },
    ],
    '/algorithms/data-structures': [
      {
        name: 'Linked List',
        path: '/algorithms/data-structures/linked-list',
        description:
          'Her düğümün veri ve bir sonraki düğüme referans içerdiği dinamik bir veri yapısı.',
        category: 'Linear',
        difficulty: 'Kolay',
      },
      {
        name: 'Stack',
        path: '/algorithms/data-structures/stack',
        description:
          'Son giren ilk çıkar (LIFO) prensibiyle çalışan, yalnızca en üstteki elemana erişim sağlayan veri yapısı.',
        category: 'Linear',
        difficulty: 'Kolay',
      },
      {
        name: 'Queue',
        path: '/algorithms/data-structures/queue',
        description:
          'İlk giren ilk çıkar (FIFO) prensibiyle çalışan, elemanları sırayla işleyen veri yapısı.',
        category: 'Linear',
        difficulty: 'Kolay',
      },
      {
        name: 'Binary Search Tree',
        path: '/algorithms/data-structures/binary-search-tree',
        description:
          'Her düğümün en fazla iki çocuğa sahip olduğu, hızlı arama, ekleme ve silme işlemlerine olanak tanıyan hiyerarşik yapı.',
        category: 'Tree',
        difficulty: 'Orta',
      },
      {
        name: 'Hash Table',
        path: '/algorithms/data-structures/hash-table',
        description:
          'Anahtarları değerlere eşleyen, hash fonksiyonu kullanarak sabit zamanlı erişim sağlayan veri yapısı.',
        category: 'Hash-based',
        difficulty: 'Orta',
      },
      {
        name: 'Trie (Prefix Tree)',
        path: '/algorithms/data-structures/trie',
        description:
          'String verilerini verimli şekilde saklamak ve prefix tabanlı aramalar yapmak için kullanılan ağaç yapısı.',
        category: 'Tree',
        difficulty: 'Orta',
      },
      {
        name: 'Segment Tree',
        path: '/algorithms/data-structures/segment-tree',
        description:
          'Aralık sorguları ve nokta güncellemeleri için optimize edilmiş, logaritmik performans sağlayan ağaç yapısı.',
        category: 'Tree',
        difficulty: 'Zor',
      },
      {
        name: 'Arama Ağaçları (Trees & Search Trees)',
        path: '/algorithms/data-structures/search-trees',
        description:
          'Kırmızı-Siyah Ağaç, 2-3 ve 2-3-4 Ağaçları, Dijital Arama Ağacı ve Patricia Ağacı varyantlarını içerir.',
        category: 'Tree',
        difficulty: 'Zor',
      },
      {
        name: 'Harici Arama ve Hashing (External Searching & Hashing)',
        path: '/algorithms/data-structures/external-searching-hashing',
        description:
          'ISAM (Dizinli Sıralı Erişim) ve Genişletilebilir Hashing (Extendible Hashing) yöntemlerini içerir.',
        category: 'Hash-based',
        difficulty: 'Zor',
      },
      {
        name: 'Açık Adreslemeli Hashing (Open Addressing Hashing)',
        path: '/algorithms/data-structures/open-addressing-hashing',
        description:
          'Doğrusal Sonda (Linear Probing) ve Çift Hashing (Double Hashing) çakışma çözümleme şemalarını içerir.',
        category: 'Hash-based',
        difficulty: 'Orta',
      },
      {
        name: 'Yığın İşlemleri (Heap & PQ Operations)',
        path: '/algorithms/data-structures/heap-operations',
        description:
          'Diziden yığın oluşturma (Heapify) ve Dolaylı Yığın (Index Heap) işlemlerini içerir.',
        category: 'Heap',
        difficulty: 'Orta',
      },
      {
        name: 'Ayrık Küme (Disjoint-Set / Union-Find)',
        path: '/algorithms/data-structures/union-find',
        description:
          'Hızlı Birleştirme (Quick Union), Ağırlık/Yükseklik Dengeli Union-Find ve Yol Yassılaştırma (Path Compression) işlemlerini içerir.',
        category: 'Set',
        difficulty: 'Orta',
      },
      {
        name: 'Küme İşlemleri ve MFSET (Set Operations)',
        path: '/algorithms/data-structures/set-operations',
        description:
          'Eşdeğerlik kümeleri (MFSET), Küme Birleştirme/Bölme (Merge/Split) ve Küme Birleşim/Kesişim işlemlerini içerir.',
        category: 'Set',
        difficulty: 'Kolay',
      },
    ],
    '/algorithms/divide-and-conquer': [
      {
        name: 'Merge Sort',
        path: '/algorithms/sorting/merge-sort',
        description:
          'Diziyi iki parçaya bölen, her parçayı sıralayan ve sonra birleştiren etkili bir sıralama algoritması.',
      },
      {
        name: 'Quick Sort',
        path: '/algorithms/sorting/quick-sort',
        description:
          'Pivot seçerek diziyi bölen ve her bölümü tekrar eden şekilde sıralayan hızlı sıralama algoritması.',
      },
      {
        name: 'Binary Search',
        path: '/algorithms/searching/binary-search',
        description:
          'Sıralı dizilerde, her adımda arama alanını yarıya indirerek logaritmik zamanda arama yapan algoritma.',
      },
    ],
    '/algorithms/dynamic-programming': [
      {
        name: 'Fibonacci Sequence',
        path: '/algorithms/dynamic-programming/fibonacci',
        description:
          'Her sayının kendinden önceki iki sayının toplamı olduğu, memoization ile verimli hesaplanabilen dizi.',
      },
      {
        name: 'Knapsack Problem',
        path: '/algorithms/dynamic-programming/knapsack',
        description:
          'Belirli bir ağırlık kapasitesindeki çantaya, maksimum değere sahip nesneleri yerleştirme problemi.',
      },
      {
        name: 'Longest Common Subsequence',
        path: '/algorithms/dynamic-programming/longest-common-subsequence',
        description:
          'İki dizi arasındaki en uzun ortak alt diziyi bulan algoritma.',
      },
    ],
    '/algorithms/graph-algorithms': [
      {
        name: 'Breadth-First Search (BFS)',
        path: '/algorithms/graph-algorithms/bfs',
        description:
          'Grafı seviye seviye dolaşan, en kısa yolu bulma ve seviye tabanlı işlemlerde kullanılan algoritma.',
        category: 'Traversal',
        difficulty: 'Kolay',
      },
      {
        name: 'Depth-First Search (DFS)',
        path: '/algorithms/graph-algorithms/dfs',
        description:
          'Grafı derinlemesine dolaşan, bağlantılı bileşenler ve çevrim tespitinde kullanılan algoritma.',
        category: 'Traversal',
        difficulty: 'Kolay',
      },
      {
        name: "Dijkstra's Algorithm",
        path: '/algorithms/graph-algorithms/dijkstra',
        description:
          'Bir düğümden diğer tüm düğümlere olan en kısa yolları bulan, ağırlıklı graflarda kullanılan algoritma.',
        category: 'Shortest Path',
        difficulty: 'Orta',
      },
      {
        name: 'A* (A-Star) Algorithm',
        path: '/algorithms/graph-algorithms/a-star',
        description:
          'Heuristik fonksiyon kullanarak hedef odaklı en kısa yol bulan, oyun ve robotik alanlarında yaygın kullanılan algoritma.',
        category: 'Shortest Path',
        difficulty: 'Orta',
      },
      {
        name: 'Bellman-Ford Algorithm',
        path: '/algorithms/graph-algorithms/bellman-ford',
        description:
          'Negatif ağırlıklı kenarları olan graflarda en kısa yolları bulan ve negatif çevrimleri tespit eden algoritma.',
        category: 'Shortest Path',
        difficulty: 'Zor',
      },
      {
        name: 'Floyd-Warshall Algorithm',
        path: '/algorithms/graph-algorithms/floyd-warshall',
        description:
          'Tüm düğüm çiftleri arasındaki en kısa yolları bulan, dinamik programlama tabanlı algoritma.',
        category: 'Shortest Path',
        difficulty: 'Zor',
      },
      {
        name: "Kruskal's Algorithm",
        path: '/algorithms/graph-algorithms/kruskal',
        description:
          'Kenar tabanlı yaklaşımla minimum yayılma ağacı bulan, Union-Find veri yapısını kullanan algoritma.',
        category: 'MST',
        difficulty: 'Orta',
      },
      {
        name: "Prim's Algorithm",
        path: '/algorithms/graph-algorithms/prim',
        description:
          'Düğüm tabanlı yaklaşımla minimum yayılma ağacı bulan, öncelik kuyruğu kullanan algoritma.',
        category: 'MST',
        difficulty: 'Orta',
      },
      {
        name: 'Graf Dolaşma ve Arama (Graph Traversals & Searching)',
        path: '/algorithms/graph-algorithms/graph-traversals',
        description:
          'Ağaçta BFS, Öncelik Öncelikli Dolaşma (PFS), Seyrek/Yoğun PFS ve Çevrim Testi algoritmalarını içerir.',
        category: 'Traversal',
        difficulty: 'Orta',
      },
      {
        name: 'En Kısa Yollar ve MST (Shortest Paths & MST)',
        path: '/algorithms/graph-algorithms/shortest-paths-mst',
        description:
          'En Kısa Yol Yazdırma (Shortest Path Printing) ve Öklid MST (Euclidean Minimum Spanning Tree) varyantlarını içerir.',
        category: 'Shortest Path',
        difficulty: 'Zor',
      },
      {
        name: 'Ağ Akışı (Network Flow)',
        path: '/algorithms/graph-algorithms/network-flow',
        description:
          'Ford-Fulkerson Maksimum Akış ve Maksimum Akış / Minimum Kesik (Max-Flow/Min-Cut) şemalarını içerir.',
        category: 'Network Flow',
        difficulty: 'Zor',
      },
      {
        name: 'Eşleştirme ve Evlilik (Matching & Marriage)',
        path: '/algorithms/graph-algorithms/matching-marriage',
        description:
          'İki Parçalı Eşleştirme (Bipartite Matching), Maksimal/Maksimum/Ağırlıklı Eşleştirme ve Kararlı Evlilik (Stable Marriage) problemlerini içerir.',
        category: 'Matching',
        difficulty: 'Zor',
      },
      {
        name: 'Graf Boyama ve Geri İzleme (Graph Coloring & Backtracking)',
        path: '/algorithms/graph-algorithms/graph-coloring-backtracking',
        description:
          'Grafı M renkle boyama problemini geri izleme (backtracking) yaklaşımıyla çözümler.',
        category: 'Backtracking',
        difficulty: 'Zor',
      },
    ],
    '/algorithms/greedy-algorithms': [
      {
        name: 'Fractional Knapsack',
        path: '/algorithms/greedy-algorithms/fractional-knapsack',
        description:
          'Nesneleri ağırlık/değer oranına göre sıralayarak çantaya yerleştiren, nesnelerin bölünebilir olduğu çanta problemi çözümü.',
      },
      {
        name: 'Huffman Coding',
        path: '/algorithms/greedy-algorithms/huffman-coding',
        description:
          'Karakterlerin frekanslarına göre değişken uzunluklu kodlar atayan, veri sıkıştırma için kullanılan algoritma.',
      },
    ],
    '/algorithms/mathematical-algorithms': [
      {
        name: 'GCD (Euclidean Algorithm)',
        path: '/algorithms/mathematical-algorithms/gcd',
        description:
          'İki veya daha fazla sayının en büyük ortak bölenini bulan etkili bir algoritma.',
      },
      {
        name: 'Sieve of Eratosthenes',
        path: '/algorithms/mathematical-algorithms/sieve-of-eratosthenes',
        description:
          'Belirli bir sayıya kadar olan tüm asal sayıları hızlı bir şekilde bulan algoritma.',
      },
      {
        name: 'Asallık Testi (Primality Test)',
        path: '/algorithms/mathematical-algorithms/primality-test',
        description:
          'Bir sayının asal olup olmadığını sınayan temel ve optimize edilmiş bölünebilirlik testidir.',
      },
      {
        name: 'Taban Dönüşümü (Base Conversion)',
        path: '/algorithms/mathematical-algorithms/base-conversion',
        description:
          'Bir sayıyı 10 tabanından başka bir tabana (örneğin ikili taban - ToBinary) bölme-kalan yöntemiyle dönüştürür.',
      },
      {
        name: 'Faktöriyel (Factorial)',
        path: '/algorithms/mathematical-algorithms/factorial',
        description:
          'Bir sayının faktöriyelini (1\'den n\'e kadar olan sayıların çarpımı) iteratif ve recursive yöntemlerle hesaplar.',
      },
      {
        name: 'Üs Alma (Exponentiation)',
        path: '/algorithms/mathematical-algorithms/exponentiation',
        description:
          'Bir taban sayının belirtilen üssünü böl-ve-fethet (Binary Exponentiation) yöntemiyle logaritmik zamanda hesaplar.',
      },
      {
        name: 'Polinom İşlemleri (Polynomial Operations)',
        path: '/algorithms/mathematical-algorithms/polynomial-operations',
        description:
          'Polinomlar üzerinde Değerleme (Horner Yöntemi), Naive Çarpma, Seyrek Toplama ve Lagrange İnterpolasyonu işlemlerini gerçekleştirir.',
      },
      {
        name: 'Matris İşlemleri (Matrix Operations)',
        path: '/algorithms/mathematical-algorithms/matrix-operations',
        description:
          'Matrisler üzerinde Matris Toplama ve Matris-Vektör Çarpımı işlemlerini verimli şekilde gerçekleştirir.',
      },
      {
        name: 'Gauss Eliminasyonu (Gaussian Elimination)',
        path: '/algorithms/mathematical-algorithms/gaussian-elimination',
        description:
          'Doğrusal denklem sistemlerini çözmek için İleri Eliminasyon, Geri Yerine Koyma ve Gauss-Jordan yöntemlerini kullanır.',
      },
      {
        name: 'İnterpolasyon ve Eğri Uydurma (Interpolation & Fitting)',
        path: '/algorithms/mathematical-algorithms/interpolation-fitting',
        description:
          'Veri noktalarından yumuşak geçişli eğriler üretmek için Spline İnterpolasyonu ve En Küçük Kareler Uyumu yöntemlerini kullanır.',
      },
      {
        name: 'Sayısal İntegral (Numerical Integration / Quadrature)',
        path: '/algorithms/mathematical-algorithms/numerical-integration',
        description:
          'Belirli bir integralin değerini hesaplamak için Dikdörtgen, Yamuk, Simpson, Romberg, Adaptif ve Spline yöntemlerini kullanır.',
      },
      {
        name: 'Rastgele Sayı Üreteçleri (Random Number Generators)',
        path: '/algorithms/mathematical-algorithms/random-number-generators',
        description:
          'Sözde rastgele sayılar üretmek için Doğrusal Eşlik (LCG), Toplamsal Eşlik (Lagged Fibonacci), LFSR ve Chi-Square testini içerir.',
      },
    ],
    '/algorithms/sorting': [
      {
        name: 'Bubble Sort',
        path: '/algorithms/sorting/bubble-sort',
        description:
          'Her adımda komşu elemanları karşılaştırarak ve gerekirse değiştirerek çalışan basit bir sıralama algoritması.',
        difficulty: 'Kolay',
      },
      {
        name: 'Selection Sort',
        path: '/algorithms/sorting/selection-sort',
        description:
          'Her adımda dizideki en küçük elemanı bulup uygun konuma yerleştiren algoritma.',
        difficulty: 'Kolay',
      },
      {
        name: 'Insertion Sort',
        path: '/algorithms/sorting/insertion-sort',
        description:
          'Elemanları teker teker alıp sıralı alt listeye uygun konuma yerleştiren algoritma.',
        difficulty: 'Kolay',
      },
      {
        name: 'Merge Sort',
        path: '/algorithms/sorting/merge-sort',
        description:
          'Böl ve fethet yaklaşımını kullanarak diziyi parçalara ayırıp sıralayarak birleştiren algoritma.',
        difficulty: 'Orta',
      },
      {
        name: 'Quick Sort',
        path: '/algorithms/sorting/quick-sort',
        description:
          'Pivot eleman seçerek diziyi bölen ve alt dizileri sıralayan hızlı bir algoritma.',
        difficulty: 'Orta',
      },
      {
        name: 'Heap Sort',
        path: '/algorithms/sorting/heap-sort',
        description:
          'Binary heap veri yapısını kullanarak elemanları sıralayan verimli bir algoritma.',
        difficulty: 'Orta',
      },
      {
        name: 'Counting Sort',
        path: '/algorithms/sorting/counting-sort',
        description:
          'Karşılaştırma yapmadan, elemanların frekansını sayarak sıralama yapan doğrusal algoritma.',
        difficulty: 'Orta',
      },
      {
        name: 'Radix Sort',
        path: '/algorithms/sorting/radix-sort',
        description:
          'Sayıları basamaklarına göre sıralayan, counting sort tabanlı doğrusal algoritma.',
        difficulty: 'Orta',
      },
      {
        name: 'Shell Sort',
        path: '/algorithms/sorting/shell-sort',
        description:
          "Insertion sort'un geliştirilmiş versiyonu, gap aralıklarıyla elemanları önceden organize eden algoritma.",
        difficulty: 'Orta',
      },
      {
        name: 'Tim Sort',
        path: '/algorithms/sorting/tim-sort',
        description:
          "Python'un yerleşik sort fonksiyonunda kullanılan, merge sort ve insertion sort'un hibrit versiyonu.",
        difficulty: 'Zor',
      },
      {
        name: 'Quicksort Varyantları (Quicksort Variants)',
        path: '/algorithms/sorting/quicksort-variants',
        description:
          'Rastgeleleştirilmiş Quicksort, Pivot Bölümleme ve Üçlü Medyan Bölümleme varyantlarını içerir.',
        difficulty: 'Orta',
      },
      {
        name: 'Radix Sort Varyantları (Radix Sort Variants)',
        path: '/algorithms/sorting/radix-sort-variants',
        description:
          'Taban Değişimli Sıralama ve Düz Tabanlı Sıralama varyantlarını içerir.',
        difficulty: 'Zor',
      },
      {
        name: 'Kova Sıralaması (Bucket Sort)',
        path: '/algorithms/sorting/bucket-sort',
        description:
          'Elemanları kovalara dağıtarak ve her kovayı kendi içinde sıralayarak çalışan algoritma.',
        difficulty: 'Orta',
      },
      {
        name: 'Sıra İstatistikleri (Order Statistics / Kth Element)',
        path: '/algorithms/sorting/order-statistics',
        description:
          'En Kötü Durumda Doğrusal K. Eleman (Median of Medians) ve Quickselect algoritmalarını içerir.',
        difficulty: 'Zor',
      },
      {
        name: 'Harici Sıralama ve Birleştirme (External Sorting & Merging)',
        path: '/algorithms/sorting/external-sorting',
        description:
          'Sort-Merge, Dengeli Çok Yollu Birleştirme ve Yedekli Seçim yöntemlerini içerir.',
        difficulty: 'Zor',
      },
      {
        name: 'Basit / Yardımcı Sıralamalar (Simple Sorts)',
        path: '/algorithms/sorting/simple-sorts',
        description:
          'Üç Eleman Sıralama (Sort3) ve Doğrusal Sıralama (Linear Sort) algoritmalarını içerir.',
        difficulty: 'Kolay',
      },
    ],
    '/algorithms/string-algorithms': [
      {
        name: 'Rabin-Karp Algorithm',
        path: '/algorithms/string-algorithms/rabin-karp',
        description:
          'Metin içerisinde desen aramak için hash değerlerini kullanan string eşleştirme algoritması.',
      },
      {
        name: 'KMP Algorithm',
        path: '/algorithms/string-algorithms/kmp',
        description:
          'Önek tablosu kullanarak metinde desen aramayı verimli hale getiren string eşleştirme algoritması.',
      },
      {
        name: 'Boyer-Moore Algorithm',
        path: '/algorithms/string-algorithms/boyer-moore',
        description:
          'Sağdan sola tarama yaparak ve kötü karakter kuralını kullanarak hızlı string eşleştirme algoritması.',
      },
      {
        name: 'Z Algorithm',
        path: '/algorithms/string-algorithms/z-algorithm',
        description:
          'Z-array kullanarak metin içerisinde desen bulma işlemini gerçekleştiren algoritma.',
      },
      {
        name: 'String Arama ve Eşleştirme',
        path: '/algorithms/string-algorithms/string-search-matching',
        description:
          'Kaba kuvvet, Boyer-Moore varyantları, Durum Makinesi, NFA simülasyonu ve düzenli ifade eşleştirmelerini içerir.',
        category: 'String',
        difficulty: 'Zor',
      },
      {
        name: 'Derleyiciler ve Ayrıştırma',
        path: '/algorithms/string-algorithms/compilers-parsing',
        description:
          'Aşağıdan yukarıya, Kaydır-İndirge ve yukarıdan aşağıya (recursive descent) ifade/terim/faktör ayrıştırma yöntemlerini içerir.',
        category: 'Parsing',
        difficulty: 'Zor',
      },
      {
        name: 'Veri Sıkıştırma (Compression)',
        path: '/algorithms/string-algorithms/compression',
        description:
          'RLE (Run-Length Encoding) ve Değişken Uzunluklu (Huffman vb.) kodlama sıkıştırma algoritmalarını içerir.',
        category: 'Compression',
        difficulty: 'Orta',
      },
      {
        name: 'Kriptografi (Cryptography)',
        path: '/algorithms/string-algorithms/cryptography',
        description:
          'Sezar, Vigenere, Vernam (One-Time Pad) ve Çarpım (Substitution+Transposition) şifreleme yöntemlerini içerir.',
        category: 'Cryptography',
        difficulty: 'Orta',
      },
    ],
    '/algorithms/computational-geometry': [
      {
        name: 'Temel Geometrik İşlemler',
        path: '/algorithms/computational-geometry/geometric-primitives',
        description:
          'Bresenham çizgi çizme, çizgi kesişimleri, dikdörtgen kesişimleri ve çember çakışmalarını içerir.',
        category: 'Primitives',
        difficulty: 'Orta',
      },
      {
        name: 'Sorgu ve Kapsama Testleri',
        path: '/algorithms/computational-geometry/containment-query',
        description:
          'Noktanın dikdörtgen veya çokgen içinde olup olmadığını sorgulayan Ray Casting algoritmasını içerir.',
        category: 'Query',
        difficulty: 'Orta',
      },
      {
        name: 'Yol ve Dış Bükey Gövde',
        path: '/algorithms/computational-geometry/convex-hull-path',
        description:
          'Graham Scan ve Jarvis March (Gift Wrapping) dış bükey gövde bulma algoritmalarını içerir.',
        category: 'Convex Hull',
        difficulty: 'Zor',
      },
      {
        name: 'Yakınlık Problemleri',
        path: '/algorithms/computational-geometry/proximity-problems',
        description:
          'Nokta kümeleri arasında en yakın çifti (Closest Pair) bulmak için Böl ve Fethet algoritmasını içerir.',
        category: 'Proximity',
        difficulty: 'Zor',
      },
      {
        name: 'Uzamsal ve Aralık Araması',
        path: '/algorithms/computational-geometry/spatial-searching',
        description:
          '2D-Ağaç (2D-Tree) kurulumu ve dikdörtgensel bölge arama (Range Search) algoritmalarını içerir.',
        category: 'Range Search',
        difficulty: 'Zor',
      },
    ],
    '/algorithms/design-optimization-np': [
      {
        name: 'Dallanıp Sınırlandırma (Branch and Bound)',
        path: '/algorithms/design-optimization-np/branch-and-bound',
        description:
          'FIFO, LIFO ve Least-Cost arama stratejileri ile dallanıp sınırlandırma (Branch and Bound) algoritmasını içerir.',
        category: 'Branch & Bound',
        difficulty: 'Zor',
      },
      {
        name: 'Gezgin Satıcı ve Yerel Arama (Traveling Salesman & Local Search)',
        path: '/algorithms/design-optimization-np/traveling-salesman',
        description:
          'TSP çözümü için yerel arama (Local Search), 2-Opt yerel iyileştirmesi, Kapsamlı Arama ve Yaklaşıklık algoritmalarını içerir.',
        category: 'TSP & Local Search',
        difficulty: 'Zor',
      },
      {
        name: 'Çanta Problemi Varyantları (Knapsack Problem Variants)',
        path: '/algorithms/design-optimization-np/knapsack-variants',
        description:
          'Sınırlı (Bounded), Sınırsız (Unbounded), Dallanıp Sınırlandırmalı ve Nondeterministik (DKP) çanta problemlerini içerir.',
        category: 'Knapsack',
        difficulty: 'Zor',
      },
      {
        name: 'Zamanlama ve Zincir Optimizasyonu (Scheduling & Chain Optimization)',
        path: '/algorithms/design-optimization-np/scheduling-chain',
        description:
          'Teslim Tarihli İş Sıralama (Job Sequencing), Matris Zincir Çarpımı ve Sistem Güvenilirlik Tasarımı algoritmalarını içerir.',
        category: 'Optimization',
        difficulty: 'Orta',
      },
      {
        name: 'Çok Aşamalı Graflar (Multistage Graphs)',
        path: '/algorithms/design-optimization-np/multistage-graphs',
        description:
          'Çok aşamalı graflarda en kısa yolu bulmak için İleri Akış (Fgraph) ve Geri Akış (Bgraph) dinamik programlama algoritmalarını içerir.',
        category: 'Graphs',
        difficulty: 'Orta',
      },
      {
        name: 'Graf Boyama ve NP-Zor (Graph Coloring & Hard Problems)',
        path: '/algorithms/design-optimization-np/graph-coloring-np',
        description:
          'M-Boyama backtracking algoritması, Cook Teoremi ve DPLL tabanlı SAT Çözücü simülasyonunu içerir.',
        category: 'NP-Hard',
        difficulty: 'Zor',
      },
    ],
    '/algorithms/advanced-parallel-memory': [
      {
        name: 'Hızlı Fourier Dönüşümü (Fast Fourier Transform)',
        path: '/algorithms/advanced-parallel-memory/fast-fourier-transform',
        description:
          'Sinyal işleme ve polinom çarpımlarında kullanılan O(n log n) Cooley-Tukey FFT ve ters FFT simülasyonunu içerir.',
        category: 'FFT',
        difficulty: 'Zor',
      },
      {
        name: 'Paralel Birleştirme ve Ağlar (Parallel Merging & Networks)',
        path: '/algorithms/advanced-parallel-memory/parallel-merging-networks',
        description:
          'Batcher Odd-Even Merge, Bitonic Sort sıralama ağları ve mükemmel karıştırma (Perfect Shuffle) simülasyonunu içerir.',
        category: 'Parallel Networks',
        difficulty: 'Zor',
      },
      {
        name: 'Matematik ve Klasik Bulmacalar (Math & Classic Riddles)',
        path: '/algorithms/advanced-parallel-memory/math-classic-riddles',
        description:
          'Karatsuba Hızlı Çarpımı, Hanoi Kuleleri, Lig Usulü Turnuva (Round-Robin) ve Çokgen Triangulation çözümlerini içerir.',
        category: 'Riddles',
        difficulty: 'Orta',
      },
      {
        name: 'Doğrusal Programlama / Simpleks (Linear Programming / Simplex)',
        path: '/algorithms/advanced-parallel-memory/linear-programming-simplex',
        description:
          'Doğrusal optimizasyon için Simplex pivot adımları, Bland kuralı ve Steepest Descent gradyan inişi simülasyonunu içerir.',
        category: 'Simplex & Optimization',
        difficulty: 'Zor',
      },
      {
        name: 'Bellek Yönetimi ve Çöp Toplama (Memory Management & GC)',
        path: '/algorithms/advanced-parallel-memory/memory-management-gc',
        description:
          'GC İşaretleme (Mark-Sweep), non-recursive işaretleme, Buddy bellek yönetimi ve boş blok birleştirme simülasyonunu içerir.',
        category: 'Memory & GC',
        difficulty: 'Zor',
      },
    ],
  };

export const navigationConfig: NavigationConfig = {
  mainNavItems: [
    { label: 'Ana Sayfa', href: '/' },
    {
      label: 'Algoritmalar',
      href: '/algorithms',
      children: [
        {
          label: 'Sıralama Algoritmaları',
          href: '/algorithms/sorting',
          children: [
            { label: 'Bubble Sort', href: '/algorithms/sorting/bubble-sort' },
            {
              label: 'Counting Sort',
              href: '/algorithms/sorting/counting-sort',
            },
            { label: 'Heap Sort', href: '/algorithms/sorting/heap-sort' },
            {
              label: 'Insertion Sort',
              href: '/algorithms/sorting/insertion-sort',
            },
            { label: 'Merge Sort', href: '/algorithms/sorting/merge-sort' },
            { label: 'Quick Sort', href: '/algorithms/sorting/quick-sort' },
            { label: 'Radix Sort', href: '/algorithms/sorting/radix-sort' },
            {
              label: 'Selection Sort',
              href: '/algorithms/sorting/selection-sort',
            },
            { label: 'Shell Sort', href: '/algorithms/sorting/shell-sort' },
            { label: 'Tim Sort', href: '/algorithms/sorting/tim-sort' },
            {
              label: 'Quicksort Varyantları',
              href: '/algorithms/sorting/quicksort-variants',
            },
            {
              label: 'Radix Sort Varyantları',
              href: '/algorithms/sorting/radix-sort-variants',
            },
            { label: 'Kova Sıralaması', href: '/algorithms/sorting/bucket-sort' },
            {
              label: 'Sıra İstatistikleri',
              href: '/algorithms/sorting/order-statistics',
            },
            {
              label: 'Harici Sıralama',
              href: '/algorithms/sorting/external-sorting',
            },
            {
              label: 'Basit Sıralamalar',
              href: '/algorithms/sorting/simple-sorts',
            },
            ...duplicateNavItems('sorting', ['merge-sort', 'external-sorting']),
          ],
        },
        {
          label: 'Arama Algoritmaları',
          href: '/algorithms/searching',
          children: [
            {
              label: 'Binary Search',
              href: '/algorithms/searching/binary-search',
            },
            {
              label: 'Linear Search',
              href: '/algorithms/searching/linear-search',
            },
            {
              label: 'Arama Teknikleri',
              href: '/algorithms/searching/search-techniques',
            },
            ...duplicateNavItems('searching', ['binary-search']),
          ],
        },
        {
          label: 'Graf Algoritmaları',
          href: '/algorithms/graph-algorithms',
          children: [
            { label: 'A*', href: '/algorithms/graph-algorithms/a-star' },
            {
              label: 'Bellman-Ford',
              href: '/algorithms/graph-algorithms/bellman-ford',
            },
            { label: 'BFS', href: '/algorithms/graph-algorithms/bfs' },
            { label: 'DFS', href: '/algorithms/graph-algorithms/dfs' },
            {
              label: 'Dijkstra',
              href: '/algorithms/graph-algorithms/dijkstra',
            },
            {
              label: 'Floyd-Warshall',
              href: '/algorithms/graph-algorithms/floyd-warshall',
            },
            { label: 'Kruskal', href: '/algorithms/graph-algorithms/kruskal' },
            { label: 'Prim', href: '/algorithms/graph-algorithms/prim' },
            {
              label: 'Graf Dolaşma ve Arama',
              href: '/algorithms/graph-algorithms/graph-traversals',
            },
            {
              label: 'En Kısa Yollar ve MST',
              href: '/algorithms/graph-algorithms/shortest-paths-mst',
            },
            {
              label: 'Ağ Akışı',
              href: '/algorithms/graph-algorithms/network-flow',
            },
            {
              label: 'Eşleştirme ve Evlilik',
              href: '/algorithms/graph-algorithms/matching-marriage',
            },
            {
              label: 'Graf Boyama ve Geri İzleme',
              href: '/algorithms/graph-algorithms/graph-coloring-backtracking',
            },
            ...duplicateNavItems('graph-algorithms', [
              'bfs',
              'dfs',
              'dijkstra',
            ]),
          ],
        },
        {
          label: 'Veri Yapıları',
          href: '/algorithms/data-structures',
          children: [
            {
              label: 'Binary Search Tree',
              href: '/algorithms/data-structures/binary-search-tree',
            },
            {
              label: 'Hash Table',
              href: '/algorithms/data-structures/hash-table',
            },
            {
              label: 'Linked List',
              href: '/algorithms/data-structures/linked-list',
            },
            { label: 'Queue', href: '/algorithms/data-structures/queue' },
            {
              label: 'Segment Tree',
              href: '/algorithms/data-structures/segment-tree',
            },
            { label: 'Stack', href: '/algorithms/data-structures/stack' },
            { label: 'Trie', href: '/algorithms/data-structures/trie' },
            {
              label: 'Arama Ağaçları',
              href: '/algorithms/data-structures/search-trees',
            },
            {
              label: 'Harici Arama ve Hashing',
              href: '/algorithms/data-structures/external-searching-hashing',
            },
            {
              label: 'Açık Adreslemeli Hashing',
              href: '/algorithms/data-structures/open-addressing-hashing',
            },
            {
              label: 'Yığın İşlemleri',
              href: '/algorithms/data-structures/heap-operations',
            },
            {
              label: 'Ayrık Küme (Union-Find)',
              href: '/algorithms/data-structures/union-find',
            },
            {
              label: 'Küme İşlemleri ve MFSET',
              href: '/algorithms/data-structures/set-operations',
            },
            ...duplicateNavItems('data-structures', [
              'binary-search-tree-operations',
            ]),
          ],
        },
        {
          label: 'Dinamik Programlama',
          href: '/algorithms/dynamic-programming',
          children: [
            {
              label: 'Fibonacci',
              href: '/algorithms/dynamic-programming/fibonacci',
            },
            {
              label: 'Knapsack',
              href: '/algorithms/dynamic-programming/knapsack',
            },
            {
              label: 'Longest Common Subsequence',
              href: '/algorithms/dynamic-programming/longest-common-subsequence',
            },
            ...duplicateNavItems('dynamic-programming', ['knapsack']),
          ],
        },
        {
          label: 'Geri İzleme',
          href: '/algorithms/backtracking',
          children: [
            { label: 'N-Queens', href: '/algorithms/backtracking/n-queens' },
            {
              label: 'Subset Sum',
              href: '/algorithms/backtracking/subset-sum',
            },
            ...duplicateNavItems('backtracking'),
          ],
        },
        {
          label: 'Açgözlü Algoritmalar',
          href: '/algorithms/greedy-algorithms',
          children: [
            {
              label: 'Fractional Knapsack',
              href: '/algorithms/greedy-algorithms/fractional-knapsack',
            },
            {
              label: 'Huffman Coding',
              href: '/algorithms/greedy-algorithms/huffman-coding',
            },
            ...duplicateNavItems('greedy-algorithms', [
              'fractional-knapsack',
              'huffman-coding',
            ]),
          ],
        },
        {
          label: 'Kümeleme Algoritmaları',
          href: '/algorithms/clustering-algorithms',
          children: [
            {
              label: 'Hierarchical Clustering',
              href: '/algorithms/clustering-algorithms/hierarchical-clustering',
            },
            {
              label: 'K-Means',
              href: '/algorithms/clustering-algorithms/k-means',
            },
          ],
        },
        {
          label: 'Diğer Algoritmalar',
          href: '/algorithms/misc-algorithms',
          children: [
            {
              label: 'Bloom Filter',
              href: '/algorithms/misc-algorithms/bloom-filter',
            },
            {
              label: 'Reservoir Sampling',
              href: '/algorithms/misc-algorithms/reservoir-sampling',
            },
          ],
        },
        {
          label: 'Optimizasyon Algoritmaları',
          href: '/algorithms/optimization-algorithms',
          children: [
            {
              label: 'Genetic Algorithms',
              href: '/algorithms/optimization-algorithms/genetic-algorithms',
            },
            {
              label: 'Simulated Annealing',
              href: '/algorithms/optimization-algorithms/simulated-annealing',
            },
          ],
        },
        {
          label: 'Matematiksel Algoritmalar',
          href: '/algorithms/mathematical-algorithms',
          children: [
            { label: 'GCD', href: '/algorithms/mathematical-algorithms/gcd' },
            {
              label: 'Sieve of Eratosthenes',
              href: '/algorithms/mathematical-algorithms/sieve-of-eratosthenes',
            },
            {
              label: 'Asallık Testi',
              href: '/algorithms/mathematical-algorithms/primality-test',
            },
            {
              label: 'Taban Dönüşümü',
              href: '/algorithms/mathematical-algorithms/base-conversion',
            },
            {
              label: 'Faktöriyel',
              href: '/algorithms/mathematical-algorithms/factorial',
            },
            {
              label: 'Üs Alma',
              href: '/algorithms/mathematical-algorithms/exponentiation',
            },
            {
              label: 'Polinom İşlemleri',
              href: '/algorithms/mathematical-algorithms/polynomial-operations',
            },
            {
              label: 'Matris İşlemleri',
              href: '/algorithms/mathematical-algorithms/matrix-operations',
            },
            {
              label: 'Gauss Eliminasyonu',
              href: '/algorithms/mathematical-algorithms/gaussian-elimination',
            },
            {
              label: 'İnterpolasyon ve Eğri Uydurma',
              href: '/algorithms/mathematical-algorithms/interpolation-fitting',
            },
            {
              label: 'Sayısal İntegral',
              href: '/algorithms/mathematical-algorithms/numerical-integration',
            },
            {
              label: 'Rastgele Sayı Üreteçleri',
              href: '/algorithms/mathematical-algorithms/random-number-generators',
            },
            ...duplicateNavItems('mathematical-algorithms', ['gcd']),
          ],
        },
        {
          label: 'Metin İşleme Algoritmaları',
          href: '/algorithms/string-algorithms',
          children: [
            { label: 'KMP', href: '/algorithms/string-algorithms/kmp' },
            {
              label: 'Rabin-Karp',
              href: '/algorithms/string-algorithms/rabin-karp',
            },
            {
              label: 'String Arama ve Eşleştirme',
              href: '/algorithms/string-algorithms/string-search-matching',
            },
            {
              label: 'Derleyiciler ve Ayrıştırma',
              href: '/algorithms/string-algorithms/compilers-parsing',
            },
            {
              label: 'Veri Sıkıştırma',
              href: '/algorithms/string-algorithms/compression',
            },
            {
              label: 'Kriptografi',
              href: '/algorithms/string-algorithms/cryptography',
            },
            ...duplicateNavItems('string-algorithms'),
          ],
        },
        {
          label: 'İleri Seviye Algoritmalar',
          href: '/algorithms/advanced-algorithms',
          children: [
            {
              label: "Floyd's Cycle-Finding",
              href: '/algorithms/advanced-algorithms/floyd-cycle-finding',
            },
            {
              label: 'Topological Sort',
              href: '/algorithms/advanced-algorithms/topological-sort',
            },
            ...duplicateNavItems('advanced-algorithms'),
          ],
        },
        {
          label: 'Böl ve Fethet',
          href: '/algorithms/divide-and-conquer',
          children: [...duplicateNavItems('divide-and-conquer')],
        },
        {
          label: 'Hesaplamalı Geometri',
          href: '/algorithms/computational-geometry',
          children: [
            {
              label: 'Temel Geometrik İşlemler',
              href: '/algorithms/computational-geometry/geometric-primitives',
            },
            {
              label: 'Sorgu ve Kapsama Testleri',
              href: '/algorithms/computational-geometry/containment-query',
            },
            {
              label: 'Yol ve Dış Bükey Gövde',
              href: '/algorithms/computational-geometry/convex-hull-path',
            },
            {
              label: 'Yakınlık Problemleri',
              href: '/algorithms/computational-geometry/proximity-problems',
            },
            {
              label: 'Uzamsal ve Aralık Araması',
              href: '/algorithms/computational-geometry/spatial-searching',
            },
          ],
        },
        {
          label: 'Tasarım / Optimizasyon / NP',
          href: '/algorithms/design-optimization-np',
          children: [
            {
              label: 'Dallanıp Sınırlandırma',
              href: '/algorithms/design-optimization-np/branch-and-bound',
            },
            {
              label: 'Gezgin Satıcı ve Yerel Arama',
              href: '/algorithms/design-optimization-np/traveling-salesman',
            },
            {
              label: 'Çanta Problemi Varyantları',
              href: '/algorithms/design-optimization-np/knapsack-variants',
            },
            {
              label: 'Zamanlama ve Zincir Optimizasyonu',
              href: '/algorithms/design-optimization-np/scheduling-chain',
            },
            {
              label: 'Çok Aşamalı Graflar',
              href: '/algorithms/design-optimization-np/multistage-graphs',
            },
            {
              label: 'Graf Boyama ve NP-Zor',
              href: '/algorithms/design-optimization-np/graph-coloring-np',
            },
          ],
        },
        {
          label: 'Gelişmiş / Paralel / Bellek',
          href: '/algorithms/advanced-parallel-memory',
          children: [
            {
              label: 'Hızlı Fourier Dönüşümü',
              href: '/algorithms/advanced-parallel-memory/fast-fourier-transform',
            },
            {
              label: 'Paralel Birleştirme ve Ağlar',
              href: '/algorithms/advanced-parallel-memory/parallel-merging-networks',
            },
            {
              label: 'Matematik ve Klasik Bulmacalar',
              href: '/algorithms/advanced-parallel-memory/math-classic-riddles',
            },
            {
              label: 'Doğrusal Programlama / Simpleks',
              href: '/algorithms/advanced-parallel-memory/linear-programming-simplex',
            },
            {
              label: 'Bellek Yönetimi ve Çöp Toplama',
              href: '/algorithms/advanced-parallel-memory/memory-management-gc',
            },
          ],
        },
      ],
    },
    { label: 'Hakkında', href: '/about' },
    {
      label: 'Kaynaklar',
      href: '/resources',
      children: [
        { label: 'Kod Örnekleri', href: '/resources/code-examples' },
        { label: 'Katkıda Bulunma', href: '/resources/contributing' },
        { label: 'Belgelendirme', href: '/resources/documentation' },
        { label: 'Sık Sorulan Sorular', href: '/resources/faq' },
      ],
    },
  ],
  footerSections: [
    {
      title: 'Bağlantılar',
      links: [
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Algoritmalar', href: '/algorithms' },
        { label: 'Hakkında', href: '/about' },
      ],
    },
    {
      title: 'Algoritma Kategorileri',
      links: [
        { label: 'Sıralama Algoritmaları', href: '/algorithms/sorting' },
        { label: 'Arama Algoritmaları', href: '/algorithms/searching' },
        { label: 'Graf Algoritmaları', href: '/algorithms/graph-algorithms' },
        { label: 'Veri Yapıları', href: '/algorithms/data-structures' },
        {
          label: 'Dinamik Programlama',
          href: '/algorithms/dynamic-programming',
        },
      ],
    },
    {
      title: 'Kaynaklar',
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/zzafergok/algopit',
          isExternal: true,
        },
        { label: 'Belgelendirme', href: '/resources/documentation' },
        { label: 'Katkıda Bulunma', href: '/resources/contributing' },
      ],
    },
  ],
};
