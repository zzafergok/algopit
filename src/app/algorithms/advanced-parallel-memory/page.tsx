import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';
import { CategoryOverviewView } from '@/features/algorithms/category-overview';

export const metadata: Metadata = {
  title: 'Gelişmiş, Paralel ve Bellek Yönetimi Algoritmaları | AlgoPit',
  description:
    'Hızlı Fourier Dönüşümü (FFT), paralel donanım sıralama ağları, bellek yönetimi ve GC algoritmaları.',
};

export default function AdvancedParallelMemoryPage() {
  const algorithms = createCategoryAlgorithms(
    '/algorithms/advanced-parallel-memory',
  );

  return (
    <div className="space-y-8">
      <PageHeaderCard
        title="Gelişmiş, Paralel ve Bellek Yönetimi Algoritmaları"
        description="Bu bölüm, Hızlı Fourier Dönüşümü (FFT), paralel donanım sıralama ağları, büyük sayılar için divide-and-conquer çarpımı, doğrusal programlama Simplex yöntemi ve Buddy sistem gibi bellek/GC yöneticileri içeren gelişmiş mimari düzeyindeki algoritmaları kapsar."
      />

      <CategoryOverviewView algorithms={algorithms}>
        <h2 className="text-2xl font-bold mb-4 font-mono text-ink">
          // Gelişmiş, Paralel ve Bellek Yönetimi Hakkında
        </h2>
        <div className="max-w-none space-y-4 text-muted leading-relaxed">
          <p>
            Gelişmiş ve paralel algoritmalar modern bilgisayarların donanımsal
            yeteneklerinden (çok çekirdekli işlemciler, GPU&apos;lar, ASIC ve
            FPGA çipleri) maksimum verim almak üzere kurgulanır. Bellek yönetimi
            algoritmaları ise donanımın en kısıtlı kaynağı olan RAM&apos;in en
            az parçalanmayla (fragmentation) yönetilmesini sağlar.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-ink">
              Temel Konular
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-ink">
                  Paralel Karşılaştırma Ağları (Sorting Networks)
                </h4>
                <p className="text-sm">
                  Batcher&apos;ın Bitonik Sıralama ağı gibi yapılar, if/else
                  dallanmaları içermediği için doğrudan elektronik devrelerle
                  (FPGA) donanımsallaştırılabilir. Tüm karşılaştırıcılar paralel
                  kablo gruplarında aynı anda tetiklenir.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  Büyük Sayı ve Sinyal İşleme
                </h4>
                <p className="text-sm">
                  FFT, sinyalleri zamandan frekans genliğine geçirerek
                  sıkıştırma, gürültü ayıklama ve hızlı polinom çarpımında temel
                  taş işlevi görür. Karatsuba ise büyük tamsayı çarpımlarını
                  polinomsal alt dereceye düşürür.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-ink">
                  İşletim Sistemleri ve Zaman Bellek Yönetimi
                </h4>
                <p className="text-sm">
                  Buddy bellek tahsisi, komşu (buddy) bellek bloklarının serbest
                  bırakıldıklarında anında birleşip tek bir büyük alana
                  (coalescing) dönüşmesini yönetir. GC algoritmaları ise
                  erişilemeyen dairesel referanslı bellek düğümlerini temizler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CategoryOverviewView>
    </div>
  );
}
