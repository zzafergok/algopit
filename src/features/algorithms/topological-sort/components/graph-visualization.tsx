'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';

export type Graph = {
  [key: string]: string[];
};

interface GraphVisualizationProps {
  graph: Graph;
  sortedNodes: string[];
  hasCycle: boolean;
}

export const GraphVisualization: React.FC<GraphVisualizationProps> = ({
  graph,
  sortedNodes,
  hasCycle,
}) => {
  const orderedNodes = [...sortedNodes];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Graf Yapısı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(graph).map(([node, neighbors]) => (
              <div
                key={node}
                className="flex items-center gap-3 p-2.5 rounded-lg border border-border/40 bg-muted/20"
              >
                <div className="w-9 h-9 rounded-full bg-arcly-blue flex items-center justify-center text-arcly-blue-foreground font-bold text-sm">
                  {node}
                </div>
                <div className="text-sm font-mono text-muted-foreground">
                  → {neighbors.length > 0 ? neighbors.join(', ') : '(yok)'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Topolojik Sıralama Sonucu</CardTitle>
        </CardHeader>
        <CardContent>
          {hasCycle ? (
            <div className="p-3 rounded-md bg-alert-red/10 border border-alert-red/20 text-alert-red font-medium text-sm">
              Graf çevrim içeriyor! Topolojik sıralama yalnızca çevrimsiz yönlü
              graflarda (DAG) mümkündür.
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap gap-2 items-center">
                {orderedNodes.map((node, index) => (
                  <React.Fragment key={node}>
                    <div className="w-10 h-10 rounded-full bg-signal-green flex items-center justify-center text-titanium font-bold shadow-sm">
                      {node}
                    </div>
                    {index < orderedNodes.length - 1 && (
                      <span className="text-muted-foreground font-bold text-base">
                        →
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="mt-4 text-xs text-ash">
                Bu sıralama, her düğümün kendi tüm bağımlılıklarından sonra
                geldiği bir düzeni gösterir. Bir DAG için birden fazla geçerli
                topolojik sıralama olabilir.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
