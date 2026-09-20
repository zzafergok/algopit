'use client';

import { useState } from 'react';
import { ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigation } from '@/hooks/use-navigation';
import { navigationConfig } from '@/config/navigation';
import { NavItem } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { isActiveLink } = useNavigation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href],
    );
  };

  const renderSidebarItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.href);
    const isActive = isActiveLink(item.href);

    return (
      <div key={item.href} className="space-y-1">
        <div
          className={cn(
            'flex items-center gap-2 rounded-none px-3 py-2 text-sm font-mono transition-colors min-h-[44px]',
            'hover:bg-surface-raised hover:text-ink',
            isActive && 'bg-surface-raised text-turquoise font-medium',
            level > 0 && 'ml-4 border-l border-line pl-4',
          )}
        >
          <Link
            href={item.href}
            className="flex-1 truncate"
            title={isCollapsed ? item.label : undefined}
          >
            {isCollapsed ? item.label.charAt(0).toUpperCase() : item.label}
          </Link>

          {hasChildren && !isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 min-h-0 min-w-0 p-0 text-muted hover:text-ink"
              onClick={() => toggleExpanded(item.href)}
              aria-expanded={isExpanded}
            >
              <ChevronRight
                className={cn(
                  'h-4 w-4 transition-transform',
                  isExpanded && 'rotate-90',
                )}
              />
            </Button>
          )}
        </div>

        {hasChildren && isExpanded && !isCollapsed && (
          <div className="space-y-1">
            {item.children!.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-line bg-surface transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-64',
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-line">
        {!isCollapsed && (
          <Link href="/" className="font-semibold font-mono text-lg text-ink">
            AlgoPit
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Sidebar'ı genişlet" : "Sidebar'ı daralt"}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigationConfig.mainNavItems.map((item) => renderSidebarItem(item))}
        </nav>
      </ScrollArea>

      {!isCollapsed && (
        <div className="p-4 border-t border-line">
          <p className="text-xs font-mono text-muted">© 2026 AlgoPit</p>
        </div>
      )}
    </aside>
  );
};
