import React from 'react';
import { FAQItem } from '../types';

export const generalFaqs: FAQItem[] = [
  {
    id: 'general-1',
    question: 'AlgoPit nedir?',
    answer: (
      <p>
        AlgoPit, algoritmaları interaktif bir şekilde öğrenmek ve deneyimlemek
        için tasarlanmış bir eğitim platformudur. Görselleştirmeler, adım adım
        açıklamalar ve canlı kod örnekleriyle, hem acemi hem de deneyimli
        programcıların algoritmaları daha iyi anlamasını sağlamayı amaçlıyoruz.
      </p>
    ),
    category: 'general',
    tags: ['genel', 'platform', 'hakkında'],
  },
  {
    id: 'general-2',
    question: 'Bu platform kimler için tasarlanmıştır?',
    answer: (
      <div>
        <p>AlgoPit, çeşitli düzeylerdeki kullanıcılar için tasarlanmıştır:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Algoritma ve veri yapıları öğrenmek isteyen öğrenciler</li>
          <li>Bilgilerini pekiştirmek isteyen programcılar</li>
          <li>Teknik mülakatlara hazırlanan adaylar</li>
          <li>Algoritmaları görsel olarak anlamak isteyen herkes</li>
        </ul>
      </div>
    ),
    category: 'general',
    tags: ['hedef kitle', 'kullanıcı', 'eğitim'],
  },
  {
    id: 'general-3',
    question: 'Platform ücretsiz mi kullanılabilir?',
    answer: (
      <p>
        Evet, AlgoPit tamamen ücretsiz ve açık kaynaklı bir projedir. GitHub
        üzerinden koda erişebilir, projeyi forklayabilir ve katkıda
        bulunabilirsiniz. Eğitim materyallerini, interaktif demoları ve tüm
        kaynakları herhangi bir ücret ödemeden kullanabilirsiniz.
      </p>
    ),
    category: 'general',
    tags: ['ücretsiz', 'açık kaynak', 'lisans'],
  },
];
