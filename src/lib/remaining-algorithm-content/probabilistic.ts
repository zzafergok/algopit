import type { RemainingAlgorithmContent } from './types';

export const sieveOfEratosthenesContent: RemainingAlgorithmContent = {
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
    'Bu yöntem tek tek adaylar için bölünebilirlik testi yapmaktan farklıdır: aralıktaki bileşik sayıları doğrudan üretir ve işaretlenmeden kalan değerler asal olur.',
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
  isPrime[0] = false; isPrime[1] = false;
  for (let value = 2; value * value <= limit; value += 1) {
    if (!isPrime[value]) continue;
    for (let multiple = value * value; multiple <= limit; multiple += value) {
      isPrime[multiple] = false;
    }
  }
  return isPrime.map((prime, value) => (prime ? value : null)).filter((value): value is number => value !== null);
}`,
    python: `def sieve_of_eratosthenes(limit: int) -> list[int]:
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False
    value = 2
    while value * value <= limit:
        if is_prime[value]:
            for multiple in range(value * value, limit + 1, value): is_prime[multiple] = False
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
};

export const reservoirSamplingContent: RemainingAlgorithmContent = {
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
    'Vitterın çalışması bu problemi “N bilinmeyen kayıtlardan replacement olmadan n örnek seçme” olarak tanımlar ve reservoir algoritmalarının tek geçişli karakterini analiz eder.',
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
    if (randomIndex < k) { reservoir[randomIndex] = stream[index]; }
  }
  return reservoir;
}`,
    python: `import random
def reservoir_sample(stream: list, k: int) -> list:
    reservoir = stream[:k]
    for index in range(k, len(stream)):
        random_index = random.randint(0, index)
        if random_index < k: reservoir[random_index] = stream[index]
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
    'Rastgele sayı kalitesi sonucuun kalitesini etkiler.',
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
};
