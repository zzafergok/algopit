'use client';

import React from 'react';
import { Link } from '@/components/core/link';
import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { mergeSort } from '@/lib/algorithms/sorting';
import { implementations, mergeSortDescription } from './data';
import { MergeSortComparison } from './components/merge-sort-comparison';

export function MergeSortView() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-arcly-blue">
        Merge Sort Algoritması
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Merge Sort Açıklaması</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{mergeSortDescription}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <Tabs defaultValue="javascript">
          <TabsList>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>
          <TabsContent value="javascript">
            <CodeBlock
              code={implementations.javascript}
              language="javascript"
              title="Merge Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Merge Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Merge Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Merge Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <InteractiveDemo
          title="Merge Sort Demo"
          description="Verdiğiniz dizi Merge Sort algoritması ile sıralanacaktır."
          algorithmFunction={mergeSort}
          inputType="array"
          inputPlaceholder="38,27,43,3,9,82,10"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
            </div>
          )}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Analizi</h2>
        <Card>
          <CardHeader>
            <CardTitle>Zaman ve Alan Karmaşıklığı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Zaman Karmaşıklığı</h3>
                <p>
                  En İyi: <code>O(n log n)</code> | Ortalama:{' '}
                  <code>O(n log n)</code> | En Kötü: <code>O(n log n)</code>
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code>O(n)</code> - Birleştirme işlemi için yardımcı dizi
                  gerekir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <MergeSortComparison />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/algorithms/sorting/tim-sort"
            className="p-5 border border-line bg-surface hover:border-turquoise transition-colors"
          >
            <h3 className="font-bold text-ink mb-1">Timsort</h3>
            <p className="text-sm text-ash">
              Merge Sort ve Insertion Sort hibriti.
            </p>
          </Link>
          <Link
            href="/algorithms/sorting/quick-sort"
            className="p-5 border border-line bg-surface hover:border-turquoise transition-colors"
          >
            <h3 className="font-bold text-ink mb-1">Quick Sort</h3>
            <p className="text-sm text-ash">
              Böl ve fethet mantığıyla çalışan yerinde sıralama.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
