import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/core/table';

export function InsertionSortComparison() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Insertion Sort ve Diğer Algoritmalar
      </h2>
      <div className="overflow-x-auto border border-gunmetal rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-obsidian/60">
              <TableHead className="font-bold">Özellik</TableHead>
              <TableHead className="font-bold">Insertion Sort</TableHead>
              <TableHead className="font-bold">Bubble Sort</TableHead>
              <TableHead className="font-bold">Selection Sort</TableHead>
              <TableHead className="font-bold">Quick Sort</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">En İyi Durum</TableCell>
              <TableCell>O(n)</TableCell>
              <TableCell>O(n)</TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>O(n log n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">En Kötü Durum</TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>O(n²)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Alan Karmaşıklığı</TableCell>
              <TableCell>O(1)</TableCell>
              <TableCell>O(1)</TableCell>
              <TableCell>O(1)</TableCell>
              <TableCell>O(log n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Kararlılık</TableCell>
              <TableCell>Kararlı</TableCell>
              <TableCell>Kararlı</TableCell>
              <TableCell>Kararsız</TableCell>
              <TableCell>Kararsız</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Uyarlanabilirlik</TableCell>
              <TableCell>Yüksek</TableCell>
              <TableCell>Düşük</TableCell>
              <TableCell>Yok</TableCell>
              <TableCell>Kısmen</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-ash mt-2">
        Insertion Sort, özellikle kısmen sıralı veya küçük veri setleri için
        oldukça verimlidir.
      </p>
    </div>
  );
}
