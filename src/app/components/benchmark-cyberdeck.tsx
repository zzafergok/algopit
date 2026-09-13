'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Terminal } from 'lucide-react';

interface BenchmarkResult {
  name: string;
  complexity: string;
  time: number;
  bars: number;
  status: 'OPTIMAL' | 'NORMAL' | 'SLOW' | 'CRITICAL';
  diff: string;
}

const BENCHMARK_DATA: Record<string, Record<string, BenchmarkResult[]>> = {
  sorting: {
    '1K': [
      {
        name: 'QuickSort (Hoare)',
        complexity: 'O(n log n)',
        time: 0.08,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'MergeSort',
        complexity: 'O(n log n)',
        time: 0.12,
        bars: 12,
        status: 'NORMAL',
        diff: '+50%',
      },
      {
        name: 'HeapSort',
        complexity: 'O(n log n)',
        time: 0.18,
        bars: 9,
        status: 'SLOW',
        diff: '+125%',
      },
      {
        name: 'BubbleSort',
        complexity: 'O(n²)',
        time: 1.84,
        bars: 2,
        status: 'CRITICAL',
        diff: '+2200%',
      },
    ],
    '10K': [
      {
        name: 'QuickSort (Hoare)',
        complexity: 'O(n log n)',
        time: 0.42,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'MergeSort',
        complexity: 'O(n log n)',
        time: 0.58,
        bars: 13,
        status: 'NORMAL',
        diff: '+38%',
      },
      {
        name: 'HeapSort',
        complexity: 'O(n log n)',
        time: 0.89,
        bars: 8,
        status: 'SLOW',
        diff: '+112%',
      },
      {
        name: 'BubbleSort',
        complexity: 'O(n²)',
        time: 14.8,
        bars: 2,
        status: 'CRITICAL',
        diff: '+3420%',
      },
    ],
    '100K': [
      {
        name: 'QuickSort (Hoare)',
        complexity: 'O(n log n)',
        time: 4.65,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'MergeSort',
        complexity: 'O(n log n)',
        time: 6.42,
        bars: 12,
        status: 'NORMAL',
        diff: '+38%',
      },
      {
        name: 'HeapSort',
        complexity: 'O(n log n)',
        time: 9.85,
        bars: 7,
        status: 'SLOW',
        diff: '+111%',
      },
      {
        name: 'BubbleSort',
        complexity: 'O(n²)',
        time: 168.0,
        bars: 1,
        status: 'CRITICAL',
        diff: 'TIMEOUT',
      },
    ],
  },
  searching: {
    '1K': [
      {
        name: 'Binary Search',
        complexity: 'O(log n)',
        time: 0.001,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'Interpolation',
        complexity: 'O(log log n)',
        time: 0.002,
        bars: 14,
        status: 'NORMAL',
        diff: '+100%',
      },
      {
        name: 'Jump Search',
        complexity: 'O(√n)',
        time: 0.012,
        bars: 8,
        status: 'SLOW',
        diff: '+1100%',
      },
      {
        name: 'Linear Search',
        complexity: 'O(n)',
        time: 0.045,
        bars: 3,
        status: 'CRITICAL',
        diff: '+4400%',
      },
    ],
    '10K': [
      {
        name: 'Binary Search',
        complexity: 'O(log n)',
        time: 0.002,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'Interpolation',
        complexity: 'O(log log n)',
        time: 0.004,
        bars: 13,
        status: 'NORMAL',
        diff: '+100%',
      },
      {
        name: 'Jump Search',
        complexity: 'O(√n)',
        time: 0.038,
        bars: 7,
        status: 'SLOW',
        diff: '+1800%',
      },
      {
        name: 'Linear Search',
        complexity: 'O(n)',
        time: 0.38,
        bars: 2,
        status: 'CRITICAL',
        diff: '+18900%',
      },
    ],
    '100K': [
      {
        name: 'Binary Search',
        complexity: 'O(log n)',
        time: 0.004,
        bars: 16,
        status: 'OPTIMAL',
        diff: '0%',
      },
      {
        name: 'Interpolation',
        complexity: 'O(log log n)',
        time: 0.008,
        bars: 12,
        status: 'NORMAL',
        diff: '+100%',
      },
      {
        name: 'Jump Search',
        complexity: 'O(√n)',
        time: 0.124,
        bars: 6,
        status: 'SLOW',
        diff: '+3000%',
      },
      {
        name: 'Linear Search',
        complexity: 'O(n)',
        time: 3.92,
        bars: 1,
        status: 'CRITICAL',
        diff: '+97900%',
      },
    ],
  },
};

export function BenchmarkCyberdeck() {
  const [suite, setSuite] = useState<'sorting' | 'searching'>('sorting');
  const [size, setSize] = useState<'1K' | '10K' | '100K'>('10K');
  const [isRunning, setIsRunning] = useState(false);
  const [visibleRows, setVisibleRows] = useState<number>(4);

  const currentResults = BENCHMARK_DATA[suite][size];

  const triggerRun = () => {
    setIsRunning(true);
    setVisibleRows(0);
  };

  useEffect(() => {
    if (isRunning) {
      const timers: NodeJS.Timeout[] = [];
      currentResults.forEach((_, idx) => {
        const timer = setTimeout(
          () => {
            setVisibleRows(idx + 1);
            if (idx === currentResults.length - 1) {
              setIsRunning(false);
            }
          },
          (idx + 1) * 220,
        );
        timers.push(timer);
      });
      return () => timers.forEach(clearTimeout);
    }
  }, [isRunning, currentResults]);

  const getStatusColor = (status: BenchmarkResult['status']) => {
    switch (status) {
      case 'OPTIMAL':
        return 'text-turquoise';
      case 'NORMAL':
        return 'text-ink';
      case 'SLOW':
        return 'text-amber';
      case 'CRITICAL':
        return 'text-red';
    }
  };

  const getBarColor = (status: BenchmarkResult['status']) => {
    switch (status) {
      case 'OPTIMAL':
        return 'bg-turquoise';
      case 'NORMAL':
        return 'bg-ink/80';
      case 'SLOW':
        return 'bg-amber';
      case 'CRITICAL':
        return 'bg-red';
    }
  };

  return (
    <div className="hero-console w-full max-w-[540px]">
      {/* DEC-VT100 Terminal Cyberdeck */}
      <div className="border border-line bg-surface shadow-[0.45rem_0.45rem_0_rgba(0,0,0,0.55)] transition-all">
        {/* Terminal Titlebar */}
        <div className="window-titlebar flex items-center justify-between border-b border-line px-3 py-2 bg-gradient-to-r from-[#2c1e17] to-[#1a120e]">
          <div className="flex items-center gap-2 font-mono text-[0.7rem] text-ink/90 font-semibold tracking-wider">
            <Terminal className="h-3.5 w-3.5 text-turquoise" />
            <span>DEC-VT100 // TTY: /dev/pts/0</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turquoise opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-turquoise"></span>
            </span>
            <span className="font-mono text-[0.62rem] text-turquoise tracking-widest uppercase font-bold">
              ONLINE
            </span>
          </div>
        </div>

        {/* Terminal Interactive Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-surface-raised border-b border-line text-xs font-mono">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                setSuite('sorting');
                triggerRun();
              }}
              className={`px-2 py-1 text-[0.68rem] uppercase font-semibold border transition-all ${
                suite === 'sorting'
                  ? 'border-turquoise bg-turquoise/10 text-turquoise'
                  : 'border-line bg-surface text-muted hover:text-ink hover:border-line-strong'
              }`}
            >
              Sıralama
            </button>
            <button
              onClick={() => {
                setSuite('searching');
                triggerRun();
              }}
              className={`px-2 py-1 text-[0.68rem] uppercase font-semibold border transition-all ${
                suite === 'searching'
                  ? 'border-turquoise bg-turquoise/10 text-turquoise'
                  : 'border-line bg-surface text-muted hover:text-ink hover:border-line-strong'
              }`}
            >
              Arama
            </button>
          </div>

          <div className="flex items-center gap-1">
            {(['1K', '10K', '100K'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSize(s);
                  triggerRun();
                }}
                className={`px-1.5 py-0.5 text-[0.62rem] font-mono border transition-all ${
                  size === s
                    ? 'border-turquoise bg-turquoise text-black font-bold'
                    : 'border-line bg-surface text-muted hover:text-ink'
                }`}
              >
                N={s}
              </button>
            ))}
          </div>

          <button
            onClick={triggerRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-2 py-1 text-[0.68rem] font-mono font-bold uppercase border border-turquoise text-turquoise bg-turquoise/5 hover:bg-turquoise hover:text-black transition-all disabled:opacity-50"
          >
            {isRunning ? (
              <RotateCcw className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            <span>TEST ET</span>
          </button>
        </div>

        {/* Terminal Screen & Realtime Telemetry */}
        <div className="p-3.5 sm:p-4 bg-[#080504] font-mono text-[0.74rem] leading-relaxed border-t border-line/40">
          <div className="text-muted/70 text-[0.68rem] mb-2.5 flex items-center justify-between border-b border-line/40 pb-1.5">
            <span>
              <span className="text-turquoise font-bold">algopit-vm:~$</span>{' '}
              ./benchmark --suite={suite} --size={size}
            </span>
            <span className="text-quiet text-[0.62rem]">SEED: 0x9AF4</span>
          </div>

          <div className="space-y-2">
            {currentResults.map((res, index) => {
              const isVisible = index < visibleRows;
              return (
                <div
                  key={res.name}
                  className={`transition-opacity duration-150 ${
                    isVisible ? 'opacity-100' : 'opacity-10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[0.72rem]">
                    <div className="flex items-center gap-2">
                      <span className="text-quiet">0{index + 1}</span>
                      <span className="text-ink font-semibold">{res.name}</span>
                      <span className="text-quiet text-[0.64rem]">
                        ({res.complexity})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-ink/90 font-bold">
                        {res.time.toFixed(3)} ms
                      </span>
                      <span
                        className={`text-[0.64rem] font-bold ${getStatusColor(res.status)}`}
                      >
                        [{res.status}]
                      </span>
                    </div>
                  </div>

                  {/* Benchmark Bar Meter */}
                  <div className="w-full bg-[#17100d] h-2 border border-line mt-1 flex items-center p-0.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${getBarColor(res.status)}`}
                      style={{
                        width: isVisible ? `${(res.bars / 16) * 100}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal Footer Telemetry */}
          <div className="mt-3.5 pt-2.5 border-t border-line/40 flex items-center justify-between text-[0.66rem] text-muted font-mono">
            <div>
              <span className="text-turquoise font-bold">[SYS]</span>{' '}
              Karşılaştırma tamamlandı.
            </div>
            <div className="flex items-center gap-1 text-quiet">
              <span>PROMPT READY</span>
              <span className="animate-pulse text-turquoise font-bold">█</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Status Card */}
      <div className="status-card mt-3.5 border border-line bg-surface shadow-[0.35rem_0.35rem_0_rgba(0,0,0,0.45)]">
        <div className="window-titlebar bg-gradient-to-r from-[#2c1e17] to-[#1a120e] px-3 py-1.5 border-b border-line text-[0.68rem] text-ink font-mono font-bold flex justify-between">
          <span>ENGINE_SPECS.SYS</span>
          <span className="text-turquoise font-normal text-[0.62rem]">
            // VER: 2.0-STABLE
          </span>
        </div>
        <dl className="p-3 text-[0.72rem] font-mono space-y-1.5">
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
    </div>
  );
}
