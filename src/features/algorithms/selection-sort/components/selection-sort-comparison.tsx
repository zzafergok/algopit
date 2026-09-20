import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/core/table';

export function SelectionSortComparison() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Selection Sort vs Bubble Sort</h2>
      <div className="overflow-x-auto border border-gunmetal rounded-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-obsidian/60">
              <TableHead className="font-bold">Özellik</TableHead>
              <TableHead className="font-bold">Selection Sort</TableHead>
              <TableHead className="font-bold">Bubble Sort</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Takas İşlemi</TableCell>
              <TableCell>En fazla (n-1) takas yapar</TableCell>
              <TableCell>En kötü durumda n*(n-1)/2 takas yapar</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Karmaşıklık (En İyi Durum)
              </TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>O(n) - Zaten sıralı veri için</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Karmaşıklık (En Kötü Durum)
              </TableCell>
              <TableCell>O(n²)</TableCell>
              <TableCell>O(n²)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Kararlılık</TableCell>
              <TableCell>Kararsız</TableCell>
              <TableCell>Kararlı</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Erken Çıkış</TableCell>
              <TableCell>Yok - Her zaman tüm diziyi tarar</TableCell>
              <TableCell>Var - Sıralı durumda erken sonlanabilir</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <p className="text-sm text-ash mt-2">
        Selection Sort, takas maliyetinin yüksek olduğu senaryolarda Bubble
        Sort'a göre çok daha az takas yapar.
      </p>
    </div>
  );
}
