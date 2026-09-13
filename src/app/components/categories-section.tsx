'use client';

import Link from 'next/link';
import { SectionHeading } from '@/components/common/SectionHeading';

type CategoryItem = {
  id: string;
  order: string;
  eyebrow: string;
  title: string;
  summary: string;
  examples: string[];
  tags: string[];
  href: string;
  accent: 'turquoise' | 'red' | 'amber' | 'brown';
};

const CATEGORIES: CategoryItem[] = [
  {
    id: 'sorting',
    order: '01',
    eyebrow: 'TEMEL ALGORİTMALAR · O(N LOG N) / O(N²)',
    title: 'Sıralama Algoritmaları',
    summary:
      'Veri dizilerini belirli bir düzene göre sıralayan, bellek içi takasları ve böl-ve-yönet ilkelerini görselleştiren algoritmalar.',
    examples: [
      'Quick Sort: Pivot seçimi ve özyinelemeli parçalama mekanizması',
      'Merge Sort: Kararlı böl-ve-yönet sıralama adımları',
      'Heap Sort & Bubble Sort: Karşılaştırma ve takas animasyonları',
    ],
    tags: ['Divide & Conquer', 'In-Place', 'Comparison', 'Stability'],
    href: '/algorithms/sorting',
    accent: 'turquoise',
  },
  {
    id: 'searching',
    order: '02',
    eyebrow: 'VERİ ERİŞİMİ · O(LOG N) / O(N)',
    title: 'Arama Algoritmaları',
    summary:
      'Sıralı veya sırasız veri yapılarında hedeflenen elemanı minimum karşılaştırma adımı ile konumlandıran teknikler.',
    examples: [
      'Binary Search: Her adımda arama uzayını yarıya indirme',
      'Linear Search & Jump Search: Dizi üzerinde sıçramalı gezinme',
      'Interpolation Search: Dağılıma göre tahmini indeksleme',
    ],
    tags: ['Divide & Conquer', 'Search Space', 'Logarithmic Time'],
    href: '/algorithms/searching',
    accent: 'red',
  },
  {
    id: 'graph',
    order: '03',
    eyebrow: 'AĞ VE BAĞLANTI MODELLERİ · O(V + E)',
    title: 'Graf Algoritmaları',
    summary:
      'Düğümler ve kenarlardan oluşan karmaşık ağ yapıları üzerinde en kısa yol, derinlemesine ve genişlemesine tarama simülasyonları.',
    examples: [
      'Dijkstra Algoritması: Ağırlıklı graflarda en kısa yol keşfi',
      'Breadth-First Search (BFS): Dalga benzeri seviye seviye yayılma',
      'Depth-First Search (DFS): Derinlemesine keşif ve geri izleme (Backtracking)',
    ],
    tags: [
      'Graph Traversal',
      'Shortest Path',
      'Adjacency Matrix',
      'Spanning Tree',
    ],
    href: '/algorithms/graph-algorithms',
    accent: 'amber',
  },
  {
    id: 'dynamic-programming',
    order: '04',
    eyebrow: 'OPTİMİZASYON STRATEJİLERİ · MEMOIZATION',
    title: 'Dinamik Programlama',
    summary:
      'Büyük ve karmaşık problemleri örtüşen alt problemlere ayırarak önbellekleyen ve optimal çözüme ulaştıran algoritmalar.',
    examples: [
      'Knapsack (Sırt Çantası): Kapasite ve değer optimizasyonu',
      'Longest Common Subsequence (LCS): Karakter dizisi hizalama',
      'Fibonacci & Matrix Chain Multiplication: Tablolama teknikleri',
    ],
    tags: ['Memoization', 'Tabulation', 'Optimal Substructure', 'Recursion'],
    href: '/algorithms/dynamic-programming',
    accent: 'brown',
  },
];

export function CategoriesSection() {
  return (
    <section
      className="section"
      id="categories"
      aria-labelledby="categories-title"
    >
      <SectionHeading
        id="categories-title"
        index="01"
        eyebrow="Algoritma Grupları"
        title="Temel prensipler, canlı modeller."
        description="Bilgisayar bilimlerinin omurgasını oluşturan algoritmaları interaktif adım adım yürütme modülleri ile deneyimleyin."
      />

      <div className="project-list">
        {CATEGORIES.map((category) => (
          <article
            className={`project-card accent-${category.accent}`}
            key={category.id}
          >
            <div className="project-track" aria-hidden="true">
              {category.order}
            </div>

            <div className="project-main">
              <p className="eyebrow">{category.eyebrow}</p>
              <h3>{category.title}</h3>
              <p>{category.summary}</p>
              <ul className="impact-list" aria-label="Önemli algoritmalar">
                {category.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>

            <div className="project-meta">
              <div className="tech-list" aria-label="Kavramlar ve Etiketler">
                {category.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link className="text-link" href={category.href}>
                Modülü Başlat <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
