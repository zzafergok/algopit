import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { duplicateAlgorithmContents } from '@/lib/duplicate-algorithms';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';
import { categoryDescriptions } from '@/features/algorithms/algorithms-hub/data';

const customAlgorithmPaths = [
  '/algorithms/advanced-algorithms/floyd-cycle-finding',
  '/algorithms/advanced-algorithms/topological-sort',
  '/algorithms/backtracking/n-queens',
  '/algorithms/backtracking/subset-sum',
  '/algorithms/clustering-algorithms/hierarchical-clustering',
  '/algorithms/clustering-algorithms/k-means',
  '/algorithms/data-structures/segment-tree',
  '/algorithms/data-structures/trie',
  '/algorithms/graph-algorithms/a-star',
  '/algorithms/graph-algorithms/floyd-warshall',
  '/algorithms/graph-algorithms/kruskal',
  '/algorithms/graph-algorithms/prim',
  '/algorithms/sorting/bubble-sort',
  '/algorithms/sorting/counting-sort',
  '/algorithms/sorting/heap-sort',
  '/algorithms/sorting/insertion-sort',
  '/algorithms/sorting/merge-sort',
  '/algorithms/sorting/quick-sort',
  '/algorithms/sorting/radix-sort',
  '/algorithms/sorting/selection-sort',
  '/algorithms/sorting/shell-sort',
  '/algorithms/sorting/tim-sort',
];

const staticPages: {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly';
}[] = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/algorithms', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/resources', priority: 0.8, changeFrequency: 'monthly' },
  {
    path: '/resources/documentation',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/resources/code-examples',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  { path: '/resources/faq', priority: 0.7, changeFrequency: 'monthly' },
  {
    path: '/resources/contributing',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urlMap = new Map<string, MetadataRoute.Sitemap[number]>();

  // 1. Static Core Pages
  for (const page of staticPages) {
    const url = `${SITE_URL}${page.path}`;
    urlMap.set(url, {
      url,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // 2. Category Overview Pages
  for (const category of Object.keys(categoryDescriptions)) {
    const url = `${SITE_URL}/algorithms/${category}`;
    urlMap.set(url, {
      url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // 3. Custom Feature Views
  for (const path of customAlgorithmPaths) {
    const url = `${SITE_URL}${path}`;
    urlMap.set(url, {
      url,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // 4. Remaining Algorithm Pages
  for (const [slug, item] of Object.entries(remainingAlgorithmContents)) {
    const url = `${SITE_URL}${item.categoryHref}/${slug}`;
    if (!urlMap.has(url)) {
      urlMap.set(url, {
        url,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // 5. Duplicate & Dynamic Algorithm Pages
  for (const item of duplicateAlgorithmContents) {
    const url = `${SITE_URL}/algorithms/${item.category}/${item.slug}`;
    if (!urlMap.has(url)) {
      urlMap.set(url, {
        url,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return Array.from(urlMap.values());
}
