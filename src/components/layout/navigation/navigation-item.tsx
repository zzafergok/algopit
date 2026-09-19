'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigation } from '@/hooks/use-navigation';
import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { NavItem } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
  item: NavItem;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavigationItem = ({
  item,
  isMobile = false,
  onItemClick,
}: NavigationItemProps) => {
  const { isActiveLink } = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActiveNavItem = (navItem: NavItem): boolean =>
    isActiveLink(navItem.href) ||
    navItem.children?.some((child) => isActiveNavItem(child)) ||
    false;

  const renderDropdownItems = (items: NavItem[]) => {
    return items.map((childItem) => {
      const isChildActive = isActiveNavItem(childItem);

      if (childItem.children && childItem.children.length > 0) {
        return (
          <DropdownMenuSub key={childItem.href}>
            <DropdownMenuSubTrigger
              className={cn(isChildActive && 'text-green font-semibold')}
            >
              {childItem.label}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="max-h-[min(80vh,var(--radix-dropdown-menu-content-available-height))] w-72 overflow-y-auto">
              <DropdownMenuItem asChild>
                <Link
                  href={childItem.href}
                  onClick={onItemClick}
                  className={cn(
                    'w-full text-green',
                    isActiveLink(childItem.href) && 'font-semibold',
                  )}
                >
                  → Tümünü Görüntüle
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {renderDropdownItems(childItem.children)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem key={childItem.href} asChild>
          <Link
            href={childItem.href}
            onClick={onItemClick}
            className={cn(
              'w-full cursor-pointer',
              isChildActive && 'text-green font-semibold',
            )}
          >
            {childItem.label}
          </Link>
        </DropdownMenuItem>
      );
    });
  };

  if (isMobile) {
    if (item.children && item.children.length > 0) {
      return (
        <div className="py-1">
          <div className="flex items-center justify-between">
            <Link
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'font-mono text-xs uppercase tracking-wider py-2 block flex-1 transition-colors',
                isActiveNavItem(item) ? 'text-green font-semibold' : 'text-ink',
              )}
            >
              {item.label}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 min-h-0 min-w-0 p-0 text-muted hover:text-ink"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={`${item.label} alt menüsünü ${isExpanded ? 'kapat' : 'aç'}`}
            >
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isExpanded && 'rotate-180',
                )}
              />
            </Button>
          </div>
          {isExpanded && (
            <div className="pl-4 border-l border-line-strong mt-1 space-y-1">
              {item.children.map((child) => (
                <NavigationItem
                  key={child.href}
                  item={child}
                  isMobile={true}
                  onItemClick={onItemClick}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={onItemClick}
        className={cn(
          'font-mono text-xs uppercase tracking-wider py-2 block transition-colors',
          isActiveNavItem(item) ? 'text-green font-semibold' : 'text-ink',
        )}
      >
        {item.label}
      </Link>
    );
  }

  if (item.children && item.children.length > 0) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              'font-mono text-[0.76rem] font-semibold uppercase tracking-wider transition-all duration-150',
              'flex items-center gap-1.5 py-1.5 px-2.5 rounded-none border border-transparent min-h-[44px]',
              'hover:text-ink hover:border-line-strong hover:bg-surface-raised',
              'data-[state=open]:text-green data-[state=open]:border-line-strong data-[state=open]:bg-surface',
              isActiveNavItem(item) ? 'text-green' : 'text-muted',
            )}
          >
            {item.label}
            <ChevronDown className="h-3 w-3 opacity-70 transition-transform duration-150" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          titlebar={`${item.label.toUpperCase()} // INDEX`}
          className="max-h-[min(80vh,var(--radix-dropdown-menu-content-available-height))] w-72 overflow-y-auto"
        >
          <DropdownMenuItem asChild>
            <Link href={item.href} className="font-semibold text-green">
              → Tümünü Görüntüle
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {renderDropdownItems(item.children)}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'font-mono text-[0.76rem] font-semibold uppercase tracking-wider transition-colors py-1.5 px-2.5 inline-flex items-center min-h-[44px]',
        'hover:text-ink',
        isActiveNavItem(item) ? 'text-green' : 'text-muted',
      )}
    >
      {item.label}
    </Link>
  );
};
