import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/core/table';

export function CountingSortComparison() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Counting Sort ve Diğer Algoritmalar
      </h2>
      <div className="overflow-x-auto border border-gunmetal rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-obsidian/60">
              <TableHead className="font-bold">Özellik</TableHead>
              <TableHead className="font-bold">Counting Sort</TableHead>
              <TableHead className="font-bold">Quick Sort</TableHead>
              <TableHead className="font-bold">Radix Sort</TableHead>
              <TableHead className="font-bold">Bucket Sort</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                Karşılaştırma Yapar mı?
              </TableCell>
              <TableCell>Hayır</TableCell>
              <TableCell>Evet</TableCell>
              <TableCell>Hayır</TableCell>
              <TableCell>Kısmen</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Zaman Karmaşıklığı</TableCell>
              <TableCell>O(n+k)</TableCell>
              <TableCell>O(n log n)</TableCell>
              <TableCell>O(d(n+k))</TableCell>
              <TableCell>O(n+k)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Alan Karmaşıklığı</TableCell>
              <TableCell>O(n+k)</TableCell>
              <TableCell>O(log n)</TableCell>
              <TableCell>O(n+k)</TableCell>
              <TableCell>O(n+k)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Kararlılık</TableCell>
              <TableCell>Kararlı</TableCell>
              <TableCell>Kararsız</TableCell>
              <TableCell>Kararlı</TableCell>
              <TableCell>Değişken</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Veri Kısıtlamaları</TableCell>
              <TableCell>Sınırlı aralıklı tam sayılar</TableCell>
              <TableCell>Yok</TableCell>
              <TableCell>Sabit boyutlu anahtarlar</TableCell>
              <TableCell>Düzgün dağılımlı veriler</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-ash mt-2">
        Counting Sort, sınırlı aralıktaki tam sayılar için O(n+k) lineer süre
        ile mükemmel verim sunar.
      </p>
    </div>
  );
}
