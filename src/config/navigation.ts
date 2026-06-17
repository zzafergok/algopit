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
            ...duplicateNavItems('sorting', ['merge-sort']),
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
