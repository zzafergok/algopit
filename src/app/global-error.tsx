'use client';

import { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import '@/styles/globals.css';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global root layout error:', error);
  }, [error]);

  return (
    <html lang="tr" className="dark">
      <body className="flex min-h-screen items-center justify-center bg-background px-4 text-ink">
        <div className="mx-auto max-w-lg border border-red/40 bg-surface p-8 text-center shadow-2xl">
          <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-red uppercase">
            CRITICAL_FAILURE // ROOT_LAYOUT_CRASH
          </div>
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Sistem Düzeyinde Hata Oluştu
          </h1>
          <p className="mb-6 text-sm text-muted">
            Kök yerleşim bileşeni yüklenemedi. Uygulamayı yeniden başlatmayı
            deneyebilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-11 min-h-[44px] min-w-[44px] items-center justify-center gap-2 border border-turquoise bg-turquoise px-4 font-mono text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#38f8e2]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Yeniden Başlat</span>
          </button>
        </div>
      </body>
    </html>
  );
}
