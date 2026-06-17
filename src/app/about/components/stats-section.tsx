'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { platformStats } from '../about-data';

export function StatsSection() {
  return (
    <section className="space-y-5 text-center sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          <span className="text-arcly-blue">AlgoPit</span> Nedir?
        </h1>
      </motion.div>

      <motion.p
        className="mx-auto max-w-3xl text-base leading-relaxed text-ash sm:text-lg md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Algoritmaları interaktif bir şekilde öğrenmeniz ve uygulamanız için
        tasarlanmış, görsel açıklamalar ve pratik örneklerle desteklenen
        kapsamlı bir eğitim platformu.
      </motion.p>

      <motion.div
        className="mx-auto grid max-w-3xl grid-cols-2 gap-3 pt-4 sm:gap-4 sm:pt-6 md:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {platformStats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="text-2xl font-bold text-arcly-blue sm:text-3xl">
                {stat.value}
              </div>
              <div className="text-xs text-ash sm:text-sm">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
