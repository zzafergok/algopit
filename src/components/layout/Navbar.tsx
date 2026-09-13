'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UISizeToggle } from '@/components/theme/ui-size-toggle';
import { NavigationItem } from './Navigation/NavigationItem';
import { navigationConfig } from '@/config/navigation';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="system-bar">
      <Link href="/" className="system-logo" aria-label="AlgoPit, ana sayfa">
        <span aria-hidden="true">■</span> ALGOPIT.DEV
      </Link>

      <nav
        aria-label="Primary navigation"
        className="hidden md:flex md:items-center md:gap-6"
      >
        {navigationConfig.mainNavItems.map((item) => (
          <NavigationItem key={item.href} item={item} />
        ))}
      </nav>

      <div className="system-status">
        <UISizeToggle />

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-ink hover:bg-surface-raised border border-line"
          onClick={handleMobileMenuToggle}
          aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="col-span-full mt-2 w-full border-t border-line-strong bg-surface p-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navigationConfig.mainNavItems.map((item) => (
              <NavigationItem
                key={item.href}
                item={item}
                isMobile={true}
                onItemClick={handleMobileItemClick}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
