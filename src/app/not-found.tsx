import Link from 'next/link';
import { Terminal, Home, Compass } from 'lucide-react';
import { Button } from '@/components/core/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-xl border border-line bg-surface p-8 shadow-2xl sm:p-12">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center border border-line-strong bg-surface-raised text-turquoise">
          <Terminal className="h-8 w-8" />
        </div>

        <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-turquoise uppercase">
          ERR_404 // NULL_POINTER_EXCEPTION
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Sayfa veya Algoritma Bulunamadı
        </h1>

        <p className="mb-8 text-sm leading-relaxed text-muted sm:text-base">
          Aradığınız algoritma, veri yapısı veya sayfa dizinde mevcut değil ya
          da taşınmış olabilir. Arama ağacını sıfırlayarak ana sayfaya dönebilir
          veya algoritmalar kataloğuna göz atabilirsiniz.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild variant="default" className="w-full sm:w-auto">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/algorithms" className="inline-flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span>Algoritmaları Keşfet</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
