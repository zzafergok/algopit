import React from 'react';
import { FAQItem } from '../types';

export const technicalFaqs: FAQItem[] = [
  {
    id: 'technical-1',
    question: 'Algoritma karmaşıklığı nasıl hesaplanır?',
    answer: (
      <div>
        <p>
          Algoritma karmaşıklığı, bir algoritmanın giriş boyutuna göre nasıl
          ölçeklendiğini gösteren matematiksel bir analizdir. İki ana
          karmaşıklık türü vardır:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>Zaman Karmaşıklığı:</strong> Algoritmanın çalışma süresinin
            giriş boyutuna göre nasıl değiştiğini gösterir (ör. O(n), O(n log
            n), O(n²)).
          </li>
          <li>
            <strong>Alan Karmaşıklığı:</strong> Algoritmanın bellek kullanımının
            giriş boyutuna göre nasıl değiştiğini gösterir.
          </li>
        </ul>
        <p className="mt-2">
          Platformumuzda her algoritma için en iyi, ortalama ve en kötü durum
          karmaşıklık analizlerini sağlıyoruz. Karmaşıklık kavramları hakkında
          daha fazla bilgi için &quot;Algoritmik Karmaşıklık&quot; öğretici
          bölümümüze göz atabilirsiniz.
        </p>
      </div>
    ),
    category: 'technical',
    tags: ['karmaşıklık', 'big o', 'analiz'],
  },
  {
    id: 'technical-2',
    question: 'Bazı algoritmalar neden diğerlerinden daha hızlı?',
    answer: (
      <div>
        <p>Algoritmaların hızı birçok faktöre bağlıdır:</p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Algoritmik Karmaşıklık:</strong> O(n log n) karmaşıklığa
            sahip bir algoritma, genellikle O(n²) karmaşıklığa sahip bir
            algoritmadan büyük veri setlerinde daha hızlıdır.
          </li>
          <li>
            <strong>Veri Niteliği:</strong> Bazı algoritmalar belirli veri
            tipleri için optimize edilmiştir. Örneğin, Insertion Sort, neredeyse
            sıralı diziler için çok verimlidir.
          </li>
          <li>
            <strong>Sabit Faktörler:</strong> Düşük asimptotik karmaşıklığa
            sahip algoritmalar, yüksek sabit faktörleri nedeniyle küçük veri
            setlerinde daha yavaş olabilir.
          </li>
          <li>
            <strong>Bellek Erişimi ve Cache Etkileri:</strong> Modern
            bilgisayarlarda bellek erişimi, algoritma performansında önemli bir
            rol oynar.
          </li>
        </ul>
        <p className="mt-2">
          Her algoritmanın güçlü ve zayıf yönleri vardır. Bu yüzden her
          algoritmanın avantajlarını, dezavantajlarını ve kullanım durumlarını
          açıklıyoruz.
        </p>
      </div>
    ),
    category: 'technical',
    tags: ['hız', 'performans', 'karşılaştırma'],
  },
  {
    id: 'technical-3',
    question: 'Platform hangi teknolojilerle geliştirilmiştir?',
    answer: (
      <div>
        <p>
          AlgoPit aşağıdaki modern web teknolojileri kullanılarak
          geliştirilmiştir:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            <strong>Next.js:</strong> React framework (App Router)
          </li>
          <li>
            <strong>TypeScript:</strong> Tip güvenliği
          </li>
          <li>
            <strong>Tailwind CSS:</strong> Stil ve arayüz
          </li>
          <li>
            <strong>radix/ui:</strong> UI bileşenleri
          </li>
          <li>
            <strong>Framer Motion:</strong> Animasyonlar
          </li>
        </ul>
        <p className="mt-2">
          Algoritmalar ve görselleştirmeler için, React bileşenleri ve canvas/SVG
          tabanlı görselleştirme kütüphaneleri kullanılmıştır. Performans
          ölçümleri için Web API&apos;leri ve işlem yoğun hesaplamalar için Web
          Worker&apos;lar kullanılmaktadır.
        </p>
      </div>
    ),
    category: 'technical',
    tags: ['teknoloji', 'framework', 'geliştirme'],
  },
];
