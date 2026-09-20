import React from 'react';
import type { Metadata } from 'next';
import { PageHeaderCard } from '@/components/layout/page-header-card';
import { FAQView } from '@/features/resources/faq';
import {
  createPageMetadata,
  getBreadcrumbSchema,
  getFaqSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

export const metadata: Metadata = createPageMetadata({
  title: 'Sık Sorulan Sorular',
  description:
    'AlgoPit algoritma platformu, kullanım rehberleri, lisans ve katkı süreçleri hakkında en çok sorulan sorular ve yanıtları.',
  path: '/resources/faq',
  keywords: ['sss', 'faq', 'algopit sık sorulan sorular', 'algoritma öğrenme'],
});

const faqStructuredData = [
  getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Kaynaklar', url: '/resources' },
    { name: 'Sık Sorulan Sorular', url: '/resources/faq' },
  ]),
  getFaqSchema([
    {
      question: 'AlgoPit nedir?',
      answer:
        'AlgoPit, algoritmaları interaktif bir şekilde öğrenmek ve deneyimlemek için tasarlanmış açık kaynaklı bir eğitim platformudur. Görselleştirmeler, adım adım simülasyonlar ve canlı kod örnekleri sunar.',
    },
    {
      question: 'Platform ücretsiz mi?',
      answer:
        'Evet, AlgoPit tamamen ücretsiz ve açık kaynaklı bir projedir. Tüm içerik ve simülasyonlara serbestçe erişebilirsiniz.',
    },
    {
      question: 'Hangi algoritma kategorileri bulunmaktadır?',
      answer:
        'Sıralama, arama, graf teorisi, dinamik programlama, veri yapıları, açgözlü algoritmalar, geri izleme ve ileri seviye algoritmalar dahil 17 farklı kategori bulunmaktadır.',
    },
    {
      question: "AlgoPit'e nasıl katkıda bulunabilirim?",
      answer:
        'GitHub depomuzu çatallayarak yeni algoritma simülasyonları ekleyebilir, dokümantasyonu zenginleştirebilir veya hata bildiriminde bulunabilirsiniz.',
    },
  ]),
];

export default function FAQPage() {
  return (
    <div className="container py-12 max-w-7xl mx-auto">
      <JsonLd data={faqStructuredData} />
      <PageHeaderCard
        title="Sık Sorulan Sorular"
        description="AlgoPit hakkında en çok sorulan sorular ve yanıtları"
        className="mb-8"
      />
      <FAQView />
    </div>
  );
}
