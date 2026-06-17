import React from 'react';
import { FAQItem } from '../types';

export const contributeFaqs: FAQItem[] = [
  {
    id: 'contribute-1',
    question: 'Projeye nasıl katkıda bulunabilirim?',
    answer: (
      <div>
        <p>Projeye çeşitli şekillerde katkıda bulunabilirsiniz:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Yeni algoritmalar ve görselleştirmeler ekleme</li>
          <li>Var olan demoları iyileştirme</li>
          <li>Dokümantasyon ve açıklamaları geliştirme</li>
          <li>Hataları düzeltme</li>
          <li>Yeni özellikler önerme</li>
          <li>Çevirilere yardımcı olma</li>
        </ul>
        <p className="mt-2">
          Katkıda bulunma sürecinin detayları için{' '}
          <a
            href="/resources/contributing"
            className="text-arcly-blue hover:underline"
          >
            Katkıda Bulunma
          </a>{' '}
          sayfamızı ziyaret edin.
        </p>
      </div>
    ),
    category: 'contribute',
    tags: ['katkı', 'geliştirme', 'katılım'],
  },
  {
    id: 'contribute-2',
    question: 'Teknik bilgim olmadan nasıl katkıda bulunabilirim?',
    answer: (
      <div>
        <p>
          Teknik programlama bilgisi olmadan da projeye değerli katkılarda
          bulunabilirsiniz:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Dokümantasyonda yazım hatalarını düzeltme</li>
          <li>Algoritma açıklamalarını daha anlaşılır hale getirme</li>
          <li>Kullanıcı arayüzü için geri bildirim sağlama</li>
          <li>Sosyal medyada projeyi paylaşarak farkındalık yaratma</li>
          <li>Kullanıcı perspektifinden öneriler ve geribildirimler sağlama</li>
        </ul>
        <p className="mt-2">
          Tüm katkılar, projenin daha iyi hale gelmesine yardımcı olur ve takdir
          edilir!
        </p>
      </div>
    ),
    category: 'contribute',
    tags: ['katkı', 'teknik olmayan', 'geribildirim'],
  },
];
