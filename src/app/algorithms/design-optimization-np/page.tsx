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

export default function DesignOptimizationNpPage() {
  const algorithms = createCategoryAlgorithms("/algorithms/design-optimization-np");

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Branch & Bound":
        return "default";
      case "TSP & Local Search":
        return "secondary";
      case "Knapsack":
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
          Tasarım, Optimizasyon ve NP Algoritmaları
        </h1>
        <p className="text-xl text-ash mt-4 max-w-3xl mx-auto">
          Optimizasyon algoritmaları, kaynak sınırları dahilinde en verimli, en ucuz veya en kazançlı çözümü
          üretmeyi hedefler. Kombinatoryal optimizasyon, karar ağaçları, TSP sezgiselleri ve NP-Zor problemleri
          çözmek için kullanılan arama stratejilerini kapsar.
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
        <h2 className="text-2xl font-bold mb-4">Tasarım, Optimizasyon ve NP Hakkında</h2>
        <div className="max-w-none space-y-4 text-ash">
          <p>
            Tasarım ve optimizasyon algoritmaları bilgisayar bilimlerindeki en karmaşık ve pratik öneme sahip alanlardan biridir.
            Üretim planlama, lojistik dağıtım rotaları, çip tasarımı, bütçe optimizasyonları ve yapay zeka karar ağaçları
            doğrudan bu yöntemlere dayanır.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Temel Tasarım Şemaları</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-white">Dallanıp Sınırlandırma (Branch and Bound)</h4>
                <p className="text-sm">
                  Çözüm ağacında suboptimal alt dalları budayarak tam sayımlı kesin en iyi sonuçları arar.
                  Arama uzayını daraltmak için sürekli alt/üst limit değerlendirmeleri yapar.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white">Gezgin Satıcı ve Yerel Arama (TSP & Local Search)</h4>
                <p className="text-sm">
                  Komşuluk ilişkilerini kullanarak mevcut bir çözümü yerel modifikasyonlarla (2-Opt gibi) sürekli
                  olarak iyileştiren hızlı sezgisel yöntemlerdir. Kapsamlı aramaya göre katbekat hızlıdır.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white">NP-Zor ve SAT Çözücüler</h4>
                <p className="text-sm">
                  NP-Zor problemler polinomsal zamanda kesin çözülemeyen problemleri ifade eder. SAT (Boolean
                  Satisfiability) ise Boolean ifadelerinin mantıksal olarak doğru kılınıp kılınamayacağını
                  dönüşümlü karar ağaçlarıyla çözen temel optimizasyon problemidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
