import React from 'react';

export function BenchmarkHardwareSpecs() {
  return (
    <div className="status-card mt-3.5 border border-line bg-surface shadow-[0.35rem_0.35rem_0_rgba(0,0,0,0.45)]">
      <div className="window-titlebar bg-gradient-to-r from-[#2c1e17] to-[#1a120e] px-3 py-1.5 border-b border-line text-xs text-ink font-mono font-bold flex justify-between">
        <span>ENGINE_SPECS.SYS</span>
        <span className="text-turquoise font-normal text-2xs">
          // VER: 2.0-STABLE
        </span>
      </div>
      <dl className="p-3 text-xs font-mono space-y-1.5">
        <div className="flex justify-between border-b border-dashed border-line/70 pb-1">
          <dt className="text-quiet font-bold">MOTOR</dt>
          <dd className="text-ink">Next.js 16 (Turbopack Engine)</dd>
        </div>
        <div className="flex justify-between border-b border-dashed border-line/70 pb-1">
          <dt className="text-quiet font-bold">MODÜL</dt>
          <dd className="text-turquoise font-semibold">
            137 Algoritma & Veri Yapısı
          </dd>
        </div>
        <div className="flex justify-between border-b border-dashed border-line/70 pb-1">
          <dt className="text-quiet font-bold">GECİKME</dt>
          <dd className="text-ink">&lt; 0.01 ms (In-Memory Simulation)</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-quiet font-bold">DURUM</dt>
          <dd className="text-turquoise font-bold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-turquoise inline-block" />
            SİSTEM HAZIR // STABİL
          </dd>
        </div>
      </dl>
    </div>
  );
}
