import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
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
  'sorting': 'Verileri belirli bir düzende sıralamak için kullanılan algoritmalar',
  'searching': 'Veri yapılarında eleman bulmak için kullanılan algoritmalar',
  'graph-algorithms': 'Graf veri yapıları üzerinde işlem yapan algoritmalar',
  'data-structures': 'Verileri organize etme ve saklama yöntemleri',
  'dynamic-programming': 'Karmaşık problemleri alt problemlere bölerek çözen yöntemler',
  'backtracking': 'Bir problem için olası tüm çözümleri adım adım keşfeden ve geçersiz çözüm yollarını eleme yöntemiyle ilerleyen bir algoritma stratejisi',
  'greedy-algorithms': 'Her adımda en iyi görünen seçimi yaparak global optimum çözüm arayan problem çözme yaklaşımı',
  'divide-and-conquer': 'Problemi aynı tipte daha küçük alt problemlere bölen, çözen ve sonuçları birleştiren algoritma tasarım yaklaşımı',
  'string-algorithms': 'String veriler üzerinde arama, eşleştirme, düzenleme ve manipülasyon yapmak için kullanılan özel algoritmalar',
  'mathematical-algorithms': 'Matematiksel problemleri çözmek ve matematiksel hesaplamalar yapmak için kullanılan algoritmalar',
  'clustering-algorithms': 'Benzer özelliklere sahip verileri gruplandırmak için kullanılan gözetimsiz öğrenme yöntemleri',
  'optimization-algorithms': 'Belirli bir problem için olası çözümler arasından en iyi çözümü bulmayı amaçlayan algoritmalar',
  'misc-algorithms': 'Çeşitli problem alanlarında kullanılan, farklı kategorilere tam olarak sığmayan ancak yazılım geliştirmede kritik önem taşıyan algoritmalar',
  'advanced-algorithms': 'Karmaşık problemleri çözmek için optimize edilmiş, özel durumlara yönelik geliştirilmiş algoritmalar',
};

export default function AlgorithmsPage() {
  const algorithmRoot = navigationConfig.mainNavItems.find(
    (item) => item.href === '/algorithms'
  );

  const algorithmCategories: Category[] = (algorithmRoot?.children ?? []).map((category) => {
    const categorySlug = category.href.replace('/algorithms/', '');
    const algorithms = createCategoryAlgorithms(category.href).map((algo) => ({
      name: algo.name,
      slug: algo.path.split('/').pop() || '',
      description: algo.description || '',
      difficulty: algo.difficulty as 'Kolay' | 'Orta' | 'Zor' | undefined,
    }));

    return {
      title: category.label,
      slug: categorySlug,
      description: categoryDescriptions[categorySlug] || `${category.label} kategorisi altındaki algoritmalar.`,
      algorithms,
    };
  });

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
        {algorithmCategories.map((category) => (
          <Card
            key={category.slug}
            className="algorithm-card hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-medium">İçerdiği Algoritmalar:</p>
                <ul className="list-disc pl-5 text-sm text-ash">
                  {category.algorithms.slice(0, 3).map((algo) => (
                    <li key={algo.slug}>{algo.name}</li>
                  ))}
                  {category.algorithms.length > 3 && (
                    <li>
                      <span className="text-arcly-blue">
                        +{category.algorithms.length - 3} daha...
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full relative">
                <Link href={`/algorithms/${category.slug}`}>
                  <span className="absolute inset-0 flex items-center justify-center">
                    Kategoriyi Keşfet
                  </span>
                  <ArrowRight className="absolute right-4 bottom-3 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Tüm Algoritmalar
        </h2>

        <div className="bg-obsidian/30 rounded-sm p-6">
          <div className="space-y-10">
            {algorithmCategories.map((category) => (
              <div key={category.slug} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <Button asChild variant="link" size="sm">
                    <Link href={`/algorithms/${category.slug}`}>
                      Tümünü Gör
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.algorithms.map((algorithm) => (
                    <Card
                      key={algorithm.slug}
                      className="overflow-hidden hover:bg-obsidian/50 transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{algorithm.name}</h4>
                          {algorithm.difficulty && (
                            <Badge
                              variant={difficultyBadgeVariant(
                                algorithm.difficulty
                              )}
                            >
                              {algorithm.difficulty}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-ash mb-4 line-clamp-2">
                          {algorithm.description}
                        </p>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                        >
                          <Link
                            href={`/algorithms/${category.slug}/${algorithm.slug}`}
                            className="flex justify-between items-center gap-3"
                          >
                            <span className="flex-grow text-center">
                              İncele
                            </span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
