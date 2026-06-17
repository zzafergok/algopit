import type { RemainingAlgorithmContent } from './types';

export const linearSearchContent: RemainingAlgorithmContent = {
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
};

export const kmpContent: RemainingAlgorithmContent = {
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
};
