import Link from "next/link";

import { ArrowRight } from "lucide-react";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createCategoryAlgorithms } from "@/lib/algorithm-category";

export default function StringAlgorithmsPage() {
  const algorithms = createCategoryAlgorithms("/algorithms/string-algorithms");

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Metin İşleme Algoritmaları
        </h1>
        <p className="text-xl text-ash mt-4 max-w-3xl mx-auto">
          Metin işleme algoritmaları, string veriler üzerinde arama, eşleştirme,
          düzenleme ve manipülasyon yapmak için kullanılan özel algoritmalardır.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {algorithms.map((algorithm) => (
          <Card key={algorithm.name} className="algorithm-card">
            <CardHeader>
              <CardTitle>{algorithm.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-ash">{algorithm.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="mt-2">
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
        <h2 className="text-2xl font-bold mb-4">
          Metin İşleme Algoritmaları Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Metin işleme algoritmaları, bilgisayar biliminin önemli bir alanını
            oluşturur ve string verileri üzerinde çeşitli işlemler yapmak için
            kullanılır. Bu algoritmalar, büyük metin verileri içerisinde arama
            yapmak, desen eşleştirmek, metin düzenlemesi yapmak ve metin
            verisini manipüle etmek gibi çeşitli görevleri yerine getirir.
          </p>

          <p className="mt-4">
            Metin işleme algoritmalarının temel kategorileri şunlardır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>String Eşleştirme (String Matching):</strong> Bir metin
              içerisinde belirli bir deseni bulmak için kullanılan algoritmalar.
              Örneğin; Rabin-Karp, KMP (Knuth-Morris-Pratt), Boyer-Moore,
              Z-Algorithm.
            </li>
            <li>
              <strong>Düzenleme Mesafesi (Edit Distance):</strong> İki metinin
              birbirine ne kadar benzediğini veya farklı olduğunu ölçen
              algoritmalar. Örneğin; Levenshtein Distance, Hamming Distance.
            </li>
            <li>
              <strong>Kompresyon (Compression):</strong> Metni daha az alanda
              saklamak için kullanılan algoritmalar. Örneğin; Huffman Coding,
              Lempel-Ziv-Welch (LZW).
            </li>
            <li>
              <strong>Regex Motoru:</strong> Düzenli ifadeler kullanarak metin
              arama ve eşleştirme yapmak için kullanılan algoritmalar.
            </li>
          </ul>

          <p className="mt-4">
            Metin işleme algoritmalarının performansı genellikle şu faktörlere
            göre değerlendirilir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Zaman Karmaşıklığı:</strong> Algoritmanın çalışma süresi
              (En kötü, ortalama ve en iyi durum)
            </li>
            <li>
              <strong>Alan Karmaşıklığı:</strong> Algoritmanın bellek kullanımı
            </li>
            <li>
              <strong>Ön İşleme Süresi:</strong> Algoritmanın veriyi işlemeye
              başlamadan önce gerekli ön hazırlık süresi
            </li>
          </ul>

          <p className="mt-4">
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

          <p className="mt-4">
            Doğru metin işleme algoritmasını seçmek, uygulamanın performansını
            ve verimliliğini doğrudan etkiler. Özellikle büyük veri setleriyle
            çalışırken, verimli metin işleme algoritmaları kullanmak önemlidir.
            Örneğin, Boyer-Moore algoritması büyük metinlerde desen aramak için
            oldukça verimli olabilirken, KMP algoritması kısa desenleri aramak
            için daha uygun olabilir.
          </p>
        </div>
      </div>
    </div>
  );
}
