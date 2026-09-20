'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/core/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors for telemetry/debugging
    console.error('App runtime error caught by boundary:', error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-xl border border-red/40 bg-surface p-8 shadow-2xl sm:p-12">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center border border-red/60 bg-red/10 text-red">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="mb-2 font-mono text-xs font-semibold tracking-wider text-red uppercase">
          RUNTIME_ERROR // EXECUTION_HALTED
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Bir Şeyler Ters Gitti
        </h1>

        <p className="mb-6 text-sm leading-relaxed text-muted sm:text-base">
          Algoritma görselleştirme veya sayfa bileşenleri işlenirken beklenmeyen
          bir hata oluştu. Çalışma zamanı durumunu sıfırlamayı deneyebilirsiniz.
        </p>

        {error.digest && (
          <div className="mb-6 rounded-none border border-line bg-surface-raised px-4 py-2 font-mono text-xs text-muted">
            Hata Kodu (Digest): {error.digest}
          </div>
        )}

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={() => reset()}
            variant="default"
            className="w-full sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              <span>Yeniden Dene</span>
            </span>
          </Button>
          <Button asChild variant="outline" className="w-full sm:w-auto">
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Ana Sayfaya Dön</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
