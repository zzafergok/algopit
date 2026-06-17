import type { RemainingAlgorithmContent } from './types';

export const polynomialOperationsContent: RemainingAlgorithmContent = {
  title: 'Polynomial Operations (Polinom İşlemleri)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Algebra / Polynomials',
  difficulty: 'Orta',
  sources: ['Sedgewick'],
  summary: 'Polinomlar üzerinde Değerleme (Horner Yöntemi), Naive Çarpma, Seyrek Toplama ve Lagrange İnterpolasyonu işlemlerini gerçekleştirir.',
  descriptionParagraphs: [
    'Polinomlar, uygulamalı matematik ve bilgisayar biliminde fonksiyonları yaklaştırmak, eğri uydurmak ve veri sıkıştırmak için yaygın olarak kullanılır. Sedgewick, polinomların katsayı dizisi (dense) veya derece-katsayı çiftlerinden oluşan bağlı listeler (sparse) şeklinde temsil edilebileceğini belirtir.',
    'Bu modül 4 temel polinom algoritmasını bir araya getirir: 1) Horner Yöntemi ile bir noktada polinom değerini en verimli şekilde hesaplama (O(n)). 2) Katsayı dizileri üzerinde naive Polinom Çarpımı (O(n^2)). 3) Sıfır olmayan terimleri temsil eden Seyrek Polinom Toplamı. 4) Verilen noktaları kesen polinomu bulan Lagrange İnterpolasyonu.'
  ],
  sourceNotes: [
    'Sedgewick: Horner Yöntemiyle polinom değerleme: p(x) = a_n * x^n + ... + a_0 ifadesini iç içe çarpmalarla p(x) = ((a_n * x + a_(n-1)) * x + ...) olarak en aza indirme.',
    'Sedgewick: Seyrek polinomlarda ek bellek israfını önlemek için derece ve katsayı bilgini taşıyan terim düğümleriyle bağlı liste (linked list) kullanımı.',
    'Sedgewick: Lagrange interpolasyonu ile n adet noktadan geçen n-1. dereceden polinom katsayılarının bulunması.'
  ],
  steps: [
    'Değerleme (Horner): Sonuç katsayısını en büyük dereceyle başlat, her adımda x ile çarp ve bir küçük derecedeki katsayıyı ekle.',
    'Çarpma: İki polinomun derecelerinin toplamı kadar boyutta yeni bir katsayı dizisi oluştur. Her iki polinomun terimlerini karşılıklı çarparak derecelerine göre yeni diziye ekle.',
    'Seyrek Toplama: İki bağlı listeyi derecelerine göre paralel tarayarak, dereceleri eşitse katsayıları toplayıp yeni terim oluştur; derecesi büyük olanı doğrudan ekle.',
    'Lagrange İnterpolasyonu: Her x_i noktası için L_i(x) baz polinomlarını çarpımlarla oluştur, y_i ile çarp ve hepsini topla.'
  ],
  pseudocode: `HORNER-EVAL(A, x)
  result <- A[n]
  for i <- n - 1 down to 0
    result <- result * x + A[i]
  return result
POLY-MULTIPLY(A, B)
  n <- length(A)
  m <- length(B)
  result <- array of size n + m - 1 filled with 0
  for i <- 0 to n - 1
    for j <- 0 to m - 1
      result[i + j] <- result[i + j] + A[i] * B[j]
  return result`,
  codeExamples: {
    typescript: `function evaluatePolynomial(poly: number[], x: number): number {
  let result = poly[poly.length - 1];
  for (let i = poly.length - 2; i >= 0; i--) { result = result * x + poly[i]; }
  return result;
}
function multiplyPolynomials(poly1: number[], poly2: number[]): number[] {
  const result = Array(poly1.length + poly2.length - 1).fill(0);
  for (let i = 0; i < poly1.length; i++) {
    for (let j = 0; j < poly2.length; j++) { result[i + j] += poly1[i] * poly2[j]; }
  }
  return result;
}`,
  },
  demo: {
    kind: 'polynomial-operations',
    title: 'Polynomial Operations Demo',
    description: 'İşlemi seçin (evaluate, multiply, sparse-add, lagrange) ve parametrelerini girin. Örn: evaluate; 2,0,5; 3',
    placeholder: 'evaluate; 2,0,5; 3',
  },
  timeComplexity: {
    best: 'Horner: O(n), Çarpma: O(n*m), Lagrange: O(n^2)',
    average: 'Horner: O(n), Çarpma: O(n*m), Lagrange: O(n^2)',
    worst: 'Horner: O(n), Çarpma: O(n*m), Lagrange: O(n^2)',
  },
  spaceComplexity: 'Horner: O(1), Çarpma: O(n+m), Seyrek Toplama: O(n+m), Lagrange: O(n)',
  analysisTitle: 'Horner Yöntemi Neden Verimlidir?',
  analysisPoints: [
    'Klasik polinom hesaplamasında her x^i terimi için üs alma maliyeti oluşur.',
    'Horner Yöntemi ise polinomu yeniden paranteze alarak sadece n çarpım ve n toplama ile hesaplar.',
    'Bu yaklaşım hem çarpım sayısını en aza indirir hem de yuvarlama hatalarını azaltarak sayısal kararlılığı artırır.'
  ],
  advantages: [
    'Horner yöntemi minimum çarpım işlemiyle polinom değerlemede optimaldir.',
    'Seyrek polinom temsili, sıfırların çok olduğu büyük polinomlarda devasa bellek tasarrufu sağlar.',
    'Lagrange interpolasyonu veri noktalarından fonksiyonel kurallar üretmeyi sağlar.'
  ],
  disadvantages: [
    'Lagrange interpolasyonu yüksek derecelerde Runge fenomenine (salınımlara) yol açabilir.',
    'Naive polinom çarpımı büyük derecelerde yavaştır; bu durum için FFT tabanlı çarpım tercih edilir.'
  ],
  relatedAlgorithms: [
    {
      title: 'Fast Fourier Transform',
      description: 'Polinom çarpımını O(n log n) zamanda yapmak için frekans uzayını kullanır.',
    }
  ],
};

export const matrixOperationsContent: RemainingAlgorithmContent = {
  title: 'Matrix Operations (Matris İşlemleri)',
  category: 'Matematiksel Algoritmalar',
  categoryHref: '/algorithms/mathematical-algorithms',
  family: 'Linear Algebra / Matrix',
  difficulty: 'Kolay',
  sources: ['Sedgewick'],
  summary: 'Matrisler üzerinde Matris Toplama ve Matris-Vektör Çarpımı işlemlerini verimli şekilde gerçekleştirir.',
  descriptionParagraphs: [
    'Matris işlemleri, grafik programlama, yapay zeka, fizik simülasyonları ve mühendislik hesaplamalarının temelidir. Sedgewick, iki boyutlu diziler olarak temsil edilen matrislerin bellek düzenine (satır-satır veya sütun-sütun) dikkat edilerek işlenmesini vurgular.',
    'Bu modül, iki matrisin eleman bazlı toplanmasını (Matris Toplamı) ve bir matris ile bir vektörün çarpılmasını (Matris-Vektör Çarpımı) kapsar.'
  ],
  sourceNotes: [
    'Sedgewick: İki matrisin toplanabilmesi için boyutlarının tamamen eşit olması gerekir.',
    'Sedgewick: Matris-vektör çarpımında matrisin sütun sayısı ile vektörün eleman sayısının eşit olması gerekir. Çarpım sonucu yeni bir vektör üretir.'
  ],
  steps: [
    'Matris Toplamı: İki matrisin satır ve sütun boyutlarını doğrula. Her i ve j indeksi için C[i][j] = A[i][j] + B[i][j] değerini hesapla.',
    'Matris-Vektör Çarpımı: Matrisin sütun boyutu ile vektörün boyutunu doğrula. Her i satırı için, matrisin i. satırındaki elemanlar ile vektör elemanlarını karşılıklı çarpıp topla.'
  ],
  pseudocode: `MATRIX-ADD(A, B)
  for i <- 0 to rows-1
    for j <- 0 to cols-1
      C[i][j] <- A[i][j] + B[i][j]
  return C
MATRIX-VECTOR-MULT(A, V)
  for i <- 0 to rows-1
    result[i] <- 0
    for j <- 0 to cols-1
      result[i] <- result[i] + A[i][j] * V[j]
  return result`,
  codeExamples: {
    typescript: `function addMatrices(matrixA: number[][], matrixB: number[][]): number[][] {
  const rows = matrixA.length, cols = matrixA[0].length;
  if (rows !== matrixB.length || cols !== matrixB[0].length) { throw new Error('Boyut uyuşmazlığı.'); }
  const result: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) { result[i][j] = matrixA[i][j] + matrixB[i][j]; }
  }
  return result;
}
function multiplyMatrixVector(matrix: number[][], vector: number[]): number[] {
  const rows = matrix.length, cols = matrix[0].length;
  if (cols !== vector.length) { throw new Error('Boyut uyuşmazlığı.'); }
  const result = Array(rows).fill(0);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) { result[i] += matrix[i][j] * vector[j]; }
  }
  return result;
}`,
  },
  demo: {
    kind: 'matrix-operations',
    title: 'Matrix Operations Demo',
    description: 'İşlemi seçin (add veya vector-mult). Matrisleri virgül ve noktalı virgülle ayırın. Örn: add; 1,2;3,4 | 5,6;7,8 veya vector-mult; 1,2;3,4 | 5,6',
    placeholder: 'add; 1,2;3,4 | 5,6;7,8',
  },
  timeComplexity: {
    best: 'Toplam: O(r*c), Çarpım: O(r*c)',
    average: 'Toplam: O(r*c), Çarpım: O(r*c)',
    worst: 'Toplam: O(r*c), Çarpım: O(r*c)',
  },
  spaceComplexity: 'O(r*c) (Toplam sonucu) / O(r) (Çarpım sonucu)',
  analysisTitle: 'Bellek Erişimi ve Boyut Sınırlamaları',
  analysisPoints: [
    'Matrislerin programlama dillerinde iki boyutlu dizi olarak saklanması, satır yönlü taramayı tercih etmeyi gerektirir.',
    'Boyut uyuşmazlığı durumunda işlemler matematiksel olarak tanımsızdır ve programlama seviyesinde çalışma zamanı hatası fırlatılmalıdır.'
  ],
  advantages: [
    'Doğrusal denklem sistemlerinin çözümünde temel yapı taşıdır.',
    'Uygulaması son derece kolay ve öngörülebilirdir.'
  ],
  disadvantages: [
    'Büyük matrislerde döngü sıralaması optimizasyonu yapılmazsa cache kaçırma oranı artar.'
  ],
  relatedAlgorithms: [
    {
      title: 'Gaussian Elimination',
      description: 'Matrisleri kullanarak doğrusal denklem sistemlerini çözer.',
      href: '/algorithms/mathematical-algorithms/gaussian-elimination',
    }
  ],
};
