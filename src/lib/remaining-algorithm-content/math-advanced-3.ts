import type { RemainingAlgorithmContent } from './types';

export const numericalIntegrationContent: RemainingAlgorithmContent = {
  title: 'Sayısal İntegral (Numerical Integration / Quadrature)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Numerical Methods / Calculus',
  difficulty: 'Orta',
  sources: ['Sedgewick'],
  summary: 'Belirli bir integralin değerini hesaplamak için Dikdörtgen, Yamuk, Simpson, Romberg, Adaptif ve Spline yöntemlerini sunar.',
  descriptionParagraphs: [
    'Sayısal integral, analitik olarak integrali alınması zor olan veya yalnızca belirli noktalardaki değerleri bilinen fonksiyonların belirli integralini, yani eğrinin altında kalan alanı hesaplama yöntemidir. Bu yaklaşım mühendislik, fizik ve finans alanlarında yaygın olarak kullanılır.',
    'Bu modül yedi temel alt yöntemi içerir: Dikdörtgen Yöntemi, Yamuk Yöntemi, Simpson Yöntemi, Romberg İntegrasyonu, Adaptif İntegral, Spline İntegrali ve Sembolik İntegral.'
  ],
  sourceNotes: [
    'Sedgewick / Numerical Methods: Dikdörtgen ve Yamuk yöntemlerinin hatası O(h^2) mertebesindeyken, Simpson yöntemi O(h^4) hata payı sunar.',
    'Romberg yöntemi, ardışık Yamuk hesaplamalarını Richardson ekstrapolasyonuyla birleştirerek çok daha yüksek hassasiyetli sonuçlar üretir.',
    'Adaptif Kuadratür, fonksiyonun dik veya dalgalı olduğu yerlerde adım boyutunu küçültür, düz alanlarda ise adımı büyüterek hesaplama tasarrufu sağlar.'
  ],
  steps: [
    'Dikdörtgen: [a, b] aralığını N eşit parçaya böl. Her alt aralığın orta noktasındaki fonksiyon değerini toplayıp adım genişliği (h) ile çarp.',
    'Yamuk: Alt aralıkların uç noktalarındaki fonksiyon değerlerinin ortalamasını toplayıp adım genişliği ile çarp.',
    'Simpson: Parça sayısı N çift olmalıdır. Uç katsayıları 1, ara katsayıları sırasıyla 4 ve 2 olan ağırlıklı toplamı h/3 ile çarp.',
    'Romberg: R(i, 0) sütununu Yamuk yöntemiyle hesapla. Richardson ekstrapolasyonuyla tabloyu doldur.',
    'Adaptif: Simpson yöntemini kullanarak aralığı ve iki yarım aralığı hesapla. Fark toleranstan küçükse dur, büyükse rekürsif olarak çöz.'
  ],
  pseudocode: `TRAPEZOIDAL-RULE(f, a, b, n)
  h <- (b - a) / n
  sum <- 0.5 * (f(a) + f(b))
  for i <- 1 to n - 1
    sum <- sum + f(a + i * h)
  return sum * h
SIMPSON-RULE(f, a, b, n)
  h <- (b - a) / n
  sum <- f(a) + f(b)
  for i <- 1 to n - 1
    sum <- sum + (i mod 2 = 0 ? 2 : 4) * f(a + i * h)
  return sum * h / 3`,
  codeExamples: {
    typescript: `// Yamuk Yöntemi
function trapezoidRule(f: (x: number) => number, a: number, b: number, n: number): number {
  const h = (b - a) / n;
  let sum = 0.5 * (f(a) + f(b));
  for (let i = 1; i < n; i++) { sum += f(a + i * h); }
  return sum * h;
}
// Simpson Yöntemi
function simpsonRule(f: (x: number) => number, a: number, b: number, n: number): number {
  if (n % 2 !== 0) n++;
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  for (let i = 1; i < n; i++) { sum += (i % 2 === 0 ? 2 : 4) * f(a + i * h); }
  return (sum * h) / 3;
}
// Romberg İntegrasyonu
function rombergIntegration(f: (x: number) => number, a: number, b: number, steps: number): number {
  const R: number[][] = Array.from({ length: steps }, () => Array(steps).fill(0));
  R[0][0] = 0.5 * (b - a) * (f(a) + f(b));
  for (let i = 1; i < steps; i++) {
    const n = Math.pow(2, i), h = (b - a) / n;
    let sum = 0;
    for (let k = 1; k <= n; k += 2) { sum += f(a + k * h); }
    R[i][0] = 0.5 * R[i-1][0] + sum * h;
    for (let j = 1; j <= i; j++) { R[i][j] = R[i][j-1] + (R[i][j-1] - R[i-1][j-1]) / (Math.pow(4, j) - 1); }
  }
  return R[steps - 1][steps - 1];
}`
  },
  demo: {
    kind: 'numerical-integration',
    title: 'Sayısal İntegral Demo',
    description: 'Yöntemi, aralığı ve parametreleri girin. Fonksiyon varsayılan olarak x^2 veya girilen ifadeye göre hesaplanır. Örn: trapezoid; 0, 1, 10 veya simpson; 0, 2, 100 veya romberg; 0, 1, 4 veya adaptive; 0, 1, 1e-4 veya spline; 0:0, 1:1, 2:4 veya symbolic; 3x^2',
    placeholder: 'trapezoid; 0, 1, 10',
  },
  timeComplexity: {
    best: 'Yamuk/Simpson: O(N), Romberg: O(2^K)',
    average: 'Yamuk/Simpson: O(N), Romberg: O(2^K)',
    worst: 'Yamuk/Simpson: O(N), Romberg: O(2^K)',
  },
  spaceComplexity: 'O(1) (Romberg için O(K^2))',
  analysisTitle: 'Yöntem Karşılaştırması ve Hata Analizi',
  analysisPoints: [
    'Dikdörtgen ve Yamuk yöntemleri doğrusal yaklaşım kullanırken, Simpson parabolik yaklaşım kullanır.',
    'Romberg, Richardson Ekstrapolasyonu ile adım boyutunu sıfıra götürme tahmini yapar ve çok daha hızlı yakınsar.',
    'Adaptif yöntem, fonksiyonun türevinin yüksek olduğu bölgeleri otomatik tespit ederek o bölgelerde sık adımlar atar.'
  ],
  advantages: [
    'Analitik olarak integrali alınamayan fonksiyonların integralini yüksek doğrulukla bulabilir.',
    'Ayrık veri noktalarından oluşan deneysel ölçümlerin altında kalan alanı kolayca hesaplar.'
  ],
  disadvantages: [
    'Sonsuz integral aralıkları veya tekil içeren fonksiyonlarda standart yöntemler doğrudan çalışmaz.',
    'Boyut arttıkça (çok katlı integraller) hesaplama karmaşıklığı üstel artar.'
  ],
  relatedAlgorithms: [
    {
      title: 'Interpolation & Fitting',
      description: 'Veri noktalarından spline veya eğri uydurma işlemlerini gerçekleştirir.',
      href: '/algorithms/mathematical-algorithms/interpolation-fitting',
    }
  ],
};

export const randomNumberGeneratorsContent: RemainingAlgorithmContent = {
  title: 'Rastgele Sayı Üreteçleri (Random Number Generators - PRNG)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Numerical Methods / Probability',
  difficulty: 'Orta',
  sources: ['Sedgewick'],
  summary: 'Sözde rastgele sayılar üretmek için Doğrusal Eşlik (LCG), Toplamsal Eşlik (Lagged Fibonacci), LFSR ve Chi-Square testini içerir.',
  descriptionParagraphs: [
    'Bilgisayarlar deterministik sistemler oldukları için gerçek anlamda rastgele sayı üretemezler. Bunun yerine, belirli bir başlangıç değerinden başlayarak matematiksel formüllerle rastgele görünen diziler üreten Sözde Rastgele Sayı Üreteçleri kullanılır.',
    'Bu modül, kriptografi, simülasyon ve oyunlarda kullanılan temel PRNG algoritmalarını ve bunların kalitesini ölçmek için kullanılan istatistiksel Ki-Kare rastgelelik testini içerir.'
  ],
  sourceNotes: [
    'Sedgewick / Random Numbers: Doğrusal Eşlik Üreteci (LCG), doğru parametre seçimiyle tam periyot sunabilir fakat son bitlerin rastgeleliği zayıftır.',
    'LFSR, donanım düzeyinde rastgele bit üretmek için son derece hızlı bir yöntemdir ve XOR geri besleme döngüsü kullanır.',
    'Ki-Kare testi, üretilen sayıların homojen bir şekilde dağılıp dağılmadığını gözlenen ve beklenen frekans farklarıyla test eder.'
  ],
  steps: [
    'LCG: X_(n+1) = (a * X_n + c) mod m formülünü uygula. Elde edilen X değerini m\'e bölerek [0, 1) aralığına normalize et.',
    'Toplamsal Eşlik: Önceki terimler dizisindeki X_(n-j) ve X_(n-k) terimlerini toplayıp m modülünü alarak yeni terimi üret.',
    'LFSR: Kaydırma yazmacındaki belirli bitleri XOR işlemine sok. Register\'ı sağa kaydır ve çıkan XOR sonucunu en soldaki bite yaz.',
    'Ki-Kare Testi: [0, 1) aralığındaki sayıları k adet sınıfa dağıt. Frekanslarla chi-square değerini hesapla.'
  ],
  pseudocode: `LCG-STEP(X, a, c, m)
  return (a * X + c) mod m
LFSR-STEP(register, taps, width)
  feedback <- 0
  for tap in taps
    feedback <- feedback XOR (register bit at tap)
  register <- (register >> 1) OR (feedback << (width - 1))
  return (register, feedback)`,
  codeExamples: {
    typescript: `// LCG
class LCG {
  private state: number;
  constructor(seed: number, private a = 1664525, private c = 1013904223, private m = Math.pow(2, 32)) { this.state = seed; }
  next(): number { this.state = (this.a * this.state + this.c) % this.m; return this.state; }
  nextFloat(): number { return this.next() / this.m; }
}
// LFSR
class LFSR {
  private state: number;
  constructor(seed: number, private width: number, private taps: number[]) { this.state = seed & ((1 << width) - 1); }
  step(): number {
    let feedback = 0;
    for (const tap of this.taps) { feedback ^= (this.state >> (tap - 1)) & 1; }
    const outputBit = this.state & 1;
    this.state = (this.state >> 1) | (feedback << (this.width - 1));
    return outputBit;
  }
}`
  },
  demo: {
    kind: 'random-number-generators',
    title: 'PRNG Demo',
    description: 'Üreteci ve parametreleri girin. Örn: lcg; seed=123, a=1103515245, c=12345, m=2147483648, n=10 veya acg; lags=3,7, m=1000, seed=123, n=10 veya lfsr; seed=11, width=4, taps=4,3, n=15 veya chisquare; values=0.1,0.5,0.9,0.3,0.7,0.2,0.8,0.4,0.6,0.0',
    placeholder: 'lcg; seed=123, n=10',
  },
  timeComplexity: {
    best: 'Her adım için O(1)',
    average: 'Her adım için O(1)',
    worst: 'Her adım için O(1)',
  },
  spaceComplexity: 'O(1) (ACG için O(K) hafıza)',
  analysisTitle: 'Rastgelelik Testleri ve Kalite',
  analysisPoints: [
    'Bir PRNG\'nin kalitesi periyot uzunluğuna ve boyutsal dağılımına bağlıdır. LCG\'nin periyodu en fazla m olabilir.',
    'Kötü seçilmiş parametreler çok kısa periyotlara veya düzenli örüntülere yol açabilir.',
    'Ki-Kare testinin p-değeri 0.05 ile 0.95 arasında olmalıdır. Çok küçük değerler homojen olmadığını, çok büyük değerler ise "aşırı düzenli" olduğunu gösterir.'
  ],
  advantages: [
    'Son derece hızlıdırlar ve minimum hafıza ile çalışırlar.',
    'Aynı seed değeri kullanıldığında tamamen aynı diziyi üretirler, bu da test ve simülasyonların tekrarlanabilirliğini sağlar.'
  ],
  disadvantages: [
    'Deterministik oldukları için güvenlik ve kriptografi uygulamalarında doğrudan kullanılmamalıdırlar.',
    'Kötü seçilmiş parametreler çok kısa periyotlara veya düzenli örüntülere yol açabilir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Asallık Testi',
      description: 'Asal sayılar, büyük modül m ve çarpan a parametrelerinin seçiminde kritik rol oynar.',
      href: '/algorithms/mathematical-algorithms/primality-test',
    }
  ],
};
