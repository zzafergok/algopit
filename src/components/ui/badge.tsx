'use client';

import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus:ring-1 focus:ring-arcly-blue/50',
  {
    variants: {
      variant: {
        default: 'border-arcly-blue/30 bg-arcly-blue/10 text-arcly-blue',
        secondary: 'border-gunmetal bg-gunmetal/30 text-titanium',
        destructive: 'border-alert-red/30 bg-alert-red/10 text-alert-red',
        outline: 'border-gunmetal bg-transparent text-titanium',
        success: 'border-signal-green/30 bg-signal-green/10 text-signal-green',
        warning: 'border-arcly-blue/30 bg-arcly-blue/10 text-arcly-blue',
        info: 'border-arcly-blue/30 bg-arcly-blue/10 text-arcly-blue',
      },
      size: {
        default: 'text-xs px-2.5 py-0.5',
        sm: 'text-xs px-2 py-0.5 rounded-sm',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
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
