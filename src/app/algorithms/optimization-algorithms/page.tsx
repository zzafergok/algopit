import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';

export const metadata: Metadata = {
  title: 'Optimizasyon Algoritmaları | AlgoPit',
  description:
    'Belirli bir problem için olası çözümler arasından en iyi çözümü bulmayı amaçlayan algoritmalar.',
};

export default function OptimizationAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Simulated Annealing',
      path: '/algorithms/optimization-algorithms/simulated-annealing',
      description:
        'Fiziksel tavlama işlemini taklit eden, global optimum çözüm arayan bir metasezgisel yöntem.',
    },
    {
      name: 'Genetic Algorithms',
      path: '/algorithms/optimization-algorithms/genetic-algorithms',
      description:
        'Doğal evrim süreçlerini taklit eden, popülasyon tabanlı meta-sezgisel optimizasyon algoritması.',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeaderCard
        title="Optimizasyon Algoritmaları"
        description="Optimizasyon algoritmaları, belirli bir problem için olası çözümler arasından en iyi çözümü bulmayı amaçlayan algoritmalardır."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Optimizasyon Algoritmaları Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Optimizasyon algoritmaları, bir problemin olası çözümleri arasından
            en iyi çözümü (minimum veya maksimum) bulmayı amaçlayan matematiksel
            ve hesaplama yöntemleridir. Bu algoritmalar, mühendislik, ekonomi,
            lojistik, yapay zeka gibi birçok alanda kullanılır.
          </p>

          <p className="font-semibold text-ink">
            Optimizasyon algoritmaları genellikle şu kategorilere ayrılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">
                Tam Optimizasyon Algoritmaları:
              </strong>{' '}
              Problemin kesin optimal çözümünü garanti eden algoritmalar
              (Simplex Algoritması, Dinamik Programlama gibi).
            </li>
            <li>
              <strong className="text-ink">
                Yaklaşık Optimizasyon Algoritmaları:
              </strong>{' '}
              Optimal çözüme yakın çözümler üreten, ancak optimumu garanti
              etmeyen algoritmalar.
            </li>
            <li>
              <strong className="text-ink">Metasezgisel Algoritmalar:</strong>{' '}
              Doğadan esinlenen veya genel arama stratejilerine dayanan, geniş
              arama uzaylarında etkili olan algoritmalar (Simüle Edilmiş
              Tavlama, Genetik Algoritmalar, Parçacık Sürü Optimizasyonu gibi).
            </li>
          </ul>

          <p className="font-semibold text-ink">
            Optimizasyon algoritmaları, aşağıdaki bileşenlere sahiptir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-ink">Amaç Fonksiyonu:</strong> Optimize
              edilecek ölçüt (en aza indirilecek maliyet veya en üst düzeye
              çıkarılacak fayda).
            </li>
            <li>
              <strong className="text-ink">Değişkenler:</strong> Kontrol
              edilebilen ve değiştirilebilen parametreler.
            </li>
            <li>
              <strong className="text-ink">Kısıtlamalar:</strong> Çözümlerin
              sağlaması gereken koşullar.
            </li>
            <li>
              <strong className="text-ink">Arama Uzayı:</strong> Tüm olası
              çözümlerin kümesi.
            </li>
          </ul>

          <p className="font-semibold text-ink">
            Optimizasyon algoritmalarının uygulandığı yaygın alanlar:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Makine öğrenmesi modelleri eğitimi</li>
            <li>Lojistik ve tedarik zinciri optimizasyonu</li>
            <li>Finansal portföy optimizasyonu</li>
            <li>Üretim planlama ve çizelgeleme</li>
            <li>Robotik ve otonom sistemler</li>
            <li>Enerji yönetimi ve dağıtımı</li>
            <li>Ağ tasarımı ve trafik yönlendirme</li>
          </ul>

          <p>
            Her optimizasyon algoritması, belirli problem türleri için daha
            uygundur. Algoritma seçimi; problem tipi, arama uzayı boyutu,
            problemin yapısı (doğrusal, doğrusal olmayan, konveks), hesaplama
            kaynakları ve gerekli çözüm kalitesi gibi faktörlere bağlıdır.
          </p>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
