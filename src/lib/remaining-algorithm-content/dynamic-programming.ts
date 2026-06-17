import type { RemainingAlgorithmContent } from './types';

export const fibonacciContent: RemainingAlgorithmContent = {
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
  if (n < 0) { throw new Error('n must be non-negative'); }
  if (n <= 1) { return n; }
  let previous = 0, current = 1;
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
};

export const longestCommonSubsequenceContent: RemainingAlgorithmContent = {
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
    'Eşist değilse üst ve sol hücreden büyük olanı al.',
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
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  let i = a.length, j = b.length;
  const result: string[] = [];
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift(a[i - 1]);
      i -= 1; j -= 1;
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
    'Gerçek ortak diziyi tablodan geri yürüyerek üreter.',
  ],
  disadvantages: [
    'Bölgesel veya çok uzun dizilerde O(nm) bellek ve zaman maliyeti yüksektir.',
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
};
