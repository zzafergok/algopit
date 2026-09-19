'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-none border font-mono tracking-wider uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-turquoise focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-turquoise text-black hover:bg-turquoise/80',
        secondary:
          'border-line bg-surface-raised text-ink hover:bg-surface-raised/80',
        destructive:
          'border-transparent bg-destructive text-white hover:bg-destructive/80',
        outline: 'border-line text-ink',
        muted: 'border-line-strong bg-surface text-muted',
        success: 'border-turquoise/40 bg-turquoise/10 text-turquoise',
        warning: 'border-amber/40 bg-amber/10 text-amber',
      },
      size: {
        default: 'px-2.5 py-0.5 text-[0.6875rem] font-medium',
        sm: 'px-2 py-0.5 text-[0.625rem] font-medium',
        lg: 'px-3 py-1 text-xs font-semibold',
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
