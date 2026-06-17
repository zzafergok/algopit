import type { RemainingAlgorithmContent } from './types';

export const factorialContent: RemainingAlgorithmContent = {
  title: 'Factorial (Faktöriyel)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Arithmetic / Recursion',
  difficulty: 'Kolay',
  sources: ['DSA'],
  summary: 'Bir sayının faktöriyelini (1\'den n\'e kadar olan sayıların çarpımı) iteratif ve recursive yöntemlerle hesaplar.',
  descriptionParagraphs: [
    'Faktöriyel, pozitif bir tam sayının kendisinden küçük tüm pozitif tam sayılarla çarpımıdır. DSA notlarında, recursive yapının anlatımında klasik bir başlangıç örneği olarak sunulur.',
    'Recursive yöntem doğrudan matematiksel tanımı (`n * factorial(n - 1)`) takip eder. İteratif yöntem ise bir döngü kullanarak ara değerleri biriktirir ve fonksiyon çağrı yığını (call stack) maliyetini ortadan kaldırır. JavaScript\'te BigInt kullanımı gerekir.'
  ],
  sourceNotes: [
    'DSA: n! = n * (n-1)! tanımıyla recursive Factorial(n) fonksiyonu kurulumu.',
    'DSA: Büyük n değerlerinde stack overflow riskine karşı iteratif yöntemlerin tercih edilmesi.'
  ],
  steps: [
    'Sayı 0 veya 1 ise sonuç 1\'dir.',
    'Sayı negatif ise faktöriyeli tanımlı değildir (hata fırlat).',
    'Döngü veya recursion ile 2\'den n\'e kadar olan sayıları birbiriyle çarp.',
    'Elde edilen sonucu döndür.'
  ],
  pseudocode: `FACTORIAL-ITERATIVE(n)
  if n < 0 return error
  result <- 1
  for i <- 2 to n
    result <- result * i
  return result`,
  codeExamples: {
    typescript: `function factorial(n: number): bigint {
  if (n < 0) throw new Error('Faktöriyel negatif sayılar için tanımlı değildir.');
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i += 1n) { result *= i; }
  return result;
}`,
    python: `def factorial(n: int) -> int:
    if n < 0: raise ValueError('Faktöriyel negatif sayılar için tanımlı değildir.')
    result = 1
    for i in range(2, n + 1): result *= i
    return result`,
  },
  demo: {
    kind: 'factorial',
    title: 'Factorial Demo',
    description: 'Faktöriyelini hesaplamak istediğiniz tam sayıyı girin (en fazla 150). Örnek: 10',
    placeholder: '10',
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)',
  },
  spaceComplexity: 'O(1) (İteratif) / O(n) (Recursive çağrı yığını)',
  analysisTitle: 'Büyük Sayılar ve Taşma (Overflow)',
  analysisPoints: [
    'Faktöriyel fonksiyonu son derece hızlı büyür (Faktöriyel Büyüme).',
    'Standart double-precision float (JS Number) 170! değerinden sonrasını Infinity olarak kabul eder.',
    'Bu nedenle modern dillerde çok büyük sayıları tam doğrulukla saklamak için BigInt kullanılır.'
  ],
  advantages: [
    'Uygulaması son derece basittir.',
    'Permütasyon, kombinasyon ve olasılık hesaplamalarının temelidir.',
    'Döngü ve recursion kavramlarının anlaşılması için harika bir örnektir.'
  ],
  disadvantages: [
    'Çok hızlı büyümesi nedeniyle bellek ve sayı aralığı sınırlarını zorlar.',
    'Negatif sayılar veya tam sayı olmayan değerler için Gamma fonksiyonu gibi gelişmiş yaklaşımlar gerekir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Fibonacci Sequence',
      description: 'Benzer şekilde recursive veya DP ile çözülen sayı dizisidir.',
      href: '/algorithms/dynamic-programming/fibonacci',
    }
  ],
};

export const exponentiationContent: RemainingAlgorithmContent = {
  title: 'Exponentiation (Üs Alma / Hızlı Üs Alma)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Arithmetic / Fast Exponentiation',
  difficulty: 'Kolay',
  sources: ['Sedgewick'],
  summary: 'Bir taban sayının belirtilen üssünü böl-ve-fethet (Binary Exponentiation) yöntemiyle logaritmik zamanda hesaplar.',
  descriptionParagraphs: [
    'Üs alma işlemi, bir a sayısının n kere kendisiyle çarpılmasıdır (a^n). Sedgewick, naive yöntemin n adet çarpım yaparak O(n) zamanda çalıştığını, ancak üssün ikili (binary) temsilini kullanan hızlı üs alma yönteminin bunu O(log n) çarpıma indirdiğini anlatır.',
    'Algoritma, üssün tek veya çift olma durumuna göre tabanı karesiyle günceller veya sonucu tabanla çarpar. Bu yöntem, kriptografide özellikle büyük modüler üs alma işlemlerinde (a^n mod m) kritik öneme sahiptir.'
  ],
  sourceNotes: [
    'Sedgewick: a^n hesaplanmasında n tek ise a * a^(n-1), çift ise (a^(n/2))^2 indirgemesi.',
    'Sedgewick: O(log n) çarpım maliyetiyle çalışan iterative ve recursive akışlar.'
  ],
  steps: [
    'Üs (n) sıfır ise sonuç 1\'dir.',
    'Üs negatif ise tabanı çarpmaya göre tersine çevir (1/a) ve üssü pozitife dönüştür.',
    'n çift ise, tabanı karesiyle değiştir (a = a * a) ve üssü yarıya indir (n = n / 2).',
    'n tek ise, sonucu geçerli tabanla çarpar (result = result * a) ve üssü 1 azalt.',
    'n sıfır olana kadar döngüyü tekrarla.'
  ],
  pseudocode: `FAST-EXP(a, n)
  result <- 1
  base <- a
  exp <- n
  if exp < 0
    base <- 1 / base
    exp <- -exp
  while exp > 0
    if exp mod 2 = 1
      result <- result * base
      exp <- exp - 1
    base <- base * base
    exp <- exp / 2
  return result`,
  codeExamples: {
    typescript: `function fastExponentiation(a: number, n: number): number {
  if (n === 0) return 1;
  let result = 1, base = n < 0 ? 1 / a : a, exp = Math.abs(n);
  while (exp > 0) {
    if (exp % 2 === 1) { result *= base; exp -= 1; }
    base *= base;
    exp = Math.floor(exp / 2);
  }
  return result;
}`,
    python: `def fast_exponentiation(a: float, n: int) -> float:
    if n == 0: return 1.0
    result = 1.0
    base = 1.0 / a if n < 0 else a
    exp = abs(n)
    while exp > 0:
        if exp % 2 == 1:
            result *= base
            exp -= 1
        base *= base
        exp //= 2
    return result`,
  },
  demo: {
    kind: 'exponentiation',
    title: 'Exponentiation Demo',
    description: 'Taban ve üssü noktalı virgülle ayırın. Örnek: 2; 10 veya 3; 13',
    placeholder: '2; 10',
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },
  spaceComplexity: 'O(1)',
  analysisTitle: 'Neden O(log n) Çarpım?',
  analysisPoints: [
    'Her çift adımda üs n değerinden n/2 değerine düşürülür.',
    'Tek adımlarda ise üs 1 azaltılarak çift hale getirilir ve hemen bir sonraki adımda yarıya indirilir.',
    'Bu durum üssün bit uzunluğu kadar adım gerçekleştirileceğini garantiler, yani en fazla 2 * log_2(n) çarpım yapılır.'
  ],
  advantages: [
    'Büyük üs değerlerinde doğrusal yönteme göre muazzam hız farkı sağlar.',
    'Kriptografik algoritmaların (RSA gibi) modüler aritmetik kısmını uygulanabilir kılar.'
  ],
  disadvantages: [
    'Ondalıklı üslerde çalışmaz, sadece tam sayı üsleri için uygundur.',
    'Çok büyük taban veya üslerde sayısal taşma (overflow) yaşanabilir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Divide and Conquer',
      description: 'Problemi yarıya bölerek çözme stratejisinin temel matematiksel uygulamasıdır.',
      href: '/algorithms/divide-and-conquer/divide-and-conquer-method',
    }
  ],
};
