'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/core/label';

export interface FormFieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  error,
  description,
  required,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor={htmlFor}>
            {label}
            {required && <span className="ml-1 text-red">*</span>}
          </Label>
        </div>
      )}
      {children}
      {description && !error && (
        <p className="font-mono text-[0.7rem] text-muted">{description}</p>
      )}
      {error && (
        <p className="font-mono text-xs text-red font-medium tracking-tight">
          {error}
        </p>
      )}
    </div>
  );
}
