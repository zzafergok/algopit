import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';

export const metadata: Metadata = {
  title: 'Graf Algoritmaları | AlgoPit',
  description:
    'Graf algoritmaları, düğümler ve bu düğümleri birbirine bağlayan kenarlardan oluşan veri yapıları üzerinde çalışan algoritmalardır.',
};

export default function GraphAlgorithmsPage() {
  const algorithms = createCategoryAlgorithms('/algorithms/graph-algorithms');

  return (
    <div className="space-y-8">
      <PageHeaderCard
        title="Graf Algoritmaları"
        description="Graf algoritmaları, düğümler ve bu düğümleri birbirine bağlayan kenarlardan oluşan veri yapıları üzerinde çalışan algoritmalardır. Ağ analizi, yol bulma, optimizasyon ve bağlantı analizi gibi birçok alanda kritik öneme sahiptir."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Graf Algoritmaları Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Graf algoritmaları, düğümler (nodes) ve kenarlardan (edges) oluşan
            graf veri yapıları üzerinde çalışan algoritmalardır. Bu
            algoritmalar, sosyal ağlar, haritalar, bilgisayar ağları, moleküler
            yapılar ve birçok gerçek dünya problemini modellemek ve çözmek için
            kullanılır.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Graf Türleri
            </h3>
            <p>
              Graflar temel yapılarına göre farklı kategorilerde incelenir.
              Yönlendirilmiş graflar (directed graphs) kenarların belirli bir
              yönü olduğu yapılardır, yönlendirilmemiş graflar (undirected
              graphs) ise çift yönlü bağlantıları temsil eder. Ağırlıklı graflar
              kenarlara sayısal değerler atayarak mesafe, maliyet veya kapasite
              gibi kavramları modellerken, ağırlıksız graflar sadece bağlantı
              durumunu gösterir.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Algoritma Kategorileri
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-ink">
                  Gezinme Algoritmaları (Traversal)
                </h4>
                <p className="text-sm">
                  BFS ve DFS gibi algoritmalar, grafta düğümler arasında
                  sistematik dolaşım sağlar. Bağlantılı bileşenlerin tespiti,
                  çevrim bulma ve topolojik sıralama gibi temel işlemler için
                  kullanılır.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  En Kısa Yol Algoritmaları (Shortest Path)
                </h4>
                <p className="text-sm">
                  Dijkstra, A*, Bellman-Ford ve Floyd-Warshall algoritmaları
                  farklı graf türlerinde optimal yol bulma problemlerini çözer.
                  Navigasyon sistemleri, ağ yönlendirme ve lojistik
                  optimizasyonunda kritik role sahiptir.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  Minimum Yayılma Ağacı (MST)
                </h4>
                <p className="text-sm">
                  Kruskal ve Prim algoritmaları, tüm düğümleri birbirine
                  bağlayan minimum maliyetli kenar kümesini bulur. Ağ tasarımı,
                  kablolama planlaması ve kümeleme uygulamalarında yaygın olarak
                  kullanılır.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Uygulama Alanları
            </h3>
            <p>
              Graf algoritmaları günlük hayatımızın birçok alanında yer alır.
              Navigasyon sistemleri ve harita uygulamaları en kısa yol
              algoritmalarını kullanırken, sosyal ağ platformları bağlantı
              analizi için graf yapılarından yararlanır. İnternet ve bilgisayar
              ağlarında veri yönlendirme, biyolojik araştırmalarda protein
              etkileşim ağları, öneri sistemlerinde kullanıcı-ürün ilişkileri,
              yapay zeka ve makine öğrenmesinde özellik çıkarımı, veri
              madenciliği ve büyük veri analizinde pattern tanıma gibi çok
              çeşitli alanlarda kritik işlevler üstlenir.
            </p>
          </div>

          <p>
            Graf algoritmaları, karmaşık ilişkisel verileri analiz etmek,
            optimize etmek ve anlamak için güçlü araçlar sunar. Bu algoritmalar
            bilgisayar biliminin temel konularından birini oluşturarak, modern
            teknolojinin birçok alanında vazgeçilmez bileşenler haline
            gelmiştir.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
