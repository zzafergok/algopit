'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex min-h-[44px] w-full rounded-none border border-line bg-surface px-3 py-2 font-mono text-sm text-ink file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted focus-visible:border-turquoise focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-turquoise/40 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
