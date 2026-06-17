'use client';

import React, { useState, useEffect } from 'react';

import { Search } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { FAQItem } from './types';
import { faqData } from './data';
import { FAQItemRow } from './components/FAQItemRow';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    setFaqs(faqData);
  }, []);

  const getFilteredFaqs = (category: string) => {
    let filteredFaqs = [...faqData];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredFaqs = filteredFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          (typeof faq.answer === 'string' &&
            faq.answer.toLowerCase().includes(query)) ||
          faq.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    if (category !== 'all') {
      filteredFaqs = filteredFaqs.filter((faq) => faq.category === category);
    }

    return filteredFaqs;
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
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
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const getCategoryCount = (category: string) => {
    return category === 'all'
      ? faqData.length
      : faqData.filter((faq) => faq.category === category).length;
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Sık Sorulan Sorular
        </h1>
        <p className="text-xl text-ash max-w-2xl mx-auto">
          AlgoPit hakkında en çok sorulan sorular ve yanıtları
        </p>

        <div className="relative mt-6 max-w-lg mx-auto">
          <Search className="absolute left-3 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 transform text-ash" />
          <Input
            className="pl-10"
            placeholder="Sorularda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">
            Tümü{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('all')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex-1">
            Genel{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('general')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="algorithms" className="flex-1">
            Algoritmalar{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('algorithms')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex-1">
            Kullanım{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('usage')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex-1">
            Teknik{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('technical')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="contribute" className="flex-1">
            Katkıda Bulunma{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('contribute')}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {[
          'all',
          'general',
          'algorithms',
          'usage',
          'technical',
          'contribute',
        ].map((category) => (
          <TabsContent key={category} value={category} className="pt-4">
            <AnimatePresence>
              {getFilteredFaqs(category).length > 0 ? (
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                    exit: { opacity: 0 },
                  }}
                >
                  {getFilteredFaqs(category).map((faq) => (
                    <FAQItemRow
                      key={faq.id}
                      faq={faq}
                      isExpanded={expandedItems.includes(faq.id)}
                      onToggle={() => toggleItem(faq.id)}
                      variants={itemVariants}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-lg font-medium mb-2">
                    Arama kriterlerinize uygun soru bulunamadı
                  </h3>
                  <p className="text-ash">
                    Farklı bir arama terimi deneyin veya filtreleri sıfırlayın
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery('')}
                    className="mt-4"
                  >
                    Aramayı Temizle
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16 p-6 bg-obsidian/60 rounded-sm text-center">
        <h2 className="text-xl font-bold mb-4">Sorunuzu Bulamadınız mı?</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Eğer burada yanıtını bulamadığınız bir sorunuz varsa, doğrudan bize
          sorabilirsiniz. GitHub üzerinden bir issue açın veya e-posta gönderin.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild variant="outline">
            <a
              href="https://github.com/zzafergok/algopit/issues/new?template=question.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub&apos;da Soru Sorun
            </a>
          </Button>
          <Button asChild>
            <a href="mailto:gok.zaferr@gmail.com">E-posta Gönderin</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
