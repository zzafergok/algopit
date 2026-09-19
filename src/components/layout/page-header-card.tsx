import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/core/badge';

export interface PageHeaderCardProps {
  title: string;
  description?: string;
  badge?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeaderCard({
  title,
  description,
  badge,
  eyebrow,
  actions,
  children,
  className,
}: PageHeaderCardProps) {
  return (
    <header
      className={cn(
        'relative border border-line bg-surface p-6 sm:p-8 shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.45)] mb-8',
        className,
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-3">
            {eyebrow && (
              <span className="font-mono text-xs text-muted uppercase tracking-widest">
                {eyebrow}
              </span>
            )}
            {badge && (
              <Badge variant="default" className="font-mono text-[0.65rem]">
                {badge}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-ink">
            {title}
          </h1>
          {description && (
            <p className="text-sm font-mono text-muted leading-relaxed uppercase">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-3 pt-2 md:pt-0 shrink-0">
            {actions}
          </div>
        )}
      </div>

      {children && (
        <div className="mt-6 border-t border-line pt-6">{children}</div>
      )}
    </header>
  );
}
