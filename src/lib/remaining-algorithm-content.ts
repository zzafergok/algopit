import type { CodeLanguage } from '@/components/common/algorithm-page-template';

export type RemainingAlgorithmKey =
  | 'linked-list'
  | 'stack'
  | 'queue'
  | 'hash-table'
  | 'fibonacci'
  | 'longest-common-subsequence'
  | 'bellman-ford'
  | 'sieve-of-eratosthenes'
  | 'bloom-filter'
  | 'reservoir-sampling'
  | 'genetic-algorithms'
  | 'simulated-annealing'
  | 'linear-search'
  | 'kmp'
  | 'rabin-karp'
  | 'fractional-knapsack';

export type RemainingAlgorithmContent = {
  title: string;
  category: string;
  categoryHref: string;
  family: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  sources: string[];
  summary: string;
  descriptionParagraphs: string[];
  sourceNotes: string[];
  steps: string[];
  pseudocode: string;
  codeExamples: Partial<Record<CodeLanguage, string>>;
  demo: {
    kind:
      | 'linear-search'
      | 'string-search'
      | 'fractional-knapsack'
      | 'operations'
      | 'fibonacci'
      | 'lcs'
      | 'bellman-ford'
      | 'sieve'
      | 'bloom-filter'
      | 'reservoir-sampling'
      | 'genetic-algorithm'
      | 'simulated-annealing';
    title: string;
    description: string;
    placeholder: string;
  };
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  analysisTitle: string;
  analysisPoints: string[];
  advantages: string[];
  disadvantages: string[];
  relatedAlgorithms: {
    title: string;
    description: string;
    href?: string;
  }[];
};

export const remainingAlgorithmContents: Record<
  RemainingAlgorithmKey,
  RemainingAlgorithmContent
> = {
  'linear-search': {
    title: 'Linear Search (Sequential Search)',
    category: 'Arama Algoritmaları',
    categoryHref: '/algorithms/searching',
    family: 'Searching / Sequential',
    difficulty: 'Kolay',
    sources: ['DSA', 'Sedgewick'],
    summary:
      'Bir koleksiyondaki elemanları baştan sona kontrol ederek hedef değerin ilk konumunu bulur.',
    descriptionParagraphs: [
      'Linear Search, kaynaklarda Sequential Search adıyla geçen en temel arama yöntemidir. Liste üzerinde ek bir düzen varsayımı yapmaz; hedef değer bulunana veya listenin sonuna gelinene kadar her eleman sırayla karşılaştırılır.',
      'Bu yaklaşım küçük listelerde, sıralanmamış verilerde ve tek seferlik aramalarda gereksiz ön işleme maliyeti oluşturmadığı için pratik kalır. Sedgewick bölümünde sentinel kullanımıyla sınır kontrolünün azaltılabileceği, DSA notlarında ise algoritmanın doğrudan O(n) tarama yaptığı anlatılır.',
    ],
    sourceNotes: [
      'DSA: eleman eşleşene veya liste sonuna ulaşılana kadar index artıran temel SequentialSearch akışı.',
      'Sedgewick: kayıt dizisi üzerinde sequential search ve sentinel kaydıyla arama maliyetini sadeleştirme.',
    ],
    steps: [
      'Aramaya listenin ilk indeksinden başla.',
      'Geçerli elemanı hedef değerle karşılaştır.',
      'Eşleşme varsa indeksi döndür.',
      'Eşleşme yoksa sonraki elemana geç.',
      'Liste biterse hedefin bulunmadığını belirtmek için -1 döndür.',
    ],
    pseudocode: `LINEAR-SEARCH(A, target)
  for i <- 0 to length(A) - 1
    if A[i] = target
      return i
  return -1`,
    codeExamples: {
      typescript: `function linearSearch<T>(items: T[], target: T): number {
  for (let index = 0; index < items.length; index += 1) {
    if (items[index] === target) {
      return index;
    }
  }

  return -1;
}`,
      javascript: `function linearSearch(items, target) {
  for (let index = 0; index < items.length; index += 1) {
    if (items[index] === target) {
      return index;
    }
  }

  return -1;
}`,
      python: `def linear_search(items, target):
    for index, item in enumerate(items):
        if item == target:
            return index
    return -1`,
      java: `public static <T> int linearSearch(T[] items, T target) {
    for (int index = 0; index < items.length; index++) {
        if (items[index].equals(target)) {
            return index;
        }
    }

    return -1;
}`,
    },
    demo: {
      kind: 'linear-search',
      title: 'Linear Search Demo',
      description:
        'Listeyi ve hedefi noktalı virgülle ayırın. Örnek: 8,3,11,5; 11',
      placeholder: '8,3,11,5; 11',
    },
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
    analysisTitle: 'Ne Zaman Kullanılır?',
    analysisPoints: [
      'Veri sıralı değilse ve ön işleme maliyeti istenmiyorsa.',
      'Koleksiyon küçükse veya yalnızca bir kez aranacaksa.',
      'Bağlı liste ya da akış gibi rastgele erişimin zayıf olduğu yapılarda.',
    ],
    advantages: [
      'Uygulaması ve doğrulaması çok basittir.',
      'Sıralama, indeks veya hash tablosu gerektirmez.',
      'İlk elemanlarda eşleşme varsa sabit zamanda biter.',
    ],
    disadvantages: [
      'Büyük veri kümelerinde her aramada doğrusal maliyet üretir.',
      'Çok sık arama yapılan yapılarda indeksli yöntemlere göre yavaştır.',
      'Sıralı verinin sağlayabileceği avantajları kullanmaz.',
    ],
    relatedAlgorithms: [
      {
        title: 'Binary Search',
        description: 'Sıralı dizilerde arama aralığını her adımda yarıya indirir.',
        href: '/algorithms/searching/binary-search',
      },
      {
        title: 'Interpolation Search',
        description: 'Yaklaşık düzgün dağılımlı sıralı verilerde tahmine dayalı konum seçer.',
      },
      {
        title: 'Hash Table',
        description: 'Çok sayıda arama için anahtarları hash fonksiyonuyla konumlandırır.',
        href: '/algorithms/data-structures/hash-table',
      },
    ],
  },
  kmp: {
    title: 'Knuth-Morris-Pratt String Search',
    category: 'Metin İşleme Algoritmaları',
    categoryHref: '/algorithms/string-algorithms',
    family: 'String / Pattern Matching',
    difficulty: 'Orta',
    sources: ['Sedgewick'],
    summary:
      'Desen içindeki tekrar bilgisini önceden çıkararak metin imlecini geri almadan desen arar.',
    descriptionParagraphs: [
      'Knuth-Morris-Pratt algoritması, kaba kuvvet aramada oluşan “false start” durumlarını desenin kendi yapısını kullanarak azaltır. Bir uyuşmazlık olduğunda metinde geriye dönmek yerine, desenin hangi önek/sonek bilgisinin korunabileceğini gösteren failure tablosuna geçilir.',
      'Sedgewick, KMP’nin özellikle kendini tekrar eden desenlerde ve büyük dosya/akış üzerinde değerli olduğunu vurgular: metin imleci geri alınmadığı için karmaşık tamponlama gerektirmez. Ön işlem desene bağlıdır; arama ise metin üzerinde tek yönlü ilerler.',
    ],
    sourceNotes: [
      'Sedgewick: mismatch sonrası text pointer geri alınmadan pattern pointer değerinin next/failure tablosuyla güncellenmesi.',
      'Sedgewick: next tablosunun deseni kendi üzerinde eşleştirerek hesaplanması ve yöntemin doğrusal olduğu.',
    ],
    steps: [
      'Desen için en uzun uygun önek-sonek uzunluklarını içeren failure tablosunu kur.',
      'Metin ve desen imleçlerini başlangıca al.',
      'Karakterler eşleşirse iki imleci de ilerlet.',
      'Uyuşmazlıkta desen imlecini failure tablosundaki değere indir.',
      'Desen tamamen eşleşirse başlangıç indeksini döndür; metin biterse -1 döndür.',
    ],
    pseudocode: `KMP-SEARCH(text, pattern)
  lps <- BUILD-LPS(pattern)
  i <- 0
  j <- 0
  while i < length(text)
    if text[i] = pattern[j]
      i <- i + 1
      j <- j + 1
      if j = length(pattern)
        return i - j
    else if j > 0
      j <- lps[j - 1]
    else
      i <- i + 1
  return -1`,
    codeExamples: {
      typescript: `function buildLps(pattern: string): number[] {
  const lps = Array(pattern.length).fill(0);
  let length = 0;
  let index = 1;

  while (index < pattern.length) {
    if (pattern[index] === pattern[length]) {
      length += 1;
      lps[index] = length;
      index += 1;
    } else if (length > 0) {
      length = lps[length - 1];
    } else {
      lps[index] = 0;
      index += 1;
    }
  }

  return lps;
}

function kmpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;

  const lps = buildLps(pattern);
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      textIndex += 1;
      patternIndex += 1;

      if (patternIndex === pattern.length) {
        return textIndex - patternIndex;
      }
    } else if (patternIndex > 0) {
      patternIndex = lps[patternIndex - 1];
    } else {
      textIndex += 1;
    }
  }

  return -1;
}`,
      python: `def build_lps(pattern):
    lps = [0] * len(pattern)
    length = 0
    index = 1

    while index < len(pattern):
        if pattern[index] == pattern[length]:
            length += 1
            lps[index] = length
            index += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            index += 1

    return lps

def kmp_search(text, pattern):
    if not pattern:
        return 0

    lps = build_lps(pattern)
    text_index = 0
    pattern_index = 0

    while text_index < len(text):
        if text[text_index] == pattern[pattern_index]:
            text_index += 1
            pattern_index += 1
            if pattern_index == len(pattern):
                return text_index - pattern_index
        elif pattern_index > 0:
            pattern_index = lps[pattern_index - 1]
        else:
            text_index += 1

    return -1`,
    },
    demo: {
      kind: 'string-search',
      title: 'KMP Demo',
      description:
        'Metin ve deseni | ile ayırın. Örnek: ababcabcabababd | ababd',
      placeholder: 'ababcabcabababd | ababd',
    },
    timeComplexity: {
      best: 'O(n + m)',
      average: 'O(n + m)',
      worst: 'O(n + m)',
    },
    spaceComplexity: 'O(m)',
    analysisTitle: 'Failure Tablosu',
    analysisPoints: [
      'm desen uzunluğu, n metin uzunluğudur.',
      'Ön işlem deseni O(m) zamanda tarar.',
      'Arama sırasında metin imleci geri alınmadığı için toplam tarama O(n) kalır.',
    ],
    advantages: [
      'En kötü durumda doğrusal zaman garantisi verir.',
      'Metni geriye sarmadan okuduğu için akış/dosya taramalarına uygundur.',
      'Tekrar eden desenlerde kaba kuvvet yaklaşımından belirgin şekilde daha stabildir.',
    ],
    disadvantages: [
      'Failure tablosu ön işlemi ve ek bellek gerektirir.',
      'Basit ve kısa desenlerde pratik kazanç sınırlı olabilir.',
      'Boyer-Moore gibi yöntemler geniş alfabelerde ortalamada daha az karakter inceleyebilir.',
    ],
    relatedAlgorithms: [
      {
        title: 'Rabin-Karp',
        description: 'Rolling hash ile eşit uzunluktaki pencereleri hızlı karşılaştırır.',
        href: '/algorithms/string-algorithms/rabin-karp',
      },
      {
        title: 'Boyer-Moore',
        description: 'Deseni sağdan sola tarayıp kötü karakter/iyi sonek atlamaları kullanır.',
      },
      {
        title: 'Brute-force String Search',
        description: 'Her olası başlangıç pozisyonunda deseni doğrudan karşılaştırır.',
      },
    ],
  },
  'rabin-karp': {
    title: 'Rabin-Karp String Search',
    category: 'Metin İşleme Algoritmaları',
    categoryHref: '/algorithms/string-algorithms',
    family: 'String / Rolling Hash',
    difficulty: 'Orta',
    sources: ['Sedgewick'],
    summary:
      'Desen ve metin pencerelerini rolling hash ile karşılaştırarak eşleşme adaylarını hızlı bulur.',
    descriptionParagraphs: [
      'Rabin-Karp algoritması, her m uzunluklu metin penceresini doğrudan karakter karakter karşılaştırmak yerine pencerelerin hash değerlerini karşılaştırır. Hash eşleşirse gerçek karakter karşılaştırması yapılarak çakışma olasılığı kontrol edilir.',
      'Sedgewick’in anlatımında yöntemin ana fikri, bir pencerenin hash değerinden bir sonraki pencerenin hash değerini modüler aritmetik ile üretmektir. Böylece her kaydırmada m karakteri yeniden hesaplamak yerine sabit maliyetli rolling hash güncellemesi yapılır.',
    ],
    sourceNotes: [
      'Sedgewick: h(k) = k mod q biçiminde büyük asal modla rolling hash kurulumu.',
      'Sedgewick: pratikte N + M zamana yakın davranış, fakat teorik çakışma doğrulaması nedeniyle kötü durumda NM olasılığı.',
    ],
    steps: [
      'Desen uzunluğu kadar ilk metin penceresinin ve desenin hash değerini hesapla.',
      'Hash değerleri eşitse pencere ile deseni doğrudan doğrula.',
      'Eşleşme yoksa en soldaki karakterin etkisini çıkar.',
      'Yeni sağ karakteri rolling hash değerine ekle.',
      'Tüm pencereler bitene kadar devam et.',
    ],
    pseudocode: `RABIN-KARP(text, pattern, base, prime)
  m <- length(pattern)
  patternHash <- hash(pattern[0..m-1])
  windowHash <- hash(text[0..m-1])
  highBase <- base^(m-1) mod prime
  for start <- 0 to length(text) - m
    if patternHash = windowHash and text[start..start+m-1] = pattern
      return start
    roll windowHash to next start
  return -1`,
    codeExamples: {
      typescript: `function rabinKarpSearch(text: string, pattern: string): number {
  if (pattern.length === 0) return 0;
  if (pattern.length > text.length) return -1;

  const base = 256;
  const prime = 1_000_000_007;
  const patternLength = pattern.length;
  let highBase = 1;
  let patternHash = 0;
  let windowHash = 0;

  for (let index = 0; index < patternLength - 1; index += 1) {
    highBase = (highBase * base) % prime;
  }

  for (let index = 0; index < patternLength; index += 1) {
    patternHash = (patternHash * base + pattern.charCodeAt(index)) % prime;
    windowHash = (windowHash * base + text.charCodeAt(index)) % prime;
  }

  for (let start = 0; start <= text.length - patternLength; start += 1) {
    if (
      patternHash === windowHash &&
      text.slice(start, start + patternLength) === pattern
    ) {
      return start;
    }

    if (start < text.length - patternLength) {
      const removed = text.charCodeAt(start) * highBase;
      const added = text.charCodeAt(start + patternLength);
      windowHash = (windowHash - removed) % prime;
      windowHash = (windowHash + prime) % prime;
      windowHash = (windowHash * base + added) % prime;
    }
  }

  return -1;
}`,
      python: `def rabin_karp_search(text, pattern):
    if not pattern:
        return 0
    if len(pattern) > len(text):
        return -1

    base = 256
    prime = 1_000_000_007
    m = len(pattern)
    high_base = pow(base, m - 1, prime)
    pattern_hash = 0
    window_hash = 0

    for index in range(m):
        pattern_hash = (pattern_hash * base + ord(pattern[index])) % prime
        window_hash = (window_hash * base + ord(text[index])) % prime

    for start in range(len(text) - m + 1):
        if pattern_hash == window_hash and text[start:start + m] == pattern:
            return start

        if start < len(text) - m:
            window_hash = (window_hash - ord(text[start]) * high_base) % prime
            window_hash = (window_hash * base + ord(text[start + m])) % prime

    return -1`,
    },
    demo: {
      kind: 'string-search',
      title: 'Rabin-Karp Demo',
      description:
        'Metin ve deseni | ile ayırın. Örnek: A STRING SEARCHING EXAMPLE | SEARCH',
      placeholder: 'A STRING SEARCHING EXAMPLE | SEARCH',
    },
    timeComplexity: {
      best: 'O(n + m)',
      average: 'O(n + m)',
      worst: 'O(nm)',
    },
    spaceComplexity: 'O(1)',
    analysisTitle: 'Rolling Hash Dengesi',
    analysisPoints: [
      'Büyük asal mod çakışma olasılığını düşürür.',
      'Hash eşleşmesi aday üretir; doğru sonuç için karakter doğrulaması gerekir.',
      'Aynı metinde çok sayıda sabit uzunluklu desen aranacaksa hash yaklaşımı genişletilebilir.',
    ],
    advantages: [
      'Rolling hash sayesinde pencereler sabit maliyetle güncellenir.',
      'Çoklu desen arama senaryolarına doğal olarak genişletilebilir.',
      'Ortalama durumda metin ve desen uzunluğuna doğrusal yakın çalışır.',
    ],
    disadvantages: [
      'Hash çakışmaları doğrulama maliyeti doğurur.',
      'Yanlış mod/base seçimi çakışma riskini artırabilir.',
      'Tek desenli kısa aramalarda KMP kadar deterministik garanti sunmaz.',
    ],
    relatedAlgorithms: [
      {
        title: 'KMP',
        description: 'Failure tablosuyla metni geriye sarmadan doğrusal arama yapar.',
        href: '/algorithms/string-algorithms/kmp',
      },
      {
        title: 'Finite-state Pattern Matching',
        description: 'Deseni durum makinesi olarak modelleyerek geçişlerle arar.',
      },
      {
        title: 'Multiple String Searches',
        description: 'Aynı metin üzerinde çok sayıda desen aramayı optimize eder.',
      },
    ],
  },
  'fractional-knapsack': {
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
      'DAA notlarında GreedyKnapsack akışı, p[i]/w[i] oranına göre sıralanmış nesneler üzerinde çözüm vektörünü önce sıfırlayıp kapasite dolana kadar tam nesne, son adımda ise kesirli nesne seçimiyle kurar. Bu greedy seçim fractional sürümde optimaldir; 0/1 sürümde aynı garanti yoktur.',
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
      typescript: `type Item = {
  name: string;
  value: number;
  weight: number;
};

function fractionalKnapsack(items: Item[], capacity: number) {
  const sortedItems = [...items].sort(
    (a, b) => b.value / b.weight - a.value / a.weight
  );

  let remaining = capacity;
  let totalValue = 0;
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
    sorted_items = sorted(
        items,
        key=lambda item: item["value"] / item["weight"],
        reverse=True,
    )

    remaining = capacity
    total_value = 0
    selected = []

    for item in sorted_items:
        if remaining <= 0:
            break

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
  },
  'linked-list': {
    title: 'Linked List',
    category: 'Veri Yapıları',
    categoryHref: '/algorithms/data-structures',
    family: 'Data Structures / Linear',
    difficulty: 'Kolay',
    sources: ['DSA', 'Sedgewick', 'Aho'],
    summary:
      'Düğümlerin veri ve sonraki düğüm referansı tuttuğu, dinamik boyutlu doğrusal veri yapısıdır.',
    descriptionParagraphs: [
      'DSA kaynağı linked list yapısını bir düğüm serisi olarak tanımlar: her düğüm en azından sonraki düğüme işaret eden bir referans taşır; son düğümde bu referans boştur. Head ve tail referansları tutulduğunda başa veya sona ekleme sabit zamanda yapılabilir.',
      'Arama ve rastgele konuma erişim için liste baştan sona dolaşılır. Bu yüzden linked list, sık uç ekleme/silme yapılan ve boyutu önceden bilinmeyen koleksiyonlarda güçlüdür; rastgele erişim gerektiren durumlarda dizi kadar uygun değildir.',
    ],
    sourceNotes: [
      'DSA: head/tail tutulduğunda geleneksel baş/son ekleme O(1), arama O(n).',
      'DSA: Contains algoritması head düğümünden başlayıp değer bulunana kadar Next referansını izler.',
      'Sedgewick: stack gibi yapıların linked-list temsiliyle push/pop işlemlerinin doğrudan bağlama üzerinden kurulabileceğini açıklar.',
    ],
    steps: [
      'Yeni değer için bir düğüm oluştur.',
      'Liste boşsa head ve tail referanslarını bu düğüme bağla.',
      'Liste boş değilse tail.Next referansını yeni düğüme bağla.',
      'Tail referansını yeni düğüme güncelle.',
      'Arama veya silme için head üzerinden sırayla ilerle.',
    ],
    pseudocode: `ADD(value)
  node <- new Node(value)
  if head = null
    head <- node
    tail <- node
  else
    tail.next <- node
    tail <- node`,
    codeExamples: {
      typescript: `class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  add(value: T) {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }

    this.tail!.next = node;
    this.tail = node;
  }

  contains(value: T) {
    let current = this.head;

    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }

    return false;
  }
}`,
    },
    demo: {
      kind: 'operations',
      title: 'Linked List Demo',
      description:
        'Komutları virgülle ayırın. Örnek: add:1, add:45, add:60, contains:45, remove:1',
      placeholder: 'add:1, add:45, add:60, contains:45, remove:1',
    },
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    analysisTitle: 'İşlem Maliyetleri',
    analysisPoints: [
      'Head/tail ile uç ekleme O(1) olur.',
      'Arama ve rastgele silme için predecessor bulmak gerektiğinden O(n) tarama gerekir.',
      'Her düğüm ek referans tuttuğu için diziye göre pointer maliyeti vardır.',
    ],
    advantages: [
      'Dinamik büyür ve dizi yeniden kopyalama maliyeti taşımaz.',
      'Başa veya sona ekleme head/tail ile sabit zamanda yapılabilir.',
      'Stack ve queue gibi yapıların temel temsili olarak kullanılabilir.',
    ],
    disadvantages: [
      'Rastgele erişim yoktur; indeksle erişim O(n) sürer.',
      'Her düğüm ek referans alanı kullanır.',
      'Ara konuma ekleme/silme predecessor araması gerektirebilir.',
    ],
    relatedAlgorithms: [
      {
        title: 'Stack',
        description: 'Linked list ile top düğümü üzerinden LIFO davranışı kurulabilir.',
        href: '/algorithms/data-structures/stack',
      },
      {
        title: 'Queue',
        description: 'Head ve tail referansları FIFO kuyruğu sabit zamanlı yapar.',
        href: '/algorithms/data-structures/queue',
      },
      {
        title: 'Tree Traversals',
        description: 'Bağlantılı düğüm fikrinin ağaç yapılarındaki genellemesidir.',
      },
    ],
  },
  stack: {
    title: 'Stack',
    category: 'Veri Yapıları',
    categoryHref: '/algorithms/data-structures',
    family: 'Data Structures / LIFO',
    difficulty: 'Kolay',
    sources: ['Sedgewick', 'DSA'],
    summary:
      'Son giren ilk çıkar prensibiyle çalışan, yalnızca tepedeki elemana erişim sağlayan veri yapısıdır.',
    descriptionParagraphs: [
      'Stack, çalışma zamanı çağrı yığınından algoritmalardaki explicit work-list kullanımına kadar birçok yerde karşımıza çıkar. Sedgewick recursion removal bölümünde, recursive çağrıların sakladığı bilgilerin explicit stack ile tutulabileceğini ve push/pop akışıyla işlenebileceğini gösterir.',
      'Linked-list temsili kullanıldığında push yeni düğümü top referansına bağlar, pop ise top değerini döndürüp top referansını bir sonraki düğüme taşır. Array temsili de mümkündür; temel davranış LIFO olmasıdır.',
    ],
    sourceNotes: [
      'Sedgewick: recursion removal için explicit stack kullanımı ve stack üzerinde iş parçalarının push/pop edilmesi.',
      'Sedgewick: linked-list temsilde push yeni node bağlar, pop top node değerini döndürüp pointer günceller.',
      'DSA: recursive çağrıların stack alanı tükettiğini ve iterative çözümlerin bunu kontrol ettiğini açıklar.',
    ],
    steps: [
      'Push işleminde yeni elemanı tepeye ekle.',
      'Pop işleminde tepedeki elemanı çıkar ve döndür.',
      'Peek işleminde tepedeki elemanı çıkarmadan oku.',
      'Boş yığında pop/peek için hata veya boş sonuç üret.',
    ],
    pseudocode: `PUSH(value)
  node <- new Node(value)
  node.next <- top
  top <- node

POP()
  if top = null return null
  value <- top.value
  top <- top.next
  return value`,
    codeExamples: {
      typescript: `class Stack<T> {
  private items: T[] = [];

  push(value: T) {
    this.items.push(value);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items.at(-1);
  }
}`,
    },
    demo: {
      kind: 'operations',
      title: 'Stack Demo',
      description:
        'Komutları virgülle ayırın. Örnek: push:10, push:12, peek, pop, push:9',
      placeholder: 'push:10, push:12, peek, pop, push:9',
    },
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(n)',
    analysisTitle: 'LIFO Kullanımı',
    analysisPoints: [
      'Push, pop ve peek tepe referansından çalıştığı için O(1) kabul edilir.',
      'Recursive algoritmaların explicit hale getirilmesinde stack doğal iş listesidir.',
      'Array temsilde kapasite büyütme anlık maliyet doğurabilir; linked-list temsilde düğüm maliyeti vardır.',
    ],
    advantages: [
      'Basit ve öngörülebilir LIFO davranışı sağlar.',
      'Undo, parsing, DFS ve recursion removal için uygundur.',
      'Temel işlemleri sabit zamanda yapılır.',
    ],
    disadvantages: [
      'Yalnızca tepedeki elemana doğrudan erişilebilir.',
      'Yanlış kullanımda stack overflow veya kontrolsüz büyüme görülebilir.',
      'Ortadaki elemanları aramak için ek yapı gerekir.',
    ],
    relatedAlgorithms: [
      {
        title: 'DFS',
        description: 'Derinlik öncelikli dolaşım recursive veya explicit stack ile yapılır.',
        href: '/algorithms/graph-algorithms/dfs',
      },
      {
        title: 'Queue',
        description: 'FIFO davranışıyla stackin tersine en eski elemanı işler.',
        href: '/algorithms/data-structures/queue',
      },
      {
        title: 'Topological Sort',
        description: 'DFS bitiş sırası ve stack fikriyle ilişkilidir.',
        href: '/algorithms/advanced-algorithms/topological-sort',
      },
    ],
  },
  queue: {
    title: 'Queue',
    category: 'Veri Yapıları',
    categoryHref: '/algorithms/data-structures',
    family: 'Data Structures / FIFO',
    difficulty: 'Kolay',
    sources: ['DSA', 'Sedgewick'],
    summary:
      'İlk giren ilk çıkar prensibiyle çalışan, elemanları geliş sırasına göre işleyen veri yapısıdır.',
    descriptionParagraphs: [
      'DSA kaynağı queue yapısını FIFO stratejisiyle açıklar: ilk eklenen eleman ilk servis edilir. Temel işlemler enqueue, dequeue ve peek/front olarak verilir.',
      'Standart queue, singly linked list ile verimli uygulanabilir. Tail üzerinden enqueue, head üzerinden dequeue yapılır; böylece uç işlemler sabit zamanda kalır. Arama ise linked list gibi O(n) sürer.',
    ],
    sourceNotes: [
      'DSA: Enqueue arka uca ekler, Dequeue ön uçtaki elemanı alıp siler, Peek ön elemanı silmeden okur.',
      'DSA: singly linked list ile queue implementasyonu O(1) insertion/deletion sağlar.',
      'Sedgewick: bazı non-recursive algoritmalarda stack yerine queue kullanılabilirliğini tartışır.',
    ],
    steps: [
      'Enqueue işleminde elemanı kuyruğun arkasına ekle.',
      'Dequeue işleminde öndeki elemanı çıkar ve döndür.',
      'Peek işleminde öndeki elemanı çıkarmadan oku.',
      'Kuyruk boşsa dequeue/peek için boş sonuç üret.',
    ],
    pseudocode: `ENQUEUE(value)
  node <- new Node(value)
  if tail = null
    head <- node
    tail <- node
  else
    tail.next <- node
    tail <- node

DEQUEUE()
  if head = null return null
  value <- head.value
  head <- head.next
  if head = null tail <- null
  return value`,
    codeExamples: {
      typescript: `class Queue<T> {
  private items: T[] = [];

  enqueue(value: T) {
    this.items.push(value);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }
}`,
    },
    demo: {
      kind: 'operations',
      title: 'Queue Demo',
      description:
        'Komutları virgülle ayırın. Örnek: enqueue:10, enqueue:12, dequeue, peek, enqueue:9',
      placeholder: 'enqueue:10, enqueue:12, dequeue, peek, enqueue:9',
    },
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(n)',
    analysisTitle: 'FIFO Kullanımı',
    analysisPoints: [
      'Linked-list temsilde enqueue ve dequeue O(1) yapılır.',
      'BFS, iş kuyruğu, event processing ve scheduler senaryolarında doğal modeldir.',
      'Arama işlemi sırayı bozmadığı sürece doğrusal tarama gerektirir.',
    ],
    advantages: [
      'Geliş sırasını koruyan adil bir işleme modeli sunar.',
      'BFS ve seviye tabanlı işlemler için temel veri yapısıdır.',
      'Doğru temsil ile temel uç işlemleri sabit zamanda kalır.',
    ],
    disadvantages: [
      'Ortadaki elemana doğrudan erişim sağlamaz.',
      'Array üzerinde shift kullanımı bazı dillerde O(n) olabilir.',
      'Öncelikli işleme gerekiyorsa priority queue gerekir.',
    ],
    relatedAlgorithms: [
      {
        title: 'BFS',
        description: 'Seviye seviye graf dolaşımı için queue kullanır.',
        href: '/algorithms/graph-algorithms/bfs',
      },
      {
        title: 'Priority Queue Operations',
        description: 'FIFO yerine öncelik karşılaştırmasına göre öndeki elemanı seçer.',
      },
      {
        title: 'Stack',
        description: 'LIFO davranışıyla queue modelinin tamamlayıcısıdır.',
        href: '/algorithms/data-structures/stack',
      },
    ],
  },
  'hash-table': {
    title: 'Hash Table',
    category: 'Veri Yapıları',
    categoryHref: '/algorithms/data-structures',
    family: 'Data Structures / Hashing',
    difficulty: 'Orta',
    sources: ['Aho', 'DSA', 'Sedgewick'],
    summary:
      'Anahtarları hash fonksiyonuyla kovaya dönüştürerek ortalama sabit zamanlı sözlük işlemleri sağlar.',
    descriptionParagraphs: [
      'Aho kitabı hashing tekniğini dictionary işlemleri için ortalama sabit zaman sağlayan bir temsil olarak açıklar. İki temel yaklaşım vardır: open/external hashing kovaların listeler tuttuğu chaining modelidir; closed hashing ise elemanları bucket tablosunun içinde tutar.',
      'DSA kaynağı unordered set implementasyonu için hash table kullanımını önerir; çünkü üyelik kontrolü ve ekleme hızlı olmalıdır. Performans, hash fonksiyonunun dağılımına, kova sayısına ve çakışma çözme stratejisine bağlıdır.',
    ],
    sourceNotes: [
      'Aho: hashing dictionary operation başına ortalama constant time hedefler.',
      'Aho: open hashing kovalar içinde listeler kullanır; closed hashing tablonun içinde probe eder.',
      'DSA: unordered set için hash table, O(1) insertion ve O(1)e yaklaşan lookup sağlar.',
    ],
    steps: [
      'Anahtarı hash fonksiyonundan geçir.',
      'Hash değerini tablo boyutuna göre kova indeksine indir.',
      'Kova boşsa anahtar-değer çiftini yerleştir.',
      'Çakışma varsa chaining veya probing stratejisini uygula.',
      'Aramada aynı hash ve aynı çakışma stratejisiyle anahtarı bul.',
    ],
    pseudocode: `PUT(key, value)
  index <- hash(key) mod bucketCount
  for entry in buckets[index]
    if entry.key = key
      entry.value <- value
      return
  append (key, value) to buckets[index]`,
    codeExamples: {
      typescript: `class HashTable {
  private buckets: Array<Array<[string, string]>>;

  constructor(size = 16) {
    this.buckets = Array.from({ length: size }, () => []);
  }

  set(key: string, value: string) {
    const bucket = this.buckets[this.hash(key)];
    const existing = bucket.find((entry) => entry[0] === key);

    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }

  get(key: string) {
    return this.buckets[this.hash(key)].find((entry) => entry[0] === key)?.[1];
  }

  private hash(key: string) {
    return [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0) %
      this.buckets.length;
  }
}`,
    },
    demo: {
      kind: 'operations',
      title: 'Hash Table Demo',
      description:
        'Komutları virgülle ayırın. Örnek: put:alice, put:carol, get:alice, remove:carol',
      placeholder: 'put:alice, put:carol, get:alice, remove:carol',
    },
    timeComplexity: {
      best: 'O(1)',
      average: 'O(1)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(n)',
    analysisTitle: 'Çakışma ve Yük Faktörü',
    analysisPoints: [
      'Ortalama O(1) davranış iyi dağılan hash fonksiyonuna ve düşük yük faktörüne bağlıdır.',
      'Chaining modelinde aynı kovaya düşen anahtarlar liste içinde tutulur.',
      'Closed hashing modelinde probing ve silme işaretleri dikkat ister.',
    ],
    advantages: [
      'Sözlük, set ve üyelik kontrolünde çok hızlıdır.',
      'Open hashing ile çakışmalar anlaşılır şekilde yönetilir.',
      'Yeniden boyutlandırma ile performans korunabilir.',
    ],
    disadvantages: [
      'Kötü hash dağılımı performansı doğrusal zamana düşürebilir.',
      'Sıralı dolaşım veya minimum eleman bulma için uygun değildir.',
      'Silme ve yeniden boyutlandırma uygulama ayrıntısı gerektirir.',
    ],
    relatedAlgorithms: [
      {
        title: 'Separate Chaining',
        description: 'Çakışmaları kova içi listeyle çözer.',
        href: '/algorithms/data-structures/separate-chaining',
      },
      {
        title: 'Open Addressing',
        description: 'Çakışma durumunda tablo içinde alternatif konum arar.',
        href: '/algorithms/data-structures/open-addressing',
      },
      {
        title: 'Trie',
        description: 'String anahtarlar için prefix tabanlı alternatif sözlük yapısıdır.',
        href: '/algorithms/data-structures/trie',
      },
    ],
  },
  fibonacci: {
    title: 'Fibonacci Sequence',
    category: 'Dinamik Programlama',
    categoryHref: '/algorithms/dynamic-programming',
    family: 'Dynamic Programming / Numeric',
    difficulty: 'Kolay',
    sources: ['DSA', 'Sedgewick'],
    summary:
      'Her terimi kendinden önceki iki terimin toplamı olan diziyi recursive veya tabulation ile hesaplar.',
    descriptionParagraphs: [
      'DSA kaynağı Fibonacci algoritmasını recursion örneği olarak verir: n değeri taban durumdaysa doğrudan döndürülür, aksi halde Fibonacci(n-1) ve Fibonacci(n-2) çağrılır. Aynı kaynak bu recursive sürümün çok hızlı büyüyen çağrı ağacı nedeniyle verimsiz olduğunu özellikle vurgular.',
      'Dinamik programlama yaklaşımı, aynı alt problemleri tekrar tekrar çözmek yerine önceki iki değeri saklayarak ilerler. Bu sayede exponential recursive maliyet O(n) zamana ve O(1) alana indirilebilir.',
    ],
    sourceNotes: [
      'DSA: recursive Fibonacci(n-1) + Fibonacci(n-2) yapısı ve iki recursive çağrı nedeniyle maliyet uyarısı.',
      'DSA: iterative çözümlerin recursion stack taşımadan daha hızlı çalıştığını belirtir.',
      'Sedgewick: recursion tekniğini ve gerektiğinde recursion removal yaklaşımını genel algoritma tasarımı bağlamında açıklar.',
    ],
    steps: [
      'n=0 ise 0, n=1 ise 1 döndür.',
      'Önceki iki Fibonacci değerini tut.',
      '2den n değerine kadar yeni terimi önceki iki terimin toplamı olarak hesapla.',
      'Her adımda önceki değerleri kaydır.',
      'ninci terimi döndür.',
    ],
    pseudocode: `FIBONACCI(n)
  if n <= 1 return n
  prev <- 0
  curr <- 1
  for i <- 2 to n
    next <- prev + curr
    prev <- curr
    curr <- next
  return curr`,
    codeExamples: {
      typescript: `function fibonacci(n: number): number {
  if (n < 0) {
    throw new Error('n must be non-negative');
  }

  if (n <= 1) {
    return n;
  }

  let previous = 0;
  let current = 1;

  for (let index = 2; index <= n; index += 1) {
    const next = previous + current;
    previous = current;
    current = next;
  }

  return current;
}`,
    },
    demo: {
      kind: 'fibonacci',
      title: 'Fibonacci Demo',
      description: '0 ile 50 arasında bir n değeri girin. Örnek: 10',
      placeholder: '10',
    },
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
    },
    spaceComplexity: 'O(1)',
    analysisTitle: 'Recursive ve Iterative Farkı',
    analysisPoints: [
      'Naive recursive sürüm aynı alt problemleri tekrar hesaplar.',
      'Tabulation/iterative sürüm yalnızca önceki iki değeri tutarak ilerler.',
      'Büyük n için sayı taşması veya BigInt ihtiyacı ayrıca değerlendirilmelidir.',
    ],
    advantages: [
      'Dinamik programlama fikrini küçük ve anlaşılır bir örnekle gösterir.',
      'Iterative sürüm O(1) ek alanla çalışır.',
      'Memoization ve tabulation farkını anlatmak için uygundur.',
    ],
    disadvantages: [
      'Naive recursion pratikte hızla kullanılmaz hale gelir.',
      'Büyük n değerlerinde standart sayı tipleri taşabilir.',
      'Tek başına gerçek dünya optimizasyon problemi değildir, öğretici örnektir.',
    ],
    relatedAlgorithms: [
      {
        title: 'Dynamic Programming Method',
        description: 'Alt problem sonuçlarını saklayarak tekrar hesaplamayı azaltır.',
        href: '/algorithms/dynamic-programming/dynamic-programming-method',
      },
      {
        title: '0/1 Knapsack',
        description: 'DP tablosu ile karar problemini optimize eder.',
        href: '/algorithms/dynamic-programming/knapsack',
      },
      {
        title: 'Matrix-chain Multiplication',
        description: 'Alt yapı maliyetlerini tablo üzerinde birleştiren DP problemidir.',
      },
    ],
  },
  'longest-common-subsequence': {
    title: 'Longest Common Subsequence',
    category: 'Dinamik Programlama',
    categoryHref: '/algorithms/dynamic-programming',
    family: 'Dynamic Programming / Sequence',
    difficulty: 'Orta',
    sources: ['Aho'],
    summary:
      'İki dizide aynı sırayı koruyan, bitişik olmak zorunda olmayan en uzun ortak alt diziyi bulur.',
    descriptionParagraphs: [
      'Aho kitabı LCS problemini, bir diziden sıfır veya daha fazla eleman silerek elde edilen subsequence kavramıyla tanımlar. İki dizi için LCS, her ikisinin de subsequencei olan en uzun dizidir.',
      'Kaynak, UNIX diff komutunun dosya satırlarını öğe kabul ederek LCS fikrinden yararlandığını anlatır. Klasik DP çözümü O(nm) tablo kurar; Aho ayrıca tekrar sayısı az olduğunda set/merge-split temelli daha özel bir yaklaşımı tartışır.',
    ],
    sourceNotes: [
      'Aho: LCS, iki dizinin ortak subsequencei olan en uzun dizidir.',
      'Aho: diff komutu satır bazlı karşılaştırmada LCS fikrini kullanır.',
      'Aho: genel çözümler O(n^2) sınıfında; özel yaklaşım eşleşme sayısı p üzerinden analiz edilir.',
    ],
    steps: [
      'Bir DP tablosu oluştur; satırlar birinci, sütunlar ikinci diziyi temsil eder.',
      'Karakterler eşitse çapraz hücreye 1 ekle.',
      'Eşit değilse üst ve sol hücreden büyük olanı al.',
      'Tablonun sağ alt hücresi LCS uzunluğunu verir.',
      'Gerçek diziyi üretmek için tablodan geriye doğru yürü.',
    ],
    pseudocode: `LCS(A, B)
  for i <- 1 to length(A)
    for j <- 1 to length(B)
      if A[i-1] = B[j-1]
        dp[i][j] <- dp[i-1][j-1] + 1
      else
        dp[i][j] <- max(dp[i-1][j], dp[i][j-1])
  return dp[length(A)][length(B)]`,
    codeExamples: {
      typescript: `function lcs(a: string, b: string): string {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  let i = a.length;
  let j = b.length;
  const result: string[] = [];

  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift(a[i - 1]);
      i -= 1;
      j -= 1;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i -= 1;
    } else {
      j -= 1;
    }
  }

  return result.join('');
}`,
    },
    demo: {
      kind: 'lcs',
      title: 'LCS Demo',
      description: 'İki diziyi | ile ayırın. Örnek: ABCBDAB | BDCABA',
      placeholder: 'ABCBDAB | BDCABA',
    },
    timeComplexity: {
      best: 'O(nm)',
      average: 'O(nm)',
      worst: 'O(nm)',
    },
    spaceComplexity: 'O(nm)',
    analysisTitle: 'Tablo ve Diff Bağlantısı',
    analysisPoints: [
      'Klasik DP çözümü her prefix çifti için en iyi uzunluğu saklar.',
      'Satır bazlı metin karşılaştırmada değişmeyen satırlar LCS olarak yorumlanabilir.',
      'Bellek O(nm) iken yalnız uzunluk gerekiyorsa iki satırlı optimizasyon yapılabilir.',
    ],
    advantages: [
      'Dizi karşılaştırma ve diff problemlerini doğal şekilde modeller.',
      'Klasik DP çözümü deterministik ve anlaşılırdır.',
      'Gerçek ortak diziyi tablodan geri yürüyerek üretir.',
    ],
    disadvantages: [
      'Büyük dizilerde O(nm) bellek ve zaman maliyeti yüksektir.',
      'Birden fazla geçerli LCS olabilir; tek sonuç tüm alternatifleri göstermez.',
      'Uzun satır/metin öğelerinde karşılaştırma maliyeti ayrıca büyüyebilir.',
    ],
    relatedAlgorithms: [
      {
        title: 'Dynamic Programming Method',
        description: 'LCS, prefix alt problemlerini tabloya döken temel DP örneğidir.',
        href: '/algorithms/dynamic-programming/dynamic-programming-method',
      },
      {
        title: 'Edit Distance',
        description: 'Diziler arası dönüşüm maliyetini tabloyla hesaplayan yakın problemdir.',
      },
      {
        title: 'Knapsack',
        description: 'DP tablosu kullanan başka bir klasik optimizasyon problemidir.',
        href: '/algorithms/dynamic-programming/knapsack',
      },
    ],
  },
  'bellman-ford': {
    title: 'Bellman-Ford',
    category: 'Graf Algoritmaları',
    categoryHref: '/algorithms/graph-algorithms',
    family: 'Graph / Shortest Path',
    difficulty: 'Zor',
    sources: ['DAA Notes'],
    summary:
      'Negatif ağırlıklı kenarlara izin vererek tek kaynaktan en kısa yolları bulur ve negatif çevrim tespit eder.',
    descriptionParagraphs: [
      'DAA notları, directed graph üzerinde single-source shortest path için Bellman-Ford ve Dijkstra yaklaşımlarını ayırır. Bellman-Ford negatif ağırlıklı kenarlara izin verir; eğer kaynaktan erişilebilir negatif çevrim varsa çözüm olmadığını bildirir.',
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

  const hasNegativeCycle = edges.some((edge) =>
    distance.get(edge.from)! + edge.weight < distance.get(edge.to)!
  );

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
  },
  'sieve-of-eratosthenes': {
    title: 'Sieve of Eratosthenes',
    category: 'Matematiksel Algoritmalar',
    categoryHref: '/algorithms/mathematical-algorithms',
    family: 'Number Theory / Prime Generation',
    difficulty: 'Kolay',
    sources: ['cp-algorithms', 'Wikipedia'],
    summary:
      '2den n değerine kadar asal sayıları, asal katlarını topluca eleyerek üreten klasik sayı teorisi algoritmasıdır.',
    descriptionParagraphs: [
      'Sieve of Eratosthenes, her adımda bulunan asal sayının katlarını composite olarak işaretler. Kritik optimizasyon, p asalına gelindiğinde işaretlemeye p * p değerinden başlamaktır; çünkü daha küçük katlar daha küçük asal çarpanlar tarafından zaten elenmiştir.',
      'Bu yöntem tek tek adaylar için bölünebilirlik testi yapmaktan farklıdır: aralıktaki bileşik sayıları doğrudan üretir ve işaretlenmeden kalan değerler asal olur. Bu yüzden belirli bir limite kadar tüm asal sayıları üretmek için pratik ve hızlıdır.',
    ],
    sourceNotes: [
      'cp-algorithms: klasik implementasyon p*p değerinden başlayarak p aralıklarla katları işaretler ve O(n log log n) zaman karmaşıklığı verir.',
      'Wikipedia: algoritmanın 2den n değerine kadar boolean dizi üzerinde asal kalan indeksleri döndürdüğünü açıklar.',
    ],
    steps: [
      '2den n değerine kadar tüm değerleri başlangıçta asal kabul et.',
      '0 ve 1 değerlerini asal değil olarak işaretle.',
      'p * p <= n olduğu sürece p değerini sırayla kontrol et.',
      'p hala asal ise p*p, p*p+p, p*p+2p ... katlarını composite yap.',
      'İşaretlenmeden kalan değerleri asal liste olarak döndür.',
    ],
    pseudocode: `SIEVE(n)
  isPrime[0..n] <- true
  isPrime[0] <- false
  isPrime[1] <- false
  for p <- 2 while p * p <= n
    if isPrime[p]
      for multiple <- p * p to n step p
        isPrime[multiple] <- false
  return all i where isPrime[i]`,
    codeExamples: {
      typescript: `function sieveOfEratosthenes(limit: number): number[] {
  const isPrime = Array(limit + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let value = 2; value * value <= limit; value += 1) {
    if (!isPrime[value]) continue;

    for (let multiple = value * value; multiple <= limit; multiple += value) {
      isPrime[multiple] = false;
    }
  }

  return isPrime
    .map((prime, value) => (prime ? value : null))
    .filter((value): value is number => value !== null);
}`,
      javascript: `function sieveOfEratosthenes(limit) {
  const isPrime = Array(limit + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let value = 2; value * value <= limit; value += 1) {
    if (!isPrime[value]) continue;

    for (let multiple = value * value; multiple <= limit; multiple += value) {
      isPrime[multiple] = false;
    }
  }

  const primes = [];
  for (let value = 2; value <= limit; value += 1) {
    if (isPrime[value]) {
      primes.push(value);
    }
  }
  return primes;
}`,
      python: `def sieve_of_eratosthenes(limit: int) -> list[int]:
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False

    value = 2
    while value * value <= limit:
        if is_prime[value]:
            for multiple in range(value * value, limit + 1, value):
                is_prime[multiple] = False
        value += 1

    return [val for val, prime in enumerate(is_prime) if prime]`,
    },
    demo: {
      kind: 'sieve',
      title: 'Sieve Demo',
      description: 'Bir üst limit girin. Örnek: 100',
      placeholder: '100',
    },
    timeComplexity: {
      best: 'O(n log log n)',
      average: 'O(n log log n)',
      worst: 'O(n log log n)',
    },
    spaceComplexity: 'O(n)',
    analysisTitle: 'Neden p*p ile Başlar?',
    analysisPoints: [
      'p değerinden küçük çarpanlara sahip katlar önceki asallar tarafından işaretlenmiştir.',
      'Aralık asal üretimi için trial division yaklaşımından daha uygundur.',
      'Çok büyük aralıklarda segmented sieve bellek kullanımını düşürür.',
    ],
    advantages: [
      'Bir limite kadar tüm asal sayıları hızlı üretir.',
      'Uygulaması basit ve doğrulaması kolaydır.',
      'p*p optimizasyonu gereksiz işaretlemeyi azaltır.',
    ],
    disadvantages: [
      'Tek bir büyük sayının asallığını test etmek için her zaman en uygun yöntem değildir.',
      'O(n) bellek tüketir.',
      'Çok büyük n için segmented veya bitset tabanlı optimizasyon gerekebilir.',
    ],
    relatedAlgorithms: [
      {
        title: 'GCD',
        description: 'Sayı teorisinde kullanılan temel Euclid algoritmasıdır.',
        href: '/algorithms/mathematical-algorithms/gcd',
      },
      {
        title: 'Linear Sieve',
        description: 'Her bileşik sayıyı en küçük asal çarpanıyla bir kez işaretleyen varyanttır.',
      },
      {
        title: 'Primality Test',
        description: 'Tek bir sayının asal olup olmadığını belirlemeye odaklanır.',
      },
    ],
  },
  'bloom-filter': {
    title: 'Bloom Filter',
    category: 'Diğer Algoritmalar',
    categoryHref: '/algorithms/misc-algorithms',
    family: 'Probabilistic Data Structures',
    difficulty: 'Orta',
    sources: ['Bloom 1970', 'NIST', 'Wikipedia'],
    summary:
      'Bir elemanın kümede kesinlikle olmadığını veya muhtemelen olduğunu söyleyen bellek verimli olasılıksal yapıdır.',
    descriptionParagraphs: [
      'Bloom filter, k adet hash fonksiyonuyla m bitlik bir dizi üzerinde çalışır. Ekleme sırasında her hash sonucu ilgili biti 1 yapar; sorgu sırasında tüm ilgili bitler 1 ise sonuç “muhtemelen var”, herhangi biri 0 ise “kesinlikle yok” olur.',
      'False positive mümkündür çünkü farklı elemanlar aynı bitleri ayarlayabilir; false negative normal Bloom filter için mümkün değildir. NIST analizi false-positive oranının m, n, k ve hash davranışına bağlı olduğunu ve klasik formülün dikkatle yorumlanması gerektiğini vurgular.',
    ],
    sourceNotes: [
      'Bloom filter referansı: false positive olabilir, false negative olmaz; elemanlar standart yapıda silinemez.',
      'NIST: false positive oranı m bit, n öğe ve k hash sayısına bağlıdır; gerçek uygulama performansını doğru modellemek önemlidir.',
    ],
    steps: [
      'm uzunluğunda tüm bitleri 0 olan bir dizi oluştur.',
      'Her eklenen eleman için k hash indeksi hesapla.',
      'Bu indekslerdeki bitleri 1 yap.',
      'Sorguda aynı k indeksi hesapla.',
      'Tüm bitler 1 ise muhtemel pozitif, en az biri 0 ise kesin negatif döndür.',
    ],
    pseudocode: `ADD(x)
  for each hash h
    bits[h(x) mod m] <- 1

CONTAINS(x)
  for each hash h
    if bits[h(x) mod m] = 0
      return definitely-not-present
  return possibly-present`,
    codeExamples: {
      typescript: `class BloomFilter {
  private bits: boolean[];

  constructor(private size: number) {
    this.bits = Array(size).fill(false);
  }

  private hash(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return hash;
  }

  add(value: string) {
    for (const index of this.indexes(value)) {
      this.bits[index] = true;
    }
  }

  mightContain(value: string): boolean {
    return this.indexes(value).every((index) => this.bits[index]);
  }

  private indexes(value: string): number[] {
    const h1 = this.hash(value) % this.size;
    const h2 = this.hash(value + ':salt') % this.size || 1;
    return [h1, (h1 + h2) % this.size, (h1 + 2 * h2) % this.size];
  }
}`,
      javascript: `class BloomFilter {
  constructor(size) {
    this.size = size;
    this.bits = Array(size).fill(false);
  }

  _hash(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return hash;
  }

  add(value) {
    for (const index of this.indexes(value)) {
      this.bits[index] = true;
    }
  }

  mightContain(value) {
    return this.indexes(value).every((index) => this.bits[index]);
  }

  indexes(value) {
    const h1 = this._hash(value) % this.size;
    const h2 = this._hash(value + ':salt') % this.size || 1;
    return [h1, (h1 + h2) % this.size, (h1 + 2 * h2) % this.size];
  }
}`,
      python: `class BloomFilter:
    def __init__(self, size: int):
        self.size = size
        self.bits = [False] * size

    def _hash(self, value: str, salt: str = "") -> int:
        h = 0
        for char in (value + salt):
            h = (h * 31 + ord(char)) & 0xFFFFFFFF
        return h

    def add(self, value: str) -> None:
        for index in self._indexes(value):
            self.bits[index] = True

    def might_contain(self, value: str) -> bool:
        return all(self.bits[index] for index in self._indexes(value))

    def _indexes(self, value: str) -> list[int]:
        h1 = self._hash(value) % self.size
        h2 = self._hash(value, salt=":salt") % self.size
        if h2 == 0:
            h2 = 1
        return [h1, (h1 + h2) % self.size, (h1 + 2 * h2) % self.size]`,
    },
    demo: {
      kind: 'bloom-filter',
      title: 'Bloom Filter Demo',
      description:
        'Eklenecekleri ve sorguları noktalı virgülle ayırın. Örnek: alice,bob,carol; alice,dave',
      placeholder: 'alice,bob,carol; alice,dave',
    },
    timeComplexity: {
      best: 'O(k)',
      average: 'O(k)',
      worst: 'O(k)',
    },
    spaceComplexity: 'O(m)',
    analysisTitle: 'False Positive Dengesi',
    analysisPoints: [
      'k hash sayısı arttıkça daha çok bit kontrol edilir ama bit dizisi daha hızlı dolar.',
      'm bit sayısı ve beklenen n öğe sayısı hedef false-positive oranına göre seçilmelidir.',
      'Silme gerekiyorsa counting Bloom filter gibi varyantlar gerekir.',
    ],
    advantages: [
      'Çok düşük bellekle hızlı üyelik testi sağlar.',
      'Negatif sonuç kesindir.',
      'Cache, ağ ve veritabanı ön kontrol senaryolarında kullanışlıdır.',
    ],
    disadvantages: [
      'Pozitif sonuç kesin değildir.',
      'Standart Bloom filter silme desteklemez.',
      'Kötü hash veya yanlış boyutlandırma false-positive oranını artırır.',
    ],
    relatedAlgorithms: [
      {
        title: 'Hash Table',
        description: 'Kesin üyelik ve değer saklama sağlar, ancak daha fazla bellek kullanabilir.',
        href: '/algorithms/data-structures/hash-table',
      },
      {
        title: 'Counting Bloom Filter',
        description: 'Bit yerine sayaç kullanarak silme işlemini destekleyen varyanttır.',
      },
      {
        title: 'Set Union/Intersection',
        description: 'Kesin set işlemleri için alternatif veri modeli sunar.',
      },
    ],
  },
  'reservoir-sampling': {
    title: 'Reservoir Sampling',
    category: 'Diğer Algoritmalar',
    categoryHref: '/algorithms/misc-algorithms',
    family: 'Randomized Algorithms / Sampling',
    difficulty: 'Orta',
    sources: ['Vitter 1985', 'ACM'],
    summary:
      'Uzunluğu önceden bilinmeyen bir akıştan tek geçişte eşit olasılıklı sabit boyutlu örneklem seçer.',
    descriptionParagraphs: [
      'Reservoir sampling, N değerinin bilinmediği veya akışın tamamını bellekte tutmanın mümkün olmadığı durumlarda kullanılır. İlk k eleman reservoir içine alınır; i. eleman için 1..i aralığında rastgele j seçilir ve j <= k ise reservoirdaki j. eleman değiştirilir.',
      'Vitterın çalışması bu problemi “N bilinmeyen kayıtlardan replacement olmadan n örnek seçme” olarak tanımlar ve reservoir algoritmalarının tek geçişli karakterini analiz eder. Basit Algorithm R O(N) akış adımıyla çalışır; daha gelişmiş Vitter algoritmaları atlama hesaplarıyla CPU maliyetini azaltır.',
    ],
    sourceNotes: [
      'Vitter 1985: N bilinmiyorken n kayıtlık rastgele örneklem seçme problemini ele alır.',
      'Vitter 1985: reservoir algoritmaları dosyayı/akışı sequential pass ile işler.',
      'ACM kaydı: Random Sampling with a Reservoir makalesi bu algoritma ailesinin temel referansıdır.',
    ],
    steps: [
      'İlk k elemanı reservoir içine koy.',
      'i = k+1 elemandan başlayarak akışı sırayla oku.',
      '1 ile i arasında rastgele j seç.',
      'j <= k ise reservoir[j] değerini yeni elemanla değiştir.',
      'Akış bittiğinde reservoir eşit olasılıklı örneklem olur.',
    ],
    pseudocode: `RESERVOIR-SAMPLE(stream, k)
  reservoir <- first k items
  i <- k
  for each item in remaining stream
    i <- i + 1
    j <- random integer in [1, i]
    if j <= k
      reservoir[j] <- item
  return reservoir`,
    codeExamples: {
      typescript: `function reservoirSample<T>(stream: T[], k: number): T[] {
  const reservoir = stream.slice(0, k);

  for (let index = k; index < stream.length; index += 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    if (randomIndex < k) {
      reservoir[randomIndex] = stream[index];
    }
  }

  return reservoir;
}`,
      javascript: `function reservoirSample(stream, k) {
  const reservoir = stream.slice(0, k);

  for (let index = k; index < stream.length; index += 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    if (randomIndex < k) {
      reservoir[randomIndex] = stream[index];
    }
  }

  return reservoir;
}`,
      python: `import random

def reservoir_sample(stream: list, k: int) -> list:
    reservoir = stream[:k]

    for index in range(k, len(stream)):
        random_index = random.randint(0, index)

        if random_index < k:
            reservoir[random_index] = stream[index]

    return reservoir`,
    },
    demo: {
      kind: 'reservoir-sampling',
      title: 'Reservoir Sampling Demo',
      description:
        'Akış elemanlarını ve örneklem boyutunu girin. Örnek: a,b,c,d,e,f,g,h; 3',
      placeholder: 'a,b,c,d,e,f,g,h; 3',
    },
    timeComplexity: {
      best: 'O(N)',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(k)',
    analysisTitle: 'Eşit Olasılık',
    analysisPoints: [
      'Her eleman final örneklemde k/N olasılıkla yer alır.',
      'Akış uzunluğu önceden bilinmeden çalışır.',
      'Tek geçiş ve O(k) bellek gerektirir.',
    ],
    advantages: [
      'Bilinmeyen uzunluklu akışlarda uygundur.',
      'Tüm veriyi bellekte tutmaz.',
      'Replacement olmadan sabit boyutlu örneklem üretir.',
    ],
    disadvantages: [
      'Rastgele sayı kalitesi sonucun kalitesini etkiler.',
      'Basit Algorithm R her akış elemanı için işlem yapar.',
      'Ağırlıklı örneklem gerekiyorsa farklı varyant gerekir.',
    ],
    relatedAlgorithms: [
      {
        title: 'Randomized Algorithms',
        description: 'Karar veya seçim sürecinde rastgelelik kullanan algoritma ailesidir.',
      },
      {
        title: 'Priority Queue Operations',
        description: 'Random-key tabanlı örnekleme varyantlarında kullanılabilir.',
      },
      {
        title: 'Bloom Filter',
        description: 'Akış üzerinde bellek verimli olasılıksal kontrol yapan başka bir yapıdır.',
        href: '/algorithms/misc-algorithms/bloom-filter',
      },
    ],
  },
  'genetic-algorithms': {
    title: 'Genetic Algorithms',
    category: 'Optimizasyon Algoritmaları',
    categoryHref: '/algorithms/optimization-algorithms',
    family: 'Metaheuristics / Evolutionary Search',
    difficulty: 'Zor',
    sources: ['Whitley Tutorial', 'MathWorks'],
    summary:
      'Popülasyon, fitness, seçim, crossover ve mutasyon adımlarıyla çözüm uzayında evrimsel arama yapan metasezgisel yöntemdir.',
    descriptionParagraphs: [
      'Whitley tutorial, genetic algorithms ailesini evrimden esinlenen hesaplama modelleri olarak tanımlar: potansiyel çözümler chromosome-like veri yapılarıyla kodlanır ve iyi çözümlere daha fazla üreme fırsatı verilir.',
      'Tipik akışta başlangıç popülasyonu üretilir, her birey fitness fonksiyonuyla değerlendirilir, daha iyi bireyler seçilir, crossover ile ebeveyn parçaları birleştirilir ve mutation ile çeşitlilik korunur. MathWorks dokümanı crossoverın iyi genleri birleştirdiğini, mutationın ise popülasyon çeşitliliğini artırdığını vurgular.',
    ],
    sourceNotes: [
      'Whitley: genetic algorithms population-based modeldir; çözümler chromosome-like yapılarda kodlanır.',
      'Whitley: daha iyi çözümler daha fazla reproduce şansı alır.',
      'MathWorks: crossover iyi genleri recombine eder, mutation diversity sağlar.',
    ],
    steps: [
      'Çözümü temsil eden chromosome formatını ve fitness fonksiyonunu tanımla.',
      'Başlangıç popülasyonu üret.',
      'Her bireyin fitness değerini hesapla.',
      'Seçim mekanizmasıyla ebeveynleri belirle.',
      'Crossover ve mutation ile yeni nesli üret.',
      'Durma koşulu sağlanana kadar döngüyü sürdür.',
    ],
    pseudocode: `GENETIC-ALGORITHM()
  population <- random chromosomes
  repeat until stopping condition
    evaluate fitness of population
    parents <- select fitter chromosomes
    children <- crossover(parents)
    mutate(children)
    population <- survivor selection(population, children)
  return best chromosome`,
    codeExamples: {
      typescript: `function getFitness(candidate: string, target: string): number {
  let score = 0;
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === target[i]) score++;
  }
  return score;
}

function crossover(parentA: string, parentB: string): string {
  const midpoint = Math.floor(Math.random() * parentA.length);
  return parentA.slice(0, midpoint) + parentB.slice(midpoint);
}

function mutate(candidate: string, mutationRate: number, alphabet: string): string {
  const chars = [...candidate];
  for (let i = 0; i < chars.length; i++) {
    if (Math.random() < mutationRate) {
      chars[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }
  return chars.join('');
}

function geneticAlgorithm(
  target: string,
  alphabet = '01',
  populationSize = 100,
  mutationRate = 0.01
): string {
  let population: string[] = Array.from({ length: populationSize }, () =>
    Array.from({ length: target.length }, () =>
      alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join('')
  );

  while (true) {
    population.sort((a, b) => getFitness(b, target) - getFitness(a, target));

    if (population[0] === target) {
      return population[0];
    }

    const nextGeneration: string[] = population.slice(
      0,
      Math.ceil(populationSize * 0.1)
    );

    while (nextGeneration.length < populationSize) {
      const parentA = population[Math.floor(Math.random() * (populationSize / 2))];
      const parentB = population[Math.floor(Math.random() * (populationSize / 2))];
      let child = crossover(parentA, parentB);
      child = mutate(child, mutationRate, alphabet);
      nextGeneration.push(child);
    }

    population = nextGeneration;
  }
}`,
      javascript: `function getFitness(candidate, target) {
  let score = 0;
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === target[i]) score++;
  }
  return score;
}

function crossover(parentA, parentB) {
  const midpoint = Math.floor(Math.random() * parentA.length);
  return parentA.slice(0, midpoint) + parentB.slice(midpoint);
}

function mutate(candidate, mutationRate, alphabet) {
  const chars = [...candidate];
  for (let i = 0; i < chars.length; i++) {
    if (Math.random() < mutationRate) {
      chars[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }
  return chars.join('');
}

function geneticAlgorithm(target, alphabet = '01', populationSize = 100, mutationRate = 0.01) {
  let population = Array.from({ length: populationSize }, () =>
    Array.from({ length: target.length }, () =>
      alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join('')
  );

  while (true) {
    population.sort((a, b) => getFitness(b, target) - getFitness(a, target));

    if (population[0] === target) {
      return population[0];
    }

    const nextGeneration = population.slice(0, Math.ceil(populationSize * 0.1));

    while (nextGeneration.length < populationSize) {
      const parentA = population[Math.floor(Math.random() * (populationSize / 2))];
      const parentB = population[Math.floor(Math.random() * (populationSize / 2))];
      let child = crossover(parentA, parentB);
      child = mutate(child, mutationRate, alphabet);
      nextGeneration.push(child);
    }

    population = nextGeneration;
  }
}`,
      python: `import random

def get_fitness(candidate: str, target: str) -> int:
    return sum(1 for c, t in zip(candidate, target) if c == t)

def crossover(parent_a: str, parent_b: str) -> str:
    midpoint = random.randint(0, len(parent_a) - 1)
    return parent_a[:midpoint] + parent_b[midpoint:]

def mutate(candidate: str, mutation_rate: float, alphabet: str) -> str:
    chars = list(candidate)
    for i in range(len(chars)):
        if random.random() < mutation_rate:
            chars[i] = random.choice(alphabet)
    return "".join(chars)

def genetic_algorithm(
    target: str,
    alphabet: str = "01",
    population_size: int = 100,
    mutation_rate: float = 0.01,
) -> str:
    population = [
        "".join(random.choice(alphabet) for _ in range(len(target)))
        for _ in range(population_size)
    ]

    while True:
        population.sort(key=lambda x: get_fitness(x, target), reverse=True)

        if population[0] == target:
            return population[0]

        next_generation = population[:max(1, int(population_size * 0.1))]

        while len(next_generation) < population_size:
            parent_a = random.choice(population[:population_size // 2])
            parent_b = random.choice(population[:population_size // 2])
            child = crossover(parent_a, parent_b)
            child = mutate(child, mutation_rate, alphabet)
            next_generation.append(child)

        population = next_generation`,
    },
    demo: {
      kind: 'genetic-algorithm',
      title: 'Genetic Algorithm Demo',
      description:
        'Hedef kromozomu ve başlangıç popülasyonunu girin. Örnek: 1111; 0000,1010,0101,1100',
      placeholder: '1111; 0000,1010,0101,1100',
    },
    timeComplexity: {
      best: 'O(G * P * F)',
      average: 'O(G * P * F)',
      worst: 'O(G * P * F)',
    },
    spaceComplexity: 'O(P * L)',
    analysisTitle: 'Parametreler',
    analysisPoints: [
      'G nesil sayısı, P popülasyon boyutu, F fitness hesaplama maliyetidir.',
      'Crossover ve mutation oranları problemden probleme ayarlanır.',
      'Sonuç garanti optimal değildir; iyi yaklaşık çözüm hedeflenir.',
    ],
    advantages: [
      'Karmaşık ve türevlenemeyen arama uzaylarında çalışabilir.',
      'Popülasyon çeşitliliği lokal optimumdan kaçmaya yardımcı olur.',
      'Kodlama ve fitness fonksiyonu değiştirildikçe farklı problemlere uyarlanır.',
    ],
    disadvantages: [
      'Optimal sonuç garantisi yoktur.',
      'Parametre seçimi hassastır.',
      'Fitness hesaplaması pahalıysa toplam maliyet yüksek olabilir.',
    ],
    relatedAlgorithms: [
      {
        title: 'Simulated Annealing',
        description: 'Tek aday çözüm üzerinde sıcaklık kontrollü olasılıksal arama yapar.',
        href: '/algorithms/optimization-algorithms/simulated-annealing',
      },
      {
        title: 'Local Search',
        description: 'Komşu çözümler arasında iyileştirme arayan metasezgisel temeldir.',
      },
      {
        title: '2-opt for TSP',
        description: 'TSP rotalarını lokal hamlelerle iyileştiren sezgisel yöntemdir.',
      },
    ],
  },
  'simulated-annealing': {
    title: 'Simulated Annealing',
    category: 'Optimizasyon Algoritmaları',
    categoryHref: '/algorithms/optimization-algorithms',
    family: 'Metaheuristics / Stochastic Optimization',
    difficulty: 'Zor',
    sources: ['Kirkpatrick 1983', 'MathWorks', 'Cornell Optimization Wiki'],
    summary:
      'Sıcaklık kontrollü olasılıkla kötü hamleleri de kabul ederek lokal optimumlardan kaçmaya çalışan stokastik optimizasyon yöntemidir.',
    descriptionParagraphs: [
      'Simulated annealing, metalurjide kontrollü soğutma fikrinden esinlenir. Başlangıçta sıcaklık yüksek tutulur ve arama daha geniş hareket eder; sıcaklık düştükçe kötü hamleleri kabul etme olasılığı azalır.',
      'Kirkpatrick, Gelatt ve Vecchi çalışması bu analojiyi büyük ve karmaşık optimizasyon problemleri için çerçeve haline getirir. Uygulamada bir state space, enerji/amaç fonksiyonu, komşu üretici, acceptance probability ve cooling schedule tanımlanır.',
    ],
    sourceNotes: [
      'Kirkpatrick 1983: annealing analojisi büyük ve karmaşık sistemlerin optimizasyonu için çerçeve sağlar.',
      'MathWorks: acceptance olasılığı delta ve sıcaklığa bağlıdır; sıcaklık küçüldükçe kabul olasılığı düşer.',
      'Cornell Optimization Wiki: SA büyük arama uzaylarında yaklaşık çözüm bulan probabilistic tekniktir.',
    ],
    steps: [
      'Başlangıç çözümü, sıcaklık ve soğutma planını belirle.',
      'Mevcut çözüme yakın rastgele bir aday üret.',
      'Aday daha iyiyse kabul et.',
      'Aday daha kötüyse exp(-delta/T) olasılığıyla kabul et.',
      'Sıcaklığı düşür ve durma koşuluna kadar devam et.',
    ],
    pseudocode: `SIMULATED-ANNEALING(state, temperature)
  best <- state
  while temperature > minimum
    candidate <- random neighbor(state)
    delta <- energy(candidate) - energy(state)
    if delta <= 0 or random() < exp(-delta / temperature)
      state <- candidate
      if energy(state) < energy(best)
        best <- state
    temperature <- cool(temperature)
  return best`,
    codeExamples: {
      typescript: `function acceptMove(delta: number, temperature: number): boolean {
  return delta <= 0 || Math.random() < Math.exp(-delta / temperature);
}

function simulatedAnnealing(start: number, target: number): number {
  let current = start;
  let best = current;
  let temperature = 10.0;
  const coolingRate = 0.95;

  while (temperature > 0.01) {
    const candidate = current + (Math.random() < 0.5 ? -1 : 1);
    const delta = Math.abs(target - candidate) - Math.abs(target - current);

    if (acceptMove(delta, temperature)) {
      current = candidate;
      if (Math.abs(target - current) < Math.abs(target - best)) {
        best = current;
      }
    }

    temperature *= coolingRate;
  }

  return best;
}`,
      javascript: `function acceptMove(delta, temperature) {
  return delta <= 0 || Math.random() < Math.exp(-delta / temperature);
}

function simulatedAnnealing(start, target) {
  let current = start;
  let best = current;
  let temperature = 10.0;
  const coolingRate = 0.95;

  while (temperature > 0.01) {
    const candidate = current + (Math.random() < 0.5 ? -1 : 1);
    const delta = Math.abs(target - candidate) - Math.abs(target - current);

    if (acceptMove(delta, temperature)) {
      current = candidate;
      if (Math.abs(target - current) < Math.abs(target - best)) {
        best = current;
      }
    }

    temperature *= coolingRate;
  }

  return best;
}`,
      python: `import math
import random

def accept_move(delta: float, temperature: float) -> bool:
    if delta <= 0:
        return True
    return random.random() < math.exp(-delta / temperature)

def simulated_annealing(start: float, target: float) -> float:
    current = start
    best = current
    temperature = 10.0
    cooling_rate = 0.95

    while temperature > 0.01:
        candidate = current + (-1 if random.random() < 0.5 else 1)
        delta = abs(target - candidate) - abs(target - current)

        if accept_move(delta, temperature):
            current = candidate
            if abs(target - current) < abs(target - best):
                best = current

        temperature *= cooling_rate

    return best`,
    },
    demo: {
      kind: 'simulated-annealing',
      title: 'Simulated Annealing Demo',
      description: 'Başlangıç ve hedef değerini girin. Örnek: 0; 37',
      placeholder: '0; 37',
    },
    timeComplexity: {
      best: 'O(I * C)',
      average: 'O(I * C)',
      worst: 'O(I * C)',
    },
    spaceComplexity: 'O(1)',
    analysisTitle: 'Sıcaklık ve Kabul',
    analysisPoints: [
      'I iterasyon sayısı, C aday/enerji hesaplama maliyetidir.',
      'Sıcaklık yüksekken kötü hamleler daha sık kabul edilir.',
      'Cooling schedule çok hızlıysa algoritma lokal optimumda takılabilir.',
    ],
    advantages: [
      'Lokal optimumlardan kaçmak için kötü hamleleri kontrollü kabul eder.',
      'Büyük ve ayrık arama uzaylarında uygulanabilir.',
      'Tek aday çözüm tuttuğu için bellek kullanımı düşüktür.',
    ],
    disadvantages: [
      'Optimal sonuç garantisi pratik zaman bütçesinde yoktur.',
      'Sıcaklık, komşuluk ve soğutma planı probleme duyarlıdır.',
      'Yavaş soğutma daha iyi sonuç verebilir ama maliyeti artırır.',
    ],
    relatedAlgorithms: [
      {
        title: 'Genetic Algorithms',
        description: 'Popülasyon tabanlı evrimsel arama yapar.',
        href: '/algorithms/optimization-algorithms/genetic-algorithms',
      },
      {
        title: 'Local Search',
        description: 'Komşu çözümler arasında iyileştirme arayan temel yöntemdir.',
      },
      {
        title: '2-opt for TSP',
        description: 'Komşuluk hamleleriyle rota iyileştiren sezgisel optimizasyon yaklaşımıdır.',
      },
    ],
  },
};
