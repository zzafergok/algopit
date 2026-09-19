'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/components/core/link';

const CATEGORY_NAMES: Record<string, string> = {
  'data-structures': 'VERİ YAPILARI',
  sorting: 'SIRALAMA ALGORİTMALARI',
  searching: 'ARAMA ALGORİTMALARI',
  'graph-algorithms': 'GRAF ALGORİTMALARI',
  'dynamic-programming': 'DİNAMİK PROGRAMLAMA',
  backtracking: 'GERİ İZLEME',
  'greedy-algorithms': 'AÇGÖZLÜ ALGORİTMALAR',
  'divide-and-conquer': 'BÖL VE FETHET',
  'string-algorithms': 'METİN İŞLEME',
  'mathematical-algorithms': 'MATEMATİKSEL ALGORİTMALAR',
  'advanced-algorithms': 'İLERİ SEVİYE ALGORİTMALAR',
  'computational-geometry': 'HESAPLAMALI GEOMETRİ',
  'clustering-algorithms': 'KÜMELEME ALGORİTMALARI',
  'optimization-algorithms': 'OPTİMİZASYON ALGORİTMALARI',
  'design-optimization-np': 'NP-ZOR VE TASARIM',
  'advanced-parallel-memory': 'PARALEL VE BELLEK',
  'misc-algorithms': 'ÇEŞİTLİ ALGORİTMALAR',
};

export function AlgorithmsBreadcrumb() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  const isCategory = segments.length === 2 && segments[0] === 'algorithms';
  const isDetail = segments.length >= 3 && segments[0] === 'algorithms';

  let backHref = '/';
  let backLabel = '← ANA SAYFA';

  if (isCategory) {
    backHref = '/algorithms';
    backLabel = '← ALGORİTMALAR DİZİNİ';
  } else if (isDetail) {
    const catSlug = segments[1];
    const catTitle =
      CATEGORY_NAMES[catSlug] || catSlug.toUpperCase().replace(/-/g, ' ');
    backHref = `/algorithms/${catSlug}`;
    backLabel = `← ${catTitle}`;
  }

  return (
    <header className="case-topbar mb-8">
      <Link href={backHref} className="hover:underline text-green font-mono">
        {backLabel}
      </Link>
    </header>
  );
}
