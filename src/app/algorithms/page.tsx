import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { navigationConfig } from '@/config/navigation';
import { createCategoryAlgorithms } from '@/lib/algorithm-category';

interface Category {
  title: string;
  slug: string;
  description: string;
  algorithms: Algorithm[];
  icon?: React.ReactNode;
}

interface Algorithm {
  name: string;
  slug: string;
  description: string;
  difficulty?: 'Kolay' | 'Orta' | 'Zor';
}

const categoryDescriptions: Record<string, string> = {
  sorting:
    'Verileri belirli bir düzende sıralamak için kullanılan algoritmalar',
  searching: 'Veri yapılarında eleman bulmak için kullanılan algoritmalar',
  'graph-algorithms': 'Graf veri yapıları üzerinde işlem yapan algoritmalar',
  'data-structures': 'Verileri organize etme ve saklama yöntemleri',
  'dynamic-programming':
    'Karmaşık problemleri alt problemlere bölerek çözen yöntemler',
  backtracking:
    'Bir problem için olası tüm çözümleri adım adım keşfeden ve geçersiz çözüm yollarını eleme yöntemiyle ilerleyen bir algoritma stratejisi',
  'greedy-algorithms':
    'Her adımda en iyi görünen seçimi yaparak global optimum çözüm arayan problem çözme yaklaşımı',
  'divide-and-conquer':
    'Problemi aynı tipte daha küçük alt problemlere bölen, çözen ve sonuçları birleştiren algoritma tasarım yaklaşımı',
  'string-algorithms':
    'String veriler üzerinde arama, eşleştirme, düzenleme ve manipülasyon yapmak için kullanılan özel algoritmalar',
  'mathematical-algorithms':
    'Matematiksel problemleri çözmek ve matematiksel hesaplamalar yapmak için kullanılan algoritmalar',
  'clustering-algorithms':
    'Benzer özelliklere sahip verileri gruplandırmak için kullanılan gözetimsiz öğrenme yöntemleri',
  'optimization-algorithms':
    'Belirli bir problem için olası çözümler arasından en iyi çözümü bulmayı amaçlayan algoritmalar',
  'misc-algorithms':
    'Çeşitli problem alanlarında kullanılan, farklı kategorilere tam olarak sığmayan ancak yazılım geliştirmede kritik önem taşıyan algoritmalar',
  'advanced-algorithms':
    'Karmaşık problemleri çözmek için optimize edilmiş, özel durumlara yönelik geliştirilmiş algoritmalar',
};

export default function AlgorithmsPage() {
  const algorithmRoot = navigationConfig.mainNavItems.find(
    (item) => item.href === '/algorithms',
  );

  const algorithmCategories: Category[] = (algorithmRoot?.children ?? []).map(
    (category) => {
      const categorySlug = category.href.replace('/algorithms/', '');
      const algorithms = createCategoryAlgorithms(category.href).map(
        (algo) => ({
          name: algo.name,
          slug: algo.path.split('/').pop() || '',
          description: algo.description || '',
          difficulty: algo.difficulty as 'Kolay' | 'Orta' | 'Zor' | undefined,
        }),
      );

      return {
        title: category.label,
        slug: categorySlug,
        description:
          categoryDescriptions[categorySlug] ||
          `${category.label} kategorisi altındaki algoritmalar.`,
        algorithms,
      };
    },
  );

  const difficultyBadgeVariant = (difficulty?: string) => {
    switch (difficulty) {
      case 'Kolay':
        return 'success';
      case 'Orta':
        return 'warning';
      case 'Zor':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Algoritma Kütüphanesi
        </h1>
        <p className="text-xl text-ash mt-4 max-w-3xl mx-auto">
          Tüm algoritma kategorilerini keşfedin, interaktif görselleştirmeler ve
          detaylı açıklamalarla algoritmaların nasıl çalıştığını öğrenin.
        </p>
      </div>

      <div className="mt-12 p-6 bg-obsidian/60 rounded-sm">
        <h2 className="text-2xl font-bold mb-4">Algoritma Seçimi Rehberi</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            İhtiyacınıza uygun algoritma seçmek, sorununuzun verimli çözümü için
            kritik öneme sahiptir. İşte algoritma seçerken göz önünde
            bulundurmanız gereken bazı faktörler:
          </p>

          <ul>
            <li>
              <strong>Problem Tipi:</strong> Sıralama, arama, optimizasyon gibi
              temel problem tipiniz nedir?
            </li>
            <li>
              <strong>Veri Boyutu:</strong> Çok büyük veri kümeleri için
              asimptotik karmaşıklığı daha düşük algoritmalar tercih
              edilmelidir.
            </li>
            <li>
              <strong>Zaman ve Alan Kısıtlamaları:</strong> Hızlı çalışma mı
              yoksa düşük bellek kullanımı mı daha önemli?
            </li>
            <li>
              <strong>İşlem Tipi:</strong> Dinamik veri mi yoksa statik veri mi
              işlenecek?
            </li>
            <li>
              <strong>Uygulama Ortamı:</strong> Algoritmanın çalışacağı platform
              veya sistem özellikleri.
            </li>
          </ul>

          <p>
            Bu platformda sunulan algoritmalar, çeşitli problem türlerine
            yönelik çözümleri ve bunların uygulanma şekillerini göstermektedir.
            Her algoritmanın avantajları, dezavantajları ve karmaşıklık
            analizleri detaylı olarak incelenmiştir.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithmCategories.map((category, idx) => (
          <Link
            key={category.slug}
            href={`/algorithms/${category.slug}`}
            className="algorithm-card group flex flex-col justify-between p-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
                <span className="text-turquoise font-semibold tracking-wider">
                  TRACK {String(idx + 1).padStart(2, '0')} //
                </span>
                <span className="text-quiet group-hover:text-muted transition-colors">
                  {category.algorithms.length} ALGORİTMA
                </span>
              </div>
              <h3 className="text-lg font-mono font-bold text-ink group-hover:text-turquoise transition-colors tracking-tight">
                {category.title}
              </h3>
              <p className="text-sm font-sans text-muted leading-relaxed pt-1.5 group-hover:text-ink/90 transition-colors">
                {category.description}
              </p>

              <div className="space-y-2 pt-4 mt-4 border-t border-line/50">
                <p className="text-[0.7rem] font-mono uppercase text-quiet tracking-wider">
                  Öne Çıkan Başlıklar:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {category.algorithms.slice(0, 3).map((algo) => (
                    <span
                      key={algo.slug}
                      className="inline-block px-2 py-0.5 text-xs font-mono bg-surface-raised border border-line text-ink/90 group-hover:border-line-strong transition-colors"
                    >
                      {algo.name}
                    </span>
                  ))}
                  {category.algorithms.length > 3 && (
                    <span className="inline-block px-2 py-0.5 text-xs font-mono bg-surface-raised border border-line text-turquoise">
                      +{category.algorithms.length - 3} daha...
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-line/50 flex items-center justify-between font-mono text-xs text-quiet group-hover:text-turquoise transition-colors">
              <span className="font-semibold tracking-wider text-[0.72rem] uppercase">
                KATEGORİYİ KEŞFET
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5 text-turquoise" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 border border-line bg-surface p-6 md:p-8 shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.45)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4 mb-8">
          <div>
            <span className="font-mono text-xs text-turquoise tracking-widest uppercase">
              // INDEX // GLOBAL DIRECTORY
            </span>
            <h2 className="text-2xl font-mono font-bold tracking-tight text-ink mt-1">
              Tüm Algoritmalar Dizini
            </h2>
          </div>
          <div className="font-mono text-xs text-muted border border-line bg-surface-raised px-3 py-1.5 self-start">
            TOPLAM:{' '}
            <span className="text-ink font-bold">
              {algorithmCategories.reduce(
                (acc, c) => acc + c.algorithms.length,
                0,
              )}
            </span>{' '}
            ALGORİTMA
          </div>
        </div>

        <div className="space-y-10">
          {algorithmCategories.map((category, idx) => (
            <div key={category.slug} className="space-y-3">
              <div className="flex items-center justify-between border-b border-line/60 pb-2">
                <div className="flex items-center gap-2 font-mono text-sm font-bold text-ink">
                  <span className="text-turquoise">
                    {String(idx + 1).padStart(2, '0')} //
                  </span>
                  <span>{category.title}</span>
                  <span className="text-xs font-normal text-muted font-mono">
                    ({category.algorithms.length})
                  </span>
                </div>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="font-mono text-xs text-turquoise hover:text-turquoise/80 p-0 h-auto"
                >
                  <Link
                    href={`/algorithms/${category.slug}`}
                    className="flex items-center gap-1"
                  >
                    <span>Tümünü Gör</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.algorithms.map((algorithm) => (
                  <Link
                    key={algorithm.slug}
                    href={`/algorithms/${category.slug}/${algorithm.slug}`}
                    className="border border-line bg-surface-raised/60 p-3.5 hover:border-turquoise hover:bg-surface hover:-translate-y-0.5 transition-all flex flex-col justify-between group shadow-[0.15rem_0.15rem_0_rgba(0,0,0,0.35)] hover:shadow-[0.25rem_0.25rem_0_rgba(0,240,212,0.15)] cursor-pointer"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-mono text-sm font-semibold text-ink group-hover:text-turquoise transition-colors">
                          {algorithm.name}
                        </h4>
                        {algorithm.difficulty && (
                          <Badge
                            variant={difficultyBadgeVariant(
                              algorithm.difficulty,
                            )}
                            size="sm"
                          >
                            {algorithm.difficulty}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2">
                        {algorithm.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-line flex items-center justify-between font-mono text-[0.68rem] text-quiet group-hover:text-turquoise transition-colors">
                      <span>İNCELE</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
