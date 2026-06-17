import type { GenericDemoResult } from './types';

function parseParams(paramsStr: string): Record<string, string> {
  const res: Record<string, string> = {};
  if (!paramsStr) return res;
  const pairs = paramsStr.split(/[,\s]+/);
  for (const pair of pairs) {
    const parts = pair.split('=');
    if (parts.length === 2) {
      res[parts[0].trim().toLowerCase()] = parts[1].trim();
    }
  }
  return res;
}

export function runRandomNumberGeneratorsDemo(input: string): GenericDemoResult {
  const [rawOp, rawParams] = splitRequired(input, ';');
  const op = rawOp.toLowerCase().trim();
  const trace: string[] = [];
  const params = parseParams(rawParams);

  if (op === 'lcg') {
    const seed = params.seed ? Number(params.seed) : 123;
    const a = params.a ? Number(params.a) : 1664525;
    const c = params.c ? Number(params.c) : 1013904223;
    const m = params.m ? Number(params.m) : Math.pow(2, 32);
    const n = params.n ? Number(params.n) : 10;

    trace.push(`LCG başlatıldı. Parametreler: seed=${seed}, a=${a}, c=${c}, m=${m}, n=${n}`);

    let current = seed;
    const normalized: number[] = [];

    for (let i = 0; i < n; i++) {
      const nextVal = (a * current + c) % m;
      const u = nextVal / m;
      normalized.push(u);
      trace.push(`  Adım ${i + 1}: X_next = (${a} * ${current} + ${c}) mod ${m} = ${nextVal} -> u = ${u.toFixed(6)}`);
      current = nextVal;
    }

    return {
      result: normalized.slice(0, 5).map((x) => x.toFixed(4)).join(', ') + (n > 5 ? '...' : ''),
      trace,
      metadata: [`Yöntem: LCG (Doğrusal Eşlik)`, `Son 5 Değer: ${normalized.slice(-5).map((x) => x.toFixed(4)).join(', ')}`],
    };
  }

  if (op === 'acg') {
    const lags = params.lags ? params.lags.split(',').map(Number) : [3, 7];
    if (lags.length !== 2 || lags[0] >= lags[1]) {
      throw new Error('Lags iki adet olmalı ve j < k olmalı. Örn: lags=3,7');
    }
    const [j, k] = lags;
    const m = params.m ? Number(params.m) : 1000;
    const seed = params.seed ? Number(params.seed) : 123;
    const n = params.n ? Number(params.n) : 10;

    trace.push(`ACG (Lagged Fibonacci) başlatıldı. j=${j}, k=${k}, m=${m}, seed=${seed}`);

    const state: number[] = [];
    let stateCurrent = seed;
    for (let i = 0; i < k; i++) {
      stateCurrent = (1664525 * stateCurrent + 1013904223) % m;
      state.push(stateCurrent);
    }
    trace.push(`Başlangıç durumu (LCG ile): [${state.join(', ')}]`);

    const sequence: number[] = [];
    for (let i = 0; i < n; i++) {
      const len = state.length;
      const nextVal = (state[len - j] + state[len - k]) % m;
      state.push(nextVal);
      sequence.push(nextVal);
      trace.push(`  Adım ${i + 1}: X_next = (state[n-${j}] + state[n-${k}]) mod ${m} = (${state[len - j]} + ${state[len - k]}) mod ${m} = ${nextVal}`);
    }

    return {
      result: sequence.slice(0, 5).join(', ') + (n > 5 ? '...' : ''),
      trace,
      metadata: [`Yöntem: ACG (Toplamsal Eşlik)`, `Periyot/Hafıza Boyutu: ${k}`],
    };
  }

  if (op === 'lfsr') {
    const seed = params.seed ? parseInt(params.seed, 10) : 11;
    const width = params.width ? Number(params.width) : 4;
    const taps = params.taps ? params.taps.split(',').map(Number) : [4, 3];
    const n = params.n ? Number(params.n) : 15;

    trace.push(`LFSR başlatıldı. Genişlik: ${width}, Taps: [${taps.join(', ')}], Başlangıç: ${seed.toString(2).padStart(width, '0')}`);

    let current = seed & ((1 << width) - 1);
    if (current === 0) {
      throw new Error('LFSR başlangıç değeri sıfır olamaz, aksi takdirde kilitlenir.');
    }

    const startState = current;
    const sequence: number[] = [];
    let period = -1;

    for (let i = 0; i < n; i++) {
      let feedback = 0;
      for (const tap of taps) {
        const bit = (current >> (tap - 1)) & 1;
        feedback ^= bit;
      }
      const outputBit = current & 1;
      const nextState = ((current >> 1) | (feedback << (width - 1))) & ((1 << width) - 1);
      
      sequence.push(outputBit);
      trace.push(`  Adım ${i + 1}: State = ${current.toString(2).padStart(width, '0')} -> Geri Besleme Bit = ${feedback}, Çıkış Bit = ${outputBit}, Sonraki = ${nextState.toString(2).padStart(width, '0')}`);
      
      current = nextState;
      if (current === startState && period === -1) {
        period = i + 1;
        trace.push(`[LFSR Döngü] Başlangıç durumuna geri dönüldü! Periyot: ${period}`);
      }
    }

    return {
      result: sequence.join(''),
      trace,
      metadata: [`Yöntem: LFSR`, `Bit Çıkışı: ${sequence.join('')}`, `Maksimum Periyot (2^W - 1): ${Math.pow(2, width) - 1}`, `Bulunan Periyot: ${period !== -1 ? period : 'n adımda ulaşılamadı'}`],
    };
  }

  if (op === 'chisquare') {
    const rawValues = params.values ? params.values.split(',').map(Number) : [];
    if (rawValues.length === 0) {
      let current = 123;
      for (let i = 0; i < 100; i++) {
        current = (1664525 * current + 1013904223) % Math.pow(2, 32);
        rawValues.push(current / Math.pow(2, 32));
      }
      trace.push(`Değerler girilmedi. Varsayılan olarak LCG ile 100 rastgele sayı üretildi.`);
    }

    const n = rawValues.length;
    const bins = Array(10).fill(0);
    for (const val of rawValues) {
      if (val < 0 || val > 1) {
        throw new Error('Sayılar [0, 1] aralığında olmalıdır.');
      }
      const binIdx = Math.min(Math.floor(val * 10), 9);
      bins[binIdx]++;
    }

    const expected = n / 10;
    let chiSquareSum = 0;

    trace.push(`Ki-Kare Testi Sınıfları (k = 10, Beklenen Frekans = ${expected}):`);
    for (let i = 0; i < 10; i++) {
      const observed = bins[i];
      const diff = observed - expected;
      const term = (diff * diff) / expected;
      chiSquareSum += term;
      trace.push(`  Sınıf ${i} [0.${i}, 0.${i+1}): Gözlenen = ${observed}, Beklenen = ${expected} -> (O-E)^2 / E = ${term.toFixed(4)}`);
    }

    const criticalValue = 16.919;
    const passes = chiSquareSum <= criticalValue;

    trace.push(`Ki-Kare İstatistiği (Hesaplanan): ${chiSquareSum.toFixed(4)}`);
    trace.push(`Kritik Değer (df=9, alpha=0.05): ${criticalValue}`);
    trace.push(passes ? 'Dağılım tekdüzedir (Rastgelelik testi başarılı).' : 'Dağılım tekdüze değildir (Rastgelelik testi başarısız).');

    return {
      result: passes ? 'Başarılı (Rastgele)' : 'Başarısız (Rastgele Değil)',
      trace,
      metadata: [`Ki-Kare Toplamı: ${chiSquareSum.toFixed(4)}`, `Kritik Değer: ${criticalValue}`, `Test Sonucu: ${passes ? 'Geçti' : 'Kaldı'}`],
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
