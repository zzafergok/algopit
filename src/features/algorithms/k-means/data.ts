export const pseudocode = `function kMeans(points, k, maxIterations):
    // 1. Rastgele k adet merkez noktası seç
    centroids = randomly select k points from points
    
    // 2. Yakınsama sağlanana veya maksimum iterasyon sayısına ulaşana kadar döngü
    iterations = 0
    isConverged = false
    
    while not isConverged and iterations < maxIterations:
        // 3. Her noktayı en yakın merkeze ata
        for each point in points:
            minDistance = Infinity
            closestCluster = 0
            
            for i from 0 to k-1:
                distance = euclideanDistance(point, centroids[i])
                if distance < minDistance:
                    minDistance = distance
                    closestCluster = i
            
            point.cluster = closestCluster
        
        // 4. Merkez noktaları güncelle
        hasUpdated = false
        
        for i from 0 to k-1:
            clusterPoints = all points where point.cluster = i
            if clusterPoints is empty:
                continue
            
            newX = average x-coordinate of clusterPoints
            newY = average y-coordinate of clusterPoints
            
            if centroids[i].x != newX or centroids[i].y != newY:
                centroids[i].x = newX
                centroids[i].y = newY
                hasUpdated = true
        
        // 5. Merkez noktalar değişmediyse yakınsama sağlanmıştır
        isConverged = not hasUpdated
        iterations++
    
    return points, centroids, iterations`;

export const implementations = {
  typescript: `// K-means algoritması implementasyonu
function kMeansAlgorithm(
  points: Point[],
  k: number,
  maxIterations: number = 100
): { points: Point[], centroids: Point[], iterations: number } {
  if (points.length < k) {
    throw new Error("Nokta sayısı küme sayısından az olamaz.");
  }
  
  // Rastgele merkez noktaları seç
  const centroids: Point[] = [];
  const usedIndices = new Set<number>();
  
  // Rastgele, tekrarlanmayan indekslerde merkezler seç
  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * points.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      centroids.push({
        x: points[randomIndex].x,
        y: points[randomIndex].y,
        cluster: centroids.length
      });
    }
  }
  
  // Noktaların en yakın merkezlere atanması
  let iterations = 0;
  let isConverged = false;
  
  while (!isConverged && iterations < maxIterations) {
    // Noktaları en yakın merkezlere ata
    assignPointsToClusters(points, centroids);
    
    // Önceki merkezleri sakla
    const oldCentroids = JSON.parse(JSON.stringify(centroids));
    
    // Merkez noktalarını güncelle
    const hasUpdated = updateCentroids(points, centroids, k);
    
    // Merkez noktalar değişmediyse yakınsama sağlanmıştır
    isConverged = !hasUpdated;
    iterations++;
  }
  
  return { points, centroids, iterations };
}

// Noktaları en yakın merkezlerine ata
function assignPointsToClusters(points: Point[], centroids: Point[]): void {
  for (const point of points) {
    let minDistance = Infinity;
    let closestCluster = 0;
    
    // Her nokta için en yakın merkezi bul
    for (let i = 0; i < centroids.length; i++) {
      const distance = euclideanDistance(point, centroids[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestCluster = i;
      }
    }
    
    point.cluster = closestCluster;
  }
}

// Merkez noktalarını güncelle
function updateCentroids(points: Point[], centroids: Point[], k: number): boolean {
  let hasUpdated = false;
  
  for (let i = 0; i < k; i++) {
    // Kümeye ait noktaları bul
    const clusterPoints = points.filter(p => p.cluster === i);
    
    // Kümede nokta yoksa, merkezi güncelleme
    if (clusterPoints.length === 0) continue;
    
    // Yeni merkez koordinatlarını hesapla (ortalama)
    const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
    const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
    const newX = sumX / clusterPoints.length;
    const newY = sumY / clusterPoints.length;
    
    // Merkez konumu değişti mi?
    if (centroids[i].x !== newX || centroids[i].y !== newY) {
      centroids[i].x = newX;
      centroids[i].y = newY;
      hasUpdated = true;
    }
  }
  
  return hasUpdated;
}

// İki nokta arasındaki Öklid mesafesi
function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}`,
  python: `import numpy as np
import matplotlib.pyplot as plt
from typing import List, Tuple

class Point:
    def __init__(self, x: float, y: float, cluster: int = -1):
        self.x = x
        self.y = y
        self.cluster = cluster

def euclidean_distance(p1: Point, p2: Point) -> float:
    return np.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

def assign_points_to_clusters(points: List[Point], centroids: List[Point]) -> None:
    for point in points:
        min_distance = float('inf')
        closest_cluster = 0
        for i, centroid in enumerate(centroids):
            distance = euclidean_distance(point, centroid)
            if distance < min_distance:
                min_distance = distance
                closest_cluster = i
        point.cluster = closest_cluster

def update_centroids(points: List[Point], centroids: List[Point], k: int) -> bool:
    has_updated = False
    for i in range(k):
        cluster_points = [p for p in points if p.cluster == i]
        if not cluster_points:
            continue
        new_x = sum(p.x for p in cluster_points) / len(cluster_points)
        new_y = sum(p.y for p in cluster_points) / len(cluster_points)
        if centroids[i].x != new_x or centroids[i].y != newY:
            centroids[i].x = new_x
            centroids[i].y = new_y
            has_updated = True
    return has_updated`,
};

export const explanationData = {
  title: 'K-Means Kümeleme Algoritması',
  description:
    'K-Means, verileri K adet kümeye ayıran, her kümenin merkezi etrafında gruplandıran popüler bir kümeleme algoritmasıdır. Bu algoritma, veri noktalarını birbirine en yakın merkezlere atayarak ve merkez konumlarını yeniden hesaplayarak çalışır. İteratif bir süreç sonucunda, veri noktaları doğal gruplarına ayrılır.',
  timeComplexity: {
    best: 'O(n * k * i)',
    average: 'O(n * k * i)',
    worst: 'O(n * k * i)',
  },
  spaceComplexity: 'O(n + k)',
  advantages: [
    'Basit, anlaşılabilir ve uygulanması kolay bir algoritmadır',
    'Büyük veri setlerinde bile etkili ve verimlidir',
    'Yakınsama genellikle hızlıdır ve az sayıda iterasyon gerektirir',
    'Farklı küme şekillerine ve boyutlarına uyarlanabilir',
    'Kümelerin merkez noktalarını açıkça gösterir',
  ],
  disadvantages: [
    'Optimum küme sayısı (k) önceden belirlenmelidir',
    'Başlangıç merkezlerinin rastgele seçimi sonuçları etkileyebilir',
    'Yalnızca küresel küme şekillerine uygun çalışır, karmaşık şekillerde başarısız olabilir',
    'Gürültülü verilere ve aykırı değerlere karşı hassastır',
    'Farklı yoğunluklardaki kümeleri belirlemede zorlanabilir',
  ],
  applications: [
    'Müşteri segmentasyonu ve pazar araştırmaları',
    'Görüntü sıkıştırma ve renk kantizasyonu',
    'Anomali tespiti ve gürültülü veri filtreleme',
    'Belge sınıflandırma ve metin madenciliği',
    'Öznitelik seçimi ve boyut indirgeme',
    'Tıbbi görüntü analizi ve hastalık tespiti',
  ],
};
