import type { RemainingAlgorithmContent } from './types';

export const gaussianEliminationContent: RemainingAlgorithmContent = {
  title: 'Gaussian Elimination (Gauss Eliminasyonu)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Linear Algebra / System of Equations',
  difficulty: 'Orta',
  sources: ['Sedgewick'],
  summary: 'Doğrusal denklem sistemlerini çözmek için İleri Eliminasyon, Geri Yerine Koyma ve Gauss-Jordan yöntemlerini kullanır.',
  descriptionParagraphs: [
    'Gaussian Elimination, n bilinmeyenli n adet doğrusal denklemden oluşan bir sistemi çözmek için kullanılan klasik ve sistematik bir cebirsel yöntemdir. Sedgewick, katsayılar matrisini üst üçgensel matris formuna getirdiğini açıklar.',
    'Bu modül, üç ana adımı bir araya getirir: 1) Katsayılar matrisini sadeleştiren İleri Eliminasyon. 2) Üst üçgensel formdan bilinmeyenleri bulup geriye doğru yerleştiren Geri Yerine Koyma. 3) Matrisi doğrudan birim matris formuna getirerek çözümü tek adımda sunan Gauss-Jordan Yöntemi.'
  ],
  sourceNotes: [
    'Sedgewick: Eliminasyon adımlarında sıfıra bölme hatasından kaçınmak ve yuvarlama hatalarını azaltmak için kısmi pivotlama yapılması şarttır.',
    'Sedgewick: Gauss-Jordan yöntemi, geri yerine koyma adımına ihtiyaç duymadan matrisi doğrudan indirgenmiş satır basamak formuna sokar.'
  ],
  steps: [
    'Genişletilmiş Matris Kurulumu: Katsayılar matrisini ve sonuç vektörünü birleştirerek [A | B] matrisini oluştur.',
    'İleri Eliminasyon: Her sütun için pivot elemanı seç. Pivotun altındaki tüm satırlarda ilgili bilinmeyeni yok etmek için satır çıkarma işlemleri uygula.',
    'Geri Yerine Koyma: En alt satırdan başlayarak bilinmeyenlerin değerini çöz ve yukarıdaki satırlarda yerine yaz.',
    'Gauss-Jordan (Alternatif): İleri eliminasyonda pivot elemanının hem altındaki hem de üstündeki terimleri yok et ve pivot satırını 1 yap.'
  ],
  pseudocode: `GAUSSIAN-ELIMINATION(A, B)
  n <- rows(A)
  for i <- 0 to n - 1
    find row k > i with max |A[k][i]|
    swap row i and row k
    for j <- i + 1 to n - 1
      factor <- A[j][i] / A[i][i]
      subtract factor * row i from row j
  for i <- n - 1 down to 0
    x[i] <- (B[i] - sum(A[i][j] * x[j] for j > i)) / A[i][i]
  return x`,
  codeExamples: {
    typescript: `function gaussianElimination(matrix: number[][], results: number[]): number[] {
  const n = matrix.length;
  const aug: number[][] = matrix.map((row, i) => [...row, results[i]]);
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) { if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) { maxRow = k; } }
    const temp = aug[i]; aug[i] = aug[maxRow]; aug[maxRow] = temp;
    if (Math.abs(aug[i][i]) < 1e-9) { throw new Error('Matris tekildir veya sonsuz çözümlüdür.'); }
    for (let k = i + 1; k < n; k++) {
      const factor = aug[k][i] / aug[i][i];
      for (let j = i; j <= n; j++) { aug[k][j] -= factor * aug[i][j]; }
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    for (let j = i + 1; j < n; j++) { sum += aug[i][j] * x[j]; }
    x[i] = (aug[i][n] - sum) / aug[i][i];
  }
  return x;
}`
  },
  demo: {
    kind: 'gaussian-elimination',
    title: 'Gaussian Elimination Demo',
    description: 'Çözmek istediğiniz yöntemi (elimination veya jordan) ve genişletilmiş matris değerlerini girin. Örn: elimination; 2,1,-1:8 | -3,-1,2:-11 | -2,1,2:-3',
    placeholder: 'elimination; 2,1,-1:8 | -3,-1,2:-11 | -2,1,2:-3',
  },
  timeComplexity: {
    best: 'O(n^3)',
    average: 'O(n^3)',
    worst: 'O(n^3)',
  },
  spaceComplexity: 'O(n^2) (Genişletilmiş matris saklama)',
  analysisTitle: 'Pivotlama ve Yuvarlama Hataları',
  analysisPoints: [
    'Kısmi pivotlama, her adımda mutlak değerce en büyük elemana sahip satırı üste alarak bölme işlemlerinde sıfıra yakın sayılara bölünmesini engeller.',
    'Bu durum, bilgisayardaki kayan noktalı sayı temsilinden kaynaklanan yuvarlama hatalarının birikerek çözümü bozmasını önler.',
    'Eğer katsayılar matrisinin determinantı sıfır ise sistemin çözümü yoktur veya sonsuz çözümü vardır.'
  ],
  advantages: [
    'Herhangi bir doğrusal denklem sistemi için genel ve deterministik bir çözüm sunar.',
    'Bilinmeyen sayısı çok büyük olmayan sistemlerde hızlıdır.'
  ],
  disadvantages: [
    'Zaman karmaşıklığı O(n^3) olduğu için binlerce bilinmeyen içeren devasa sistemlerde iteratif yöntemlere göre yavaş kalır.'
  ],
  relatedAlgorithms: [
    {
      title: 'Matrix Operations',
      description: 'Determinant, çarpım ve toplama gibi matris işlemlerini kapsar.',
      href: '/algorithms/mathematical-algorithms/matrix-operations',
    }
  ],
};

export const interpolationFittingContent: RemainingAlgorithmContent = {
  title: 'Interpolation & Fitting (İnterpolasyon ve Eğri Uydurma)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Numerical Methods / Approximation',
  difficulty: 'Zor',
  sources: ['Sedgewick'],
  summary: 'Veri noktalarından yumuşak geçişli eğriler üretmek için Spline İnterpolasyonu ve En Küçük Kareler Uyumu yöntemlerini kullanır.',
  descriptionParagraphs: [
    'Ayrık veri noktalarından oluşan sistemleri analiz etmek için iki temel yaklaşım kullanılır: Noktaların tamamından tam olarak geçen bir eğri çizmek (İnterpolasyon) veya veri gürültüsünü filtreleyerek noktaların yakınına oturan genel bir trend eğrisi bulmak (Eğri Uydurma).',
    'Bu modül iki önemli yaklaşımı sunar: 1) Noktalar arasında üçüncü dereceden parçalı polinomlar oluşturarak yumuşak geçişler sunan Spline İnterpolasyonu. 2) Noktalar ile uydurulan doğru arasındaki kare hataların toplamını en aza indiren doğrusal En Küçük Kareler Uyumu.'
  ],
  sourceNotes: [
    'Sedgewick: Kübik spline interpolasyonu, birleşim noktalarında birinci ve ikinci türevlerin sürekliliğini koruyarak son derece estetik ve pürüzsüz geçişler üretir.',
    'Sedgewick: En küçük kareler uyumu (lineer regresyon), y = ax + b doğrusunun parametrelerini türevleri sıfıra eşitleyerek analitik yoldan çözer.'
  ],
  steps: [
    'En Küçük Kareler: Tüm (x, y) noktaları için sum(x), sum(y), sum(x^2) ve sum(x*y) değerlerini hesapla. Denklem sisteminden eğim (a) ve kesim noktası (b) katsayılarını çöz.',
    'Spline İnterpolasyonu: Noktalar arası mesafeleri (h_i) ve her noktadaki ikinci türevleri (M_i) bulmak için tridiagonal denklem sistemi oluştur ve Thomas algoritmasıyla çöz.'
  ],
  pseudocode: `LEAST-SQUARES-FIT(Points)
  n <- length(Points)
  sumX <- sum(p.x), sumY <- sum(p.y)
  sumXX <- sum(p.x * p.x), sumXY <- sum(p.x * p.y)
  slope <- (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  intercept <- (sumY - slope * sumX) / n
  return (slope, intercept)
CUBIC-SPLINE(Points)
  // 1. Calculate step sizes h_i = x_(i+1) - x_i
  // 2. Set up tridiagonal system for second derivatives M_i
  // 3. Solve using Thomas algorithm
  // 4. Interpolate S(x) using cubic formula with M_i and points`,
  codeExamples: {
    typescript: `type Point = { x: number; y: number };
function leastSquaresFit(points: Point[]): { slope: number; intercept: number } {
  const n = points.length;
  let sumX = 0, sumY = 0, sumXX = 0, sumXY = 0;
  for (const p of points) {
    sumX += p.x; sumY += p.y;
    sumXX += p.x * p.x; sumXY += p.x * p.y;
  }
  const denominator = n * sumXX - sumX * sumX;
  if (Math.abs(denominator) < 1e-9) { throw new Error('X koordinatları tek bir dikey doğru üzerindedir.'); }
  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}`
  },
  demo: {
    kind: 'interpolation-fitting',
    title: 'Interpolation & Fitting Demo',
    description: 'Yöntemi (least-squares veya spline) ve noktaları girin. Örn: least-squares; 1:2, 2:3, 3:5 | 2.5 veya spline; 1:2, 2:4, 3:2 | 1.5',
    placeholder: 'least-squares; 1:2, 2:3, 3:5 | 2.5',
  },
  timeComplexity: {
    best: 'En Küçük Kareler: O(n), Spline: O(n)',
    average: 'En Küçük Kareler: O(n), Spline: O(n)',
    worst: 'En Küçük Kareler: O(n), Spline: O(n)',
  },
  spaceComplexity: 'O(n)',
  analysisTitle: 'Regresyon ve İnterpolasyon Farkı',
  analysisPoints: [
    'İnterpolasyon, veri noktalarının kesinlikle doğru olduğunu varsayar ve her noktadan geçer. Gürültülü ölçümlerde salınımlara yol açabilir.',
    'Regresyon (Eğri Uydurma) ise noktaların gürültülü olduğunu varsayar ve genel eğilimi modeller.',
    'Kübik spline interpolasyonu, uç noktalarda "natural boundary" varsayımıyla çözülür.'
  ],
  advantages: [
    'En küçük kareler uyumu, veri trendlerini tahmin etmede son derece hızlı ve açıklayıcıdır.',
    'Spline yöntemi, yüksek dereceli Lagrange polinomlarının aksine salınım yapmadan kararlı ara değerler bulur.'
  ],
  disadvantages: [
    'Spline interpolasyonu, veri dışındaki tahminlerde güvenilmezdir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Polynomial Operations',
      description: 'Lagrange interpolasyonu gibi diğer polinom uydurma yöntemlerini içerir.',
      href: '/algorithms/mathematical-algorithms/polynomial-operations',
    }
  ],
};
