'use client';

import { useEffect, useState } from 'react';

import { Check } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUISize, type UISize } from '@/context/ui-size-provider';
import { cn } from '@/lib/utils';

const sizeOptions: Array<{
  value: UISize;
  label: string;
  description: string;
}> = [
  {
    value: 'small',
    label: 'Small',
    description: 'Daha kompakt görünüm',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Varsayılan görünüm',
  },
  {
    value: 'large',
    label: 'Large',
    description: 'Daha büyük görünüm',
  },
];

export function UISizeToggle() {
  const { uiSize, setUISize } = useUISize();
  const [mounted, setMounted] = useState(false);
  const activeLabel =
    sizeOptions.find((option) => option.value === uiSize)?.label ?? 'Medium';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="flex h-8 min-w-[4.5rem] items-center gap-1 border border-line bg-surface px-2.5 text-xs font-mono font-medium text-muted"
        aria-hidden="true"
      >
        <span className="text-sm leading-none font-bold text-turquoise">Aa</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-8 min-w-[4.5rem] items-center gap-1.5 border border-line bg-surface px-2.5 text-xs font-mono font-medium text-ink transition-colors hover:border-turquoise hover:text-turquoise cursor-pointer"
        aria-label="Arayüz boyutunu değiştir"
        title={`Arayüz boyutu: ${activeLabel}`}
      >
        <span className="text-sm leading-none font-bold text-turquoise">Aa</span>
        <span className="hidden sm:inline">{activeLabel}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 border border-line bg-surface shadow-[0.45rem_0.45rem_0_rgba(0,0,0,0.5)]">
        <DropdownMenuLabel className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">
          Arayüz Boyutu
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-line" />
        {sizeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setUISize(option.value)}
            className="gap-2 cursor-pointer focus:bg-surface-raised focus:text-turquoise"
          >
            <Check
              className={cn(
                'h-3.5 w-3.5 text-turquoise',
                option.value !== uiSize && 'opacity-0',
              )}
            />
            <span className="flex min-w-0 flex-col">
              <span className="font-mono text-xs font-semibold text-ink">
                {option.label}
              </span>
              <span className="text-[0.68rem] font-mono text-muted uppercase">
                {option.description}
              </span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
