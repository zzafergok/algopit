'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-sm border border-gunmetal bg-void-black px-3 py-2 font-mono text-sm text-titanium file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-ash/70 focus-visible:border-arcly-blue/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-arcly-blue/40 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
