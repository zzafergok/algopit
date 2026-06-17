import React from 'react';
import { FAQItem } from '../types';

export const algorithmsFaqs: FAQItem[] = [
  {
    id: 'algorithms-1',
    question: 'Platformda hangi algoritma kategorileri bulunuyor?',
    answer: (
      <div>
        <p>Platformda şu ana kategorilerdeki algoritmalar bulunmaktadır:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>
            Sıralama Algoritmaları (Bubble Sort, Quick Sort, Merge Sort vb.)
          </li>
          <li>Arama Algoritmaları (Binary Search, Linear Search vb.)</li>
          <li>Graf Algoritmaları (BFS, DFS, Dijkstra, Bellman-Ford vb.)</li>
          <li>
            Veri Yapıları (Linked List, Stack, Queue, Binary Search Tree, Hash
            Table vb.)
          </li>
          <li>
            Dinamik Programlama (Fibonacci, Knapsack, Longest Common
            Subsequence vb.)
          </li>
          <li>Metin İşleme Algoritmaları (KMP, Rabin-Karp vb.)</li>
          <li>Matematiksel Algoritmalar (GCD, Sieve of Eratosthenes vb.)</li>
          <li>Optimizasyon Algoritmaları ve daha fazlası...</li>
        </ul>
        // Continuing the FAQ page content...
        <p className="mt-2">
          Sürekli olarak yeni algoritmalar eklemeye devam ediyoruz. Eğer
          belirli bir algoritma görmek istiyorsanız, GitHub üzerinden bir
          öneride bulunabilirsiniz.
        </p>
      </div>
    ),
    category: 'algorithms',
    tags: ['kategoriler', 'algoritma türleri', 'içerik'],
  },
  {
    id: 'algorithms-2',
    question: 'Kendi algoritmalarımı ekleyebilir miyim?',
    answer: (
      <div>
        <p>
          Evet, kendi algoritma implementasyonlarınızı eklemek için katkıda
          bulunabilirsiniz. Katkı sağlamak için:
        </p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>GitHub repository&apos;sini forklayın</li>
          <li>Yeni bir branch oluşturun</li>
          <li>Algoritmanızı ekleyin ve gerekli görselleştirmeleri oluşturun</li>
          <li>Pull request gönderin</li>
        </ol>
        <p className="mt-2">
          Daha detaylı bilgi için{' '}
          <a
            href="/resources/contributing"
            className="text-arcly-blue hover:underline"
          >
            Katkıda Bulunma
          </a>{' '}
          sayfamıza göz atabilirsiniz.
        </p>
      </div>
    ),
    category: 'algorithms',
    tags: ['katkı', 'algoritma ekleme'],
  },
];
