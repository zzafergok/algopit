import type { RemainingAlgorithmContent } from './types';

export const quicksortVariantsContent: RemainingAlgorithmContent = {
  title: 'Quicksort Varyantları (Quicksort Variants)',
  category: 'Sıralama Algoritmaları',
  categoryHref: '/algorithms/sorting',
  family: 'Sorting / Divide and Conquer',
  difficulty: 'Orta',
  sources: ['DAA Notes', 'Sedgewick'],
  summary: 'Hızlı sıralama algoritmasının performansını ve kararlılığını artırmak için pivot seçimi ve bölümleme stratejilerini optimize eden varyantlardır.',
  descriptionParagraphs: [
    'Quicksort, ortalama durumda son derece hızlı çalışan bir böl ve fethet sıralama algoritmasıdır. Ancak en kötü durumda (örneğin sıralı bir dizide ilk veya son elemanın pivot seçilmesi) O(n^2) süresinde çalışabilir. Bu problemi çözmek için çeşitli varyantlar geliştirilmiştir.',
    'Rastgeleleştirilmiş Quicksort (Randomized Quicksort), diziden rastgele bir elemanı pivot seçerek en kötü durum senaryolarını önler. Üçlü Medyan Bölümleme (Median-of-Three Partitioning) ise dizinin başındaki, ortasındaki ve sonundaki elemanların medyanını pivot seçerek dengeli bir bölümleme sağlar.',
    'Pivot Bölümleme (Partition) ise diziyi pivotun etrafında küçükler, eşitler ve büyükler olarak organize eder. Hoare ve Lomuto bölümleme şemaları en yaygın kullanılan temel bölümleme yöntemleridir.'
  ],
  sourceNotes: [
    'DAA Notes: Randomized quicksort pick a random pivot element to achieve O(n log n) expected running time on any input.',
    'Sedgewick: Median-of-three partitioning avoids worst-case behavior and reduces the number of recursive calls.'
  ],
  steps: [
    'Dizinin sınırlarını belirle (low, high).',
    'Varyanta göre pivotu seç (Rastgele veya Üçlü Medyan).',
    'Seçilen pivotu dizinin sonuna/başına taşı.',
    'Pivotu referans alarak diziyi bölümlendir (küçükler sola, büyükler sağa).',
    'Pivotun nihai yerini bul ve sol ile sağ alt diziler için işlemi rekürsif olarak tekrarla.'
  ],
  pseudocode: `RANDOMIZED-PARTITION(A, p, r)
  i <- RANDOM(p, r)
  exchange A[r] with A[i]
  return PARTITION(A, p, r)

RANDOMIZED-QUICKSORT(A, p, r)
  if p < r
    q <- RANDOMIZED-PARTITION(A, p, r)
    RANDOMIZED-QUICKSORT(A, p, q - 1)
    RANDOMIZED-QUICKSORT(A, q + 1, r)`,
  codeExamples: {
    typescript: `function randomizedQuicksort(arr: number[], low = 0, high = arr.length - 1): number[] {
  if (low < high) {
    const pivotIndex = randomizedPartition(arr, low, high);
    randomizedQuicksort(arr, low, pivotIndex - 1);
    randomizedQuicksort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function randomizedPartition(arr: number[], low: number, high: number): number {
  const randIdx = Math.floor(Math.random() * (high - low + 1)) + low;
  [arr[randIdx], arr[high]] = [arr[high], arr[randIdx]];
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    python: `import random

def randomized_quicksort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        p_idx = randomized_partition(arr, low, high)
        randomized_quicksort(arr, low, p_idx - 1)
        randomized_quicksort(arr, p_idx + 1, high)
    return arr

def randomized_partition(arr, low, high):
    rand_idx = random.randint(low, high)
    arr[rand_idx], arr[high] = arr[high], arr[rand_idx]
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`
  },
  demo: {
    kind: 'quicksort-variants',
    title: 'Quicksort Varyantları Demo',
    description: 'Sıralamak istediğiniz sayıları virgülle ayırarak girin ve çalıştırın. Örnek: 35, 12, 43, 8, 22, 9, 60',
    placeholder: '35, 12, 43, 8, 22, 9, 60'
  },
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n^2)'
  },
  spaceComplexity: 'O(log n)',
  analysisTitle: 'Varyant Karşılaştırması',
  analysisPoints: [
    'Rastgele pivot seçimi, pratik uygulamalarda O(n^2) durumuna düşme ihtimalini neredeyse sıfıra indirir.',
    'Üçlü Medyan (Median-of-three) seçimi, özellikle neredeyse sıralı olan dizilerde performansı en üst seviyeye çıkarır.',
    'Bu optimizasyonlar, dual-pivot quicksort (Java\'nın Arrays.sort yapısı) gibi modern kütüphane sıralamalarının temelini oluşturur.'
  ],
  advantages: [
    'Yerinde (in-place) sıralama yaptığı için ek bellek ihtiyacı düşüktür.',
    'Önbellek (cache-friendly) dostu bir veri erişim modeline sahiptir.',
    'Ortalama durumda en hızlı genel amaçlı sıralama algoritmalarından biridir.'
  ],
  disadvantages: [
    'Kararsız (unstable) bir sıralama algoritmasıdır (aynı değere sahip elemanların sırası değişebilir).',
    'Kötü pivot seçimlerinde yığın taşması (stack overflow) riski barındırır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Quick Sort',
      description: 'Temel pivot bölümlemeli hızlı sıralama algoritması.',
      href: '/algorithms/sorting/quick-sort'
    },
    {
      title: 'Merge Sort',
      description: 'Kararlı ve garanti O(n log n) karmaşıklıklı böl ve fethet algoritması.',
      href: '/algorithms/sorting/merge-sort'
    }
  ]
};

export const radixSortVariantsContent: RemainingAlgorithmContent = {
  title: 'Radix Sort Varyantları (Radix Sort Variants)',
  category: 'Sıralama Algoritmaları',
  categoryHref: '/algorithms/sorting',
  family: 'Sorting / Non-comparison',
  difficulty: 'Zor',
  sources: ['Sedgewick'],
  summary: 'Sayıları basamaklarına veya bitlerine göre karşılaştırma yapmadan gruplayarak sıralayan algoritma varyantlarıdır.',
  descriptionParagraphs: [
    'Radix Sort, elemanları anahtarlarının basamaklarına (veya ikili gösterimlerindeki bitlerine) göre sıralayan, karşılaştırma yapmayan bir sıralama algoritmasıdır. Sedgewick notlarında özellikle iki temel varyantı incelenir.',
    'Taban Değişimli Sıralama (Radix Exchange Sort), sayıların bit gösterimini MSB\'den (En Değerli Bit) LSB\'ye doğru inceler ve quicksort\'a benzer şekilde bit değerine göre bölümlendirerek çalışır. İkili ağaç yapısında veri gruplamaya benzer.',
    'Düz Tabanlı Sıralama (Straight Radix Sort - LSD), sayıları LSB\'den (En Değersiz Bit) MSB\'ye doğru, kararlı (stable) bir alt sıralama algoritması (genellikle Counting Sort) kullanarak basamak basamak sıralar.'
  ],
  sourceNotes: [
    'Sedgewick: Radix exchange sort partitions the keys on their bits starting from the MSB.',
    'Sedgewick: Straight radix sort processes keys from right-to-left (LSD) using a stable sort like counting sort.'
  ],
  steps: [
    'Verilerin sayısal/bit uzunluğunu belirle.',
    'Radix Exchange Sort için: En soldaki bitten başlayarak diziyi 0 bitli ve 1 bitli olanlar olarak ikiye böl ve rekürsif olarak devam et.',
    'Straight Radix Sort için: En sağdaki basamaktan başlayarak her basamağa göre kararlı bir şekilde (counting sort ile) diziyi sırala.'
  ],
  pseudocode: `RADIX-EXCHANGE-SORT(A, left, right, bit)
  if left < right and bit >= 0
    i <- left
    j <- right
    while i <= j
      while i <= j and bit-at(A[i], bit) = 0
        i <- i + 1
      while i <= j and bit-at(A[j], bit) = 1
        j <- j - 1
      if i < j
        exchange A[i] with A[j]
        i <- i + 1
        j <- j - 1
    RADIX-EXCHANGE-SORT(A, left, j, bit - 1)
    RADIX-EXCHANGE-SORT(A, i, right, bit - 1)`,
  codeExamples: {
    typescript: `function straightRadixSort(arr: number[]): number[] {
  const max = Math.max(...arr);
  let exp = 1;
  const n = arr.length;
  const output = Array(n).fill(0);

  while (Math.floor(max / exp) > 0) {
    const count = Array(10).fill(0);
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      count[digit]++;
    }
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }
    exp *= 10;
  }
  return arr;
}`,
    python: `def straight_radix_sort(arr):
    if not arr:
        return arr
    max_num = max(arr)
    exp = 1
    n = len(arr)
    output = [0] * n
    
    while max_num // exp > 0:
        count = [0] * 10
        for x in arr:
            digit = (x // exp) % 10
            count[digit] += 1
        for i in range(1, 10):
            count[i] += count[i - 1]
        for i in range(n - 1, -1, -1):
            digit = (arr[i] // exp) % 10
            output[count[digit] - 1] = arr[i]
            count[digit] -= 1
        for i in range(n):
            arr[i] = output[i]
        exp *= 10
    return arr`
  },
  demo: {
    kind: 'radix-sort-variants',
    title: 'Radix Sort Varyantları Demo',
    description: 'Sıralanacak pozitif tam sayıları virgülle ayırarak girin. Örnek: 170, 45, 75, 90, 802, 24, 2, 66',
    placeholder: '170, 45, 75, 90, 802, 24, 2, 66'
  },
  timeComplexity: {
    best: 'O(n * w)',
    average: 'O(n * w)',
    worst: 'O(n * w)'
  },
  spaceComplexity: 'O(n + k)',
  analysisTitle: 'Basamak (w) Boyutunun Önemi',
  analysisPoints: [
    'w, sayıların maksimum basamak veya bit uzunluğudur.',
    'Eğer w küçükse (örneğin sabit uzunluklu 32-bit sayılar), Radix Sort O(n) zaman alanında çalışır ve O(n log n) karşılaştırma tabanlı sıralamalardan daha hızlı olabilir.',
    'Fakat geniş veri aralıklarında w büyüdüğünde, counting sort adımlarının sayısı artacağından performans düşebilir.'
  ],
  advantages: [
    'Karşılaştırma yapmaz, dolayısıyla alt sınır olan O(n log n) sınırına takılmaz.',
    'LSD varyantı kararlı (stable) sıralama özelliğine sahiptir.'
  ],
  disadvantages: [
    'Ek bellek alanı (kategorizasyon ve sayım dizileri) gerektirir.',
    'Genellikle sadece sayısal veya alfabetik (string) anahtarlara uygulanabilir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Radix Sort',
      description: 'LSD tabanlı klasik radix sort uygulaması.',
      href: '/algorithms/sorting/radix-sort'
    },
    {
      title: 'Counting Sort',
      description: 'Elemanların frekanslarını sayarak kararlı sıralama yapan yardımcı algoritma.',
      href: '/algorithms/sorting/counting-sort'
    }
  ]
};

export const bucketSortContent: RemainingAlgorithmContent = {
  title: 'Kova Sıralaması (Bin Sorting / Bucket Sort)',
  category: 'Sıralama Algoritmaları',
  categoryHref: '/algorithms/sorting',
  family: 'Sorting / Non-comparison',
  difficulty: 'Orta',
  sources: ['Aho'],
  summary: 'Elemanları belirli aralıklarla tanımlanmış alt bölmelere (kovalara) dağıtıp, her bölmeyi kendi içinde sıralayarak birleştiren algoritmadır.',
  descriptionParagraphs: [
    'Kova Sıralaması (Bucket Sort veya Bin Sorting), elemanları değer aralıklarına göre sınıflara ayırarak sıralayan bir "böl ve yönet" yaklaşımıdır. Veri kümesinin yaklaşık olarak düzgün (uniform) bir dağılım sergilediği durumlarda son derece etkilidir.',
    'Algoritma, girdi aralığını eşit büyüklükte alt aralıklara (kovalara) böler. Ardından her girdi elemanını ilgili olduğu kovaya atar. Kovalardaki eleman sayısı az olduğundan, her kova kendi içinde hızlı bir sıralama algoritması (örneğin Insertion Sort) ile sıralanır. Son adımda, kovalardaki sıralı elemanlar sırayla birleştirilir.',
    'Aho notlarında bu yöntem "Bin Sorting" olarak adlandırılır ve linked list yapıları kullanılarak bellek verimliliğinin artırılabileceği gösterilir.'
  ],
  sourceNotes: [
    'Aho: Bin sorting splits elements into bins. If keys are integers in range [0, k-1], bins are linked lists.',
    'Aho: Average complexity is O(n) when keys are uniformly distributed.'
  ],
  steps: [
    'Girdinin değer aralığına uygun boş kova (bucket/bin) listesi oluştur.',
    'Her girdi elemanını, değerine göre hesaplanan kova indeksine yerleştir.',
    'Boş olmayan her bir kovayı kendi içinde (örn. Insertion Sort ile) sırala.',
    'Tüm sıralanmış kovaları baştan sona birleştirerek sıralı diziyi oluştur.'
  ],
  pseudocode: `BUCKET-SORT(A)
  n <- length(A)
  Let B[0..n-1] be new lists (buckets)
  for i <- 0 to n - 1
    make B[i] an empty list
  for i <- 1 to n
    insert A[i] into B[floor(n * A[i])]
  for i <- 0 to n - 1
    sort list B[i] with insertion sort
  concatenate the lists B[0], B[1], .., B[n-1] together in order`,
  codeExamples: {
    typescript: `function bucketSort(arr: number[]): number[] {
  if (arr.length === 0) return arr;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.floor(Math.sqrt(arr.length)) || 1;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  const range = (max - min) / bucketCount || 1;
  for (const num of arr) {
    let index = Math.floor((num - min) / range);
    if (index >= bucketCount) index = bucketCount - 1;
    buckets[index].push(num);
  }

  const result: number[] = [];
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b); // Kovalarda küçük sıralama
    result.push(...bucket);
  }
  return result;
}`,
    python: `def bucket_sort(arr):
    if len(arr) == 0:
        return arr
    min_val, max_val = min(arr), max(arr)
    bucket_count = int(len(arr) ** 0.5) or 1
    buckets = [[] for _ in range(bucket_count)]
    
    val_range = (max_val - min_val) / bucket_count or 1
    for num in arr:
        idx = int((num - min_val) // val_range)
        if idx >= bucket_count:
            idx = bucket_count - 1
        buckets[idx].append(num)
        
    result = []
    for bucket in buckets:
        bucket.sort()
        result.extend(bucket)
    return result`
  },
  demo: {
    kind: 'bucket-sort',
    title: 'Kova Sıralaması Demo',
    description: 'Sıralanacak sayıları virgülle ayırarak girin. Örnek: 0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21',
    placeholder: '0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21'
  },
  timeComplexity: {
    best: 'O(n + k)',
    average: 'O(n)',
    worst: 'O(n^2)'
  },
  spaceComplexity: 'O(n + k)',
  analysisTitle: 'Dağılımın Önemi',
  analysisPoints: [
    'Kova sıralamasının ortalama durumda O(n) çalışması, verilerin aralığa düzgün (uniform) dağılmış olmasına bağlıdır.',
    'Tüm elemanlar tek bir kovaya yığılırsa (en kötü durum), algoritma o kovayı sıralamak için kullanılan sıralama algoritmasının (örneğin Insertion Sort\'un O(n^2)) hızına geriler.',
    'Kova sayısı k veri sayısına yakın seçildiğinde bellek kullanımı artar, ancak hız da optimize olur.'
  ],
  advantages: [
    'Düzgün dağılımlı verilerde O(n) doğrusal zaman karmaşıklığı sunar.',
    'Veriler paralel olarak kovalara bölünüp ayrı işlemcilerde sıralanabilir.'
  ],
  disadvantages: [
    'Düzgün dağılmayan (yoğunlaşmış) veri setlerinde performansı ciddi derecede düşer.',
    'Ek bellek kullanımı yüksektir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Counting Sort',
      description: 'Elemanların doğrudan frekanslarını kullanan kararlı sıralama.',
      href: '/algorithms/sorting/counting-sort'
    },
    {
      title: 'Insertion Sort',
      description: 'Kovaların kendi içlerinde sıralanmasında kullanılan basit algoritma.',
      href: '/algorithms/sorting/insertion-sort'
    }
  ]
};

export const orderStatisticsContent: RemainingAlgorithmContent = {
  title: 'Sıra İstatistikleri / K. Eleman (Order Statistics / Kth Element)',
  category: 'Sıralama Algoritmaları',
  categoryHref: '/algorithms/sorting',
  family: 'Selection / Statistics',
  difficulty: 'Zor',
  sources: ['Aho', 'DAA Notes'],
  summary: 'Bir dizideki K. en küçük elemanı (örneğin medyanı) en kötü durumda doğrusal O(n) zamanda bulan seçim algoritmasıdır.',
  descriptionParagraphs: [
    'Sıra İstatistikleri (Order Statistics), bir dizideki K. en küçük veya en büyük elemanın seçilmesi problemiyle ilgilenir. Bu işlemin en basit yolu diziyi sıralayıp K. indekse bakmaktır (O(n log n)). Ancak sıralama yapmadan daha hızlı seçim yapmak mümkündür.',
    'Quickselect algoritması, quicksort bölümleme mantığını kullanarak ortalama durumda O(n) sürede K. elemanı bulur. Ancak pivot kötü seçilirse en kötü durumda O(n^2) sürebilir.',
    'En Kötü Durumda Doğrusal K. Eleman (Worst-Case Linear Kth Element veya Median of Medians), diziyi 5\'erli alt gruplara bölerek bunların medyanlarını bulur. Ardından bu medyanların medyanını pivot olarak seçer. Bu sayede her adımda dizinin en az %30\'unun eleneceği garanti edilir ve en kötü durumda da O(n) çalışma süresi sağlanır.'
  ],
  sourceNotes: [
    'Aho: Worst-case linear time selection algorithm finds the median of medians as a pivot.',
    'DAA Notes: The Median of Medians partition guarantees a well-balanced split, achieving O(n) bound.'
  ],
  steps: [
    'Girdi dizisini 5 elemanlı alt dizilere böl.',
    'Her alt dizinin medyanını bul.',
    'Bulunan medyanlar dizisinin medyanını rekürsif olarak hesapla (bu değer pivotumuzdur).',
    'Diziyi bu pivot etrafında bölümlendir.',
    'Pivotun pozisyonuna göre aranan K. elemanın sol tarafta mı yoksa sağ tarafta mı olduğunu tespit et ve o tarafta rekürsif olarak aramayı sürdür.'
  ],
  pseudocode: `SELECT(A, k)
  if length(A) <= 5
    sort A and return A[k]
  Divide A into ceil(n/5) groups of 5 elements
  Find median of each group, let them be M
  pivot <- SELECT(M, length(M) / 2)
  Partition A into A1, A2 around pivot
  if k < length(A1)
    return SELECT(A1, k)
  else if k >= length(A1) + length(equals)
    return SELECT(A2, k - length(A1) - length(equals))
  else
    return pivot`,
  codeExamples: {
    typescript: `function medianOfMedians(arr: number[], k: number): number {
  if (arr.length <= 5) {
    arr.sort((a, b) => a - b);
    return arr[k];
  }

  const medians: number[] = [];
  for (let i = 0; i < arr.length; i += 5) {
    const group = arr.slice(i, i + 5);
    group.sort((a, b) => a - b);
    medians.push(group[Math.floor(group.length / 2)]);
  }

  const pivot = medianOfMedians(medians, Math.floor(medians.length / 2));
  
  const low: number[] = [];
  const equal: number[] = [];
  const high: number[] = [];

  for (const num of arr) {
    if (num < pivot) low.push(num);
    else if (num === pivot) equal.push(num);
    else high.push(num);
  }

  if (k < low.length) {
    return medianOfMedians(low, k);
  } else if (k < low.length + equal.length) {
    return pivot;
  } else {
    return medianOfMedians(high, k - low.length - equal.length);
  }
}`,
    python: `def median_of_medians(arr, k):
    if len(arr) <= 5:
        arr.sort()
        return arr[k]
        
    medians = []
    for i in range(0, len(arr), 5):
        group = arr[i:i+5]
        group.sort()
        medians.append(group[len(group)//2])
        
    pivot = median_of_medians(medians, len(medians)//2)
    
    low = [x for x in arr if x < pivot]
    equal = [x for x in arr if x == pivot]
    high = [x for x in arr if x > pivot]
    
    if k < len(low):
        return median_of_medians(low, k)
    elif k < len(low) + len(equal):
        return pivot
    else:
        return median_of_medians(high, k - len(low) - len(equal))`
  },
  demo: {
    kind: 'order-statistics',
    title: 'Sıra İstatistikleri / K. Eleman Demo',
    description: 'Sayıları ve aradığınız sırayı (K - sıfır indeksli) noktalı virgülle ayırın. Örnek: 12,3,5,7,4,19,26; 3',
    placeholder: '12,3,5,7,4,19,26; 3'
  },
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(n)',
  analysisTitle: 'Neden 5 Elemanlı Gruplar?',
  analysisPoints: [
    'Gruplar 3 elemanlı olsaydı, n/3 alt problem üzerinden O(n) garanti edilemez, zaman O(n log n)\'e çıkardı.',
    'Gruplar 7 elemanlı olsaydı, O(n) korunurdu ancak grup medyanlarını sıralama maliyeti daha yüksek olurdu.',
    'Matematiksel olarak 5 sayısı, doğrusal çalışma süresi sağlayan ve sabit çarpanı en düşük seviyede tutan en optimum değerdir.'
  ],
  advantages: [
    'En kötü durumda O(n) zaman garantisi vererek Quickselect\'in O(n^2) riskini ortadan kaldırır.',
    'Diziyi tamamen sıralamadan hedef elemanı bulduğu için O(n log n)\'den daha hızlıdır.'
  ],
  disadvantages: [
    'Rekürsif çağrılar ve 5\'li bölme işlemlerinden kaynaklanan büyük bir sabit çarpana (constant factor) sahiptir.',
    'Pratikte, rastgele pivotlu Quickselect algoritması genellikle bu yöntemden daha hızlı çalışır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Quick Sort',
      description: 'Benzer bölümleme (partitioning) mantığını kullanan sıralama algoritması.',
      href: '/algorithms/sorting/quick-sort'
    }
  ]
};

export const externalSortingContent: RemainingAlgorithmContent = {
  title: 'Harici Sıralama ve Birleştirme (External Sorting & Merging)',
  category: 'Sıralama Algoritmaları',
  categoryHref: '/algorithms/sorting',
  family: 'Sorting / External',
  difficulty: 'Zor',
  sources: ['Sedgewick'],
  summary: 'Ana belleğe (RAM) sığmayacak büyüklükteki verilerin disk blokları ve önbellek yığınları kullanılarak sıralanmasını sağlayan yöntemlerdir.',
  descriptionParagraphs: [
    'Harici Sıralama (External Sorting), bilgisayarın birincil belleğinde saklanamayacak kadar büyük olan verilerin sıralanması problemidir. Bu durumlarda veriler yavaş ikincil depolama birimlerinde (disklerde) saklanır ve sıralama işlemi özel stratejiler gerektirir.',
    'Sıralama-Birleştirme (Sort-Merge) yaklaşımı iki aşamadan oluşur: İlk aşamada, belleğe sığacak büyüklükte veri parçaları (run) okunur, bellek içi bir algoritma ile sıralanır ve diske geçici dosya olarak yazılır. İkinci aşamada ise bu sıralı alt dosyalar birleştirilir.',
    'Dengeli Çok Yollu Birleştirme (Balanced Multiway Merging), aynı anda birçok sıralı dosyayı tek bir sıralı dosya halinde birleştirerek disk erişimini minimumda tutar. Yedekli Seçim (Replacement Selection) ise bir min-heap öncelik kuyruğu kullanarak bellek boyutundan daha büyük (ortalama olarak bellek boyutunun iki katı) ilk sıralı parçalar üretmeyi sağlar, böylece birleştirme aşamasındaki geçiş sayısını azaltır.'
  ],
  sourceNotes: [
    'Sedgewick: Replacement selection generates runs that are about twice the size of main memory.',
    'Sedgewick: Multiway merging merges P sorted runs into a single run using a priority queue.'
  ],
  steps: [
    'Bellek kapasitesi kadar girdiyi oku.',
    'Replacement Selection ile bir min-heap kurup, diske sıralı eleman gönderirken yeni girdilerle yığını güncelleyerek olabildiğince uzun "run"lar oluştur.',
    'Üretilen tüm sıralı parçaları diske kaydet.',
    'Çok yollu birleştirme (multiway merge) ile bu geçici dosyaları bellek tampon sınırları içinde adım adım birleştirip tek bir sıralı çıktı elde et.'
  ],
  pseudocode: `REPLACEMENT-SELECTION(input_stream, memory_size)
  Read memory_size elements into min-heap H
  active_heap_size <- memory_size
  while active_heap_size > 0
    x <- POP-MIN(H)
    Write x to output_run
    if input_stream is not empty
      next_val <- READ(input_stream)
      if next_val >= x
        INSERT(H, next_val)
      else
        INSERT-INACTIVE(H, next_val)
        active_heap_size <- active_heap_size - 1
    else
      active_heap_size <- active_heap_size - 1
    if active_heap_size = 0 and inactive_elements exist
      RESET-HEAP-WITH-INACTIVE(H)
      active_heap_size <- memory_size
      Start new output_run`,
  codeExamples: {
    typescript: `class ReplacementSelectionSimulator {
  static generateRuns(input: number[], memSize: number): number[][] {
    const runs: number[][] = [];
    let currentRun: number[] = [];
    const heap: number[] = [];
    const deadSpace: number[] = [];

    let inputIdx = 0;
    // Belleği doldur
    while (inputIdx < input.length && heap.length < memSize) {
      heap.push(input[inputIdx++]);
    }
    heap.sort((a, b) => a - b); // Min heap simülasyonu

    while (heap.length > 0 || deadSpace.length > 0) {
      if (heap.length === 0) {
        // Yeni bir run başlat
        runs.push(currentRun);
        currentRun = [];
        heap.push(...deadSpace);
        deadSpace.length = 0;
        heap.sort((a, b) => a - b);
      }

      const val = heap.shift()!;
      currentRun.push(val);

      if (inputIdx < input.length) {
        const nextVal = input[inputIdx++];
        if (nextVal >= val) {
          heap.push(nextVal);
          heap.sort((a, b) => a - b);
        } else {
          deadSpace.push(nextVal);
        }
      }
    }
    if (currentRun.length > 0) {
      runs.push(currentRun);
    }
    return runs;
  }
}`,
    python: `import heapq

def replacement_selection(input_list, mem_size):
    runs = []
    current_run = []
    heap = []
    dead_space = []
    
    input_idx = 0
    while input_idx < len(input_list) and len(heap) < mem_size:
        heap.append(input_list[input_idx])
        input_idx += 1
    heapq.heapify(heap)
    
    while heap or dead_space:
        if not heap:
            runs.append(current_run)
            current_run = []
            heap = dead_space
            dead_space = []
            heapq.heapify(heap)
            
        val = heapq.heappop(heap)
        current_run.append(val)
        
        if input_idx < len(input_list):
            next_val = input_list[input_idx]
            input_idx += 1
            if next_val >= val:
                heapq.heappush(heap, next_val)
            else:
                dead_space.append(next_val)
                
    if current_run:
        runs.append(current_run)
    return runs`
  },
  demo: {
    kind: 'external-sorting',
    title: 'Harici Sıralama / Replacement Selection Demo',
    description: 'Sıralanacak veri kümesini ve simüle edilecek bellek boyutunu noktalı virgülle ayırın. Örnek: 29,14,35,15,88,11,9,40,7; 3',
    placeholder: '29,14,35,15,88,11,9,40,7; 3'
  },
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)'
  },
  spaceComplexity: 'O(m)',
  analysisTitle: 'Girdi Uzunluğu ve Geçiş Sayısı',
  analysisPoints: [
    'Disk erişimi (I/O) ana bellek erişiminden binlerce kat yavaş olduğundan, harici sıralamanın başarısı disk kafasının hareket sayısını en aza indirmekle ölçülür.',
    'Replacement Selection, ürettiği run uzunluklarını ortalama 2 * m yaptığı için, doğrudan bellek doldurup sıralayan yönteme göre geçici dosya sayısını yarı yarıya indirir.',
    'Bu da birleştirme (merge) aşamasındaki disk geçiş (pass) sayısını logaritmik olarak azaltır.'
  ],
  advantages: [
    'RAM kapasitesini aşan terabaytlarca boyutundaki verileri sıralayabilir.',
    'Disk erişimlerini sıralı okuma/yazma şeklinde yaparak performansı korur.'
  ],
  disadvantages: [
    'Çok fazla geçici dosya okuma/yazma işlemi yapar, diske bağımlıdır.',
    'Bellek içi sıralamalara göre oldukça yavaştır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Merge Sort',
      description: 'Harici sıralamanın birleştirme (merging) kısmında kullanılan temel algoritma.',
      href: '/algorithms/sorting/merge-sort'
    },
    {
      title: 'Heap Sort',
      description: 'Yedekli seçim aşamasında kullanılan min-heap yapısının temeli.',
      href: '/algorithms/sorting/heap-sort'
    }
  ]
};

export const simpleSortsContent: RemainingAlgorithmContent = {
  title: 'Basit / Yardımcı Sıralamalar (Simple / Helper Sorts)',
  category: 'Sıralama Algoritmaları',
  categoryHref: '/algorithms/sorting',
  family: 'Sorting / Basic',
  difficulty: 'Kolay',
  sources: ['Sedgewick'],
  summary: 'Çok küçük veri kümeleri için özel optimize edilmiş sıralama ağları (Sort3) ve basit dizin tabanlı sıralama (Linear Sort) yöntemleridir.',
  descriptionParagraphs: [
    'Basit Sıralamalar, genel amaçlı sıralama algoritmalarının oluşturduğu karmaşık döngü ve koşul yapılarından kaçınmak amacıyla çok küçük veri grupları için tasarlanmış basit şemalardır.',
    'Üç Eleman Sıralama (Sort3 veya Sorting Three Elements), 3 elemanlı bir girdiyi tam olarak en fazla 3 karşılaştırma ve minimum yer değiştirme ile sıralayan döngüsüz, sabit adımlı bir yapıdır. Bu tür algoritmalar quicksort gibi büyük algoritmaların taban durumlarını (base cases) optimize etmek için kullanılır.',
    'Doğrusal Sıralama (Linear Sort), anahtarları belirli ve dar bir aralıkta olan veya basit bir dizin eşlemesiyle ek yer kaplamadan yer değiştiren basit sıralama ağlarını tanımlar.'
  ],
  sourceNotes: [
    'Sedgewick: Sorting three elements requires at most 3 comparisons: compare 1-2, compare 2-3, and compare 1-2 again.',
    'Sedgewick: Fast tiny sorts are crucial for recursive sorting algorithms to avoid overhead of small arrays.'
  ],
  steps: [
    'Sort3 için: a[0] ve a[1]\'i karşılaştır, gerekirse yer değiştir.',
    'a[1] ve a[2]\'yi karşılaştır, gerekirse yer değiştir.',
    'Tekrar a[0] ve a[1]\'i karşılaştır, gerekirse yer değiştir.',
    'Linear Sort için: Basit bir iki döngülü yapı ile her elemanı sırayla tüm diğer elemanlarla karşılaştırarak yerleştir.'
  ],
  pseudocode: `SORT3(a, b, c)
  if a > b then swap(a, b)
  if b > c then swap(b, c)
  if a > b then swap(a, b)
  return (a, b, c)`,
  codeExamples: {
    typescript: `function sort3(arr: [number, number, number]): [number, number, number] {
  if (arr[0] > arr[1]) [arr[0], arr[1]] = [arr[1], arr[0]];
  if (arr[1] > arr[2]) [arr[1], arr[2]] = [arr[2], arr[1]];
  if (arr[0] > arr[1]) [arr[0], arr[1]] = [arr[1], arr[0]];
  return arr;
}

function linearSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}`,
    python: `def sort3(a, b, c):
    if a > b: a, b = b, a
    if b > c: b, c = c, b
    if a > b: a, b = b, a
    return a, b, c

def linear_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(i + 1, n):
            if arr[i] > arr[j]:
                arr[i], arr[j] = arr[j], arr[i]
    return arr`
  },
  demo: {
    kind: 'simple-sorts',
    title: 'Basit / Yardımcı Sıralamalar Demo',
    description: 'Sıralamak istediğiniz sayıları virgülle ayırarak girin. 3 eleman girilirse Sort3, daha fazla girilirse Linear Sort çalışır. Örnek: 9, 2, 5',
    placeholder: '9, 2, 5'
  },
  timeComplexity: {
    best: 'O(1) / O(n^2)',
    average: 'O(1) / O(n^2)',
    worst: 'O(1) / O(n^2)'
  },
  spaceComplexity: 'O(1)',
  analysisTitle: 'Taban Durum Optimizasyonu',
  analysisPoints: [
    'Büyük sıralama algoritmalarında (örneğin Merge Sort veya Quick Sort) alt dizinin boyutu çok küçüldüğünde (örn. n <= 3) rekürsif çağrıların maliyeti normal sıralama maliyetini aşar.',
    'Bu noktada Sort3 veya Sort2 gibi döngüsüz, sabit adımlı fonksiyonlar çağrılarak algoritma dallanması kesilir.',
    'Bu yöntem, hibrit sıralama algoritmalarında (TimSort, IntroSort) performansı %10-%20 oranında artırır.'
  ],
  advantages: [
    'Döngü (loop) kontrolleri ve dallanmalar içermediği için CPU boru hattını (pipeline) kesintiye uğratmaz.',
    'Çok küçük dizilerde son derece hızlıdır.'
  ],
  disadvantages: [
    'Büyük veri kümelerinde O(n^2) maliyetinden dolayı kesinlikle kullanılmamalıdır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Insertion Sort',
      description: 'Küçük veri kümelerinde hızlı çalışan bir diğer basit sıralama algoritması.',
      href: '/algorithms/sorting/insertion-sort'
    }
  ]
};
