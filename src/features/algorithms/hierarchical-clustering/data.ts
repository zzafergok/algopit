export const implementations = {
  typescript: `// Hiyerarşik kümeleme algoritması (Aglomeratif - AGNES)
function hierarchicalClustering(
  points: Point[],
  cutoffDistance: number = Infinity
): { 
  dendrogram: ClusterNode, 
  clusterAssignments: number[]
} {
  // Her nokta için başlangıçta ayrı küme oluştur
  let clusters: ClusterNode[] = points.map((point, index) => ({
    id: index,
    points: [{ ...point, cluster: index }],
  }));
  
  // Uzaklık eşiği altında en az 2 küme kalana kadar kümeleri birleştir
  let nextId = points.length;
  while (clusters.length > 1) {
    // En yakın iki kümeyi bul
    let minDistance = Infinity;
    let closestPair: [number, number] = [-1, -1];
    
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        // İki küme arasındaki mesafeyi hesapla
        const distance = calculateClusterDistance(clusters[i], clusters[j]);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestPair = [i, j];
        }
      }
    }
    
    // Mesafe eşik değerini aştıysa, birleştirmeyi durdur
    if (minDistance > cutoffDistance) {
      break;
    }
    
    // En yakın kümeleri birleştir
    const [i, j] = closestPair;
    const mergedCluster: ClusterNode = {
      id: nextId++,
      points: [...clusters[i].points, ...clusters[j].points],
      children: [clusters[i], clusters[j]],
      distance: minDistance
    };
    
    // Birleştirilen kümeleri güncelle
    mergedCluster.points.forEach(p => p.cluster = mergedCluster.id);
    
    // Yeni kümeyi ekle, eski kümeleri çıkar
    const newClusters = clusters.filter((_, index) => index !== i && index !== j);
    newClusters.push(mergedCluster);
    clusters = newClusters;
  }
  
  // Son kümeleme durumuna göre nokta atamalarını yap
  const clusterAssignments = new Array(points.length).fill(-1);
  
  for (const cluster of clusters) {
    for (const point of cluster.points) {
      // Orijinal nokta dizisindeki indeksi bulmalıyız
      const originalIndex = points.findIndex(p => p.x === point.x && p.y === point.y);
      if (originalIndex !== -1) {
        clusterAssignments[originalIndex] = cluster.id;
      }
    }
  }
  
  // Dendrogram kökünü bul (tek kök yoksa yapay bir kök oluştur)
  let dendrogram: ClusterNode;
  if (clusters.length === 1) {
    dendrogram = clusters[0];
  } else {
    // Birden fazla kök varsa, yapay bir kök oluştur
    dendrogram = {
      id: nextId,
      points: clusters.flatMap(c => c.points),
      children: clusters.length >= 2 ? [clusters[0], clusters[1]] : undefined
    };
  }
  
  return { dendrogram, clusterAssignments };
}

// İki küme arasındaki mesafeyi hesapla (en yakın komşu/tek bağlantı yöntemi)
function calculateClusterDistance(clusterA: ClusterNode, clusterB: ClusterNode): number {
  let minDistance = Infinity;
  
  // Her iki kümedeki her nokta çifti için mesafeyi hesapla
  for (const pointA of clusterA.points) {
    for (const pointB of clusterB.points) {
      const distance = euclideanDistance(pointA, pointB);
      minDistance = Math.min(minDistance, distance);
    }
  }
  
  return minDistance;
}

// İki nokta arasındaki Öklid mesafesi
function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}`,
  python: `import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage
from typing import List, Dict, Tuple, Optional, Union, Any

class Point:
    def __init__(self, x: float, y: float, cluster: int = -1):
        self.x = x
        self.y = y
        self.cluster = cluster

class ClusterNode:
    def __init__(self, id: int, points: List[Point], 
                 children: Optional[List['ClusterNode']] = None,
                 distance: Optional[float] = None):
        self.id = id
        self.points = points
        self.children = children
        self.distance = distance

def euclidean_distance(p1: Point, p2: Point) -> float:
    """İki nokta arasındaki Öklid mesafesini hesaplar"""
    return np.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

def calculate_cluster_distance(cluster_a: ClusterNode, 
                               cluster_b: ClusterNode, 
                               linkage_type: str = 'single') -> float:
    """İki küme arasındaki mesafeyi hesaplar"""
    distances = []
    
    # Her iki kümedeki her nokta çifti için mesafeleri hesapla
    for point_a in cluster_a.points:
        for point_b in cluster_b.points:
            distances.append(euclidean_distance(point_a, point_b))
    
    # Bağlantı türüne göre mesafeyi belirle
    if linkage_type == 'single':  # En yakın komşu
        return min(distances)
    elif linkage_type == 'complete':  # En uzak komşu
        return max(distances)
    elif linkage_type == 'average':  # Ortalama bağlantı
        return sum(distances) / len(distances)
    else:
        raise ValueError(f"Bilinmeyen bağlantı türü: {linkage_type}")

def hierarchical_clustering(points: List[Point], 
                            cutoff_distance: float = float('inf'),
                            linkage_type: str = 'single') -> Dict[str, Any]:
    """Hiyerarşik kümeleme algoritması (Aglomeratif)"""
    # Her nokta için başlangıçta ayrı küme oluştur
    clusters = [ClusterNode(i, [point]) for i, point in enumerate(points)]
    
    # Adımları kaydetmek için liste
    steps = []
    steps.append({
        'clusters': clusters.copy(),
        'step': 'initialization',
        'description': 'Her nokta kendi kümesini oluşturur'
    })
    
    # Uzaklık eşiği altında en az 2 küme kalana kadar kümeleri birleştir
    next_id = len(points)
    while len(clusters) > 1:
        # En yakın iki kümeyi bul
        min_distance = float('inf')
        closest_pair = (-1, -1)
        
        for i in range(len(clusters)):
            for j in range(i + 1, len(clusters)):
                distance = calculate_cluster_distance(
                    clusters[i], clusters[j], linkage_type)
                
                if distance < min_distance:
                    min_distance = distance
                    closest_pair = (i, j)
        
        # Mesafe eşik değerini aştıysa, birleştirmeyi durdur
        if min_distance > cutoff_distance:
            break
        
        # En yakın kümeleri birleştir
        i, j = closest_pair
        merged_points = clusters[i].points + clusters[j].points
        for point in merged_points:
            point.cluster = next_id
            
        merged_cluster = ClusterNode(
            id=next_id,
            points=merged_points,
            children=[clusters[i], clusters[j]],
            distance=min_distance
        )
        next_id += 1
        
        # Yeni kümeyi ekle, eski kümeleri çıkar
        new_clusters = [cluster for k, cluster in enumerate(clusters) 
                         if k != i and k != j]
        new_clusters.append(merged_cluster)
        clusters = new_clusters
        
        # Adımı kaydet
        steps.append({
            'clusters': clusters.copy(),
            'merged_indices': closest_pair,
            'distance': min_distance,
            'step': 'merge',
            'description': f'Kümeler birleştirildi (Mesafe: {min_distance:.2f})'
        })
    
    # Son kümeleme durumuna göre nokta atamalarını yap
    cluster_assignments = [-1] * len(points)
    for cluster in clusters:
        for point in cluster.points:
            # Orijinal nokta dizisindeki indeksi bul
            for i, original_point in enumerate(points):
                if original_point.x == point.x and original_point.y == point.y:
                    cluster_assignments[i] = cluster.id
    
    # Dendrogram kökünü bul (tek kök yoksa yapay bir kök oluştur)
    if len(clusters) == 1:
        dendrogram = clusters[0]
    else:
        # Birden fazla kök varsa, yapay bir kök oluştur
        dendrogram = ClusterNode(
            id=next_id,
            points=[p for c in clusters for p in c.points],
            children=clusters[:2] if len(clusters) >= 2 else None
        )
    
    return {
        'dendrogram': dendrogram,
        'cluster_assignments': cluster_assignments,
        'steps': steps
    }

# Görselleştirme fonksiyonu
def visualize_hierarchical_clustering(points, cluster_assignments):
    """Kümeleme sonuçlarını görselleştirir"""
    plt.figure(figsize=(10, 6))
    
    # Farklı kümeler için farklı renkler
    colors = plt.cm.rainbow(np.linspace(0, 1, max(cluster_assignments) + 1))
    
    # Noktaları çiz
    for i, point in enumerate(points):
        cluster_id = cluster_assignments[i]
        color = colors[cluster_id] if cluster_id >= 0 else 'gray'
        plt.scatter(point.x, point.y, color=color)
    
    plt.title('Hierarchical Clustering Results')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.show()

# Dendrogram görselleştirme
def plot_dendrogram(model, **kwargs):
    """SciPy hierarchical clustering modelini kullanarak dendrogram çizer"""
    plt.figure(figsize=(12, 8))
    
    # Dendrogram çiz
    dendrogram(model, **kwargs)
    
    plt.title('Hierarchical Clustering Dendrogram')
    plt.xlabel('Sample index')
    plt.ylabel('Distance')
    plt.show()`,
};

export const pseudocode = `function hierarchicalClustering(points, cutoffDistance):
    // 1. Her noktayı kendi başına bir küme olarak başlat
    clusters = []
    for each point in points:
        clusters.add(new Cluster(point))
    
    // 2. Mesafe eşiği altında en az 2 küme kalana kadar birleştir
    while clusters.length > 1:
        // En yakın iki kümeyi bul
        minDistance = Infinity
        closestPair = [-1, -1]
        
        for i from 0 to clusters.length - 1:
            for j from i + 1 to clusters.length - 1:
                distance = calculateDistance(clusters[i], clusters[j])
                
                if distance < minDistance:
                    minDistance = distance
                    closestPair = [i, j]
        
        // Mesafe eşik değerini aştıysa, birleştirmeyi durdur
        if minDistance > cutoffDistance:
            break
        
        // En yakın kümeleri birleştir
        [i, j] = closestPair
        mergedCluster = mergeClusters(clusters[i], clusters[j])
        
        // Eski kümeleri çıkar, yeni kümeyi ekle
        clusters.remove(clusters[i])
        clusters.remove(clusters[j])
        clusters.add(mergedCluster)
    
    // 3. Dendrogram oluştur ve sonuç kümelerini döndür
    return {
        dendrogram: buildDendrogram(clusters),
        clusterAssignments: assignPointsToClusters(points, clusters)
    }`;

export const explanationData = {
  title: 'Hiyerarşik Kümeleme (Hierarchical Clustering) Algoritması',
  description:
    'Hiyerarşik kümeleme, benzer özelliklere sahip verileri gruplandırmak için kullanılan bir kümeleme algoritmasıdır. Aglomeratif (birleştirici) yaklaşımda, her nokta başlangıçta kendi kümesini oluşturur ve en yakın kümeler hiyerarşik olarak birleştirilir.',
  timeComplexity: {
    best: 'O(n²)',
    average: 'O(n² log n)',
    worst: 'O(n³)',
  },
  spaceComplexity: 'O(n²)',
  advantages: [
    'Küme sayısını önceden bilmeye gerek yoktur',
    'Hiyerarşik yapı (dendrogram) sayesinde tüm kümeleme seviyelerini görmek mümkündür',
    'Çeşitli mesafe ölçümlerine ve bağlantı yöntemlerine uyarlanabilir',
    'Keyfi şekilli kümeleri tespit edebilir',
  ],
  disadvantages: [
    'Büyük veri setleri için yüksek hesaplama karmaşıklığı',
    'Gürültülü verilere karşı hassasiyet',
    'Birleştirme işlemi geri alınamaz, bu da hatalı birleştirmeleri düzeltmeyi zorlaştırır',
    'Yüksek bellek gereksinimi',
  ],
  applications: [
    'Müşteri segmentasyonu',
    'Biyolojik taksonomik sınıflandırma',
    'Belge ve metin kategorizasyonu',
    'Gen ekspresyon analizi',
    'Sosyal ağ analizi',
    'Anomali tespiti',
  ],
};
