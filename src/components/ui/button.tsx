'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-none font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-turquoise text-black border border-turquoise hover:bg-[#38f8e2] hover:border-[#38f8e2] hover:-translate-y-0.5',
        destructive:
          'bg-destructive text-white border border-destructive hover:bg-[#ff4d68] hover:-translate-y-0.5',
        outline:
          'border border-line-strong bg-transparent text-ink hover:border-muted hover:bg-surface-raised hover:-translate-y-0.5',
        secondary:
          'bg-surface-raised text-ink border border-line-strong hover:border-muted hover:text-ink hover:-translate-y-0.5',
        ghost: 'text-muted hover:text-ink hover:bg-surface-raised',
        link: 'text-turquoise underline underline-offset-4 hover:text-[#38f8e2]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-[0.7rem]',
        lg: 'h-12 px-6 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
