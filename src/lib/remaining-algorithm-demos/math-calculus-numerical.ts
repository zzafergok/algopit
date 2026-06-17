import type { GenericDemoResult } from './types';
import { integrateSymbolic } from './math-calculus-symbolic';

function cleanMathExpression(expr: string): string {
  return expr
    .replace(/\bsin\b/g, 'Math.sin')
    .replace(/\bcos\b/g, 'Math.cos')
    .replace(/\btan\b/g, 'Math.tan')
    .replace(/\bexp\b/g, 'Math.exp')
    .replace(/\bln\b/g, 'Math.log')
    .replace(/\bsqrt\b/g, 'Math.sqrt')
    .replace(/\bpow\b/g, 'Math.pow')
    .replace(/\bpi\b/gi, 'Math.PI')
    .replace(/\be\b/g, 'Math.E')
    .replace(/\^/g, '**');
}

function adaptiveSimpson(
  f: (x: number) => number,
  a: number,
  b: number,
  tol: number,
  whole: number,
  depth: number,
  maxDepth: number,
  trace: string[]
): number {
  const c = (a + b) / 2;
  const h = (b - a) / 2;
  const fa = f(a), fb = f(b), fc = f(c);
  const left = (h / 6) * (fa + 4 * f((a + c) / 2) + fc);
  const right = (h / 6) * (fc + 4 * f((c + b) / 2) + fb);
  const diff = left + right - whole;
  if (depth >= maxDepth) {
    trace.push(`[Adaptif Uyarı] Maksimum derinliğe (${maxDepth}) ulaşıldı. [${a.toFixed(4)}, ${b.toFixed(4)}]`);
    return left + right + diff / 15;
  }
  if (Math.abs(diff) <= 15 * tol) {
    trace.push(`Aralık [${a.toFixed(4)}, ${b.toFixed(4)}] yakınsadı. Değer: ${(left + right + diff / 15).toFixed(6)}`);
    return left + right + diff / 15;
  }
  return (
    adaptiveSimpson(f, a, c, tol / 2, left, depth + 1, maxDepth, trace) +
    adaptiveSimpson(f, c, b, tol / 2, right, depth + 1, maxDepth, trace)
  );
}

export function runNumericalIntegrationDemo(input: string): GenericDemoResult {
  const [rawOp, rawParams] = splitRequired(input, ';');
  const op = rawOp.toLowerCase().trim();
  const trace: string[] = [];

  if (op === 'symbolic') {
    const { result, trace: symTrace } = integrateSymbolic(rawParams.trim());
    return { result, trace: symTrace, metadata: ['Sembolik İntegral'] };
  }

  if (op === 'spline') {
    const pairs = rawParams.split(/[,\s]+/).filter(Boolean);
    const points = pairs.map((pair) => {
      const parts = pair.split(':');
      if (parts.length !== 2) throw new Error('Geçersiz nokta formatı. Örn: 0:0, 1:1');
      return { x: Number(parts[0]), y: Number(parts[1]) };
    });

    const n = points.length;
    if (n < 3) throw new Error('Spline integrali için en az 3 nokta gereklidir.');

    const h = Array(n - 1).fill(0);
    for (let i = 0; i < n - 1; i++) {
      h[i] = points[i + 1].x - points[i].x;
      if (h[i] <= 0) throw new Error('X koordinatları kesinlikle artan sırada olmalıdır.');
    }

    const a = Array(n).fill(0), b = Array(n).fill(0), c = Array(n).fill(0), d = Array(n).fill(0);
    for (let i = 1; i < n - 1; i++) {
      a[i] = h[i - 1] / 6;
      b[i] = (h[i - 1] + h[i]) / 3;
      c[i] = h[i] / 6;
      d[i] = (points[i + 1].y - points[i].y) / h[i] - (points[i].y - points[i - 1].y) / h[i - 1];
    }

    const cp = Array(n).fill(0), dp = Array(n).fill(0), M = Array(n).fill(0);
    cp[1] = c[1] / b[1];
    dp[1] = d[1] / b[1];

    for (let i = 2; i < n - 1; i++) {
      const denom = b[i] - a[i] * cp[i - 1];
      cp[i] = c[i] / denom;
      dp[i] = (d[i] - a[i] * dp[i - 1]) / denom;
    }

    M[n - 2] = dp[n - 2];
    for (let i = n - 3; i >= 1; i--) {
      M[i] = dp[i] - cp[i] * M[i + 1];
    }

    trace.push('M katsayıları hesaplandı (Thomas Algoritması).');
    let totalArea = 0;
    for (let i = 0; i < n - 1; i++) {
      const hi = h[i];
      const area = ((points[i].y + points[i + 1].y) / 2) * hi - ((M[i] + M[i + 1]) / 24) * Math.pow(hi, 3);
      totalArea += area;
      trace.push(`Aralık [${points[i].x}, ${points[i+1].x}] alanı: ${area.toFixed(6)}`);
    }

    return {
      result: totalArea.toFixed(6),
      trace,
      metadata: ['Yöntem: Kübik Spline İntegrali', `Nokta Sayısı: ${n}`],
    };
  }

  const [paramsPart, exprPart] = rawParams.split('|');
  const expr = exprPart ? exprPart.trim() : 'x * x';
  const clean = cleanMathExpression(expr);
  let f: (x: number) => number;
  try {
    f = new Function('x', `return ${clean}`) as (x: number) => number;
    f(1.0);
  } catch (e) {
    throw new Error(`Geçersiz fonksiyon ifadesi: ${expr}`);
  }

  const parts = paramsPart.split(/[,\s]+/).filter(Boolean);
  if (parts.length < 2) throw new Error('a ve b parametreleri gereklidir.');

  const a = Number(parts[0]), b = Number(parts[1]);
  if (isNaN(a) || isNaN(b)) throw new Error('a ve b geçerli sayılar olmalıdır.');

  if (op === 'adaptive') {
    const tol = parts[2] ? Number(parts[2]) : 1e-4;
    if (isNaN(tol) || tol <= 0) throw new Error('Geçersiz tolerans.');
    trace.push(`Adaptif Kuadratür başlatıldı. Aralık: [${a}, ${b}], Tolerans: ${tol}`);
    const whole = ((b - a) / 6) * (f(a) + 4 * f((a + b) / 2) + f(b));
    const result = adaptiveSimpson(f, a, b, tol, whole, 0, 12, trace);
    return {
      result: result.toFixed(6),
      trace,
      metadata: [`Yöntem: Adaptif Simpson`, `Aralık: [${a}, ${b}]`, `Fonksiyon: f(x) = ${expr}`],
    };
  }

  if (parts.length < 3) throw new Error('N parametresi gereklidir.');
  const n = Number(parts[2]);
  if (isNaN(n) || n <= 0) throw new Error('N değeri pozitif bir tamsayı olmalıdır.');

  if (op === 'rectangle') {
    const h = (b - a) / n;
    let sum = 0;
    trace.push(`Dikdörtgen Yöntemi (Orta Riemann) - h = ${h.toFixed(6)}`);
    for (let i = 0; i < n; i++) {
      const x = a + (i + 0.5) * h;
      const y = f(x);
      sum += y;
      if (n <= 10) trace.push(`  x = ${x.toFixed(4)}: f(x) = ${y.toFixed(6)}`);
    }
    return {
      result: (sum * h).toFixed(6),
      trace,
      metadata: [`Yöntem: Dikdörtgen Yöntemi`, `Aralık: [${a}, ${b}]`, `Aralık Sayısı (N): ${n}`, `Fonksiyon: f(x) = ${expr}`],
    };
  }

  if (op === 'trapezoid') {
    const h = (b - a) / n;
    let sum = 0.5 * (f(a) + f(b));
    trace.push(`Yamuk Yöntemi - h = ${h.toFixed(6)}`);
    trace.push(`  Sınırlar: f(a) = ${f(a).toFixed(6)}, f(b) = ${f(b).toFixed(6)}`);
    for (let i = 1; i < n; i++) {
      const x = a + i * h;
      const y = f(x);
      sum += y;
      if (n <= 10) trace.push(`  x = ${x.toFixed(4)}: f(x) = ${y.toFixed(6)}`);
    }
    return {
      result: (sum * h).toFixed(6),
      trace,
      metadata: [`Yöntem: Yamuk Yöntemi`, `Aralık: [${a}, ${b}]`, `Aralık Sayısı (N): ${n}`, `Fonksiyon: f(x) = ${expr}`],
    };
  }

  if (op === 'simpson') {
    let actualN = n;
    if (actualN % 2 !== 0) {
      actualN += 1;
      trace.push(`Simpson yöntemi için N çift olmalı. N, ${actualN} olarak güncellendi.`);
    }
    const h = (b - a) / actualN;
    let sum = f(a) + f(b);
    trace.push(`Simpson Yöntemi (1/3) - h = ${h.toFixed(6)}`);
    for (let i = 1; i < actualN; i++) {
      const x = a + i * h;
      const y = f(x);
      const coef = i % 2 === 0 ? 2 : 4;
      sum += coef * y;
      if (actualN <= 10) trace.push(`  x = ${x.toFixed(4)}: f(x) = ${y.toFixed(6)} (katsayı: ${coef})`);
    }
    return {
      result: ((sum * h) / 3).toFixed(6),
      trace,
      metadata: [`Yöntem: Simpson Yöntemi`, `Aralık: [${a}, ${b}]`, `Aralık Sayısı (N): ${actualN}`, `Fonksiyon: f(x) = ${expr}`],
    };
  }

  if (op === 'romberg') {
    const steps = Math.min(Math.max(n, 1), 8);
    const R: number[][] = Array.from({ length: steps }, () => Array(steps).fill(0));
    trace.push(`Romberg İntegrasyonu başlatıldı. Adım sayısı: ${steps}`);
    R[0][0] = 0.5 * (b - a) * (f(a) + f(b));
    trace.push(`R[0][0] = ${R[0][0].toFixed(6)} (1 aralık Yamuk)`);
    
    for (let i = 1; i < steps; i++) {
      const pointsCount = Math.pow(2, i);
      const h = (b - a) / pointsCount;
      let sum = 0;
      for (let k = 1; k <= pointsCount; k += 2) sum += f(a + k * h);
      R[i][0] = 0.5 * R[i - 1][0] + sum * h;
      trace.push(`R[${i}][0] = ${R[i][0].toFixed(6)} (${pointsCount} aralık Yamuk)`);
      for (let j = 1; j <= i; j++) {
        R[i][j] = R[i][j - 1] + (R[i][j - 1] - R[i - 1][j - 1]) / (Math.pow(4, j) - 1);
        trace.push(`  R[${i}][${j}] = ${R[i][j].toFixed(6)} (Ekstrapolasyon j = ${j})`);
      }
    }
    return {
      result: R[steps - 1][steps - 1].toFixed(6),
      trace,
      metadata: [`Yöntem: Romberg İntegrasyonu`, `Aralık: [${a}, ${b}]`, `Adım: ${steps}`, `Fonksiyon: f(x) = ${expr}`],
    };
  }

  throw new Error(`Bilinmeyen yöntem: ${op}`);
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
