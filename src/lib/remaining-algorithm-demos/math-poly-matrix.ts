import type { GenericDemoResult } from './types';

export function runPolynomialOperationsDemo(input: string): GenericDemoResult {
  const [rawOp, rawParams1, rawParams2] = input.split(';').map(s => s.trim());
  
  if (!rawOp || !rawParams1) {
    throw new Error('Biçim hatalı. Örnek: evaluate; 2,0,5; 3');
  }

  const op = rawOp.toLowerCase();
  const trace: string[] = [];

  if (op === 'evaluate') {
    const poly = rawParams1.split(',').map(Number);
    const x = Number(rawParams2);
    if (poly.some(isNaN) || isNaN(x)) {
      throw new Error('Katsayılar ve x geçerli sayılar olmalıdır.');
    }
    
    trace.push(`Horner Değerlemesi Başladı. Polinom katsayıları (a_0 ... a_n): [${poly.join(', ')}], x = ${x}`);
    let result = poly[poly.length - 1];
    trace.push(`En yüksek dereceli katsayı alındı: result = ${result}`);

    for (let i = poly.length - 2; i >= 0; i--) {
      const prev = result;
      result = result * x + poly[i];
      trace.push(`Derece ${i} için: result = (${prev} * ${x}) + ${poly[i]} = ${result}`);
    }

    return {
      result: result.toString(),
      trace,
      metadata: [`Polinom: ${poly.map((c, idx) => `${c}x^${idx}`).reverse().join(' + ')}`, `x: ${x}`],
    };
  }

  if (op === 'multiply') {
    const poly1 = rawParams1.split(',').map(Number);
    if (!rawParams2) throw new Error('Çarpma için ikinci polinom katsayıları gerekir.');
    const poly2 = rawParams2.split(',').map(Number);

    if (poly1.some(isNaN) || poly2.some(isNaN)) {
      throw new Error('Katsayılar geçerli sayılar olmalıdır.');
    }

    trace.push(`Polinom Çarpımı Başladı.`);
    trace.push(`P1: [${poly1.join(', ')}], P2: [${poly2.join(', ')}]`);

    const result = Array(poly1.length + poly2.length - 1).fill(0);
    for (let i = 0; i < poly1.length; i++) {
      for (let j = 0; j < poly2.length; j++) {
        const product = poly1[i] * poly2[j];
        result[i + j] += product;
        trace.push(`P1[${i}] * P2[${j}] = ${poly1[i]} * ${poly2[j]} = ${product}. result[${i + j}] yeni değeri: ${result[i + j]}`);
      }
    }

    return {
      result: `[${result.join(', ')}]`,
      trace,
      metadata: [`Derece: ${result.length - 1}`, `Çarpım Polinomu: ${result.map((c, idx) => `${c}x^${idx}`).reverse().join(' + ')}`],
    };
  }

  if (op === 'sparse-add') {
    if (!rawParams2) throw new Error('Seyrek toplama için iki polinom gerekir.');
    
    const parseSparse = (str: string) => {
      return str.split(',').map(s => {
        const [coef, exp] = s.split(':').map(Number);
        return { coef, exp };
      }).sort((a, b) => b.exp - a.exp);
    };

    const p1 = parseSparse(rawParams1);
    const p2 = parseSparse(rawParams2);

    trace.push('Seyrek Polinom Toplamı Başladı.');
    trace.push(`P1 (seyrek): ${p1.map(t => `${t.coef}x^${t.exp}`).join(' + ')}`);
    trace.push(`P2 (seyrek): ${p2.map(t => `${t.coef}x^${t.exp}`).join(' + ')}`);

    const result: { coef: number; exp: number }[] = [];
    let i = 0, j = 0;

    while (i < p1.length || j < p2.length) {
      const t1 = p1[i];
      const t2 = p2[j];

      if (t1 && (!t2 || t1.exp > t2.exp)) {
        result.push(t1);
        trace.push(`P1 terimi doğrudan eklendi: ${t1.coef}x^${t1.exp}`);
        i++;
      } else if (t2 && (!t1 || t2.exp > t1.exp)) {
        result.push(t2);
        trace.push(`P2 terimi doğrudan eklendi: ${t2.coef}x^t2.exp`);
        j++;
      } else if (t1 && t2 && t1.exp === t2.exp) {
        const sumCoef = t1.coef + t2.coef;
        trace.push(`Dereceler eşit (${t1.exp}). Katsayılar toplandı: ${t1.coef} + ${t2.coef} = ${sumCoef}`);
        if (sumCoef !== 0) {
          result.push({ coef: sumCoef, exp: t1.exp });
        }
        i++;
        j++;
      }
    }

    const resStr = result.map(t => `${t.coef}x^${t.exp}`).join(' + ') || '0';
    return {
      result: resStr,
      trace,
      metadata: ['Seyrek toplama işlemi derece eşleştirmeyle yapılmıştır.'],
    };
  }

  if (op === 'lagrange') {
    const points = rawParams1.split(',').map(s => {
      const [x, y] = s.split(':').map(Number);
      return { x, y };
    });
    const xVal = Number(rawParams2);

    if (points.some(p => isNaN(p.x) || isNaN(p.y)) || isNaN(xVal)) {
      throw new Error('Noktalar (x:y) ve x değeri geçerli sayılar olmalıdır.');
    }

    trace.push(`Lagrange İnterpolasyonu Başladı. Noktalar: [${points.map(p => `(${p.x},${p.y})`).join(', ')}], Hedef x = ${xVal}`);

    let totalSum = 0;
    for (let i = 0; i < points.length; i++) {
      let term = points[i].y;
      let termTrace = `${points[i].y}`;

      for (let j = 0; j < points.length; j++) {
        if (j !== i) {
          term *= (xVal - points[j].x) / (points[i].x - points[j].x);
          termTrace += ` * (${xVal} - ${points[j].x}) / (${points[i].x} - ${points[j].x})`;
        }
      }
      totalSum += term;
      trace.push(`L_${i}(${xVal}) Terimi: ${termTrace} = ${term}`);
    }

    return {
      result: totalSum.toString(),
      trace,
      metadata: [`Interpolasyon Nokta Sayısı: ${points.length}`, `x = ${xVal} için Yaklaşık y = ${totalSum}`],
    };
  }

  throw new Error('Bilinmeyen Polinom işlemi. evaluate, multiply, sparse-add veya lagrange seçin.');
}

export function runMatrixOperationsDemo(input: string): GenericDemoResult {
  const [rawOp, rawParams] = splitRequired(input, ';');
  const op = rawOp.toLowerCase().trim();
  const trace: string[] = [];

  if (op === 'add') {
    const [rawA, rawB] = splitRequired(rawParams, '|');
    const parseMatrix = (str: string) => str.trim().split(';').map(row => row.split(',').map(Number));
    const A = parseMatrix(rawA);
    const B = parseMatrix(rawB);

    if (A.some(r => r.some(isNaN)) || B.some(r => r.some(isNaN))) {
      throw new Error('Geçerli sayılardan oluşan matrisler girin.');
    }
    if (A.length !== B.length || A[0].length !== B[0].length) {
      throw new Error('Matrislerin boyutları toplama işlemi için eşit olmalıdır.');
    }

    const rows = A.length;
    const cols = A[0].length;
    const C: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    trace.push(`Matris toplama işlemi başladı (${rows}x${cols}).`);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        C[i][j] = A[i][j] + B[i][j];
        trace.push(`C[${i}][${j}] = A[${i}][${j}] + B[${i}][${j}] = ${A[i][j]} + ${B[i][j]} = ${C[i][j]}`);
      }
    }

    const result = C.map(row => `[${row.join(', ')}]`).join(' | ');
    return {
      result,
      trace,
      metadata: [`Matris A: ${A.map(r => `[${r.join(',')}]`).join(' ')}`, `Matris B: ${B.map(r => `[${r.join(',')}]`).join(' ')}`],
    };
  }

  if (op === 'vector-mult') {
    const [rawA, rawV] = splitRequired(rawParams, '|');
    const A = rawA.trim().split(';').map(row => row.split(',').map(Number));
    const V = rawV.trim().split(',').map(Number);

    if (A.some(r => r.some(isNaN)) || V.some(isNaN)) {
      throw new Error('Geçerli matris ve vektör değerleri girin.');
    }
    if (A[0].length !== V.length) {
      throw new Error(`Matris sütun sayısı (${A[0].length}) ile vektör boyutu (${V.length}) eşit olmalıdır.`);
    }

    const rows = A.length;
    const cols = A[0].length;
    const result = Array(rows).fill(0);
    trace.push(`Matris-Vektör çarpımı başladı (Matris: ${rows}x${cols}, Vektör: ${V.length} elemanlı).`);

    for (let i = 0; i < rows; i++) {
      let sum = 0;
      const terms: string[] = [];
      for (let j = 0; j < cols; j++) {
        const prod = A[i][j] * V[j];
        sum += prod;
        terms.push(`${A[i][j]}*${V[j]}`);
      }
      result[i] = sum;
      trace.push(`Satır ${i}: ${terms.join(' + ')} = ${sum}`);
    }

    return {
      result: `[${result.join(', ')}]`,
      trace,
      metadata: [`Çarpım Sonucu Vektör: [${result.join(', ')}]`],
    };
  }

  throw new Error('Bilinmeyen işlem. add veya vector-mult girin.');
}

export function runGaussianEliminationDemo(input: string): GenericDemoResult {
  const [rawOp, rawParams] = splitRequired(input, ';');
  const op = rawOp.toLowerCase().trim();
  const trace: string[] = [];

  const rows = rawParams.split('|').map(row => {
    const [coefsStr, resStr] = splitRequired(row, ':');
    const coefs = coefsStr.split(',').map(Number);
    const result = Number(resStr);
    return { coefs, result };
  });

  const n = rows.length;
  if (rows.some(r => r.coefs.length !== n || isNaN(r.result) || r.coefs.some(isNaN))) {
    throw new Error('Geçerli bir n x n katsayılar matrisi ve sonuç sütunu girin.');
  }

  const aug: number[][] = rows.map(r => [...r.coefs, r.result]);
  trace.push(`Genişletilmiş matris oluşturuldu (n = ${n}):`);
  aug.forEach((r, idx) => trace.push(`Satır ${idx}: ${r.slice(0, n).join(', ')} | ${r[n]}`));

  if (op === 'elimination') {
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) {
          maxRow = k;
        }
      }
      if (maxRow !== i) {
        const temp = aug[i];
        aug[i] = aug[maxRow];
        aug[maxRow] = temp;
        trace.push(`Sütun ${i} için kısmi pivotlama: Satır ${i} ile Satır ${maxRow} yer değiştirildi.`);
      }

      if (Math.abs(aug[i][i]) < 1e-9) {
        throw new Error('Matris tekildir (singular) veya deterministiği sıfırdır, tek çözüm yoktur.');
      }

      for (let k = i + 1; k < n; k++) {
        const factor = aug[k][i] / aug[i][i];
        trace.push(`Satır ${k} için çarpan: ${aug[k][i]} / ${aug[i][i]} = ${factor.toFixed(4)}`);
        for (let j = i; j <= n; j++) {
          aug[k][j] -= factor * aug[i][j];
        }
        trace.push(`Satır ${k} yeni hali: ${aug[k].map(v => v.toFixed(2)).join(', ')}`);
      }
    }

    const x = Array(n).fill(0);
    trace.push('Geri yerine koyma adımı başladı:');
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += aug[i][j] * x[j];
      }
      x[i] = (aug[i][n] - sum) / aug[i][i];
      trace.push(`x[${i}] = (${aug[i][n].toFixed(2)} - ${sum.toFixed(2)}) / ${aug[i][i].toFixed(2)} = ${x[i].toFixed(4)}`);
    }

    return {
      result: x.map((val, idx) => `x_${idx} = ${val.toFixed(4)}`).join(', '),
      trace,
      metadata: ['Thomas/Pivoting Gauss Eliminasyonu kullanılmıştır.'],
    };
  }

  if (op === 'jordan') {
    for (let i = 0; i < n; i++) {
      let maxRow = i;
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) { maxRow = k; }
      }
      if (maxRow !== i) {
        const temp = aug[i];
        aug[i] = aug[maxRow];
        aug[maxRow] = temp;
        trace.push(`Gauss-Jordan Sütun ${i} için pivotlama: Satır ${i} <-> Satır ${maxRow}`);
      }

      if (Math.abs(aug[i][i]) < 1e-9) {
        throw new Error('Matris tekildir (singular).');
      }

      const pivotVal = aug[i][i];
      for (let j = i; j <= n; j++) {
        aug[i][j] /= pivotVal;
      }
      trace.push(`Satır ${i} pivot elemanına bölündü: ${aug[i].map(v => v.toFixed(2)).join(', ')}`);

      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = aug[k][i];
          for (let j = i; j <= n; j++) {
            aug[k][j] -= factor * aug[i][j];
          }
          trace.push(`Satır ${k} sıfırlandı: ${aug[k].map(v => v.toFixed(2)).join(', ')}`);
        }
      }
    }

    return {
      result: aug.map((row, idx) => `x_${idx} = ${row[n].toFixed(4)}`).join(', '),
      trace,
      metadata: ['Doğrudan birim matris formuna indirgeme (Gauss-Jordan) kullanılmıştır.'],
    };
  }

  throw new Error('Bilinmeyen yöntem. elimination veya jordan seçin.');
}

function splitRequired(input: string, separator: string): [string, string] {
  const separatorIndex = input.indexOf(separator);
  if (separatorIndex === -1) {
    throw new Error(`Girdiyi "${separator}" karakteriyle iki parçaya ayırın.`);
  }
  return [
    input.slice(0, separatorIndex).trim(),
    input.slice(separatorIndex + 1).trim(),
  ];
}
