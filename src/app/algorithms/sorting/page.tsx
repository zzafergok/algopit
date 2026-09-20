import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Sıralama Algoritmaları',
  description:
    'Sıralama algoritmaları, verileri belirli bir düzende organize etmek için kullanılan temel algoritmalardan oluşur.',
  path: '/algorithms/sorting',
  keywords: [
    'sıralama algoritmaları',
    'algoritmalar',
    'görselleştirme',
    'simülasyon',
  ],
});

export default function SortingAlgorithmsPage() {
  const algorithms = createCategoryAlgorithms('/algorithms/sorting');
  const categorySchema = getCategorySchema({
    name: 'Sıralama Algoritmaları',
    description:
      'Sıralama algoritmaları, verileri belirli bir düzende organize etmek için kullanılan temel algoritmalardan oluşur.',
    path: '/algorithms/sorting',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="Sıralama Algoritmaları"
        description="Sıralama algoritmaları, verileri belirli bir düzende organize etmek için kullanılan temel algoritmalardan oluşur. Her algoritmanın kendine özgü avantajları, dezavantajları ve kullanım alanları bulunmaktadır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Sıralama Algoritmaları Hakkında
        </h2>
        <div className="max-w-none text-muted leading-relaxed">
          <p>
            Sıralama algoritmaları, bilgisayar biliminin en temel ve yaygın
            kullanılan algoritmalarından oluşur. Bu algoritmalar, verileri
            belirli bir kritere göre düzenleyerek arama, filtreleme ve analiz
            işlemlerini kolaylaştırır.
          </p>

          <p className="mt-4">
            Sıralama algoritmalarını çeşitli kriterlere göre kategorize
            edebiliriz:
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-ink">
                Karmaşıklığa Göre Sınıflandırma:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-ink">
                    Basit Algoritmalar (O(n²)):
                  </strong>{' '}
                  Bubble Sort, Selection Sort, Insertion Sort gibi anlaşılması
                  kolay ancak büyük veri setlerinde yavaş çalışan algoritmalar.
                </li>
                <li>
                  <strong className="text-ink">
                    Verimli Algoritmalar (O(n log n)):
                  </strong>{' '}
                  Merge Sort, Quick Sort, Heap Sort gibi büyük veri setlerinde
                  etkili performans gösteren algoritmalar.
                </li>
                <li>
                  <strong className="text-ink">
                    Doğrusal Algoritmalar (O(n)):
                  </strong>{' '}
                  Counting Sort, Radix Sort gibi özel koşullarda doğrusal
                  zamanda çalışan algoritmalar.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-ink">
                Kararlılığa Göre Sınıflandırma:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-ink">Kararlı Algoritmalar:</strong>{' '}
                  Eşit elemanların göreli sırasını koruyan algoritmalar (Merge
                  Sort, Insertion Sort, Bubble Sort).
                </li>
                <li>
                  <strong className="text-ink">Kararsız Algoritmalar:</strong>{' '}
                  Eşit elemanların göreli sırasını korumayan algoritmalar (Quick
                  Sort, Selection Sort, Heap Sort).
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-ink">
                Bellek Kullanımına Göre Sınıflandırma:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-ink">In-place Algoritmalar:</strong>{' '}
                  Sabit miktarda ek bellek kullanan algoritmalar (Quick Sort,
                  Heap Sort, Selection Sort).
                </li>
                <li>
                  <strong className="text-ink">
                    Out-of-place Algoritmalar:
                  </strong>{' '}
                  Giriş boyutuyla orantılı ek bellek gerektiren algoritmalar
                  (Merge Sort, Counting Sort).
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-4">
            Doğru algoritma seçimi, veri boyutu, bellek kısıtlamaları,
            kararlılık gereksinimleri ve performans beklentilerine bağlı olarak
            değişkenlik gösterir. Her algoritmanın kendine özgü avantaj ve
            dezavantajları bulunduğundan, spesifik kullanım senaryolarına göre
            en uygun algoritmanın seçilmesi kritik öneme sahiptir.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
