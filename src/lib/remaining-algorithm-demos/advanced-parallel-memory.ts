export interface GenericDemoResult {
  result: string;
  trace: string[];
}

// ----------------------------------------------------
// Helper Complex number operations for FFT
// ----------------------------------------------------
interface Complex {
  re: number;
  im: number;
}

const add = (a: Complex, b: Complex): Complex => ({ re: a.re + b.re, im: a.im + b.im });
const sub = (a: Complex, b: Complex): Complex => ({ re: a.re - b.re, im: a.im - b.im });
const mul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re
});
const formatComplex = (c: Complex) => {
  const re = c.re.toFixed(2);
  const im = c.im.toFixed(2);
  return `${re} ${c.im >= 0 ? '+' : '-'} ${Math.abs(c.im).toFixed(2)}i`;
};

// ----------------------------------------------------
// 1. Fast Fourier Transform (FFT) Demo
// ----------------------------------------------------
export function runFastFourierTransformDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'FFT';
  const valStr = parts[1] || '1,2,3,4,0,0,0,0';

  const vals = valStr.split(',').map(Number);
  // Pad to next power of 2
  let n = 1;
  while (n < vals.length) n *= 2;
  while (vals.length < n) vals.push(0);

  trace.push(`Mod: ${mode}, Boyut (Pad/N): ${n}`);
  trace.push(`Girdi Sinyali: [${vals.join(', ')}]`);

  const complexVals: Complex[] = vals.map(v => ({ re: v, im: 0 }));

  const fftRecursive = (a: Complex[], isInverse: boolean): Complex[] => {
    const len = a.length;
    if (len <= 1) return a;

    const even: Complex[] = [];
    const odd: Complex[] = [];
    for (let i = 0; i < len; i++) {
      if (i % 2 === 0) even.push(a[i]);
      else odd.push(a[i]);
    }

    const yEven = fftRecursive(even, isInverse);
    const yOdd = fftRecursive(odd, isInverse);

    const y = new Array<Complex>(len);
    const sign = isInverse ? 1 : -1;
    
    trace.push(`  Seviye ${len} Kelebek İşlemi: Çift=[${yEven.map(c => c.re.toFixed(1)).join(',')}] Tek=[${yOdd.map(c => c.re.toFixed(1)).join(',')}]`);

    for (let k = 0; k < len / 2; k++) {
      const angle = (sign * 2 * Math.PI * k) / len;
      const w: Complex = { re: Math.cos(angle), im: Math.sin(angle) };
      const t = mul(w, yOdd[k]);

      y[k] = add(yEven[k], t);
      y[k + len / 2] = sub(yEven[k], t);
    }
    return y;
  };

  const isInverse = mode.includes('IFFT');
  let resultComplex = fftRecursive(complexVals, isInverse);

  if (isInverse) {
    resultComplex = resultComplex.map(c => ({ re: c.re / n, im: c.im / n }));
  }

  trace.push(`Hesaplama tamamlandı.`);

  return {
    result: `Sonuç Spektrumu:\n` + resultComplex.map((c, i) => `[Bin ${i}]: ${formatComplex(c)}`).join('\n'),
    trace
  };
}

// ----------------------------------------------------
// 2. Parallel Merging & Networks Demo
// ----------------------------------------------------
export function runParallelMergingNetworksDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'BITONIC';
  const valStr = parts[1] || '8,3,2,9,7,1,5,4';

  const arr = valStr.split(',').map(Number);
  let n = 1;
  while (n < arr.length) n *= 2;
  while (arr.length < n) arr.push(999); // Pad to power of 2 with infinity

  trace.push(`Mod: ${mode}, Dizi Boyutu (N): ${n}`);
  trace.push(`Başlangıç: [${arr.join(', ')}]`);

  if (mode === 'SHUFFLE') {
    // Perfect Shuffle
    const mid = n / 2;
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    const shuffled: number[] = [];
    for (let i = 0; i < mid; i++) {
      shuffled.push(left[i]);
      shuffled.push(right[i]);
      trace.push(`Adım ${i+1}: Sol[${i}](${left[i]}) ve Sağ[${i}](${right[i]}) birleştirildi -> [${shuffled.join(',')}]`);
    }
    return {
      result: `Shuffle Sonucu: [${shuffled.join(', ')}]`,
      trace
    };
  }

  // Bitonic sorting network comparator steps
  let step = 1;
  const compareAndSwap = (a: number[], i: number, j: number, dir: boolean) => {
    // dir = true for ascending, false for descending
    if ((a[i] > a[j] && dir) || (a[i] < a[j] && !dir)) {
      trace.push(`Adım ${step++}: Karşılaştır ve Değiştir (Swap) [İndis ${i} vs ${j}]. Değerler: ${a[i]} <-> ${a[j]}`);
      const temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    } else {
      trace.push(`Adım ${step++}: Karşılaştır ve Tut (Keep) [İndis ${i} vs ${j}]. Sıra uygun.`);
    }
  };

  const bitonicMerge = (a: number[], low: number, cnt: number, dir: boolean) => {
    if (cnt > 1) {
      const k = cnt / 2;
      for (let i = low; i < low + k; i++) {
        compareAndSwap(a, i, i + k, dir);
      }
      bitonicMerge(a, low, k, dir);
      bitonicMerge(a, low + k, k, dir);
    }
  };

  const bitonicSort = (a: number[], low: number, cnt: number, dir: boolean) => {
    if (cnt > 1) {
      const k = cnt / 2;
      bitonicSort(a, low, k, true);
      bitonicSort(a, low + k, k, false);
      bitonicMerge(a, low, cnt, dir);
    }
  };

  if (mode === 'BITONIC') {
    bitonicSort(arr, 0, n, true);
    // Remove padding elements for presentation
    const cleanArr = arr.filter(x => x !== 999);
    return {
      result: `Sıralanmış Sonuç (Bitonic): [${cleanArr.join(', ')}]`,
      trace
    };
  }

  // Batcher Odd-Even Merge Sort
  const oddEvenMerge = (a: number[], low: number, cnt: number, r: number) => {
    const m = r * 2;
    if (m < cnt) {
      oddEvenMerge(a, low, cnt, m);      // even subsequence
      oddEvenMerge(a, low + r, cnt, m);  // odd subsequence
      for (let i = low + r; i + r < low + cnt; i += m) {
        compareAndSwap(a, i, i + r, true);
      }
    } else {
      compareAndSwap(a, low, low + r, true);
    }
  };

  const oddEvenSort = (a: number[], low: number, cnt: number) => {
    if (cnt > 1) {
      const k = cnt / 2;
      oddEvenSort(a, low, k);
      oddEvenSort(a, low + k, k);
      oddEvenMerge(a, low, cnt, 1);
    }
  };

  if (mode === 'ODDEVEN') {
    oddEvenSort(arr, 0, n);
    const cleanArr = arr.filter(x => x !== 999);
    return {
      result: `Sıralanmış Sonuç (Odd-Even): [${cleanArr.join(', ')}]`,
      trace
    };
  }

  return {
    result: 'Hatalı Mod',
    trace: ['BITONIC, ODDEVEN veya SHUFFLE seçin']
  };
}

// ----------------------------------------------------
// 3. Math & Classic Riddles Demo
// ----------------------------------------------------
export function runMathClassicRiddlesDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'KARATSUBA';

  if (mode === 'KARATSUBA') {
    const x = parseInt(parts[1]) || 1234;
    const y = parseInt(parts[2]) || 5678;

    trace.push(`Karatsuba Çarpımı: ${x} * ${y}`);

    const karatsuba = (num1: number, num2: number): number => {
      if (num1 < 10 || num2 < 10) {
        const val = num1 * num2;
        trace.push(`  Temel Çarpım: ${num1} * ${num2} = ${val}`);
        return val;
      }

      const n1Str = num1.toString();
      const n2Str = num2.toString();
      const n = Math.max(n1Str.length, n2Str.length);
      const m = Math.floor(n / 2);
      const p = Math.pow(10, m);

      const a = Math.floor(num1 / p);
      const b = num1 % p;
      const c = Math.floor(num2 / p);
      const d = num2 % p;

      trace.push(`  Bölme: x=${num1} -> a=${a}, b=${b} | y=${num2} -> c=${c}, d=${d} (m=${m})`);

      const ac = karatsuba(a, c);
      const bd = karatsuba(b, d);
      const abcd = karatsuba(a + b, c + d);
      const mid = abcd - ac - bd;

      const res = ac * Math.pow(10, 2 * m) + mid * p + bd;
      trace.push(`  Birleştirme: ac=${ac}, bd=${bd}, abcd=${abcd} -> mid=${mid} -> Sonuç=${res}`);
      return res;
    };

    const finalVal = karatsuba(x, y);
    return {
      result: `Çarpım Sonucu: ${finalVal}`,
      trace
    };
  }

  if (mode === 'HANOI') {
    const n = parseInt(parts[1]) || 3;
    trace.push(`Hanoi Kuleleri: ${n} disk`);

    const solveHanoi = (disks: number, from: string, to: string, aux: string) => {
      if (disks === 1) {
        trace.push(`Disk 1'i ${from} -> ${to} direğine taşı`);
        return;
      }
      solveHanoi(disks - 1, from, aux, to);
      trace.push(`Disk ${disks}'i ${from} -> ${to} direğine taşı`);
      solveHanoi(disks - 1, aux, to, from);
    };

    solveHanoi(n, 'A', 'C', 'B');
    return {
      result: `Hanoi Kuleleri ${n} disk için hamleler listelendi.`,
      trace
    };
  }

  if (mode === 'TOURNAMENT') {
    const teams = parseInt(parts[1]) || 4;
    trace.push(`Turnuva Eşleştirmesi (Round-Robin): ${teams} takım`);

    if (teams % 2 !== 0) {
      return {
        result: 'Hata',
        trace: ['Takım sayısı çift olmalıdır (Örn: 4, 6, 8)']
      };
    }

    const tArray = Array.from({ length: teams }, (_, i) => i + 1);
    
    // Round-Robin using circle rotation
    for (let r = 0; r < teams - 1; r++) {
      const roundMatches: string[] = [];
      for (let i = 0; i < teams / 2; i++) {
        const home = tArray[i];
        const away = tArray[teams - 1 - i];
        roundMatches.push(`Takım ${home} vs Takım ${away}`);
      }
      trace.push(`Raund ${r+1}: ` + roundMatches.join(', '));
      
      // Rotate list (keep first element fixed)
      tArray.splice(1, 0, tArray.pop()!);
    }

    return {
      result: `Turnuva fikstürü başarıyla oluşturuldu.`,
      trace
    };
  }

  return {
    result: 'Hatalı Mod',
    trace: ['KARATSUBA, HANOI veya TOURNAMENT seçin']
  };
}

// ----------------------------------------------------
// 4. Linear Programming / Simplex Demo
// ----------------------------------------------------
export function runLinearProgrammingSimplexDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'SIMPLEX'; // SIMPLEX or BLAND
  
  // Custom parser for constraints
  // Format: max 3,5; 1,0<=4; 0,2<=12; 3,2<=18
  const objStr = parts[1] || 'max 3,5';
  const objCoeffs = objStr.replace('max', '').trim().split(',').map(Number);
  
  const constraints: { coeffs: number[]; val: number }[] = [];
  for (let i = 2; i < parts.length; i++) {
    if (!parts[i]) continue;
    const bits = parts[i].split('<=');
    if (bits.length === 2) {
      constraints.push({
        coeffs: bits[0].split(',').map(Number),
        val: parseFloat(bits[1])
      });
    }
  }

  if (constraints.length === 0) {
    // defaults
    constraints.push(
      { coeffs: [1, 0], val: 4 },
      { coeffs: [0, 2], val: 12 },
      { coeffs: [3, 2], val: 18 }
    );
  }

  trace.push(`Mod: Simplex (${mode === 'BLAND' ? "Bland's Rule" : 'Standard'}), Değişken Sayısı: ${objCoeffs.length}`);
  trace.push(`Amaç Fonksiyonu: Z = ` + objCoeffs.map((c, idx) => `${c}*x_${idx+1}`).join(' + '));
  constraints.forEach((c, idx) => {
    trace.push(` Kısıt ${idx+1}: ` + c.coeffs.map((coef, i) => `${coef}*x_${i+1}`).join(' + ') + ` <= ${c.val}`);
  });

  // Construct initial Simplex Tableau
  // Rows: constraints count + 1 (for objective function)
  // Columns: variables count + constraints count (slack variables) + 1 (Right Hand Side)
  const numVars = objCoeffs.length;
  const numConstraints = constraints.length;
  const R = numConstraints + 1;
  const C = numVars + numConstraints + 1;

  const tab = Array.from({ length: R }, () => new Array(C).fill(0));

  // Fill constraint rows
  for (let i = 0; i < numConstraints; i++) {
    const constr = constraints[i];
    for (let j = 0; j < numVars; j++) {
      tab[i][j] = constr.coeffs[j] || 0;
    }
    // Slack variable
    tab[i][numVars + i] = 1;
    // RHS
    tab[i][C - 1] = constr.val;
  }

  // Fill bottom objective row: Z - obj = 0
  for (let j = 0; j < numVars; j++) {
    tab[R - 1][j] = -objCoeffs[j];
  }
  // Z coefficient (implicit, usually we just keep it simple)

  const printTableau = (t: number[][]) => {
    return t.map(row => row.map(v => v.toFixed(2)).join('\t')).join('\n');
  };

  trace.push(`Başlangıç Tableau:\n` + printTableau(tab));

  let pivotCount = 1;
  while (true) {
    // 1. Find entering variable (most negative in bottom row)
    let enteringCol = -1;
    let minVal = 0;

    for (let j = 0; j < numVars + numConstraints; j++) {
      const val = tab[R - 1][j];
      if (val < minVal) {
        if (mode === 'BLAND') {
          // Bland's rule: pick first negative we encounter
          enteringCol = j;
          break;
        } else {
          minVal = val;
          enteringCol = j;
        }
      }
    }

    if (enteringCol === -1) {
      trace.push(`Alt satırda negatif kalmadı. Optimal çözüme ulaşıldı.`);
      break;
    }

    // 2. Find leaving variable (Minimum ratio test)
    let leavingRow = -1;
    let minRatio = Infinity;

    for (let i = 0; i < numConstraints; i++) {
      const coeff = tab[i][enteringCol];
      if (coeff > 0) {
        const ratio = tab[i][C - 1] / coeff;
        trace.push(` Satır ${i+1} Oran Testi: Sabit(${tab[i][C - 1].toFixed(2)}) / Katsayı(${coeff.toFixed(2)}) = ${ratio.toFixed(2)}`);
        if (ratio < minRatio) {
          minRatio = ratio;
          leavingRow = i;
        }
      }
    }

    if (leavingRow === -1) {
      return {
        result: `Çözüm SINIRSIZ (Unbounded objective value)`,
        trace
      };
    }

    trace.push(`Pivot ${pivotCount++}: Giren Sütun=${enteringCol}, Çıkan Satır=${leavingRow}`);

    // Perform Pivoting (Gauss-Jordan)
    const pivotVal = tab[leavingRow][enteringCol];
    // Normalize pivot row
    for (let j = 0; j < C; j++) {
      tab[leavingRow][j] /= pivotVal;
    }
    // Eliminate other rows
    for (let i = 0; i < R; i++) {
      if (i !== leavingRow) {
        const factor = tab[i][enteringCol];
        for (let j = 0; j < C; j++) {
          tab[i][j] -= factor * tab[leavingRow][j];
        }
      }
    }

    trace.push(`Güncel Tableau:\n` + printTableau(tab));
  }

  // Extract variables
  const varValues = new Array(numVars).fill(0);
  for (let j = 0; j < numVars; j++) {
    // Check if column has exactly one 1 and others are 0 (basis column)
    let oneCount = 0;
    let oneRowIdx = -1;
    let isBasis = true;
    for (let i = 0; i < R; i++) {
      if (Math.abs(tab[i][j] - 1) < 1e-5) {
        oneCount++;
        oneRowIdx = i;
      } else if (Math.abs(tab[i][j]) > 1e-5) {
        isBasis = false;
      }
    }
    if (isBasis && oneCount === 1) {
      varValues[j] = tab[oneRowIdx][C - 1];
    }
  }

  const maxVal = tab[R - 1][C - 1];
  return {
    result: `Maksimum Z Değeri: ${maxVal.toFixed(2)}\nDeğişkenler: ` + varValues.map((val, idx) => `x_${idx+1}=${val.toFixed(2)}`).join(', '),
    trace
  };
}

// ----------------------------------------------------
// 5. Memory Management & GC Demo
// ----------------------------------------------------
interface BuddyBlock {
  size: number;
  offset: number;
  allocated: boolean;
  tag: string;
}

export function runMemoryManagementGcDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'BUDDY';
  const cmdStr = parts[1] || 'alloc:32,alloc:64,free:32,alloc:16';

  if (mode === 'BUDDY') {
    const totalSize = 256;
    trace.push(`Buddy Hafıza Yöneticisi Simülasyonu. Toplam Hafıza: ${totalSize} KB`);
    
    let blocks: BuddyBlock[] = [
      { size: totalSize, offset: 0, allocated: false, tag: 'Free' }
    ];

    const printBlocks = (blks: BuddyBlock[]) => 
      blks.map(b => `[${b.tag} (${b.size}KB, offset:${b.offset})]`).join(' -> ');

    const cmds = cmdStr.split(',');
    for (const cmd of cmds) {
      const [action, param] = cmd.split(':');
      if (action === 'alloc') {
        const req = parseInt(param);
        trace.push(`\nİstek: ${req} KB bellek tahsis et.`);
        
        let power = 1;
        while (power < req) power *= 2;

        // Find smallest block >= power
        let bestIdx = -1;
        for (let i = 0; i < blocks.length; i++) {
          if (!blocks[i].allocated && blocks[i].size >= power) {
            if (bestIdx === -1 || blocks[i].size < blocks[bestIdx].size) {
              bestIdx = i;
            }
          }
        }

        if (bestIdx === -1) {
          trace.push(`  !! Hata: Yetersiz bellek. Tahsis yapılamadı.`);
          continue;
        }

        // Split
        while (blocks[bestIdx].size > power) {
          const b = blocks[bestIdx];
          const half = b.size / 2;
          trace.push(`  Blok (${b.size}KB, offset:${b.offset}) ikiye bölünüyor: ${half}KB ve ${half}KB buddies.`);
          
          const left: BuddyBlock = { size: half, offset: b.offset, allocated: false, tag: 'Free' };
          const right: BuddyBlock = { size: half, offset: b.offset + half, allocated: false, tag: 'Free' };
          
          blocks.splice(bestIdx, 1, left, right);
        }

        blocks[bestIdx].allocated = true;
        blocks[bestIdx].tag = `Alloc(${req}K)`;
        trace.push(`  Tahsis edildi: ` + printBlocks(blocks));

      } else if (action === 'free') {
        const freeSize = parseInt(param);
        trace.push(`\nİstek: ${freeSize} KB boyutlu bloğu serbest bırak.`);

        // Find the first block matching size
        let idx = -1;
        for (let i = 0; i < blocks.length; i++) {
          if (blocks[i].allocated && blocks[i].size === freeSize) {
            idx = i;
            break;
          }
        }

        if (idx === -1) {
          trace.push(`  !! Hata: Serbest bırakılacak ${freeSize}KB tahsisli blok bulunamadı.`);
          continue;
        }

        blocks[idx].allocated = false;
        blocks[idx].tag = 'Free';
        trace.push(`  Serbest bırakıldı. Birleştirme (coalescing) kontrol ediliyor...`);

        // Coalesce loop
        let coalesced = true;
        while (coalesced) {
          coalesced = false;
          for (let i = 0; i < blocks.length - 1; i++) {
            const b1 = blocks[i];
            const b2 = blocks[i + 1];
            
            // Check if they are buddies: same size and b1.offset XOR b1.size == b2.offset
            if (!b1.allocated && !b2.allocated && b1.size === b2.size && (b1.offset ^ b1.size) === b2.offset) {
              trace.push(`    Buddy'ler birleşiyor: (${b1.size}KB, offset:${b1.offset}) + (${b2.size}KB, offset:${b2.offset}) -> ${b1.size * 2}KB`);
              const merged: BuddyBlock = {
                size: b1.size * 2,
                offset: b1.offset,
                allocated: false,
                tag: 'Free'
              };
              blocks.splice(i, 2, merged);
              coalesced = true;
              break;
            }
          }
        }
        trace.push(`  Güncel Durum: ` + printBlocks(blocks));
      }
    }

    return {
      result: `Buddy Bellek Yönetimi Tamamlandı.\nSon Durum: ` + printBlocks(blocks),
      trace
    };
  }

  if (mode === 'GC') {
    // GC Reachability Graph Marking
    // Input e.g. GC; nodes:A,B,C,D; edges:A-B,B-C; roots:A
    const nodePart = parts.find(p => p.startsWith('nodes:')) || 'nodes:A,B,C,D';
    const edgePart = parts.find(p => p.startsWith('edges:')) || 'edges:A-B,B-C';
    const rootPart = parts.find(p => p.startsWith('roots:')) || 'roots:A';

    const nodes = nodePart.replace('nodes:', '').split(',');
    const edgesRaw = edgePart.replace('edges:', '').split(',');
    const roots = rootPart.replace('roots:', '').split(',');

    trace.push(`Mod: Garbage Collection Mark Aşaması`);
    trace.push(`Nesne Düğümleri: [${nodes.join(', ')}]`);
    trace.push(`Referanslar: ${edgesRaw.join(', ')}`);
    trace.push(`Kök Düğümler (Roots): [${roots.join(', ')}]`);

    // Build adjacency mapping
    const adj: Record<string, string[]> = {};
    nodes.forEach(n => adj[n] = []);
    edgesRaw.forEach(pair => {
      const bits = pair.split('-');
      if (bits.length === 2) {
        adj[bits[0]].push(bits[1]);
      }
    });

    const marked = new Set<string>();
    const queue: string[] = [...roots];

    trace.push(`İşaretleme kuyruğu ilklendirildi: [${queue.join(', ')}]`);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (!marked.has(curr)) {
        marked.add(curr);
        trace.push(` Düğüm [${curr}] işaretlendi (MARKED).`);
        
        const neighbors = adj[curr] || [];
        for (const next of neighbors) {
          if (!marked.has(next)) {
            queue.push(next);
            trace.push(`  -> Referans bulundu: [${curr}] -> [${next}]. Kuyruğa ekleniyor.`);
          }
        }
      }
    }

    const unreached = nodes.filter(n => !marked.has(n));
    trace.push(`İşaretleme bitti. Erişim dışı (Sweep edilecek) düğümler: [${unreached.join(', ')}]`);

    return {
      result: `İşaretlenen (Erişilebilir) Nesneler: [${Array.from(marked).join(', ')}]\nSüpürülecek (Sweep) Nesneler: [${unreached.join(', ')}]`,
      trace
    };
  }

  return {
    result: 'Hatalı Mod',
    trace: ['BUDDY veya GC seçin']
  };
}
