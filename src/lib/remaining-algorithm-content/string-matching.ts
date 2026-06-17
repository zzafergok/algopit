import type { RemainingAlgorithmContent } from './types';

export const rabinKarpContent: RemainingAlgorithmContent = {
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
  const base = 256, prime = 1_000_000_007, patternLength = pattern.length;
  let highBase = 1, patternHash = 0, windowHash = 0;
  for (let index = 0; index < patternLength - 1; index += 1) {
    highBase = (highBase * base) % prime;
  }
  for (let index = 0; index < patternLength; index += 1) {
    patternHash = (patternHash * base + pattern.charCodeAt(index)) % prime;
    windowHash = (windowHash * base + text.charCodeAt(index)) % prime;
  }
  for (let start = 0; start <= text.length - patternLength; start += 1) {
    if (patternHash === windowHash && text.slice(start, start + patternLength) === pattern) {
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
    if not pattern: return 0
    if len(pattern) > len(text): return -1
    base, prime, m = 256, 1_000_000_007, len(pattern)
    high_base = pow(base, m - 1, prime)
    pattern_hash, window_hash = 0, 0
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
  timeComplexity: { best: 'O(n + m)', average: 'O(n + m)', worst: 'O(nm)' },
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
      description:
        'Failure tablosuyla metni geriye sarmadan doğrusal arama yapar.',
      href: '/algorithms/string-algorithms/kmp',
    },
    {
      title: 'Finite-state Pattern Matching',
      description: 'Deseni durum makinesi olarak modelleyerek geçişlerle arar.',
    },
    {
      title: 'Multiple String Searches',
      description:
        'Aynı metin üzerinde çok sayıda desen aramayı optimize eder.',
    },
  ],
};

export const bloomFilterContent: RemainingAlgorithmContent = {
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
    'False positive mümkündür çünkü farklı elemanlar aynı bitleri ayarlayabilir; false negative normal Bloom filter için mümkün değildir.',
  ],
  sourceNotes: [
    'Bloom filter referansı: false positive olabilir, false negative olmaz; elemanlar standart yapıda silinemez.',
    'NIST: false positive oranı m bit, n öğe ve k hash sayısına bağlıdır.',
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
  constructor(private size: number) { this.bits = Array(size).fill(false); }
  private hash(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) { hash = (hash * 31 + value.charCodeAt(i)) >>> 0; }
    return hash;
  }
  add(value: string) {
    for (const index of this.indexes(value)) { this.bits[index] = true; }
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
    python: `class BloomFilter:
    def __init__(self, size: int):
        self.size = size
        self.bits = [False] * size
    def _hash(self, value: str, salt: str = "") -> int:
        h = 0
        for char in (value + salt): h = (h * 31 + ord(char)) & 0xFFFFFFFF
        return h
    def add(self, value: str) -> None:
        for index in self._indexes(value): self.bits[index] = True
    def might_contain(self, value: str) -> bool:
        return all(self.bits[index] for index in self._indexes(value))
    def _indexes(self, value: str) -> list[int]:
        h1 = self._hash(value) % self.size
        h2 = self._hash(value, salt=":salt") % self.size
        if h2 == 0: h2 = 1
        return [h1, (h1 + h2) % self.size, (h1 + 2 * h2) % self.size]`,
  },
  demo: {
    kind: 'bloom-filter',
    title: 'Bloom Filter Demo',
    description:
      'Eklenecekleri ve sorguları noktalı virgülle ayırın. Örnek: alice,bob,carol; alice,dave',
    placeholder: 'alice,bob,carol; alice,dave',
  },
  timeComplexity: { best: 'O(k)', average: 'O(k)', worst: 'O(k)' },
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
      description: 'Kesin üyelik ve değer saklama sağlar.',
      href: '/algorithms/data-structures/hash-table',
    },
    {
      title: 'Counting Bloom Filter',
      description:
        'Bit yerine sayaç kullanarak silme işlemini destekleyen varyanttır.',
    },
    {
      title: 'Set Union/Intersection',
      description: 'Kesin set işlemleri için alternatif veri modeli sunar.',
    },
  ],
};
