'use client';

import React from 'react';
import Link from 'next/link';

import { ArrowRight, Book, Code, ExternalLink, FileQuestion, GitFork } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

import { Button } from '@/components/ui/button';

interface ResourceCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function ResourcesPage() {
  const resourceCategories: ResourceCategory[] = [
    {
      title: 'Belgelendirme',
      description: 'Platform ve algoritmaların detaylı teknik belgelendirmesi',
      icon: <Book className="h-5 w-5" />,
      href: '/resources/documentation',
    },
    {
      title: 'Katkıda Bulunma',
      description: 'Projeye katkıda bulunmak isteyenler için rehber',
      icon: <GitFork className="h-5 w-5" />,
      href: '/resources/contributing',
    },
    {
      title: 'Sık Sorulan Sorular',
      description: 'Kullanıcıların en sık sorduğu sorular ve yanıtları',
      icon: <FileQuestion className="h-5 w-5" />,
      href: '/resources/faq',
    },
    {
      title: 'Kod Örnekleri',
      description: 'Algoritmaların farklı dillerde örnek implementasyonları',
      icon: <Code className="h-5 w-5" />,
      href: '/resources/code-examples',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Kaynaklar</h1>
        <p className="text-xl text-ash max-w-2xl mx-auto">
          Algoritma öğrenme yolculuğunuzu destekleyecek kapsamlı kaynaklar,
          belgeler ve rehberler
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {resourceCategories.map((category, index) => (
          <motion.div key={category.title} variants={itemVariants}>
            <Link
              href={category.href}
              className="group relative flex flex-col justify-between h-full border border-line bg-surface p-6 shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-1 hover:border-turquoise hover:shadow-[0.4rem_0.4rem_0_rgba(0,240,212,0.18)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center border border-line bg-surface-raised text-turquoise group-hover:border-turquoise group-hover:bg-turquoise/10 transition-colors">
                      {category.icon}
                    </div>
                    <h3 className="font-mono text-base font-bold text-ink group-hover:text-turquoise transition-colors tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-muted/60 group-hover:text-turquoise/90 transition-colors">
                    0{index + 1} //
                  </span>
                </div>
                <p className="text-sm font-sans text-muted leading-relaxed group-hover:text-ink/90 transition-colors">
                  {category.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-line/50 flex items-center justify-between font-mono text-xs text-quiet group-hover:text-turquoise transition-colors">
                <span className="font-semibold tracking-wider text-[0.72rem] uppercase">
                  GÖRÜNTÜLE
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5 text-turquoise" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16">
        <div className="border border-line bg-surface p-6 shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
            <h2 className="text-xl font-mono font-bold tracking-tight text-ink flex items-center gap-2">
              <span className="text-turquoise">//</span> HARİCİ KAYNAKLAR & DOKÜMANTASYON
            </h2>
            <span className="font-mono text-xs text-muted">EXTERNAL_LINKS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://www.algorithmist.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line bg-surface-raised p-4 hover:border-turquoise/60 hover:bg-surface transition-all group"
            >
              <div className="flex items-center justify-between text-ink group-hover:text-turquoise mb-1">
                <span className="font-mono font-bold text-sm">The Algorithmist</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-turquoise" />
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Çeşitli algoritma problemleri ve çözümleri içeren platform
              </p>
            </a>

            <a
              href="https://visualgo.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line bg-surface-raised p-4 hover:border-turquoise/60 hover:bg-surface transition-all group"
            >
              <div className="flex items-center justify-between text-ink group-hover:text-turquoise mb-1">
                <span className="font-mono font-bold text-sm">VisuAlgo</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-turquoise" />
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Veri yapıları ve algoritmaların görselleştirildiği interaktif platform
              </p>
            </a>

            <a
              href="https://www.geeksforgeeks.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-line bg-surface-raised p-4 hover:border-turquoise/60 hover:bg-surface transition-all group"
            >
              <div className="flex items-center justify-between text-ink group-hover:text-turquoise mb-1">
                <span className="font-mono font-bold text-sm">GeeksforGeeks</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted group-hover:text-turquoise" />
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Programlama ve algoritma konularında geniş kaynak kütüphanesi
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center p-8 border border-line bg-surface shadow-[0.25rem_0.25rem_0_rgba(0,0,0,0.45)]">
        <h2 className="text-2xl font-mono font-bold mb-3 text-ink">
          // TOPLULUK & KATKIDA BULUNMA
        </h2>
        <p className="text-sm text-muted max-w-xl mx-auto mb-6 leading-relaxed">
          Sorularınız veya katkılarınız mı var? GitHub üzerinden tartışmalara
          katılın veya yeni bir issue/pull request açın.
        </p>
        <Button
          asChild
          variant="outline"
          className="hover:border-turquoise hover:text-turquoise hover:bg-turquoise/5"
        >
          <a
            href="https://github.com/zzafergok/algopit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GITHUB&apos;DA BİZE KATILIN</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
