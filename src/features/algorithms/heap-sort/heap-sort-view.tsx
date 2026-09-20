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
import { heapSort } from '@/lib/algorithms/sorting';
import { implementations, heapSortDescription } from './data';
import { HeapSortComparison } from './components/heap-sort-comparison';

export function HeapSortView() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-arcly-blue">
        Heap Sort Algoritması
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Heap Sort Açıklaması</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{heapSortDescription}</p>
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
              title="Heap Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Heap Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Heap Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Heap Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <InteractiveDemo
          title="Heap Sort Demo"
          description="Verdiğiniz dizi Heap Sort ile sıralanacaktır."
          algorithmFunction={heapSort}
          inputType="array"
          inputPlaceholder="4,10,3,5,1"
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

      <HeapSortComparison />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/algorithms/sorting/quick-sort"
            className="p-5 border border-line bg-surface hover:border-turquoise transition-colors"
          >
            <h3 className="font-bold text-ink mb-1">Quick Sort</h3>
            <p className="text-sm text-ash">
              Pratik sıralamada hızlı böl ve fethet.
            </p>
          </Link>
          <Link
            href="/algorithms/sorting/merge-sort"
            className="p-5 border border-line bg-surface hover:border-turquoise transition-colors"
          >
            <h3 className="font-bold text-ink mb-1">Merge Sort</h3>
            <p className="text-sm text-ash">Kararlı O(n log n) sıralama.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
