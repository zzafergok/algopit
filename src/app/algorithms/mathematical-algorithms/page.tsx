import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';
import { createPageMetadata, getCategorySchema } from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Matematiksel Algoritmalar',
  description:
    'Matematiksel problemleri çözmek ve matematiksel hesaplamalar yapmak için kullanılan algoritmalar.',
  path: '/algorithms/mathematical-algorithms',
  keywords: [
    'matematiksel algoritmalar',
    'algoritmalar',
    'görselleştirme',
    'simülasyon',
  ],
});

export default function MathematicalAlgorithmsPage() {
  const algorithms = createCategoryAlgorithms(
    '/algorithms/mathematical-algorithms',
  );
  const categorySchema = getCategorySchema({
    name: 'Matematiksel Algoritmalar',
    description:
      'Matematiksel problemleri çözmek ve matematiksel hesaplamalar yapmak için kullanılan algoritmalar.',
    path: '/algorithms/mathematical-algorithms',
  });

  return (
    <div className="space-y-8">
      <JsonLd data={categorySchema} />
      <PageHeaderCard
        title="Matematiksel Algoritmalar"
        description="Matematiksel algoritmalar, matematiksel problemleri çözmek ve matematiksel hesaplamalar yapmak için kullanılan algoritmalardır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Matematiksel Algoritmalar Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Matematiksel algoritmalar, sayı teorisi, cebir, geometri ve diğer
            matematik alanlarındaki problemleri çözmek için tasarlanmış özel
            algoritmalardır. Bu algoritmalar, temel matematiksel işlemleri
            gerçekleştirmekten karmaşık matematiksel hesaplamalara kadar geniş
            bir yelpazede kullanılır.
          </p>

          <p className="font-semibold text-ink">
            Matematiksel algoritmaların önemli kategorileri:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Sayı Teorisi Algoritmaları:</strong>{' '}
              Asal sayılar, faktörizasyon, bölünebilirlik gibi konularla ilgili
              algoritmalar (örn. Eratosthenes Eleği, Öklid Algoritması)
            </li>
            <li>
              <strong className="text-ink">Cebirsel Algoritmalar:</strong>{' '}
              Matris işlemleri, polinom hesaplamaları, denklem çözümü gibi
              cebirsel hesaplamalar için algoritmalar
            </li>
            <li>
              <strong className="text-ink">Sayısal Algoritmalar:</strong>{' '}
              Sayısal entegrasyon, diferansiyel denklemler, interpolasyon gibi
              sayısal analiz problemlerini çözen algoritmalar
            </li>
            <li>
              <strong className="text-ink">Geometrik Algoritmalar:</strong>{' '}
              Geometrik problemleri çözen algoritmalar (örn. Convex Hull,
              Closest Pair of Points)
            </li>
            <li>
              <strong className="text-ink">Kriptografik Algoritmalar:</strong>{' '}
              Şifreleme ve şifre çözme için kullanılan matematiksel algoritmalar
              (örn. RSA, El Gamal)
            </li>
          </ul>

          <p className="font-semibold text-ink">
            Matematiksel algoritmaların yaygın kullanım alanları:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Kriptografi ve veri güvenliği</li>
            <li>Bilimsel hesaplamalar ve simülasyonlar</li>
            <li>Grafik işleme ve bilgisayar destekli tasarım</li>
            <li>Finans ve ekonomi modelleri</li>
            <li>Yapay zeka ve makine öğrenmesi</li>
            <li>Optimizasyon problemleri</li>
            <li>Oyun teorisi ve stratejik karar verme</li>
          </ul>

          <p>
            Matematiksel algoritmalar, bilgisayar biliminin temelini oluşturur
            ve karmaşık hesaplamaları verimli bir şekilde gerçekleştirmek için
            kritik öneme sahiptir. Bu algoritmalar, hesaplama karmaşıklığı,
            doğruluk ve verimlilik gibi faktörler göz önünde bulundurularak
            tasarlanır.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
