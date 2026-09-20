import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/core/table';

export function HeapSortComparison() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Heap Sort ve Diğer Algoritmalar</h2>
      <div className="overflow-x-auto border border-gunmetal rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-obsidian/60">
              <TableHead className="font-bold">Özellik</TableHead>
              <TableHead className="font-bold">Heap Sort</TableHead>
              <TableHead className="font-bold">Quick Sort</TableHead>
              <TableHead className="font-bold">Merge Sort</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">En İyi Durum</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n log n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">En Kötü Durum</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>O(n log n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Alan Karmaşıklığı</TableCell>
              <TableCell>O(1)</TableCell>
              <TableCell>O(log n)</TableCell>
              <TableCell>O(n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Kararlılık</TableCell>
              <TableCell>Kararsız</TableCell>
              <TableCell>Kararsız</TableCell>
              <TableCell>Kararlı</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Önbellek Verimliliği
              </TableCell>
              <TableCell>Düşük</TableCell>
              <TableCell>Yüksek</TableCell>
              <TableCell>Orta</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-ash mt-2">
        Heap Sort her durumda O(n log n) karmaşıklık garantisi ve O(1) yardımcı
        bellek sağlar.
      </p>
    </div>
  );
}
