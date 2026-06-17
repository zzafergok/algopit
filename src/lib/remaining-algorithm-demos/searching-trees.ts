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

// 1. Search Techniques Demo (Interpolation Search + Self-Organizing Move-to-Front Demo)
export function runSearchTechniquesDemo(input: string): GenericDemoResult {
  const [rawArr, rawTarget] = splitRequired(input, ';');
  const arr = parseNumbers(rawArr);
  const target = Number(rawTarget.trim());

  if (isNaN(target)) {
    throw new Error('Geçersiz hedef sayı.');
  }

  const trace: string[] = [];
  trace.push(`Arama Başladı: Dizi = [${arr.join(', ')}], Hedef = ${target}`);

  // Test if sorted for interpolation search
  const isSorted = arr.every((val, i) => i === 0 || val >= arr[i - 1]);
  if (!isSorted) {
    trace.push('UYARI: Dizi sıralı değil! İnterpolasyon araması sıralı diziler gerektirir.');
  }

  let low = 0;
  let high = arr.length - 1;
  let foundIdx = -1;
  let step = 1;

  while (arr[low] <= target && target <= arr[high] && arr[low] !== arr[high]) {
    // Interpolation formula
    const denominator = arr[high] - arr[low];
    const numerator = (high - low) * (target - arr[low]);
    const pos = low + Math.floor(numerator / denominator);

    trace.push(`Adım ${step}: low=${low} (${arr[low]}), high=${high} (${arr[high]}), hesaplanan konum=${pos} (${arr[pos]})`);

    if (arr[pos] === target) {
      foundIdx = pos;
      trace.push(`Hedef ${target} bulundu! İndeks: ${pos}`);
      break;
    }

    if (arr[pos] < target) {
      trace.push(`  arr[${pos}] (${arr[pos]}) < Hedef (${target}) -> low değeri ${pos + 1} yapılıyor.`);
      low = pos + 1;
    } else {
      trace.push(`  arr[${pos}] (${arr[pos]}) > Hedef (${target}) -> high değeri ${pos - 1} yapılıyor.`);
      high = pos - 1;
    }
    step++;
  }

  if (foundIdx === -1 && arr[low] === target) {
    foundIdx = low;
    trace.push(`Hedef ${target} sınırda bulundu! İndeks: ${low}`);
  }

  if (foundIdx === -1) {
    trace.push(`Hedef ${target} dizide bulunamadı.`);
  }

  // Also simulate Move-To-Front (Self-Organizing Search) representation
  let mtfResult = '';
  if (foundIdx !== -1) {
    const mtfArr = [...arr];
    const item = mtfArr.splice(foundIdx, 1)[0];
    mtfArr.unshift(item);
    mtfResult = `Move-to-Front sonrası dizinin yeni durumu: [${mtfArr.join(', ')}]`;
  }

  return {
    result: foundIdx !== -1 ? `İndeks: ${foundIdx}` : 'Bulunamadı',
    trace,
    metadata: [
      `Dizi Boyutu: ${arr.length}`,
      `Yapılan Karşılaştırma Adımı: ${step}`,
      ...(mtfResult ? [mtfResult] : [])
    ]
  };
}

// 2. Trees & Search Trees Demo (Red-Black Tree Simulation)
class RBTNode {
  val: number;
  color: 'RED' | 'BLACK';
  left: RBTNode | null = null;
  right: RBTNode | null = null;
  constructor(val: number) {
    this.val = val;
    this.color = 'RED';
  }
}

export function runSearchTreesDemo(input: string): GenericDemoResult {
  const arr = parseNumbers(input);
  if (arr.length === 0) {
    return { result: '', trace: ['Boş girdi.'] };
  }

  const trace: string[] = [];
  let root: RBTNode | null = null;

  function isRed(node: RBTNode | null | undefined): boolean {
    return !!node && node.color === 'RED';
  }

  function rotateLeft(h: RBTNode): RBTNode {
    const x = h.right!;
    h.right = x.left;
    x.left = h;
    x.color = h.color;
    h.color = 'RED';
    return x;
  }

  function rotateRight(h: RBTNode): RBTNode {
    const x = h.left!;
    h.left = x.right;
    x.right = h;
    x.color = h.color;
    h.color = 'RED';
    return x;
  }

  function flipColors(h: RBTNode) {
    h.color = 'RED';
    if (h.left) h.left.color = 'BLACK';
    if (h.right) h.right.color = 'BLACK';
  }

  function insertRec(node: RBTNode | null, val: number): RBTNode {
    if (node === null) {
      trace.push(`  Ağaçta boş yer bulundu, yeni kırmızı düğüm (${val}) oluşturuldu.`);
      return new RBTNode(val);
    }

    if (val < node.val) {
      node.left = insertRec(node.left, val);
    } else if (val > node.val) {
      node.right = insertRec(node.right, val);
    } else {
      trace.push(`  Değer ${val} zaten ağaçta var, eklenmedi.`);
      return node;
    }

    // Balance rules
    if (isRed(node.right) && !isRed(node.left)) {
      trace.push(`  [Rotasyon] Düğüm ${node.val} için SOLA Rotasyon yapılıyor.`);
      node = rotateLeft(node);
    }
    if (isRed(node.left) && isRed(node.left?.left)) {
      trace.push(`  [Rotasyon] Düğüm ${node.val} için SAĞA Rotasyon yapılıyor.`);
      node = rotateRight(node);
    }
    if (isRed(node.left) && isRed(node.right)) {
      trace.push(`  [Renk Değişimi] Düğüm ${node.val} ve alt düğümleri için renkler tersyüz ediliyor.`);
      flipColors(node);
    }

    return node;
  }

  for (const val of arr) {
    trace.push(`Kırmızı-Siyah Ağaca ${val} ekleniyor...`);
    root = insertRec(root, val);
    root.color = 'BLACK';
    trace.push(`Kökün rengi siyah olarak korundu.`);
  }

  // Traverse tree to show structure
  const traversal: string[] = [];
  function inorder(node: RBTNode | null) {
    if (node === null) return;
    inorder(node.left);
    traversal.push(`${node.val} (${node.color})`);
    inorder(node.right);
  }
  inorder(root);

  return {
    result: root ? `Root: ${root.val} (BLACK)` : 'Ağaç boş',
    trace,
    metadata: [
      `Ağacın Sıralı (In-order) Yapısı: [${traversal.join(', ')}]`,
      `Toplam Eklenen Düğüm: ${arr.length}`
    ]
  };
}

// 3. External Searching & Hashing Demo (Extendible Hashing Simülasyonu)
class ExtendibleBucket {
  localDepth: number = 1;
  keys: number[] = [];
  capacity: number;
  constructor(capacity: number) {
    this.capacity = capacity;
  }
}

export function runExternalSearchingHashingDemo(input: string): GenericDemoResult {
  const [rawCap, rawKeys] = splitRequired(input, ';');
  const capacity = Number(rawCap.trim());
  const keys = parseNumbers(rawKeys);

  if (isNaN(capacity) || capacity <= 0) {
    throw new Error('Kova kapasitesi pozitif bir sayı olmalıdır.');
  }

  const trace: string[] = [];
  let globalDepth = 1;
  let directory: ExtendibleBucket[] = [
    new ExtendibleBucket(capacity), // 0
    new ExtendibleBucket(capacity)  // 1
  ];

  trace.push(`Extendible Hashing başlatıldı. Kapasite = ${capacity}, Dizin Derinliği (Global Depth) = 1`);

  for (const key of keys) {
    const hashVal = key % 32; // Simüle hash
    let idx = hashVal & ((1 << globalDepth) - 1);
    let bucket = directory[idx];

    trace.push(`Anahtar ${key} ekleniyor (Hash % 32 = ${hashVal}, İkili: ${hashVal.toString(2)}, Dizin İndeksi: ${idx})`);

    if (bucket.keys.length < capacity) {
      bucket.keys.push(key);
      trace.push(`  Kova dolmadığı için eleman eklendi. Kova içeriği: [${bucket.keys.join(', ')}]`);
      continue;
    }

    trace.push(`  Kova dolu! Kova bölünmesi gerekiyor. (Local depth: ${bucket.localDepth}, Global depth: ${globalDepth})`);

    if (bucket.localDepth === globalDepth) {
      trace.push(`  Local depth ile Global depth eşit olduğu için dizin boyutu iki katına çıkarılıyor.`);
      const oldSize = directory.length;
      for (let i = 0; i < oldSize; i++) {
        directory.push(directory[i]);
      }
      globalDepth++;
      trace.push(`  Yeni Dizin Derinliği: ${globalDepth}`);
    }

    // Yeni kova oluştur
    const newBucket = new ExtendibleBucket(capacity);
    bucket.localDepth++;
    newBucket.localDepth = bucket.localDepth;

    // Yeniden dağıtılacak tüm elemanlar
    const allKeys = [...bucket.keys, key];
    bucket.keys = [];

    // Pointerları güncelle
    const mask = 1 << (bucket.localDepth - 1);
    for (let i = 0; i < directory.length; i++) {
      if (directory[i] === bucket) {
        if ((i & mask) !== 0) {
          directory[i] = newBucket;
        }
      }
    }

    // Anahtarları yeniden yerleştir
    for (const k of allKeys) {
      const kHash = k % 32;
      const kIdx = kHash & ((1 << globalDepth) - 1);
      directory[kIdx].keys.push(k);
    }
    
    trace.push(`  Yeniden dağıtım tamamlandı. Kova durumları güncellendi.`);
  }

  // Dizin durumunu göster
  const metadata: string[] = [];
  const visitedBuckets = new Set<ExtendibleBucket>();
  
  directory.forEach((b, idx) => {
    if (!visitedBuckets.has(b)) {
      visitedBuckets.add(b);
      metadata.push(`Kova (Local Depth ${b.localDepth}): [${b.keys.join(', ')}]`);
    }
    metadata.push(`Dizin İndeks ${idx} -> Kova adresi işaret ediyor.`);
  });

  return {
    result: `Global Depth: ${globalDepth}, Toplam Kova Sayısı: ${visitedBuckets.size}`,
    trace,
    metadata
  };
}

// 4. Open Addressing Hashing Demo (Linear Probing vs Double Hashing)
export function runOpenAddressingHashingDemo(input: string): GenericDemoResult {
  const [rawSize, rawKeys] = splitRequired(input, ';');
  const size = Number(rawSize.trim());
  const keys = parseNumbers(rawKeys);

  if (isNaN(size) || size <= 0) {
    throw new Error('Tablo boyutu pozitif tam sayı olmalıdır.');
  }

  const trace: string[] = [];
  const linearTable: (number | null)[] = Array(size).fill(null);
  const doubleTable: (number | null)[] = Array(size).fill(null);

  trace.push(`Hashing başlatıldı. Tablo Boyutu: ${size}, Eklenecek Anahtarlar: [${keys.join(', ')}]`);

  // 1. Linear Probing Simülasyonu
  trace.push('\n--- LINEAR PROBING BAŞLADI ---');
  for (const key of keys) {
    let i = 0;
    const h = key % size;
    trace.push(`Anahtar ${key} ekleniyor. İlk hash indeksi: ${h}`);

    let inserted = false;
    while (i < size) {
      const idx = (h + i) % size;
      if (linearTable[idx] === null) {
        linearTable[idx] = key;
        trace.push(`  [Adres Bulundu] Boş hücre bulundu! İndeks ${idx} doldu.`);
        inserted = true;
        break;
      }
      trace.push(`  [Çakışma] İndeks ${idx} dolu (${linearTable[idx]}). Sonraki taranıyor...`);
      i++;
    }
    if (!inserted) {
      trace.push(`  HATA: Tablo doldu, ${key} eklenemedi.`);
    }
  }

  // 2. Double Hashing Simülasyonu
  trace.push('\n--- DOUBLE HASHING BAŞLADI ---');
  for (const key of keys) {
    let i = 0;
    const h1 = key % size;
    // h2 must not evaluate to 0
    const h2 = 1 + (key % (size - 1 || 1));
    trace.push(`Anahtar ${key} ekleniyor. h1=${h1}, h2=${h2}`);

    let inserted = false;
    while (i < size) {
      const idx = (h1 + i * h2) % size;
      if (doubleTable[idx] === null) {
        doubleTable[idx] = key;
        trace.push(`  [Adres Bulundu] Boş hücre bulundu! İndeks ${idx} doldu.`);
        inserted = true;
        break;
      }
      trace.push(`  [Çakışma] İndeks ${idx} dolu (${doubleTable[idx]}). h2 (${h2}) adımıyla taranıyor...`);
      i++;
    }
    if (!inserted) {
      trace.push(`  HATA: Tablo doldu, ${key} eklenemedi.`);
    }
  }

  return {
    result: `Sondalama Tamamlandı. Tablo Boyutu: ${size}`,
    trace,
    metadata: [
      `Linear Probing Son Tablo: [${linearTable.map((x) => (x === null ? 'NIL' : x)).join(', ')}]`,
      `Double Hashing Son Tablo: [${doubleTable.map((x) => (x === null ? 'NIL' : x)).join(', ')}]`
    ]
  };
}
