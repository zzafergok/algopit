import Link from 'next/link';

import { ArrowLeft, BookOpen } from 'lucide-react';

import { CodeBlock } from '@/components/common/code-block';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getComplexityName } from '@/lib/utils';
import { DuplicateAlgorithmContent } from '@/lib/duplicate-algorithms';

const categoryLabels: Record<string, string> = {
  sorting: 'Sıralama Algoritmaları',
  searching: 'Arama Algoritmaları',
  'data-structures': 'Veri Yapıları',
  'graph-algorithms': 'Graf Algoritmaları',
  'dynamic-programming': 'Dinamik Programlama',
  backtracking: 'Geri İzleme',
  'greedy-algorithms': 'Açgözlü Algoritmalar',
  'mathematical-algorithms': 'Matematiksel Algoritmalar',
  'string-algorithms': 'Metin İşleme Algoritmaları',
  'advanced-algorithms': 'İleri Seviye Algoritmalar',
  'divide-and-conquer': 'Böl ve Fethet',
};

interface DuplicateAlgorithmPageProps {
  algorithm: DuplicateAlgorithmContent;
}

export function DuplicateAlgorithmPage({
  algorithm,
}: DuplicateAlgorithmPageProps) {
  const categoryHref = `/algorithms/${algorithm.category}`;

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        <Button variant="outline" size="sm" asChild>
          <Link href={categoryHref} className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {categoryLabels[algorithm.category] ?? 'Algoritmalar'}
          </Link>
        </Button>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{algorithm.family}</Badge>
            <Badge variant="outline">{algorithm.difficulty}</Badge>
            {algorithm.sources.map((source) => (
              <Badge key={source} variant="default">
                {source}
              </Badge>
            ))}
          </div>

          <div className="max-w-4xl space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              {algorithm.title}
            </h1>
            <p className="text-lg text-ash leading-relaxed">
              {algorithm.description}
            </p>
          </div>
        </div>
      </div>

      <Card className="border-arcly-blue/20 bg-obsidian/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-arcly-blue" />
            PDF Kaynaklarından Sentez
          </CardTitle>
          <CardDescription>
            docs altındaki duplicate algoritma kaynakları birlikte okunarak
            oluşturulan özet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">{algorithm.synthesis}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full flex-wrap justify-start md:w-auto">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="complexity">Karmaşıklık</TabsTrigger>
          <TabsTrigger value="pseudocode">Pseudo Kod</TabsTrigger>
          <TabsTrigger value="usage">Kullanım</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Çalışma Adımları</CardTitle>
              <CardDescription>
                Algoritmanın kaynaklardan çıkarılan ortak akışı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-5">
                {algorithm.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Avantajlar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  {algorithm.advantages.map((advantage) => (
                    <li key={advantage}>{advantage}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sınırlamalar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  {algorithm.disadvantages.map((disadvantage) => (
                    <li key={disadvantage}>{disadvantage}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="complexity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zaman Karmaşıklığı</CardTitle>
              <CardDescription>
                Girdi boyutu arttıkça beklenen çalışma süresi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {Object.entries(algorithm.timeComplexity).map(
                  ([label, value]) => (
                    <div key={label} className="space-y-2">
                      <h4 className="font-semibold capitalize">{label}</h4>
                      <div className="font-mono text-xl">{value}</div>
                      <p className="text-sm text-ash">
                        {getComplexityName(value).description}
                      </p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alan Karmaşıklığı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-mono text-xl">
                  {algorithm.spaceComplexity}
                </div>
                <p className="text-sm text-ash">
                  {getComplexityName(algorithm.spaceComplexity).description}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pseudocode">
          <CodeBlock
            code={algorithm.pseudocode}
            language="text"
            title={`${algorithm.title} pseudo kod`}
          />
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Uygulama Alanları</CardTitle>
              <CardDescription>
                Bu başlığın pratikte görüldüğü yaygın problemler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                {algorithm.applications.map((application) => (
                  <li key={application}>{application}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
