import type { RemainingAlgorithmContent } from './types';

export const primalityTestContent: RemainingAlgorithmContent = {
  title: 'Primality Test (Asallık Testi)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Number Theory / Primality',
  difficulty: 'Kolay',
  sources: ['DSA'],
  summary: 'Bir sayının asal olup olmadığını sınayan temel ve optimize edilmiş bölünebilirlik testidir.',
  descriptionParagraphs: [
    'Primality Test, bir tam sayının asal olup olmadığını belirlemek için kullanılan matematiksel testtir. DSA notlarında en temel asallık testinin 2\'den başlayarak n-1\'e kadar bölme denemesi yaptığı, ancak asıl kontrolün sqrt(n) sınırına kadar yapılmasının yeterli olduğu açıklanır.',
    'Daha gelişmiş yöntemler büyük sayılarda Miller-Rabin gibi olasılıksal testleri kullansa da, deterministik deneme bölmesi (trial division) yaklaşımı küçük ve orta büyüklükteki sayılar için son derece hızlı ve güvenilirdir.'
  ],
  sourceNotes: [
    'DSA: Bir sayının asal olup olmadığını anlamak için 2\'den n-1\'e kadar bölme kontrolü.',
    'DSA: Optimizasyon olarak n sayısının kareköküne (sqrt(n)) kadar olan sayıları kontrol etmek yeterlidir.'
  ],
  steps: [
    'Sayı 1 veya daha küçükse asal değildir.',
    'Sayı 2 veya 3 ise asaldır.',
    'Sayı çiftse veya 3\'e bölünebiliyorsa asal değildir.',
    '5\'ten başlayarak ve 6\'şar artırarak (i ve i+2 için) sayının kareköküne kadar bölünebilirliği kontrol et.',
    'Hiçbirine bölünmüyorsa sayı asaldır.'
  ],
  pseudocode: `IS-PRIME(n)
  if n <= 1 return false
  if n <= 3 return true
  if n mod 2 = 0 or n mod 3 = 0 return false
  i <- 5
  while i * i <= n
    if n mod i = 0 or n mod (i + 2) = 0 return false
    i <- i + 6
  return true`,
  codeExamples: {
    typescript: `function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}`,
    python: `def is_prime(n: int) -> bool:
    if n <= 1: return False
    if n <= 3: return True
    if n % 2 == 0 or n % 3 == 0: return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0: return False
        i += 6
    return True`,
  },
  demo: {
    kind: 'primality-test',
    title: 'Primality Test Demo',
    description: 'Asallığını test etmek istediğiniz sayıyı girin. Örnek: 97',
    placeholder: '97',
  },
  timeComplexity: {
    best: 'O(1)',
    average: 'O(sqrt(n))',
    worst: 'O(sqrt(n))',
  },
  spaceComplexity: 'O(1)',
  analysisTitle: 'Bölme Sınırı Neden Kareköktür?',
  analysisPoints: [
    'Eğer n bir composite sayıysa, n = a * b şeklinde iki çarpana ayrılabilir.',
    'Eğer hem a hem de b karekök(n)\'den büyük olsaydı, a * b > n olurdu ki bu çelişkidir.',
    'Bu nedenle en az bir çarpan karekök(n) sınırına eşit veya küçüktür.'
  ],
  advantages: [
    'Ek bellek gerektirmez (O(1) space).',
    'Küçük ve orta büyüklükteki sayılarda deterministiktir.',
    'Uygulaması oldukça basittir.'
  ],
  disadvantages: [
    'Çok büyük sayılarda (örneğin kriptografik anahtarlarda) yavaş kalır.',
    'Bu gibi durumlar için olasılıksal testler (Miller-Rabin gibi) tercih edilmelidir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Sieve of Eratosthenes',
      description: 'Belirli bir limite kadar olan tüm asal sayıları eler.',
      href: '/algorithms/mathematical-algorithms/sieve-of-eratosthenes',
    }
  ],
};

export const baseConversionContent: RemainingAlgorithmContent = {
  title: 'Base Conversion (Taban Dönüşümü)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Arithmetic / Conversion',
  difficulty: 'Kolay',
  sources: ['DSA'],
  summary: 'Bir sayıyı 10 tabanından başka bir tabana (örneğin ikili taban - ToBinary) bölme-kalan yöntemiyle dönüştürür.',
  descriptionParagraphs: [
    'Base Conversion, sayıların farklı sayı sistemlerinde ifade edilmesini sağlar. DSA kaynağında ToBinary adıyla geçen ikili tabana dönüşüm işlemi, sayının sürekli 2\'ye bölünmesi ve kalanların tersten yazılması prensibine dayanır.',
    'Bu yaklaşım herhangi bir b tabanına genel dönüştürücü olarak genelleştirilebilir. Sayı sürekli b tabanına bölünür, kalanlar toplanır ve sayı 0 olana kadar devam edilir.'
  ],
  sourceNotes: [
    'DSA: ToBinary algoritması sayıyı sürekli 2\'ye bölerek kalanları toplar.',
    'DSA: Kalanların tersten yazılması için bir yığın (stack) yapısı kullanılabilir veya dizi ters çevrilebilir.'
  ],
  steps: [
    'Dönüştürülecek sayıyı (n) ve hedef tabanı (b) al.',
    'n sıfır ise sonuç "0"dır.',
    'n sıfırdan büyük olduğu sürece n\'in b\'ye bölümünden kalan değeri kaydet.',
    'n\'i b\'ye bölerek n\'i güncelle.',
    'Elde edilen kalanları tersten birleştirerek sonucu döndür.'
  ],
  pseudocode: `BASE-CONVERSION(n, b)
  if n = 0 return "0"
  result <- ""
  while n > 0
    rem <- n mod b
    result <- CONCAT(rem, result)
    n <- n / b
  return result`,
  codeExamples: {
    typescript: `function baseConversion(n: number, b: number): string {
  if (n === 0) return '0';
  if (b < 2 || b > 36) throw new Error('Base must be between 2 and 36');
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '', temp = Math.abs(n);
  while (temp > 0) {
    const rem = temp % b;
    result = digits[rem] + result;
    temp = Math.floor(temp / b);
  }
  return n < 0 ? '-' + result : result;
}`,
    python: `def base_conversion(n: int, b: int) -> str:
    if n == 0: return '0'
    if b < 2 or b > 36: raise ValueError('Base must be between 2 and 36')
    digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    result, temp = '', abs(n)
    while temp > 0:
        rem = temp % b
        result = digits[rem] + result
        temp = temp // b
    return '-' + result if n < 0 else result`,
  },
  demo: {
    kind: 'base-conversion',
    title: 'Base Conversion Demo',
    description: 'Sayıyı ve hedef tabanı noktalı verir. Örnek: 156; 2 veya 255; 16',
    placeholder: '156; 2',
  },
  timeComplexity: {
    best: 'O(log_b(n))',
    average: 'O(log_b(n))',
    worst: 'O(log_b(n))',
  },
  spaceComplexity: 'O(log_b(n))',
  analysisTitle: 'Taban Sınırları',
  analysisPoints: [
    'Dönüşüm işleminin basamak sayısı, sayının o tabandaki logaritmasıyla (log_b(n)) doğru orantılıdır.',
    'Kalanlar 9\'dan büyük olduğunda (örneğin 16\'lık tabanda) harfler kullanılır (A-Z).',
    'Bölme kalan yöntemi doğrudan bit tabanlı işlemlerle de hızlandırılabilir.'
  ],
  advantages: [
    'Basit aritmetik bölme işlemlerine dayanır.',
    'Tüm pozitif tam sayı tabanlarında çalışacak şekilde genelleştirilebilir.',
    'Bitişik olmayan sayı sistemleri arası dönüşüm için standart yöntemdir.'
  ],
  disadvantages: [
    'Negatif sayıları ve ondalıklı sayıları dönüştürmek için ek kurallar gerektirir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Stack',
      description: 'Kalanları ters çevirmek için yığın veri yapısı kullanılabilir.',
      href: '/algorithms/data-structures/stack',
    }
  ],
};
