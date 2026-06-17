export interface GenericDemoResult {
  result: string;
  trace: string[];
}

// ----------------------------------------------------
// 1. Branch & Bound Demo
// ----------------------------------------------------
interface BBNode {
  id: number;
  level: number;
  profit: number;
  weight: number;
  bound: number;
  path: number[]; // 1 for include, 0 for exclude
}

export function runBranchAndBoundNpDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'FIFO';
  const W = parseInt(parts[1]) || 15;
  const valStr = parts[2] || '10,12,15,20';
  const wtStr = parts[3] || '2,3,5,7';

  const values = valStr.split(',').map(Number);
  const weights = wtStr.split(',').map(Number);
  const n = values.length;

  trace.push(`Başlangıç: Mod=${mode}, Kapasite=${W}`);
  trace.push(`Eşyalar: ` + values.map((v, i) => `[ID:${i} v:${v} w:${weights[i]}]`).join(', '));

  // Sort items by profit/weight ratio
  const items = Array.from({ length: n }, (_, i) => ({
    id: i,
    w: weights[i],
    v: values[i],
    ratio: values[i] / weights[i]
  })).sort((a, b) => b.ratio - a.ratio);

  trace.push(`Orana göre sıralama: ` + items.map(item => `[ID:${item.id} oran:${item.ratio.toFixed(2)}]`).join(', '));

  const getBound = (node: Omit<BBNode, 'id' | 'bound'>): number => {
    if (node.weight >= W) return 0;
    let profitBound = node.profit;
    let j = node.level + 1;
    let totweight = node.weight;

    while (j < n && totweight + items[j].w <= W) {
      totweight += items[j].w;
      profitBound += items[j].v;
      j++;
    }

    if (j < n) {
      profitBound += (W - totweight) * items[j].ratio;
    }
    return profitBound;
  };

  let maxProfit = 0;
  let bestPath: number[] = [];
  let nodeIdGen = 1;

  // Active nodes collection
  const activeNodes: BBNode[] = [];
  const root: BBNode = {
    id: nodeIdGen++,
    level: -1,
    profit: 0,
    weight: 0,
    bound: 0,
    path: []
  };
  root.bound = getBound(root);
  activeNodes.push(root);

  trace.push(`Kök Düğüm #${root.id} eklendi. Üst Sınır (Bound) = ${root.bound.toFixed(2)}`);

  while (activeNodes.length > 0) {
    // Select node based on mode
    let currIdx = 0;
    if (mode === 'LIFO') {
      currIdx = activeNodes.length - 1; // Stack behavior
    } else if (mode === 'LC') {
      // Best-First: node with maximum bound
      let maxB = -1;
      for (let i = 0; i < activeNodes.length; i++) {
        if (activeNodes[i].bound > maxB) {
          maxB = activeNodes[i].bound;
          currIdx = i;
        }
      }
    }
    
    const t = activeNodes.splice(currIdx, 1)[0];
    trace.push(`Düğüm #${t.id} inceleniyor (Seviye: ${t.level}, Kâr: ${t.profit}, Ağırlık: ${t.weight}, Sınır: ${t.bound.toFixed(2)})`);

    if (t.bound <= maxProfit) {
      trace.push(` -> Budandı: Sınır (${t.bound.toFixed(2)}) <= Mevcut En İyi Kâr (${maxProfit})`);
      continue;
    }

    if (t.level === n - 1) {
      trace.push(` -> Yaprak düğüme ulaşıldı.`);
      continue;
    }

    const nextLevel = t.level + 1;
    const nextItem = items[nextLevel];

    // Left Child: Include nextItem
    const left: BBNode = {
      id: nodeIdGen++,
      level: nextLevel,
      profit: t.profit + nextItem.v,
      weight: t.weight + nextItem.w,
      bound: 0,
      path: [...t.path, 1]
    };

    if (left.weight <= W) {
      if (left.profit > maxProfit) {
        maxProfit = left.profit;
        bestPath = left.path;
        trace.push(` -> YENİ EN İYİ KÂR: ${maxProfit} (Düğüm #${left.id} ile)`);
      }
      left.bound = getBound(left);
      if (left.bound > maxProfit) {
        activeNodes.push(left);
        trace.push(`    Sol Düğüm #${left.id} (Eşya ${nextItem.id} Alındı) eklendi. Sınır = ${left.bound.toFixed(2)}`);
      } else {
        trace.push(`    Sol Düğüm #${left.id} (Eşya ${nextItem.id} Alındı) eklendikten hemen sonra budandı (Sınır = ${left.bound.toFixed(2)} <= ${maxProfit})`);
      }
    } else {
      trace.push(`    Sol Düğüm #${left.id} (Eşya ${nextItem.id} Alındı) geçersiz: Ağırlık ${left.weight} > Kapasite ${W}`);
    }

    // Right Child: Exclude nextItem
    const right: BBNode = {
      id: nodeIdGen++,
      level: nextLevel,
      profit: t.profit,
      weight: t.weight,
      bound: 0,
      path: [...t.path, 0]
    };

    right.bound = getBound(right);
    if (right.bound > maxProfit) {
      activeNodes.push(right);
      trace.push(`    Sağ Düğüm #${right.id} (Eşya ${nextItem.id} Alınmadı) eklendi. Sınır = ${right.bound.toFixed(2)}`);
    } else {
      trace.push(`    Sağ Düğüm #${right.id} (Eşya ${nextItem.id} Alınmadı) budandı (Sınır = ${right.bound.toFixed(2)} <= ${maxProfit})`);
    }
  }

  // Map best path back to original items
  const takenOrigIds: number[] = [];
  for (let i = 0; i < bestPath.length; i++) {
    if (bestPath[i] === 1) {
      takenOrigIds.push(items[i].id);
    }
  }

  trace.push(`Arama tamamlandı. Maksimum Kâr: ${maxProfit}`);
  return {
    result: `Maksimum Kâr: ${maxProfit}\nSeçilen Orijinal Eşya ID'leri: [${takenOrigIds.join(', ')}]`,
    trace
  };
}

// ----------------------------------------------------
// 2. Traveling Salesman Demo
// ----------------------------------------------------
export function runTravelingSalesmanDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || '2OPT';
  
  const pts: [number, number][] = [];
  for (let i = 1; i < parts.length; i++) {
    if (!parts[i]) continue;
    const coords = parts[i].split(',').map(Number);
    if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
      pts.push([coords[0], coords[1]]);
    }
  }

  if (pts.length < 3) {
    return {
      result: 'Hata',
      trace: ['En az 3 adet şehir koordinatı girilmelidir. Örn: 2OPT; 0,0; 2,4; 5,2; 3,6']
    };
  }

  trace.push(`Mod: ${mode}, Toplam Şehir: ${pts.length}`);
  pts.forEach((p, idx) => trace.push(` Şehir ${idx}: (${p[0]}, ${p[1]})`));

  const dist = (p1: [number, number], p2: [number, number]) => 
    Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);

  const getTourLen = (t: number[]) => {
    let d = 0;
    for (let i = 0; i < t.length; i++) {
      d += dist(pts[t[i]], pts[t[(i + 1) % t.length]]);
    }
    return d;
  };

  if (mode === 'EXHAUSTIVE') {
    trace.push(`Kapsamlı Arama (Exhaustive Search) başlatılıyor...`);
    let bestDist = Infinity;
    let bestTour: number[] = [];

    const permute = (arr: number[], m: number[] = []) => {
      if (arr.length === 0) {
        const fullTour = [0, ...m]; // Fix starting point at 0
        const d = getTourLen(fullTour);
        if (d < bestDist) {
          bestDist = d;
          bestTour = fullTour;
          trace.push(` -> Yeni en iyi tur bulundu: ${fullTour.join('->')} (Mesafe: ${d.toFixed(2)})`);
        }
      } else {
        for (let i = 0; i < arr.length; i++) {
          const curr = arr.slice();
          const next = curr.splice(i, 1);
          permute(curr, m.concat(next));
        }
      }
    };

    const rest = Array.from({ length: pts.length - 1 }, (_, i) => i + 1);
    permute(rest);

    return {
      result: `Mesafe: ${bestDist.toFixed(2)}\nOptimal Tur: ${bestTour.join(' -> ')} -> ${bestTour[0]}`,
      trace
    };
  }

  // Nearest Neighbor Initial Tour
  trace.push(`Başlangıç turu En Yakın Komşu (Nearest Neighbor) ile oluşturuluyor...`);
  const nnTour = [0];
  const visited = new Set<number>([0]);
  while (nnTour.length < pts.length) {
    const curr = nnTour[nnTour.length - 1];
    let minD = Infinity;
    let nextNode = -1;
    for (let i = 0; i < pts.length; i++) {
      if (!visited.has(i)) {
        const d = dist(pts[curr], pts[i]);
        if (d < minD) {
          minD = d;
          nextNode = i;
        }
      }
    }
    visited.add(nextNode);
    nnTour.push(nextNode);
    trace.push(`  Şehir ${curr} -> Şehir ${nextNode} (Mesafe: ${minD.toFixed(2)})`);
  }
  const initLen = getTourLen(nnTour);
  trace.push(`Başlangıç Turu: ${nnTour.join('->')} (Mesafe: ${initLen.toFixed(2)})`);

  if (mode === 'APPROX') {
    return {
      result: `Mesafe: ${initLen.toFixed(2)}\nNN Tur: ${nnTour.join(' -> ')} -> ${nnTour[0]}`,
      trace
    };
  }

  // 2-Opt Improvement
  trace.push(`2-Opt yerel araması başlatılıyor...`);
  let tour = [...nnTour];
  let improved = true;
  let step = 1;

  while (improved) {
    improved = false;
    for (let i = 1; i < pts.length - 1; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        // Swap segment
        const newTour = [
          ...tour.slice(0, i),
          ...tour.slice(i, j + 1).reverse(),
          ...tour.slice(j + 1)
        ];
        const newLen = getTourLen(newTour);
        const oldLen = getTourLen(tour);

        if (newLen < oldLen) {
          trace.push(`Adım ${step++}: İyileşme sağlandı. Segment reverslendi [${tour[i]}..${tour[j]}]. Mesafe: ${oldLen.toFixed(2)} -> ${newLen.toFixed(2)}`);
          tour = newTour;
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  const finalLen = getTourLen(tour);
  trace.push(`2-Opt yerel optimumuna ulaşıldı.`);
  return {
    result: `Mesafe: ${finalLen.toFixed(2)}\nOptimize Tur: ${tour.join(' -> ')} -> ${tour[0]}`,
    trace
  };
}

// ----------------------------------------------------
// 3. Knapsack Variants Demo
// ----------------------------------------------------
export function runKnapsackVariantsDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'UNBOUNDED';
  const W = parseInt(parts[1]) || 10;
  const valStr = parts[2] || '10,15,20';
  const wtStr = parts[3] || '2,3,4';
  
  const values = valStr.split(',').map(Number);
  const weights = wtStr.split(',').map(Number);
  const n = values.length;

  if (mode === 'UNBOUNDED') {
    trace.push(`Mod: Sınırsız Çanta (Unbounded Knapsack), Kapasite: ${W}`);
    const dp = new Array(W + 1).fill(0);
    const chosen = new Array(W + 1).fill(-1);

    for (let w = 1; w <= W; w++) {
      let best = dp[w - 1]; // option to not increase weight
      chosen[w] = chosen[w - 1];
      
      for (let i = 0; i < n; i++) {
        if (weights[i] <= w) {
          const val = dp[w - weights[i]] + values[i];
          if (val > best) {
            best = val;
            chosen[w] = i;
          }
        }
      }
      dp[w] = best;
      trace.push(` DP[kapasite: ${w}] = ${best} (Son Eklenen Eşya: ${chosen[w] !== -1 ? chosen[w] : 'Yok'})`);
    }

    // Reconstruct items
    const counts = new Array(n).fill(0);
    let currW = W;
    while (currW > 0) {
      const idx = chosen[currW];
      if (idx === -1 || weights[idx] > currW) break;
      counts[idx]++;
      currW -= weights[idx];
    }

    return {
      result: `Maksimum Değer: ${dp[W]}\nSeçim Adetleri: ` + counts.map((c, i) => `[ID:${i} adet:${c}]`).join(', '),
      trace
    };
  }

  if (mode === 'BOUNDED') {
    const limStr = parts[4] || '2,1,2';
    const limits = limStr.split(',').map(Number);
    trace.push(`Mod: Sınırlı Çanta (Bounded Knapsack), Kapasite: ${W}`);
    trace.push(`Limitler: ` + limits.join(', '));

    // Deconstruct to 0/1 items
    const decompW: number[] = [];
    const decompV: number[] = [];
    const decompOrigId: number[] = [];

    for (let i = 0; i < n; i++) {
      let limit = limits[i] || 1;
      let k = 1;
      while (limit > 0) {
        const take = Math.min(k, limit);
        decompW.push(take * weights[i]);
        decompV.push(take * values[i]);
        decompOrigId.push(i);
        limit -= take;
        k *= 2;
      }
    }

    trace.push(`İkili ayrıştırma sonucu elde edilen 0/1 nesneleri:`);
    decompW.forEach((wt, idx) => {
      trace.push(` Eşya #${idx} (Orijinal ID: ${decompOrigId[idx]}): v=${decompV[idx]}, w=${wt}`);
    });

    const dp = new Array(W + 1).fill(0);
    for (let i = 0; i < decompW.length; i++) {
      for (let w = W; w >= decompW[i]; w--) {
        const val = dp[w - decompW[i]] + decompV[i];
        if (val > dp[w]) {
          dp[w] = val;
        }
      }
      trace.push(` Eşya #${i} eklendikten sonra DP durumu: dp[W] = ${dp[W]}`);
    }

    return {
      result: `Maksimum Değer: ${dp[W]}`,
      trace
    };
  }

  if (mode === 'BB') {
    return runBranchAndBoundNpDemo(`FIFO;${W};${valStr};${wtStr}`);
  }

  if (mode === 'DKP') {
    // Nondeterministic verification check
    // Syntax target value and choice array: DKP; W; values; weights; TargetValue; choices (e.g. 1,0,2)
    const targetVal = parseInt(parts[4]) || 30;
    const choices = (parts[5] || '1,0,1').split(',').map(Number);

    trace.push(`Mod: Nondeterministik Çanta Doğrulama (DKP)`);
    trace.push(`Hedef Minimum Değer: ${targetVal}`);
    trace.push(`Tahmin Edilen Seçim Vektörü: [${choices.join(', ')}]`);

    let totalW = 0;
    let totalV = 0;
    for (let i = 0; i < n; i++) {
      const qty = choices[i] || 0;
      totalW += qty * weights[i];
      totalV += qty * values[i];
      trace.push(` Eşya ${i}: Adet=${qty}, Toplam Ağırlık=${qty * weights[i]}, Toplam Değer=${qty * values[i]}`);
    }

    const weightOk = totalW <= W;
    const valOk = totalV >= targetVal;

    trace.push(`Toplam Ağırlık = ${totalW} / Kapasite = ${W} -> ${weightOk ? 'UYGUN' : 'AŞILDI'}`);
    trace.push(`Toplam Değer = ${totalV} / Hedef = ${targetVal} -> ${valOk ? 'SAĞLANDI' : 'YETERSİZ'}`);

    const verified = weightOk && valOk;
    return {
      result: verified ? `DOĞRULANDI (VALID)` : `BAŞARISIZ (INVALID)`,
      trace
    };
  }

  return {
    result: 'Geçersiz mod',
    trace: ['Lütfen UNBOUNDED, BOUNDED, BB veya DKP seçin']
  };
}

// ----------------------------------------------------
// 4. Scheduling & Chain Optimization Demo
// ----------------------------------------------------
export function runSchedulingChainDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'MATRIX';

  if (mode === 'JOBS') {
    // JOBS; id1,dead1,prof1; id2,dead2,prof2; ...
    // E.g. JOBS; J1,2,100; J2,1,19; J3,2,27; J4,1,25; J5,3,15
    const jobs: { id: string; deadline: number; profit: number }[] = [];
    for (let i = 1; i < parts.length; i++) {
      if (!parts[i]) continue;
      const bits = parts[i].split(',');
      if (bits.length === 3) {
        jobs.push({
          id: bits[0],
          deadline: parseInt(bits[1]),
          profit: parseInt(bits[2])
        });
      }
    }

    if (jobs.length === 0) {
      // Fallback defaults
      jobs.push(
        { id: 'J1', deadline: 2, profit: 100 },
        { id: 'J2', deadline: 1, profit: 19 },
        { id: 'J3', deadline: 2, profit: 27 },
        { id: 'J4', deadline: 1, profit: 25 },
        { id: 'J5', deadline: 3, profit: 15 }
      );
    }

    trace.push(`İşler kâra göre azalan sırada diziliyor...`);
    jobs.sort((a, b) => b.profit - a.profit);
    jobs.forEach(j => trace.push(` İş ${j.id}: Getiri=${j.profit}, Deadline=${j.deadline}`));

    const maxDeadline = Math.max(...jobs.map(j => j.deadline));
    const slots = new Array(maxDeadline).fill(null);
    let totalProfit = 0;

    for (const job of jobs) {
      // Find latest slot
      let assigned = false;
      for (let t = Math.min(maxDeadline, job.deadline) - 1; t >= 0; t--) {
        if (slots[t] === null) {
          slots[t] = job.id;
          totalProfit += job.profit;
          assigned = true;
          trace.push(` -> İş ${job.id} slot [${t}-${t+1}] konumuna yerleştirildi. Mevcut Kar: ${totalProfit}`);
          break;
        }
      }
      if (!assigned) {
        trace.push(` -> İş ${job.id} atanamadı (Slotlar dolu veya deadline aşılmış).`);
      }
    }

    return {
      result: `Toplam Kar: ${totalProfit}\nZamanlama Dizilimi: [${slots.map(s => s || 'BOŞ').join(', ')}]`,
      trace
    };
  }

  if (mode === 'MATRIX') {
    // MATRIX; 10,20,50,1,100
    const dims = (parts[1] || '10,20,50,1,100').split(',').map(Number);
    const n = dims.length - 1;
    trace.push(`Matris Sayısı: ${n}`);
    dims.forEach((d, i) => {
      if (i < n) {
        trace.push(` A_${i+1} boyutu: ${d} x ${dims[i+1]}`);
      }
    });

    const m = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
    const s = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    for (let l = 2; l <= n; l++) {
      for (let i = 1; i <= n - l + 1; i++) {
        const j = i + l - 1;
        m[i][j] = Infinity;
        for (let k = i; k < j; k++) {
          const q = m[i][k] + m[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
          if (q < m[i][j]) {
            m[i][j] = q;
            s[i][j] = k;
          }
        }
        trace.push(` m[${i}][${j}] hesaplandı = ${m[i][j]} (Bölünme noktası k: ${s[i][j]})`);
      }
    }

    const printParens = (i: number, j: number): string => {
      if (i === j) return `A${i}`;
      const k = s[i][j];
      return `(${printParens(i, k)} x ${printParens(k + 1, j)})`;
    };

    return {
      result: `Minimum skaler çarpım adımı: ${m[1][n]}\nOptimal Parantezleme: ${printParens(1, n)}`,
      trace
    };
  }

  if (mode === 'RELIABILITY') {
    // RELIABILITY; budget; prob1,cost1; prob2,cost2; ...
    // E.g., RELIABILITY; 100; 0.9,30; 0.8,20; 0.95,40
    const budget = parseInt(parts[1]) || 100;
    const comps: { p: number; c: number }[] = [];
    for (let i = 2; i < parts.length; i++) {
      const bits = parts[i].split(',');
      if (bits.length === 2) {
        comps.push({
          p: parseFloat(bits[0]),
          c: parseInt(bits[1])
        });
      }
    }

    if (comps.length === 0) {
      comps.push({ p: 0.9, c: 30 }, { p: 0.8, c: 20 }, { p: 0.95, c: 40 });
    }

    trace.push(`Bütçe: ${budget}`);
    comps.forEach((c, i) => trace.push(` Cihaz ${i+1}: Başarı Oranı=${c.p}, Maliyet=${c.c}`));

    // DP for Reliability design
    // Let R(i, b) be the max reliability for first i components with budget b
    // We can choose u_i copies. Cost of u_i copies is u_i * cost_i.
    // Probability of u_i copies working: 1 - (1 - p_i)^u_i
    let dp: Record<number, number> = { 0: 1.0 }; // budget -> reliability
    
    for (let i = 0; i < comps.length; i++) {
      const comp = comps[i];
      const nextDp: Record<number, number> = {};
      
      for (const bStr in dp) {
        const b = parseInt(bStr);
        const rel = dp[b];
        
        // Try different copy counts (at least 1 copy is required)
        let u = 1;
        while (true) {
          const cost = u * comp.c;
          if (b + cost > budget) break;
          
          const failProb = Math.pow(1 - comp.p, u);
          const compRel = 1 - failProb;
          const newRel = rel * compRel;
          const newBudget = b + cost;
          
          if (!nextDp[newBudget] || newRel > nextDp[newBudget]) {
            nextDp[newBudget] = newRel;
          }
          u++;
        }
      }
      
      dp = nextDp;
      trace.push(` Cihaz ${i+1} eklendikten sonra bütçe kombinasyonları sayısı: ${Object.keys(dp).length}`);
    }

    let maxRel = 0;
    let finalBudget = 0;
    for (const bStr in dp) {
      if (dp[bStr] > maxRel) {
        maxRel = dp[bStr];
        finalBudget = parseInt(bStr);
      }
    }

    return {
      result: `Maksimum Sistem Güvenilirliği: ${maxRel.toFixed(5)}\nKullanılan Bütçe: ${finalBudget} / ${budget}`,
      trace
    };
  }

  return {
    result: 'Hatalı Mod',
    trace: ['JOBS, MATRIX veya RELIABILITY seçin']
  };
}

// ----------------------------------------------------
// 5. Multistage Graphs Demo
// ----------------------------------------------------
interface MSEdge {
  u: number;
  v: number;
  w: number;
}

export function runMultistageGraphsDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'FORWARD';
  const n = parseInt(parts[1]) || 8;
  const edgeStr = parts[2] || '1-2:2,1-3:1,1-4:3,2-5:2,2-6:3,3-5:6,3-6:7,4-6:8,5-7:1,5-8:4,6-7:3,6-8:2,7-8:1';

  // Parse edges: u-v:w
  const edges: MSEdge[] = [];
  edgeStr.split(',').forEach(pair => {
    const split1 = pair.split(':');
    const split2 = split1[0].split('-');
    if (split1.length === 2 && split2.length === 2) {
      edges.push({
        u: parseInt(split2[0]),
        v: parseInt(split2[1]),
        w: parseInt(split1[1])
      });
    }
  });

  trace.push(`Graf yapısı: Toplam Düğüm Sayısı = ${n}, Mod = ${mode}`);
  trace.push(`Kenarlar: ` + edges.map(e => `${e.u}->${e.v}(w:${e.w})`).join(', '));

  if (mode === 'FORWARD') {
    const cost = new Array(n + 1).fill(Infinity);
    const d = new Array(n + 1).fill(0);
    cost[n] = 0;

    trace.push(`Hedef düğüm cost[${n}] = 0 olarak belirlendi.`);

    // Iterate backwards from n-1 to 1
    for (let i = n - 1; i >= 1; i--) {
      const outEdges = edges.filter(e => e.u === i);
      if (outEdges.length === 0) continue;

      let minVal = Infinity;
      let nextV = -1;

      for (const edge of outEdges) {
        const val = edge.w + cost[edge.v];
        trace.push(` Düğüm ${i} -> Düğüm ${edge.v} yolu için maliyet = Kenar(${edge.w}) + Cost[${edge.v}](${cost[edge.v]}) = ${val}`);
        if (val < minVal) {
          minVal = val;
          nextV = edge.v;
        }
      }
      cost[i] = minVal;
      d[i] = nextV;
      trace.push(`  => Cost[${i}] = ${minVal} (Sonraki Düğüm Kararı: ${nextV})`);
    }

    // Reconstruct path
    const path = [1];
    let curr = 1;
    while (curr !== n && d[curr] !== 0) {
      curr = d[curr];
      path.push(curr);
    }

    return {
      result: `Minimum Maliyet (Forward DP): ${cost[1]}\nYol: ${path.join(' -> ')}`,
      trace
    };
  }

  if (mode === 'BACKWARD') {
    const bcost = new Array(n + 1).fill(Infinity);
    const bd = new Array(n + 1).fill(0);
    bcost[1] = 0;

    trace.push(`Kaynak düğüm bcost[1] = 0 olarak belirlendi.`);

    // Iterate forward from stage 2 to k (node 2 to n)
    for (let i = 2; i <= n; i++) {
      const inEdges = edges.filter(e => e.v === i);
      if (inEdges.length === 0) continue;

      let minVal = Infinity;
      let prevU = -1;

      for (const edge of inEdges) {
        const val = bcost[edge.u] + edge.w;
        trace.push(` Düğüm ${edge.u} -> Düğüm ${i} yolu için bcost = bcost[${edge.u}](${bcost[edge.u]}) + Kenar(${edge.w}) = ${val}`);
        if (val < minVal) {
          minVal = val;
          prevU = edge.u;
        }
      }
      bcost[i] = minVal;
      bd[i] = prevU;
      trace.push(`  => bcost[${i}] = ${minVal} (Önceki Düğüm Kararı: ${prevU})`);
    }

    // Reconstruct path backward
    const path: number[] = [n];
    let curr = n;
    while (curr !== 1 && bd[curr] !== 0) {
      curr = bd[curr];
      path.push(curr);
    }
    path.reverse();

    return {
      result: `Minimum Maliyet (Backward DP): ${bcost[n]}\nYol: ${path.join(' -> ')}`,
      trace
    };
  }

  return {
    result: 'Hatalı Mod',
    trace: ['FORWARD veya BACKWARD seçin']
  };
}

// ----------------------------------------------------
// 6. Graph Coloring & SAT (NP-Hard) Demo
// ----------------------------------------------------
export function runGraphColoringNpDemo(input: string): GenericDemoResult {
  const trace: string[] = [];
  const parts = input.split(';').map(s => s.trim());
  const mode = parts[0] || 'COLOR';

  if (mode === 'COLOR') {
    // COLOR; nodes; edges; color_limit
    // E.g. COLOR; 4; 0-1,1-2,2-3,3-0; 3
    const n = parseInt(parts[1]) || 4;
    const edgeStr = parts[2] || '0-1,1-2,2-3,3-0';
    const m = parseInt(parts[3]) || 3;

    trace.push(`Mod: Graf Boyama Geri İzleme (Graph Coloring Backtracking)`);
    trace.push(`Düğüm Sayısı: ${n}, Renk Limiti: ${m}`);

    // Build adjacency matrix
    const graph = Array.from({ length: n }, () => new Array(n).fill(0));
    edgeStr.split(',').forEach(pair => {
      const nodes = pair.split('-').map(Number);
      if (nodes.length === 2) {
        graph[nodes[0]][nodes[1]] = 1;
        graph[nodes[1]][nodes[0]] = 1;
      }
    });

    const color = new Array(n).fill(0);

    const isSafe = (node: number, c: number): boolean => {
      for (let i = 0; i < n; i++) {
        if (graph[node][i] === 1 && color[i] === c) {
          return false;
        }
      }
      return true;
    };

    const solve = (node: number): boolean => {
      if (node === n) return true;

      for (let c = 1; c <= m; c++) {
        trace.push(` Düğüm ${node} için renk ${c} deneniyor...`);
        if (isSafe(node, c)) {
          color[node] = c;
          trace.push(`  -> Renk ${c} atandı. Düğüm ${node+1} için çağrılıyor.`);
          
          if (solve(node + 1)) return true;
          
          trace.push(`  <- Geri izleme (Backtrack): Düğüm ${node}'den renk ${c} kaldırılıyor.`);
          color[node] = 0;
        } else {
          trace.push(`  !! Çakışma var: Komşu düğümlerden biri zaten renk ${c} almış.`);
        }
      }
      return false;
    };

    const success = solve(0);

    if (success) {
      return {
        result: `BOYANABİLİR\nRenk Atamaları: ` + color.map((c, i) => `[Düğüm ${i}: Renk ${c}]`).join(', '),
        trace
      };
    } else {
      return {
        result: `BOYANAMAZ (Renk limiti ${m} yetersiz)`,
        trace
      };
    }
  }

  if (mode === 'SAT') {
    // DPLL SAT Solver
    // Input e.g. SAT; x1 || x2, !x1 || x3, !x2 || !x3
    // We parse clauses. A literal is a string (e.g. "x1" or "!x1").
    const rawClauses = (parts[1] || 'x1 || x2, !x1 || x3, !x2 || !x3').split(',');
    
    // Convert to structured clauses
    let clauses: string[][] = rawClauses.map(clauseStr => 
      clauseStr.split('||').map(s => s.trim()).filter(Boolean)
    ).filter(c => c.length > 0);

    trace.push(`Mod: DPLL SAT Çözücü`);
    trace.push(`Formül: ` + clauses.map(c => `(${c.join(' ∨ ')})`).join(' ∧ '));

    const getOpposite = (lit: string) => lit.startsWith('!') ? lit.slice(1) : '!' + lit;

    // Simplify clauses based on literal assignment
    const simplify = (cls: string[][], lit: string): string[][] => {
      const opp = getOpposite(lit);
      const res: string[][] = [];
      for (const clause of cls) {
        // If clause contains literal, it is satisfied, so we remove the whole clause
        if (clause.includes(lit)) continue;
        // If clause contains the opposite, that literal is false, so we remove it from the clause
        const filtered = clause.filter(x => x !== opp);
        res.push(filtered);
      }
      return res;
    };

    const dpll = (cls: string[][], assignment: Record<string, boolean>): boolean => {
      // If no clauses left, satisfiable!
      if (cls.length === 0) {
        trace.push(` Başarılı: Tüm maddeler sağlandı. Atamalar: ` + JSON.stringify(assignment));
        return true;
      }
      // If there is an empty clause, contradiction!
      if (cls.some(c => c.length === 0)) {
        trace.push(` Başarısız: Boş madde (çelişki) oluştu.`);
        return false;
      }

      // 1. Unit Propagation
      for (const clause of cls) {
        if (clause.length === 1) {
          const lit = clause[0];
          const val = !lit.startsWith('!');
          const varName = lit.replace('!', '');
          trace.push(` Birim Madde (Unit Clause) bulundu: ${lit}. ${varName} = ${val} olarak atanıyor.`);
          
          const nextAssignment = { ...assignment, [varName]: val };
          return dpll(simplify(cls, lit), nextAssignment);
        }
      }

      // 2. Splitting Decision
      // Pick a literal from the first clause
      const lit = cls[0][0];
      const varName = lit.replace('!', '');
      trace.push(` Karar Noktası: ${varName} için deneme yapılıyor.`);

      // Try positive assignment first
      trace.push(`  => ${varName} = True deneniyor.`);
      const valPositive = true;
      const litPositive = varName;
      if (dpll(simplify(cls, litPositive), { ...assignment, [varName]: valPositive })) {
        return true;
      }

      // Try negative assignment
      trace.push(`  => ${varName} = False deneniyor.`);
      const valNegative = false;
      const litNegative = '!' + varName;
      return dpll(simplify(cls, litNegative), { ...assignment, [varName]: valNegative });
    };

    const initialAssignment: Record<string, boolean> = {};
    const satisfiable = dpll(clauses, initialAssignment);

    return {
      result: satisfiable ? `SAĞLANABİLİR (SATISFIABLE)` : `SAĞLANAMAZ (UNSATISFIABLE)`,
      trace
    };
  }

  return {
    result: 'Hatalı Mod',
    trace: ['COLOR veya SAT seçin']
  };
}
