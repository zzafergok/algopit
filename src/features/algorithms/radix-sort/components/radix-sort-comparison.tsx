import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/core/table';

export function RadixSortComparison() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Radix Sort ve Diğer Algoritmalar</h2>
      <div className="overflow-x-auto border border-gunmetal rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-obsidian/60">
              <TableHead className="font-bold">Özellik</TableHead>
              <TableHead className="font-bold">Radix Sort</TableHead>
              <TableHead className="font-bold">Counting Sort</TableHead>
              <TableHead className="font-bold">Quick Sort</TableHead>
              <TableHead className="font-bold">Merge Sort</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                Karşılaştırma Yapar mı?
              </TableCell>
              <TableCell>Hayır</TableCell>
              <TableCell>Hayır</TableCell>
              <TableCell>Evet</TableCell>
              <TableCell>Evet</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Zaman Karmaşıklığı</TableCell>
              <TableCell>O(d(n+k))</TableCell>
              <TableCell>O(n+k)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(n log n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Alan Karmaşıklığı</TableCell>
              <TableCell>O(n+k)</TableCell>
              <TableCell>O(n+k)</TableCell>
              <TableCell>O(log n)</TableCell>
              <TableCell>O(n)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Kararlılık</TableCell>
              <TableCell>Kararlı</TableCell>
              <TableCell>Kararlı</TableCell>
              <TableCell>Kararsız</TableCell>
              <TableCell>Kararlı</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Veri Kısıtlamaları</TableCell>
              <TableCell>Sabit boyutlu anahtarlar</TableCell>
              <TableCell>Sınırlı aralıklı tam sayılar</TableCell>
              <TableCell>Yok</TableCell>
              <TableCell>Yok</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-ash mt-2">
        Radix Sort, sınırlı basamak sayısına sahip sayılar için mükemmel bir
        seçimdir ve geniş değer aralıklarında etkilidir.
      </p>
    </div>
  );
}
