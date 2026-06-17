import type { GenericDemoResult } from './types';

// Helper to parse comma-separated numbers
function parseNumbers(input: string): number[] {
  return input
    .split(',')
    .map((x) => x.trim())
    .filter((x) => x !== '')
    .map((x) => {
      const num = Number(x);
      if (isNaN(num)) {
        throw new Error(`Geçersiz sayı: "${x}"`);
      }
      return num;
    });
}

function splitRequired(input: string, separator: string): [string, string] {
  const idx = input.indexOf(separator);
  if (idx === -1) {
    throw new Error(`Girdiyi "${separator}" karakteriyle ayırın.`);
  }
  return [input.slice(0, idx).trim(), input.slice(idx + 1).trim()];
}

// 1. Heap Operations Demo (Bottom-Up Max Heapify Simulation)
export function runHeapOperationsDemo(input: string): GenericDemoResult {
  const arr = parseNumbers(input);
  if (arr.length === 0) {
    return { result: '', trace: ['Girdi dizisi boş.'] };
  }

  const trace: string[] = [];
  const current = [...arr];
  const n = current.length;

  trace.push(`Başlangıç Dizisi: [${current.join(', ')}]`);
  trace.push(`Max-Heap oluşturma işlemi başladı (Aşağı süzme - Sink / Heapify-down).`);

  function heapify(a: number[], size: number, idx: number) {
    let largest = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;

    if (left < size && a[left] > a[largest]) {
      largest = left;
    }
    if (right < size && a[right] > a[largest]) {
      largest = right;
    }

    if (largest !== idx) {
      trace.push(`  Swap: arr[${idx}] (${a[idx]}) <-> arr[${largest}] (${a[largest]})`);
      [a[idx], a[largest]] = [a[largest], a[idx]];
      trace.push(`    Güncel dizi durumu: [${a.join(', ')}]`);
      heapify(a, size, largest);
    }
  }

  // Build heap bottom-up
  const startIdx = Math.floor(n / 2) - 1;
  trace.push(`Yaprak olmayan ilk düğüm indeksi: ${startIdx}`);

  for (let i = startIdx; i >= 0; i--) {
    trace.push(`İndeks ${i} (${current[i]}) için heapify başlatılıyor...`);
    heapify(current, n, i);
  }

  trace.push(`Yığın Oluşturuldu: [${current.join(', ')}]`);

  return {
    result: `[${current.join(', ')}]`,
    trace,
    metadata: [
      `Eleman Sayısı: ${n}`,
      `Max Eleman (Kök): ${current[0]}`
    ]
  };
}

// 2. Disjoint-Set / Union-Find Demo
class DisjointSetSim {
  parent: number[];
  rank: number[];
  trace: string[];

  constructor(size: number, trace: string[]) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
    this.trace = trace;
  }

  find(i: number): number {
    if (this.parent[i] === i) return i;

    const root = this.find(this.parent[i]);
    if (this.parent[i] !== root) {
      this.trace.push(`  [Yol Yassılaştırma / Path Compression] Düğüm ${i} ebeveyni güncellendi: ${this.parent[i]} -> ${root}`);
      this.parent[i] = root;
    }
    return root;
  }

  union(i: number, j: number): boolean {
    const rootX = this.find(i);
    const rootY = this.find(j);

    if (rootX === rootY) {
      this.trace.push(`  [Union] ${i} ve ${j} zaten aynı kümedeler (Kök: ${rootX}).`);
      return false;
    }

    this.trace.push(`  [Union] Kökler birleştiriliyor: ${rootX} (rütbe ${this.rank[rootX]}) ve ${rootY} (rütbe ${this.rank[rootY]})`);

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
      this.trace.push(`    Kök ${rootX} -> Kök ${rootY} altına bağlandı.`);
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
      this.trace.push(`    Kök ${rootY} -> Kök ${rootX} altına bağlandı.`);
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
      this.trace.push(`    Rütbeler eşit. Kök ${rootY} -> Kök ${rootX} altına bağlandı, rütbe ${this.rank[rootX]} yapıldı.`);
    }
    return true;
  }
}

export function runUnionFindDemo(input: string): GenericDemoResult {
  const [rawSize, rawOps] = splitRequired(input, ';');
  const size = Number(rawSize.trim());
  
  if (isNaN(size) || size <= 0) {
    throw new Error('Küme boyutu pozitif bir sayı olmalıdır.');
  }

  const trace: string[] = [];
  const ds = new DisjointSetSim(size, trace);
  
  trace.push(`Union-Find başlatıldı. Başlangıç Elemanları: [0..${size - 1}]`);

  const ops = rawOps.split(',').map((x) => x.trim()).filter((x) => x !== '');

  for (const op of ops) {
    const parts = op.split(/\s+/);
    const cmd = parts[0].toUpperCase();
    
    if (cmd === 'U') {
      const x = Number(parts[1]);
      const y = Number(parts[2]);
      if (isNaN(x) || isNaN(y) || x < 0 || x >= size || y < 0 || y >= size) {
        throw new Error(`Birleştirme (Union) için geçersiz indeksler: ${x}, ${y}`);
      }
      trace.push(`UNION(${x}, ${y}) işlemi çalıştırılıyor:`);
      ds.union(x, y);
    } else if (cmd === 'F') {
      const x = Number(parts[1]);
      if (isNaN(x) || x < 0 || x >= size) {
        throw new Error(`Bulma (Find) için geçersiz indeks: ${x}`);
      }
      trace.push(`FIND(${x}) işlemi çalıştırılıyor:`);
      const root = ds.find(x);
      trace.push(`  FIND(${x}) sonucu kök düğüm: ${root}`);
    } else {
      throw new Error(`Bilinmeyen komut: "${cmd}". Sadece U veya F kullanın.`);
    }
  }

  return {
    result: `İşlemler Tamamlandı.`,
    trace,
    metadata: [
      `Ebeveyn Dizisi (Parent Array): [${ds.parent.join(', ')}]`,
      `Rütbe Dizisi (Rank Array): [${ds.rank.join(', ')}]`
    ]
  };
}

// 3. Set Operations Demo
export function runSetOperationsDemo(input: string): GenericDemoResult {
  const [rawA, rawB] = splitRequired(input, ';');
  const arrA = parseNumbers(rawA);
  const arrB = parseNumbers(rawB);

  const setA = new Set(arrA);
  const setB = new Set(arrB);

  const trace: string[] = [];
  trace.push(`Küme A = {${Array.from(setA).join(', ')}}`);
  trace.push(`Küme B = {${Array.from(setB).join(', ')}}`);

  // 1. Birleşim (Union)
  const unionSet = new Set(setA);
  for (const x of setB) {
    unionSet.add(x);
  }
  trace.push(`[Birleşim - Set Union]: A'daki tüm elemanlar kopyalandı, B'den benzersiz elemanlar eklendi.`);
  trace.push(`  Birleşim Kümesi = {${Array.from(unionSet).join(', ')}}`);

  // 2. Kesişim (Intersection)
  const intersectSet = new Set<number>();
  for (const x of setA) {
    if (setB.has(x)) {
      intersectSet.add(x);
    }
  }
  trace.push(`[Kesişim - Set Intersection]: A'nın elemanlarından B'de de olan ortak elemanlar süzüldü.`);
  trace.push(`  Kesişim Kümesi = {${Array.from(intersectSet).join(', ')}}`);

  // 3. Bölme (Split) - Kümeyi B'nin ilk elemanına (varsa, yoksa ortalama değere) göre böleriz
  const pivot = arrB.length > 0 ? arrB[0] : 3;
  const setA1 = new Set<number>();
  const setA2 = new Set<number>();
  for (const x of setA) {
    if (x < pivot) {
      setA1.add(x);
    } else if (x > pivot) {
      setA2.add(x);
    }
  }
  trace.push(`[Bölme - Set Split]: Küme A, pivot değeri ${pivot} ile ikiye bölünüyor:`);
  trace.push(`  Küme A1 (Küçükler) = {${Array.from(setA1).join(', ')}}`);
  trace.push(`  Küme A2 (Büyükler) = {${Array.from(setA2).join(', ')}}`);

  return {
    result: `Küme işlemleri tamamlandı.`,
    trace,
    metadata: [
      `A U B: {${Array.from(unionSet).join(', ')}}`,
      `A n B: {${Array.from(intersectSet).join(', ')}}`,
      `A1 (< ${pivot}): {${Array.from(setA1).join(', ')}}`,
      `A2 (> ${pivot}): {${Array.from(setA2).join(', ')}}`
    ]
  };
}
