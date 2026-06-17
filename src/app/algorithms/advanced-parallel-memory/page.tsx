import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardTitle,
  CardFooter,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createCategoryAlgorithms } from "@/lib/algorithm-category";

export default function AdvancedParallelMemoryPage() {
  const algorithms = createCategoryAlgorithms("/algorithms/advanced-parallel-memory");

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "FFT":
        return "default";
      case "Parallel Networks":
        return "secondary";
      case "Riddles":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case "Kolay":
        return "success";
      case "Orta":
        return "warning";
      case "Zor":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Gelişmiş, Paralel ve Bellek Yönetimi Algoritmaları
        </h1>
        <p className="text-xl text-ash mt-4 max-w-3xl mx-auto">
          Bu bölüm, Hızlı Fourier Dönüşümü (FFT), paralel donanım sıralama ağları,
          büyük sayılar için divide-and-conquer çarpımı, doğrusal programlama Simplex yöntemi ve Buddy sistem gibi
          bellek/GC yöneticileri içeren gelişmiş mimari düzeyindeki algoritmaları kapsar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {algorithms.map((algorithm) => (
          <Card
            key={algorithm.name}
            className="algorithm-card flex flex-col hover:border-arcly-blue/30 transition-colors"
          >
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-lg leading-tight">
                  {algorithm.name}
                </CardTitle>
                <div className="flex gap-2 flex-wrap">
                  {algorithm.category && (
                    <Badge
                      variant={getCategoryBadgeVariant(algorithm.category)}
                      className="text-xs"
                    >
                      {algorithm.category}
                    </Badge>
                  )}
                  {algorithm.difficulty && (
                    <Badge
                      variant={getDifficultyBadgeVariant(algorithm.difficulty)}
                      className="text-xs"
                    >
                      {algorithm.difficulty}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm text-ash leading-relaxed">
                {algorithm.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link
                  href={algorithm.path}
                  className="flex justify-between items-center gap-3"
                >
                  <span className="flex-grow text-center">İncele</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-obsidian/60 rounded-sm">
        <h2 className="text-2xl font-bold mb-4">Gelişmiş, Paralel ve Bellek Yönetimi Hakkında</h2>
        <div className="max-w-none space-y-4 text-ash">
          <p>
            Gelişmiş ve paralel algoritmalar modern bilgisayarların donanımsal yeteneklerinden (çok çekirdekli işlemciler, GPU'lar,
            ASIC ve FPGA çipleri) maksimum verim almak üzere kurgulanır. Bellek yönetimi algoritmaları ise donanımın en kısıtlı kaynağı
            olan RAM'in en az parçalanmayla (fragmentation) yönetilmesini sağlar.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Temel Konular</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-white">Paralel Karşılaştırma Ağları (Sorting Networks)</h4>
                <p className="text-sm">
                  Batcher'ın Bitonik Sıralama ağı gibi yapılar, if/else dallanmaları içermediği için doğrudan
                  elektronik devrelerle (FPGA) donanımsallaştırılabilir. Tüm karşılaştırıcılar paralel kablo gruplarında aynı anda tetiklenir.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white">Büyük Sayı ve Sinyal İşleme</h4>
                <p className="text-sm">
                  FFT, sinyalleri zamandan frekans genliğine geçirerek sıkıştırma, gürültü ayıklama ve hızlı polinom çarpımında
                  temel taş işlevi görür. Karatsuba ise büyük tamsayı çarpımlarını polinomsal alt dereceye düşürür.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white">İşletim Sistemleri ve Zaman Bellek Yönetimi</h4>
                <p className="text-sm">
                  Buddy bellek tahsisi, komşu (buddy) bellek bloklarının serbest bırakıldıklarında anında birleşip
                  tek bir büyük alana (coalescing) dönüşmesini yönetir. GC algoritmaları ise erişilemeyen dairesel referanslı
                  bellek düğümlerini temizler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
