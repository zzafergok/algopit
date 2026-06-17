'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { howItWorks } from '../about-data';

export function HowItWorksSection() {
  return (
    <>
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Misyonumuz
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mx-auto max-w-4xl text-center text-base leading-relaxed sm:text-lg">
            Algoritmaları ve veri yapılarını herkesin kolayca öğrenebileceği,
            anlayabileceği ve uygulayabileceği bir ortam oluşturmak. Karmaşık
            kavramları, görsel açıklamalar ve interaktif örneklerle basit hale
            getirerek, yazılım geliştirme topluluğunun teknik becerilerini
            güçlendirmek.
          </p>
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Nasıl Çalışır?
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {howItWorks.map((item, index) => (
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
                      {item.icon}
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 sm:p-6 sm:pt-3">
                  <p className="text-sm leading-relaxed text-ash sm:text-base">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
