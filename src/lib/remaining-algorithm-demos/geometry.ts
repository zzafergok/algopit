import type { GenericDemoResult } from './types';

// Helper to split a string with required separator
function splitRequired(input: string, separator: string): [string, string] {
  const idx = input.indexOf(separator);
  if (idx === -1) {
    throw new Error(`Girdiyi "${separator}" karakteriyle ayırın.`);
  }
  return [input.slice(0, idx).trim(), input.slice(idx + 1).trim()];
}

// CCW orientation helper
function ccw(p1: [number, number], p2: [number, number], p3: [number, number]): number {
  const val = (p2[1] - p1[1]) * (p3[0] - p2[0]) - (p2[0] - p1[0]) * (p3[1] - p2[1]);
  if (val === 0) return 0; // Collinear
  return val > 0 ? 1 : -1; // 1: Clockwise, -1: Counter-Clockwise
}

// Euclidean distance
function distance(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

// 1. Primitive Geometric Operations Demo
export function runGeometricPrimitivesDemo(input: string): GenericDemoResult {
  const [mode, rawParams] = splitRequired(input, ';');
  const upperMode = mode.toUpperCase();

  const trace: string[] = [];
  trace.push(`Geometrik İşlem Modu: ${upperMode}`);

  if (upperMode === 'BRESENHAM') {
    // Bresenham's Line Algorithm
    // Expected format: "x0,y0,x1,y1"
    const coords = rawParams.split(',').map((x) => Number(x.trim()));
    if (coords.length !== 4 || coords.some(isNaN)) {
      throw new Error('Bresenham için parametre formatı "x0,y0,x1,y1" olmalıdır. Örn: 0,0,8,4');
    }

    let [x0, y0, x1, y1] = coords;
    trace.push(`Çizgi: (${x0}, ${y0}) -> (${x1}, ${y1})`);

    // Let's implement full octant Bresenham
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    const points: [number, number][] = [];
    let cx = x0, cy = y0;

    while (true) {
      points.push([cx, cy]);
      if (cx === x1 && cy === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        cx += sx;
      }
      if (e2 < dx) {
        err += dx;
        cy += sy;
      }
    }

    trace.push('Hesaplanan Çizgi Pikselleri:');
    points.forEach(([x, y]) => trace.push(`  Piksel çizildi: (${x}, ${y})`));

    // Render a text-based ASCII grid of size 10x10 or max of coords
    const maxX = Math.max(x0, x1, 10);
    const maxY = Math.max(y0, y1, 5);
    const grid: string[][] = Array.from({ length: maxY + 1 }, () => Array(maxX + 1).fill('.'));
    
    points.forEach(([x, y]) => {
      if (x >= 0 && x <= maxX && y >= 0 && y <= maxY) {
        grid[y][x] = '#';
      }
    });

    trace.push('\nASCII Izgara Görünümü (0,0 sol alt köşe):');
    for (let r = maxY; r >= 0; r--) {
      trace.push(`  y=${r.toString().padStart(2, ' ')} [ ${grid[r].join(' ')} ]`);
    }
    trace.push(`       x= ${Array.from({ length: maxX + 1 }, (_, i) => i.toString().slice(-1)).join(' ')}`);

    return {
      result: `Çizgi uzunluğu: ${points.length} piksel`,
      trace,
      metadata: [`Piksel sayısı: ${points.length}`, `Pikseller: ${points.map(([x,y]) => `(${x},${y})`).join(', ')}`]
    };
  } else if (upperMode === 'LINE_INT') {
    // Line intersection test
    // Expected format: "x1,y1,x2,y2; x3,y3,x4,y4"
    const [rawLine1, rawLine2] = splitRequired(rawParams, ';');
    const pts1 = rawLine1.split(',').map((x) => Number(x.trim()));
    const pts2 = rawLine2.split(',').map((x) => Number(x.trim()));

    if (pts1.length !== 4 || pts1.some(isNaN) || pts2.length !== 4 || pts2.some(isNaN)) {
      throw new Error('Kesişim testi için parametre formatı: "x1,y1,x2,y2; x3,y3,x4,y4" olmalıdır.');
    }

    const a1: [number, number] = [pts1[0], pts1[1]];
    const a2: [number, number] = [pts1[2], pts1[3]];
    const b1: [number, number] = [pts2[0], pts2[1]];
    const b2: [number, number] = [pts2[2], pts2[3]];

    trace.push(`Çizgi A: (${a1[0]}, ${a1[1]}) -> (${a2[0]}, ${a2[1]})`);
    trace.push(`Çizgi B: (${b1[0]}, ${b1[1]}) -> (${b2[0]}, ${b2[1]})`);

    const o1 = ccw(a1, a2, b1);
    const o2 = ccw(a1, a2, b2);
    const o3 = ccw(b1, b2, a1);
    const o4 = ccw(b1, b2, a2);

    trace.push(`Yönelim Değerleri (ccw):`);
    trace.push(`  ccw(A1, A2, B1) = ${o1}`);
    trace.push(`  ccw(A1, A2, B2) = ${o2}`);
    trace.push(`  ccw(B1, B2, A1) = ${o3}`);
    trace.push(`  ccw(B1, B2, A2) = ${o4}`);

    const intersects = (o1 !== o2 && o3 !== o4);
    trace.push(`Kesişim Koşulu (o1 !== o2 ve o3 !== o4): ${intersects ? 'SAĞLANDI' : 'SAĞLANMADI'}`);

    return {
      result: intersects ? 'Çizgiler kesişiyor.' : 'Çizgiler kesişmiyor.',
      trace,
      metadata: [`Kesişim Durumu: ${intersects ? 'EVET' : 'HAYIR'}`]
    };
  } else if (upperMode === 'RECT_INT') {
    // Rectangle intersection overlap box
    // Expected format: "x1,y1,w1,h1; x2,y2,w2,h2"
    const [rawRect1, rawRect2] = splitRequired(rawParams, ';');
    const r1 = rawRect1.split(',').map((x) => Number(x.trim()));
    const r2 = rawRect2.split(',').map((x) => Number(x.trim()));

    if (r1.length !== 4 || r1.some(isNaN) || r2.length !== 4 || r2.some(isNaN)) {
      throw new Error('Dikdörtgen kesişimi için format: "x1,y1,w1,h1; x2,y2,w2,h2" olmalıdır.');
    }

    const [x1, y1, w1, h1] = r1;
    const [x2, y2, w2, h2] = r2;

    const x1_max = x1 + w1, y1_max = y1 + h1;
    const x2_max = x2 + w2, y2_max = y2 + h2;

    trace.push(`Dikdörtgen 1: [${x1}, ${y1}] -> [${x1_max}, ${y1_max}]`);
    trace.push(`Dikdörtgen 2: [${x2}, ${y2}] -> [${x2_max}, ${y2_max}]`);

    const ox_min = Math.max(x1, x2);
    const oy_min = Math.max(y1, y2);
    const ox_max = Math.min(x1_max, x2_max);
    const oy_max = Math.min(y1_max, y2_max);

    const overlapX = ox_max - ox_min;
    const overlapY = oy_max - oy_min;

    const intersects = overlapX > 0 && overlapY > 0;
    trace.push(`Çakışma X Genişliği: ${overlapX}, Y Genişliği: ${overlapY}`);

    let resStr = '';
    if (intersects) {
      resStr = `Çakışma Dikdörtgeni: x:${ox_min}, y:${oy_min}, w:${overlapX}, h:${overlapY}`;
      trace.push(`  => [Kesişim Var] Çakışma kutusu: x:${ox_min}, y:${oy_min}, w:${overlapX}, h:${overlapY}`);
    } else {
      resStr = 'Dikdörtgenler kesişmiyor.';
      trace.push('  => [Kesişim Yok]');
    }

    return {
      result: resStr,
      trace,
      metadata: [`Kesişim Durumu: ${intersects ? 'EVET' : 'HAYIR'}`, `Çakışma Alanı: ${intersects ? overlapX * overlapY : 0}`]
    };
  } else {
    throw new Error(`Bilinmeyen geometrik işlem modu: "${upperMode}". Modlar: BRESENHAM, LINE_INT, RECT_INT`);
  }
}

// 2. Containment Queries Demo (Point-in-Rectangle and Point-in-Polygon)
export function runContainmentQueryDemo(input: string): GenericDemoResult {
  const parts = input.split(';').map((p) => p.trim());
  if (parts.length < 3) {
    throw new Error('Girdi formatı: "MOD; px,py; SINIRLAR" olmalıdır. Örnek: POLY; 2,2; 0,0; 5,0; 5,5; 0,5');
  }

  const mode = parts[0].toUpperCase();
  const rawPoint = parts[1].split(',').map((x) => Number(x.trim()));
  if (rawPoint.length !== 2 || rawPoint.some(isNaN)) {
    throw new Error('Nokta formatı "px,py" şeklinde sayılardan oluşmalıdır.');
  }
  const px = rawPoint[0], py = rawPoint[1];

  const trace: string[] = [];
  trace.push(`Kapsama Sorgusu Modu: ${mode}`);
  trace.push(`Sorgulanan Nokta: (${px}, ${py})`);

  if (mode === 'RECT') {
    // Bounding Rectangle
    // Expected boundary format: "xmin,ymin,xmax,ymax"
    const coords = parts[2].split(',').map((x) => Number(x.trim()));
    if (coords.length !== 4 || coords.some(isNaN)) {
      throw new Error('Dikdörtgen sınırları "xmin,ymin,xmax,ymax" olmalıdır.');
    }
    const [xmin, ymin, xmax, ymax] = coords;
    trace.push(`Dikdörtgen: [${xmin}, ${ymin}] -> [${xmax}, ${ymax}]`);

    const inX = px >= xmin && px <= xmax;
    const inY = py >= ymin && py <= ymax;
    const inside = inX && inY;

    trace.push(`  x koordinat kontrolü (${xmin} <= ${px} <= ${xmax}): ${inX ? 'SAĞLANDI' : 'İHLAL'}`);
    trace.push(`  y koordinat kontrolü (${ymin} <= ${py} <= ${ymax}): ${inY ? 'SAĞLANDI' : 'İHLAL'}`);
    trace.push(`  Nokta dikdörtgenin ${inside ? 'İÇİNDE' : 'DIŞINDA'}.`);

    return {
      result: inside ? 'Nokta dikdörtgen içindedir.' : 'Nokta dikdörtgen dışındadır.',
      trace,
      metadata: [`İçeride mi: ${inside ? 'EVET' : 'HAYIR'}`]
    };
  } else if (mode === 'POLY') {
    // Polygon vertices list
    // Expected boundary format: "x1,y1; x2,y2; x3,y3; ..."
    const rawVertices = parts.slice(2);
    const vertices: [number, number][] = [];
    for (const vStr of rawVertices) {
      const coords = vStr.split(',').map((x) => Number(x.trim()));
      if (coords.length !== 2 || coords.some(isNaN)) {
        throw new Error(`Geçersiz çokgen köşesi: "${vStr}". Format: x,y`);
      }
      vertices.push([coords[0], coords[1]]);
    }

    if (vertices.length < 3) {
      throw new Error('Çokgen oluşturmak için en az 3 köşe girilmelidir.');
    }

    trace.push(`Çokgen Köşeleri: ${vertices.map(([x, y]) => `(${x},${y})`).join(' -> ')}`);
    trace.push('\n--- Ray Casting Işınsal Sorgu Başladı ---');

    let inside = false;
    const n = vertices.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = vertices[i][0], yi = vertices[i][1];
      const xj = vertices[j][0], yj = vertices[j][1];

      // Check if point y is in coordinate range of this edge
      const inYRange = (yi > py) !== (yj > py);
      
      trace.push(`Kenar denetleniyor: (${xi}, ${yi}) -> (${xj}, ${yj})`);
      if (inYRange) {
        // Calculate intersection x position
        const x_intersect = (xj - xi) * (py - yi) / (yj - yi) + xi;
        const toTheRight = px < x_intersect;
        trace.push(`  -> y=${py} çizgisi bu kenarı kesiyor. Kesişim X: ${x_intersect.toFixed(3)}`);
        trace.push(`  -> Nokta kesişimin solunda mı (px:${px} < ${x_intersect.toFixed(3)}): ${toTheRight ? 'EVET' : 'HAYIR'}`);

        if (toTheRight) {
          inside = !inside;
          trace.push(`  => [Kesişim Sayıldı] Durum tersine çevrildi: İçeride mi = ${inside}`);
        }
      } else {
        trace.push(`  -> y=${py} çizgisi bu kenarın sınırları dışında. Atlandı.`);
      }
    }

    trace.push(`\nSonuç: Kesişim durumlarının toplamına göre nokta çokgenin ${inside ? 'İÇİNDEDİR' : 'DIŞINDADIR'}.`);

    return {
      result: inside ? 'Nokta çokgenin içindedir.' : 'Nokta çokgenin dışındadır.',
      trace,
      metadata: [`Köşe sayısı: ${n}`, `Kapsama Durumu: ${inside ? 'İÇERİDE' : 'DIŞARIDA'}`]
    };
  } else {
    throw new Error(`Bilinmeyen kapsama sorgusu modu: "${mode}". Modlar: RECT, POLY`);
  }
}

// 3. Path & Convex Hull Demo (Graham Scan and Jarvis March)
export function runConvexHullPathDemo(input: string): GenericDemoResult {
  const [mode, rawPoints] = splitRequired(input, ';');
  const upperMode = mode.toUpperCase();

  const ptTokens = rawPoints.split(';').map((p) => p.trim()).filter(Boolean);
  const points: [number, number][] = [];

  for (const token of ptTokens) {
    const coords = token.split(',').map((x) => Number(x.trim()));
    if (coords.length !== 2 || coords.some(isNaN)) {
      throw new Error(`Geçersiz nokta koordinatı: "${token}". Format: x,y`);
    }
    points.push([coords[0], coords[1]]);
  }

  const n = points.length;
  if (n < 3) {
    throw new Error('Dış bükey gövde hesaplamak için en az 3 nokta gereklidir.');
  }

  const trace: string[] = [];
  trace.push(`Dış Bükey Gövde Metodu: ${upperMode}`);
  trace.push(`Noktalar: ${points.map(([x, y]) => `(${x},${y})`).join(', ')}`);

  let hull: [number, number][] = [];

  if (upperMode === 'GRAHAM') {
    trace.push('\n--- Graham Scan Başladı ---');
    
    // 1. Find pivot (minimum y)
    let pivot = points[0];
    let pivotIdx = 0;
    for (let i = 1; i < n; i++) {
      if (points[i][1] < pivot[1] || (points[i][1] === pivot[1] && points[i][0] < pivot[0])) {
        pivot = points[i];
        pivotIdx = i;
      }
    }
    trace.push(`Pivot Seçildi (En Alt-Sol Nokta): P0 = (${pivot[0]}, ${pivot[1]})`);

    // 2. Polar sort
    const copy = [...points];
    copy.splice(pivotIdx, 1);
    copy.sort((a, b) => {
      const orient = ccw(pivot, a, b);
      if (orient === 0) {
        const distA = (a[0] - pivot[0]) ** 2 + (a[1] - pivot[1]) ** 2;
        const distB = (b[0] - pivot[0]) ** 2 + (b[1] - pivot[1]) ** 2;
        return distA - distB;
      }
      return orient > 0 ? -1 : 1;
    });

    trace.push(`Polar Açıya Göre Sıralı Noktalar: ${copy.map(([x, y]) => `(${x},${y})`).join(', ')}`);

    // 3. Graham Scan Stack operations
    const stack: [number, number][] = [pivot, copy[0], copy[1]];
    trace.push(`Başlangıç Yığını: [(${pivot[0]},${pivot[1]}), (${copy[0][0]},${copy[0][1]}), (${copy[1][0]},${copy[1][1]})]`);

    for (let i = 2; i < copy.length; i++) {
      const pt = copy[i];
      trace.push(`Nokta denetleniyor: (${pt[0]}, ${pt[1]})`);
      
      while (stack.length >= 2) {
        const top = stack[stack.length - 1];
        const nextToTop = stack[stack.length - 2];
        const orient = ccw(nextToTop, top, pt);
        
        trace.push(`  Kıyaslama: ccw((${nextToTop[0]},${nextToTop[1]}), (${top[0]},${top[1]}), (${pt[0]},${pt[1]})) = ${orient}`);
        if (orient > 0) {
          trace.push(`    -> Saat yönü tersi (Sol dönüş). Yığın korundu.`);
          break;
        } else {
          trace.push(`    -> Saat yönü veya doğrusal (Sağ dönüş). En üstteki (${top[0]},${top[1]}) yığından çıkarıldı.`);
          stack.pop();
        }
      }
      stack.push(pt);
      trace.push(`  Yığına eklendi. Güncel Yığın: [${stack.map(([x,y]) => `(${x},${y})`).join(', ')}]`);
    }
    hull = stack;
  } else if (upperMode === 'JARVIS') {
    trace.push('\n--- Jarvis March (Gift Wrapping) Başladı ---');
    
    // Find leftmost point
    let leftmostIdx = 0;
    for (let i = 1; i < n; i++) {
      if (points[i][0] < points[leftmostIdx][0]) {
        leftmostIdx = i;
      }
    }

    let p = leftmostIdx;
    let stepCount = 1;

    do {
      hull.push(points[p]);
      trace.push(`Adım ${stepCount}: Gövdeye nokta eklendi: (${points[p][0]}, ${points[p][1]})`);

      // Find next point q such that ccw(p, x, q) is counter-clockwise for all x
      let q = (p + 1) % n;
      for (let i = 0; i < n; i++) {
        const orient = ccw(points[p], points[i], points[q]);
        if (orient > 0) {
          q = i; // Found a more outer point
        }
      }

      p = q;
      stepCount++;
      if (stepCount > n + 1) {
        trace.push('  [Sınır Uyarısı] Çok fazla adım yapıldı.');
        break;
      }
    } while (p !== leftmostIdx);

    trace.push(`Gövde başlangıç noktasına dönüldü: (${points[p][0]}, ${points[p][1]})`);
  } else {
    throw new Error(`Bilinmeyen Convex Hull modu: "${upperMode}". Modlar: GRAHAM, JARVIS`);
  }

  const resultStr = `Dış bükey gövde noktaları: ${hull.map(([x, y]) => `(${x},${y})`).join(' -> ')}`;

  return {
    result: resultStr,
    trace,
    metadata: [`Gövde Nokta Sayısı: ${hull.length}`, `Seçilen Köşeler: ${hull.map((p) => `(${p[0]},${p[1]})`).join(', ')}`]
  };
}

// 4. Proximity Problems (Closest Pair of Points)
export function runProximityProblemsDemo(input: string): GenericDemoResult {
  const ptTokens = input.split(';').map((p) => p.trim()).filter(Boolean);
  const points: [number, number][] = [];

  for (const token of ptTokens) {
    const coords = token.split(',').map((x) => Number(x.trim()));
    if (coords.length !== 2 || coords.some(isNaN)) {
      throw new Error(`Geçersiz nokta koordinatı: "${token}". Format: x,y`);
    }
    points.push([coords[0], coords[1]]);
  }

  const n = points.length;
  if (n < 2) {
    throw new Error('En yakın çifti bulmak için en az 2 nokta girilmelidir.');
  }

  const trace: string[] = [];
  trace.push('En Yakın Nokta Çifti (Divide-and-Conquer) Arama Başladı.');
  trace.push(`Noktalar: ${points.map(([x, y]) => `(${x},${y})`).join(', ')}`);

  // X and Y sorted copies
  const ptsX = [...points].sort((a, b) => a[0] - b[0]);
  const ptsY = [...points].sort((a, b) => a[1] - b[1]);

  let closestPair: [[number, number], [number, number]] = [points[0], points[1]];
  let minD = distance(points[0], points[1]);

  function findClosestPair(xArr: [number, number][], yArr: [number, number][], depth: number): number {
    const len = xArr.length;
    const indent = '  '.repeat(depth);
    trace.push(`${indent}--> closest_pair_rec(Boyut: ${len})`);

    // Base case: Brute force for 3 or fewer points
    if (len <= 3) {
      let localMin = Infinity;
      let p1 = xArr[0], p2 = xArr[1];
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          const d = distance(xArr[i], xArr[j]);
          if (d < localMin) {
            localMin = d;
            p1 = xArr[i];
            p2 = xArr[j];
          }
        }
      }
      trace.push(`${indent}<-- Brute-Force en yakın mesafe: ${localMin.toFixed(3)} çift: (${p1[0]},${p1[1]}) - (${p2[0]},${p2[1]})`);
      if (localMin < minD) {
        minD = localMin;
        closestPair = [p1, p2];
      }
      return localMin;
    }

    const mid = Math.floor(len / 2);
    const midPoint = xArr[mid];
    trace.push(`${indent}  Düzlem X=${midPoint[0]} çizgisinden ikiye bölünüyor.`);

    const leftX = xArr.slice(0, mid);
    const rightX = xArr.slice(mid);

    const leftY = yArr.filter((p) => p[0] <= midPoint[0]);
    const rightY = yArr.filter((p) => p[0] > midPoint[0]);

    const dl = findClosestPair(leftX, leftY, depth + 1);
    const dr = findClosestPair(rightX, rightY, depth + 1);
    let d = Math.min(dl, dr);

    // Bounding strip checks
    const strip = yArr.filter((p) => Math.abs(p[0] - midPoint[0]) < d);
    trace.push(`${indent}  Orta şerit genişliği d=${d.toFixed(3)} olan ${strip.length} nokta içeriyor.`);

    for (let i = 0; i < strip.length; i++) {
      for (let j = i + 1; j < strip.length && (strip[j][1] - strip[i][1]) < d; j++) {
        const dStrip = distance(strip[i], strip[j]);
        if (dStrip < d) {
          d = dStrip;
          if (d < minD) {
            minD = d;
            closestPair = [strip[i], strip[j]];
          }
          trace.push(`${indent}    Şerit içinde daha yakın çift bulundu: (${strip[i][0]},${strip[i][1]}) ve (${strip[j][0]},${strip[j][1]}) Mesafe: ${d.toFixed(3)}`);
        }
      }
    }

    trace.push(`${indent}<-- En yakın alt bölge mesafesi: ${d.toFixed(3)}`);
    return d;
  }

  findClosestPair(ptsX, ptsY, 0);

  const resultStr = `En Yakın Çift: (${closestPair[0][0]}, ${closestPair[0][1]}) - (${closestPair[1][0]}, ${closestPair[1][1]}) Mesafe: ${minD.toFixed(3)}`;

  return {
    result: resultStr,
    trace,
    metadata: [
      `Minimum Mesafe: ${minD.toFixed(3)}`,
      `Çift 1: (${closestPair[0][0]}, ${closestPair[0][1]})`,
      `Çift 2: (${closestPair[1][0]}, ${closestPair[1][1]})`
    ]
  };
}

// 5. Spatial & Range Searching Demo (2D-Tree build and search)
export function runSpatialSearchingDemo(input: string): GenericDemoResult {
  // Expected format: "xmin,ymin,xmax,ymax ; x1,y1; x2,y2; ..."
  const [rawQuery, rawPoints] = splitRequired(input, ';');

  const q = rawQuery.split(',').map((x) => Number(x.trim()));
  if (q.length !== 4 || q.some(isNaN)) {
    throw new Error('Sorgu aralık formatı "xmin,ymin,xmax,ymax" olmalıdır.');
  }
  const [xmin, ymin, xmax, ymax] = q;

  const ptTokens = rawPoints.split(';').map((p) => p.trim()).filter(Boolean);
  const points: [number, number][] = [];

  for (const token of ptTokens) {
    const coords = token.split(',').map((x) => Number(x.trim()));
    if (coords.length !== 2 || coords.some(isNaN)) {
      throw new Error(`Geçersiz nokta koordinatı: "${token}". Format: x,y`);
    }
    points.push([coords[0], coords[1]]);
  }

  if (points.length === 0) {
    throw new Error('Uzamsal arama için en az bir nokta girilmelidir.');
  }

  const trace: string[] = [];
  trace.push('--- 2D-Ağaç (2D-Tree) Kurulumu Başladı ---');
  trace.push(`Arama Bölgesi (Query Box): [${xmin}, ${ymin}] -> [${xmax}, ${ymax}]`);
  trace.push(`Düzlem Noktaları: ${points.map(([x, y]) => `(${x},${y})`).join(', ')}`);

  class KDNode {
    point: [number, number];
    left: KDNode | null = null;
    right: KDNode | null = null;
    constructor(pt: [number, number]) { this.point = pt; }
  }

  let root: KDNode | null = null;

  function insert(node: KDNode | null, pt: [number, number], depth: number): KDNode {
    if (node === null) {
      trace.push(`  [Ekleme] Nokta (${pt[0]}, ${pt[1]}) eklendi (Derinlik: ${depth}, Eksen: ${depth % 2 === 0 ? 'X' : 'Y'})`);
      return new KDNode(pt);
    }
    const cd = depth % 2;
    const axisChar = cd === 0 ? 'X' : 'Y';

    trace.push(`  Karşılaştırma (Derinlik ${depth}, Eksen ${axisChar}): Yeni (${pt[0]},${pt[1]}) vs Düğüm (${node.point[0]},${node.point[1]})`);
    if (pt[cd] < node.point[cd]) {
      trace.push(`    -> (${pt[cd]} < ${node.point[cd]}): Sol dala ilerleniyor.`);
      node.left = insert(node.left, pt, depth + 1);
    } else {
      trace.push(`    -> (${pt[cd]} >= ${node.point[cd]}): Sağ dala ilerleniyor.`);
      node.right = insert(node.right, pt, depth + 1);
    }
    return node;
  }

  // Build tree
  for (const pt of points) {
    root = insert(root, pt, 0);
  }

  trace.push('\n--- Aralık Araması (Range Search) Başladı ---');
  const results: [number, number][] = [];

  function search(node: KDNode | null, depth: number) {
    if (node === null) return;

    const [x, y] = node.point;
    const cd = depth % 2;
    const axisChar = cd === 0 ? 'X' : 'Y';

    trace.push(`Arama ziyaret: Düğüm (${x}, ${y}) | Derinlik: ${depth} (Bölme: ${axisChar})`);

    // Check inclusion
    const inside = x >= xmin && x <= xmax && y >= ymin && y <= ymax;
    if (inside) {
      results.push(node.point);
      trace.push(`  => [KAPSANDI] Nokta (${x}, ${y}) sorgu kutusu içinde!`);
    } else {
      trace.push(`  => [Dışında] Nokta (${x}, ${y}) aralık dışında.`);
    }

    const val = cd === 0 ? x : y;
    const minVal = cd === 0 ? xmin : ymin;
    const maxVal = cd === 0 ? xmax : ymax;

    // Pruning/Branch decisions
    if (minVal <= val) {
      trace.push(`  Giriş: Sol dal taranıyor (min_${axisChar}:${minVal} <= düğüm_${axisChar}:${val})`);
      search(node.left, depth + 1);
    } else {
      trace.push(`  [BUDANDI - PRUNED] Sol dal elendi (min_${axisChar}:${minVal} > düğüm_${axisChar}:${val})`);
    }

    if (maxVal >= val) {
      trace.push(`  Giriş: Sağ dal taranıyor (max_${axisChar}:${maxVal} >= düğüm_${axisChar}:${val})`);
      search(node.right, depth + 1);
    } else {
      trace.push(`  [BUDANDI - PRUNED] Sağ dal elendi (max_${axisChar}:${maxVal} < düğüm_${axisChar}:${val})`);
    }
  }

  search(root, 0);

  const resultStr = results.length > 0
    ? `Aralıktaki Noktalar: ${results.map(([x, y]) => `(${x},${y})`).join(', ')}`
    : 'Aralıkta hiçbir nokta bulunamadı.';

  return {
    result: resultStr,
    trace,
    metadata: [
      `Toplam Sorgulanan Nokta: ${points.length}`,
      `Aralıkta Kalan Nokta Sayısı: ${results.length}`,
      `Sonuç Kümesi: ${results.map((p) => `(${p[0]},${p[1]})`).join(', ')}`
    ]
  };
}
