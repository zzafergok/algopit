'use client';

import Link from 'next/link';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { useNavigation } from '@/hooks/useNavigation';

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
import { Button } from '@/components/ui/button';

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
              className={cn(isChildActive && 'font-medium text-arcly-blue')}
            >
              {childItem.label}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="max-h-[min(80vh,var(--radix-dropdown-menu-content-available-height))] w-72 overflow-y-auto">
              <DropdownMenuItem asChild>
                <Link
                  href={childItem.href}
                  onClick={onItemClick}
                  className={cn(
                    'w-full',
                    isActiveLink(childItem.href) &&
                      'font-medium text-arcly-blue',
                  )}
                >
                  Tümünü Görüntüle
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
              isChildActive && 'font-medium text-arcly-blue',
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
                'text-sm font-medium py-2 block flex-1',
                isActiveNavItem(item) ? 'text-arcly-blue' : 'text-titanium',
              )}
            >
              {item.label}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
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
            <div className="pl-4 border-l border-gunmetal/50 mt-1 space-y-1">
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
          'text-sm font-medium py-2 block',
          isActiveNavItem(item) ? 'text-arcly-blue' : 'text-titanium',
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
          <Button
            variant="ghost"
            className={cn(
              'text-sm font-medium transition-colors hover:text-arcly-blue flex items-center gap-1',
              isActiveNavItem(item) ? 'text-arcly-blue' : 'text-ash',
            )}
          >
            {item.label}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="max-h-[min(80vh,var(--radix-dropdown-menu-content-available-height))] w-72 overflow-y-auto"
        >
          <DropdownMenuItem asChild>
            <Link href={item.href} className="font-medium">
              Tümünü Görüntüle
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
        'text-sm font-medium transition-colors hover:text-arcly-blue',
        isActiveNavItem(item) ? 'text-arcly-blue' : 'text-ash',
      )}
    >
      {item.label}
    </Link>
  );
};
