import type { RemainingAlgorithmContent } from './types';

export const fastFourierTransformContent: RemainingAlgorithmContent = {
  title: 'Hızlı Fourier Dönüşümü (Fast Fourier Transform)',
  category: 'Gelişmiş / Paralel / Bellek',
  categoryHref: '/algorithms/advanced-parallel-memory',
  family: 'Matematik & Sinyal İşleme',
  difficulty: 'Zor',
  sources: ['Sedgewick'],
  summary: 'Discrete Fourier Transform (DFT) hesaplamasını Cooley-Tukey Radix-2 yöntemi ile O(n^2) süresinden O(n log n) süresine indiren temel algoritmadır.',
  descriptionParagraphs: [
    'Hızlı Fourier Dönüşümü (FFT), bir zaman serisini veya sinyali frekans bileşenlerine ayıran Discrete Fourier Transform (DFT) işlemini son derece hızlı bir şekilde gerçekleştiren algoritmalar ailesidir.',
    'DFT hesaplamasının kaba kuvvet yaklaşımı her girdi çifti için çarpım yaptığından $O(n^2)$ karmaşıklığa sahiptir. Cooley-Tukey algoritması, girdi boyutunu tek ve çift indeksli olmak üzere ikiye bölüp (divide-and-conquer), karmaşık birim kökleri (twiddle factors) ile birleştirerek bu süreyi $O(n \log n)$ seviyesine indirir.',
    'FFT, dijital sinyal işleme (DSP), ses/görüntü sıkıştırma (JPEG, MP3), hızlı büyük tamsayı/polinom çarpımı ve kuantum bilişimde (QFT) kritik bir öneme sahiptir.'
  ],
  sourceNotes: [
    'Cooley-Tukey algoritması, girdi dizisi uzunluğunun 2\'nin bir kuvveti ($2^k$) olmasını gerektirir.',
    'Ters FFT (IFFT) algoritması, birim köklerin işaretleri değiştirilerek ve sonuç dizisi n\'e bölünerek aynı mantıkla çalıştırılır.'
  ],
  steps: [
    'Eğer girdi dizisinin boyutu n = 1 ise, diziyi olduğu gibi döndür (kök durum).',
    'Girdi dizisini çift indeksli (even) ve tek indeksli (odd) olarak ikiye böl.',
    'Çift indeksli elemanlar için FFT\'yi özyinelemeli olarak çağır (Y_even).',
    'Tek indeksli elemanlar için FFT\'yi özyinelemeli olarak çağır (Y_odd).',
    'k = 0\'dan n/2 - 1\'e kadar döngü kur:',
    '  Karmaşık birim kökünü hesapla: W = e^(-2 * pi * i * k / n) = cos(-2*pi*k/n) + i*sin(-2*pi*k/n).',
    '  Kombinasyon adımı (Butterfly):',
    '    Output[k] = Y_even[k] + W * Y_odd[k]',
    '    Output[k + n/2] = Y_even[k] - W * Y_odd[k]',
    'Hesaplanan Output dizisini döndür.'
  ],
  pseudocode: `procedure FFT(a)
    n = length(a)
    if n == 1 then return a
    
    wn = exp(-2 * pi * i / n)
    w = 1
    
    a_even = [a[0], a[2], ..., a[n-2]]
    a_odd  = [a[1], a[3], ..., a[n-1]]
    
    y_even = FFT(a_even)
    y_odd  = FFT(a_odd)
    
    y = array of size n
    for k = 0 to n/2 - 1 do
        y[k] = y_even[k] + w * y_odd[k]
        y[k + n/2] = y_even[k] - w * y_odd[k]
        w = w * wn
    end for
    return y`,
  codeExamples: {
    typescript: `interface Complex {
  re: number;
  im: number;
}

function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

function sub(a: Complex, b: Complex): Complex {
  return { re: a.re - b.re, im: a.im - b.im };
}

function mul(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re
  };
}

export function cooleyTukeyFFT(a: Complex[]): Complex[] {
  const n = a.length;
  if (n <= 1) return a;
  
  const even: Complex[] = [];
  const odd: Complex[] = [];
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) even.push(a[i]);
    else odd.push(a[i]);
  }
  
  const yEven = cooleyTukeyFFT(even);
  const yOdd = cooleyTukeyFFT(odd);
  
  const y = new Array<Complex>(n);
  for (let k = 0; k < n / 2; k++) {
    const angle = (-2 * Math.PI * k) / n;
    const w: Complex = { re: Math.cos(angle), im: Math.sin(angle) };
    const t = mul(w, yOdd[k]);
    
    y[k] = add(yEven[k], t);
    y[k + n / 2] = sub(yEven[k], t);
  }
  
  return y;
}`,
    python: `import math

def fft(a):
    n = len(a)
    if n <= 1:
        return a
    even = fft(a[0::2])
    odd = fft(a[1::2])
    
    y = [0] * n
    for k in range(n // 2):
        angle = -2 * math.pi * k / n
        w = complex(math.cos(angle), math.sin(angle))
        t = w * odd[k]
        y[k] = even[k] + t
        y[k + n // 2] = even[k] - t
    return y`
  },
  demo: {
    kind: 'fast-fourier-transform',
    title: 'Hızlı Fourier Dönüşümü Simülatörü',
    description: 'Gerçek sayı dizilerini girerek Cooley-Tukey kelebek (butterfly) adımlarını ve frekans spektrum genliklerini hesaplayın.',
    placeholder: 'FFT; 1,2,3,4,0,0,0,0'
  },
  timeComplexity: {
    best: 'O(n log n) - Her zaman aynı sayıda bölünme adımı gerçekleşir',
    average: 'O(n log n)',
    worst: 'O(n log n)'
  },
  spaceComplexity: 'O(n) - Özyinelemeli dizileri ve sonuçları saklamak için',
  analysisTitle: 'Kelebek (Butterfly) İşlem Analizi',
  analysisPoints: [
    'Her aşamada dizinin boyutu yarıya iner ve $\\log_2 n$ adet seviyede toplam $n \\log_2 n$ adet kelebek toplama/çıkarma işlemi gerçekleştirilir.',
    'FFT algoritmasının donanımsal paralel implementasyonları, systolic yapılar veya paralel kelebek devreleri sayesinde $O(\\log n)$ süresine kadar inebilir.',
    'Büyük polinom çarpımlarında, polinom katsayıları FFT ile nokta gösterimine dönüştürülüp $O(n)$ zamanda çarpılır ve ters FFT ile tekrar katsayılarına dönüştürülerek toplamda $O(n \\log n)$ çarpım süresi elde edilir.'
  ],
  advantages: [
    'DFT kaba kuvvet çarpımına ($O(n^2)$) kıyasla devasa veri kümelerinde binlerce kat performans artışı sağlar.',
    'Yapısı son derece simetrik ve paralel programlamaya (GPU/FPGA) uygundur.',
    'Gelişmiş sinyal filtreleme süreçlerinde eşsiz bir matematiksel verimlilik sunar.'
  ],
  disadvantages: [
    'Dizi boyutunun 2\'nin tam kuvveti olmaması durumunda padding (sıfır ekleme) yapılması gerekir veya karmaşık Radix-3/5 varyantları uygulanmalıdır.',
    'Aşırı küçük dizilerde özyineleme maliyeti nedeniyle kaba kuvvet yaklaşımından daha yavaş olabilir.',
    'Kayan noktalı (floating point) karmaşık sayı çarpımları nedeniyle yuvarlama hataları oluşabilir.'
  ],
  relatedAlgorithms: [
    { title: 'Ters FFT (IFFT)', description: 'Frekans spektrum verilerini tekrar zaman serisine dönüştüren algoritma.' },
    { title: 'Karatsuba Çarpımı', description: 'Polinomları katsayı bazında bölen bir diğer divide-and-conquer çarpım yöntemi.' }
  ]
};

export const parallelMergingNetworksContent: RemainingAlgorithmContent = {
  title: 'Paralel Birleştirme ve Ağlar (Parallel Merging & Networks)',
  category: 'Gelişmiş / Paralel / Bellek',
  categoryHref: '/algorithms/advanced-parallel-memory',
  family: 'Paralel Hesaplama & Sıralama Ağları',
  difficulty: 'Zor',
  sources: ['Sedgewick'],
  summary: 'Batcher tarafından geliştirilen Bitonik Sıralama (Bitonic Sort) ve Tek-Çift Birleştirme (Odd-Even Merge) gibi karşılaştırıcı tabanlı donanımsal paralel sıralama ağlarını modeller.',
  descriptionParagraphs: [
    'Sıralama Ağları (Sorting Networks), veri girdilerinden bağımsız olarak önceden tanımlanmış sabit karşılaştırıcı (comparator) kablolarıyla verileri sıralayan donanımsal modellerdir.',
    'Tek-Çift Birleştirme (Odd-Even Merge), sıralı iki diziyi paralel karşılaştırmalarla birleştiren bir Batcher ağıdır. Bitonik Sıralama (Bitonic Sort) ise önce monoton artan ve azalan alt diziler oluşturup (bitonic sequence), ardından bunları kelebek tarzı kablolarla paralelce birleştiren popüler bir ağ yapısıdır.',
    'Mükemmel Karıştırma (Perfect Shuffle), bir diziyi tam ortadan bölüp elemanları sırayla ardışık şekilde interleave ederek karıştırma adımıdır ve paralel ağ bağlantılarında yönlendirme için temel teşkil eder. Sistolik Diziler (Systolic Arrays) ise veri akışının işlemci hücreleri arasında adım adım senkronize yayıldığı 2D donanım ızgaralarıdır.'
  ],
  sourceNotes: [
    'Sıralama ağları veriye bağımlı dallanma (if/else) içermez; bu yüzden tamamen donanım üzerinde (FPGA, ASIC) paralel çalıştırılabilirler.',
    'Bitonik sıralama ağının paralel zaman karmaşıklığı $O(\log^2 n)$ adımıdır.'
  ],
  steps: [
    'Bitonik Sıralama Ağı (Bitonic Sort):',
    '  n elemanlı bir dizide, her aşama l = 2, 4, 8, ..., n için:',
    '    Diziyi l boyutunda alt gruplara böl.',
    '    Her alt grubu sırayla artan ve azalan (bitonic) yönlerde sırala.',
    '    Bitonik Birleştirme (Bitonic Merge) adımını çalıştır:',
    '      Mesafe d = l / 2 olarak ata.',
    '      Her i için dizinin i. ve (i+d). elemanlarını belirlenen yöne (artan/azalan) göre karşılaştır ve gerekirse yer değiştir (swap).',
    '      d = d / 2 olarak güncelle ve d = 1 olana kadar karşılaştırmaları sürdür.',
    '  Tüm aşamalar bittiğinde dizi tamamen sıralanmış olur.'
  ],
  pseudocode: `procedure BitonicSort(arr, low, cnt, direction)
    if cnt > 1 then
        k = cnt / 2
        BitonicSort(arr, low, k, ASCENDING)
        BitonicSort(arr, low + k, k, DESCENDING)
        BitonicMerge(arr, low, cnt, direction)
    end if

procedure BitonicMerge(arr, low, cnt, direction)
    if cnt > 1 then
        k = cnt / 2
        for i = low to low + k - 1 do
            CompareAndSwap(arr[i], arr[i + k], direction)
        end for
        BitonicMerge(arr, low, k, direction)
        BitonicMerge(arr, low + k, k, direction)
    end if`,
  codeExamples: {
    typescript: `export function compareAndSwap(arr: number[], i: number, j: number, dir: boolean): void {
  // dir = true for ascending, false for descending
  if ((arr[i] > arr[j] && dir) || (arr[i] < arr[j] && !dir)) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

export function bitonicMerge(arr: number[], low: number, cnt: number, dir: boolean): void {
  if (cnt > 1) {
    const k = cnt / 2;
    for (let i = low; i < low + k; i++) {
      compareAndSwap(arr, i, i + k, dir);
    }
    bitonicMerge(arr, low, k, dir);
    bitonicMerge(arr, low + k, k, dir);
  }
}

export function bitonicSort(arr: number[], low: number, cnt: number, dir: boolean): void {
  if (cnt > 1) {
    const k = cnt / 2;
    // Sort in ascending order
    bitonicSort(arr, low, k, true);
    // Sort in descending order
    bitonicSort(arr, low + k, k, false);
    // Merge the whole sequence
    bitonicMerge(arr, low, cnt, dir);
  }
}`,
    python: `def compare_and_swap(arr, i, j, direction):
    if (direction == 1 and arr[i] > arr[j]) or (direction == 0 and arr[i] < arr[j]):
        arr[i], arr[j] = arr[j], arr[i]

def bitonic_merge(arr, low, cnt, direction):
    if cnt > 1:
        k = cnt // 2
        for i in range(low, low + k):
            compare_and_swap(arr, i, i + k, direction)
        bitonic_merge(arr, low, k, direction)
        bitonic_merge(arr, low + k, k, direction)

def bitonic_sort(arr, low, cnt, direction):
    if cnt > 1:
        k = cnt // 2
        bitonic_sort(arr, low, k, 1)
        bitonic_sort(arr, low + k, k, 0)
        bitonic_merge(arr, low, cnt, direction)`
  },
  demo: {
    kind: 'parallel-merging-networks',
    title: 'Sıralama Ağları ve Paralel Birleştirme',
    description: 'Bitonik Sıralama veya Batcher Tek-Çift birleştirme karşılaştırıcı adımlarını diziler üzerinde adım adım simüle edin.',
    placeholder: 'BITONIC; 8,3,2,9,7,1,5,4'
  },
  timeComplexity: {
    best: 'O(log^2 n) - Paralel zaman derinliği',
    average: 'O(log^2 n)',
    worst: 'O(log^2 n)'
  },
  spaceComplexity: 'O(n) - Kablo kanallarındaki veriler için yerinde sıralama',
  analysisTitle: 'Sıralama Ağı Karşılaştırıcı Analizi',
  analysisPoints: [
    'Bitonik sıralamada toplam karşılaştırıcı sayısı $O(n \\log^2 n)$ kadardır, bu standart QuickSort\'un $O(n \\log n)$ karşılaştırmasından fazladır ama paralel donanımda hepsi aynı anda yapılabildiği için süre çok daha kısadır.',
    'Sıralama ağları veriden bağımsız (data-independent) çalıştığı için dallanma tahmini (branch prediction) hatası oluşturmaz ve GPU mimarileri için mükemmel uyumludur.',
    'Mükemmel Karıştırma (Perfect Shuffle) adımları, paralel işlemciler arasındaki veri transfer yollarını optimize etmek için kelebek ağlarıyla birleştirilir.'
  ],
  advantages: [
    'CPU dallanma komutları içermez, tamamen donanımlaştırılabilir.',
    'Büyük verilerde paralel eşzamanlı sıralama için idealdir.',
    'FPGA ve grafik işlemcileri üzerinde çok verimli çalışır.'
  ],
  disadvantages: [
    'Toplam karşılaştırma sayısı $O(n \\log^2 n)$ olduğundan tek çekirdekli CPU\'larda normal sıralamalara göre daha yavaş kalır.',
    'Girdi boyutu n\'in 2\'nin bir gücü olması gerekir.',
    'Dinamik bellek kullanımına veya bağlantı kabloları esnek olmayan donanım kısıtlarına takılabilir.'
  ],
  relatedAlgorithms: [
    { title: 'Merge Sort', description: 'Ardışık olarak çalışan ve paralel birleştirme ağlarının ilham kaynağı olan klasik sıralama.' },
    { title: 'Systolic Array Matrix Multiplication', description: 'Verilerin 2B donanım ızgarası üzerinde paralel akarak çarpıldığı donanım yapısı.' }
  ]
};

export const mathClassicRiddlesContent: RemainingAlgorithmContent = {
  title: 'Matematik ve Klasik Bulmacalar (Math & Classic Riddles)',
  category: 'Gelişmiş / Paralel / Bellek',
  categoryHref: '/algorithms/advanced-parallel-memory',
  family: 'Divide-and-Conquer & Bulmacalar',
  difficulty: 'Orta',
  sources: ['Aho', 'Sedgewick'],
  summary: 'Karatsuba Hızlı Çarpımı, Hanoi Kuleleri, Lig Usulü Turnuva Eşleştirmesi ve Çokgen Triangulation gibi klasik algoritmik bulmacaları ve çözümlerini barındırır.',
  descriptionParagraphs: [
    'Bilgisayar bilimlerinde klasik bulmacalar ve matematiksel bölünmeler, algoritmik düşünme becerisini geliştiren ve karmaşık optimizasyon modellerine zemin hazırlayan temel yapılardır.',
    'Karatsuba Algoritması, iki büyük sayıyı çarparken standart $O(n^2)$ yerine, sayıları ikiye bölüp sadece 3 alt çarpım kullanarak süreyi $O(n^{1.585})$ düzeyine düşüren klasik bir divide-and-conquer yöntemidir.',
    'Hanoi Kuleleri, disklerin büyüklük sırasına göre üç direk arasında taşınmasını özyinelemeli çözen $O(2^n)$ adımlık bir bulmacadır. Lig Usulü Turnuva (Round-robin) planlaması her takımın birbiriyle karşılaşmasını planlarken, En Küçük Maliyetli Nirengi (Minimal-cost Triangulation) dinamik programlama ile çokgenleri üçgenlere bölme maliyetini en aza indirir.'
  ],
  sourceNotes: [
    'Hanoi Kuleleri probleminde $n$ disk için minimum hamle sayısı $2^n - 1$\'dir.',
    'Karatsuba algoritması, büyük basamaklı kriptografik şifreleme anahtarlarının çarpımında temel yapı taşıdır.'
  ],
  steps: [
    'Karatsuba Büyük Sayı Çarpımı (A * B):',
    '  Eğer sayılar tek basamaklıysa, doğrudan çarpımı döndür.',
    '  n basamak sayısının yarısı olsun (m = n/2).',
    '  A\'yı ikiye böl: A = a * 10^m + b. B\'yi ikiye böl: B = c * 10^m + d.',
    '  Üç özyinelemeli çarpım hesapla:',
    '    ac = Karatsuba(a, c)',
    '    bd = Karatsuba(b, d)',
    '    abcd = Karatsuba(a + b, c + d)',
    '  Orta terimi hesapla: mid = abcd - ac - bd.',
    '  Sonucu birleştir: Sonuç = ac * 10^(2*m) + mid * 10^m + bd.',
    'Hanoi Kuleleri Özyinelemesi (n disk, Kaynak, Hedef, Yardımcı):',
    '  Eğer n = 1 ise, 1. diski Kaynaktan Hedefe taşı ve dön.',
    '  n-1 diski Kaynaktan Yardımcıya taşı (Hedefi yardımcı olarak kullanarak).',
    '  n. diski Kaynaktan Hedefe taşı.',
    '  n-1 diski Yardımcıdan Hedefe taşı (Kaynağı yardımcı olarak kullanarak).'
  ],
  pseudocode: `procedure Karatsuba(x, y)
    n = max(length(x), length(y))
    if n < 2 then return x * y
    
    m = n / 2
    a, b = split(x, m) // high, low parts
    c, d = split(y, m)
    
    ac = Karatsuba(a, c)
    bd = Karatsuba(b, d)
    abcd = Karatsuba(a + b, c + d)
    
    return ac * 10^(2*m) + (abcd - ac - bd) * 10^m + bd`,
  codeExamples: {
    typescript: `export function karatsubaMultiply(x: number, y: number): number {
  // Base case for single digit multiplication
  if (x < 10 || y < 10) return x * y;
  
  const xStr = x.toString();
  const yStr = y.toString();
  const n = Math.max(xStr.length, yStr.length);
  const m = Math.floor(n / 2);
  
  const p = Math.pow(10, m);
  
  const a = Math.floor(x / p);
  const b = x % p;
  const c = Math.floor(y / p);
  const d = y % p;
  
  // 3 recursive calls
  const ac = karatsubaMultiply(a, c);
  const bd = karatsubaMultiply(b, d);
  const abcd = karatsubaMultiply(a + b, c + d);
  
  const mid = abcd - ac - bd;
  return ac * Math.pow(10, 2 * m) + mid * p + bd;
}

export function hanoiMoves(n: number, from: string, to: string, aux: string, trace: string[]): void {
  if (n === 1) {
    trace.push(\`Disk 1'i \${from} -> \${to} direğine taşı\`);
    return;
  }
  hanoiMoves(n - 1, from, aux, to, trace);
  trace.push(\`Disk \${n}'i \${from} -> \${to} direğine taşı\`);
  hanoiMoves(n - 1, aux, to, from, trace);
}`,
    python: `def karatsuba(x, y):
    if x < 10 or y < 10:
        return x * y
    x_str, y_str = str(x), str(y)
    n = max(len(x_str), len(y_str))
    m = n // 2
    p = 10**m
    
    a, b = x // p, x % p
    c, d = y // p, y % p
    
    ac = karatsuba(a, c)
    bd = karatsuba(b, d)
    abcd = karatsuba(a + b, c + d)
    
    return ac * (10**(2*m)) + (abcd - ac - bd) * p + bd

def hanoi(n, source, target, auxiliary, moves):
    if n == 1:
        moves.append(f"Disk 1: {source} -> {target}")
        return
    hanoi(n - 1, source, auxiliary, target, moves)
    moves.append(f"Disk {n}: {source} -> {target}")
    hanoi(n - 1, auxiliary, target, source, moves)`
  },
  demo: {
    kind: 'math-classic-riddles',
    title: 'Matematiksel Bulmaca Simülatörü',
    description: 'Hanoi adımlarını listeyin veya Karatsuba hızlı çarpım bölünmelerini adım adım izleyin.',
    placeholder: 'KARATSUBA; 1234; 5678'
  },
  timeComplexity: {
    best: 'O(n^1.585) - Karatsuba hızlı çarpım',
    average: 'O(n^1.585)',
    worst: 'O(2^n) - Hanoi Kuleleri hamle sayısı'
  },
  spaceComplexity: 'O(n) - Recursive çağrı derinliği ve katsayılar için',
  analysisTitle: 'Böl ve Yönet Hızlandırma Analizi',
  analysisPoints: [
    'Karatsuba algoritması 4 yerine sadece 3 alt çarpım kullanarak özyineleme derinliğini daraltır ve n basamaklı sayılarda $O(n^2)$\'den daha iyi bir üst sınır yakalar.',
    'Hanoi Kuleleri $O(2^n)$ karmaşıklığı ile üstel büyür. $n=64$ disk için yapılacak hamleler evrenin yaşından daha uzun sürecektir.',
    'Lig Usulü turnuva eşleştirmesi, $N-1$ raundda her takımı birbiriyle eşleştirmek için bir dairesel öteleme (round-robin scheduling) şeması kullanır.'
  ],
  advantages: [
    'Karatsuba büyük sayı çarpımlarını (100+ basamak) hızlandırmak için idealdir.',
    'Özyineleme ve divide-and-conquer mantığını kavramak için mükemmel örneklerdir.',
    'Turnuva eşleştirmesi fikstür planlama karmaşıklığını polinomsal sürede hatasız çözer.'
  ],
  disadvantages: [
    'Küçük sayılarda Karatsuba ek bölme ve çıkarma adımları nedeniyle normal çarpımdan daha yavaş kalır.',
    'Hanoi kuleleri n > 20 için işlemciyi kilitleyen üstel hamle patlamasına yol açar.',
    'Uygulamalarda yüksek seviyeli dil çağrı yığını limitlerine takılabilirler.'
  ],
  relatedAlgorithms: [
    { title: 'Cooley-Tukey FFT', description: 'Büyük polinom çarpımlarını O(n log n) süresinde gerçekleştiren ileri matematiksel algoritma.' },
    { title: 'Recursive Backtracking', description: 'Hanoi kuleleri gibi karar problemlerini derinlemesine tarayarak çözen yöntem.' }
  ]
};

export const linearProgrammingSimplexContent: RemainingAlgorithmContent = {
  title: 'Doğrusal Programlama / Simpleks (Linear Programming / Simplex)',
  category: 'Gelişmiş / Paralel / Bellek',
  categoryHref: '/algorithms/advanced-parallel-memory',
  family: 'Optimizasyon & Matematik',
  difficulty: 'Zor',
  sources: ['Sedgewick'],
  summary: 'Kısıtlı doğrusal denklemlere dayalı optimizasyon problemlerini Simplex tabloları, Bland döngü önleme kuralı ve gradyan inişi (Steepest Descent) ile çözer.',
  descriptionParagraphs: [
    'Doğrusal Programlama (LP), doğrusal eşitlik veya eşitsizlik kısıtları altında doğrusal bir amaç fonksiyonunu (objective function) maksimize veya minimize etme problemidir.',
    'George Dantzig tarafından geliştirilen Simpleks Yöntemi (Simplex Method), kısıtların oluşturduğu dış bükey politopun (convex polytope) köşeleri arasında dolaşarak en iyi değeri arar. Bir köşeden komşu köşeye geçmek için Simplex pivot işlemleri (satır işlemleri) yapılır.',
    'Bland Döngü Önleme Yöntemi (Bland\'s Anti-cycling Rule), pivot adımlarında aynı köşeler arasında sonsuz döngüye (cycling) girilmesini engellemek için en küçük indisli değişkeni seçme kuralıdır. En Dik İniş (Steepest Descent / Gradient Descent) ise gradyan yönünde adım atarak fonksiyonun yerel minimumunu arayan ardışık bir optimizasyon metodudur.'
  ],
  sourceNotes: [
    'Simpleks yöntemi pratikte son derece hızlı çalışmasına rağmen, Klee-Minty küpü gibi yapay kısıtlarda üstel ($O(2^d)$) adım sürebilir.',
    'Modern çözücüler hem Simpleks hem de polinomsal zamanda koşan İç Nokta Yöntemlerini (Interior Point Methods) kullanır.'
  ],
  steps: [
    'Simpleks Tablosunun Hazırlanması:',
    '  Eşitsizlik kısıtlarını gevşek değişkenler (slack variables) ekleyerek eşitliğe dönüştür.',
    '  Amaç fonksiyonunu tablonun en alt satırına yerleştir (Tablo matrisi).',
    'Simplex Döngüsü (Pivoting):',
    '  Alt satırdaki en negatif katsayıya sahip sütunu seç (Entering variable).',
    '  Bland kuralı aktifse: birden fazla negatif varsa en küçük indisli değişken sütununu seç.',
    '  Her kısıt satırı için: sağ taraftaki sabitin, seçilen sütundaki katsayıya oranını hesapla.',
    '  Pozitif oranlar içindeki en küçük oranı veren satırı seç (Leaving variable / Pivot Row).',
    '  Pivot elemanını (satır ve sütunun kesişimi) satır işlemleriyle 1 yap.',
    '  Diğer satırlardaki pivot sütun elemanlarını yok etmek (0 yapmak) için Gauss-Jordan satır işlemleri uygula.',
    '  Alt satırda hiç negatif katsayı kalmayana kadar adımları tekrarla.',
    'En alt satırın sağ köşesindeki değer maksimum sonucu verir.'
  ],
  pseudocode: `procedure Simplex(tableau)
    while bottom_row_has_negatives() do
        col = select_entering_variable() // Bland's rule: smallest index
        row = select_leaving_variable(col) // minimum ratio test
        if row == null then return UNBOUNDED
        
        Pivot(tableau, row, col) // Gauss-Jordan row operations
    end while
    return OPTIMAL`,
  codeExamples: {
    typescript: `export function simplexPivot(
  tableau: number[][],
  pivotRow: number,
  pivotCol: number
): void {
  const R = tableau.length;
  const C = tableau[0].length;
  const pivotVal = tableau[pivotRow][pivotCol];
  
  // Normalize pivot row
  for (let j = 0; j < C; j++) {
    tableau[pivotRow][j] /= pivotVal;
  }
  
  // Reduce other rows
  for (let i = 0; i < R; i++) {
    if (i !== pivotRow) {
      const factor = tableau[i][pivotCol];
      for (let j = 0; j < C; j++) {
        tableau[i][j] -= factor * tableau[pivotRow][j];
      }
    }
  }
}`,
    python: `def simplex_pivot(tableau, pivot_row, pivot_col):
    R = len(tableau)
    C = len(tableau[0])
    pivot_val = tableau[pivot_row][pivot_col]
    
    # Normalize pivot row
    for j in range(C):
        tableau[pivot_row][j] /= pivot_val
        
    # Eliminate other rows
    for i in range(R):
        if i != pivot_row:
            factor = tableau[i][pivot_col]
            for j in range(C):
                tableau[i][j] -= factor * tableau[pivot_row][j]`
  },
  demo: {
    kind: 'linear-programming-simplex',
    title: 'Simplex Optimizasyon Simülatörü',
    description: 'Kısıtlı doğrusal denklemleri matris tablosuna dökerek Simplex pivot adımlarını ve Bland kuralını izleyin.',
    placeholder: 'SIMPLEX; max 3,5; 1,0<=4; 0,2<=12; 3,2<=18'
  },
  timeComplexity: {
    best: 'O(d) - Köşeler arasında doğrudan geçiş yapıldığında',
    average: 'Polinomsal - O(R * C) pivot adımı',
    worst: 'O(2^d) - Klee-Minty küpü gibi üstel durumlar'
  },
  spaceComplexity: 'O(R * C) - Simplex tablosu matrisi saklama',
  analysisTitle: 'Simpleks Politop Optimizasyonu',
  analysisPoints: [
    'Dış bükey politopun her bir köşesi doğrusal denklemlerin temel bir çözümüne (Basic Feasible Solution) karşılık gelir.',
    'Bland Döngü Önleme kuralı, pivot seçiminde kararsız kalındığında en düşük indise sahip sütunu/satırı seçerek tablonun kısır döngüye (cycling) girip kilitlenmesini kesin olarak engeller.',
    'En Dik İniş (Steepest Descent), doğrusal olmayan optimizasyonlarda gradyan vektörünün tersi yönünde ($-\\nabla f$) hareket ederek lokal minimumu arar.'
  ],
  advantages: [
    'Doğrusal programlama problemlerinde pratik veri setleri için son derece hızlı çalışır.',
    'Kesin optimal sonucu ve amaç fonksiyonunu maksimum yapan değişkenlerin değerlerini verir.',
    'Duyarlılık analizi (sensitivity analysis) yapmaya imkan tanır.'
  ],
  disadvantages: [
    'Teorik olarak en kötü durumda üstel sürede çalışır (NP-Zor gibi davranabilir).',
    'Doğrusal olmayan (non-linear) kısıtlar barındıran problemlere uygulanamaz.',
    'Sayısal hassasiyet (floating point rounding) hatalarına karşı duyarlıdır.'
  ],
  relatedAlgorithms: [
    { title: 'Gauss-Jordan Eliminasyonu', description: 'Doğrusal denklem sistemlerini çözen ve Simplex pivotlarında kullanılan matris indirgeme tekniği.' },
    { title: 'Steepest Descent', description: 'Doğrusal kısıtı olmayan sürekli fonksiyonlarda gradyan bazlı arama yöntemi.' }
  ]
};

export const memoryManagementGcContent: RemainingAlgorithmContent = {
  title: 'Bellek Yönetimi ve Çöp Toplama (Memory Management & GC)',
  category: 'Gelişmiş / Paralel / Bellek',
  categoryHref: '/algorithms/advanced-parallel-memory',
  family: 'Sistem Algoritmaları & Hafıza',
  difficulty: 'Zor',
  sources: ['Aho'],
  summary: 'Hafıza bloklarını 2\'nin kuvvetleri halinde bölen Buddy Sistemini, GC Mark-Sweep erişilebilirlik taramasını ve boş hafıza bloklarını birleştirmeyi (Coalescing) içerir.',
  descriptionParagraphs: [
    'Bellek Yönetimi, programların çalışma zamanında ihtiyaç duyduğu dinamik hafıza isteklerini verimli karşılamak ve kullanılmayan alanları sisteme geri kazandırmak için kullanılan sistem algoritmalarıdır.',
    'Buddy Bellek Sistemi (Buddy System), hafızayı $2^k$ boyutlarında bloklara ayırır. Bir istek geldiğinde en küçük uygun $2^k$ bloğu bulmak için büyük bloklar ortadan ikiye ("buddy" - arkadaş) bölünür. Bloklar serbest kaldığında ise yanındaki boş buddy bloğu ile otomatik birleştirilerek tekrar büyütülür.',
    'Çöp Toplama (Garbage Collection), artık referans verilmeyen nesnelerin otomatik taranıp temizlenmesidir. Mark-Sweep algoritmasında, kök nesnelerden (root) başlanarak DFS/BFS ile tüm aktif nesneler işaretlenir (Mark). İşaretlenmeyenler ise temizlenir (Sweep). Rekürsif olmayan Schorr-Waite algoritması ise ek bir yığın (stack) kullanmadan, nesne göstergelerini yönlendirerek işaretleme yapar.'
  ],
  sourceNotes: [
    'Buddy sistemi dış parçalanmayı (external fragmentation) azaltırken, iç parçalanmaya (internal fragmentation) sebep olabilir.',
    'Schorr-Waite link inversion algoritması, GC çalışırken ek bellek kalmadığı durumlarda yığın bellek taşmalarını engellemek için tasarlanmıştır.'
  ],
  steps: [
    'Buddy Sistem Bellek Tahsisi (Boyut x):',
    '  x\'i karşılayan en küçük 2\'nin kuvvetini hesapla: $size = 2^{\\lceil \\log_2 x \\rceil}$.',
    '  Uygun boyutta serbest blok ara.',
    '  Eğer daha büyük bir blok varsa:',
    '    Bloğu ortadan ikiye böl. Her biri diğerinin "buddy"sidir.',
    '    İstenen boyuta ulaşana kadar bölme işlemini sürdür ve bir yarısını tahsis et, diğerini serbest listesine ekle.',
    'Buddy Sistem Bellek İadesi (Blok B):',
    '  Blok B\'yi serbest olarak işaretle.',
    '  B\'nin buddy\'si olan bloğu kontrol et.',
    '  Eğer buddy de serbest ise:',
    '    İki bloğu birleştirerek boyutu iki katı olan tek bir blok yap.',
    '    Yeni birleşen blok için birleşebilecek başka bir buddy olup olmadığını kontrol et (coalescing).',
    'Garbage Collection Mark Aşaması:',
    '  Kök kümesindeki (roots) tüm nesneleri bir arama kuyruğuna (kuyruk veya yığın) ekle.',
    '  Arama kümesi boşalana kadar:',
    '    Bir nesne çıkart ve "marked" olarak işaretle.',
    '    Nesnenin gösterdiği (referans ettiği) tüm işaretlenmemiş komşu nesneleri kuyruğa ekle.'
  ],
  pseudocode: `procedure BuddyAllocate(request)
    k = ceil(log2(request))
    find block in free_list[k]
    if block found then return block
    
    // Split larger block
    for i = k + 1 to max_limit do
        block = remove_from_free_list(i)
        if block found then
            split block into two buddies of size i - 1
            add one to free_list[i - 1]
            return allocate the other buddy (or split again)
        end if
    end for
    return OUT_OF_MEMORY`,
  codeExamples: {
    typescript: `export interface BuddyBlock {
  size: number;
  offset: number;
  allocated: boolean;
}

export class BuddyAllocator {
  private memorySize: number;
  public blocks: BuddyBlock[] = [];
  
  constructor(totalSize: number) {
    this.memorySize = totalSize;
    this.blocks.push({ size: totalSize, offset: 0, allocated: false });
  }
  
  public allocate(requestSize: number): BuddyBlock | null {
    // Find smallest power of 2 that holds requestSize
    let powerSize = 1;
    while (powerSize < requestSize) {
      powerSize *= 2;
    }
    
    // Find suitable block
    let bestIdx = -1;
    for (let i = 0; i < this.blocks.length; i++) {
      const b = this.blocks[i];
      if (!b.allocated && b.size >= powerSize) {
        if (bestIdx === -1 || b.size < this.blocks[bestIdx].size) {
          bestIdx = i;
        }
      }
    }
    
    if (bestIdx === -1) return null; // No memory
    
    // Split block until size matches powerSize
    while (this.blocks[bestIdx].size > powerSize) {
      const b = this.blocks[bestIdx];
      const halfSize = b.size / 2;
      
      // Split into two buddies
      const left: BuddyBlock = { size: halfSize, offset: b.offset, allocated: false };
      const right: BuddyBlock = { size: halfSize, offset: b.offset + halfSize, allocated: false };
      
      this.blocks.splice(bestIdx, 1, left, right);
      // bestIdx points to left buddy now
    }
    
    this.blocks[bestIdx].allocated = true;
    return this.blocks[bestIdx];
  }
}`,
    python: `class BuddyAllocator:
    def __init__(self, size):
        self.size = size
        self.blocks = [{'size': size, 'offset': 0, 'allocated': False}]
        
    def allocate(self, req_size):
        power_size = 1
        while power_size < req_size:
            power_size *= 2
            
        best_idx = -1
        for i, b in enumerate(self.blocks):
            if not b['allocated'] and b['size'] >= power_size:
                if best_idx == -1 or b['size'] < self.blocks[best_idx]['size']:
                    best_idx = i
                    
        if best_idx == -1:
            return None
            
        while self.blocks[best_idx]['size'] > power_size:
            b = self.blocks[best_idx]
            half = b['size'] // 2
            left = {'size': half, 'offset': b['offset'], 'allocated': False}
            right = {'size': half, 'offset': b['offset'] + half, 'allocated': False}
            self.blocks[best_idx] = left
            self.blocks.insert(best_idx + 1, right)
            
        self.blocks[best_idx]['allocated'] = True
        return self.blocks[best_idx]`
  },
  demo: {
    kind: 'memory-management-gc',
    title: 'Bellek ve Çöp Toplayıcı Simülatörü',
    description: 'Buddy bellek tahsis adımlarını (bölme/birleştirme) ve GC erişilebilirlik işaretlemelerini adım adım izleyin.',
    placeholder: 'BUDDY; alloc:32,alloc:64,free:32,alloc:16'
  },
  timeComplexity: {
    best: 'O(log n) - Buddy tahsisi veya serbest bırakması',
    average: 'O(log n)',
    worst: 'O(V + E) - GC işaretleme (tüm nesne grafı taranır)'
  },
  spaceComplexity: 'O(n) - Hafıza blokları listesi veya GC yığın derinliği',
  analysisTitle: 'Bellek Parçalanma ve GC Analizi',
  analysisPoints: [
    'Buddy sisteminde, serbest kalan bir bloğun buddy\'si (offset XOR size adresindeki eşi) boş olduğunda birleşerek büyük blokları dinamik kurtarır.',
    'Schorr-Waite link inversion algoritması, nesne komşu göstergelerini geçici olarak tersine çevirerek yığın kullanmadan $O(1)$ ek hafıza ile DFS işaretleme yapar.',
    'Storage Compaction (Hafıza sıkıştırma), işaretlenen nesneleri hafızanın başlangıcına kaydırıp, referans göstergelerini güncelleyerek parçalı alanları tek bir büyük boş alana dönüştürür.'
  ],
  advantages: [
    'Buddy sistemi son derece hızlı tahsis ve geri verme sağlar.',
    'Mark-Sweep GC, dairesel referanslı nesneleri (circular references) bile başarıyla temizler.',
    'Buddy coalescing sayesinde komşu boş bellek blokları anında birleşir.'
  ],
  disadvantages: [
    'Buddy sistemi, $2^k$ boyutlarında çalıştığı için küçük taleplerde yüksek iç parçalanma (internal fragmentation) oluşturur.',
    'Mark-Sweep GC sırasında program durdurulmalıdır ("Stop-the-World" duraklaması).',
    'Sıkıştırma (compaction) işlemi tüm nesne göstergelerini güncellediği için işlemci maliyeti yüksektir.'
  ],
  relatedAlgorithms: [
    { title: 'Depth-First Search (DFS)', description: 'GC işaretleme aşamasında nesne grafını taramak için kullanılan temel graflarda dolaşma yöntemi.' },
    { title: 'Buddy Memory Coalescing', description: 'Buddy sisteminde komşu boş blokların birleşerek üst seviye blok oluşturması.' }
  ]
};
