'use client';

import React from 'react';
import { Network, TreePine } from 'lucide-react';
import { Graph, GraphEdge } from '@/lib/algorithms/graph';
import { AlgorithmStats } from './types';

interface MSTInfoCardsProps {
  algorithmType: 'kruskal' | 'prim';
  mstEdges: GraphEdge[];
  currentStep: number;
  totalSteps: number;
  totalMSTWeight: number;
  nodeCount: number;
  graph: Graph;
  algorithmStats: AlgorithmStats;
}

export function MSTInfoCards({
  algorithmType,
  mstEdges,
  currentStep,
  totalSteps,
  totalMSTWeight,
  nodeCount,
  graph,
  algorithmStats,
}: MSTInfoCardsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Kenar Renkleri</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-arcly-blue"></div>
              <span>MST'de bulunan kenar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-signal-green"></div>
              <span>Şu anda eklenen kenar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-alert-red border-dashed border border-alert-red"></div>
              <span>Reddedilen kenar (döngü oluşturur)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-arcly-blue"></div>
              <span>İncelenen kenar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-gunmetal/60"></div>
              <span>Normal kenar</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Düğüm Renkleri</h4>
          <div className="space-y-1 text-sm">
            {algorithmType === 'prim' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-signal-green/20 border-2 border-signal-green rounded-full"></div>
                  <span>Başlangıç düğümü</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-arcly-blue/20 border-2 border-arcly-blue rounded-full"></div>
                  <span>MST'ye bağlı düğüm</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-card border-2 border-gunmetal rounded-full"></div>
              <span>Normal düğüm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-obsidian/60 rounded-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Network className="w-5 h-5" />
            Kruskal's Algorithm
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Zaman Karmaşıklığı:</strong> O(E log E)
            </p>
            <p>
              <strong>Alan Karmaşıklığı:</strong> O(V)
            </p>
            <p>
              <strong>Yaklaşım:</strong> Kenar tabanlı, Union-Find kullanır
            </p>
            <p>
              <strong>Çalışma Prensibi:</strong> Tüm kenarları ağırlığa göre
              sıralar, döngü oluşturmayan en küçük kenarları ekler
            </p>
            <p>
              <strong>Avantaj:</strong> Sparse graflarda verimli
            </p>
          </div>
        </div>

        <div className="p-4 bg-obsidian/60 rounded-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TreePine className="w-5 h-5" />
            Prim's Algorithm
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Zaman Karmaşıklığı:</strong> O(E log V)
            </p>
            <p>
              <strong>Alan Karmaşıklığı:</strong> O(V)
            </p>
            <p>
              <strong>Yaklaşım:</strong> Düğüm tabanlı, öncelik kuyruğu kullanır
            </p>
            <p>
              <strong>Çalışma Prensibi:</strong> Bir düğümden başlar, her adımda
              MST'ye en yakın düğümü ekler
            </p>
            <p>
              <strong>Avantaj:</strong> Dense graflarda verimli
            </p>
          </div>
        </div>
      </div>

      {mstEdges.length > 0 && currentStep >= totalSteps - 1 && (
        <div className="p-4 bg-signal-green/10 rounded-sm border border-signal-green/30">
          <h3 className="text-lg font-semibold text-signal-green mb-3">
            Minimum Spanning Tree Tamamlandı!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-signal-green">
                MST Kenarları:
              </span>
              <div className="mt-1">
                {mstEdges.map((edge, index) => (
                  <div key={index} className="text-signal-green">
                    {edge.from} ↔ {edge.to} (ağırlık: {edge.weight})
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium text-signal-green">
                Toplam Ağırlık:
              </span>
              <div className="text-2xl font-bold text-signal-green">
                {totalMSTWeight}
              </div>
            </div>
            <div>
              <span className="font-medium text-signal-green">
                İstatistikler:
              </span>
              <div className="text-signal-green">
                <div>
                  {nodeCount} düğüm, {mstEdges.length} kenar
                </div>
                <div>
                  Toplam {graph.edges.length} kenardan{' '}
                  {algorithmStats.edgesConsidered} tanesi incelendi
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
