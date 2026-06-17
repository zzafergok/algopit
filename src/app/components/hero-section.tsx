'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="flex flex-col items-center text-center space-y-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Algoritmaları Öğren,
          <span className="text-arcly-blue"> Anla</span> ve
          <span className="text-arcly-blue"> Uygula</span>
        </motion.h1>

        <motion.p
          className="text-xl text-ash max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          İnteraktif örnekler, görselleştirmeler ve uygulamalı öğrenme ile
          algoritmalarda ustalaşın.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild size="lg">
            <Link
              href="/algorithms"
              className="flex justify-between items-center gap-3"
            >
              <span className="flex-grow text-center">Algoritmalar</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">Daha Fazla Bilgi</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
