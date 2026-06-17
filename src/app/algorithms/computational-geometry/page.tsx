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

export default function ComputationalGeometryPage() {
  const algorithms = createCategoryAlgorithms("/algorithms/computational-geometry");

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Primitives":
        return "default";
      case "Query":
        return "secondary";
      case "Convex Hull":
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
          Hesaplamalı Geometri (Computational Geometry)
        </h1>
        <p className="text-xl text-ash mt-4 max-w-3xl mx-auto">
          Hesaplamalı geometri, geometrik nesnelerin (noktalar, çizgiler, çokgenler vb.) temsili,
          sorgulanması ve analiz edilmesi için kullanılan algoritmaları inceler. Harita servisleri,
          bilgisayarlı grafik, robotik ve fiziksel simülasyonların temel taşıdır.
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
        <h2 className="text-2xl font-bold mb-4">Hesaplamalı Geometri Hakkında</h2>
        <div className="max-w-none space-y-4 text-ash">
          <p>
            Hesaplamalı geometri, geometrik problemlerin bilgisayarlar yardımıyla çözülmesi için algoritmik
            teknikler sunar. 1970\'lerden bu yana hızla gelişen bu disiplin, Coğrafi Bilgi Sistemleri (CBS),
            CAD/CAM tasarımları, tıbbi görüntüleme, bilgisayar grafikleri ve mikroçip üretimi (VLSI tasarımı) gibi
            çok geniş uygulama alanlarına sahiptir.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Temel Alt Alanlar</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-white">Geometrik Sorgular ve Arama (Range Search / Point Location)</h4>
                <p className="text-sm">
                  Düzlemde milyonlarca konum bilgisi arasından belirli bir bölge (aralık) içinde kalanları
                  verimli şekilde süzmeyi veya bir noktanın hangi bölgeye ait olduğunu bulmayı hedefler.
                  2D-Tree ve Quadtree gibi ağaç yapıları bu alanın temel araçlarıdır.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white">Dış Bükey Gövde (Convex Hull)</h4>
                <p className="text-sm">
                  Bir nokta kümesini saran en küçük dış bükey çokgeni çıkarma problemidir. Kümeleme,
                  çarpışma sınırları (collision mesh) belirleme ve örüntü tanıma için kullanılır.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white">Yakınlık ve Mesafe (Proximity)</h4>
                <p className="text-sm">
                  Nokta gruplarındaki en yakın çiftlerin (Closest Pair) doğrusal-logaritmik zamanda tespiti,
                  tüm en yakın komşuların bulunması veya düzlemin hücrelere bölündüğü Voronoi Diyagramları
                  bu problemlerin alt dallarıdır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
