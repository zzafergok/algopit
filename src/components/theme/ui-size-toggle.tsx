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
        className="flex h-8 min-w-[4.5rem] items-center gap-1 border border-gunmetal px-2 text-xs font-medium text-ash"
        aria-hidden="true"
      >
        <span className="text-sm leading-none">Aa</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex h-8 min-w-[4.5rem] items-center gap-1 border border-gunmetal px-2 text-xs font-medium text-ash transition-colors hover:border-arcly-blue/50 hover:text-titanium"
        aria-label="Arayüz boyutunu değiştir"
        title={`Arayüz boyutu: ${activeLabel}`}
      >
        <span className="text-sm leading-none">Aa</span>
        <span className="hidden sm:inline">{activeLabel}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Arayüz Boyutu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sizeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setUISize(option.value)}
            className="gap-2"
          >
            <Check
              className={cn(
                'h-3.5 w-3.5 text-arcly-blue',
                option.value !== uiSize && 'opacity-0',
              )}
            />
            <span className="flex min-w-0 flex-col">
              <span className="font-medium">{option.label}</span>
              <span className="text-xs text-ash">{option.description}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
