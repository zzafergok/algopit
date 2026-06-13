'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-20 w-full rounded-sm border border-gunmetal bg-void-black px-3 py-2 font-mono text-sm text-titanium',
          'placeholder:text-ash/70',
          'focus-visible:border-arcly-blue/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-arcly-blue/40',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
