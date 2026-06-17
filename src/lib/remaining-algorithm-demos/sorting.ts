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

// 1. Quicksort Variants Demo
export function runQuicksortVariantsDemo(input: string): GenericDemoResult {
  const arr = parseNumbers(input);
  if (arr.length < 2) {
    return { result: arr.join(', '), trace: ['Dizi zaten sıralı (boyut < 2).'] };
  }

  const trace: string[] = [];
  const arrayToSorted = [...arr];

  trace.push(`Başlangıç Dizisi: [${arr.join(', ')}]`);

  function quicksort(l: number, h: number, depth = 0): void {
    if (l >= h) return;

    const indent = '  '.repeat(depth);
    const subArr = arrayToSorted.slice(l, h + 1);
    
    // Varyant seçimi simülasyonu: 3 veya daha fazla eleman varsa Median-of-Three, yoksa Randomized
    let pivotIdx: number;
    let pivotMethod = '';

    if (h - l >= 2) {
      // Median of Three
      const mid = Math.floor((l + h) / 2);
      const a = arrayToSorted[l];
      const b = arrayToSorted[mid];
      const c = arrayToSorted[h];

      // Find median of a, b, c
      const candidates = [
        { val: a, idx: l },
        { val: b, idx: mid },
        { val: c, idx: h }
      ];
      candidates.sort((x, y) => x.val - y.val);
      pivotIdx = candidates[1].idx;
      pivotMethod = `Üçlü Medyan (Baş:${a}, Orta:${b}, Son:${c} -> Seçilen: ${candidates[1].val})`;
    } else {
      // Randomized pivot
      pivotIdx = Math.floor(Math.random() * (h - l + 1)) + l;
      pivotMethod = `Rastgele Seçim (Pivot: ${arrayToSorted[pivotIdx]})`;
    }

    const pivotVal = arrayToSorted[pivotIdx];
    trace.push(`${indent}Alt dizi [${subArr.join(', ')}] sıralanıyor. ${pivotMethod}`);

    // Swap pivot with high
    [arrayToSorted[pivotIdx], arrayToSorted[h]] = [arrayToSorted[h], arrayToSorted[pivotIdx]];

    let i = l - 1;
    for (let j = l; j < h; j++) {
      if (arrayToSorted[j] <= pivotVal) {
        i++;
        [arrayToSorted[i], arrayToSorted[j]] = [arrayToSorted[j], arrayToSorted[i]];
      }
    }
    [arrayToSorted[i + 1], arrayToSorted[h]] = [arrayToSorted[h], arrayToSorted[i + 1]];
    const pIdx = i + 1;

    trace.push(`${indent}Bölümleme Sonucu: [${arrayToSorted.slice(l, h + 1).join(', ')}] (Pivot nihai indeks: ${pIdx})`);

    quicksort(l, pIdx - 1, depth + 1);
    quicksort(pIdx + 1, h, depth + 1);
  }

  quicksort(0, arrayToSorted.length - 1);
  trace.push(`Sıralama Tamamlandı: [${arrayToSorted.join(', ')}]`);

  return {
    result: `[${arrayToSorted.join(', ')}]`,
    trace,
    metadata: [`Eleman Sayısı: ${arr.length}`]
  };
}

// 2. Radix Sort Variants Demo (Straight Radix Sort Simülasyonu)
export function runRadixSortVariantsDemo(input: string): GenericDemoResult {
  const arr = parseNumbers(input);
  if (arr.some((x) => x < 0 || !Number.isInteger(x))) {
    throw new Error('Radix Sort sadece negatif olmayan tam sayılar için çalışır.');
  }
  if (arr.length === 0) {
    return { result: '', trace: ['Girdi boş.'] };
  }

  const trace: string[] = [];
  const n = arr.length;
  const current = [...arr];
  const max = Math.max(...current);
  let exp = 1;
  let pass = 1;

  trace.push(`Başlangıç Dizisi: [${current.join(', ')}]`);

  while (Math.floor(max / exp) > 0) {
    const output = Array(n).fill(0);
    const count = Array(10).fill(0);

    for (let i = 0; i < n; i++) {
      const digit = Math.floor(current[i] / exp) % 10;
      count[digit]++;
    }

    trace.push(`Geçiş ${pass} (Basamak Değeri: ${exp}): Frekanslar (0-9) = [${count.join(', ')}]`);

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(current[i] / exp) % 10;
      output[count[digit] - 1] = current[i];
      count[digit]--;
    }

    for (let i = 0; i < n; i++) {
      current[i] = output[i];
    }

    trace.push(`Geçiş ${pass} Sonrası Dizi: [${current.join(', ')}]`);
    exp *= 10;
    pass++;
  }

  return {
    result: `[${current.join(', ')}]`,
    trace,
    metadata: [`Maksimum Sayı: ${max}`, `Toplam Basamak Geçişi: ${pass - 1}`]
  };
}

// 3. Bucket Sort Demo
export function runBucketSortDemo(input: string): GenericDemoResult {
  const arr = parseNumbers(input);
  if (arr.length === 0) {
    return { result: '', trace: ['Dizi boş.'] };
  }

  const trace: string[] = [];
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const bucketCount = Math.floor(Math.sqrt(arr.length)) || 1;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  trace.push(`Başlangıç: Min=${min}, Max=${max}, Kova Sayısı=${bucketCount}`);

  const range = (max - min) / bucketCount || 1;

  for (const num of arr) {
    let index = Math.floor((num - min) / range);
    if (index >= bucketCount) index = bucketCount - 1;
    buckets[index].push(num);
    trace.push(`Eleman ${num} -> Kova ${index}'e yerleştirildi.`);
  }

  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 0) {
      const raw = [...buckets[i]];
      buckets[i].sort((a, b) => a - b);
      trace.push(`Kova ${i} sıralandı: [${raw.join(', ')}] -> [${buckets[i].join(', ')}]`);
    } else {
      trace.push(`Kova ${i} boş.`);
    }
  }

  const sorted: number[] = [];
  for (let i = 0; i < bucketCount; i++) {
    sorted.push(...buckets[i]);
  }

  trace.push(`Kovaların birleştirilmiş hali: [${sorted.join(', ')}]`);

  return {
    result: `[${sorted.join(', ')}]`,
    trace,
    metadata: [`Kova Sayısı: ${bucketCount}`, `Eleman Sayısı: ${arr.length}`]
  };
}

// 4. Order Statistics / Kth Element Demo (Median of Medians Simülasyonu)
export function runOrderStatisticsDemo(input: string): GenericDemoResult {
  const [rawArr, rawK] = splitRequired(input, ';');
  const arr = parseNumbers(rawArr);
  const k = Number(rawK.trim());

  if (isNaN(k) || k < 0 || k >= arr.length) {
    throw new Error(`Geçersiz sıra indeksi K. K değeri [0, ${arr.length - 1}] aralığında olmalıdır.`);
  }

  const trace: string[] = [];
  
  function getMedianOfMedians(sub: number[], targetK: number, depth = 0): number {
    const indent = '  '.repeat(depth);
    trace.push(`${indent}Seçim aranıyor: alt dizi size=${sub.length}, aranan sıra K=${targetK}`);
    
    if (sub.length <= 5) {
      const sortedSub = [...sub].sort((a, b) => a - b);
      const res = sortedSub[targetK];
      trace.push(`${indent}Dizi boyutu <= 5, sıralı: [${sortedSub.join(', ')}] -> seçilen: ${res}`);
      return res;
    }

    // Gruplara böl ve medyanları bul
    const medians: number[] = [];
    trace.push(`${indent}Alt grup medyanları hesaplanıyor:`);
    for (let i = 0; i < sub.length; i += 5) {
      const group = sub.slice(i, i + 5);
      const sortedGroup = [...group].sort((a, b) => a - b);
      const median = sortedGroup[Math.floor(sortedGroup.length / 2)];
      medians.push(median);
      trace.push(`${indent}  Grup [${group.join(', ')}] -> medyan: ${median}`);
    }

    trace.push(`${indent}Medyanlar dizisi: [${medians.join(', ')}]`);
    // Medyanların medyanını bul
    const pivot = getMedianOfMedians(medians, Math.floor(medians.length / 2), depth + 1);
    trace.push(`${indent}Hesaplanan Pivot (Medyanların Medyanı): ${pivot}`);

    // Partition
    const low = sub.filter((x) => x < pivot);
    const equal = sub.filter((x) => x === pivot);
    const high = sub.filter((x) => x > pivot);

    trace.push(`${indent}Bölümleme: Küçükler size=${low.length}, Eşitler size=${equal.length}, Büyükler size=${high.length}`);

    if (targetK < low.length) {
      trace.push(`${indent}K (${targetK}) < Küçükler boyutu (${low.length}) -> Sol bölgeye gidiliyor.`);
      return getMedianOfMedians(low, targetK, depth + 1);
    } else if (targetK < low.length + equal.length) {
      trace.push(`${indent}K (${targetK}) Eşitler bölgesine denk geldi. Sonuç: ${pivot}`);
      return pivot;
    } else {
      const newK = targetK - low.length - equal.length;
      trace.push(`${indent}K (${targetK}) >= Sol+Eşit boyutu -> Sağ bölgeye gidiliyor. Yeni K = ${newK}`);
      return getMedianOfMedians(high, newK, depth + 1);
    }
  }

  const resultVal = getMedianOfMedians(arr, k);
  trace.push(`Arama bitti. ${k}. sıradaki en küçük eleman: ${resultVal}`);

  return {
    result: resultVal.toString(),
    trace,
    metadata: [`Dizi Boyutu: ${arr.length}`, `Aranan Sıra İndeksi (0-based): ${k}`]
  };
}

// 5. External Sorting / Replacement Selection Demo
export function runExternalSortingDemo(input: string): GenericDemoResult {
  const [rawArr, rawMem] = splitRequired(input, ';');
  const arr = parseNumbers(rawArr);
  const memSize = Number(rawMem.trim());

  if (isNaN(memSize) || memSize <= 0) {
    throw new Error('Bellek boyutu (memory size) pozitif bir tam sayı olmalıdır.');
  }

  const trace: string[] = [];
  trace.push(`Girdi verisi: [${arr.join(', ')}], Bellek Limiti: ${memSize}`);

  // 1. Aşama: Replacement Selection ile Run'lar oluşturma
  const runs: number[][] = [];
  let currentRun: number[] = [];
  const heap: number[] = [];
  const deadSpace: number[] = [];

  let inputIdx = 0;
  // Belleği doldur
  while (inputIdx < arr.length && heap.length < memSize) {
    heap.push(arr[inputIdx++]);
  }
  heap.sort((a, b) => a - b); // heap simülasyonu

  trace.push(`İlk bellek yüklemesi yapıldı: [${heap.join(', ')}]`);

  while (heap.length > 0 || deadSpace.length > 0) {
    if (heap.length === 0) {
      runs.push(currentRun);
      trace.push(`Run ${runs.length} tamamlandı: [${currentRun.join(', ')}]`);
      currentRun = [];
      heap.push(...deadSpace);
      deadSpace.length = 0;
      heap.sort((a, b) => a - b);
      trace.push(`Yeni Run başlatılıyor. Bellek güncellendi (dead-space aktarıldı): [${heap.join(', ')}]`);
    }

    const val = heap.shift()!;
    currentRun.push(val);
    trace.push(`Bellekten en küçük çekildi: ${val}. Aktif Run'a eklendi.`);

    if (inputIdx < arr.length) {
      const nextVal = arr[inputIdx++];
      if (nextVal >= val) {
        heap.push(nextVal);
        heap.sort((a, b) => a - b);
        trace.push(`Akıştan okunan ${nextVal} >= ${val} olduğundan aktif belleğe eklendi. Bellek: [${heap.join(', ')}]`);
      } else {
        deadSpace.push(nextVal);
        trace.push(`Akıştan okunan ${nextVal} < ${val} olduğundan bir sonraki run için bekletiliyor (dead space). Dead space: [${deadSpace.join(', ')}]`);
      }
    }
  }

  if (currentRun.length > 0) {
    runs.push(currentRun);
    trace.push(`Run ${runs.length} tamamlandı: [${currentRun.join(', ')}]`);
  }

  trace.push(`Yedekli Seçim bitti. Toplam üretilen Run sayısı: ${runs.length}`);

  // 2. Aşama: Çok Yollu Birleştirme (Multiway Merge) simülasyonu
  trace.push('Çok Yollu Birleştirme (Multiway Merge) aşamasına geçiliyor.');
  
  // Basit multiway merge
  const finalSorted: number[] = [];
  const indices = Array(runs.length).fill(0);
  
  while (true) {
    let minVal = Infinity;
    let minRunIdx = -1;
    
    for (let r = 0; r < runs.length; r++) {
      if (indices[r] < runs[r].length) {
        if (runs[r][indices[r]] < minVal) {
          minVal = runs[r][indices[r]];
          minRunIdx = r;
        }
      }
    }
    
    if (minRunIdx === -1) break;
    
    finalSorted.push(minVal);
    indices[minRunIdx]++;
    trace.push(`Run ${minRunIdx + 1} den ${minVal} seçildi ve nihai çıktıya eklendi.`);
  }

  trace.push(`Birleştirme bitti. Sıralı çıktı: [${finalSorted.join(', ')}]`);

  return {
    result: `[${finalSorted.join(', ')}]`,
    trace,
    metadata: [`Üretilen Geçici Dosya (Run) Sayısı: ${runs.length}`, `Çıktı Boyutu: ${finalSorted.length}`]
  };
}

// 6. Simple Sorts Demo
export function runSimpleSortsDemo(input: string): GenericDemoResult {
  const arr = parseNumbers(input);
  const trace: string[] = [];

  if (arr.length === 3) {
    trace.push(`Sort3 (3-eleman optimizasyonu) tetiklendi. Başlangıç: [${arr.join(', ')}]`);
    
    let [a, b, c] = arr;
    
    trace.push(`Karşılaştırma 1: a[0] ve a[1] (${a} & ${b})`);
    if (a > b) {
      [a, b] = [b, a];
      trace.push(`  Değiştirildi -> [${a}, ${b}, ${c}]`);
    } else {
      trace.push('  Sıralı, değişiklik yok.');
    }

    trace.push(`Karşılaştırma 2: a[1] ve a[2] (${b} & ${c})`);
    if (b > c) {
      [b, c] = [c, b];
      trace.push(`  Değiştirildi -> [${a}, ${b}, ${c}]`);
    } else {
      trace.push('  Sıralı, değişiklik yok.');
    }

    trace.push(`Karşılaştırma 3: a[0] ve a[1] (${a} & ${b})`);
    if (a > b) {
      [a, b] = [b, a];
      trace.push(`  Değiştirildi -> [${a}, ${b}, ${c}]`);
    } else {
      trace.push('  Sıralı, değişiklik yok.');
    }

    return {
      result: `[${[a, b, c].join(', ')}]`,
      trace,
      metadata: ['Kullanılan Algoritma: Sort3 (Döngüsüz 3 Adımlı Sıralama Ağacı)']
    };
  }

  // Linear Sort
  trace.push(`Linear Sort (İki Döngülü Eşleme Sıralaması) tetiklendi. Başlangıç: [${arr.join(', ')}]`);
  const n = arr.length;
  const current = [...arr];

  for (let i = 0; i < n - 1; i++) {
    trace.push(`İndeks ${i} için karşılaştırmalar başlıyor.`);
    for (let j = i + 1; j < n; j++) {
      if (current[i] > current[j]) {
        trace.push(`  swap(current[${i}], current[${j}]) -> (${current[i]} > ${current[j]})`);
        [current[i], current[j]] = [current[j], current[i]];
        trace.push(`  Güncel durum: [${current.join(', ')}]`);
      }
    }
  }

  return {
    result: `[${current.join(', ')}]`,
    trace,
    metadata: ['Kullanılan Algoritma: Linear Sort (Doğrusal Swap Ağacı)']
  };
}
