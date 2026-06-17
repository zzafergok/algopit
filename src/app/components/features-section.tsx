'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { BookOpen, BarChart4, Code } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-arcly-blue" />,
      title: 'Teorik Bilgi',
      description:
        'Her algoritmanın teorik temelleri, zaman karmaşıklığı, avantajları ve dezavantajları hakkında detaylı bilgiler.',
    },
    {
      icon: <BarChart4 className="h-6 w-6 text-arcly-blue" />,
      title: 'Görsel Öğrenme',
      description:
        'Algoritmaların çalışma prensiplerini adım adım görselleştirmelerle anlayın.',
    },
    {
      icon: <Code className="h-6 w-6 text-arcly-blue" />,
      title: 'İnteraktif Uygulamalar',
      description:
        'Kendi verilerinizle algoritmaları test edin, kodlarını inceleyin ve nasıl çalıştıklarını keşfedin.',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <section className="feature-section">
      <h2 className="text-3xl font-bold text-center mb-8">
        Nasıl Öğreneceksiniz?
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-4 space-y-4"
            variants={itemVariants}
          >
            <div className="bg-arcly-blue/10 p-3 rounded-full">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-ash">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
