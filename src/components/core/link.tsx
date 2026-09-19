'use client';

import * as React from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { cn } from '@/lib/utils';

export interface LinkProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps {
  className?: string;
  children?: React.ReactNode;
  variant?:
    'default' | 'turquoise' | 'muted' | 'button-primary' | 'button-secondary';
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { href, className, children, variant = 'default', target, rel, ...props },
    ref,
  ) => {
    const isExternal =
      typeof href === 'string' &&
      (href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//'));

    const resolvedRel =
      isExternal && target === '_blank' && !rel ? 'noreferrer noopener' : rel;

    let variantClasses =
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise';
    if (variant === 'default') {
      variantClasses =
        'text-ink hover:text-turquoise transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise';
    } else if (variant === 'turquoise') {
      variantClasses =
        'text-turquoise hover:text-[#38f8e2] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise';
    } else if (variant === 'muted') {
      variantClasses =
        'text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise';
    } else if (variant === 'button-primary') {
      variantClasses =
        'button button-primary min-h-[44px] min-w-[44px] inline-flex items-center justify-center';
    } else if (variant === 'button-secondary') {
      variantClasses =
        'button button-secondary min-h-[44px] min-w-[44px] inline-flex items-center justify-center';
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(variantClasses, className)}
        target={target}
        rel={resolvedRel}
        {...props}
      >
        {children}
      </NextLink>
    );
  },
);

Link.displayName = 'Link';

export { Link };
