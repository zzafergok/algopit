'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';

import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';

import { NavigationItem } from './Navigation/NavigationItem';

import { navigationConfig } from '@/config/navigation';

import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        'border-b border-gunmetal bg-void-black/95 backdrop-blur supports-[backdrop-filter]:bg-void-black/85',
        isScrolled && 'border-arcly-blue/30'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            aria-label="AlgoPit ana sayfasına git"
          >
            <span className="font-display text-xl font-bold uppercase tracking-tight text-titanium">
              AlgoPit
            </span>
          </Link>
        </div>

        <nav className="hidden items-center md:flex md:gap-6 lg:gap-8">
          {navigationConfig.mainNavItems.map((item) => (
            <NavigationItem key={item.href} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="container max-h-[80vh] overflow-y-auto border-t border-gunmetal bg-obsidian py-4 md:hidden">
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
