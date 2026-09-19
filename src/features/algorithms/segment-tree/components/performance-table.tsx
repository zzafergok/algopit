import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/core/table';

export function PerformanceTable() {
  return (
    <div className="bg-obsidian/40 dark:bg-void-black/20 p-6 rounded-sm">
      <h3 className="text-xl font-bold mb-4 text-titanium dark:text-titanium">
        Performans Karşılaştırması ve Benchmarks
      </h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Algoritma</TableHead>
              <TableHead>Build</TableHead>
              <TableHead>Range Query</TableHead>
              <TableHead>Point Update</TableHead>
              <TableHead>Range Update</TableHead>
              <TableHead>Space</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Naive Array</TableCell>
              <TableCell>O(1)</TableCell>
              <TableCell className="text-alert-red">O(n)</TableCell>
              <TableCell className="text-signal-green">O(1)</TableCell>
              <TableCell className="text-alert-red">O(n)</TableCell>
              <TableCell className="text-signal-green">O(n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Prefix Sum</TableCell>
              <TableCell>O(n)</TableCell>
              <TableCell className="text-signal-green">O(1)</TableCell>
              <TableCell className="text-alert-red">O(n)</TableCell>
              <TableCell className="text-alert-red">O(n)</TableCell>
              <TableCell className="text-signal-green">O(n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Segment Tree</TableCell>
              <TableCell>O(n)</TableCell>
              <TableCell className="text-arcly-blue">O(log n)</TableCell>
              <TableCell className="text-arcly-blue">O(log n)</TableCell>
              <TableCell className="text-arcly-blue">O(log n)</TableCell>
              <TableCell className="text-arcly-blue">O(4n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Fenwick Tree</TableCell>
              <TableCell>O(n)</TableCell>
              <TableCell className="text-arcly-blue">O(log n)</TableCell>
              <TableCell className="text-arcly-blue">O(log n)</TableCell>
              <TableCell className="text-alert-red">O(n log n)</TableCell>
              <TableCell className="text-signal-green">O(n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">√n Decomposition</TableCell>
              <TableCell>O(n)</TableCell>
              <TableCell className="text-arcly-blue">O(√n)</TableCell>
              <TableCell className="text-arcly-blue">O(√n)</TableCell>
              <TableCell className="text-arcly-blue">O(√n)</TableCell>
              <TableCell className="text-signal-green">O(n)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
