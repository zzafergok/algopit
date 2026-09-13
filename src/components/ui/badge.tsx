'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-none border px-2 py-0.5 font-mono text-[0.68rem] font-semibold uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'border-line-strong bg-surface text-turquoise',
        secondary: 'border-line bg-surface-raised text-muted',
        destructive: 'border-destructive/40 bg-destructive/10 text-red',
        outline: 'border-line-strong bg-transparent text-ink',
        success: 'border-turquoise/40 bg-turquoise/10 text-turquoise',
        warning: 'border-amber/40 bg-amber/10 text-amber',
        info: 'border-blue/40 bg-blue/10 text-blue',
      },
      size: {
        default: 'text-[0.68rem] px-2 py-0.5',
        sm: 'text-[0.6rem] px-1.5 py-0.5',
        lg: 'text-xs px-2.5 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
