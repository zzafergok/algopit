'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { learningPath } from '../about-data';

export function LearningPathSection() {
  return (
    <section className="space-y-5 sm:space-y-6">
      <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
        Öğrenme Yolu
      </h2>
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-3 left-5 top-3 w-[0.0625rem] bg-border md:left-1/2 md:-translate-x-1/2" />

        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          {learningPath.map((item, index) => (
            <motion.div
              key={item.step}
              className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-4 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-6"
              initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative z-10 col-start-1 row-start-1 flex h-10 w-10 items-center justify-center rounded-full border border-arcly-blue/30 bg-arcly-blue text-sm font-bold text-primary-foreground shadow-[0_0_0_0.5rem_hsl(var(--background))] md:col-start-2 md:mx-auto md:mt-3">
                {item.step}
              </div>

              <div
                className={`col-start-2 row-start-1 min-w-0 ${
                  index % 2
                    ? 'md:col-start-3 md:text-left'
                    : 'md:col-start-1 md:text-right'
                }`}
              >
                <Card className="w-full border-gunmetal/40 bg-card/80">
                  <CardContent className="p-4 sm:p-5">
                    <div
                      className={`flex items-start gap-3 ${
                        index % 2 ? '' : 'md:flex-row-reverse'
                      }`}
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm bg-arcly-blue/10 text-arcly-blue">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold leading-tight">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-ash">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
