'use client';

import React, { useState } from 'react';

import {
  Bug,
  Book,
  HelpCircle,
  MessageSquare,
  FileCode,
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { contributionSteps } from './data';
import { CodeStandardsTab } from './components/CodeStandardsTab';
import { DocumentationTab } from './components/DocumentationTab';
import { BugReportTab } from './components/BugReportTab';
import { FeatureRequestTab } from './components/FeatureRequestTab';

export default function ContributingPage() {
  const [activeStep, setActiveStep] = useState<number>(0);

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
    <div className="container py-12 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Katkıda Bulunma
        </h1>
        <p className="text-xl text-ash max-w-2xl mx-auto">
          AlgoPit&apos;e katkıda bulunmak için rehber. Bu projeye katkıda bulunarak,
          algoritma öğrenimine ve açık kaynak topluluğuna destek olabilirsiniz.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Katkı Süreci</h2>

        <div className="relative mb-12">
          <div className="flex justify-between relative">
            {contributionSteps.map((_, index) => (
              <Button
                key={index}
                variant={index <= activeStep ? 'default' : 'outline'}
                size="icon"
                className={`relative z-10 transition-all ${
                  index <= activeStep
                    ? 'text-arcly-blue-foreground'
                    : 'text-ash'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-obsidian/60">
            <div
              className="h-full bg-arcly-blue transition-all duration-300"
              style={{
                width: `${(activeStep / (contributionSteps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <Card className="border border-gunmetal mt-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-arcly-blue/10 text-arcly-blue">
                {contributionSteps[activeStep].icon}
              </div>
              <CardTitle>{contributionSteps[activeStep].title}</CardTitle>
            </div>
            <p className="text-ash text-sm px-1 mt-1">
              {contributionSteps[activeStep].description}
            </p>
          </CardHeader>

          {contributionSteps[activeStep].code && (
            <CardContent>
              <CodeBlock
                code={contributionSteps[activeStep].code}
                language={contributionSteps[activeStep].language || 'bash'}
                showLineNumbers={true}
              />
            </CardContent>
          )}

          <div className="p-4 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
            >
              Önceki
            </Button>
            <Button
              onClick={() =>
                setActiveStep((prev) =>
                  Math.min(contributionSteps.length - 1, prev + 1),
                )
              }
              disabled={activeStep === contributionSteps.length - 1}
            >
              Sonraki
            </Button>
          </div>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Katkı Rehberleri</h2>

        <Tabs defaultValue="code">
          <TabsList className="w-full">
            <TabsTrigger value="code">Kod Standartları</TabsTrigger>
            <TabsTrigger value="docs">Dokümantasyon</TabsTrigger>
            <TabsTrigger value="bugs">Hata Raporlama</TabsTrigger>
            <TabsTrigger value="features">Özellik Önerileri</TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="mt-6">
            <CodeStandardsTab />
          </TabsContent>

          <TabsContent value="docs" className="mt-6">
            <DocumentationTab />
          </TabsContent>

          <TabsContent value="bugs" className="mt-6">
            <BugReportTab />
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <FeatureRequestTab />
          </TabsContent>
        </Tabs>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          {
            title: 'Yeni Algoritma Eklemek',
            description:
              'Yeni bir algoritma implementasyonu ve görselleştirmesi ekleyin',
            icon: <FileCode className="h-6 w-6 text-arcly-blue" />,
            link: '#',
          },
          {
            title: 'Hata Raporlamak',
            description:
              'Bulduğunuz hataları bildirin ve çözüm önerilerinde bulunun',
            icon: <Bug className="h-6 w-6 text-arcly-blue" />,
            link: 'https://github.com/zzafergok/AlgoPit/issues/new?template=bug_report.md',
          },
          {
            title: 'Dokümantasyon İyileştirmeleri',
            description:
              'Belgeleri geliştirin, yeni örnekler ekleyin veya açıklamaları iyileştirin',
            icon: <Book className="h-6 w-6 text-arcly-blue" />,
            link: '#',
          },
          {
            title: 'Topluluk Tartışmaları',
            description: 'Projede aktif rol alın ve tartışmalara katılın',
            icon: <MessageSquare className="h-6 w-6 text-arcly-blue" />,
            link: 'https://github.com/zzafergok/AlgoPit/discussions',
          },
        ].map((item) => (
          <motion.div key={item.title} variants={itemVariants}>
            <Card className="h-full flex flex-col justify-between">
              <div>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <CardTitle>{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
                </CardContent>
              </div>
              <div className="px-6 pb-6">
                <Button asChild variant="outline" className="w-full">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Daha Fazla Bilgi
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 bg-arcly-blue/10 text-arcly-blue p-2 rounded-full mb-4">
          <HelpCircle className="h-5 w-5" />
          <span className="font-medium">Yardıma mı ihtiyacınız var?</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Hala Sorularınız Mı Var?</h2>
        <p className="text-ash mb-6 max-w-xl mx-auto">
          Katkıda bulunma süreciyle ilgili sorularınız varsa, GitHub üzerinde
          bir issue açabilir veya doğrudan ekibe e-posta gönderebilirsiniz.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild variant="outline">
            <a
              href="https://github.com/zzafergok/AlgoPit/issues/new?template=question.md"
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
