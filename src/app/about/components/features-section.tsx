'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { platformFeatures } from '../about-data';

export function FeaturesSection() {
  return (
    <section className="space-y-4 sm:space-y-6">
      <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
        Platform Özellikleri
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {platformFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
                <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
                  <div className="rounded-sm bg-arcly-blue/10 p-2 text-arcly-blue">
                    {feature.icon}
                  </div>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2 sm:p-6 sm:pt-3">
                <p className="text-sm leading-relaxed text-ash sm:text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
