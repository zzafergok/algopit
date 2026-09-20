'use client';

import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Terminal } from 'lucide-react';
import { Button } from '@/components/core/button';
import { BENCHMARK_DATA, type BenchmarkResult } from './benchmark-data';
import { BenchmarkHardwareSpecs } from './benchmark-hardware-specs';

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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSuite('sorting');
                triggerRun();
              }}
              className={`h-auto min-h-[36px] px-2.5 py-1 text-[0.68rem] uppercase font-semibold border transition-all ${
                suite === 'sorting'
                  ? 'border-turquoise bg-turquoise/10 text-turquoise'
                  : 'border-line bg-surface text-muted hover:text-ink hover:border-line-strong'
              }`}
            >
              Sıralama
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSuite('searching');
                triggerRun();
              }}
              className={`h-auto min-h-[36px] px-2.5 py-1 text-xs uppercase font-semibold border transition-all ${
                suite === 'searching'
                  ? 'border-turquoise bg-turquoise/10 text-turquoise'
                  : 'border-line bg-surface text-muted hover:text-ink hover:border-line-strong'
              }`}
            >
              Arama
            </Button>
          </div>

          <div className="flex items-center gap-1">
            {(['1K', '10K', '100K'] as const).map((s) => (
              <Button
                key={s}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSize(s);
                  triggerRun();
                }}
                className={`h-auto min-h-[32px] px-2 py-0.5 text-2xs font-mono border transition-all ${
                  size === s
                    ? 'border-turquoise bg-turquoise text-black font-bold'
                    : 'border-line bg-surface text-muted hover:text-ink'
                }`}
              >
                N={s}
              </Button>
            ))}
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={triggerRun}
            disabled={isRunning}
            className="h-auto min-h-[36px] flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold uppercase border border-turquoise text-turquoise bg-turquoise/5 hover:bg-turquoise hover:text-black transition-all disabled:opacity-50"
          >
            {isRunning ? (
              <RotateCcw className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            <span>TEST ET</span>
          </Button>
        </div>

        {/* Terminal Screen & Realtime Telemetry */}
        <div className="p-3.5 sm:p-4 bg-[#080504] font-mono text-xs leading-relaxed border-t border-line/40">
          <div className="text-muted/70 text-xs mb-2.5 flex items-center justify-between border-b border-line/40 pb-1.5">
            <span>
              <span className="text-turquoise font-bold">algopit-vm:~$</span>{' '}
              ./benchmark --suite={suite} --size={size}
            </span>
            <span className="text-quiet text-2xs">SEED: 0x9AF4</span>
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
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-quiet">0{index + 1}</span>
                      <span className="text-ink font-semibold">{res.name}</span>
                      <span className="text-quiet text-2xs">
                        ({res.complexity})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-ink/90 font-bold">
                        {res.time.toFixed(3)} ms
                      </span>
                      <span
                        className={`text-2xs font-bold ${getStatusColor(res.status)}`}
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
          <div className="mt-3.5 pt-2.5 border-t border-line/40 flex items-center justify-between text-2xs text-muted font-mono">
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
      <BenchmarkHardwareSpecs />
    </div>
  );
}
