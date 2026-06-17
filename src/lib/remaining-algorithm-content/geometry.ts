import type { RemainingAlgorithmContent } from './types';

export const geometricPrimitivesContent: RemainingAlgorithmContent = {
  title: 'Temel Geometrik İşlemler (Primitive Geometric Operations)',
  category: 'Hesaplamalı Geometri',
  categoryHref: '/algorithms/computational-geometry',
  family: 'Geometry / Primitives',
  difficulty: 'Orta',
  sources: ['Sedgewick', 'Aho'],
  summary: 'Bilgisayarlı grafik ve geometride çizgi çizmek için kullanılan Bresenham algoritması, çizgi kesişimleri, dikdörtgen kesişimleri ve çember çakışmaları gibi temel geometrik işlemlerdir.',
  descriptionParagraphs: [
    'Hesaplamalı geometride en temel problemler, geometrik nesnelerin (nokta, çizgi, daire, dikdörtgen) uzayda birbirlerine göre durumlarının tespiti ve çizilmesidir.',
    'Bresenham Çizgi Çizme algoritması, sadece tam sayı aritmetiği (toplama, çıkarma, kaydırma) kullanarak ekran piksellerinde pürüzsüz çizgiler çizilmesini sağlayan son derece optimize edilmiş tarihi bir yöntemdir.',
    'Çizgi Kesişimi (Line Intersection) iki 2D doğru parçasının çakışıp çakışmadığını yönelim (orientation/cross product) testleriyle deterministik olarak hesaplar. Dikdörtgen Kesişimi (Rectangle Intersection) eksene hizalı (AABB) kutuların çakışmalarını aralık kontrolleriyle bulurken, Çember Kesişimi (Circle Intersection) merkezler arası Öklid mesafesini yarıçaplar toplamıyla kıyaslar.'
  ],
  sourceNotes: [
    'Sedgewick: Bresenham\'s algorithm avoids expensive floating-point operations using incremental error terms.',
    'Sedgewick: Intersection of line segments is calculated using cross-product direction tests.'
  ],
  steps: [
    'Bresenham için: Başlangıç ve bitiş koordinatları arası farkı (dx, dy) bul. Karar parametresini (P) hesapla.',
    'Her x adımında, karar parametresine göre y\'yi 1 artır veya sabit tut. Karar parametresini güncelle ve pikseli boya.',
    'Çizgi kesişimi için: Noktaların yönelimlerini (ccw/counter-clockwise testi) çıkar. İki çizginin birbirini karşılıklı kesip kesmediğini ccw çarpımlarıyla kontrol et.',
    'Dikdörtgen kesişimi için: x_overlap ve y_overlap koşullarını kontrol et.'
  ],
  pseudocode: `BRESENHAM-LINE(x0, y0, x1, y1)
  dx <- x1 - x0
  dy <- y1 - y0
  y <- y0
  P <- 2 * dy - dx
  for x <- x0 to x1
    PLOT(x, y)
    if P < 0
      P <- P + 2 * dy
    else
      y <- y + 1
      P <- P + 2 * dy - 2 * dx`,
  codeExamples: {
    typescript: `// CCW (Counter-Clockwise) yönelim testi
function ccw(p1: [number, number], p2: [number, number], p3: [number, number]): number {
  const val = (p2[1] - p1[1]) * (p3[0] - p2[0]) - (p2[0] - p1[0]) * (p3[1] - p2[1]);
  if (val === 0) return 0; // Collinear (doğrusal)
  return val > 0 ? 1 : -1; // 1: Saat yönü, -1: Saat yönü tersi
}

// İki kenarın kesişip kesişmediğini denetler
function doIntersect(
  a1: [number, number], a2: [number, number],
  b1: [number, number], b2: [number, number]
): boolean {
  const o1 = ccw(a1, a2, b1);
  const o2 = ccw(a1, a2, b2);
  const o3 = ccw(b1, b2, a1);
  const o4 = ccw(b1, b2, a2);

  // Genel kesişim koşulu
  if (o1 !== o2 && o3 !== o4) return true;
  return false;
}`,
    python: `def ccw(p1, p2, p3):
    val = (p2[1] - p1[1]) * (p3[0] - p2[0]) - (p2[0] - p1[0]) * (p3[1] - p2[1])
    if val == 0: return 0
    return 1 if val > 0 else -1

def do_intersect(a1, a2, b1, b2):
    o1 = ccw(a1, a2, b1)
    o2 = ccw(a1, a2, b2)
    o3 = ccw(b1, b2, a1)
    o4 = ccw(b1, b2, a2)
    return (o1 != o2) and (o3 != o4)`
  },
  demo: {
    kind: 'geometric-primitives',
    title: 'Geometrik Primitifler Demo',
    description: 'Modu ve parametreleri girin. Modlar: BRESENHAM (x1,y1,x2,y2), LINE_INT (x1,y1,x2,y2; x3,y3,x4,y4), RECT_INT (x1,y1,w1,h1; x2,y2,w2,h2). Örnek: BRESENHAM; 0,0,8,4',
    placeholder: 'BRESENHAM; 0,0,8,4'
  },
  timeComplexity: {
    best: 'O(1) kesişim testleri için',
    average: 'O(dx) çizgi çizme için',
    worst: 'O(dx)'
  },
  spaceComplexity: 'O(1) ek bellek',
  analysisTitle: 'Tam Sayı Aritmetiğinin Gücü',
  analysisPoints: [
    'BRESENHAM algoritması, float bölme işlemleri içermediği için düşük seviyeli donanımlarda bile çizgileri mikro saniyeler mertebesinde çizebilir.',
    'Çizgi kesişiminde CCW testi, bölme veya trigonometrik fonksiyon kullanmadan sadece basit çarpma ve çıkarma ile çalışarak yuvarlama hatalarından (floating point precision error) kaçınır.',
    'Eksene hizalı dikdörtgenlerin (AABB) kesişim testi, 2D oyun motorlarında collision detection için en çok kullanılan birinci aşama filtresidir.'
  ],
  advantages: [
    'Çok düşük bellek ve işlemci gücü gerektirir.',
    'Kararlı yönelim testleri hassas geometrik hataları önler.'
  ],
  disadvantages: [
    'Döndürülmüş (OBB) dikdörtgenler veya genel çokgenler için basit AABB testleri yetersiz kalır.'
  ],
  relatedAlgorithms: []
};

export const containmentQueryContent: RemainingAlgorithmContent = {
  title: 'Sorgu ve Kapsama Testleri (Query & Containment Tests)',
  category: 'Hesaplamalı Geometri',
  categoryHref: '/algorithms/computational-geometry',
  family: 'Geometry / Query',
  difficulty: 'Orta',
  sources: ['Sedgewick', 'NIST'],
  summary: 'Bir noktanın eksene hizalı bir dikdörtgen veya herhangi bir genel çokgen içinde olup olmadığını test eden sorgulardır.',
  descriptionParagraphs: [
    'Kapsama testleri, coğrafi bilgi sistemlerinde (örn: bir konumun il sınırları içinde mi olduğu) ve bilgisayar grafiklerinde (seçim araçları) sıkça kullanılır.',
    'Point-in-Rectangle testi, noktanın (x, y) koordinatlarının dikdörtgen sınırları (xmin, ymin, xmax, ymax) arasında olup olmadığını basit kıyaslamalarla kontrol eder.',
    'Point-in-Polygon testi ise Ray Casting (Işınsal Arama) algoritması ile çözümlenir. Noktadan sağa doğru yatay sonsuz bir ışın gönderilir. Bu ışının çokgenin kenarlarını kaç kez kestiği sayılır. Eğer kesim sayısı tek sayı ise nokta çokgenin içindedir, çift sayı ise nokta dışındadır.'
  ],
  sourceNotes: [
    'Sedgewick: Ray casting algorithm is robust for convex and concave polygons alike.',
    'NIST: Point in polygon requires O(V) time for a polygon of V vertices.'
  ],
  steps: [
    'Dikdörtgen sorgusu için: x >= xmin ve x <= xmax ve y >= ymin ve y <= ymax koşulunu sorgula.',
    'Çokgen sorgusu (Ray Casting) için: Işın kesişim sayısını 0 yap.',
    'Çokgenin her (u, v) kenarı için: Noktanın y koordinatının kenar uçlarının y değerleri arasında olup olmadığını kontrol et.',
    'Eğer öyleyse, yatay ışın ile kenarın kesiştiği x koordinatını hesapla. Noktanın sağındaysa kesim sayısını 1 artır.',
    'Kesim sayısı tek ise nokta çokgenin içindedir.'
  ],
  pseudocode: `POINT-IN-POLYGON(P, Polygon)
  crossings <- 0
  n <- length(Polygon)
  for i <- 0 to n - 1
    u <- Polygon[i]
    v <- Polygon[(i + 1) mod n]
    if (u.y > P.y) != (v.y > P.y)
      x_intersect <- u.x + (P.y - u.y) * (v.x - u.x) / (v.y - u.y)
      if P.x < x_intersect
        crossings <- crossings + 1
  return (crossings mod 2 = 1)`,
  codeExamples: {
    typescript: `function isPointInPolygon(
  p: [number, number],
  polygon: [number, number][]
): boolean {
  let inside = false;
  const n = polygon.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];

    const intersect = ((yi > p[1]) !== (yj > p[1]))
      && (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}`,
    python: `def is_point_in_polygon(p, polygon):
    inside = False
    n = len(polygon)
    j = n - 1
    for i in range(n):
        xi, yi = polygon[i]
        xj, yj = polygon[j]
        intersect = ((yi > p[1]) != (yj > p[1])) and \
                    (p[0] < (xj - xi) * (p[1] - yi) / (yj - yi) + xi)
        if intersect:
            inside = not inside
        j = i
    return inside`
  },
  demo: {
    kind: 'containment-query',
    title: 'Kapsama (Point-in-Polygon) Testi Demo',
    description: 'Modu, noktayı ve sınırları girin. Modlar: RECT (px,py; xmin,ymin,xmax,ymax), POLY (px,py; x1,y1; x2,y2; ...). Örnek: POLY; 2,2; 0,0; 5,0; 5,5; 0,5',
    placeholder: 'POLY; 2,2; 0,0; 5,0; 5,5; 0,5'
  },
  timeComplexity: {
    best: 'O(1) dikdörtgen testi için',
    average: 'O(V) çokgen testi için (V: köşe sayısı)',
    worst: 'O(V)'
  },
  spaceComplexity: 'O(1) ek bellek',
  analysisTitle: 'Kenar Durumları ve Güvenilirlik',
  analysisPoints: [
    'Işının tam olarak çokgenin bir köşesinden veya yatay kenarından geçtiği sınır durumlar (edge cases), yanlış kesim sayımına yol açabileceğinden formüldeki strictly inequality (<, >) koşullarıyla elenir.',
    'Winding Number algoritması, çokgen etrafındaki dönüş yönünü ve toplam açıyı hesaplayarak kendi kendini kesen karmaşık çokgenlerde daha doğru sonuçlar üretebilir.',
    'Çok sayıda nokta sorgulanacaksa, her seferinde kenarları taramak yerine çokgen R-Tree veya Quadtree ile indekslenmelidir.'
  ],
  advantages: [
    'Ray casting, hem konveks (dış bükey) hem de konkav (iç bükey) çokgenlerde hatasız çalışır.',
    'Hesaplama mantığı son derece sadedir.'
  ],
  disadvantages: [
    'Binlerce köşeye sahip büyük harita çokgenlerinde her nokta için O(V) kontrolü yavaş kalır.'
  ],
  relatedAlgorithms: []
};

export const convexHullPathContent: RemainingAlgorithmContent = {
  title: 'Yol ve Dış Bükey Gövde (Path & Convex Hull)',
  category: 'Hesaplamalı Geometri',
  categoryHref: '/algorithms/computational-geometry',
  family: 'Geometry / Convex Hull',
  difficulty: 'Zor',
  sources: ['Sedgewick', 'Preparata & Shamos'],
  summary: 'Verilen bir 2D nokta kümesini tamamen içine alan en küçük dış bükey çokgeni (Convex Hull) bulan Graham Scan ve Jarvis March (Gift Wrapping) algoritmalarıdır.',
  descriptionParagraphs: [
    'Dış Bükey Gövde (Convex Hull) problemi, 2D düzlemdeki bir grup çivinin etrafına geçirilen gergin bir paket lastiğinin oluşturduğu şekli bulma problemi olarak tasvir edilir.',
    'Jarvis March (Package Wrapping), en soldaki noktadan başlayıp her adımda mevcut noktaya göre saat yönünün tersindeki en dıştaki (en geniş ccw açılı) noktayı seçerek bir nevi "paketi sarar". Süreç, başlangıç noktasına dönüldüğünde biter.',
    'Graham Scan ise en alt noktayı pivot seçerek diğer noktaları polar açılarına göre sıralar. Ardından noktaları sırayla ziyaret ederken sol-dönüş (left-turn/ccw) kuralını korur. Eğer sağa dönüş yapılırsa, dış bükeyliği bozan içteki noktalar yığından atılır (backtrack).'
  ],
  sourceNotes: [
    'Sedgewick: Graham scan runs in O(N log N) due to polar angle sorting.',
    'Preparata: Jarvis march runs in O(N * H) where H is the number of hull points.'
  ],
  steps: [
    'Graham Scan için: Y koordinatı en küçük olan noktayı (P0) pivot seç.',
    'Diğer noktaları P0\'a göre yaptıkları polar açılara göre sırala.',
    'Yığına ilk üç noktayı ekle.',
    'Kalan noktalar için: Yığının üstündeki iki nokta ve yeni nokta sağa dönüş (non-left turn) oluşturduğu sürece yığının en üstündeki noktayı çıkar (pop). Yeni noktayı ekle.'
  ],
  pseudocode: `GRAHAM-SCAN(Points)
  P0 <- point in Points with minimum y-coordinate
  Sort Points by polar angle with P0
  Stack <- EmptyStack
  Stack.push(Points[0])
  Stack.push(Points[1])
  Stack.push(Points[2])
  for i <- 3 to length(Points) - 1
    while CCW(Stack.second, Stack.top, Points[i]) <= 0
      Stack.pop()
    Stack.push(Points[i])
  return Stack`,
  codeExamples: {
    typescript: `function convexHullGraham(points: [number, number][]): [number, number][] {
  if (points.length < 3) return [...points];
  
  // 1. Pivot bul (y en küçük, eşitse x en küçük)
  let pivot = points[0];
  let pivotIdx = 0;
  for (let i = 1; i < points.length; i++) {
    if (points[i][1] < pivot[1] || (points[i][1] === pivot[1] && points[i][0] < pivot[0])) {
      pivot = points[i];
      pivotIdx = i;
    }
  }

  // 2. Polar açıya göre sırala
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

  // 3. Graham Scan yığın adımları
  const stack: [number, number][] = [pivot, copy[0], copy[1]];
  for (let i = 2; i < copy.length; i++) {
    while (stack.length >= 2) {
      const top = stack[stack.length - 1];
      const nextToTop = stack[stack.length - 2];
      if (ccw(nextToTop, top, copy[i]) > 0) {
        break; // Sol dönüş bulduk
      }
      stack.pop(); // Sağ dönüş veya doğrusal ise at
    }
    stack.push(copy[i]);
  }
  return stack;
}`,
    python: `def convex_hull_graham(points):
    n = len(points)
    if n < 3: return points
    # Find pivot
    pivot = min(points, key=lambda p: (p[1], p[0]))
    
    def ccw_val(p1, p2, p3):
        return (p2[1]-p1[1])*(p3[0]-p2[0]) - (p2[0]-p1[0])*(p3[1]-p2[1])

    # Polar sort
    from functools import cmp_to_key
    def compare(a, b):
        val = ccw_val(pivot, a, b)
        if val == 0:
            dist_a = (a[0]-pivot[0])**2 + (a[1]-pivot[1])**2
            dist_b = (b[0]-pivot[0])**2 + (b[1]-pivot[1])**2
            return -1 if dist_a < dist_b else 1
        return -1 if val > 0 else 1

    sorted_pts = sorted([p for p in points if p != pivot], key=cmp_to_key(compare))
    
    stack = [pivot, sorted_pts[0], sorted_pts[1]]
    for i in range(2, len(sorted_pts)):
        while len(stack) >= 2 and ccw_val(stack[-2], stack[-1], sorted_pts[i]) <= 0:
            stack.pop()
        stack.append(sorted_pts[i])
    return stack`
  },
  demo: {
    kind: 'convex-hull-path',
    title: 'Dış Bükey Gövde (Convex Hull) Demo',
    description: 'Modu ve noktaları x,y çiftleri halinde girin. Modlar: GRAHAM, JARVIS. Örnek: GRAHAM; 0,3; 1,1; 2,2; 4,4; 0,0; 1,2; 3,1; 3,3',
    placeholder: 'GRAHAM; 0,3; 1,1; 2,2; 4,4; 0,0; 1,2; 3,1; 3,3'
  },
  timeComplexity: {
    best: 'O(N log N) Graham Scan ile',
    average: 'O(N log N)',
    worst: 'O(N^2) Jarvis March ile köşe sayısı H ≈ N olduğunda'
  },
  spaceComplexity: 'O(N) sıralanmış noktalar ve yığın için',
  analysisTitle: 'Paket Sarma vs Graham Scan',
  analysisPoints: [
    'Graham Scan polar sıralama içerdiği için O(N log N) zamanında tamamlanır ve nokta dağılımından bağımsız kararlıdır.',
    'Jarvis March (Gift Wrapping) karmaşıklığı O(N * H) olup, dış köşe sayısı H küçük olduğunda (örn: H=3 veya H=4) O(N) gibi çalışarak çok hızlı sonlanır.',
    'Floyd-Eddy veya QuickHull yöntemleri, veri kümesindeki aşırı uç noktaları bularak içte kalan noktaların büyük kısmını baştan eler (pruning).'
  ],
  advantages: [
    'Nokta kümesini saran sınır örüntüyü hatasız oluşturur.',
    'Collision boundary (çarpışma sınırları) çıkarmada temel yöntemdir.'
  ],
  disadvantages: [
    'Doğrusal (collinear) noktaların çok fazla olduğu durumlarda sıralama algoritmalarında stabilite sorunları yaşanabilir.'
  ],
  relatedAlgorithms: []
};

export const proximityProblemsContent: RemainingAlgorithmContent = {
  title: 'Yakınlık Problemleri (Proximity Problems)',
  category: 'Hesaplamalı Geometri',
  categoryHref: '/algorithms/computational-geometry',
  family: 'Geometry / Proximity',
  difficulty: 'Zor',
  sources: ['Sedgewick', 'Shamos & Hoey 1975'],
  summary: 'Düzlemde verilen bir nokta kümesindeki birbirine en yakın iki noktayı (Closest Pair) bulmak için kullanılan Böl-ve-Fethet algoritmasıdır.',
  descriptionParagraphs: [
    'Yakınlık problemleri, veri madenciliği, fizik simülasyonları ve rota optimizasyonlarında sıklıkla karşımıza çıkar. Naif bir ikili kıyaslama (pairwise check) O(N^2) adım gerektirir.',
    'En Yakın Çift (Closest Pair) Böl-ve-Fethet (Divide and Conquer) algoritması, noktaları x koordinatına göre ortadan ikiye bölerek problemi iki alt bölgeye indirger. Alt bölgelerdeki en küçük mesafeyi (d) bulduktan sonra, sınır şeridindeki (strip) noktaları y koordinatına göre sıralı şekilde tarar.',
    'Sınır şeridindeki her noktanın d mesafesinde en fazla sabit sayıda (geometrik olarak en fazla 7-8) komşusu olabileceği için, şerit içi tarama doğrusal zamanda tamamlanır. Bu sayede genel çözüm O(N log N) süresine çekilir.'
  ],
  sourceNotes: [
    'Sedgewick: Closest pair division runs in O(N log N) using divide-and-conquer.',
    'Shamos: Proximity properties can also be resolved using Voronoi diagrams.'
  ],
  steps: [
    'Noktaları x koordinatına göre sırala.',
    'Nokta kümesini ortadan bölüp, sol ve sağ yarıdaki en yakın mesafeleri (d_sol, d_sag) rekürsif olarak bul.',
    'İkisinin minimumunu d = min(d_sol, d_sag) olarak al.',
    'Orta çizgiye d mesafesinden daha yakın olan noktaları içeren bir şerit (strip) oluştur.',
    'Şeritteki noktaları y koordinatına göre sırala. Her nokta için, kendisinden sonraki noktaları aralarındaki y mesafesi d\'den küçük olduğu sürece kontrol et. d\'yi küçültebiliyorsan güncelle.'
  ],
  pseudocode: `CLOSEST-PAIR(Points)
  Sort Points by x
  return CLOSEST-PAIR-REC(Points)

CLOSEST-PAIR-REC(P_x)
  if length(P_x) <= 3
    return brute-force-closest-pair(P_x)
  mid <- length(P_x) / 2
  d_left <- CLOSEST-PAIR-REC(P_x[0..mid])
  d_right <- CLOSEST-PAIR-REC(P_x[mid+1..end])
  d <- min(d_left, d_right)
  
  strip <- Points in P_x with |x - P_x[mid].x| < d
  Sort strip by y
  for i <- 0 to length(strip) - 1
    for j <- i + 1 to length(strip) - 1 while strip[j].y - strip[i].y < d
      d <- min(d, distance(strip[i], strip[j]))
  return d`,
  codeExamples: {
    typescript: `function distance(p1: [number, number], p2: [number, number]): number {
  return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
}

function closestPairRecursive(ptsX: [number, number][], ptsY: [number, number][]): number {
  const n = ptsX.length;
  if (n <= 3) {
    let minD = Infinity;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        minD = Math.min(minD, distance(ptsX[i], ptsX[j]));
      }
    }
    return minD;
  }

  const mid = Math.floor(n / 2);
  const midPoint = ptsX[mid];

  // Noktaları sol ve sağ olarak ayır
  const leftX = ptsX.slice(0, mid);
  const rightX = ptsX.slice(mid);

  const leftY = ptsY.filter((p) => p[0] <= midPoint[0]);
  const rightY = ptsY.filter((p) => p[0] > midPoint[0]);

  const dl = closestPairRecursive(leftX, leftY);
  const dr = closestPairRecursive(rightX, rightY);
  let d = Math.min(dl, dr);

  // Şerit tespiti
  const strip = ptsY.filter((p) => Math.abs(p[0] - midPoint[0]) < d);

  for (let i = 0; i < strip.length; i++) {
    for (let j = i + 1; j < strip.length && (strip[j][1] - strip[i][1]) < d; j++) {
      d = Math.min(d, distance(strip[i], strip[j]));
    }
  }

  return d;
}`,
    python: `import math

def dist(p1, p2):
    return math.sqrt((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)

def closest_pair_rec(pts_x, pts_y):
    n = len(pts_x)
    if n <= 3:
        min_d = float('inf')
        for i in range(n):
            for j in range(i+1, n):
                min_d = min(min_d, dist(pts_x[i], pts_x[j]))
        return min_d
        
    mid = n // 2
    mid_pt = pts_x[mid]
    
    dl = closest_pair_rec(pts_x[:mid], [p for p in pts_y if p[0] <= mid_pt[0]])
    dr = closest_pair_rec(pts_x[mid:], [p for p in pts_y if p[0] > mid_pt[0]])
    d = min(dl, dr)
    
    strip = [p for p in pts_y if abs(p[0] - mid_pt[0]) < d]
    for i in range(len(strip)):
        for j in range(i+1, len(strip)):
            if strip[j][1] - strip[i][1] >= d:
                break
            d = min(d, dist(strip[i], strip[j]))
    return d`
  },
  demo: {
    kind: 'proximity-problems',
    title: 'En Yakın Nokta Çifti (Closest Pair) Demo',
    description: 'Noktaları x,y çiftleri halinde girin. Böl ve Fethet ile en yakın çift bulunacaktır. Örnek: 2,3; 12,30; 40,50; 5,1; 12,10; 3,4',
    placeholder: '2,3; 12,30; 40,50; 5,1; 12,10; 3,4'
  },
  timeComplexity: {
    best: 'O(N log N) Böl-ve-Fethet ile',
    average: 'O(N log N)',
    worst: 'O(N log N)'
  },
  spaceComplexity: 'O(N) rekürsif bölmeler için y ve x koordinat dizileri',
  analysisTitle: 'Şerit (Strip) Optimizasyonu',
  analysisPoints: [
    'Naif yaklaşım N^2 mesafe hesabı gerektirirken, Divide & Conquer sadece orta şeritteki yakın noktaları kıyaslar.',
    'Orta çizgi etrafındaki şerit d genişliğindedir. Bir noktanın şeritte kendinden sonraki en fazla 7 komşuya bakmasının yeterli olacağı geometrik kafes (grid box) yerleşimiyle kanıtlanmıştır.',
    'Noktaları alt çağrılarda tekrar tekrar sıralamak yerine, en başta X ve Y eksenlerine göre sıralanmış kopyalarını tutarak O(N log N) karmaşıklığı garanti edilir.'
  ],
  advantages: [
    'Nokta sayısı milyonları bulduğunda bile çok kararlı çalışır.',
    'Bileşenler arası çarpışma veya en yakın veri eşleşmesini hızlıca hesaplar.'
  ],
  disadvantages: [
    'Boyut sayısı arttıkça (3D, 4D veya daha fazla), alt bölgelerin ve şerit geometrisinin yönetimi aşırı karmaşıklaşır (boyutun laneti - curse of dimensionality).'
  ],
  relatedAlgorithms: []
};

export const spatialSearchingContent: RemainingAlgorithmContent = {
  title: 'Uzamsal ve Aralık Araması (Spatial & Range Searching)',
  category: 'Hesaplamalı Geometri',
  categoryHref: '/algorithms/computational-geometry',
  family: 'Geometry / Spatial',
  difficulty: 'Zor',
  sources: ['Bentley 1975', 'Sedgewick'],
  summary: '2D düzlemde koordinatları verilen noktaları hiyerarşik olarak bölerek sorgulayan 2D-Ağaç (2D-Tree) veri yapısı ve dikdörtgensel aralık arama (Range Search) algoritmasıdır.',
  descriptionParagraphs: [
    'Uzamsal arama, uzaydaki çok sayıda noktanın belirli bir alan (range) içinde kalanlarını hızlıca süzmek için kullanılan hiyerarşik indeksleme yöntemidir.',
    '2D-Ağaç (2D-Tree), ikili arama ağacının iki boyuta genel sürümüdür. Ağacın kök düğümü x koordinatına göre düzlemi dikey olarak ikiye bölerken, çocukları y koordinatına göre yatay olarak böler. Bu bölme işlemi boyutlar arasında sırayla değişerek (X-Y-X-Y...) yaprak düğümlere kadar sürer.',
    'Aralık Araması (Range Search) sorgusu sırasında, arama kutusu ile bölünmüş düzlem bölgeleri karşılaştırılır. Bölge arama kutusuyla kesişmiyorsa o alt ağaç tamamen budanır (pruned). Böylece milyonlarca noktada arama logaritmik zamanda sonlanır.'
  ],
  sourceNotes: [
    'Bentley: k-d tree structures divide the space into alternating axes.',
    'Sedgewick: Range search queries in 2D trees run in O(log N + R) on average, where R is the number of reported points.'
  ],
  steps: [
    '2D-Tree Ekleme için: Kök düğümden başla (Derinlik d=0).',
    'Derinlik çift ise x koordinatını, tek ise y koordinatını karşılaştırarak sol veya sağ dala ilerle ve düğümü yerleştir.',
    'Aralık Araması için: Kökten başla.',
    'Mevcut düğümün bölme eksenindeki konumuna göre, arama kutusunun bölünmüş bölgelerle kesişimini kontrol et.',
    'Kutunun sol/alt tarafla kesişimi varsa sol alt ağacı rekürsif olarak ara. Sağ/üst tarafla kesişimi varsa sağ alt ağacı ara.'
  ],
  pseudocode: `2DTREE-RANGE-SEARCH(node, queryBox, depth, results)
  if node is NIL
    return
  if queryBox.contains(node.point)
    results.add(node.point)
  
  axis <- depth mod 2
  if axis = 0 // X-split (vertical line)
    if queryBox.xmin <= node.point.x
      2DTREE-RANGE-SEARCH(node.left, queryBox, depth + 1, results)
    if queryBox.xmax >= node.point.x
      2DTREE-RANGE-SEARCH(node.right, queryBox, depth + 1, results)
  else // Y-split (horizontal line)
    if queryBox.ymin <= node.point.y
      2DTREE-RANGE-SEARCH(node.left, queryBox, depth + 1, results)
    if queryBox.ymax >= node.point.y
      2DTREE-RANGE-SEARCH(node.right, queryBox, depth + 1, results)`,
  codeExamples: {
    typescript: `class KDNode {
  point: [number, number];
  left: KDNode | null = null;
  right: KDNode | null = null;
  constructor(pt: [number, number]) { this.point = pt; }
}

function insertKD(node: KDNode | null, pt: [number, number], depth: number): KDNode {
  if (node === null) return new KDNode(pt);
  const cd = depth % 2; // Coordinate dimension (0 for X, 1 for Y)
  if (pt[cd] < node.point[cd]) {
    node.left = insertKD(node.left, pt, depth + 1);
  } else {
    node.right = insertKD(node.right, pt, depth + 1);
  }
  return node;
}

function searchRangeKD(
  node: KDNode | null,
  xmin: number, ymin: number, xmax: number, ymax: number,
  depth: number,
  results: [number, number][]
) {
  if (node === null) return;

  const [x, y] = node.point;
  if (x >= xmin && x <= xmax && y >= ymin && y <= ymax) {
    results.push(node.point);
  }

  const cd = depth % 2;
  const val = cd === 0 ? x : y;
  const minVal = cd === 0 ? xmin : ymin;
  const maxVal = cd === 0 ? xmax : ymax;

  if (minVal <= val) {
    searchRangeKD(node.left, xmin, ymin, xmax, ymax, depth + 1, results);
  }
  if (maxVal >= val) {
    searchRangeKD(node.right, xmin, ymin, xmax, ymax, depth + 1, results);
  }
}`,
    python: `class KDNode:
    def __init__(self, pt):
        self.point = pt
        self.left = None
        self.right = None

def insert_kd(node, pt, depth=0):
    if node is None:
        return KDNode(pt)
    cd = depth % 2
    if pt[cd] < node.point[cd]:
        node.left = insert_kd(node.left, pt, depth + 1)
    else:
        node.right = insert_kd(node.right, pt, depth + 1)
    return node`
  },
  demo: {
    kind: 'spatial-searching',
    title: '2D-Ağaç (2D-Tree) Aralık Araması Demo',
    description: 'Aralık kutusunu ve noktaları girin. Kutudan büyük/küçük arama kontrol edilir. Format: xmin,ymin,xmax,ymax ; x1,y1; x2,y2; ... Örnek: 0,0,10,10 ; 2,3; 5,4; 9,6; 4,7; 8,1; 7,2; 12,11',
    placeholder: '0,0,10,10 ; 2,3; 5,4; 9,6; 4,7; 8,1; 7,2; 12,11'
  },
  timeComplexity: {
    best: 'O(log N + R) R: dönen nokta sayısı',
    average: 'O(log N + R)',
    worst: 'O(N) aşırı dengesiz ağaçlarda'
  },
  spaceComplexity: 'O(N) ağaç düğümleri için',
  analysisTitle: 'Bölge Budama Etkisi',
  analysisPoints: [
    '2D-Tree, her eksende veri kümesini median ile bölerek kurulursa dengeli olur ve O(log N) arama zamanını garanti eder.',
    'Range Query yaparken, sorgu kutusunun tamamen dışındaki alt ağaç bölgeleri anında kesilir (pruning). Bu sayede veri kümesinin %90\'ı taranmadan elenir.',
    'Alternatif uzamsal indeksler olarak Quadtree (düzlemi 4 eşit parçaya bölme) ve R-Tree (nesneleri saran sınırlayıcı kutular - bounding box) gösterilebilir.'
  ],
  advantages: [
    'Coğrafi harita servislerinde ve K-En Yakın Komşu (K-NN) aramalarında son derece hızlıdır.',
    'Çoklu boyutlara (k-d tree) kolayca genişletilebilir.'
  ],
  disadvantages: [
    'Ağaç yapısı statik kurulduktan sonra çok fazla ekleme/çıkarma yapılırsa dengesi bozularak arama performansı düşebilir.'
  ],
  relatedAlgorithms: []
};
