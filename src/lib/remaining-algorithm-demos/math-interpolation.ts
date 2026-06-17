import type { GenericDemoResult } from './types';

export function runInterpolationFittingDemo(input: string): GenericDemoResult {
  const [rawOp, rawParams] = splitRequired(input, ';');
  const op = rawOp.toLowerCase().trim();
  const [rawPoints, rawX] = splitRequired(rawParams, '|');
  const xVal = Number(rawX.trim());

  const points = rawPoints.split(',').map(s => {
    const [x, y] = s.split(':').map(Number);
    return { x, y };
  }).sort((a, b) => a.x - b.x);

  if (points.some(p => isNaN(p.x) || isNaN(p.y)) || isNaN(xVal)) {
    throw new Error('Noktalar (x:y) ve x değeri geçerli sayılar olmalıdır.');
  }

  const trace: string[] = [];
  trace.push(`İşlem başladı. Sıralı Noktalar: [${points.map(p => `(${p.x},${p.y})`).join(', ')}], Tahmin x = ${xVal}`);

  if (op === 'least-squares') {
    const n = points.length;
    let sumX = 0, sumY = 0, sumXX = 0, sumXY = 0;

    for (const p of points) {
      sumX += p.x;
      sumY += p.y;
      sumXX += p.x * p.x;
      sumXY += p.x * p.y;
    }

    const denominator = n * sumXX - sumX * sumX;
    if (Math.abs(denominator) < 1e-9) {
      throw new Error('X koordinatları tek bir dikey doğru üzerindedir, regresyon tanımsızdır.');
    }

    const slope = (n * sumXY - sumX * sumY) / denominator;
    const intercept = (sumY - slope * sumX) / n;
    const estimatedY = slope * xVal + intercept;

    trace.push(`sum(X) = ${sumX}, sum(Y) = ${sumY}, sum(X^2) = ${sumXX}, sum(X*Y) = ${sumXY}`);
    trace.push(`Eğim (slope) = (${n}*${sumXY} - ${sumX}*${sumY}) / ${denominator} = ${slope.toFixed(4)}`);
    trace.push(`Kesim noktası (intercept) = (${sumY} - ${slope.toFixed(4)}*${sumX}) / ${n} = ${intercept.toFixed(4)}`);
    trace.push(`Regresyon Doğrusu: y = ${slope.toFixed(4)} * x + ${intercept.toFixed(4)}`);
    trace.push(`x = ${xVal} için tahmin y = ${estimatedY.toFixed(4)}`);

    return {
      result: `y = ${estimatedY.toFixed(4)}`,
      trace,
      metadata: [`Doğru Denklemi: y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`],
    };
  }

  if (op === 'spline') {
    const n = points.length;
    if (n < 3) {
      throw new Error('Kübik spline interpolasyonu için en az 3 nokta gereklidir.');
    }

    const h = Array(n - 1).fill(0);
    for (let i = 0; i < n - 1; i++) {
      h[i] = points[i + 1].x - points[i].x;
      if (h[i] <= 0) {
        throw new Error('X koordinatları kesinlikle artan sırada olmalıdır.');
      }
    }

    const a = Array(n).fill(0);
    const b = Array(n).fill(0);
    const c = Array(n).fill(0);
    const d = Array(n).fill(0);

    for (let i = 1; i < n - 1; i++) {
      a[i] = h[i - 1] / 6;
      b[i] = (h[i - 1] + h[i]) / 3;
      c[i] = h[i] / 6;
      d[i] = (points[i + 1].y - points[i].y) / h[i] - (points[i].y - points[i - 1].y) / h[i - 1];
    }

    const cp = Array(n).fill(0);
    const dp = Array(n).fill(0);
    const M = Array(n).fill(0);

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

    trace.push('İkinci türevler (M katsayıları) Thomas algoritmasıyla çözüldü:');
    M.forEach((val, idx) => trace.push(`M_${idx} = ${val.toFixed(4)}`));

    let interval = -1;
    for (let i = 0; i < n - 1; i++) {
      if (xVal >= points[i].x && xVal <= points[i + 1].x) {
        interval = i;
        break;
      }
    }

    if (interval === -1) {
      throw new Error(`x = ${xVal} değeri veri noktalarının sınırları dışında (ekstrapolasyon desteklenmiyor).`);
    }

    const idx = interval;
    const hi = h[idx];
    const term1 = M[idx] * Math.pow(points[idx + 1].x - xVal, 3) / (6 * hi);
    const term2 = M[idx + 1] * Math.pow(xVal - points[idx].x, 3) / (6 * hi);
    const term3 = (points[idx].y - M[idx] * hi * hi / 6) * (points[idx + 1].x - xVal) / hi;
    const term4 = (points[idx + 1].y - M[idx + 1] * hi * hi / 6) * (xVal - points[idx].x) / hi;
    const splineY = term1 + term2 + term3 + term4;

    trace.push(`x = ${xVal} değeri [${points[idx].x}, ${points[idx + 1].x}] aralığında bulundu.`);
    trace.push(`Kübik interpolasyon bileşenleri hesaplandı.`);
    trace.push(`Sonuç y = ${splineY.toFixed(4)}`);

    return {
      result: splineY.toFixed(4),
      trace,
      metadata: [`Aralık İndeksi: ${interval}`, `Aralık: [${points[idx].x}, ${points[idx + 1].x}]`],
    };
  }

  throw new Error('Bilinmeyen yöntem. least-squares veya spline seçin.');
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
