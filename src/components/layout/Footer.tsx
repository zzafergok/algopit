'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/core/button';
import { Link } from '@/components/core/link';
import { FooterSection } from './footer-section';
import { navigationConfig } from '@/config/navigation';
import { cn } from '@/lib/utils';

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowScrollTop(window.scrollY > 400);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="w-full border-t border-line-strong bg-black">
        <div className="mx-auto w-full max-w-[1600px] px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-14">
            <div className="lg:col-span-1 space-y-4">
              <Link
                href="/"
                className="system-logo inline-flex text-lg"
                aria-label="AlgoPit ana sayfasına git"
              >
                <span aria-hidden="true">■</span> ALGOPIT.DEV
              </Link>

              <p className="font-mono text-xs text-muted leading-relaxed max-w-xs uppercase">
                Algoritmaları interaktif ve görsel olarak keşfedin. Adım adım
                yürütme, simülasyon ve analiz platformu.
              </p>

              <div className="pt-2 font-mono text-[0.7rem] text-quiet space-y-1">
                <p>SYS_BUILD: 2.0.0-PROD</p>
                <p>STATUS: ALL ENGINES OPERATIONAL</p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                {navigationConfig.footerSections.map((section) => (
                  <FooterSection key={section.title} section={section} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-line px-6 py-4">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col justify-between gap-2 sm:flex-row sm:items-center font-mono text-[0.7rem] uppercase tracking-wider text-quiet">
            <span>&copy; {currentYear} ALGOPIT · ALL RIGHTS RESERVED</span>
            <span>DESIGNED FOR CLEAN CODE AND COMPUTATIONAL DEPTH</span>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'fixed bottom-6 right-6 z-50 h-11 w-11 border border-line-strong bg-surface text-green shadow-[0.4rem_0.4rem_0_rgba(0,0,0,0.4)]',
            'transition-all duration-200 hover:border-green hover:bg-surface-raised hover:-translate-y-0.5',
          )}
          onClick={scrollToTop}
          aria-label="Sayfanın başına geri dön"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
