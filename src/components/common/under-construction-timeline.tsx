'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/core/badge';
import { timelineSteps } from './under-construction-data';

export function UnderConstructionTimeline() {
  return (
    <motion.div
      className="pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Geliştirme Süreci</h2>
        <p className="text-ash">
          Algoritma sayfalarımızı geliştirirken izlediğimiz adımlar
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-border transform md:-translate-x-1/2" />

        {timelineSteps.map((step, index) => (
          <div
            key={index}
            className={`relative flex items-start gap-8 mb-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-4 border-background bg-obsidian/60 transform -translate-x-1/2 z-10" />

            <div
              className={`pl-8 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} md:w-1/2`}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2 md:gap-3">
                {index % 2 === 0 ? (
                  <>
                    <span>{step.title}</span>
                    <step.icon className="h-5 w-5 md:order-first" />
                  </>
                ) : (
                  <>
                    <step.icon className="h-5 w-5" />
                    <span>{step.title}</span>
                  </>
                )}
              </h3>
              <p className="text-sm text-ash mt-1">{step.description}</p>

              <div
                className={`mt-2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
              >
                <Badge
                  variant={
                    step.status === 'Tamamlandı'
                      ? 'success'
                      : step.status === 'Devam Ediyor'
                        ? 'warning'
                        : 'secondary'
                  }
                  className="text-xs"
                >
                  {step.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
