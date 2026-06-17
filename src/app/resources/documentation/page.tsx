'use client';

import Link from 'next/link';

import React, { useState } from 'react';

import { Search, GitFork, ChevronDown, FileQuestion, Mail } from 'lucide-react';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { docSections } from './data/sections';

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredSections = docSections.filter((section) => {
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Belgelendirme
        </h1>
        <p className="text-xl text-ash max-w-2xl">
          AlgoPit&apos;in tüm özelliklerini ve kullanımını anlatan kapsamlı
          teknik belgelendirme
        </p>

        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 h-[1.125rem] w-[1.125rem] -translate-y-1/2 transform text-ash" />
          <Input
            className="pl-10"
            placeholder="Belgelerde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Hızlı Bağlantılar:</h2>
        <div className="flex flex-wrap gap-2">
          {docSections.map((section) => (
            <Button key={section.id} variant="outline" size="sm" asChild>
              <a href={`#${section.id}`}>{section.title}</a>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredSections.map((section) => (
          <Card key={section.id} id={section.id} className="scroll-mt-20">
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-arcly-blue/10 text-arcly-blue">
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedSections.includes(section.id) ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div className="flex flex-wrap gap-1 pt-2">
                {section.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            {expandedSections.includes(section.id) && (
              <CardContent className="pt-0">{section.content}</CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Arama sonucu bulunamadı</h3>
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
        </div>
      )}

      <div className="mt-16 p-6 bg-obsidian/60 rounded-sm">
        <h2 className="text-xl font-bold mb-4">
          Daha Fazla Yardım mı Gerekiyor?
        </h2>
        <p className="mb-4">
          Burada cevap bulamadığınız sorularınız mı var? Şu kaynaklara
          bakabilirsiniz:
        </p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-arcly-blue" />
            <Link href="/resources/faq" className="hover:underline">
              Sık Sorulan Sorular
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <GitFork className="h-5 w-5 text-arcly-blue" />
            <Link href="/resources/contributing" className="hover:underline">
              Katkıda Bulunma Rehberi
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-lg font-medium mb-2">Hala cevap bulamadınız mı?</h3>
        <p className="text-ash mb-4">
          Belgelendirmede görmek istediğiniz konular veya önerileriniz varsa,
          lütfen bize bildirin.
        </p>
        <Button asChild>
          <a
            href="mailto:gok.zaferr@gmail.com"
            className="inline-flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            İletişime Geçin
          </a>
        </Button>
      </div>
    </div>
  );
}
