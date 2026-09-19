import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';

export const metadata: Metadata = {
  title: 'Veri Yapıları | AlgoPit',
  description:
    'Veri yapıları, verileri organize etme, saklama ve işleme yöntemlerini tanımlayan programlama kavramlarıdır.',
};

export default function DataStructuresPage() {
  const dataStructures = createCategoryAlgorithms(
    '/algorithms/data-structures',
  );

  return (
    <div className="space-y-8">
      <PageHeaderCard
        title="Veri Yapıları"
        description="Veri yapıları, verileri organize etme, saklama ve işleme yöntemlerini tanımlayan programlama kavramlarıdır. Etkili algoritmalar tasarlamanın temelini oluştururlar ve yazılım geliştirmenin kritik bileşenleridir."
      />

      <CategoryOverviewView algorithms={dataStructures}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Veri Yapıları Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Veri yapıları, verileri organize etme ve işleme yöntemlerini
            sağlayan programlama konseptleridir. Doğru veri yapısı seçimi,
            algoritmaların verimliliğini ve performansını doğrudan etkileyen
            kritik bir faktördür. Her veri yapısının kendine özgü avantajları,
            dezavantajları ve optimal kullanım alanları bulunmaktadır.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Temel Kategoriler
            </h3>
            <p>
              Veri yapıları genel olarak iki ana kategoriye ayrılır. İlkel veri
              yapıları tamsayılar, kayan noktalı sayılar ve karakterler gibi
              doğrudan değerleri temsil eden basit veri tiplerini kapsar. Soyut
              veri yapıları ise daha karmaşık veri organizasyonlarını tanımlayan
              üst düzey yapılardır ve diziler, bağlı listeler, yığınlar,
              kuyruklar, ağaçlar, grafikler ve hash tablolar bu kategoriye
              girer.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Veri Yapısı Türleri
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-ink">
                  Doğrusal Veri Yapıları (Linear)
                </h4>
                <p className="text-sm">
                  Elemanların sıralı bir şekilde organize edildiği yapılardır.
                  Linked List, Stack, Queue gibi yapılar bu kategoriye girer.
                  Her eleman kendinden önceki ve sonraki elemanla doğrudan
                  ilişki içindedir.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">Ağaç Yapıları (Tree)</h4>
                <p className="text-sm">
                  Hiyerarşik organizasyon sağlayan yapılardır. Binary Search
                  Tree, Trie, Segment Tree gibi yapılar farklı problemler için
                  optimize edilmiş ağaç implementasyonlarıdır. Logaritmik
                  performans ve organize veri erişimi sağlarlar.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  Hash Tabanlı Yapılar (Hash-based)
                </h4>
                <p className="text-sm">
                  Hash fonksiyonları kullanarak sabit zamanlı erişim sağlayan
                  yapılardır. Hash Table anahtar-değer eşleştirmesi için
                  optimize edilmiş olup, ortalama durumda O(1) performans sunar.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Detaylı Veri Yapısı Özellikleri
            </h3>
            <div className="space-y-2">
              <div>
                <h4 className="font-medium text-ink">Diziler (Arrays):</h4>
                <p className="text-sm">
                  Ardışık bellek konumlarında saklanan sabit boyutlu
                  koleksiyonlar. İndeksleme ile hızlı erişim sağlar ancak
                  dinamik boyut değişikliği desteklemez.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  Bağlı Listeler (Linked Lists):
                </h4>
                <p className="text-sm">
                  Dinamik boyutlu, her elemanın bir sonrakine işaret ettiği
                  yapılar. Ekleme ve silme işlemleri verimlidir ancak rastgele
                  erişim mümkün değildir.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">Yığınlar (Stacks):</h4>
                <p className="text-sm">
                  Son giren ilk çıkar (LIFO) prensibiyle çalışır. Fonksiyon
                  çağrıları, geri alma özellikleri ve expression evaluation için
                  idealdir.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">Kuyruklar (Queues):</h4>
                <p className="text-sm">
                  İlk giren ilk çıkar (FIFO) prensibiyle çalışır. İş sıralaması,
                  mesaj kuyruklama ve breadth-first search implementasyonları
                  için kullanılır.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">Binary Search Tree:</h4>
                <p className="text-sm">
                  Hiyerarşik yapıdır, arama ve sıralama işlemleri için
                  etkilidir. Balanced tree varyantları logaritmik performans
                  garantisi sağlar.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">Trie (Prefix Tree):</h4>
                <p className="text-sm">
                  String verilerini prefix tabanlı organize eden ağaç yapısı.
                  Autocomplete, dictionary implementasyonları ve string pattern
                  matching için idealdir.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">Segment Tree:</h4>
                <p className="text-sm">
                  Aralık sorguları (range queries) için optimize edilmiş ağaç
                  yapısı. Toplam, minimum, maksimum gibi aggregate operasyonları
                  logaritmik zamanda gerçekleştirir.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  Hash Tablolar (Hash Tables):
                </h4>
                <p className="text-sm">
                  Anahtarları değerlere eşleyen, ortalama durumda sabit zamanlı
                  erişim sağlayan yapılardır. Dictionary implementasyonları ve
                  caching sistemleri için kritiktir.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Veri Yapısı Seçim Kriterleri
            </h3>
            <p>
              Doğru veri yapısını seçmek, algoritma tasarımının kritik bir
              parçasıdır ve çözülecek problem türü, veri boyutu, işlem tipleri
              ve performans gereksinimleri göz önünde bulundurularak belirlenir.
              Erişim sıklığı, güncellenme paternleri, bellek kısıtlamaları ve
              zaman karmaşıklığı gereksinimleri de seçim sürecinde önemli
              faktörlerdir.
            </p>
          </div>

          <p>
            Modern yazılım geliştirmede veri yapıları, sadece teorik kavramlar
            değil, günlük programlama pratiğinin ayrılmaz parçalarıdır.
            Veritabanı tasarımından kullanıcı arayüzü geliştirmeye, sistem
            programlamadan web uygulamalarına kadar her alanda doğru veri yapısı
            seçimi, performanslı ve ölçeklenebilir çözümler üretmenin temelidir.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
