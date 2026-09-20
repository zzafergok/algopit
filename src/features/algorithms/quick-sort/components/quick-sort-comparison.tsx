import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/core/table';

export function QuickSortComparison() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Diğer Algoritmalarla Karşılaştırma</h2>
      <div className="overflow-x-auto border border-gunmetal rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-obsidian/60">
              <TableHead className="font-bold">Özellik</TableHead>
              <TableHead className="font-bold">Quick Sort</TableHead>
              <TableHead className="font-bold">Merge Sort</TableHead>
              <TableHead className="font-bold">Heap Sort</TableHead>
              <TableHead className="font-bold">Insertion Sort</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">En İyi Durum</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Ortalama Durum</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n²)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">En Kötü Durum</TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n²)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Alan Karmaşıklığı</TableCell>
              <TableCell>O(log n)</TableCell>
              <TableCell>O(n)</TableCell>
              <TableCell>O(1)</TableCell>
              <TableCell>O(1)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Kararlılık</TableCell>
              <TableCell>Kararsız</TableCell>
              <TableCell>Kararlı</TableCell>
              <TableCell>Kararsız</TableCell>
              <TableCell>Kararlı</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Önbellek Dostu</TableCell>
              <TableCell>Yüksek</TableCell>
              <TableCell>Orta</TableCell>
              <TableCell>Düşük</TableCell>
              <TableCell>Yüksek</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Pratik Performans</TableCell>
              <TableCell>Çok İyi</TableCell>
              <TableCell>İyi</TableCell>
              <TableCell>İyi</TableCell>
              <TableCell>Küçük veri setleri için iyi</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-ash mt-2">
        Quick Sort, pratik uygulamalarda genellikle en iyi performansı gösteren
        sıralama algoritmasıdır.
      </p>
    </div>
  );
}
