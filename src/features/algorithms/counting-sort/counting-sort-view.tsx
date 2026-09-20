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
import { countingSort } from '@/lib/algorithms/sorting';
import { implementations, countingSortDescription } from './data';
import { CountingSortComparison } from './components/counting-sort-comparison';

export function CountingSortView() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-arcly-blue">
        Counting Sort Algoritması
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Counting Sort Açıklaması</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{countingSortDescription}</p>
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
              title="Counting Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Counting Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Counting Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Counting Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <InteractiveDemo
          title="Counting Sort Demo"
          description="Verdiğiniz pozitif tamsayı dizisi Counting Sort ile sıralanacaktır."
          algorithmFunction={countingSort}
          inputType="array"
          inputPlaceholder="4,2,2,8,3,3,1"
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

      <CountingSortComparison />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/algorithms/sorting/radix-sort"
            className="p-5 border border-line bg-surface hover:border-turquoise transition-colors"
          >
            <h3 className="font-bold text-ink mb-1">Radix Sort</h3>
            <p className="text-sm text-ash">
              Counting Sort'u basamak basamak uygulayan algoritma.
            </p>
          </Link>
          <Link
            href="/algorithms/sorting/quick-sort"
            className="p-5 border border-line bg-surface hover:border-turquoise transition-colors"
          >
            <h3 className="font-bold text-ink mb-1">Quick Sort</h3>
            <p className="text-sm text-ash">
              Genel amaçlı karşılaştırma tabanlı sıralama.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
