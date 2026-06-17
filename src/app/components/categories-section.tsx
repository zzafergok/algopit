'use client';

import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function CategoriesSection() {
  const algorithmCategories = [
    {
      title: 'Sıralama Algoritmaları',
      description:
        'Verileri belirli bir düzende sıralamak için kullanılan algoritmalar',
      href: '/algorithms/sorting',
      examples: ['Bubble Sort', 'Quick Sort', 'Merge Sort'],
    },
    {
      title: 'Arama Algoritmaları',
      description:
        'Veri yapılarında eleman bulmak için kullanılan algoritmalar',
      href: '/algorithms/searching',
      examples: ['Binary Search', 'Linear Search', 'Jump Search'],
    },
    {
      title: 'Graf Algoritmaları',
      description: 'Graf veri yapıları üzerinde işlem yapan algoritmalar',
      href: '/algorithms/graph-algorithms',
      examples: ['Dijkstra', 'DFS', 'BFS'],
    },
    {
      title: 'Dinamik Programlama',
      description:
        'Karmaşık problemleri alt problemlere bölerek çözen yöntemler',
      href: '/algorithms/dynamic-programming',
      examples: ['Fibonacci', 'Knapsack', 'Longest Common Subsequence'],
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
        Algoritma Kategorileri
      </h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {algorithmCategories.map((category, index) => (
          <motion.div key={index} variants={itemVariants} className="h-full">
            <Card className="algorithm-card h-full flex flex-col justify-between">
              <div>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-ash">Popüler örnekler:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {category.examples.map((example, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-sm bg-obsidian/60 px-2 py-1 text-xs font-medium"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </div>
              <CardFooter>
                <Button
                  asChild
                  variant="ghost"
                  className="w-full justify-between"
                >
                  <Link
                    href={category.href}
                    className="flex justify-between items-center gap-3 w-full"
                  >
                    <span>Keşfet</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
