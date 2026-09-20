import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Metin İşleme Algoritmaları',
  description:
    'Metin işleme algoritmaları, string veriler üzerinde arama, eşleştirme, düzenleme ve manipülasyon yapmak için kullanılan özel algoritmalardır.',
  path: '/algorithms/string-algorithms',
  keywords: [
    'metin i̇şleme algoritmaları',
    'algoritmalar',
    'görselleştirme',
    'simülasyon',
  ],
});

export default function StringAlgorithmsPage() {
  const algorithms = createCategoryAlgorithms('/algorithms/string-algorithms');
  const categorySchema = getCategorySchema({
    name: 'Metin İşleme Algoritmaları',
    description:
      'Metin işleme algoritmaları, string veriler üzerinde arama, eşleştirme, düzenleme ve manipülasyon yapmak için kullanılan özel algoritmalardır.',
    path: '/algorithms/string-algorithms',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="Metin İşleme Algoritmaları"
        description="Metin işleme algoritmaları, string veriler üzerinde arama, eşleştirme, düzenleme ve manipülasyon yapmak için kullanılan özel algoritmalardır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Metin İşleme Algoritmaları Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Metin işleme algoritmaları, bilgisayar biliminin önemli bir alanını
            oluşturur ve string verileri üzerinde çeşitli işlemler yapmak için
            kullanılır. Bu algoritmalar, büyük metin verileri içerisinde arama
            yapmak, desen eşleştirmek, metin düzenlemesi yapmak ve metin
            verisini manipüle etmek gibi çeşitli görevleri yerine getirir.
          </p>

          <p className="font-semibold text-ink">
            Metin işleme algoritmalarının temel kategorileri şunlardır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">
                String Eşleştirme (String Matching):
              </strong>{' '}
              Bir metin içerisinde belirli bir deseni bulmak için kullanılan
              algoritmalar. Örneğin; Rabin-Karp, KMP (Knuth-Morris-Pratt),
              Boyer-Moore, Z-Algorithm.
            </li>
            <li>
              <strong className="text-ink">
                Düzenleme Mesafesi (Edit Distance):
              </strong>{' '}
              İki metinin birbirine ne kadar benzediğini veya farklı olduğunu
              ölçen algoritmalar. Örneğin; Levenshtein Distance, Hamming
              Distance.
            </li>
            <li>
              <strong className="text-ink">Kompresyon (Compression):</strong>{' '}
              Metni daha az alanda saklamak için kullanılan algoritmalar.
              Örneğin; Huffman Coding, Lempel-Ziv-Welch (LZW).
            </li>
            <li>
              <strong className="text-ink">Regex Motoru:</strong> Düzenli
              ifadeler kullanarak metin arama ve eşleştirme yapmak için
              kullanılan algoritmalar.
            </li>
          </ul>

          <p className="font-semibold text-ink">
            Metin işleme algoritmalarının performansı genellikle şu faktörlere
            göre değerlendirilir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Zaman Karmaşıklığı:</strong>{' '}
              Algoritmanın çalışma süresi (En kötü, ortalama ve en iyi durum)
            </li>
            <li>
              <strong className="text-ink">Alan Karmaşıklığı:</strong>{' '}
              Algoritmanın bellek kullanımı
            </li>
            <li>
              <strong className="text-ink">Ön İşleme Süresi:</strong>{' '}
              Algoritmanın veriyi işlemeye başlamadan önce gerekli ön hazırlık
              süresi
            </li>
          </ul>

          <p className="font-semibold text-ink">
            Metin işleme algoritmaları, aşağıdaki gibi birçok alanda yaygın
            olarak kullanılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Arama motorları</li>
            <li>Biyoinformatik (DNA dizilimi analizi)</li>
            <li>Doğal dil işleme (NLP)</li>
            <li>Metin düzenleyiciler ve kelime işlemciler</li>
            <li>Veri sıkıştırma sistemleri</li>
            <li>Yazım denetimi ve otomatik düzeltme</li>
            <li>Veritabanı sorgulamaları</li>
            <li>Güvenlik sistemleri (örn. virüs taraması)</li>
          </ul>

          <p>
            Doğru metin işleme algoritmasını seçmek, uygulamanın performansını
            ve verimliliğini doğrudan etkiler. Özellikle büyük veri setleriyle
            çalışırken, verimli metin işleme algoritmaları kullanmak önemlidir.
            Örneğin, Boyer-Moore algoritması büyük metinlerde desen aramak için
            oldukça verimli olabilirken, KMP algoritması kısa desenleri aramak
            için daha uygun olabilir.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
