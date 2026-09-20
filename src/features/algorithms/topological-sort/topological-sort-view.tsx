'use client';

import React, { useState } from 'react';
import { Label } from '@/components/core/label';
import { Button } from '@/components/core/button';
import { Textarea } from '@/components/core/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';
import { AlgorithmExplanation } from '@/components/common/explanation';
import {
  GraphVisualization,
  type Graph,
} from './components/graph-visualization';
import { pseudocode, implementations } from './data';

function topologicalSort(graph: Graph): {
  result: string[];
  hasCycle: boolean;
} {
  const visited: Record<string, boolean> = {};
  const tempVisited: Record<string, boolean> = {};
  const result: string[] = [];
  let hasCycle = false;

  const nodes = Object.keys(graph);

  function dfs(node: string) {
    if (tempVisited[node]) {
      hasCycle = true;
      return;
    }

    if (visited[node]) {
      return;
    }

    tempVisited[node] = true;

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      dfs(neighbor);
    }

    visited[node] = true;
    tempVisited[node] = false;

    result.unshift(node);
  }

  for (const node of nodes) {
    if (!visited[node]) {
      dfs(node);
    }
  }

  return { result, hasCycle };
}

const INITIAL_INPUT = 'A:C,D\nB:D\nC:E\nD:E\nE:';

export function TopologicalSortView() {
  const [graph, setGraph] = useState<Graph>({
    A: ['C', 'D'],
    B: ['D'],
    C: ['E'],
    D: ['E'],
    E: [],
  });
  const [graphInput, setGraphInput] = useState<string>(INITIAL_INPUT);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sortResult, setSortResult] = useState<{
    result: string[];
    hasCycle: boolean;
  }>({
    result: ['B', 'A', 'D', 'C', 'E'],
    hasCycle: false,
  });

  const handleRunAlgorithm = () => {
    try {
      setErrorMessage(null);
      const parsedGraph: Graph = {};
      const lines = graphInput.trim().split('\n');

      for (const line of lines) {
        if (!line.trim()) continue;

        const [node, neighborsStr] = line.split(':');
        if (!node) {
          throw new Error(
            "Geçersiz format. Her satırda 'Düğüm:Komşu1,Komşu2' formatını kullanın.",
          );
        }

        const trimmedNode = node.trim();
        parsedGraph[trimmedNode] = [];

        if (neighborsStr && neighborsStr.trim()) {
          const neighbors = neighborsStr
            .split(',')
            .map((n) => n.trim())
            .filter(Boolean);
          parsedGraph[trimmedNode] = neighbors;
        }
      }

      if (Object.keys(parsedGraph).length === 0) {
        throw new Error('Graf boş olamaz. En az bir düğüm belirtin.');
      }

      for (const neighbors of Object.values(parsedGraph)) {
        for (const neighbor of neighbors) {
          if (!parsedGraph[neighbor]) {
            parsedGraph[neighbor] = [];
          }
        }
      }

      setGraph(parsedGraph);
      const res = topologicalSort(parsedGraph);
      setSortResult(res);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Bir hata oluştu!',
      );
    }
  };

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            İnteraktif Graf Yapılandırması
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="graph-input">
              Graf Komşuluk Listesi (Her satıra `Düğüm:Komşu1,Komşu2`)
            </Label>
            <Textarea
              id="graph-input"
              value={graphInput}
              onChange={(e) => setGraphInput(e.target.value)}
              rows={5}
              className="font-mono text-sm"
              placeholder={'A:C,D\nB:D\nC:E\nD:E\nE:'}
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-alert-red">{errorMessage}</p>
          )}

          <div className="flex gap-2">
            <Button onClick={handleRunAlgorithm}>Sıralamayı Çalıştır</Button>
            <Button
              variant="outline"
              onClick={() => {
                setGraphInput(INITIAL_INPUT);
                setErrorMessage(null);
              }}
            >
              Varsayılana Sıfırla
            </Button>
          </div>
        </CardContent>
      </Card>

      <GraphVisualization
        graph={graph}
        sortedNodes={sortResult.result}
        hasCycle={sortResult.hasCycle}
      />

      <AlgorithmExplanation
        title="Topolojik Sıralama (Topological Sort) Algoritması"
        description="Topolojik sıralama, yönlü asiklik graflarda (DAG) düğümleri bağımlılıklarına göre sıralayan bir algoritmadır. Her düğüm, kendisine bağımlı olan düğümlerden önce gelecek şekilde bir doğrusal sıralama oluşturur. Bu algoritma, görev planlaması, derleme sırası, kurs ön koşulları gibi bağımlılık yönetimi gerektiren birçok alanda kullanılır."
        timeComplexity={{
          best: 'O(V + E)',
          average: 'O(V + E)',
          worst: 'O(V + E)',
        }}
        spaceComplexity="O(V)"
        advantages={[
          'Doğrusal zaman karmaşıklığı (O(V + E) - Düğüm ve kenar sayısıyla orantılı)',
          'Bağımlılık ilişkilerini doğru şekilde yönetir',
          'Çevrimleri (döngüleri) tespit edebilir',
          'Derleme sırası, görev planlaması gibi birçok gerçek dünya problemine uygulanabilir',
          'DFS algoritmasının doğal bir uzantısıdır',
        ]}
        disadvantages={[
          'Yalnızca yönlü asiklik graflar (DAG) için kullanılabilir',
          'Çevrimli graflar için kullanılamaz',
          'Birden fazla geçerli topolojik sıralama olabilir (tek bir doğru çözüm yoktur)',
          'Yüksek öncelikli görevleri belirleme konusunda yetersiz kalabilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Derleme sistemi bağımlılıkları (Make, Maven, Gradle)',
          'Görev planlama ve iş akışı yönetimi',
          'Üniversitelerde ders/program planlaması',
          'Yazılım paket bağımlılıklarının yönetimi',
          'Veri işleme sırası ve pipeline optimizasyonu',
          'Kritik yol analizi (PERT/CPM)',
          'Statik kod analizi (sembol çözümleme)',
        ]}
        codeExamples={implementations}
        defaultCodeTab="typescript"
      />
    </div>
  );
}
