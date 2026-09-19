import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';

export const metadata: Metadata = {
  title: 'Hesaplamalı Geometri | AlgoPit',
  description:
    'Geometrik nesnelerin temsili, sorgulanması ve analiz edilmesi için kullanılan algoritmalar.',
};

export default function ComputationalGeometryPage() {
  const algorithms = createCategoryAlgorithms(
    '/algorithms/computational-geometry',
  );

  return (
    <div className="space-y-8">
      <PageHeaderCard
        title="Hesaplamalı Geometri (Computational Geometry)"
        description="Hesaplamalı geometri, geometrik nesnelerin (noktalar, çizgiler, çokgenler vb.) temsili, sorgulanması ve analiz edilmesi için kullanılan algoritmaları inceler. Harita servisleri, bilgisayarlı grafik, robotik ve fiziksel simülasyonların temel taşıdır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Hesaplamalı Geometri Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Hesaplamalı geometri, geometrik problemlerin bilgisayarlar
            yardımıyla çözülmesi için algoritmik teknikler sunar.
            1970&apos;lerden bu yana hızla gelişen bu disiplin, Coğrafi Bilgi
            Sistemleri (CBS), CAD/CAM tasarımları, tıbbi görüntüleme, bilgisayar
            grafikleri ve mikroçip üretimi (VLSI tasarımı) gibi çok geniş
            uygulama alanlarına sahiptir.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Temel Alt Alanlar
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-ink">
                  Geometrik Sorgular ve Arama (Range Search / Point Location)
                </h4>
                <p className="text-sm">
                  Düzlemde milyonlarca konum bilgisi arasından belirli bir bölge
                  (aralık) içinde kalanları verimli şekilde süzmeyi veya bir
                  noktanın hangi bölgeye ait olduğunu bulmayı hedefler. 2D-Tree
                  ve Quadtree gibi ağaç yapıları bu alanın temel araçlarıdır.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  Dış Bükey Gövde (Convex Hull)
                </h4>
                <p className="text-sm">
                  Bir nokta kümesini saran en küçük dış bükey çokgeni çıkarma
                  problemidir. Kümeleme, çarpışma sınırları (collision mesh)
                  belirleme ve örüntü tanıma için kullanılır.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  Yakınlık ve Mesafe (Proximity)
                </h4>
                <p className="text-sm">
                  Nokta gruplarındaki en yakın çiftlerin (Closest Pair)
                  doğrusal-logaritmik zamanda tespiti, tüm en yakın komşuların
                  bulunması veya düzlemin hücrelere bölündüğü Voronoi
                  Diyagramları bu problemlerin alt dallarıdır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
